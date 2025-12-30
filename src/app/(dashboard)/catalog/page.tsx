"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    Clock,
    BookOpen,
    Award,
    Star,
    ChevronRight,
    Play,
    Code,
    Brain,
    Target,
    Sparkles,
    Layers,
    Shield,
    Zap,
    Users,
    BarChart3,
    GraduationCap,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { aiNativeCurriculum, certificationTracks, type AIModule, type CertificationLevel } from "@/lib/curriculum/ai-native-curriculum";

// =============================================================================
// FILTER CONFIGURATION
// =============================================================================

const levels: { id: CertificationLevel; label: string; color: string }[] = [
    { id: "foundations", label: "Foundations", color: "text-blue-400 bg-blue-500/10" },
    { id: "associate", label: "Associate", color: "text-emerald-400 bg-emerald-500/10" },
    { id: "professional", label: "Professional", color: "text-purple-400 bg-purple-500/10" },
    { id: "architect", label: "Architect", color: "text-amber-400 bg-amber-500/10" },
];

const topics = [
    { id: "llm", label: "Large Language Models", icon: Brain },
    { id: "prompt", label: "Prompt Engineering", icon: Sparkles },
    { id: "agents", label: "Agentic AI", icon: Zap },
    { id: "rag", label: "RAG Architecture", icon: Layers },
    { id: "mlops", label: "MLOps", icon: Code },
    { id: "security", label: "AI Security", icon: Shield },
    { id: "strategy", label: "AI Strategy", icon: Target },
];

const roles = [
    { id: "developer", label: "Developers" },
    { id: "analyst", label: "Business Analysts" },
    { id: "pm", label: "Product Managers" },
    { id: "executive", label: "Executives" },
    { id: "everyone", label: "All Roles" },
];

const formats = [
    { id: "video", label: "Video Lessons", icon: Play },
    { id: "hands-on", label: "Hands-on Labs", icon: Code },
    { id: "reading", label: "Reading", icon: BookOpen },
    { id: "assessment", label: "Assessments", icon: Award },
];

// =============================================================================
// COURSE CARD COMPONENT
// =============================================================================

interface CourseCardProps {
    module: AIModule;
    index: number;
}

