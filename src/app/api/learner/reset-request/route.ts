import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// POST - Request password reset
export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Find user
        const user = await prisma.individualUser.findUnique({
            where: { email: email.toLowerCase() },
        });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json({
                success: true,
                message: "If an account exists with this email, you will receive a reset link."
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Store reset token (we'll add these fields to the schema)
        await prisma.individualUser.update({
            where: { id: user.id },
            data: {
                resetToken: resetTokenHash,
                resetTokenExpiry,
            },
        });

        // In production, send email here
        // For now, log the reset URL (in dev)
        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://scalednative.com"}/learn/reset-password?token=${resetToken}`;
        console.log("[Password Reset] Reset URL:", resetUrl);

        // TODO: Integrate with email provider (SendGrid, Resend, etc.)
        // await sendPasswordResetEmail(user.email, user.name, resetUrl);

        return NextResponse.json({
            success: true,
            message: "If an account exists with this email, you will receive a reset link.",
            // DEV ONLY - remove in production
            ...(process.env.NODE_ENV === "development" && { _devResetUrl: resetUrl }),
        });
    } catch (error) {
        console.error("[Password Reset Request Error]:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
