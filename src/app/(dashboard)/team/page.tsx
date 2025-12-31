"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Users,
    TrendingUp,
    Clock,
    Award,
    GraduationCap,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    Filter,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

interface ProgressEntry {
    id: string;
    userId: string;
    moduleId: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    completionPercentage: number;
    timeSpentSeconds: number;
    lastAccessedAt: string | null;
    completedAt: string | null;
    user: {
        id: string;
        name: string | null;
        email: string;
        role: string;
        organization: { name: string };
    };
}

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    progress: {
        coursesCompleted: number;
        totalCourses: number;
        hoursSpent: number;
        completionRate: number;
        lastActive: string;
    };
}

// =============================================================================
// TEAM DASHBOARD PAGE
// =============================================================================

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

    const fetchProgress = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/progress");
            const data = await res.json();

            if (data.success) {
                // Group progress by user
                const userProgressMap = new Map<string, ProgressEntry[]>();

                for (const entry of data.progress) {
                    const userId = entry.user.id;
                    if (!userProgressMap.has(userId)) {
                        userProgressMap.set(userId, []);
                    }
                    userProgressMap.get(userId)!.push(entry);
                }

                // Convert to team members
                const members: TeamMember[] = [];
                userProgressMap.forEach((entries, userId) => {
                    const user = entries[0].user;
                    const completed = entries.filter(e => e.status === "COMPLETED").length;
                    const totalHours = entries.reduce((sum, e) => sum + (e.timeSpentSeconds || 0), 0) / 3600;
                    const lastActive = entries
                        .filter(e => e.lastAccessedAt)
                        .sort((a, b) => new Date(b.lastAccessedAt!).getTime() - new Date(a.lastAccessedAt!).getTime())[0]?.lastAccessedAt;

                    members.push({
                        id: userId,
                        name: user.name || "Unknown",
                        email: user.email,
                        role: user.role,
                        progress: {
                            coursesCompleted: completed,
                            totalCourses: entries.length,
                            hoursSpent: Math.round(totalHours * 10) / 10,
                            completionRate: entries.length > 0 ? Math.round((completed / entries.length) * 100) : 0,
                            lastActive: lastActive || "Never",
                        },
                    });
                });

                setTeamMembers(members);
            } else {
                setError(data.error || "Failed to fetch progress");
            }
        } catch (err) {
            setError("Failed to fetch team progress");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    // Calculate team stats
    const totalMembers = teamMembers.length;
    const averageCompletion = totalMembers > 0
        ? Math.round(teamMembers.reduce((sum, m) => sum + m.progress.completionRate, 0) / totalMembers)
        : 0;
    const totalHours = teamMembers.reduce((sum, m) => sum + m.progress.hoursSpent, 0);
    const totalCompleted = teamMembers.reduce((sum, m) => sum + m.progress.coursesCompleted, 0);

    // Filter members
    const filteredMembers = teamMembers.filter((m) => {
        if (filter === "active") return m.progress.completionRate > 0 && m.progress.completionRate < 100;
        if (filter === "inactive") return m.progress.completionRate === 0;
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 max-w-6xl mx-auto">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="text-destructive">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Team Progress</h1>
                <p className="text-muted-foreground mt-1">
                    Monitor your team&apos;s training progress and completion rates
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Team Members</p>
                            <p className="text-2xl font-bold">{totalMembers}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Completion</p>
                            <p className="text-2xl font-bold">{averageCompletion}%</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Hours</p>
                            <p className="text-2xl font-bold">{Math.round(totalHours)}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <Award className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="text-2xl font-bold">{totalCompleted}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-6">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex rounded-lg border border-border overflow-hidden">
                    {(["all", "active", "inactive"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors",
                                filter === f ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            )}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Team Members */}
            {filteredMembers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No team members with progress data yet.</p>
                    <p className="text-sm mt-1">Assign training modules to start tracking progress.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredMembers.map((member) => (
                        <div
                            key={member.id}
                            className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-lg font-semibold text-primary">
                                            {member.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Completed</p>
                                    <p className="font-semibold">
                                        {member.progress.coursesCompleted}/{member.progress.totalCourses}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Hours</p>
                                    <p className="font-semibold">{member.progress.hoursSpent}h</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Completion</p>
                                    <p className="font-semibold">{member.progress.completionRate}%</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Last Active</p>
                                    <p className="font-semibold">
                                        {member.progress.lastActive === "Never"
                                            ? "Never"
                                            : new Date(member.progress.lastActive).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all",
                                            member.progress.completionRate === 100
                                                ? "bg-emerald-500"
                                                : member.progress.completionRate > 0
                                                    ? "bg-primary"
                                                    : "bg-muted-foreground/20"
                                        )}
                                        style={{ width: `${member.progress.completionRate}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div className="mt-8 flex gap-4">
                <Link
                    href="/assign"
                    className="flex-1 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors text-center"
                >
                    <GraduationCap className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Assign Training</p>
                </Link>
                <Link
                    href="/admin/users"
                    className="flex-1 p-4 rounded-xl bg-muted border border-border hover:bg-muted/80 transition-colors text-center"
                >
                    <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Manage Users</p>
                </Link>
            </div>
        </div>
    );
}
