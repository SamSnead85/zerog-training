"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Play,
    RotateCcw,
    Check,
    X,
    ChevronRight,
    Clock,
    Zap,
    Target,
    MessageSquare,
    Loader2,
    Send,
    Lightbulb,
    AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationStep {
    id: string;
    type: "scenario" | "decision" | "consequence" | "feedback";
    content: string;
    options?: { id: string; text: string; isCorrect: boolean; consequence?: string }[];
    feedback?: { correct: string; incorrect: string };
    aiResponse?: string;
}

interface SimulationScenario {
    id: string;
    title: string;
    description: string;
    context: string;
    steps: SimulationStep[];
    skillsTested: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
    completionXP: number;
}

const phishingSimulation: SimulationScenario = {
    id: "phishing-detection",
    title: "Phishing Email Detection",
    description: "Identify and respond to a suspicious email",
    context: "You're working at your desk when you receive an urgent email from what appears to be your IT department. The email claims your password will expire in 24 hours and you need to click a link to update it.",
    difficulty: "intermediate",
    completionXP: 200,
    skillsTested: ["Phishing Recognition", "Security Awareness", "Critical Thinking"],
    steps: [
        {
            id: "1",
            type: "scenario",
            content: "📧 **From:** IT-Support@company-secure-portal.com\n\n**Subject:** URGENT: Your password expires in 24 hours\n\nDear Employee,\n\nYour network password will expire in 24 hours. To avoid being locked out of your account, please click the link below to update your password immediately.\n\n[Update Password Now](suspicious-link)\n\nThis is an automated message. Please do not reply.\n\nIT Support Team",
        },
        {
            id: "2",
            type: "decision",
            content: "What should you do with this email?",
            options: [
                { id: "a", text: "Click the link and update your password immediately", isCorrect: false, consequence: "You've potentially exposed your credentials to attackers." },
                { id: "b", text: "Reply to the email asking for more information", isCorrect: false, consequence: "Engaging with phishing emails can confirm your address is active." },
                { id: "c", text: "Check the sender's email address and hover over the link to inspect it", isCorrect: true, consequence: "Smart move! Let's examine this email more closely." },
                { id: "d", text: "Forward it to everyone warning them about the suspicious email", isCorrect: false, consequence: "While well-intentioned, this spreads the phishing link further." },
            ],
        },
        {
            id: "3",
            type: "scenario",
            content: "You hover over the link and see it points to: `http://company-secure-portal.com.phishing-site.ru/login`\n\nYou also notice:\n- The sender domain is `company-secure-portal.com` not your actual company domain\n- No personalization (just \"Dear Employee\")\n- Creates urgency with \"24 hours\" deadline\n- Grammar slightly off in places",
        },
        {
            id: "4",
            type: "decision",
            content: "Now that you've identified several red flags, what's your next step?",
            options: [
                { id: "a", text: "Delete the email and move on", isCorrect: false, consequence: "Deleting removes evidence - IT can't investigate or warn others." },
                { id: "b", text: "Report to IT/Security using your company's phishing report button", isCorrect: true, consequence: "Perfect! This allows IT to investigate and protect other employees." },
                { id: "c", text: "Call the number in the email to verify", isCorrect: false, consequence: "Any contact info in a phishing email may also be fake." },
                { id: "d", text: "Test the link in a private browser window", isCorrect: false, consequence: "Never click suspicious links - even in private browsing." },
            ],
        },
        {
            id: "5",
            type: "feedback",
            content: "Simulation Complete",
            feedback: {
                correct: "🎉 Excellent work! You correctly identified the phishing attempt and reported it through proper channels. Key red flags you spotted:\n\n✅ Fake sender domain\n✅ Suspicious link URL\n✅ Generic greeting\n✅ False urgency\n\nReporting phishing attempts helps protect your entire organization.",
                incorrect: "⚠️ This was a phishing attempt. Key red flags included:\n\n❌ Fake sender domain (company-secure-portal.com instead of real company domain)\n❌ Suspicious link pointing to .ru domain\n❌ Generic \"Dear Employee\" greeting\n❌ False urgency tactics\n\nAlways verify suspicious emails and report them to IT.",
            },
        },
    ],
};

