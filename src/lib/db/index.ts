import { PrismaClient, UserRole, ProgressStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// =============================================================================
// PRISMA CLIENT SINGLETON (Lazy loaded)
// =============================================================================

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function getPrisma(): PrismaClient {
    if (!globalForPrisma.prisma) {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        const adapter = new PrismaPg(pool);
        globalForPrisma.prisma = new PrismaClient({ adapter });
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
// SEED CURRICULUM MODULES - Create TrainingModule records for curriculum
// =============================================================================

// Import curriculum data dynamically to avoid circular dependencies
async function getCurriculumModules() {
    const { aiNativeCurriculum } = await import('@/lib/curriculum/ai-native-curriculum');
    return aiNativeCurriculum;
}

export async function seedCurriculumModules() {
    const org = await getOrCreateDefaultOrg();
    const admin = await getUserByEmail('sam.sweilem85@gmail.com');

    if (!admin) {
        console.log('Admin user not found, skipping curriculum module seeding');
        return [];
    }

    const curriculumModules = await getCurriculumModules();
    const results = [];

    for (const module of curriculumModules) {
        // Check if module already exists
        const existing = await getPrisma().trainingModule.findUnique({
            where: { id: module.id },
        });

        if (existing) {
            results.push(existing);
            continue;
        }

        // Map curriculum difficulty to Prisma enum
        const difficultyMap: Record<string, 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'> = {
            'Beginner': 'BEGINNER',
            'Intermediate': 'INTERMEDIATE',
            'Advanced': 'ADVANCED',
            'Expert': 'EXPERT',
        };

        const trainingModule = await getPrisma().trainingModule.create({
            data: {
                id: module.id, // Use curriculum ID like "module-1"
                title: module.title,
                description: module.description,
                difficulty: difficultyMap[module.level] || 'BEGINNER',
                estimatedDurationMinutes: parseInt(module.duration) * 60 || 60,
                organizationId: org.id,
                creatorId: admin.id,
                isPublished: true,
                publishedAt: new Date(),
            },
        });

        results.push(trainingModule);
    }

    console.log(`Seeded ${results.length} curriculum modules`);
    return results;
}

// =============================================================================
// SEED ADMIN USER
// =============================================================================

export async function seedAdminUser() {
    const org = await getOrCreateDefaultOrg();

    // Check if admin exists with either email variant
    let existingAdmin = await getUserByEmail('sam.sweilem85@gmail.com');
    if (!existingAdmin) {
        existingAdmin = await getUserByEmail('sam.sweilem@gmail.com');
    }
    if (existingAdmin) return existingAdmin;

    const passwordHash = await bcrypt.hash('Winter2022$', 10);

    return getPrisma().user.create({
        data: {
            email: 'sam.sweilem85@gmail.com',
            name: 'Sam Sweilem',
            passwordHash,
            role: 'SUPER_ADMIN',
            organizationId: org.id,
        },
    });
}

// =============================================================================
// SEED TEST USER
// =============================================================================

export async function seedTestUser() {
    const org = await getOrCreateDefaultOrg();

    const existingUser = await getUserByEmail('testuser1@test.com');
    if (existingUser) return existingUser;

    const passwordHash = await bcrypt.hash('Winter2022$', 10);

    return getPrisma().user.create({
        data: {
            email: 'testuser1@test.com',
            name: 'Test User 1',
            passwordHash,
            role: 'LEARNER',
            organizationId: org.id,
        },
    });
}

// =============================================================================
// SEED TEST USER PROGRESS - Grant Foundation track access
// =============================================================================

export async function seedTestUserProgress() {
    // Ensure curriculum modules exist in database first (TrainingModule records)
    await seedCurriculumModules();

    const testUser = await getUserByEmail('testuser1@test.com');
    if (!testUser) return null;

    // Foundation track modules (module-1 and module-2)
    const foundationModules = ['module-1', 'module-2'];

    // Grant access to Foundation modules
    const progress = await grantModuleAccess(testUser.id, foundationModules);

    // Update module-1 to show some progress (30% complete, in progress)
    const module1Progress = progress.find(p => p.moduleId === 'module-1');
    if (module1Progress) {
        await getPrisma().learnerProgress.update({
            where: { id: module1Progress.id },
            data: {
                status: 'IN_PROGRESS',
                completionPercentage: 30,
                timeSpentSeconds: 1800, // 30 minutes
                lastAccessedAt: new Date(),
            },
        });
    }

    return progress;
}

// =============================================================================
// USER PROVISIONING - Onboard new users with module access
// =============================================================================

export async function onboardUser(data: {
    email: string;
    name: string;
    password: string;
    role?: UserRole;
    organizationId?: string;
    moduleAccess?: string[]; // Array of module IDs to grant access
}) {
    // Get or create default org if not specified
    const org = data.organizationId
        ? await getPrisma().organization.findUnique({ where: { id: data.organizationId } })
        : await getOrCreateDefaultOrg();

    if (!org) throw new Error('Organization not found');

    // Create the user
    const user = await createUser({
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role || 'LEARNER',
        organizationId: org.id,
    });

    // If module access is specified, create initial progress entries
    if (data.moduleAccess && data.moduleAccess.length > 0) {
        for (const moduleId of data.moduleAccess) {
            await saveProgress({
                userId: user.id,
                moduleId,
                status: 'NOT_STARTED',
                completionPercentage: 0,
            });
        }
    }

    return user;
}

// =============================================================================
// GRANT MODULE ACCESS
// =============================================================================

export async function grantModuleAccess(userId: string, moduleIds: string[]) {
    const results = [];
    for (const moduleId of moduleIds) {
        const existing = await getPrisma().learnerProgress.findFirst({
            where: { userId, moduleId, lessonId: null },
        });

        if (!existing) {
            const progress = await saveProgress({
                userId,
                moduleId,
                status: 'NOT_STARTED',
                completionPercentage: 0,
            });
            results.push(progress);
        } else {
            results.push(existing);
        }
    }
    return results;
}

// =============================================================================
// USER MANAGEMENT (Admin)
// =============================================================================

export async function getUserById(id: string) {
    return getPrisma().user.findUnique({
        where: { id },
        include: { organization: true },
    });
}

export async function updateUser(id: string, data: {
    name?: string;
    role?: UserRole;
    email?: string;
}) {
    return getPrisma().user.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.role && { role: data.role }),
            ...(data.email && { email: data.email.toLowerCase() }),
        },
    });
}

