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

// Course pricing in cents
const coursePricing: Record<string, { title: string; priceInCents: number }> = {
    "native-framework": { title: "NATIVE Framework Foundations", priceInCents: 9900 },
    "prompt-engineering": { title: "Prompt Engineering Mastery", priceInCents: 14900 },
    "human-ai-collaboration": { title: "Human-AI Collaboration", priceInCents: 9900 },
    "agentic-ai-systems": { title: "Agentic AI Systems", priceInCents: 19900 },
    "leadership-ai": { title: "AI Leadership for Executives", priceInCents: 12900 },
    "ai-security": { title: "AI Security Fundamentals", priceInCents: 14900 },
};

// Track pricing in cents
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

async function getLearnerFromSession(request: NextRequest) {
    const sessionToken = request.cookies.get("learner_session")?.value;
    if (!sessionToken) return null;

    const session = await getPrisma().individualSession.findUnique({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) return null;
    return session.user;
}

export async function POST(request: NextRequest) {
    try {
        const user = await getLearnerFromSession(request);

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Please log in to purchase" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { type, itemId } = body; // type: "course" or "track"

        if (!type || !itemId) {
            return NextResponse.json(
                { success: false, error: "Missing type or itemId" },
                { status: 400 }
            );
        }

        let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
        let metadata: Record<string, string>;

        if (type === "course") {
            const course = coursePricing[itemId];
            if (!course) {
                return NextResponse.json(
                    { success: false, error: "Course not found" },
                    { status: 404 }
                );
            }

            // Check if already purchased
            const existingPurchase = await getPrisma().purchase.findFirst({
                where: {
                    userId: user.id,
                    status: "COMPLETED",
                    courseProduct: { courseId: itemId }
                }
            });

            if (existingPurchase) {
                return NextResponse.json(
                    { success: false, error: "You already own this course" },
                    { status: 400 }
                );
            }

            lineItems = [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: course.title,
                        description: "Lifetime access to course content",
                    },
                    unit_amount: course.priceInCents,
                },
                quantity: 1,
            }];

            metadata = {
                type: "course",
                itemId,
                userId: user.id,
            };
        } else if (type === "track") {
            const track = trackPricing[itemId];
            if (!track) {
                return NextResponse.json(
                    { success: false, error: "Track not found" },
                    { status: 404 }
                );
            }

            // Check if already purchased
            const existingPurchase = await getPrisma().purchase.findFirst({
                where: {
                    userId: user.id,
                    status: "COMPLETED",
                    trackProduct: { trackId: itemId }
                }
            });

            if (existingPurchase) {
                return NextResponse.json(
                    { success: false, error: "You already own this track" },
                    { status: 400 }
                );
            }

            lineItems = [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: track.title,
                        description: `Certification track with ${track.courseIds.length} courses`,
                    },
                    unit_amount: track.priceInCents,
                },
                quantity: 1,
            }];

            metadata = {
                type: "track",
                itemId,
                userId: user.id,
            };
        } else {
            return NextResponse.json(
                { success: false, error: "Invalid purchase type" },
                { status: 400 }
            );
        }

        // Create or get Stripe customer
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = await getStripe().customers.create({
                email: user.email,
                name: user.name || undefined,
                metadata: { individualUserId: user.id },
            });
            customerId = customer.id;

            await getPrisma().individualUser.update({
                where: { id: user.id },
                data: { stripeCustomerId: customerId }
            });
        }

        // Create Stripe checkout session
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://scalednative.com";

        const session = await getStripe().checkout.sessions.create({
            customer: customerId,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${baseUrl}/learn/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/learn/${type === "course" ? "courses" : "tracks"}/${itemId}`,
            metadata,
        });

        return NextResponse.json({
            success: true,
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
