"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Route,
    BookOpen,
    Clock,
    Star,
    Lock,
    CheckCircle2,
    ChevronRight,
    Trophy,
    Target,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PathCourse {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    xp: number;
}

interface LearningPath {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    totalDuration: string;
    courses: PathCourse[];
    enrolled: boolean;
    progress: number;
    certificateOnCompletion: boolean;
}

// Mock learning paths
const learningPaths: LearningPath[] = [
    {
        id: "leadership-track",
        title: "Leadership Excellence",
        description: "Master essential leadership skills from fundamentals to advanced strategies",
        category: "Leadership",
        difficulty: "Intermediate",
        totalDuration: "24 hours",
        enrolled: true,
        progress: 45,
        certificateOnCompletion: true,
        courses: [
            { id: "lf", title: "Leadership Fundamentals", duration: "6 hrs", completed: true, locked: false, xp: 200 },
            { id: "ec", title: "Effective Communication", duration: "4 hrs", completed: true, locked: false, xp: 150 },
            { id: "cm", title: "Change Management", duration: "5 hrs", completed: false, locked: false, xp: 180 },
            { id: "sp", title: "Strategic Planning", duration: "4 hrs", completed: false, locked: true, xp: 160 },
            { id: "el", title: "Executive Leadership", duration: "5 hrs", completed: false, locked: true, xp: 220 },
        ],
    },
    {
        id: "agile-track",
        title: "Agile Mastery",
        description: "Become an agile expert with certifications in Scrum and SAFe",
        category: "Agile",
        difficulty: "Advanced",
        totalDuration: "32 hours",
        enrolled: false,
        progress: 0,
        certificateOnCompletion: true,
        courses: [
            { id: "af", title: "Agile Foundations", duration: "4 hrs", completed: false, locked: false, xp: 150 },
            { id: "sm", title: "Scrum Master Certification", duration: "8 hrs", completed: false, locked: true, xp: 300 },
            { id: "po", title: "Product Owner Essentials", duration: "6 hrs", completed: false, locked: true, xp: 220 },
            { id: "safe", title: "SAFe Scrum Master", duration: "8 hrs", completed: false, locked: true, xp: 350 },
            { id: "rte", title: "Release Train Engineer", duration: "6 hrs", completed: false, locked: true, xp: 280 },
        ],
    },
    {
        id: "compliance-track",
        title: "Compliance & Security",
        description: "Essential compliance training for regulated industries",
        category: "Compliance",
        difficulty: "Beginner",
        totalDuration: "12 hours",
        enrolled: true,
        progress: 100,
        certificateOnCompletion: true,
        courses: [
            { id: "hipaa", title: "HIPAA Compliance", duration: "2 hrs", completed: true, locked: false, xp: 100 },
            { id: "gdpr", title: "GDPR Essentials", duration: "3 hrs", completed: true, locked: false, xp: 120 },
            { id: "cyber", title: "Cybersecurity Awareness", duration: "3 hrs", completed: true, locked: false, xp: 120 },
            { id: "dp", title: "Data Privacy Fundamentals", duration: "2 hrs", completed: true, locked: false, xp: 100 },
            { id: "ir", title: "Incident Response", duration: "2 hrs", completed: true, locked: false, xp: 110 },
        ],
    },
];

export function LearningPaths() {
    const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "bg-emerald-500/10 text-emerald-500";
            case "Intermediate": return "bg-blue-500/10 text-blue-500";
            case "Advanced": return "bg-purple-500/10 text-purple-500";
            default: return "";
        }
    };

    if (selectedPath) {
        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => setSelectedPath(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← Back to Learning Paths
                </button>

                {/* Path Header */}
                <Card className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{selectedPath.category}</Badge>
                                <Badge variant="secondary" className={getDifficultyColor(selectedPath.difficulty)}>
                                    {selectedPath.difficulty}
                                </Badge>
                            </div>
                            <h1 className="text-2xl font-bold mb-2">{selectedPath.title}</h1>
                            <p className="text-muted-foreground mb-4">{selectedPath.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {selectedPath.totalDuration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    {selectedPath.courses.length} courses
                                </span>
                                {selectedPath.certificateOnCompletion && (
                                    <span className="flex items-center gap-1">
                                        <Trophy className="h-4 w-4 text-yellow-500" />
                                        Certificate
                                    </span>
                                )}
                            </div>
                        </div>
                        {!selectedPath.enrolled && (
                            <Button size="lg" className="gap-2">
                                <Target className="h-5 w-5" />
                                Start Path
                            </Button>
                        )}
                    </div>

                    {selectedPath.enrolled && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Your Progress</span>
                                <span className="text-sm font-medium">{selectedPath.progress}%</span>
                            </div>
                            <Progress value={selectedPath.progress} className="h-2" />
                        </div>
                    )}
                </Card>

                {/* Course List */}
                <div className="space-y-3">
                    {selectedPath.courses.map((course, i) => (
                        <Card
                            key={course.id}
                            className={cn(
                                "p-4 transition-all",
                                course.locked && "opacity-60"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                {/* Step Number */}
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                    course.completed
                                        ? "bg-emerald-500 text-white"
                                        : course.locked
                                            ? "bg-muted text-muted-foreground"
                                            : "bg-primary/10 text-primary"
                                )}>
                                    {course.completed ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : course.locked ? (
                                        <Lock className="h-4 w-4" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>

                                {/* Course Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">{course.title}</p>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span>{course.duration}</span>
                                        <span className="text-primary">+{course.xp} XP</span>
                                    </div>
                                </div>

                                {/* Action */}
                                {!course.locked && (
                                    <Link href={`/module/${course.id}`}>
                                        <Button
                                            variant={course.completed ? "outline" : "default"}
                                            size="sm"
                                            className="gap-2"
                                        >
                                            {course.completed ? "Review" : "Start"}
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Learning Paths</h1>
                    <p className="text-muted-foreground">Structured tracks to master new skills</p>
                </div>
            </div>

            {/* Path Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path) => (
                    <Card
                        key={path.id}
                        className="overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
                        onClick={() => setSelectedPath(path)}
                    >
                        {/* Header */}
                        <div className="h-2 bg-gradient-to-r from-primary to-primary/50" />

                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline">{path.category}</Badge>
                                <Badge variant="secondary" className={getDifficultyColor(path.difficulty)}>
                                    {path.difficulty}
                                </Badge>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {path.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    {path.courses.length} courses
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {path.totalDuration}
                                </span>
                            </div>

                            {path.enrolled ? (
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{path.progress}%</span>
                                    </div>
                                    <Progress value={path.progress} className="h-2" />
                                </div>
                            ) : (
                                <Button className="w-full gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Start Learning Path
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
