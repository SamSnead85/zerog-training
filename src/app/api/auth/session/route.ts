import { NextRequest, NextResponse } from 'next/server';
import { getSessionByToken } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get('session_token')?.value;

        if (!sessionToken) {
            return NextResponse.json({ user: null });
        }

        const session = await getSessionByToken(sessionToken);

        if (!session || new Date(session.expires) < new Date()) {
            return NextResponse.json({ user: null });
        }

        const user = session.user;

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                organizationId: user.organizationId,
                organizationName: user.organization?.name,
            },
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json({ user: null });
    }
}
