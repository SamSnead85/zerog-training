"use client";

import { useEffect, useState, useCallback } from "react";

interface LessonProgress {
    lessonId: string;
    moduleId?: string;
    sectionIndex: number;
    completedSections: string[];
    scrollPosition: number;
    lastAccessedAt: string;
    timeSpentSeconds: number;
}

const STORAGE_KEY = 'scalednative_lesson_progress';

export function useLessonProgress(lessonId: string, moduleId?: string) {
    const [progress, setProgress] = useState<LessonProgress | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load progress from localStorage
    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const allProgress = JSON.parse(storedData) as Record<string, LessonProgress>;
                const lessonProgress = allProgress[lessonId];
                if (lessonProgress) {
                    setProgress(lessonProgress);
                }
            }
        } catch (error) {
            console.error('Failed to load lesson progress:', error);
        }
        setIsLoaded(true);
    }, [lessonId]);

    // Save progress to localStorage
    const saveProgress = useCallback((updates: Partial<LessonProgress>) => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            const allProgress = storedData ? JSON.parse(storedData) : {};

            const newProgress: LessonProgress = {
                lessonId,
                moduleId,
                sectionIndex: updates.sectionIndex ?? progress?.sectionIndex ?? 0,
                completedSections: updates.completedSections ?? progress?.completedSections ?? [],
                scrollPosition: updates.scrollPosition ?? progress?.scrollPosition ?? 0,
                lastAccessedAt: new Date().toISOString(),
                timeSpentSeconds: updates.timeSpentSeconds ?? progress?.timeSpentSeconds ?? 0,
            };

            allProgress[lessonId] = newProgress;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
            setProgress(newProgress);
        } catch (error) {
            console.error('Failed to save lesson progress:', error);
        }
    }, [lessonId, moduleId, progress]);

    // Update section index
    const updateSection = useCallback((sectionIndex: number) => {
        saveProgress({ sectionIndex });
    }, [saveProgress]);

    // Mark section complete
    const markSectionComplete = useCallback((sectionId: string) => {
        const currentCompleted = progress?.completedSections ?? [];
        if (!currentCompleted.includes(sectionId)) {
            saveProgress({ completedSections: [...currentCompleted, sectionId] });
        }
    }, [progress, saveProgress]);

    // Update scroll position
    const updateScrollPosition = useCallback((scrollPosition: number) => {
        saveProgress({ scrollPosition });
    }, [saveProgress]);

    // Add time spent
    const addTimeSpent = useCallback((seconds: number) => {
        const currentTime = progress?.timeSpentSeconds ?? 0;
        saveProgress({ timeSpentSeconds: currentTime + seconds });
    }, [progress, saveProgress]);

    // Clear progress
    const clearProgress = useCallback(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const allProgress = JSON.parse(storedData);
                delete allProgress[lessonId];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
            }
            setProgress(null);
        } catch (error) {
            console.error('Failed to clear lesson progress:', error);
        }
    }, [lessonId]);

    return {
        progress,
        isLoaded,
        saveProgress,
        updateSection,
        markSectionComplete,
        updateScrollPosition,
        addTimeSpent,
        clearProgress,
    };
}

// Hook to get all recent lessons for "Continue where you left off"
export function useRecentLessons(limit = 5) {
    const [recentLessons, setRecentLessons] = useState<LessonProgress[]>([]);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const allProgress = JSON.parse(storedData) as Record<string, LessonProgress>;
                const lessons = Object.values(allProgress)
                    .filter(p => p.completedSections.length < 100) // Not fully complete
                    .sort((a, b) =>
                        new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
                    )
                    .slice(0, limit);
                setRecentLessons(lessons);
            }
        } catch (error) {
            console.error('Failed to load recent lessons:', error);
        }
    }, [limit]);

    return recentLessons;
}

// Hook to track time spent on current session
export function useTimeTracking(lessonId: string) {
    const { addTimeSpent } = useLessonProgress(lessonId);

    useEffect(() => {
        let seconds = 0;
        const interval = setInterval(() => {
            seconds += 10;
        }, 10000); // Update every 10 seconds

        // Save on unmount
        return () => {
            clearInterval(interval);
            if (seconds > 0) {
                addTimeSpent(seconds);
            }
        };
    }, [lessonId, addTimeSpent]);
}

// Format time spent for display
export function formatTimeSpent(seconds: number): string {
    if (seconds < 60) return 'Less than 1 min';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}
