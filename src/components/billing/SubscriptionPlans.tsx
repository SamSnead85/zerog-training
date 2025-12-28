"use client";

/**
 * Subscription Plans Component
 * 
 * Production-ready pricing display with billing toggle,
 * feature comparison, and enterprise contact form.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge, Input } from "@/components/ui";
import {
    Check,
    X,
    Sparkles,
    Users,
    Building2,
    Zap,
    Shield,
    MessageCircle,
    ArrowRight,
    Star,
} from "lucide-react";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

interface Plan {
    id: string;
    name: string;
    description: string;
    monthlyPrice: number | null;
    yearlyPrice: number | null;
    features: string[];
    notIncluded?: string[];
    highlighted?: boolean;
    badge?: string;
    icon: React.ElementType;
    ctaText: string;
    ctaLink: string;
}

// =============================================================================
// PLAN DATA
// =============================================================================

const plans: Plan[] = [
    {
        id: "starter",
        name: "Starter",
        description: "Perfect for individuals exploring AI-powered learning",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            "5 AI-generated modules/month",
            "Basic quiz assessments",
            "Progress tracking",
            "Community support",
        ],
        notIncluded: [
            "Custom branding",
            "Advanced analytics",
            "Team management",
            "API access",
        ],
        icon: Zap,
        ctaText: "Get Started Free",
        ctaLink: "/signup",
    },
    {
        id: "professional",
        name: "Professional",
        description: "For teams ready to transform their training",
        monthlyPrice: 49,
        yearlyPrice: 39,
        features: [
            "Unlimited AI-generated modules",
            "Advanced assessments",
            "Detailed analytics",
            "Team collaboration (up to 10)",
            "Custom branding",
            "Priority support",
            "Certificate generation",
        ],
        notIncluded: [
            "SSO/SAML",
            "API access",
            "Dedicated success manager",
        ],
        highlighted: true,
        badge: "Most Popular",
        icon: Users,
        ctaText: "Start Free Trial",
        ctaLink: "/signup?plan=professional",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For organizations with advanced requirements",
        monthlyPrice: null,
        yearlyPrice: null,
        features: [
            "Everything in Professional",
            "Unlimited team members",
            "SSO/SAML integration",
            "API access",
            "Custom integrations",
            "Advanced compliance",
            "Dedicated success manager",
            "SLA guarantee",
        ],
        icon: Building2,
        ctaText: "Contact Sales",
        ctaLink: "/contact?type=enterprise",
    },
];

// =============================================================================
// COMPONENT
// =============================================================================

interface SubscriptionPlansProps {
    className?: string;
}

export function SubscriptionPlans({ className }: SubscriptionPlansProps) {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

    const getPrice = (plan: Plan) => {
        if (plan.monthlyPrice === null) return "Custom";
        if (plan.monthlyPrice === 0) return "Free";
        const price = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
        return `$${price}`;
    };

    const getSavings = (plan: Plan) => {
        if (!plan.monthlyPrice || !plan.yearlyPrice || plan.monthlyPrice === 0) return null;
        const savings = Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100);
        return savings > 0 ? savings : null;
    };

    return (
        <div className={className}>
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
                <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={cn(
                        "text-sm font-medium transition-colors",
                        billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                    className={cn(
                        "relative w-14 h-7 rounded-full transition-colors",
                        billingPeriod === "yearly" ? "bg-primary" : "bg-muted"
                    )}
                >
                    <div
                        className={cn(
                            "absolute top-1 w-5 h-5 rounded-full bg-white transition-transform",
                            billingPeriod === "yearly" ? "translate-x-8" : "translate-x-1"
                        )}
                    />
                </button>
                <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={cn(
                        "text-sm font-medium transition-colors",
                        billingPeriod === "yearly" ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    Yearly
                    <Badge className="ml-2 bg-emerald-500/20 text-emerald-400">Save 20%</Badge>
                </button>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    const savings = getSavings(plan);

                    return (
                        <div
                            key={plan.id}
                            className={cn(
                                "relative rounded-2xl border p-6 transition-all",
                                plan.highlighted
                                    ? "border-primary bg-primary/5 scale-105 shadow-xl shadow-primary/10"
                                    : "border-white/10 bg-white/[0.02]"
                            )}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground px-3">
                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                        {plan.badge}
                                    </Badge>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                                    plan.highlighted ? "bg-primary/20" : "bg-white/5"
                                )}>
                                    <Icon className={cn(
                                        "h-6 w-6",
                                        plan.highlighted ? "text-primary" : "text-muted-foreground"
                                    )} />
                                </div>
                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{getPrice(plan)}</span>
                                    {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                                        <span className="text-muted-foreground">/mo</span>
                                    )}
                                </div>
                                {billingPeriod === "yearly" && savings && (
                                    <p className="text-sm text-emerald-400 mt-1">
                                        Save {savings}% with annual billing
                                    </p>
                                )}
                            </div>

                            <Link
                                href={plan.ctaLink}
                                className={cn(
                                    "w-full mb-6 inline-flex items-center justify-center h-10 px-4 py-2 rounded-md font-medium text-sm transition-colors",
                                    plan.highlighted
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-white/10 hover:bg-white/20 text-foreground"
                                )}
                            >
                                {plan.ctaText}
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>

                            <div className="space-y-3">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                                {plan.notIncluded?.map((feature) => (
                                    <div key={feature} className="flex items-start gap-2 opacity-50">
                                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Enterprise CTA */}
            <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                    Need a custom solution? Our team is here to help.
                </p>
                <Link
                    href="/contact?type=enterprise"
                    className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm"
                >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Talk to Sales
                </Link>
            </div>
        </div>
    );
}

export default SubscriptionPlans;
