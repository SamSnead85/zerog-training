import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface TrainingRequest {
    topic: string;
    context?: string;
    targetAudience?: string;
    duration?: string;
    knowledgeBase?: string;
}

export interface GeneratedModule {
    title: string;
    duration: string;
    topics: string[];
}

export interface GeneratedTraining {
    title: string;
    description: string;
    duration: string;
    audience: string;
    objectives: string[];
    modules: GeneratedModule[];
}

const TRAINING_GENERATION_PROMPT = `You are an expert instructional designer creating enterprise training programs.

Generate a comprehensive training program based on the following:

Topic: {topic}
{context}
{audience}
{duration}

Create a structured training program with:
1. A clear, professional title
2. A compelling course description (2-3 sentences)
3. Target audience specification
4. 3-5 learning objectives
5. 4-6 modules with specific topics

Respond in this exact JSON format:
{
  "title": "Training Title",
  "description": "Course description explaining the value and outcomes.",
  "duration": "X hours",
  "audience": "Target audience description",
  "objectives": ["Objective 1", "Objective 2", "Objective 3"],
  "modules": [
    {
      "title": "Module Title",
      "duration": "XX min",
      "topics": ["Topic 1", "Topic 2", "Topic 3"]
    }
  ]
}

Ensure the training is:
- Practical and applicable to real-world scenarios
- Progressive in complexity
- Aligned with enterprise learning standards
- Engaging and interactive in approach`;

export async function generateTraining(request: TrainingRequest): Promise<GeneratedTraining> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const contextStr = request.context
        ? `Organization Context: ${request.context}`
        : "";
    const audienceStr = request.targetAudience
        ? `Target Audience: ${request.targetAudience}`
        : "";
    const durationStr = request.duration
        ? `Preferred Duration: ${request.duration}`
        : "";

    const prompt = TRAINING_GENERATION_PROMPT
        .replace("{topic}", request.topic)
        .replace("{context}", contextStr)
        .replace("{audience}", audienceStr)
        .replace("{duration}", durationStr);

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Failed to parse training structure from AI response");
        }

        const training: GeneratedTraining = JSON.parse(jsonMatch[0]);
        return training;
    } catch (error) {
        console.error("Training generation error:", error);
        // Return fallback structure
        return {
            title: request.topic,
            description: `Comprehensive training program on ${request.topic}, customized for your organization.`,
            duration: "4-6 hours",
            audience: "All employees",
            objectives: [
                "Understand core concepts and terminology",
                "Apply knowledge to real-world scenarios",
                "Implement best practices",
            ],
            modules: [
                { title: "Introduction & Fundamentals", duration: "45 min", topics: ["Key concepts", "Industry context", "Overview"] },
                { title: "Core Principles", duration: "60 min", topics: ["Best practices", "Standards", "Guidelines"] },
                { title: "Practical Application", duration: "60 min", topics: ["Case studies", "Exercises", "Scenarios"] },
                { title: "Assessment & Certification", duration: "30 min", topics: ["Knowledge check", "Evaluation", "Certificate"] },
            ],
        };
    }
}

// Generate lesson content for a specific module
export async function generateLessonContent(
    moduleTitle: string,
    topics: string[],
    courseContext: string
): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Create detailed lesson content for:
Module: ${moduleTitle}
Topics to cover: ${topics.join(", ")}
Course context: ${courseContext}

Write educational content that is:
- Clear and professional
- Includes practical examples
- Has key takeaways
- Uses markdown formatting with headers

Keep it concise but comprehensive (500-800 words).`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Lesson generation error:", error);
        return `# ${moduleTitle}\n\nContent for this module is being prepared. Please check back soon.`;
    }
}

// Generate quiz questions for assessment
export async function generateQuizQuestions(
    lessonTitle: string,
    content: string,
    count: number = 3
): Promise<Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}>> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Based on this lesson content, generate ${count} multiple-choice quiz questions.

Lesson: ${lessonTitle}
Content summary: ${content.substring(0, 500)}...

Respond in JSON format:
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Why this answer is correct."
  }
]

Make questions that test understanding, not just recall.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error("Failed to parse quiz questions");
        }

        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("Quiz generation error:", error);
        return [{
            question: `What is a key concept from ${lessonTitle}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctIndex: 0,
            explanation: "This demonstrates understanding of the core material."
        }];
    }
}
