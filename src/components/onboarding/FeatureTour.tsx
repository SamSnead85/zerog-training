"use client";

/**
 * Feature Tour Component
 * 
 * Interactive product tour for new users.
 */

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
    X,
    ChevronRight,
    ChevronLeft,
    Sparkles,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface TourStep {
    id: string;
    target: string; // CSS selector
    title: string;
    content: string;
    placement?: "top" | "bottom" | "left" | "right";
    spotlight?: boolean;
}

interface FeatureTourProps {
    steps: TourStep[];
    onComplete: () => void;
    onSkip: () => void;
    isActive: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FeatureTour({ steps, onComplete, onSkip, isActive }: FeatureTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

    const step = steps[currentStep];

    const updatePosition = useCallback(() => {
        if (!step) return;

        const element = document.querySelector(step.target);
        if (element) {
            const rect = element.getBoundingClientRect();
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height,
            });
        }
    }, [step]);

    useEffect(() => {
        if (!isActive) return;

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition);
        };
    }, [isActive, updatePosition]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isActive || !step) return null;

    const tooltipStyle = getTooltipPosition(position, step.placement || "bottom");

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/60 z-[9998]" />

            {/* Spotlight */}
            {step.spotlight && (
                <div
                    className="fixed z-[9999] rounded-lg ring-4 ring-primary/50 ring-offset-2 ring-offset-background"
                    style={{
                        top: position.top - 4,
                        left: position.left - 4,
                        width: position.width + 8,
                        height: position.height + 8,
                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
                    }}
                />
            )}

            {/* Tooltip */}
            <div
                className="fixed z-[10000] w-80 p-4 rounded-xl bg-background border border-border shadow-2xl"
                style={tooltipStyle}
            >
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                            {currentStep + 1} of {steps.length}
                        </span>
                    </div>
                    <button onClick={onSkip} className="p-1 hover:bg-muted rounded">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.content}</p>

                <div className="flex justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                    </Button>
                    <Button size="sm" onClick={handleNext}>
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </>
    );
}

function getTooltipPosition(
    target: { top: number; left: number; width: number; height: number },
    placement: "top" | "bottom" | "left" | "right"
): React.CSSProperties {
    const OFFSET = 12;

    switch (placement) {
        case "top":
            return {
                bottom: `calc(100vh - ${target.top - OFFSET}px)`,
                left: target.left + target.width / 2 - 160,
            };
        case "bottom":
            return {
                top: target.top + target.height + OFFSET,
                left: target.left + target.width / 2 - 160,
            };
        case "left":
            return {
                top: target.top + target.height / 2 - 80,
                right: `calc(100vw - ${target.left - OFFSET}px)`,
            };
        case "right":
            return {
                top: target.top + target.height / 2 - 80,
                left: target.left + target.width + OFFSET,
            };
    }
}

// =============================================================================
// TOUR HOOK
// =============================================================================

export function useTour(tourId: string) {
    const [isActive, setIsActive] = useState(false);

    const start = () => {
        const completed = localStorage.getItem(`tour_${tourId}`);
        if (!completed) {
            setIsActive(true);
        }
    };

    const complete = () => {
        localStorage.setItem(`tour_${tourId}`, "true");
        setIsActive(false);
    };

    const skip = () => {
        localStorage.setItem(`tour_${tourId}`, "skipped");
        setIsActive(false);
    };

    const reset = () => {
        localStorage.removeItem(`tour_${tourId}`);
    };

    return { isActive, start, complete, skip, reset };
}

export default FeatureTour;
