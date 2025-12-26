"use client";

import { useState, useRef, useCallback } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    Upload,
    Link2,
    FileText,
    Database,
    Globe,
    ChevronRight,
    X,
    Loader2,
    CheckCircle2,
    Lightbulb,
    Zap,
    Target,
    Users,
    Clock,
    BookOpen,
    Wand2,
    Paperclip,
    Plus,
    Settings,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    type: "pdf" | "doc" | "url" | "notion" | "confluence";
}

interface ContextExample {
    title: string;
    description: string;
    prompt: string;
    tags: string[];
}

const contextExamples: ContextExample[] = [
    {
        title: "New Hire Onboarding",
        description: "Create training for new employees joining your team",
        prompt: "Create a comprehensive onboarding program for new employees that covers company culture, tools we use, and standard workflows.",
        tags: ["Onboarding", "Culture"],
    },
    {
        title: "AI Tool Adoption",
        description: "Train your team on using AI tools effectively",
        prompt: "Develop training on using AI tools like Copilot and ChatGPT while following security best practices and company policies.",
        tags: ["AI", "Productivity"],
    },
    {
        title: "Compliance Training",
        description: "Annual compliance and regulatory training",
        prompt: "Create annual compliance training covering data privacy, security awareness, and workplace policies. Include assessments.",
        tags: ["Compliance", "Required"],
    },
    {
        title: "Leadership Development",
        description: "Skills for new and aspiring managers",
        prompt: "Build a leadership development program covering communication, delegation, performance management, and team building.",
        tags: ["Leadership", "Soft Skills"],
    },
];

const knowledgeSources = [
    { id: "upload", name: "Upload Documents", icon: Upload, description: "PDF, Word, PowerPoint" },
    { id: "notion", name: "Notion", icon: Database, description: "Connect workspace" },
    { id: "confluence", name: "Confluence", icon: Globe, description: "Import pages" },
    { id: "url", name: "Website URL", icon: Link2, description: "Scrape content" },
];

interface GenerationStage {
    name: string;
    status: "pending" | "active" | "complete";
}

