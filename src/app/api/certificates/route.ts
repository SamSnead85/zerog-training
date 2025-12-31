import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/lib/db";

// Issue a new certificate upon track/module completion
export async function POST(request: NextRequest) {
    try {
        // Get session from cookie
        const sessionToken = request.cookies.get("session_token")?.value;
        if (!sessionToken) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const session = await getSessionByToken(sessionToken);
        if (!session || new Date() > session.expires) {
            return NextResponse.json(
                { success: false, error: "Session expired" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { moduleId, trackName, certificationTitle, score, skills } = body;

        if (!moduleId) {
            return NextResponse.json(
                { success: false, error: "Module ID is required" },
                { status: 400 }
            );
        }

        // Import Prisma for database operations
        const { PrismaClient } = await import("@prisma/client");
        const { PrismaPg } = await import("@prisma/adapter-pg");
        const { Pool } = await import("pg");

        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });

        // Check if certificate already exists for this user + module
        const existingCert = await prisma.certificate.findFirst({
            where: {
                userId: session.user.id,
                moduleId: moduleId,
            },
        });

        if (existingCert) {
            // Return existing certificate
            return NextResponse.json({
                success: true,
                certificate: {
                    certificateId: existingCert.verificationCode,
                    recipientName: existingCert.userName,
                    trackName: trackName || existingCert.moduleTitle,
                    certificationTitle: certificationTitle || `ScaledNative Certified - ${existingCert.moduleTitle}`,
                    issueDate: existingCert.issuedAt.toISOString(),
                    expiryDate: existingCert.expiresAt?.toISOString(),
                    completionScore: existingCert.finalScore,
                    totalHours: 0, // Would need to calculate from progress
                    modulesCompleted: 1,
                    skills: skills || [],
                    credentialUrl: `https://zerogtraining.com/verify/${existingCert.verificationCode}`,
                    organizationName: existingCert.organizationName,
                },
                isNew: false,
            });
        }

        // Get module info
        const module = await prisma.trainingModule.findUnique({
            where: { id: moduleId },
        });

        if (!module) {
            return NextResponse.json(
                { success: false, error: "Module not found" },
                { status: 404 }
            );
        }

        // Create new certificate
        const certificate = await prisma.certificate.create({
            data: {
                userId: session.user.id,
                moduleId: moduleId,
                moduleTitle: module.title,
                userName: session.user.name || session.user.email,
                organizationName: session.user.organization?.name || "ScaledNative",
                finalScore: score || null,
                expiresAt: null, // No expiration by default
            },
        });

        return NextResponse.json({
            success: true,
            certificate: {
                certificateId: certificate.verificationCode,
                recipientName: certificate.userName,
                trackName: trackName || module.title,
                certificationTitle: certificationTitle || `ScaledNative Certified - ${module.title}`,
                issueDate: certificate.issuedAt.toISOString(),
                expiryDate: certificate.expiresAt?.toISOString(),
                completionScore: score,
                totalHours: Math.round(module.estimatedDurationMinutes / 60),
                modulesCompleted: 1,
                skills: skills || [],
                credentialUrl: `https://zerogtraining.com/verify/${certificate.verificationCode}`,
                organizationName: certificate.organizationName,
            },
            isNew: true,
        });
    } catch (error) {
        console.error("Certificate issuance error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to issue certificate" },
            { status: 500 }
        );
    }
}

// Get all certificates for the current user
export async function GET(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get("session_token")?.value;
        if (!sessionToken) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const session = await getSessionByToken(sessionToken);
        if (!session || new Date() > session.expires) {
            return NextResponse.json(
                { success: false, error: "Session expired" },
                { status: 401 }
            );
        }

        // Import Prisma for database operations
        const { PrismaClient } = await import("@prisma/client");
        const { PrismaPg } = await import("@prisma/adapter-pg");
        const { Pool } = await import("pg");

        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });

        const certificates = await prisma.certificate.findMany({
            where: { userId: session.user.id },
            orderBy: { issuedAt: "desc" },
        });

        return NextResponse.json({
            success: true,
            certificates: certificates.map((cert) => ({
                certificateId: cert.verificationCode,
                recipientName: cert.userName,
                trackName: cert.moduleTitle,
                certificationTitle: `ScaledNative Certified - ${cert.moduleTitle}`,
                issueDate: cert.issuedAt.toISOString(),
                expiryDate: cert.expiresAt?.toISOString(),
                completionScore: cert.finalScore,
                credentialUrl: `https://zerogtraining.com/verify/${cert.verificationCode}`,
                organizationName: cert.organizationName,
            })),
        });
    } catch (error) {
        console.error("Certificates fetch error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch certificates" },
            { status: 500 }
        );
    }
}
