"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    BookOpen,
    Clock,
    Award,
    Target,
    TrendingUp,
    Flame,
    Calendar,
    ChevronRight,
    Play,
    CheckCircle2,
    BarChart3,
    Trophy,
    Star,
    Zap,
    Brain,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIAssistantButton } from "@/components/ai";
import { useAuth } from "@/lib/auth/AuthContext";

// =============================================================================
// USER DATA INTERFACE
// =============================================================================

interface UserProgress {
    name: string;
    streak: number;
    totalPoints: number;
    rank: number;
    completedLessons: number;
    totalLessons: number;
    completedModules: number;
    totalModules: number;
    certifications: number;
    weeklyGoal: { current: number; target: number };
    recentActivity: Array<{ type: string; title: string; time: string; points: number; score?: number }>;
    upNext: Array<{ id: string; lessonNumber: number; title: string; duration: string }>;
    achievements: Array<{ icon: string; title: string; earned: boolean }>;
}

// Default data for loading state
const defaultUserData: UserProgress = {
    name: "Learner",
    streak: 0,
    totalPoints: 0,
    rank: 0,
    completedLessons: 0,
    totalLessons: 10,
    completedModules: 0,
    totalModules: 10,
    certifications: 0,
    weeklyGoal: { current: 0, target: 5 },
    recentActivity: [],
    upNext: [
        { id: "module-1", lessonNumber: 1, title: "AI Fundamentals", duration: "30 min" },
        { id: "module-2", lessonNumber: 1, title: "Introduction to LLMs", duration: "35 min" },
    ],
    achievements: [
        { icon: "🔥", title: "7-Day Streak", earned: false },
        { icon: "📚", title: "First Module", earned: false },
        { icon: "🎯", title: "Quiz Master", earned: false },
        { icon: "🏆", title: "Top 10%", earned: false },
    ],
};

// =============================================================================
// STAT CARD
// =============================================================================

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    value: string | number;
    label: string;
    trend?: { value: number; positive: boolean };
    color?: string;
}

