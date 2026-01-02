import { getPrisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Verify individual learner is authenticated
 * Returns the learner user if authenticated, redirects to login if not
 */
export async function requireLearnerAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('learner_session')?.value;

    if (!token) {
        redirect('/learn/login?redirect=/learn/dashboard');
    }

    const session = await getPrisma().individualSession.findUnique({
        where: { token },
        include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
        redirect('/learn/login?redirect=/learn/dashboard');
    }

    return session.user;
}

/**
 * Check if learner is authenticated (non-blocking)
 * Returns the learner user if authenticated, null otherwise
 */
export async function getLearnerUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('learner_session')?.value;

        if (!token) return null;

        const session = await getPrisma().individualSession.findUnique({
            where: { token },
            include: { user: true }
        });

        if (!session || session.expiresAt < new Date()) {
            return null;
        }

        return session.user;
    } catch {
        return null;
    }
}

/**
 * Check if learner has paid access to a course
 * Returns true for all authenticated learners for now
 * TODO: Implement purchase checking when IndividualPurchase table is added
 */
export async function hasLearnerCourseAccess(userId: string, courseSlug: string): Promise<boolean> {
    // For now, all authenticated learners can access all courses
    // This can be extended to check purchase records when that table is added
    return true;
}

