import { NextResponse } from "next/server";

// Demo usage tracking - in production this would be stored in a database
// Using localStorage on client-side + this API for validation

const DAILY_FREE_LIMIT = 2;

interface UsageRecord {
    count: number;
    date: string;
}

// In-memory storage for demo (use Redis/DB in production)
const usageStore = new Map<string, UsageRecord>();

function getToday(): string {
    return new Date().toISOString().split("T")[0];
}

function getClientId(request: Request): string {
    // In production, use IP + fingerprint or session ID
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "anonymous";
    return ip;
}

export async function GET(request: Request) {
    const clientId = getClientId(request);
    const today = getToday();
    const usage = usageStore.get(clientId);

    if (!usage || usage.date !== today) {
        return NextResponse.json({
            used: 0,
            remaining: DAILY_FREE_LIMIT,
            limit: DAILY_FREE_LIMIT,
            canGenerate: true,
        });
    }

    return NextResponse.json({
        used: usage.count,
        remaining: Math.max(0, DAILY_FREE_LIMIT - usage.count),
        limit: DAILY_FREE_LIMIT,
        canGenerate: usage.count < DAILY_FREE_LIMIT,
    });
}

export async function POST(request: Request) {
    const clientId = getClientId(request);
    const today = getToday();

    let usage = usageStore.get(clientId);

    // Reset if new day
    if (!usage || usage.date !== today) {
        usage = { count: 0, date: today };
    }

    // Check limit
    if (usage.count >= DAILY_FREE_LIMIT) {
        return NextResponse.json(
            {
                error: "Daily free limit reached",
                used: usage.count,
                remaining: 0,
                limit: DAILY_FREE_LIMIT,
                canGenerate: false,
                message: "You've used your 2 free generations today. Sign up to continue!",
            },
            { status: 429 }
        );
    }

    // Increment usage
    usage.count += 1;
    usageStore.set(clientId, usage);

    return NextResponse.json({
        used: usage.count,
        remaining: DAILY_FREE_LIMIT - usage.count,
        limit: DAILY_FREE_LIMIT,
        canGenerate: usage.count < DAILY_FREE_LIMIT,
        success: true,
    });
}
