/**
 * Email Service for ScaledNative Training Platform
 * 
 * Provides email notification functionality for:
 * - Welcome emails with login credentials
 * - Invite emails with registration links
 * - Password reset emails
 * - Course assignment notifications
 */

import { Resend } from 'resend';

// Initialize Resend client (lazy loaded)
let resendClient: Resend | null = null;

function getResend(): Resend {
    if (!resendClient) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error('RESEND_API_KEY environment variable is not set');
        }
        resendClient = new Resend(apiKey);
    }
    return resendClient;
}

// Configuration
const FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || 'ScaledNative <noreply@scalednative.com>';
const APP_URL = process.env.NEXTAUTH_URL || 'https://scalednative.com';

// =============================================================================
// EMAIL TEMPLATES
// =============================================================================

interface WelcomeEmailData {
    userName: string;
    userEmail: string;
    temporaryPassword: string;
    organizationName: string;
    loginUrl?: string;
}

interface InviteEmailData {
    inviterName: string;
    organizationName: string;
    inviteCode: string;
    inviteUrl: string;
    recipientEmail: string;
}

interface AssignmentEmailData {
    userName: string;
    userEmail: string;
    moduleTitle: string;
    dueDate?: string;
    assignedByName: string;
    moduleUrl: string;
}

interface PasswordResetEmailData {
    userName: string;
    userEmail: string;
    resetToken: string;
    resetUrl: string;
}

// =============================================================================
// EMAIL SENDING FUNCTIONS
// =============================================================================

/**
 * Send welcome email to newly created user with their login credentials
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<{ success: boolean; error?: string }> {
    try {
        const resend = getResend();
        const loginUrl = data.loginUrl || `${APP_URL}/login`;

        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.userEmail,
            subject: `Welcome to ${data.organizationName} Training on ScaledNative`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Welcome to ScaledNative</h1>
        <p style="color: #a0a0b0; margin: 12px 0 0 0; font-size: 16px;">AI-Native Training Platform</p>
    </div>
    
    <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
        <p style="margin: 0 0 16px 0; font-size: 16px;">Hi <strong>${data.userName}</strong>,</p>
        
        <p style="margin: 0 0 16px 0;">Your account has been created for <strong>${data.organizationName}</strong> on the ScaledNative training platform. You're now ready to begin your AI-Native learning journey.</p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 12px 0; font-weight: 600; color: #1a1a2e;">Your Login Credentials</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${data.userEmail}</p>
            <p style="margin: 0;"><strong>Temporary Password:</strong> <code style="background: #e9ecef; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${data.temporaryPassword}</code></p>
        </div>
        
        <p style="margin: 0 0 24px 0; color: #666; font-size: 14px;">⚠️ Please change your password after your first login for security.</p>
        
        <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #00D9FF 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Login to Your Account</a>
    </div>
    
    <div style="text-align: center; color: #888; font-size: 12px;">
        <p style="margin: 0;">ScaledNative — Enterprise AI-Native Training</p>
        <p style="margin: 8px 0 0 0;">If you didn't expect this email, please contact your administrator.</p>
    </div>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Failed to send welcome email:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Error sending welcome email:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
}

/**
 * Send invite email with registration link
 */
export async function sendInviteEmail(data: InviteEmailData): Promise<{ success: boolean; error?: string }> {
    try {
        const resend = getResend();

        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.recipientEmail,
            subject: `${data.inviterName} invited you to join ${data.organizationName} on ScaledNative`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">You're Invited!</h1>
        <p style="color: #a0a0b0; margin: 12px 0 0 0; font-size: 16px;">Join ${data.organizationName} on ScaledNative</p>
    </div>
    
    <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
        <p style="margin: 0 0 16px 0; font-size: 16px;"><strong>${data.inviterName}</strong> has invited you to join <strong>${data.organizationName}</strong> on the ScaledNative AI-Native training platform.</p>
        
        <p style="margin: 0 0 24px 0;">Click the button below to create your account and start learning:</p>
        
        <a href="${data.inviteUrl}" style="display: inline-block; background: linear-gradient(135deg, #00D9FF 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Accept Invitation</a>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-top: 24px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Or use this invite code:</p>
            <p style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 4px; font-family: monospace;">${data.inviteCode}</p>
        </div>
    </div>
    
    <div style="text-align: center; color: #888; font-size: 12px;">
        <p style="margin: 0;">This invitation will expire in 7 days.</p>
        <p style="margin: 8px 0 0 0;">ScaledNative — Enterprise AI-Native Training</p>
    </div>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Failed to send invite email:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Error sending invite email:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
}

/**
 * Send course assignment notification email
 */
export async function sendAssignmentEmail(data: AssignmentEmailData): Promise<{ success: boolean; error?: string }> {
    try {
        const resend = getResend();

        const dueDateText = data.dueDate
            ? `<p style="margin: 0 0 16px 0;"><strong>Due Date:</strong> ${data.dueDate}</p>`
            : '';

        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.userEmail,
            subject: `New Training Assignment: ${data.moduleTitle}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">New Assignment</h1>
        <p style="color: #a0a0b0; margin: 12px 0 0 0; font-size: 16px;">You have a new training module to complete</p>
    </div>
    
    <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
        <p style="margin: 0 0 16px 0; font-size: 16px;">Hi <strong>${data.userName}</strong>,</p>
        
        <p style="margin: 0 0 16px 0;"><strong>${data.assignedByName}</strong> has assigned you a new training module:</p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 18px; color: #1a1a2e;">${data.moduleTitle}</p>
            ${dueDateText}
        </div>
        
        <a href="${data.moduleUrl}" style="display: inline-block; background: linear-gradient(135deg, #00D9FF 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Start Training</a>
    </div>
    
    <div style="text-align: center; color: #888; font-size: 12px;">
        <p style="margin: 0;">ScaledNative — Enterprise AI-Native Training</p>
    </div>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Failed to send assignment email:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Error sending assignment email:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(data: PasswordResetEmailData): Promise<{ success: boolean; error?: string }> {
    try {
        const resend = getResend();

        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.userEmail,
            subject: 'Reset Your ScaledNative Password',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Password Reset</h1>
        <p style="color: #a0a0b0; margin: 12px 0 0 0; font-size: 16px;">ScaledNative Training Platform</p>
    </div>
    
    <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
        <p style="margin: 0 0 16px 0; font-size: 16px;">Hi <strong>${data.userName}</strong>,</p>
        
        <p style="margin: 0 0 16px 0;">We received a request to reset your password. Click the button below to create a new password:</p>
        
        <a href="${data.resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #00D9FF 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Reset Password</a>
        
        <p style="margin: 24px 0 0 0; color: #666; font-size: 14px;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
    </div>
    
    <div style="text-align: center; color: #888; font-size: 12px;">
        <p style="margin: 0;">ScaledNative — Enterprise AI-Native Training</p>
    </div>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Failed to send password reset email:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Error sending password reset email:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Generate a secure temporary password
 */
export function generateTemporaryPassword(length: number = 12): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
    return !!process.env.RESEND_API_KEY;
}
