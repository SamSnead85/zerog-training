"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Clock,
    BookOpen,
    Target,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyStats {
    day: string;
    date: string;
    minutesLearned: number;
    coursesCompleted: number;
    quizzesPassed: number;
}

const mockWeeklyData: WeeklyStats[] = [
    { day: "Mon", date: "Dec 23", minutesLearned: 45, coursesCompleted: 0, quizzesPassed: 2 },
    { day: "Tue", date: "Dec 24", minutesLearned: 30, coursesCompleted: 1, quizzesPassed: 1 },
    { day: "Wed", date: "Dec 25", minutesLearned: 0, coursesCompleted: 0, quizzesPassed: 0 },
    { day: "Thu", date: "Dec 26", minutesLearned: 60, coursesCompleted: 1, quizzesPassed: 3 },
    { day: "Fri", date: "Dec 27", minutesLearned: 75, coursesCompleted: 0, quizzesPassed: 2 },
    { day: "Sat", date: "Dec 28", minutesLearned: 25, coursesCompleted: 0, quizzesPassed: 1 },
    { day: "Sun", date: "Dec 29", minutesLearned: 0, coursesCompleted: 0, quizzesPassed: 0 },
];

const maxMinutes = Math.max(...mockWeeklyData.map(d => d.minutesLearned));

export function WeeklyProgressChart() {
    const [data, setData] = useState(mockWeeklyData);

    const totalMinutes = data.reduce((acc, d) => acc + d.minutesLearned, 0);
    const totalCourses = data.reduce((acc, d) => acc + d.coursesCompleted, 0);
    const totalQuizzes = data.reduce((acc, d) => acc + d.quizzesPassed, 0);
    const avgMinutes = Math.round(totalMinutes / 7);

    // Compare to last week (mock)
    const lastWeekMinutes = 180;
    const percentChange = Math.round(((totalMinutes - lastWeekMinutes) / lastWeekMinutes) * 100);

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Weekly Progress
                    </h3>
                    <p className="text-sm text-muted-foreground">Dec 23 - Dec 29, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        This Week
                    </Button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-muted">
                    <div className="text-2xl font-bold">{totalMinutes}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        Minutes
                    </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                    <div className="text-2xl font-bold">{totalCourses}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        Courses
                    </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                    <div className="text-2xl font-bold">{totalQuizzes}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Target className="h-3 w-3" />
                        Quizzes
                    </div>
                </div>
                <div className={cn(
                    "text-center p-3 rounded-lg",
                    percentChange >= 0 ? "bg-emerald-500/10" : "bg-red-500/10"
                )}>
                    <div className={cn(
                        "text-2xl font-bold flex items-center justify-center gap-1",
                        percentChange >= 0 ? "text-emerald-500" : "text-red-500"
                    )}>
                        {percentChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        {Math.abs(percentChange)}%
                    </div>
                    <div className="text-xs text-muted-foreground">vs Last Week</div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-32 mb-2">
                {data.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-full max-w-[40px] rounded-t-md transition-all",
                                    day.minutesLearned > 0
                                        ? "bg-primary hover:bg-primary/80"
                                        : "bg-muted"
                                )}
                                style={{
                                    height: day.minutesLearned > 0
                                        ? `${(day.minutesLearned / maxMinutes) * 100}px`
                                        : "8px"
                                }}
                            />
                            {day.minutesLearned > 0 && (
                                <span className="absolute -top-5 text-xs font-medium">
                                    {day.minutesLearned}m
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Day Labels */}
            <div className="flex justify-between gap-2">
                {data.map((day, index) => (
                    <div key={index} className="flex-1 text-center">
                        <span className={cn(
                            "text-xs",
                            day.minutesLearned > 0
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                        )}>
                            {day.day}
                        </span>
                    </div>
                ))}
            </div>

            {/* Goal Progress */}
            <div className="mt-6 p-3 rounded-lg bg-muted">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Weekly Goal: 300 minutes</span>
                    <span className="text-sm text-muted-foreground">{totalMinutes}/300 ({Math.round((totalMinutes / 300) * 100)}%)</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.min((totalMinutes / 300) * 100, 100)}%` }}
                    />
                </div>
            </div>
        </Card>
    );
}
