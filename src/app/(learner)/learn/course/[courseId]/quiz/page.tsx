"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    CheckCircle2,
    XCircle,
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Trophy,
    Clock,
    Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface QuizQuestion {
    id: string;
    type: "mcq" | "tf" | "short";
    question: string;
    options?: string[];
    answer: number | boolean | string;
    explanation: string;
}

export default function ModuleQuizPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = parseInt(params.courseId as string);

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number | boolean | string>>({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeSpent, setTimeSpent] = useState(0);
    const [reviewMode, setReviewMode] = useState(false);

    // Load quiz questions
    useEffect(() => {
        async function loadQuiz() {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/content/quiz?module=${moduleId}`);
                const data = await res.json();
                if (data.success && data.questions) {
                    // Shuffle questions
                    const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
                    setQuestions(shuffled.slice(0, 10)); // Take 10 questions
                }
            } catch (error) {
                console.error("Failed to load quiz:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadQuiz();
    }, [moduleId]);

    // Timer
    useEffect(() => {
        if (!showResults && !isLoading) {
            const timer = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showResults, isLoading]);

    const currentQuestion = questions[currentIndex];
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / questions.length) * 100);

    const handleAnswer = (value: number | boolean | string) => {
        setAnswers(prev => ({ ...prev, [currentIndex]: value }));
        setShowExplanation(true);
    };

    const calculateScore = useCallback(() => {
        let correct = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.answer) correct++;
        });
        return {
            correct,
            total: questions.length,
            percentage: Math.round((correct / questions.length) * 100),
            passed: correct / questions.length >= 0.75,
        };
    }, [questions, answers]);

    const handleSubmit = async () => {
        const score = calculateScore();
        setShowResults(true);

        if (score.passed) {
            // Celebration!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }

        // Save progress
        await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                moduleId,
                lessonId: `quiz-${moduleId}`,
                completed: true,
                quizScore: score.percentage,
                timeSpent,
            }),
        });
    };

    const handleRetry = () => {
        setAnswers({});
        setCurrentIndex(0);
        setShowResults(false);
        setShowExplanation(false);
        setReviewMode(false);
        setTimeSpent(0);
        // Reshuffle questions
        setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded w-1/2 mx-auto" />
                    <div className="h-64 bg-muted rounded mt-8" />
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Quiz Not Available</h1>
                <p className="text-muted-foreground mb-6">
                    No questions available for this module yet.
                </p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    if (showResults && !reviewMode) {
        const score = calculateScore();

        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className={cn(
                    "h-24 w-24 rounded-full mx-auto mb-6 flex items-center justify-center",
                    score.passed ? "bg-emerald-500/20" : "bg-amber-500/20"
                )}>
                    {score.passed ? (
                        <Trophy className="h-12 w-12 text-emerald-500" />
                    ) : (
                        <RotateCcw className="h-12 w-12 text-amber-500" />
                    )}
                </div>

                <h1 className="text-3xl font-bold mb-2">
                    {score.passed ? "Excellent Work!" : "Keep Learning!"}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                    {score.passed
                        ? "You've demonstrated strong understanding of this module."
                        : "Review the material and try again. You need 75% to pass."}
                </p>

                <div className="bg-muted rounded-2xl p-8 mb-8">
                    <div className="text-6xl font-bold mb-2">{score.percentage}%</div>
                    <div className="text-muted-foreground">
                        {score.correct} of {score.total} correct
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Completed in {formatTime(timeSpent)}</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => setReviewMode(true)}>
                        Review Answers
                    </Button>
                    <Button variant="outline" onClick={handleRetry}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    {score.passed && (
                        <Button onClick={() => router.push(`/learn/course/${moduleId + 1}`)}>
                            Next Module
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background border-b">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Badge variant="outline">
                            Question {currentIndex + 1} of {questions.length}
                        </Badge>
                        <Progress value={progress} className="w-32 h-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        {!reviewMode && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(timeSpent)}</span>
                            </div>
                        )}
                        {reviewMode && (
                            <Button variant="outline" onClick={() => setReviewMode(false)}>
                                Exit Review
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <Card className="p-8">
                    {/* Question */}
                    <h2 className="text-xl font-medium mb-8">{currentQuestion.question}</h2>

                    {/* Options */}
                    {currentQuestion.type === "mcq" && currentQuestion.options && (
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = answers[currentIndex] === idx;
                                const isCorrect = idx === currentQuestion.answer;
                                const showCorrectness = showExplanation || reviewMode;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => !showExplanation && !reviewMode && handleAnswer(idx)}
                                        disabled={showExplanation || reviewMode}
                                        className={cn(
                                            "w-full p-4 text-left rounded-lg border transition-all",
                                            isSelected && !showCorrectness && "border-primary bg-primary/10",
                                            showCorrectness && isCorrect && "border-emerald-500 bg-emerald-500/10",
                                            showCorrectness && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                                            !isSelected && !showCorrectness && "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            {showCorrectness && isCorrect && (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            )}
                                            {showCorrectness && isSelected && !isCorrect && (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            )}
                                            {!showCorrectness && (
                                                <div className={cn(
                                                    "h-5 w-5 rounded-full border-2",
                                                    isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                                                )} />
                                            )}
                                            <span>{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* True/False */}
                    {currentQuestion.type === "tf" && (
                        <div className="flex gap-4">
                            {[true, false].map((value) => {
                                const isSelected = answers[currentIndex] === value;
                                const isCorrect = value === currentQuestion.answer;
                                const showCorrectness = showExplanation || reviewMode;

                                return (
                                    <button
                                        key={String(value)}
                                        onClick={() => !showExplanation && !reviewMode && handleAnswer(value)}
                                        disabled={showExplanation || reviewMode}
                                        className={cn(
                                            "flex-1 p-4 rounded-lg border transition-all font-medium",
                                            isSelected && !showCorrectness && "border-primary bg-primary/10",
                                            showCorrectness && isCorrect && "border-emerald-500 bg-emerald-500/10",
                                            showCorrectness && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                                            !isSelected && !showCorrectness && "border-border hover:border-primary/50"
                                        )}
                                    >
                                        {value ? "True" : "False"}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Explanation */}
                    {(showExplanation || reviewMode) && (
                        <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary">
                            <h4 className="font-medium mb-2">Explanation</h4>
                            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                        <Button
                            variant="outline"
                            disabled={currentIndex === 0}
                            onClick={() => {
                                setCurrentIndex(prev => prev - 1);
                                setShowExplanation(reviewMode || answers[currentIndex - 1] !== undefined);
                            }}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        {currentIndex < questions.length - 1 ? (
                            <Button
                                disabled={answers[currentIndex] === undefined && !reviewMode}
                                onClick={() => {
                                    setCurrentIndex(prev => prev + 1);
                                    setShowExplanation(reviewMode || answers[currentIndex + 1] !== undefined);
                                }}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        ) : !reviewMode ? (
                            <Button
                                disabled={answeredCount < questions.length}
                                onClick={handleSubmit}
                            >
                                Submit Quiz
                            </Button>
                        ) : null}
                    </div>
                </Card>

                {/* Question Navigator */}
                <div className="mt-6 flex justify-center gap-2 flex-wrap">
                    {questions.map((_, idx) => {
                        const isAnswered = answers[idx] !== undefined;
                        const isCurrent = idx === currentIndex;
                        const isCorrect = reviewMode && answers[idx] === questions[idx].answer;
                        const isWrong = reviewMode && isAnswered && !isCorrect;

                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    setShowExplanation(reviewMode || answers[idx] !== undefined);
                                }}
                                className={cn(
                                    "h-8 w-8 rounded text-sm font-medium transition-colors",
                                    isCurrent && "ring-2 ring-primary",
                                    isAnswered && !reviewMode && "bg-primary text-primary-foreground",
                                    !isAnswered && !reviewMode && "bg-muted",
                                    reviewMode && isCorrect && "bg-emerald-500 text-white",
                                    reviewMode && isWrong && "bg-red-500 text-white",
                                    reviewMode && !isAnswered && "bg-muted"
                                )}
                            >
                                {idx + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
