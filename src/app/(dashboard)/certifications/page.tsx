"use client";

import { useState } from "react";
import Link from "next/link";
import {
    CheckCircle2,
    Clock,
    BookOpen,
    Download,
    Share2,
    GraduationCap,
    Target,
    FileText,
    Shield,
    Linkedin,
    Verified,
    Layers,
    Crown,
    Trophy,
    ArrowRight,
    BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// CERTIFICATION LEVEL CONFIGURATIONS
// =============================================================================

interface CertificationLevel {
    id: string;
    level: "foundations" | "associate" | "professional" | "architect";
    title: string;
    shortTitle: string;
    description: string;
    tagline: string;
    duration: string;
    modules: number;
    passingScore: string;
    examDuration: string;
    validityPeriod: string;
    certCode: string;
    color: {
        primary: string;
        gradient: string;
        border: string;
        text: string;
        bg: string;
        glow: string;
    };
    icon: React.ComponentType<{ className?: string }>;
    features: string[];
}

const certificationLevels: CertificationLevel[] = [
    {
        id: "foundations",
        level: "foundations",
        title: "AI-Native Foundations",
        shortTitle: "Foundations",
        tagline: "Where every AI journey begins",
        description: "Master the fundamentals of AI and LLMs. Understand prompt engineering, embeddings, and the AI development ecosystem.",
        duration: "16-20 hours",
        modules: 2,
        passingScore: "75%",
        examDuration: "90 min",
        validityPeriod: "Lifetime",
        certCode: "NATIVE-F",
        color: {
            primary: "blue",
            gradient: "from-blue-500/20 via-blue-600/10 to-blue-700/5",
            border: "border-blue-500/40",
            text: "text-blue-400",
            bg: "bg-blue-500",
            glow: "shadow-blue-500/20",
        },
        icon: GraduationCap,
        features: ["LLM fundamentals", "Prompt engineering", "AI-assisted coding", "Development workflow"],
    },
    {
        id: "associate",
        level: "associate",
        title: "AI-Native Associate",
        shortTitle: "Associate",
        tagline: "Build production-ready AI systems",
        description: "Build AI-powered applications with agentic workflows and MLOps practices. Design, develop, and deploy production AI systems.",
        duration: "24-30 hours",
        modules: 2,
        passingScore: "80%",
        examDuration: "2 hours",
        validityPeriod: "2 years",
        certCode: "NATIVE-A",
        color: {
            primary: "emerald",
            gradient: "from-emerald-500/20 via-emerald-600/10 to-emerald-700/5",
            border: "border-emerald-500/40",
            text: "text-emerald-400",
            bg: "bg-emerald-500",
            glow: "shadow-emerald-500/20",
        },
        icon: Layers,
        features: ["Agentic workflows", "Tool integration", "MLOps practices", "Production deployment"],
    },
    {
        id: "professional",
        level: "professional",
        title: "AI-Native Professional",
        shortTitle: "Professional",
        tagline: "Lead enterprise AI initiatives",
        description: "Master advanced frameworks, production RAG systems, and AI security. Lead enterprise AI implementations with responsible AI practices.",
        duration: "30-35 hours",
        modules: 3,
        passingScore: "80%",
        examDuration: "3 hours",
        validityPeriod: "2 years",
        certCode: "NATIVE-P",
        color: {
            primary: "purple",
            gradient: "from-purple-500/20 via-purple-600/10 to-purple-700/5",
            border: "border-purple-500/40",
            text: "text-purple-400",
            bg: "bg-purple-500",
            glow: "shadow-purple-500/20",
        },
        icon: Trophy,
        features: ["Advanced frameworks", "Enterprise RAG", "AI security", "Responsible AI"],
    },
    {
        id: "architect",
        level: "architect",
        title: "AI-Native Architect",
        shortTitle: "Architect",
        tagline: "Design enterprise-scale AI platforms",
        description: "Design enterprise-scale AI platforms with multi-model orchestration, cost optimization, and governance frameworks.",
        duration: "20-25 hours",
        modules: 1,
        passingScore: "85%",
        examDuration: "4 hours",
        validityPeriod: "3 years",
        certCode: "NATIVE-SA",
        color: {
            primary: "amber",
            gradient: "from-amber-500/20 via-amber-600/10 to-amber-700/5",
            border: "border-amber-500/40",
            text: "text-amber-400",
            bg: "bg-amber-500",
            glow: "shadow-amber-500/20",
        },
        icon: Crown,
        features: ["Platform architecture", "Multi-model systems", "Cost optimization", "AI governance"],
    },
];

// =============================================================================
// PREMIUM CERTIFICATION CARD
// =============================================================================

interface CertCardProps {
    cert: CertificationLevel;
    status: "not-started" | "in-progress" | "completed";
    progress?: number;
    index: number;
}

function CertificationCard({ cert, status, progress = 0, index }: CertCardProps) {
    const Icon = cert.icon;

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-3xl border transition-all duration-500",
            "bg-gradient-to-br hover:scale-[1.02]",
            cert.color.gradient,
            cert.color.border,
            status === "completed" && "ring-2 ring-emerald-500/30"
        )}>
            {/* Decorative corner accent */}
            <div className={cn(
                "absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl",
                cert.color.bg
            )} />

            {/* Level indicator */}
            <div className="absolute top-6 right-6">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg",
                    "bg-white/5 border border-white/10"
                )}>
                    {index + 1}
                </div>
            </div>

            <div className="relative p-8">
                {/* Icon & Status */}
                <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center",
                        "bg-gradient-to-br from-white/10 to-white/5 border border-white/10",
                        "shadow-lg", cert.color.glow
                    )}>
                        <Icon className={cn("h-8 w-8", cert.color.text)} />
                    </div>
                    {status === "completed" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                            <BadgeCheck className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-400">Certified</span>
                        </div>
                    )}
                    {status === "in-progress" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full">
                            <span className="text-xs font-medium text-white/70">{progress}%</span>
                        </div>
                    )}
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                    <span className={cn("text-xs font-mono tracking-wider uppercase", cert.color.text)}>
                        {cert.certCode}
                    </span>
                    <h3 className="text-2xl font-bold mt-1 mb-2">{cert.title}</h3>
                    <p className="text-sm text-white/50 italic mb-3">{cert.tagline}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{cert.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                        {cert.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                                <CheckCircle2 className={cn("h-3.5 w-3.5", cert.color.text)} />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress bar */}
                {status === "in-progress" && (
                    <div className="mb-6">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all", cert.color.bg)}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 py-4 border-y border-white/5">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-white/30" />
                        <span className="text-sm text-white/50">{cert.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-white/30" />
                        <span className="text-sm text-white/50">{cert.modules} modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-white/30" />
                        <span className="text-sm text-white/50">{cert.passingScore} to pass</span>
                    </div>
                </div>

                {/* CTA */}
                <Link href={`/certifications/${cert.id}`}>
                    <button className={cn(
                        "w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                        status === "completed"
                            ? "bg-white/10 border border-white/20 hover:bg-white/15"
                            : status === "in-progress"
                                ? cn("border", cert.color.border, "hover:bg-white/5")
                                : cn(cert.color.bg, "text-black hover:opacity-90")
                    )}>
                        {status === "completed" ? (
                            <>
                                <BadgeCheck className="h-4 w-4" />
                                View Certificate
                            </>
                        ) : status === "in-progress" ? (
                            <>
                                Continue Learning
                                <ArrowRight className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Begin Certification
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </Link>
            </div>
        </div>
    );
}

// =============================================================================
// PREMIUM CERTIFICATE PREVIEW
// =============================================================================

interface CertificateProps {
    name: string;
    certification: string;
    date: string;
    credentialId: string;
    level: "foundations" | "associate" | "professional" | "architect";
}

function CertificatePreview({ name, certification, date, credentialId, level }: CertificateProps) {
    const cert = certificationLevels.find(c => c.level === level)!;
    const Icon = cert.icon;

    return (
        <div className={cn(
            "relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl border-2 p-12 max-w-3xl mx-auto",
            "shadow-2xl", cert.color.border
        )}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, ${cert.color.primary === 'blue' ? '#3b82f6' : cert.color.primary === 'emerald' ? '#10b981' : cert.color.primary === 'purple' ? '#a855f7' : '#f59e0b'} 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }} />
            </div>

            {/* Header with logo */}
            <div className="relative text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        cert.color.bg
                    )}>
                        <Shield className="h-6 w-6 text-black" />
                    </div>
                    <div className="text-left">
                        <p className="font-playfair text-2xl font-medium italic tracking-tight">
                            ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                        </p>
                        <p className="text-xs text-white/40 tracking-widest uppercase">AI Training Platform</p>
                    </div>
                </div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6" />
                <h2 className="text-3xl font-light tracking-wide uppercase text-white/80">Certificate of Achievement</h2>
            </div>

            {/* Recipient */}
            <div className="relative text-center mb-10">
                <p className="text-sm text-white/40 mb-2">This is to certify that</p>
                <p className="text-5xl font-playfair italic text-white/95 mb-2">{name}</p>
                <p className="text-sm text-white/40">has successfully completed all requirements for</p>
            </div>

            {/* Certification Badge */}
            <div className="relative text-center mb-10">
                <div className={cn(
                    "inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6",
                    "bg-gradient-to-br from-white/10 to-white/5 border-2",
                    cert.color.border, "shadow-xl", cert.color.glow
                )}>
                    <Icon className={cn("h-12 w-12", cert.color.text)} />
                </div>
                <h3 className="text-3xl font-bold mb-2">{certification}</h3>
                <p className={cn("text-sm font-mono tracking-wider", cert.color.text)}>{cert.certCode}</p>
            </div>

            {/* Details Grid */}
            <div className="relative flex justify-center gap-16 text-center mb-10">
                <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Issue Date</p>
                    <p className="font-medium">{date}</p>
                </div>
                <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Valid For</p>
                    <p className="font-medium">{cert.validityPeriod}</p>
                </div>
                <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Credential ID</p>
                    <p className="font-mono text-sm">{credentialId}</p>
                </div>
            </div>

            {/* Verification */}
            <div className="relative pt-8 border-t border-white/10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                    <Verified className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-white/50">Verify at scalednative.com/verify/{credentialId}</span>
                </div>
            </div>

            {/* Watermark */}
            <div className="absolute top-8 right-8 opacity-5">
                <Icon className="h-32 w-32" />
            </div>
        </div>
    );
}

