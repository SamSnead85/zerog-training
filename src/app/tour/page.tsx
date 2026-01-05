"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Badge, Progress } from "@/components/ui";
import {
    Play,
    CheckCircle2,
    Code,
    Brain,
    GraduationCap,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Target,
    Award,
    BookOpen,
    Lightbulb,
    ChevronRight,
    FileText,
    Users,
    Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TOUR STOPS DATA
// =============================================================================

const tourStops = [
    {
        id: "lesson-player",
        title: "Rich Lesson Experience",
        icon: Play,
        description: "Deep technical content with video chapters, transcripts, and expert insights",
    },
    {
        id: "interactive-lab",
        title: "Hands-On Labs",
        icon: Code,
        description: "Monaco-powered coding environments with step-by-step guidance",
    },
    {
        id: "quiz-engine",
        title: "Knowledge Validation",
        icon: Brain,
        description: "Multi-type assessments with detailed explanations",
    },
    {
        id: "capstone-project",
        title: "Real-World Projects",
        icon: Target,
        description: "Industry-specific capstones with professional rubrics",
    },
    {
        id: "certification",
        title: "Professional Certification",
        icon: Award,
        description: "Verifiable credentials for LinkedIn and career advancement",
    },
];

// Sample lesson content for the demo
const sampleLesson = {
    title: "Prompt Engineering Fundamentals",
    module: "Module 1: Implementation Essentials",
    duration: "40 min",
    videoChapters: [
        { time: "0:00", title: "Introduction to Prompting" },
        { time: "3:00", title: "The CRISP Framework" },
        { time: "8:00", title: "Context Engineering" },
        { time: "15:00", title: "Advanced Techniques" },
    ],
    keyTakeaways: [
        "CRISP: Context, Role, Instructions, Style, Parameters",
        "Context engineering is more important than prompt engineering",
        "Effective prompts produce consistent, high-quality outputs",
    ],
};

// Sample lab content
const sampleLab = {
    title: "Build Your First AI Prompt",
    objective: "Create and iterate on prompts using the CRISP framework",
    difficulty: "beginner",
    estimatedTime: "15 min",
    steps: [
        { id: "1", title: "Create a basic prompt", completed: true },
        { id: "2", title: "Add role context", completed: true },
        { id: "3", title: "Apply CRISP framework", completed: false, current: true },
        { id: "4", title: "Test and validate", completed: false },
    ],
    starterCode: `# Prompt Engineering Lab
# Apply the CRISP framework

prompt = """
[Context] A junior developer needs to understand APIs
[Role] Act as a patient senior developer
[Instruction] Explain what APIs are and give 3 examples
[Style] Use simple language with code examples
[Parameters] Keep it under 200 words
"""

print(prompt)`,
};

// Sample quiz questions
const sampleQuiz = {
    title: "AI Fundamentals Check",
    questions: [
        {
            id: "q1",
            question: "What is the key difference between traditional programming and machine learning?",
            options: [
                "ML uses more memory",
                "Traditional requires explicit rules, ML learns from data",
                "ML can only do image recognition",
                "Traditional is faster",
            ],
            correctIndex: 1,
            explanation: "Machine learning learns patterns from data rather than requiring developers to explicitly code every rule.",
        },
    ],
};

// =============================================================================
// TOUR PAGE COMPONENT
// =============================================================================

export default function TourPage() {
    const [currentStop, setCurrentStop] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleNextStop = () => {
        if (currentStop < tourStops.length - 1) {
            setCurrentStop(currentStop + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    const handlePrevStop = () => {
        if (currentStop > 0) {
            setCurrentStop(currentStop - 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    const handleQuizAnswer = (index: number) => {
        setSelectedAnswer(index);
        setShowExplanation(true);
    };

    const progress = ((currentStop + 1) / tourStops.length) * 100;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold">Interactive Platform Tour</h1>
                                <p className="text-sm text-muted-foreground">Experience the full depth of ScaledNative</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {currentStop + 1} of {tourStops.length}
                            </span>
                            <Link href="/signup">
                                <Button>
                                    Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Progress value={progress} className="mt-4 h-1" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    {/* Tour Navigation Sidebar */}
                    <div className="space-y-2">
                        {tourStops.map((stop, index) => (
                            <button
                                key={stop.id}
                                onClick={() => {
                                    setCurrentStop(index);
                                    setSelectedAnswer(null);
                                    setShowExplanation(false);
                                }}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all",
                                    currentStop === index
                                        ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/5"
                                        : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                        currentStop === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        <stop.icon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={cn(
                                            "font-medium text-sm",
                                            currentStop === index ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {stop.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                            {stop.description}
                                        </p>
                                    </div>
                                    {index < currentStop && (
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 ml-auto" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="space-y-6">
                        {/* Stop 1: Lesson Player */}
                        {currentStop === 0 && (
                            <Card className="p-6 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge variant="outline" className="mb-2">{sampleLesson.module}</Badge>
                                        <h2 className="text-2xl font-bold">{sampleLesson.title}</h2>
                                        <p className="text-muted-foreground mt-1">{sampleLesson.duration} • Interactive Lesson</p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-primary/20">
                                        <Sparkles className="w-3 h-3 mr-1" /> Premium
                                    </Badge>
                                </div>

                                {/* Video Player Mock */}
                                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl relative overflow-hidden group cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white text-sm font-medium">The Art of Prompt Engineering</p>
                                        <p className="text-white/60 text-xs">Industry Expert • 40 min</p>
                                    </div>
                                </div>

                                {/* Video Chapters */}
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> Video Chapters
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {sampleLesson.videoChapters.map((chapter, i) => (
                                            <button
                                                key={i}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                                            >
                                                <span className="text-xs text-muted-foreground font-mono">{chapter.time}</span>
                                                <span className="text-sm">{chapter.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Takeaways */}
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                                        <Lightbulb className="w-4 h-4" /> Key Takeaways
                                    </h3>
                                    <ul className="space-y-2">
                                        {sampleLesson.keyTakeaways.map((takeaway, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                {takeaway}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        )}

                        {/* Stop 2: Interactive Lab */}
                        {currentStop === 1 && (
                            <Card className="p-6 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge variant="outline" className="mb-2 capitalize">{sampleLab.difficulty}</Badge>
                                        <h2 className="text-2xl font-bold">{sampleLab.title}</h2>
                                        <p className="text-muted-foreground mt-1">{sampleLab.estimatedTime} • Hands-On Lab</p>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-[1fr_280px] gap-6">
                                    {/* Code Editor Mock */}
                                    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-border">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                            </div>
                                            <span className="text-xs text-[#858585] ml-2">prompt_lab.py</span>
                                        </div>
                                        <pre className="p-4 text-sm font-mono text-[#d4d4d4] overflow-x-auto">
                                            <code>{sampleLab.starterCode}</code>
                                        </pre>
                                        <div className="px-4 py-3 bg-[#252526] border-t border-[#3c3c3c] flex items-center justify-between">
                                            <span className="text-xs text-[#858585]">Python 3.11</span>
                                            <Button size="sm" className="h-7 text-xs">
                                                <Play className="w-3 h-3 mr-1" /> Run Code
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Lab Steps */}
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-sm">Lab Progress</h3>
                                        {sampleLab.steps.map((step) => (
                                            <div
                                                key={step.id}
                                                className={cn(
                                                    "p-3 rounded-lg border text-sm transition-all",
                                                    step.completed
                                                        ? "bg-green-500/10 border-green-500/20"
                                                        : step.current
                                                            ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20"
                                                            : "bg-muted/30 border-border/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {step.completed ? (
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    ) : step.current ? (
                                                        <div className="w-4 h-4 rounded-full border-2 border-primary animate-pulse" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                                                    )}
                                                    <span className={step.current ? "font-medium" : ""}>{step.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Stop 3: Quiz Engine */}
                        {currentStop === 2 && (
                            <Card className="p-6 space-y-6">
                                <div>
                                    <Badge variant="outline" className="mb-2">Knowledge Check</Badge>
                                    <h2 className="text-2xl font-bold">{sampleQuiz.title}</h2>
                                    <p className="text-muted-foreground mt-1">Test your understanding</p>
                                </div>

                                <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <p className="font-medium text-lg mb-4">{sampleQuiz.questions[0].question}</p>
                                    <div className="space-y-3">
                                        {sampleQuiz.questions[0].options.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleQuizAnswer(i)}
                                                disabled={showExplanation}
                                                className={cn(
                                                    "w-full text-left p-4 rounded-lg border transition-all",
                                                    selectedAnswer === i
                                                        ? i === sampleQuiz.questions[0].correctIndex
                                                            ? "bg-green-500/10 border-green-500 text-green-400"
                                                            : "bg-red-500/10 border-red-500 text-red-400"
                                                        : "bg-card border-border hover:border-primary/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                                        {String.fromCharCode(65 + i)}
                                                    </span>
                                                    {option}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {showExplanation && (
                                        <div className={cn(
                                            "mt-4 p-4 rounded-lg border",
                                            selectedAnswer === sampleQuiz.questions[0].correctIndex
                                                ? "bg-green-500/10 border-green-500/30"
                                                : "bg-amber-500/10 border-amber-500/30"
                                        )}>
                                            <p className="font-medium mb-1">
                                                {selectedAnswer === sampleQuiz.questions[0].correctIndex ? "✓ Correct!" : "✗ Not quite"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {sampleQuiz.questions[0].explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Stop 4: Capstone Project */}
                        {currentStop === 3 && (
                            <Card className="p-6 space-y-6">
                                <div>
                                    <Badge variant="outline" className="mb-2">Capstone Project</Badge>
                                    <h2 className="text-2xl font-bold">AI-Powered Documentation Generator</h2>
                                    <p className="text-muted-foreground mt-1">4 hours • Real-world scenario</p>
                                </div>

                                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Scenario
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your team has inherited a legacy codebase with minimal documentation. Management wants you
                                        to use AI to rapidly generate comprehensive documentation for the most critical modules.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-card border border-border">
                                        <h3 className="font-semibold mb-3">Deliverables</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                                                Reusable prompt template for function documentation
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                                                Module-level overview documentation prompt
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                                                API reference documentation prompt
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                                                Quality validation checklist
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-4 rounded-xl bg-card border border-border">
                                        <h3 className="font-semibold mb-3">Evaluation Rubric</h3>
                                        <div className="space-y-3">
                                            {[
                                                { criterion: "Prompt Clarity", weight: 25 },
                                                { criterion: "Output Quality", weight: 30 },
                                                { criterion: "Reusability", weight: 20 },
                                                { criterion: "Consistency", weight: 25 },
                                            ].map((item) => (
                                                <div key={item.criterion} className="flex items-center justify-between text-sm">
                                                    <span>{item.criterion}</span>
                                                    <Badge variant="secondary">{item.weight}%</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <Users className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="font-medium">Industry Context</p>
                                        <p className="text-sm text-muted-foreground">
                                            Projects are designed with input from enterprise engineering leaders
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Stop 5: Certification */}
                        {currentStop === 4 && (
                            <Card className="p-6 space-y-6">
                                <div className="text-center">
                                    <Badge variant="outline" className="mb-4">Professional Certification</Badge>
                                    <h2 className="text-2xl font-bold">ScaledNative Certified AI-Native Professional</h2>
                                    <p className="text-muted-foreground mt-2">Verify your expertise with industry-recognized credentials</p>
                                </div>

                                {/* Certificate Preview */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 blur-3xl" />
                                    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                                            <GraduationCap className="w-10 h-10 text-white" />
                                        </div>
                                        <p className="text-amber-400/80 text-sm font-medium tracking-widest uppercase mb-2">
                                            Certificate of Completion
                                        </p>
                                        <h3 className="text-2xl font-bold text-white mb-1">John Smith</h3>
                                        <p className="text-slate-400 mb-4">has successfully completed</p>
                                        <p className="text-xl font-semibold text-amber-400 mb-6">
                                            AI-Native Development Certification
                                        </p>
                                        <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                                            <div>
                                                <p className="text-slate-500">Issue Date</p>
                                                <p className="text-white">January 4, 2026</p>
                                            </div>
                                            <div className="w-px h-8 bg-slate-700" />
                                            <div>
                                                <p className="text-slate-500">Credential ID</p>
                                                <p className="text-white font-mono">SN-2026-AINP-7829</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                                        <p className="font-medium">Blockchain Verified</p>
                                        <p className="text-xs text-muted-foreground">Tamper-proof credentials</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                                        <Award className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                        <p className="font-medium">LinkedIn Ready</p>
                                        <p className="text-xs text-muted-foreground">One-click profile add</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                                        <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                                        <p className="font-medium">Employer Verified</p>
                                        <p className="text-xs text-muted-foreground">Public verification page</p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between pt-4">
                            <Button
                                variant="outline"
                                onClick={handlePrevStop}
                                disabled={currentStop === 0}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>

                            {currentStop === tourStops.length - 1 ? (
                                <Link href="/signup">
                                    <Button size="lg" className="gap-2">
                                        Start Learning Now <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            ) : (
                                <Button onClick={handleNextStop}>
                                    Next <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-md border-t border-border/50 lg:hidden">
                <Link href="/signup" className="block">
                    <Button className="w-full" size="lg">
                        Start Your AI-Native Journey <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
