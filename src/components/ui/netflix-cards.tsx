"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Badge, Button, Progress } from "@/components/ui";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Star,
    Users,
    Play,
    Plus,
    Info,
    Sparkles,
    CheckCircle2,
    Shield,
    Brain,
    Workflow,
    Heart,
    Building2,
    GraduationCap,
    Code2,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Category-based gradient backgrounds - Professional, muted enterprise tones
const categoryGradients: Record<string, { bg: string; accent: string; icon: React.ElementType }> = {
    "ai-tech": { bg: "from-slate-700/40 via-slate-600/25 to-slate-500/10", accent: "bg-slate-500", icon: Brain },
    "agile-safe": { bg: "from-slate-600/40 via-zinc-600/25 to-slate-500/10", accent: "bg-slate-600", icon: Workflow },
    "compliance": { bg: "from-zinc-700/40 via-slate-600/25 to-zinc-500/10", accent: "bg-zinc-600", icon: Shield },
    "leadership": { bg: "from-stone-700/40 via-stone-600/25 to-stone-500/10", accent: "bg-stone-600", icon: TrendingUp },
    "industry": { bg: "from-neutral-700/40 via-neutral-600/25 to-neutral-500/10", accent: "bg-neutral-600", icon: Building2 },
    "onboarding": { bg: "from-slate-600/40 via-gray-600/25 to-slate-500/10", accent: "bg-slate-500", icon: GraduationCap },
    "healthcare": { bg: "from-slate-700/40 via-zinc-600/25 to-slate-500/10", accent: "bg-slate-600", icon: Heart },
    "technology": { bg: "from-zinc-700/40 via-slate-600/25 to-zinc-500/10", accent: "bg-zinc-600", icon: Code2 },
};

interface ModuleCardProps {
    id: string;
    title: string;
    description?: string;
    category: string;
    duration: string;
    rating?: number;
    enrollments?: number;
    progress?: number;
    isNew?: boolean;
    isTrending?: boolean;
    isAINative?: boolean;
    difficulty?: "beginner" | "intermediate" | "advanced";
    instructor?: string;
    sections?: number;
    thumbnail?: string;
    onClick?: () => void;
}

