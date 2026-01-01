import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        // In production, integrate with email service (Resend, Mailchimp, etc.)
        // For now, log and simulate success
        console.log(`Newsletter subscription: ${email}`);

        // TODO: Add to email list via Resend or database
        // await prisma.newsletterSubscriber.create({
        //     data: { email, subscribedAt: new Date() }
        // });

        return NextResponse.json({
            success: true,
            message: "Subscription successful"
        });

    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}