export function EnhancedTrainingGenerator() {
    const [prompt, setPrompt] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [showKnowledgeSources, setShowKnowledgeSources] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [generationStages, setGenerationStages] = useState<GenerationStage[]>([]);
    const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
    const [targetAudience, setTargetAudience] = useState<string[]>([]);
    const [estimatedDuration, setEstimatedDuration] = useState(4);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                type: file.name.endsWith(".pdf") ? "pdf" : "doc",
            }));
            setUploadedFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const removeFile = (id: string) => {
        setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setGenerationProgress(0);

        const stages: GenerationStage[] = [
            { name: "Analyzing context", status: "active" },
            { name: "Structuring curriculum", status: "pending" },
            { name: "Generating modules", status: "pending" },
            { name: "Creating assessments", status: "pending" },
            { name: "Finalizing content", status: "pending" },
        ];
        setGenerationStages(stages);

        for (let i = 0; i < stages.length; i++) {
            await new Promise((r) => setTimeout(r, 1200));
            setGenerationProgress(((i + 1) / stages.length) * 100);
            setGenerationStages((prev) =>
                prev.map((s, idx) => ({
                    ...s,
                    status: idx < i + 1 ? "complete" : idx === i + 1 ? "active" : "pending",
                }))
            );
        }

        await new Promise((r) => setTimeout(r, 500));
        // Navigate to curriculum preview
        window.location.href = "/curriculum";
    };

    const applyExample = (example: ContextExample) => {
        setPrompt(example.prompt);
    };

    const toggleAudience = (audience: string) => {
        setTargetAudience((prev) =>
            prev.includes(audience) ? prev.filter((a) => a !== audience) : [...prev, audience]
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
                    <Sparkles className="h-4 w-4" />
                    AI-Powered Training Generator
                </div>
                <h1 className="text-3xl font-bold mb-2">Create Training in Minutes</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Describe what you want to teach and let AI create a complete curriculum.
                    Add documents or connect knowledge bases for personalized content.
                </p>
            </div>

            {/* Main Prompt Area */}
            <Card className="p-6 border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="space-y-4">
                    {/* Textarea */}
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the training you want to create...

Example: Create a training program for our sales team on using AI tools to improve customer outreach. Cover best practices, compliance requirements, and hands-on exercises."
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none text-base"
                            disabled={isGenerating}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                            {prompt.length} characters
                        </div>
                    </div>

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm"
                                >
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="max-w-[150px] truncate">{file.name}</span>
                                    <span className="text-muted-foreground text-xs">{file.size}</span>
                                    <button onClick={() => removeFile(file.id)} className="hover:text-destructive">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                multiple
                                accept=".pdf,.doc,.docx,.pptx,.txt"
                                className="hidden"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isGenerating}
                            >
                                <Paperclip className="h-4 w-4" />
                                Attach Files
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => setShowKnowledgeSources(!showKnowledgeSources)}
                                disabled={isGenerating}
                            >
                                <Database className="h-4 w-4" />
                                Knowledge Base
                            </Button>
                        </div>

                        <Button
                            size="lg"
                            className="gap-2 px-8"
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="h-5 w-5" />
                                    Generate Training
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Generation Progress */}
            {isGenerating && (
                <Card className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Creating your training...</span>
                            <span className="text-sm text-muted-foreground">{Math.round(generationProgress)}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {generationStages.map((stage, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "text-center p-2 rounded-lg transition-all",
                                        stage.status === "complete" && "bg-emerald-500/10",
                                        stage.status === "active" && "bg-primary/10",
                                        stage.status === "pending" && "opacity-50"
                                    )}
                                >
                                    {stage.status === "complete" ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                                    ) : stage.status === "active" ? (
                                        <Loader2 className="h-5 w-5 text-primary mx-auto mb-1 animate-spin" />
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-muted mx-auto mb-1" />
                                    )}
                                    <p className="text-xs">{stage.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Knowledge Sources Panel */}
            {showKnowledgeSources && !isGenerating && (
                <Card className="p-6">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Connect Knowledge Sources
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Add context from your existing documentation to create more relevant training.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {knowledgeSources.map((source) => {
                            const Icon = source.icon;
                            return (
                                <button
                                    key={source.id}
                                    onClick={() => source.id === "upload" && fileInputRef.current?.click()}
                                    className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
                                >
                                    <Icon className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="font-medium text-sm">{source.name}</p>
                                    <p className="text-xs text-muted-foreground">{source.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </Card>
            )}

            {/* Configuration Options */}
            {!isGenerating && (
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Difficulty */}
                    <Card className="p-4">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Difficulty Level
                        </h4>
                        <div className="flex gap-2">
                            {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setDifficulty(level)}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-xs capitalize transition-all",
                                        difficulty === level
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Target Audience */}
                    <Card className="p-4">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            Target Audience
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {["All Staff", "Managers", "Technical", "Sales", "New Hires"].map((aud) => (
                                <button
                                    key={aud}
                                    onClick={() => toggleAudience(aud)}
                                    className={cn(
                                        "px-2 py-1 rounded text-xs transition-all",
                                        targetAudience.includes(aud)
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    {aud}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Duration */}
                    <Card className="p-4">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            Est. Duration
                        </h4>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={estimatedDuration}
                                onChange={(e) => setEstimatedDuration(Number(e.target.value))}
                                className="flex-1"
                            />
                            <span className="font-mono text-sm w-16">{estimatedDuration} hrs</span>
                        </div>
                    </Card>
                </div>
            )}

            {/* Example Prompts */}
            {!isGenerating && (
                <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        Need Inspiration?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {contextExamples.map((example, i) => (
                            <button
                                key={i}
                                onClick={() => applyExample(example)}
                                className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">{example.title}</h4>
                                        <p className="text-xs text-muted-foreground">{example.description}</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex gap-1 mt-2">
                                    {example.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
