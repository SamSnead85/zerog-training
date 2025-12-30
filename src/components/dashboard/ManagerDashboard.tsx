"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    BarChart3,
    UserPlus,
    ChevronRight,
    CheckCircle,
    Clock,
    FileText,
    ArrowRight,
    Download,
    GraduationCap,
    Brain,
    Shield,
    TrendingUp,
} from "lucide-react";
import { Badge, Button, Progress } from "@/components/ui";
import { cn } from "@/lib/utils";

// Types
interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    assignedCourses: {
        id: string;
        title: string;
        progress: number;
        status: "not_started" | "in_progress" | "completed";
    }[];
}

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        role: "Senior Analyst",
        assignedCourses: [
            { id: "native-1", title: "AI-Native Foundations", progress: 75, status: "in_progress" },
            { id: "compliance-1", title: "HIPAA Compliance", progress: 100, status: "completed" },
            { id: "fwa-1", title: "Fraud, Waste & Abuse", progress: 30, status: "in_progress" },
        ],
    },
    {
        id: "2",
        name: "Michael Chen",
        role: "IT Specialist",
        assignedCourses: [
            { id: "native-1", title: "AI-Native Foundations", progress: 100, status: "completed" },
            { id: "native-2", title: "AI Integration Patterns", progress: 45, status: "in_progress" },
            { id: "security-1", title: "Cybersecurity Essentials", progress: 0, status: "not_started" },
        ],
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        role: "Project Manager",
        assignedCourses: [
            { id: "native-1", title: "AI-Native Foundations", progress: 100, status: "completed" },
            { id: "compliance-1", title: "HIPAA Compliance", progress: 100, status: "completed" },
        ],
    },
    {
        id: "4",
        name: "David Kim",
        role: "Developer",
        assignedCourses: [
            { id: "native-1", title: "AI-Native Foundations", progress: 60, status: "in_progress" },
            { id: "native-2", title: "AI Integration Patterns", progress: 0, status: "not_started" },
        ],
    },
];

// Available courses for assignment
const availableCourses = [
    { id: "native-1", title: "AI-Native Foundations", category: "NATIVE" },
    { id: "native-2", title: "AI Integration Patterns", category: "NATIVE" },
    { id: "native-3", title: "AI Transformation Leadership", category: "NATIVE" },
    { id: "compliance-1", title: "HIPAA Compliance", category: "Compliance" },
    { id: "fwa-1", title: "Fraud, Waste & Abuse", category: "Compliance" },
    { id: "security-1", title: "Cybersecurity Essentials", category: "IT" },
    { id: "security-2", title: "Data Protection Fundamentals", category: "IT" },
];

export function ManagerDashboard() {
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);

    // Calculate team stats
    const totalCourses = mockTeamMembers.reduce((acc, m) => acc + m.assignedCourses.length, 0);
    const completedCourses = mockTeamMembers.reduce(
        (acc, m) => acc + m.assignedCourses.filter(c => c.status === "completed").length,
        0
    );
    const inProgressCourses = mockTeamMembers.reduce(
        (acc, m) => acc + m.assignedCourses.filter(c => c.status === "in_progress").length,
        0
    );
    const averageProgress = Math.round(
        mockTeamMembers.reduce(
            (acc, m) => acc + m.assignedCourses.reduce((a, c) => a + c.progress, 0) / (m.assignedCourses.length || 1),
            0
        ) / mockTeamMembers.length
    );

    return (
        <div className="space-y-8">
            {/* Team Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs text-primary flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> Active
                        </span>
                    </div>
                    <p className="text-2xl font-semibold">{mockTeamMembers.length}</p>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-semibold">{totalCourses}</p>
                    <p className="text-sm text-muted-foreground">Total Assignments</p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <p className="text-2xl font-semibold text-emerald-400">{completedCourses}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-semibold">{averageProgress}%</p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <Button onClick={() => setShowAssignModal(true)} className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Assign Training
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Generate Report
                </Button>
            </div>

            {/* Team Members Table */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10">
                    <h3 className="font-semibold">Team Members</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {mockTeamMembers.map((member) => {
                        const memberProgress = Math.round(
                            member.assignedCourses.reduce((a, c) => a + c.progress, 0) / member.assignedCourses.length
                        );
                        const completedCount = member.assignedCourses.filter(c => c.status === "completed").length;

                        return (
                            <div key={member.id}>
                                {/* Member Row */}
                                <button
                                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors text-left"
                                >
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <span className="text-sm font-medium">
                                            {member.name.split(" ").map(n => n[0]).join("")}
                                        </span>
                                    </div>

                                    {/* Name & Role */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </div>

                                    {/* Progress */}
                                    <div className="hidden sm:flex items-center gap-4 min-w-[200px]">
                                        <Progress value={memberProgress} className="flex-1 h-2" />
                                        <span className="text-sm text-muted-foreground w-12">{memberProgress}%</span>
                                    </div>

                                    {/* Courses Count */}
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm">
                                            <span className="text-emerald-400">{completedCount}</span>
                                            <span className="text-muted-foreground">/{member.assignedCourses.length} courses</span>
                                        </p>
                                    </div>

                                    <ChevronRight className={cn(
                                        "h-4 w-4 text-muted-foreground transition-transform",
                                        selectedMember === member.id && "rotate-90"
                                    )} />
                                </button>

                                {/* Expanded Course List */}
                                {selectedMember === member.id && (
                                    <div className="px-6 pb-4 pl-20 space-y-2">
                                        {member.assignedCourses.map((course) => (
                                            <div
                                                key={course.id}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                                            >
                                                <div className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center",
                                                    course.status === "completed" ? "bg-emerald-500/20" :
                                                        course.status === "in_progress" ? "bg-primary/20" : "bg-white/5"
                                                )}>
                                                    {course.status === "completed" ? (
                                                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                                                    ) : course.status === "in_progress" ? (
                                                        <Clock className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <Brain className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium">{course.title}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Progress value={course.progress} className="flex-1 h-1 max-w-[150px]" />
                                                        <span className="text-xs text-muted-foreground">{course.progress}%</span>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px]",
                                                    course.status === "completed" ? "border-emerald-500/30 text-emerald-400" :
                                                        course.status === "in_progress" ? "border-primary/30 text-primary" :
                                                            "border-white/10 text-muted-foreground"
                                                )}>
                                                    {course.status === "completed" ? "Completed" :
                                                        course.status === "in_progress" ? "In Progress" : "Not Started"}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Assign Modal (simplified inline for now) */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-black border border-white/10 rounded-2xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold mb-4">Assign Training</h3>

                        <div className="space-y-3 mb-6">
                            {availableCourses.map((course) => (
                                <label
                                    key={course.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                                >
                                    <input type="checkbox" className="rounded border-white/20" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{course.title}</p>
                                        <Badge variant="outline" className="text-[10px] mt-1">
                                            {course.category}
                                        </Badge>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setShowAssignModal(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button onClick={() => setShowAssignModal(false)} className="flex-1">
                                Assign Selected
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManagerDashboard;
