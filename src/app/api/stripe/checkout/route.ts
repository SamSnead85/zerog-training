import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Stripe Checkout API - Production Ready
 * 
 * Required environment variables:
 * - STRIPE_SECRET_KEY: Your Stripe secret key (sk_live_... or sk_test_...)
 * - NEXT_PUBLIC_APP_URL: Your app URL (https://scalednative.com)
 */

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// Plan configurations with Stripe price IDs
const PLANS = {
    professional: {
        name: "Professional",
        price: 49,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_1SkwXS4Z6NZJLjYu0yP9Ans8",
        description: "Full AI-Native training for individuals",
    },
    "professional-annual": {
        name: "Professional Annual",
        price: 470,
        priceId: process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID || "price_1SkwXS4Z6NZJLjYu2tyP7WK4",
        description: "Full AI-Native training - Annual (save 20%)",
        annual: true,
    },
    team: {
        name: "Team",
        price: 299,
        priceId: process.env.STRIPE_TEAM_PRICE_ID || "price_1SkwXS4Z6NZJLjYuGyozXNBj",
        description: "For teams up to 10 members",
    },
    "team-annual": {
        name: "Team Annual",
        price: 2868,
        priceId: process.env.STRIPE_TEAM_ANNUAL_PRICE_ID || "price_1SkwXT4Z6NZJLjYusdinASoO",
        description: "Team plan - Annual (save 20%)",
        annual: true,
    },
    "enterprise-seat": {
        name: "Enterprise Per-Seat",
        price: 75,
        priceId: process.env.STRIPE_ENTERPRISE_SEAT_PRICE_ID || "price_1SkwXT4Z6NZJLjYuaXjWDD2E",
        description: "Enterprise per-seat pricing",
        perSeat: true,
    },
    enterprise: {
        name: "Enterprise Custom",
        price: 0,
        priceId: null, // Contact sales
        description: "Custom solutions for large organizations",
    },
    // Legacy track IDs - map to professional plan for backwards compatibility
    "native-practitioner": {
        name: "NATIVE Certified Practitioner",
        price: 49,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_1SkwXS4Z6NZJLjYu0yP9Ans8",
        description: "NATIVE framework certification",
    },
    "ai-engineer": {
        name: "AI Engineering Professional",
        price: 49,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_1SkwXS4Z6NZJLjYu0yP9Ans8",
        description: "AI engineering certification",
    },
    "essentials": {
        name: "AI-Native Essentials",
        price: 49,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_1SkwXS4Z6NZJLjYu0yP9Ans8",
        description: "Foundation modules",
    },
    "expert": {
        name: "Expert + Live Training",
        price: 49,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_1SkwXS4Z6NZJLjYu0yP9Ans8",
        description: "Premium with live sessions",
    },
};

export async function POST(request: Request) {
    try {
        const { priceId, planId, quantity = 1 } = await request.json();

        // For Enterprise (custom pricing), redirect to contact
        if (planId === "enterprise") {
            return NextResponse.json({
                url: "/contact?plan=enterprise",
                type: "contact",
            });
        }

        // Validate plan
        const plan = PLANS[planId as keyof typeof PLANS];
        if (!plan) {
            return NextResponse.json(
                { error: "Invalid plan ID" },
                { status: 400 }
            );
        }

        // Check if Stripe is configured
        if (!stripe) {
            console.warn("Stripe not configured - running in demo mode");
            return NextResponse.json({
                url: `/dashboard?success=true&plan=${planId}&demo=true`,
                mode: "demo",
                message: "Stripe not configured. Add STRIPE_SECRET_KEY to .env",
            });
        }

        // Get app URL for redirects
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId || plan.priceId,
                    quantity: (plan as { perSeat?: boolean }).perSeat ? quantity : 1,
                },
            ],
            success_url: `${appUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/pricing?canceled=true`,
            metadata: {
                planId,
                quantity: quantity.toString(),
            },
            subscription_data: {
                metadata: {
                    planId,
                },
            },
            allow_promotion_codes: true,
            billing_address_collection: "required",
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error: unknown) {
        console.error("Stripe checkout error:", error);
        const message = error instanceof Error ? error.message : "Failed to create checkout session";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

// Info endpoint - check Stripe status
export async function GET() {
    const isConfigured = !!stripe;

    return NextResponse.json({
        message: "ScaledNative - Stripe Checkout API",
        mode: isConfigured ? "production" : "demo",
        configured: isConfigured,
        plans: Object.entries(PLANS).map(([id, plan]) => ({
            id,
            name: plan.name,
            price: plan.price,
            priceId: plan.priceId,
        })),
        ...(isConfigured ? {} : {
            setupRequired: true,
            instructions: [
                "1. Add STRIPE_SECRET_KEY to .env (sk_live_... or sk_test_...)",
                "2. Create products in Stripe Dashboard",
                "3. Add price IDs to .env: STRIPE_STARTER_PRICE_ID, STRIPE_PRO_PRICE_ID, STRIPE_ENTERPRISE_ACCESS_PRICE_ID",
            ],
        }),
    });
}