function StatCard({ icon: Icon, value, label, trend, color = "text-white" }: StatCardProps) {
    return (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-start justify-between mb-2">
                <Icon className={cn("h-5 w-5", color)} />
                {trend && (
                    <span className={cn(
                        "text-xs font-medium flex items-center gap-0.5",
                        trend.positive ? "text-emerald-400" : "text-red-400"
                    )}>
                        <TrendingUp className={cn("h-3 w-3", !trend.positive && "rotate-180")} />
                        {trend.value}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-white/40">{label}</p>
        </div>
    );
}

// =============================================================================
// PROGRESS RING
// =============================================================================

function ProgressRing({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-white/10"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-emerald-500 transition-all duration-500"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{progress}%</span>
                <span className="text-xs text-white/40">Complete</span>
            </div>
        </div>
    );
}

// =============================================================================
// MAIN PROGRESS PAGE
// =============================================================================

export default function MyProgressPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [userData, setUserData] = useState<UserProgress>(defaultUserData);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real progress data from API
    useEffect(() => {
        async function fetchProgress() {
            try {
                const response = await fetch('/api/progress');
                if (response.ok) {
                    const data = await response.json();

                    // Transform API data to our format
                    if (data.progress && data.progress.length > 0) {
                        const completedLessons = data.progress.filter(
                            (p: { status: string }) => p.status === 'COMPLETED'
                        ).length;
                        const completedModules = data.progress.filter(
                            (p: { completionPercentage: number; lessonId: null }) =>
                                p.completionPercentage >= 100 && !p.lessonId
                        ).length;

                        setUserData(prev => ({
                            ...prev,
                            name: user?.name || prev.name,
                            completedLessons,
                            completedModules,
                            totalModules: 10, // From curriculum
                            achievements: prev.achievements.map((a, i) => ({
                                ...a,
                                earned: i === 0 ? prev.streak >= 7 :
                                    i === 1 ? completedModules >= 1 : a.earned
                            }))
                        }));
                    }
                }
            } catch (error) {
                console.error('Failed to fetch progress:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (!authLoading && user) {
            setUserData(prev => ({ ...prev, name: user.name || 'Learner' }));
            fetchProgress();
        } else if (!authLoading) {
            setIsLoading(false);
        }
    }, [authLoading, user]);

    const overallProgress = userData.totalLessons > 0
        ? Math.round((userData.completedLessons / userData.totalLessons) * 100)
        : 0;

    if (isLoading || authLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                    <p className="text-white/40">Loading your progress...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-6xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/catalog" className="text-sm text-white/60 hover:text-white transition-colors">Catalog</Link>
                        <Link href="/training" className="text-sm text-white/60 hover:text-white transition-colors">My Learning</Link>
                        <Link href="/my-progress" className="text-sm text-white font-medium">Progress</Link>
                        <Link href="/leaderboard" className="text-sm text-white/60 hover:text-white transition-colors">Leaderboard</Link>
                    </nav>
                    <Link href="/training" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                        Continue Learning
                    </Link>
                </div>
            </header>

            <main className="px-6 py-8 max-w-6xl mx-auto">
                {/* Welcome Header */}
                <section className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Welcome back, {userData.name}! 👋</h1>
                            <p className="text-white/50">Keep up the momentum. You're doing great!</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            <Flame className="h-5 w-5 text-orange-400" />
                            <span className="font-bold">{userData.streak}</span>
                            <span className="text-sm text-white/60">day streak</span>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={BookOpen}
                        value={`${userData.completedLessons}/${userData.totalLessons}`}
                        label="Lessons Completed"
                        trend={{ value: 12, positive: true }}
                    />
                    <StatCard
                        icon={Target}
                        value={userData.completedModules}
                        label="Modules Finished"
                        color="text-emerald-400"
                    />
                    <StatCard
                        icon={Award}
                        value={userData.certifications}
                        label="Certifications"
                        color="text-purple-400"
                    />
                    <StatCard
                        icon={Trophy}
                        value={`#${userData.rank}`}
                        label="Leaderboard Rank"
                        trend={{ value: 3, positive: true }}
                        color="text-yellow-400"
                    />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overall Progress */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h2 className="font-semibold mb-6">Overall Progress</h2>
                            <div className="flex items-center gap-8">
                                <ProgressRing progress={overallProgress} />
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Foundations Track</span>
                                            <span className="text-white/40">75%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full">
                                            <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Associate Track</span>
                                            <span className="text-white/40">25%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full">
                                            <div className="h-full w-1/4 bg-emerald-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Professional Track</span>
                                            <span className="text-white/40">0%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full">
                                            <div className="h-full w-0 bg-purple-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Up Next */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold">Up Next</h2>
                                <Link href="/training" className="text-sm text-white/40 hover:text-white transition-colors">
                                    View all →
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {userData.upNext.map((lesson, i) => (
                                    <Link key={i} href={`/lesson/${lesson.id}/${lesson.lessonNumber}`}>
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                                <Play className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm group-hover:text-white transition-colors">{lesson.title}</p>
                                                <p className="text-xs text-white/40">Module {lesson.id.split("-")[1]} • {lesson.duration}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h2 className="font-semibold mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {userData.recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center",
                                            activity.type === "lesson" ? "bg-blue-500/20" : "bg-emerald-500/20"
                                        )}>
                                            {activity.type === "lesson" ? (
                                                <BookOpen className="h-4 w-4 text-blue-400" />
                                            ) : (
                                                <Target className="h-4 w-4 text-emerald-400" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-xs text-white/40">{activity.time}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-emerald-400">+{activity.points} pts</p>
                                            {activity.score && (
                                                <p className="text-xs text-white/40">{activity.score}% score</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Weekly Goal */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-white/60" />
                                <h2 className="font-semibold">Weekly Goal</h2>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>{userData.weeklyGoal.current} of {userData.weeklyGoal.target} lessons</span>
                                    <span className="text-white/40">{Math.round((userData.weeklyGoal.current / userData.weeklyGoal.target) * 100)}%</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                        style={{ width: `${(userData.weeklyGoal.current / userData.weeklyGoal.target) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-white/40">
                                Just {userData.weeklyGoal.target - userData.weeklyGoal.current} more lesson{userData.weeklyGoal.target - userData.weeklyGoal.current !== 1 ? 's' : ''} to hit your goal!
                            </p>
                        </div>

                        {/* Achievements */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold">Achievements</h2>
                                <Link href="/achievements" className="text-xs text-white/40 hover:text-white">View all</Link>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {userData.achievements.map((achievement, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "p-3 rounded-xl text-center",
                                            achievement.earned ? "bg-white/5" : "bg-white/[0.02] opacity-50"
                                        )}
                                    >
                                        <span className="text-2xl">{achievement.icon}</span>
                                        <p className="text-xs mt-1">{achievement.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Points Breakdown */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold">Total Points</h2>
                                <span className="text-xl font-bold">{userData.totalPoints.toLocaleString()}</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/40">From lessons</span>
                                    <span>1,200</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/40">From quizzes</span>
                                    <span>700</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/40">From streaks</span>
                                    <span>350</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/40">From certifications</span>
                                    <span>500</span>
                                </div>
                            </div>
                            <Link href="/leaderboard">
                                <button className="w-full mt-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors">
                                    View Leaderboard →
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* AI Assistant Button */}
            <AIAssistantButton />
        </div>
    );
}
