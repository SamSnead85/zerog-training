"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Trophy,
    Award,
    Star,
    Flame,
    BookOpen,
    Target,
    Users,
    Zap,
    Clock,
    Lock,
    Check,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIAssistantButton } from "@/components/ai";

// =============================================================================
// ACHIEVEMENTS DATA
// =============================================================================

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: "learning" | "engagement" | "mastery" | "social";
    earned: boolean;
    earnedDate?: string;
    progress?: { current: number; target: number };
    rarity: "common" | "rare" | "epic" | "legendary";
}

const achievements: Achievement[] = [
    // Learning Achievements
    { id: "first-lesson", title: "First Steps", description: "Complete your first lesson", icon: "🎯", category: "learning", earned: true, earnedDate: "Dec 15, 2024", rarity: "common" },
    { id: "first-module", title: "Module Master", description: "Complete an entire module", icon: "📚", category: "learning", earned: true, earnedDate: "Dec 20, 2024", rarity: "common" },
    { id: "five-modules", title: "Knowledge Seeker", description: "Complete 5 modules", icon: "🧠", category: "learning", earned: false, progress: { current: 3, target: 5 }, rarity: "rare" },
    { id: "all-modules", title: "Curriculum Complete", description: "Complete all 8 modules", icon: "🎓", category: "learning", earned: false, progress: { current: 3, target: 8 }, rarity: "legendary" },

    // Engagement Achievements
    { id: "streak-7", title: "Week Warrior", description: "Maintain a 7-day learning streak", icon: "🔥", category: "engagement", earned: true, earnedDate: "Dec 28, 2024", rarity: "common" },
    { id: "streak-30", title: "Month of Learning", description: "Maintain a 30-day learning streak", icon: "💪", category: "engagement", earned: false, progress: { current: 12, target: 30 }, rarity: "rare" },
    { id: "streak-100", title: "Unstoppable", description: "Maintain a 100-day learning streak", icon: "⚡", category: "engagement", earned: false, progress: { current: 12, target: 100 }, rarity: "legendary" },
    { id: "early-bird", title: "Early Bird", description: "Complete a lesson before 8 AM", icon: "🌅", category: "engagement", earned: false, rarity: "common" },

    // Mastery Achievements
    { id: "perfect-quiz", title: "Perfect Score", description: "Score 100% on any quiz", icon: "💯", category: "mastery", earned: true, earnedDate: "Dec 25, 2024", rarity: "rare" },
    { id: "quiz-streak-5", title: "Quiz Champion", description: "Pass 5 quizzes in a row with 90%+", icon: "🏆", category: "mastery", earned: false, progress: { current: 3, target: 5 }, rarity: "epic" },
    { id: "code-master", title: "Code Wizard", description: "Complete 10 code exercises", icon: "💻", category: "mastery", earned: false, progress: { current: 6, target: 10 }, rarity: "rare" },
    { id: "first-cert", title: "Certified!", description: "Earn your first certification", icon: "🎖️", category: "mastery", earned: true, earnedDate: "Dec 28, 2024", rarity: "epic" },

    // Social Achievements
    { id: "top-10", title: "Top 10%", description: "Reach top 10% on leaderboard", icon: "👑", category: "social", earned: false, progress: { current: 15, target: 10 }, rarity: "epic" },
    { id: "share-cert", title: "Proud Achiever", description: "Share a certificate on LinkedIn", icon: "📢", category: "social", earned: false, rarity: "common" },
    { id: "help-5", title: "Helpful Colleague", description: "Help 5 teammates with questions", icon: "🤝", category: "social", earned: false, progress: { current: 2, target: 5 }, rarity: "rare" },
];

const categories = [
    { id: "all", label: "All" },
    { id: "learning", label: "Learning" },
    { id: "engagement", label: "Engagement" },
    { id: "mastery", label: "Mastery" },
    { id: "social", label: "Social" },
];

