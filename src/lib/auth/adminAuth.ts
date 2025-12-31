import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getSessionByToken } from '@/lib/db';

export type AdminContext = {
    userId: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ORG_ADMIN' | 'MANAGER';
    organizationId: string;
    isSuperAdmin: boolean;
};

/**
 * Verify admin access and return user context
 * Returns null if not authenticated or not an admin
 */
export async function verifyAdminAccess(
    request: NextRequest,
    requiredRoles: ('SUPER_ADMIN' | 'ORG_ADMIN' | 'MANAGER')[] = ['SUPER_ADMIN', 'ORG_ADMIN']
): Promise<AdminContext | null> {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('session_token')?.value;

        if (!sessionToken) {
            return null;
        }

        const session = await getSessionByToken(sessionToken);

        if (!session || !session.user) {
            return null;
        }

        const { user } = session;
        const role = user.role as string;

        // Check if user has required role
        if (!requiredRoles.includes(role as 'SUPER_ADMIN' | 'ORG_ADMIN' | 'MANAGER')) {
            return null;
        }

        return {
            userId: user.id,
            email: user.email,
            role: role as 'SUPER_ADMIN' | 'ORG_ADMIN' | 'MANAGER',
            organizationId: user.organizationId,
            isSuperAdmin: role === 'SUPER_ADMIN',
        };
    } catch (error) {
        console.error('Admin auth error:', error);
        return null;
    }
}

/**
 * Get organization filter for database queries
 * SUPER_ADMIN: can see all organizations (returns undefined)
 * ORG_ADMIN/MANAGER: scoped to their organization
 */
export function getOrgFilter(context: AdminContext): string | undefined {
    if (context.isSuperAdmin) {
        return undefined; // No filter - can see all
    }
    return context.organizationId;
}
