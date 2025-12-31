"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Clock,
    BookOpen,
    Award,
    Target,
    Download,
    Calendar,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsData {
    totalUsers: number;
    activeUsers: number;
    coursesCompleted: number;
    avgCompletionRate: number;
    totalHoursLearned: number;
    certificatesIssued: number;
}

interface TeamMember {
    name: string;
    role: string;
    coursesCompleted: number;
    xp: number;
    streak: number;
    lastActive: string;
}

interface CoursePerformance {
    title: string;
    enrollments: number;
    completions: number;
    avgScore: number;
    avgTime: string;
}

// Mock data
const analyticsData: AnalyticsData = {
    totalUsers: 156,
    activeUsers: 124,
    coursesCompleted: 842,
    avgCompletionRate: 78,
    totalHoursLearned: 2450,
    certificatesIssued: 312,
};

const teamMembers: TeamMember[] = [
    { name: "Sarah Chen", role: "Engineering", coursesCompleted: 12, xp: 4500, streak: 21, lastActive: "Today" },
    { name: "Marcus Johnson", role: "Product", coursesCompleted: 9, xp: 3200, streak: 15, lastActive: "Today" },
    { name: "Emily Rodriguez", role: "Design", coursesCompleted: 11, xp: 4100, streak: 18, lastActive: "Yesterday" },
    { name: "David Kim", role: "Engineering", coursesCompleted: 8, xp: 2900, streak: 12, lastActive: "Today" },
    { name: "Lisa Wang", role: "Marketing", coursesCompleted: 7, xp: 2400, streak: 9, lastActive: "2 days ago" },
];

const coursePerformance: CoursePerformance[] = [
    { title: "NATIVE Framework", enrollments: 45, completions: 38, avgScore: 87, avgTime: "7.5 hrs" },
    { title: "Cybersecurity Awareness", enrollments: 124, completions: 98, avgScore: 91, avgTime: "2.8 hrs" },
    { title: "Leadership Fundamentals", enrollments: 67, completions: 52, avgScore: 85, avgTime: "5.2 hrs" },
    { title: "HIPAA Compliance", enrollments: 89, completions: 82, avgScore: 94, avgTime: "1.9 hrs" },
];

export function TeamAnalytics() {
    const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");

    const stats = [
        { label: "Total Users", value: analyticsData.totalUsers, icon: Users, change: +12, changeType: "positive" },
        { label: "Active Users", value: analyticsData.activeUsers, icon: TrendingUp, change: +8, changeType: "positive" },
        { label: "Courses Completed", value: analyticsData.coursesCompleted, icon: BookOpen, change: +45, changeType: "positive" },
        { label: "Avg Completion", value: `${analyticsData.avgCompletionRate}%`, icon: Target, change: +3, changeType: "positive" },
        { label: "Hours Learned", value: analyticsData.totalHoursLearned.toLocaleString(), icon: Clock, change: +180, changeType: "positive" },
        { label: "Certificates", value: analyticsData.certificatesIssued, icon: Award, change: +28, changeType: "positive" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Team Analytics</h1>
                    <p className="text-muted-foreground">Track your organization's learning progress</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex rounded-lg border border-border overflow-hidden">
                        {(["week", "month", "quarter"] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={cn(
                                    "px-3 py-1.5 text-sm capitalize transition-colors",
                                    timeRange === range
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{stat.label}</span>
                            </div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <div className={cn(
                                "text-xs flex items-center gap-1 mt-1",
                                stat.changeType === "positive" ? "text-emerald-500" : "text-red-500"
                            )}>
                                {stat.changeType === "positive" ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : (
                                    <TrendingDown className="h-3 w-3" />
                                )}
                                +{stat.change} this {timeRange}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Team Members */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold">Team Progress</h2>
                        <Button variant="ghost" size="sm">
                            View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium truncate">{member.name}</p>
                                        <span className="text-sm text-primary font-medium">{member.xp.toLocaleString()} XP</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>{member.role}</span>
                                        <span>•</span>
                                        <span>{member.coursesCompleted} courses</span>
                                        <span>•</span>
                                        <span>{member.streak} day streak</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Course Performance */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold">Course Performance</h2>
                        <Button variant="ghost" size="sm">
                            View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {coursePerformance.map((course, i) => {
                            const completionRate = Math.round((course.completions / course.enrollments) * 100);
                            return (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-sm truncate">{course.title}</p>
                                        <span className="text-sm text-muted-foreground">{completionRate}%</span>
                                    </div>
                                    <Progress value={completionRate} className="h-2" />
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span>{course.enrollments} enrolled</span>
                                        <span>{course.completions} completed</span>
                                        <span>Avg: {course.avgScore}%</span>
                                        <span>{course.avgTime}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Activity Timeline Placeholder */}
            <Card className="p-6">
                <h2 className="font-semibold mb-6">Learning Activity</h2>
                <div className="h-64 flex items-center justify-center bg-white/[0.02] rounded-xl border border-dashed border-white/10">
                    <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">Activity chart visualization</p>
                        <p className="text-xs text-muted-foreground mt-1">Connect to analytics provider for real data</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
