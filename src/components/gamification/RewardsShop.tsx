"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Trophy,
    Star,
    Target,
    Flame,
    Coins,
    Gift,
    Lock,
    ChevronRight,
    Sparkles,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Reward {
    id: string;
    name: string;
    description: string;
    cost: number;
    category: "badge" | "theme" | "perk" | "certificate";
    isUnlocked: boolean;
    icon: string;
}

interface DailyChallenge {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    progress: number;
    target: number;
    expiresIn: string;
}

const mockRewards: Reward[] = [
    { id: "1", name: "Gold Profile Frame", description: "Stand out with a premium gold border", cost: 500, category: "theme", isUnlocked: false, icon: "🏆" },
    { id: "2", name: "Early Access Badge", description: "Get access to new courses first", cost: 750, category: "perk", isUnlocked: false, icon: "⚡" },
    { id: "3", name: "Dark Mode Pro", description: "Exclusive dark theme variations", cost: 300, category: "theme", isUnlocked: true, icon: "🌙" },
    { id: "4", name: "Skip Quiz Retries", description: "Unlimited quiz attempts for a week", cost: 200, category: "perk", isUnlocked: false, icon: "🔄" },
    { id: "5", name: "Custom Certificate", description: "Personalized certificate designs", cost: 1000, category: "certificate", isUnlocked: false, icon: "📜" },
    { id: "6", name: "Mentor Badge", description: "Show you're here to help others", cost: 400, category: "badge", isUnlocked: false, icon: "🎓" },
];

const mockChallenges: DailyChallenge[] = [
    { id: "1", title: "Speed Learner", description: "Complete 3 modules in under 30 minutes", xpReward: 100, progress: 2, target: 3, expiresIn: "6 hours" },
    { id: "2", title: "Quiz Master", description: "Get 100% on 2 quizzes in a row", xpReward: 150, progress: 1, target: 2, expiresIn: "6 hours" },
    { id: "3", title: "Early Bird", description: "Start learning before 9 AM", xpReward: 50, progress: 1, target: 1, expiresIn: "Tomorrow" },
];

const categoryColors = {
    badge: "bg-purple-500/20 text-purple-500",
    theme: "bg-blue-500/20 text-blue-500",
    perk: "bg-amber-500/20 text-amber-500",
    certificate: "bg-emerald-500/20 text-emerald-500",
};

export function RewardsShop() {
    const [rewards, setRewards] = useState(mockRewards);
    const [challenges, setChallenges] = useState(mockChallenges);
    const [userCoins, setUserCoins] = useState(650);

    const handlePurchase = (rewardId: string, cost: number) => {
        if (userCoins >= cost) {
            setUserCoins(prev => prev - cost);
            setRewards(prev => prev.map(r =>
                r.id === rewardId ? { ...r, isUnlocked: true } : r
            ));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Gift className="h-5 w-5 text-primary" />
                        Rewards Shop
                    </h2>
                    <p className="text-sm text-muted-foreground">Redeem your XP for exclusive rewards</p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-lg px-4 py-2">
                    <Coins className="h-5 w-5 mr-2" />
                    {userCoins} Coins
                </Badge>
            </div>

            {/* Daily Challenges */}
            <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Daily Challenges
                    <Badge variant="outline" className="ml-auto bg-primary/10 text-primary">
                        <Flame className="h-3 w-3 mr-1" />
                        Bonus XP
                    </Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {challenges.map((challenge) => {
                        const isComplete = challenge.progress >= challenge.target;
                        return (
                            <div
                                key={challenge.id}
                                className={cn(
                                    "p-4 rounded-lg border transition-all",
                                    isComplete
                                        ? "bg-emerald-500/10 border-emerald-500/30"
                                        : "bg-muted/50 border-border"
                                )}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium">{challenge.title}</h4>
                                    <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                        +{challenge.xpReward} XP
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">{challenge.description}</p>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>{challenge.progress}/{challenge.target}</span>
                                        <span className="text-muted-foreground">Expires in {challenge.expiresIn}</span>
                                    </div>
                                    <Progress value={(challenge.progress / challenge.target) * 100} className="h-1.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Rewards Grid */}
            <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Available Rewards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rewards.map((reward) => (
                        <Card
                            key={reward.id}
                            className={cn(
                                "p-4 transition-all",
                                reward.isUnlocked && "bg-emerald-500/5 border-emerald-500/20"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                                    {reward.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium">{reward.name}</h4>
                                        <Badge variant="outline" className={cn("text-xs", categoryColors[reward.category])}>
                                            {reward.category}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">{reward.description}</p>

                                    {reward.isUnlocked ? (
                                        <Badge className="bg-emerald-500/20 text-emerald-500">
                                            Owned
                                        </Badge>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant={userCoins >= reward.cost ? "default" : "outline"}
                                            disabled={userCoins < reward.cost}
                                            onClick={() => handlePurchase(reward.id, reward.cost)}
                                            className="gap-1"
                                        >
                                            {userCoins < reward.cost && <Lock className="h-3 w-3" />}
                                            <Coins className="h-3 w-3" />
                                            {reward.cost}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
