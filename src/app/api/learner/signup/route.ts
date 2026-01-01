import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { success: false, error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await getPrisma().individualUser.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "An account with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await getPrisma().individualUser.create({
            data: {
                email: email.toLowerCase(),
                name: name || null,
                passwordHash,
            }
        });

        // Create session token
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
        console.error("Signup error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create account" },
            { status: 500 }
        );
    }
}
