"use client";

import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Trophy,
    Flame,
    ArrowRight,
    Play,
    Target,
    Star,
    Sparkles,
    ChevronRight,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Welcome header with personalized greeting
export function DashboardHeader({
    userName,
    currentStreak,
    level,
    xpToday,
}: {
    userName: string;
    currentStreak: number;
    level: number;
    xpToday: number;
}) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-emerald-500/10 to-cyan-500/10 p-6 md:p-8 border border-white/10">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {getGreeting()}, {userName}! 👋
                    </h1>
                    <p className="text-white/60 mt-1">
                        Continue your AI-Native transformation journey
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Streak */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <Flame className="h-5 w-5 text-orange-400" />
                        <span className="font-semibold">{currentStreak}</span>
                        <span className="text-sm text-white/60">day streak</span>
                    </div>

                    {/* Level */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Star className="h-5 w-5 text-purple-400" />
                        <span className="font-semibold">Level {level}</span>
                    </div>

                    {/* Today's XP */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                        <span className="font-semibold">+{xpToday}</span>
                        <span className="text-sm text-white/60">XP today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Current lesson card with resume functionality
export function CurrentLessonCard({
    lessonId,
    lessonTitle,
    moduleTitle,
    progress,
    timeRemaining,
    className,
}: {
    lessonId: string;
    lessonTitle: string;
    moduleTitle: string;
    progress: number;
    timeRemaining: string;
    className?: string;
}) {
    return (
        <Link href={`/learn/lesson/${lessonId}`}>
            <Card className={cn(
                "p-5 bg-gradient-to-br from-primary/10 to-emerald-500/5 border-primary/20 hover:border-primary/40 transition-all group",
                className
            )}>
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                    <Play className="h-4 w-4" />
                    <span className="font-medium">Continue Learning</span>
                </div>

                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {lessonTitle}
                </h3>
                <p className="text-sm text-white/50 mb-4">{moduleTitle}</p>

                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">{Math.round(progress)}% complete</span>
                    <span className="text-sm text-white/40 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeRemaining} remaining
                    </span>
                </div>
                <Progress value={progress} className="h-2" />

                <Button className="w-full mt-4 group-hover:bg-primary/90">
                    Resume Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Card>
        </Link>
    );
}

// Recommended next steps
export function RecommendedActions({
    actions,
    className,
}: {
    actions: {
        id: string;
        type: "lesson" | "quiz" | "lab" | "achievement";
        title: string;
        description: string;
        xpReward: number;
        duration?: string;
        href: string;
    }[];
    className?: string;
}) {
    const typeConfig = {
        lesson: { icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10" },
        quiz: { icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        lab: { icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10" },
        achievement: { icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/10" },
    };

    return (
        <Card className={cn("p-5 bg-white/[0.02] border-white/10", className)}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-400" />
                Recommended Next
            </h3>

            <div className="space-y-3">
                {actions.map((action) => {
                    const config = typeConfig[action.type];
                    const Icon = config.icon;

                    return (
                        <Link
                            key={action.id}
                            href={action.href}
                            className="block group"
                        >
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bg)}>
                                    <Icon className={cn("h-5 w-5", config.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                        {action.title}
                                    </p>
                                    <p className="text-xs text-white/40 truncate">{action.description}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                                        +{action.xpReward} XP
                                    </Badge>
                                    {action.duration && (
                                        <p className="text-xs text-white/30 mt-1">{action.duration}</p>
                                    )}
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-primary transition-colors" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Card>
    );
}

// Quick stats row
export function QuickStats({
    stats,
    className,
}: {
    stats: {
        label: string;
        value: string | number;
        icon: React.ReactNode;
        trend?: { value: number; positive: boolean };
    }[];
    className?: string;
}) {
    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
            {stats.map((stat, i) => (
                <Card key={i} className="p-4 bg-white/[0.02] border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-white/50">{stat.label}</p>
                        </div>
                        {stat.trend && (
                            <div className={cn(
                                "ml-auto text-xs font-medium",
                                stat.trend.positive ? "text-emerald-400" : "text-red-400"
                            )}>
                                {stat.trend.positive ? "+" : ""}{stat.trend.value}%
                            </div>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}
