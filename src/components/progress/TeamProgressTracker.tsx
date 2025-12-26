"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    Search,
    Filter,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Eye,
    Download,
    ChevronDown,
    ChevronRight,
    ArrowUpRight,
    BarChart3,
    Calendar,
    Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LearnerProgress {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    avatar?: string;
    assignedCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    avgScore: number;
    totalHours: number;
    lastActive: string;
    status: "on-track" | "at-risk" | "overdue";
}

const learners: LearnerProgress[] = [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com", department: "Engineering", role: "Senior Developer", assignedCourses: 8, completedCourses: 7, inProgressCourses: 1, avgScore: 94, totalHours: 18, lastActive: "2 hours ago", status: "on-track" },
    { id: "2", name: "Marcus Johnson", email: "marcus@company.com", department: "Product", role: "Product Manager", assignedCourses: 6, completedCourses: 4, inProgressCourses: 1, avgScore: 88, totalHours: 12, lastActive: "1 day ago", status: "on-track" },
    { id: "3", name: "Emily Rodriguez", email: "emily@company.com", department: "Design", role: "UX Designer", assignedCourses: 5, completedCourses: 5, inProgressCourses: 0, avgScore: 96, totalHours: 10, lastActive: "3 hours ago", status: "on-track" },
    { id: "4", name: "David Kim", email: "david@company.com", department: "Engineering", role: "QA Engineer", assignedCourses: 7, completedCourses: 3, inProgressCourses: 2, avgScore: 78, totalHours: 8, lastActive: "5 days ago", status: "at-risk" },
    { id: "5", name: "Lisa Wang", email: "lisa@company.com", department: "Engineering", role: "Team Lead", assignedCourses: 10, completedCourses: 10, inProgressCourses: 0, avgScore: 98, totalHours: 24, lastActive: "1 hour ago", status: "on-track" },
    { id: "6", name: "Robert Garcia", email: "robert@company.com", department: "Sales", role: "Account Executive", assignedCourses: 6, completedCourses: 2, inProgressCourses: 1, avgScore: 72, totalHours: 6, lastActive: "1 week ago", status: "overdue" },
    { id: "7", name: "Jennifer Lee", email: "jennifer@company.com", department: "HR", role: "HR Manager", assignedCourses: 5, completedCourses: 4, inProgressCourses: 1, avgScore: 91, totalHours: 9, lastActive: "4 hours ago", status: "on-track" },
    { id: "8", name: "Michael Brown", email: "michael@company.com", department: "Operations", role: "Operations Lead", assignedCourses: 8, completedCourses: 4, inProgressCourses: 2, avgScore: 82, totalHours: 11, lastActive: "3 days ago", status: "at-risk" },
];

