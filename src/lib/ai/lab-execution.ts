import { GoogleGenerativeAI, GenerativeModel, Content } from "@google/generative-ai";

// Initialize Gemini with API key (check multiple possible env var names)
const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface LabExecutionRequest {
    labId: string;
    userPrompt: string;
    systemContext?: string;
    conversationHistory?: Array<{ role: "user" | "model"; content: string }>;
    model?: "gemini-2.0-flash" | "gemini-1.5-flash" | "gemini-1.5-pro";
    maxTokens?: number;
    temperature?: number;
}

export interface LabExecutionResult {
    success: boolean;
    output: string;
    usage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens: number;
        estimatedCost: number;
    };
    model: string;
    latencyMs: number;
    error?: string;
}

// Token pricing (per million tokens) as of Jan 2026
const PRICING = {
    "gemini-2.0-flash": { input: 0.075, output: 0.30 },
    "gemini-1.5-flash": { input: 0.075, output: 0.30 },
    "gemini-1.5-pro": { input: 1.25, output: 5.00 },
};

/**
 * Execute a lab prompt against Gemini API
 * Used for interactive labs where students write their own prompts
 */
export async function executeLabPrompt(request: LabExecutionRequest): Promise<LabExecutionResult> {
    const startTime = Date.now();
    const modelName = request.model || "gemini-2.0-flash";

    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                maxOutputTokens: request.maxTokens || 4096,
                temperature: request.temperature ?? 0.7,
            },
        });

        // Build conversation history if provided
        const contents: Content[] = [];

        if (request.conversationHistory) {
            for (const msg of request.conversationHistory) {
                contents.push({
                    role: msg.role,
                    parts: [{ text: msg.content }],
                });
            }
        }

        // Add current user prompt
        contents.push({
            role: "user",
            parts: [{ text: request.userPrompt }],
        });

        // Execute with system instruction if provided
        const chat = model.startChat({
            history: contents.slice(0, -1),
            systemInstruction: request.systemContext || undefined,
        });

        const result = await chat.sendMessage(request.userPrompt);
        const response = result.response;
        const text = response.text();

        // Get usage metadata
        const usageMetadata = response.usageMetadata;
        const inputTokens = usageMetadata?.promptTokenCount || 0;
        const outputTokens = usageMetadata?.candidatesTokenCount || 0;
        const totalTokens = usageMetadata?.totalTokenCount || inputTokens + outputTokens;

        // Calculate cost
        const pricing = PRICING[modelName];
        const estimatedCost = (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;

        return {
            success: true,
            output: text,
            usage: {
                inputTokens,
                outputTokens,
                totalTokens,
                estimatedCost,
            },
            model: modelName,
            latencyMs: Date.now() - startTime,
        };
    } catch (error) {
        console.error("Lab execution error:", error);
        return {
            success: false,
            output: "",
            usage: {
                inputTokens: 0,
                outputTokens: 0,
                totalTokens: 0,
                estimatedCost: 0,
            },
            model: modelName,
            latencyMs: Date.now() - startTime,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}

/**
 * Count tokens in a prompt without executing
 * Used for real-time token counting in the UI
 */
export async function countTokens(text: string, model: string = "gemini-2.0-flash"): Promise<number> {
    try {
        const genModel = genAI.getGenerativeModel({ model });
        const result = await genModel.countTokens(text);
        return result.totalTokens;
    } catch (error) {
        // Fallback: estimate ~4 chars per token
        return Math.ceil(text.length / 4);
    }
}

/**
 * Execute with streaming for better UX in labs
 */
export async function executeLabPromptStreaming(
    request: LabExecutionRequest,
    onChunk: (chunk: string) => void
): Promise<LabExecutionResult> {
    const startTime = Date.now();
    const modelName = request.model || "gemini-2.0-flash";

    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                maxOutputTokens: request.maxTokens || 4096,
                temperature: request.temperature ?? 0.7,
            },
        });

        const chat = model.startChat({
            systemInstruction: request.systemContext || undefined,
        });

        const result = await chat.sendMessageStream(request.userPrompt);

        let fullOutput = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullOutput += chunkText;
            onChunk(chunkText);
        }

        // Get final response for usage stats
        const response = await result.response;
        const usageMetadata = response.usageMetadata;
        const inputTokens = usageMetadata?.promptTokenCount || 0;
        const outputTokens = usageMetadata?.candidatesTokenCount || 0;

        const pricing = PRICING[modelName];
        const estimatedCost = (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;

        return {
            success: true,
            output: fullOutput,
            usage: {
                inputTokens,
                outputTokens,
                totalTokens: inputTokens + outputTokens,
                estimatedCost,
            },
            model: modelName,
            latencyMs: Date.now() - startTime,
        };
    } catch (error) {
        console.error("Streaming lab execution error:", error);
        return {
            success: false,
            output: "",
            usage: {
                inputTokens: 0,
                outputTokens: 0,
                totalTokens: 0,
                estimatedCost: 0,
            },
            model: modelName,
            latencyMs: Date.now() - startTime,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}

/**
 * Assess the quality of a lab output
 * Used to provide feedback to students
 */
export async function assessLabOutput(
    labObjectives: string[],
    userPrompt: string,
    aiOutput: string
): Promise<{
    score: number;
    feedback: string;
    objectiveResults: Array<{ objective: string; met: boolean; comment: string }>;
}> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const assessmentPrompt = `You are an expert instructor assessing a student's work in an AI lab.

The student was given these learning objectives:
${labObjectives.map((obj, i) => `${i + 1}. ${obj}`).join("\n")}

The student wrote this prompt:
---
${userPrompt}
---

The AI generated this output:
---
${aiOutput}
---

Assess the student's work:
1. Did the prompt effectively achieve each objective?
2. What was done well?
3. What could be improved?

Respond in this JSON format:
{
    "score": 85,
    "feedback": "Overall feedback paragraph",
    "objectiveResults": [
        {"objective": "Objective 1", "met": true, "comment": "How they did on this objective"}
    ]
}

Score from 0-100. Be encouraging but honest.`;

    try {
        const result = await model.generateContent(assessmentPrompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Failed to parse assessment");
    } catch (error) {
        console.error("Assessment error:", error);
        return {
            score: 70,
            feedback: "Your prompt produced a reasonable output. Review the objectives to ensure all requirements are met.",
            objectiveResults: labObjectives.map(obj => ({
                objective: obj,
                met: true,
                comment: "Needs manual review",
            })),
        };
    }
}
