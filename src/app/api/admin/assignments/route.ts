import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess, getOrgFilter } from '@/lib/auth/adminAuth';
import { createAssignment, getAssignmentsByOrganization, getPrisma } from '@/lib/db';
import { sendAssignmentEmail, isEmailConfigured } from '@/lib/email';

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

// POST /api/admin/assignments - Create bulk assignment and notify users
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
        const { userIds, moduleIds, dueDate, isRequired, sendNotification = true } = body;

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

        // Get assigner's name
        const assigner = await getPrisma().user.findUnique({
            where: { id: context.userId },
            select: { name: true },
        });

        // Get users for email notifications
        const users = await getPrisma().user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, name: true, email: true },
        });

        // Get modules for email notifications
        const modules = await getPrisma().trainingModule.findMany({
            where: { id: { in: moduleIds } },
            select: { id: true, title: true },
        });

        // Create assignments for each module/user combination
        const results = [];
        const emailResults: { email: string; sent: boolean; error?: string }[] = [];

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

        // Send notification emails if requested
        if (sendNotification && isEmailConfigured()) {
            const appUrl = process.env.NEXTAUTH_URL || 'https://scalednative.com';

            for (const user of users) {
                for (const module of modules) {
                    const result = await sendAssignmentEmail({
                        userName: user.name || 'Team Member',
                        userEmail: user.email,
                        moduleTitle: module.title,
                        dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : undefined,
                        assignedByName: assigner?.name || 'Your administrator',
                        moduleUrl: `${appUrl}/training/${module.id}`,
                    });
                    emailResults.push({
                        email: user.email,
                        sent: result.success,
                        error: result.error,
                    });
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Created ${results.length} assignment(s) for ${userIds.length} user(s)`,
            assignments: results,
            emailsSent: emailResults.filter(e => e.sent).length,
            emailErrors: emailResults.filter(e => !e.sent),
        });
    } catch (error) {
        console.error('Create assignment error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create assignments' },
            { status: 500 }
        );
    }
}

