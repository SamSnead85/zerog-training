"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Calendar,
    Target,
    CheckCircle2,
    Clock,
    Plus,
    ChevronRight,
    Edit2,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyGoal {
    id: string;
    title: string;
    targetCourse?: string;
    dueDate: string;
    progress: number;
    status: "on-track" | "at-risk" | "completed";
}

const mockGoals: StudyGoal[] = [
    {
        id: "1",
        title: "Complete NATIVE Certification",
        targetCourse: "NATIVE Framework",
        dueDate: "Jan 15, 2025",
        progress: 65,
        status: "on-track",
    },
    {
        id: "2",
        title: "Finish HIPAA Training",
        targetCourse: "HIPAA Privacy & Security",
        dueDate: "Jan 5, 2025",
        progress: 90,
        status: "on-track",
    },
    {
        id: "3",
        title: "Master Prompt Engineering",
        targetCourse: "Prompt Engineering Masterclass",
        dueDate: "Dec 31, 2024",
        progress: 40,
        status: "at-risk",
    },
];

export function StudyPlanner() {
    const [goals, setGoals] = useState(mockGoals);

    const statusColors = {
        "on-track": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        "at-risk": "bg-amber-500/20 text-amber-400 border-amber-500/30",
        "completed": "bg-slate-500/20 text-slate-400 border-slate-500/30",
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Study Goals
                    </h3>
                    <p className="text-sm text-muted-foreground">Track your learning objectives</p>
                </div>
                <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Goal
                </Button>
            </div>

            <div className="space-y-4">
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-medium">{goal.title}</h4>
                                {goal.targetCourse && (
                                    <p className="text-sm text-muted-foreground">{goal.targetCourse}</p>
                                )}
                            </div>
                            <Badge
                                variant="outline"
                                className={cn("text-xs", statusColors[goal.status])}
                            >
                                {goal.status === "on-track" ? "On Track" : goal.status === "at-risk" ? "At Risk" : "Completed"}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Due {goal.dueDate}
                                </span>
                                <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                        </div>

                        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                                <Edit2 className="h-3 w-3" />
                                Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-destructive hover:text-destructive">
                                <Trash2 className="h-3 w-3" />
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
