// Stripe Product Setup Script
// Run with: npx ts-node scripts/setup-stripe-products.ts

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY environment variable is required");
    console.error("Run: source .env && npx tsx scripts/setup-stripe-products.ts");
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setupStripeProducts() {
    console.log("🚀 Setting up Stripe products for ScaledNative...\n");

    try {
        // ===========================================
        // PRODUCT 1: Professional (Individual)
        // ===========================================
        console.log("Creating Professional plan...");
        const professionalProduct = await stripe.products.create({
            name: "ScaledNative Professional",
            description: "AI-Native Training Platform - Full curriculum access for individuals. 11 modules, certification tracks, interactive labs, and AI learning assistant.",
            metadata: {
                plan: "professional",
                type: "individual"
            }
        });

        const professionalPrice = await stripe.prices.create({
            product: professionalProduct.id,
            unit_amount: 4900, // $49/month
            currency: "usd",
            recurring: { interval: "month" },
            metadata: { plan: "professional" }
        });

        console.log(`✅ Professional: ${professionalProduct.id} / Price: ${professionalPrice.id}`);

        // ===========================================
        // PRODUCT 2: Professional Annual (Save 20%)
        // ===========================================
        console.log("Creating Professional Annual plan...");
        const professionalAnnualPrice = await stripe.prices.create({
            product: professionalProduct.id,
            unit_amount: 47000, // $470/year (~$39/mo, 20% off)
            currency: "usd",
            recurring: { interval: "year" },
            metadata: { plan: "professional_annual" }
        });

        console.log(`✅ Professional Annual: ${professionalAnnualPrice.id}`);

        // ===========================================
        // PRODUCT 3: Team (Small Business)
        // ===========================================
        console.log("Creating Team plan...");
        const teamProduct = await stripe.products.create({
            name: "ScaledNative Team",
            description: "AI-Native Training Platform for small teams. Up to 10 seats, team analytics, shared learning paths, priority support.",
            metadata: {
                plan: "team",
                type: "team"
            }
        });

        const teamPrice = await stripe.prices.create({
            product: teamProduct.id,
            unit_amount: 29900, // $299/month
            currency: "usd",
            recurring: { interval: "month" },
            metadata: { plan: "team" }
        });

        console.log(`✅ Team: ${teamProduct.id} / Price: ${teamPrice.id}`);

        // ===========================================
        // PRODUCT 4: Team Annual
        // ===========================================
        console.log("Creating Team Annual plan...");
        const teamAnnualPrice = await stripe.prices.create({
            product: teamProduct.id,
            unit_amount: 286800, // $2868/year (~$239/mo, 20% off)
            currency: "usd",
            recurring: { interval: "year" },
            metadata: { plan: "team_annual" }
        });

        console.log(`✅ Team Annual: ${teamAnnualPrice.id}`);

        // ===========================================
        // PRODUCT 5: Enterprise Per-Seat
        // ===========================================
        console.log("Creating Enterprise Per-Seat plan...");
        const enterpriseProduct = await stripe.products.create({
            name: "ScaledNative Enterprise",
            description: "AI-Native Training Platform for enterprises. Per-seat pricing, SSO/SAML, advanced analytics, custom content, dedicated support.",
            metadata: {
                plan: "enterprise",
                type: "enterprise"
            }
        });

        const enterprisePerSeatPrice = await stripe.prices.create({
            product: enterpriseProduct.id,
            unit_amount: 7500, // $75/seat/month
            currency: "usd",
            recurring: { interval: "month" },
            metadata: { plan: "enterprise_seat" }
        });

        console.log(`✅ Enterprise Per-Seat: ${enterpriseProduct.id} / Price: ${enterprisePerSeatPrice.id}`);

        // ===========================================
        // OUTPUT ENV VARIABLES
        // ===========================================
        console.log("\n" + "=".repeat(60));
        console.log("📋 ADD THESE TO YOUR .env FILE:");
        console.log("=".repeat(60) + "\n");

        console.log(`STRIPE_PROFESSIONAL_PRICE_ID="${professionalPrice.id}"`);
        console.log(`STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID="${professionalAnnualPrice.id}"`);
        console.log(`STRIPE_TEAM_PRICE_ID="${teamPrice.id}"`);
        console.log(`STRIPE_TEAM_ANNUAL_PRICE_ID="${teamAnnualPrice.id}"`);
        console.log(`STRIPE_ENTERPRISE_SEAT_PRICE_ID="${enterprisePerSeatPrice.id}"`);

        console.log("\n✅ All products created successfully!");
        console.log("📌 View in Stripe Dashboard: https://dashboard.stripe.com/products\n");

    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

setupStripeProducts();
