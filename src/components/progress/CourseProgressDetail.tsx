"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    GraduationCap,
    CheckCircle2,
    Clock,
    Book,
    FileText,
    PlayCircle,
    Download,
    Share2,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ModuleProgress {
    id: string;
    title: string;
    type: "video" | "reading" | "quiz" | "simulation";
    duration: string;
    completed: boolean;
    score?: number;
}

interface CourseProgressDetailProps {
    courseId: string;
    courseTitle: string;
    modules: ModuleProgress[];
}

const mockModules: ModuleProgress[] = [
    { id: "1", title: "Introduction to Agile", type: "video", duration: "15 min", completed: true },
    { id: "2", title: "Core Principles", type: "reading", duration: "10 min", completed: true },
    { id: "3", title: "Knowledge Check 1", type: "quiz", duration: "5 min", completed: true, score: 90 },
    { id: "4", title: "Scrum Framework", type: "video", duration: "20 min", completed: true },
    { id: "5", title: "Sprint Planning", type: "reading", duration: "12 min", completed: false },
    { id: "6", title: "Daily Standup Simulation", type: "simulation", duration: "10 min", completed: false },
    { id: "7", title: "Sprint Review & Retro", type: "video", duration: "18 min", completed: false },
    { id: "8", title: "Final Assessment", type: "quiz", duration: "15 min", completed: false },
];

export function CourseProgressDetail({
    courseId = "sample",
    courseTitle = "NATIVE Framework Certification",
    modules = mockModules,
}: Partial<CourseProgressDetailProps>) {
    const completedCount = modules.filter((m) => m.completed).length;
    const progress = (completedCount / modules.length) * 100;
    const totalDuration = modules.reduce((sum, m) => sum + parseInt(m.duration), 0);
    const completedDuration = modules
        .filter((m) => m.completed)
        .reduce((sum, m) => sum + parseInt(m.duration), 0);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "video": return <PlayCircle className="h-4 w-4" />;
            case "reading": return <Book className="h-4 w-4" />;
            case "quiz": return <FileText className="h-4 w-4" />;
            case "simulation": return <GraduationCap className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "video": return <Badge className="bg-blue-500/10 text-blue-500">Video</Badge>;
            case "reading": return <Badge className="bg-emerald-500/10 text-emerald-500">Reading</Badge>;
            case "quiz": return <Badge className="bg-purple-500/10 text-purple-500">Quiz</Badge>;
            case "simulation": return <Badge className="bg-amber-500/10 text-amber-500">Simulation</Badge>;
            default: return <Badge variant="outline">{type}</Badge>;
        }
    };

    // Find next incomplete module
    const nextModule = modules.find((m) => !m.completed);

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{courseTitle}</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Progress</p>
                        <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Completed</p>
                        <p className="text-2xl font-bold">{completedCount}/{modules.length}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Time</p>
                        <p className="text-2xl font-bold">{completedDuration}/{totalDuration} min</p>
                    </div>
                </div>

                <Progress value={progress} className="h-3 mb-4" />

                {nextModule && (
                    <Link href={`/module/${courseId}/learn/${modules.indexOf(nextModule)}`}>
                        <Button className="w-full gap-2">
                            Continue: {nextModule.title}
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                )}

                {progress === 100 && (
                    <div className="flex gap-3">
                        <Button className="flex-1 gap-2">
                            <Download className="h-4 w-4" />
                            Download Certificate
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                    </div>
                )}
            </Card>

            {/* Module List */}
            <div className="space-y-2">
                {modules.map((module, index) => (
                    <Card
                        key={module.id}
                        className={cn(
                            "p-4 transition-all",
                            module.completed ? "bg-white/[0.01]" : ""
                        )}
                    >
                        <div className="flex items-center gap-4">
                            {/* Status */}
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                module.completed
                                    ? "bg-emerald-500/10"
                                    : "bg-muted"
                            )}>
                                {module.completed ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                ) : (
                                    <span className="text-sm font-medium">{index + 1}</span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    {getTypeBadge(module.type)}
                                    {module.score !== undefined && (
                                        <Badge variant="outline" className="text-primary">
                                            Score: {module.score}%
                                        </Badge>
                                    )}
                                </div>
                                <p className={cn(
                                    "font-medium",
                                    module.completed && "text-muted-foreground"
                                )}>
                                    {module.title}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    <Clock className="h-3 w-3" />
                                    {module.duration}
                                </p>
                            </div>

                            {/* Action */}
                            <Link href={`/module/${courseId}/learn/${index}`}>
                                <Button
                                    variant={module.completed ? "ghost" : "default"}
                                    size="sm"
                                    className="gap-2"
                                >
                                    {module.completed ? "Review" : "Start"}
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
