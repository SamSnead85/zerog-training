"use client";

import Link from "next/link";
import {
    ArrowRight,
    Shield,
    CheckCircle2,
    Building2,
    Users,
    Zap,
    BarChart3,
    Lock,
    Headphones,
    FileCheck,
    Globe,
    Award,
} from "lucide-react";

export default function PremiumEnterprisePage() {
    const enterpriseFeatures = [
        {
            icon: Users,
            title: "Unlimited Seats",
            description: "Scale training across your entire organization without per-seat licensing",
        },
        {
            icon: Building2,
            title: "Custom Curricula",
            description: "Training built on your company's tools, policies, and workflows",
        },
        {
            icon: Lock,
            title: "Enterprise SSO",
            description: "Seamless integration with Okta, Azure AD, and your identity provider",
        },
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Real-time dashboards, skill gaps analysis, and ROI tracking",
        },
        {
            icon: Headphones,
            title: "Dedicated Success",
            description: "Named Customer Success Manager and priority support",
        },
        {
            icon: FileCheck,
            title: "Compliance Ready",
            description: "SOC 2 Type II, HIPAA, GDPR compliant with audit trails",
        },
    ];

    const industries = [
        { name: "Healthcare", icon: "🏥" },
        { name: "Financial Services", icon: "🏦" },
        { name: "Manufacturing", icon: "🏭" },
        { name: "Technology", icon: "💻" },
        { name: "Government", icon: "🏛️" },
        { name: "Retail", icon: "🛒" },
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/premium-preview" className="flex items-center gap-3 group">
                        <span className="font-playfair text-2xl font-medium tracking-tight italic">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/premium-preview/native" className="text-sm text-white/40 hover:text-white transition-colors">
                            Framework
                        </Link>
                        <Link href="/premium-preview/platform" className="text-sm text-white/40 hover:text-white transition-colors">
                            Platform
                        </Link>
                        <Link href="/premium-preview/enterprise" className="text-sm text-white hover:text-white transition-colors">
                            Enterprise
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors">
                            Sign in
                        </Link>
                        <Link href="/contact">
                            <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all">
                                Request Demo
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-40 pb-24 px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.05),transparent)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Building2 className="h-4 w-4 text-white/60" />
                        <span className="text-sm text-white/60">Enterprise Solutions</span>
                    </div>

                    <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
                        AI Transformation<br />
                        <span className="text-white/40">at Enterprise Scale</span>
                    </h1>

                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12">
                        Deploy AI-Native training across your entire organization with enterprise-grade
                        security, custom curricula, and dedicated support.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                                Schedule Demo
                            </button>
                        </Link>
                        <Link href="/premium-preview/platform">
                            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all">
                                Explore Platform
                            </button>
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-8 text-xs text-white/30 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Shield className="h-3.5 w-3.5" />
                            SOC 2 Type II
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-3.5 w-3.5" />
                            HIPAA Ready
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-3.5 w-3.5" />
                            GDPR Compliant
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5" />
                            Global Deployment
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Features */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-6xl">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-16">
                        Enterprise-Grade Features
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enterpriseFeatures.map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                                <feature.icon className="h-8 w-8 mb-4 text-white/60" />
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-white/40">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Solutions */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-5xl">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-6">
                        Industry-Specific Training
                    </h2>
                    <p className="text-center text-white/40 mb-16 max-w-xl mx-auto">
                        Pre-built curricula for regulated industries with compliance-ready content
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {industries.map((industry, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-center">
                                <div className="text-3xl mb-3">{industry.icon}</div>
                                <h3 className="font-semibold">{industry.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROI Section */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-5xl">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-16">
                        Proven Results
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: "736%", label: "Average ROI" },
                            { value: "60%", label: "Faster Onboarding" },
                            { value: "95%", label: "Completion Rate" },
                            { value: "40%", label: "Productivity Gain" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="font-montserrat text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-16">
                        What's Included
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Unlimited user licenses",
                            "Custom curriculum development",
                            "Enterprise SSO integration",
                            "Real-time analytics dashboard",
                            "Dedicated Customer Success Manager",
                            "Priority support (24/7)",
                            "Custom branding options",
                            "API access for integrations",
                            "Quarterly business reviews",
                            "On-demand content updates",
                            "Compliance audit support",
                            "Multi-language support",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-montserrat text-4xl font-bold mb-4">
                        Let's Build Your AI Workforce
                    </h2>
                    <p className="text-lg text-white/40 mb-10">
                        Talk to our team about enterprise pricing and custom implementation
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all inline-flex items-center gap-2">
                                Schedule Demo
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-white/5">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                    <div className="flex gap-8 text-sm text-white/30">
                        <Link href="/premium-preview/native" className="hover:text-white transition-colors">Framework</Link>
                        <Link href="/premium-preview/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <div className="text-xs text-white/20">© 2025 ScaledNative™. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
