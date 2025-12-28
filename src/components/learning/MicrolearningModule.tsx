"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Clock,
    Zap,
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Check,
    X,
    Brain,
    Calendar,
    Bell,
    Sparkles,
    Target,
    Play,
    Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MicroLesson {
    id: string;
    title: string;
    content: string;
    keyPoint: string;
    example?: string;
    quiz?: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    };
    duration: string;
}

interface SpacedRepetitionCard {
    id: string;
    front: string;
    back: string;
    category: string;
    lastReviewed?: string;
    nextReview?: string;
    ease: number; // 1-4 difficulty rating
    interval: number; // days until next review
}

const promptEngineeringMicroLessons: MicroLesson[] = [
    {
        id: "1",
        title: "The CRAFT Framework",
        content: "CRAFT stands for Context, Role, Action, Format, and Tone. Each element helps structure prompts for consistent, high-quality outputs.",
        keyPoint: "CRAFT = Context + Role + Action + Format + Tone",
        example: "Context: 'You are my AI assistant'\nRole: 'Act as an expert copywriter'\nAction: 'Write a product description'\nFormat: 'Use bullet points'\nTone: 'Professional yet friendly'",
        duration: "2 min",
    },
    {
        id: "2",
        title: "Chain-of-Thought Prompting",
        content: "Chain-of-Thought (CoT) prompting asks the AI to 'think step by step' before answering. This dramatically improves accuracy on complex reasoning tasks.",
        keyPoint: "Add 'Let's think step by step' for better reasoning",
        example: "Without CoT: 'What's 15% of 240?'\n\nWith CoT: 'What's 15% of 240? Let's work through this step by step.'",
        quiz: {
            question: "What phrase triggers chain-of-thought reasoning?",
            options: ["Think carefully", "Let's think step by step", "Be thorough", "Calculate precisely"],
            correctIndex: 1,
            explanation: "The phrase 'Let's think step by step' is the standard trigger for chain-of-thought prompting.",
        },
        duration: "3 min",
    },
    {
        id: "3",
        title: "Few-Shot Learning",
        content: "Provide 2-5 examples of the desired output format. The AI learns the pattern and applies it to new inputs.",
        keyPoint: "Examples teach patterns better than instructions alone",
        example: "Input: 'Happy' → Output: 'Joyful, elated, content'\nInput: 'Sad' → Output: 'Melancholy, gloomy, sorrowful'\nInput: 'Angry' → ???",
        duration: "2 min",
    },
];

const spacedRepetitionCards: SpacedRepetitionCard[] = [
    { id: "1", front: "What does CRAFT stand for in prompt engineering?", back: "Context, Role, Action, Format, Tone", category: "Fundamentals", ease: 3, interval: 3 },
    { id: "2", front: "What phrase triggers chain-of-thought reasoning?", back: "'Let's think step by step'", category: "Techniques", ease: 2, interval: 1 },
    { id: "3", front: "How many examples for few-shot learning?", back: "2-5 examples is optimal", category: "Techniques", ease: 4, interval: 7 },
    { id: "4", front: "What is the ReAct pattern?", back: "Reasoning + Acting - AI explains reasoning then takes action", category: "Advanced", ease: 1, interval: 1 },
];

