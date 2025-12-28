"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    TrendingUp,
    Users,
    Clock,
    Award,
    Download,
    Filter,
    Calendar,
    BarChart3,
    PieChart,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMetric {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
    icon: React.ElementType;
}

const metrics: TeamMetric[] = [
    { label: "Courses Completed", value: "1,247", change: "+12%", trend: "up", icon: Award },
    { label: "Active Learners", value: "342", change: "+8%", trend: "up", icon: Users },
    { label: "Avg. Completion Time", value: "4.2 hrs", change: "-15%", trend: "up", icon: Clock },
    { label: "Compliance Rate", value: "94%", change: "+3%", trend: "up", icon: Target },
];

interface TopPerformer {
    name: string;
    department: string;
    coursesCompleted: number;
    xpEarned: number;
    avatar: string;
}

const topPerformers: TopPerformer[] = [
    { name: "Sarah Chen", department: "Engineering", coursesCompleted: 12, xpEarned: 2450, avatar: "SC" },
    { name: "Michael Brown", department: "Product", coursesCompleted: 10, xpEarned: 2100, avatar: "MB" },
    { name: "Emily Rodriguez", department: "Security", coursesCompleted: 9, xpEarned: 1890, avatar: "ER" },
    { name: "David Kim", department: "Operations", coursesCompleted: 8, xpEarned: 1650, avatar: "DK" },
    { name: "Jennifer Lee", department: "HR", coursesCompleted: 7, xpEarned: 1450, avatar: "JL" },
];

export function TeamAnalytics() {
    const [timeRange, setTimeRange] = useState("30d");

    return (
        <div className="space-y-6">
            {/* Header with filters */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Team Analytics</h2>
                    <p className="text-sm text-muted-foreground">Track team learning progress and engagement</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                        <Calendar className="h-4 w-4" />
                        Last 30 Days
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <Card key={metric.label} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <metric.icon className="h-5 w-5 text-muted-foreground" />
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-xs",
                                    metric.trend === "up" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                    metric.trend === "down" && "bg-red-500/10 text-red-500 border-red-500/20"
                                )}
                            >
                                <TrendingUp className={cn("h-3 w-3 mr-1", metric.trend === "down" && "rotate-180")} />
                                {metric.change}
                            </Badge>
                        </div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </Card>
                ))}
            </div>

            {/* Top Performers */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Top Performers This Month
                    </h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-3">
                    {topPerformers.map((performer, index) => (
                        <div
                            key={performer.name}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <span className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                index === 0 && "bg-yellow-500/20 text-yellow-500",
                                index === 1 && "bg-slate-400/20 text-slate-400",
                                index === 2 && "bg-amber-600/20 text-amber-600",
                                index > 2 && "bg-muted text-muted-foreground"
                            )}>
                                {index + 1}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                {performer.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{performer.name}</div>
                                <div className="text-sm text-muted-foreground">{performer.department}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">{performer.coursesCompleted} courses</div>
                                <div className="text-sm text-muted-foreground">{performer.xpEarned.toLocaleString()} XP</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
