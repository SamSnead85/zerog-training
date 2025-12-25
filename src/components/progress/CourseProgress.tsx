"use client";

import { useProgress } from "@/hooks/useProgress";

interface CourseProgressProps {
    moduleId: string;
    totalLessons: number;
    className?: string;
}

export function CourseProgress({ moduleId, totalLessons, className = "" }: CourseProgressProps) {
    const { getCompletionPercentage, getModuleProgress, isLoaded } = useProgress();

    if (!isLoaded) return null;

    const progress = getModuleProgress(moduleId);
    const percentage = getCompletionPercentage(moduleId);

    if (!progress || percentage === 0) return null;

    const completedCount = progress.completedLessons.length;

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                    {completedCount}/{totalLessons} lessons
                </span>
                <span className="text-xs font-medium text-primary">
                    {percentage}%
                </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export function ResumeButton({ moduleId, totalLessons }: { moduleId: string; totalLessons: number }) {
    const { getModuleProgress, isLoaded } = useProgress();

    if (!isLoaded) return null;

    const progress = getModuleProgress(moduleId);

    if (!progress) return null;

    const nextLesson = progress.completedLessons.length < totalLessons
        ? Math.max(...progress.completedLessons, -1) + 1
        : progress.lastAccessedLesson;

    return (
        <a
            href={`/module/${moduleId}/learn/${nextLesson}`}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
            Continue →
        </a>
    );
}
