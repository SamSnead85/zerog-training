import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/auth/adminAuth';
import { seedDemoAccount } from '@/lib/demo/seed-demo';

// POST /api/admin/seed-demo - Seed demo account (SUPER_ADMIN only)
export async function POST(request: NextRequest) {
    try {
        const context = await verifyAdminAccess(request, ['SUPER_ADMIN']);

        if (!context) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized - SUPER_ADMIN only' },
                { status: 401 }
            );
        }

        const result = await seedDemoAccount();

        return NextResponse.json(result);
    } catch (error) {
        console.error('Seed demo error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to seed demo account' },
            { status: 500 }
        );
    }
}
