import { NextRequest, NextResponse } from "next/server";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";

/**
 * Individual Quote Operations API
 * 
 * GET: Retrieve quote details
 * PATCH: Update quote (send, accept, decline, convert to invoice)
 * DELETE: Delete quote
 */

// Get quote by ID
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
        const quote = await prisma.enterpriseQuote.findUnique({
            where: { id },
            include: {
                lineItems: true,
                invoices: true,
            },
        });

        if (!quote) {
            return NextResponse.json(
                { error: "Quote not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            quote: {
                ...quote,
                pricePerUser: quote.pricePerUser / 100,
                subtotal: quote.subtotal / 100,
                discountAmount: quote.discountAmount / 100,
                totalAmount: quote.totalAmount / 100,
            },
        });

    } catch (error) {
        console.error("Get quote error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to get quote" },
            { status: 500 }
        );
    }
}

// Update quote (send, accept, decline, convert to invoice)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { action } = body;

        if (!isDatabaseConfigured()) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const prisma = getPrisma();
        const quote = await prisma.enterpriseQuote.findUnique({
            where: { id },
            include: { lineItems: true },
        });

        if (!quote) {
            return NextResponse.json(
                { error: "Quote not found" },
                { status: 404 }
            );
        }

        switch (action) {
            case 'send': {
                const updated = await prisma.enterpriseQuote.update({
                    where: { id },
                    data: {
                        status: 'SENT',
                        sentAt: new Date(),
                    },
                });
                return NextResponse.json({
                    success: true,
                    message: "Quote sent",
                    quote: updated,
                });
            }

            case 'accept': {
                const updated = await prisma.enterpriseQuote.update({
                    where: { id },
                    data: {
                        status: 'ACCEPTED',
                        acceptedAt: new Date(),
                    },
                });
                return NextResponse.json({
                    success: true,
                    message: "Quote accepted",
                    quote: updated,
                });
            }

            case 'decline': {
                const updated = await prisma.enterpriseQuote.update({
                    where: { id },
                    data: {
                        status: 'DECLINED',
                        declinedAt: new Date(),
                    },
                });
                return NextResponse.json({
                    success: true,
                    message: "Quote declined",
                    quote: updated,
                });
            }

            case 'convert_to_invoice': {
                // Create invoice from quote
                const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
                const daysMapping: Record<string, number> = {
                    DUE_ON_RECEIPT: 0, NET_15: 15, NET_30: 30,
                    NET_45: 45, NET_60: 60, NET_90: 90,
                };
                const days = daysMapping[quote.paymentTerms] || 30;
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + days);

                const invoice = await prisma.enterpriseInvoice.create({
                    data: {
                        invoiceNumber,
                        status: 'DRAFT',
                        companyName: quote.companyName,
                        contactName: quote.contactName,
                        contactEmail: quote.contactEmail,
                        contactPhone: quote.contactPhone,
                        billingAddress: quote.billingAddress,
                        userCount: quote.userCount,
                        pricePerUser: quote.pricePerUser,
                        discountPercent: quote.discountPercent,
                        subtotal: quote.subtotal,
                        discountAmount: quote.discountAmount,
                        taxAmount: 0,
                        totalAmount: quote.totalAmount,
                        amountPaid: 0,
                        amountDue: quote.totalAmount,
                        paymentTerms: quote.paymentTerms,
                        dueDate,
                        notes: quote.notes,
                        quoteId: quote.id,
                        stripeCustomerId: quote.stripeCustomerId,
                        createdById: quote.createdById,
                    },
                });

                // Copy line items
                for (const item of quote.lineItems) {
                    await prisma.invoiceLineItem.create({
                        data: {
                            invoiceId: invoice.id,
                            description: item.description,
                            quantity: item.quantity,
                            unitPriceInCents: item.unitPriceInCents,
                            totalInCents: item.totalInCents,
                        },
                    });
                }

                // Update quote status
                await prisma.enterpriseQuote.update({
                    where: { id },
                    data: { status: 'CONVERTED' },
                });

                return NextResponse.json({
                    success: true,
                    message: "Quote converted to invoice",
                    invoice: {
                        id: invoice.id,
                        invoiceNumber: invoice.invoiceNumber,
                    },
                });
            }

            default:
                return NextResponse.json(
                    { error: `Unknown action: ${action}` },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error("Update quote error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update quote" },
            { status: 500 }
        );
    }
}

// Delete quote
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
        const quote = await prisma.enterpriseQuote.findUnique({
            where: { id },
        });

        if (!quote) {
            return NextResponse.json(
                { error: "Quote not found" },
                { status: 404 }
            );
        }

        if (quote.status !== 'DRAFT') {
            return NextResponse.json(
                { error: "Can only delete draft quotes" },
                { status: 400 }
            );
        }

        await prisma.enterpriseQuote.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Quote deleted",
        });

    } catch (error) {
        console.error("Delete quote error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to delete quote" },
            { status: 500 }
        );
    }
}
