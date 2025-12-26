"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Trophy,
    Medal,
    Crown,
    TrendingUp,
    TrendingDown,
    Minus,
    Users,
    Flame,
    Star,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimeRange = "week" | "month" | "all";
type LeaderboardType = "individual" | "team";

interface LeaderboardEntry {
    rank: number;
    name: string;
    avatar?: string;
    xp: number;
    streak: number;
    coursesCompleted: number;
    trend: "up" | "down" | "same";
    isCurrentUser?: boolean;
}

interface TeamEntry {
    rank: number;
    name: string;
    memberCount: number;
    totalXp: number;
    avgCompletion: number;
    trend: "up" | "down" | "same";
    isCurrentTeam?: boolean;
}

// Mock data
const individualLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Sarah Chen", xp: 12450, streak: 21, coursesCompleted: 34, trend: "same" },
    { rank: 2, name: "Marcus Johnson", xp: 11200, streak: 15, coursesCompleted: 29, trend: "up" },
    { rank: 3, name: "Emily Rodriguez", xp: 10890, streak: 18, coursesCompleted: 31, trend: "down" },
    { rank: 4, name: "David Kim", xp: 9750, streak: 12, coursesCompleted: 27, trend: "up" },
    { rank: 5, name: "John Smith", xp: 8450, streak: 5, coursesCompleted: 24, trend: "up", isCurrentUser: true },
    { rank: 6, name: "Lisa Wang", xp: 8200, streak: 9, coursesCompleted: 22, trend: "down" },
    { rank: 7, name: "Michael Brown", xp: 7890, streak: 7, coursesCompleted: 20, trend: "same" },
    { rank: 8, name: "Anna Martinez", xp: 7560, streak: 11, coursesCompleted: 19, trend: "up" },
];

const teamLeaderboard: TeamEntry[] = [
    { rank: 1, name: "Engineering", memberCount: 45, totalXp: 156000, avgCompletion: 87, trend: "same" },
    { rank: 2, name: "Product", memberCount: 28, totalXp: 98500, avgCompletion: 82, trend: "up" },
    { rank: 3, name: "Sales", memberCount: 52, totalXp: 145000, avgCompletion: 76, trend: "up", isCurrentTeam: true },
    { rank: 4, name: "Marketing", memberCount: 22, totalXp: 67800, avgCompletion: 79, trend: "down" },
    { rank: 5, name: "Customer Success", memberCount: 18, totalXp: 52300, avgCompletion: 85, trend: "up" },
];

export function Leaderboard() {
    const [timeRange, setTimeRange] = useState<TimeRange>("week");
    const [type, setType] = useState<LeaderboardType>("individual");

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
        if (rank === 2) return <Medal className="h-5 w-5 text-zinc-400" />;
        if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
        return <span className="text-sm font-medium text-muted-foreground w-5 text-center">{rank}</span>;
    };

    const getTrendIcon = (trend: "up" | "down" | "same") => {
        if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-500" />;
        if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Leaderboard</h2>
                    <p className="text-sm text-muted-foreground">See how you stack up against others</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex rounded-lg border border-border overflow-hidden">
                        {(["week", "month", "all"] as TimeRange[]).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={cn(
                                    "px-3 py-1.5 text-sm capitalize transition-colors",
                                    timeRange === range
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                )}
                            >
                                {range === "all" ? "All Time" : `This ${range}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Type Toggle */}
            <div className="flex gap-2">
                <Button
                    variant={type === "individual" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setType("individual")}
                    className="gap-2"
                >
                    <Trophy className="h-4 w-4" />
                    Individual
                </Button>
                <Button
                    variant={type === "team" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setType("team")}
                    className="gap-2"
                >
                    <Users className="h-4 w-4" />
                    Teams
                </Button>
            </div>

            {/* Individual Leaderboard */}
            {type === "individual" && (
                <div className="space-y-2">
                    {individualLeaderboard.map((entry) => (
                        <div
                            key={entry.rank}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all",
                                entry.isCurrentUser
                                    ? "bg-primary/5 border-primary/30"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            )}
                        >
                            {/* Rank */}
                            <div className="w-8 flex justify-center">
                                {getRankIcon(entry.rank)}
                            </div>

                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-sm font-medium">
                                {entry.name.split(" ").map(n => n[0]).join("")}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium truncate">
                                        {entry.name}
                                        {entry.isCurrentUser && (
                                            <span className="text-xs text-primary ml-2">(You)</span>
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Flame className="h-3 w-3" />
                                        {entry.streak} day streak
                                    </span>
                                    <span>{entry.coursesCompleted} courses</span>
                                </div>
                            </div>

                            {/* XP */}
                            <div className="text-right">
                                <p className="font-semibold text-primary">{entry.xp.toLocaleString()} XP</p>
                            </div>

                            {/* Trend */}
                            <div className="w-6">
                                {getTrendIcon(entry.trend)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Team Leaderboard */}
            {type === "team" && (
                <div className="space-y-2">
                    {teamLeaderboard.map((entry) => (
                        <div
                            key={entry.rank}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all",
                                entry.isCurrentTeam
                                    ? "bg-primary/5 border-primary/30"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            )}
                        >
                            {/* Rank */}
                            <div className="w-8 flex justify-center">
                                {getRankIcon(entry.rank)}
                            </div>

                            {/* Team Icon */}
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                        {entry.name}
                                        {entry.isCurrentTeam && (
                                            <span className="text-xs text-primary ml-2">(Your Team)</span>
                                        )}
                                    </p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {entry.memberCount} members • {entry.avgCompletion}% avg completion
                                </p>
                            </div>

                            {/* Total XP */}
                            <div className="text-right">
                                <p className="font-semibold text-primary">{entry.totalXp.toLocaleString()} XP</p>
                            </div>

                            {/* Trend */}
                            <div className="w-6">
                                {getTrendIcon(entry.trend)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Current User Summary */}
            <Card className="p-4 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Your Position</p>
                        <p className="text-2xl font-bold">
                            #{type === "individual" ? "5" : "3"}
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                                of {type === "individual" ? "156" : "12"} {type === "individual" ? "learners" : "teams"}
                            </span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">To reach next rank</p>
                        <p className="font-semibold text-primary">
                            {type === "individual" ? "700 XP" : "32,500 XP"}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
