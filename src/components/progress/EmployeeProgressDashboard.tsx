"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    TrendingUp,
    Clock,
    CheckCircle2,
    Trophy,
    Target,
    Calendar,
    BookOpen,
    Award,
    Brain,
    Star,
    ChevronRight,
    Play,
    Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Course {
    id: string;
    title: string;
    status: "completed" | "in_progress" | "not_started";
    progress: number;
    completedDate?: string;
    dueDate?: string;
    score?: number;
    timeSpent: string;
    category: string;
}

interface Skill {
    name: string;
    level: number;
    trend: "up" | "stable" | "down";
}

const courses: Course[] = [
    { id: "1", title: "HIPAA Privacy & Security 2024", status: "completed", progress: 100, completedDate: "Dec 15, 2024", score: 95, timeSpent: "2.5 hours", category: "Compliance" },
    { id: "2", title: "Bloodborne Pathogens", status: "completed", progress: 100, completedDate: "Dec 10, 2024", score: 88, timeSpent: "1.5 hours", category: "Safety" },
    { id: "3", title: "AI-Native Healthcare Workflows", status: "in_progress", progress: 65, dueDate: "Jan 15, 2025", timeSpent: "3.2 hours", category: "AI Training" },
    { id: "4", title: "Infection Control", status: "in_progress", progress: 30, dueDate: "Jan 31, 2025", timeSpent: "45 min", category: "Safety" },
    { id: "5", title: "Cultural Competency", status: "not_started", progress: 0, dueDate: "Feb 15, 2025", timeSpent: "0 min", category: "Professional Development" },
];

const skills: Skill[] = [
    { name: "AI Literacy", level: 72, trend: "up" },
    { name: "HIPAA Compliance", level: 95, trend: "stable" },
    { name: "Patient Communication", level: 88, trend: "up" },
    { name: "Clinical Documentation", level: 80, trend: "stable" },
    { name: "Data Security", level: 85, trend: "up" },
];

interface EmployeeProgressDashboardProps {
    employeeName?: string;
}

export function EmployeeProgressDashboard({ employeeName = "Sarah Chen" }: EmployeeProgressDashboardProps) {
    const [timeRange, setTimeRange] = useState("all");

    const completedCourses = courses.filter((c) => c.status === "completed").length;
    const inProgressCourses = courses.filter((c) => c.status === "in_progress").length;
    const totalTimeSpent = "12.5 hours";
    const avgScore = 92;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Completed</Badge>;
            case "in_progress":
                return <Badge className="bg-blue-500/10 text-blue-500">In Progress</Badge>;
            case "not_started":
                return <Badge variant="outline">Not Started</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Learning Progress</h1>
                    <p className="text-muted-foreground">
                        Track your training journey and skill development
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Report
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{completedCourses}</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Target className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{inProgressCourses}</p>
                            <p className="text-xs text-muted-foreground">In Progress</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{totalTimeSpent}</p>
                            <p className="text-xs text-muted-foreground">Time Invested</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Star className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{avgScore}%</p>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Course Progress */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            My Courses
                        </h2>
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium text-sm">{course.title}</h3>
                                                {getStatusBadge(course.status)}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {course.category} • {course.timeSpent} spent
                                            </p>
                                        </div>
                                        {course.status === "completed" ? (
                                            <div className="text-right">
                                                <p className="font-semibold text-emerald-500">{course.score}%</p>
                                                <p className="text-xs text-muted-foreground">{course.completedDate}</p>
                                            </div>
                                        ) : course.dueDate ? (
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">Due</p>
                                                <p className="text-sm font-medium">{course.dueDate}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    {course.status !== "completed" && (
                                        <div className="flex items-center gap-3">
                                            <Progress value={course.progress} className="flex-1 h-2" />
                                            <span className="text-sm font-medium w-12">{course.progress}%</span>
                                            {course.status === "in_progress" && (
                                                <Button size="sm" className="gap-1">
                                                    <Play className="h-3 w-3" />
                                                    Continue
                                                </Button>
                                            )}
                                            {course.status === "not_started" && (
                                                <Button size="sm" variant="outline">
                                                    Start
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Skills & Achievements */}
                <div className="space-y-4">
                    <Card className="p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Brain className="h-5 w-5 text-primary" />
                            Skill Development
                        </h2>
                        <div className="space-y-4">
                            {skills.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">{skill.name}</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-medium">{skill.level}%</span>
                                            {skill.trend === "up" && (
                                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                            )}
                                        </div>
                                    </div>
                                    <Progress value={skill.level} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Recent Certificates
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                                <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                    <Trophy className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">HIPAA Certified</p>
                                    <p className="text-xs text-muted-foreground">Dec 15, 2024</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                                <div className="w-10 h-10 rounded bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Bloodborne Pathogens</p>
                                    <p className="text-xs text-muted-foreground">Dec 10, 2024</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <Link href="/certificates" className="block mt-4">
                            <Button variant="outline" size="sm" className="w-full">
                                View All Certificates
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
}
