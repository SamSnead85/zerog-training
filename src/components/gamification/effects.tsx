"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

// Confetti celebration effect
export function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#64748B", "#94A3B8", "#CBD5E1", "#E2E8F0"];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// XP gain animation
export function XPGainAnimation({ amount, onComplete }: { amount: number; onComplete?: () => void }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 1500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <div className="animate-bounce text-4xl font-bold text-primary">
                +{amount} XP
            </div>
        </div>
    );
}

// Streak fire animation component
export function StreakFire({ streak }: { streak: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <span className="text-2xl animate-pulse">🔥</span>
                {streak >= 7 && (
                    <span className="absolute -top-1 -right-1 text-xs">✨</span>
                )}
            </div>
            <div>
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
        </div>
    );
}

// Level badge component
export function LevelBadge({ level, xp, xpToNext }: { level: number; xp: number; xpToNext: number }) {
    const progress = (xp / xpToNext) * 100;

    const levelNames = ["Novice", "Learner", "Practitioner", "Expert", "Master", "Guru"];
    const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)];

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/30">
                    <span className="text-lg font-bold text-primary">{level}</span>
                </div>
                {/* Progress ring */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                    <circle
                        cx="24"
                        cy="24"
                        r="21"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white/10"
                    />
                    <circle
                        cx="24"
                        cy="24"
                        r="21"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${progress * 1.32} 132`}
                        className="text-primary transition-all duration-500"
                    />
                </svg>
            </div>
            <div>
                <p className="font-semibold">{levelName}</p>
                <p className="text-xs text-muted-foreground">{xp} / {xpToNext} XP</p>
            </div>
        </div>
    );
}

// Achievement unlock animation
export function AchievementUnlock({
    title,
    description,
    icon,
    onComplete
}: {
    title: string;
    description: string;
    icon: string;
    onComplete?: () => void;
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        triggerConfetti();
        const timer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-card border border-white/10 rounded-2xl p-8 text-center max-w-sm animate-scale-in">
                <div className="text-6xl mb-4">{icon}</div>
                <p className="text-xs uppercase tracking-wider text-primary mb-2">Achievement Unlocked!</p>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
