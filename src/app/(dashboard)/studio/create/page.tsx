"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Badge, Button, Input, Progress } from "@/components/ui";
import {
    ArrowLeft,
    ArrowRight,
    Sparkles,
    FileText,
    Upload,
    Building2,
    BookOpen,
    Loader2,
    Check,
    Plus,
    Trash2,
    GripVertical,
    Wand2,
    FileUp,
    Globe,
    Zap,
} from "lucide-react";

interface ModuleConfig {
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    learningObjectives: string[];
    sourceMaterial: string;
    orgContext: {
        companyName: string;
        industry: string;
        tools: string;
        terminology: string;
    };
}

export default function CreateModulePage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [config, setConfig] = useState<ModuleConfig>({
        title: "",
        description: "",
        category: "custom",
        targetAudience: "",
        learningObjectives: [""],
        sourceMaterial: "",
        orgContext: {
            companyName: "",
            industry: "",
            tools: "",
            terminology: "",
        },
    });

    const categories = [
        { id: "policy", label: "Policy & Procedures", icon: FileText },
        { id: "compliance", label: "Compliance & Regulatory", icon: Building2 },
        { id: "skills", label: "Skills Training", icon: BookOpen },
        { id: "onboarding", label: "Onboarding", icon: Globe },
        { id: "custom", label: "Custom Topic", icon: Sparkles },
    ];

    const addObjective = () => {
        setConfig({ ...config, learningObjectives: [...config.learningObjectives, ""] });
    };

    const removeObjective = (index: number) => {
        const newObjectives = config.learningObjectives.filter((_, i) => i !== index);
        setConfig({ ...config, learningObjectives: newObjectives });
    };

    const updateObjective = (index: number, value: string) => {
        const newObjectives = [...config.learningObjectives];
        newObjectives[index] = value;
        setConfig({ ...config, learningObjectives: newObjectives });
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setStep(3);

        // Simulate progressive generation
        const steps = [
            { progress: 20, message: "Analyzing source material..." },
            { progress: 40, message: "Structuring lessons..." },
            { progress: 60, message: "Generating content..." },
            { progress: 80, message: "Creating assessments..." },
            { progress: 100, message: "Finalizing module..." },
        ];

        for (const s of steps) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setGenerationProgress(s.progress);
        }

        // Call the API
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    moduleId: "custom-" + Date.now(),
                    moduleTitle: config.title,
                    baseContent: config.sourceMaterial,
                    organizationContext: config.orgContext,
                    contentType: "full-module",
                }),
            });

            const data = await response.json();
            if (data.success) {
                // Store generated content (in production, save to database)
                localStorage.setItem("generatedModule", JSON.stringify(data.content));
            }
        } catch (error) {
            console.error("Generation failed:", error);
        }

        setIsGenerating(false);
        setStep(4);
    };

    return (
        <div className="min-h-screen p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <Link
                    href="/library"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Library
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Wand2 className="h-6 w-6 text-background" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Create Training Module</h1>
                        <p className="text-muted-foreground">
                            Build custom training from your documents, policies, or any content
                        </p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-8">
                    {[
                        { num: 1, label: "Basics" },
                        { num: 2, label: "Content" },
                        { num: 3, label: "Generate" },
                        { num: 4, label: "Review" },
                    ].map((s, i) => (
                        <div key={s.num} className="flex items-center gap-2">
                            <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= s.num
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                            </div>
                            <span className={`text-sm ${step >= s.num ? "font-medium" : "text-muted-foreground"}`}>
                                {s.label}
                            </span>
                            {i < 3 && <div className="h-px w-8 bg-border" />}
                        </div>
                    ))}
                </div>

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-6">Module Details</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Module Title *</label>
                                <Input
                                    placeholder="e.g., Company Data Security Policy Training"
                                    value={config.title}
                                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    rows={3}
                                    placeholder="Brief description of what learners will gain from this module"
                                    value={config.description}
                                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3">Category</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {categories.map((cat) => {
                                        const Icon = cat.icon;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setConfig({ ...config, category: cat.id })}
                                                className={`p-4 rounded-lg border text-left transition-all ${config.category === cat.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                            >
                                                <Icon className={`h-5 w-5 mb-2 ${config.category === cat.id ? "text-primary" : "text-muted-foreground"}`} />
                                                <span className="text-sm font-medium">{cat.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Target Audience</label>
                                <Input
                                    placeholder="e.g., All employees, New hires, Engineering team"
                                    value={config.targetAudience}
                                    onChange={(e) => setConfig({ ...config, targetAudience: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Learning Objectives</label>
                                <p className="text-xs text-muted-foreground mb-3">What will learners be able to do after completing this training?</p>
                                <div className="space-y-2">
                                    {config.learningObjectives.map((obj, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input
                                                placeholder={`Objective ${i + 1}`}
                                                value={obj}
                                                onChange={(e) => updateObjective(i, e.target.value)}
                                            />
                                            {config.learningObjectives.length > 1 && (
                                                <Button variant="ghost" size="icon" onClick={() => removeObjective(i)}>
                                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={addObjective} className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Objective
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={() => setStep(2)} disabled={!config.title} className="gap-2">
                                    Continue
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 2: Content & Context */}
                {step === 2 && (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-6">Content & Context</h2>

                        <div className="space-y-6">
                            {/* Source Material */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <FileUp className="h-4 w-4 text-primary" />
                                    Source Material
                                </label>
                                <p className="text-xs text-muted-foreground mb-3">
                                    Paste your policy documents, procedures, or any content you want to turn into training
                                </p>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                                    rows={8}
                                    placeholder="Paste your document content here...

For example:
- Company policies
- Standard operating procedures
- Best practices guides
- Technical documentation
- Process workflows

The AI will analyze this content and generate structured training lessons with quizzes."
                                    value={config.sourceMaterial}
                                    onChange={(e) => setConfig({ ...config, sourceMaterial: e.target.value })}
                                />
                            </div>

                            {/* Organization Context */}
                            <div className="border-t border-border pt-6">
                                <h3 className="text-sm font-medium mb-4">Organization Context (Optional)</h3>
                                <p className="text-xs text-muted-foreground mb-4">
                                    Adding context helps the AI generate more relevant examples and scenarios
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Company Name</label>
                                        <Input
                                            placeholder="Acme Corp"
                                            value={config.orgContext.companyName}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                orgContext: { ...config.orgContext, companyName: e.target.value },
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Industry</label>
                                        <Input
                                            placeholder="Healthcare, Finance, Tech..."
                                            value={config.orgContext.industry}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                orgContext: { ...config.orgContext, industry: e.target.value },
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tools & Systems</label>
                                        <Input
                                            placeholder="Jira, Salesforce, Slack..."
                                            value={config.orgContext.tools}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                orgContext: { ...config.orgContext, tools: e.target.value },
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Company Terminology</label>
                                        <Input
                                            placeholder="Special terms your company uses"
                                            value={config.orgContext.terminology}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                orgContext: { ...config.orgContext, terminology: e.target.value },
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button variant="outline" onClick={() => setStep(1)}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                                <Button onClick={handleGenerate} className="gap-2">
                                    <Zap className="h-4 w-4" />
                                    Generate Module
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 3: Generating */}
                {step === 3 && isGenerating && (
                    <Card className="p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="relative inline-block mb-6">
                                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <Wand2 className="h-10 w-10 text-primary animate-pulse" />
                                </div>
                                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                            </div>

                            <h2 className="text-xl font-bold mb-2">Creating Your Training Module</h2>
                            <p className="text-muted-foreground mb-6">
                                AI is analyzing your content and generating lessons...
                            </p>

                            <Progress value={generationProgress} className="mb-4" />

                            <div className="space-y-2 text-sm text-left">
                                {generationProgress >= 20 && (
                                    <div className="flex items-center gap-2 text-success">
                                        <Check className="h-4 w-4" />
                                        Analyzing source material
                                    </div>
                                )}
                                {generationProgress >= 40 && (
                                    <div className="flex items-center gap-2 text-success">
                                        <Check className="h-4 w-4" />
                                        Structuring lessons
                                    </div>
                                )}
                                {generationProgress >= 60 && (
                                    <div className="flex items-center gap-2 text-success">
                                        <Check className="h-4 w-4" />
                                        Generating content
                                    </div>
                                )}
                                {generationProgress >= 80 && (
                                    <div className="flex items-center gap-2 text-success">
                                        <Check className="h-4 w-4" />
                                        Creating assessments
                                    </div>
                                )}
                                {generationProgress < 100 && (
                                    <div className="flex items-center gap-2 animate-pulse">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {generationProgress < 40 ? "Analyzing..." :
                                            generationProgress < 60 ? "Structuring..." :
                                                generationProgress < 80 ? "Generating..." : "Finalizing..."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 4: Review */}
                {step === 4 && !isGenerating && (
                    <div className="space-y-6">
                        <Card className="p-6 border-success bg-success/5">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                                    <Check className="h-6 w-6 text-success" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Module Generated Successfully!</h2>
                                    <p className="text-muted-foreground">
                                        Your training module &quot;{config.title}&quot; is ready
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Module Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Title:</span>
                                    <span className="font-medium">{config.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Category:</span>
                                    <Badge variant="secondary">{config.category}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Lessons Generated:</span>
                                    <span className="font-medium">5 lessons</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Assessments:</span>
                                    <span className="font-medium">5 quizzes</span>
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(2)}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Edit Content
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">Save as Draft</Button>
                                <Link href="/library">
                                    <Button className="gap-2">
                                        Publish Module
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
