import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/auth/adminAuth';
import { sendInviteEmail, isEmailConfigured } from '@/lib/email';
import { getPrisma } from '@/lib/db';

// Generate a unique invite code
function generateInviteCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// POST /api/admin/invite - Send email invitation to join organization
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
        const { email, organizationId } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Determine target organization
        const targetOrgId = context.isSuperAdmin && organizationId
            ? organizationId
            : context.organizationId;

        // Get organization details
        const organization = await getPrisma().organization.findUnique({
            where: { id: targetOrgId },
            select: { name: true, slug: true },
        });

        if (!organization) {
            return NextResponse.json(
                { success: false, error: 'Organization not found' },
                { status: 404 }
            );
        }

        // Get inviter's name
        const inviter = await getPrisma().user.findUnique({
            where: { id: context.userId },
            select: { name: true },
        });

        // Generate invite code
        const inviteCode = generateInviteCode();
        const inviteUrl = `${process.env.NEXTAUTH_URL || 'https://scalednative.com'}/join/${inviteCode}`;

        // Store invite in database (create a simple invite record)
        // For now, we'll use the TrialCode model as it has similar structure
        await getPrisma().trialCode.create({
            data: {
                code: inviteCode,
                description: `Invite for ${email} to ${organization.name}`,
                maxUses: 1,
                maxUsers: 1,
                maxModules: 10,
                durationDays: 7, // Invite expires in 7 days
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                createdById: context.userId,
                organizationId: targetOrgId,
            },
        });

        // Send email if configured
        let emailSent = false;
        let emailError: string | undefined;

        if (isEmailConfigured()) {
            const result = await sendInviteEmail({
                inviterName: inviter?.name || 'Your administrator',
                organizationName: organization.name,
                inviteCode,
                inviteUrl,
                recipientEmail: email,
            });
            emailSent = result.success;
            emailError = result.error;
        }

        return NextResponse.json({
            success: true,
            inviteCode,
            inviteUrl,
            emailSent,
            emailError,
        });
    } catch (error) {
        console.error('Send invite error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send invite' },
            { status: 500 }
        );
    }
}
