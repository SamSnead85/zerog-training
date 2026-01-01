import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import Stripe from "stripe";

// Lazy initialization to prevent build-time errors
let stripeInstance: Stripe | null = null;
function getStripe(): Stripe {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is not configured");
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2025-12-15.clover",
        });
    }
    return stripeInstance;
}

// Course and track data for creating products
const coursePricing: Record<string, { title: string; priceInCents: number }> = {
    "native-framework": { title: "NATIVE Framework Foundations", priceInCents: 9900 },
    "prompt-engineering": { title: "Prompt Engineering Mastery", priceInCents: 14900 },
    "human-ai-collaboration": { title: "Human-AI Collaboration", priceInCents: 9900 },
    "agentic-ai-systems": { title: "Agentic AI Systems", priceInCents: 19900 },
    "leadership-ai": { title: "AI Leadership for Executives", priceInCents: 12900 },
    "ai-security": { title: "AI Security Fundamentals", priceInCents: 14900 },
};

const trackPricing: Record<string, { title: string; priceInCents: number; courseIds: string[] }> = {
    "native-practitioner": {
        title: "NATIVE Certified Practitioner",
        priceInCents: 39900,
        courseIds: ["native-framework", "human-ai-collaboration", "prompt-engineering"]
    },
    "ai-engineer": {
        title: "AI Engineering Professional",
        priceInCents: 49900,
        courseIds: ["agentic-ai-systems", "prompt-engineering", "ai-security"]
    },
    "prompt-specialist": {
        title: "Prompt Engineering Specialist",
        priceInCents: 24900,
        courseIds: ["prompt-engineering"]
    },
    "ai-leader": {
        title: "AI Transformation Leader",
        priceInCents: 34900,
        courseIds: ["native-framework", "leadership-ai"]
    },
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get("stripe-signature");

        if (!signature) {
            return NextResponse.json(
                { error: "Missing stripe-signature header" },
                { status: 400 }
            );
        }

        let event: Stripe.Event;

        try {
            // If webhook secret is set, verify the signature
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
            if (webhookSecret) {
                event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
            } else {
                // In development without webhook secret, parse the event directly
                event = JSON.parse(body) as Stripe.Event;
            }
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return NextResponse.json(
                { error: "Webhook signature verification failed" },
                { status: 400 }
            );
        }

        // Handle the event
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutComplete(session);
                break;
            }
            case "payment_intent.succeeded": {
                // Optional: additional handling
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
    const { type, itemId, userId } = session.metadata || {};

    if (!type || !itemId || !userId) {
        console.error("Missing metadata in checkout session");
        return;
    }

    const amountPaid = session.amount_total || 0;

    if (type === "course") {
        const courseInfo = coursePricing[itemId];
        if (!courseInfo) {
            console.error("Course not found:", itemId);
            return;
        }

        // Find or create course product
        let courseProduct = await getPrisma().courseProduct.findUnique({
            where: { courseId: itemId }
        });

        if (!courseProduct) {
            courseProduct = await getPrisma().courseProduct.create({
                data: {
                    courseId: itemId,
                    title: courseInfo.title,
                    priceInCents: courseInfo.priceInCents,
                }
            });
        }

        // Create purchase record
        await getPrisma().purchase.create({
            data: {
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as string,
                type: "COURSE",
                status: "COMPLETED",
                amountPaid,
                userId,
                courseProductId: courseProduct.id,
                purchasedAt: new Date(),
            }
        });

        // Award XP for purchase
        await getPrisma().individualUser.update({
            where: { id: userId },
            data: {
                xp: { increment: 50 },
                lastActiveAt: new Date(),
            }
        });

    } else if (type === "track") {
        const trackInfo = trackPricing[itemId];
        if (!trackInfo) {
            console.error("Track not found:", itemId);
            return;
        }

        // Find or create track product
        let trackProduct = await getPrisma().trackProduct.findUnique({
            where: { trackId: itemId }
        });

        if (!trackProduct) {
            trackProduct = await getPrisma().trackProduct.create({
                data: {
                    trackId: itemId,
                    title: trackInfo.title,
                    priceInCents: trackInfo.priceInCents,
                    courseIds: trackInfo.courseIds,
                }
            });
        }

        // Create purchase record
        await getPrisma().purchase.create({
            data: {
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as string,
                type: "TRACK",
                status: "COMPLETED",
                amountPaid,
                userId,
                trackProductId: trackProduct.id,
                purchasedAt: new Date(),
            }
        });

        // Award XP for track purchase (more than single course)
        await getPrisma().individualUser.update({
            where: { id: userId },
            data: {
                xp: { increment: 100 },
                lastActiveAt: new Date(),
            }
        });
    }

    console.log(`Purchase completed: ${type} ${itemId} for user ${userId}`);
}
