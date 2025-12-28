"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Trophy,
    Star,
    Zap,
    Lock,
    ChevronRight,
    Award,
    Target,
    BookOpen,
    Shield,
    Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    progress: number;
    maxProgress: number;
    unlocked: boolean;
    unlockedDate?: string;
    xpReward: number;
    rarity: "common" | "rare" | "epic" | "legendary";
}

const rarityColors = {
    common: "border-slate-500/30 bg-slate-500/10",
    rare: "border-blue-500/30 bg-blue-500/10",
    epic: "border-purple-500/30 bg-purple-500/10",
    legendary: "border-yellow-500/30 bg-yellow-500/10",
};

const rarityLabels = {
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
};

const mockAchievements: Achievement[] = [
    { id: "1", title: "First Steps", description: "Complete your first course", icon: BookOpen, progress: 1, maxProgress: 1, unlocked: true, unlockedDate: "Dec 20, 2024", xpReward: 50, rarity: "common" },
    { id: "2", title: "Quick Learner", description: "Complete 5 courses in one week", icon: Zap, progress: 3, maxProgress: 5, unlocked: false, xpReward: 150, rarity: "rare" },
    { id: "3", title: "Security Champion", description: "Complete all cybersecurity courses", icon: Shield, progress: 4, maxProgress: 6, unlocked: false, xpReward: 300, rarity: "epic" },
    { id: "4", title: "Knowledge Master", description: "Earn 5,000 XP total", icon: Brain, progress: 2450, maxProgress: 5000, unlocked: false, xpReward: 500, rarity: "legendary" },
    { id: "5", title: "Perfect Score", description: "Get 100% on 10 quizzes", icon: Target, progress: 7, maxProgress: 10, unlocked: false, xpReward: 200, rarity: "rare" },
    { id: "6", title: "Streak Master", description: "Maintain a 30-day learning streak", icon: Trophy, progress: 7, maxProgress: 30, unlocked: false, xpReward: 400, rarity: "epic" },
];

export function AchievementSystem() {
    const [achievements, setAchievements] = useState(mockAchievements);
    const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

    const filtered = achievements.filter(a => {
        if (filter === "all") return true;
        if (filter === "unlocked") return a.unlocked;
        if (filter === "locked") return !a.unlocked;
        return true;
    });

    const totalXP = achievements.filter(a => a.unlocked).reduce((acc, a) => acc + a.xpReward, 0);
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{unlockedCount}/{achievements.length}</div>
                            <div className="text-sm text-muted-foreground">Achievements</div>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">XP Earned</div>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Award className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{achievements.filter(a => a.rarity === "legendary" && a.unlocked).length}</div>
                            <div className="text-sm text-muted-foreground">Legendary</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {(["all", "unlocked", "locked"] as const).map((f) => (
                    <Button
                        key={f}
                        variant={filter === f ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Button>
                ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((achievement) => (
                    <Card
                        key={achievement.id}
                        className={cn(
                            "p-4 transition-all",
                            achievement.unlocked
                                ? rarityColors[achievement.rarity]
                                : "opacity-60"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                achievement.unlocked
                                    ? "bg-white/20"
                                    : "bg-muted"
                            )}>
                                {achievement.unlocked ? (
                                    <achievement.icon className="h-6 w-6" />
                                ) : (
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-semibold">{achievement.title}</h4>
                                    <Badge variant="outline" className="text-xs">
                                        {rarityLabels[achievement.rarity]}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

                                {!achievement.unlocked && (
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span>{achievement.progress} / {achievement.maxProgress}</span>
                                            <span className="text-primary">+{achievement.xpReward} XP</span>
                                        </div>
                                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                                    </div>
                                )}

                                {achievement.unlocked && achievement.unlockedDate && (
                                    <span className="text-xs text-muted-foreground">
                                        Unlocked {achievement.unlockedDate}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
