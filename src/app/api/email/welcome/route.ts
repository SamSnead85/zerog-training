// Welcome Email API - Sends welcome emails to new users
import { NextRequest, NextResponse } from "next/server";

// Email template - premium styled welcome
function createWelcomeEmailHtml(userName: string, planName?: string) {
    const firstName = userName.split(" ")[0] || "there";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ScaledNative</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding-bottom: 32px;">
                            <span style="font-family: Georgia, serif; font-size: 28px; font-style: italic; color: #ffffff;">
                                ScaledNative<sup style="font-size: 10px;">™</sup>
                            </span>
                        </td>
                    </tr>
                    
                    <!-- Main Content Card -->
                    <tr>
                        <td style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 48px;">
                            <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 16px; font-weight: 600;">
                                Welcome, ${firstName}! 🎉
                            </h1>
                            
                            <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Thank you for joining ScaledNative! You're now part of a community of professionals transforming how they work with AI.
                            </p>
                            
                            ${planName ? `
                            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                                <p style="color: #10b981; font-size: 14px; margin: 0 0 4px; font-weight: 600;">YOUR PLAN</p>
                                <p style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 600;">${planName}</p>
                            </div>
                            ` : ''}
                            
                            <h2 style="color: #ffffff; font-size: 20px; margin: 32px 0 16px; font-weight: 600;">
                                Here's what to do next:
                            </h2>
                            
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 32px; vertical-align: top;">
                                                    <span style="display: inline-block; width: 24px; height: 24px; background: rgba(139, 92, 246, 0.2); border-radius: 50%; text-align: center; line-height: 24px; color: #a78bfa; font-size: 12px; font-weight: 600;">1</span>
                                                </td>
                                                <td style="color: rgba(255,255,255,0.8); font-size: 14px;">
                                                    <strong style="color: #ffffff;">Start with Module 1</strong> - Learn the foundations of AI-Native development
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 32px; vertical-align: top;">
                                                    <span style="display: inline-block; width: 24px; height: 24px; background: rgba(59, 130, 246, 0.2); border-radius: 50%; text-align: center; line-height: 24px; color: #60a5fa; font-size: 12px; font-weight: 600;">2</span>
                                                </td>
                                                <td style="color: rgba(255,255,255,0.8); font-size: 14px;">
                                                    <strong style="color: #ffffff;">Try the interactive labs</strong> - Practice prompt engineering in real-time
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 32px; vertical-align: top;">
                                                    <span style="display: inline-block; width: 24px; height: 24px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; text-align: center; line-height: 24px; color: #34d399; font-size: 12px; font-weight: 600;">3</span>
                                                </td>
                                                <td style="color: rgba(255,255,255,0.8); font-size: 14px;">
                                                    <strong style="color: #ffffff;">Track your progress</strong> - Use your dashboard to see your skill growth
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://scalednative.com/learn/dashboard" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: #ffffff; font-size: 16px; font-weight: 600; padding: 16px 32px; border-radius: 9999px; text-decoration: none;">
                                            Start Learning Now →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding-top: 32px; text-align: center;">
                            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 8px;">
                                Questions? Reply to this email or visit our help center.
                            </p>
                            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">
                                © 2025 ScaledNative™ | Transform Your Workforce into AI-Native Professionals
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, planName } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Check if we have email service credentials configured
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            // Log but don't fail - email is nice-to-have
            console.log("Welcome email skipped - RESEND_API_KEY not configured");
            console.log(`Would have sent welcome email to: ${email}`);
            return NextResponse.json({
                success: true,
                message: "Email skipped - no email service configured",
                preview: true
            });
        }

        // Send email via Resend
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "ScaledNative <welcome@scalednative.com>",
                to: [email],
                subject: "Welcome to ScaledNative! 🚀 Your AI-Native Journey Starts Now",
                html: createWelcomeEmailHtml(name || "there", planName),
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Resend API error:", result);
            return NextResponse.json(
                { error: "Failed to send email", details: result },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            messageId: result.id
        });

    } catch (error) {
        console.error("Welcome email error:", error);
        return NextResponse.json(
            { error: "Failed to send welcome email" },
            { status: 500 }
        );
    }
}
