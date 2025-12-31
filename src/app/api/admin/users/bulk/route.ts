import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/auth/adminAuth';
import { getPrisma } from '@/lib/db';
import { sendWelcomeEmail, generateTemporaryPassword, isEmailConfigured } from '@/lib/email';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

interface UserImportRow {
    email: string;
    name: string;
    role?: string;
}

interface ImportResult {
    email: string;
    status: 'created' | 'skipped' | 'failed';
    error?: string;
}

// POST /api/admin/users/bulk - Bulk import users from CSV/JSON
export async function POST(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request, ['SUPER_ADMIN', 'ORG_ADMIN']);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { users, sendWelcome = true, organizationId } = body as {
            users: UserImportRow[];
            sendWelcome?: boolean;
            organizationId?: string;
        };

        if (!users || !Array.isArray(users) || users.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No users provided' },
                { status: 400 }
            );
        }

        // Limit batch size
        if (users.length > 100) {
            return NextResponse.json(
                { success: false, error: 'Maximum 100 users per import' },
                { status: 400 }
            );
        }

        // Determine target organization
        const targetOrgId = context.isSuperAdmin && organizationId
            ? organizationId
            : context.organizationId;

        // Get organization name for emails
        const prisma = getPrisma();
        const organization = await prisma.organization.findUnique({
            where: { id: targetOrgId },
            select: { name: true },
        });

        if (!organization) {
            return NextResponse.json(
                { success: false, error: 'Organization not found' },
                { status: 404 }
            );
        }

        // Validate all emails first
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = users.filter(u => !emailRegex.test(u.email?.trim() || ''));
        if (invalidEmails.length > 0) {
            return NextResponse.json({
                success: false,
                error: `Invalid email format: ${invalidEmails.map(u => u.email).join(', ')}`,
            }, { status: 400 });
        }

        // Check for duplicates in the import
        const emails = users.map(u => u.email.toLowerCase().trim());
        const duplicateEmails = emails.filter((e, i) => emails.indexOf(e) !== i);
        if (duplicateEmails.length > 0) {
            return NextResponse.json({
                success: false,
                error: `Duplicate emails in import: ${[...new Set(duplicateEmails)].join(', ')}`,
            }, { status: 400 });
        }

        // Get existing users to skip
        const existingUsers = await prisma.user.findMany({
            where: { email: { in: emails } },
            select: { email: true },
        });
        const existingEmails = new Set(existingUsers.map(u => u.email.toLowerCase()));

        // Process each user
        const results: ImportResult[] = [];
        const validRoles: UserRole[] = ['LEARNER', 'MANAGER', 'CREATOR'];

        for (const user of users) {
            const email = user.email.toLowerCase().trim();
            const name = user.name?.trim() || email.split('@')[0];

            // Skip existing users
            if (existingEmails.has(email)) {
                results.push({ email, status: 'skipped', error: 'User already exists' });
                continue;
            }

            // Validate role (ORG_ADMIN can only create LEARNER, MANAGER, CREATOR)
            let role: UserRole = 'LEARNER';
            if (user.role && validRoles.includes(user.role.toUpperCase() as UserRole)) {
                role = user.role.toUpperCase() as UserRole;
            }

            try {
                const tempPassword = generateTemporaryPassword();
                const hashedPassword = await bcrypt.hash(tempPassword, 10);

                await prisma.user.create({
                    data: {
                        email,
                        name,
                        passwordHash: hashedPassword,
                        role,
                        organizationId: targetOrgId,
                    },
                });

                // Send welcome email if configured
                if (sendWelcome && isEmailConfigured()) {
                    // Fire and forget - don't block on email
                    sendWelcomeEmail({
                        userName: name,
                        userEmail: email,
                        temporaryPassword: tempPassword,
                        organizationName: organization.name,
                    }).catch(err => console.error('Failed to send welcome email:', err));
                }

                results.push({ email, status: 'created' });
            } catch (err) {
                console.error(`Failed to create user ${email}:`, err);
                results.push({
                    email,
                    status: 'failed',
                    error: err instanceof Error ? err.message : 'Unknown error',
                });
            }
        }

        const created = results.filter(r => r.status === 'created').length;
        const skipped = results.filter(r => r.status === 'skipped').length;
        const failed = results.filter(r => r.status === 'failed').length;

        return NextResponse.json({
            success: true,
            summary: {
                total: users.length,
                created,
                skipped,
                failed,
            },
            results,
            emailsQueued: sendWelcome && isEmailConfigured() ? created : 0,
        });
    } catch (error) {
        console.error('Bulk import error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process bulk import' },
            { status: 500 }
        );
    }
}
