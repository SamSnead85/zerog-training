"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ChevronRight,
    ChevronLeft,
    Clock,
    Check,
    X,
    AlertTriangle,
    Brain,
    Trophy,
    Flag,
    RotateCcw,
    ArrowUpDown,
    Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface QuizQuestion {
    id: string;
    type: "multiple-choice" | "multiple-select" | "ordering" | "fill-blank" | "scenario";
    question: string;
    options?: string[];
    correctAnswer: number | number[] | string;
    explanation: string;
    difficulty: "easy" | "medium" | "hard";
    points: number;
}

export interface AssessmentConfig {
    title: string;
    description: string;
    questions: QuizQuestion[];
    timeLimit?: number; // in minutes
    passingScore: number; // percentage
    shuffleQuestions?: boolean;
    showExplanations?: boolean;
    allowReview?: boolean;
    maxAttempts?: number;
}

export interface AssessmentResult {
    score: number;
    totalPoints: number;
    percentage: number;
    passed: boolean;
    timeSpent: number;
    answeredQuestions: {
        questionId: string;
        userAnswer: number | number[] | string | null;
        correct: boolean;
        pointsEarned: number;
    }[];
}

interface AssessmentEngineProps {
    config: AssessmentConfig;
    onComplete: (result: AssessmentResult) => void;
    onExit?: () => void;
}

