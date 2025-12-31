import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/auth/adminAuth';
import { getAllOrganizations, createOrganization } from '@/lib/db';

// GET /api/admin/organizations - List all organizations (SUPER_ADMIN only)
export async function GET(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request, ['SUPER_ADMIN']);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized - Super Admin access required' },
                { status: 401 }
            );
        }

        const organizations = await getAllOrganizations();

        return NextResponse.json({ success: true, organizations });
    } catch (error) {
        console.error('Get organizations error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch organizations' },
            { status: 500 }
        );
    }
}

// POST /api/admin/organizations - Create new organization (SUPER_ADMIN only)
export async function POST(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request, ['SUPER_ADMIN']);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized - Super Admin access required' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, slug, industry, tier } = body;

        if (!name || !slug) {
            return NextResponse.json(
                { success: false, error: 'Name and slug are required' },
                { status: 400 }
            );
        }

        const organization = await createOrganization({
            name,
            slug,
            industry,
            tier: tier || 'STARTER',
        });

        return NextResponse.json({ success: true, organization });
    } catch (error: unknown) {
        console.error('Create organization error:', error);

        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { success: false, error: 'An organization with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create organization' },
            { status: 500 }
        );
    }
}
