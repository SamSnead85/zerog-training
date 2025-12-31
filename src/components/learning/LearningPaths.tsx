"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    NetflixModuleCard,
    HorizontalScrollRow,
    CategoryHeroBanner,
} from "@/components/ui/netflix-cards";
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
    Play,
    Users,
    Award,
    TrendingUp,
    Zap,
    Brain,
    Shield,
    Workflow,
    Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PathCourse {
    id: string;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    xp: number;
    progress?: number;
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
    icon: React.ElementType;
    gradient: string;
    enrollments?: number;
    rating?: number;
}

// Enhanced learning paths with Netflix-style data
const learningPaths: LearningPath[] = [
    {
        id: "ai-mastery",
        title: "AI Mastery Track",
        description: "From AI fundamentals to building autonomous agents. Master prompt engineering, LLMs, and agentic workflows.",
        category: "AI & Technology",
        difficulty: "Advanced",
        totalDuration: "32 hours",
        enrolled: true,
        progress: 28,
        certificateOnCompletion: true,
        icon: Brain,
        gradient: "from-slate-700/40 via-slate-600/25 to-slate-500/10",
        enrollments: 15400,
        rating: 4.9,
        courses: [
            { id: "prompt-eng", title: "Prompt Engineering Masterclass", description: "Master the art of crafting effective AI prompts", duration: "4 hrs", completed: true, locked: false, xp: 200, progress: 100 },
            { id: "chatgpt-power", title: "ChatGPT Power User", description: "Advanced techniques for productivity", duration: "3 hrs", completed: true, locked: false, xp: 150, progress: 100 },
            { id: "llm-deep", title: "LLM Architecture Deep Dive", description: "Understand transformer architecture", duration: "5 hrs", completed: false, locked: false, xp: 250, progress: 35 },
            { id: "agentic-ai", title: "Agentic AI Systems", description: "Build autonomous AI workflows", duration: "8 hrs", completed: false, locked: true, xp: 400 },
            { id: "rag-vectors", title: "RAG & Vector Databases", description: "Production-ready AI with retrieval", duration: "6 hrs", completed: false, locked: true, xp: 300 },
            { id: "ai-ethics", title: "AI Ethics & Governance", description: "Responsible AI deployment", duration: "4 hrs", completed: false, locked: true, xp: 200 },
            { id: "enterprise-ai", title: "Enterprise AI Playbook", description: "Lead AI transformation", duration: "4 hrs", completed: false, locked: true, xp: 250 },
        ],
    },
    {
        id: "leadership-track",
        title: "Leadership Excellence",
        description: "Transform into an effective leader. Master communication, change management, and strategic thinking.",
        category: "Leadership",
        difficulty: "Intermediate",
        totalDuration: "24 hours",
        enrolled: true,
        progress: 45,
        certificateOnCompletion: true,
        icon: TrendingUp,
        gradient: "from-stone-700/40 via-stone-600/25 to-stone-500/10",
        enrollments: 28500,
        rating: 4.8,
        courses: [
            { id: "lf", title: "Leadership Fundamentals", description: "Core leadership principles", duration: "6 hrs", completed: true, locked: false, xp: 200, progress: 100 },
            { id: "ec", title: "Effective Communication", description: "Master professional communication", duration: "4 hrs", completed: true, locked: false, xp: 150, progress: 100 },
            { id: "cm", title: "Change Management", description: "Guide teams through change", duration: "5 hrs", completed: false, locked: false, xp: 180, progress: 40 },
            { id: "sp", title: "Strategic Planning", description: "Long-term vision and execution", duration: "4 hrs", completed: false, locked: true, xp: 160 },
            { id: "el", title: "Executive Presence", description: "Command the room", duration: "5 hrs", completed: false, locked: true, xp: 220 },
        ],
    },
    {
        id: "agentic-sdlc-track",
        title: "Agentic SDLC Mastery",
        description: "Master AI-native software delivery with the NATIVE framework. From foundations to enterprise governance.",
        category: "Agentic Agile SDLC",
        difficulty: "Advanced",
        totalDuration: "32 hours",
        enrolled: false,
        progress: 0,
        certificateOnCompletion: true,
        icon: Workflow,
        gradient: "from-slate-600/40 via-zinc-600/25 to-slate-500/10",
        enrollments: 42000,
        rating: 4.9,
        courses: [
            { id: "native-foundations", title: "NATIVE Framework Foundations", description: "Core AI-native principles", duration: "4 hrs", completed: false, locked: false, xp: 200 },
            { id: "human-ai-collab", title: "Human-AI Collaboration", description: "Build effective partnerships", duration: "4 hrs", completed: false, locked: true, xp: 200 },
            { id: "intent-dev", title: "Intent-Driven Development", description: "Outcome-based requirements", duration: "3 hrs", completed: false, locked: true, xp: 150 },
            { id: "agentic-qa", title: "Agentic Quality Assurance", description: "TDAD and continuous validation", duration: "4 hrs", completed: false, locked: true, xp: 200 },
            { id: "enterprise-gov", title: "Enterprise AI Governance", description: "Scale AI safely", duration: "5 hrs", completed: false, locked: true, xp: 250 },
        ],
    },
    {
        id: "compliance-track",
        title: "Compliance & Security",
        description: "Master regulatory compliance. NIST, HIPAA, SOC 2, GDPR, and cybersecurity essentials.",
        category: "Compliance & Security",
        difficulty: "Beginner",
        totalDuration: "18 hours",
        enrolled: true,
        progress: 100,
        certificateOnCompletion: true,
        icon: Shield,
        gradient: "from-zinc-700/40 via-slate-600/25 to-zinc-500/10",
        enrollments: 65000,
        rating: 4.7,
        courses: [
            { id: "nist", title: "NIST CSF 2.0", description: "Cybersecurity framework", duration: "4 hrs", completed: true, locked: false, xp: 200, progress: 100 },
            { id: "hipaa", title: "HIPAA Compliance", description: "Healthcare privacy", duration: "3 hrs", completed: true, locked: false, xp: 150, progress: 100 },
            { id: "gdpr", title: "GDPR Essentials", description: "EU data protection", duration: "3 hrs", completed: true, locked: false, xp: 120, progress: 100 },
            { id: "cyber", title: "Cybersecurity Awareness", description: "Daily security practices", duration: "3 hrs", completed: true, locked: false, xp: 120, progress: 100 },
            { id: "soc2", title: "SOC 2 Overview", description: "Trust service criteria", duration: "3 hrs", completed: true, locked: false, xp: 150, progress: 100 },
            { id: "ir", title: "Incident Response", description: "Handle security incidents", duration: "2 hrs", completed: true, locked: false, xp: 110, progress: 100 },
        ],
    },
    {
        id: "healthcare-track",
        title: "Healthcare Professional",
        description: "Essential training for healthcare workers. OSHA, patient safety, and clinical documentation.",
        category: "Healthcare",
        difficulty: "Intermediate",
        totalDuration: "16 hours",
        enrolled: false,
        progress: 0,
        certificateOnCompletion: true,
        icon: Heart,
        gradient: "from-slate-700/40 via-zinc-600/25 to-slate-500/10",
        enrollments: 38000,
        rating: 4.8,
        courses: [
            { id: "bbp", title: "Bloodborne Pathogens", description: "OSHA 29 CFR 1910.1030", duration: "2 hrs", completed: false, locked: false, xp: 100 },
            { id: "ps", title: "Patient Safety", description: "Joint Commission NPSG", duration: "3 hrs", completed: false, locked: true, xp: 120 },
            { id: "hipaa-hc", title: "HIPAA for Healthcare", description: "PHI handling", duration: "3 hrs", completed: false, locked: true, xp: 150 },
            { id: "doc", title: "Clinical Documentation", description: "Accurate charting", duration: "4 hrs", completed: false, locked: true, xp: 180 },
            { id: "ic", title: "Infection Control", description: "CDC guidelines", duration: "4 hrs", completed: false, locked: true, xp: 200 },
        ],
    },
];

