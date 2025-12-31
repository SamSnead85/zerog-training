"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    BookOpen,
    Clock,
    Award,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    Download,
    Calendar,
    DollarSign,
    Sparkles,
    CheckCircle2,
    AlertTriangle,
    Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCard {
    label: string;
    value: string;
    change: number;
    changeLabel: string;
    icon: React.ElementType;
    color: string;
}

interface CourseMetric {
    id: string;
    title: string;
    enrollments: number;
    completionRate: number;
    avgScore: number;
    avgTime: string;
    trend: "up" | "down" | "stable";
}

interface TeamMetric {
    name: string;
    completed: number;
    inProgress: number;
    overdue: number;
    complianceRate: number;
}

const metrics: MetricCard[] = [
    { label: "Total Enrollments", value: "12,847", change: 12.5, changeLabel: "vs last month", icon: Users, color: "text-blue-500" },
    { label: "Completion Rate", value: "78.3%", change: 5.2, changeLabel: "vs last month", icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Avg Quiz Score", value: "84.7%", change: -2.1, changeLabel: "vs last month", icon: Target, color: "text-purple-500" },
    { label: "Training Hours", value: "4,521", change: 18.7, changeLabel: "vs last month", icon: Clock, color: "text-amber-500" },
];

const topCourses: CourseMetric[] = [
    { id: "1", title: "NIST Cybersecurity Framework 2.0", enrollments: 2847, completionRate: 82, avgScore: 87.5, avgTime: "38 min", trend: "up" },
    { id: "2", title: "HIPAA Privacy Essentials", enrollments: 2156, completionRate: 91, avgScore: 89.2, avgTime: "28 min", trend: "up" },
    { id: "3", title: "NATIVE Framework Training", enrollments: 1893, completionRate: 68, avgScore: 82.1, avgTime: "52 min", trend: "stable" },
    { id: "4", title: "Leadership Fundamentals", enrollments: 1654, completionRate: 74, avgScore: 85.8, avgTime: "32 min", trend: "up" },
    { id: "5", title: "Workplace Harassment Prevention", enrollments: 3521, completionRate: 95, avgScore: 91.2, avgTime: "18 min", trend: "stable" },
];

const teamMetrics: TeamMetric[] = [
    { name: "Engineering", completed: 145, inProgress: 23, overdue: 3, complianceRate: 94 },
    { name: "Sales", completed: 89, inProgress: 15, overdue: 8, complianceRate: 84 },
    { name: "Marketing", completed: 56, inProgress: 12, overdue: 2, complianceRate: 92 },
    { name: "Operations", completed: 234, inProgress: 45, overdue: 12, complianceRate: 87 },
    { name: "HR", completed: 34, inProgress: 8, overdue: 0, complianceRate: 100 },
];

const roiMetrics = {
    trainingCostSavings: 245000,
    complianceFinesPrevented: 180000,
    productivityGain: 12.5,
    reducedTurnover: 8.3,
    totalROI: 425000,
};

export function AnalyticsDashboard() {
    const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Training Analytics
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Monitor training performance and ROI metrics
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {(["7d", "30d", "90d", "1y"] as const).map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                        >
                            {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "90d" ? "90 Days" : "1 Year"}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    const isPositive = metric.change > 0;
                    return (
                        <Card key={metric.label} className="p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${metric.color.replace("text-", "")}/10`)}>
                                    <Icon className={cn("h-5 w-5", metric.color)} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-medium",
                                    isPositive ? "text-emerald-500" : "text-red-500"
                                )}>
                                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {Math.abs(metric.change)}%
                                </div>
                            </div>
                            <p className="text-2xl font-bold mb-1">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                        </Card>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Top Courses */}
                <Card className="lg:col-span-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Top Performing Courses</h3>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                            View All <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Course</th>
                                    <th className="text-right text-xs font-medium text-muted-foreground pb-3">Enrollments</th>
                                    <th className="text-right text-xs font-medium text-muted-foreground pb-3">Completion</th>
                                    <th className="text-right text-xs font-medium text-muted-foreground pb-3">Avg Score</th>
                                    <th className="text-right text-xs font-medium text-muted-foreground pb-3">Avg Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topCourses.map((course) => (
                                    <tr key={course.id} className="border-b border-border/50 last:border-0">
                                        <td className="py-3">
                                            <div className="flex items-center gap-2">
                                                {course.trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                                                {course.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                                                {course.trend === "stable" && <Activity className="h-3 w-3 text-muted-foreground" />}
                                                <span className="text-sm font-medium">{course.title}</span>
                                            </div>
                                        </td>
                                        <td className="text-right text-sm py-3">{course.enrollments.toLocaleString()}</td>
                                        <td className="text-right py-3">
                                            <Badge variant="outline" className={cn(
                                                "text-xs",
                                                course.completionRate >= 90 ? "border-emerald-500/30 text-emerald-500" :
                                                    course.completionRate >= 70 ? "border-blue-500/30 text-blue-500" :
                                                        "border-amber-500/30 text-amber-500"
                                            )}>
                                                {course.completionRate}%
                                            </Badge>
                                        </td>
                                        <td className="text-right text-sm py-3">{course.avgScore}%</td>
                                        <td className="text-right text-sm text-muted-foreground py-3">{course.avgTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* ROI Summary */}
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <h3 className="font-semibold">ROI Summary</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Training Cost Savings</span>
                                <span className="font-semibold text-emerald-500">
                                    ${(roiMetrics.trainingCostSavings / 1000).toFixed(0)}K
                                </span>
                            </div>
                            <Progress value={58} className="h-1.5" />
                        </div>

                        <div className="p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Compliance Fines Prevented</span>
                                <span className="font-semibold text-emerald-500">
                                    ${(roiMetrics.complianceFinesPrevented / 1000).toFixed(0)}K
                                </span>
                            </div>
                            <Progress value={42} className="h-1.5" />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <span className="text-sm">Productivity Gain</span>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-0">
                                +{roiMetrics.productivityGain}%
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <span className="text-sm">Reduced Turnover</span>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-0">
                                -{roiMetrics.reducedTurnover}%
                            </Badge>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20">
                        <p className="text-xs text-muted-foreground mb-1">Total Estimated ROI</p>
                        <p className="text-3xl font-bold text-emerald-500">
                            ${(roiMetrics.totalROI / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">Annual value generated</p>
                    </div>
                </Card>
            </div>

            {/* Team Compliance */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Team Compliance Status
                    </h3>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {teamMetrics.map((team) => (
                        <div key={team.name} className="p-4 rounded-xl bg-muted/30 border border-border">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium">{team.name}</h4>
                                <Badge className={cn(
                                    "text-xs",
                                    team.complianceRate >= 95 ? "bg-emerald-500/10 text-emerald-500" :
                                        team.complianceRate >= 85 ? "bg-blue-500/10 text-blue-500" :
                                            "bg-amber-500/10 text-amber-500"
                                )}>
                                    {team.complianceRate}%
                                </Badge>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Completed</span>
                                    <span className="text-emerald-500 font-medium">{team.completed}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">In Progress</span>
                                    <span className="text-blue-500 font-medium">{team.inProgress}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Overdue</span>
                                    <span className={cn(
                                        "font-medium",
                                        team.overdue > 0 ? "text-red-500" : "text-muted-foreground"
                                    )}>
                                        {team.overdue}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
