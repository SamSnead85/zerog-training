import { NextRequest, NextResponse } from "next/server";

// Lazy load Prisma to avoid build-time errors when DB not configured
async function getPrisma() {
    try {
        const { prisma } = await import("@/lib/prisma");
        return prisma;
    } catch {
        return null;
    }
}

/**
 * GET /api/trainings
 * Returns trainings scoped to the user's organization
 * Production: Uses Prisma database | Demo: In-memory fallback
 */
export async function GET(request: NextRequest) {
    try {
        const userHeader = request.headers.get("x-user");
        if (!userHeader) {
            return NextResponse.json(
                { error: "Unauthorized", trainings: [] },
                { status: 401 }
            );
        }

        const user = JSON.parse(userHeader);
        const orgId = user.organizationId;
        const isSuperAdmin = user.role === "SUPER_ADMIN";

        // Check if database is available (not local dev)
        const useDatabase = process.env.DATABASE_URL &&
            !process.env.DATABASE_URL.includes("localhost") &&
            !process.env.DATABASE_URL.includes("51213");

        if (useDatabase) {
            const prisma = await getPrisma();
            if (prisma) {
                try {
                    const trainings = await prisma.trainingModule.findMany({
                        where: isSuperAdmin ? {} : { organizationId: orgId },
                        orderBy: { createdAt: "desc" },
                    });

                    return NextResponse.json({
                        trainings: trainings.map(t => ({
                            id: t.id,
                            title: t.title,
                            description: t.description,
                            createdAt: t.createdAt.toISOString(),
                            updatedAt: t.updatedAt.toISOString(),
                            status: t.isPublished ? "published" : "draft",
                            duration: `${t.estimatedDurationMinutes || 30} min`,
                            sections: [],
                            category: t.category,
                            organizationId: t.organizationId,
                            creatorId: t.creatorId,
                            creatorName: "Team Member",
                        })),
                        count: trainings.length,
                        organizationId: orgId,
                        source: "database",
                    });
                } catch (dbError) {
                    console.error("Database error, falling back to demo mode:", dbError);
                }
            }
        }

        // Demo mode: Return empty (trainings stored in localStorage client-side)
        return NextResponse.json({
            trainings: [],
            count: 0,
            organizationId: orgId,
            source: "demo",
        });
    } catch (error) {
        console.error("Error fetching trainings:", error);
        return NextResponse.json(
            { error: "Failed to fetch trainings", trainings: [] },
            { status: 500 }
        );
    }
}

/**
 * POST /api/trainings
 * Creates a new training scoped to the user's organization
 */
export async function POST(request: NextRequest) {
    try {
        const userHeader = request.headers.get("x-user");
        if (!userHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(userHeader);
        const orgId = user.organizationId;

        const canCreate = ["SUPER_ADMIN", "ORG_ADMIN", "CREATOR", "MANAGER"].includes(user.role);
        if (!canCreate) {
            return NextResponse.json(
                { error: "You don't have permission to create trainings" },
                { status: 403 }
            );
        }

        const body = await request.json();

        const useDatabase = process.env.DATABASE_URL &&
            !process.env.DATABASE_URL.includes("localhost") &&
            !process.env.DATABASE_URL.includes("51213");

        if (useDatabase) {
            const prisma = await getPrisma();
            if (prisma) {
                try {
                    const training = await prisma.trainingModule.create({
                        data: {
                            title: body.title,
                            description: body.description || "",
                            isPublished: body.status !== "draft",
                            estimatedDurationMinutes: parseInt(body.duration) || 45,
                            category: body.category,
                            organizationId: orgId,
                            creatorId: user.id,
                        },
                    });

                    return NextResponse.json({
                        success: true,
                        training: {
                            id: training.id,
                            title: training.title,
                            description: training.description,
                            createdAt: training.createdAt.toISOString(),
                            updatedAt: training.updatedAt.toISOString(),
                            status: training.isPublished ? "published" : "draft",
                            duration: `${training.estimatedDurationMinutes} min`,
                            sections: body.sections || [],
                            category: training.category,
                            organizationId: training.organizationId,
                            creatorId: training.creatorId,
                            creatorName: user.name,
                        },
                        source: "database",
                    });
                } catch (dbError) {
                    console.error("Database error:", dbError);
                }
            }
        }

        // Demo mode fallback
        return NextResponse.json({
            success: true,
            training: {
                id: `training-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                title: body.title,
                description: body.description || "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: body.status || "published",
                duration: body.duration || "45 min",
                sections: body.sections || [],
                category: body.category,
                organizationId: orgId,
                creatorId: user.id,
                creatorName: user.name,
            },
            source: "demo",
        });
    } catch (error) {
        console.error("Error creating training:", error);
        return NextResponse.json({ error: "Failed to create training" }, { status: 500 });
    }
}
