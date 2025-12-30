"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ChevronLeft,
    Brain,
    Code,
    Lightbulb,
    Target,
    CheckCircle2,
    Clock,
    RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// SKILL ASSESSMENT TYPES
// =============================================================================

interface AssessmentQuestion {
    id: string;
    category: "fundamentals" | "technical" | "practical" | "strategic";
    question: string;
    options: { id: string; text: string; weight: number }[]; // weight indicates skill level
}

interface AssessmentResult {
    level: "beginner" | "intermediate" | "advanced" | "expert";
    score: number;
    recommendedPath: string;
    strengths: string[];
    gaps: string[];
}

// =============================================================================
// ASSESSMENT QUESTIONS
// =============================================================================

const assessmentQuestions: AssessmentQuestion[] = [
    {
        id: "q1",
        category: "fundamentals",
        question: "How would you describe your experience with AI/ML concepts?",
        options: [
            { id: "a", text: "I'm new to AI - excited to learn the basics", weight: 1 },
            { id: "b", text: "I understand basic concepts like ML and neural networks", weight: 2 },
            { id: "c", text: "I've built applications using AI APIs (OpenAI, etc.)", weight: 3 },
            { id: "d", text: "I've trained models and deployed AI systems in production", weight: 4 },
        ],
    },
    {
        id: "q2",
        category: "technical",
        question: "Have you worked with Large Language Models (LLMs)?",
        options: [
            { id: "a", text: "I've used ChatGPT but haven't built with APIs", weight: 1 },
            { id: "b", text: "I've integrated OpenAI/Anthropic APIs into applications", weight: 2 },
            { id: "c", text: "I've implemented RAG, fine-tuning, or custom agents", weight: 3 },
            { id: "d", text: "I've deployed LLM systems at scale with MLOps", weight: 4 },
        ],
    },
    {
        id: "q3",
        category: "practical",
        question: "What's your experience with prompt engineering?",
        options: [
            { id: "a", text: "I write basic prompts for ChatGPT", weight: 1 },
            { id: "b", text: "I use structured prompts with system messages and examples", weight: 2 },
            { id: "c", text: "I implement chain-of-thought, few-shot, and other techniques", weight: 3 },
            { id: "d", text: "I design and optimize prompts for production systems", weight: 4 },
        ],
    },
    {
        id: "q4",
        category: "strategic",
        question: "How do you approach AI adoption in organizations?",
        options: [
            { id: "a", text: "I'm learning how AI can be applied to business problems", weight: 1 },
            { id: "b", text: "I can identify use cases where AI adds value", weight: 2 },
            { id: "c", text: "I've led AI implementation projects in my organization", weight: 3 },
            { id: "d", text: "I've developed AI transformation strategies for enterprises", weight: 4 },
        ],
    },
    {
        id: "q5",
        category: "technical",
        question: "What's your experience with agentic AI systems?",
        options: [
            { id: "a", text: "I'm not familiar with AI agents yet", weight: 1 },
            { id: "b", text: "I understand the concept of function calling and tools", weight: 2 },
            { id: "c", text: "I've built agents using frameworks like LangChain or CrewAI", weight: 3 },
            { id: "d", text: "I've deployed multi-agent systems in production", weight: 4 },
        ],
    },
];

const categoryIcons = {
    fundamentals: Brain,
    technical: Code,
    practical: Lightbulb,
    strategic: Target,
};

// =============================================================================
// SKILL ASSESSMENT COMPONENT
// =============================================================================

