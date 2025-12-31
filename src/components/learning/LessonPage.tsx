"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Clock,
    BookOpen,
    Play,
    Code,
    FileText,
    ExternalLink,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type LessonContent, type LessonSection, getLessonsByModule } from "@/lib/curriculum/lesson-content";
import { Quiz, type QuizQuestion } from "@/components/learning/Quiz";
import { CodeEditor, type CodeExercise } from "@/components/learning/CodeEditor";
import { VideoPlayer } from "@/components/learning/VideoPlayer";
import { InteractiveLabComponent } from "@/components/learning/InteractiveLab";
import { ProjectCardComponent } from "@/components/learning/ProjectCard";
import { AISimulatorComponent } from "@/components/learning/AISimulator";


// =============================================================================
// LESSON SECTION RENDERERS
// =============================================================================

interface SectionRendererProps {
    section: LessonSection;
}

function SectionRenderer({ section }: SectionRendererProps) {
    switch (section.type) {
        case "heading":
            const headingClasses = {
                1: "text-3xl font-bold mb-6 mt-12 first:mt-0",
                2: "text-2xl font-semibold mb-4 mt-10",
                3: "text-xl font-medium mb-3 mt-8",
            };
            if (section.level === 1) {
                return <h1 className={headingClasses[1]}>{section.text}</h1>;
            } else if (section.level === 2) {
                return <h2 className={headingClasses[2]}>{section.text}</h2>;
            } else {
                return <h3 className={headingClasses[3]}>{section.text}</h3>;
            }

        case "text":
            return (
                <div className="prose prose-invert prose-lg max-w-none mb-6">
                    {section.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-white/70 leading-relaxed mb-4 whitespace-pre-wrap">
                            {paragraph}
                        </p>
                    ))}
                </div>
            );

        case "video":
            return (
                <div className="mb-8">
                    <VideoPlayer
                        video={{
                            id: section.title,
                            title: section.title,
                            duration: section.duration,
                            videoUrl: section.videoUrl,
                            transcript: section.transcript,
                        }}
                    />
                </div>
            );

        case "callout":
            const calloutStyles = {
                info: "bg-blue-500/10 border-blue-500/30 text-blue-200",
                tip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
                warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-200",
            };
            const calloutIcons = {
                info: "ℹ️",
                tip: "💡",
                warning: "⚠️",
            };
            return (
                <div className={cn("p-4 rounded-xl border mb-6", calloutStyles[section.style])}>
                    <span className="mr-2">{calloutIcons[section.style]}</span>
                    {section.content}
                </div>
            );

        case "code":
            return (
                <div className="mb-6">
                    <div className="rounded-xl overflow-hidden border border-white/10">
                        <div className="px-4 py-2 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
                            <span className="text-xs text-white/40">{section.language}</span>
                            {section.caption && (
                                <span className="text-xs text-white/60">{section.caption}</span>
                            )}
                        </div>
                        <pre className="p-4 overflow-x-auto bg-black/50">
                            <code className="text-sm font-mono text-white/80">{section.code}</code>
                        </pre>
                    </div>
                </div>
            );

        case "quiz":
            return (
                <div className="mb-8">
                    <Quiz
                        title={section.title}
                        questions={section.questions}
                    />
                </div>
            );

        case "exercise":
            return (
                <div className="mb-8">
                    <CodeEditor exercise={section.exercise} />
                </div>
            );

        case "resources":
            return (
                <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-white/60" />
                        Additional Resources
                    </h3>
                    <div className="space-y-3">
                        {section.items.map((item, i) => (
                            <a
                                key={i}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="p-2 rounded-lg bg-white/5">
                                    {item.type === "video" && <Play className="h-4 w-4" />}
                                    {item.type === "article" && <FileText className="h-4 w-4" />}
                                    {item.type === "documentation" && <Code className="h-4 w-4" />}
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-sm group-hover:text-white transition-colors">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-white/40 ml-2">{item.type}</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            );

        // Next-gen content types
        case "interactive-lab":
            return (
                <div className="mb-8">
                    <InteractiveLabComponent lab={section.lab} />
                </div>
            );

        case "project":
            return (
                <div className="mb-8">
                    <ProjectCardComponent project={section.project} />
                </div>
            );

        case "video-enhanced":
            return (
                <div className="mb-8">
                    <VideoPlayer
                        video={{
                            id: section.video.title,
                            title: section.video.title,
                            duration: section.video.duration,
                            videoUrl: section.video.videoUrl,
                            transcript: section.video.transcript,
                            chapters: section.video.chapters.map((c) => ({
                                time: parseChapterTime(c.time),
                                title: c.title,
                            })),
                        }}
                    />
                </div>
            );

        case "simulation":
            return (
                <div className="mb-8">
                    <AISimulatorComponent simulation={section.simulation} />
                </div>
            );

        default:
            return null;
    }
}

// Helper to parse chapter time string to seconds
function parseChapterTime(timeStr: string): number {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

// =============================================================================
// LESSON PAGE COMPONENT
// =============================================================================

interface LessonPageProps {
    lesson: LessonContent;
    lessons: LessonContent[];
    moduleTitle: string;
}

export function LessonPage({ lesson, lessons, moduleTitle }: LessonPageProps) {
    const [showSidebar, setShowSidebar] = useState(false);
    const currentIndex = lessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static",
                showSidebar ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/10">
                    <Link href="/training" className="text-sm text-white/40 hover:text-white flex items-center gap-2 mb-3">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Module
                    </Link>
                    <h2 className="font-semibold line-clamp-2">{moduleTitle}</h2>
                </div>

                {/* Lesson List */}
                <nav className="p-2 overflow-y-auto h-[calc(100vh-120px)]">
                    {lessons.map((l, i) => (
                        <Link
                            key={l.id}
                            href={`/lesson/${lesson.moduleId}/${l.lessonNumber}`}
                            className={cn(
                                "flex items-start gap-3 p-3 rounded-xl transition-colors",
                                lesson.id === l.id
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                                lesson.id === l.id
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-white/60"
                            )}>
                                {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className={cn(
                                    "text-sm line-clamp-2",
                                    lesson.id === l.id ? "font-medium" : "text-white/60"
                                )}>
                                    {l.title}
                                </span>
                                <span className="text-xs text-white/40 flex items-center gap-1 mt-1">
                                    <Clock className="h-3 w-3" />
                                    {l.duration}
                                </span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowSidebar(true)}
                                className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <div>
                                <span className="text-xs text-white/40">
                                    Lesson {lesson.lessonNumber} of {lessons.length}
                                </span>
                                <h1 className="font-medium text-sm lg:text-base line-clamp-1">
                                    {lesson.title}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/40">
                            <Clock className="h-4 w-4" />
                            {lesson.duration}
                        </div>
                    </div>
                </header>

                {/* Lesson Content */}
                <div className="px-6 py-8 max-w-4xl mx-auto">
                    {lesson.content.map((section, i) => (
                        <SectionRenderer key={i} section={section} />
                    ))}

                    {/* Navigation */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                        {prevLesson ? (
                            <Link
                                href={`/lesson/${lesson.moduleId}/${prevLesson.lessonNumber}`}
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5" />
                                <div>
                                    <span className="text-xs text-white/40 block">Previous</span>
                                    <span className="text-sm">{prevLesson.title}</span>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {nextLesson ? (
                            <Link
                                href={`/lesson/${lesson.moduleId}/${nextLesson.lessonNumber}`}
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-right"
                            >
                                <div>
                                    <span className="text-xs text-white/40 block">Next</span>
                                    <span className="text-sm">{nextLesson.title}</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        ) : (
                            <Link
                                href={`/training/${lesson.moduleId}`}
                                className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                Complete Module
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
