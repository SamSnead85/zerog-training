"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Building2,
    Users,
    BookOpen,
    TrendingUp,
    Award,
    Clock,
    Target,
    BarChart3,
    ChevronDown,
    ChevronRight,
    Eye,
    Download,
    Calendar,
    Zap,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    department: string;
    progress: number;
    completedModules: number;
    totalAssigned: number;
    streak: number;
    lastActive: string;
    status: "on-track" | "at-risk" | "overdue";
}

interface DepartmentStats {
    name: string;
    memberCount: number;
    avgProgress: number;
    completionRate: number;
    topPerformer: string;
}

const mockTeamMembers: TeamMember[] = [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com", role: "Developer", department: "Engineering", progress: 92, completedModules: 11, totalAssigned: 12, streak: 15, lastActive: "2 hours ago", status: "on-track" },
    { id: "2", name: "Mike Johnson", email: "mike@company.com", role: "Manager", department: "Operations", progress: 78, completedModules: 7, totalAssigned: 9, streak: 8, lastActive: "1 day ago", status: "on-track" },
    { id: "3", name: "Emily Davis", email: "emily@company.com", role: "Analyst", department: "Finance", progress: 45, completedModules: 4, totalAssigned: 9, streak: 0, lastActive: "5 days ago", status: "at-risk" },
    { id: "4", name: "Alex Kim", email: "alex@company.com", role: "Designer", department: "Product", progress: 100, completedModules: 8, totalAssigned: 8, streak: 22, lastActive: "1 hour ago", status: "on-track" },
    { id: "5", name: "Jordan Lee", email: "jordan@company.com", role: "Engineer", department: "Engineering", progress: 25, completedModules: 2, totalAssigned: 8, streak: 0, lastActive: "2 weeks ago", status: "overdue" },
];

const departmentStats: DepartmentStats[] = [
    { name: "Engineering", memberCount: 12, avgProgress: 85, completionRate: 92, topPerformer: "Sarah Chen" },
    { name: "Operations", memberCount: 8, avgProgress: 72, completionRate: 78, topPerformer: "Mike Johnson" },
    { name: "Product", memberCount: 6, avgProgress: 88, completionRate: 95, topPerformer: "Alex Kim" },
    { name: "Finance", memberCount: 5, avgProgress: 55, completionRate: 60, topPerformer: "Chris Wong" },
];

export function ManagerDashboard() {
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"team" | "department">("team");
    const [expandedMember, setExpandedMember] = useState<string | null>(null);

    const filteredMembers = selectedDepartment
        ? mockTeamMembers.filter(m => m.department === selectedDepartment)
        : mockTeamMembers;

    const getStatusBadge = (status: TeamMember["status"]) => {
        const styles = {
            "on-track": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
            "at-risk": "bg-amber-500/15 text-amber-400 border-amber-500/30",
            "overdue": "bg-red-500/15 text-red-400 border-red-500/30",
        };
        return styles[status];
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <BarChart3 className="h-7 w-7 text-primary" />
                        Team Analytics
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Monitor team progress and identify training gaps
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                    <Button className="gap-2">
                        <Target className="h-4 w-4" />
                        Assign Training
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: "Team Members", value: "45", change: "+3 this month", icon: Users, color: "blue" },
                    { label: "Avg Completion", value: "78%", change: "+5% vs last month", icon: Target, color: "emerald" },
                    { label: "Modules Completed", value: "312", change: "48 this week", icon: BookOpen, color: "purple" },
                    { label: "At-Risk Learners", value: "5", change: "Needs attention", icon: AlertCircle, color: "amber" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className="p-5 bg-white/[0.02] border-white/10">
                            <div className="flex items-start justify-between mb-3">
                                <div className={cn(
                                    "p-2.5 rounded-xl",
                                    stat.color === "blue" && "bg-blue-500/20",
                                    stat.color === "emerald" && "bg-emerald-500/20",
                                    stat.color === "purple" && "bg-purple-500/20",
                                    stat.color === "amber" && "bg-amber-500/20",
                                )}>
                                    <Icon className={cn(
                                        "h-5 w-5",
                                        stat.color === "blue" && "text-blue-400",
                                        stat.color === "emerald" && "text-emerald-400",
                                        stat.color === "purple" && "text-purple-400",
                                        stat.color === "amber" && "text-amber-400",
                                    )} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                        </Card>
                    );
                })}
            </div>

            {/* Department Overview */}
            <Card className="p-6 bg-white/[0.02] border-white/10">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Department Overview
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    {departmentStats.map((dept) => (
                        <button
                            key={dept.name}
                            onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? null : dept.name)}
                            className={cn(
                                "p-4 rounded-xl border text-left transition-all",
                                selectedDepartment === dept.name
                                    ? "border-primary bg-primary/10"
                                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                            )}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{dept.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                    {dept.memberCount}
                                </Badge>
                            </div>
                            <Progress value={dept.avgProgress} className="h-1.5 mb-2" />
                            <p className="text-sm text-muted-foreground">
                                {dept.completionRate}% completion rate
                            </p>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Team Members Table */}
            <Card className="overflow-hidden bg-white/[0.02] border-white/10">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-semibold">
                        {selectedDepartment ? `${selectedDepartment} Team` : "All Team Members"}
                    </h3>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                            {filteredMembers.filter(m => m.status === "on-track").length} On Track
                        </Badge>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                            {filteredMembers.filter(m => m.status === "at-risk").length} At Risk
                        </Badge>
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
                            {filteredMembers.filter(m => m.status === "overdue").length} Overdue
                        </Badge>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Member</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Progress</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Modules</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Streak</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-semibold">
                                                {member.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="w-32">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span>{member.progress}%</span>
                                            </div>
                                            <Progress value={member.progress} className="h-1.5" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-medium">{member.completedModules}</span>
                                        <span className="text-muted-foreground">/{member.totalAssigned}</span>
                                    </td>
                                    <td className="p-4">
                                        {member.streak > 0 ? (
                                            <div className="flex items-center gap-1.5">
                                                <Zap className="h-4 w-4 text-amber-400" />
                                                <span className="font-medium">{member.streak} days</span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Badge className={cn("capitalize", getStatusBadge(member.status))}>
                                            {member.status.replace("-", " ")}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">
                                        {member.lastActive}
                                    </td>
                                    <td className="p-4">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
