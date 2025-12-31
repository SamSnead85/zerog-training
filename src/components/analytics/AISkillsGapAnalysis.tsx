"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Brain,
    TrendingUp,
    TrendingDown,
    Target,
    Users,
    BookOpen,
    ChevronRight,
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    ArrowUpRight,
    BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
type Priority = "critical" | "high" | "medium" | "low";

interface SkillGap {
    id: string;
    skill: string;
    category: string;
    currentLevel: number;
    requiredLevel: number;
    gap: number;
    priority: Priority;
    affectedUsers: number;
    recommendedCourses: string[];
    trend: "improving" | "stable" | "declining";
}

interface TeamSkillProfile {
    team: string;
    avgSkillLevel: number;
    keyGaps: string[];
    trend: "up" | "down" | "stable";
    trendValue: number;
}

const priorityConfig: Record<Priority, { label: string; color: string }> = {
    critical: { label: "Critical", color: "bg-red-500/20 text-red-500 border-red-500/30" },
    high: { label: "High", color: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
    medium: { label: "Medium", color: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
    low: { label: "Low", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
};

const mockGaps: SkillGap[] = [
    { id: "1", skill: "Cloud Security", category: "Security", currentLevel: 45, requiredLevel: 80, gap: 35, priority: "critical", affectedUsers: 89, recommendedCourses: ["AWS Security Fundamentals", "Cloud Security Architecture"], trend: "improving" },
    { id: "2", skill: "HIPAA Compliance", category: "Compliance", currentLevel: 72, requiredLevel: 95, gap: 23, priority: "high", affectedUsers: 156, recommendedCourses: ["HIPAA Privacy & Security"], trend: "stable" },
    { id: "3", skill: "Agentic SDLC", category: "Methodology", currentLevel: 55, requiredLevel: 75, gap: 20, priority: "high", affectedUsers: 234, recommendedCourses: ["NATIVE Framework", "Human-AI Collaboration"], trend: "improving" },
    { id: "4", skill: "Data Privacy (GDPR)", category: "Compliance", currentLevel: 60, requiredLevel: 85, gap: 25, priority: "high", affectedUsers: 78, recommendedCourses: ["GDPR Essentials", "Data Privacy Masterclass"], trend: "declining" },
    { id: "5", skill: "AI/ML Literacy", category: "Technical", currentLevel: 35, requiredLevel: 60, gap: 25, priority: "medium", affectedUsers: 312, recommendedCourses: ["AI for Business", "Machine Learning Basics"], trend: "improving" },
    { id: "6", skill: "Leadership", category: "Soft Skills", currentLevel: 68, requiredLevel: 80, gap: 12, priority: "medium", affectedUsers: 45, recommendedCourses: ["Leadership Fundamentals"], trend: "stable" },
];

const mockTeams: TeamSkillProfile[] = [
    { team: "Engineering", avgSkillLevel: 72, keyGaps: ["Cloud Security", "AI/ML"], trend: "up", trendValue: 5 },
    { team: "Healthcare", avgSkillLevel: 78, keyGaps: ["HIPAA", "Data Privacy"], trend: "stable", trendValue: 0 },
    { team: "Sales", avgSkillLevel: 65, keyGaps: ["Product Knowledge", "Compliance"], trend: "down", trendValue: -3 },
    { team: "HR", avgSkillLevel: 82, keyGaps: ["Leadership", "DEI"], trend: "up", trendValue: 8 },
];

export function AISkillsGapAnalysis() {
    const [gaps, setGaps] = useState(mockGaps);
    const [teams, setTeams] = useState(mockTeams);
    const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

    const filtered = gaps.filter(g => priorityFilter === "all" || g.priority === priorityFilter);

    const criticalGaps = gaps.filter(g => g.priority === "critical").length;
    const totalAffected = gaps.reduce((acc, g) => acc + g.affectedUsers, 0);
    const avgGap = Math.round(gaps.reduce((acc, g) => acc + g.gap, 0) / gaps.length);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        AI Skills Gap Analysis
                    </h2>
                    <p className="text-sm text-muted-foreground">AI-powered workforce skill assessment and recommendations</p>
                </div>
                <Button className="gap-1">
                    <Sparkles className="h-4 w-4" />
                    Refresh Analysis
                </Button>
            </div>

            {/* AI Insight Banner */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-medium mb-1">AI Insight</h4>
                        <p className="text-sm text-muted-foreground">
                            Based on current skill levels and industry benchmarks, <strong className="text-foreground">Cloud Security</strong> shows
                            the largest gap at 35 points below requirement. Recommend prioritizing security training for 89 affected users
                            to reduce compliance risk by an estimated 40%.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-muted-foreground">Critical Gaps</span>
                    </div>
                    <div className="text-2xl font-bold text-red-500">{criticalGaps}</div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Users Affected</span>
                    </div>
                    <div className="text-2xl font-bold">{totalAffected}</div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Avg Gap</span>
                    </div>
                    <div className="text-2xl font-bold">{avgGap} pts</div>
                </Card>
                <Card className="p-4 border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-muted-foreground">Improving</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-500">
                        {gaps.filter(g => g.trend === "improving").length}
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(["all", "critical", "high", "medium", "low"] as const).map((p) => (
                    <Button
                        key={p}
                        variant={priorityFilter === p ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPriorityFilter(p)}
                    >
                        {p === "all" ? "All" : priorityConfig[p].label}
                    </Button>
                ))}
            </div>

            {/* Gaps List */}
            <Card className="overflow-hidden">
                <div className="divide-y divide-border">
                    {filtered.map((gap) => {
                        const priority = priorityConfig[gap.priority];

                        return (
                            <div key={gap.id} className="p-4 hover:bg-muted/50">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold">{gap.skill}</h4>
                                            <Badge variant="outline" className={cn("text-xs", priority.color)}>
                                                {priority.label}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">{gap.category}</Badge>
                                            {gap.trend === "improving" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                                            {gap.trend === "declining" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                        </div>

                                        {/* Skill Bar */}
                                        <div className="mb-3">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Current: {gap.currentLevel}%</span>
                                                <span className="text-muted-foreground">Required: {gap.requiredLevel}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${gap.currentLevel}%` }}
                                                />
                                                <div
                                                    className="absolute top-0 h-full w-0.5 bg-red-500"
                                                    style={{ left: `${gap.requiredLevel}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {gap.affectedUsers} users affected
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="h-3 w-3" />
                                                {gap.recommendedCourses.length} courses recommended
                                            </span>
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm" className="gap-1">
                                        Assign Training
                                        <ArrowUpRight className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Team Breakdown */}
            <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Team Skill Profiles
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {teams.map((team) => (
                        <div key={team.team} className="p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{team.team}</h4>
                                <div className="flex items-center gap-1">
                                    {team.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                                    {team.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                    <span className={cn(
                                        "text-xs",
                                        team.trend === "up" ? "text-emerald-500" :
                                            team.trend === "down" ? "text-red-500" : "text-muted-foreground"
                                    )}>
                                        {team.trendValue > 0 ? `+${team.trendValue}%` : `${team.trendValue}%`}
                                    </span>
                                </div>
                            </div>
                            <div className="text-2xl font-bold mb-2">{team.avgSkillLevel}%</div>
                            <Progress value={team.avgSkillLevel} className="h-1.5 mb-2" />
                            <div className="text-xs text-muted-foreground">
                                Gaps: {team.keyGaps.join(", ")}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
