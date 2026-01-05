import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy initialization of Resend
let resendInstance: Resend | null = null;
function getResend(): Resend | null {
    if (!resendInstance && process.env.RESEND_API_KEY) {
        resendInstance = new Resend(process.env.RESEND_API_KEY);
    }
    return resendInstance;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, companySize, inquiryType, message } = body;

        // Validate required fields
        if (!name || !email || !inquiryType || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Format inquiry type for readability
        const inquiryLabels: Record<string, string> = {
            demo: "Request a Demo",
            enterprise: "Enterprise Sales",
            invoice: "Request Invoice",
            support: "Technical Support",
            partnership: "Partnership Inquiry",
            press: "Press & Media",
            other: "Other",
        };
        const inquiryLabel = inquiryLabels[inquiryType] || inquiryType;

        // Build email content
        const emailHtml = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Inquiry Type:</strong> ${inquiryLabel}</p>
            <hr />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            ${companySize ? `<p><strong>Company Size:</strong> ${companySize}</p>` : ""}
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${message}</p>
            <hr />
            <p style="color: #888; font-size: 12px;">
                Submitted via ScaledNative Contact Form at ${new Date().toISOString()}
            </p>
        `;

        const resend = getResend();

        if (resend) {
            // Send email to sales
            const { error } = await resend.emails.send({
                from: "ScaledNative <notifications@scalednative.com>",
                to: ["sales@scalednative.com"],
                replyTo: email,
                subject: `[${inquiryLabel}] New inquiry from ${name}${company ? ` at ${company}` : ""}`,
                html: emailHtml,
            });

            if (error) {
                console.error("Resend error:", error);
                // Don't fail the request, just log the error
            }

            // Also send a confirmation to the submitter
            await resend.emails.send({
                from: "ScaledNative <notifications@scalednative.com>",
                to: [email],
                subject: "We received your inquiry - ScaledNative",
                html: `
                    <h2>Thank you for contacting ScaledNative</h2>
                    <p>Hi ${name},</p>
                    <p>We received your inquiry and will get back to you within 24 hours.</p>
                    <p><strong>Your message:</strong></p>
                    <blockquote style="border-left: 3px solid #0ea5e9; padding-left: 12px; color: #555;">${message}</blockquote>
                    <p>Best regards,<br />The ScaledNative Team</p>
                    <hr />
                    <p style="color: #888; font-size: 12px;">
                        ScaledNative - Enterprise AI Training Platform<br />
                        <a href="https://scalednative.com">scalednative.com</a>
                    </p>
                `,
            });
        } else {
            // Log to console if Resend is not configured
            console.log("=== CONTACT FORM SUBMISSION ===");
            console.log("Inquiry Type:", inquiryLabel);
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Company:", company || "N/A");
            console.log("Company Size:", companySize || "N/A");
            console.log("Message:", message);
            console.log("===============================");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to process contact form" },
            { status: 500 }
        );
    }
}
