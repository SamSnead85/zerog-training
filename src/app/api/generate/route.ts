import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

interface GenerateRequest {
    moduleId: string;
    moduleTitle: string;
    baseContent?: string;
    organizationContext: {
        companyName: string;
        industry: string;
        tools?: string;
        policies?: string;
        terminology?: string;
    };
    contentType: "full-module" | "lesson" | "assessment" | "simulation";
    lessonTopic?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();

        if (!GEMINI_API_KEY) {
            console.warn("No Gemini API key found, using mock generation");
            return NextResponse.json({
                success: true,
                content: generateMockContent(body),
                metadata: { model: "mock", tokensUsed: 0 },
            });
        }

        const prompt = buildEnhancedPrompt(body);

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 8000,
                    topP: 0.9,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API error:", errorText);
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Parse the JSON response if it's a full module
        let parsedContent = generatedText;
        if (body.contentType === "full-module") {
            try {
                // Extract JSON from markdown code blocks if present
                const jsonMatch = generatedText.match(/```json\n?([\s\S]*?)\n?```/);
                if (jsonMatch) {
                    parsedContent = JSON.parse(jsonMatch[1]);
                } else {
                    parsedContent = JSON.parse(generatedText);
                }
            } catch {
                parsedContent = generatedText;
            }
        }

        return NextResponse.json({
            success: true,
            content: parsedContent,
            metadata: {
                model: "gemini-1.5-pro",
                tokensUsed: data.usageMetadata?.totalTokenCount || 0,
            },
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate content", details: String(error) },
            { status: 500 }
        );
    }
}

function buildEnhancedPrompt(body: GenerateRequest): string {
    const { moduleTitle, organizationContext, contentType, lessonTopic, baseContent } = body;
    const { companyName, industry, tools, policies, terminology } = organizationContext;

    if (contentType === "full-module") {
        return `You are an expert enterprise training content developer. Generate a complete, professional training module for "${moduleTitle}" customized for ${companyName} (${industry} industry).

## Organization Context
- Company: ${companyName}
- Industry: ${industry}
${tools ? `- Tools & Software: ${tools}` : ""}
${policies ? `- Key Policies: ${policies}` : ""}
${terminology ? `- Company Terminology: ${terminology}` : ""}

## Requirements
Generate a complete training module with 5-8 lessons. Each lesson should include:
1. Educational content (400-600 words)
2. Key concepts and takeaways
3. A quiz question with 4 options, correct answer, and explanation
4. Practical examples using the company's tools when applicable

## Output Format (JSON)
\`\`\`json
{
  "title": "Module Title",
  "description": "Brief description",
  "lessons": [
    {
      "id": "lesson-1",
      "title": "Lesson Title",
      "duration": "15 min",
      "content": "# Lesson Title\\n\\nFull markdown content here...",
      "keyTakeaways": ["Point 1", "Point 2", "Point 3"],
      "quiz": {
        "question": "Question text?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 0,
        "explanation": "Why this is correct..."
      }
    }
  ]
}
\`\`\`

Generate the complete module now. Make the content engaging, professional, and directly applicable to ${companyName}'s context.`;
    }

    if (contentType === "assessment") {
        return `Generate 5 assessment questions for a training on "${moduleTitle}" for ${companyName} (${industry}).

${tools ? `Reference these tools in practical scenarios: ${tools}` : ""}

Output as JSON array:
\`\`\`json
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "Detailed explanation",
    "difficulty": "beginner|intermediate|advanced"
  }
]
\`\`\``;
    }

    // Default lesson generation
    return `Generate professional training content for a lesson on "${lessonTopic || moduleTitle}" for ${companyName}.

Context:
- Industry: ${industry}
${tools ? `- Tools: ${tools}` : ""}
${policies ? `- Policies: ${policies}` : ""}

${baseContent ? `Base content to enhance:\n${baseContent}\n\n` : ""}

Requirements:
1. 90% standard training concepts, 10% company-specific examples
2. Use ${companyName}'s tools in practical examples
3. Professional, engaging tone
4. Include actionable takeaways

Output clean markdown content.`;
}

function generateMockContent(body: GenerateRequest) {
    const { moduleTitle, organizationContext, contentType } = body;
    const { companyName, tools, industry } = organizationContext;

    if (contentType === "full-module") {
        return {
            title: `${moduleTitle} - Customized for ${companyName}`,
            description: `This module has been tailored for ${companyName}'s ${industry} context.`,
            lessons: [
                {
                    id: "lesson-1",
                    title: "Introduction & Overview",
                    duration: "15 min",
                    content: `# Introduction to ${moduleTitle}\n\nWelcome to this training module, customized for ${companyName}.\n\n## What You'll Learn\n\nThis module covers the essential concepts and practices used at ${companyName}.${tools ? `\n\n### Tools We'll Cover\n\nThroughout this training, we'll reference your tools including ${tools}.` : ""}\n\n## Why This Matters\n\nIn the ${industry} industry, mastering these skills is essential for success.\n\n## Key Objectives\n\n1. Understand core principles\n2. Apply concepts to your daily work\n3. Practice with real scenarios from ${companyName}`,
                    keyTakeaways: [
                        "Core principles apply directly to your role",
                        `${companyName}'s processes align with industry best practices`,
                        "Practical application is key to mastery"
                    ],
                    quiz: {
                        question: `Why is this training customized for ${companyName}?`,
                        options: [
                            "To include company-specific examples and tools",
                            "To make it shorter",
                            "To avoid industry standards",
                            "It isn't customized"
                        ],
                        correctIndex: 0,
                        explanation: `This training is customized to include ${companyName}'s specific tools, processes, and examples, making it immediately applicable to your work.`
                    }
                },
                {
                    id: "lesson-2",
                    title: "Core Concepts",
                    duration: "20 min",
                    content: `# Core Concepts\n\n## Understanding the Fundamentals\n\nThe foundation of success starts with understanding these core concepts.\n\n### Principle 1: Continuous Improvement\n\nAt ${companyName}, we embrace continuous improvement as a core value.\n\n### Principle 2: Collaboration\n\nWorking together effectively${tools ? ` using tools like ${tools}` : ""} drives our success.\n\n### Principle 3: Quality First\n\nQuality is built into every step of our process.\n\n## Applying These Concepts\n\nThink about how these principles show up in your daily work at ${companyName}.`,
                    keyTakeaways: [
                        "Continuous improvement is a journey, not a destination",
                        "Collaboration multiplies individual efforts",
                        "Quality must be built in, not inspected in"
                    ],
                    quiz: {
                        question: "What is the primary benefit of continuous improvement?",
                        options: [
                            "It eliminates the need for change",
                            "It creates ongoing value and adaptation",
                            "It reduces the need for training",
                            "It allows for less collaboration"
                        ],
                        correctIndex: 1,
                        explanation: "Continuous improvement creates ongoing value by helping teams and organizations adapt to changing needs and consistently deliver better results."
                    }
                }
            ]
        };
    }

    return `# ${moduleTitle}\n\nCustomized content for ${companyName} in the ${industry} industry.\n\n${tools ? `Using: ${tools}\n\n` : ""}This training applies directly to your work.`;
}
