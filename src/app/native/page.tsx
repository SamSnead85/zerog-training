"use client";

import Link from "next/link";
import {
    ArrowRight,
    Shield,
    CheckCircle2,
    Target,
    Brain,
    Sparkles,
    Layers,
    Zap,
    Users,
    BarChart3,
    Award,
    Play,
} from "lucide-react";

export default function NativeFrameworkPage() {
    const frameworkPillars = [
        {
            letter: "N",
            title: "Navigate",
            description: "Assess your technical readiness and data landscape. Identify where AI implementation will deliver the highest ROI.",
            outcomes: ["Technical Readiness Audit", "Data Infrastructure Review", "Implementation Roadmap"],
        },
        {
            letter: "A",
            title: "Activate",
            description: "Build and deploy your first AI workflow in a sandboxed environment. Hands-on from day one.",
            outcomes: ["Pilot Project Deployment", "Sandbox Environment", "First Working Prototype"],
        },
        {
            letter: "T",
            title: "Transform",
            description: "Scale your initial success into a production-grade, integrated system capable of enterprise demands.",
            outcomes: ["Production Deployment", "Enterprise Scale", "Performance Optimization"],
        },
        {
            letter: "I",
            title: "Integrate",
            description: "Connect your AI capabilities across the enterprise using MLOps pipelines and secure API integrations.",
            outcomes: ["MLOps Implementation", "API Integrations", "Cross-System Workflows"],
        },
        {
            letter: "V",
            title: "Validate",
            description: "Measure technical performance and business impact. Verify compliance and ensure reliability.",
            outcomes: ["Performance Metrics", "ROI Validation", "Compliance Verification"],
        },
        {
            letter: "E",
            title: "Evolve",
            description: "Use advanced modules to maintain, monitor, and continuously improve your AI systems for long-term self-sufficiency.",
            outcomes: ["Continuous Improvement", "Self-Sufficiency", "Advanced Capabilities"],
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="font-playfair text-2xl font-medium tracking-tight italic">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/native" className="text-sm text-white hover:text-white transition-colors">
                            Framework
                        </Link>
                        <Link href="/ai-native" className="text-sm text-white/40 hover:text-white transition-colors">
                            Platform
                        </Link>
                        <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">
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
            <section className="relative pt-40 pb-8 px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.05),transparent)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
                        <span className="text-sm font-medium text-cyan-400">Post-Strategy Implementation Standard</span>
                    </div>

                    <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
                        The NATIVE Framework<sup className="text-lg md:text-xl align-super ml-1">™</sup>
                    </h1>

                    <p className="text-lg text-white/50 max-w-3xl mx-auto mb-8">
                        The enterprise implementation standard for turning AI strategy into production-grade capability.
                        <span className="block mt-2 text-white/70">Six phases from pilot to self-sufficiency.</span>
                    </p>

                    <p className="text-sm text-white/40 max-w-2xl mx-auto">
                        You've learned the theory. You've completed the workshops. Now it's time to build.
                    </p>
                </div>
            </section>

            {/* Framework Pillars Detail */}
            <section className="py-12 px-8">
                <div className="mx-auto max-w-6xl">
                    {/* NATIVE Letters as Section Header */}
                    <div className="flex justify-center gap-3 md:gap-4 mb-12">
                        {frameworkPillars.map((pillar) => (
                            <div
                                key={pillar.letter}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-xl md:text-2xl font-bold"
                            >
                                {pillar.letter}
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-white/40 text-sm mb-16 uppercase tracking-wider">The 6 Phases of AI-Native Transformation</p>
                    <div className="grid gap-6">
                        {frameworkPillars.map((pillar, i) => (
                            <div
                                key={pillar.letter}
                                className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-2xl font-bold shrink-0">
                                        {pillar.letter}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
                                        <p className="text-white/50 mb-4">{pillar.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pillar.outcomes.map((outcome, j) => (
                                                <div
                                                    key={j}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/70"
                                                >
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                    {outcome}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-6xl font-bold text-white/5 hidden md:block">
                                        0{i + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why NATIVE */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-5xl">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-16">
                        Why NATIVE<sup className="text-base align-super ml-1">™</sup>?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Target,
                                title: "Proven Methodology",
                                desc: "Built on frameworks from DeepLearning.AI, Google Cloud, and enterprise best practices",
                            },
                            {
                                icon: Users,
                                title: "Role-Specific",
                                desc: "Customized transformation paths for every role in your organization",
                            },
                            {
                                icon: BarChart3,
                                title: "Measurable Impact",
                                desc: "Clear KPIs and success metrics at every phase of transformation",
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                                <item.icon className="h-8 w-8 mx-auto mb-4 text-white/60" />
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-white/40">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-montserrat text-4xl font-bold mb-4">
                        Ready to Transform?
                    </h2>
                    <p className="text-lg text-white/40 mb-10">
                        See how the NATIVE Framework™ can accelerate your AI transformation
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                                Schedule Consultation
                            </button>
                        </Link>
                        <Link href="/ai-native">
                            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2">
                                Explore Platform
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
                        <Link href="/native" className="hover:text-white transition-colors">Framework</Link>
                        <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <div className="text-xs text-white/20">© 2025 ScaledNative™. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
