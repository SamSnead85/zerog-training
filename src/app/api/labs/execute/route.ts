import { NextRequest, NextResponse } from "next/server";
import { executeLabPrompt, assessLabOutput, countTokens } from "@/lib/ai/lab-execution";
import { checkQuota, recordUsage, getQuotaSummary } from "@/lib/ai/quota-manager";

// Rate limiting - in production, use Redis
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(userId: string): boolean {
    const now = Date.now();
    const userLimit = rateLimits.get(userId);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimits.set(userId, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (userLimit.count >= RATE_LIMIT) {
        return false;
    }

    userLimit.count++;
    return true;
}

// Lab configurations with objectives and constraints
const labConfigs: Record<string, {
    name: string;
    objectives: string[];
    maxInputTokens: number;
    maxOutputTokens: number;
    systemContext?: string;
    blockedPatterns?: RegExp[];
}> = {
    "prompt-engineering-101": {
        name: "Prompt Engineering Fundamentals",
        objectives: [
            "Write a clear, specific prompt",
            "Include relevant context",
            "Specify the desired output format",
        ],
        maxInputTokens: 2000,
        maxOutputTokens: 2000,
    },
    "contract-summarization": {
        name: "Contract Summarization Challenge",
        objectives: [
            "Extract key obligations for both parties",
            "Identify term and termination clauses",
            "Highlight liability limitations",
            "Note unusual provisions",
        ],
        maxInputTokens: 8000,
        maxOutputTokens: 2000,
        systemContext: "You are a legal document analyst. Be precise and cite specific sections.",
    },
    "rag-prompt-design": {
        name: "RAG Prompt Design",
        objectives: [
            "Design a prompt that uses retrieved context effectively",
            "Prevent hallucination beyond provided context",
            "Handle cases where context doesn't contain the answer",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 2000,
    },
    "agent-context-engineering": {
        name: "Agent Context Engineering",
        objectives: [
            "Define clear agent persona and capabilities",
            "Include relevant organizational policies",
            "Specify guardrails and constraints",
            "Optimize token usage while maintaining clarity",
        ],
        maxInputTokens: 8000,
        maxOutputTokens: 4000,
    },
    "code-generation": {
        name: "AI-Assisted Code Generation",
        objectives: [
            "Generate functional, correct code",
            "Include error handling",
            "Follow coding best practices",
            "Produce well-documented code",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 4000,
        systemContext: "You are an expert software engineer. Generate clean, production-ready code with proper error handling and documentation.",
    },
};

export async function POST(request: NextRequest) {
    try {
        // Get user session (if using auth)
        // const session = await getServerSession();
        // const userId = session?.user?.id || "anonymous";
        const userId = "demo-user"; // For now, use demo user

        // Check rate limit
        if (!checkRateLimit(userId)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please wait before trying again." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { labId, userPrompt, additionalContext, model } = body;

        // Validate input
        if (!labId || !userPrompt) {
            return NextResponse.json(
                { error: "labId and userPrompt are required" },
                { status: 400 }
            );
        }

        // Get lab configuration
        const labConfig = labConfigs[labId];
        if (!labConfig) {
            return NextResponse.json(
                { error: `Unknown lab: ${labId}` },
                { status: 400 }
            );
        }

        // Count input tokens
        const inputTokens = await countTokens(userPrompt + (additionalContext || ""));
        if (inputTokens > labConfig.maxInputTokens) {
            return NextResponse.json(
                {
                    error: `Prompt too long. Maximum ${labConfig.maxInputTokens} tokens allowed, got ${inputTokens}.`,
                    tokenCount: inputTokens,
                },
                { status: 400 }
            );
        }

        // Check student quota (estimate: input + expected output tokens)
        const estimatedTotalTokens = inputTokens + labConfig.maxOutputTokens;
        const quotaCheck = checkQuota(userId, estimatedTotalTokens);
        if (!quotaCheck.allowed) {
            const summary = getQuotaSummary(userId);
            return NextResponse.json(
                {
                    error: quotaCheck.message,
                    quota: {
                        used: summary.used,
                        limit: summary.limit,
                        remaining: summary.remaining,
                        percentUsed: summary.percentUsed,
                        resetsOn: summary.resetsOn,
                    },
                },
                { status: 402 } // Payment Required - quota exceeded
            );
        }

        // Check for blocked patterns (security)
        if (labConfig.blockedPatterns) {
            for (const pattern of labConfig.blockedPatterns) {
                if (pattern.test(userPrompt)) {
                    return NextResponse.json(
                        { error: "Prompt contains blocked content" },
                        { status: 400 }
                    );
                }
            }
        }

        // Build full context
        let fullContext = labConfig.systemContext || "";
        if (additionalContext) {
            fullContext += `\n\n${additionalContext}`;
        }

        // Execute the prompt
        const result = await executeLabPrompt({
            labId,
            userPrompt,
            systemContext: fullContext,
            model: model || "gemini-2.0-flash",
            maxTokens: labConfig.maxOutputTokens,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "Execution failed" },
                { status: 500 }
            );
        }

        // Record actual token usage against quota
        recordUsage(userId, result.usage.totalTokens);
        const updatedQuota = getQuotaSummary(userId);

        // Assess the output
        const assessment = await assessLabOutput(
            labConfig.objectives,
            userPrompt,
            result.output
        );

        // Return result with assessment and quota info
        return NextResponse.json({
            success: true,
            output: result.output,
            usage: result.usage,
            latencyMs: result.latencyMs,
            assessment: {
                score: assessment.score,
                feedback: assessment.feedback,
                objectiveResults: assessment.objectiveResults,
            },
            lab: {
                id: labId,
                name: labConfig.name,
                objectives: labConfig.objectives,
            },
            quota: {
                used: updatedQuota.used,
                limit: updatedQuota.limit,
                remaining: updatedQuota.remaining,
                percentUsed: updatedQuota.percentUsed,
            },
        });
    } catch (error) {
        console.error("Lab execution API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET endpoint to list available labs
export async function GET() {
    const labs = Object.entries(labConfigs).map(([id, config]) => ({
        id,
        name: config.name,
        objectives: config.objectives,
        maxInputTokens: config.maxInputTokens,
    }));

    return NextResponse.json({ labs });
}
