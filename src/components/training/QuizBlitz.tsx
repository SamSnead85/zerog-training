"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Timer,
    Zap,
    Trophy,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    RefreshCw,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    difficulty: "easy" | "medium" | "hard";
}

interface QuizBlitzProps {
    questions?: QuizQuestion[];
    timePerQuestion?: number;
    onComplete?: (score: number, total: number) => void;
}

const sampleQuestions: QuizQuestion[] = [
    {
        id: "1",
        question: "What is the primary purpose of multi-factor authentication (MFA)?",
        options: [
            "To speed up the login process",
            "To add additional layers of security beyond just a password",
            "To remember user passwords",
            "To track user activity"
        ],
        correctIndex: 1,
        explanation: "MFA adds security layers by requiring multiple forms of verification, making unauthorized access much harder.",
        difficulty: "easy"
    },
    {
        id: "2",
        question: "Which of the following is NOT a common sign of a phishing email?",
        options: [
            "Generic greeting like 'Dear Customer'",
            "Urgent call to action",
            "Email from a known colleague with proper formatting",
            "Suspicious attachments"
        ],
        correctIndex: 2,
        explanation: "Legitimate emails from known colleagues with proper formatting are typically safe. Phishing emails often contain red flags like generic greetings and urgency.",
        difficulty: "medium"
    },
    {
        id: "3",
        question: "Under HIPAA, what is the 'minimum necessary' rule?",
        options: [
            "Use the minimum password length",
            "Access only the minimum PHI needed for a task",
            "Store minimum patient records",
            "Hire minimum staff"
        ],
        correctIndex: 1,
        explanation: "The minimum necessary rule requires covered entities to limit PHI access to only what's necessary for the intended purpose.",
        difficulty: "medium"
    },
];

const difficultyPoints = {
    easy: 10,
    medium: 20,
    hard: 30
};

export function QuizBlitz({
    questions = sampleQuestions,
    timePerQuestion = 30,
    onComplete
}: QuizBlitzProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timePerQuestion);
    const [isComplete, setIsComplete] = useState(false);
    const [answers, setAnswers] = useState<{ correct: boolean; time: number }[]>([]);

    const currentQuestion = questions[currentIndex];

    // Timer
    useEffect(() => {
        if (showResult || isComplete) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex, showResult, isComplete]);

    const handleSubmit = () => {
        if (showResult) return;

        const isCorrect = selectedAnswer === currentQuestion.correctIndex;
        const timeUsed = timePerQuestion - timeLeft;

        setAnswers(prev => [...prev, { correct: isCorrect, time: timeUsed }]);

        if (isCorrect) {
            const points = difficultyPoints[currentQuestion.difficulty];
            const streakBonus = streak >= 2 ? Math.floor(points * 0.5) : 0;
            setScore(prev => prev + points + streakBonus);
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }

        setShowResult(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setTimeLeft(timePerQuestion);
        } else {
            setIsComplete(true);
            onComplete?.(score, questions.length);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setStreak(0);
        setTimeLeft(timePerQuestion);
        setIsComplete(false);
        setAnswers([]);
    };

    if (isComplete) {
        const correctCount = answers.filter(a => a.correct).length;
        const percentage = Math.round((correctCount / questions.length) * 100);

        return (
            <Card className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground mb-6">
                    You scored {correctCount} out of {questions.length} ({percentage}%)
                </p>

                <div className="flex justify-center gap-6 mb-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{score}</div>
                        <div className="text-xs text-muted-foreground">Points Earned</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">{Math.max(...answers.filter(a => a.correct).map((_, i, arr) => {
                            let streak = 0;
                            for (let j = i; j < arr.length; j++) {
                                if (answers[j]?.correct) streak++;
                                else break;
                            }
                            return streak;
                        }), 0)}</div>
                        <div className="text-xs text-muted-foreground">Best Streak</div>
                    </div>
                </div>

                <Button onClick={handleRestart} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Badge variant="outline">
                        Question {currentIndex + 1}/{questions.length}
                    </Badge>
                    <Badge className={cn(
                        "text-xs",
                        currentQuestion.difficulty === "easy" && "bg-emerald-500/20 text-emerald-500",
                        currentQuestion.difficulty === "medium" && "bg-amber-500/20 text-amber-500",
                        currentQuestion.difficulty === "hard" && "bg-red-500/20 text-red-500"
                    )}>
                        {currentQuestion.difficulty} (+{difficultyPoints[currentQuestion.difficulty]} pts)
                    </Badge>
                </div>
                <div className="flex items-center gap-4">
                    {streak >= 2 && (
                        <Badge className="bg-orange-500/20 text-orange-500 animate-pulse">
                            🔥 {streak}x Streak!
                        </Badge>
                    )}
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold">{score}</span>
                    </div>
                </div>
            </div>

            {/* Timer */}
            <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        Time Remaining
                    </span>
                    <span className={cn(
                        "font-mono font-bold",
                        timeLeft <= 10 && "text-red-500 animate-pulse"
                    )}>
                        {timeLeft}s
                    </span>
                </div>
                <Progress
                    value={(timeLeft / timePerQuestion) * 100}
                    className={cn("h-2", timeLeft <= 10 && "[&>div]:bg-red-500")}
                />
            </div>

            {/* Question */}
            <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctIndex;

                    return (
                        <button
                            key={index}
                            onClick={() => !showResult && setSelectedAnswer(index)}
                            disabled={showResult}
                            className={cn(
                                "w-full p-4 rounded-lg border text-left transition-all",
                                !showResult && isSelected && "border-primary bg-primary/5",
                                !showResult && !isSelected && "border-border hover:border-primary/30",
                                showResult && isCorrect && "border-emerald-500 bg-emerald-500/10",
                                showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                                    isSelected && "border-primary bg-primary text-primary-foreground"
                                )}>
                                    {showResult && isCorrect ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        String.fromCharCode(65 + index)
                                    )}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Explanation */}
            {showResult && (
                <div className={cn(
                    "p-4 rounded-lg mb-4",
                    selectedAnswer === currentQuestion.correctIndex
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-amber-500/10 border border-amber-500/20"
                )}>
                    <p className="text-sm">{currentQuestion.explanation}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
                {!showResult ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button onClick={handleNext} className="gap-1">
                        {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </Card>
    );
}
