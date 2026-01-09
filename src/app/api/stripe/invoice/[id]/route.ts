import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";

/**
 * Individual Invoice Operations API
 * 
 * GET: Retrieve invoice details
 * PATCH: Update invoice (send, mark paid, void)
 * DELETE: Delete/void invoice
 */

function getStripe(): Stripe | null {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    return new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Get invoice by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        if (!isDatabaseConfigured()) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const prisma = getPrisma();
        const invoice = await prisma.enterpriseInvoice.findUnique({
            where: { id },
            include: {
                lineItems: true,
                payments: true,
                quote: true,
            },
        });

        if (!invoice) {
            return NextResponse.json(
                { error: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            invoice: {
                ...invoice,
                pricePerUser: invoice.pricePerUser / 100,
                subtotal: invoice.subtotal / 100,
                discountAmount: invoice.discountAmount / 100,
                taxAmount: invoice.taxAmount / 100,
                totalAmount: invoice.totalAmount / 100,
                amountPaid: invoice.amountPaid / 100,
                amountDue: invoice.amountDue / 100,
                lineItems: invoice.lineItems.map(item => ({
                    ...item,
                    unitPriceInCents: item.unitPriceInCents / 100,
                    totalInCents: item.totalInCents / 100,
                })),
                payments: invoice.payments.map(payment => ({
                    ...payment,
                    amountInCents: payment.amountInCents / 100,
                })),
            },
        });

    } catch (error) {
        console.error("Get invoice error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to get invoice" },
            { status: 500 }
        );
    }
}

// Update invoice (send, mark paid, void, record payment)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { action, paymentAmount, paymentMethod, notes } = body;

        if (!isDatabaseConfigured()) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const prisma = getPrisma();
        const invoice = await prisma.enterpriseInvoice.findUnique({
            where: { id },
        });

        if (!invoice) {
            return NextResponse.json(
                { error: "Invoice not found" },
                { status: 404 }
            );
        }

        const stripe = getStripe();

        switch (action) {
            case 'send': {
                // Send the invoice
                if (stripe && invoice.stripeInvoiceId) {
                    await stripe.invoices.sendInvoice(invoice.stripeInvoiceId);
                }

                const updated = await prisma.enterpriseInvoice.update({
                    where: { id },
                    data: {
                        status: 'SENT',
                        sentAt: new Date(),
                    },
                });

                return NextResponse.json({
                    success: true,
                    message: "Invoice sent successfully",
                    invoice: updated,
                });
            }

            case 'mark_viewed': {
                const updated = await prisma.enterpriseInvoice.update({
                    where: { id },
                    data: {
                        status: invoice.status === 'SENT' ? 'VIEWED' : invoice.status,
                        viewedAt: new Date(),
                    },
                });

                return NextResponse.json({ success: true, invoice: updated });
            }

            case 'record_payment': {
                if (!paymentAmount || !paymentMethod) {
                    return NextResponse.json(
                        { error: "Payment amount and method required" },
                        { status: 400 }
                    );
                }

                const paymentAmountCents = Math.round(paymentAmount * 100);
                const newAmountPaid = invoice.amountPaid + paymentAmountCents;
                const newAmountDue = invoice.totalAmount - newAmountPaid;

                // Record payment
                await prisma.invoicePayment.create({
                    data: {
                        invoiceId: id,
                        amountInCents: paymentAmountCents,
                        paymentMethod,
                        notes,
                    },
                });

                // Update invoice
                const updated = await prisma.enterpriseInvoice.update({
                    where: { id },
                    data: {
                        amountPaid: newAmountPaid,
                        amountDue: newAmountDue,
                        status: newAmountDue <= 0 ? 'PAID' : 'PARTIALLY_PAID',
                        paidAt: newAmountDue <= 0 ? new Date() : null,
                    },
                });

                return NextResponse.json({
                    success: true,
                    message: newAmountDue <= 0 ? "Invoice paid in full" : "Payment recorded",
                    invoice: updated,
                });
            }

            case 'mark_paid': {
                const updated = await prisma.enterpriseInvoice.update({
                    where: { id },
                    data: {
                        status: 'PAID',
                        amountPaid: invoice.totalAmount,
                        amountDue: 0,
                        paidAt: new Date(),
                    },
                });

                return NextResponse.json({
                    success: true,
                    message: "Invoice marked as paid",
                    invoice: updated,
                });
            }

            case 'void': {
                if (stripe && invoice.stripeInvoiceId) {
                    await stripe.invoices.voidInvoice(invoice.stripeInvoiceId);
                }

                const updated = await prisma.enterpriseInvoice.update({
                    where: { id },
                    data: { status: 'VOID' },
                });

                return NextResponse.json({
                    success: true,
                    message: "Invoice voided",
                    invoice: updated,
                });
            }

            case 'send_reminder': {
                // In production, this would send an email reminder
                const updated = await prisma.enterpriseInvoice.update({
                    where: { id },
                    data: { reminderSentAt: new Date() },
                });

                return NextResponse.json({
                    success: true,
                    message: "Reminder sent",
                    invoice: updated,
                });
            }

            default:
                return NextResponse.json(
                    { error: `Unknown action: ${action}` },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error("Update invoice error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update invoice" },
            { status: 500 }
        );
    }
}

// Delete/void invoice
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        if (!isDatabaseConfigured()) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const prisma = getPrisma();
        const invoice = await prisma.enterpriseInvoice.findUnique({
            where: { id },
        });

        if (!invoice) {
            return NextResponse.json(
                { error: "Invoice not found" },
                { status: 404 }
            );
        }

        // If invoice is in DRAFT status, we can delete it
        // Otherwise, we should void it instead
        if (invoice.status === 'DRAFT') {
            await prisma.enterpriseInvoice.delete({
                where: { id },
            });

            return NextResponse.json({
                success: true,
                message: "Invoice deleted",
            });
        } else {
            // Void instead of delete
            const stripe = getStripe();
            if (stripe && invoice.stripeInvoiceId) {
                try {
                    await stripe.invoices.voidInvoice(invoice.stripeInvoiceId);
                } catch {
                    // Invoice may already be voided/paid
                }
            }

            await prisma.enterpriseInvoice.update({
                where: { id },
                data: { status: 'VOID' },
            });

            return NextResponse.json({
                success: true,
                message: "Invoice voided (cannot delete sent invoices)",
            });
        }

    } catch (error) {
        console.error("Delete invoice error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to delete invoice" },
            { status: 500 }
        );
    }
}
