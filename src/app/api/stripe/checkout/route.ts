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
// You'll need to create these products in Stripe Dashboard and update the priceIds
const PLANS = {
    starter: {
        name: "Starter",
        price: 29,
        priceId: process.env.STRIPE_STARTER_PRICE_ID || "price_starter_monthly",
        description: "For individuals and small businesses",
    },
    pro: {
        name: "Pro",
        price: 99,
        priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
        description: "Create training and share with your team",
    },
    "enterprise-access": {
        name: "Enterprise Access",
        price: 75,
        priceId: process.env.STRIPE_ENTERPRISE_ACCESS_PRICE_ID || "price_enterprise_access_monthly",
        description: "Full AI-Native training per user",
        perSeat: true,
    },
    enterprise: {
        name: "Enterprise",
        price: 0,
        priceId: null, // Contact sales
        description: "Custom solutions for large organizations",
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
            customer_creation: "always",
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
