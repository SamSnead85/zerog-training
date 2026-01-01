import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// POST - Reset password with token
export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
        }

        // Hash the token to compare with stored hash
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        // Find user with valid reset token
        const user = await prisma.individualUser.findFirst({
            where: {
                resetToken: tokenHash,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, 12);

        // Update password and clear reset token
        await prisma.individualUser.update({
            where: { id: user.id },
            data: {
                passwordHash,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Password has been reset successfully"
        });
    } catch (error) {
        console.error("[Password Reset Error]:", error);
        return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
    }
}
