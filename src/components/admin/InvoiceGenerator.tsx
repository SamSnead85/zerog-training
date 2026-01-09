"use client";

import { useState, useEffect, useCallback } from "react";
import {
    FileText,
    Send,
    DollarSign,
    Users,
    Building2,
    Mail,
    Phone,
    Calculator,
    CheckCircle,
    AlertCircle,
    Clock,
    ExternalLink,
    Download,
    Loader2,
    Plus,
    Trash2,
    RefreshCw,
} from "lucide-react";

// Volume pricing tiers
const VOLUME_PRICING = [
    { min: 25, max: 49, price: 2500 },
    { min: 50, max: 99, price: 2300 },
    { min: 100, max: 199, price: 2100 },
    { min: 200, max: 349, price: 1900 },
    { min: 350, max: 499, price: 1700 },
    { min: 500, max: Infinity, price: 0 },
];

interface LineItem {
    description: string;
    quantity: number;
    unitPriceInCents: number;
}

interface InvoiceFormData {
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    billingAddress: string;
    userCount: number;
    pricePerUser: number | null;
    discountPercent: number;
    paymentTerms: string;
    notes: string;
    internalNotes: string;
    sendNow: boolean;
    lineItems: LineItem[];
}

interface Invoice {
    id: string;
    invoiceNumber: string;
    status: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    userCount: number;
    totalAmount: number;
    amountDue: number;
    issueDate: string;
    dueDate: string;
    hostedInvoiceUrl?: string;
    invoicePdfUrl?: string;
}

