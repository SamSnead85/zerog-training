"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    BookOpen,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    Download,
    Filter,
    Calendar,
    BarChart3,
    PieChart,
    ArrowUp,
    ArrowDown,
    Award,
    Target,
    Shield,
    Brain,
} from "lucide-react";

// Mock data for analytics
const teamProgress = [
    { name: "Engineering", enrolled: 45, completed: 38, inProgress: 7, avgScore: 92 },
    { name: "Sales", enrolled: 28, completed: 22, inProgress: 4, avgScore: 88 },
    { name: "Marketing", enrolled: 18, completed: 15, inProgress: 3, avgScore: 91 },
    { name: "Operations", enrolled: 32, completed: 28, inProgress: 4, avgScore: 86 },
    { name: "HR", enrolled: 12, completed: 12, inProgress: 0, avgScore: 95 },
];

const complianceData = [
    { course: "HIPAA Compliance", required: 150, completed: 142, deadline: "Dec 31, 2024" },
    { course: "Cybersecurity Fundamentals", required: 200, completed: 189, deadline: "Jan 15, 2025" },
    { course: "Data Privacy (GDPR)", required: 180, completed: 165, deadline: "Feb 1, 2025" },
    { course: "Anti-Harassment Training", required: 200, completed: 200, deadline: "Completed" },
];

const topCourses = [
    { title: "AI Native Transformation", enrollments: 156, completion: 78, rating: 4.9 },
    { title: "Leadership Fundamentals", enrollments: 142, completion: 85, rating: 4.8 },
    { title: "SAFe Scrum Master", enrollments: 98, completion: 72, rating: 4.9 },
    { title: "Agentic AI", enrollments: 87, completion: 65, rating: 4.9 },
    { title: "Consultative Selling", enrollments: 64, completion: 81, rating: 4.7 },
];

const recentActivity = [
    { user: "Sarah Johnson", action: "Completed", course: "AI Native Transformation", time: "2 hours ago" },
    { user: "Mike Chen", action: "Started", course: "Agentic AI", time: "3 hours ago" },
    { user: "Emily Rodriguez", action: "Scored 95%", course: "HIPAA Compliance", time: "4 hours ago" },
    { user: "James Wilson", action: "Completed", course: "Leadership Fundamentals", time: "5 hours ago" },
    { user: "Lisa Thompson", action: "Started", course: "Legacy Modernization with AI", time: "6 hours ago" },
];

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState("30d");

    const totalLearners = 235;
    const coursesCompleted = 847;
    const avgCompletionRate = 89;
    const avgScore = 91;

    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Learning Analytics</h1>
                    <p className="text-muted-foreground">
                        Track team progress, compliance, and learning outcomes
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-lg">
                        {["7d", "30d", "90d", "1y"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 text-sm transition-colors ${timeRange === range
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Users className="h-5 w-5 text-primary" />
                        <Badge variant="secondary" className="text-success gap-1">
                            <ArrowUp className="h-3 w-3" />
                            12%
                        </Badge>
                    </div>
                    <p className="text-2xl font-bold">{totalLearners}</p>
                    <p className="text-sm text-muted-foreground">Active Learners</p>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <BookOpen className="h-5 w-5 text-secondary" />
                        <Badge variant="secondary" className="text-success gap-1">
                            <ArrowUp className="h-3 w-3" />
                            18%
                        </Badge>
                    </div>
                    <p className="text-2xl font-bold">{coursesCompleted}</p>
                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Target className="h-5 w-5 text-accent" />
                        <Badge variant="secondary" className="text-success gap-1">
                            <ArrowUp className="h-3 w-3" />
                            5%
                        </Badge>
                    </div>
                    <p className="text-2xl font-bold">{avgCompletionRate}%</p>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Award className="h-5 w-5 text-warning" />
                        <Badge variant="secondary" className="text-muted-foreground">
                            <ArrowDown className="h-3 w-3" />
                            1%
                        </Badge>
                    </div>
                    <p className="text-2xl font-bold">{avgScore}%</p>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                </Card>
            </div>

            {/* Team Progress & Compliance */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Team Progress */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Team Progress
                        </h2>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {teamProgress.map((team) => (
                            <div key={team.name} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{team.name}</span>
                                    <span className="text-muted-foreground">
                                        {team.completed}/{team.enrolled} completed
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Progress
                                        value={(team.completed / team.enrolled) * 100}
                                        className="flex-1 h-2"
                                    />
                                    <span className="text-xs font-medium w-12 text-right">
                                        {team.avgScore}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Compliance Tracking */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Shield className="h-5 w-5 text-success" />
                            Compliance Training
                        </h2>
                        <Badge variant="outline">4 Active</Badge>
                    </div>
                    <div className="space-y-4">
                        {complianceData.map((course) => {
                            const percent = Math.round((course.completed / course.required) * 100);
                            const isComplete = percent === 100;
                            return (
                                <div key={course.course} className="p-3 rounded-lg border border-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-sm">{course.course}</span>
                                        {isComplete ? (
                                            <Badge variant="outline" className="text-success border-success gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Complete
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-warning border-warning gap-1">
                                                <Clock className="h-3 w-3" />
                                                {course.deadline}
                                            </Badge>
                                        )}
                                    </div>
                                    <Progress value={percent} className="h-1.5 mb-1" />
                                    <p className="text-xs text-muted-foreground">
                                        {course.completed} of {course.required} employees
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Top Courses & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Courses */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-secondary" />
                            Top Courses
                        </h2>
                        <span className="text-sm text-muted-foreground">By enrollments</span>
                    </div>
                    <div className="space-y-3">
                        {topCourses.map((course, i) => (
                            <div
                                key={course.title}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <span className="text-lg font-bold text-muted-foreground w-6">
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{course.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {course.enrollments} enrolled • {course.completion}% completed
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-warning">
                                    <span className="text-sm font-medium">{course.rating}</span>
                                    <span className="text-xs">★</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-info" />
                            Recent Activity
                        </h2>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-background">
                                    {activity.user.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-medium">{activity.user}</span>{" "}
                                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                                        <span className="font-medium">{activity.course}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* AI Insights Section */}
            <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Brain className="h-6 w-6 text-background" />
                    </div>
                    <div className="flex-1">
                        <h2 className="font-semibold mb-2">AI-Powered Insights</h2>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="p-3 rounded-lg bg-background/50">
                                <p className="font-medium text-success mb-1">↗ High Performer</p>
                                <p className="text-muted-foreground">
                                    HR team has 100% completion rate. Consider them as training champions.
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-background/50">
                                <p className="font-medium text-warning mb-1">⚠ Attention Needed</p>
                                <p className="text-muted-foreground">
                                    8 employees haven&apos;t started HIPAA training due in 6 days.
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-background/50">
                                <p className="font-medium text-primary mb-1">💡 Recommendation</p>
                                <p className="text-muted-foreground">
                                    AI courses are trending. Consider assigning to more teams.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
