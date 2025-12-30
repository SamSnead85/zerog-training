"use client";

import Link from "next/link";
import {
    Building2,
    Shield,
    Users,
    BarChart3,
    Lock,
    Zap,
    Award,
    HeadphonesIcon,
    ChevronRight,
    Check,
    ArrowRight,
    Globe,
    Layers,
    Target,
    Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// ENTERPRISE FEATURES
// =============================================================================

const enterpriseFeatures = [
    {
        icon: Users,
        title: "Unlimited Users",
        description: "Scale your AI training to 10, 100, or 10,000+ employees without per-seat pricing constraints.",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "SSO/SAML integration, SOC 2 Type II compliance, data encryption at rest and in transit.",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Role-based reporting, department comparisons, skills gap analysis, and ROI tracking.",
    },
    {
        icon: Layers,
        title: "Custom Content",
        description: "Work with our team to create tailored modules for your industry, tech stack, or use cases.",
    },
    {
        icon: Lock,
        title: "Private Deployment",
        description: "On-premise or dedicated cloud options for organizations with strict data residency requirements.",
    },
    {
        icon: HeadphonesIcon,
        title: "Dedicated Support",
        description: "Named customer success manager, priority support, and quarterly business reviews.",
    },
];

const useCases = [
    {
        title: "Workforce Reskilling",
        description: "Transform your existing workforce into AI-ready talent with structured learning paths.",
        stat: "73%",
        statLabel: "completion rate",
    },
    {
        title: "New Hire Onboarding",
        description: "Get new employees productive faster with role-specific AI training from day one.",
        stat: "2x",
        statLabel: "faster onboarding",
    },
    {
        title: "Compliance Training",
        description: "Track completion, certifications, and skill assessments for regulatory requirements.",
        stat: "100%",
        statLabel: "audit-ready",
    },
];

const logos = [
    "Accenture", "Deloitte", "McKinsey", "BCG", "Bain",
    "Google", "Microsoft", "Amazon", "Meta", "Apple"
];

// =============================================================================
// ENTERPRISE PAGE
// =============================================================================

export default function EnterprisePage() {
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
                        <Link href="/enterprise" className="text-sm text-white font-medium">Enterprise</Link>
                        <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/contact?type=enterprise">
                            <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                                Contact Sales
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="py-24 px-6 border-b border-white/5 bg-gradient-to-b from-purple-500/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6">
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm">Enterprise AI Training</span>
                    </div>
                    <h1 className="font-montserrat text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Transform Your Workforce Into AI-Native Talent
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
                        Comprehensive AI training at scale. Custom content, enterprise security,
                        and the support you need to build an AI-ready organization.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/contact?type=enterprise">
                            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2">
                                Talk to Sales
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                        <Link href="/catalog">
                            <button className="px-8 py-4 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors">
                                Explore Curriculum
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Logos */}
            <section className="py-12 px-6 border-b border-white/5 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto">
                    <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-8">
                        Trusted by leading organizations
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12 text-white/20">
                        {logos.map((logo, i) => (
                            <span key={i} className="text-lg font-semibold">{logo}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-montserrat text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
                        <p className="text-white/50">Everything you need to train thousands of employees on AI</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enterpriseFeatures.map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-white/60" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-white/50">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-6 bg-white/[0.01] border-t border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-montserrat text-3xl font-bold mb-4">Built for Enterprise Use Cases</h2>
                        <p className="text-white/50">From onboarding to upskilling, we've got you covered</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="text-4xl font-bold text-white mb-1">{useCase.stat}</div>
                                <div className="text-xs text-white/40 uppercase tracking-wider mb-4">{useCase.statLabel}</div>
                                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                                <p className="text-sm text-white/50">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-montserrat text-3xl font-bold mb-4">What's Included</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Unlimited users",
                            "Full 8-module curriculum",
                            "All 4 certification levels",
                            "Custom learning paths",
                            "AI Learning Assistant",
                            "Team & role-based analytics",
                            "SSO/SAML integration",
                            "Dedicated success manager",
                            "Priority support (24/7)",
                            "API access",
                            "Custom content creation",
                            "White-label options",
                            "SLA guarantee",
                            "Quarterly business reviews",
                            "Executive briefings",
                            "On-premise deployment option",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                                <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <Brain className="h-16 w-16 text-white/20 mx-auto mb-6" />
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-6">
                        Ready to Build an AI-Native Workforce?
                    </h2>
                    <p className="text-lg text-white/50 mb-10">
                        Join the organizations transforming their teams with ScaledNative.
                        Get a customized demo and pricing for your organization.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact?type=enterprise">
                            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2">
                                Schedule a Demo
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                        <Link href="/pricing">
                            <button className="px-8 py-4 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors">
                                View Pricing
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
                        <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