export function AssessmentEngine({ config, onComplete, onExit }: AssessmentEngineProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number | number[] | string | null>>({});
    const [flagged, setFlagged] = useState<Set<string>>(new Set());
    const [showReview, setShowReview] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(config.timeLimit ? config.timeLimit * 60 : null);
    const [startTime] = useState(Date.now());

    // Ordering state
    const [orderItems, setOrderItems] = useState<string[]>([]);

    const questions = config.questions;
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    // Timer
    useEffect(() => {
        if (!timeRemaining || showResults) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev === null || prev <= 0) {
                    clearInterval(timer);
                    submitAssessment();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, showResults]);

    // Initialize ordering items
    useEffect(() => {
        if (currentQuestion?.type === "ordering" && currentQuestion.options) {
            const savedOrder = answers[currentQuestion.id] as number[] | null;
            if (savedOrder) {
                setOrderItems(savedOrder.map(i => currentQuestion.options![i]));
            } else {
                setOrderItems([...currentQuestion.options]);
            }
        }
    }, [currentIndex, currentQuestion]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (answer: number | number[] | string) => {
        setAnswers({ ...answers, [currentQuestion.id]: answer });
    };

    const handleMultiSelect = (optionIndex: number) => {
        const current = (answers[currentQuestion.id] as number[] | null) || [];
        const newAnswer = current.includes(optionIndex)
            ? current.filter(i => i !== optionIndex)
            : [...current, optionIndex];
        handleAnswer(newAnswer);
    };

    const moveOrderItem = (fromIndex: number, direction: 'up' | 'down') => {
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
        if (toIndex < 0 || toIndex >= orderItems.length) return;

        const newItems = [...orderItems];
        [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
        setOrderItems(newItems);

        // Save the order as indices relative to original options
        const orderIndices = newItems.map(item => currentQuestion.options!.indexOf(item));
        handleAnswer(orderIndices);
    };

    const toggleFlag = () => {
        const newFlagged = new Set(flagged);
        if (newFlagged.has(currentQuestion.id)) {
            newFlagged.delete(currentQuestion.id);
        } else {
            newFlagged.add(currentQuestion.id);
        }
        setFlagged(newFlagged);
    };

    const goToQuestion = (index: number) => {
        setCurrentIndex(index);
        setShowReview(false);
    };

    const submitAssessment = useCallback(() => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        let totalScore = 0;
        let totalPoints = 0;

        const answeredQuestions = questions.map(q => {
            totalPoints += q.points;
            const userAnswer = answers[q.id] || null;
            let correct = false;

            if (userAnswer !== null) {
                if (q.type === "multiple-choice" || q.type === "scenario") {
                    correct = userAnswer === q.correctAnswer;
                } else if (q.type === "multiple-select") {
                    const correctArr = q.correctAnswer as number[];
                    const userArr = userAnswer as number[];
                    correct = correctArr.length === userArr.length &&
                        correctArr.every(v => userArr.includes(v));
                } else if (q.type === "ordering") {
                    const correctArr = q.correctAnswer as number[];
                    const userArr = userAnswer as number[];
                    correct = correctArr.every((v, i) => v === userArr[i]);
                } else if (q.type === "fill-blank") {
                    correct = (userAnswer as string).toLowerCase().trim() ===
                        (q.correctAnswer as string).toLowerCase().trim();
                }
            }

            const pointsEarned = correct ? q.points : 0;
            totalScore += pointsEarned;

            return { questionId: q.id, userAnswer, correct, pointsEarned };
        });

        const percentage = Math.round((totalScore / totalPoints) * 100);
        const assessmentResult: AssessmentResult = {
            score: totalScore,
            totalPoints,
            percentage,
            passed: percentage >= config.passingScore,
            timeSpent,
            answeredQuestions
        };

        setResult(assessmentResult);
        setShowResults(true);
        onComplete(assessmentResult);
    }, [questions, answers, startTime, config.passingScore, onComplete]);

    // Review Mode
    if (showReview && !showResults) {
        return (
            <Card className="p-6 bg-white/[0.02] border-white/10">
                <h2 className="text-xl font-bold mb-4">Review Assessment</h2>
                <p className="text-muted-foreground mb-6">
                    Review your answers before submitting. Click on any question to edit your answer.
                </p>

                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
                    {questions.map((q, i) => {
                        const answered = answers[q.id] !== undefined;
                        const isFlagged = flagged.has(q.id);

                        return (
                            <button
                                key={q.id}
                                onClick={() => goToQuestion(i)}
                                className={cn(
                                    "w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium transition-all",
                                    answered
                                        ? "bg-primary/20 border-primary/50"
                                        : "bg-white/5 border-white/10",
                                    isFlagged && "ring-2 ring-amber-500/50"
                                )}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary/20 border border-primary/50" />
                        Answered
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-white/5 border border-white/10" />
                        Unanswered
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded ring-2 ring-amber-500/50" />
                        Flagged
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => setShowReview(false)}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Questions
                    </Button>
                    <Button onClick={submitAssessment} className="bg-emerald-600 hover:bg-emerald-700">
                        Submit Assessment
                    </Button>
                </div>
            </Card>
        );
    }

    // Results Mode
    if (showResults && result) {
        return (
            <Card className="p-8 bg-white/[0.02] border-white/10">
                <div className="text-center mb-8">
                    <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4",
                        result.passed
                            ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20"
                            : "bg-gradient-to-br from-red-500/20 to-red-600/20"
                    )}>
                        {result.passed ? (
                            <Trophy className="h-12 w-12 text-emerald-400" />
                        ) : (
                            <AlertTriangle className="h-12 w-12 text-red-400" />
                        )}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                        {result.passed ? "Congratulations! You Passed!" : "Assessment Not Passed"}
                    </h2>
                    <p className="text-muted-foreground">
                        {result.passed
                            ? "You have successfully completed this assessment."
                            : `You need ${config.passingScore}% to pass. Please review and try again.`}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                        <p className={cn(
                            "text-4xl font-bold",
                            result.passed ? "text-emerald-400" : "text-red-400"
                        )}>
                            {result.percentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">Final Score</p>
                    </Card>
                    <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                        <p className="text-4xl font-bold text-primary">
                            {result.score}/{result.totalPoints}
                        </p>
                        <p className="text-sm text-muted-foreground">Points Earned</p>
                    </Card>
                    <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                        <p className="text-4xl font-bold text-amber-400">
                            {formatTime(result.timeSpent)}
                        </p>
                        <p className="text-sm text-muted-foreground">Time Spent</p>
                    </Card>
                </div>

                {/* Question Review */}
                {config.showExplanations && (
                    <div className="space-y-4 mb-8">
                        <h3 className="font-semibold">Question Review</h3>
                        {questions.map((q, i) => {
                            const answered = result.answeredQuestions.find(a => a.questionId === q.id);
                            return (
                                <div
                                    key={q.id}
                                    className={cn(
                                        "p-4 rounded-xl border",
                                        answered?.correct
                                            ? "bg-emerald-500/5 border-emerald-500/20"
                                            : "bg-red-500/5 border-red-500/20"
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="font-medium text-sm">Q{i + 1}: {q.question}</span>
                                        {answered?.correct ? (
                                            <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Lightbulb className="h-4 w-4 text-amber-400" />
                                        <span className="text-sm text-muted-foreground">{q.explanation}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="flex items-center justify-center gap-4">
                    {!result.passed && (
                        <Button variant="outline" onClick={() => {
                            setAnswers({});
                            setCurrentIndex(0);
                            setShowResults(false);
                            setResult(null);
                            setTimeRemaining(config.timeLimit ? config.timeLimit * 60 : null);
                        }}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Try Again
                        </Button>
                    )}
                    <Button onClick={onExit}>
                        {result.passed ? "Continue to Certificate" : "Return to Module"}
                    </Button>
                </div>
            </Card>
        );
    }

    // Question Mode
    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="font-semibold">{config.title}</h2>
                        <p className="text-sm text-muted-foreground">
                            Question {currentIndex + 1} of {questions.length}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {timeRemaining !== null && (
                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1 rounded-full",
                                timeRemaining < 60 ? "bg-red-500/20 text-red-400" : "bg-white/10"
                            )}>
                                <Clock className="h-4 w-4" />
                                <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
                            </div>
                        )}
                        <Badge className={cn(
                            currentQuestion.difficulty === "easy" && "bg-emerald-500/20 text-emerald-400",
                            currentQuestion.difficulty === "medium" && "bg-amber-500/20 text-amber-400",
                            currentQuestion.difficulty === "hard" && "bg-red-500/20 text-red-400"
                        )}>
                            {currentQuestion.points} pts
                        </Badge>
                    </div>
                </div>
                <Progress value={progress} className="h-1.5" />
            </Card>

            {/* Question */}
            <Card className="p-6 bg-white/[0.02] border-white/10 min-h-[400px]">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="capitalize">
                            {currentQuestion.type.replace("-", " ")}
                        </Badge>
                    </div>
                    <Button
                        variant={flagged.has(currentQuestion.id) ? "default" : "ghost"}
                        size="sm"
                        onClick={toggleFlag}
                        className={flagged.has(currentQuestion.id) ? "bg-amber-500/20 text-amber-400" : ""}
                    >
                        <Flag className="h-4 w-4 mr-1" />
                        {flagged.has(currentQuestion.id) ? "Flagged" : "Flag"}
                    </Button>
                </div>

                <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>

                {/* Multiple Choice */}
                {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className={cn(
                                    "w-full p-4 rounded-xl border text-left transition-all",
                                    answers[currentQuestion.id] === i
                                        ? "border-primary bg-primary/10"
                                        : "border-white/10 hover:border-white/20"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                        answers[currentQuestion.id] === i
                                            ? "bg-primary text-white"
                                            : "bg-white/10"
                                    )}>
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    <span>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Multiple Select */}
                {currentQuestion.type === "multiple-select" && currentQuestion.options && (
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground mb-4">Select all that apply</p>
                        {currentQuestion.options.map((option, i) => {
                            const selected = ((answers[currentQuestion.id] as number[]) || []).includes(i);
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleMultiSelect(i)}
                                    className={cn(
                                        "w-full p-4 rounded-xl border text-left transition-all",
                                        selected
                                            ? "border-primary bg-primary/10"
                                            : "border-white/10 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-6 h-6 rounded flex items-center justify-center",
                                            selected ? "bg-primary" : "border border-white/20"
                                        )}>
                                            {selected && <Check className="h-4 w-4 text-white" />}
                                        </div>
                                        <span>{option}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Scenario (same as multiple choice) */}
                {currentQuestion.type === "scenario" && currentQuestion.options && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className={cn(
                                    "w-full p-4 rounded-xl border text-left transition-all",
                                    answers[currentQuestion.id] === i
                                        ? "border-primary bg-primary/10"
                                        : "border-white/10 hover:border-white/20"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                        answers[currentQuestion.id] === i
                                            ? "bg-primary text-white"
                                            : "bg-white/10"
                                    )}>
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    <span>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Ordering */}
                {currentQuestion.type === "ordering" && (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground mb-4">Drag to reorder or use arrows</p>
                        {orderItems.map((item, i) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                            >
                                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-medium">
                                    {i + 1}
                                </span>
                                <span className="flex-1">{item}</span>
                                <div className="flex flex-col gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => moveOrderItem(i, 'up')}
                                        disabled={i === 0}
                                    >
                                        <ArrowUpDown className="h-3 w-3 rotate-180" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => moveOrderItem(i, 'down')}
                                        disabled={i === orderItems.length - 1}
                                    >
                                        <ArrowUpDown className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Fill in the Blank */}
                {currentQuestion.type === "fill-blank" && (
                    <div>
                        <input
                            type="text"
                            value={(answers[currentQuestion.id] as string) || ""}
                            onChange={(e) => handleAnswer(e.target.value)}
                            placeholder="Type your answer..."
                            className="w-full p-4 rounded-xl border border-white/10 bg-white/[0.02] focus:border-primary focus:outline-none"
                        />
                    </div>
                )}
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>

                <div className="flex gap-2">
                    {currentIndex < questions.length - 1 ? (
                        <Button onClick={() => setCurrentIndex(currentIndex + 1)}>
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={() => setShowReview(true)} className="bg-emerald-600 hover:bg-emerald-700">
                            Review & Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
