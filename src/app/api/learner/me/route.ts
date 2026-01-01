import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

// Helper to get current learner from session
export async function getLearnerFromSession(request: NextRequest) {
    const sessionToken = request.cookies.get("learner_session")?.value;

    if (!sessionToken) {
        return null;
    }

    const session = await getPrisma().individualSession.findUnique({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
        // Clean up expired session
        if (session) {
            await getPrisma().individualSession.delete({ where: { id: session.id } });
        }
        return null;
    }

    return session.user;
}

export async function GET(request: NextRequest) {
    try {
        const user = await getLearnerFromSession(request);

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Get user's purchases
        const purchases = await getPrisma().purchase.findMany({
            where: {
                userId: user.id,
                status: "COMPLETED"
            },
            include: {
                courseProduct: true,
                trackProduct: true,
            }
        });

        // Get user's progress
        const progress = await getPrisma().individualProgress.findMany({
            where: { userId: user.id }
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                xp: user.xp,
                streakDays: user.streakDays,
                createdAt: user.createdAt,
            },
            purchases: purchases.map(p => ({
                id: p.id,
                type: p.type,
                courseId: p.courseProduct?.courseId,
                trackId: p.trackProduct?.trackId,
                purchasedAt: p.purchasedAt,
            })),
            progress,
        });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to get user data" },
            { status: 500 }
        );
    }
}
