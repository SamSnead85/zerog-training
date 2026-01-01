import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

async function getLearnerFromSession(request: NextRequest) {
    const sessionToken = request.cookies.get("learner_session")?.value;
    if (!sessionToken) return null;

    const session = await getPrisma().individualSession.findUnique({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) return null;
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

        // Get all completed purchases
        const purchases = await getPrisma().purchase.findMany({
            where: {
                userId: user.id,
                status: "COMPLETED",
            },
            include: {
                courseProduct: true,
                trackProduct: true,
            },
            orderBy: { purchasedAt: "desc" },
        });

        // Extract purchased course IDs
        const purchasedCourseIds: string[] = [];

        for (const purchase of purchases) {
            if (purchase.courseProduct) {
                purchasedCourseIds.push(purchase.courseProduct.courseId);
            }
            if (purchase.trackProduct) {
                // Tracks include multiple courses
                purchasedCourseIds.push(...purchase.trackProduct.courseIds);
            }
        }

        // Get unique course IDs
        const uniqueCourseIds = [...new Set(purchasedCourseIds)];

        return NextResponse.json({
            success: true,
            purchases: purchases.map(p => ({
                id: p.id,
                type: p.type,
                courseId: p.courseProduct?.courseId,
                courseTitle: p.courseProduct?.title,
                trackId: p.trackProduct?.trackId,
                trackTitle: p.trackProduct?.title,
                amountPaid: p.amountPaid,
                purchasedAt: p.purchasedAt,
            })),
            accessibleCourseIds: uniqueCourseIds,
        });
    } catch (error) {
        console.error("Get purchases error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to get purchases" },
            { status: 500 }
        );
    }
}
