import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";

/**
 * Enterprise Invoice API
 * 
 * CREATE: Generate Net-30/Net-60 invoices for enterprise customers
 * GET: List all invoices with filtering
 * 
 * Volume Pricing Tiers:
 * - 25-49 users: $2,500/user
 * - 50-99 users: $2,300/user
 * - 100-199 users: $2,100/user
 * - 200-349 users: $1,900/user
 * - 350-499 users: $1,700/user
 * - 500+: Custom rate
 */

// Initialize Stripe (lazy)
function getStripe(): Stripe | null {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    return new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Volume pricing tiers (per user, annual)
const VOLUME_PRICING = [
    { min: 25, max: 49, price: 2500 },
    { min: 50, max: 99, price: 2300 },
    { min: 100, max: 199, price: 2100 },
    { min: 200, max: 349, price: 1900 },
    { min: 350, max: 499, price: 1700 },
    { min: 500, max: Infinity, price: 0 }, // Custom pricing
];

// Payment terms to days mapping
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

function generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `INV-${year}${month}-${random}`;
}

// Create Invoice
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
            pricePerUser, // Optional override
            discountPercent = 0,
            paymentTerms = "NET_30",
            notes,
            internalNotes,
            sendNow = false,
            lineItems, // Optional custom line items
        } = body;

        // Validation
        if (!companyName || !contactName || !contactEmail || !userCount) {
            return NextResponse.json(
                { error: "Missing required fields: companyName, contactName, contactEmail, userCount" },
                { status: 400 }
            );
        }

        if (userCount < 25) {
            return NextResponse.json(
                { error: "Enterprise invoices require minimum 25 users" },
                { status: 400 }
            );
        }

        // Calculate pricing
        const calculatedPricePerUser = pricePerUser || calculatePricePerUser(userCount);

        if (calculatedPricePerUser === 0 && !pricePerUser) {
            return NextResponse.json(
                { error: "Custom pricing required for 500+ users. Please specify pricePerUser." },
                { status: 400 }
            );
        }

        const subtotal = userCount * calculatedPricePerUser * 100; // Convert to cents
        const discountAmount = Math.round(subtotal * (discountPercent / 100));
        const totalAmount = subtotal - discountAmount;
        const amountDue = totalAmount; // Will update when payments are made

        // Calculate due date
        const issueDate = new Date();
        const daysToPay = PAYMENT_TERMS_DAYS[paymentTerms] || 30;
        const dueDate = new Date(issueDate);
        dueDate.setDate(dueDate.getDate() + daysToPay);

        const stripe = getStripe();
        let stripeInvoiceId: string | null = null;
        let stripeCustomerId: string | null = null;
        let hostedInvoiceUrl: string | null = null;
        let invoicePdfUrl: string | null = null;

        // Create in Stripe if configured
        if (stripe) {
            try {
                // Create or find customer
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
                        metadata: {
                            company: companyName,
                            phone: contactPhone || '',
                        },
                        address: billingAddress ? {
                            line1: billingAddress,
                        } : undefined,
                    });
                }
                stripeCustomerId = customer.id;

                // Create Stripe invoice
                const stripeInvoice = await stripe.invoices.create({
                    customer: customer.id,
                    collection_method: 'send_invoice',
                    days_until_due: daysToPay,
                    description: `ScaledNative AI-Native Training - ${userCount} User Enterprise License`,
                    metadata: {
                        company: companyName,
                        userCount: userCount.toString(),
                        paymentTerms,
                    },
                    custom_fields: [
                        { name: 'Payment Terms', value: paymentTerms.replace('_', ' ') },
                        { name: 'User Count', value: userCount.toString() },
                    ],
                });

                // Add line items to Stripe invoice
                if (lineItems && lineItems.length > 0) {
                    for (const item of lineItems) {
                        await stripe.invoiceItems.create({
                            customer: customer.id,
                            invoice: stripeInvoice.id,
                            description: item.description,
                            quantity: item.quantity,
                            amount: item.unitPriceInCents * item.quantity,
                            currency: 'usd',
                        });
                    }
                } else {
                    // Default line item - use amount for one-off invoice items
                    await stripe.invoiceItems.create({
                        customer: customer.id,
                        invoice: stripeInvoice.id,
                        description: `AI-Native Certification - ${userCount} User License (Annual)`,
                        amount: userCount * calculatedPricePerUser * 100, // Total amount in cents
                        currency: 'usd',
                    });

                    // Add discount if applicable
                    if (discountPercent > 0) {
                        const coupon = await stripe.coupons.create({
                            percent_off: discountPercent,
                            duration: 'once',
                            name: `Enterprise Discount - ${companyName}`,
                        });
                        await stripe.invoices.update(stripeInvoice.id, {
                            discounts: [{ coupon: coupon.id }],
                        });
                    }
                }

                // Finalize the invoice
                const finalizedInvoice = await stripe.invoices.finalizeInvoice(stripeInvoice.id);

                stripeInvoiceId = finalizedInvoice.id;
                hostedInvoiceUrl = finalizedInvoice.hosted_invoice_url || null;
                invoicePdfUrl = finalizedInvoice.invoice_pdf || null;

                // Send if requested
                if (sendNow) {
                    await stripe.invoices.sendInvoice(finalizedInvoice.id);
                }

            } catch (stripeError) {
                console.error("Stripe invoice creation failed:", stripeError);
                // Continue without Stripe - create local record
            }
        }

        // Save to database if configured
        let dbInvoice = null;
        if (isDatabaseConfigured()) {
            const prisma = getPrisma();

            dbInvoice = await prisma.enterpriseInvoice.create({
                data: {
                    invoiceNumber: generateInvoiceNumber(),
                    status: sendNow ? 'SENT' : 'DRAFT',
                    companyName,
                    contactName,
                    contactEmail,
                    contactPhone,
                    billingAddress,
                    userCount,
                    pricePerUser: calculatedPricePerUser * 100, // Store in cents
                    discountPercent,
                    subtotal,
                    discountAmount,
                    taxAmount: 0,
                    totalAmount,
                    amountPaid: 0,
                    amountDue,
                    paymentTerms: paymentTerms as 'DUE_ON_RECEIPT' | 'NET_15' | 'NET_30' | 'NET_45' | 'NET_60' | 'NET_90',
                    issueDate,
                    dueDate,
                    notes,
                    internalNotes,
                    stripeInvoiceId,
                    stripeCustomerId,
                    hostedInvoiceUrl,
                    invoicePdfUrl,
                    createdById: 'system', // TODO: Get from auth
                    sentAt: sendNow ? new Date() : null,
                },
            });

            // Create line items
            if (lineItems && lineItems.length > 0) {
                for (const item of lineItems) {
                    await prisma.invoiceLineItem.create({
                        data: {
                            invoiceId: dbInvoice.id,
                            description: item.description,
                            quantity: item.quantity,
                            unitPriceInCents: item.unitPriceInCents,
                            totalInCents: item.quantity * item.unitPriceInCents,
                        },
                    });
                }
            } else {
                await prisma.invoiceLineItem.create({
                    data: {
                        invoiceId: dbInvoice.id,
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
            invoice: {
                id: dbInvoice?.id || stripeInvoiceId,
                invoiceNumber: dbInvoice?.invoiceNumber || stripeInvoiceId,
                status: sendNow ? 'SENT' : 'DRAFT',
                companyName,
                userCount,
                pricePerUser: calculatedPricePerUser,
                subtotal: subtotal / 100, // Return in dollars
                discountPercent,
                discountAmount: discountAmount / 100,
                totalAmount: totalAmount / 100,
                paymentTerms,
                issueDate: issueDate.toISOString(),
                dueDate: dueDate.toISOString(),
                stripeInvoiceId,
                hostedInvoiceUrl,
                invoicePdfUrl,
            },
            volumePricingApplied: !pricePerUser,
            stripeConfigured: !!stripe,
            databaseConfigured: isDatabaseConfigured(),
        });

    } catch (error) {
        console.error("Invoice creation error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to create invoice" },
            { status: 500 }
        );
    }
}

