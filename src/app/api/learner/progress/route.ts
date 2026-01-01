import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

async function getLearnerFromSession(request: NextRequest) {
    const sessionToken = request.cookies.get("learner_session")?.value;
    if (!sessionToken) return null;

    const session = await getPrisma().individualSession.findUnique({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) return null;
    return session.user;
}

// GET - Retrieve progress for a course
export async function GET(request: NextRequest) {
    try {
        const user = await getLearnerFromSession(request);

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get("courseId");

        if (courseId) {
            // Get progress for specific course
            const progress = await getPrisma().individualProgress.findUnique({
                where: {
                    userId_courseId: {
                        userId: user.id,
                        courseId,
                    }
                }
            });

            return NextResponse.json({
                success: true,
                progress: progress || {
                    courseId,
                    completionPercent: 0,
                    completedLessons: [],
                },
            });
        } else {
            // Get all progress
            const allProgress = await getPrisma().individualProgress.findMany({
                where: { userId: user.id }
            });

            return NextResponse.json({
                success: true,
                progress: allProgress,
            });
        }
    } catch (error) {
        console.error("Get progress error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to get progress" },
            { status: 500 }
        );
    }
}

// POST - Save progress
export async function POST(request: NextRequest) {
    try {
        const user = await getLearnerFromSession(request);

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { courseId, lessonId, totalLessons } = body;

        if (!courseId || !lessonId) {
            return NextResponse.json(
                { success: false, error: "Missing courseId or lessonId" },
                { status: 400 }
            );
        }

        // Get or create progress record
        let progress = await getPrisma().individualProgress.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId,
                }
            }
        });

        if (!progress) {
            progress = await getPrisma().individualProgress.create({
                data: {
                    userId: user.id,
                    courseId,
                    completedLessons: [lessonId],
                    completionPercent: totalLessons ? Math.round((1 / totalLessons) * 100) : 0,
                    lastAccessedAt: new Date(),
                }
            });
        } else {
            // Add lesson to completed if not already
            const completedLessons = progress.completedLessons.includes(lessonId)
                ? progress.completedLessons
                : [...progress.completedLessons, lessonId];

            const completionPercent = totalLessons
                ? Math.round((completedLessons.length / totalLessons) * 100)
                : progress.completionPercent;

            const isComplete = completionPercent >= 100;

            progress = await getPrisma().individualProgress.update({
                where: { id: progress.id },
                data: {
                    completedLessons,
                    completionPercent: Math.min(completionPercent, 100),
                    lastAccessedAt: new Date(),
                    completedAt: isComplete && !progress.completedAt ? new Date() : progress.completedAt,
                }
            });
        }

        // Award XP for completing a lesson
        await getPrisma().individualUser.update({
            where: { id: user.id },
            data: {
                xp: { increment: 10 },
                lastActiveAt: new Date(),
            }
        });

        return NextResponse.json({
            success: true,
            progress,
        });
    } catch (error) {
        console.error("Save progress error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to save progress" },
            { status: 500 }
        );
    }
}
