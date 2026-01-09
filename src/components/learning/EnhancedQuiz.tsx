"use client";

import { useState, useCallback } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Check,
    X,
    HelpCircle,
    Lightbulb,
    ChevronRight,
    RotateCcw,
    Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint?: string;
}

interface EnhancedQuizProps {
    questions: QuizQuestion[];
    title?: string;
    onComplete: (score: number, total: number) => void;
    showHints?: boolean;
    allowRetry?: boolean;
}

export function EnhancedQuiz({
    questions,
    title = "Knowledge Check",
    onComplete,
    showHints = true,
    allowRetry = true,
}: EnhancedQuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [results, setResults] = useState<boolean[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const score = results.filter(Boolean).length;

    const handleSelect = useCallback((optionIndex: number) => {
        if (hasAnswered) return;
        setSelectedOption(optionIndex);
    }, [hasAnswered]);

    const handleSubmit = useCallback(() => {
        if (selectedOption === null) return;
        setHasAnswered(true);
        setResults([...results, isCorrect]);
    }, [selectedOption, isCorrect, results]);

    const handleNext = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setHasAnswered(false);
            setShowHint(false);
        } else {
            setIsComplete(true);
            onComplete(score + (isCorrect ? 1 : 0), questions.length);
        }
    }, [currentIndex, questions.length, onComplete, score, isCorrect]);

    const handleRetry = useCallback(() => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setHasAnswered(false);
        setShowHint(false);
        setResults([]);
        setIsComplete(false);
    }, []);

    // Completion screen
    if (isComplete) {
        const finalScore = results.filter(Boolean).length;
        const percentage = Math.round((finalScore / questions.length) * 100);
        const passed = percentage >= 70;

        return (
            <Card className="p-8 bg-white/[0.02] border-white/10 text-center">
                <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                    passed ? "bg-emerald-500/20" : "bg-amber-500/20"
                )}>
                    {passed ? (
                        <Trophy className="h-10 w-10 text-emerald-400" />
                    ) : (
                        <RotateCcw className="h-10 w-10 text-amber-400" />
                    )}
                </div>

                <h2 className="text-2xl font-bold mb-2">
                    {passed ? "Quiz Complete!" : "Keep Learning!"}
                </h2>
                <p className="text-white/60 mb-6">
                    You scored {finalScore} out of {questions.length} ({percentage}%)
                </p>

                {/* Score breakdown */}
                <div className="flex justify-center gap-2 mb-6">
                    {results.map((correct, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-3 h-3 rounded-full",
                                correct ? "bg-emerald-500" : "bg-red-500"
                            )}
                        />
                    ))}
                </div>

                <div className="flex gap-3 justify-center">
                    {!passed && allowRetry && (
                        <Button variant="outline" onClick={handleRetry} className="gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Try Again
                        </Button>
                    )}
                    <Button onClick={() => onComplete(finalScore, questions.length)}>
                        Continue
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">
                        <HelpCircle className="h-3 w-3 mr-1" />
                        {title}
                    </Badge>
                    <p className="text-sm text-white/50">
                        Question {currentIndex + 1} of {questions.length}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-white/50">Score</p>
                    <p className="font-semibold">{score}/{currentIndex}</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question */}
            <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrectOption = index === currentQuestion.correctIndex;

                    let optionClass = "border-white/10 hover:border-white/30";
                    if (hasAnswered) {
                        if (isCorrectOption) {
                            optionClass = "border-emerald-500 bg-emerald-500/10";
                        } else if (isSelected && !isCorrectOption) {
                            optionClass = "border-red-500 bg-red-500/10";
                        }
                    } else if (isSelected) {
                        optionClass = "border-primary bg-primary/10";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={hasAnswered}
                            className={cn(
                                "w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                                optionClass,
                                !hasAnswered && "cursor-pointer"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium",
                                hasAnswered && isCorrectOption
                                    ? "bg-emerald-500 text-white"
                                    : hasAnswered && isSelected && !isCorrectOption
                                        ? "bg-red-500 text-white"
                                        : isSelected
                                            ? "bg-primary text-white"
                                            : "bg-white/10"
                            )}>
                                {hasAnswered && isCorrectOption ? (
                                    <Check className="h-4 w-4" />
                                ) : hasAnswered && isSelected && !isCorrectOption ? (
                                    <X className="h-4 w-4" />
                                ) : (
                                    String.fromCharCode(65 + index)
                                )}
                            </div>
                            <span className="flex-1">{option}</span>
                        </button>
                    );
                })}
            </div>

            {/* Hint */}
            {showHints && currentQuestion.hint && !hasAnswered && (
                <div className="mb-4">
                    {showHint ? (
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 mb-2 text-amber-400">
                                <Lightbulb className="h-4 w-4" />
                                <span className="font-medium text-sm">Hint</span>
                            </div>
                            <p className="text-sm text-white/70">{currentQuestion.hint}</p>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowHint(true)}
                            className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                            <Lightbulb className="h-4 w-4" />
                            Show hint
                        </button>
                    )}
                </div>
            )}

            {/* Explanation (after answer) */}
            {hasAnswered && (
                <div className={cn(
                    "p-4 rounded-xl mb-4",
                    isCorrect
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-blue-500/10 border border-blue-500/20"
                )}>
                    <p className={cn(
                        "font-medium mb-2",
                        isCorrect ? "text-emerald-400" : "text-blue-400"
                    )}>
                        {isCorrect ? "✓ Correct!" : "Explanation"}
                    </p>
                    <p className="text-sm text-white/70">{currentQuestion.explanation}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
                {!hasAnswered ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                )}
            </div>
        </Card>
    );
}

// Single question quiz for inline use
export function InlineQuiz({
    question,
    options,
    correctIndex,
    explanation,
    onAnswer,
}: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    onAnswer?: (correct: boolean) => void;
}) {
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);

    const handleAnswer = (index: number) => {
        if (answered) return;
        setSelected(index);
        setAnswered(true);
        onAnswer?.(index === correctIndex);
    };

    return (
        <div className="my-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="font-medium mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                {question}
            </p>
            <div className="space-y-2">
                {options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={answered}
                        className={cn(
                            "w-full p-3 rounded-lg text-left text-sm transition-all",
                            answered && i === correctIndex
                                ? "bg-emerald-500/20 border border-emerald-500/30"
                                : answered && i === selected
                                    ? "bg-red-500/20 border border-red-500/30"
                                    : "bg-white/5 hover:bg-white/10 border border-transparent"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {answered && (
                <p className="mt-3 text-sm text-white/70">{explanation}</p>
            )}
        </div>
    );
}
