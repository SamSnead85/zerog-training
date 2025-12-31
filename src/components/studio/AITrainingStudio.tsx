"use client";

import { useState, useRef, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    Search,
    Filter,
    Upload,
    FileText,
    Link2,
    Database,
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    X,
    Loader2,
    CheckCircle2,
    Clock,
    Users,
    BookOpen,
    Star,
    TrendingUp,
    Award,
    Zap,
    Play,
    Settings2,
    Gamepad2,
    Brain,
    Shield,
    Building2,
    UserPlus,
    Target,
    ArrowRight,
    Eye,
    Layers,
    Workflow,
    LayoutGrid,
    List,
    Flame,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    curriculumModules,
    curriculumCategories,
    CurriculumModule,
    getPopularCurriculum,
    getTrendingCurriculum,
    searchCurriculum,
    getCurriculumByCategory,
} from "@/lib/curriculum/curriculum-data";

type Step = "browse" | "customize" | "configure" | "generating" | "preview";
type ViewMode = "grid" | "list";

const categoryIcons: Record<string, React.ElementType> = {
    "ai-tech": Brain,
    "agentic-sdlc": Workflow,
    "compliance": Shield,
    "leadership": Users,
    "industry": Building2,
    "onboarding": UserPlus,
};

export function AITrainingStudio() {
    const [step, setStep] = useState<Step>("browse");
    const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [customPrompt, setCustomPrompt] = useState("");
    const [generationProgress, setGenerationProgress] = useState(0);
    const [generationStage, setGenerationStage] = useState("");

    // Delivery options
    const [deliveryFormat, setDeliveryFormat] = useState<"full" | "micro" | "assessment">("full");
    const [enableGamification, setEnableGamification] = useState(true);
    const [enableLeaderboard, setEnableLeaderboard] = useState(true);
    const [enableCertificate, setEnableCertificate] = useState(true);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredModules = selectedCategory
        ? getCurriculumByCategory(selectedCategory)
        : searchQuery
            ? searchCurriculum(searchQuery)
            : curriculumModules;

    const popularModules = getPopularCurriculum();
    const trendingModules = getTrendingCurriculum();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
        }
    };

    const handleSelectModule = (module: CurriculumModule) => {
        setSelectedModule(module);
        setStep("customize");
    };

    const handleGenerate = async () => {
        setStep("generating");
        setGenerationProgress(0);

        const stages = [
            "Analyzing industry standards...",
            "Loading expert content...",
            "Processing your context documents...",
            "Customizing for your organization...",
            "Building interactive sections...",
            "Generating assessments...",
            "Configuring gamification...",
            "Finalizing training module...",
        ];

        for (let i = 0; i < stages.length; i++) {
            setGenerationStage(stages[i]);
            setGenerationProgress(((i + 1) / stages.length) * 100);
            await new Promise((r) => setTimeout(r, 800));
        }

        setStep("preview");
    };

    const handleReset = () => {
        setStep("browse");
        setSelectedModule(null);
        setSearchQuery("");
        setSelectedCategory(null);
        setUploadedFiles([]);
        setCustomPrompt("");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Premium Header */}
            <div className="border-b border-border sticky top-0 z-20 bg-background/95 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {step !== "browse" && (
                                <Button variant="ghost" size="icon" onClick={handleReset}>
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">AI Training Studio</h1>
                                    <p className="text-xs text-muted-foreground">
                                        HITRUST & SOC 2 Certified • Powered by Expert Content
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step Indicator */}
                        <div className="hidden md:flex items-center gap-2">
                            {["Browse", "Customize", "Configure", "Generate"].map((s, i) => {
                                const stepNum = i + 1;
                                const currentStepNum = step === "browse" ? 1 : step === "customize" ? 2 : step === "configure" ? 3 : 4;
                                const isActive = stepNum === currentStepNum;
                                const isComplete = stepNum < currentStepNum;
                                return (
                                    <div key={s} className="flex items-center">
                                        {i > 0 && <div className={cn("w-8 h-px", isComplete ? "bg-primary" : "bg-border")} />}
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                                            isActive && "bg-primary text-primary-foreground",
                                            isComplete && "bg-primary/20 text-primary",
                                            !isActive && !isComplete && "bg-muted text-muted-foreground"
                                        )}>
                                            {isComplete ? <CheckCircle2 className="h-4 w-4" /> : stepNum}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="font-medium">{curriculumModules.length}+ Expert Courses</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Browse Step */}
            {step === "browse" && (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSelectedCategory(null);
                                }}
                                placeholder="Search 60+ training modules..."
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary/20 text-base"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                !selectedCategory
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                            )}
                        >
                            All Courses
                        </button>
                        {curriculumCategories.map((cat) => {
                            const Icon = categoryIcons[cat.id] || BookOpen;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setSearchQuery("");
                                    }}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                                        selectedCategory === cat.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Stats */}
                    {!selectedCategory && !searchQuery && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                                <Flame className="h-5 w-5 text-primary mb-2" />
                                <p className="text-2xl font-bold">{trendingModules.length}</p>
                                <p className="text-xs text-muted-foreground">Trending Now</p>
                            </Card>
                            <Card className="p-4">
                                <Star className="h-5 w-5 text-amber-500 mb-2" />
                                <p className="text-2xl font-bold">{popularModules.length}</p>
                                <p className="text-xs text-muted-foreground">Staff Picks</p>
                            </Card>
                            <Card className="p-4">
                                <Award className="h-5 w-5 text-emerald-500 mb-2" />
                                <p className="text-2xl font-bold">{curriculumModules.filter(m => m.certified).length}</p>
                                <p className="text-xs text-muted-foreground">Certified Courses</p>
                            </Card>
                            <Card className="p-4">
                                <GraduationCap className="h-5 w-5 text-blue-500 mb-2" />
                                <p className="text-2xl font-bold">{(curriculumModules.reduce((sum, m) => sum + m.enrollments, 0) / 1000).toFixed(0)}K+</p>
                                <p className="text-xs text-muted-foreground">Total Enrollments</p>
                            </Card>
                        </div>
                    )}

                    {/* Trending Section */}
                    {!selectedCategory && !searchQuery && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">Trending This Week</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                {trendingModules.slice(0, 3).map((module) => (
                                    <ModuleCard
                                        key={module.id}
                                        module={module}
                                        onSelect={handleSelectModule}
                                        compact
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Module Grid/List */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                {selectedCategory
                                    ? curriculumCategories.find(c => c.id === selectedCategory)?.name
                                    : searchQuery
                                        ? `Results for "${searchQuery}"`
                                        : "All Courses"}
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {filteredModules.length} courses
                            </span>
                        </div>

                        <div className={cn(
                            viewMode === "grid"
                                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                                : "space-y-3"
                        )}>
                            {filteredModules.map((module) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    onSelect={handleSelectModule}
                                    listView={viewMode === "list"}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Create Custom CTA */}
                    <Card className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 border-primary/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Can't find what you need?</h3>
                                    <p className="text-sm text-muted-foreground">Create a completely custom training from scratch with AI</p>
                                </div>
                            </div>
                            <Button className="gap-2">
                                <Sparkles className="h-4 w-4" />
                                Create Custom Training
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Customize Step */}
            {step === "customize" && selectedModule && (
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left - Module Info */}
                        <div className="lg:col-span-2">
                            <Card className="p-6 sticky top-24">
                                <div className="flex items-center gap-2 mb-4">
                                    {selectedModule.trending && (
                                        <Badge className="bg-primary/10 text-primary">Trending</Badge>
                                    )}
                                    {selectedModule.certified && (
                                        <Badge variant="outline">Certified</Badge>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold mb-2">{selectedModule.title}</h2>
                                <p className="text-sm text-muted-foreground mb-4">{selectedModule.description}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="p-3 rounded-lg bg-muted">
                                        <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
                                        <p className="font-medium text-sm">{selectedModule.duration}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted">
                                        <BookOpen className="h-4 w-4 mb-1 text-muted-foreground" />
                                        <p className="font-medium text-sm">{selectedModule.sections} sections</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted">
                                        <Target className="h-4 w-4 mb-1 text-muted-foreground" />
                                        <p className="font-medium text-sm">{selectedModule.quizQuestions} questions</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted">
                                        <Star className="h-4 w-4 mb-1 text-amber-500" />
                                        <p className="font-medium text-sm">{selectedModule.rating}/5 rating</p>
                                    </div>
                                </div>

                                {selectedModule.standards && selectedModule.standards.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {selectedModule.standards.map((std) => (
                                            <Badge key={std} variant="outline" className="text-xs">
                                                {std}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                <div className="text-xs text-muted-foreground">
                                    <p>Instructor: {selectedModule.instructor}</p>
                                    <p>Updated: {selectedModule.updatedAt}</p>
                                    <p>{selectedModule.enrollments.toLocaleString()} enrollments</p>
                                </div>
                            </Card>
                        </div>

                        {/* Right - Customization */}
                        <div className="lg:col-span-3 space-y-6">
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" />
                                    Customize for Your Organization
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    The base training follows {selectedModule.standards?.join(", ") || "industry"} standards.
                                    Add your organization's context to make it uniquely yours.
                                </p>

                                {/* Additional Context */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">
                                        Additional Requirements
                                    </label>
                                    <textarea
                                        value={customPrompt}
                                        onChange={(e) => setCustomPrompt(e.target.value)}
                                        placeholder={`Examples:\n• Include our password policy (16+ characters, MFA required)\n• Reference our security team contacts\n• Add scenarios specific to healthcare industry\n• Focus on remote work security`}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary/20 resize-none text-sm"
                                    />
                                </div>

                                {/* File Upload */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">
                                        Upload Context Documents
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleFileUpload}
                                        multiple
                                        accept=".pdf,.doc,.docx,.txt,.pptx"
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-32 rounded-xl border-2 border-dashed border-border hover:border-primary/30 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Upload className="h-8 w-8" />
                                        <span className="font-medium">Drop files here</span>
                                        <span className="text-xs">Security policies, handbooks, org charts, procedures</span>
                                    </button>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                        {uploadedFiles.map((file, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-primary" />
                                                    <span className="text-sm font-medium">{file.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => setUploadedFiles(uploadedFiles.filter((_, j) => j !== i))}
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* What AI will customize */}
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        AI will customize:
                                    </h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>• Your specific policies and procedures</li>
                                        <li>• Internal tools and systems references</li>
                                        <li>• Company-specific scenarios and examples</li>
                                        <li>• Team contacts and escalation paths</li>
                                    </ul>
                                </div>
                            </Card>

                            <Button
                                size="lg"
                                className="w-full h-14 text-base font-semibold"
                                onClick={() => setStep("configure")}
                            >
                                Continue to Delivery Options
                                <ChevronRight className="h-5 w-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Configure Step */}
            {step === "configure" && selectedModule && (
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <Card className="p-6 mb-6">
                        <h3 className="font-semibold mb-6 flex items-center gap-2">
                            <Settings2 className="h-5 w-5 text-primary" />
                            Delivery Options
                        </h3>

                        {/* Format Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3">Training Format</label>
                            <div className="grid md:grid-cols-3 gap-3">
                                {[
                                    { id: "full", label: "Full Course", desc: "Complete curriculum with all content", icon: BookOpen },
                                    { id: "micro", label: "Microlearning", desc: "5-10 min bite-sized modules", icon: Layers },
                                    { id: "assessment", label: "Assessment Only", desc: "Quiz and certification only", icon: Target },
                                ].map((format) => (
                                    <button
                                        key={format.id}
                                        onClick={() => setDeliveryFormat(format.id as typeof deliveryFormat)}
                                        className={cn(
                                            "p-4 rounded-xl border text-left transition-all",
                                            deliveryFormat === format.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/30"
                                        )}
                                    >
                                        <format.icon className={cn("h-5 w-5 mb-2", deliveryFormat === format.id ? "text-primary" : "text-muted-foreground")} />
                                        <p className="font-medium text-sm">{format.label}</p>
                                        <p className="text-xs text-muted-foreground">{format.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Gamification Toggle */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                                <div className="flex items-center gap-3">
                                    <Gamepad2 className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">Gamification</p>
                                        <p className="text-xs text-muted-foreground">XP points, badges, streaks</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEnableGamification(!enableGamification)}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-colors",
                                        enableGamification ? "bg-primary" : "bg-border"
                                    )}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded-full bg-white transition-transform",
                                        enableGamification ? "translate-x-6" : "translate-x-0.5"
                                    )} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">Team Leaderboard</p>
                                        <p className="text-xs text-muted-foreground">Competition between learners</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEnableLeaderboard(!enableLeaderboard)}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-colors",
                                        enableLeaderboard ? "bg-primary" : "bg-border"
                                    )}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded-full bg-white transition-transform",
                                        enableLeaderboard ? "translate-x-6" : "translate-x-0.5"
                                    )} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">Completion Certificate</p>
                                        <p className="text-xs text-muted-foreground">Downloadable PDF certificate</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEnableCertificate(!enableCertificate)}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-colors",
                                        enableCertificate ? "bg-primary" : "bg-border"
                                    )}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded-full bg-white transition-transform",
                                        enableCertificate ? "translate-x-6" : "translate-x-0.5"
                                    )} />
                                </button>
                            </div>
                        </div>
                    </Card>

                    <Button
                        size="lg"
                        className="w-full h-14 text-base font-semibold gap-2"
                        onClick={handleGenerate}
                    >
                        <Sparkles className="h-5 w-5" />
                        Generate Customized Training
                    </Button>
                </div>
            )}

            {/* Generating Step */}
            {step === "generating" && (
                <div className="max-w-lg mx-auto px-6 py-16 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60">
                            <Sparkles className="h-10 w-10 text-primary-foreground animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Creating Your Training</h2>
                    <p className="text-muted-foreground mb-8">{generationStage}</p>
                    <Progress value={generationProgress} className="h-2 mb-4" />
                    <p className="text-sm text-muted-foreground">{Math.round(generationProgress)}% complete</p>
                </div>
            )}

            {/* Preview Step */}
            {step === "preview" && selectedModule && (
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <Card className="overflow-hidden">
                        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-emerald-500/10 text-emerald-500">Generated</Badge>
                                {enableGamification && <Badge variant="outline">Gamified</Badge>}
                                {enableCertificate && <Badge variant="outline">Certificate</Badge>}
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{selectedModule.title}</h2>
                            <p className="text-muted-foreground">Customized for your organization</p>
                        </div>

                        <div className="p-6">
                            <div className="grid md:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-muted text-center">
                                    <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                    <p className="font-bold">{selectedModule.duration}</p>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted text-center">
                                    <BookOpen className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                    <p className="font-bold">{selectedModule.sections}</p>
                                    <p className="text-xs text-muted-foreground">Sections</p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted text-center">
                                    <Target className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                    <p className="font-bold">{selectedModule.quizQuestions}</p>
                                    <p className="text-xs text-muted-foreground">Questions</p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted text-center">
                                    <Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                    <p className="font-bold">All</p>
                                    <p className="text-xs text-muted-foreground">Audience</p>
                                </div>
                            </div>

                            {/* Sample sections preview */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Module Structure</h3>
                                <div className="space-y-2">
                                    {["Introduction & Your Context", "Core Concepts", "Interactive Scenarios", "Knowledge Assessment", "Certificate"].map((section, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                            <div className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm">{section}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-border bg-muted/30">
                            <div className="flex gap-4">
                                <Link href="/assign" className="flex-1">
                                    <Button size="lg" className="w-full gap-2">
                                        <Users className="h-5 w-5" />
                                        Deploy to Team
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Eye className="h-5 w-5" />
                                    Preview
                                </Button>
                                <Button variant="outline" size="lg" onClick={handleReset}>
                                    Create Another
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

// Module Card Component
function ModuleCard({
    module,
    onSelect,
    listView = false,
    compact = false,
}: {
    module: CurriculumModule;
    onSelect: (module: CurriculumModule) => void;
    listView?: boolean;
    compact?: boolean;
}) {
    const CategoryIcon = categoryIcons[module.category] || BookOpen;

    if (listView) {
        return (
            <Card
                className="p-4 hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => onSelect(module)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{module.title}</h3>
                            {module.trending && <Badge className="bg-primary/10 text-primary text-xs">Trending</Badge>}
                            {module.new && <Badge className="bg-emerald-500/10 text-emerald-500 text-xs">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{module.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500" />
                            {module.rating}
                        </span>
                        <ChevronRight className="h-5 w-5" />
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card
            className={cn(
                "overflow-hidden hover:border-primary/30 transition-all cursor-pointer group",
                compact && "p-4"
            )}
            onClick={() => onSelect(module)}
        >
            {!compact && (
                <div className="h-24 bg-gradient-to-br from-muted to-muted/50 relative">
                    <CategoryIcon className="absolute bottom-3 left-3 h-8 w-8 text-muted-foreground/40" />
                    <div className="absolute top-2 right-2 flex gap-1">
                        {module.trending && (
                            <Badge className="bg-primary/90 text-primary-foreground text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                            </Badge>
                        )}
                        {module.new && (
                            <Badge className="bg-emerald-500/90 text-white text-xs">New</Badge>
                        )}
                    </div>
                </div>
            )}
            <div className={cn("p-4", compact && "p-0")}>
                <div className="flex items-center gap-2 mb-2">
                    {compact && <CategoryIcon className="h-4 w-4 text-muted-foreground" />}
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {compact ? module.shortTitle : module.title}
                    </h3>
                </div>
                {!compact && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{module.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-500" />
                        {module.rating}
                    </span>
                    {!compact && (
                        <span>{module.enrollments.toLocaleString()} enrolled</span>
                    )}
                </div>
            </div>
        </Card>
    );
}