export default function SkillAssessmentPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Map<string, { id: string; weight: number }>>(new Map());
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = assessmentQuestions[currentIndex];
    const progress = ((currentIndex + (answers.has(currentQuestion.id) ? 1 : 0)) / assessmentQuestions.length) * 100;

    // Calculate result
    const calculateResult = (): AssessmentResult => {
        const totalWeight = Array.from(answers.values()).reduce((sum, a) => sum + a.weight, 0);
        const avgWeight = totalWeight / answers.size;

        let level: AssessmentResult["level"];
        let recommendedPath: string;

        if (avgWeight < 1.5) {
            level = "beginner";
            recommendedPath = "foundations-cert";
        } else if (avgWeight < 2.5) {
            level = "intermediate";
            recommendedPath = "foundations-cert";
        } else if (avgWeight < 3.5) {
            level = "advanced";
            recommendedPath = "associate-cert";
        } else {
            level = "expert";
            recommendedPath = "professional-cert";
        }

        return {
            level,
            score: Math.round((avgWeight / 4) * 100),
            recommendedPath,
            strengths: level === "beginner" ? ["Enthusiasm to learn"] : ["Prompt engineering", "API integration"],
            gaps: level === "expert" ? [] : ["Agentic AI systems", "Production deployment"],
        };
    };

    // Handle answer selection
    const handleSelect = (optionId: string, weight: number) => {
        setAnswers(new Map(answers.set(currentQuestion.id, { id: optionId, weight })));
    };

    // Handle next
    const handleNext = () => {
        if (currentIndex < assessmentQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    // Handle restart
    const handleRestart = () => {
        setCurrentIndex(0);
        setAnswers(new Map());
        setShowResults(false);
    };

    const result = showResults ? calculateResult() : null;

    const levelConfig = {
        beginner: { label: "Beginner", color: "text-blue-400", bg: "bg-blue-500/10" },
        intermediate: { label: "Intermediate", color: "text-emerald-400", bg: "bg-emerald-500/10" },
        advanced: { label: "Advanced", color: "text-purple-400", bg: "bg-purple-500/10" },
        expert: { label: "Expert", color: "text-amber-400", bg: "bg-amber-500/10" },
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center h-16 px-6 max-w-3xl mx-auto">
                    <Link href="/training" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                    </Link>
                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-sm text-white/40">
                            <Clock className="h-4 w-4 inline mr-1" />
                            ~5 min
                        </span>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="h-1 bg-white/10">
                <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <main className="px-6 py-12 max-w-2xl mx-auto">
                {!showResults ? (
                    <>
                        {/* Question Header */}
                        <div className="mb-8">
                            <span className="text-sm text-white/40">
                                Question {currentIndex + 1} of {assessmentQuestions.length}
                            </span>
                            <h1 className="text-2xl font-bold mt-2">{currentQuestion.question}</h1>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-8">
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers.get(currentQuestion.id)?.id === option.id;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option.id, option.weight)}
                                        className={cn(
                                            "w-full p-4 rounded-xl border text-left transition-all",
                                            isSelected
                                                ? "border-white/40 bg-white/10"
                                                : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                isSelected ? "border-white bg-white" : "border-white/30"
                                            )}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                                            </div>
                                            <span>{option.text}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                                disabled={currentIndex === 0}
                                className={cn(
                                    "px-6 py-3 rounded-full transition-colors",
                                    currentIndex === 0
                                        ? "text-white/20 cursor-not-allowed"
                                        : "text-white/60 hover:text-white"
                                )}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!answers.has(currentQuestion.id)}
                                className={cn(
                                    "px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2",
                                    answers.has(currentQuestion.id)
                                        ? "bg-white text-black hover:bg-white/90"
                                        : "bg-white/10 text-white/40 cursor-not-allowed"
                                )}
                            >
                                {currentIndex === assessmentQuestions.length - 1 ? "See Results" : "Next"}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </>
                ) : result && (
                    <>
                        {/* Results */}
                        <div className="text-center mb-8">
                            <div className={cn(
                                "inline-flex items-center justify-center w-20 h-20 rounded-full mb-6",
                                levelConfig[result.level].bg
                            )}>
                                <CheckCircle2 className={cn("h-10 w-10", levelConfig[result.level].color)} />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
                            <p className="text-white/50">Here's your personalized learning recommendation</p>
                        </div>

                        {/* Skill Level */}
                        <div className={cn(
                            "p-6 rounded-2xl border mb-6",
                            levelConfig[result.level].bg,
                            "border-white/10"
                        )}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-white/40">Your Skill Level</span>
                                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", levelConfig[result.level].bg, levelConfig[result.level].color)}>
                                    {levelConfig[result.level].label}
                                </span>
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                                <div
                                    className={cn("h-full rounded-full", levelConfig[result.level].color.replace("text-", "bg-"))}
                                    style={{ width: `${result.score}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-white/40">
                                <span>Beginner</span>
                                <span>Expert</span>
                            </div>
                        </div>

                        {/* Recommended Path */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                            <h2 className="font-semibold mb-4">Recommended Starting Point</h2>
                            <Link href={`/certifications/${result.recommendedPath}`}>
                                <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">
                                            {result.recommendedPath.includes("foundation") ? "🎓" :
                                                result.recommendedPath.includes("associate") ? "🏅" : "🏆"}
                                        </span>
                                        <div>
                                            <p className="font-medium">
                                                {result.recommendedPath.includes("foundation") ? "AI-Native Foundations" :
                                                    result.recommendedPath.includes("associate") ? "AI-Native Associate" : "AI-Native Professional"}
                                            </p>
                                            <p className="text-sm text-white/40">Start your certification journey</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-white/40" />
                                </div>
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleRestart}
                                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Retake Assessment
                            </button>
                            <Link href="/training" className="flex-1">
                                <button className="w-full px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                                    Start Learning →
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
