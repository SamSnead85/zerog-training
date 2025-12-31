import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess, getOrgFilter } from '@/lib/auth/adminAuth';
import { getUserByEmail, updateUser, deleteUser } from '@/lib/db';

// GET /api/admin/users/[id] - Get single user
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const context = await verifyAdminAccess(request);
        if (!context) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const user = await getUserById(id);

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Check org access
        if (!context.isSuperAdmin && user.organizationId !== context.organizationId) {
            return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                organizationId: user.organizationId,
                lastLoginAt: user.lastLoginAt,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
    }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const context = await verifyAdminAccess(request);
        if (!context) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, role } = body;

        const existingUser = await getUserById(id);
        if (!existingUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Check org access
        if (!context.isSuperAdmin && existingUser.organizationId !== context.organizationId) {
            return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 });
        }

        // Only SUPER_ADMIN can promote to ORG_ADMIN
        if (role === 'ORG_ADMIN' && !context.isSuperAdmin) {
            return NextResponse.json({ success: false, error: 'Only super admins can assign org admin role' }, { status: 403 });
        }

        const updated = await updateUser(id, { name, role });

        return NextResponse.json({
            success: true,
            user: {
                id: updated.id,
                email: updated.email,
                name: updated.name,
                role: updated.role,
            },
        });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
    }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const context = await verifyAdminAccess(request);
        if (!context) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Prevent self-deletion
        if (id === context.userId) {
            return NextResponse.json({ success: false, error: 'Cannot delete your own account' }, { status: 400 });
        }

        const existingUser = await getUserById(id);
        if (!existingUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Check org access
        if (!context.isSuperAdmin && existingUser.organizationId !== context.organizationId) {
            return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 });
        }

        await deleteUser(id);

        return NextResponse.json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 });
    }
}

// Helper to get user by ID (add to db/index.ts later)
async function getUserById(id: string) {
    const { PrismaClient } = await import('@prisma/client');
    const { PrismaPg } = await import('@prisma/adapter-pg');
    const { Pool } = await import('pg');

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    return prisma.user.findUnique({
        where: { id },
        include: { organization: true },
    });
}
