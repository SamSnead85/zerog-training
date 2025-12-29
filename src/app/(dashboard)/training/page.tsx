"use client";

import { useState } from "react";
import Link from "next/link";
import {
    aiNativeCurriculum,
    type AIModule,
} from "@/lib/curriculum/ai-native-curriculum";
import { Badge } from "@/components/ui";
import {
    Home,
    BookOpen,
    ClipboardList,
    Award,
    ChevronDown,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TAB NAVIGATION
// =============================================================================

const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "courses", label: "Modules", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "certificates", label: "Certificates", icon: Award },
];

// =============================================================================
// MODULE ICONS (Premium style with varied colors)
// =============================================================================

const moduleIcons: Record<string, { icon: React.ElementType; color: string }> = {
    "ai-foundations": { icon: Brain, color: "bg-white/20" },
    "prompt-engineering": { icon: Sparkles, color: "bg-white/20" },
    "agentic-ai": { icon: Cpu, color: "bg-white/20" },
    "ai-tools-mastery": { icon: Zap, color: "bg-white/20" },
    "rag-architecture": { icon: Layers, color: "bg-white/20" },
    "mlops-essentials": { icon: Target, color: "bg-white/20" },
    "enterprise-ai-architecture": { icon: Code, color: "bg-white/20" },
    "ai-governance-security": { icon: Shield, color: "bg-white/20" },
};

// =============================================================================
// COLLAPSIBLE SECTION
// =============================================================================

function CollapsibleSection({
    title,
    icon: Icon,
    defaultOpen = true,
    children,
}: {
    title: string;
    icon: React.ElementType;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl border border-white/5 transition-colors"
            >
                <Icon className="h-4 w-4 text-white/60" />
                <span className="font-medium text-sm text-white/80">{title}</span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 ml-auto text-white/40 transition-transform",
                        !isOpen && "-rotate-90"
                    )}
                />
            </button>
            {isOpen && <div className="mt-4">{children}</div>}
        </div>
    );
}

// =============================================================================
// MODULE CARD (Premium elegant style)
// =============================================================================

function ModuleCard({ module }: { module: AIModule }) {
    const iconConfig = moduleIcons[module.id] || { icon: BookOpen, color: "bg-white/20" };
    const Icon = iconConfig.icon;

    return (
        <Link href={`/training/${module.id}`}>
            <div className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm text-white group-hover:text-white transition-colors mb-1">
                            {module.title}
                        </h3>
                        <p className="text-xs text-white/40 line-clamp-2">
                            {module.subtitle}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                            </span>
                            <span className="capitalize">{module.level}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// =============================================================================
// ASSIGNMENT CARD
// =============================================================================

function AssignmentCard({
    title,
    dueDate,
    progress,
    status,
}: {
    title: string;
    dueDate: string;
    progress: number;
    status: "in_progress" | "not_started" | "completed";
}) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{title}</h4>
                <Badge
                    variant="outline"
                    className={cn(
                        "text-[10px] border-white/10",
                        status === "completed" && "border-emerald-500/30 text-emerald-400",
                        status === "in_progress" && "border-white/20 text-white/60",
                        status === "not_started" && "border-white/10 text-white/40"
                    )}
                >
                    {status === "completed" ? "Complete" : status === "in_progress" ? "In Progress" : "Not Started"}
                </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Due: {dueDate}
                </span>
                <span>{progress}% complete</span>
            </div>
            {progress > 0 && (
                <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white/40 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}

// =============================================================================
// MAIN DASHBOARD (Premium Dark Aesthetic)
// =============================================================================

export default function TrainingDashboard() {
    const [activeTab, setActiveTab] = useState("home");

    // Mock data for assignments
    const assignments = [
        { title: "AI Foundations Certification", dueDate: "Jan 15, 2025", progress: 65, status: "in_progress" as const },
        { title: "Prompt Engineering Lab", dueDate: "Jan 20, 2025", progress: 0, status: "not_started" as const },
        { title: "Agentic AI Assessment", dueDate: "Jan 10, 2025", progress: 100, status: "completed" as const },
    ];

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
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                        <p className="text-[11px] text-white/30 uppercase tracking-widest font-medium">AI-Native Training</p>
                        <h1 className="font-montserrat text-2xl font-bold">My Dashboard</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8 max-w-7xl mx-auto">
                {/* My Progress Section */}
                <CollapsibleSection title="My Progress" icon={Target} defaultOpen={true}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Play className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40">Continue Learning</p>
                                    <p className="font-semibold">AI Foundations</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/50">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-white rounded-full" />
                                </div>
                                <span className="text-white font-medium">65%</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">3</p>
                                    <p className="text-xs text-white/40">Modules Completed</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Award className="h-6 w-6 text-white/60" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">1</p>
                                    <p className="text-xs text-white/40">Certificates Earned</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Assignments Section */}
                <CollapsibleSection title="My Assignments" icon={ClipboardList} defaultOpen={true}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assignments.map((assignment, i) => (
                            <AssignmentCard key={i} {...assignment} />
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Modules Grid */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-white/40" />
                            <h2 className="font-medium text-white/80">All Modules</h2>
                        </div>
                        <span className="text-xs text-white/30">{aiNativeCurriculum.length} courses available</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {aiNativeCurriculum.map((module) => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>
                </div>

                {/* Quick Start CTA */}
                <div className="mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-montserrat text-xl font-bold mb-2">Ready to start learning?</h3>
                            <p className="text-sm text-white/40">Experience our interactive AI-native training with a sample lesson</p>
                        </div>
                        <Link href="/training/sample-lesson">
                            <button className="px-6 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
                                <Play className="h-4 w-4" />
                                Start Sample Lesson
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                </div>
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
