"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Play,
    CheckCircle2,
    ChevronRight,
    ChevronDown,
    Lightbulb,
    Terminal,
    Clock,
    Zap,
    Code2,
    RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type InteractiveLab } from "@/lib/curriculum/lesson-content";

interface InteractiveLabProps {
    lab: InteractiveLab;
}

export function InteractiveLabComponent({ lab }: InteractiveLabProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [showHint, setShowHint] = useState(false);
    const [code, setCode] = useState(lab.starterCode || lab.steps[0]?.code || "");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const progress = (completedSteps.size / lab.steps.length) * 100;
    const step = lab.steps[currentStep];

    const handleRunCode = () => {
        setIsRunning(true);
        // Simulate code execution
        setTimeout(() => {
            setOutput(step?.expectedOutput || "Code executed successfully!");
            setIsRunning(false);
        }, 800);
    };

    const handleCompleteStep = () => {
        setCompletedSteps((prev) => new Set([...prev, currentStep]));
        if (currentStep < lab.steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setShowHint(false);
            setOutput("");
            // Load next step's code if available
            if (lab.steps[currentStep + 1]?.code) {
                setCode(lab.steps[currentStep + 1].code!);
            }
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setCompletedSteps(new Set());
        setCode(lab.starterCode || lab.steps[0]?.code || "");
        setOutput("");
        setShowHint(false);
    };

    const difficultyColor = {
        beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };

    return (
        <div className="space-y-6">
            {/* Lab Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 border border-violet-500/20 p-6">
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
                <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                <Terminal className="h-6 w-6 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{lab.title}</h3>
                                <p className="text-sm text-muted-foreground">{lab.objective}</p>
                            </div>
                        </div>
                        <Badge variant="outline" className={cn("capitalize", difficultyColor[lab.difficulty])}>
                            {lab.difficulty}
                        </Badge>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {lab.estimatedTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Code2 className="h-4 w-4" />
                            {lab.tools.join(", ")}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Zap className="h-4 w-4" />
                            {lab.steps.length} steps
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </div>
            </div>

            {/* Main Lab Area */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Step Navigation - Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="p-4">
                        <h4 className="font-medium mb-3 text-sm">Steps</h4>
                        <div className="space-y-2">
                            {lab.steps.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => setCurrentStep(i)}
                                    className={cn(
                                        "w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition-all",
                                        currentStep === i
                                            ? "bg-primary/10 text-primary"
                                            : completedSteps.has(i)
                                                ? "text-emerald-500"
                                                : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    {completedSteps.has(i) ? (
                                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                                    ) : (
                                        <span className="w-4 h-4 rounded-full border flex items-center justify-center text-xs">
                                            {i + 1}
                                        </span>
                                    )}
                                    <span className="truncate">{s.title}</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Code Editor Area */}
                <div className="lg:col-span-4 space-y-4">
                    {/* Step Instructions */}
                    <Card className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <Badge variant="outline" className="mb-2">
                                    Step {currentStep + 1} of {lab.steps.length}
                                </Badge>
                                <h4 className="font-semibold text-lg">{step?.title}</h4>
                                <p className="text-muted-foreground mt-1">{step?.instruction}</p>
                            </div>
                            {step?.hint && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowHint(!showHint)}
                                    className="text-muted-foreground"
                                >
                                    <Lightbulb className="h-4 w-4 mr-1" />
                                    Hint
                                    {showHint ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
                                </Button>
                            )}
                        </div>
                        {showHint && step?.hint && (
                            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
                                <div className="flex items-start gap-2">
                                    <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <span>{step.hint}</span>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Code Editor */}
                    <Card className="overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
                            <span className="text-sm font-medium">Editor</span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={handleReset}>
                                    <RotateCcw className="h-4 w-4 mr-1" />
                                    Reset
                                </Button>
                                <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
                                    <Play className="h-4 w-4 mr-1" />
                                    {isRunning ? "Running..." : "Run Code"}
                                </Button>
                            </div>
                        </div>
                        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm min-h-[200px]">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-48 bg-transparent outline-none resize-none"
                                spellCheck={false}
                            />
                        </div>
                    </Card>

                    {/* Output Area */}
                    {output && (
                        <Card className="overflow-hidden">
                            <div className="px-4 py-2 bg-muted/50 border-b flex items-center gap-2">
                                <Terminal className="h-4 w-4" />
                                <span className="text-sm font-medium">Output</span>
                            </div>
                            <div className="bg-[#0d1117] text-emerald-400 p-4 font-mono text-sm min-h-[80px]">
                                <pre>{output}</pre>
                            </div>
                        </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <Button onClick={handleCompleteStep}>
                            {completedSteps.has(currentStep) ? (
                                <>
                                    Next Step
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Mark Complete & Continue
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Success Criteria */}
            {completedSteps.size === lab.steps.length && (
                <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Lab Complete!</h4>
                            <p className="text-sm text-muted-foreground">You've completed all steps</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-sm font-medium">What you accomplished:</h5>
                        <ul className="space-y-1">
                            {lab.successCriteria.map((criterion, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    {criterion}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            )}
        </div>
    );
}
