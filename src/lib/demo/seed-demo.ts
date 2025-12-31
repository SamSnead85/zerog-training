import { getPrisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

/**
 * Seeds a demo account with sample progress data for sales demonstrations.
 */
export async function seedDemoAccount() {
    const prisma = getPrisma();

    // 1. Create or get Demo Organization
    let demoOrg = await prisma.organization.findFirst({
        where: { slug: 'demo-company' },
    });

    if (!demoOrg) {
        demoOrg = await prisma.organization.create({
            data: {
                name: 'Demo Company',
                slug: 'demo-company',
                industry: 'Technology',
                tier: 'PROFESSIONAL',
            },
        });
        console.log('Created Demo Organization:', demoOrg.id);
    }

    // 2. Create Demo User
    const demoEmail = 'demo@scalednative.com';
    let demoUser = await prisma.user.findUnique({
        where: { email: demoEmail },
    });

    if (!demoUser) {
        const hashedPassword = await bcrypt.hash('demo2024!', 10);
        demoUser = await prisma.user.create({
            data: {
                email: demoEmail,
                name: 'Alex Demo',
                passwordHash: hashedPassword,
                role: 'LEARNER',
                organizationId: demoOrg.id,
            },
        });
        console.log('Created Demo User:', demoUser.id);
    }

    // 3. Get some training modules to create progress for
    const modules = await prisma.trainingModule.findMany({
        take: 4,
        orderBy: { createdAt: 'asc' },
    });

    if (modules.length === 0) {
        console.log('No training modules found - skipping progress seeding');
        return { success: true, userId: demoUser.id, message: 'Demo user created, no modules for progress' };
    }

    // 4. Create sample progress records
    const progressData = [
        { moduleIndex: 0, status: 'COMPLETED', percentage: 100 },
        { moduleIndex: 1, status: 'COMPLETED', percentage: 100 },
        { moduleIndex: 2, status: 'IN_PROGRESS', percentage: 65 },
        { moduleIndex: 3, status: 'NOT_STARTED', percentage: 0 },
    ];

    for (const pd of progressData) {
        if (modules[pd.moduleIndex]) {
            const module = modules[pd.moduleIndex];

            // Check if progress already exists
            const existing = await prisma.learnerProgress.findFirst({
                where: {
                    userId: demoUser.id,
                    moduleId: module.id,
                    lessonId: null,
                },
            });

            if (!existing) {
                await prisma.learnerProgress.create({
                    data: {
                        userId: demoUser.id,
                        moduleId: module.id,
                        status: pd.status as 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED',
                        completionPercentage: pd.percentage,
                        timeSpentSeconds: pd.percentage * 60,
                        lastAccessedAt: new Date(),
                        completedAt: pd.status === 'COMPLETED' ? new Date() : null,
                    },
                });
                console.log(`Created progress for module: ${module.title} (${pd.percentage}%)`);
            }
        }
    }

    // 5. Create a sample certificate for the first completed module
    if (modules[0]) {
        const existingCert = await prisma.certificate.findFirst({
            where: {
                userId: demoUser.id,
                moduleId: modules[0].id,
            },
        });

        if (!existingCert) {
            await prisma.certificate.create({
                data: {
                    userId: demoUser.id,
                    moduleId: modules[0].id,
                    moduleTitle: modules[0].title,
                    userName: demoUser.name ?? 'Alex Demo',
                    organizationName: demoOrg.name,
                    finalScore: 92,
                    issuedAt: new Date(),
                },
            });
            console.log('Created demo certificate');
        }
    }

    return {
        success: true,
        userId: demoUser.id,
        email: demoEmail,
        password: 'demo2024!',
        message: 'Demo account ready for sales demonstrations',
    };
}