// List invoices
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const company = searchParams.get('company');
        const limit = parseInt(searchParams.get('limit') || '50');

        if (!isDatabaseConfigured()) {
            return NextResponse.json({
                invoices: [],
                message: "Database not configured. Set DATABASE_URL in environment.",
                volumePricing: VOLUME_PRICING.map(t => ({
                    range: `${t.min}-${t.max === Infinity ? '∞' : t.max}`,
                    pricePerUser: t.price,
                })),
            });
        }

        const prisma = getPrisma();

        const invoices = await prisma.enterpriseInvoice.findMany({
            where: {
                ...(status && { status: status as 'DRAFT' | 'SENT' | 'VIEWED' | 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'VOID' | 'REFUNDED' }),
                ...(company && { companyName: { contains: company, mode: 'insensitive' } }),
            },
            include: {
                lineItems: true,
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        // Calculate summary stats
        const stats = {
            total: invoices.length,
            draft: invoices.filter(i => i.status === 'DRAFT').length,
            sent: invoices.filter(i => i.status === 'SENT').length,
            paid: invoices.filter(i => i.status === 'PAID').length,
            overdue: invoices.filter(i => i.status === 'OVERDUE' || (i.status === 'SENT' && new Date(i.dueDate) < new Date())).length,
            totalValue: invoices.reduce((sum, i) => sum + i.totalAmount, 0) / 100,
            totalPaid: invoices.reduce((sum, i) => sum + i.amountPaid, 0) / 100,
            totalOutstanding: invoices.reduce((sum, i) => sum + i.amountDue, 0) / 100,
        };

        return NextResponse.json({
            invoices: invoices.map(inv => ({
                ...inv,
                pricePerUser: inv.pricePerUser / 100,
                subtotal: inv.subtotal / 100,
                discountAmount: inv.discountAmount / 100,
                taxAmount: inv.taxAmount / 100,
                totalAmount: inv.totalAmount / 100,
                amountPaid: inv.amountPaid / 100,
                amountDue: inv.amountDue / 100,
            })),
            stats,
            volumePricing: VOLUME_PRICING.map(t => ({
                range: `${t.min}-${t.max === Infinity ? '∞' : t.max}`,
                pricePerUser: t.price,
            })),
        });

    } catch (error) {
        console.error("Invoice list error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to list invoices" },
            { status: 500 }
        );
    }
}
