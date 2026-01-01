"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    BookOpen,
    CheckCircle2,
    Play,
    Pause,
    RotateCcw,
    List,
    Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for lesson content
interface LessonContent {
    id: string;
    title: string;
    module: number;
    topic?: number;
    duration: string;
    content: string; // HTML content
    prerequisites?: string[];
    nextLesson?: string;
    prevLesson?: string;
}

interface LessonProgress {
    completed: boolean;
    progress: number; // 0-100
    timeSpent: number; // seconds
    lastAccessed?: Date;
}

export default function LessonViewer() {
    const params = useParams();
    const moduleId = params.moduleId as string;
    const lessonId = params.lessonId as string;

    const [lesson, setLesson] = useState<LessonContent | null>(null);
    const [progress, setProgress] = useState<LessonProgress>({
        completed: false,
        progress: 0,
        timeSpent: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showToc, setShowToc] = useState(false);
    const [readingTime, setReadingTime] = useState(0);
    const [tableOfContents, setTableOfContents] = useState<Array<{
        id: string;
        text: string;
        level: number;
    }>>([]);

    // Load lesson content
    useEffect(() => {
        async function loadLesson() {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/content/lesson?module=${moduleId}&lesson=${lessonId}`);
                const data = await res.json();

                if (data.success && data.lesson) {
                    setLesson(data.lesson);
                    extractToc(data.lesson.content);
                }
            } catch (error) {
                console.error("Failed to load lesson:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadLesson();
    }, [moduleId, lessonId]);

    // Track reading progress
    useEffect(() => {
        const timer = setInterval(() => {
            setReadingTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const scrollProgress = Math.min(100, Math.round((scrollPosition / scrollHeight) * 100));

            setProgress(prev => ({
                ...prev,
                progress: Math.max(prev.progress, scrollProgress),
            }));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Extract table of contents from HTML
    function extractToc(html: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const headings = doc.querySelectorAll("h2, h3");

        const toc = Array.from(headings).map((h, i) => ({
            id: h.id || `heading-${i}`,
            text: h.textContent || "",
            level: h.tagName === "H2" ? 2 : 3,
        }));

        setTableOfContents(toc);
    }

    // Mark as complete
    async function markComplete() {
        setProgress(prev => ({ ...prev, completed: true, progress: 100 }));

        // Save to backend
        await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                moduleId,
                lessonId,
                completed: true,
                timeSpent: readingTime,
            }),
        });
    }

    // Format time
    function formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                    <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                    <div className="h-96 bg-muted rounded mt-8" />
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The lesson you're looking for doesn't exist.
                </p>
                <Link href="/learn">
                    <Button>Back to Courses</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Progress value={progress.progress} className="h-1 rounded-none" />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/learn/course/${moduleId}`}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <Badge variant="outline" className="text-xs">
                                Module {lesson.module}
                            </Badge>
                            <h1 className="text-lg font-semibold line-clamp-1">
                                {lesson.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(readingTime)}</span>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowToc(!showToc)}
                        >
                            <List className="h-4 w-4" />
                        </Button>

                        {!progress.completed ? (
                            <Button size="sm" onClick={markComplete}>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Mark Complete
                            </Button>
                        ) : (
                            <Badge className="bg-emerald-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
                {/* Table of Contents Sidebar */}
                {showToc && (
                    <aside className="w-64 flex-shrink-0 hidden lg:block">
                        <div className="sticky top-24">
                            <Card className="p-4">
                                <h3 className="font-semibold mb-4 text-sm">Contents</h3>
                                <nav className="space-y-1">
                                    {tableOfContents.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={cn(
                                                "block text-sm text-muted-foreground hover:text-foreground transition-colors",
                                                item.level === 3 && "pl-4"
                                            )}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </Card>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <article className="flex-1 min-w-0">
                    <Card className="p-8">
                        {/* Lesson meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-4 border-b">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                Lesson
                            </span>
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-invert max-w-none
                                       prose-headings:scroll-mt-24
                                       prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
                                       prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
                                       prose-p:text-muted-foreground prose-p:leading-relaxed
                                       prose-pre:bg-zinc-900 prose-pre:p-4 prose-pre:rounded-lg
                                       prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded
                                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                       prose-ul:space-y-2 prose-li:text-muted-foreground
                                       prose-table:border-border prose-td:border-border prose-th:border-border"
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
                    </Card>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                        {lesson.prevLesson ? (
                            <Link href={`/learn/lesson/${moduleId}/${lesson.prevLesson}`}>
                                <Button variant="outline" className="gap-2">
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous Lesson
                                </Button>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {lesson.nextLesson ? (
                            <Link href={`/learn/lesson/${moduleId}/${lesson.nextLesson}`}>
                                <Button className="gap-2">
                                    Next Lesson
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href={`/learn/course/${moduleId}/quiz`}>
                                <Button className="gap-2">
                                    Take Module Quiz
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}
