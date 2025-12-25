"use client";

import { useState, useEffect, useCallback } from "react";

export interface ModuleProgress {
    moduleId: string;
    completedLessons: number[];
    quizScores: Record<number, number>; // lessonIndex -> score percentage
    totalLessons: number;
    lastAccessedLesson: number;
    lastAccessedAt: string;
    completedAt?: string;
}

interface ProgressStore {
    modules: Record<string, ModuleProgress>;
    streakDays: number;
    lastActiveDate: string;
    totalPointsEarned: number;
}

const STORAGE_KEY = "zerog_learning_progress";

function getInitialStore(): ProgressStore {
    if (typeof window === "undefined") {
        return {
            modules: {},
            streakDays: 0,
            lastActiveDate: "",
            totalPointsEarned: 0,
        };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse progress from localStorage:", e);
    }

    return {
        modules: {},
        streakDays: 0,
        lastActiveDate: "",
        totalPointsEarned: 0,
    };
}

export function useProgress(moduleId?: string) {
    const [store, setStore] = useState<ProgressStore>(getInitialStore);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = getInitialStore();
        setStore(stored);
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever store changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        }
    }, [store, isLoaded]);

    // Update streak
    useEffect(() => {
        if (!isLoaded) return;

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

        if (store.lastActiveDate === today) {
            // Already active today, do nothing
        } else if (store.lastActiveDate === yesterday) {
            // Streak continues
            setStore(prev => ({
                ...prev,
                streakDays: prev.streakDays + 1,
                lastActiveDate: today,
            }));
        } else if (store.lastActiveDate !== today) {
            // Streak reset or first activity
            setStore(prev => ({
                ...prev,
                streakDays: prev.lastActiveDate ? 1 : 1,
                lastActiveDate: today,
            }));
        }
    }, [isLoaded]);

    // Get progress for a specific module
    const getModuleProgress = useCallback((id: string): ModuleProgress | null => {
        return store.modules[id] || null;
    }, [store.modules]);

    // Calculate completion percentage for a module
    const getCompletionPercentage = useCallback((id: string): number => {
        const progress = store.modules[id];
        if (!progress || progress.totalLessons === 0) return 0;
        return Math.round((progress.completedLessons.length / progress.totalLessons) * 100);
    }, [store.modules]);

    // Mark a lesson as completed
    const completeLesson = useCallback((
        id: string,
        lessonIndex: number,
        totalLessons: number,
        quizScore?: number
    ) => {
        setStore(prev => {
            const existing = prev.modules[id] || {
                moduleId: id,
                completedLessons: [],
                quizScores: {},
                totalLessons,
                lastAccessedLesson: 0,
                lastAccessedAt: new Date().toISOString(),
            };

            const completedLessons = existing.completedLessons.includes(lessonIndex)
                ? existing.completedLessons
                : [...existing.completedLessons, lessonIndex].sort((a, b) => a - b);

            const quizScores = quizScore !== undefined
                ? { ...existing.quizScores, [lessonIndex]: quizScore }
                : existing.quizScores;

            const isComplete = completedLessons.length >= totalLessons;
            const pointsForLesson = 20;
            const bonusForCompletion = isComplete && !existing.completedAt ? 100 : 0;

            return {
                ...prev,
                modules: {
                    ...prev.modules,
                    [id]: {
                        ...existing,
                        completedLessons,
                        quizScores,
                        totalLessons,
                        lastAccessedLesson: lessonIndex,
                        lastAccessedAt: new Date().toISOString(),
                        completedAt: isComplete ? new Date().toISOString() : undefined,
                    },
                },
                totalPointsEarned: prev.totalPointsEarned + pointsForLesson + bonusForCompletion,
            };
        });
    }, []);

    // Update last accessed lesson (for resume feature)
    const updateLastAccessed = useCallback((id: string, lessonIndex: number, totalLessons: number) => {
        setStore(prev => {
            const existing = prev.modules[id] || {
                moduleId: id,
                completedLessons: [],
                quizScores: {},
                totalLessons,
                lastAccessedLesson: 0,
                lastAccessedAt: new Date().toISOString(),
            };

            return {
                ...prev,
                modules: {
                    ...prev.modules,
                    [id]: {
                        ...existing,
                        totalLessons,
                        lastAccessedLesson: lessonIndex,
                        lastAccessedAt: new Date().toISOString(),
                    },
                },
            };
        });
    }, []);

    // Get all modules with progress
    const getAllProgress = useCallback(() => {
        return Object.values(store.modules);
    }, [store.modules]);

    // Get current module progress
    const currentProgress = moduleId ? getModuleProgress(moduleId) : null;
    const currentCompletion = moduleId ? getCompletionPercentage(moduleId) : 0;

    return {
        isLoaded,
        streakDays: store.streakDays,
        totalPoints: store.totalPointsEarned,
        currentProgress,
        currentCompletion,
        getModuleProgress,
        getCompletionPercentage,
        completeLesson,
        updateLastAccessed,
        getAllProgress,
    };
}

// Hook for getting resume learning suggestions
export function useResumeLearning() {
    const { getAllProgress, isLoaded } = useProgress();
    const [resumeSuggestion, setResumeSuggestion] = useState<ModuleProgress | null>(null);

    useEffect(() => {
        if (!isLoaded) return;

        const allProgress = getAllProgress();

        // Find the most recently accessed incomplete module
        const inProgress = allProgress
            .filter(p => p.completedLessons.length < p.totalLessons)
            .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime());

        setResumeSuggestion(inProgress[0] || null);
    }, [isLoaded, getAllProgress]);

    return { resumeSuggestion, isLoaded };
}
