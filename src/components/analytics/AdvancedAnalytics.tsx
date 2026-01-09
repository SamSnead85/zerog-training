"use client";

import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Activity,
    Brain,
    Clock,
    Flame,
    TrendingUp,
    Target,
    Award,
    Calendar,
    BarChart3,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Learning insights card
export function LearningInsightsCard({
    insights,
}: {
    insights: {
        type: "strength" | "improvement" | "recommendation" | "achievement";
        title: string;
        description: string;
        metric?: { value: number; label: string };
        actionLabel?: string;
        onAction?: () => void;
    }[];
}) {
    const typeConfig = {
        strength: {
            icon: <Zap className="h-5 w-5" />,
            color: "text-emerald-400",
            bg: "bg-emerald-500/20"
        },
        improvement: {
            icon: <Target className="h-5 w-5" />,
            color: "text-amber-400",
            bg: "bg-amber-500/20"
        },
        recommendation: {
            icon: <Brain className="h-5 w-5" />,
            color: "text-blue-400",
            bg: "bg-blue-500/20"
        },
        achievement: {
            icon: <Award className="h-5 w-5" />,
            color: "text-purple-400",
            bg: "bg-purple-500/20"
        },
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Learning Insights
            </h3>

            <div className="space-y-4">
                {insights.map((insight, i) => {
                    const config = typeConfig[insight.type];
                    return (
                        <div key={i} className="flex gap-4">
                            <div className={cn("w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center", config.bg, config.color)}>
                                {config.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                                <p className="text-sm text-white/50">{insight.description}</p>
                                {insight.metric && (
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">{insight.metric.value}</span>
                                        <span className="text-sm text-white/40">{insight.metric.label}</span>
                                    </div>
                                )}
                                {insight.actionLabel && insight.onAction && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                        onClick={insight.onAction}
                                    >
                                        {insight.actionLabel}
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

// Weekly activity heatmap
export function ActivityHeatmap({
    data,
}: {
    data: { date: string; value: number }[];
}) {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    // Get last 12 weeks organized by day of week
    const weeks: { date: string; value: number }[][] = [];
    let currentWeek: { date: string; value: number }[] = [];

    data.slice(-84).forEach((day, i) => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    const getIntensity = (value: number) => {
        if (value === 0) return "bg-white/5";
        const ratio = value / maxValue;
        if (ratio < 0.25) return "bg-emerald-900/50";
        if (ratio < 0.5) return "bg-emerald-700/50";
        if (ratio < 0.75) return "bg-emerald-500/50";
        return "bg-emerald-400";
    };

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-400" />
                Activity
            </h3>

            <div className="flex gap-1">
                <div className="flex flex-col gap-1 text-xs text-white/40 pr-2">
                    <span className="h-3">Mon</span>
                    <span className="h-3"></span>
                    <span className="h-3">Wed</span>
                    <span className="h-3"></span>
                    <span className="h-3">Fri</span>
                    <span className="h-3"></span>
                    <span className="h-3">Sun</span>
                </div>
                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                        {week.map((day, di) => (
                            <div
                                key={di}
                                className={cn(
                                    "w-3 h-3 rounded-sm",
                                    getIntensity(day.value)
                                )}
                                title={`${new Date(day.date).toLocaleDateString()}: ${day.value} mins`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/40">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-white/5" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-900/50" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-700/50" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500/50" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                </div>
                <span>More</span>
            </div>
        </Card>
    );
}

// Time distribution chart
export function TimeDistributionChart({
    data,
}: {
    data: { category: string; minutes: number; color: string }[];
}) {
    const total = data.reduce((sum, d) => sum + d.minutes, 0);

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Time Distribution
            </h3>

            {/* Bar visualization */}
            <div className="h-4 rounded-full overflow-hidden flex mb-4">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="h-full transition-all"
                        style={{
                            width: `${(item.minutes / total) * 100}%`,
                            backgroundColor: item.color,
                        }}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-white/70">{item.category}</span>
                        <span className="text-sm text-white/40 ml-auto">
                            {Math.round(item.minutes / 60)}h
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Learning streak display
export function StreakDisplay({
    currentStreak,
    longestStreak,
    weekData,
}: {
    currentStreak: number;
    longestStreak: number;
    weekData: boolean[];
}) {
    const dayNames = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Flame className="h-6 w-6 text-amber-400" />
                    <span className="text-3xl font-bold">{currentStreak}</span>
                    <span className="text-white/50">day streak</span>
                </div>
                <Badge className="bg-white/10 text-white/60">
                    Best: {longestStreak} days
                </Badge>
            </div>

            {/* This week */}
            <div className="flex justify-between">
                {weekData.map((active, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                            active
                                ? "bg-amber-500 text-white"
                                : "bg-white/10 text-white/30"
                        )}>
                            {active && <Flame className="h-4 w-4" />}
                        </div>
                        <span className="text-xs text-white/40">{dayNames[i]}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Learning pace indicator
export function LearningPaceIndicator({
    currentPace,
    targetPace,
    unit = "lessons/week",
}: {
    currentPace: number;
    targetPace: number;
    unit?: string;
}) {
    const percentage = Math.min((currentPace / targetPace) * 100, 100);
    const isOnTrack = currentPace >= targetPace;

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                    <TrendingUp className={cn(
                        "h-5 w-5",
                        isOnTrack ? "text-emerald-400" : "text-amber-400"
                    )} />
                    Learning Pace
                </h4>
                <Badge className={cn(
                    isOnTrack
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                )}>
                    {isOnTrack ? "On Track" : "Behind"}
                </Badge>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold">{currentPace}</span>
                <span className="text-white/50">/ {targetPace} {unit}</span>
            </div>

            <Progress value={percentage} className="h-2" />
        </Card>
    );
}

// Skill radar (simplified)
export function SkillRadar({
    skills,
}: {
    skills: { name: string; level: number; maxLevel: number }[];
}) {
    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                Skill Levels
            </h3>

            <div className="space-y-3">
                {skills.map((skill, i) => {
                    const percentage = (skill.level / skill.maxLevel) * 100;
                    return (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{skill.name}</span>
                                <span className="text-sm text-white/50">
                                    {skill.level}/{skill.maxLevel}
                                </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
