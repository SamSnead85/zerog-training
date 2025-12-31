import { NextRequest, NextResponse } from 'next/server';
import { saveProgress, getUserProgress } from '@/lib/db';
import { getSessionByToken } from '@/lib/db';
import { ProgressStatus } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        // Get user from session
        const sessionToken = request.cookies.get('session_token')?.value;
        if (!sessionToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = await getSessionByToken(sessionToken);
        if (!session) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        const body = await request.json();
        const { moduleId, lessonId, status, progressPct } = body;

        if (!moduleId) {
            return NextResponse.json({ error: 'moduleId is required' }, { status: 400 });
        }

        await saveProgress({
            userId: session.user.id,
            moduleId,
            lessonId,
            status: (status as ProgressStatus) || 'IN_PROGRESS',
            completionPercentage: progressPct || 0,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Progress save error:', error);
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        // Get user from session
        const sessionToken = request.cookies.get('session_token')?.value;
        if (!sessionToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = await getSessionByToken(sessionToken);
        if (!session) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        const progress = await getUserProgress(session.user.id);

        return NextResponse.json({ progress });
    } catch (error) {
        console.error('Progress fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}
