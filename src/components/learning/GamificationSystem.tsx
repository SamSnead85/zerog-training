"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Zap,
    Trophy,
    Star,
    Crown,
    Target,
    Flame,
    Medal,
    Gem,
    Gift,
    Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// XP calculation helpers
export const XP_CONFIG = {
    lessonComplete: 50,
    quizPerfect: 100,
    quizPass: 50,
    moduleComplete: 200,
    trackComplete: 500,
    streakBonus: 25, // Per day
    firstOfDay: 10,
    speedBonus: 25, // Complete in under expected time
};

export function calculateLevel(totalXP: number): { level: number; currentXP: number; nextLevelXP: number } {
    // XP required for each level: 100, 200, 400, 800, etc. (doubles)
    let level = 1;
    let xpRequired = 100;
    let xpAccumulated = 0;

    while (xpAccumulated + xpRequired <= totalXP) {
        xpAccumulated += xpRequired;
        level++;
        xpRequired = Math.min(xpRequired * 2, 5000); // Cap at 5000 per level
    }

    return {
        level,
        currentXP: totalXP - xpAccumulated,
        nextLevelXP: xpRequired,
    };
}

// Level progress ring
export function LevelRing({
    level,
    currentXP,
    nextLevelXP,
    size = "md",
    showDetails = true,
}: {
    level: number;
    currentXP: number;
    nextLevelXP: number;
    size?: "sm" | "md" | "lg";
    showDetails?: boolean;
}) {
    const progress = (currentXP / nextLevelXP) * 100;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    };

    const textSizes = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
    };

    return (
        <div className="flex items-center gap-4">
            <div className={cn("relative", sizeClasses[size])}>
                <svg className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-white/10"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="url(#levelGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500"
                    />
                    <defs>
                        <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn("font-bold", textSizes[size])}>{level}</span>
                </div>
            </div>

            {showDetails && (
                <div>
                    <p className="font-semibold">Level {level}</p>
                    <p className="text-sm text-white/50">
                        {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
                    </p>
                    <p className="text-xs text-white/30 mt-1">
                        {(nextLevelXP - currentXP).toLocaleString()} XP to next level
                    </p>
                </div>
            )}
        </div>
    );
}

// XP gain animation
export function XPGainToast({
    amount,
    reason,
    show,
    onComplete,
}: {
    amount: number;
    reason: string;
    show: boolean;
    onComplete: () => void;
}) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onComplete, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <Card className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">+{amount} XP</p>
                        <p className="text-sm text-white/60">{reason}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Achievement badge component
interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: "common" | "rare" | "epic" | "legendary";
    earned: boolean;
    earnedAt?: string;
    progress?: { current: number; target: number };
}

export function AchievementCard({ achievement }: { achievement: Achievement }) {
    const rarityConfig = {
        common: { bg: "from-gray-500/20 to-gray-600/20", border: "border-gray-500/30", text: "text-gray-400" },
        rare: { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", text: "text-blue-400" },
        epic: { bg: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30", text: "text-purple-400" },
        legendary: { bg: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30", text: "text-amber-400" },
    };

    const config = rarityConfig[achievement.rarity];

    return (
        <Card className={cn(
            "p-4 bg-gradient-to-br",
            config.bg,
            config.border,
            !achievement.earned && "opacity-50 grayscale"
        )}>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                    <h4 className="font-semibold">{achievement.name}</h4>
                    <p className="text-xs text-white/50">{achievement.description}</p>
                </div>
            </div>

            {achievement.progress && !achievement.earned && (
                <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/50">Progress</span>
                        <span>{achievement.progress.current}/{achievement.progress.target}</span>
                    </div>
                    <Progress
                        value={(achievement.progress.current / achievement.progress.target) * 100}
                        className="h-1.5"
                    />
                </div>
            )}

            {achievement.earned && (
                <Badge className={cn("mt-2 text-xs", config.text, config.bg)}>
                    ✓ Earned {achievement.earnedAt && `on ${new Date(achievement.earnedAt).toLocaleDateString()}`}
                </Badge>
            )}
        </Card>
    );
}

// Streak calendar
export function StreakCalendar({
    streakData,
    currentStreak,
}: {
    streakData: { date: string; completed: boolean }[];
    currentStreak: number;
}) {
    // Get last 7 days
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    {currentStreak} Day Streak
                </h4>
            </div>

            <div className="flex justify-between">
                {streakData.slice(-7).map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-xs text-white/40">{days[new Date(day.date).getDay()]}</span>
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            day.completed
                                ? "bg-gradient-to-br from-orange-500 to-red-500"
                                : "bg-white/10"
                        )}>
                            {day.completed && <Flame className="h-4 w-4 text-white" />}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Leaderboard
export function MiniLeaderboard({
    entries,
    currentUserId,
}: {
    entries: { id: string; name: string; avatar?: string; xp: number; level: number }[];
    currentUserId?: string;
}) {
    const sorted = [...entries].sort((a, b) => b.xp - a.xp);

    const rankIcons = [
        <Crown key="1" className="h-4 w-4 text-amber-400" />,
        <Medal key="2" className="h-4 w-4 text-gray-300" />,
        <Medal key="3" className="h-4 w-4 text-amber-600" />,
    ];

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                Leaderboard
            </h4>

            <div className="space-y-2">
                {sorted.slice(0, 5).map((entry, i) => (
                    <div
                        key={entry.id}
                        className={cn(
                            "flex items-center gap-3 p-2 rounded-lg",
                            entry.id === currentUserId && "bg-primary/10"
                        )}
                    >
                        <span className="w-6 flex justify-center">
                            {i < 3 ? rankIcons[i] : <span className="text-sm text-white/40">{i + 1}</span>}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-sm font-medium">
                            {entry.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{entry.name}</p>
                            <p className="text-xs text-white/40">Level {entry.level}</p>
                        </div>
                        <span className="text-sm font-medium">{entry.xp.toLocaleString()} XP</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
