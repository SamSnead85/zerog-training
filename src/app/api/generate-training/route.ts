import { NextRequest, NextResponse } from "next/server";
import { generateTraining, type TrainingRequest } from "@/lib/ai/gemini-service";

export async function POST(request: NextRequest) {
    try {
        const body: TrainingRequest = await request.json();

        if (!body.topic || body.topic.trim().length === 0) {
            return NextResponse.json(
                { error: "Topic is required" },
                { status: 400 }
            );
        }

        const training = await generateTraining(body);

        return NextResponse.json(training);
    } catch (error) {
        console.error("Training generation API error:", error);
        return NextResponse.json(
            { error: "Failed to generate training. Please try again." },
            { status: 500 }
        );
    }
}
