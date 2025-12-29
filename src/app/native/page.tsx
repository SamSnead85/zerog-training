import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    Brain,
    Check,
    Layers,
    Shield,
    Sparkles,
    Target,
    Users,
    Zap,
    BookOpen,
    Award,
    Building2,
    Play,
    ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
    title: "NATIVE Framework | ScaledNative - Enterprise AI Transformation",
    description: "The NATIVE Framework provides 6 essential capability tracks for AI-Native transformation: Navigate, Architect, Transform, Integrate, Validate, and Evolve.",
};

const tracks = [
    {
        letter: "N",
        name: "Navigate",
        focus: "AI literacy, responsible use, knowing when and how to use AI",
        audience: "Everyone",
        duration: "15-20 hours",
        color: "from-blue-500/20 to-blue-600/10",
        href: "/native/navigate",
    },
    {
        letter: "A",
        name: "Architect",
        focus: "Designing AI systems, strategy, and enterprise architecture",
        audience: "Technical Leaders, Architects",
        duration: "30-40 hours",
        color: "from-purple-500/20 to-purple-600/10",
        href: "/native/architect",
    },
    {
        letter: "T",
        name: "Transform",
        focus: "Leading change, adoption management, organizational design",
        audience: "Leaders, Change Managers",
        duration: "25-35 hours",
        color: "from-primary/20 to-orange-600/10",
        href: "/native/transform",
    },
    {
        letter: "I",
        name: "Integrate",
        focus: "Building and deploying AI solutions, DevOps, operations",
        audience: "Developers, Engineers, DevOps",
        duration: "50-60 hours",
        color: "from-emerald-500/20 to-emerald-600/10",
        href: "/native/integrate",
    },
    {
        letter: "V",
        name: "Validate",
        focus: "Security, compliance, governance, quality assurance",
        audience: "Security, Legal, Compliance",
        duration: "30-40 hours",
        color: "from-red-500/20 to-red-600/10",
        href: "/native/validate",
    },
    {
        letter: "E",
        name: "Evolve",
        focus: "Continuous learning, emerging technologies, advanced research",
        audience: "Advanced Practitioners",
        duration: "40-50 hours",
        color: "from-indigo-500/20 to-indigo-600/10",
        href: "/native/evolve",
    },
];

const certifications = [
    {
        level: 1,
        name: "NATIVE Foundation Certified",
        requirements: "Complete Navigate track",
        demonstrates: "Basic AI literacy and responsible use",
    },
    {
        level: 2,
        name: "NATIVE Professional Certified",
        requirements: "Foundation + one specialized track",
        demonstrates: "Role-specific AI competency",
    },
    {
        level: 3,
        name: "NATIVE Advanced Certified",
        requirements: "Professional + Evolve track",
        demonstrates: "Advanced, cross-functional AI capability",
    },
    {
        level: 4,
        name: "NATIVE Expert Certified",
        requirements: "Advanced + capstone project + peer review",
        demonstrates: "Expert-level mastery for enterprise transformation",
    },
];

export default function NativeFrameworkPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <Brain className="h-4 w-4" />
                            Enterprise AI Transformation Framework
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            The <span className="text-primary">NATIVE</span> Framework
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            The enterprise standard for AI-Native transformation. A comprehensive framework
                            with shared language, maturity levels, and certification ecosystem.
                        </p>
                    </div>

                    {/* NATIVE Acronym Visual */}
                    <div className="grid grid-cols-6 gap-2 md:gap-4 mb-16">
                        {tracks.map((track) => (
                            <div key={track.letter} className="text-center">
                                <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-2 border border-white/10`}>
                                    <span className="text-3xl md:text-5xl font-bold text-white">{track.letter}</span>
                                </div>
                                <span className="text-xs md:text-sm font-medium">{track.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 Tracks Detail */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The 6 NATIVE Tracks</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Each track builds specific capabilities for AI-Native transformation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tracks.map((track) => (
                            <div
                                key={track.letter}
                                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-4`}>
                                    <span className="text-2xl font-bold text-white">{track.letter}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {track.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">{track.focus}</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span>{track.audience}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        <span>{track.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certification Levels */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Certification Levels</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Progressive certifications that verify real capability through hands-on demonstration
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((cert) => (
                            <div
                                key={cert.level}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <span className="text-xl font-bold text-primary">{cert.level}</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Requirements:</span>
                                        <p>{cert.requirements}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Demonstrates:</span>
                                        <p>{cert.demonstrates}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Practices */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">NATIVE Best Practices</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The foundational principles that guide AI-Native transformation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "AI Capability is a System, Not a Skill",
                                description: "Build organizational AI infrastructure alongside individual training. Standards, governance, and shared context matter.",
                                icon: Layers,
                            },
                            {
                                title: "Training Must Evolve with the Organization",
                                description: "One-time training becomes obsolete in months. Continuous learning is the only path to sustained capability.",
                                icon: Zap,
                            },
                            {
                                title: "Context Matters More Than Model Sophistication",
                                description: "Enterprise AI success depends on organizational context. Your policies, workflows, and domain knowledge determine effectiveness.",
                                icon: Target,
                            },
                            {
                                title: "Governance Enables Speed",
                                description: "Clear standards and guardrails allow faster, safer AI adoption. Ambiguity creates paralysis.",
                                icon: Shield,
                            },
                            {
                                title: "Certification Creates Alignment",
                                description: "Certified practitioners speak a common language and follow common standards. Certification creates accountability.",
                                icon: Award,
                            },
                        ].map((practice, idx) => (
                            <div key={idx} className="flex gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <practice.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">{practice.title}</h3>
                                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your NATIVE Journey?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Take the free maturity assessment to understand your current state,
                        or explore our certification programs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/assessment">
                            <Button size="lg" className="gap-2">
                                Take Maturity Assessment
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/certifications">
                            <Button size="lg" variant="outline" className="gap-2">
                                Explore Certifications
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
