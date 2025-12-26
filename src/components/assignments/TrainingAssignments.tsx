"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ClipboardCheck,
    Plus,
    Search,
    Filter,
    Calendar,
    Users,
    Clock,
    AlertTriangle,
    CheckCircle2,
    MoreHorizontal,
    Mail,
    ChevronDown,
    Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Assignment {
    id: string;
    courseName: string;
    courseType: "required" | "recommended" | "optional";
    assignedTo: {
        type: "individual" | "department" | "all";
        name: string;
        count: number;
    };
    dueDate: string;
    status: "active" | "completed" | "overdue";
    completionRate: number;
    createdAt: string;
    createdBy: string;
}

const assignments: Assignment[] = [
    { id: "1", courseName: "HIPAA Privacy & Security 2024", courseType: "required", assignedTo: { type: "all", name: "All Employees", count: 1250 }, dueDate: "Dec 31, 2024", status: "active", completionRate: 78, createdAt: "Nov 1, 2024", createdBy: "Sarah Chen" },
    { id: "2", courseName: "Bloodborne Pathogens", courseType: "required", assignedTo: { type: "department", name: "Clinical Operations", count: 450 }, dueDate: "Jan 15, 2025", status: "active", completionRate: 65, createdAt: "Dec 1, 2024", createdBy: "HR Team" },
    { id: "3", courseName: "Infection Control", courseType: "required", assignedTo: { type: "department", name: "Nursing", count: 280 }, dueDate: "Mar 15, 2025", status: "active", completionRate: 42, createdAt: "Dec 15, 2024", createdBy: "Lisa Wang" },
    { id: "4", courseName: "Cultural Competency", courseType: "recommended", assignedTo: { type: "all", name: "All Employees", count: 1250 }, dueDate: "Dec 31, 2024", status: "overdue", completionRate: 45, createdAt: "Oct 1, 2024", createdBy: "HR Team" },
    { id: "5", courseName: "Fire Safety 2024", courseType: "required", assignedTo: { type: "all", name: "All Employees", count: 1250 }, dueDate: "Nov 30, 2024", status: "completed", completionRate: 98, createdAt: "Sep 1, 2024", createdBy: "Safety Officer" },
];

export function TrainingAssignments() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [assignmentType, setAssignmentType] = useState<"all" | "department" | "individual">("all");
    const [dueDate, setDueDate] = useState("");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-blue-500/10 text-blue-500">Active</Badge>;
            case "completed":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Completed</Badge>;
            case "overdue":
                return <Badge className="bg-red-500/10 text-red-500">Overdue</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "required":
                return <Badge className="bg-red-500/10 text-red-500">Required</Badge>;
            case "recommended":
                return <Badge className="bg-amber-500/10 text-amber-500">Recommended</Badge>;
            case "optional":
                return <Badge variant="outline">Optional</Badge>;
            default:
                return null;
        }
    };

    const activeAssignments = assignments.filter((a) => a.status === "active").length;
    const overdueAssignments = assignments.filter((a) => a.status === "overdue").length;
    const avgCompletion = Math.round(
        assignments.reduce((sum, a) => sum + a.completionRate, 0) / assignments.length
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <ClipboardCheck className="h-7 w-7 text-primary" />
                        Training Assignments
                    </h1>
                    <p className="text-muted-foreground">
                        Assign and track required training for your workforce
                    </p>
                </div>
                <Button className="gap-2" onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4" />
                    Create Assignment
                </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <Target className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">{assignments.length}</p>
                            <p className="text-xs text-muted-foreground">Total Assignments</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <Clock className="h-8 w-8 text-blue-500" />
                        <div>
                            <p className="text-2xl font-bold">{activeAssignments}</p>
                            <p className="text-xs text-muted-foreground">Active</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                        <div>
                            <p className="text-2xl font-bold">{overdueAssignments}</p>
                            <p className="text-xs text-muted-foreground">Overdue</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        <div>
                            <p className="text-2xl font-bold">{avgCompletion}%</p>
                            <p className="text-xs text-muted-foreground">Avg Completion</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search assignments..."
                        className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Assignments List */}
            <div className="space-y-3">
                {assignments.map((assignment) => (
                    <Card key={assignment.id} className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-medium">{assignment.courseName}</h3>
                                    {getTypeBadge(assignment.courseType)}
                                    {getStatusBadge(assignment.status)}
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {assignment.assignedTo.name} ({assignment.assignedTo.count})
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Due: {assignment.dueDate}
                                    </span>
                                    <span>Created by {assignment.createdBy}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Progress
                                            value={assignment.completionRate}
                                            className={cn(
                                                "w-24 h-2",
                                                assignment.completionRate >= 90 && "[&>div]:bg-emerald-500",
                                                assignment.completionRate >= 70 && assignment.completionRate < 90 && "[&>div]:bg-amber-500",
                                                assignment.completionRate < 70 && "[&>div]:bg-red-500"
                                            )}
                                        />
                                        <span className="text-sm font-medium w-12">
                                            {assignment.completionRate}%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Mail className="h-3 w-3" />
                                        Remind
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Create Training Assignment</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">
                                    Select Course
                                </label>
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="w-full h-10 px-3 rounded-lg bg-muted border-0"
                                >
                                    <option value="">Choose a course...</option>
                                    <option value="hipaa">HIPAA Privacy & Security 2024</option>
                                    <option value="bloodborne">Bloodborne Pathogens</option>
                                    <option value="infection">Infection Control</option>
                                    <option value="fire">Fire Safety</option>
                                    <option value="cultural">Cultural Competency</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">
                                    Assign To
                                </label>
                                <div className="flex gap-2">
                                    {(["all", "department", "individual"] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setAssignmentType(type)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm capitalize",
                                                assignmentType === type
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                            )}
                                        >
                                            {type === "all" ? "All Employees" : type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {assignmentType === "department" && (
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">
                                        Select Department
                                    </label>
                                    <select className="w-full h-10 px-3 rounded-lg bg-muted border-0">
                                        <option value="">Choose department...</option>
                                        <option value="nursing">Nursing</option>
                                        <option value="emergency">Emergency</option>
                                        <option value="icu">ICU</option>
                                        <option value="admin">Administrative</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full h-10 px-3 rounded-lg bg-muted border-0"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">
                                    Requirement Type
                                </label>
                                <select className="w-full h-10 px-3 rounded-lg bg-muted border-0">
                                    <option value="required">Required</option>
                                    <option value="recommended">Recommended</option>
                                    <option value="optional">Optional</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="reminder" className="rounded" defaultChecked />
                                <label htmlFor="reminder" className="text-sm">
                                    Send automatic reminder emails
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button className="flex-1">Create Assignment</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
