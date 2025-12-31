"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Search,
    RefreshCw,
    Send,
    BarChart3,
    User,
    ChevronRight,
    Loader2,
    Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressRecord {
    userId: string;
    userName: string;
    userEmail: string;
    moduleId: string;
    moduleName?: string;
    percentComplete: number;
    lessonsCompleted: number;
    totalLessons?: number;
    lastAccessedAt: string | null;
}

interface AtRiskUser {
    id: string;
    name: string;
    email: string;
    moduleId: string;
    dueDate: string;
    percentComplete: number;
}

interface ProgressSummary {
    totalUsers: number;
    usersWithProgress: number;
    completedModules: number;
    inProgressModules: number;
    atRiskCount: number;
}

interface ProgressData {
    summary: ProgressSummary;
    progress: ProgressRecord[];
    atRiskUsers: AtRiskUser[];
}

export function ProgressDashboard() {
    const [data, setData] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [sendingReminder, setSendingReminder] = useState(false);

    const fetchProgress = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/progress");
            const json = await res.json();
            if (json.success) {
                setData(json);
            }
        } catch (error) {
            console.error("Failed to fetch progress:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
        // Auto-refresh every 30 seconds for near real-time
        const interval = setInterval(fetchProgress, 30000);
        return () => clearInterval(interval);
    }, []);

    const sendReminders = async () => {
        if (selectedUsers.length === 0) return;
        setSendingReminder(true);

        try {
            await fetch("/api/admin/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userIds: selectedUsers,
                    type: "reminder",
                }),
            });
            setSelectedUsers([]);
            alert("Reminders sent successfully!");
        } catch (error) {
            console.error("Failed to send reminders:", error);
            alert("Failed to send reminders");
        } finally {
            setSendingReminder(false);
        }
    };

    const exportCSV = () => {
        if (!data?.progress || data.progress.length === 0) {
            alert("No data to export");
            return;
        }

        const headers = ["Name", "Email", "Module", "Progress %", "Last Accessed"];
        const rows = data.progress.map((p) => [
            p.userName,
            p.userEmail,
            p.moduleName || p.moduleId,
            p.percentComplete.toString(),
            p.lastAccessedAt ? new Date(p.lastAccessedAt).toLocaleDateString() : "Never",
        ]);

        const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `progress_report_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const toggleUserSelection = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    // Group progress by user
    const userProgress = data?.progress.reduce((acc, p) => {
        if (!acc[p.userId]) {
            acc[p.userId] = {
                userId: p.userId,
                userName: p.userName,
                userEmail: p.userEmail,
                modules: [],
                avgProgress: 0,
            };
        }
        acc[p.userId].modules.push(p);
        return acc;
    }, {} as Record<string, { userId: string; userName: string; userEmail: string; modules: ProgressRecord[]; avgProgress: number }>);

    // Calculate average progress per user
    if (userProgress) {
        Object.values(userProgress).forEach((u) => {
            u.avgProgress = u.modules.length > 0
                ? Math.round(u.modules.reduce((sum, m) => sum + m.percentComplete, 0) / u.modules.length)
                : 0;
        });
    }

    const filteredUsers = userProgress
        ? Object.values(userProgress).filter(
            (u) =>
                u.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    if (loading && !data) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Team Progress</h2>
                    <p className="text-sm text-muted-foreground">Real-time training completion tracking</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={exportCSV} variant="outline" className="gap-2 border-white/10">
                        <Download className="h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button onClick={fetchProgress} variant="outline" className="gap-2 border-white/10">
                        <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            {data?.summary && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-blue-400" />
                            <div>
                                <p className="text-2xl font-bold text-white">{data.summary.totalUsers}</p>
                                <p className="text-xs text-blue-300/70">Total Users</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-emerald-500/10 border-emerald-500/20">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-emerald-400" />
                            <div>
                                <p className="text-2xl font-bold text-white">{data.summary.usersWithProgress}</p>
                                <p className="text-xs text-emerald-300/70">Active Learners</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-purple-500/10 border-purple-500/20">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-purple-400" />
                            <div>
                                <p className="text-2xl font-bold text-white">{data.summary.completedModules}</p>
                                <p className="text-xs text-purple-300/70">Completed</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-amber-500/10 border-amber-500/20">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-amber-400" />
                            <div>
                                <p className="text-2xl font-bold text-white">{data.summary.inProgressModules}</p>
                                <p className="text-xs text-amber-300/70">In Progress</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-red-500/10 border-red-500/20">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            <div>
                                <p className="text-2xl font-bold text-white">{data.summary.atRiskCount}</p>
                                <p className="text-xs text-red-300/70">At Risk</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* At Risk Users Alert */}
            {data?.atRiskUsers && data.atRiskUsers.length > 0 && (
                <Card className="p-4 bg-red-500/10 border-red-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            <span className="font-medium text-white">Users Behind on Training</span>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => {
                                const ids = data.atRiskUsers.map((u) => u.id);
                                setSelectedUsers(ids);
                            }}
                            className="gap-2 bg-red-600 hover:bg-red-700"
                        >
                            <Send className="h-4 w-4" />
                            Send Reminders to All
                        </Button>
                    </div>
                    <div className="grid gap-2">
                        {data.atRiskUsers.slice(0, 5).map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-black/20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <User className="h-4 w-4 text-red-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">Due: {new Date(user.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-red-400">{user.percentComplete}%</p>
                                        <p className="text-xs text-muted-foreground">complete</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.atRiskUsers.length > 5 && (
                            <p className="text-sm text-muted-foreground text-center pt-2">
                                + {data.atRiskUsers.length - 5} more users behind
                            </p>
                        )}
                    </div>
                </Card>
            )}

            {/* User Progress Table */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-white">All User Progress</h3>
                    <div className="flex items-center gap-3">
                        {selectedUsers.length > 0 && (
                            <Button
                                size="sm"
                                onClick={sendReminders}
                                disabled={sendingReminder}
                                className="gap-2 bg-slate-600"
                            >
                                {sendingReminder ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                                Send Reminder ({selectedUsers.length})
                            </Button>
                        )}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="h-9 pl-9 pr-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:outline-none focus:border-white/30"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No users found</p>
                    ) : (
                        filteredUsers.map((user) => (
                            <div
                                key={user.userId}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.userId)}
                                    onChange={() => toggleUserSelection(user.userId)}
                                    className="w-4 h-4 rounded"
                                />
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-semibold text-white">
                                    {user.userName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white">{user.userName}</p>
                                    <p className="text-xs text-muted-foreground">{user.userEmail}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-32">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">Avg Progress</span>
                                            <span className={cn(
                                                "font-medium",
                                                user.avgProgress >= 80 ? "text-emerald-400" :
                                                    user.avgProgress >= 50 ? "text-amber-400" : "text-red-400"
                                            )}>
                                                {user.avgProgress}%
                                            </span>
                                        </div>
                                        <Progress value={user.avgProgress} className="h-1.5" />
                                    </div>
                                    <Badge variant="outline" className="border-white/10">
                                        {user.modules.length} module(s)
                                    </Badge>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
}
