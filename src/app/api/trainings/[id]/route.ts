import { NextRequest, NextResponse } from "next/server";

// Note: This shares the in-memory store with the main route
// In production, this would use Prisma database

/**
 * GET /api/trainings/[id]
 * Get a single training by ID (with org check)
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userHeader = request.headers.get("x-user");

        if (!userHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(userHeader);

        // For demo, we'll return a placeholder
        // In production, fetch from database and verify org access
        return NextResponse.json({
            success: true,
            training: null,
            message: `Training ${id} - implement with database`,
        });
    } catch (error) {
        console.error("Error fetching training:", error);
        return NextResponse.json(
            { error: "Failed to fetch training" },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/trainings/[id]
 * Update a training (org admin or creator only)
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userHeader = request.headers.get("x-user");

        if (!userHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(userHeader);
        const body = await request.json();

        // In production: verify user owns training or is org admin
        return NextResponse.json({
            success: true,
            message: `Training ${id} updated`,
        });
    } catch (error) {
        console.error("Error updating training:", error);
        return NextResponse.json(
            { error: "Failed to update training" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/trainings/[id]
 * Delete a training (org admin or creator only)
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userHeader = request.headers.get("x-user");

        if (!userHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(userHeader);

        // In production: verify user owns training or is org admin, then delete
        return NextResponse.json({
            success: true,
            message: `Training ${id} deleted`,
        });
    } catch (error) {
        console.error("Error deleting training:", error);
        return NextResponse.json(
            { error: "Failed to delete training" },
            { status: 500 }
        );
    }
}
