"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    BookOpen,
    Target,
    TrendingUp,
    Clock,
    Star,
    ChevronRight,
    Brain,
    Zap,
    Award,
    ArrowRight,
    RefreshCw,
    ThumbsUp,
    ThumbsDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Recommendation {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    relevanceScore: number;
    reason: string;
    skills: string[];
    matchedGoal?: string;
}

interface LearningGoal {
    id: string;
    title: string;
    targetDate: string;
    progress: number;
    relatedModules: number;
}

interface SkillGap {
    skill: string;
    currentLevel: number;
    targetLevel: number;
    priority: "high" | "medium" | "low";
    suggestedModules: number;
}

const mockRecommendations: Recommendation[] = [
    {
        id: "1",
        title: "Advanced Prompt Engineering with CRAFT",
        description: "Master the CRAFT framework for enterprise AI prompt design",
        category: "AI & Technology",
        duration: "45 min",
        difficulty: "advanced",
        relevanceScore: 98,
        reason: "Based on your interest in AI and prompt engineering",
        skills: ["Prompt Engineering", "AI", "LLM"],
        matchedGoal: "AI Mastery Certificate",
    },
    {
        id: "2",
        title: "Chain-of-Thought Reasoning",
        description: "Learn to build complex reasoning chains for better AI outputs",
        category: "AI & Technology",
        duration: "30 min",
        difficulty: "intermediate",
        relevanceScore: 94,
        reason: "Continues your prompt engineering learning path",
        skills: ["CoT", "AI Reasoning", "Problem Solving"],
    },
    {
        id: "3",
        title: "HIPAA Security Rule Deep Dive",
        description: "Technical safeguards and encryption requirements",
        category: "Compliance",
        duration: "60 min",
        difficulty: "intermediate",
        relevanceScore: 88,
        reason: "Required for your compliance certification",
        skills: ["HIPAA", "Security", "Healthcare"],
        matchedGoal: "Healthcare Compliance",
    },
    {
        id: "4",
        title: "Leadership in the AI Era",
        description: "Leading teams through digital transformation",
        category: "Leadership",
        duration: "40 min",
        difficulty: "intermediate",
        relevanceScore: 82,
        reason: "Popular among professionals in your role",
        skills: ["Leadership", "AI Strategy", "Change Management"],
    },
];

const mockGoals: LearningGoal[] = [
    { id: "1", title: "AI Mastery Certificate", targetDate: "Mar 2025", progress: 65, relatedModules: 8 },
    { id: "2", title: "Healthcare Compliance", targetDate: "Feb 2025", progress: 40, relatedModules: 5 },
];

const mockSkillGaps: SkillGap[] = [
    { skill: "Prompt Engineering", currentLevel: 3, targetLevel: 5, priority: "high", suggestedModules: 4 },
    { skill: "AI Ethics", currentLevel: 2, targetLevel: 4, priority: "medium", suggestedModules: 3 },
    { skill: "Data Privacy", currentLevel: 4, targetLevel: 5, priority: "low", suggestedModules: 2 },
];

export function LearningRecommendations() {
    const [feedback, setFeedback] = useState<Record<string, "up" | "down" | null>>({});

    const handleFeedback = (id: string, type: "up" | "down") => {
        setFeedback({ ...feedback, [id]: type });
    };

    const getDifficultyStyles = (difficulty: string) => {
        const styles = {
            beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
            intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/30",
            advanced: "bg-purple-500/15 text-purple-400 border-purple-500/30",
        };
        return styles[difficulty as keyof typeof styles] || styles.beginner;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Brain className="h-7 w-7 text-primary" />
                        AI Learning Recommendations
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Personalized training based on your goals and activity
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Recommendations */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Top Pick */}
                    <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <Badge className="bg-primary/20 text-primary border-primary/30">Top Pick for You</Badge>
                        </div>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{mockRecommendations[0].title}</h3>
                                <p className="text-muted-foreground mb-4">{mockRecommendations[0].description}</p>
                                <div className="flex items-center gap-4 mb-4">
                                    <Badge className={getDifficultyStyles(mockRecommendations[0].difficulty)}>
                                        {mockRecommendations[0].difficulty}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {mockRecommendations[0].duration}
                                    </span>
                                    <span className="text-sm text-muted-foreground">{mockRecommendations[0].category}</span>
                                </div>
                                <p className="text-sm text-primary">
                                    <Zap className="h-4 w-4 inline mr-1" />
                                    {mockRecommendations[0].reason}
                                </p>
                            </div>
                            <div className="text-center ml-6">
                                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                                    <span className="text-2xl font-bold text-primary">{mockRecommendations[0].relevanceScore}%</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Match</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                            <Button className="flex-1 gap-2">
                                Start Learning
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleFeedback("1", "up")}>
                                <ThumbsUp className={cn("h-4 w-4", feedback["1"] === "up" && "text-emerald-400")} />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleFeedback("1", "down")}>
                                <ThumbsDown className={cn("h-4 w-4", feedback["1"] === "down" && "text-red-400")} />
                            </Button>
                        </div>
                    </Card>

                    {/* More Recommendations */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">More Recommendations</h3>
                        {mockRecommendations.slice(1).map((rec) => (
                            <Card key={rec.id} className="p-4 bg-white/[0.02] border-white/10 hover:border-primary/30 transition-all cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white/5">
                                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">{rec.title}</h4>
                                            <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                                            <div className="flex items-center gap-3">
                                                <Badge className={getDifficultyStyles(rec.difficulty)}>
                                                    {rec.difficulty}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{rec.duration}</span>
                                                <span className="text-xs text-primary">{rec.relevanceScore}% match</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Learning Goals */}
                    <Card className="p-5 bg-white/[0.02] border-white/10">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Your Learning Goals
                        </h3>
                        <div className="space-y-4">
                            {mockGoals.map((goal) => (
                                <div key={goal.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-sm">{goal.title}</h4>
                                        <Badge variant="outline" className="text-xs">{goal.targetDate}</Badge>
                                    </div>
                                    <Progress value={goal.progress} className="h-1.5 mb-2" />
                                    <p className="text-xs text-muted-foreground">
                                        {goal.progress}% complete • {goal.relatedModules} modules
                                    </p>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full gap-2 text-sm">
                                <Target className="h-4 w-4" />
                                Add Goal
                            </Button>
                        </div>
                    </Card>

                    {/* Skill Gaps */}
                    <Card className="p-5 bg-white/[0.02] border-white/10">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Skill Gap Analysis
                        </h3>
                        <div className="space-y-3">
                            {mockSkillGaps.map((gap) => (
                                <div key={gap.skill} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-sm">{gap.skill}</h4>
                                        <Badge className={cn(
                                            "text-xs",
                                            gap.priority === "high" && "bg-red-500/15 text-red-400 border-red-500/30",
                                            gap.priority === "medium" && "bg-amber-500/15 text-amber-400 border-amber-500/30",
                                            gap.priority === "low" && "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                        )}>
                                            {gap.priority}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-muted-foreground">Current</span>
                                        <Progress value={(gap.currentLevel / 5) * 100} className="flex-1 h-1.5" />
                                        <span className="text-xs font-medium">{gap.currentLevel}/5</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">Target</span>
                                        <Progress value={(gap.targetLevel / 5) * 100} className="flex-1 h-1.5 bg-primary/20" />
                                        <span className="text-xs font-medium">{gap.targetLevel}/5</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {gap.suggestedModules} modules suggested
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
