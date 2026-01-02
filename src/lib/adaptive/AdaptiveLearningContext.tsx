// Adaptive Learning Context - React context for managing skill profiles
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    SkillProfile,
    QuizAttempt,
    PerformanceData,
    createInitialProfile,
    updateSkillProfile,
    generateRecommendations,
    getNextDifficulty,
    DifficultyLevel
} from './skill-assessment';

interface AdaptiveLearningContextType {
    profile: SkillProfile;
    performance: PerformanceData;
    recommendations: string[];
    currentDifficulty: DifficultyLevel;
    recordAttempt: (attempt: QuizAttempt) => void;
    resetProfile: () => void;
    isLoading: boolean;
}

const AdaptiveLearningContext = createContext<AdaptiveLearningContextType | undefined>(undefined);

const STORAGE_KEY = 'scalednative_skill_profile';
const ATTEMPTS_KEY = 'scalednative_quiz_attempts';

export function AdaptiveLearningProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<SkillProfile>(createInitialProfile());
    const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem(STORAGE_KEY);
            const savedAttempts = localStorage.getItem(ATTEMPTS_KEY);

            if (savedProfile) {
                const parsed = JSON.parse(savedProfile);
                parsed.lastUpdated = new Date(parsed.lastUpdated);
                setProfile(parsed);
            }

            if (savedAttempts) {
                setRecentAttempts(JSON.parse(savedAttempts));
            }
        } catch (error) {
            console.error('Error loading skill profile:', error);
        }
        setIsLoading(false);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
            localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(recentAttempts.slice(-50))); // Keep last 50
        }
    }, [profile, recentAttempts, isLoading]);

    // Calculate performance metrics from recent attempts
    const performance: PerformanceData = React.useMemo(() => {
        const recent = recentAttempts.slice(-10);
        if (recent.length === 0) {
            return {
                recentAccuracy: 50,
                averageTimePerQuestion: 30,
                consistencyScore: 50,
                streak: 0,
            };
        }

        const correctCount = recent.filter(a => a.correct).length;
        const accuracy = (correctCount / recent.length) * 100;
        const avgTime = recent.reduce((sum, a) => sum + a.timeSpent, 0) / recent.length;

        // Calculate streak (consecutive correct from end)
        let streak = 0;
        for (let i = recent.length - 1; i >= 0; i--) {
            if (recent[i].correct) streak++;
            else break;
        }

        // Consistency: low variance in accuracy
        const consistencyScore = Math.min(100, 100 - (Math.abs(accuracy - 70) * 0.5));

        return {
            recentAccuracy: accuracy,
            averageTimePerQuestion: avgTime,
            consistencyScore,
            streak,
        };
    }, [recentAttempts]);

    const recommendations = React.useMemo(() => generateRecommendations(profile), [profile]);
    const currentDifficulty = React.useMemo(() => getNextDifficulty(performance), [performance]);

    const recordAttempt = (attempt: QuizAttempt) => {
        const updatedProfile = updateSkillProfile(profile, attempt);
        setProfile(updatedProfile);
        setRecentAttempts(prev => [...prev, attempt]);
    };

    const resetProfile = () => {
        setProfile(createInitialProfile());
        setRecentAttempts([]);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
    };

    return (
        <AdaptiveLearningContext.Provider
            value={{
                profile,
                performance,
                recommendations,
                currentDifficulty,
                recordAttempt,
                resetProfile,
                isLoading,
            }}
        >
            {children}
        </AdaptiveLearningContext.Provider>
    );
}

export function useAdaptiveLearning() {
    const context = useContext(AdaptiveLearningContext);
    if (context === undefined) {
        throw new Error('useAdaptiveLearning must be used within an AdaptiveLearningProvider');
    }
    return context;
}