// =============================================================================
// MAIN CERTIFICATIONS PAGE
// =============================================================================

export default function CertificationsPage() {
    const [activeTab, setActiveTab] = useState<"all" | "earned">("all");

    // Mock user certification status
    const userProgress: Record<string, { status: "not-started" | "in-progress" | "completed"; progress: number }> = {
        "foundations": { status: "in-progress", progress: 68 },
        "associate": { status: "not-started", progress: 0 },
        "professional": { status: "not-started", progress: 0 },
        "architect": { status: "not-started", progress: 0 },
    };

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
                        <Link href="/training" className="text-sm text-white/60 hover:text-white transition-colors">My Learning</Link>
                        <Link href="/certifications" className="text-sm text-white font-medium">Certifications</Link>
                    </nav>
                    <Link href="/assessment" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                        Take Assessment
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="py-24 px-6 border-b border-white/5 relative overflow-hidden">
                {/* Subtle background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30 blur-3xl" />
                    </div>
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6">
                        Professional Certification Program
                    </p>

                    <h1 className="font-playfair text-5xl md:text-6xl font-medium tracking-tight mb-6">
                        NATIVE Framework<sup className="text-[12px] align-super ml-1">™</sup>
                    </h1>

                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Industry-recognized credentials that validate mastery of AI-Native principles.
                        Four progressive certifications designed for enterprise professionals.
                    </p>

                    {/* Stats - refined */}
                    <div className="flex items-center justify-center gap-16">
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">4</div>
                            <div className="text-xs text-white/30 uppercase tracking-widest">Levels</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">8</div>
                            <div className="text-xs text-white/30 uppercase tracking-widest">Modules</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">90+</div>
                            <div className="text-xs text-white/30 uppercase tracking-widest">Hours</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">2yr</div>
                            <div className="text-xs text-white/30 uppercase tracking-widest">Validity</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certification Path Visual */}
            <section className="py-16 px-6 bg-white/[0.01]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center text-sm text-white/40 uppercase tracking-widest mb-10">
                        Your Certification Journey
                    </h2>
                    <div className="flex items-center justify-between">
                        {certificationLevels.map((cert, i) => {
                            const Icon = cert.icon;
                            const status = userProgress[cert.id as keyof typeof userProgress];
                            const isActive = status.progress > 0;
                            const isComplete = status.status === "completed";

                            return (
                                <div key={cert.id} className="flex items-center flex-1">
                                    <div className={cn(
                                        "flex flex-col items-center flex-1",
                                        isActive ? "opacity-100" : "opacity-50"
                                    )}>
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all",
                                            "border-2",
                                            isComplete
                                                ? "bg-emerald-500/20 border-emerald-500"
                                                : isActive
                                                    ? cn("bg-gradient-to-br", cert.color.gradient, cert.color.border)
                                                    : "bg-white/5 border-white/10"
                                        )}>
                                            {isComplete ? (
                                                <BadgeCheck className="h-8 w-8 text-emerald-400" />
                                            ) : (
                                                <Icon className={cn("h-8 w-8", isActive ? cert.color.text : "text-white/30")} />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-center">{cert.shortTitle}</span>
                                        <span className="text-xs text-white/30 mt-1">{cert.duration}</span>
                                        {isActive && !isComplete && (
                                            <span className={cn("text-xs mt-2", cert.color.text)}>{status.progress}%</span>
                                        )}
                                    </div>
                                    {i < certificationLevels.length - 1 && (
                                        <div className="flex-shrink-0 w-12 h-0.5 bg-white/10 mx-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Certification Cards */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold">Certification Tracks</h2>
                        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={cn(
                                    "px-5 py-2 text-sm rounded-full transition-colors",
                                    activeTab === "all" ? "bg-white text-black font-medium" : "text-white/60 hover:text-white"
                                )}
                            >
                                All Tracks
                            </button>
                            <button
                                onClick={() => setActiveTab("earned")}
                                className={cn(
                                    "px-5 py-2 text-sm rounded-full transition-colors",
                                    activeTab === "earned" ? "bg-white text-black font-medium" : "text-white/60 hover:text-white"
                                )}
                            >
                                My Certificates
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {certificationLevels.map((cert, i) => (
                            <CertificationCard
                                key={cert.id}
                                cert={cert}
                                status={userProgress[cert.id as keyof typeof userProgress].status}
                                progress={userProgress[cert.id as keyof typeof userProgress].progress}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Exam Information */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Assessment & Evaluation</h2>
                        <p className="text-white/50">Rigorous, practical evaluations that prove real-world competency</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                                <FileText className="h-7 w-7 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Knowledge Assessment</h3>
                            <p className="text-sm text-white/40 mb-4">
                                Multiple-choice and scenario-based questions testing conceptual understanding
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-sm text-white/30">30% of total score</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
                            <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                                <Target className="h-7 w-7 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Hands-On Projects</h3>
                            <p className="text-sm text-white/40 mb-4">
                                Build real applications that demonstrate practical AI development skills
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-sm text-white/30">50% of total score</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
                            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                                <Trophy className="h-7 w-7 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Capstone Project</h3>
                            <p className="text-sm text-white/40 mb-4">
                                Comprehensive project demonstrating end-to-end AI solution development
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-sm text-white/30">20% of total score</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sample Certificate */}
            <section className="py-20 px-6 bg-gradient-to-b from-white/[0.02] to-transparent border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Your Certificate Awaits</h2>
                        <p className="text-white/50">Earn a verified credential recognized by industry leaders</p>
                    </div>

                    <CertificatePreview
                        name="Sarah Chen"
                        certification="AI-Native Foundations"
                        date="December 2024"
                        credentialId="SN-F-2024-7X9K2M"
                        level="foundations"
                    />

                    <div className="flex justify-center gap-4 mt-10">
                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download as PDF
                        </button>
                        <button className="px-6 py-3 bg-[#0A66C2] text-white rounded-full text-sm hover:bg-[#0A66C2]/90 transition-colors flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            Add to LinkedIn
                        </button>
                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                        </button>
                    </div>
                </div>
            </section>

            {/* Verification CTA */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <Verified className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Verify a Credential</h2>
                    <p className="text-white/50 mb-8">
                        Employers and organizations can instantly verify any ScaledNative certification using the unique credential ID
                    </p>
                    <Link href="/verify">
                        <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                            Verify Certificate →
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-white/30">
                    <span>© 2025 ScaledNative™. All rights reserved.</span>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
