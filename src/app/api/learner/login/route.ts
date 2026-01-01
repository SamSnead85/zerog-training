import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user
        const user = await getPrisma().individualUser.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user || !user.passwordHash) {
            return NextResponse.json(
                { success: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Update last active
        await getPrisma().individualUser.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() }
        });

        // Create new session token
        const sessionToken = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        await getPrisma().individualSession.create({
            data: {
                token: sessionToken,
                userId: user.id,
                expiresAt,
            }
        });

        // Set cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                xp: user.xp,
                streakDays: user.streakDays,
            }
        });

        response.cookies.set("learner_session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to log in" },
            { status: 500 }
        );
    }
}
