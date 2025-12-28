"use client";

import { useState } from "react";
import {
    VisualSlide,
    FeatureCardVisual,
    StatVisual,
    StepVisual,
    ComparisonVisual,
    TrainingIcons
} from "./VisualComponents";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

/**
 * Premium Training Lesson Viewer
 * Displays training content with modern presentation-style visuals
 */

interface LessonSlide {
    id: string;
    type: "hero" | "content" | "comparison" | "quiz" | "interactive" | "stats";
    variant?: "cybersecurity" | "data-protection" | "phishing" | "password" | "network" | "compliance" | "leadership" | "ai-tools" | "hipaa";
    title: string;
    subtitle?: string;
    content?: string;
    points?: string[];
    comparison?: {
        bad: { title: string; points: string[] };
        good: { title: string; points: string[] };
    };
    stats?: Array<{ value: string; label: string; trend?: { value: number; positive: boolean } }>;
    steps?: Array<{ title: string; description: string; status?: "completed" | "active" | "upcoming" }>;
}

interface PremiumLessonViewerProps {
    lessonTitle: string;
    slides: LessonSlide[];
    onComplete?: () => void;
}

export function PremiumLessonViewer({ lessonTitle, slides, onComplete }: PremiumLessonViewerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const slide = slides[currentSlide];
    const progress = ((currentSlide + 1) / slides.length) * 100;

    const goNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onComplete?.();
        }
    };

    const goPrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-white">
            {/* Progress bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div>
                        <h1 className="font-semibold text-lg">{lessonTitle}</h1>
                        <p className="text-sm text-slate-400">Slide {currentSlide + 1} of {slides.length}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="gap-2"
                        >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            {isPlaying ? "Pause" : "Auto-play"}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main content area */}
            <main className="pt-24 pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Hero slide type */}
                    {slide.type === "hero" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <VisualSlide
                                variant={slide.variant || "cybersecurity"}
                                title={slide.title}
                                subtitle={slide.subtitle}
                                size="hero"
                                className="mb-8"
                            />
                            {slide.content && (
                                <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                                    {slide.content}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Content slide type */}
                    {slide.type === "content" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <VisualSlide
                                variant={slide.variant || "custom"}
                                title={slide.title}
                                subtitle={slide.subtitle}
                                size="md"
                                className="mb-8"
                            />
                            {slide.content && (
                                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                    {slide.content}
                                </p>
                            )}
                            {slide.points && (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {slide.points.map((point, i) => (
                                        <FeatureCardVisual
                                            key={i}
                                            icon={<TrainingIcons.CheckCircle2 className="h-6 w-6" />}
                                            title={`Key Point ${i + 1}`}
                                            description={point}
                                            accentColor="primary"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Comparison slide type */}
                    {slide.type === "comparison" && slide.comparison && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                            {slide.subtitle && (
                                <p className="text-slate-400 mb-8">{slide.subtitle}</p>
                            )}
                            <ComparisonVisual
                                bad={slide.comparison.bad}
                                good={slide.comparison.good}
                            />
                        </div>
                    )}

                    {/* Stats slide type */}
                    {slide.type === "stats" && slide.stats && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                            {slide.subtitle && (
                                <p className="text-slate-400 mb-8">{slide.subtitle}</p>
                            )}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {slide.stats.map((stat, i) => (
                                    <StatVisual
                                        key={i}
                                        value={stat.value}
                                        label={stat.label}
                                        trend={stat.trend}
                                        icon={<TrainingIcons.TrendingUp className="h-5 w-5" />}
                                        accentColor={i % 2 === 0 ? "primary" : "purple"}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interactive/Steps slide type */}
                    {slide.type === "interactive" && slide.steps && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                            {slide.subtitle && (
                                <p className="text-slate-400 mb-8">{slide.subtitle}</p>
                            )}
                            <StepVisual steps={slide.steps} />
                        </div>
                    )}
                </div>
            </main>

            {/* Navigation footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 z-40">
                <div className="flex items-center justify-between max-w-5xl mx-auto">
                    <Button
                        variant="outline"
                        onClick={goPrev}
                        disabled={currentSlide === 0}
                        className="gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    {/* Slide indicators */}
                    <div className="hidden sm:flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentSlide
                                        ? "bg-primary w-6"
                                        : i < currentSlide
                                            ? "bg-primary/50"
                                            : "bg-slate-600"
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        onClick={goNext}
                        className="gap-2"
                    >
                        {currentSlide === slides.length - 1 ? "Complete" : "Next"}
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </footer>
        </div>
    );
}

// Example lesson data
export const exampleCybersecurityLesson: LessonSlide[] = [
    {
        id: "1",
        type: "hero",
        variant: "cybersecurity",
        title: "Cybersecurity Fundamentals",
        subtitle: "Module 1: Introduction",
        content: "In today's digital landscape, cybersecurity is everyone's responsibility. This module will equip you with the essential knowledge to protect yourself and your organization from cyber threats."
    },
    {
        id: "2",
        type: "stats",
        variant: "phishing",
        title: "The Threat Landscape",
        subtitle: "Understanding the scale of cyber threats",
        stats: [
            { value: "91%", label: "of cyberattacks start with phishing", trend: { value: 15, positive: false } },
            { value: "$4.45M", label: "average cost of a data breach", trend: { value: 3, positive: false } },
            { value: "277 days", label: "average time to identify a breach", trend: { value: 8, positive: true } },
        ]
    },
    {
        id: "3",
        type: "comparison",
        variant: "password",
        title: "Password Security",
        subtitle: "Know the difference between weak and strong practices",
        comparison: {
            bad: {
                title: "Weak Practices",
                points: [
                    "Using 'password123' or your birthday",
                    "Same password across all accounts",
                    "Writing passwords on sticky notes",
                    "Sharing passwords via email"
                ]
            },
            good: {
                title: "Strong Practices",
                points: [
                    "Complex passwords with 12+ characters",
                    "Unique password for each account",
                    "Using a password manager",
                    "Enabling multi-factor authentication"
                ]
            }
        }
    },
    {
        id: "4",
        type: "interactive",
        variant: "phishing",
        title: "Identifying Phishing Attacks",
        subtitle: "Follow these steps to verify suspicious emails",
        steps: [
            { title: "Check the sender", description: "Verify the email address matches the claimed organization", status: "completed" },
            { title: "Hover over links", description: "Don't click - hover to see the actual destination URL", status: "active" },
            { title: "Look for urgency tactics", description: "Attackers create false urgency to bypass critical thinking", status: "upcoming" },
            { title: "When in doubt, verify", description: "Contact the organization directly through official channels", status: "upcoming" },
        ]
    },
    {
        id: "5",
        type: "content",
        variant: "data-protection",
        title: "Key Takeaways",
        subtitle: "What you've learned",
        points: [
            "Cybersecurity is a shared responsibility across all team members",
            "Strong, unique passwords and MFA are your first line of defense",
            "Always verify suspicious emails before clicking links",
            "Report potential threats immediately to your IT team"
        ]
    }
];
