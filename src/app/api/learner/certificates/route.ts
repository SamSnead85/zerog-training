import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get user's certificates
export async function GET(request: NextRequest) {
    try {
        // Get session token from cookie
        const token = request.cookies.get("learner_session")?.value;

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Verify session
        const session = await prisma.individualSession.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
            return NextResponse.json({ error: "Session expired" }, { status: 401 });
        }

        // Get user's certificates
        const certificates = await prisma.individualCertificate.findMany({
            where: { userId: session.userId },
            orderBy: { issuedAt: "desc" },
        });

        return NextResponse.json({ certificates });
    } catch (error) {
        console.error("[Get Certificates Error]:", error);
        return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
    }
}

// POST - Issue a new certificate (when track is completed)
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("learner_session")?.value;

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const session = await prisma.individualSession.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
            return NextResponse.json({ error: "Session expired" }, { status: 401 });
        }

        const { trackId, trackTitle } = await request.json();

        if (!trackId || !trackTitle) {
            return NextResponse.json({ error: "Track ID and title are required" }, { status: 400 });
        }

        // Check if certificate already exists
        const existing = await prisma.individualCertificate.findFirst({
            where: {
                userId: session.userId,
                trackId,
            },
        });

        if (existing) {
            return NextResponse.json({ certificate: existing });
        }

        // Create new certificate
        const certificate = await prisma.individualCertificate.create({
            data: {
                userId: session.userId,
                trackId,
                trackTitle,
                userName: session.user.name || session.user.email,
            },
        });

        return NextResponse.json({ certificate }, { status: 201 });
    } catch (error) {
        console.error("[Issue Certificate Error]:", error);
        return NextResponse.json({ error: "Failed to issue certificate" }, { status: 500 });
    }
}
