"use client";

import { useState, useEffect, useCallback } from "react";
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
    Loader2,
    AlertCircle,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Assignment {
    id: string;
    moduleId: string;
    organizationId: string | null;
    assignedById: string;
    dueDate: string | null;
    isRequired: boolean;
    status: string;
    createdAt: string;
    assignees: Array<{
        userId: string;
        status: string;
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    }>;
    assignedBy: {
        name: string | null;
        email: string;
    };
}

export function TrainingAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchAssignments = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/assignments");
            const data = await res.json();

            if (data.success) {
                setAssignments(data.assignments || []);
            } else {
                setError(data.error || "Failed to fetch assignments");
            }
        } catch (err) {
            setError("Failed to fetch assignments");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssignments();
    }, [fetchAssignments]);

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

    const getTypeBadge = (isRequired: boolean) => {
        return isRequired ? (
            <Badge className="bg-red-500/10 text-red-500">Required</Badge>
        ) : (
            <Badge variant="outline">Optional</Badge>
        );
    };

    // Calculate stats
    const activeAssignments = assignments.filter((a) => a.status === "active").length;
    const overdueAssignments = assignments.filter((a) => {
        if (!a.dueDate) return false;
        return new Date(a.dueDate) < new Date() && a.status !== "completed";
    }).length;

    // Calculate completion rate per assignment
    const getCompletionRate = (assignment: Assignment) => {
        if (!assignment.assignees || assignment.assignees.length === 0) return 0;
        const completed = assignment.assignees.filter((a) => a.status === "completed").length;
        return Math.round((completed / assignment.assignees.length) * 100);
    };

    const avgCompletion = assignments.length > 0
        ? Math.round(assignments.reduce((sum, a) => sum + getCompletionRate(a), 0) / assignments.length)
        : 0;

    // Filter assignments
    const filteredAssignments = assignments.filter((a) =>
        a.moduleId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="text-destructive">{error}</p>
                </div>
            </div>
        );
    }

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
                <Link href="/assign">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Assignment
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-8 w-8 text-primary" />
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Assignments List */}
            {filteredAssignments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No assignments found.</p>
                    <p className="text-sm mt-1">
                        <Link href="/assign" className="text-primary hover:underline">
                            Create your first assignment
                        </Link>
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredAssignments.map((assignment) => {
                        const completionRate = getCompletionRate(assignment);
                        const isOverdue = assignment.dueDate && new Date(assignment.dueDate) < new Date() && assignment.status !== "completed";

                        return (
                            <Card key={assignment.id} className="p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-medium capitalize">
                                                {assignment.moduleId.replace(/-/g, " ")}
                                            </h3>
                                            {getTypeBadge(assignment.isRequired)}
                                            {getStatusBadge(isOverdue ? "overdue" : assignment.status)}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {assignment.assignees?.length || 0} user(s)
                                            </span>
                                            {assignment.dueDate && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                                </span>
                                            )}
                                            <span>
                                                Created by {assignment.assignedBy?.name || assignment.assignedBy?.email || "Unknown"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Progress
                                                    value={completionRate}
                                                    className={cn(
                                                        "w-24 h-2",
                                                        completionRate >= 90 && "[&>div]:bg-emerald-500",
                                                        completionRate >= 70 && completionRate < 90 && "[&>div]:bg-amber-500",
                                                        completionRate < 70 && "[&>div]:bg-red-500"
                                                    )}
                                                />
                                                <span className="text-sm font-medium w-12">
                                                    {completionRate}%
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
                        );
                    })}
                </div>
            )}
        </div>
    );
}
