import { NextRequest, NextResponse } from "next/server";

// API route to fetch a certificate by ID or verification code
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // In production, this would fetch from the database
        // For now, we'll check if it's a valid format and return demo data
        // The actual implementation should:
        // 1. Query the Certificate table in Supabase
        // 2. Join with User and TrainingModule tables
        // 3. Return the certificate data

        // Import Prisma and fetch from database
        // const { getPrisma } = await import("@/lib/db");
        // const certificate = await getPrisma().certificate.findFirst({
        //     where: {
        //         OR: [
        //             { id },
        //             { verificationCode: id }
        //         ]
        //     },
        //     include: {
        //         user: true,
        //         module: true
        //     }
        // });

        // For now, return a demo certificate for testing
        // In production, replace this with actual database query
        if (id && id.length > 5) {
            const certificate = {
                certificateId: id,
                recipientName: "Demo User",
                trackName: "AI-Native Foundation Track",
                certificationTitle: "ScaledNative Certified AI-Native Professional",
                issueDate: new Date().toISOString(),
                expiryDate: undefined,
                completionScore: 92,
                totalHours: 40,
                modulesCompleted: 8,
                skills: [
                    "Prompt Engineering",
                    "RAG Implementation",
                    "AI Agent Design",
                    "LLM Security",
                    "Context Engineering",
                    "Production AI Deployment"
                ],
                credentialUrl: `https://scalednative.com/verify/${id}`,
                organizationName: "ScaledNative",
            };

            return NextResponse.json({
                success: true,
                certificate,
            });
        }

        return NextResponse.json(
            { success: false, error: "Certificate not found" },
            { status: 404 }
        );
    } catch (error) {
        console.error("Certificate fetch error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch certificate" },
            { status: 500 }
        );
    }
}
