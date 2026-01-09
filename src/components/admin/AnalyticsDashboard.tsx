"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Users,
    BookOpen,
    Trophy,
    TrendingUp,
    Clock,
    Target,
    BarChart3,
    Calendar,
    Download,
    Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Organization admin analytics
export function OrgAnalyticsDashboard({
    stats,
}: {
    stats: {
        totalLearners: number;
        activeLearners: number;
        completedModules: number;
        avgProgress: number;
        totalHoursLearned: number;
        certificatesEarned: number;
    };
}) {
    return (
        <div className="space-y-6">
            {/* Overview stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard
                    icon={<Users className="h-5 w-5 text-blue-400" />}
                    label="Total Learners"
                    value={stats.totalLearners}
                    color="blue"
                />
                <StatCard
                    icon={<Target className="h-5 w-5 text-emerald-400" />}
                    label="Active This Week"
                    value={stats.activeLearners}
                    color="emerald"
                />
                <StatCard
                    icon={<BookOpen className="h-5 w-5 text-purple-400" />}
                    label="Modules Completed"
                    value={stats.completedModules}
                    color="purple"
                />
                <StatCard
                    icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
                    label="Avg Progress"
                    value={`${stats.avgProgress}%`}
                    color="cyan"
                />
                <StatCard
                    icon={<Clock className="h-5 w-5 text-amber-400" />}
                    label="Hours Learned"
                    value={stats.totalHoursLearned}
                    color="amber"
                />
                <StatCard
                    icon={<Trophy className="h-5 w-5 text-pink-400" />}
                    label="Certificates"
                    value={stats.certificatesEarned}
                    color="pink"
                />
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
}) {
    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-white/50">{label}</p>
        </Card>
    );
}

// Learner progress table
export function LearnerProgressTable({
    learners,
}: {
    learners: {
        id: string;
        name: string;
        email: string;
        progress: number;
        modulesCompleted: number;
        lastActive: string;
        streak: number;
    }[];
}) {
    const [sortBy, setSortBy] = useState<"progress" | "lastActive" | "streak">("progress");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const sorted = [...learners].sort((a, b) => {
        const getValue = (item: typeof learners[0]) => {
            if (sortBy === "lastActive") return new Date(item.lastActive).getTime();
            return item[sortBy];
        };
        return sortDir === "desc"
            ? getValue(b) - getValue(a)
            : getValue(a) - getValue(b);
    });

    return (
        <Card className="bg-white/[0.02] border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold">Learner Progress</h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 text-left text-sm text-white/50">
                            <th className="p-4">Learner</th>
                            <th className="p-4 cursor-pointer" onClick={() => setSortBy("progress")}>
                                Progress {sortBy === "progress" && (sortDir === "desc" ? "↓" : "↑")}
                            </th>
                            <th className="p-4">Modules</th>
                            <th className="p-4 cursor-pointer" onClick={() => setSortBy("streak")}>
                                Streak {sortBy === "streak" && (sortDir === "desc" ? "↓" : "↑")}
                            </th>
                            <th className="p-4 cursor-pointer" onClick={() => setSortBy("lastActive")}>
                                Last Active {sortBy === "lastActive" && (sortDir === "desc" ? "↓" : "↑")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((learner) => (
                            <tr key={learner.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-sm font-medium">
                                            {learner.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{learner.name}</p>
                                            <p className="text-xs text-white/40">{learner.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${learner.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-sm">{learner.progress}%</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm">{learner.modulesCompleted}</td>
                                <td className="p-4">
                                    {learner.streak > 0 ? (
                                        <Badge className="bg-amber-500/20 text-amber-400">
                                            🔥 {learner.streak}
                                        </Badge>
                                    ) : (
                                        <span className="text-white/30">-</span>
                                    )}
                                </td>
                                <td className="p-4 text-sm text-white/60">
                                    {new Date(learner.lastActive).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

// Weekly engagement chart
export function EngagementChart({
    data,
}: {
    data: { date: string; activeUsers: number; lessonsCompleted: number }[];
}) {
    const maxUsers = Math.max(...data.map(d => d.activeUsers), 1);
    const maxLessons = Math.max(...data.map(d => d.lessonsCompleted), 1);

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Engagement Overview
                </h3>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-white/50">Active Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-white/50">Lessons Completed</span>
                    </div>
                </div>
            </div>

            <div className="h-48 flex items-end gap-2">
                {data.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex gap-0.5">
                            <div
                                className="flex-1 bg-primary/60 rounded-t"
                                style={{ height: `${(day.activeUsers / maxUsers) * 150}px` }}
                            />
                            <div
                                className="flex-1 bg-emerald-500/60 rounded-t"
                                style={{ height: `${(day.lessonsCompleted / maxLessons) * 150}px` }}
                            />
                        </div>
                        <span className="text-xs text-white/40">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Module completion breakdown
export function ModuleCompletionBreakdown({
    modules,
}: {
    modules: { name: string; enrolled: number; completed: number; avgScore: number }[];
}) {
    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4">Module Performance</h3>
            <div className="space-y-4">
                {modules.map((module, i) => {
                    const completionRate = module.enrolled > 0
                        ? Math.round((module.completed / module.enrolled) * 100)
                        : 0;

                    return (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">{module.name}</span>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="text-white/50">
                                        {module.completed}/{module.enrolled} completed
                                    </span>
                                    <Badge className={cn(
                                        "text-xs",
                                        completionRate >= 70
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : completionRate >= 40
                                                ? "bg-amber-500/20 text-amber-400"
                                                : "bg-red-500/20 text-red-400"
                                    )}>
                                        {completionRate}%
                                    </Badge>
                                </div>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full",
                                        completionRate >= 70
                                            ? "bg-emerald-500"
                                            : completionRate >= 40
                                                ? "bg-amber-500"
                                                : "bg-red-500"
                                    )}
                                    style={{ width: `${completionRate}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
