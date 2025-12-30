"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BarChart3,
    Users,
    Award,
    TrendingUp,
    Clock,
    BookOpen,
    Target,
    ChevronRight,
    Download,
    Calendar,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Search,
    MoreHorizontal,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// MOCK DATA
// =============================================================================

const dashboardStats = {
    activeUsers: { value: 847, change: 12, trend: "up" },
    completionRate: { value: 73, change: 5, trend: "up" },
    avgTimeToComplete: { value: "4.2 weeks", change: -8, trend: "down" },
    certificationsEarned: { value: 234, change: 18, trend: "up" },
};

const topModules = [
    { name: "AI Fundamentals", completions: 342, rating: 4.8 },
    { name: "Prompt Engineering", completions: 289, rating: 4.9 },
    { name: "LLM Architecture", completions: 256, rating: 4.7 },
    { name: "Agentic AI Systems", completions: 198, rating: 4.6 },
    { name: "RAG Implementation", completions: 176, rating: 4.8 },
];

const teamProgress = [
    { name: "Engineering", members: 156, completion: 78, certifications: 89 },
    { name: "Product", members: 42, completion: 82, certifications: 28 },
    { name: "Data Science", members: 38, completion: 91, certifications: 32 },
    { name: "Marketing", members: 24, completion: 65, certifications: 12 },
    { name: "Operations", members: 18, completion: 58, certifications: 8 },
];

const recentActivity = [
    { user: "Sarah Chen", action: "Completed AI Foundations Certification", time: "2 hours ago", type: "certification" },
    { user: "Mike Johnson", action: "Started Prompt Engineering module", time: "3 hours ago", type: "progress" },
    { user: "Lisa Wang", action: "Scored 95% on LLM Assessment", time: "5 hours ago", type: "assessment" },
    { user: "Tom Davis", action: "Completed RAG Implementation project", time: "1 day ago", type: "project" },
    { user: "Emma Wilson", action: "Earned Associate Certification", time: "1 day ago", type: "certification" },
];

const atRiskUsers = [
    { name: "John Smith", email: "john.smith@company.com", daysInactive: 14, progress: 23 },
    { name: "Amy Brown", email: "amy.brown@company.com", daysInactive: 12, progress: 45 },
    { name: "Chris Lee", email: "chris.lee@company.com", daysInactive: 10, progress: 67 },
];

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    trend: "up" | "down";
    icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
    const isPositive = (trend === "up" && change > 0) || (trend === "down" && change < 0);

    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5">
                    <Icon className="h-5 w-5 text-white/60" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isPositive ? "text-emerald-400" : "text-red-400"
                )}>
                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-2xl font-bold mb-1">{value}{typeof value === "number" && title.includes("Rate") ? "%" : ""}</p>
            <p className="text-sm text-white/40">{title}</p>
        </div>
    );
}

// =============================================================================
// ADMIN DASHBOARD PAGE
// =============================================================================

export default function AdminDashboardPage() {
    const [timeRange, setTimeRange] = useState("30d");

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                            ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                        </Link>
                        <span className="text-xs text-white/40 border-l border-white/10 pl-4">Admin Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                            <option value="1y">Last year</option>
                        </select>
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>
            </header>

            <main className="px-6 py-8 max-w-7xl mx-auto">
                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Active Learners"
                        value={dashboardStats.activeUsers.value}
                        change={dashboardStats.activeUsers.change}
                        trend={dashboardStats.activeUsers.trend as "up" | "down"}
                        icon={Users}
                    />
                    <StatCard
                        title="Completion Rate"
                        value={dashboardStats.completionRate.value}
                        change={dashboardStats.completionRate.change}
                        trend={dashboardStats.completionRate.trend as "up" | "down"}
                        icon={Target}
                    />
                    <StatCard
                        title="Avg. Time to Complete"
                        value={dashboardStats.avgTimeToComplete.value}
                        change={dashboardStats.avgTimeToComplete.change}
                        trend={dashboardStats.avgTimeToComplete.trend as "up" | "down"}
                        icon={Clock}
                    />
                    <StatCard
                        title="Certifications Earned"
                        value={dashboardStats.certificationsEarned.value}
                        change={dashboardStats.certificationsEarned.change}
                        trend={dashboardStats.certificationsEarned.trend as "up" | "down"}
                        icon={Award}
                    />
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Team Progress */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Team Progress</h2>
                                <Link href="/admin/teams" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1">
                                    View all <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {teamProgress.map((team, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-28 text-sm font-medium truncate">{team.name}</div>
                                        <div className="flex-1">
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full"
                                                    style={{ width: `${team.completion}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-12 text-right text-sm text-white/60">{team.completion}%</div>
                                        <div className="w-20 text-right text-xs text-white/40">
                                            {team.members} users
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Modules */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Top Modules</h2>
                                <Link href="/admin/content" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1">
                                    Manage <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-2 text-white/40 font-medium">Module</th>
                                            <th className="text-right py-2 text-white/40 font-medium">Completions</th>
                                            <th className="text-right py-2 text-white/40 font-medium">Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topModules.map((module, i) => (
                                            <tr key={i} className="border-b border-white/5">
                                                <td className="py-3">{module.name}</td>
                                                <td className="py-3 text-right text-white/60">{module.completions}</td>
                                                <td className="py-3 text-right">
                                                    <span className="text-yellow-400">★</span> {module.rating}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 1/3 width */}
                    <div className="space-y-6">
                        {/* At-Risk Users */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                                <h2 className="font-semibold">At-Risk Learners</h2>
                            </div>
                            <div className="space-y-3">
                                {atRiskUsers.map((user, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-sm">{user.name}</span>
                                            <span className="text-xs text-yellow-400">{user.daysInactive}d inactive</span>
                                        </div>
                                        <div className="text-xs text-white/40 mb-2">{user.email}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-white/40 rounded-full"
                                                    style={{ width: `${user.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-white/40">{user.progress}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm text-white/60 hover:text-white transition-colors">
                                Send Reminder Emails →
                            </button>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h2 className="font-semibold mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentActivity.slice(0, 4).map((activity, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                            activity.type === "certification" ? "bg-emerald-500/20" :
                                                activity.type === "assessment" ? "bg-blue-500/20" : "bg-white/10"
                                        )}>
                                            {activity.type === "certification" ? (
                                                <Award className="h-4 w-4 text-emerald-400" />
                                            ) : activity.type === "assessment" ? (
                                                <Target className="h-4 w-4 text-blue-400" />
                                            ) : (
                                                <BookOpen className="h-4 w-4 text-white/40" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{activity.user}</p>
                                            <p className="text-xs text-white/40 truncate">{activity.action}</p>
                                            <p className="text-xs text-white/30">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h2 className="font-semibold mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Link href="/admin/onboarding">
                                    <button className="w-full p-3 text-left text-sm bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                                        <Users className="h-4 w-4 text-white/40" />
                                        Import Employees
                                    </button>
                                </Link>
                                <Link href="/admin/assignments">
                                    <button className="w-full p-3 text-left text-sm bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                                        <GraduationCap className="h-4 w-4 text-white/40" />
                                        Assign Training
                                    </button>
                                </Link>
                                <Link href="/admin/reports">
                                    <button className="w-full p-3 text-left text-sm bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                                        <BarChart3 className="h-4 w-4 text-white/40" />
                                        Generate Report
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
