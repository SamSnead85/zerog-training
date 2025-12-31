import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession, updateLastLogin, seedAdminUser, seedTestUser, seedTestUserProgress } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Ensure seed users exist with module access
        await seedAdminUser();
        await seedTestUser();
        await seedTestUserProgress();

        // Verify credentials
        const { valid, user } = await verifyPassword(email, password);

        if (!valid || !user) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Create session
        const session = await createSession(user.id);

        // Update last login
        await updateLastLogin(user.id);

        // Set session cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                organizationId: user.organizationId,
                organizationName: user.organization?.name,
            },
        });

        response.cookies.set('session_token', session.sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
