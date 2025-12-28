"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useAuthSafe } from "@/lib/auth/AuthContext";
import { saveTrainingAsync, saveTraining, type StoredTraining } from "@/lib/training-storage";
import {
    Sparkles,
    Upload,
    FileText,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Clock,
    Users,
    BookOpen,
    Zap,
    Shield,
    Heart,
    Brain,
    Target,
    Scale,
    Laptop,
    Plus,
    X,
    ChevronRight,
    ChevronLeft,
    Play,
    Eye,
    Edit3,
    RotateCcw,
    Lightbulb,
    GraduationCap,
    Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "select" | "prompt" | "generating" | "preview" | "explore";

interface PrebuiltModule {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    duration: string;
}

interface GeneratedSection {
    title: string;
    type: "reading" | "quiz" | "scenario";
    duration: string;
    preview: string;
}

interface GeneratedCourse {
    title: string;
    description: string;
    duration: string;
    sections: GeneratedSection[];
    audience: string;
    difficulty: string;
}

const prebuiltModules: PrebuiltModule[] = [
    { id: "cybersecurity", title: "Cybersecurity Awareness", description: "Phishing, passwords, data protection", icon: Shield, color: "text-blue-500", duration: "45 min" },
    { id: "hipaa", title: "HIPAA Compliance", description: "Healthcare privacy & PHI handling", icon: Heart, color: "text-red-500", duration: "60 min" },
    { id: "ai-tools", title: "AI Tools & Productivity", description: "ChatGPT, Copilot, prompting skills", icon: Brain, color: "text-emerald-500", duration: "35 min" },
    { id: "leadership", title: "Leadership Fundamentals", description: "Team management & communication", icon: Target, color: "text-purple-500", duration: "90 min" },
];

const generationStages = [
    { label: "Analyzing your requirements", icon: Brain },
    { label: "Loading industry standards", icon: Shield },
    { label: "Building learning objectives", icon: Target },
    { label: "Creating interactive content", icon: Lightbulb },
    { label: "Generating assessments", icon: GraduationCap },
    { label: "Finalizing module", icon: Award },
];

export function HeroGenerator() {
    const router = useRouter();
    const auth = useAuthSafe();
    const user = auth?.user || null;
    const [step, setStep] = useState<Step>("select");
    const [selectedModule, setSelectedModule] = useState<PrebuiltModule | null>(null);
    const [customPrompt, setCustomPrompt] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);
    const [generationStage, setGenerationStage] = useState(0);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploadedFiles(Array.from(files));
        }
    };

    const handleSelectModule = (module: PrebuiltModule) => {
        setSelectedModule(module);
        setStep("prompt");
    };

    const handleCustomMode = () => {
        setSelectedModule(null);
        setStep("prompt");
    };

    const handleGenerate = async () => {
        setStep("generating");
        setGenerationStage(0);

        // Simulate generation with progress through stages
        for (let i = 0; i < generationStages.length; i++) {
            setGenerationStage(i);
            await new Promise((r) => setTimeout(r, 600));
        }

        // Generate course based on selection or custom prompt
        const title = selectedModule?.title || customPrompt || "Custom Training Module";
        setGeneratedCourse({
            title,
            description: selectedModule
                ? `Comprehensive ${selectedModule.description.toLowerCase()} training customized for your organization.`
                : `AI-generated training on "${customPrompt}" tailored to your specific requirements.`,
            duration: selectedModule?.duration || "45 min",
            audience: "All employees",
            difficulty: "Beginner to Intermediate",
            sections: [
                {
                    title: "Introduction & Why This Matters",
                    type: "reading",
                    duration: "8 min",
                    preview: "Understanding the importance of this training and how it applies to your daily work. We'll cover the key concepts and set learning objectives."
                },
                {
                    title: "Core Concepts & Best Practices",
                    type: "reading",
                    duration: "12 min",
                    preview: "Deep dive into the fundamental principles and industry-standard practices. Learn the key terminology and frameworks used by professionals."
                },
                {
                    title: "Knowledge Check",
                    type: "quiz",
                    duration: "5 min",
                    preview: "Test your understanding with interactive questions. Immediate feedback helps reinforce learning."
                },
                {
                    title: "Real-World Scenarios",
                    type: "scenario",
                    duration: "10 min",
                    preview: "Apply what you've learned in realistic workplace situations. Make decisions and see the consequences of your choices."
                },
                {
                    title: "Advanced Topics",
                    type: "reading",
                    duration: "8 min",
                    preview: "Go deeper with advanced strategies and expert techniques. Stay ahead of emerging trends and challenges."
                },
                {
                    title: "Final Assessment & Certification",
                    type: "quiz",
                    duration: "10 min",
                    preview: "Comprehensive assessment to validate your learning. Earn your completion certificate upon passing."
                },
            ],
        });

        setStep("preview");
    };

    const handleReset = () => {
        setStep("select");
        setSelectedModule(null);
        setCustomPrompt("");
        setUploadedFiles([]);
        setGeneratedCourse(null);
        setCurrentSectionIndex(0);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Step 1: Select Module or Custom */}
            {step === "select" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold">AI Training Studio</h3>
                            <p className="text-sm text-muted-foreground">Create professional training in seconds</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {prebuiltModules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <button
                                    key={module.id}
                                    onClick={() => handleSelectModule(module)}
                                    className="p-3 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/[0.02] transition-all text-left group"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon className={cn("h-4 w-4", module.color)} />
                                        <span className="font-medium text-sm group-hover:text-primary transition-colors">{module.title}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{module.description}</p>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleCustomMode}
                        className="w-full p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <Plus className="h-5 w-5" />
                        <span className="font-medium">Create Custom Training</span>
                    </button>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                        ✨ Powered by AI • No signup required
                    </p>
                </div>
            )}

            {/* Step 2: AI Prompt Interface */}
            {step === "prompt" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-white/[0.01]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                {selectedModule ? (
                                    <div className="flex items-center gap-2">
                                        <selectedModule.icon className={cn("h-5 w-5", selectedModule.color)} />
                                        <span className="font-medium">{selectedModule.title}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-primary" />
                                        <span className="font-medium">Custom Training</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                AI Ready
                            </div>
                        </div>
                    </div>

                    {/* Prompt Area */}
                    <div className="p-5">
                        <div className="mb-4">
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Brain className="h-4 w-4 text-primary" />
                                {selectedModule ? "Customize with your context" : "What should this training cover?"}
                            </label>
                            <textarea
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder={selectedModule
                                    ? "Example: Focus on our password policy (16+ chars, MFA required), include IT team contacts, add scenarios for remote workers..."
                                    : "Example: Train our sales team on the new CRM system, including lead management, pipeline tracking, and reporting..."
                                }
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none placeholder:text-muted-foreground/60"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="mb-4">
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <FileText className="h-4 w-4 text-primary" />
                                Add context documents
                                <span className="text-muted-foreground font-normal">(optional)</span>
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileUpload}
                                multiple
                                accept=".pdf,.doc,.docx,.txt"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-16 rounded-xl border border-dashed border-white/10 hover:border-primary/20 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                            >
                                {uploadedFiles.length > 0 ? (
                                    <>
                                        <FileText className="h-5 w-5 text-primary" />
                                        <span className="text-sm">{uploadedFiles.length} file(s) ready</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-5 w-5" />
                                        <span className="text-sm">Policies, handbooks, procedures...</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* AI Enhancement Indicator */}
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 mb-4">
                            <div className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                                <div className="text-xs">
                                    <span className="font-medium text-primary">AI will generate:</span>
                                    <span className="text-muted-foreground"> Interactive lessons, quizzes, real-world scenarios, and assessments tailored to your requirements.</span>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            disabled={!selectedModule && !customPrompt.trim()}
                            size="lg"
                            className="w-full h-14 text-base font-semibold gap-2 bg-gradient-to-r from-primary to-primary/80"
                        >
                            <Zap className="h-5 w-5" />
                            Generate Training with AI
                            <ArrowRight className="h-5 w-5 ml-auto" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Generating with Progress */}
            {step === "generating" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60">
                                <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Creating Your Training</h3>
                        <p className="text-sm text-muted-foreground">
                            AI is building an engaging learning experience...
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="space-y-3">
                        {generationStages.map((stage, i) => {
                            const Icon = stage.icon;
                            const isComplete = i < generationStage;
                            const isCurrent = i === generationStage;

                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-lg transition-all",
                                        isComplete && "bg-primary/5",
                                        isCurrent && "bg-primary/10 border border-primary/20"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center",
                                        isComplete && "bg-primary/20 text-primary",
                                        isCurrent && "bg-primary text-primary-foreground",
                                        !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                                    )}>
                                        {isComplete ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : isCurrent ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Icon className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-sm",
                                        (isComplete || isCurrent) ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                        {stage.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Step 4: Preview Generated Course */}
            {step === "preview" && generatedCourse && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                    {/* Header */}
                    <div className="p-5 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                ✓ Generated
                            </span>
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary">
                                AI Powered
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-1">{generatedCourse.title}</h2>
                        <p className="text-sm text-muted-foreground">{generatedCourse.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-5 border-b border-white/10">
                        <div className="text-center">
                            <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-sm font-semibold">{generatedCourse.duration}</p>
                            <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                        <div className="text-center">
                            <BookOpen className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-sm font-semibold">{generatedCourse.sections.length}</p>
                            <p className="text-xs text-muted-foreground">Sections</p>
                        </div>
                        <div className="text-center">
                            <GraduationCap className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-sm font-semibold">{generatedCourse.sections.filter(s => s.type === "quiz").length}</p>
                            <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                    </div>

                    {/* Sections List */}
                    <div className="p-5">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Course Structure
                        </h3>
                        <div className="space-y-2">
                            {generatedCourse.sections.map((section, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrentSectionIndex(i);
                                        setStep("explore");
                                    }}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all text-left group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                                            {section.title}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="capitalize">{section.type}</span>
                                            <span>•</span>
                                            <span>{section.duration}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 border-t border-white/10 bg-muted/20">
                        <div className="flex gap-3 mb-3">
                            <Button
                                className="flex-1 h-12 font-semibold gap-2"
                                onClick={async () => {
                                    if (generatedCourse) {
                                        setIsSaving(true);
                                        try {
                                            // Save to API if authenticated, localStorage otherwise
                                            await saveTrainingAsync({
                                                title: generatedCourse.title,
                                                description: generatedCourse.description,
                                                status: 'published',
                                                duration: generatedCourse.duration,
                                                sections: generatedCourse.sections.map(s => ({
                                                    title: s.title,
                                                    type: s.type,
                                                    duration: s.duration,
                                                    preview: s.preview,
                                                })),
                                                category: selectedModule?.id || 'custom',
                                                targetAudience: generatedCourse.audience,
                                            }, user);
                                            // Navigate to dashboard
                                            router.push('/dashboard?deployed=true');
                                        } catch (error) {
                                            console.error('Error deploying:', error);
                                            setIsSaving(false);
                                        }
                                    }
                                }}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <><Loader2 className="h-4 w-4 animate-spin" /> Deploying...</>
                                ) : (
                                    <><Users className="h-4 w-4" /> Deploy to Team</>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="h-12 gap-2"
                                onClick={() => {
                                    setCurrentSectionIndex(0);
                                    setStep("explore");
                                }}
                            >
                                <Eye className="h-4 w-4" />
                                Preview
                            </Button>
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                            <button onClick={() => setStep("prompt")} className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <Edit3 className="h-3 w-3" />
                                Edit prompt
                            </button>
                            <button onClick={handleReset} className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <RotateCcw className="h-3 w-3" />
                                Start over
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 5: Explore Section Detail */}
            {step === "explore" && generatedCourse && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                    {/* Navigation Header */}
                    <div className="p-4 border-b border-white/10 bg-muted/20">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setStep("preview")}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back to overview
                            </button>
                            <span className="text-xs text-muted-foreground">
                                Section {currentSectionIndex + 1} of {generatedCourse.sections.length}
                            </span>
                        </div>
                    </div>

                    {/* Section Content */}
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={cn(
                                "px-2 py-1 rounded text-xs font-medium",
                                generatedCourse.sections[currentSectionIndex].type === "quiz" && "bg-purple-500/20 text-purple-400",
                                generatedCourse.sections[currentSectionIndex].type === "reading" && "bg-blue-500/20 text-blue-400",
                                generatedCourse.sections[currentSectionIndex].type === "scenario" && "bg-amber-500/20 text-amber-400"
                            )}>
                                {generatedCourse.sections[currentSectionIndex].type}
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {generatedCourse.sections[currentSectionIndex].duration}
                            </span>
                        </div>

                        <h2 className="text-lg font-bold mb-4">
                            {generatedCourse.sections[currentSectionIndex].title}
                        </h2>

                        <div className="p-4 rounded-xl bg-muted/30 border border-white/5 mb-6">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {generatedCourse.sections[currentSectionIndex].preview}
                            </p>
                        </div>

                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-center">
                            <p className="text-xs text-muted-foreground mb-2">
                                Full interactive content available after deployment
                            </p>
                            <Link href="/signup">
                                <Button size="sm" className="gap-1">
                                    <Play className="h-3 w-3" />
                                    Start Free Trial
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Section Navigation */}
                    <div className="p-4 border-t border-white/10 flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                            disabled={currentSectionIndex === 0}
                            className="gap-1"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <div className="flex gap-1">
                            {generatedCourse.sections.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSectionIndex(i)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        i === currentSectionIndex ? "bg-primary w-4" : "bg-muted hover:bg-muted-foreground"
                                    )}
                                />
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentSectionIndex(Math.min(generatedCourse.sections.length - 1, currentSectionIndex + 1))}
                            disabled={currentSectionIndex === generatedCourse.sections.length - 1}
                            className="gap-1"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