export function InteractiveSimulation({ scenario = phishingSimulation }: { scenario?: SimulationScenario }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showConsequence, setShowConsequence] = useState(false);
    const [score, setScore] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    const currentStep = scenario.steps[currentStepIndex];
    const isDecisionStep = currentStep?.type === "decision";
    const isFeedbackStep = currentStep?.type === "feedback";
    const progress = ((currentStepIndex + 1) / scenario.steps.length) * 100;

    const handleOptionSelect = async (optionId: string) => {
        if (showConsequence) return;
        setSelectedOption(optionId);
        setIsThinking(true);

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        const option = currentStep.options?.find(o => o.id === optionId);
        if (option?.isCorrect) {
            setScore(score + 50);
            setTotalCorrect(totalCorrect + 1);
        }

        setIsThinking(false);
        setShowConsequence(true);
    };

    const handleNext = () => {
        if (currentStepIndex < scenario.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            setSelectedOption(null);
            setShowConsequence(false);
        } else {
            setIsComplete(true);
        }
    };

    const handleRestart = () => {
        setCurrentStepIndex(0);
        setSelectedOption(null);
        setShowConsequence(false);
        setScore(0);
        setTotalCorrect(0);
        setIsComplete(false);
    };

    if (isComplete) {
        const totalDecisions = scenario.steps.filter(s => s.type === "decision").length;
        const percentage = Math.round((totalCorrect / totalDecisions) * 100);

        return (
            <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-6">
                    {percentage >= 70 ? (
                        <Check className="h-12 w-12 text-emerald-400" />
                    ) : (
                        <AlertTriangle className="h-12 w-12 text-amber-400" />
                    )}
                </div>
                <h2 className="text-2xl font-bold mb-2">Simulation Complete!</h2>
                <p className="text-muted-foreground mb-6">{scenario.title}</p>

                <div className="flex items-center justify-center gap-8 mb-8">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-primary">{percentage}%</p>
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-amber-400">+{score}</p>
                        <p className="text-sm text-muted-foreground">XP Earned</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" onClick={handleRestart} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                    </Button>
                    <Button className="gap-2">
                        Continue Learning
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {scenario.difficulty}
                        </Badge>
                        <h3 className="font-semibold">{scenario.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Zap className="h-4 w-4 text-amber-400" />
                            {scenario.completionXP} XP
                        </span>
                    </div>
                </div>
                <Progress value={progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-2">
                    Step {currentStepIndex + 1} of {scenario.steps.length}
                </p>
            </Card>

            {/* Simulation Content */}
            <Card className="p-6 bg-white/[0.02] border-white/10 min-h-[400px]">
                {currentStep.type === "scenario" && (
                    <div className="prose prose-invert prose-sm max-w-none">
                        <div className="p-4 rounded-xl bg-black/30 border border-white/10 font-mono text-sm whitespace-pre-wrap">
                            {currentStep.content}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button onClick={handleNext} className="gap-2">
                                Continue
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {currentStep.type === "decision" && (
                    <div>
                        <div className="flex items-start gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/20">
                                <Target className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Decision Point</h4>
                                <p className="text-muted-foreground">{currentStep.content}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {currentStep.options?.map((option) => {
                                const isSelected = selectedOption === option.id;
                                const showResult = showConsequence && isSelected;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(option.id)}
                                        disabled={showConsequence}
                                        className={cn(
                                            "w-full p-4 rounded-xl border text-left transition-all",
                                            !showConsequence && "hover:border-primary/50 hover:bg-primary/5",
                                            isSelected && !showConsequence && "border-primary bg-primary/10",
                                            showResult && option.isCorrect && "border-emerald-500 bg-emerald-500/10",
                                            showResult && !option.isCorrect && "border-red-500 bg-red-500/10",
                                            showConsequence && !isSelected && "opacity-50"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
                                                {option.id.toUpperCase()}
                                            </span>
                                            <div className="flex-1">
                                                <p>{option.text}</p>
                                                {showResult && (
                                                    <p className={cn(
                                                        "mt-2 text-sm",
                                                        option.isCorrect ? "text-emerald-400" : "text-red-400"
                                                    )}>
                                                        {option.consequence}
                                                    </p>
                                                )}
                                            </div>
                                            {showResult && (
                                                option.isCorrect
                                                    ? <Check className="h-5 w-5 text-emerald-400" />
                                                    : <X className="h-5 w-5 text-red-400" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {isThinking && (
                            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Processing your decision...</span>
                            </div>
                        )}

                        {showConsequence && (
                            <div className="mt-6 flex justify-end">
                                <Button onClick={handleNext} className="gap-2">
                                    Continue
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {currentStep.type === "feedback" && (
                    <div className="text-center py-8">
                        <Lightbulb className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-4">{currentStep.content}</h3>
                        <div className="prose prose-invert prose-sm max-w-none text-left p-4 rounded-xl bg-white/[0.03] border border-white/10">
                            <p className="whitespace-pre-wrap">
                                {totalCorrect > 0 ? currentStep.feedback?.correct : currentStep.feedback?.incorrect}
                            </p>
                        </div>
                        <div className="mt-6">
                            <Button onClick={handleNext} className="gap-2">
                                Complete Simulation
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Skills Being Tested */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Skills tested:</span>
                {scenario.skillsTested.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
