"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Trophy,
    Medal,
    Award,
    Target,
    TrendingUp,
    Search,
    Filter,
    ChevronDown,
    Flame,
    Star,
    BookOpen,
    Clock,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// LEADERBOARD DATA
// =============================================================================

interface LeaderboardUser {
    rank: number;
    name: string;
    avatar: string;
    department: string;
    points: number;
    modules: number;
    certifications: number;
    streak: number;
    change: "up" | "down" | "same";
}

const leaderboardData: LeaderboardUser[] = [
    { rank: 1, name: "Sarah Chen", avatar: "SC", department: "Engineering", points: 4820, modules: 8, certifications: 3, streak: 42, change: "same" },
    { rank: 2, name: "Michael Johnson", avatar: "MJ", department: "Data Science", points: 4650, modules: 8, certifications: 3, streak: 38, change: "up" },
    { rank: 3, name: "Emily Wang", avatar: "EW", department: "Product", points: 4420, modules: 7, certifications: 3, streak: 35, change: "down" },
    { rank: 4, name: "David Kim", avatar: "DK", department: "Engineering", points: 4180, modules: 7, certifications: 2, streak: 28, change: "up" },
    { rank: 5, name: "Lisa Park", avatar: "LP", department: "Engineering", points: 3950, modules: 6, certifications: 2, streak: 25, change: "same" },
    { rank: 6, name: "James Wilson", avatar: "JW", department: "Marketing", points: 3720, modules: 6, certifications: 2, streak: 22, change: "up" },
    { rank: 7, name: "Anna Martinez", avatar: "AM", department: "Operations", points: 3580, modules: 5, certifications: 2, streak: 20, change: "down" },
    { rank: 8, name: "Robert Brown", avatar: "RB", department: "Data Science", points: 3450, modules: 5, certifications: 2, streak: 18, change: "same" },
    { rank: 9, name: "Jennifer Lee", avatar: "JL", department: "Product", points: 3280, modules: 5, certifications: 1, streak: 15, change: "up" },
    { rank: 10, name: "Chris Taylor", avatar: "CT", department: "Engineering", points: 3100, modules: 4, certifications: 1, streak: 12, change: "down" },
];

const departments = ["All Departments", "Engineering", "Product", "Data Science", "Marketing", "Operations"];
const timeRanges = ["This Week", "This Month", "All Time"];

// =============================================================================
// COMPONENTS
// =============================================================================

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm text-white/40 font-medium w-5 text-center">{rank}</span>;
}

function ChangeIndicator({ change }: { change: "up" | "down" | "same" }) {
    if (change === "up") return <TrendingUp className="h-4 w-4 text-emerald-400" />;
    if (change === "down") return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
    return <span className="h-4 w-4 flex items-center justify-center text-white/20">—</span>;
}

// =============================================================================
// LEADERBOARD PAGE
// =============================================================================

