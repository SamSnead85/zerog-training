"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Check,
    X,
    Users,
    Building2,
    Zap,
    Shield,
    HeadphonesIcon,
    Award,
    BookOpen,
    Brain,
    Code,
    BarChart3,
    Lock,
    Star,
    ArrowRight,
    Info,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// PRICING TIERS
// =============================================================================

interface PricingTier {
    id: string;
    name: string;
    description: string;
    price: { monthly: number; annual: number } | "custom";
    highlighted?: boolean;
    badge?: string;
    features: { text: string; included: boolean; tooltip?: string }[];
    cta: { text: string; href: string };
    users: string;
}

const pricingTiers: PricingTier[] = [
    {
        id: "starter",
        name: "Starter",
        description: "Perfect for individuals and small teams getting started with AI training",
        price: { monthly: 49, annual: 39 },
        users: "Up to 5 users",
        features: [
            { text: "AI Fundamentals curriculum", included: true },
            { text: "Interactive quizzes & assessments", included: true },
            { text: "Basic code exercises", included: true },
            { text: "Community forum access", included: true },
            { text: "Email support", included: true },
            { text: "Foundations certification", included: true },
            { text: "Advanced certifications", included: false },
            { text: "Custom learning paths", included: false },
            { text: "Team analytics", included: false },
            { text: "SSO/SAML", included: false },
            { text: "API access", included: false },
        ],
        cta: { text: "Start Free Trial", href: "/signup?plan=starter" },
    },
    {
        id: "professional",
        name: "Professional",
        description: "For growing teams that need comprehensive AI training with certifications",
        price: { monthly: 99, annual: 79 },
        highlighted: true,
        badge: "Most Popular",
        users: "Up to 25 users",
        features: [
            { text: "Full curriculum (8 modules)", included: true },
            { text: "Interactive quizzes & assessments", included: true },
            { text: "Advanced code sandbox", included: true },
            { text: "AI Learning Assistant", included: true },
            { text: "Priority support", included: true },
            { text: "All 4 certification levels", included: true },
            { text: "Custom learning paths", included: true },
            { text: "Team progress dashboard", included: true },
            { text: "Manager reporting", included: true },
            { text: "SSO/SAML", included: false },
            { text: "API access", included: false },
        ],
        cta: { text: "Start Free Trial", href: "/signup?plan=professional" },
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For large organizations requiring advanced security, integrations, and support",
        price: "custom",
        users: "Unlimited users",
        features: [
            { text: "Everything in Professional", included: true },
            { text: "Advanced analytics & reporting", included: true },
            { text: "White-label options", included: true },
            { text: "Custom content creation", included: true },
            { text: "Dedicated success manager", included: true },
            { text: "SSO/SAML integration", included: true },
            { text: "API access", included: true },
            { text: "SLA guarantee", included: true },
            { text: "On-premise deployment option", included: true },
            { text: "Custom integrations", included: true },
            { text: "Executive briefings", included: true },
        ],
        cta: { text: "Contact Sales", href: "/contact?type=enterprise" },
    },
];

// =============================================================================
// FAQ DATA
// =============================================================================

const faqs = [
    {
        question: "Can I switch plans at any time?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at your next billing cycle.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), ACH bank transfers for annual plans, and can arrange invoicing for Enterprise customers.",
    },
    {
        question: "Is there a free trial?",
        answer: "Yes! All paid plans include a 14-day free trial with full access to features. No credit card required to start.",
    },
    {
        question: "How does user-based pricing work?",
        answer: "You're billed based on the number of active users in your organization. Active users are those who have logged in at least once in the billing period.",
    },
    {
        question: "Do certifications cost extra?",
        answer: "No, certifications are included in all plans. The Starter plan includes Foundations certification, while Professional and Enterprise include all 4 certification levels.",
    },
    {
        question: "What's included in custom content creation?",
        answer: "Enterprise customers can work with our team to create custom modules tailored to their industry, tech stack, or specific use cases. This includes branded content, custom assessments, and role-specific learning paths.",
    },
];