// Netflix-style Module Card with hover expansion
export function NetflixModuleCard({
    id,
    title,
    description,
    category,
    duration,
    rating,
    enrollments,
    progress,
    isNew,
    isTrending,
    isAINative,
    difficulty,
    instructor,
    sections,
    thumbnail,
    onClick,
}: ModuleCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const categoryKey = category.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-");
    const gradient = categoryGradients[categoryKey] || categoryGradients["ai-tech"];
    const CategoryIcon = gradient.icon;

    return (
        <div
            className={cn(
                "group relative flex-shrink-0 w-[280px] h-[160px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-out",
                isHovered && "z-50 scale-110 shadow-2xl shadow-black/50"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Background - Image or Gradient */}
            {thumbnail ? (
                <>
                    <img
                        src={thumbnail}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </>
            ) : (
                <>
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        gradient.bg
                    )} />
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)`
                    }} />
                    {/* Category Icon Watermark */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                        <CategoryIcon className="h-24 w-24" />
                    </div>
                </>
            )}

            {/* Content */}
            <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top Row - Badges */}
                <div className="flex items-center gap-2">
                    {isNew && (
                        <Badge className="bg-slate-600 text-white text-[10px] px-1.5 py-0">NEW</Badge>
                    )}
                    {isTrending && (
                        <Badge className="bg-zinc-600 text-white text-[10px] px-1.5 py-0">TRENDING</Badge>
                    )}
                    {isAINative && (
                        <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0 gap-0.5">
                            <Sparkles className="h-2.5 w-2.5" />
                            AI
                        </Badge>
                    )}
                </div>

                {/* Title & Metadata */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-base leading-tight line-clamp-2 text-white drop-shadow-md">
                        {title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/80">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {duration}
                        </span>
                        {rating && (
                            <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                {rating.toFixed(1)}
                            </span>
                        )}
                        {enrollments && (
                            <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {enrollments > 1000 ? `${(enrollments / 1000).toFixed(1)}k` : enrollments}
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress Bar (if enrolled) */}
                {progress !== undefined && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Hover Expansion Panel */}
            {isHovered && (
                <div className="absolute left-0 right-0 top-full bg-card border border-t-0 border-border rounded-b-lg p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {description && (
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{description}</p>
                    )}

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="outline" className="text-[10px]">{category}</Badge>
                        {difficulty && (
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-[10px]",
                                    difficulty === "beginner" && "border-slate-500/50 text-slate-400",
                                    difficulty === "intermediate" && "border-zinc-500/50 text-zinc-400",
                                    difficulty === "advanced" && "border-stone-500/50 text-stone-400"
                                )}
                            >
                                {difficulty}
                            </Badge>
                        )}
                        {sections && (
                            <span className="text-[10px] text-muted-foreground">{sections} sections</span>
                        )}
                    </div>

                    {instructor && (
                        <p className="text-[10px] text-muted-foreground mb-3">by {instructor}</p>
                    )}

                    <div className="flex items-center gap-2">
                        <Link href={`/module/${id}`} className="flex-1">
                            <Button size="sm" className="w-full gap-1.5 h-8">
                                <Play className="h-3.5 w-3.5" />
                                {progress && progress > 0 ? "Continue" : "Start"}
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Info className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Horizontal Scroll Row (Netflix-style category row)
interface ScrollRowProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    showAll?: boolean;
    onShowAll?: () => void;
}

export function HorizontalScrollRow({ title, subtitle, children, showAll, onShowAll }: ScrollRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 600;
        const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
        scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 20);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    };

    return (
        <div className="relative group/row">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
                {showAll && (
                    <Button variant="ghost" size="sm" onClick={onShowAll} className="gap-1 text-muted-foreground hover:text-foreground">
                        Show All
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Scroll Container */}
            <div className="relative">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-background via-background/80 to-transparent flex items-center justify-start pl-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
                    >
                        <div className="w-10 h-10 rounded-full bg-card/90 border border-border flex items-center justify-center hover:bg-card transition-colors">
                            <ChevronLeft className="h-5 w-5" />
                        </div>
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
                    >
                        <div className="w-10 h-10 rounded-full bg-card/90 border border-border flex items-center justify-center hover:bg-card transition-colors">
                            <ChevronRight className="h-5 w-5" />
                        </div>
                    </button>
                )}

                {/* Scrollable Content */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-3 overflow-x-auto scrollbar-hide pb-8 pt-2 px-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

// Category Hero Banner (Featured content at top)
interface HeroBannerProps {
    title: string;
    description: string;
    category: string;
    duration: string;
    rating?: number;
    onPlay?: () => void;
    onMoreInfo?: () => void;
}

export function CategoryHeroBanner({
    title,
    description,
    category,
    duration,
    rating,
    onPlay,
    onMoreInfo,
}: HeroBannerProps) {
    const categoryKey = category.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-");
    const gradient = categoryGradients[categoryKey] || categoryGradients["ai-tech"];
    const CategoryIcon = gradient.icon;

    return (
        <div className="relative h-[320px] rounded-xl overflow-hidden mb-8">
            {/* Background */}
            <div className={cn("absolute inset-0 bg-gradient-to-r", gradient.bg)} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Icon Watermark */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5">
                <CategoryIcon className="h-64 w-64" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8">
                <Badge variant="outline" className="w-fit mb-3 border-white/30 text-white/80">
                    {category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg max-w-2xl">
                    {title}
                </h1>
                <p className="text-white/80 mb-4 max-w-xl line-clamp-2">{description}</p>

                <div className="flex items-center gap-4 text-sm text-white/70 mb-6">
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {duration}
                    </span>
                    {rating && (
                        <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            {rating.toFixed(1)}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Button size="lg" onClick={onPlay} className="gap-2 bg-white text-black hover:bg-white/90">
                        <Play className="h-5 w-5 fill-current" />
                        Start Learning
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={onMoreInfo}
                        className="gap-2 border-white/30 text-white hover:bg-white/10"
                    >
                        <Info className="h-5 w-5" />
                        More Info
                    </Button>
                </div>
            </div>
        </div>
    );
}
