"use client";

/**
 * Learning Path Sidebar
 * 
 * Displays path structure, progress, and navigation
 * similar to Google Cloud Skills Boost and Coursera.
 */

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    ChevronRight,
    Play,
    CheckCircle2,
    Lock,
    FileText,
    Video,
    Code,
    FlaskConical,
    ClipboardCheck,
    Award,
    Clock,
    Circle,
} from "lucide-react";
import { Progress } from "@/components/ui";

// Types
interface PathModule {
    id: string;
    title: string;
    order: number;
    status: "locked" | "not_started" | "in_progress" | "completed";
    lessons: PathLesson[];
    checkpoint?: {
        id: string;
        title: string;
        passed: boolean;
    };
}

interface PathLesson {
    id: string;
    title: string;
    duration: string;
    type: "video" | "article" | "interactive" | "lab" | "quiz" | "project";
    status: "locked" | "not_started" | "in_progress" | "completed";
    current?: boolean;
}

interface LearningPathSidebarProps {
    pathId: string;
    pathTitle: string;
    modules: PathModule[];
    currentModuleId?: string;
    currentLessonId?: string;
    overallProgress: number;
    onLessonClick?: (moduleId: string, lessonId: string) => void;
}

// Lesson type icons
const lessonTypeIcons: Record<PathLesson["type"], React.ElementType> = {
    video: Video,
    article: FileText,
    interactive: Code,
    lab: FlaskConical,
    quiz: ClipboardCheck,
    project: Award,
};

// Status icons
function StatusIcon({ status }: { status: PathLesson["status"] | PathModule["status"] }) {
    switch (status) {
        case "completed":
            return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
        case "in_progress":
            return <Circle className="h-4 w-4 text-primary fill-primary/30" />;
        case "locked":
            return <Lock className="h-4 w-4 text-muted-foreground/50" />;
        default:
            return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
}

export function LearningPathSidebar({
    pathId,
    pathTitle,
    modules,
    currentModuleId,
    currentLessonId,
    overallProgress,
    onLessonClick,
}: LearningPathSidebarProps) {
    // Auto-expand current module, collapse others
    const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        if (currentModuleId) initial.add(currentModuleId);
        return initial;
    });

    const toggleModule = (moduleId: string) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    };

    return (
        <aside className="w-80 border-r border-border bg-card/50 flex flex-col h-screen sticky top-0">
            {/* Path Header */}
            <div className="p-4 border-b border-border">
                <Link href={`/paths/${pathId}`} className="block">
                    <h2 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                        {pathTitle}
                    </h2>
                </Link>
                <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-2" />
                </div>
            </div>

            {/* Modules List */}
            <nav className="flex-1 overflow-y-auto p-2">
                {modules.map((module) => {
                    const isExpanded = expandedModules.has(module.id);
                    const isCurrent = module.id === currentModuleId;
                    const completedLessons = module.lessons.filter(l => l.status === "completed").length;
                    const moduleProgress = Math.round((completedLessons / module.lessons.length) * 100) || 0;

                    return (
                        <div key={module.id} className="mb-1">
                            {/* Module Header */}
                            <button
                                onClick={() => toggleModule(module.id)}
                                disabled={module.status === "locked"}
                                className={cn(
                                    "w-full flex items-start gap-2 p-3 rounded-lg text-left transition-colors",
                                    module.status === "locked"
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-muted",
                                    isCurrent && "bg-primary/5"
                                )}
                            >
                                <StatusIcon status={module.status} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">
                                            Module {module.order}
                                        </span>
                                        {module.status !== "locked" && (
                                            <span className="text-xs text-muted-foreground">
                                                • {completedLessons}/{module.lessons.length}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium mt-0.5 line-clamp-2">
                                        {module.title}
                                    </p>
                                </div>
                                {module.status !== "locked" && (
                                    isExpanded
                                        ? <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                        : <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                )}
                            </button>

                            {/* Lessons List */}
                            {isExpanded && module.status !== "locked" && (
                                <div className="ml-6 pl-4 border-l border-border/50 mt-1 space-y-0.5">
                                    {module.lessons.map((lesson) => {
                                        const TypeIcon = lessonTypeIcons[lesson.type];
                                        const isCurrentLesson = lesson.id === currentLessonId;

                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => lesson.status !== "locked" && onLessonClick?.(module.id, lesson.id)}
                                                disabled={lesson.status === "locked"}
                                                className={cn(
                                                    "w-full flex items-center gap-2 p-2 rounded-md text-left text-sm transition-colors",
                                                    lesson.status === "locked"
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : "hover:bg-muted",
                                                    isCurrentLesson && "bg-primary/10 text-primary"
                                                )}
                                            >
                                                <StatusIcon status={lesson.status} />
                                                <TypeIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                                <span className="flex-1 truncate">{lesson.title}</span>
                                                <span className="text-xs text-muted-foreground flex-shrink-0">
                                                    {lesson.duration}
                                                </span>
                                            </button>
                                        );
                                    })}

                                    {/* Module Checkpoint */}
                                    {module.checkpoint && (
                                        <div className="pt-2 mt-2 border-t border-border/50">
                                            <div className={cn(
                                                "flex items-center gap-2 p-2 rounded-md text-sm",
                                                module.checkpoint.passed
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-amber-500/10 text-amber-500"
                                            )}>
                                                <ClipboardCheck className="h-4 w-4" />
                                                <span className="flex-1">{module.checkpoint.title}</span>
                                                {module.checkpoint.passed ? (
                                                    <CheckCircle2 className="h-4 w-4" />
                                                ) : (
                                                    <span className="text-xs">Required</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Estimated: 4h remaining</span>
                </div>
            </div>
        </aside>
    );
}

export default LearningPathSidebar;
