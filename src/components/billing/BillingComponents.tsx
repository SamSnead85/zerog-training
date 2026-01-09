"use client";

import { Card, Badge, Button } from "@/components/ui";
import {
    CreditCard,
    Check,
    Sparkles,
    Users,
    Award,
    Clock,
    Shield,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
    ctaLabel?: string;
}

// Pricing card
export function PricingCard({
    plan,
    onSelect,
    currentPlan,
}: {
    plan: PricingPlan;
    onSelect: (planId: string) => void;
    currentPlan?: string;
}) {
    const isCurrentPlan = currentPlan === plan.id;

    return (
        <Card className={cn(
            "p-6 relative overflow-hidden transition-all",
            plan.highlighted
                ? "bg-gradient-to-br from-primary/10 to-emerald-500/5 border-primary/30"
                : "bg-white/[0.02] border-white/10",
            isCurrentPlan && "ring-2 ring-emerald-500"
        )}>
            {plan.badge && (
                <Badge className="absolute top-4 right-4 bg-primary text-white">
                    {plan.badge}
                </Badge>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm">{plan.description}</p>
            </div>

            <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-white/50">/{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => onSelect(plan.id)}
                disabled={isCurrentPlan}
            >
                {isCurrentPlan ? "Current Plan" : plan.ctaLabel || "Get Started"}
            </Button>
        </Card>
    );
}

// Pricing comparison table
export function PricingComparison({
    plans,
    features,
}: {
    plans: { id: string; name: string; price: number }[];
    features: { name: string; values: Record<string, boolean | string> }[];
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-4 font-semibold">Features</th>
                        {plans.map(plan => (
                            <th key={plan.id} className="p-4 text-center">
                                <div className="font-bold">{plan.name}</div>
                                <div className="text-sm text-white/50">${plan.price}/mo</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature, i) => (
                        <tr key={i} className="border-b border-white/5">
                            <td className="p-4 text-sm">{feature.name}</td>
                            {plans.map(plan => (
                                <td key={plan.id} className="p-4 text-center">
                                    {typeof feature.values[plan.id] === "boolean" ? (
                                        feature.values[plan.id] ? (
                                            <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                                        ) : (
                                            <span className="text-white/20">—</span>
                                        )
                                    ) : (
                                        <span className="text-sm">{feature.values[plan.id]}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Subscription status card
export function SubscriptionStatus({
    plan,
    status,
    nextBillingDate,
    onManage,
    onUpgrade,
}: {
    plan: { name: string; price: number; period: string };
    status: "active" | "cancelled" | "past_due" | "trialing";
    nextBillingDate?: string;
    onManage: () => void;
    onUpgrade: () => void;
}) {
    const statusConfig = {
        active: { label: "Active", color: "bg-emerald-500/20 text-emerald-400" },
        cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400" },
        past_due: { label: "Past Due", color: "bg-amber-500/20 text-amber-400" },
        trialing: { label: "Trial", color: "bg-blue-500/20 text-blue-400" },
    };

    const config = statusConfig[status];

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="font-semibold mb-1">Subscription</h3>
                    <Badge className={config.color}>{config.label}</Badge>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onManage}>
                        Manage
                    </Button>
                    <Button size="sm" onClick={onUpgrade}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Upgrade
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xs text-white/40 mb-1">Plan</p>
                    <p className="font-semibold">{plan.name}</p>
                </div>
                <div>
                    <p className="text-xs text-white/40 mb-1">Amount</p>
                    <p className="font-semibold">${plan.price}/{plan.period}</p>
                </div>
                {nextBillingDate && (
                    <div>
                        <p className="text-xs text-white/40 mb-1">Next Billing</p>
                        <p className="font-semibold">
                            {new Date(nextBillingDate).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
}

// Payment method card
export function PaymentMethodCard({
    method,
    isDefault,
    onSetDefault,
    onRemove,
}: {
    method: {
        id: string;
        type: "card";
        brand: string;
        last4: string;
        expiryMonth: number;
        expiryYear: number;
    };
    isDefault: boolean;
    onSetDefault: () => void;
    onRemove: () => void;
}) {
    return (
        <div className={cn(
            "flex items-center justify-between p-4 rounded-lg border transition-colors",
            isDefault
                ? "bg-primary/10 border-primary/30"
                : "bg-white/5 border-white/10"
        )}>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{method.brand}</span>
                        <span className="text-white/50">•••• {method.last4}</span>
                        {isDefault && (
                            <Badge className="bg-primary/20 text-primary text-xs">Default</Badge>
                        )}
                    </div>
                    <p className="text-xs text-white/40">
                        Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                {!isDefault && (
                    <Button variant="outline" size="sm" onClick={onSetDefault}>
                        Set Default
                    </Button>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRemove}
                    className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                >
                    Remove
                </Button>
            </div>
        </div>
    );
}
