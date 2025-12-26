"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Trophy,
    Brain,
    ArrowRight,
    Lightbulb,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    difficulty: "easy" | "medium" | "hard";
    points: number;
}

interface AdaptiveQuizProps {
    questions: QuizQuestion[];
    moduleTitle: string;
    onComplete: (score: number, answers: number[]) => void;
}

export function AdaptiveQuiz({ questions, moduleTitle, onComplete }: AdaptiveQuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [streak, setStreak] = useState(0);
    const [timer, setTimer] = useState(30);
    const [isComplete, setIsComplete] = useState(false);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    // Timer countdown
    useEffect(() => {
        if (isSubmitted || isComplete) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentIndex, isSubmitted, isComplete]);

    const handleSubmit = () => {
        if (selectedAnswer === null) {
            setSelectedAnswer(-1); // Mark as unanswered
        }

        const isCorrect = selectedAnswer === currentQuestion.correctIndex;

        if (isCorrect) {
            const bonusPoints = streak >= 2 ? 10 : 0;
            setScore((prev) => prev + currentQuestion.points + bonusPoints);
            setStreak((prev) => prev + 1);
        } else {
            setStreak(0);
        }

        setAnswers((prev) => [...prev, selectedAnswer ?? -1]);
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
            setShowHint(false);
            setTimer(30);
        } else {
            setIsComplete(true);
            onComplete(score, answers);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy": return "text-emerald-500 bg-emerald-500/10";
            case "medium": return "text-blue-500 bg-blue-500/10";
            case "hard": return "text-purple-500 bg-purple-500/10";
            default: return "text-muted-foreground bg-muted";
        }
    };

    if (isComplete) {
        const percentage = Math.round((score / questions.reduce((a, q) => a + q.points, 0)) * 100);
        const passed = percentage >= 70;

        return (
            <Card className="p-8 text-center">
                <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                    {passed ? (
                        <Trophy className="h-10 w-10 text-emerald-500" />
                    ) : (
                        <Brain className="h-10 w-10 text-amber-500" />
                    )}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                    {passed ? "Assessment Complete!" : "Keep Practicing!"}
                </h2>
                <p className="text-muted-foreground mb-6">
                    You scored {score} points ({percentage}%)
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <p className="text-2xl font-bold text-primary">{answers.filter((a, i) => a === questions[i].correctIndex).length}</p>
                        <p className="text-xs text-muted-foreground">Correct</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <p className="text-2xl font-bold">{questions.length}</p>
                        <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <p className="text-2xl font-bold text-emerald-500">+{score}</p>
                        <p className="text-xs text-muted-foreground">XP Earned</p>
                    </div>
                </div>

                <div className="flex gap-3 justify-center">
                    <Button variant="outline">Review Answers</Button>
                    <Button>Continue Learning</Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    {streak >= 2 && (
                        <div className="flex items-center gap-1 text-primary">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-medium">{streak} streak!</span>
                        </div>
                    )}
                    <div className={cn(
                        "flex items-center gap-1.5 text-sm",
                        timer <= 10 ? "text-red-500" : "text-muted-foreground"
                    )}>
                        <Clock className="h-4 w-4" />
                        {timer}s
                    </div>
                    <Badge variant="secondary">{score} pts</Badge>
                </div>
            </div>

            {/* Progress */}
            <Progress value={progress} className="h-1" />

            {/* Question */}
            <div className="p-6">
                <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, i) => {
                        const isSelected = selectedAnswer === i;
                        const isCorrect = i === currentQuestion.correctIndex;

                        let optionClass = "bg-white/[0.02] border-white/10 hover:border-white/20";
                        if (isSubmitted) {
                            if (isCorrect) {
                                optionClass = "bg-emerald-500/10 border-emerald-500/30";
                            } else if (isSelected && !isCorrect) {
                                optionClass = "bg-red-500/10 border-red-500/30";
                            }
                        } else if (isSelected) {
                            optionClass = "bg-primary/10 border-primary/30";
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => !isSubmitted && setSelectedAnswer(i)}
                                disabled={isSubmitted}
                                className={cn(
                                    "w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                                    optionClass
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0",
                                    isSubmitted && isCorrect
                                        ? "bg-emerald-500 text-white"
                                        : isSubmitted && isSelected && !isCorrect
                                            ? "bg-red-500 text-white"
                                            : isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-white/5"
                                )}>
                                    {isSubmitted && isCorrect ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : isSubmitted && isSelected && !isCorrect ? (
                                        <XCircle className="h-4 w-4" />
                                    ) : (
                                        String.fromCharCode(65 + i)
                                    )}
                                </div>
                                <span>{option}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Hint */}
                {!isSubmitted && (
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                        <Lightbulb className="h-4 w-4" />
                        {showHint ? "Hide hint" : "Show hint"}
                    </button>
                )}
                {showHint && !isSubmitted && (
                    <p className="mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        Think about the key principles discussed in this module...
                    </p>
                )}

                {/* Explanation */}
                {isSubmitted && (
                    <Card className={cn(
                        "p-4 mt-4",
                        selectedAnswer === currentQuestion.correctIndex
                            ? "bg-emerald-500/10 border-emerald-500/20"
                            : "bg-amber-500/10 border-amber-500/20"
                    )}>
                        <p className="text-sm font-medium mb-1">
                            {selectedAnswer === currentQuestion.correctIndex ? "Correct!" : "Not quite"}
                        </p>
                        <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                    </Card>
                )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border flex justify-between">
                <div className="text-sm text-muted-foreground">
                    +{currentQuestion.points} pts {streak >= 2 && <span className="text-primary">+10 streak bonus</span>}
                </div>
                {!isSubmitted ? (
                    <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
                        Submit Answer
                    </Button>
                ) : (
                    <Button onClick={handleNext} className="gap-2">
                        {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </Card>
    );
}

// Demo wrapper with sample questions
export function AdaptiveQuizDemo({ moduleTitle }: { moduleTitle: string }) {
    const sampleQuestions: QuizQuestion[] = [
        {
            id: "1",
            question: "What is the primary benefit of using agile methodologies in enterprise environments?",
            options: [
                "Faster project completion with fixed scope",
                "Improved adaptability to changing requirements",
                "Reduced need for team collaboration",
                "Elimination of project management overhead",
            ],
            correctIndex: 1,
            explanation: "Agile methodologies prioritize adaptability and iterative development, allowing teams to respond quickly to changing requirements and stakeholder feedback.",
            difficulty: "easy",
            points: 10,
        },
        {
            id: "2",
            question: "Which technique is most effective for facilitating productive retrospectives?",
            options: [
                "Having the manager lead all discussions",
                "Focusing only on what went wrong",
                "Using structured activities with equal participation",
                "Keeping the meeting as short as possible",
            ],
            correctIndex: 2,
            explanation: "Structured activities ensure all team members can contribute equally, leading to more comprehensive insights and actionable improvements.",
            difficulty: "medium",
            points: 15,
        },
        {
            id: "3",
            question: "In a scaled agile framework, how should cross-team dependencies be managed?",
            options: [
                "Each team should work independently without coordination",
                "Through regular synchronization events and shared planning",
                "By reducing team autonomy and centralizing decisions",
                "Dependencies should be eliminated entirely",
            ],
            correctIndex: 1,
            explanation: "Regular synchronization events (like Scrum of Scrums) and shared planning sessions help teams coordinate while maintaining autonomy.",
            difficulty: "hard",
            points: 20,
        },
    ];

    return (
        <AdaptiveQuiz
            questions={sampleQuestions}
            moduleTitle={moduleTitle}
            onComplete={(score, answers) => {
                console.log("Quiz completed:", { score, answers });
            }}
        />
    );
}