export async function deleteUser(id: string) {
    // First delete sessions
    await getPrisma().session.deleteMany({ where: { userId: id } });
    // Then delete the user (progress is preserved for audit)
    return getPrisma().user.delete({ where: { id } });
}

// =============================================================================
// PROGRESS TRACKING (Admin)
// =============================================================================

export async function getProgressByOrganization(
    organizationId?: string,
    filters?: { userId?: string; moduleId?: string; status?: string }
) {
    // Build where clause
    const where: Record<string, unknown> = {};

    if (filters?.userId) {
        where.userId = filters.userId;
    }
    if (filters?.moduleId) {
        where.moduleId = filters.moduleId;
    }
    if (filters?.status) {
        where.status = filters.status;
    }

    // If scoped to org, need to filter by user's organization
    if (organizationId) {
        where.user = { organizationId };
    }

    return getPrisma().learnerProgress.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    organization: { select: { name: true } },
                },
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
}

// =============================================================================
// ASSIGNMENTS (Admin)
// =============================================================================

export async function createAssignment(data: {
    moduleId: string;
    userIds: string[];
    organizationId: string;
    assignedById: string;
    dueDate?: Date;
    isRequired?: boolean;
}) {
    // Create the assignment
    const assignment = await getPrisma().assignment.create({
        data: {
            moduleId: data.moduleId,
            organizationId: data.organizationId,
            assignedById: data.assignedById,
            dueDate: data.dueDate,
            isRequired: data.isRequired ?? true,
        },
    });

    // Create user assignments
    for (const userId of data.userIds) {
        await getPrisma().userAssignment.create({
            data: {
                assignmentId: assignment.id,
                userId,
            },
        });

        // Also create progress entry if not exists
        const existingProgress = await getPrisma().learnerProgress.findFirst({
            where: { userId, moduleId: data.moduleId, lessonId: null },
        });

        if (!existingProgress) {
            await saveProgress({
                userId,
                moduleId: data.moduleId,
                status: 'NOT_STARTED',
                completionPercentage: 0,
            });
        }
    }

    return assignment;
}

export async function getAssignmentsByOrganization(organizationId?: string) {
    return getPrisma().assignment.findMany({
        where: organizationId ? { organizationId } : undefined,
        include: {
            assignedBy: { select: { name: true, email: true } },
            assignees: {
                include: {
                    user: { select: { id: true, name: true, email: true } },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
}

// =============================================================================
// ORGANIZATION MANAGEMENT (Super Admin)
// =============================================================================

export async function getAllOrganizations() {
    return getPrisma().organization.findMany({
        include: {
            _count: { select: { users: true } },
        },
        orderBy: { createdAt: 'desc' },
    });
}

export async function createOrganization(data: {
    name: string;
    slug: string;
    industry?: string;
    tier?: string;
}) {
    return getPrisma().organization.create({
        data: {
            name: data.name,
            slug: data.slug,
            industry: data.industry,
            tier: data.tier || 'STARTER',
        },
    });
}
