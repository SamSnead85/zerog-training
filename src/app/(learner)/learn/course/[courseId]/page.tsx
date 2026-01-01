"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Play,
    BookOpen,
    Clock,
    Award,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Course content (would come from API/database)
const courseContent: Record<string, {
    title: string;
    lessons: { id: string; title: string; type: "video" | "reading" | "quiz"; duration: string; content: string }[];
}> = {
    "native-framework": {
        title: "NATIVE Framework Foundations",
        lessons: [
            { id: "1", title: "What is NATIVE?", type: "video", duration: "8 min", content: "The NATIVE framework represents a paradigm shift in how we approach software development in the age of AI..." },
            { id: "2", title: "The AI-Native Imperative", type: "reading", duration: "12 min", content: "Organizations that fail to adopt AI-native practices risk falling behind. In this lesson, we explore why the shift to AI-augmented development is not optional..." },
            { id: "3", title: "Framework Overview", type: "video", duration: "10 min", content: "NATIVE stands for: Normalize Intent, Augment Execution, Test Continuously, Iterate Autonomously, Validate Outcomes, and Evolve Systems..." },
            { id: "4", title: "Capturing User Intent", type: "video", duration: "15 min", content: "The first step in the NATIVE framework is normalizing intent. Learn how to capture and structure user requirements in a way that AI systems can understand and act upon..." },
            { id: "5", title: "Intent Templates", type: "reading", duration: "12 min", content: "Intent templates provide a structured format for capturing requirements. This lesson covers the anatomy of an effective intent template..." },
            { id: "6", title: "Knowledge Check", type: "quiz", duration: "5 min", content: "quiz" },
        ],
    },
};

export default function CoursePlayerPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);

    const course = courseContent[courseId] || courseContent["native-framework"];
    const currentLesson = course.lessons[currentLessonIndex];
    const progress = Math.round((completedLessons.length / course.lessons.length) * 100);

    useEffect(() => {
        const storedUser = localStorage.getItem("learner_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/learn/login");
        }

        // Load completed lessons from localStorage
        const stored = localStorage.getItem(`course_${courseId}_completed`);
        if (stored) {
            setCompletedLessons(JSON.parse(stored));
        }
    }, [courseId, router]);

    const markComplete = () => {
        if (!completedLessons.includes(currentLesson.id)) {
            const updated = [...completedLessons, currentLesson.id];
            setCompletedLessons(updated);
            localStorage.setItem(`course_${courseId}_completed`, JSON.stringify(updated));
        }

        // Auto-advance to next lesson
        if (currentLessonIndex < course.lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const goToLesson = (index: number) => {
        setCurrentLessonIndex(index);
        setSidebarOpen(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar - Course Navigation */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border transform transition-transform lg:relative lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                        <Link href="/learn/dashboard" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <ChevronLeft className="h-4 w-4" />
                            My Learning
                        </Link>
                        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <h2 className="font-semibold line-clamp-2">{course.title}</h2>
                    <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </div>

                {/* Lesson List */}
                <div className="overflow-y-auto h-[calc(100vh-160px)]">
                    {course.lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isCurrent = index === currentLessonIndex;
                        return (
                            <button
                                key={lesson.id}
                                onClick={() => goToLesson(index)}
                                className={cn(
                                    "w-full p-4 text-left border-b border-border flex items-start gap-3 hover:bg-muted/50 transition-colors",
                                    isCurrent && "bg-primary/5 border-l-2 border-l-primary"
                                )}
                            >
                                <div className={cn(
                                    "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                    isCompleted ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                                )}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <span className="text-xs font-medium">{index + 1}</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        "text-sm font-medium line-clamp-2",
                                        isCurrent && "text-primary"
                                    )}>
                                        {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        {lesson.type === "video" && <Play className="h-3 w-3" />}
                                        {lesson.type === "reading" && <BookOpen className="h-3 w-3" />}
                                        {lesson.type === "quiz" && <Award className="h-3 w-3" />}
                                        <span>{lesson.duration}</span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <div className="h-14 border-b border-border flex items-center justify-between px-4">
                    <button
                        className="lg:hidden p-2 hover:bg-muted rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="hidden lg:block text-sm text-muted-foreground">
                        Lesson {currentLessonIndex + 1} of {course.lessons.length}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                            {currentLesson.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {currentLesson.duration}
                        </span>
                    </div>
                </div>

                {/* Lesson Content */}
                <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl md:text-3xl font-bold mb-6">{currentLesson.title}</h1>

                        {currentLesson.type === "video" && (
                            <div className="aspect-video bg-muted rounded-xl mb-6 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                        <Play className="h-8 w-8 text-primary ml-1" />
                                    </div>
                                    <p className="text-muted-foreground">Video Player</p>
                                    <p className="text-sm text-muted-foreground">(Demo mode)</p>
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {currentLesson.content}
                            </p>

                            {currentLesson.type !== "quiz" && (
                                <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
                                    <h3 className="text-lg font-semibold mb-3">Key Takeaways</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                            <span>Understanding the core principles covered in this lesson</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                            <span>Practical applications in real-world scenarios</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                            <span>Next steps for implementation</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="border-t border-border p-4">
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                        <Button
                            variant="outline"
                            disabled={currentLessonIndex === 0}
                            onClick={() => setCurrentLessonIndex(currentLessonIndex - 1)}
                            className="gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        {completedLessons.includes(currentLesson.id) ? (
                            <Button
                                onClick={() => currentLessonIndex < course.lessons.length - 1 && setCurrentLessonIndex(currentLessonIndex + 1)}
                                disabled={currentLessonIndex === course.lessons.length - 1}
                                className="gap-2"
                            >
                                Next Lesson
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button onClick={markComplete} className="gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Mark Complete
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
