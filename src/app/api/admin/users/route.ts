import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess, getOrgFilter } from '@/lib/auth/adminAuth';
import { createUser, getAllUsers, getPrisma } from '@/lib/db';
import { UserRole } from '@prisma/client';
import { sendWelcomeEmail, generateTemporaryPassword, isEmailConfigured } from '@/lib/email';

// GET /api/admin/users - List all users (scoped by organization)
export async function GET(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const orgFilter = getOrgFilter(context);
        const users = await getAllUsers(orgFilter);

        // Remove password hashes from response
        const safeUsers = users.map(u => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            organizationId: u.organizationId,
            organizationName: u.organization?.name,
            lastLoginAt: u.lastLoginAt,
            createdAt: u.createdAt,
        }));

        return NextResponse.json({ success: true, users: safeUsers });
    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST /api/admin/users - Create new user and optionally send welcome email
export async function POST(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { email, name, password, role, organizationId, sendWelcome = true } = body;

        if (!email || !name) {
            return NextResponse.json(
                { success: false, error: 'Email and name are required' },
                { status: 400 }
            );
        }

        // Validate role
        const validRoles: UserRole[] = ['LEARNER', 'MANAGER', 'CREATOR', 'ORG_ADMIN'];
        if (role && !validRoles.includes(role)) {
            return NextResponse.json(
                { success: false, error: 'Invalid role' },
                { status: 400 }
            );
        }

        // Only SUPER_ADMIN can assign to different organizations
        const targetOrgId = context.isSuperAdmin && organizationId
            ? organizationId
            : context.organizationId;

        // Only SUPER_ADMIN can create ORG_ADMIN users
        const targetRole = role || 'LEARNER';
        if (targetRole === 'ORG_ADMIN' && !context.isSuperAdmin) {
            return NextResponse.json(
                { success: false, error: 'Only super admins can create org admins' },
                { status: 403 }
            );
        }

        // Generate temporary password if not provided
        const userPassword = password || generateTemporaryPassword();

        // Get organization name for email
        const organization = await getPrisma().organization.findUnique({
            where: { id: targetOrgId },
            select: { name: true },
        });

        const user = await createUser({
            email,
            name,
            password: userPassword,
            role: targetRole as UserRole,
            organizationId: targetOrgId,
        });

        // Send welcome email if requested and email service is configured
        let emailSent = false;
        let emailError: string | undefined;

        if (sendWelcome && isEmailConfigured()) {
            const result = await sendWelcomeEmail({
                userName: name,
                userEmail: email,
                temporaryPassword: userPassword,
                organizationName: organization?.name || 'ScaledNative',
            });
            emailSent = result.success;
            emailError = result.error;
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                organizationId: user.organizationId,
                createdAt: user.createdAt,
            },
            emailSent,
            emailError,
            // Only include password in response if email was NOT sent (for manual delivery)
            temporaryPassword: emailSent ? undefined : userPassword,
        });
    } catch (error: unknown) {
        console.error('Create user error:', error);

        // Check for unique constraint violation
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { success: false, error: 'A user with this email already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
