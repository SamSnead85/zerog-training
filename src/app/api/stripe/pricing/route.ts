import { NextRequest, NextResponse } from "next/server";

/**
 * Volume Pricing Calculator API
 * 
 * Calculate pricing for enterprise quotes based on user count
 */

// Volume pricing tiers (per user, annual)
const VOLUME_PRICING = [
    { min: 25, max: 49, price: 2500, savings: 0 },
    { min: 50, max: 99, price: 2300, savings: 8 },
    { min: 100, max: 199, price: 2100, savings: 16 },
    { min: 200, max: 349, price: 1900, savings: 24 },
    { min: 350, max: 499, price: 1700, savings: 32 },
    { min: 500, max: Infinity, price: 0, savings: 0 }, // Custom pricing
];

const BASE_PRICE = 2500; // Base price per user

function calculatePricing(userCount: number, customPrice?: number) {
    const tier = VOLUME_PRICING.find(t => userCount >= t.min && userCount <= t.max);

    if (!tier || tier.price === 0) {
        return {
            requiresCustomQuote: true,
            message: "Enterprise deals with 500+ users require custom pricing. Contact sales@scalednative.com",
        };
    }

    const pricePerUser = customPrice || tier.price;
    const subtotal = userCount * pricePerUser;
    const savingsPerUser = BASE_PRICE - pricePerUser;
    const totalSavings = userCount * savingsPerUser;
    const savingsPercent = Math.round((savingsPerUser / BASE_PRICE) * 100);

    return {
        requiresCustomQuote: false,
        userCount,
        pricePerUser,
        subtotal,
        tier: `${tier.min}-${tier.max === Infinity ? '∞' : tier.max}`,
        savingsPerUser,
        totalSavings,
        savingsPercent,
        breakdowns: {
            monthly: Math.round(subtotal / 12),
            perUserMonthly: Math.round(pricePerUser / 12),
        },
    };
}

// GET - Calculate pricing for a user count
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userCount = parseInt(searchParams.get('users') || '0');
    const customPrice = searchParams.get('price') ? parseInt(searchParams.get('price')!) : undefined;

    if (userCount < 25) {
        return NextResponse.json({
            error: "Minimum 25 users required for enterprise pricing",
            minimumUsers: 25,
            individualPricing: {
                message: "For individual or small team purchases, visit /learn/pricing",
                url: "/learn/pricing",
            },
        }, { status: 400 });
    }

    const pricing = calculatePricing(userCount, customPrice);

    return NextResponse.json({
        ...pricing,
        allTiers: VOLUME_PRICING.map(t => ({
            range: `${t.min}-${t.max === Infinity ? '∞' : t.max}`,
            pricePerUser: t.price || "Custom",
            savingsPercent: t.savings,
        })),
    });
}

// POST - Calculate pricing with discount
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userCount, discountPercent = 0, customPricePerUser } = body;

        if (!userCount || userCount < 25) {
            return NextResponse.json({
                error: "Minimum 25 users required",
            }, { status: 400 });
        }

        const pricing = calculatePricing(userCount, customPricePerUser);

        if (pricing.requiresCustomQuote) {
            return NextResponse.json(pricing);
        }

        // Apply discount
        const discountedSubtotal = pricing.subtotal! * (1 - discountPercent / 100);
        const discountAmount = pricing.subtotal! - discountedSubtotal;

        return NextResponse.json({
            ...pricing,
            discountPercent,
            discountAmount,
            total: discountedSubtotal,
            breakdowns: {
                monthly: Math.round(discountedSubtotal / 12),
                perUserMonthly: Math.round((discountedSubtotal / userCount) / 12),
            },
        });

    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Invalid request",
        }, { status: 400 });
    }
}