function calculatePricePerUser(userCount: number): number {
    const tier = VOLUME_PRICING.find(
        (t) => userCount >= t.min && userCount <= t.max
    );
    return tier?.price || 0;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function getStatusColor(status: string): string {
    switch (status) {
        case "PAID":
            return "text-emerald-400 bg-emerald-500/10";
        case "SENT":
        case "VIEWED":
            return "text-blue-400 bg-blue-500/10";
        case "DRAFT":
            return "text-zinc-400 bg-zinc-500/10";
        case "OVERDUE":
            return "text-red-400 bg-red-500/10";
        case "PARTIALLY_PAID":
            return "text-amber-400 bg-amber-500/10";
        default:
            return "text-zinc-400 bg-zinc-500/10";
    }
}

export default function InvoiceGenerator() {
    const [activeTab, setActiveTab] = useState<"create" | "list">("create");
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null);

    const [form, setForm] = useState<InvoiceFormData>({
        companyName: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        billingAddress: "",
        userCount: 200,
        pricePerUser: null,
        discountPercent: 0,
        paymentTerms: "NET_30",
        notes: "",
        internalNotes: "",
        sendNow: false,
        lineItems: [],
    });

    const calculatedPrice = calculatePricePerUser(form.userCount);
    const effectivePrice = form.pricePerUser || calculatedPrice;
    const subtotal = form.userCount * effectivePrice;
    const discountAmount = subtotal * (form.discountPercent / 100);
    const totalAmount = subtotal - discountAmount;

    const fetchInvoices = useCallback(async () => {
        try {
            const response = await fetch("/api/stripe/invoice");
            const data = await response.json();
            setInvoices(data.invoices || []);
        } catch (err) {
            console.error("Failed to fetch invoices:", err);
        }
    }, []);

    useEffect(() => {
        if (activeTab === "list") {
            fetchInvoices();
        }
    }, [activeTab, fetchInvoices]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("/api/stripe/invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    pricePerUser: form.pricePerUser || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create invoice");
            }

            setSuccess(
                `Invoice ${data.invoice.invoiceNumber} created successfully!`
            );
            setCreatedInvoice(data.invoice);

            // Reset form
            setForm({
                companyName: "",
                contactName: "",
                contactEmail: "",
                contactPhone: "",
                billingAddress: "",
                userCount: 200,
                pricePerUser: null,
                discountPercent: 0,
                paymentTerms: "NET_30",
                notes: "",
                internalNotes: "",
                sendNow: false,
                lineItems: [],
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleInvoiceAction = async (invoiceId: string, action: string) => {
        try {
            const response = await fetch(`/api/stripe/invoice/${invoiceId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }

            fetchInvoices();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Action failed");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold flex items-center gap-3">
                            <FileText className="w-7 h-7 text-cyan-400" />
                            Enterprise Invoice Manager
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Generate Net-30/60 invoices for enterprise customers
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab("create")}
                            className={`px-4 py-2 rounded-md transition-colors ${activeTab === "create"
                                    ? "bg-cyan-500/20 text-cyan-400"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <Plus className="w-4 h-4 inline mr-2" />
                            Create Invoice
                        </button>
                        <button
                            onClick={() => setActiveTab("list")}
                            className={`px-4 py-2 rounded-md transition-colors ${activeTab === "list"
                                    ? "bg-cyan-500/20 text-cyan-400"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <FileText className="w-4 h-4 inline mr-2" />
                            All Invoices
                        </button>
                    </div>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="text-red-300">{error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-red-400 hover:text-red-300"
                        >
                            ×
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-emerald-300">{success}</span>
                        <button
                            onClick={() => setSuccess(null)}
                            className="ml-auto text-emerald-400 hover:text-emerald-300"
                        >
                            ×
                        </button>
                    </div>
                )}

                {activeTab === "create" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
                            >
                                {/* Customer Info */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-cyan-400" />
                                        Customer Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.companyName}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        companyName:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                                placeholder="Acme Corporation"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                Contact Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.contactName}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        contactName:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                                placeholder="John Smith"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                <Mail className="w-4 h-4 inline mr-1" />
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={form.contactEmail}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        contactEmail:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                                placeholder="john@acme.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                <Phone className="w-4 h-4 inline mr-1" />
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={form.contactPhone}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        contactPhone:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                Billing Address
                                            </label>
                                            <textarea
                                                value={form.billingAddress}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        billingAddress:
                                                            e.target.value,
                                                    })
                                                }
                                                rows={2}
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500 resize-none"
                                                placeholder="123 Business Ave, Suite 100, City, State 12345"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                        <Calculator className="w-5 h-5 text-cyan-400" />
                                        Pricing
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                <Users className="w-4 h-4 inline mr-1" />
                                                Number of Users *
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min={25}
                                                value={form.userCount}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        userCount: parseInt(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                            />
                                            <p className="text-xs text-zinc-500 mt-1">
                                                Minimum 25 users
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                <DollarSign className="w-4 h-4 inline mr-1" />
                                                Price Per User
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={
                                                        form.pricePerUser || ""
                                                    }
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            pricePerUser:
                                                                e.target.value
                                                                    ? parseInt(
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                    : null,
                                                        })
                                                    }
                                                    placeholder={calculatedPrice.toString()}
                                                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                                />
                                            </div>
                                            <p className="text-xs text-zinc-500 mt-1">
                                                Auto:{" "}
                                                {formatCurrency(calculatedPrice)}
                                                /user
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                Discount %
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                max={50}
                                                value={form.discountPercent}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        discountPercent:
                                                            parseFloat(
                                                                e.target.value
                                                            ) || 0,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Terms */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-cyan-400" />
                                        Payment Terms
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            "DUE_ON_RECEIPT",
                                            "NET_15",
                                            "NET_30",
                                            "NET_45",
                                            "NET_60",
                                            "NET_90",
                                        ].map((term) => (
                                            <button
                                                key={term}
                                                type="button"
                                                onClick={() =>
                                                    setForm({
                                                        ...form,
                                                        paymentTerms: term,
                                                    })
                                                }
                                                className={`px-4 py-3 rounded-lg border transition-colors ${form.paymentTerms === term
                                                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                                                    }`}
                                            >
                                                {term.replace("_", " ")}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                Invoice Notes (visible to customer)
                                            </label>
                                            <textarea
                                                value={form.notes}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        notes: e.target.value,
                                                    })
                                                }
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500 resize-none"
                                                placeholder="Thank you for your business!"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-1">
                                                Internal Notes (hidden)
                                            </label>
                                            <textarea
                                                value={form.internalNotes}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        internalNotes:
                                                            e.target.value,
                                                    })
                                                }
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-cyan-500 resize-none"
                                                placeholder="Sales rep: Jane, Deal ID: 12345"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Send Now Toggle */}
                                <div className="mb-6">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.sendNow}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    sendNow: e.target.checked,
                                                })
                                            }
                                            className="w-5 h-5 rounded bg-zinc-800 border-zinc-700 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        <span className="text-zinc-300">
                                            Send invoice immediately after
                                            creation
                                        </span>
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : form.sendNow ? (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Create & Send Invoice
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-5 h-5" />
                                            Create Draft Invoice
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="space-y-6">
                            {/* Volume Pricing Tiers */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-emerald-400" />
                                    Volume Pricing
                                </h3>
                                <div className="space-y-2">
                                    {VOLUME_PRICING.slice(0, -1).map(
                                        (tier, i) => (
                                            <div
                                                key={i}
                                                className={`flex justify-between text-sm py-2 px-3 rounded-lg ${form.userCount >=
                                                        tier.min &&
                                                        form.userCount <= tier.max
                                                        ? "bg-cyan-500/10 text-cyan-400"
                                                        : "text-zinc-400"
                                                    }`}
                                            >
                                                <span>
                                                    {tier.min}-{tier.max} users
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(tier.price)}
                                                    /user
                                                </span>
                                            </div>
                                        )
                                    )}
                                    <div className="flex justify-between text-sm py-2 px-3 text-zinc-500">
                                        <span>500+ users</span>
                                        <span>Custom</span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Summary */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h3 className="text-lg font-medium mb-4">
                                    Invoice Summary
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Users</span>
                                        <span className="text-white">
                                            {form.userCount}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Price/User</span>
                                        <span className="text-white">
                                            {formatCurrency(effectivePrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Subtotal</span>
                                        <span className="text-white">
                                            {formatCurrency(subtotal)}
                                        </span>
                                    </div>
                                    {form.discountPercent > 0 && (
                                        <div className="flex justify-between text-emerald-400">
                                            <span>
                                                Discount ({form.discountPercent}
                                                %)
                                            </span>
                                            <span>
                                                -{formatCurrency(discountAmount)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="border-t border-zinc-700 pt-3 flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span className="text-cyan-400">
                                            {formatCurrency(totalAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Created Invoice */}
                            {createdInvoice && (
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
                                    <h3 className="text-lg font-medium mb-3 text-emerald-400 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        Invoice Created
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-zinc-300">
                                            <strong>Number:</strong>{" "}
                                            {createdInvoice.invoiceNumber}
                                        </p>
                                        <p className="text-zinc-300">
                                            <strong>Status:</strong>{" "}
                                            {createdInvoice.status}
                                        </p>
                                        <p className="text-zinc-300">
                                            <strong>Total:</strong>{" "}
                                            {formatCurrency(
                                                createdInvoice.totalAmount
                                            )}
                                        </p>
                                    </div>
                                    {createdInvoice.hostedInvoiceUrl && (
                                        <a
                                            href={
                                                createdInvoice.hostedInvoiceUrl
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            View Invoice
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "list" && (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl">
                        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                            <h3 className="font-medium">All Invoices</h3>
                            <button
                                onClick={fetchInvoices}
                                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </div>

                        {invoices.length === 0 ? (
                            <div className="p-12 text-center text-zinc-500">
                                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No invoices yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {invoices.map((invoice) => (
                                    <div
                                        key={invoice.id}
                                        className="p-4 hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium">
                                                        {invoice.invoiceNumber}
                                                    </span>
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                                            invoice.status
                                                        )}`}
                                                    >
                                                        {invoice.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-zinc-400 mt-1">
                                                    {invoice.companyName} •{" "}
                                                    {invoice.userCount} users
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {formatCurrency(
                                                        invoice.totalAmount
                                                    )}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    Due{" "}
                                                    {new Date(
                                                        invoice.dueDate
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                {invoice.status === "DRAFT" && (
                                                    <button
                                                        onClick={() =>
                                                            handleInvoiceAction(
                                                                invoice.id,
                                                                "send"
                                                            )
                                                        }
                                                        className="p-2 hover:bg-zinc-700 rounded-lg text-blue-400"
                                                        title="Send"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {invoice.hostedInvoiceUrl && (
                                                    <a
                                                        href={
                                                            invoice.hostedInvoiceUrl
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-zinc-700 rounded-lg text-cyan-400"
                                                        title="View"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {invoice.invoicePdfUrl && (
                                                    <a
                                                        href={
                                                            invoice.invoicePdfUrl
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400"
                                                        title="Download PDF"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {invoice.status !== "PAID" &&
                                                    invoice.status !==
                                                    "VOID" && (
                                                        <button
                                                            onClick={() =>
                                                                handleInvoiceAction(
                                                                    invoice.id,
                                                                    "mark_paid"
                                                                )
                                                            }
                                                            className="p-2 hover:bg-zinc-700 rounded-lg text-emerald-400"
                                                            title="Mark Paid"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                {invoice.status === "DRAFT" && (
                                                    <button
                                                        onClick={() =>
                                                            handleInvoiceAction(
                                                                invoice.id,
                                                                "void"
                                                            )
                                                        }
                                                        className="p-2 hover:bg-zinc-700 rounded-lg text-red-400"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
