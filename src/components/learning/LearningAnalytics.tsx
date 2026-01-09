"use client";

import { Card, Badge, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Trophy,
    Target,
    TrendingUp,
    Calendar,
    Award,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningStatsProps {
    totalModules: number;
    completedModules: number;
    totalLessons: number;
    completedLessons: number;
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    totalTimeMinutes: number;
    certificatesEarned: number;
    className?: string;
}

export function LearningStats({
    totalModules,
    completedModules,
    totalLessons,
    completedLessons,
    totalXP,
    currentStreak,
    longestStreak,
    totalTimeMinutes,
    certificatesEarned,
    className,
}: LearningStatsProps) {
    const moduleProgress = (completedModules / totalModules) * 100;
    const lessonProgress = (completedLessons / totalLessons) * 100;
    const hoursSpent = Math.floor(totalTimeMinutes / 60);
    const minutesSpent = totalTimeMinutes % 60;

    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
            {/* Modules Progress */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{completedModules}</p>
                        <p className="text-xs text-white/50">of {totalModules} modules</p>
                    </div>
                </div>
                <Progress value={moduleProgress} className="h-1.5" />
            </Card>

            {/* Lessons Progress */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{completedLessons}</p>
                        <p className="text-xs text-white/50">of {totalLessons} lessons</p>
                    </div>
                </div>
                <Progress value={lessonProgress} className="h-1.5" />
            </Card>

            {/* XP Earned */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{totalXP.toLocaleString()}</p>
                        <p className="text-xs text-white/50">Total XP</p>
                    </div>
                </div>
            </Card>

            {/* Time Spent */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{hoursSpent}h {minutesSpent}m</p>
                        <p className="text-xs text-white/50">Time learning</p>
                    </div>
                </div>
            </Card>

            {/* Streak */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <span className="text-xl">🔥</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{currentStreak}</p>
                        <p className="text-xs text-white/50">Day streak (best: {longestStreak})</p>
                    </div>
                </div>
            </Card>

            {/* Certificates */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <Award className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{certificatesEarned}</p>
                        <p className="text-xs text-white/50">Certificates</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Weekly activity chart
export function WeeklyActivity({
    data,
    className
}: {
    data: { day: string; minutes: number }[];
    className?: string;
}) {
    const maxMinutes = Math.max(...data.map(d => d.minutes), 1);

    return (
        <Card className={cn("p-6 bg-white/[0.02] border-white/10", className)}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                This Week's Activity
            </h3>
            <div className="flex items-end justify-between h-32 gap-2">
                {data.map((day, i) => {
                    const height = (day.minutes / maxMinutes) * 100;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex-1 flex items-end">
                                <div
                                    className={cn(
                                        "w-full rounded-t-md transition-all",
                                        day.minutes > 0
                                            ? "bg-gradient-to-t from-primary to-emerald-500"
                                            : "bg-white/10"
                                    )}
                                    style={{ height: `${Math.max(height, 4)}%` }}
                                />
                            </div>
                            <span className="text-xs text-white/50">{day.day}</span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

// Achievement badges component
export function AchievementBadges({
    badges,
    className,
}: {
    badges: { id: string; name: string; icon: string; earned: boolean; earnedAt?: string }[];
    className?: string;
}) {
    return (
        <Card className={cn("p-6 bg-white/[0.02] border-white/10", className)}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                Achievements
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className={cn(
                            "aspect-square rounded-xl flex items-center justify-center text-2xl transition-all",
                            badge.earned
                                ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                                : "bg-white/5 border border-white/10 opacity-40 grayscale"
                        )}
                        title={badge.name}
                    >
                        {badge.icon}
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Current goals component
export function LearningGoals({
    goals,
    className,
}: {
    goals: { id: string; title: string; current: number; target: number; unit: string }[];
    className?: string;
}) {
    return (
        <Card className={cn("p-6 bg-white/[0.02] border-white/10", className)}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-400" />
                Weekly Goals
            </h3>
            <div className="space-y-4">
                {goals.map((goal) => {
                    const progress = Math.min((goal.current / goal.target) * 100, 100);
                    const isComplete = goal.current >= goal.target;

                    return (
                        <div key={goal.id}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">{goal.title}</span>
                                <span className={cn(
                                    "text-sm font-medium",
                                    isComplete ? "text-emerald-400" : "text-white/60"
                                )}>
                                    {goal.current}/{goal.target} {goal.unit}
                                </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all",
                                        isComplete
                                            ? "bg-emerald-500"
                                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                    )}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
