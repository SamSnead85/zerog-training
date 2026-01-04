// Google OAuth Callback - Handles the return from Google
import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import crypto from "crypto";

interface GoogleTokenResponse {
    access_token: string;
    id_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token?: string;
}

interface GoogleUserInfo {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // Handle OAuth errors
    if (error) {
        console.error("Google OAuth error:", error);
        return NextResponse.redirect(
            new URL(`/learn/login?error=${error}`, request.url)
        );
    }

    if (!code) {
        return NextResponse.redirect(
            new URL("/learn/login?error=no_code", request.url)
        );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.redirect(
            new URL("/learn/login?error=oauth_not_configured", request.url)
        );
    }

    try {
        // Exchange code for tokens
        const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://scalednative.com'}/api/learner/oauth/google/callback`;

        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();
            console.error("Token exchange failed:", errorData);
            return NextResponse.redirect(
                new URL("/learn/login?error=token_exchange_failed", request.url)
            );
        }

        const tokens: GoogleTokenResponse = await tokenResponse.json();

        // Get user info from Google
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        if (!userInfoResponse.ok) {
            return NextResponse.redirect(
                new URL("/learn/login?error=user_info_failed", request.url)
            );
        }

        const googleUser: GoogleUserInfo = await userInfoResponse.json();

        // Find or create user in our database
        let user = await getPrisma().individualUser.findUnique({
            where: { email: googleUser.email.toLowerCase() }
        });

        if (!user) {
            // Create new user from Google profile
            user = await getPrisma().individualUser.create({
                data: {
                    email: googleUser.email.toLowerCase(),
                    name: googleUser.name,
                    // Note: avatar field could be added to schema later
                }
            });

            // Send welcome email for new users
            fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/email/welcome`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    name: user.name || user.email,
                }),
            }).catch(err => console.error("Welcome email failed:", err));
        }

        // Create session
        const sessionToken = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        await getPrisma().individualSession.create({
            data: {
                token: sessionToken,
                userId: user.id,
                expiresAt,
            }
        });

        // Redirect to dashboard with session cookie
        const response = NextResponse.redirect(
            new URL("/learn/dashboard", request.url)
        );

        response.cookies.set("learner_session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        // Set a client-readable cookie for header auth state detection
        response.cookies.set("learner_logged_in", "true", {
            httpOnly: false,  // Readable by client-side JS
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Google OAuth callback error:", error);
        return NextResponse.redirect(
            new URL("/learn/login?error=callback_failed", request.url)
        );
    }
}
