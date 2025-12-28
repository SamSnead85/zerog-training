/**
 * Email Templates
 * 
 * React-based email templates for transactional emails.
 * Returns HTML string for email sending services.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface EmailTemplateProps {
    previewText?: string;
}

export interface WelcomeEmailProps extends EmailTemplateProps {
    firstName: string;
    loginUrl: string;
}

export interface PasswordResetEmailProps extends EmailTemplateProps {
    firstName: string;
    resetUrl: string;
    expiresIn: string;
}

export interface CourseCompletionEmailProps extends EmailTemplateProps {
    firstName: string;
    courseName: string;
    certificateUrl: string;
    nextCourseUrl?: string;
}

export interface TeamInviteEmailProps extends EmailTemplateProps {
    inviterName: string;
    organizationName: string;
    inviteUrl: string;
    expiresIn: string;
}

export interface ReminderEmailProps extends EmailTemplateProps {
    firstName: string;
    courseName: string;
    progress: number;
    continueUrl: string;
}

// =============================================================================
// BASE STYLES
// =============================================================================

const baseStyles = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
};

const containerStyle = `
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #0a0a0a;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const headerStyle = `
    text-align: center;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 32px;
`;

const logoStyle = `
    font-size: 24px;
    font-weight: bold;
    color: #f59e0b;
    text-decoration: none;
`;

const headingStyle = `
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 16px 0;
    line-height: 1.3;
`;

const paragraphStyle = `
    font-size: 16px;
    color: rgba(255,255,255,0.7);
    line-height: 1.6;
    margin: 0 0 16px 0;
`;

const buttonStyle = `
    display: inline-block;
    background-color: #f59e0b;
    color: #000000;
    padding: 14px 32px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    margin: 24px 0;
`;

const footerStyle = `
    text-align: center;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.1);
    margin-top: 32px;
`;

const smallTextStyle = `
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    margin: 0;
`;

// =============================================================================
// EMAIL WRAPPER
// =============================================================================

function emailWrapper(content: string, previewText?: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ZeroG Training</title>
    ${previewText ? `<span style="display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;visibility:hidden;">${previewText}</span>` : ""}
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;">
    <div style="${containerStyle}">
        <div style="${headerStyle}">
            <a href="https://zerog.ai" style="${logoStyle}">ZeroG</a>
        </div>
        ${content}
        <div style="${footerStyle}">
            <p style="${smallTextStyle}">© ${new Date().getFullYear()} ZeroG Training. All rights reserved.</p>
            <p style="${smallTextStyle}; margin-top: 8px;">
                <a href="https://zerog.ai/unsubscribe" style="color: rgba(255,255,255,0.5); text-decoration: underline;">Unsubscribe</a>
                ·
                <a href="https://zerog.ai/privacy" style="color: rgba(255,255,255,0.5); text-decoration: underline;">Privacy Policy</a>
            </p>
        </div>
    </div>
</body>
</html>
`;
}

// =============================================================================
// TEMPLATES
// =============================================================================

export function welcomeEmail({ firstName, loginUrl, previewText }: WelcomeEmailProps): string {
    const content = `
        <h1 style="${headingStyle}">Welcome to ZeroG, ${firstName}! 🚀</h1>
        <p style="${paragraphStyle}">
            We're thrilled to have you join us. ZeroG is your AI-powered learning platform
            designed to help you and your team develop critical skills faster.
        </p>
        <p style="${paragraphStyle}">
            Here's what you can do to get started:
        </p>
        <ul style="${paragraphStyle}; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Explore our curated learning paths</li>
            <li style="margin-bottom: 8px;">Create custom training modules with AI</li>
            <li style="margin-bottom: 8px;">Track your progress and earn certificates</li>
        </ul>
        <div style="text-align: center;">
            <a href="${loginUrl}" style="${buttonStyle}">Get Started</a>
        </div>
        <p style="${paragraphStyle}; text-align: center;">
            Need help? Our support team is always here for you.
        </p>
    `;

    return emailWrapper(content, previewText || `Welcome to ZeroG, ${firstName}!`);
}

export function passwordResetEmail({ firstName, resetUrl, expiresIn, previewText }: PasswordResetEmailProps): string {
    const content = `
        <h1 style="${headingStyle}">Reset Your Password</h1>
        <p style="${paragraphStyle}">
            Hi ${firstName}, we received a request to reset your password. 
            Click the button below to create a new password.
        </p>
        <div style="text-align: center;">
            <a href="${resetUrl}" style="${buttonStyle}">Reset Password</a>
        </div>
        <p style="${paragraphStyle}; text-align: center;">
            This link will expire in ${expiresIn}.
        </p>
        <p style="${smallTextStyle}; text-align: center;">
            If you didn't request this, you can safely ignore this email.
        </p>
    `;

    return emailWrapper(content, previewText || "Reset your ZeroG password");
}

export function courseCompletionEmail({ firstName, courseName, certificateUrl, nextCourseUrl, previewText }: CourseCompletionEmailProps): string {
    const content = `
        <h1 style="${headingStyle}">Congratulations, ${firstName}! 🎉</h1>
        <p style="${paragraphStyle}">
            You've successfully completed <strong style="color: #f59e0b;">${courseName}</strong>.
            Your dedication to learning is inspiring!
        </p>
        <div style="text-align: center; background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; margin: 24px 0;">
            <p style="${paragraphStyle}; margin-bottom: 16px;">Your certificate is ready!</p>
            <a href="${certificateUrl}" style="${buttonStyle}">View Certificate</a>
        </div>
        ${nextCourseUrl ? `
            <p style="${paragraphStyle}; text-align: center;">
                Ready for your next challenge?
                <a href="${nextCourseUrl}" style="color: #f59e0b; text-decoration: underline;">Continue learning →</a>
            </p>
        ` : ""}
    `;

    return emailWrapper(content, previewText || `Congratulations! You've completed ${courseName}`);
}

export function teamInviteEmail({ inviterName, organizationName, inviteUrl, expiresIn, previewText }: TeamInviteEmailProps): string {
    const content = `
        <h1 style="${headingStyle}">You're Invited!</h1>
        <p style="${paragraphStyle}">
            <strong>${inviterName}</strong> has invited you to join 
            <strong style="color: #f59e0b;">${organizationName}</strong> on ZeroG Training.
        </p>
        <p style="${paragraphStyle}">
            Get access to exclusive training content, track your progress, 
            and develop skills alongside your team.
        </p>
        <div style="text-align: center;">
            <a href="${inviteUrl}" style="${buttonStyle}">Accept Invitation</a>
        </div>
        <p style="${smallTextStyle}; text-align: center;">
            This invitation expires in ${expiresIn}.
        </p>
    `;

    return emailWrapper(content, previewText || `${inviterName} invited you to join ${organizationName}`);
}

export function reminderEmail({ firstName, courseName, progress, continueUrl, previewText }: ReminderEmailProps): string {
    const content = `
        <h1 style="${headingStyle}">Keep the momentum going, ${firstName}!</h1>
        <p style="${paragraphStyle}">
            You're ${progress}% through <strong style="color: #f59e0b;">${courseName}</strong>.
            Just a little more to go!
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin: 24px 0;">
            <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: ${progress}%; background: #f59e0b; border-radius: 4px;"></div>
            </div>
            <p style="${smallTextStyle}; text-align: center; margin-top: 8px;">${progress}% complete</p>
        </div>
        <div style="text-align: center;">
            <a href="${continueUrl}" style="${buttonStyle}">Continue Learning</a>
        </div>
    `;

    return emailWrapper(content, previewText || `Continue your progress in ${courseName}`);
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
    welcomeEmail,
    passwordResetEmail,
    courseCompletionEmail,
    teamInviteEmail,
    reminderEmail,
};
