"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Trophy,
    Star,
    Sparkles,
    PartyPopper,
    Share2,
    Download,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface CompletionCelebrationProps {
    show: boolean;
    type: "lesson" | "module" | "track" | "certification";
    title: string;
    subtitle?: string;
    xpEarned?: number;
    badgeEarned?: string;
    onClose: () => void;
    onShare?: () => void;
    onDownloadCertificate?: () => void;
}

export function CompletionCelebration({
    show,
    type,
    title,
    subtitle,
    xpEarned = 0,
    badgeEarned,
    onClose,
    onShare,
    onDownloadCertificate,
}: CompletionCelebrationProps) {
    const [animationPhase, setAnimationPhase] = useState(0);

    // Trigger confetti animation
    const triggerConfetti = useCallback(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#10b981', '#6366f1', '#f59e0b', '#ec4899'],
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#10b981', '#6366f1', '#f59e0b', '#ec4899'],
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (show) {
            setAnimationPhase(1);
            setTimeout(() => setAnimationPhase(2), 300);
            setTimeout(() => setAnimationPhase(3), 600);
            triggerConfetti();
        } else {
            setAnimationPhase(0);
        }
    }, [show, triggerConfetti]);

    if (!show) return null;

    const celebrationConfig = {
        lesson: {
            icon: Star,
            gradient: "from-blue-500 to-cyan-500",
            message: "Lesson Complete!",
        },
        module: {
            icon: Trophy,
            gradient: "from-emerald-500 to-teal-500",
            message: "Module Mastered!",
        },
        track: {
            icon: Sparkles,
            gradient: "from-purple-500 to-pink-500",
            message: "Track Finished!",
        },
        certification: {
            icon: PartyPopper,
            gradient: "from-amber-500 to-orange-500",
            message: "Certified!",
        },
    };

    const config = celebrationConfig[type];
    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
                <X className="h-6 w-6 text-white/60" />
            </button>

            <Card className={cn(
                "relative p-8 max-w-md w-full mx-4 text-center overflow-hidden transition-all duration-500",
                animationPhase >= 1 ? "scale-100 opacity-100" : "scale-90 opacity-0"
            )}>
                {/* Animated background glow */}
                <div className={cn(
                    "absolute inset-0 opacity-20 bg-gradient-to-br",
                    config.gradient
                )} />

                {/* Icon */}
                <div className={cn(
                    "relative mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500",
                    `bg-gradient-to-br ${config.gradient}`,
                    animationPhase >= 2 ? "scale-100" : "scale-0"
                )}>
                    <Icon className="h-12 w-12 text-white" />
                </div>

                {/* Message */}
                <div className={cn(
                    "relative transition-all duration-500",
                    animationPhase >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                    <h2 className="text-2xl font-bold mb-2">{config.message}</h2>
                    <h3 className="text-xl font-semibold mb-1">{title}</h3>
                    {subtitle && (
                        <p className="text-white/60 mb-6">{subtitle}</p>
                    )}

                    {/* XP Earned */}
                    {xpEarned > 0 && (
                        <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30 text-lg px-4 py-2">
                            +{xpEarned} XP Earned!
                        </Badge>
                    )}

                    {/* Badge Earned */}
                    {badgeEarned && (
                        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-sm text-white/60 mb-2">New Badge Unlocked</p>
                            <p className="font-semibold text-emerald-400">{badgeEarned}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 justify-center">
                        {onShare && (
                            <Button variant="outline" onClick={onShare} className="gap-2">
                                <Share2 className="h-4 w-4" />
                                Share
                            </Button>
                        )}
                        {onDownloadCertificate && type === "certification" && (
                            <Button onClick={onDownloadCertificate} className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Certificate
                            </Button>
                        )}
                        <Button onClick={onClose}>
                            Continue Learning
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Streak indicator component
export function StreakIndicator({
    currentStreak,
    longestStreak,
    todayComplete
}: {
    currentStreak: number;
    longestStreak: number;
    todayComplete: boolean;
}) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                todayComplete ? "bg-amber-500/20" : "bg-white/10"
            )}>
                <span className="text-lg">🔥</span>
            </div>
            <div>
                <p className="font-semibold">{currentStreak} Day Streak</p>
                <p className="text-xs text-white/50">
                    {todayComplete ? "Keep it up!" : "Complete a lesson to continue!"}
                </p>
            </div>
            <div className="ml-auto text-right">
                <p className="text-xs text-white/50">Best</p>
                <p className="font-medium text-amber-400">{longestStreak}</p>
            </div>
        </div>
    );
}

// XP Progress indicator
export function XPProgress({
    currentXP,
    levelXP,
    level,
}: {
    currentXP: number;
    levelXP: number;
    level: number;
}) {
    const progress = (currentXP / levelXP) * 100;

    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm">
                        {level}
                    </div>
                    <span className="font-medium">Level {level}</span>
                </div>
                <span className="text-sm text-white/60">
                    {currentXP} / {levelXP} XP
                </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-xs text-white/40 mt-1 text-right">
                {levelXP - currentXP} XP to Level {level + 1}
            </p>
        </div>
    );
}
