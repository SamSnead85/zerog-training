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
// MODULE ICONS AND COLORS (Tanium style)
// =============================================================================

const moduleIcons: Record<string, { icon: React.ElementType; color: string }> = {
    "ai-foundations": { icon: Brain, color: "bg-red-500" },
    "prompt-engineering": { icon: Sparkles, color: "bg-red-500" },
    "agentic-ai": { icon: Cpu, color: "bg-red-500" },
    "ai-tools-mastery": { icon: Zap, color: "bg-red-500" },
    "rag-architecture": { icon: Layers, color: "bg-red-500" },
    "mlops-essentials": { icon: Target, color: "bg-red-500" },
    "enterprise-ai-architecture": { icon: Code, color: "bg-red-500" },
    "ai-governance-security": { icon: Shield, color: "bg-red-500" },
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
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] rounded-lg transition-colors"
            >
                <Icon className="h-4 w-4 text-cyan-400" />
                <span className="font-medium text-sm">{title}</span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 ml-auto text-muted-foreground transition-transform",
                        !isOpen && "-rotate-90"
                    )}
                />
            </button>
            {isOpen && <div className="mt-3">{children}</div>}
        </div>
    );
}

// =============================================================================
// MODULE CARD (Tanium style - 3 column grid)
// =============================================================================

function ModuleCard({ module }: { module: AIModule }) {
    const iconConfig = moduleIcons[module.id] || { icon: BookOpen, color: "bg-red-500" };
    const Icon = iconConfig.icon;

    return (
        <Link href={`/training/${module.id}`}>
            <div className="p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                    <div className={cn("w-3 h-3 rounded-full mt-1 shrink-0", iconConfig.color)} />
                    <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-white group-hover:text-cyan-400 transition-colors mb-1">
                            {module.title}
                        </h3>
                        <p className="text-xs text-white/50 line-clamp-2">
                            {module.subtitle}
                        </p>
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
        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{title}</h4>
                <Badge
                    variant="outline"
                    className={cn(
                        "text-[10px]",
                        status === "completed" && "border-emerald-500/30 text-emerald-400",
                        status === "in_progress" && "border-cyan-500/30 text-cyan-400",
                        status === "not_started" && "border-white/20 text-white/50"
                    )}
                >
                    {status === "completed" ? "Complete" : status === "in_progress" ? "In Progress" : "Not Started"}
                </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Due: {dueDate}
                </span>
                <span>{progress}% complete</span>
            </div>
            {progress > 0 && (
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}

// =============================================================================
// MAIN DASHBOARD
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
        <div className="min-h-screen bg-[#0f1419] text-white">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-[#1a2234] border-b border-white/5">
                <div className="flex items-center h-14 px-4">
                    {/* Logo */}
                    <Link href="/training" className="flex items-center gap-2 mr-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <span className="font-bold text-white text-sm">S</span>
                        </div>
                        <span className="font-playfair text-lg font-medium italic hidden sm:block">
                            ScaledNative
                        </span>
                    </Link>

                    {/* Tab Navigation */}
                    <nav className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-red-500 text-white"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="ml-auto flex items-center gap-3">
                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors">
                            <Settings className="h-5 w-5" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Header */}
            <div className="px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <Home className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">ScaledNative™</span>
                        <h1 className="text-xl font-bold">Training Dashboard</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 max-w-7xl mx-auto">
                {/* My Progress Section */}
                <CollapsibleSection title="My Progress" icon={Target} defaultOpen={true}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center">
                                    <Play className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50">Continue Learning</p>
                                    <p className="font-semibold text-sm">AI Foundations</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/50">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-cyan-500 rounded-full" />
                                </div>
                                <span>65%</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">3</p>
                                    <p className="text-xs text-white/50">Modules Completed</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                    <Award className="h-5 w-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">1</p>
                                    <p className="text-xs text-white/50">Certificates Earned</p>
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

                {/* Modules Grid (Tanium style) */}
                <div className="mt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-4 w-4 text-cyan-400" />
                        <h2 className="font-medium text-sm">All Modules</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {aiNativeCurriculum.map((module) => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold mb-1">Ready to start learning?</h3>
                            <p className="text-sm text-white/50">Try our interactive sample lesson</p>
                        </div>
                        <Link href="/training/sample-lesson">
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2">
                                <Play className="h-4 w-4" />
                                Start Learning
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
