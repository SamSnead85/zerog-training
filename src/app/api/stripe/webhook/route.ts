import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

/**
 * Stripe Webhook Handler
 * 
 * Required environment variables:
 * - STRIPE_SECRET_KEY: Your Stripe secret key
 * - STRIPE_WEBHOOK_SECRET: Webhook signing secret from Stripe Dashboard
 * 
 * Setup in Stripe Dashboard:
 * 1. Go to Developers > Webhooks
 * 2. Add endpoint: https://your-domain.com/api/stripe/webhook
 * 3. Select events: checkout.session.completed, customer.subscription.*
 * 4. Copy the signing secret to STRIPE_WEBHOOK_SECRET
 */

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
    if (!stripe || !webhookSecret) {
        console.error("Stripe not configured for webhooks");
        return NextResponse.json(
            { error: "Stripe webhooks not configured" },
            { status: 500 }
        );
    }

    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    // Handle the event
    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log("✅ Checkout completed:", session.id);

                // Extract metadata
                const planId = session.metadata?.planId;
                const customerId = session.customer as string;
                const subscriptionId = session.subscription as string;

                // TODO: Create/update user in your database
                // await db.user.upsert({
                //     where: { stripeCustomerId: customerId },
                //     update: { subscriptionId, planId, status: 'active' },
                //     create: { stripeCustomerId: customerId, subscriptionId, planId, status: 'active' }
                // });

                console.log(`Plan: ${planId}, Customer: ${customerId}, Subscription: ${subscriptionId}`);
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                console.log("📝 Subscription updated:", subscription.id);

                // TODO: Update subscription status in database
                // await db.user.update({
                //     where: { stripeSubscriptionId: subscription.id },
                //     data: { status: subscription.status }
                // });
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                console.log("❌ Subscription canceled:", subscription.id);

                // TODO: Handle cancellation in database
                // await db.user.update({
                //     where: { stripeSubscriptionId: subscription.id },
                //     data: { status: 'canceled', planId: null }
                // });
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                console.log("⚠️ Payment failed for invoice:", invoice.id);

                // TODO: Notify user of failed payment
                // await sendEmail(invoice.customer_email, 'Payment failed', ...);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}

// Verify webhook is accessible
export async function GET() {
    return NextResponse.json({
        message: "Stripe Webhook Endpoint",
        configured: !!webhookSecret,
        instructions: webhookSecret ? null : [
            "1. Go to Stripe Dashboard > Developers > Webhooks",
            "2. Add endpoint: https://your-domain.com/api/stripe/webhook",
            "3. Select events: checkout.session.completed, customer.subscription.*",
            "4. Add STRIPE_WEBHOOK_SECRET to your .env",
        ],
    });
}
