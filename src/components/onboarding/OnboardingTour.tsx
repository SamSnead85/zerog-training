"use client";

import { useState, useEffect } from "react";
import { Card, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    Building2,
    Users,
    BarChart3,
    BookOpen,
    ChevronRight,
    ChevronLeft,
    X,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
    id: string;
    title: string;
    description: string;
    target?: string;
    icon: React.ElementType;
}

const tourSteps: TourStep[] = [
    {
        id: "welcome",
        title: "Welcome to ZeroG!",
        description: "Let's take a quick tour of your new AI-powered training platform. We'll show you how to create training, manage your team, and track progress.",
        icon: Sparkles,
    },
    {
        id: "create",
        title: "Create Training with AI",
        description: "Use our AI generator to create custom training in minutes. Just describe what you need, upload relevant documents, and we'll generate a complete curriculum.",
        target: "/create",
        icon: Sparkles,
    },
    {
        id: "org",
        title: "Organization Dashboard",
        description: "Get a bird's-eye view of your organization's training progress. See completion rates, upcoming deadlines, and top performers.",
        target: "/org",
        icon: Building2,
    },
    {
        id: "assign",
        title: "Assign Training",
        description: "Easily assign training to individuals, departments, or your entire organization. Set deadlines and configure automatic reminders.",
        target: "/assign",
        icon: Users,
    },
    {
        id: "progress",
        title: "Track Progress",
        description: "Monitor your team's learning progress in real-time. Identify learners who need support and celebrate top achievers.",
        target: "/progress",
        icon: BarChart3,
    },
    {
        id: "library",
        title: "Content Library",
        description: "Browse our library of pre-built courses across multiple categories, or create your own custom content.",
        target: "/library",
        icon: BookOpen,
    },
];

export function OnboardingTour() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Check if user has completed onboarding
        const completed = localStorage.getItem("zerog_onboarding_complete");
        if (!completed) {
            setIsOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeOnboarding();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const completeOnboarding = () => {
        localStorage.setItem("zerog_onboarding_complete", "true");
        setIsOpen(false);
    };

    const skipOnboarding = () => {
        completeOnboarding();
    };

    if (!isOpen) return null;

    const step = tourSteps[currentStep];
    const Icon = step.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <Card className="w-full max-w-lg mx-4 p-6 bg-background border-primary/20">
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {tourSteps.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    i === currentStep ? "w-6 bg-primary" : i < currentStep ? "bg-primary" : "bg-muted"
                                )}
                            />
                        ))}
                    </div>
                    <button
                        onClick={skipOnboarding}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Skip tour
                    </button>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                    <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="gap-1"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        {currentStep + 1} of {tourSteps.length}
                    </span>
                    <Button onClick={handleNext} className="gap-1">
                        {currentStep === tourSteps.length - 1 ? (
                            <>
                                Get Started
                                <Check className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// Reset onboarding for demo purposes
export function resetOnboarding() {
    localStorage.removeItem("zerog_onboarding_complete");
}
