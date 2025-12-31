import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess, getOrgFilter } from '@/lib/auth/adminAuth';
import { getProgressByOrganization } from '@/lib/db';

// GET /api/admin/progress - Get team progress data
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

        // Get query params for filtering
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const moduleId = searchParams.get('moduleId');
        const status = searchParams.get('status');

        const progress = await getProgressByOrganization(orgFilter, {
            userId: userId || undefined,
            moduleId: moduleId || undefined,
            status: status || undefined,
        });

        return NextResponse.json({ success: true, progress });
    } catch (error) {
        console.error('Get progress error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch progress data' },
            { status: 500 }
        );
    }
}
