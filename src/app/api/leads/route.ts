import { NextRequest, NextResponse } from 'next/server';
import { saveDemoLead } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, role, teamSize, message } = body;

        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: 'Name and email are required' },
                { status: 400 }
            );
        }

        await saveDemoLead({
            name,
            email,
            company,
            role,
            teamSize,
            message,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Demo lead error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save lead' },
            { status: 500 }
        );
    }
}