function CourseCard({ module, index }: CourseCardProps) {
    const levelConfig = levels.find(l => l.id === module.level);

    // Simulated stats (would come from real data)
    const stats = {
        enrolled: Math.floor(Math.random() * 5000) + 1000,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 100,
    };

    // Module icon based on content
    const getModuleIcon = (num: number) => {
        const icons = [Brain, Sparkles, Code, Layers, Zap, Shield, Target, BarChart3];
        const Icon = icons[num % icons.length];
        return <Icon className="h-6 w-6" />;
    };

    return (
        <Link href={`/training/${module.id}`}>
            <div className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                {/* Level badge */}
                <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                        "p-3 rounded-xl",
                        levelConfig?.color || "bg-white/10"
                    )}>
                        {getModuleIcon(module.number)}
                    </div>
                    <span className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full",
                        levelConfig?.color || "bg-white/10 text-white/60"
                    )}>
                        {levelConfig?.label}
                    </span>
                </div>

                {/* Title & subtitle */}
                <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors line-clamp-2">
                    {module.title}
                </h3>
                <p className="text-sm text-white/40 mb-4 line-clamp-2">
                    {module.subtitle}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {module.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {module.topics.length} lessons
                    </span>
                    <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-400" fill="#facc15" />
                        {stats.rating}
                    </span>
                </div>

                {/* Progress or CTA */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">
                        {stats.enrolled.toLocaleString()} enrolled
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                        View Course
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>

                {/* Status badge */}
                {module.status === "coming_soon" && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                            Coming Soon
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

// =============================================================================
// CERTIFICATION PATH CARD
// =============================================================================

interface PathCardProps {
    track: typeof certificationTracks[0];
}

function PathCard({ track }: PathCardProps) {
    const levelConfig = levels.find(l => l.id === track.level);

    return (
        <Link href={`/certifications/${track.id}`}>
            <div className="group bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="flex items-start gap-4">
                    {/* Badge */}
                    <div className="text-4xl">{track.badge}</div>

                    <div className="flex-1">
                        <span className={cn(
                            "inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2",
                            levelConfig?.color
                        )}>
                            {track.certificationCode}
                        </span>
                        <h3 className="font-semibold text-lg mb-1">{track.shortTitle}</h3>
                        <p className="text-sm text-white/40 line-clamp-2 mb-3">{track.description}</p>

                        <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-3.5 w-3.5" />
                                {track.modules.length} modules
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {track.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <Award className="h-3.5 w-3.5" />
                                Certificate
                            </span>
                        </div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}

// =============================================================================
// MAIN CATALOG PAGE
// =============================================================================

export default function CatalogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [view, setView] = useState<"courses" | "paths">("courses");

    // Filter modules
    const filteredModules = useMemo(() => {
        return aiNativeCurriculum.filter(module => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!module.title.toLowerCase().includes(query) &&
                    !module.subtitle.toLowerCase().includes(query) &&
                    !module.description.toLowerCase().includes(query)) {
                    return false;
                }
            }

            // Level filter
            if (selectedLevel && module.level !== selectedLevel) {
                return false;
            }

            return true;
        });
    }, [searchQuery, selectedLevel]);

    // Stats
    const totalHours = aiNativeCurriculum.reduce((sum, m) => {
        const hours = parseInt(m.duration) || 8;
        return sum + hours;
    }, 0);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/catalog" className="text-sm text-white font-medium">Catalog</Link>
                        <Link href="/training" className="text-sm text-white/60 hover:text-white transition-colors">My Learning</Link>
                        <Link href="/certifications" className="text-sm text-white/60 hover:text-white transition-colors">Certifications</Link>
                    </nav>
                    <Link href="/training" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                        Start Learning
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-16 px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="font-montserrat text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Course Catalog
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
                        Master AI-Native skills with our comprehensive curriculum. {aiNativeCurriculum.length} courses, {totalHours}+ hours of content, 4 certification levels.
                    </p>

                    {/* Search */}
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search courses, topics, skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="h-4 w-4 text-white/40" />
                            </button>
                        )}
                    </div>

                    {/* Quick stats */}
                    <div className="flex items-center justify-center gap-8 mt-8 text-sm">
                        <div className="flex items-center gap-2 text-white/40">
                            <BookOpen className="h-4 w-4" />
                            <span>{aiNativeCurriculum.length} Courses</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Clock className="h-4 w-4" />
                            <span>{totalHours}+ Hours</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <GraduationCap className="h-4 w-4" />
                            <span>4 Certifications</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Users className="h-4 w-4" />
                            <span>10,000+ Learners</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters & Content */}
            <section className="py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        {/* View Toggle */}
                        <div className="flex bg-white/5 rounded-full p-1">
                            <button
                                onClick={() => setView("courses")}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full transition-colors",
                                    view === "courses" ? "bg-white text-black" : "text-white/60 hover:text-white"
                                )}
                            >
                                All Courses
                            </button>
                            <button
                                onClick={() => setView("paths")}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full transition-colors",
                                    view === "paths" ? "bg-white text-black" : "text-white/60 hover:text-white"
                                )}
                            >
                                Learning Paths
                            </button>
                        </div>

                        <div className="h-6 w-px bg-white/10" />

                        {/* Level Filters */}
                        <div className="flex flex-wrap gap-2">
                            {levels.map(level => (
                                <button
                                    key={level.id}
                                    onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                                        selectedLevel === level.id
                                            ? level.color + " border-transparent"
                                            : "border-white/10 text-white/60 hover:border-white/20"
                                    )}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>

                        {/* Clear filters */}
                        {(selectedLevel || searchQuery) && (
                            <>
                                <div className="h-6 w-px bg-white/10" />
                                <button
                                    onClick={() => {
                                        setSelectedLevel(null);
                                        setSearchQuery("");
                                    }}
                                    className="text-xs text-white/40 hover:text-white transition-colors"
                                >
                                    Clear filters
                                </button>
                            </>
                        )}

                        {/* Results count */}
                        <span className="ml-auto text-sm text-white/40">
                            {view === "courses"
                                ? `${filteredModules.length} courses`
                                : `${certificationTracks.length} paths`
                            }
                        </span>
                    </div>

                    {/* Courses Grid */}
                    {view === "courses" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredModules.map((module, index) => (
                                <CourseCard key={module.id} module={module} index={index} />
                            ))}
                        </div>
                    )}

                    {/* Learning Paths */}
                    {view === "paths" && (
                        <div className="space-y-4">
                            {certificationTracks.map(track => (
                                <PathCard key={track.id} track={track} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {view === "courses" && filteredModules.length === 0 && (
                        <div className="text-center py-16">
                            <Search className="h-12 w-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No courses found</h3>
                            <p className="text-white/40">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Certification CTA */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <GraduationCap className="h-12 w-12 text-white/20 mx-auto mb-4" />
                    <h2 className="font-montserrat text-2xl font-bold mb-4">
                        Earn Your NATIVE Certification
                    </h2>
                    <p className="text-white/50 mb-8">
                        Complete a learning path to earn industry-recognized certifications that prove your AI-Native expertise.
                    </p>
                    <Link href="/certifications">
                        <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                            View Certification Programs →
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
