// Seed script to create admin and demo accounts
// Run with: npx ts-node prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create ZeroG organization (platform owner)
    const zerogOrg = await prisma.organization.upsert({
        where: { id: "zerog-platform" },
        update: {},
        create: {
            id: "zerog-platform",
            name: "ZeroG AI Training",
            slug: "zerog",
            tier: "ENTERPRISE",
            settings: {
                branding: {
                    primaryColor: "#00D4FF",
                    logo: "/logo.svg",
                },
                features: {
                    aiCustomization: true,
                    simulations: true,
                    analytics: true,
                    sso: true,
                },
                limits: {
                    maxUsers: -1, // Unlimited
                    maxModules: -1,
                    maxStorage: -1,
                },
            },
        },
    });

    console.log("✅ Created ZeroG organization");

    // Create Admin user (Sam)
    const adminPassword = await bcrypt.hash("Winter2022$", 12);
    const adminUser = await prisma.user.upsert({
        where: { email: "sam.sweilem85@gmail.com" },
        update: {
            passwordHash: adminPassword,
            role: "SUPER_ADMIN",
        },
        create: {
            email: "sam.sweilem85@gmail.com",
            name: "Sam Sweilem",
            passwordHash: adminPassword,
            role: "SUPER_ADMIN",
            organizationId: zerogOrg.id,
        },
    });

    console.log("✅ Created admin user:", adminUser.email);

    // Create Demo Organization with trial access
    const demoOrg = await prisma.organization.upsert({
        where: { id: "demo-trial" },
        update: {},
        create: {
            id: "demo-trial",
            name: "Demo Organization",
            slug: "demo",
            tier: "TRIAL",
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
            settings: {
                features: {
                    aiCustomization: true,
                    simulations: true,
                    analytics: true,
                    sso: false,
                },
                limits: {
                    maxUsers: 5,
                    maxModules: 5,
                    maxStorage: 1073741824, // 1GB
                },
            },
        },
    });

    // Create demo user
    const demoPassword = await bcrypt.hash("demo123", 12);
    const demoUser = await prisma.user.upsert({
        where: { email: "demo@zerogtraining.com" },
        update: {},
        create: {
            email: "demo@zerogtraining.com",
            name: "Demo User",
            passwordHash: demoPassword,
            role: "ORG_ADMIN",
            organizationId: demoOrg.id,
        },
    });

    console.log("✅ Created demo user:", demoUser.email);

    // Create trial access codes
    const trialCodes = [
        { code: "ZEROG2024", uses: 100, maxUsers: 5, maxModules: 5 },
        { code: "ENTERPRISE", uses: 50, maxUsers: 50, maxModules: -1 },
        { code: "PARTNER", uses: 25, maxUsers: 20, maxModules: 20 },
    ];

    for (const tc of trialCodes) {
        await prisma.trialCode.upsert({
            where: { code: tc.code },
            update: {},
            create: {
                code: tc.code,
                maxUses: tc.uses,
                usedCount: 0,
                maxUsers: tc.maxUsers,
                maxModules: tc.maxModules,
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
                createdById: adminUser.id,
            },
        });
        console.log(`✅ Created trial code: ${tc.code}`);
    }

    console.log("\n🎉 Seeding complete!");
    console.log("\nAdmin login:");
    console.log("  Email: sam.sweilem85@gmail.com");
    console.log("  Password: Winter2022$");
    console.log("\nDemo login:");
    console.log("  Email: demo@zerogtraining.com");
    console.log("  Password: demo123");
    console.log("\nTrial codes: ZEROG2024, ENTERPRISE, PARTNER");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
