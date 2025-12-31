"use client";

import { useState } from "react";
import Link from "next/link";
import {
    aiNativeCurriculum,
    certificationTracks,
    type AIModule,
    type CertificationTrack,
} from "@/lib/curriculum/ai-native-curriculum";
import { Badge } from "@/components/ui";
import {
    Home,
    BookOpen,
    ClipboardList,
    Award,
    ChevronDown,
    ChevronRight,
    Search,
    Bell,
    Settings,
    User,
    Brain,
    Sparkles,
    Code,
    Layers,
    Shield,
    Zap,
    Target,
    Cpu,
    Play,
    Clock,
    CheckCircle,
    ArrowRight,
    Lock,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TAB NAVIGATION
// =============================================================================

const tabs = [
    { id: "certifications", label: "Certifications", icon: GraduationCap },
    { id: "courses", label: "All Modules", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "certificates", label: "My Certificates", icon: Award },
];

// =============================================================================
// MODULE ICONS
// =============================================================================

const moduleIcons: Record<string, React.ElementType> = {
    "module-1": Brain,
    "module-2": Sparkles,
    "module-3": Cpu,
    "module-4": Zap,
    "module-5": Layers,
    "module-6": Target,
    "module-7": Shield,
    "module-8": Code,
    "module-9": Cpu,
    "module-10": Award,
};

// =============================================================================
// CERTIFICATION PATH CARD
// =============================================================================

function CertificationPathCard({
    track,
    isExpanded,
    onToggle,
    completedModules
}: {
    track: CertificationTrack;
    isExpanded: boolean;
    onToggle: () => void;
    completedModules: string[];
}) {
    const modules = track.modules
        .map(id => aiNativeCurriculum.find(m => m.id === id))
        .filter(Boolean) as AIModule[];

    const completedCount = modules.filter(m => completedModules.includes(m.id)).length;
    const progress = (completedCount / modules.length) * 100;

    const levelConfig = {
        foundations: {
            gradient: "from-blue-500/20 to-blue-600/10",
            border: "border-blue-500/20",
            badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
            icon: "🎓"
        },
        associate: {
            gradient: "from-emerald-500/20 to-emerald-600/10",
            border: "border-emerald-500/20",
            badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
            icon: "🏅"
        },
        professional: {
            gradient: "from-purple-500/20 to-purple-600/10",
            border: "border-purple-500/20",
            badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
            icon: "🏆"
        },
        architect: {
            gradient: "from-amber-500/20 to-amber-600/10",
            border: "border-amber-500/20",
            badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
            icon: "⚡"
        },
    };

    const config = levelConfig[track.level];
    const isLocked = track.prerequisites && track.prerequisites.length > 0;

    return (
        <div className={cn(
            "rounded-2xl border transition-all",
            config.border,
            isExpanded ? "bg-white/[0.03]" : "bg-white/[0.01] hover:bg-white/[0.02]"
        )}>
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full p-6 flex items-center gap-4 text-left"
            >
                <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
                    `bg-gradient-to-br ${config.gradient}`
                )}>
                    {config.icon}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={cn("text-[10px]", config.badge)}>
                            {track.level.charAt(0).toUpperCase() + track.level.slice(1)}
                        </Badge>
                        {isLocked && (
                            <Badge variant="outline" className="text-[10px] bg-white/5 text-white/40 border-white/10">
                                <Lock className="h-3 w-3 mr-1" />
                                Requires {track.prerequisites?.[0]}
                            </Badge>
                        )}
                    </div>
                    <h3 className="font-semibold text-lg">{track.title}</h3>
                    <p className="text-sm text-white/40 line-clamp-1">{track.description}</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{completedCount}/{modules.length} modules</p>
                        <p className="text-xs text-white/40">{track.duration}</p>
                    </div>
                    <div className="w-16 h-16 relative">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="4"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray={`${progress * 1.76} 176`}
                                className={cn(
                                    track.level === "foundations" ? "text-blue-400" :
                                        track.level === "associate" ? "text-emerald-400" :
                                            track.level === "professional" ? "text-purple-400" : "text-amber-400"
                                )}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <ChevronDown className={cn(
                        "h-5 w-5 text-white/40 transition-transform",
                        isExpanded && "rotate-180"
                    )} />
                </div>
            </button>

            {/* Expanded Content - Module List */}
            {isExpanded && (
                <div className="px-6 pb-6 border-t border-white/5 pt-4">
                    <div className="grid gap-3">
                        {modules.map((module, index) => {
                            const Icon = moduleIcons[module.id] || BookOpen;
                            const isCompleted = completedModules.includes(module.id);
                            const isActive = index === completedCount;
                            const isModuleLocked = index > completedCount;

                            return (
                                <Link
                                    key={module.id}
                                    href={isModuleLocked ? "#" : `/training/${module.id}`}
                                    className={cn(
                                        "flex items-center gap-4 p-4 rounded-xl transition-all",
                                        isModuleLocked
                                            ? "bg-white/[0.01] opacity-50 cursor-not-allowed"
                                            : isActive
                                                ? "bg-white/[0.05] border border-white/10"
                                                : "bg-white/[0.02] hover:bg-white/[0.04]"
                                    )}
                                    onClick={e => isModuleLocked && e.preventDefault()}
                                >
                                    {/* Module Number/Status */}
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center",
                                        isCompleted
                                            ? "bg-emerald-500/20"
                                            : isActive
                                                ? "bg-white/10"
                                                : "bg-white/5"
                                    )}>
                                        {isCompleted ? (
                                            <CheckCircle className="h-5 w-5 text-emerald-400" />
                                        ) : isModuleLocked ? (
                                            <Lock className="h-4 w-4 text-white/30" />
                                        ) : (
                                            <Icon className="h-5 w-5 text-white/60" />
                                        )}
                                    </div>

                                    {/* Module Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-white/30">Module {module.number}</span>
                                            {isActive && (
                                                <Badge className="text-[10px] bg-white/10 text-white border-0">
                                                    Current
                                                </Badge>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-sm">{module.title}</h4>
                                        <p className="text-xs text-white/40">{module.duration}</p>
                                    </div>

                                    {/* Action */}
                                    {!isModuleLocked && (
                                        <ChevronRight className="h-4 w-4 text-white/30" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Start/Continue Button */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <Link href="/training/module-1">
                            <button className="w-full px-6 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                                <Play className="h-4 w-4" />
                                {completedCount > 0 ? "Continue Learning" : "Start Certification"}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// MODULE CARD (For All Modules view)
// =============================================================================

function ModuleCard({ module }: { module: AIModule }) {
    const Icon = moduleIcons[module.id] || BookOpen;

    return (
        <Link href={`/training/${module.id}`}>
            <div className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-white/30">Module {module.number}</span>
                            <Badge variant="outline" className={cn(
                                "text-[10px]",
                                module.level === "foundations" ? "border-blue-500/30 text-blue-400" :
                                    module.level === "professional" ? "border-purple-500/30 text-purple-400" :
                                        "border-amber-500/30 text-amber-400"
                            )}>
                                {module.level}
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-sm text-white group-hover:text-white transition-colors">
                            {module.title}
                        </h3>
                        <p className="text-xs text-white/40 line-clamp-1 mt-1">
                            {module.subtitle}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// =============================================================================
// MAIN DASHBOARD
// =============================================================================

export default function TrainingDashboard() {
    const [activeTab, setActiveTab] = useState("certifications");
    const [expandedCert, setExpandedCert] = useState<string>("foundations");

    // Mock completed modules (in production, this would come from user data)
    const completedModules = ["module-1"];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Premium Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center h-16 px-6 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mr-10">
                        <span className="font-playfair text-xl font-medium italic tracking-tight">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>

                    {/* Tab Navigation */}
                    <nav className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-white text-black"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="ml-auto flex items-center gap-3">
                        <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                            <Settings className="h-5 w-5" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-2">
                            <User className="h-4 w-4 text-white/60" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Header */}
            <div className="px-6 py-8 max-w-7xl mx-auto border-b border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-white/60" />
                        </div>
                        <div>
                            <p className="text-[11px] text-white/30 uppercase tracking-widest font-medium">AI-Native Training</p>
                            <h1 className="font-montserrat text-2xl font-bold">Certification Paths</h1>
                        </div>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-sm text-white/60">Your Progress</p>
                        <p className="text-2xl font-bold">{completedModules.length}<span className="text-white/30 text-lg">/{aiNativeCurriculum.length}</span> modules</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8 max-w-7xl mx-auto">
                {/* Certifications Tab */}
                {activeTab === "certifications" && (
                    <div className="space-y-6">
                        {/* Learning Journey Visual */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-8">
                            <h3 className="text-sm font-medium text-white/60 mb-4 text-center uppercase tracking-wider">Your Learning Path</h3>
                            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
                                {certificationTracks.map((t, i) => (
                                    <div key={t.id} className="flex items-center gap-2">
                                        <button
                                            onClick={() => setExpandedCert(t.id)}
                                            className={cn(
                                                "flex flex-col items-center p-4 rounded-xl transition-all min-w-[120px]",
                                                expandedCert === t.id
                                                    ? "bg-white/10 border border-white/20"
                                                    : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]"
                                            )}
                                        >
                                            <span className="text-2xl mb-1">{t.badge}</span>
                                            <span className={cn(
                                                "text-xs font-medium",
                                                t.level === "foundations" ? "text-blue-400" :
                                                    t.level === "associate" ? "text-emerald-400" :
                                                        t.level === "professional" ? "text-purple-400" : "text-amber-400"
                                            )}>
                                                {t.shortTitle}
                                            </span>
                                            <span className="text-[10px] text-white/30 mt-1">{t.certificationCode}</span>
                                        </button>
                                        {i < certificationTracks.length - 1 && (
                                            <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-white/30 text-xs mt-4">
                                Start with Foundations → Progress through each level → Unlock certifications
                            </p>
                        </div>

                        <p className="text-white/50 text-sm">
                            Complete modules in order to earn NATIVE certifications. Each level requires completing the previous level.
                        </p>

                        {certificationTracks.map((track) => (
                            <CertificationPathCard
                                key={track.id}
                                track={track}
                                isExpanded={expandedCert === track.id}
                                onToggle={() => setExpandedCert(expandedCert === track.id ? "" : track.id)}
                                completedModules={completedModules}
                            />
                        ))}
                    </div>
                )}

                {/* All Modules Tab */}
                {activeTab === "courses" && (
                    <div>
                        <p className="text-white/50 text-sm mb-6">
                            All {aiNativeCurriculum.length} modules available in the AI-Native Training curriculum.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {aiNativeCurriculum.map((module) => (
                                <ModuleCard key={module.id} module={module} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Assignments Tab */}
                {activeTab === "assignments" && (
                    <div className="text-center py-16">
                        <ClipboardList className="h-12 w-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Assignments Yet</h3>
                        <p className="text-white/40 text-sm">Your assigned training will appear here</p>
                    </div>
                )}

                {/* Certificates Tab */}
                {activeTab === "certificates" && (
                    <div className="text-center py-16">
                        <Award className="h-12 w-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                        <p className="text-white/40 text-sm">Complete a certification path to earn your certificate</p>
                    </div>
                )}

                {/* Begin Certification CTA */}
                {activeTab === "certifications" && (
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 border border-white/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-montserrat text-xl font-bold mb-2">Begin Your NATIVE Certification Journey</h3>
                                <p className="text-sm text-white/40">Start with AI-Native Foundations and progress through all 4 levels</p>
                            </div>
                            <Link href="/training/module-1">
                                <button className="px-6 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
                                    <GraduationCap className="h-4 w-4" />
                                    Start Foundations
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-white/5 mt-12">
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
