import { NextResponse } from "next/server";

/**
 * Stripe Checkout API
 * 
 * To enable full Stripe integration:
 * 1. Run: npm install stripe
 * 2. Add to .env:
 *    - STRIPE_SECRET_KEY=sk_test_...
 *    - STRIPE_STARTER_MONTHLY_PRICE_ID=price_...
 *    - STRIPE_PRO_MONTHLY_PRICE_ID=price_...
 *    - NEXT_PUBLIC_APP_URL=https://your-domain.com
 * 3. Create products in Stripe Dashboard matching the price IDs
 * 
 * This file currently runs in DEMO mode, redirecting to dashboard on "purchase".
 */

// Plan configurations
const PLANS = {
    starter: {
        price: 49,
        modules: 5,
        users: 1,
        name: "Starter",
    },
    professional: {
        price: 129,
        modules: 15,
        users: 10,
        name: "Pro",
    },
    enterprise: {
        price: 0, // Custom
        modules: "unlimited",
        users: "unlimited",
        name: "Enterprise",
    },
};

export async function POST(request: Request) {
    try {
        const { planId, billingPeriod = "month" } = await request.json();

        // For Enterprise, redirect to contact form
        if (planId === "enterprise") {
            return NextResponse.json({
                url: "/contact?plan=enterprise",
                type: "contact",
            });
        }

        // Validate plan
        if (!PLANS[planId as keyof typeof PLANS]) {
            return NextResponse.json(
                { error: "Invalid plan ID" },
                { status: 400 }
            );
        }

        const plan = PLANS[planId as keyof typeof PLANS];

        // Check if Stripe is configured
        if (process.env.STRIPE_SECRET_KEY) {
            // Full Stripe integration would go here
            // See comments at top of file for setup instructions
            console.log("Stripe configured - would create checkout session for:", planId);
        }

        // Demo mode - simulate successful checkout
        console.log(`[Demo] Checkout for ${plan.name} plan at $${plan.price}/${billingPeriod}`);

        return NextResponse.json({
            sessionId: `demo_${planId}_${Date.now()}`,
            url: `/dashboard?success=true&plan=${planId}&demo=true`,
            mode: "demo",
            plan: {
                id: planId,
                name: plan.name,
                price: billingPeriod === "year" ? Math.round(plan.price * 10) : plan.price,
                period: billingPeriod,
            },
        });
    } catch (error: unknown) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to process checkout" },
            { status: 500 }
        );
    }
}

// Info endpoint
export async function GET() {
    const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;

    return NextResponse.json({
        message: "ZeroG Training - Stripe Checkout API",
        mode: isStripeConfigured ? "live" : "demo",
        setupRequired: !isStripeConfigured,
        plans: PLANS,
        setupInstructions: isStripeConfigured ? null : {
            step1: "npm install stripe",
            step2: "Add STRIPE_SECRET_KEY to .env",
            step3: "Create products in Stripe Dashboard",
            step4: "Add price IDs to .env",
        },
    });
}
