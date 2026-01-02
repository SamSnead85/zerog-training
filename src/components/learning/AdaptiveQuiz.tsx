// Adaptive Quiz Component - Adjusts difficulty based on performance
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAdaptiveLearning, DifficultyLevel, SkillDimension, QuizAttempt } from '@/lib/adaptive';
import { CheckCircle, XCircle, ArrowRight, Sparkles, Timer } from 'lucide-react';

export interface AdaptiveQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    dimension: SkillDimension;
    difficulty: DifficultyLevel;
    explanation?: string;
}

interface AdaptiveQuizProps {
    questions: AdaptiveQuestion[];
    onComplete: (score: number, total: number) => void;
    title?: string;
}

export function AdaptiveQuiz({ questions, onComplete, title = 'Knowledge Check' }: AdaptiveQuizProps) {
    const { currentDifficulty, recordAttempt, profile } = useAdaptiveLearning();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [timeSpent, setTimeSpent] = useState(0);
    const [showingDifficultyChange, setShowingDifficultyChange] = useState(false);

    // Filter questions based on current difficulty - prioritize appropriate level
    const filteredQuestions = useCallback(() => {
        // Get questions at or near current difficulty
        const levels: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
        const currentLevelIndex = levels.indexOf(currentDifficulty);

        // Include current level and one level up/down
        const validLevels = levels.filter((_, i) =>
            Math.abs(i - currentLevelIndex) <= 1
        );

        const filtered = questions.filter(q => validLevels.includes(q.difficulty));

        // If not enough questions at difficulty, include all
        return filtered.length >= 5 ? filtered : questions;
    }, [questions, currentDifficulty]);

    const activeQuestions = filteredQuestions();
    const currentQuestion = activeQuestions[currentIndex];
    const isComplete = currentIndex >= activeQuestions.length;

    // Reset timer on new question
    useEffect(() => {
        setQuestionStartTime(Date.now());
    }, [currentIndex]);

    const handleAnswer = (index: number) => {
        if (showResult) return;

        setSelectedAnswer(index);
        const timeOnQuestion = Math.round((Date.now() - questionStartTime) / 1000);
        setTimeSpent(timeOnQuestion);
        setShowResult(true);

        const isCorrect = index === currentQuestion.correctIndex;
        if (isCorrect) setScore(s => s + 1);

        // Record attempt for adaptive learning
        const attempt: QuizAttempt = {
            questionId: currentQuestion.id,
            dimension: currentQuestion.dimension,
            difficulty: currentQuestion.difficulty,
            correct: isCorrect,
            timeSpent: timeOnQuestion,
        };
        recordAttempt(attempt);
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setShowResult(false);

        if (currentIndex + 1 >= activeQuestions.length) {
            onComplete(score, activeQuestions.length);
        } else {
            setCurrentIndex(i => i + 1);
        }
    };

    if (isComplete) {
        const percentage = Math.round((score / activeQuestions.length) * 100);
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quiz Complete!</h3>
                <p className="text-white/70 mb-4">
                    You scored {score} out of {activeQuestions.length} ({percentage}%)
                </p>
                {percentage >= 80 && (
                    <p className="text-emerald-400 text-sm">
                        Excellent! Your difficulty level may increase to challenge you further.
                    </p>
                )}
                {percentage < 50 && (
                    <p className="text-amber-400 text-sm">
                        Keep practicing! We&apos;ll adjust the content to help you master these concepts.
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white/60">
                        {currentIndex + 1} / {activeQuestions.length}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70 capitalize">
                        {currentQuestion.difficulty}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                />
            </div>

            {/* Question */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white text-lg mb-6">{currentQuestion.question}</p>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, i) => {
                        const isSelected = selectedAnswer === i;
                        const isCorrect = i === currentQuestion.correctIndex;
                        const showCorrect = showResult && isCorrect;
                        const showIncorrect = showResult && isSelected && !isCorrect;

                        return (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                disabled={showResult}
                                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-200
                  ${!showResult && 'hover:bg-white/10 cursor-pointer'}
                  ${isSelected && !showResult && 'bg-white/20 ring-2 ring-blue-500'}
                  ${showCorrect && 'bg-emerald-500/20 ring-2 ring-emerald-500'}
                  ${showIncorrect && 'bg-red-500/20 ring-2 ring-red-500'}
                  ${!isSelected && showResult && !isCorrect && 'opacity-50'}
                  bg-white/5 border border-white/10
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm text-white/70">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    <span className="text-white flex-1">{option}</span>
                                    {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                                    {showIncorrect && <XCircle className="w-5 h-5 text-red-400" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {showResult && currentQuestion.explanation && (
                    <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-sm text-white/80">{currentQuestion.explanation}</p>
                    </div>
                )}
            </div>

            {/* Continue button */}
            {showResult && (
                <button
                    onClick={handleNext}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                    {currentIndex + 1 >= activeQuestions.length ? 'See Results' : 'Next Question'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
