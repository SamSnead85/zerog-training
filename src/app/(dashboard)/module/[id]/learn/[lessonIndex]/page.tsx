"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    X,
    Play,
    Pause,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    CheckCircle2,
    Circle,
    Clock,
    Award,
    Sparkles,
    Menu,
    Volume2,
    Maximize2,
    SkipBack,
    SkipForward,
} from "lucide-react";
import { safeScrumMasterContent, leadershipContent, hipaaContent } from "@/lib/content/training-content";
import { projectManagementContent, deiContent, softSkillsContent, technologyContent, salesContent } from "@/lib/content/additional-content";
import { aiNativeContent, agenticAIContent, legacyModernizationContent } from "@/lib/content/ai-training-content";
import { promptEngineeringContent, ragImplementationContent } from "@/lib/content/extended-ai-content";
import { cybersecurityContent, changeManagementContent } from "@/lib/content/enterprise-content";
import { AITutor } from "@/components/ai/AITutor";

// Map module IDs to content
const contentMap: Record<string, typeof safeScrumMasterContent> = {
    "safe-scrum-master": safeScrumMasterContent,
    "leadership-fundamentals": leadershipContent,
    "hipaa-essentials": hipaaContent,
    "project-management": projectManagementContent,
    "inclusive-leadership": deiContent,
    "effective-feedback": softSkillsContent,
    "data-analytics": technologyContent,
    "consultative-selling": salesContent,
    // AI Modules
    "ai-native-transformation": aiNativeContent,
    "agentic-ai": agenticAIContent,
    "legacy-modernization-ai": legacyModernizationContent,
    // Extended AI Modules
    "prompt-engineering": promptEngineeringContent,
    "rag-implementation": ragImplementationContent,
    // Enterprise Modules
    "cybersecurity-fundamentals": cybersecurityContent,
    "change-management": changeManagementContent,
};

interface QuizState {
    selectedAnswer: number | null;
    submitted: boolean;
    correct: boolean;
}

// Progress hook import
import { useProgress } from "@/hooks/useProgress";

