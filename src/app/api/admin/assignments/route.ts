import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess, getOrgFilter } from '@/lib/auth/adminAuth';
import { createAssignment, getAssignmentsByOrganization } from '@/lib/db';

// GET /api/admin/assignments - List assignments
export async function GET(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request, ['SUPER_ADMIN', 'ORG_ADMIN', 'MANAGER']);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const orgFilter = getOrgFilter(context);
        const assignments = await getAssignmentsByOrganization(orgFilter);

        return NextResponse.json({ success: true, assignments });
    } catch (error) {
        console.error('Get assignments error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch assignments' },
            { status: 500 }
        );
    }
}

// POST /api/admin/assignments - Create bulk assignment
export async function POST(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request, ['SUPER_ADMIN', 'ORG_ADMIN', 'MANAGER']);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { userIds, moduleIds, dueDate, isRequired } = body;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return NextResponse.json(
                { success: false, error: 'At least one user must be selected' },
                { status: 400 }
            );
        }

        if (!moduleIds || !Array.isArray(moduleIds) || moduleIds.length === 0) {
            return NextResponse.json(
                { success: false, error: 'At least one module must be selected' },
                { status: 400 }
            );
        }

        // Create assignments for each module/user combination
        const results = [];
        for (const moduleId of moduleIds) {
            const assignment = await createAssignment({
                moduleId,
                userIds,
                organizationId: context.organizationId,
                assignedById: context.userId,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                isRequired: isRequired !== false,
            });
            results.push(assignment);
        }

        return NextResponse.json({
            success: true,
            message: `Created ${results.length} assignment(s) for ${userIds.length} user(s)`,
            assignments: results,
        });
    } catch (error) {
        console.error('Create assignment error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create assignments' },
            { status: 500 }
        );
    }
}
