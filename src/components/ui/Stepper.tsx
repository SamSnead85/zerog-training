"use client";

/**
 * Stepper Component
 * 
 * Multi-step process indicator with progress tracking,
 * navigation, and customizable step content.
 */

import { useState, createContext, useContext, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Check, ChevronLeft, ChevronRight, Circle } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface Step {
    id: string;
    label: string;
    description?: string;
    optional?: boolean;
    icon?: React.ElementType;
}

interface StepperContextValue {
    steps: Step[];
    currentStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    goToStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    isCompleted: (stepIndex: number) => boolean;
}

const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepper() {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error("useStepper must be used within a Stepper");
    }
    return context;
}

// =============================================================================
// STEPPER PROVIDER
// =============================================================================

interface StepperProps {
    steps: Step[];
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onComplete?: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Stepper({
    steps,
    initialStep = 0,
    onStepChange,
    onComplete,
    children,
    className,
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    const goToStep = useCallback((step: number) => {
        if (step >= 0 && step < steps.length) {
            setCurrentStep(step);
            onStepChange?.(step);
        }
    }, [steps.length, onStepChange]);

    const nextStep = useCallback(() => {
        setCompletedSteps((prev) => new Set([...prev, currentStep]));
        if (isLastStep) {
            onComplete?.();
        } else {
            goToStep(currentStep + 1);
        }
    }, [currentStep, isLastStep, goToStep, onComplete]);

    const prevStep = useCallback(() => {
        if (!isFirstStep) {
            goToStep(currentStep - 1);
        }
    }, [currentStep, isFirstStep, goToStep]);

    const isCompleted = useCallback((stepIndex: number) => {
        return completedSteps.has(stepIndex);
    }, [completedSteps]);

    return (
        <StepperContext.Provider
            value={{
                steps,
                currentStep,
                isFirstStep,
                isLastStep,
                goToStep,
                nextStep,
                prevStep,
                isCompleted,
            }}
        >
            <div className={className}>{children}</div>
        </StepperContext.Provider>
    );
}

// =============================================================================
// STEPPER HEADER
// =============================================================================

interface StepperHeaderProps {
    className?: string;
    showLabels?: boolean;
    allowNavigation?: boolean;
}

export function StepperHeader({ className, showLabels = true, allowNavigation = false }: StepperHeaderProps) {
    const { steps, currentStep, isCompleted, goToStep } = useStepper();

    return (
        <div className={cn("relative", className)}>
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                        width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const completed = isCompleted(index);
                    const active = index === currentStep;
                    const future = index > currentStep && !completed;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "flex flex-col items-center",
                                allowNavigation && !future && "cursor-pointer"
                            )}
                            onClick={() => allowNavigation && !future && goToStep(index)}
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                    "bg-background",
                                    completed
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : active
                                            ? "border-primary text-primary"
                                            : "border-muted text-muted-foreground"
                                )}
                            >
                                {completed ? (
                                    <Check className="h-5 w-5" />
                                ) : Icon ? (
                                    <Icon className="h-5 w-5" />
                                ) : (
                                    <span className="text-sm font-medium">{index + 1}</span>
                                )}
                            </div>

                            {showLabels && (
                                <div className="mt-2 text-center">
                                    <p
                                        className={cn(
                                            "text-sm font-medium",
                                            active ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {step.label}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-muted-foreground mt-0.5 max-w-[120px]">
                                            {step.description}
                                        </p>
                                    )}
                                    {step.optional && (
                                        <p className="text-xs text-muted-foreground">(Optional)</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// =============================================================================
// STEPPER CONTENT
// =============================================================================

interface StepperContentProps {
    children: React.ReactNode;
    className?: string;
}

export function StepperContent({ children, className }: StepperContentProps) {
    return <div className={cn("py-6", className)}>{children}</div>;
}

// =============================================================================
// STEP PANEL
// =============================================================================

interface StepPanelProps {
    stepId: string;
    children: React.ReactNode;
    className?: string;
}

export function StepPanel({ stepId, children, className }: StepPanelProps) {
    const { steps, currentStep } = useStepper();
    const stepIndex = steps.findIndex((s) => s.id === stepId);

    if (stepIndex !== currentStep) return null;

    return (
        <div className={cn("animate-in fade-in slide-in-from-right-2 duration-300", className)}>
            {children}
        </div>
    );
}

// =============================================================================
// STEPPER NAVIGATION
// =============================================================================

interface StepperNavigationProps {
    onNext?: () => boolean | Promise<boolean>; // Return false to prevent navigation
    onPrev?: () => void;
    nextLabel?: string;
    prevLabel?: string;
    completeLabel?: string;
    showSkip?: boolean;
    className?: string;
}

export function StepperNavigation({
    onNext,
    onPrev,
    nextLabel = "Continue",
    prevLabel = "Back",
    completeLabel = "Complete",
    showSkip = false,
    className,
}: StepperNavigationProps) {
    const { isFirstStep, isLastStep, nextStep, prevStep, steps, currentStep } = useStepper();
    const [loading, setLoading] = useState(false);
    const currentStepData = steps[currentStep];

    const handleNext = async () => {
        if (onNext) {
            setLoading(true);
            try {
                const canProceed = await onNext();
                if (canProceed !== false) {
                    nextStep();
                }
            } finally {
                setLoading(false);
            }
        } else {
            nextStep();
        }
    };

    const handlePrev = () => {
        onPrev?.();
        prevStep();
    };

    return (
        <div className={cn("flex items-center justify-between gap-4", className)}>
            <Button
                variant="outline"
                onClick={handlePrev}
                disabled={isFirstStep || loading}
                className={isFirstStep ? "invisible" : ""}
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {prevLabel}
            </Button>

            <div className="flex gap-2">
                {showSkip && currentStepData?.optional && !isLastStep && (
                    <Button variant="ghost" onClick={nextStep} disabled={loading}>
                        Skip
                    </Button>
                )}
                <Button onClick={handleNext} disabled={loading}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        <>
                            {isLastStep ? completeLabel : nextLabel}
                            {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default {
    Stepper,
    StepperHeader,
    StepperContent,
    StepPanel,
    StepperNavigation,
    useStepper,
};
