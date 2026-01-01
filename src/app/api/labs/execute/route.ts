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
    category?: "prompt-engineering" | "code-generation" | "product-management" | "agent-building";
}> = {
    // ==================== PROMPT ENGINEERING LABS ====================
    "prompt-engineering-101": {
        name: "Prompt Engineering Fundamentals",
        category: "prompt-engineering",
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
        category: "prompt-engineering",
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
        category: "prompt-engineering",
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
        category: "agent-building",
        objectives: [
            "Define clear agent persona and capabilities",
            "Include relevant organizational policies",
            "Specify guardrails and constraints",
            "Optimize token usage while maintaining clarity",
        ],
        maxInputTokens: 8000,
        maxOutputTokens: 4000,
    },

    // ==================== CODE GENERATION LABS ====================
    "code-generation": {
        name: "AI-Assisted Code Generation",
        category: "code-generation",
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
    "api-design": {
        name: "REST API Design with AI",
        category: "code-generation",
        objectives: [
            "Design a well-structured REST API",
            "Include proper HTTP methods and status codes",
            "Implement input validation",
            "Generate OpenAPI/Swagger documentation",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 6000,
        systemContext: "You are an API design expert. Generate RESTful APIs following best practices with proper HTTP semantics, validation, and documentation.",
    },
    "unit-test-generation": {
        name: "AI-Powered Test Generation",
        category: "code-generation",
        objectives: [
            "Generate comprehensive unit tests",
            "Cover edge cases and error scenarios",
            "Use appropriate testing patterns (AAA, mocks)",
            "Achieve high code coverage",
        ],
        maxInputTokens: 6000,
        maxOutputTokens: 6000,
        systemContext: "You are a testing expert. Generate thorough unit tests with proper test isolation, meaningful assertions, and edge case coverage.",
    },
    "code-refactoring": {
        name: "AI-Assisted Refactoring",
        category: "code-generation",
        objectives: [
            "Identify code smells and anti-patterns",
            "Apply appropriate refactoring techniques",
            "Maintain functional equivalence",
            "Improve code readability and maintainability",
        ],
        maxInputTokens: 6000,
        maxOutputTokens: 6000,
        systemContext: "You are a code quality expert. Refactor code to improve readability, maintainability, and adherence to SOLID principles while preserving functionality.",
    },
    "debugging-assistant": {
        name: "AI Debugging Partner",
        category: "code-generation",
        objectives: [
            "Identify the root cause of bugs",
            "Explain the issue clearly",
            "Propose a fix with explanation",
            "Suggest preventive measures",
        ],
        maxInputTokens: 6000,
        maxOutputTokens: 4000,
        systemContext: "You are a debugging expert. Analyze code issues methodically, explain root causes clearly, and provide fixes with reasoning.",
    },
    "sql-query-generation": {
        name: "SQL Query Generation",
        category: "code-generation",
        objectives: [
            "Generate correct, efficient SQL queries",
            "Use proper JOIN types and conditions",
            "Optimize for performance",
            "Handle NULL values appropriately",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 4000,
        systemContext: "You are a database expert. Generate efficient SQL queries with proper indexing considerations, handling of edge cases, and clear explanations.",
    },

    // ==================== PRODUCT MANAGEMENT LABS ====================
    "ai-native-product-strategy": {
        name: "AI-Native Product Strategy",
        category: "product-management",
        objectives: [
            "Define AI-first product vision",
            "Identify AI capabilities vs. human oversight needs",
            "Design for continuous AI improvement",
            "Address AI-specific risks and mitigation",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 6000,
        systemContext: "You are a product strategy consultant specializing in AI-native products. Help design products that leverage AI as a core capability, not an add-on. Consider hybrid human-AI workflows, continuous learning, and responsible AI principles.",
    },
    "ai-product-roadmap": {
        name: "AI Product Roadmap Design",
        category: "product-management",
        objectives: [
            "Create phased AI capability rollout",
            "Balance innovation with risk management",
            "Define clear success metrics for AI features",
            "Plan for model iteration and improvement",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 6000,
        systemContext: "You are an AI product roadmap expert. Design roadmaps that account for AI development cycles, model training timelines, feedback loops, and responsible AI milestones. Consider the unique aspects of AI product development vs. traditional software.",
    },
    "ai-prd-writing": {
        name: "AI Feature PRD Writing",
        category: "product-management",
        objectives: [
            "Write clear AI feature specifications",
            "Define expected AI behavior and edge cases",
            "Specify human oversight requirements",
            "Include AI-specific acceptance criteria",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 8000,
        systemContext: "You are a senior product manager experienced in AI products. Write PRDs that clearly specify AI behavior, confidence thresholds, fallback mechanisms, edge cases, and human intervention points. Include sections for model requirements, training data needs, and evaluation metrics.",
    },
    "ai-feature-prioritization": {
        name: "AI Feature Prioritization Framework",
        category: "product-management",
        objectives: [
            "Evaluate AI features using RICE + AI factors",
            "Assess technical feasibility of AI implementations",
            "Consider data availability and quality",
            "Balance quick wins vs. strategic AI investments",
        ],
        maxInputTokens: 4000,
        maxOutputTokens: 4000,
        systemContext: "You are a product prioritization expert for AI features. Extend traditional frameworks (RICE, ICE) with AI-specific considerations: data availability, model complexity, training requirements, maintenance burden, and responsible AI implications.",
    },
    "ai-integration-planning": {
        name: "AI Integration Planning",
        category: "product-management",
        objectives: [
            "Plan AI integration into existing products",
            "Design hybrid human-AI workflows",
            "Define trust and confidence thresholds",
            "Create user education and change management plans",
        ],
        maxInputTokens: 5000,
        maxOutputTokens: 6000,
        systemContext: "You are an AI integration strategist. Help plan how to incorporate AI capabilities into existing products and workflows. Consider user trust, gradual rollout, A/B testing of AI features, and change management for teams adapting to AI-assisted workflows.",
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
