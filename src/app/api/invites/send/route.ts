import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { emails, message, inviterName } = await request.json();

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json(
                { error: "Please provide at least one email address" },
                { status: 400 }
            );
        }

        // Validate emails
        const validEmails = emails.filter((e: string) => e && e.includes("@"));
        if (validEmails.length === 0) {
            return NextResponse.json(
                { error: "Please provide valid email addresses" },
                { status: 400 }
            );
        }

        // In production, send invite emails via Resend
        // For now, log and simulate success
        console.log(`Invites from ${inviterName}:`, validEmails);
        console.log(`Message: ${message}`);

        // TODO: Send emails and track invites
        // for (const email of validEmails) {
        //     await sendInviteEmail({ to: email, from: inviterName, message });
        //     await prisma.invite.create({
        //         data: { email, inviterName, sentAt: new Date() }
        //     });
        // }

        return NextResponse.json({
            success: true,
            sent: validEmails.length,
            message: `Successfully sent ${validEmails.length} invite(s)`
        });

    } catch (error) {
        console.error("Invite send error:", error);
        return NextResponse.json(
            { error: "Failed to send invites. Please try again." },
            { status: 500 }
        );
    }
}