export default function LeaderboardPage() {
    const [department, setDepartment] = useState("All Departments");
    const [timeRange, setTimeRange] = useState("This Month");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter users
    const filteredUsers = leaderboardData.filter(user => {
        if (department !== "All Departments" && user.department !== department) return false;
        if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Current user mock (would come from auth)
    const currentUser = {
        rank: 15,
        name: "You",
        avatar: "YO",
        department: "Engineering",
        points: 2450,
        modules: 3,
        certifications: 1,
        streak: 8,
        change: "up" as const,
    };

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
                        <Link href="/leaderboard" className="text-sm text-white font-medium">Leaderboard</Link>
                    </nav>
                    <Link href="/training" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                        Continue Learning
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="py-12 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-montserrat text-3xl font-bold mb-2">Leaderboard</h1>
                            <p className="text-white/50">See how you stack up against your peers</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Time Range */}
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                            >
                                {timeRanges.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            {/* Department */}
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                            >
                                {departments.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <main className="px-6 py-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Leaderboard */}
                    <div className="lg:col-span-2">
                        {/* Search */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search learners..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-white/20"
                            />
                        </div>

                        {/* Top 3 Podium */}
                        <div className="flex items-end justify-center gap-4 mb-8">
                            {/* 2nd Place */}
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-600/20 border-2 border-gray-400 flex items-center justify-center text-lg font-bold mx-auto mb-2">
                                    {leaderboardData[1].avatar}
                                </div>
                                <p className="font-medium text-sm">{leaderboardData[1].name}</p>
                                <p className="text-xs text-white/40">{leaderboardData[1].points.toLocaleString()} pts</p>
                                <div className="h-16 mt-2 bg-white/5 rounded-t-lg flex items-center justify-center">
                                    <Medal className="h-6 w-6 text-gray-400" />
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-amber-600/20 border-2 border-yellow-400 flex items-center justify-center text-xl font-bold mx-auto mb-2">
                                    {leaderboardData[0].avatar}
                                </div>
                                <p className="font-medium">{leaderboardData[0].name}</p>
                                <p className="text-xs text-white/40">{leaderboardData[0].points.toLocaleString()} pts</p>
                                <div className="h-24 mt-2 bg-yellow-500/10 rounded-t-lg flex items-center justify-center">
                                    <Trophy className="h-8 w-8 text-yellow-400" />
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-2 border-amber-600 flex items-center justify-center text-lg font-bold mx-auto mb-2">
                                    {leaderboardData[2].avatar}
                                </div>
                                <p className="font-medium text-sm">{leaderboardData[2].name}</p>
                                <p className="text-xs text-white/40">{leaderboardData[2].points.toLocaleString()} pts</p>
                                <div className="h-12 mt-2 bg-white/5 rounded-t-lg flex items-center justify-center">
                                    <Award className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </div>

                        {/* Full Ranking Table */}
                        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-4 px-4 text-left text-xs text-white/40 font-medium w-12">Rank</th>
                                        <th className="py-4 px-4 text-left text-xs text-white/40 font-medium">Learner</th>
                                        <th className="py-4 px-4 text-center text-xs text-white/40 font-medium">Points</th>
                                        <th className="py-4 px-4 text-center text-xs text-white/40 font-medium">Streak</th>
                                        <th className="py-4 px-4 text-center text-xs text-white/40 font-medium w-12">Δ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <td className="py-3 px-4">
                                                <RankBadge rank={user.rank} />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
                                                        {user.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">{user.name}</p>
                                                        <p className="text-xs text-white/40">{user.department}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-center font-medium">
                                                {user.points.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className="flex items-center justify-center gap-1 text-sm">
                                                    <Flame className="h-3.5 w-3.5 text-orange-400" />
                                                    {user.streak}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <ChangeIndicator change={user.change} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Your Stats */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
                            <h3 className="font-semibold mb-4">Your Stats</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold">
                                    {currentUser.avatar}
                                </div>
                                <div>
                                    <p className="font-medium">{currentUser.name}</p>
                                    <p className="text-sm text-white/40">Rank #{currentUser.rank}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold">{currentUser.points.toLocaleString()}</p>
                                    <p className="text-xs text-white/40">Total Points</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold flex items-center gap-1">
                                        <Flame className="h-5 w-5 text-orange-400" />
                                        {currentUser.streak}
                                    </p>
                                    <p className="text-xs text-white/40">Day Streak</p>
                                </div>
                            </div>
                        </div>

                        {/* How Points Work */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h3 className="font-semibold mb-4">How Points Work</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <BookOpen className="h-4 w-4 text-white/40" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Complete lesson</p>
                                        <p className="text-xs text-white/40">+50 points</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Target className="h-4 w-4 text-white/40" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Pass quiz (80%+)</p>
                                        <p className="text-xs text-white/40">+100 points</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Award className="h-4 w-4 text-white/40" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Earn certification</p>
                                        <p className="text-xs text-white/40">+500 points</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Flame className="h-4 w-4 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Daily streak bonus</p>
                                        <p className="text-xs text-white/40">+10 × streak days</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Quick CTA */}
                        <Link href="/training">
                            <button className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                                Climb the Ranks →
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
