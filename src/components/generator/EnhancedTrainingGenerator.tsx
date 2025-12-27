"use client";

import { useState, useRef } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    Upload,
    FileText,
    Database,
    Link2,
    ChevronRight,
    ChevronDown,
    X,
    Loader2,
    CheckCircle2,
    Lightbulb,
    Shield,
    Heart,
    Users,
    Scale,
    Laptop,
    Brain,
    Target,
    Clock,
    BookOpen,
    Wand2,
    Paperclip,
    Building2,
    Search,
    Play,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PrebuiltModule {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    standards?: string[];
    icon: React.ElementType;
    color: string;
    sections: number;
    quizQuestions: number;
}

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    type: string;
}

const prebuiltModules: PrebuiltModule[] = [
    {
        id: "cybersecurity-awareness",
        title: "Cybersecurity Awareness",
        description: "Security best practices, phishing prevention, and threat awareness",
        category: "Security",
        duration: "45 min",
        standards: ["NIST", "ISO 27001"],
        icon: Shield,
        color: "text-blue-500",
        sections: 8,
        quizQuestions: 15,
    },
    {
        id: "hipaa-compliance",
        title: "HIPAA Compliance",
        description: "Protected health information handling and privacy requirements",
        category: "Healthcare",
        duration: "60 min",
        standards: ["HIPAA", "HITECH"],
        icon: Heart,
        color: "text-red-500",
        sections: 10,
        quizQuestions: 20,
    },
    {
        id: "data-privacy",
        title: "Data Privacy Essentials",
        description: "GDPR, CCPA, and general data protection principles",
        category: "Compliance",
        duration: "30 min",
        standards: ["GDPR", "CCPA"],
        icon: Scale,
        color: "text-purple-500",
        sections: 6,
        quizQuestions: 12,
    },
    {
        id: "workplace-safety",
        title: "Workplace Safety",
        description: "OSHA requirements and workplace hazard prevention",
        category: "Safety",
        duration: "40 min",
        standards: ["OSHA"],
        icon: Users,
        color: "text-amber-500",
        sections: 7,
        quizQuestions: 14,
    },
    {
        id: "ai-tools-productivity",
        title: "AI Tools for Productivity",
        description: "Using ChatGPT, Copilot, and AI assistants effectively",
        category: "Technology",
        duration: "35 min",
        standards: [],
        icon: Brain,
        color: "text-emerald-500",
        sections: 6,
        quizQuestions: 10,
    },
    {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        description: "Core leadership skills and team management",
        category: "Leadership",
        duration: "90 min",
        standards: [],
        icon: Target,
        color: "text-pink-500",
        sections: 12,
        quizQuestions: 18,
    },
    {
        id: "harassment-prevention",
        title: "Harassment Prevention",
        description: "Creating a respectful and inclusive workplace",
        category: "HR",
        duration: "45 min",
        standards: ["EEOC"],
        icon: Users,
        color: "text-orange-500",
        sections: 8,
        quizQuestions: 15,
    },
    {
        id: "remote-work-best-practices",
        title: "Remote Work Best Practices",
        description: "Productivity, security, and collaboration when working remotely",
        category: "Technology",
        duration: "25 min",
        standards: [],
        icon: Laptop,
        color: "text-cyan-500",
        sections: 5,
        quizQuestions: 8,
    },
];

const categories = ["All", "Security", "Healthcare", "Compliance", "Safety", "Technology", "Leadership", "HR"];

