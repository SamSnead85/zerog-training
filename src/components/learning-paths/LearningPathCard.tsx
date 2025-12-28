"use client";

/**
 * Learning Path Card
 * 
 * Display card for learning paths in catalog/browse views.
 */

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    Clock,
    Star,
    Users,
    Award,
    BookOpen,
    ChevronRight,
    Sparkles,
    TrendingUp,
    Zap,
} from "lucide-react";
import { Badge, Progress } from "@/components/ui";

interface LearningPathCardProps {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail?: string;
    duration: string;
    difficulty: "beginner" | "intermediate" | "advanced" | "expert";
    category: string;
    totalModules: number;
    rating?: number;
    reviewCount?: number;
    enrollments?: number;
    hasCertification?: boolean;
    featured?: boolean;
    new?: boolean;
    popular?: boolean;
    progress?: number;
    className?: string;
}

const difficultyColors = {
    beginner: "bg-emerald-500/20 text-emerald-400",
    intermediate: "bg-blue-500/20 text-blue-400",
    advanced: "bg-amber-500/20 text-amber-400",
    expert: "bg-red-500/20 text-red-400",
};

export function LearningPathCard({
    id,
    slug,
    title,
    description,
    thumbnail,
    duration,
    difficulty,
    category,
    totalModules,
    rating,
    reviewCount,
    enrollments,
    hasCertification,
    featured,
    new: isNew,
    popular,
    progress,
    className,
}: LearningPathCardProps) {
    const hasProgress = progress !== undefined && progress > 0;

    return (
        <Link
            href={`/paths/${slug}`}
            className={cn(
                "group block rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1",
                className
            )}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted/30 overflow-hidden">
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <BookOpen className="h-12 w-12 text-primary/50" />
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {featured && (
                        <Badge className="bg-primary/90 text-primary-foreground">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                        </Badge>
                    )}
                    {isNew && (
                        <Badge className="bg-emerald-500/90">New</Badge>
                    )}
                    {popular && !featured && (
                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                        </Badge>
                    )}
                </div>

                {/* Certification badge */}
                {hasCertification && (
                    <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 backdrop-blur-sm flex items-center justify-center">
                            <Award className="h-4 w-4 text-amber-400" />
                        </div>
                    </div>
                )}

                {/* Progress overlay */}
                {hasProgress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <div className="flex items-center justify-between text-xs text-white mb-1">
                            <span>Continue Learning</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category & Difficulty */}
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs px-2 py-0">
                        {category}
                    </Badge>
                    <Badge className={cn("text-xs px-2 py-0", difficultyColors[difficulty])}>
                        {difficulty}
                    </Badge>
                </div>

                {/* Title */}
                <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{totalModules} modules</span>
                    </div>
                    {rating && (
                        <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{rating.toFixed(1)}</span>
                            {reviewCount && (
                                <span className="text-muted-foreground/70">
                                    ({reviewCount.toLocaleString()})
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Enrollments */}
                {enrollments && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{enrollments.toLocaleString()} enrolled</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm font-medium text-primary">
                        {hasProgress ? "Continue" : "Start Learning"}
                    </span>
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}

// Compact version for sidebars/lists
export function LearningPathCardCompact({
    id,
    slug,
    title,
    duration,
    difficulty,
    totalModules,
    progress,
    className,
}: Pick<LearningPathCardProps, "id" | "slug" | "title" | "duration" | "difficulty" | "totalModules" | "progress" | "className">) {
    return (
        <Link
            href={`/paths/${slug}`}
            className={cn(
                "flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors",
                className
            )}
        >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{title}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{duration}</span>
                    <span>•</span>
                    <span>{totalModules} modules</span>
                </div>
                {progress !== undefined && progress > 0 && (
                    <Progress value={progress} className="h-1 mt-2" />
                )}
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>
    );
}

export default LearningPathCard;