// Featured path for hero
const featuredPath = learningPaths.find(p => p.id === "ai-mastery")!;

export function LearningPaths() {
    const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
            case "Intermediate": return "bg-blue-500/10 text-blue-500 border-blue-500/30";
            case "Advanced": return "bg-purple-500/10 text-purple-500 border-purple-500/30";
            default: return "";
        }
    };

    // Path detail view
    if (selectedPath) {
        const PathIcon = selectedPath.icon;
        const completedCourses = selectedPath.courses.filter(c => c.completed).length;

        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => setSelectedPath(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                    ← Back to Learning Paths
                </button>

                {/* Path Header */}
                <div className={cn("relative rounded-xl overflow-hidden p-6", `bg-gradient-to-r ${selectedPath.gradient}`)}>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
                        <PathIcon className="h-32 w-32" />
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="border-white/30 text-white/80">{selectedPath.category}</Badge>
                            <Badge className={getDifficultyColor(selectedPath.difficulty)}>
                                {selectedPath.difficulty}
                            </Badge>
                        </div>

                        <h1 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{selectedPath.title}</h1>
                        <p className="text-white/80 mb-4 max-w-xl">{selectedPath.description}</p>

                        <div className="flex items-center gap-6 text-sm text-white/70 mb-6">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {selectedPath.totalDuration}
                            </span>
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {selectedPath.courses.length} courses
                            </span>
                            {selectedPath.rating && (
                                <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    {selectedPath.rating}
                                </span>
                            )}
                            {selectedPath.certificateOnCompletion && (
                                <span className="flex items-center gap-1">
                                    <Trophy className="h-4 w-4 text-yellow-400" />
                                    Certificate
                                </span>
                            )}
                        </div>

                        {selectedPath.enrolled ? (
                            <div className="max-w-md">
                                <div className="flex items-center justify-between mb-2 text-sm text-white/80">
                                    <span>{completedCourses} of {selectedPath.courses.length} completed</span>
                                    <span className="font-medium">{selectedPath.progress}%</span>
                                </div>
                                <Progress value={selectedPath.progress} className="h-2" />
                            </div>
                        ) : (
                            <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
                                <Target className="h-5 w-5" />
                                Start Learning Path
                            </Button>
                        )}
                    </div>
                </div>

                {/* Course List */}
                <div className="space-y-3">
                    <h2 className="font-semibold text-lg">Path Curriculum</h2>
                    {selectedPath.courses.map((course, i) => (
                        <Card
                            key={course.id}
                            className={cn(
                                "p-4 transition-all hover:border-primary/30",
                                course.locked && "opacity-60"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                {/* Step Indicator */}
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-semibold",
                                    course.completed
                                        ? "bg-emerald-500 text-white"
                                        : course.locked
                                            ? "bg-muted text-muted-foreground"
                                            : course.progress && course.progress > 0
                                                ? "bg-primary/20 text-primary"
                                                : "bg-primary/10 text-primary"
                                )}>
                                    {course.completed ? (
                                        <CheckCircle2 className="h-6 w-6" />
                                    ) : course.locked ? (
                                        <Lock className="h-5 w-5" />
                                    ) : (
                                        <span className="text-lg">{i + 1}</span>
                                    )}
                                </div>

                                {/* Course Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">{course.title}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {course.duration}
                                        </span>
                                        <span className="text-primary font-medium">+{course.xp} XP</span>
                                        {course.progress !== undefined && course.progress > 0 && course.progress < 100 && (
                                            <span className="text-amber-500">{course.progress}% complete</span>
                                        )}
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
                                            {course.completed ? (
                                                <>Review</>
                                            ) : course.progress && course.progress > 0 ? (
                                                <>Continue</>
                                            ) : (
                                                <>
                                                    <Play className="h-3.5 w-3.5" />
                                                    Start
                                                </>
                                            )}
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

    // Main paths listing view
    const enrolledPaths = learningPaths.filter(p => p.enrolled && p.progress < 100);
    const completedPaths = learningPaths.filter(p => p.progress === 100);
    const availablePaths = learningPaths.filter(p => !p.enrolled);

    return (
        <div className="space-y-8 -mx-6 lg:-mx-8">
            {/* Hero - Featured Path */}
            <div className="px-6 lg:px-8">
                <CategoryHeroBanner
                    title={featuredPath.title}
                    description={featuredPath.description}
                    category={featuredPath.category}
                    duration={featuredPath.totalDuration}
                    rating={featuredPath.rating}
                    onPlay={() => setSelectedPath(featuredPath)}
                    onMoreInfo={() => setSelectedPath(featuredPath)}
                />
            </div>

            {/* Continue Learning */}
            {enrolledPaths.length > 0 && (
                <div className="px-6 lg:px-8">
                    <h2 className="text-xl font-semibold mb-4">Continue Your Journey</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {enrolledPaths.map((path) => {
                            const PathIcon = path.icon;
                            const nextCourse = path.courses.find(c => !c.completed && !c.locked);

                            return (
                                <Card
                                    key={path.id}
                                    className="overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
                                    onClick={() => setSelectedPath(path)}
                                >
                                    {/* Gradient Header */}
                                    <div className={cn("h-24 relative", `bg-gradient-to-r ${path.gradient}`)}>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                                            <PathIcon className="h-16 w-16 text-white" />
                                        </div>
                                        <div className="absolute bottom-3 left-4">
                                            <Badge className="bg-black/40 text-white border-0 text-[10px]">
                                                {path.progress}% Complete
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-semibold mb-1">{path.title}</h3>

                                        {nextCourse && (
                                            <p className="text-xs text-muted-foreground mb-3">
                                                Up next: {nextCourse.title}
                                            </p>
                                        )}

                                        <Progress value={path.progress} className="h-1.5 mb-3" />

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {path.totalDuration}
                                            </div>
                                            <Button size="sm" className="h-7 gap-1 text-xs">
                                                Continue
                                                <ChevronRight className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Completed Paths */}
            {completedPaths.length > 0 && (
                <div className="px-6 lg:px-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Completed Paths
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {completedPaths.map((path) => {
                            const PathIcon = path.icon;
                            return (
                                <Card
                                    key={path.id}
                                    className="p-4 hover:border-primary/30 transition-all cursor-pointer border-emerald-500/30 bg-emerald-500/5"
                                    onClick={() => setSelectedPath(path)}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">{path.title}</h3>
                                            <p className="text-xs text-emerald-500">Completed</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{path.courses.length} courses</span>
                                        <Link href="/certificates" className="text-primary hover:underline">
                                            View Certificate →
                                        </Link>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Available Paths */}
            <div className="px-6 lg:px-8 pb-8">
                <h2 className="text-xl font-semibold mb-4">Explore More Paths</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availablePaths.map((path) => {
                        const PathIcon = path.icon;

                        return (
                            <Card
                                key={path.id}
                                className="overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
                                onClick={() => setSelectedPath(path)}
                            >
                                {/* Gradient Header */}
                                <div className={cn("h-32 relative", `bg-gradient-to-r ${path.gradient}`)}>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15">
                                        <PathIcon className="h-24 w-24 text-white" />
                                    </div>
                                    <div className="absolute bottom-3 left-4 right-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="border-white/30 text-white/80 text-[10px]">
                                                {path.category}
                                            </Badge>
                                            <Badge className={cn("text-[10px]", getDifficultyColor(path.difficulty))}>
                                                {path.difficulty}
                                            </Badge>
                                        </div>
                                        <h3 className="font-semibold text-white drop-shadow-md">{path.title}</h3>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {path.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            {path.courses.length} courses
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {path.totalDuration}
                                        </span>
                                        {path.rating && (
                                            <span className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                                {path.rating}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {path.enrollments && (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {(path.enrollments / 1000).toFixed(1)}k enrolled
                                            </span>
                                        )}
                                        <Button className="gap-1">
                                            <Sparkles className="h-4 w-4" />
                                            Start Path
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
