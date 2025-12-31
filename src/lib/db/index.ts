import { PrismaClient, UserRole, ProgressStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

// =============================================================================
// PRISMA CLIENT SINGLETON (Lazy loaded)
// =============================================================================

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function getPrisma(): PrismaClient {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient();
    }
    return globalForPrisma.prisma;
}

// Helper to check if database is configured
function isDatabaseConfigured(): boolean {
    return !!process.env.DATABASE_URL;
}

// =============================================================================
// USER OPERATIONS
// =============================================================================

export async function createUser(data: {
    email: string;
    name: string;
    password: string;
    role?: UserRole;
    organizationId: string;
    certificationPath?: string;
    department?: string;
}) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return getPrisma().user.create({
        data: {
            email: data.email.toLowerCase(),
            name: data.name,
            passwordHash,
            role: data.role || 'LEARNER',
            organizationId: data.organizationId,
        },
    });
}

export async function getUserByEmail(email: string) {
    return getPrisma().user.findUnique({
        where: { email: email.toLowerCase() },
        include: { organization: true },
    });
}

export async function getAllUsers(organizationId?: string) {
    return getPrisma().user.findMany({
        where: organizationId ? { organizationId } : undefined,
        orderBy: { createdAt: 'desc' },
        include: { organization: true },
    });
}

export async function verifyPassword(email: string, password: string) {
    const user = await getUserByEmail(email);

    if (!user || !user.passwordHash) {
        return { valid: false, user: null };
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    return { valid, user: valid ? user : null };
}

export async function updateLastLogin(userId: string) {
    return getPrisma().user.update({
        where: { id: userId },
        data: { lastLoginAt: new Date() },
    });
}

// =============================================================================
// SESSION OPERATIONS
// =============================================================================

export async function createSession(userId: string) {
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    return getPrisma().session.create({
        data: {
            userId,
            sessionToken: token,
            expires,
        },
    });
}

export async function getSessionByToken(token: string) {
    return getPrisma().session.findUnique({
        where: { sessionToken: token },
        include: { user: { include: { organization: true } } },
    });
}

export async function deleteSession(token: string) {
    return getPrisma().session.delete({
        where: { sessionToken: token },
    }).catch(() => null); // Ignore if not found
}

export async function deleteUserSessions(userId: string) {
    return getPrisma().session.deleteMany({
        where: { userId },
    });
}

// =============================================================================
// PROGRESS OPERATIONS
// =============================================================================

export async function saveProgress(data: {
    userId: string;
    moduleId: string;
    lessonId?: string | null;
    status: ProgressStatus;
    completionPercentage: number;
    timeSpentSeconds?: number;
}) {
    // For upsert with nullable lessonId, we need to handle it carefully
    const lessonIdValue = data.lessonId ?? null;

    // First try to find existing record
    const existing = await getPrisma().learnerProgress.findFirst({
        where: {
            userId: data.userId,
            moduleId: data.moduleId,
            lessonId: lessonIdValue,
        },
    });

    if (existing) {
        return getPrisma().learnerProgress.update({
            where: { id: existing.id },
            data: {
                status: data.status,
                completionPercentage: data.completionPercentage,
                timeSpentSeconds: data.timeSpentSeconds,
                lastAccessedAt: new Date(),
                completedAt: data.status === 'COMPLETED' ? new Date() : undefined,
            },
        });
    }

    return getPrisma().learnerProgress.create({
        data: {
            userId: data.userId,
            moduleId: data.moduleId,
            lessonId: lessonIdValue,
            status: data.status,
            completionPercentage: data.completionPercentage,
            timeSpentSeconds: data.timeSpentSeconds || 0,
            lastAccessedAt: new Date(),
        },
    });
}

export async function getUserProgress(userId: string) {
    return getPrisma().learnerProgress.findMany({
        where: { userId },
        include: { module: true, lesson: true },
        orderBy: { updatedAt: 'desc' },
    });
}

export async function getModuleProgress(userId: string, moduleId: string) {
    return getPrisma().learnerProgress.findMany({
        where: { userId, moduleId },
        include: { lesson: true },
    });
}

// =============================================================================
// DEMO LEAD OPERATIONS
// =============================================================================

export async function saveDemoLead(data: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    teamSize?: string;
    message?: string;
}) {
    return getPrisma().demoLead.create({
        data: {
            name: data.name,
            email: data.email,
            company: data.company,
            role: data.role,
            teamSize: data.teamSize,
            message: data.message,
        },
    });
}

export async function getAllLeads() {
    return getPrisma().demoLead.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

// =============================================================================
// ORGANIZATION OPERATIONS
// =============================================================================

export async function getOrCreateDefaultOrg() {
    const defaultOrg = await getPrisma().organization.findFirst({
        where: { slug: 'zerog' },
    });

    if (defaultOrg) return defaultOrg;

    return getPrisma().organization.create({
        data: {
            name: 'ZeroG Training',
            slug: 'zerog',
            industry: 'Technology',
            tier: 'ENTERPRISE',
        },
    });
}

// =============================================================================
// SEED ADMIN USER
// =============================================================================

export async function seedAdminUser() {
    const org = await getOrCreateDefaultOrg();

    const existingAdmin = await getUserByEmail('sam.sweilem@gmail.com');
    if (existingAdmin) return existingAdmin;

    const passwordHash = await bcrypt.hash('Winter2022$', 10);

    return getPrisma().user.create({
        data: {
            email: 'sam.sweilem@gmail.com',
            name: 'Sam Sweilem',
            passwordHash,
            role: 'SUPER_ADMIN',
            organizationId: org.id,
        },
    });
}
