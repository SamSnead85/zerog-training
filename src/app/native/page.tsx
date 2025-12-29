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
            description: "Assess your organization's AI readiness and identify transformation opportunities",
            outcomes: ["AI Readiness Assessment", "Gap Analysis", "Opportunity Mapping"],
        },
        {
            letter: "A",
            title: "Architect",
            description: "Design role-specific learning paths aligned with business objectives",
            outcomes: ["Custom Curricula", "Role Mapping", "Success Metrics"],
        },
        {
            letter: "T",
            title: "Transform",
            description: "Deliver adaptive, AI-powered training that meets learners where they are",
            outcomes: ["Adaptive Learning", "Hands-On Labs", "Real-World Projects"],
        },
        {
            letter: "I",
            title: "Integrate",
            description: "Embed AI capabilities into daily workflows and existing tools",
            outcomes: ["Workflow Integration", "Tool Training", "Process Automation"],
        },
        {
            letter: "V",
            title: "Validate",
            description: "Verify skill acquisition through assessments and portfolio building",
            outcomes: ["Skill Verification", "Portfolio Projects", "Certifications"],
        },
        {
            letter: "E",
            title: "Evolve",
            description: "Continuously adapt training as AI technology and business needs change",
            outcomes: ["Continuous Learning", "Trend Updates", "Capability Growth"],
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
            <section className="relative pt-40 pb-24 px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.05),transparent)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Sparkles className="h-4 w-4 text-white/60" />
                        <span className="text-sm text-white/60">Enterprise Transformation Framework</span>
                    </div>

                    <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
                        The NATIVE Framework<sup className="text-lg md:text-xl align-super ml-1">™</sup>
                    </h1>

                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12">
                        The enterprise standard for AI-Native workforce transformation.
                        A proven 6-phase methodology for building AI-powered organizations.
                    </p>

                    {/* Framework Letters */}
                    <div className="flex justify-center gap-3 md:gap-4 mb-16">
                        {frameworkPillars.map((pillar) => (
                            <div
                                key={pillar.letter}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-xl md:text-2xl font-bold hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer"
                            >
                                {pillar.letter}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Framework Pillars Detail */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-6xl">
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
                                desc: "Built on frameworks from SAFe, DeepLearning.AI, and enterprise best practices",
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
