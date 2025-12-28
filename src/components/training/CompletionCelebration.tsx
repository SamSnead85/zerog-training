"use client";

import { useEffect, useState } from "react";
import { Trophy, Star, Sparkles, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import Link from "next/link";

interface CompletionCelebrationProps {
    courseName: string;
    xpEarned: number;
    certificateAvailable?: boolean;
    onContinue?: () => void;
    isVisible: boolean;
}

export function CompletionCelebration({
    courseName,
    xpEarned,
    certificateAvailable = false,
    onContinue,
    isVisible,
}: CompletionCelebrationProps) {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            {/* Confetti particles */}
            {showConfetti && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 rounded-full animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-10px`,
                                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1'][i % 5],
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="bg-card border border-border rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scale-in">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
                        <Trophy className="h-10 w-10 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
                    <p className="text-muted-foreground">
                        You've completed <span className="font-semibold text-foreground">{courseName}</span>
                    </p>
                </div>

                <div className="flex justify-center gap-6 mb-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="text-2xl font-bold">+{xpEarned}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">XP Earned</span>
                    </div>
                    {certificateAvailable && (
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-green-500">
                                <Award className="h-5 w-5" />
                                <span className="text-sm font-semibold">Certificate</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Available</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {certificateAvailable && (
                        <Link href="/certificates">
                            <Button className="w-full gap-2">
                                <Award className="h-4 w-4" />
                                View Certificate
                            </Button>
                        </Link>
                    )}
                    <Button variant="outline" onClick={onContinue} className="w-full">
                        Continue Learning
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Add confetti animation to globals.css
const confettiStyles = `
@keyframes confetti {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}

.animate-confetti {
    animation: confetti 3s ease-out forwards;
}
`;
