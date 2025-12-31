"use client";

import { useEffect, useState } from "react";
import { Trophy, Star, Sparkles, Award, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";

interface CompletionCelebrationProps {
    courseName: string;
    trackName?: string;
    moduleId?: string;
    xpEarned: number;
    certificateAvailable?: boolean;
    isTrackComplete?: boolean;
    modulesCompleted?: number;
    totalHours?: number;
    skills?: string[];
    onContinue?: () => void;
    isVisible: boolean;
}

export function CompletionCelebration({
    courseName,
    trackName,
    moduleId,
    xpEarned,
    certificateAvailable = false,
    isTrackComplete = false,
    modulesCompleted = 1,
    totalHours = 8,
    skills = [],
    onContinue,
    isVisible,
}: CompletionCelebrationProps) {
    const [showConfetti, setShowConfetti] = useState(false);
    const [certificateId, setCertificateId] = useState<string | null>(null);
    const [isGeneratingCert, setIsGeneratingCert] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (isVisible) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    // Generate certificate when track is complete
    useEffect(() => {
        if (isVisible && isTrackComplete && user && moduleId && !certificateId) {
            generateCertificate();
        }
    }, [isVisible, isTrackComplete, user, moduleId]);

    const generateCertificate = async () => {
        if (!user || !moduleId) return;

        setIsGeneratingCert(true);
        try {
            const response = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    moduleId,
                    trackName: trackName || courseName,
                    certificationTitle: `ScaledNative Certified - ${courseName}`,
                    score: 100, // Would come from actual assessment
                    skills: skills.length > 0 ? skills : [
                        "AI-Native Thinking",
                        "Prompt Engineering",
                        "AI Tool Proficiency"
                    ],
                }),
            });

            const data = await response.json();
            if (data.success && data.certificate) {
                setCertificateId(data.certificate.certificateId);
            }
        } catch (error) {
            console.error("Failed to generate certificate:", error);
        }
        setIsGeneratingCert(false);
    };

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
                    <div className={cn(
                        "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
                        isTrackComplete
                            ? "bg-gradient-to-br from-amber-500/30 to-amber-600/20 border-2 border-amber-500/50"
                            : "bg-yellow-500/20"
                    )}>
                        {isTrackComplete ? (
                            <Award className="h-10 w-10 text-amber-400" />
                        ) : (
                            <Trophy className="h-10 w-10 text-yellow-500" />
                        )}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                        {isTrackComplete ? "🎓 Certification Earned!" : "Congratulations! 🎉"}
                    </h2>
                    <p className="text-muted-foreground">
                        You've completed <span className="font-semibold text-foreground">{courseName}</span>
                    </p>
                    {isTrackComplete && trackName && (
                        <p className="text-amber-400 font-medium mt-2">
                            {trackName}
                        </p>
                    )}
                </div>

                <div className="flex justify-center gap-6 mb-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="text-2xl font-bold">+{xpEarned}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">XP Earned</span>
                    </div>
                    {isTrackComplete && (
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-emerald-500">
                                <span className="text-2xl font-bold">{modulesCompleted}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Modules</span>
                        </div>
                    )}
                    {(certificateAvailable || isTrackComplete) && (
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-amber-500">
                                <Award className="h-5 w-5" />
                                <span className="text-sm font-semibold">
                                    {isGeneratingCert ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Ready"
                                    )}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">Certificate</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {(certificateAvailable || isTrackComplete) && (
                        certificateId ? (
                            <Link href={`/certificate/${certificateId}`}>
                                <Button className="w-full gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black">
                                    <Award className="h-4 w-4" />
                                    View & Download Certificate
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                className="w-full gap-2"
                                disabled={isGeneratingCert}
                                onClick={generateCertificate}
                            >
                                {isGeneratingCert ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Generating Certificate...
                                    </>
                                ) : (
                                    <>
                                        <Award className="h-4 w-4" />
                                        Generate Certificate
                                    </>
                                )}
                            </Button>
                        )
                    )}
                    <Button variant="outline" onClick={onContinue} className="w-full">
                        Continue Learning
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Add confetti animation - add to globals.css if not already present
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
