"use client";

import { useState } from "react";
import { Button, Badge, Progress } from "@/components/ui";
import {
    ChevronRight,
    ChevronLeft,
    Target,
    Code,
    Briefcase,
    Users,
    Zap,
    CheckCircle,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OnboardingWizardProps {
    userName?: string;
    onComplete?: () => void;
}

const learningGoals = [
    {
        id: "developer",
        title: "Build AI-Powered Apps",
        description: "Learn to integrate AI into your development workflow",
        icon: Code,
    },
    {
        id: "product",
        title: "Lead AI Products",
        description: "Master AI-Native product strategy and roadmaps",
        icon: Briefcase,
    },
    {
        id: "leader",
        title: "Transform My Team",
        description: "Guide your organization through AI transformation",
        icon: Users,
    },
    {
        id: "productivity",
        title: "Boost Productivity",
        description: "Use AI to work smarter, not harder",
        icon: Zap,
    },
];

const experienceLevels = [
    { id: "beginner", label: "New to AI", description: "I'm just getting started" },
    { id: "intermediate", label: "Some Experience", description: "I've used ChatGPT and similar tools" },
    { id: "advanced", label: "AI Practitioner", description: "I work with AI regularly" },
];

const recommendedPaths: Record<string, { title: string; description: string; modules: string[]; href: string }> = {
    "developer-beginner": {
        title: "AI-Native Foundations + Code Generation",
        description: "Start with the basics, then learn production-ready code generation",
        modules: ["AI-Native Foundations", "Prompt Engineering", "Code Generation Mastery"],
        href: "/learn/checkout?plan=professional",
    },
    "developer-intermediate": {
        title: "Context Engineering + Advanced Labs",
        description: "Level up with advanced techniques and hands-on practice",
        modules: ["Context Engineering", "Code Generation", "AI Security"],
        href: "/learn/checkout?plan=professional",
    },
    "developer-advanced": {
        title: "Expert + Live Training",
        description: "Get 1:1 guidance on your specific projects",
        modules: ["All modules", "2-hour live session", "Project review"],
        href: "/learn/checkout?plan=expert",
    },
    "product-beginner": {
        title: "AI-Native Product Strategy",
        description: "Learn to think about products from an AI-first perspective",
        modules: ["AI-Native Foundations", "Product Strategy", "Roadmap Planning"],
        href: "/learn/checkout?plan=professional",
    },
    "product-intermediate": {
        title: "Full Professional Curriculum",
        description: "Master both strategy and technical fundamentals",
        modules: ["All 11 modules", "Labs", "Certification"],
        href: "/learn/checkout?plan=professional",
    },
    "product-advanced": {
        title: "Expert + Live Training",
        description: "Get personalized guidance on your AI product initiatives",
        modules: ["All modules", "2-hour live session", "Strategy review"],
        href: "/learn/checkout?plan=expert",
    },
    "leader-beginner": {
        title: "AI Leadership Essentials",
        description: "Understand AI enough to lead transformation",
        modules: ["AI-Native Foundations", "Transformation Leadership"],
        href: "/learn/checkout?plan=essentials",
    },
    "leader-intermediate": {
        title: "Full Professional Curriculum",
        description: "Deep understanding to drive real change",
        modules: ["All 11 modules", "Enterprise architecture", "Team enablement"],
        href: "/learn/checkout?plan=professional",
    },
    "leader-advanced": {
        title: "Expert + Live Training",
        description: "Executive coaching on your transformation journey",
        modules: ["All modules", "2-hour live session", "Transformation planning"],
        href: "/learn/checkout?plan=expert",
    },
    "productivity-beginner": {
        title: "AI-Native Essentials",
        description: "Quick start to boost your daily productivity",
        modules: ["Modules 1-4", "Foundation certificate"],
        href: "/learn/checkout?plan=essentials",
    },
    "productivity-intermediate": {
        title: "Professional Curriculum",
        description: "Master the full toolkit for maximum impact",
        modules: ["All 11 modules", "Labs", "Certification"],
        href: "/learn/checkout?plan=professional",
    },
    "productivity-advanced": {
        title: "Professional + Advanced Labs",
        description: "Push the boundaries with advanced techniques",
        modules: ["All modules", "15 interactive labs", "Context engineering"],
        href: "/learn/checkout?plan=professional",
    },
};

export function OnboardingWizard({ userName, onComplete }: OnboardingWizardProps) {
    const [step, setStep] = useState(1);
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const progress = (step / 3) * 100;

    const recommendationKey = selectedGoal && selectedLevel ? `${selectedGoal}-${selectedLevel}` : null;
    const recommendation = recommendationKey ? recommendedPaths[recommendationKey] : null;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                    <span>Step {step} of 3</span>
                    <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Step 1: Goal */}
            {step === 1 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Welcome{userName ? `, ${userName}` : ""}!
                        </Badge>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            What's your main goal?
                        </h1>
                        <p className="text-white/60">
                            We'll customize your learning path based on what you want to achieve.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {learningGoals.map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setSelectedGoal(goal.id)}
                                className={cn(
                                    "p-5 rounded-xl border text-left transition-all min-h-[120px]",
                                    selectedGoal === goal.id
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                                )}
                            >
                                <goal.icon className={cn(
                                    "h-6 w-6 mb-3",
                                    selectedGoal === goal.id ? "text-purple-400" : "text-white/50"
                                )} />
                                <h3 className="font-medium text-white mb-1">{goal.title}</h3>
                                <p className="text-sm text-white/50">{goal.description}</p>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={() => setStep(2)}
                            disabled={!selectedGoal}
                            className="gap-2"
                        >
                            Continue <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Experience */}
            {step === 2 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            What's your AI experience level?
                        </h1>
                        <p className="text-white/60">
                            This helps us recommend the right starting point.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {experienceLevels.map((level) => (
                            <button
                                key={level.id}
                                onClick={() => setSelectedLevel(level.id)}
                                className={cn(
                                    "w-full p-5 rounded-xl border text-left transition-all flex items-center gap-4",
                                    selectedLevel === level.id
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                                )}
                            >
                                <div className={cn(
                                    "h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                    selectedLevel === level.id
                                        ? "border-purple-500 bg-purple-500"
                                        : "border-white/30"
                                )}>
                                    {selectedLevel === level.id && (
                                        <CheckCircle className="h-3 w-3 text-white" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">{level.label}</h3>
                                    <p className="text-sm text-white/50">{level.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                            <ChevronLeft className="h-4 w-4" /> Back
                        </Button>
                        <Button
                            onClick={() => setStep(3)}
                            disabled={!selectedLevel}
                            className="gap-2"
                        >
                            See Recommendation <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Recommendation */}
            {step === 3 && recommendation && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                            <Target className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Your Personalized Path
                        </h1>
                        <p className="text-white/60">
                            Based on your goals and experience, we recommend:
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-2">{recommendation.title}</h2>
                        <p className="text-white/60 mb-4">{recommendation.description}</p>

                        <div className="space-y-2 mb-6">
                            {recommendation.modules.map((mod, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                    <span className="text-white/80">{mod}</span>
                                </div>
                            ))}
                        </div>

                        <Link href={recommendation.href}>
                            <Button className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                                <Sparkles className="h-4 w-4" />
                                Start This Path
                            </Button>
                        </Link>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                            <ChevronLeft className="h-4 w-4" /> Back
                        </Button>
                        <Link href="/preview">
                            <Button variant="ghost" className="text-white/60">
                                Or try free demo first
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
