import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/auth/adminAuth';
import { getPrisma } from '@/lib/db';
import { isEmailConfigured } from '@/lib/email';
import { Resend } from 'resend';

// Lazy initialization of Resend
let resendInstance: Resend | null = null;
function getResend(): Resend {
    if (!resendInstance && process.env.RESEND_API_KEY) {
        resendInstance = new Resend(process.env.RESEND_API_KEY);
    }
    return resendInstance!;
}
const fromAddress = process.env.EMAIL_FROM_ADDRESS || 'ScaledNative <noreply@scalednative.com>';

// POST /api/admin/notifications - Send notifications to users
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
        const { userIds, type, message, ccLeadership = false } = body as {
            userIds: string[];
            type: 'reminder' | 'leadership_alert';
            message?: string;
            ccLeadership?: boolean;
        };

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No users specified' },
                { status: 400 }
            );
        }

        const prisma = getPrisma();

        // Get users (scoped to org for non-super admins)
        const whereClause: Record<string, unknown> = {
            id: { in: userIds },
        };

        if (!context.isSuperAdmin) {
            whereClause.organizationId = context.organizationId;
        }

        const users = await prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                email: true,
                organization: {
                    select: { name: true },
                },
            },
        });

        if (users.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No valid users found' },
                { status: 404 }
            );
        }

        if (!isEmailConfigured()) {
            return NextResponse.json({
                success: false,
                error: 'Email service not configured',
            }, { status: 503 });
        }

        // Send reminder emails
        const results = [];
        const baseUrl = process.env.NEXTAUTH_URL || 'https://scalednative.com';

        for (const user of users) {
            try {
                const subject = type === 'reminder'
                    ? `Training Reminder - ${user.organization?.name || 'ScaledNative'}`
                    : `Training Progress Alert`;

                const htmlContent = `
                    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #fff;">
                        <div style="text-align: center; margin-bottom: 32px;">
                            <h1 style="font-size: 24px; font-weight: 600; margin: 0; background: linear-gradient(135deg, #64748b, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                ScaledNative
                            </h1>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
                            <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #fff;">
                                ${type === 'reminder' ? 'Training Reminder' : 'Training Alert'}
                            </h2>
                            
                            <p style="color: #94a3b8; margin: 0 0 24px 0; line-height: 1.6;">
                                Hi ${user.name || 'there'},
                            </p>
                            
                            <p style="color: #94a3b8; margin: 0 0 24px 0; line-height: 1.6;">
                                ${message || 'You have outstanding training modules that require your attention. Please log in to continue your progress.'}
                            </p>
                            
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="${baseUrl}/training" 
                                   style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #475569, #64748b); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600;">
                                    Continue Training
                                </a>
                            </div>
                            
                            <p style="color: #64748b; font-size: 14px; margin: 0;">
                                If you have any questions, please contact your administrator.
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 24px; color: #64748b; font-size: 12px;">
                            <p>ScaledNative - Enterprise AI Training</p>
                        </div>
                    </div>
                `;

                await getResend().emails.send({
                    from: fromAddress,
                    to: user.email,
                    subject,
                    html: htmlContent,
                });

                results.push({ email: user.email, status: 'sent' });
            } catch (err) {
                console.error(`Failed to send email to ${user.email}:`, err);
                results.push({
                    email: user.email,
                    status: 'failed',
                    error: err instanceof Error ? err.message : 'Unknown error',
                });
            }
        }

        const sent = results.filter(r => r.status === 'sent').length;
        const failed = results.filter(r => r.status === 'failed').length;

        return NextResponse.json({
            success: true,
            summary: {
                sent,
                failed,
                total: results.length,
            },
            results,
        });
    } catch (error) {
        console.error('Notification error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send notifications' },
            { status: 500 }
        );
    }
}
