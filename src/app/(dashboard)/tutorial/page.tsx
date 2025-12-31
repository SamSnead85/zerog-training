"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    ChevronRight,
    ChevronLeft,
    X,
    BookOpen,
    GraduationCap,
    BarChart3,
    Award,
    Settings,
    Play,
    CheckCircle2,
    ArrowRight,
    Home,
    Layout,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TutorialStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    highlight?: string;
    action?: { label: string; href: string };
}

const TUTORIAL_STEPS: TutorialStep[] = [
    {
        id: "welcome",
        title: "Welcome to ScaledNative",
        description: "Your enterprise AI training platform. This quick tutorial will show you how to navigate and get the most out of your training experience.",
        icon: Home,
    },
    {
        id: "dashboard",
        title: "Your Dashboard",
        description: "The Dashboard is your home base. See your assigned training, track progress, and pick up where you left off. Your completion stats update in real-time.",
        icon: Layout,
        highlight: "dashboard-card",
        action: { label: "Go to Dashboard", href: "/dashboard" },
    },
    {
        id: "training",
        title: "Training Modules",
        description: "Click on any module to start learning. Each module contains interactive lessons with videos, quizzes, and hands-on labs. Progress saves automatically.",
        icon: BookOpen,
        highlight: "training-modules",
        action: { label: "Browse Training", href: "/training" },
    },
    {
        id: "tracks",
        title: "Certification Tracks",
        description: "Complete certification tracks to earn credentials. Tracks bundle related modules into a comprehensive learning path. Perfect for career development!",
        icon: GraduationCap,
        highlight: "certification-tracks",
        action: { label: "View Tracks", href: "/tracks" },
    },
    {
        id: "progress",
        title: "Track Your Progress",
        description: "Monitor your learning journey. See which modules you've completed, time spent, and upcoming deadlines. Stay on top of required training.",
        icon: BarChart3,
        highlight: "progress-section",
        action: { label: "View Progress", href: "/progress" },
    },
    {
        id: "certificates",
        title: "Earn Certificates",
        description: "Complete tracks to earn verifiable digital certificates. Share them on LinkedIn, download PDFs, or add to your professional portfolio.",
        icon: Award,
        highlight: "certificates-section",
        action: { label: "View Certificates", href: "/certificates" },
    },
    {
        id: "profile",
        title: "Your Profile & Settings",
        description: "Customize your experience in Settings. Update your profile, notification preferences, and manage your account.",
        icon: Settings,
        highlight: "settings-menu",
        action: { label: "Open Settings", href: "/settings" },
    },
    {
        id: "done",
        title: "You're All Set!",
        description: "That's the basics! Start your first training module or explore the platform. The AI Assistant (bottom right) is always available to help.",
        icon: CheckCircle2,
        action: { label: "Start Learning", href: "/dashboard" },
    },
];

export default function TutorialPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [animating, setAnimating] = useState(false);

    const step = TUTORIAL_STEPS[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === TUTORIAL_STEPS.length - 1;
    const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

    const nextStep = () => {
        if (!isLast) {
            setAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
                setAnimating(false);
            }, 150);
        }
    };

    const prevStep = () => {
        if (!isFirst) {
            setAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev - 1);
                setAnimating(false);
            }, 150);
        }
    };

    const skipTutorial = () => {
        setDismissed(true);
        localStorage.setItem("scalednative_tutorial_completed", "true");
        router.push("/dashboard");
    };

    const completeTutorial = () => {
        localStorage.setItem("scalednative_tutorial_completed", "true");
        router.push("/dashboard");
    };

    // Check if already completed
    useEffect(() => {
        const completed = localStorage.getItem("scalednative_tutorial_completed");
        if (completed === "true") {
            setDismissed(true);
        }
    }, []);

    if (dismissed) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="p-8 bg-white/[0.02] border-white/10 max-w-md text-center">
                    <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Tutorial Complete</h2>
                    <p className="text-muted-foreground mb-6">
                        You've already completed the tutorial. Ready to continue learning?
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => setDismissed(false)}
                            className="border-white/10"
                        >
                            View Again
                        </Button>
                        <Link href="/dashboard">
                            <Button className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700">
                                Go to Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-slate-950 to-black">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Skip Button */}
                <button
                    onClick={skipTutorial}
                    className="absolute -top-12 right-0 flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                >
                    <X className="h-4 w-4" />
                    Skip Tutorial
                </button>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>Step {currentStep + 1} of {TUTORIAL_STEPS.length}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                </div>

                {/* Tutorial Card */}
                <Card className="p-8 bg-white/[0.03] border-white/10 backdrop-blur-xl">
                    <div
                        className={cn(
                            "transition-all duration-150",
                            animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                        )}
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mb-6 mx-auto">
                            <step.icon className="h-8 w-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-white mb-3">{step.title}</h1>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
                                {step.description}
                            </p>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex justify-center gap-2 mb-8">
                            {TUTORIAL_STEPS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentStep(i)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        i === currentStep
                                            ? "w-8 bg-slate-500"
                                            : i < currentStep
                                                ? "bg-emerald-500/50"
                                                : "bg-white/20"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={isFirst}
                            className={cn("gap-2", isFirst && "opacity-0")}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </Button>

                        <div className="flex items-center gap-3">
                            {step.action && !isLast && (
                                <Link href={step.action.href}>
                                    <Button variant="outline" className="gap-2 border-white/10">
                                        {step.action.label}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}

                            {isLast ? (
                                <Button
                                    onClick={completeTutorial}
                                    className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
                                >
                                    <Play className="h-4 w-4" />
                                    Start Learning
                                </Button>
                            ) : (
                                <Button
                                    onClick={nextStep}
                                    className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Quick Access Links */}
                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                    <span className="text-muted-foreground">Quick links:</span>
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/training" className="text-slate-400 hover:text-white transition-colors">
                        Training
                    </Link>
                    <Link href="/help" className="text-slate-400 hover:text-white transition-colors">
                        Help Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