// =============================================================================
// COMPONENTS
// =============================================================================

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex items-center justify-between text-left"
            >
                <span className="font-medium">{question}</span>
                <ChevronDown className={cn(
                    "h-5 w-5 text-white/40 transition-transform",
                    isOpen && "rotate-180"
                )} />
            </button>
            {isOpen && (
                <div className="pb-5 text-white/60 text-sm leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
}

// =============================================================================
// MAIN PRICING PAGE
// =============================================================================

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/catalog" className="text-sm text-white/60 hover:text-white transition-colors">Catalog</Link>
                        <Link href="/certifications" className="text-sm text-white/60 hover:text-white transition-colors">Certifications</Link>
                        <Link href="/enterprise" className="text-sm text-white/60 hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/pricing" className="text-sm text-white font-medium">Pricing</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Sign In</Link>
                        <Link href="/signup" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-montserrat text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
                        Choose the plan that fits your team. All plans include a 14-day free trial.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-1 bg-white/5 rounded-full">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={cn(
                                "px-4 py-2 text-sm rounded-full transition-colors",
                                billingCycle === "monthly" ? "bg-white text-black" : "text-white/60"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("annual")}
                            className={cn(
                                "px-4 py-2 text-sm rounded-full transition-colors flex items-center gap-2",
                                billingCycle === "annual" ? "bg-white text-black" : "text-white/60"
                            )}
                        >
                            Annual
                            <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={cn(
                                    "relative rounded-2xl border p-6 flex flex-col",
                                    tier.highlighted
                                        ? "border-white/30 bg-white/[0.04]"
                                        : "border-white/10 bg-white/[0.02]"
                                )}
                            >
                                {/* Badge */}
                                {tier.badge && (
                                    <div className="absolute -top-3 left-6 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                                        {tier.badge}
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                                    <p className="text-sm text-white/50">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    {tier.price === "custom" ? (
                                        <div className="text-3xl font-bold">Custom</div>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-bold">
                                                    ${billingCycle === "annual" ? tier.price.annual : tier.price.monthly}
                                                </span>
                                                <span className="text-white/40">/user/mo</span>
                                            </div>
                                            {billingCycle === "annual" && (
                                                <p className="text-xs text-white/40 mt-1">
                                                    Billed annually (${tier.price.annual * 12}/user/year)
                                                </p>
                                            )}
                                        </>
                                    )}
                                    <p className="text-sm text-white/50 mt-2">{tier.users}</p>
                                </div>

                                {/* CTA */}
                                <Link href={tier.cta.href}>
                                    <button className={cn(
                                        "w-full py-3 rounded-full font-medium transition-colors mb-6",
                                        tier.highlighted
                                            ? "bg-white text-black hover:bg-white/90"
                                            : "bg-white/10 hover:bg-white/20"
                                    )}>
                                        {tier.cta.text}
                                    </button>
                                </Link>

                                {/* Features */}
                                <div className="flex-1">
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                                        What's included
                                    </p>
                                    <ul className="space-y-2">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                {feature.included ? (
                                                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <X className="h-4 w-4 text-white/20 mt-0.5 flex-shrink-0" />
                                                )}
                                                <span className={feature.included ? "" : "text-white/40"}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-16 px-6 bg-white/[0.01] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-12">Compare All Features</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 font-medium">Feature</th>
                                    <th className="text-center py-4 font-medium">Starter</th>
                                    <th className="text-center py-4 font-medium">Professional</th>
                                    <th className="text-center py-4 font-medium">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">Users included</td>
                                    <td className="py-4 text-center">5</td>
                                    <td className="py-4 text-center">25</td>
                                    <td className="py-4 text-center">Unlimited</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">Modules access</td>
                                    <td className="py-4 text-center">2</td>
                                    <td className="py-4 text-center">All 8</td>
                                    <td className="py-4 text-center">All + Custom</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">Certifications</td>
                                    <td className="py-4 text-center">1</td>
                                    <td className="py-4 text-center">4</td>
                                    <td className="py-4 text-center">4 + Custom</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">AI Assistant</td>
                                    <td className="py-4 text-center"><X className="h-4 w-4 text-white/20 mx-auto" /></td>
                                    <td className="py-4 text-center"><Check className="h-4 w-4 text-emerald-400 mx-auto" /></td>
                                    <td className="py-4 text-center"><Check className="h-4 w-4 text-emerald-400 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">Analytics</td>
                                    <td className="py-4 text-center">Basic</td>
                                    <td className="py-4 text-center">Team</td>
                                    <td className="py-4 text-center">Enterprise</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">Support</td>
                                    <td className="py-4 text-center">Email</td>
                                    <td className="py-4 text-center">Priority</td>
                                    <td className="py-4 text-center">Dedicated CSM</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">SSO/SAML</td>
                                    <td className="py-4 text-center"><X className="h-4 w-4 text-white/20 mx-auto" /></td>
                                    <td className="py-4 text-center"><X className="h-4 w-4 text-white/20 mx-auto" /></td>
                                    <td className="py-4 text-center"><Check className="h-4 w-4 text-emerald-400 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 text-white/60">API access</td>
                                    <td className="py-4 text-center"><X className="h-4 w-4 text-white/20 mx-auto" /></td>
                                    <td className="py-4 text-center"><X className="h-4 w-4 text-white/20 mx-auto" /></td>
                                    <td className="py-4 text-center"><Check className="h-4 w-4 text-emerald-400 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div>
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise CTA */}
            <section className="py-16 px-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <Building2 className="h-12 w-12 text-white/40 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
                    <p className="text-white/50 mb-8">
                        Our enterprise team can create a tailored training program for your organization,
                        including custom content, integrations, and dedicated support.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/contact?type=enterprise">
                            <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                                Contact Sales
                            </button>
                        </Link>
                        <Link href="/enterprise">
                            <button className="px-6 py-3 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white/30">
                    <span>© 2025 ScaledNative™. All rights reserved.</span>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
