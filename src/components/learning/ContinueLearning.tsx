"use client";

import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import { Clock, ArrowRight, BookOpen, Play } from "lucide-react";
import { useRecentLessons, formatTimeSpent } from "@/hooks/useLessonProgress";

interface ContinueLearningProps {
    className?: string;
}

export function ContinueLearning({ className }: ContinueLearningProps) {
    const recentLessons = useRecentLessons(3);

    if (recentLessons.length === 0) {
        return null;
    }

    return (
        <Card className={`p-6 bg-white/[0.02] border-white/10 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Continue Learning
                </h3>
                <Link
                    href="/learn"
                    className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                    View all
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="space-y-3">
                {recentLessons.map((lesson) => (
                    <Link
                        key={lesson.lessonId}
                        href={`/learn/lesson/${lesson.lessonId}?section=${lesson.sectionIndex}`}
                        className="block group"
                    >
                        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                    {formatLessonId(lesson.lessonId)}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <Progress
                                        completed={lesson.completedSections.length}
                                        total={10} // Approximate
                                    />
                                    <span className="text-xs text-white/40 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatTimeSpent(lesson.timeSpentSeconds)}
                                    </span>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}

function Progress({ completed, total }: { completed: number; total: number }) {
    const percentage = Math.min((completed / total) * 100, 100);
    return (
        <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-xs text-white/50">{Math.round(percentage)}%</span>
        </div>
    );
}

function formatLessonId(lessonId: string): string {
    // Convert slug to title case
    return lessonId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