export function TeamProgressTracker() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "on-track" | "at-risk" | "overdue">("all");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [expandedLearner, setExpandedLearner] = useState<string | null>(null);

    const filteredLearners = learners.filter((l) => {
        const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || l.status === statusFilter;
        const matchesDept = departmentFilter === "all" || l.department === departmentFilter;
        return matchesSearch && matchesStatus && matchesDept;
    });

    const stats = {
        total: learners.length,
        onTrack: learners.filter((l) => l.status === "on-track").length,
        atRisk: learners.filter((l) => l.status === "at-risk").length,
        overdue: learners.filter((l) => l.status === "overdue").length,
        avgCompletion: Math.round(learners.reduce((sum, l) => sum + (l.completedCourses / l.assignedCourses) * 100, 0) / learners.length),
    };

    const departments = [...new Set(learners.map((l) => l.department))];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "on-track":
                return <Badge className="bg-emerald-500/10 text-emerald-500">On Track</Badge>;
            case "at-risk":
                return <Badge className="bg-amber-500/10 text-amber-500">At Risk</Badge>;
            case "overdue":
                return <Badge className="bg-red-500/10 text-red-500">Overdue</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 className="h-7 w-7 text-primary" />
                        Team Progress
                    </h1>
                    <p className="text-muted-foreground">
                        Track learning progress across your organization
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="p-4">
                    <Users className="h-5 w-5 text-primary mb-2" />
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Learners</p>
                </Card>
                <Card className="p-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-2" />
                    <p className="text-2xl font-bold">{stats.onTrack}</p>
                    <p className="text-xs text-muted-foreground">On Track</p>
                </Card>
                <Card className="p-4">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mb-2" />
                    <p className="text-2xl font-bold">{stats.atRisk}</p>
                    <p className="text-xs text-muted-foreground">At Risk</p>
                </Card>
                <Card className="p-4">
                    <Clock className="h-5 w-5 text-red-500 mb-2" />
                    <p className="text-2xl font-bold">{stats.overdue}</p>
                    <p className="text-xs text-muted-foreground">Overdue</p>
                </Card>
                <Card className="p-4">
                    <Target className="h-5 w-5 text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{stats.avgCompletion}%</p>
                    <p className="text-xs text-muted-foreground">Avg Completion</p>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-wrap gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                        className="h-10 px-3 rounded-lg bg-muted border-0"
                    >
                        <option value="all">All Status</option>
                        <option value="on-track">On Track</option>
                        <option value="at-risk">At Risk</option>
                        <option value="overdue">Overdue</option>
                    </select>
                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="h-10 px-3 rounded-lg bg-muted border-0"
                    >
                        <option value="all">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
            </Card>

            {/* Learners Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Learner</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Progress</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Avg Score</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Hours</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLearners.map((learner) => (
                                <>
                                    <tr
                                        key={learner.id}
                                        className="border-b border-border hover:bg-white/[0.02] cursor-pointer"
                                        onClick={() => setExpandedLearner(expandedLearner === learner.id ? null : learner.id)}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-sm font-medium">
                                                    {learner.name.split(" ").map((n) => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{learner.name}</p>
                                                    <p className="text-xs text-muted-foreground">{learner.department} • {learner.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Progress
                                                    value={(learner.completedCourses / learner.assignedCourses) * 100}
                                                    className="w-24 h-2"
                                                />
                                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                                    {learner.completedCourses}/{learner.assignedCourses}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={cn(
                                                "font-medium",
                                                learner.avgScore >= 90 ? "text-emerald-500" :
                                                    learner.avgScore >= 80 ? "text-amber-500" : "text-red-500"
                                            )}>
                                                {learner.avgScore}%
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm">{learner.totalHours}h</td>
                                        <td className="p-4 text-sm text-muted-foreground">{learner.lastActive}</td>
                                        <td className="p-4">{getStatusBadge(learner.status)}</td>
                                        <td className="p-4">
                                            <ChevronDown className={cn(
                                                "h-4 w-4 text-muted-foreground transition-transform",
                                                expandedLearner === learner.id && "rotate-180"
                                            )} />
                                        </td>
                                    </tr>
                                    {expandedLearner === learner.id && (
                                        <tr className="bg-muted/30">
                                            <td colSpan={7} className="p-4">
                                                <div className="grid md:grid-cols-4 gap-4">
                                                    <div className="p-3 rounded-lg bg-background">
                                                        <p className="text-xs text-muted-foreground mb-1">Completed</p>
                                                        <p className="text-lg font-bold text-emerald-500">{learner.completedCourses}</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-background">
                                                        <p className="text-xs text-muted-foreground mb-1">In Progress</p>
                                                        <p className="text-lg font-bold text-blue-500">{learner.inProgressCourses}</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-background">
                                                        <p className="text-xs text-muted-foreground mb-1">Not Started</p>
                                                        <p className="text-lg font-bold text-muted-foreground">
                                                            {learner.assignedCourses - learner.completedCourses - learner.inProgressCourses}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm" className="gap-1">
                                                            <Eye className="h-3 w-3" />
                                                            View Details
                                                        </Button>
                                                        {learner.status !== "on-track" && (
                                                            <Button size="sm">Send Reminder</Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