export function EnhancedTrainingGeneratorV2() {
    const [mode, setMode] = useState<"prebuilt" | "custom">("prebuilt");
    const [selectedModule, setSelectedModule] = useState<PrebuiltModule | null>(null);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [customPrompt, setCustomPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [generationStep, setGenerationStep] = useState("");
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredModules = prebuiltModules.filter((m) => {
        const matchesCategory = categoryFilter === "All" || m.category === categoryFilter;
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                type: file.name.split(".").pop() || "file",
            }));
            setUploadedFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const removeFile = (id: string) => {
        setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGenerationProgress(0);

        const steps = [
            "Analyzing standards and requirements...",
            "Processing your organization's context...",
            "Customizing content for your policies...",
            "Building interactive sections...",
            "Generating assessment questions...",
            "Finalizing training module...",
        ];

        for (let i = 0; i < steps.length; i++) {
            setGenerationStep(steps[i]);
            setGenerationProgress(((i + 1) / steps.length) * 100);
            await new Promise((r) => setTimeout(r, 1000));
        }

        // Navigate to the generated module
        window.location.href = `/module/generated-${selectedModule?.id || "custom"}`;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
                    <Sparkles className="h-4 w-4" />
                    AI-Powered Training Generator
                </div>
                <h1 className="text-3xl font-bold mb-2">Create Custom Training</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Start with a pre-built module and customize it with your organization's policies,
                    or create something entirely new from scratch.
                </p>
            </div>

            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setMode("prebuilt")}
                    className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2",
                        mode === "prebuilt"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                    )}
                >
                    <BookOpen className="h-5 w-5" />
                    Start with Pre-built
                </button>
                <button
                    onClick={() => setMode("custom")}
                    className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2",
                        mode === "custom"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                    )}
                >
                    <Wand2 className="h-5 w-5" />
                    Create from Scratch
                </button>
            </div>

            {mode === "prebuilt" ? (
                <>
                    {/* Module Selection */}
                    <Card className="p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Select a Training Module
                        </h2>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm transition-all",
                                        categoryFilter === cat
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search modules..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Module Grid */}
                        <div className="grid md:grid-cols-2 gap-3">
                            {filteredModules.map((module) => {
                                const Icon = module.icon;
                                const isSelected = selectedModule?.id === module.id;
                                return (
                                    <button
                                        key={module.id}
                                        onClick={() => setSelectedModule(isSelected ? null : module)}
                                        className={cn(
                                            "p-4 rounded-xl border text-left transition-all",
                                            isSelected
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/30"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={cn("w-10 h-10 rounded-lg bg-muted flex items-center justify-center", module.color)}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-medium text-sm">{module.title}</h3>
                                                    {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {module.duration}
                                                    </span>
                                                    <span>{module.sections} sections</span>
                                                    <span>{module.quizQuestions} questions</span>
                                                </div>
                                                {module.standards && module.standards.length > 0 && (
                                                    <div className="flex gap-1 mt-2">
                                                        {module.standards.map((std) => (
                                                            <Badge key={std} variant="outline" className="text-xs">
                                                                {std}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Customization Options */}
                    {selectedModule && (
                        <Card className="p-6 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                            <h2 className="font-semibold mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                Customize "{selectedModule.title}"
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Upload your organization's policies, procedures, or context documents.
                                The AI will infuse this content into the training to make it specific to your company.
                            </p>

                            {/* Upload Area */}
                            <div
                                className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-4 hover:border-primary/30 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt,.pptx"
                                    className="hidden"
                                />
                                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                <p className="font-medium text-sm mb-1">Drop your documents here</p>
                                <p className="text-xs text-muted-foreground">
                                    Security policies, employee handbooks, org charts, procedures...
                                </p>
                            </div>

                            {/* Uploaded Files */}
                            {uploadedFiles.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    {uploadedFiles.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="font-medium text-sm">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">{file.size}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFile(file.id)} className="p-1 hover:text-destructive">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Example Customizations */}
                            <div className="p-4 rounded-lg bg-muted/50 mb-4">
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-amber-500" />
                                    What the AI will customize:
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Your specific password requirements and policies</li>
                                    <li>• Company security team contacts and escalation procedures</li>
                                    <li>• Real examples from your industry and organization</li>
                                    <li>• Internal tools and systems your employees use</li>
                                    <li>• Company-specific compliance requirements</li>
                                </ul>
                            </div>

                            {/* Additional Context */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Additional Context (Optional)</label>
                                <textarea
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                    placeholder="Any specific requirements? E.g., 'Focus on remote work security' or 'Include our VPN usage policy'"
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                                />
                            </div>
                        </Card>
                    )}
                </>
            ) : (
                /* Custom Mode */
                <Card className="p-6 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-primary" />
                        Create Custom Training
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Describe what you want to teach and upload any relevant documents.
                    </p>

                    <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Describe the training you want to create...

Example: Create a training program for our sales team on using our new CRM system. Include our sales process, product catalog, and customer communication guidelines."
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none mb-4"
                    />

                    <div
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            multiple
                            accept=".pdf,.doc,.docx,.txt,.pptx"
                            className="hidden"
                        />
                        <Paperclip className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm">Attach supporting documents</p>
                    </div>

                    {uploadedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {uploadedFiles.map((file) => (
                                <div key={file.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="max-w-[150px] truncate">{file.name}</span>
                                    <button onClick={() => removeFile(file.id)}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            )}

            {/* Generation Progress */}
            {isGenerating && (
                <Card className="p-6">
                    <div className="text-center mb-4">
                        <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                        <p className="font-medium">{generationStep}</p>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                </Card>
            )}

            {/* Generate Button */}
            {!isGenerating && (
                <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleGenerate}
                    disabled={(mode === "prebuilt" && !selectedModule) || (mode === "custom" && !customPrompt.trim())}
                >
                    <Sparkles className="h-5 w-5" />
                    {mode === "prebuilt" && selectedModule
                        ? `Generate Customized "${selectedModule.title}"`
                        : "Generate Training"}
                </Button>
            )}

            {/* What You'll Get */}
            <Card className="p-6 bg-muted/30">
                <h3 className="font-medium mb-4">What you'll get:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm">Interactive Modules</p>
                            <p className="text-xs text-muted-foreground">Click-through lessons with progress tracking</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm">Knowledge Checks</p>
                            <p className="text-xs text-muted-foreground">Quizzes and assessments throughout</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm">Your Context Infused</p>
                            <p className="text-xs text-muted-foreground">Customized with your policies and procedures</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
