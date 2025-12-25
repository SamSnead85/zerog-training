import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

interface GenerateRequest {
    moduleId: string;
    moduleTitle: string;
    baseContent: string;
    organizationContext: {
        companyName: string;
        industry: string;
        tools?: string;
        policies?: string;
        terminology?: string;
    };
    contentType: "lesson" | "assessment" | "simulation" | "example";
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();

        if (!GEMINI_API_KEY) {
            // Return mock response when no API key
            return NextResponse.json({
                success: true,
                content: generateMockContent(body),
                metadata: {
                    model: "mock",
                    tokensUsed: 0,
                },
            });
        }

        const prompt = buildPrompt(body);

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2000,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        return NextResponse.json({
            success: true,
            content: generatedText,
            metadata: {
                model: "gemini-1.5-flash",
                tokensUsed: data.usageMetadata?.totalTokenCount || 0,
            },
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate content" },
            { status: 500 }
        );
    }
}

function buildPrompt(body: GenerateRequest): string {
    const { moduleTitle, baseContent, organizationContext, contentType } = body;
    const { companyName, industry, tools, policies, terminology } = organizationContext;

    let prompt = `You are creating training content for ${companyName}, a company in the ${industry} industry.

## Task
Generate customized ${contentType} content that blends the standard training material with organization-specific context.

## Base Training Content
${baseContent}

## Organization Context`;

    if (tools) prompt += `\n- Tools & Software: ${tools}`;
    if (policies) prompt += `\n- Key Policies: ${policies}`;
    if (terminology) prompt += `\n- Company Terminology: ${terminology}`;

    prompt += `

## Requirements
1. Maintain 90% of the original training concepts and structure
2. Add 10-15% organization-specific examples, references, and scenarios
3. Use ${companyName}'s actual tools in examples where applicable
4. Keep professional tone suitable for enterprise training
5. Ensure all compliance/regulatory content remains accurate

## Output Format
Generate the customized ${contentType} content in clean markdown format.`;

    return prompt;
}

function generateMockContent(body: GenerateRequest): string {
    const { moduleTitle, organizationContext, contentType } = body;
    const { companyName, tools } = organizationContext;

    if (contentType === "lesson") {
        return `# ${moduleTitle} - Customized for ${companyName}

## Introduction
Welcome to this training module, customized specifically for ${companyName}. This content has been enhanced with examples and scenarios relevant to your organization.

## Key Concepts
The core principles remain the same, but we've added context specific to your workflows${tools ? ` using ${tools}` : ""}.

### Practical Application
When applying these concepts at ${companyName}, consider:
- Your specific team structures and processes
- The tools you use daily${tools ? ` like ${tools}` : ""}
- Your organization's policies and procedures

## Next Steps
Practice these concepts in your daily work and share learnings with your team.
`;
    }

    if (contentType === "assessment") {
        return `## Assessment: ${moduleTitle}

### Question 1
Based on ${companyName}'s context, which approach would be most effective?

A) Standard approach
B) Customized approach using your org's tools
C) Hybrid approach
D) None of the above

### Question 2
How would you apply this concept in your specific role at ${companyName}?

[Open response]
`;
    }

    if (contentType === "example") {
        return `## Real-World Example: ${companyName}

Imagine you're working at ${companyName} and encounter this scenario...

${tools ? `Using ${tools}, you would:
1. Open the relevant application
2. Navigate to the appropriate section
3. Apply the concepts from this training
4. Document your actions` : `You would apply the training concepts to your specific situation.`}

This example shows how the training directly applies to your work.
`;
    }

    return `# Customized Content for ${companyName}\n\nThis content has been tailored for your organization.`;
}
