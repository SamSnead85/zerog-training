"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import {
    TrendingUp,
    Flame,
    Target,
    Award,
    Calendar,
    ChevronRight,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakData {
    currentStreak: number;
    longestStreak: number;
    weeklyGoal: number;
    weeklyProgress: number;
    lastActiveDate: string;
}

const mockStreakData: StreakData = {
    currentStreak: 7,
    longestStreak: 21,
    weeklyGoal: 5,
    weeklyProgress: 4,
    lastActiveDate: "Today",
};

// Days of the week starting from Monday
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekActivity = [true, true, false, true, true, false, false]; // Mock activity data

export function LearningStreak() {
    const [streak, setStreak] = useState(mockStreakData);

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Learning Streak
                </h3>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    {streak.currentStreak} days
                </Badge>
            </div>

            {/* Streak Visualization */}
            <div className="flex items-center justify-between mb-6 bg-muted rounded-lg p-3">
                {weekDays.map((day, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">{day}</span>
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                            weekActivity[index]
                                ? "bg-orange-500 text-white"
                                : "bg-card border border-border"
                        )}>
                            {weekActivity[index] ? (
                                <Flame className="h-4 w-4" />
                            ) : (
                                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{streak.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold">{streak.longestStreak}</div>
                    <div className="text-xs text-muted-foreground">Longest</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-500">{streak.weeklyProgress}/{streak.weeklyGoal}</div>
                    <div className="text-xs text-muted-foreground">This Week</div>
                </div>
            </div>

            {/* Motivation Message */}
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-center">
                <p className="text-sm font-medium">
                    🔥 Keep it up! {8 - streak.currentStreak} more days until your next milestone!
                </p>
            </div>
        </Card>
    );
}
