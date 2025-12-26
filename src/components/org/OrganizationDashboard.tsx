"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Building2,
    Users,
    BookOpen,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Target,
    Calendar,
    ChevronRight,
    MoreHorizontal,
    Sparkles,
    Plus,
    Download,
    Filter,
    ArrowUpRight,
    Activity,
    Award,
    Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OrgMetric {
    label: string;
    value: string;
    change: number;
    icon: React.ElementType;
    color: string;
}

interface RecentActivity {
    id: string;
    type: "completion" | "assignment" | "enrollment" | "achievement";
    user: string;
    action: string;
    target: string;
    time: string;
}

interface UpcomingDeadline {
    id: string;
    course: string;
    dueDate: string;
    assignedTo: number;
    completion: number;
    priority: "high" | "medium" | "low";
}

interface TopPerformer {
    name: string;
    department: string;
    completedCourses: number;
    avgScore: number;
    avatar?: string;
}

const metrics: OrgMetric[] = [
    { label: "Total Employees", value: "1,247", change: 12, icon: Users, color: "text-blue-500" },
    { label: "Active Courses", value: "48", change: 8, icon: BookOpen, color: "text-purple-500" },
    { label: "Completion Rate", value: "87%", change: 5, icon: Target, color: "text-emerald-500" },
    { label: "Training Hours", value: "3,420", change: -2, icon: Clock, color: "text-amber-500" },
];

const recentActivity: RecentActivity[] = [
    { id: "1", type: "completion", user: "Sarah Chen", action: "completed", target: "AI Fundamentals", time: "2 min ago" },
    { id: "2", type: "assignment", user: "Admin", action: "assigned", target: "Prompt Engineering to Engineering Team", time: "15 min ago" },
    { id: "3", type: "achievement", user: "Marcus Johnson", action: "earned", target: "AI Champion badge", time: "1 hour ago" },
    { id: "4", type: "enrollment", user: "Emily Rodriguez", action: "enrolled in", target: "Leadership Essentials", time: "2 hours ago" },
    { id: "5", type: "completion", user: "David Kim", action: "completed", target: "Compliance Training", time: "3 hours ago" },
];

const upcomingDeadlines: UpcomingDeadline[] = [
    { id: "1", course: "Annual Security Awareness", dueDate: "Dec 31, 2024", assignedTo: 1250, completion: 72, priority: "high" },
    { id: "2", course: "HIPAA Refresher", dueDate: "Jan 15, 2025", assignedTo: 890, completion: 45, priority: "high" },
    { id: "3", course: "AI Policy Training", dueDate: "Jan 31, 2025", assignedTo: 1247, completion: 28, priority: "medium" },
];

const topPerformers: TopPerformer[] = [
    { name: "Sarah Chen", department: "Engineering", completedCourses: 15, avgScore: 98 },
    { name: "Marcus Johnson", department: "Product", completedCourses: 12, avgScore: 96 },
    { name: "Emily Rodriguez", department: "Design", completedCourses: 11, avgScore: 95 },
];

const departmentProgress = [
    { name: "Engineering", employees: 342, completion: 91, color: "bg-emerald-500" },
    { name: "Sales", employees: 215, completion: 78, color: "bg-blue-500" },
    { name: "Product", employees: 128, completion: 85, color: "bg-purple-500" },
    { name: "Operations", employees: 312, completion: 82, color: "bg-amber-500" },
    { name: "HR", employees: 45, completion: 96, color: "bg-pink-500" },
];

export function OrganizationDashboard() {
    const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "completion": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
            case "assignment": return <BookOpen className="h-4 w-4 text-blue-500" />;
            case "achievement": return <Award className="h-4 w-4 text-amber-500" />;
            case "enrollment": return <Users className="h-4 w-4 text-purple-500" />;
            default: return <Activity className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Building2 className="h-7 w-7 text-primary" />
                        Organization Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Training overview for your organization
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="flex rounded-lg overflow-hidden border border-border">
                        {(["week", "month", "quarter"] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={cn(
                                    "px-4 py-2 text-sm capitalize",
                                    timeRange === range
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted hover:bg-muted/80"
                                )}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-4 gap-3">
                <Link href="/create">
                    <Card className="p-4 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Create Training</p>
                                <p className="text-xs text-muted-foreground">AI-powered</p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link href="/assignments">
                    <Card className="p-4 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Assign Training</p>
                                <p className="text-xs text-muted-foreground">Bulk assign</p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link href="/reports">
                    <Card className="p-4 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">View Reports</p>
                                <p className="text-xs text-muted-foreground">Analytics</p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link href="/workforce">
                    <Card className="p-4 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Add Employees</p>
                                <p className="text-xs text-muted-foreground">Import users</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <Card key={metric.label} className="p-5">
                            <div className="flex items-start justify-between mb-3">
                                <Icon className={cn("h-6 w-6", metric.color)} />
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-medium",
                                    metric.change >= 0 ? "text-emerald-500" : "text-red-500"
                                )}>
                                    {metric.change >= 0 ? (
                                        <TrendingUp className="h-3 w-3" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3" />
                                    )}
                                    {Math.abs(metric.change)}%
                                </div>
                            </div>
                            <p className="text-3xl font-bold mb-1">{metric.value}</p>
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                        </Card>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Department Progress */}
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold">Training by Department</h2>
                            <Button variant="ghost" size="sm">
                                View All <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {departmentProgress.map((dept) => (
                                <div key={dept.name}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <span className="font-medium text-sm">{dept.name}</span>
                                            <span className="text-xs text-muted-foreground ml-2">
                                                {dept.employees} employees
                                            </span>
                                        </div>
                                        <span className={cn(
                                            "font-medium text-sm",
                                            dept.completion >= 85 ? "text-emerald-500" :
                                                dept.completion >= 70 ? "text-amber-500" : "text-red-500"
                                        )}>
                                            {dept.completion}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all", dept.color)}
                                            style={{ width: `${dept.completion}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Top Performers */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">Top Performers</h2>
                        <Link href="/leaderboard">
                            <Button variant="ghost" size="sm">
                                Leaderboard <ArrowUpRight className="h-3 w-3 ml-1" />
                            </Button>
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {topPerformers.map((performer, i) => (
                            <div key={performer.name} className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                    i === 0 && "bg-amber-500/20 text-amber-500",
                                    i === 1 && "bg-zinc-400/20 text-zinc-400",
                                    i === 2 && "bg-orange-600/20 text-orange-600"
                                )}>
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{performer.name}</p>
                                    <p className="text-xs text-muted-foreground">{performer.department}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm">{performer.avgScore}%</p>
                                    <p className="text-xs text-muted-foreground">{performer.completedCourses} courses</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upcoming Deadlines */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Upcoming Deadlines
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {upcomingDeadlines.map((deadline) => (
                            <div key={deadline.id} className="p-4 rounded-lg bg-muted/50">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-medium text-sm">{deadline.course}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {deadline.assignedTo} employees • Due {deadline.dueDate}
                                        </p>
                                    </div>
                                    <Badge className={cn(
                                        deadline.priority === "high" && "bg-red-500/10 text-red-500",
                                        deadline.priority === "medium" && "bg-amber-500/10 text-amber-500",
                                        deadline.priority === "low" && "bg-emerald-500/10 text-emerald-500"
                                    )}>
                                        {deadline.priority}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Progress value={deadline.completion} className="flex-1 h-2" />
                                    <span className="text-xs font-medium">{deadline.completion}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Recent Activity
                        </h2>
                        <Link href="/notifications">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-medium">{activity.user}</span>
                                        {" "}{activity.action}{" "}
                                        <span className="text-primary">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
