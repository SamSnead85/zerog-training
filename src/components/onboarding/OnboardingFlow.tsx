"use client";

import { useState } from "react";
import { Button, Progress } from "@/components/ui";
import {
    Sparkles,
    Target,
    BookOpen,
    Trophy,
    ArrowRight,
    Check,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

const steps: OnboardingStep[] = [
    {
        id: "welcome",
        title: "Welcome to ZeroG",
        description: "Your AI-powered learning platform for professional development",
        icon: Sparkles,
    },
    {
        id: "goals",
        title: "Set Your Goals",
        description: "Tell us what you want to achieve",
        icon: Target,
    },
    {
        id: "interests",
        title: "Choose Your Interests",
        description: "Select topics you'd like to explore",
        icon: BookOpen,
    },
    {
        id: "complete",
        title: "You're All Set!",
        description: "Start your learning journey",
        icon: Trophy,
    },
];

const goals = [
    { id: "leadership", label: "Develop leadership skills", icon: "👔" },
    { id: "technical", label: "Learn technical skills", icon: "💻" },
    { id: "certification", label: "Get certified", icon: "📜" },
    { id: "compliance", label: "Complete compliance training", icon: "✅" },
    { id: "career", label: "Advance my career", icon: "🚀" },
    { id: "team", label: "Improve team performance", icon: "👥" },
];

const interests = [
    { id: "agile", label: "Agile & Scrum" },
    { id: "leadership", label: "Leadership" },
    { id: "security", label: "Cybersecurity" },
    { id: "compliance", label: "Compliance" },
    { id: "data", label: "Data & Analytics" },
    { id: "communication", label: "Communication" },
    { id: "management", label: "Project Management" },
    { id: "ai", label: "AI & Technology" },
];

interface OnboardingFlowProps {
    onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [weeklyTime, setWeeklyTime] = useState<string>("3-5");

    const progress = ((currentStep + 1) / steps.length) * 100;
    const step = steps[currentStep];
    const Icon = step.icon;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleGoal = (id: string) => {
        setSelectedGoals(
            selectedGoals.includes(id)
                ? selectedGoals.filter((g) => g !== id)
                : [...selectedGoals, id]
        );
    };

    const toggleInterest = (id: string) => {
        setSelectedInterests(
            selectedInterests.includes(id)
                ? selectedInterests.filter((i) => i !== id)
                : [...selectedInterests, id]
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/5">
            <div className="w-full max-w-2xl">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Step Content */}
                <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                            <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">{step.title}</h1>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>

                    {/* Step-specific Content */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {[
                                    { label: "AI-Powered", icon: Sparkles },
                                    { label: "Interactive", icon: BookOpen },
                                    { label: "Gamified", icon: Trophy },
                                ].map((feature, i) => {
                                    const FeatureIcon = feature.icon;
                                    return (
                                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                                            <FeatureIcon className="h-6 w-6 text-primary mx-auto mb-2" />
                                            <p className="text-sm font-medium">{feature.label}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-3">
                                {goals.map((goal) => (
                                    <button
                                        key={goal.id}
                                        onClick={() => toggleGoal(goal.id)}
                                        className={cn(
                                            "p-4 rounded-xl border text-left transition-all",
                                            selectedGoals.includes(goal.id)
                                                ? "bg-primary/10 border-primary/30"
                                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <span className="text-xl mr-2">{goal.icon}</span>
                                        <span className="text-sm font-medium">{goal.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-3">How much time can you dedicate per week?</p>
                                <div className="flex gap-2">
                                    {["1-2", "3-5", "5-10", "10+"].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setWeeklyTime(time)}
                                            className={cn(
                                                "flex-1 py-2 rounded-lg text-sm transition-all",
                                                weeklyTime === time
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted hover:bg-muted/80"
                                            )}
                                        >
                                            {time} hrs
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => (
                                <button
                                    key={interest.id}
                                    onClick={() => toggleInterest(interest.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm transition-all",
                                        selectedInterests.includes(interest.id)
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    {selectedInterests.includes(interest.id) && (
                                        <Check className="h-4 w-4 inline mr-1" />
                                    )}
                                    {interest.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-emerald-500/10 mx-auto flex items-center justify-center">
                                <Check className="h-12 w-12 text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg">
                                    Based on your preferences, we've personalized your learning path.
                                </p>
                                <p className="text-muted-foreground">
                                    You'll receive AI-powered recommendations tailored to your goals.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                        {currentStep > 0 ? (
                            <Button variant="ghost" onClick={handleBack}>
                                Back
                            </Button>
                        ) : (
                            <div />
                        )}
                        <Button onClick={handleNext} className="gap-2">
                            {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Skip Link */}
                {currentStep < steps.length - 1 && (
                    <p className="text-center mt-4">
                        <button
                            onClick={onComplete}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Skip onboarding
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}
