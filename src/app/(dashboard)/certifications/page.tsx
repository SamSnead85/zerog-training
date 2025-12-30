"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Award,
    CheckCircle2,
    Clock,
    BookOpen,
    ChevronRight,
    Download,
    Share2,
    ExternalLink,
    GraduationCap,
    Target,
    FileText,
    Shield,
    Linkedin,
    Verified,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { certificationTracks, type CertificationTrack } from "@/lib/curriculum/ai-native-curriculum";

// =============================================================================
// TYPES
// =============================================================================

interface CertificationCardProps {
    track: CertificationTrack;
    status: "not-started" | "in-progress" | "completed";
    progress?: number;
}

// =============================================================================
// CERTIFICATION CARD
// =============================================================================

function CertificationCard({ track, status, progress = 0 }: CertificationCardProps) {
    const levelColors = {
        foundations: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
        associate: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
        professional: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
        architect: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    };

    const levelTextColors = {
        foundations: "text-blue-400",
        associate: "text-emerald-400",
        professional: "text-purple-400",
        architect: "text-amber-400",
    };

    return (
        <Link href={`/certifications/${track.id}`}>
            <div className={cn(
                "group relative rounded-2xl border p-6 transition-all hover:scale-[1.01]",
                "bg-gradient-to-br",
                levelColors[track.level]
            )}>
                {/* Badge & Status */}
                <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{track.badge}</span>
                    {status === "completed" && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                            <Verified className="h-3 w-3" />
                            Certified
                        </span>
                    )}
                    {status === "in-progress" && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white/60 text-xs font-medium rounded-full">
                            {progress}% Complete
                        </span>
                    )}
                </div>

                {/* Title & Code */}
                <div className="mb-4">
                    <span className={cn("text-xs font-mono", levelTextColors[track.level])}>
                        {track.certificationCode}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{track.shortTitle}</h3>
                    <p className="text-sm text-white/50 line-clamp-2">{track.description}</p>
                </div>

                {/* Progress Bar */}
                {status === "in-progress" && (
                    <div className="mb-4">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full", levelTextColors[track.level].replace("text-", "bg-"))}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                    <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {track.modules.length} modules
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {track.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <Target className="h-3.5 w-3.5" />
                        {track.examDetails.passingScore}
                    </span>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">
                        Valid for {track.validityPeriod}
                    </span>
                    <span className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        levelTextColors[track.level]
                    )}>
                        {status === "completed" ? "View Certificate" : status === "in-progress" ? "Continue" : "Start Path"}
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

// =============================================================================
// CERTIFICATE PREVIEW COMPONENT
// =============================================================================

interface CertificatePreviewProps {
    name: string;
    certification: string;
    date: string;
    credentialId: string;
    level: "foundations" | "associate" | "professional" | "architect";
}

function CertificatePreview({ name, certification, date, credentialId, level }: CertificatePreviewProps) {
    const levelColors = {
        foundations: "border-blue-500",
        associate: "border-emerald-500",
        professional: "border-purple-500",
        architect: "border-amber-500",
    };

    const levelBadges = {
        foundations: "🎓",
        associate: "🏅",
        professional: "🏆",
        architect: "⚡",
    };

    return (
        <div className={cn(
            "relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border-2 p-8 max-w-2xl mx-auto",
            levelColors[level]
        )}>
            {/* Certificate Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-medium">NATIVE Framework™ Certified</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Certificate of Completion</h2>
                <p className="text-white/50">This is to certify that</p>
            </div>

            {/* Recipient */}
            <div className="text-center mb-8">
                <p className="text-4xl font-serif italic text-white/90 mb-2">{name}</p>
                <p className="text-white/50">has successfully completed</p>
            </div>

            {/* Certification */}
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">{levelBadges[level]}</div>
                <h3 className="text-2xl font-bold mb-2">{certification}</h3>
                <p className="text-sm text-white/40">AI-Native Training Platform</p>
            </div>

            {/* Details */}
            <div className="flex justify-center gap-12 text-center text-sm">
                <div>
                    <p className="text-white/40 mb-1">Issue Date</p>
                    <p className="font-medium">{date}</p>
                </div>
                <div>
                    <p className="text-white/40 mb-1">Credential ID</p>
                    <p className="font-mono text-xs">{credentialId}</p>
                </div>
            </div>

            {/* Verification */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-white/30">
                    Verify at scalednative.com/verify/{credentialId}
                </p>
            </div>

            {/* Watermark */}
            <div className="absolute top-4 right-4 text-white/5 text-6xl font-bold pointer-events-none">
                SN
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
    const userCertifications = {
        "foundations-cert": { status: "in-progress" as const, progress: 45 },
        "associate-cert": { status: "not-started" as const, progress: 0 },
        "professional-cert": { status: "not-started" as const, progress: 0 },
        "architect-cert": { status: "not-started" as const, progress: 0 },
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
                    <Link href="/training" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                        Start Learning
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">Industry-Recognized Credentials</span>
                    </div>
                    <h1 className="font-montserrat text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        NATIVE Certification Program
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
                        Earn professional certifications that prove your AI-Native expertise.
                        Four levels from Foundations to Architect, each building on the previous.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-white/40">
                            <GraduationCap className="h-4 w-4" />
                            <span>4 Certification Levels</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Verified className="h-4 w-4" />
                            <span>Industry Recognized</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn Badges</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certification Path Visual */}
            <section className="py-12 px-6 bg-white/[0.01]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center text-sm text-white/40 uppercase tracking-wider mb-8">
                        Your Certification Journey
                    </h2>
                    <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4">
                        {certificationTracks.map((track, i) => (
                            <div key={track.id} className="flex items-center gap-4">
                                <div className={cn(
                                    "flex flex-col items-center p-4 rounded-xl min-w-[120px]",
                                    i === 0 ? "bg-blue-500/10 border border-blue-500/30" : "bg-white/5"
                                )}>
                                    <span className="text-3xl mb-2">{track.badge}</span>
                                    <span className="text-xs font-medium text-center">{track.shortTitle}</span>
                                    <span className="text-[10px] text-white/40 mt-1">{track.duration}</span>
                                </div>
                                {i < certificationTracks.length - 1 && (
                                    <ChevronRight className="h-5 w-5 text-white/20 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certification Cards */}
            <section className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Certification Tracks</h2>
                        <div className="flex bg-white/5 rounded-full p-1">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full transition-colors",
                                    activeTab === "all" ? "bg-white text-black" : "text-white/60"
                                )}
                            >
                                All Tracks
                            </button>
                            <button
                                onClick={() => setActiveTab("earned")}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full transition-colors",
                                    activeTab === "earned" ? "bg-white text-black" : "text-white/60"
                                )}
                            >
                                My Certificates
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certificationTracks.map(track => {
                            const userStatus = userCertifications[track.id as keyof typeof userCertifications];
                            return (
                                <CertificationCard
                                    key={track.id}
                                    track={track}
                                    status={userStatus?.status || "not-started"}
                                    progress={userStatus?.progress || 0}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Exam Details */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center">Exam Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                            <FileText className="h-8 w-8 text-white/40 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Assessment Format</h3>
                            <p className="text-sm text-white/50">
                                Knowledge checks (30%), hands-on projects (50%), capstone (20%)
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                            <Target className="h-8 w-8 text-white/40 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Passing Score</h3>
                            <p className="text-sm text-white/50">
                                80% on knowledge checks, "Proficient" rating on projects
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                            <Clock className="h-8 w-8 text-white/40 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Validity Period</h3>
                            <p className="text-sm text-white/50">
                                Certificates valid for 2 years with recertification options
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sample Certificate */}
            <section className="py-16 px-6 bg-white/[0.01] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sample Certificate</h2>
                    <p className="text-white/50 text-center mb-8">
                        Earn a professional certificate upon completion of each track
                    </p>
                    <CertificatePreview
                        name="Jane Developer"
                        certification="AI-Native Foundations"
                        date="December 2024"
                        credentialId="SN-FND-2024-ABC123"
                        level="foundations"
                    />
                    <div className="flex justify-center gap-4 mt-8">
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download PDF
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            Add to LinkedIn
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                        </button>
                    </div>
                </div>
            </section>

            {/* Verification CTA */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <Verified className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Verify a Credential</h2>
                    <p className="text-white/50 mb-6">
                        Employers can verify any ScaledNative certification using the credential ID
                    </p>
                    <Link href="/verify">
                        <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                            Verify Certificate →
                        </button>
                    </Link>
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
