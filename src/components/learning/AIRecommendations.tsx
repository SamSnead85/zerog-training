"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Sparkles,
    TrendingUp,
    Clock,
    Star,
    ChevronRight,
    RefreshCw,
    Target,
    Brain,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RecommendedCourse {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    matchScore: number;
    reason: string;
    thumbnail: string;
    difficulty: "beginner" | "intermediate" | "advanced";
}

const mockRecommendations: RecommendedCourse[] = [
    {
        id: "1",
        title: "Advanced Prompt Engineering",
        description: "Master advanced prompting techniques for enterprise AI applications",
        category: "AI & Technology",
        duration: "4 hrs",
        matchScore: 98,
        reason: "Based on your completion of AI Fundamentals and interest in productivity tools",
        thumbnail: "/images/training/cybersecurity-hero.png",
        difficulty: "advanced"
    },
    {
        id: "2",
        title: "SAFe Product Owner/PM",
        description: "Learn to maximize value delivery in Scaled Agile environments",
        category: "Agile & SAFe",
        duration: "6 hrs",
        matchScore: 94,
        reason: "Complements your SAFe Agilist certification path",
        thumbnail: "/images/training/network-security.png",
        difficulty: "intermediate"
    },
    {
        id: "3",
        title: "Data Privacy Essentials",
        description: "GDPR, CCPA, and emerging privacy regulations",
        category: "Compliance",
        duration: "3 hrs",
        matchScore: 89,
        reason: "Required for your department's compliance track",
        thumbnail: "/images/training/data-protection.png",
        difficulty: "beginner"
    },
    {
        id: "4",
        title: "Leadership in AI Era",
        description: "Navigate AI-driven organizational transformation",
        category: "Leadership",
        duration: "5 hrs",
        matchScore: 85,
        reason: "Popular among colleagues in your role",
        thumbnail: "/images/training/security-visual.png",
        difficulty: "intermediate"
    },
];

const difficultyColors = {
    beginner: "bg-emerald-500/20 text-emerald-500",
    intermediate: "bg-amber-500/20 text-amber-500",
    advanced: "bg-red-500/20 text-red-500",
};

export function AIRecommendations() {
    const [recommendations, setRecommendations] = useState(mockRecommendations);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Recommended for You
                    </h2>
                    <p className="text-sm text-muted-foreground">AI-powered course suggestions based on your learning profile</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                    Refresh
                </Button>
            </div>

            {/* AI Insight Banner */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-medium mb-1">Your Learning Profile</h3>
                        <p className="text-sm text-muted-foreground">
                            Based on your completed courses, quiz scores, and time preferences, we've identified courses
                            that align with your career goals and learning style.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((course, index) => (
                    <Card
                        key={course.id}
                        className="overflow-hidden hover:border-primary/30 transition-all group"
                    >
                        {/* Thumbnail */}
                        <div className="relative h-32 bg-gradient-to-br from-primary/20 to-purple-500/20">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm">
                                <Target className="h-3 w-3 text-primary" />
                                <span className="text-xs font-bold text-primary">{course.matchScore}% Match</span>
                            </div>
                            <div className="absolute top-2 left-2">
                                <Badge className={cn("text-xs", difficultyColors[course.difficulty])}>
                                    {course.difficulty}
                                </Badge>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <Badge variant="outline" className="text-xs mb-2">{course.category}</Badge>
                                    <h4 className="font-semibold group-hover:text-primary transition-colors">{course.title}</h4>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

                            {/* AI Reason */}
                            <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 mb-3">
                                <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-muted-foreground">{course.reason}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </span>
                                <Link href={`/module/${course.id}`}>
                                    <Button size="sm" className="gap-1">
                                        Start Learning
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Skills Gap Analysis */}
            <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Skills Gap Analysis
                </h3>
                <div className="space-y-4">
                    {[
                        { skill: "AI & Machine Learning", current: 45, target: 80 },
                        { skill: "Data Privacy & Compliance", current: 70, target: 90 },
                        { skill: "Agile Leadership", current: 60, target: 75 },
                    ].map((item) => (
                        <div key={item.skill} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{item.skill}</span>
                                <span className="text-muted-foreground">{item.current}% / {item.target}%</span>
                            </div>
                            <div className="relative">
                                <Progress value={item.current} className="h-2" />
                                <div
                                    className="absolute top-0 h-full w-0.5 bg-primary"
                                    style={{ left: `${item.target}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
