"use client";

/**
 * Enhanced Onboarding Flow
 * 
 * Multi-step onboarding wizard for individuals, teams, and enterprises
 * with role selection, profile completion, and goal setting.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Progress, Input, Badge } from "@/components/ui";
import {
    User,
    Building2,
    Users,
    Rocket,
    Target,
    GraduationCap,
    Shield,
    BrainCircuit,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Sparkles,
    Briefcase,
    Code,
    HeadphonesIcon,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

interface OnboardingData {
    userType: "individual" | "team" | "enterprise" | null;
    role: string | null;
    goals: string[];
    interests: string[];
    experienceLevel: "beginner" | "intermediate" | "advanced" | null;
    teamSize?: string;
    companyName?: string;
    firstName?: string;
    lastName?: string;
}

interface OnboardingFlowProps {
    onComplete: (data: OnboardingData) => void;
    initialData?: Partial<OnboardingData>;
}

// =============================================================================
// STEP COMPONENTS
// =============================================================================

const userTypes = [
    {
        id: "individual",
        title: "Individual Learner",
        description: "I'm learning for myself or career growth",
        icon: User,
        color: "from-blue-500/20 to-blue-600/20",
    },
    {
        id: "team",
        title: "Team Manager",
        description: "I'm training a team (2-50 people)",
        icon: Users,
        color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
        id: "enterprise",
        title: "Enterprise",
        description: "Large organization (50+ employees)",
        icon: Building2,
        color: "from-purple-500/20 to-purple-600/20",
    },
];

const roles = [
    { id: "developer", label: "Developer / Engineer", icon: Code },
    { id: "manager", label: "Manager / Lead", icon: Briefcase },
    { id: "executive", label: "Executive / C-Level", icon: Building2 },
    { id: "hr", label: "HR / L&D Professional", icon: Users },
    { id: "support", label: "Customer Support", icon: HeadphonesIcon },
    { id: "other", label: "Other", icon: User },
];

const goals = [
    { id: "compliance", label: "Meet Compliance Requirements", icon: Shield },
    { id: "upskill", label: "Upskill My Team", icon: GraduationCap },
    { id: "ai-readiness", label: "AI Readiness & Adoption", icon: BrainCircuit },
    { id: "productivity", label: "Boost Productivity", icon: Rocket },
    { id: "onboarding", label: "Streamline Onboarding", icon: Users },
    { id: "certification", label: "Earn Certifications", icon: Target },
];

const interests = [
    "AI & Machine Learning",
    "Cybersecurity",
    "Leadership",
    "Project Management",
    "Data Privacy & Compliance",
    "DevOps",
    "Cloud Computing",
    "Agile & Scrum",
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function OnboardingFlow({ onComplete, initialData }: OnboardingFlowProps) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<OnboardingData>({
        userType: initialData?.userType || null,
        role: initialData?.role || null,
        goals: initialData?.goals || [],
        interests: initialData?.interests || [],
        experienceLevel: initialData?.experienceLevel || null,
        teamSize: initialData?.teamSize,
        companyName: initialData?.companyName,
        firstName: initialData?.firstName,
        lastName: initialData?.lastName,
    });

    const totalSteps = 5;
    const progress = ((step + 1) / totalSteps) * 100;

    const canProceed = () => {
        switch (step) {
            case 0:
                return data.userType !== null;
            case 1:
                return data.role !== null;
            case 2:
                return data.goals.length > 0;
            case 3:
                return data.interests.length > 0;
            case 4:
                return data.experienceLevel !== null;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            onComplete(data);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const toggleGoal = (goalId: string) => {
        setData((prev) => ({
            ...prev,
            goals: prev.goals.includes(goalId)
                ? prev.goals.filter((g) => g !== goalId)
                : [...prev.goals, goalId],
        }));
    };

    const toggleInterest = (interest: string) => {
        setData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
            <div className="w-full max-w-2xl">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>Step {step + 1} of {totalSteps}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
                    {/* Step 0: User Type */}
                    {step === 0 && (
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Welcome to ScaledNative! 👋</h1>
                            <p className="text-muted-foreground mb-8">
                                How will you be using ScaledNative?
                            </p>
                            <div className="grid gap-4">
                                {userTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = data.userType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() =>
                                                setData({ ...data, userType: type.id as OnboardingData["userType"] })
                                            }
                                            className={cn(
                                                "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                                                isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                                                    type.color
                                                )}
                                            >
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{type.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {type.description}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 1: Role */}
                    {step === 1 && (
                        <div>
                            <h1 className="text-2xl font-bold mb-2">What's your role?</h1>
                            <p className="text-muted-foreground mb-8">
                                This helps us personalize your experience
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    const isSelected = data.role === role.id;
                                    return (
                                        <button
                                            key={role.id}
                                            onClick={() => setData({ ...data, role: role.id })}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                                                isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                            )}
                                        >
                                            <Icon className="h-5 w-5 text-muted-foreground" />
                                            <span className="text-sm font-medium">{role.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Goals */}
                    {step === 2 && (
                        <div>
                            <h1 className="text-2xl font-bold mb-2">What are your goals?</h1>
                            <p className="text-muted-foreground mb-8">
                                Select all that apply
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {goals.map((goal) => {
                                    const Icon = goal.icon;
                                    const isSelected = data.goals.includes(goal.id);
                                    return (
                                        <button
                                            key={goal.id}
                                            onClick={() => toggleGoal(goal.id)}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                                                isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                            )}
                                        >
                                            <Icon className="h-5 w-5 text-muted-foreground" />
                                            <span className="text-sm font-medium">{goal.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Interests */}
                    {step === 3 && (
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Topics you're interested in</h1>
                            <p className="text-muted-foreground mb-8">
                                We'll recommend courses based on your selections
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest) => {
                                    const isSelected = data.interests.includes(interest);
                                    return (
                                        <button
                                            key={interest}
                                            onClick={() => toggleInterest(interest)}
                                            className={cn(
                                                "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                                isSelected
                                                    ? "border-primary bg-primary/20 text-primary"
                                                    : "border-white/20 hover:border-white/40 hover:bg-white/5"
                                            )}
                                        >
                                            {interest}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Experience Level */}
                    {step === 4 && (
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Your experience level</h1>
                            <p className="text-muted-foreground mb-8">
                                This helps us suggest the right starting point
                            </p>
                            <div className="grid gap-3">
                                {[
                                    { id: "beginner", label: "Beginner", desc: "New to most of these topics" },
                                    { id: "intermediate", label: "Intermediate", desc: "Some experience with these topics" },
                                    { id: "advanced", label: "Advanced", desc: "Experienced professional" },
                                ].map((level) => {
                                    const isSelected = data.experienceLevel === level.id;
                                    return (
                                        <button
                                            key={level.id}
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    experienceLevel: level.id as OnboardingData["experienceLevel"],
                                                })
                                            }
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                                                isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                            )}
                                        >
                                            <div>
                                                <p className="font-medium">{level.label}</p>
                                                <p className="text-sm text-muted-foreground">{level.desc}</p>
                                            </div>
                                            {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={step === 0}
                            className={step === 0 ? "invisible" : ""}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <Button onClick={handleNext} disabled={!canProceed()}>
                            {step === totalSteps - 1 ? (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Get Started
                                </>
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingFlow;