export function MicrolearningModule() {
    const [activeTab, setActiveTab] = useState<"lessons" | "review">("lessons");
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Spaced repetition state
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);
    const [cardsReviewed, setCardsReviewed] = useState(0);

    const currentLesson = promptEngineeringMicroLessons[currentLessonIndex];
    const currentCard = spacedRepetitionCards[currentCardIndex];
    const lessonProgress = ((currentLessonIndex + 1) / promptEngineeringMicroLessons.length) * 100;

    const handleQuizSubmit = () => {
        setShowResult(true);
    };

    const handleNextLesson = () => {
        if (currentLessonIndex < promptEngineeringMicroLessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
            setShowQuiz(false);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handleCardFlip = () => {
        setShowBack(!showBack);
    };

    const handleCardRating = (rating: number) => {
        // In production, this would update the spaced repetition algorithm
        setShowBack(false);
        setCardsReviewed(cardsReviewed + 1);
        if (currentCardIndex < spacedRepetitionCards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            setCurrentCardIndex(0);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Zap className="h-7 w-7 text-amber-400" />
                        Microlearning
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Bite-sized lessons with spaced repetition
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 gap-1">
                        <Clock className="h-3 w-3" />
                        2-3 min each
                    </Badge>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
                {[
                    { id: "lessons", label: "Quick Lessons", icon: Sparkles },
                    { id: "review", label: "Spaced Review", icon: Brain },
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                                activeTab === tab.id
                                    ? "bg-white/10 text-white"
                                    : "text-muted-foreground hover:text-white"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Quick Lessons Tab */}
            {activeTab === "lessons" && (
                <div className="space-y-6">
                    {/* Progress */}
                    <Card className="p-4 bg-white/[0.02] border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                Lesson {currentLessonIndex + 1} of {promptEngineeringMicroLessons.length}
                            </span>
                            <span className="text-sm font-medium">{Math.round(lessonProgress)}%</span>
                        </div>
                        <Progress value={lessonProgress} className="h-1.5" />
                    </Card>

                    {/* Lesson Card */}
                    <Card className="p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10">
                        <div className="flex items-start justify-between mb-4">
                            <Badge className="bg-primary/20 text-primary border-primary/30">
                                {currentLesson.duration}
                            </Badge>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => currentLessonIndex > 0 && setCurrentLessonIndex(currentLessonIndex - 1)}
                                    disabled={currentLessonIndex === 0}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleNextLesson}
                                    disabled={currentLessonIndex === promptEngineeringMicroLessons.length - 1}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4">{currentLesson.title}</h3>
                        <p className="text-muted-foreground mb-6">{currentLesson.content}</p>

                        {/* Key Point */}
                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Key Takeaway</span>
                            </div>
                            <p className="font-mono text-sm">{currentLesson.keyPoint}</p>
                        </div>

                        {/* Example */}
                        {currentLesson.example && (
                            <div className="p-4 rounded-xl bg-black/30 border border-white/10 mb-6">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Example</span>
                                <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{currentLesson.example}</pre>
                            </div>
                        )}

                        {/* Quiz */}
                        {currentLesson.quiz && !showQuiz && (
                            <Button onClick={() => setShowQuiz(true)} className="w-full gap-2">
                                <Brain className="h-4 w-4" />
                                Test Your Knowledge
                            </Button>
                        )}

                        {currentLesson.quiz && showQuiz && (
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                                <p className="font-medium mb-4">{currentLesson.quiz.question}</p>
                                <div className="space-y-2 mb-4">
                                    {currentLesson.quiz.options.map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() => !showResult && setSelectedAnswer(i)}
                                            disabled={showResult}
                                            className={cn(
                                                "w-full p-3 rounded-lg border text-left transition-all text-sm",
                                                selectedAnswer === i && !showResult && "border-primary bg-primary/10",
                                                showResult && i === currentLesson.quiz!.correctIndex && "border-emerald-500 bg-emerald-500/10",
                                                showResult && selectedAnswer === i && i !== currentLesson.quiz!.correctIndex && "border-red-500 bg-red-500/10"
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                {!showResult ? (
                                    <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null} className="w-full">
                                        Submit Answer
                                    </Button>
                                ) : (
                                    <div className={cn(
                                        "p-3 rounded-lg text-sm",
                                        selectedAnswer === currentLesson.quiz.correctIndex
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-red-500/10 text-red-400"
                                    )}>
                                        {currentLesson.quiz.explanation}
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {/* Spaced Review Tab */}
            {activeTab === "review" && (
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                            <p className="text-2xl font-bold text-amber-400">{spacedRepetitionCards.length}</p>
                            <p className="text-xs text-muted-foreground">Cards Due</p>
                        </Card>
                        <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                            <p className="text-2xl font-bold text-emerald-400">{cardsReviewed}</p>
                            <p className="text-xs text-muted-foreground">Reviewed Today</p>
                        </Card>
                        <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                            <p className="text-2xl font-bold text-primary">85%</p>
                            <p className="text-xs text-muted-foreground">Retention Rate</p>
                        </Card>
                    </div>

                    {/* Flashcard */}
                    <div
                        onClick={handleCardFlip}
                        className="cursor-pointer perspective-1000"
                    >
                        <Card className={cn(
                            "p-8 min-h-[250px] flex flex-col items-center justify-center text-center transition-all duration-500 transform-style-3d",
                            showBack && "rotate-y-180"
                        )}>
                            <Badge className="mb-4" variant="outline">{currentCard.category}</Badge>
                            {!showBack ? (
                                <p className="text-xl font-semibold">{currentCard.front}</p>
                            ) : (
                                <p className="text-xl text-primary">{currentCard.back}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-4">
                                Tap to {showBack ? "see question" : "reveal answer"}
                            </p>
                        </Card>
                    </div>

                    {/* Rating Buttons */}
                    {showBack && (
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: "Again", color: "red", rating: 1 },
                                { label: "Hard", color: "amber", rating: 2 },
                                { label: "Good", color: "blue", rating: 3 },
                                { label: "Easy", color: "emerald", rating: 4 },
                            ].map((btn) => (
                                <Button
                                    key={btn.rating}
                                    variant="outline"
                                    onClick={() => handleCardRating(btn.rating)}
                                    className={cn(
                                        "flex-col h-auto py-3",
                                        btn.color === "red" && "hover:border-red-500 hover:text-red-400",
                                        btn.color === "amber" && "hover:border-amber-500 hover:text-amber-400",
                                        btn.color === "blue" && "hover:border-blue-500 hover:text-blue-400",
                                        btn.color === "emerald" && "hover:border-emerald-500 hover:text-emerald-400"
                                    )}
                                >
                                    <span className="font-medium">{btn.label}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {btn.rating === 1 && "<1 min"}
                                        {btn.rating === 2 && "1 day"}
                                        {btn.rating === 3 && "3 days"}
                                        {btn.rating === 4 && "7 days"}
                                    </span>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
