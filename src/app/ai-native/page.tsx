"use client";

import Link from "next/link";
import {
    ArrowRight,
    Shield,
    Users,
    Zap,
    Award,
    Play,
    BarChart3,
    Target,
    Brain,
    BookOpen,
    Code,
    GraduationCap,
    Clock,
    CheckCircle2,
    Layers,
    ChevronRight,
} from "lucide-react";

export default function AINativePlatformPage() {
    const certificationTracks = [
        {
            level: "Foundation",
            badge: "🎓",
            duration: "16-20 hours",
            description: "Master AI fundamentals and prompt engineering essentials",
            modules: ["AI Fundamentals", "AI-Assisted Coding Mastery"],
        },
        {
            level: "Associate",
            badge: "🏅",
            duration: "24-30 hours",
            description: "Build agentic AI systems and MLOps pipelines",
            modules: ["Agentic AI Systems", "AI Engineering & MLOps"],
        },
        {
            level: "Professional",
            badge: "🏆",
            duration: "30-35 hours",
            description: "Advanced frameworks, RAG systems, and security",
            modules: ["Advanced Frameworks", "GenAI Applications", "AI Security"],
        },
        {
            level: "Architect",
            badge: "⚡",
            duration: "35-45 hours",
            description: "Enterprise architecture, deployment, and leadership",
            modules: ["Enterprise Architecture", "Production Deployment", "AI Leadership"],
        },
    ];

    const skills = [
        { skill: "Agentic AI", detail: "Build self-improving AI systems" },
        { skill: "Prompt Engineering", detail: "Expert-level prompting" },
        { skill: "RAG Architecture", detail: "Knowledge-grounded AI" },
        { skill: "AI-Native Workflows", detail: "AI in Agile delivery" },
        { skill: "Multi-Agent Systems", detail: "Collaborative AI teams" },
        { skill: "AI Security", detail: "Responsible AI practices" },
        { skill: "MLOps", detail: "Production AI pipelines" },
        { skill: "Enterprise Architecture", detail: "Scale AI across org" },
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Premium Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="font-playfair text-2xl font-medium tracking-tight italic">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/native" className="text-sm text-white/40 hover:text-white transition-colors">
                            Framework
                        </Link>
                        <Link href="/ai-native" className="text-sm text-white hover:text-white transition-colors">
                            Platform
                        </Link>
                        <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">
                            Enterprise
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/learn/login" className="text-sm text-white/40 hover:text-white transition-colors">
                            Sign in
                        </Link>
                        <Link href="/pricing">
                            <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.05),transparent)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
                        Transform Your Workforce<br />
                        <span className="text-white/40">into AI-Native Professionals</span>
                    </h1>

                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
                        Comprehensive, role-specific curriculum that transforms professionals into AI-powered practitioners.
                        Built on frameworks from DeepLearning.AI, Google Cloud, Microsoft, and enterprise best practices.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link href="/training/module-1">
                            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold inline-flex items-center gap-2 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                                <Play className="h-5 w-5" />
                                Start Learning
                            </button>
                        </Link>
                        <Link href="#curriculum">
                            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 inline-flex items-center gap-2 hover:bg-white/10 transition-all">
                                <BookOpen className="h-5 w-5" />
                                Explore Curriculum
                            </button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {[
                            { value: "10", label: "Expert Modules", icon: BookOpen },
                            { value: "150+", label: "Hours of Content", icon: Clock },
                            { value: "4", label: "Certification Levels", icon: GraduationCap },
                            { value: "40+", label: "Hands-On Labs", icon: Code },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <stat.icon className="h-5 w-5 mx-auto mb-2 text-white/40" />
                                <div className="font-montserrat text-3xl font-bold">{stat.value}</div>
                                <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why AI-Native Training */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-6xl">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-16">
                        Why AI-Native Training?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Layers, title: "Depth Over Breadth", desc: "Not surface-level tool training—deep competency development" },
                            { icon: Users, title: "Role-Specific", desc: "Customized learning paths for each professional role" },
                            { icon: Code, title: "Hands-On Labs", desc: "Real-world projects, not just theory" },
                            { icon: Award, title: "Certifications", desc: "Multi-level credentials that demonstrate mastery" },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-center">
                                <item.icon className="h-8 w-8 mx-auto mb-4 text-white/60" />
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-white/40">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills You'll Master */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">Skills You'll Master</h2>
                        <p className="text-white/40">Practical AI capabilities that transform your daily work</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {skills.map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <span className="font-semibold text-sm">{item.skill}</span>
                                </div>
                                <p className="text-xs text-white/40 pl-6">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certification Tracks */}
            <section id="curriculum" className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">Certification Tracks</h2>
                        <p className="text-white/40">Progress through four levels to demonstrate your AI-native expertise</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {certificationTracks.map((track, i) => {
                            // Map track level to starting module
                            const trackStartModule = {
                                "Foundation": "/training/module-1",
                                "Associate": "/training/module-3",
                                "Professional": "/training/module-5",
                                "Architect": "/training/module-8"
                            }[track.level] || "/training/module-1";

                            return (
                                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl">{track.badge}</span>
                                        <div>
                                            <h3 className="text-lg font-bold">{track.level}</h3>
                                            <p className="text-xs text-white/40">{track.duration}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-white/50 mb-6">{track.description}</p>

                                    <div className="space-y-2 mb-6">
                                        {track.modules.map((mod, j) => (
                                            <div key={j} className="flex items-center gap-2 text-sm">
                                                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium">
                                                    {j + 1}
                                                </div>
                                                <span className="text-white/70">{mod}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={trackStartModule}>
                                        <button className="w-full py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
                                            Start Track
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Learning Journey */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="font-montserrat text-3xl font-bold mb-4">Your Learning Journey</h2>
                        <p className="text-white/40">Progress from fundamentals to enterprise leadership</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        {[
                            { level: "Foundation", duration: "16-20h", badge: "🎓" },
                            { level: "Associate", duration: "24-30h", badge: "🏅" },
                            { level: "Professional", duration: "30-35h", badge: "🏆" },
                            { level: "Architect", duration: "35-45h", badge: "⚡" },
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center min-w-[120px]">
                                    <div className="text-2xl mb-2">{step.badge}</div>
                                    <div className="font-semibold text-sm">{step.level}</div>
                                    <div className="text-xs text-white/40">{step.duration}</div>
                                </div>
                                {i < 3 && <ChevronRight className="h-5 w-5 text-white/20 hidden md:block" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8 border-t border-white/5">
                <div className="mx-auto max-w-3xl text-center">
                    <Brain className="h-12 w-12 mx-auto mb-6 text-white/40" />
                    <h2 className="font-montserrat text-4xl font-bold mb-4">
                        Ready to Become AI-Native?
                    </h2>
                    <p className="text-lg text-white/40 mb-10">
                        Join thousands of professionals transforming their careers
                    </p>

                    {/* Social Proof */}
                    <div className="flex justify-center gap-12 mb-10">
                        <div className="text-center">
                            <div className="text-3xl font-bold">2,500+</div>
                            <div className="text-xs text-white/40 uppercase tracking-wider">Professionals</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">4.9/5</div>
                            <div className="text-xs text-white/40 uppercase tracking-wider">Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-500">94%</div>
                            <div className="text-xs text-white/40 uppercase tracking-wider">Completion</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/training/module-1">
                            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold inline-flex items-center gap-2 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                                <Zap className="h-5 w-5" />
                                Start Free Trial
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all">
                                Talk to Sales
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