export default function LessonPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = params.id as string;
    const lessonIndex = parseInt(params.lessonIndex as string) || 0;

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [quizState, setQuizState] = useState<QuizState>({
        selectedAnswer: null,
        submitted: false,
        correct: false,
    });

    // Use persistent progress tracking
    const {
        currentProgress,
        currentCompletion,
        completeLesson,
        updateLastAccessed,
        isLoaded
    } = useProgress(moduleId);

    const module = contentMap[moduleId];
    const lesson = module?.lessons[lessonIndex];
    const totalLessons = module?.lessons.length || 0;

    // Use persisted completion or local state
    const completedLessons = new Set(currentProgress?.completedLessons || []);
    const progressPercent = currentCompletion;

    // Update last accessed when navigating
    useEffect(() => {
        if (isLoaded && module) {
            updateLastAccessed(moduleId, lessonIndex, totalLessons);
        }
    }, [isLoaded, moduleId, lessonIndex, totalLessons, module, updateLastAccessed]);

    useEffect(() => {
        setQuizState({ selectedAnswer: null, submitted: false, correct: false });
    }, [lessonIndex]);

    if (!module || !lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="text-xl font-bold mb-2">Lesson not found</h2>
                    <Link href={`/module/${moduleId}`}>
                        <Button>Back to Module</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const handleQuizSubmit = () => {
        if (quizState.selectedAnswer === null) return;
        const quiz = lesson.quiz || (lesson as any).questions?.[0];
        const isCorrect = quizState.selectedAnswer === quiz?.correctIndex;
        setQuizState({ ...quizState, submitted: true, correct: isCorrect });
        if (isCorrect) {
            // Persist completion
            completeLesson(moduleId, lessonIndex, totalLessons, 100);
        }
    };

    const handleNext = () => {
        // Mark current lesson as complete when navigating next
        completeLesson(moduleId, lessonIndex, totalLessons);
        if (lessonIndex < totalLessons - 1) {
            router.push(`/module/${moduleId}/learn/${lessonIndex + 1}`);
        }
    };

    const handlePrev = () => {
        if (lessonIndex > 0) {
            router.push(`/module/${moduleId}/learn/${lessonIndex - 1}`);
        }
    };

    const quiz = lesson.quiz || (lesson as any).questions?.[0];

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - Lesson List */}
            <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-border bg-card overflow-hidden`}>
                <div className="p-4 border-b border-border">
                    <Link href={`/module/${moduleId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Overview
                    </Link>
                    <h2 className="font-semibold truncate">{module.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <Progress value={progressPercent} className="flex-1 h-1.5" />
                        <span className="text-xs text-muted-foreground">{Math.round(progressPercent)}%</span>
                    </div>
                </div>

                <nav className="p-2 overflow-y-auto h-[calc(100vh-140px)]">
                    {module.lessons.map((l, i) => {
                        const isCompleted = completedLessons.has(i);
                        const isCurrent = i === lessonIndex;
                        return (
                            <button
                                key={l.id}
                                onClick={() => router.push(`/module/${moduleId}/learn/${i}`)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors mb-1 ${isCurrent
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${isCompleted
                                    ? 'bg-success text-success-foreground'
                                    : isCurrent
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {isCompleted ? <Check className="h-3 w-3" /> : i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${isCurrent ? 'text-primary' : ''}`}>
                                        {l.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{l.duration}</p>
                                </div>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="h-14 border-b border-border flex items-center gap-4 px-4">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                        <span className="text-sm text-muted-foreground">Lesson {lessonIndex + 1} of {totalLessons}</span>
                    </div>
                    <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}
                    </Badge>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {/* Video/Content Header */}
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 border-b border-border">
                        <div className="max-w-4xl mx-auto">
                            <Badge className="mb-3">{lesson.type === 'quiz' ? 'Assessment' : 'Lesson'}</Badge>
                            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{lesson.title}</h1>
                            <p className="text-muted-foreground">
                                {module.title} • Part {lessonIndex + 1}
                            </p>
                        </div>
                    </div>

                    {/* Lesson Content */}
                    <div className="max-w-4xl mx-auto p-6 lg:p-8">
                        {lesson.type !== 'quiz' && lesson.content && (
                            <Card className="p-6 lg:p-8 mb-8">
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    {lesson.content.split('\n').map((line, i) => {
                                        if (line.startsWith('# ')) {
                                            return <h1 key={i} className="text-2xl font-bold mt-6 mb-4 first:mt-0">{line.slice(2)}</h1>;
                                        }
                                        if (line.startsWith('## ')) {
                                            return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
                                        }
                                        if (line.startsWith('### ')) {
                                            return <h3 key={i} className="text-lg font-medium mt-4 mb-2">{line.slice(4)}</h3>;
                                        }
                                        if (line.startsWith('> ')) {
                                            return <blockquote key={i} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{line.slice(2)}</blockquote>;
                                        }
                                        if (line.startsWith('- ') || line.startsWith('* ')) {
                                            return <li key={i} className="ml-4">{line.slice(2)}</li>;
                                        }
                                        if (line.match(/^\d+\. /)) {
                                            return <li key={i} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                                        }
                                        if (line.startsWith('| ')) {
                                            return null; // Tables rendered separately
                                        }
                                        if (line.trim()) {
                                            return <p key={i} className="mb-4">{line}</p>;
                                        }
                                        return null;
                                    })}
                                </div>
                            </Card>
                        )}

                        {/* Quiz Section */}
                        {quiz && (
                            <Card className="p-6 lg:p-8 border-primary/30">
                                <div className="flex items-center gap-2 mb-4">
                                    <Award className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Knowledge Check</h3>
                                </div>

                                <p className="text-lg mb-6">{quiz.question}</p>

                                <div className="space-y-3 mb-6">
                                    {quiz.options.map((option: string, i: number) => {
                                        const isSelected = quizState.selectedAnswer === i;
                                        const showResult = quizState.submitted;
                                        const isCorrect = i === quiz.correctIndex;

                                        let bgClass = 'bg-muted/50 hover:bg-muted border-border';
                                        if (showResult) {
                                            if (isCorrect) bgClass = 'bg-success/10 border-success text-success';
                                            else if (isSelected && !isCorrect) bgClass = 'bg-destructive/10 border-destructive text-destructive';
                                        } else if (isSelected) {
                                            bgClass = 'bg-primary/10 border-primary';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => !quizState.submitted && setQuizState({ ...quizState, selectedAnswer: i })}
                                                disabled={quizState.submitted}
                                                className={`w-full p-4 rounded-lg border text-left transition-all flex items-center gap-3 ${bgClass}`}
                                            >
                                                <div className={`h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-current bg-current/10' : 'border-border'
                                                    }`}>
                                                    {showResult && isCorrect && <Check className="h-4 w-4" />}
                                                    {showResult && isSelected && !isCorrect && <X className="h-4 w-4" />}
                                                    {!showResult && <span className="text-xs">{String.fromCharCode(65 + i)}</span>}
                                                </div>
                                                <span>{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {!quizState.submitted ? (
                                    <Button
                                        onClick={handleQuizSubmit}
                                        disabled={quizState.selectedAnswer === null}
                                        className="w-full"
                                    >
                                        Submit Answer
                                    </Button>
                                ) : (
                                    <Card className={`p-4 ${quizState.correct ? 'bg-success/10 border-success' : 'bg-warning/10 border-warning'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {quizState.correct ? (
                                                <>
                                                    <CheckCircle2 className="h-5 w-5 text-success" />
                                                    <span className="font-semibold text-success">Correct!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <X className="h-5 w-5 text-warning" />
                                                    <span className="font-semibold text-warning">Not quite</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
                                    </Card>
                                )}
                            </Card>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                            <Button
                                variant="outline"
                                onClick={handlePrev}
                                disabled={lessonIndex === 0}
                                className="gap-2"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>

                            {lessonIndex < totalLessons - 1 ? (
                                <Button onClick={handleNext} className="gap-2">
                                    Next Lesson
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Link href={`/module/${moduleId}`}>
                                    <Button className="gap-2">
                                        <Award className="h-4 w-4" />
                                        Complete Course
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {/* AI Tutor */}
            <AITutor
                lessonTitle={lesson.title}
                lessonContent={lesson.content}
                moduleId={moduleId}
            />
        </div>
    );
}
