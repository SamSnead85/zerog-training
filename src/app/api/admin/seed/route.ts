import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/adminAuth";
import { seedCurriculumModules, seedTestUserProgress } from "@/lib/db";

// POST /api/admin/seed - Trigger database seeding
export async function POST(request: NextRequest) {
    // Verify admin access
    const auth = await verifyAdminAccess(request, ["SUPER_ADMIN"]);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json().catch(() => ({}));
        const { action } = body;

        const results: Record<string, unknown> = {};

        if (action === "all" || action === "modules") {
            // Seed curriculum modules
            const modules = await seedCurriculumModules();
            results.modules = { seeded: true, count: modules?.length || 0 };
        }

        if (action === "all" || action === "progress") {
            // Seed test user progress (this calls seedCurriculumModules internally)
            const progress = await seedTestUserProgress();
            results.progress = { seeded: true, count: progress?.length || 0 };
        }

        return NextResponse.json({
            success: true,
            message: "Database seeding completed",
            results,
        });
    } catch (error) {
        console.error("Error seeding database:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to seed database" },
            { status: 500 }
        );
    }
}

// GET /api/admin/seed - Get seeding status
export async function GET(request: NextRequest) {
    // Verify admin access
    const auth = await verifyAdminAccess(request, ["SUPER_ADMIN"]);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
        available: true,
        actions: ["all", "modules", "progress"],
        description: "POST with { action: 'all' } to seed all data",
    });
}
