import { getSessionByToken } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Verify user is authenticated for lesson access
 * Returns the user if authenticated, redirects to login if not
 */
export async function requireAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
        redirect('/login?redirect=/training');
    }

    const session = await getSessionByToken(token);

    if (!session || session.expires < new Date()) {
        redirect('/login?redirect=/training');
    }

    return session.user;
}

/**
 * Check if user is authenticated (non-blocking)
 * Returns the user if authenticated, null otherwise
 */
export async function getAuthUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) return null;

        const session = await getSessionByToken(token);

        if (!session || session.expires < new Date()) {
            return null;
        }

        return session.user;
    } catch {
        return null;
    }
}

/**
 * Check if user has access to a specific module
 * Currently returns true for all authenticated users (modules are open)
 * Can be extended to check assignment-based access
 */
export async function hasModuleAccess(userId: string, moduleId: string): Promise<boolean> {
    // For now, all authenticated users can access all modules
    // This can be extended to check learnerProgress or assignments
    return true;
}
