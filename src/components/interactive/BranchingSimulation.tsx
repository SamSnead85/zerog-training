"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card, Progress, Badge } from "@/components/ui";
import {
    Play,
    Pause,
    RotateCcw,
    CheckCircle2,
    Info,
    ChevronRight,
    ArrowRight,
    MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationStep {
    id: string;
    title: string;
    description: string;
    options: {
        text: string;
        isCorrect: boolean;
        feedback: string;
    }[];
}

interface BranchingSimulationProps {
    title: string;
    scenario: string;
    steps: SimulationStep[];
    onComplete: (score: number) => void;
}

const sampleSteps: SimulationStep[] = [
    {
        id: "1",
        title: "Initial Customer Contact",
        description: "A customer calls in frustrated about a delayed order. They're demanding immediate action. How do you respond?",
        options: [
            {
                text: "Apologize and immediately offer a full refund",
                isCorrect: false,
                feedback: "While well-intentioned, immediately offering a refund without understanding the issue doesn't address the root problem and may create unnecessary costs.",
            },
            {
                text: "Listen actively, acknowledge their frustration, and ask clarifying questions",
                isCorrect: true,
                feedback: "Excellent! Active listening and empathy builds trust while gathering the information needed to resolve the issue effectively.",
            },
            {
                text: "Transfer them to a supervisor immediately",
                isCorrect: false,
                feedback: "Transferring without attempting to help can frustrate the customer further and wastes supervisor time.",
            },
        ],
    },
    {
        id: "2",
        title: "Investigating the Issue",
        description: "After listening, you discover the order was delayed due to a warehouse error. The customer needs it for an important event tomorrow. What's your next step?",
        options: [
            {
                text: "Explain the warehouse made an error and there's nothing you can do",
                isCorrect: false,
                feedback: "This dismissive response doesn't provide a solution and will escalate the customer's frustration.",
            },
            {
                text: "Check for expedited shipping options and offer alternatives",
                isCorrect: true,
                feedback: "Great thinking! Proactively finding solutions shows ownership and commitment to customer satisfaction.",
            },
            {
                text: "Offer a 10% discount on their next order",
                isCorrect: false,
                feedback: "While a discount is nice, it doesn't address the immediate need. The customer needs their order, not a future discount.",
            },
        ],
    },
    {
        id: "3",
        title: "Resolution",
        description: "Expedited shipping will get the order there by noon tomorrow. How do you present this to the customer?",
        options: [
            {
                text: "Tell them it will arrive tomorrow and end the call quickly",
                isCorrect: false,
                feedback: "Rushing the call misses an opportunity to rebuild trust and ensure customer satisfaction.",
            },
            {
                text: "Confirm the delivery time, waive shipping fees, and follow up with a confirmation email",
                isCorrect: true,
                feedback: "Perfect! This comprehensive response addresses the issue, provides value, and creates a paper trail for reassurance.",
            },
            {
                text: "Ask if they want to speak to a manager about compensation",
                isCorrect: false,
                feedback: "Offering manager escalation unprompted can seem like you're passing the problem along rather than resolving it.",
            },
        ],
    },
];

export function BranchingSimulation({
    title = "Customer Service Excellence",
    scenario = "You're a customer service representative handling an escalated call.",
    steps = sampleSteps,
    onComplete,
}: Partial<BranchingSimulationProps>) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [history, setHistory] = useState<{ stepId: string; optionIndex: number; correct: boolean }[]>([]);

    const step = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    const handleSelect = (index: number) => {
        if (isRevealed) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        const isCorrect = step.options[selectedOption].isCorrect;
        if (isCorrect) {
            setScore((prev) => prev + 100 / steps.length);
        }

        setHistory((prev) => [
            ...prev,
            { stepId: step.id, optionIndex: selectedOption, correct: isCorrect },
        ]);
        setIsRevealed(true);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
            setSelectedOption(null);
            setIsRevealed(false);
        } else {
            setIsComplete(true);
            onComplete?.(Math.round(score));
        }
    };

    const handleRestart = () => {
        setCurrentStep(0);
        setSelectedOption(null);
        setIsRevealed(false);
        setScore(0);
        setIsComplete(false);
        setHistory([]);
    };

    if (isComplete) {
        const finalScore = Math.round(score);
        const passed = finalScore >= 70;

        return (
            <Card className="p-8">
                <div className="text-center mb-8">
                    <div className={cn(
                        "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
                        passed ? "bg-emerald-500/10" : "bg-amber-500/10"
                    )}>
                        {passed ? (
                            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                        ) : (
                            <RotateCcw className="h-12 w-12 text-amber-500" />
                        )}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                        {passed ? "Simulation Complete!" : "Try Again"}
                    </h2>
                    <p className="text-muted-foreground">
                        You scored {finalScore}% on this scenario
                    </p>
                </div>

                {/* Decision History */}
                <div className="space-y-3 mb-8">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                        Your Decisions
                    </h3>
                    {history.map((h, i) => {
                        const s = steps.find((st) => st.id === h.stepId);
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "p-4 rounded-xl border",
                                    h.correct
                                        ? "bg-emerald-500/5 border-emerald-500/20"
                                        : "bg-red-500/5 border-red-500/20"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                        h.correct ? "bg-emerald-500/20" : "bg-red-500/20"
                                    )}>
                                        {h.correct ? (
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <Info className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{s?.title}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {s?.options[h.optionIndex]?.feedback}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={handleRestart} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                    </Button>
                    <Button className="gap-2">
                        Continue Learning
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            Interactive Simulation
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                    </div>
                    <Badge variant="secondary">{Math.round(score)}%</Badge>
                </div>
                <Progress value={progress} className="h-1" />
            </div>

            {/* Scenario Context */}
            {currentStep === 0 && (
                <div className="p-4 bg-primary/5 border-b border-primary/10">
                    <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <h3 className="font-medium">{title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{scenario}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Step Content */}
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>

                {/* Options */}
                <div className="space-y-3">
                    {step.options.map((option, i) => {
                        const isSelected = selectedOption === i;
                        const isCorrect = option.isCorrect;

                        let optionClass = "bg-white/[0.02] border-white/10 hover:border-white/20";
                        if (isRevealed) {
                            if (isCorrect) {
                                optionClass = "bg-emerald-500/10 border-emerald-500/30";
                            } else if (isSelected && !isCorrect) {
                                optionClass = "bg-red-500/10 border-red-500/30";
                            } else {
                                optionClass = "bg-white/[0.01] border-white/5 opacity-50";
                            }
                        } else if (isSelected) {
                            optionClass = "bg-primary/10 border-primary/30";
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                disabled={isRevealed}
                                className={cn(
                                    "w-full p-4 rounded-xl border text-left transition-all",
                                    optionClass
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                        isRevealed && isCorrect
                                            ? "bg-emerald-500 text-white"
                                            : isRevealed && isSelected && !isCorrect
                                                ? "bg-red-500 text-white"
                                                : isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-white/5"
                                    )}>
                                        {isRevealed && isCorrect ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : isRevealed && isSelected && !isCorrect ? (
                                            <Info className="h-4 w-4" />
                                        ) : (
                                            String.fromCharCode(65 + i)
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{option.text}</p>
                                        {isRevealed && (isSelected || isCorrect) && (
                                            <p className={cn(
                                                "text-sm mt-2",
                                                isCorrect ? "text-emerald-400" : "text-red-400"
                                            )}>
                                                {option.feedback}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border flex justify-end gap-3">
                {!isRevealed ? (
                    <Button onClick={handleSubmit} disabled={selectedOption === null}>
                        Submit Decision
                    </Button>
                ) : (
                    <Button onClick={handleNext} className="gap-2">
                        {currentStep < steps.length - 1 ? "Next Scenario" : "Complete"}
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </Card>
    );
}
