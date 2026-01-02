// Google OAuth API for Learner Login
// This handles the OAuth redirect to Google
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
        // Return a nice error page if not configured
        return NextResponse.redirect(
            new URL("/learn/login?error=oauth_not_configured", request.url)
        );
    }

    // Build the Google OAuth URL
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://scalednative.com'}/api/learner/oauth/google/callback`;

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "select_account");

    // Optional: Add state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    authUrl.searchParams.set("state", state);

    return NextResponse.redirect(authUrl.toString());
}
