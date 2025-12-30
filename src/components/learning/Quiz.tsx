"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface QuizQuestion {
    id: string;
    type: "multiple-choice" | "multi-select" | "true-false";
    question: string;
    options: {
        id: string;
        text: string;
    }[];
    correctAnswers: string[]; // IDs of correct options
    explanation: string;
    hint?: string;
}

export interface QuizProps {
    title?: string;
    questions: QuizQuestion[];
    onComplete?: (score: number, total: number) => void;
    showProgress?: boolean;
    allowRetry?: boolean;
}

// =============================================================================
// QUIZ COMPONENT
// =============================================================================

export function Quiz({
    title = "Knowledge Check",
    questions,
    onComplete,
    showProgress = true,
    allowRetry = true
}: QuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [answers, setAnswers] = useState<Map<string, { selected: string[]; correct: boolean }>>(new Map());
    const [quizComplete, setQuizComplete] = useState(false);

    const currentQuestion = questions[currentIndex];
    const isMultiSelect = currentQuestion.type === "multi-select";

    // Calculate score
    const correctCount = Array.from(answers.values()).filter(a => a.correct).length;
    const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    // Handle answer selection
    const handleSelect = (optionId: string) => {
        if (showResult) return;

        if (isMultiSelect) {
            setSelectedAnswers(prev =>
                prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
            );
        } else {
            setSelectedAnswers([optionId]);
        }
    };

    // Check answer
    const handleCheck = () => {
        const isCorrect =
            selectedAnswers.length === currentQuestion.correctAnswers.length &&
            selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a));

        setAnswers(new Map(answers.set(currentQuestion.id, {
            selected: selectedAnswers,
            correct: isCorrect
        })));
        setShowResult(true);
    };

    // Next question
    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswers([]);
            setShowResult(false);
            setShowHint(false);
        } else {
            setQuizComplete(true);
            onComplete?.(correctCount + (answers.get(currentQuestion.id)?.correct ? 0 : 1), questions.length);
        }
    };

    // Restart quiz
    const handleRestart = () => {
        setCurrentIndex(0);
        setSelectedAnswers([]);
        setShowResult(false);
        setShowHint(false);
        setAnswers(new Map());
        setQuizComplete(false);
    };

    // Get option style
    const getOptionStyle = (optionId: string) => {
        if (!showResult) {
            return selectedAnswers.includes(optionId)
                ? "border-white/40 bg-white/10"
                : "border-white/10 hover:border-white/20 hover:bg-white/5";
        }

        const isCorrect = currentQuestion.correctAnswers.includes(optionId);
        const wasSelected = selectedAnswers.includes(optionId);

        if (isCorrect) {
            return "border-emerald-500/50 bg-emerald-500/10";
        }
        if (wasSelected && !isCorrect) {
            return "border-red-500/50 bg-red-500/10";
        }
        return "border-white/10 opacity-50";
    };

    // Quiz complete screen
    if (quizComplete) {
        const passed = scorePercent >= 70;
        return (
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-8">
                <div className="text-center">
                    <div className={cn(
                        "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
                        passed ? "bg-emerald-500/20" : "bg-yellow-500/20"
                    )}>
                        {passed ? (
                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                        ) : (
                            <RotateCcw className="h-10 w-10 text-yellow-500" />
                        )}
                    </div>

                    <h3 className="text-2xl font-bold mb-2">
                        {passed ? "Great Job!" : "Keep Learning!"}
                    </h3>
                    <p className="text-white/50 mb-6">
                        You scored {correctCount} out of {questions.length} ({scorePercent}%)
                    </p>

                    {/* Score bar */}
                    <div className="max-w-xs mx-auto mb-8">
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    passed ? "bg-emerald-500" : "bg-yellow-500"
                                )}
                                style={{ width: `${scorePercent}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-white/40 mt-2">
                            <span>0%</span>
                            <span className="text-white/60">70% to pass</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {allowRetry && !passed && (
                        <button
                            onClick={handleRestart}
                            className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
                        >
                            Try Again
                        </button>
                    )}

                    {passed && (
                        <p className="text-sm text-emerald-400">
                            ✓ Knowledge check completed
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    {title}
                </h3>
                {showProgress && (
                    <span className="text-sm text-white/40">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                )}
            </div>

            {/* Progress bar */}
            {showProgress && (
                <div className="h-1 bg-white/10">
                    <div
                        className="h-full bg-white/40 transition-all duration-300"
                        style={{ width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
                    />
                </div>
            )}

            {/* Question */}
            <div className="p-6">
                <p className="text-lg mb-6">{currentQuestion.question}</p>

                {/* Type indicator */}
                {isMultiSelect && (
                    <p className="text-xs text-white/40 mb-4">Select all that apply</p>
                )}

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswers.includes(option.id);
                        const isCorrect = currentQuestion.correctAnswers.includes(option.id);

                        return (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                disabled={showResult}
                                className={cn(
                                    "w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                                    getOptionStyle(option.id)
                                )}
                            >
                                {/* Selection indicator */}
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                    isSelected ? "border-white bg-white" : "border-white/30"
                                )}>
                                    {isSelected && !showResult && (
                                        <div className="w-2 h-2 rounded-full bg-black" />
                                    )}
                                    {showResult && isCorrect && (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    )}
                                    {showResult && isSelected && !isCorrect && (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                </div>

                                <span className={cn(
                                    showResult && isCorrect && "text-emerald-400"
                                )}>
                                    {option.text}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Hint */}
                {currentQuestion.hint && !showResult && (
                    <div className="mb-6">
                        {showHint ? (
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <p className="text-sm text-yellow-200">{currentQuestion.hint}</p>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowHint(true)}
                                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                                💡 Show hint
                            </button>
                        )}
                    </div>
                )}

                {/* Explanation (after answer) */}
                {showResult && (
                    <div className={cn(
                        "p-4 rounded-xl mb-6",
                        answers.get(currentQuestion.id)?.correct
                            ? "bg-emerald-500/10 border border-emerald-500/20"
                            : "bg-blue-500/10 border border-blue-500/20"
                    )}>
                        <p className="text-sm font-medium mb-1">
                            {answers.get(currentQuestion.id)?.correct ? "✓ Correct!" : "Explanation:"}
                        </p>
                        <p className="text-sm text-white/70">{currentQuestion.explanation}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    {!showResult ? (
                        <button
                            onClick={handleCheck}
                            disabled={selectedAnswers.length === 0}
                            className={cn(
                                "px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2",
                                selectedAnswers.length > 0
                                    ? "bg-white text-black hover:bg-white/90"
                                    : "bg-white/10 text-white/40 cursor-not-allowed"
                            )}
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
                        >
                            {currentIndex < questions.length - 1 ? (
                                <>
                                    Next Question
                                    <ChevronRight className="h-4 w-4" />
                                </>
                            ) : (
                                "See Results"
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// SAMPLE QUIZ DATA
// =============================================================================

export const sampleQuizQuestions: QuizQuestion[] = [
    {
        id: "q1",
        type: "multiple-choice",
        question: "What does LLM stand for in the context of AI?",
        options: [
            { id: "a", text: "Large Language Model" },
            { id: "b", text: "Linear Learning Machine" },
            { id: "c", text: "Logical Language Module" },
            { id: "d", text: "Long-term Learning Memory" },
        ],
        correctAnswers: ["a"],
        explanation: "LLM stands for Large Language Model. These are AI models trained on massive amounts of text data to understand and generate human-like text.",
        hint: "Think about what ChatGPT and GPT-4 are commonly referred to as.",
    },
    {
        id: "q2",
        type: "multi-select",
        question: "Which of the following are examples of generative AI applications?",
        options: [
            { id: "a", text: "ChatGPT for text generation" },
            { id: "b", text: "DALL-E for image creation" },
            { id: "c", text: "Traditional spam filters" },
            { id: "d", text: "GitHub Copilot for code generation" },
        ],
        correctAnswers: ["a", "b", "d"],
        explanation: "ChatGPT, DALL-E, and GitHub Copilot are all generative AI applications that create new content. Traditional spam filters are classification systems, not generative AI.",
    },
    {
        id: "q3",
        type: "true-false",
        question: "Prompt engineering refers to the practice of designing effective inputs for AI models to get desired outputs.",
        options: [
            { id: "true", text: "True" },
            { id: "false", text: "False" },
        ],
        correctAnswers: ["true"],
        explanation: "Correct! Prompt engineering is the art of crafting effective prompts to guide AI models toward producing the desired output. It's a crucial skill for working with LLMs.",
    },
];
