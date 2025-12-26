"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Zap,
    Brain,
    Target,
    LineChart,
    CheckCircle2,
    XCircle,
    Clock,
    Lightbulb,
    TrendingUp,
    Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillMastery {
    skill: string;
    level: number;
    trend: "up" | "down" | "stable";
    lastPracticed: string;
}

interface LearningPattern {
    dayOfWeek: string;
    avgMinutes: number;
    isToday: boolean;
}

interface WeakArea {
    topic: string;
    score: number;
    suggestedCourse: string;
}

interface PersonalizedInsightsProps {
    userId: string;
}

// Mock data
const skillMasteries: SkillMastery[] = [
    { skill: "Agile Methodology", level: 85, trend: "up", lastPracticed: "Today" },
    { skill: "Leadership", level: 72, trend: "up", lastPracticed: "2 days ago" },
    { skill: "Data Analysis", level: 45, trend: "stable", lastPracticed: "1 week ago" },
    { skill: "Communication", level: 90, trend: "stable", lastPracticed: "Yesterday" },
    { skill: "Project Management", level: 68, trend: "down", lastPracticed: "3 days ago" },
];

const learningPatterns: LearningPattern[] = [
    { dayOfWeek: "Mon", avgMinutes: 45, isToday: false },
    { dayOfWeek: "Tue", avgMinutes: 30, isToday: false },
    { dayOfWeek: "Wed", avgMinutes: 60, isToday: false },
    { dayOfWeek: "Thu", avgMinutes: 25, isToday: true },
    { dayOfWeek: "Fri", avgMinutes: 50, isToday: false },
    { dayOfWeek: "Sat", avgMinutes: 15, isToday: false },
    { dayOfWeek: "Sun", avgMinutes: 20, isToday: false },
];

const weakAreas: WeakArea[] = [
    { topic: "Sprint Retrospectives", score: 62, suggestedCourse: "Advanced Scrum Practices" },
    { topic: "Conflict Resolution", score: 55, suggestedCourse: "Leadership Communication" },
    { topic: "Data Visualization", score: 48, suggestedCourse: "Data Analytics Fundamentals" },
];

export function PersonalizedInsights({ userId }: PersonalizedInsightsProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const maxMinutes = Math.max(...learningPatterns.map((p) => p.avgMinutes));

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up": return <TrendingUp className="h-4 w-4 text-emerald-500" />;
            case "down": return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
            default: return <div className="w-4 h-0.5 bg-muted-foreground" />;
        }
    };

    const getLevelColor = (level: number) => {
        if (level >= 80) return "text-emerald-500";
        if (level >= 60) return "text-blue-500";
        if (level >= 40) return "text-amber-500";
        return "text-red-500";
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-6 animate-pulse">
                        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-2/3" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="font-semibold">AI Learning Insights</h2>
                    <p className="text-sm text-muted-foreground">Personalized recommendations based on your progress</p>
                </div>
            </div>

            {/* Skill Mastery */}
            <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Skill Mastery
                </h3>
                <div className="space-y-4">
                    {skillMasteries.map((skill) => (
                        <div key={skill.skill}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{skill.skill}</span>
                                    {getTrendIcon(skill.trend)}
                                </div>
                                <span className={cn("text-sm font-medium", getLevelColor(skill.level))}>
                                    {skill.level}%
                                </span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">
                                Last practiced: {skill.lastPracticed}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Learning Patterns */}
            <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Weekly Learning Pattern
                </h3>
                <div className="flex items-end justify-between gap-2 h-32">
                    {learningPatterns.map((pattern) => (
                        <div key={pattern.dayOfWeek} className="flex-1 flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-full rounded-t-lg transition-all",
                                    pattern.isToday ? "bg-primary" : "bg-muted"
                                )}
                                style={{ height: `${(pattern.avgMinutes / maxMinutes) * 100}%` }}
                            />
                            <span className={cn(
                                "text-xs mt-2",
                                pattern.isToday ? "text-primary font-medium" : "text-muted-foreground"
                            )}>
                                {pattern.dayOfWeek}
                            </span>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                    Average: {Math.round(learningPatterns.reduce((a, b) => a + b.avgMinutes, 0) / 7)} min/day
                </p>
            </Card>

            {/* Areas to Improve */}
            <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Areas to Improve
                </h3>
                <div className="space-y-3">
                    {weakAreas.map((area) => (
                        <div key={area.topic} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{area.topic}</span>
                                <Badge variant="outline" className="text-amber-500">
                                    {area.score}%
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Recommended: <span className="text-primary">{area.suggestedCourse}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* AI Recommendations */}
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-medium mb-1">AI Suggestion</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            Based on your learning patterns, you're most productive on Wednesdays.
                            Consider scheduling your challenging courses for that day.
                        </p>
                        <Button size="sm" variant="outline">
                            Optimize My Schedule
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
