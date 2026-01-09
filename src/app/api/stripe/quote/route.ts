import { NextRequest, NextResponse } from "next/server";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import Stripe from "stripe";

/**
 * Enterprise Quote API
 * 
 * CREATE: Generate enterprise quotes with volume pricing
 * GET: List all quotes with filtering
 */

function getStripe(): Stripe | null {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    return new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Volume pricing tiers
const VOLUME_PRICING = [
    { min: 25, max: 49, price: 2500 },
    { min: 50, max: 99, price: 2300 },
    { min: 100, max: 199, price: 2100 },
    { min: 200, max: 349, price: 1900 },
    { min: 350, max: 499, price: 1700 },
    { min: 500, max: Infinity, price: 0 },
];

// Payment terms to days
const PAYMENT_TERMS_DAYS: Record<string, number> = {
    DUE_ON_RECEIPT: 0,
    NET_15: 15,
    NET_30: 30,
    NET_45: 45,
    NET_60: 60,
    NET_90: 90,
};

function calculatePricePerUser(userCount: number): number {
    const tier = VOLUME_PRICING.find(t => userCount >= t.min && userCount <= t.max);
    return tier?.price || 0;
}

function generateQuoteNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `QT-${year}${month}-${random}`;
}

// Create Quote
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            companyName,
            contactName,
            contactEmail,
            contactPhone,
            billingAddress,
            userCount,
            pricePerUser,
            discountPercent = 0,
            paymentTerms = "NET_30",
            validDays = 30,
            notes,
            lineItems,
        } = body;

        // Validation
        if (!companyName || !contactName || !contactEmail || !userCount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (userCount < 25) {
            return NextResponse.json(
                { error: "Enterprise quotes require minimum 25 users" },
                { status: 400 }
            );
        }

        // Calculate pricing
        const calculatedPricePerUser = pricePerUser || calculatePricePerUser(userCount);

        if (calculatedPricePerUser === 0 && !pricePerUser) {
            return NextResponse.json(
                { error: "Custom pricing required for 500+ users" },
                { status: 400 }
            );
        }

        const subtotal = userCount * calculatedPricePerUser * 100; // cents
        const discountAmount = Math.round(subtotal * (discountPercent / 100));
        const totalAmount = subtotal - discountAmount;

        // Calculate valid until date
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + validDays);

        const stripe = getStripe();
        let stripeQuoteId: string | null = null;
        let stripeCustomerId: string | null = null;

        // Create Stripe Quote if configured
        if (stripe) {
            try {
                // Find or create customer
                const customers = await stripe.customers.list({
                    email: contactEmail,
                    limit: 1,
                });

                let customer: Stripe.Customer;
                if (customers.data.length > 0) {
                    customer = customers.data[0];
                } else {
                    customer = await stripe.customers.create({
                        email: contactEmail,
                        name: contactName,
                        metadata: { company: companyName },
                    });
                }
                stripeCustomerId = customer.id;

                // Note: Stripe Quotes API requires specific line items with prices
                // For enterprise quotes, we typically create the quote in our DB
                // and only create Stripe invoice when converting
            } catch (stripeError) {
                console.error("Stripe customer lookup failed:", stripeError);
            }
        }

        // Save to database
        let dbQuote = null;
        if (isDatabaseConfigured()) {
            const prisma = getPrisma();

            dbQuote = await prisma.enterpriseQuote.create({
                data: {
                    quoteNumber: generateQuoteNumber(),
                    status: 'DRAFT',
                    companyName,
                    contactName,
                    contactEmail,
                    contactPhone,
                    billingAddress,
                    userCount,
                    pricePerUser: calculatedPricePerUser * 100,
                    discountPercent,
                    subtotal,
                    discountAmount,
                    totalAmount,
                    paymentTerms: paymentTerms as 'DUE_ON_RECEIPT' | 'NET_15' | 'NET_30' | 'NET_45' | 'NET_60' | 'NET_90',
                    validUntil,
                    notes,
                    stripeQuoteId,
                    stripeCustomerId,
                    createdById: 'system',
                },
            });

            // Create line items
            if (lineItems && lineItems.length > 0) {
                for (const item of lineItems) {
                    await prisma.quoteLineItem.create({
                        data: {
                            quoteId: dbQuote.id,
                            description: item.description,
                            quantity: item.quantity,
                            unitPriceInCents: item.unitPriceInCents,
                            totalInCents: item.quantity * item.unitPriceInCents,
                        },
                    });
                }
            } else {
                await prisma.quoteLineItem.create({
                    data: {
                        quoteId: dbQuote.id,
                        description: `AI-Native Certification - ${userCount} User License (Annual)`,
                        quantity: userCount,
                        unitPriceInCents: calculatedPricePerUser * 100,
                        totalInCents: subtotal,
                    },
                });
            }
        }

        return NextResponse.json({
            success: true,
            quote: {
                id: dbQuote?.id,
                quoteNumber: dbQuote?.quoteNumber,
                status: 'DRAFT',
                companyName,
                userCount,
                pricePerUser: calculatedPricePerUser,
                subtotal: subtotal / 100,
                discountPercent,
                discountAmount: discountAmount / 100,
                totalAmount: totalAmount / 100,
                paymentTerms,
                validUntil: validUntil.toISOString(),
            },
        });

    } catch (error) {
        console.error("Quote creation error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to create quote" },
            { status: 500 }
        );
    }
}

// List quotes
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const company = searchParams.get('company');
        const limit = parseInt(searchParams.get('limit') || '50');

        if (!isDatabaseConfigured()) {
            return NextResponse.json({
                quotes: [],
                message: "Database not configured",
            });
        }

        const prisma = getPrisma();

        const quotes = await prisma.enterpriseQuote.findMany({
            where: {
                ...(status && { status: status as 'DRAFT' | 'SENT' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'CONVERTED' }),
                ...(company && { companyName: { contains: company, mode: 'insensitive' } }),
            },
            include: {
                lineItems: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        // Check for expired quotes and update status
        const now = new Date();
        for (const quote of quotes) {
            if (quote.status === 'SENT' && new Date(quote.validUntil) < now) {
                await prisma.enterpriseQuote.update({
                    where: { id: quote.id },
                    data: { status: 'EXPIRED' },
                });
                quote.status = 'EXPIRED';
            }
        }

        return NextResponse.json({
            quotes: quotes.map(q => ({
                ...q,
                pricePerUser: q.pricePerUser / 100,
                subtotal: q.subtotal / 100,
                discountAmount: q.discountAmount / 100,
                totalAmount: q.totalAmount / 100,
            })),
            stats: {
                total: quotes.length,
                draft: quotes.filter(q => q.status === 'DRAFT').length,
                sent: quotes.filter(q => q.status === 'SENT').length,
                accepted: quotes.filter(q => q.status === 'ACCEPTED').length,
                expired: quotes.filter(q => q.status === 'EXPIRED').length,
            },
        });

    } catch (error) {
        console.error("Quote list error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to list quotes" },
            { status: 500 }
        );
    }
}
