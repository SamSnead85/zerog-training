import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Stripe Checkout API - Production Ready
 * 
 * PRICING MODEL:
 * - Courses: One-time purchases ($299, $799, $1499)
 * - Membership: $79/month subscription (community, updates, jobs, certifications)
 * 
 * Required environment variables:
 * - STRIPE_SECRET_KEY: Your Stripe secret key (sk_live_... or sk_test_...)
 * - NEXT_PUBLIC_APP_URL: Your app URL (https://scalednative.com)
 */

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// ===========================================
// COURSE PRODUCTS (One-Time Purchases)
// ===========================================
const COURSES = {
    essentials: {
        name: "AI-Native Essentials",
        price: 299,
        priceId: process.env.STRIPE_ESSENTIALS_PRICE_ID,
        description: "Modules 1-4: Foundation knowledge for AI-Native development",
        mode: "payment" as const,
    },
    professional: {
        name: "AI-Native Professional",
        price: 799,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
        description: "All 11 modules + NATIVE Practitioner Certification",
        mode: "payment" as const,
    },
    expert: {
        name: "Expert + Live Training",
        price: 1499,
        priceId: process.env.STRIPE_EXPERT_PRICE_ID,
        description: "All modules + 2-hour 1:1 live session with trainer",
        mode: "payment" as const,
    },
};

// ===========================================
// MEMBERSHIP (Monthly Subscription)
// ===========================================
const MEMBERSHIP = {
    "ai-native-membership": {
        name: "AI-Native Membership",
        price: 79,
        priceId: process.env.STRIPE_MEMBERSHIP_PRICE_ID,
        description: "Monthly access: updates, certifications, community, job postings, newsletters",
        mode: "subscription" as const,
    },
};

// Combined catalog
const PRODUCTS = { ...COURSES, ...MEMBERSHIP };

// Legacy mappings for backwards compatibility
const LEGACY_MAPPINGS: Record<string, string> = {
    "native-practitioner": "professional",
    "ai-engineer": "professional",
    "team": "professional",
    "professional-annual": "professional",
};

export async function POST(request: Request) {
    try {
        const { planId, quantity = 1, addMembership = false } = await request.json();

        // Handle legacy plan IDs
        const resolvedPlanId = LEGACY_MAPPINGS[planId] || planId;

        // For Enterprise (custom pricing), redirect to contact
        if (resolvedPlanId === "enterprise") {
            return NextResponse.json({
                url: "/contact?plan=enterprise",
                type: "contact",
            });
        }

        // Validate product
        const product = PRODUCTS[resolvedPlanId as keyof typeof PRODUCTS];
        if (!product) {
            return NextResponse.json(
                { error: `Invalid plan ID: ${planId}` },
                { status: 400 }
            );
        }

        // Check if Stripe is configured
        if (!stripe) {
            console.warn("Stripe not configured - running in demo mode");
            return NextResponse.json({
                url: `/dashboard?success=true&plan=${resolvedPlanId}&demo=true`,
                mode: "demo",
                message: "Stripe not configured. Add STRIPE_SECRET_KEY to .env",
            });
        }

        // Check if price ID is configured
        if (!product.priceId) {
            console.warn(`Price ID not configured for ${resolvedPlanId}`);
            return NextResponse.json({
                url: `/dashboard?success=true&plan=${resolvedPlanId}&demo=true`,
                mode: "demo",
                message: `Stripe price not configured for ${product.name}. Create products in Stripe Dashboard.`,
                setupRequired: {
                    product: product.name,
                    expectedPrice: product.price,
                    envVar: `STRIPE_${resolvedPlanId.toUpperCase().replace(/-/g, "_")}_PRICE_ID`,
                },
            });
        }

        // Get app URL for redirects
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://scalednative.com";

        // Build line items
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                price: product.priceId,
                quantity: 1,
            },
        ];

        // Optionally add membership to course purchase
        if (addMembership && product.mode === "payment" && MEMBERSHIP["ai-native-membership"].priceId) {
            lineItems.push({
                price: MEMBERSHIP["ai-native-membership"].priceId,
                quantity: 1,
            });
        }

        // Determine checkout mode based on product type
        // If any item is a subscription, use subscription mode
        const hasSubscription = addMembership || product.mode === "subscription";
        const checkoutMode = hasSubscription ? "subscription" : "payment";

        // Create Stripe Checkout Session
        const sessionParams: Stripe.Checkout.SessionCreateParams = {
            mode: checkoutMode,
            payment_method_types: ["card"],
            line_items: lineItems,
            success_url: `${appUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&plan=${resolvedPlanId}`,
            cancel_url: `${appUrl}/pricing?canceled=true`,
            metadata: {
                planId: resolvedPlanId,
                productType: product.mode,
                addedMembership: addMembership.toString(),
            },
            allow_promotion_codes: true,
            billing_address_collection: "required",
        };

        // Add subscription metadata if applicable
        if (checkoutMode === "subscription") {
            sessionParams.subscription_data = {
                metadata: {
                    planId: resolvedPlanId,
                },
            };
        }

        const session = await stripe.checkout.sessions.create(sessionParams);

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
            mode: checkoutMode,
            product: product.name,
            price: product.price,
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

// Info endpoint - check Stripe status and list products
export async function GET() {
    const isConfigured = !!stripe;

    const courseList = Object.entries(COURSES).map(([id, product]) => ({
        id,
        name: product.name,
        price: product.price,
        type: "one-time",
        configured: !!product.priceId,
    }));

    const membershipList = Object.entries(MEMBERSHIP).map(([id, product]) => ({
        id,
        name: product.name,
        price: product.price,
        type: "subscription",
        configured: !!product.priceId,
    }));

    return NextResponse.json({
        message: "ScaledNative - Stripe Checkout API",
        mode: isConfigured ? "production" : "demo",
        configured: isConfigured,
        pricingModel: {
            courses: "One-time purchases",
            membership: "$79/month subscription",
        },
        courses: courseList,
        membership: membershipList,
        setupInstructions: [
            "1. Create products in Stripe Dashboard:",
            "   - AI-Native Essentials: $299 one-time",
            "   - AI-Native Professional: $799 one-time",
            "   - Expert + Live Training: $1499 one-time",
            "   - AI-Native Membership: $79/month recurring",
            "2. Add price IDs to Netlify environment variables:",
            "   - STRIPE_ESSENTIALS_PRICE_ID",
            "   - STRIPE_PROFESSIONAL_PRICE_ID",
            "   - STRIPE_EXPERT_PRICE_ID",
            "   - STRIPE_MEMBERSHIP_PRICE_ID",
        ],
    });
}
