"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { LogoIcon } from "@/components/brand/Logo";
import {
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    Shield,
    Star,
    Users,
    Zap,
    RefreshCw,
    FileCheck,
    Target,
    Brain,
    Sparkles,
} from "lucide-react";

// SME Qualifications data
const smeQualifications = [
    { area: "Industry Experience", requirement: "10+ years of hands-on, real-world experience in their domain" },
    { area: "Professional Certifications", requirement: "Highest-level certifications: CISSP, CISM, CHPC" },
    { area: "Teaching Experience", requirement: "5+ years in adult education or corporate training" },
    { area: "Authoritative Contributions", requirement: "Published in peer-reviewed journals or conference speakers" },
];

// Standards data
const standards = [
    { name: "NIST CSF 2.0", category: "Cybersecurity", description: "Fully aligned with the NIST Cybersecurity Framework" },
    { name: "HHS/OCR Guidelines", category: "HIPAA", description: "Direct mapping to Privacy, Security, and Breach Rules" },
    { name: "NIST AI RMF", category: "AI & ML", description: "Incorporates AI Risk Management Framework principles" },
    { name: "CCL Competency Models", category: "Leadership", description: "Built upon Center for Creative Leadership standards" },
];

// Four Pillars
const pillars = [
    {
        icon: Users,
        title: "Elite SME Vetting",
        description: "Every content creator has 10+ years of experience and elite certifications",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Brain,
        title: "Pedagogical Rigor",
        description: "CPTD-certified instructional designers using ADDIE, SAM, and Bloom's Taxonomy",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        icon: Shield,
        title: "Standards Alignment",
        description: "SCORM/xAPI compliant, IACET accredited, mapped to NIST and industry frameworks",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        icon: RefreshCw,
        title: "Continuous Improvement",
        description: "Quarterly content refresh, peer review, and learner feedback integration",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
];

// Content Lifecycle
const lifecycle = [
    { step: 1, title: "Initial Peer Review", description: "Every course reviewed by 2+ qualified SMEs" },
    { step: 2, title: "Instructional Design Review", description: "Senior ID ensures pedagogical soundness" },
    { step: 3, title: "Quarterly Content Refresh", description: "Regular updates for trends and regulations" },
    { step: 4, title: "Learner Feedback Loop", description: "Performance data drives improvements" },
];

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <LogoIcon size={32} />
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="font-playfair italic">ScaledNative<sup className="text-[10px]">™</sup></span>
                            <span className="text-muted-foreground ml-1 font-light hidden sm:inline">Training</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/demo">
                            <Button variant="outline">See Demo</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="gap-2">
                                <Sparkles className="h-4 w-4" />
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">IACET Accredited Provider</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        The Implementation Layer for{" "}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            AI Transformation
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
                        You've learned the theory. You've completed the workshops.
                        <span className="text-foreground font-medium"> Now it's time to build.</span>
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We don't reteach the basics—we turn AI knowledge into production-grade capability.
                        Think of us as the graduate school to foundational AI training.
                    </p>
                </div>
            </section>

            {/* Four Pillars Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The ScaledNative Quality Framework</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Four pillars that ensure excellence and build trust in every course we deliver.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={pillar.title}
                                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${pillar.bgColor} flex items-center justify-center mb-4`}>
                                        <Icon className={`h-6 w-6 ${pillar.color}`} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SME Qualifications Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4">
                            <Users className="h-4 w-4" />
                            Pillar 1
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Elite Subject Matter Experts</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            We find proven leaders, practitioners, and educators at the top of their field.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-white/[0.03]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Qualification Area</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Minimum Requirement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {smeQualifications.map((item) => (
                                    <tr key={item.area} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-medium">{item.area}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{item.requirement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Standards Alignment Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm mb-4">
                            <Shield className="h-4 w-4" />
                            Pillar 3
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Industry Standards Alignment</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Meticulously mapped to the frameworks that matter most to enterprises.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {standards.map((standard) => (
                            <div
                                key={standard.name}
                                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/10"
                            >
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{standard.name}</span>
                                        <span className="px-2 py-0.5 rounded bg-white/5 text-xs text-muted-foreground">
                                            {standard.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{standard.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Compliance Badges */}
                    <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <FileCheck className="h-5 w-5 text-primary" />
                            <span className="font-medium">SCORM Conformant</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <Zap className="h-5 w-5 text-primary" />
                            <span className="font-medium">xAPI Compatible</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="font-medium">IACET Accredited</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <Shield className="h-5 w-5 text-primary" />
                            <span className="font-medium">ANSI/IACET Standard</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Lifecycle Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm mb-4">
                            <RefreshCw className="h-4 w-4" />
                            Pillar 4
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Continuous Improvement</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            A dynamic, multi-stage review process ensures our training remains current and effective.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {lifecycle.map((item, index) => (
                            <div
                                key={item.step}
                                className="flex items-center gap-6 p-5 rounded-xl bg-white/[0.02] border border-white/10"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg font-bold text-amber-400">{item.step}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                {index < lifecycle.length - 1 && (
                                    <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Democratizing Training Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Democratizing Enterprise Training
                    </h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        The training you want. The content you need. The delivery that works for you.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <Target className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-2">The Training You Want</h3>
                            <p className="text-sm text-muted-foreground">
                                On-demand access 24/7, personalized learning paths, and AI-powered recommendations.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <BookOpen className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-2">The Content You Need</h3>
                            <p className="text-sm text-muted-foreground">
                                Deeply modular courses and AI-powered customization with your organization's context.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <Zap className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-2">Delivery That Works</h3>
                            <p className="text-sm text-muted-foreground">
                                Multi-modal content and adaptive learning that respects your pace and style.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
                    <p className="text-muted-foreground mb-8">
                        See how ScaledNative's enterprise-grade training platform can transform your workforce.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/demo">
                            <Button size="lg" variant="outline" className="gap-2">
                                <GraduationCap className="h-5 w-5" />
                                View Demo
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="lg" className="gap-2">
                                <Sparkles className="h-5 w-5" />
                                Start Free Trial
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <LogoIcon size={24} />
                        <span className="font-semibold">ScaledNative</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2025 ScaledNative™. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
