"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    TrendingUp,
    Target,
    Brain,
    Clock,
    Star,
    ArrowRight,
    RefreshCw,
} from "lucide-react";

interface RecommendedCourse {
    id: string;
    title: string;
    category: string;
    matchScore: number;
    reason: string;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
}

// Mock recommendations based on user behavior
const generateRecommendations = (): RecommendedCourse[] => [
    {
        id: "change-management",
        title: "Change Management Fundamentals",
        category: "Leadership",
        matchScore: 95,
        reason: "Based on your leadership track progress",
        duration: "3 hours",
        difficulty: "Intermediate",
    },
    {
        id: "data-analytics",
        title: "Data Analytics for Decision Making",
        category: "Technology",
        matchScore: 88,
        reason: "Popular among similar learners",
        duration: "4 hours",
        difficulty: "Intermediate",
    },
    {
        id: "effective-communication",
        title: "Effective Communication Skills",
        category: "Soft Skills",
        matchScore: 82,
        reason: "Complements your current courses",
        duration: "2 hours",
        difficulty: "Beginner",
    },
];

interface SkillGap {
    skill: string;
    currentLevel: number;
    targetLevel: number;
    suggestedCourse: string;
}

const skillGaps: SkillGap[] = [
    { skill: "Agile Methodology", currentLevel: 65, targetLevel: 90, suggestedCourse: "safe-scrum-master" },
    { skill: "Data Analysis", currentLevel: 40, targetLevel: 75, suggestedCourse: "data-analytics" },
    { skill: "Communication", currentLevel: 70, targetLevel: 85, suggestedCourse: "effective-feedback" },
];

export function SmartRecommendations() {
    const [recommendations, setRecommendations] = useState<RecommendedCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showGaps, setShowGaps] = useState(false);

    useEffect(() => {
        // Simulate AI-powered recommendation loading
        const timer = setTimeout(() => {
            setRecommendations(generateRecommendations());
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setRecommendations(generateRecommendations());
            setIsLoading(false);
        }, 1000);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "text-emerald-500";
            case "Intermediate": return "text-blue-500";
            case "Advanced": return "text-purple-500";
            default: return "text-muted-foreground";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">AI Recommendations</h2>
                        <p className="text-sm text-muted-foreground">Personalized for your learning journey</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={showGaps ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowGaps(!showGaps)}
                        className="gap-2"
                    >
                        <Brain className="h-4 w-4" />
                        Skill Gaps
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            {/* Skill Gaps Section */}
            {showGaps && (
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Skills to Develop
                    </h3>
                    <div className="space-y-4">
                        {skillGaps.map((gap) => (
                            <div key={gap.skill}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{gap.skill}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {gap.currentLevel}% → {gap.targetLevel}%
                                    </span>
                                </div>
                                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="absolute h-full bg-muted-foreground/30 rounded-full"
                                        style={{ width: `${gap.targetLevel}%` }}
                                    />
                                    <div
                                        className="absolute h-full bg-primary rounded-full transition-all"
                                        style={{ width: `${gap.currentLevel}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Recommendations */}
            <div className="space-y-3">
                {isLoading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 animate-pulse">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-lg bg-white/5" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-white/5 rounded w-3/4" />
                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                    <div className="h-3 bg-white/5 rounded w-1/4" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    recommendations.map((course) => (
                        <Link key={course.id} href={`/module/${course.id}`}>
                            <div className="group p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all">
                                <div className="flex gap-4">
                                    {/* Match Score */}
                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="text-lg font-bold text-primary">{course.matchScore}%</span>
                                        <span className="text-[10px] text-muted-foreground">match</span>
                                    </div>

                                    {/* Course Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div>
                                                <Badge variant="outline" className="text-xs mb-1">
                                                    {course.category}
                                                </Badge>
                                                <h3 className="font-medium group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                            <Sparkles className="h-3 w-3" />
                                            {course.reason}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {course.duration}
                                            </span>
                                            <span className={getDifficultyColor(course.difficulty)}>
                                                {course.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
