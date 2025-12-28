"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";
import {
    Check,
    Sparkles,
    Building2,
    Users,
    Zap,
    Shield,
    HeadphonesIcon,
    Infinity,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
    id: string;
    name: string;
    description: string;
    price: number;
    period: "month" | "year";
    features: string[];
    highlighted?: boolean;
    badge?: string;
    generationsPerMonth: number | "unlimited";
    stripePriceId?: string;
}

const pricingTiers: PricingTier[] = [
    {
        id: "enterprise-access",
        name: "Enterprise Access",
        description: "Full AI-Native training for your team",
        price: 75,
        period: "month",
        generationsPerMonth: "unlimited",
        highlighted: true,
        badge: "Per User",
        stripePriceId: "price_enterprise_access_monthly",
        features: [
            "Unlimited training modules",
            "Full AI-Native curriculum access",
            "All 8 certification modules",
            "Interactive labs & exercises",
            "Team analytics dashboard",
            "Progress tracking & reporting",
            "Export to PDF & SCORM",
            "Priority email support",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "Custom solutions for large organizations",
        price: 0, // Contact support
        period: "month",
        generationsPerMonth: "unlimited",
        stripePriceId: "price_enterprise_custom",
        features: [
            "Everything in Enterprise Access",
            "SSO & SAML authentication",
            "Dedicated success manager",
            "Custom integrations (HRIS, LMS)",
            "SCIM user provisioning",
            "SLA guarantee",
            "On-premise deployment option",
            "Volume discounts available",
        ],
    },
];

interface PricingPageProps {
    onSelectPlan?: (planId: string) => void;
}

export function PricingPage({ onSelectPlan }: PricingPageProps) {
    const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleSelectPlan = async (tier: PricingTier) => {
        setIsLoading(tier.id);

        try {
            // Call Stripe checkout API
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    priceId: tier.stripePriceId,
                    planId: tier.id,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setIsLoading(null);
        }
    };

    const getYearlyPrice = (monthlyPrice: number) => {
        return Math.round(monthlyPrice * 10); // 2 months free
    };

    return (
        <div className="py-12 px-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/10 text-primary">Pricing</Badge>
                <h1 className="text-4xl font-bold mb-4">
                    Simple, transparent pricing
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Start with 2 free generations/day. Upgrade when you're ready.
                </p>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <span className={cn(
                        "text-sm",
                        billingPeriod === "month" ? "text-foreground" : "text-muted-foreground"
                    )}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setBillingPeriod(billingPeriod === "month" ? "year" : "month")}
                        className={cn(
                            "relative w-14 h-7 rounded-full transition-colors",
                            billingPeriod === "year" ? "bg-primary" : "bg-muted"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 w-5 h-5 rounded-full bg-white transition-transform",
                            billingPeriod === "year" ? "translate-x-8" : "translate-x-1"
                        )} />
                    </button>
                    <span className={cn(
                        "text-sm",
                        billingPeriod === "year" ? "text-foreground" : "text-muted-foreground"
                    )}>
                        Yearly
                        <Badge variant="outline" className="ml-2 text-xs text-emerald-500 border-emerald-500/30">
                            Save 17%
                        </Badge>
                    </span>
                </div>
            </div>

            {/* Free Demo Banner */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Try Before You Buy</h3>
                            <p className="text-sm text-muted-foreground">
                                Try a sample lesson free - no credit card required
                            </p>
                        </div>
                    </div>
                    <Link href="/#generator">
                        <Button className="gap-2">
                            Try Free Demo
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {pricingTiers.map((tier) => (
                    <Card
                        key={tier.id}
                        className={cn(
                            "p-6 relative",
                            tier.highlighted && "border-primary/50 shadow-lg shadow-primary/10"
                        )}
                    >
                        {tier.badge && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                                {tier.badge}
                            </Badge>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
                            <p className="text-sm text-muted-foreground">{tier.description}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                {tier.price === 0 ? (
                                    <span className="text-3xl font-bold">Custom</span>
                                ) : (
                                    <>
                                        <span className="text-4xl font-bold">
                                            ${billingPeriod === "month" ? tier.price : getYearlyPrice(tier.price)}
                                        </span>
                                        <span className="text-muted-foreground">
                                            /{billingPeriod === "month" ? "mo" : "yr"}
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {tier.id === "enterprise-access"
                                    ? "per user, per month"
                                    : "Custom pricing for your organization"}
                            </p>
                        </div>

                        <Button
                            className={cn("w-full mb-6", tier.highlighted ? "" : "bg-muted text-foreground hover:bg-muted/80")}
                            onClick={() => tier.price === 0 ? window.location.href = '/contact' : handleSelectPlan(tier)}
                            disabled={isLoading !== null && tier.price !== 0}
                        >
                            {tier.price === 0 ? "Contact Support" : (isLoading === tier.id ? "Loading..." : `Get Started`)}
                        </Button>

                        <ul className="space-y-3">
                            {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>

            {/* Enterprise CTA */}
            <Card className="p-8 mt-12 text-center">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Get a tailored plan for your organization with volume discounts,
                    dedicated support, and custom features.
                </p>
                <Button variant="outline" size="lg">
                    Contact Sales
                </Button>
            </Card>

            {/* Trust Badges */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                    { icon: Shield, title: "Secure Payments", desc: "256-bit SSL encryption" },
                    { icon: Zap, title: "Instant Access", desc: "Start generating immediately" },
                    { icon: HeadphonesIcon, title: "24/7 Support", desc: "We're here to help" },
                ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="flex items-center gap-3 justify-center text-center">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium text-sm">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
