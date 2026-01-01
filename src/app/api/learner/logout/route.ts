import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get("learner_session")?.value;

        if (sessionToken) {
            // Delete the session
            await getPrisma().individualSession.deleteMany({
                where: { token: sessionToken }
            });
        }

        const response = NextResponse.json({ success: true });

        // Clear the cookie
        response.cookies.set("learner_session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(0),
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to log out" },
            { status: 500 }
        );
    }
}
