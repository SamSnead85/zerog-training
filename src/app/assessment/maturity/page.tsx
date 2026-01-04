"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/brand/Logo";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Target,
    Users,
    Wrench,
    Shield,
    Brain,
    Sparkles,
    BarChart3,
    BookOpen,
    Award,
} from "lucide-react";
import {
    maturityLevels,
    maturityQuestions,
    calculateMaturityLevel,
    getMaturityLevel,
    getCategoryBreakdown,
} from "@/lib/curriculum/ai-maturity-model";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
    strategy: Target,
    skills: Brain,
    tools: Wrench,
    culture: Users,
    governance: Shield,
};

const categoryLabels: Record<string, string> = {
    strategy: "Strategy",
    skills: "Skills",
    tools: "Tools",
    culture: "Culture",
    governance: "Governance",
};

export default function MaturityAssessmentPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);

    const question = maturityQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / maturityQuestions.length) * 100;
    const isComplete = Object.keys(answers).length === maturityQuestions.length;

    const handleAnswer = (score: number) => {
        setAnswers((prev) => ({ ...prev, [question.id]: score }));
        if (currentQuestion < maturityQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleViewResults = () => {
        setShowResults(true);
    };

    const maturityLevel = calculateMaturityLevel(answers);
    const levelDetails = getMaturityLevel(maturityLevel);
    const categoryBreakdown = getCategoryBreakdown(answers);

    // Results View
    if (showResults) {
        return (
            <div className="min-h-screen bg-black text-white">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                        <Link href="/" className="flex items-center gap-3">
                            <LogoIcon size={32} />
                            <span className="font-playfair text-2xl font-medium tracking-tight italic">
                                ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                            </span>
                        </Link>
                    </div>
                </nav>

                <div className="pt-32 pb-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Results Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm font-medium text-emerald-400">Assessment Complete</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Your AI Maturity Level
                            </h1>
                            <p className="text-xl text-white/50">
                                Based on your responses, here&apos;s where your organization stands
                            </p>
                        </div>

                        {/* Maturity Level Card */}
                        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 mb-12">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />

                            <div className="relative flex flex-col md:flex-row items-center gap-8">
                                {/* Level Badge */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-bold">{maturityLevel}</span>
                                        <span className="text-sm text-white/50">of 5</span>
                                    </div>
                                </div>

                                {/* Level Details */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-2">{levelDetails.name}</h2>
                                    <p className="text-white/60 mb-6">{levelDetails.description}</p>

                                    {/* Characteristics */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {levelDetails.characteristics.map((char, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                                {char}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Level Scale */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="flex justify-between items-center mb-3">
                                    {maturityLevels.map((level) => (
                                        <div
                                            key={level.level}
                                            className={cn(
                                                "text-center flex-1",
                                                level.level === maturityLevel ? "text-white" : "text-white/30"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-sm font-bold",
                                                    level.level === maturityLevel
                                                        ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                                                        : level.level < maturityLevel
                                                            ? "bg-white/10"
                                                            : "bg-white/5"
                                                )}
                                            >
                                                {level.level}
                                            </div>
                                            <span className="text-xs hidden md:block">{level.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                                        style={{ width: `${(maturityLevel / 5) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category Breakdown */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold mb-6">Assessment Breakdown</h3>
                            <div className="grid md:grid-cols-5 gap-4">
                                {Object.entries(categoryBreakdown).map(([category, score]) => {
                                    const Icon = categoryIcons[category];
                                    return (
                                        <div
                                            key={category}
                                            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center"
                                        >
                                            <Icon className="h-6 w-6 mx-auto mb-2 text-white/60" />
                                            <div className="text-2xl font-bold mb-1">{score.toFixed(1)}</div>
                                            <div className="text-xs text-white/40">{categoryLabels[category]}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recommended Next Steps */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold mb-6">Recommended Next Steps</h3>
                            <div className="space-y-3">
                                {levelDetails.nextSteps.map((step, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-bold text-cyan-400">{i + 1}</span>
                                        </div>
                                        <p className="text-white/80">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Tracks */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold mb-6">Recommended Training</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {levelDetails.recommendedTracks.includes("everyone") && (
                                    <Link href="/training/everyone" className="block p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <BookOpen className="h-5 w-5 text-blue-400" />
                                            <span className="font-semibold">AI for Everyone</span>
                                        </div>
                                        <p className="text-sm text-white/50 mb-3">Essential AI literacy for all professionals</p>
                                        <span className="text-sm text-blue-400 group-hover:text-blue-300">Start Learning →</span>
                                    </Link>
                                )}
                                {levelDetails.recommendedTracks.includes("product-managers") && (
                                    <Link href="/training/product-managers" className="block p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <BarChart3 className="h-5 w-5 text-purple-400" />
                                            <span className="font-semibold">AI for Product Managers</span>
                                        </div>
                                        <p className="text-sm text-white/50 mb-3">Lead AI-powered product development</p>
                                        <span className="text-sm text-purple-400 group-hover:text-purple-300">Start Learning →</span>
                                    </Link>
                                )}
                                {levelDetails.recommendedTracks.includes("business-analysts") && (
                                    <Link href="/training/business-analysts" className="block p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Target className="h-5 w-5 text-emerald-400" />
                                            <span className="font-semibold">AI for Business Analysts</span>
                                        </div>
                                        <p className="text-sm text-white/50 mb-3">Deeper insights with AI-powered analysis</p>
                                        <span className="text-sm text-emerald-400 group-hover:text-emerald-300">Start Learning →</span>
                                    </Link>
                                )}
                                {levelDetails.recommendedTracks.includes("project-managers") && (
                                    <Link href="/training/project-managers" className="block p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Users className="h-5 w-5 text-amber-400" />
                                            <span className="font-semibold">AI for Project Managers</span>
                                        </div>
                                        <p className="text-sm text-white/50 mb-3">Smarter planning and risk management</p>
                                        <span className="text-sm text-amber-400 group-hover:text-amber-300">Start Learning →</span>
                                    </Link>
                                )}
                                {levelDetails.recommendedTracks.includes("executives") && (
                                    <Link href="/training" className="block p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Award className="h-5 w-5 text-rose-400" />
                                            <span className="font-semibold">AI Transformation Leadership</span>
                                        </div>
                                        <p className="text-sm text-white/50 mb-3">Strategic leadership for AI transformation</p>
                                        <span className="text-sm text-rose-400 group-hover:text-rose-300">Coming Soon →</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10">
                            <h3 className="text-2xl font-bold mb-3">Ready to Accelerate Your AI Transformation?</h3>
                            <p className="text-white/50 mb-6">Get personalized guidance and start your team&apos;s training journey</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/contact">
                                    <Button size="lg" className="gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Schedule Consultation
                                    </Button>
                                </Link>
                                <Link href="/demo">
                                    <Button size="lg" variant="outline" className="gap-2">
                                        View Platform Demo
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Assessment View
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <LogoIcon size={32} />
                        <span className="font-playfair text-2xl font-medium tracking-tight italic">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>
                    <Link href="/native" className="text-sm text-white/40 hover:text-white transition-colors">
                        NATIVE Framework™
                    </Link>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                            <Target className="h-4 w-4 text-cyan-500" />
                            <span className="text-sm font-medium text-cyan-400">NATIVE Framework™ Navigate Phase</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            AI Maturity Assessment
                        </h1>
                        <p className="text-white/50">
                            10 questions to understand your organization&apos;s AI readiness
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/60">Question {currentQuestion + 1} of {maturityQuestions.length}</span>
                            <span className="text-white/60">{Math.round(progress)}% complete</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-6">
                            {(() => {
                                const Icon = categoryIcons[question.category];
                                return (
                                    <>
                                        <Icon className="h-4 w-4 text-white/40" />
                                        <span className="text-sm text-white/40">{categoryLabels[question.category]}</span>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Question */}
                        <h2 className="text-xl md:text-2xl font-semibold mb-8">{question.question}</h2>

                        {/* Options */}
                        <div className="space-y-3">
                            {question.options.map((option, i) => {
                                const isSelected = answers[question.id] === option.score;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(option.score)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-xl border transition-all",
                                            isSelected
                                                ? "bg-cyan-500/10 border-cyan-500/50 text-white"
                                                : "bg-white/[0.02] border-white/5 text-white/80 hover:border-white/20 hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                                    isSelected ? "border-cyan-500 bg-cyan-500" : "border-white/30"
                                                )}
                                            >
                                                {isSelected && <CheckCircle2 className="h-4 w-4 text-black" />}
                                            </div>
                                            <span>{option.text}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentQuestion === 0}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>

                        {isComplete ? (
                            <Button onClick={handleViewResults} className="gap-2">
                                View Results
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                disabled={!answers[question.id]}
                                onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, maturityQuestions.length - 1))}
                                className="gap-2"
                            >
                                Next
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