const rarityColors = {
    common: "border-white/20 bg-white/5",
    rare: "border-blue-500/50 bg-blue-500/10",
    epic: "border-purple-500/50 bg-purple-500/10",
    legendary: "border-yellow-500/50 bg-yellow-500/10",
};

const rarityLabels = {
    common: { text: "Common", color: "text-white/40" },
    rare: { text: "Rare", color: "text-blue-400" },
    epic: { text: "Epic", color: "text-purple-400" },
    legendary: { text: "Legendary", color: "text-yellow-400" },
};

// =============================================================================
// ACHIEVEMENTS PAGE
// =============================================================================

export default function AchievementsPage() {
    const [category, setCategory] = useState("all");

    const filteredAchievements = achievements.filter(a =>
        category === "all" || a.category === category
    );

    const earnedCount = achievements.filter(a => a.earned).length;
    const totalCount = achievements.length;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-5xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/my-progress" className="text-sm text-white/60 hover:text-white transition-colors">Progress</Link>
                        <Link href="/achievements" className="text-sm text-white font-medium">Achievements</Link>
                        <Link href="/leaderboard" className="text-sm text-white/60 hover:text-white transition-colors">Leaderboard</Link>
                    </nav>
                </div>
            </header>

            <main className="px-6 py-8 max-w-5xl mx-auto">
                {/* Hero */}
                <section className="text-center mb-12">
                    <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Achievements</h1>
                    <p className="text-white/50 mb-6">Unlock badges as you progress through your learning journey</p>

                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{earnedCount}</p>
                            <p className="text-xs text-white/40">Earned</p>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-bold">{totalCount - earnedCount}</p>
                            <p className="text-xs text-white/40">Locked</p>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-bold">{Math.round((earnedCount / totalCount) * 100)}%</p>
                            <p className="text-xs text-white/40">Complete</p>
                        </div>
                    </div>
                </section>

                {/* Category Tabs */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm transition-colors",
                                category === cat.id
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAchievements.map(achievement => (
                        <div
                            key={achievement.id}
                            className={cn(
                                "p-5 rounded-2xl border-2 transition-all",
                                achievement.earned
                                    ? rarityColors[achievement.rarity]
                                    : "border-white/10 bg-white/[0.02] opacity-60"
                            )}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={cn(
                                    "text-4xl",
                                    !achievement.earned && "grayscale opacity-50"
                                )}>
                                    {achievement.icon}
                                </div>
                                {achievement.earned ? (
                                    <Check className="h-5 w-5 text-emerald-400" />
                                ) : (
                                    <Lock className="h-5 w-5 text-white/20" />
                                )}
                            </div>

                            <h3 className="font-semibold mb-1">{achievement.title}</h3>
                            <p className="text-sm text-white/50 mb-3">{achievement.description}</p>

                            {achievement.earned ? (
                                <div className="flex items-center justify-between">
                                    <span className={cn("text-xs font-medium", rarityLabels[achievement.rarity].color)}>
                                        {rarityLabels[achievement.rarity].text}
                                    </span>
                                    <span className="text-xs text-white/30">{achievement.earnedDate}</span>
                                </div>
                            ) : achievement.progress ? (
                                <div>
                                    <div className="flex justify-between text-xs text-white/40 mb-1">
                                        <span>Progress</span>
                                        <span>{achievement.progress.current}/{achievement.progress.target}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white/40 rounded-full"
                                            style={{ width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <span className={cn("text-xs font-medium", rarityLabels[achievement.rarity].color)}>
                                    {rarityLabels[achievement.rarity].text}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Coming Soon */}
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 text-center">
                    <Zap className="h-8 w-8 text-white/40 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">More Achievements Coming Soon</h3>
                    <p className="text-sm text-white/50">New challenges are added regularly. Keep learning to unlock them all!</p>
                </div>
            </main>

            <AIAssistantButton />
        </div>
    );
}
