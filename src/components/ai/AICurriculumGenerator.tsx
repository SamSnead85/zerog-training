"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    Wand2,
    BookOpen,
    Target,
    Users,
    Clock,
    FileText,
    ChevronRight,
    CheckCircle2,
    Loader2,
    Building2,
    Code2,
    Brain,
    Workflow,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CurriculumModule {
    id: string;
    title: string;
    description: string;
    duration: string;
    lessons: string[];
    contextApplied: string[];
}

interface GeneratedCurriculum {
    title: string;
    description: string;
    targetAudience: string;
    duration: string;
    modules: CurriculumModule[];
    enterpriseContextUsed: string[];
}

const curriculumTemplates = [
    {
        id: "ai-transformation",
        title: "AI-Native Cultural Transformation",
        description: "Transform your workforce into AI-fluent professionals",
        icon: Brain,
        color: "text-purple-500",
    },
    {
        id: "secure-ai",
        title: "Secure AI Implementation",
        description: "HIPAA-compliant AI adoption for healthcare",
        icon: Sparkles,
        color: "text-blue-500",
    },
    {
        id: "ai-sdlc",
        title: "AI-Enhanced SDLC",
        description: "Integrate AI into your development lifecycle",
        icon: Workflow,
        color: "text-emerald-500",
    },
    {
        id: "prompt-engineering",
        title: "Enterprise Prompt Engineering",
        description: "Master AI interactions for your tech stack",
        icon: Code2,
        color: "text-amber-500",
    },
];

export function AICurriculumGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCurriculum, setGeneratedCurriculum] = useState<GeneratedCurriculum | null>(null);
    const [enterpriseContext, setEnterpriseContext] = useState<any>(null);
    const [customTopic, setCustomTopic] = useState("");
    const [targetRole, setTargetRole] = useState("all");

    useEffect(() => {
        // Load enterprise context
        const saved = localStorage.getItem("zerog_enterprise_context");
        if (saved) {
            setEnterpriseContext(JSON.parse(saved));
        }
    }, []);

    const handleGenerate = async () => {
        setIsGenerating(true);

        // Simulate AI generation with enterprise context
        await new Promise((r) => setTimeout(r, 3000));

        const template = curriculumTemplates.find((t) => t.id === selectedTemplate);
        const contextItems = [];

        if (enterpriseContext?.techStack?.length > 0) {
            contextItems.push(`Tech Stack: ${enterpriseContext.techStack.map((t: any) => t.name).join(", ")}`);
        }
        if (enterpriseContext?.aiTools?.length > 0) {
            contextItems.push(`AI Tools: ${enterpriseContext.aiTools.join(", ")}`);
        }
        if (enterpriseContext?.aiSdlcPhase) {
            contextItems.push(`AI Maturity: ${enterpriseContext.aiSdlcPhase}`);
        }

        const curriculum: GeneratedCurriculum = {
            title: customTopic || template?.title || "Custom AI Training",
            description: `Personalized ${template?.description || "training curriculum"} for ${enterpriseContext?.companyName || "your organization"}`,
            targetAudience: targetRole === "all" ? "All Employees" : targetRole,
            duration: "8-12 hours",
            enterpriseContextUsed: contextItems,
            modules: [
                {
                    id: "1",
                    title: "Foundations: AI in Your Organization",
                    description: "Understanding how AI applies to your specific context",
                    duration: "2 hours",
                    lessons: [
                        "What AI means for healthcare organizations",
                        `AI capabilities in ${enterpriseContext?.techStack?.[0]?.name || "your tech stack"}`,
                        "Your organization's AI maturity journey",
                        "Identifying AI opportunities in your workflow",
                    ],
                    contextApplied: ["Industry context", "Tech stack integration"],
                },
                {
                    id: "2",
                    title: "Hands-On: Using AI Tools Effectively",
                    description: "Practical exercises with your approved AI tools",
                    duration: "3 hours",
                    lessons: [
                        `Getting started with ${enterpriseContext?.aiTools?.[0] || "enterprise AI"}`,
                        "Prompt engineering for healthcare contexts",
                        "HIPAA-compliant AI interactions",
                        "Real scenarios from your workflows",
                    ],
                    contextApplied: ["Approved AI tools", "Compliance requirements"],
                },
                {
                    id: "3",
                    title: "Advanced: AI-Enhanced Workflows",
                    description: "Transform your daily processes with AI",
                    duration: "2.5 hours",
                    lessons: [
                        "Automating documentation with AI",
                        "AI-assisted decision support",
                        "Building AI into your SDLC",
                        "Measuring AI impact",
                    ],
                    contextApplied: ["Custom workflows", "Process integration"],
                },
                {
                    id: "4",
                    title: "Governance & Best Practices",
                    description: "Responsible AI use in regulated environments",
                    duration: "1.5 hours",
                    lessons: [
                        "AI ethics in healthcare",
                        "Data privacy and AI",
                        "Audit trails and accountability",
                        "Staying current with AI developments",
                    ],
                    contextApplied: ["Compliance frameworks", "Security requirements"],
                },
            ],
        };

        setGeneratedCurriculum(curriculum);
        setIsGenerating(false);
    };

    const deployToCatalog = () => {
        // Save to catalog
        alert("Curriculum deployed to training catalog!");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Wand2 className="h-7 w-7 text-primary" />
                        AI Curriculum Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate personalized training using your organization's context
                    </p>
                </div>
                {enterpriseContext && (
                    <Badge className="bg-emerald-500/10 text-emerald-500 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Context Loaded: {enterpriseContext.companyName || "Enterprise"}
                    </Badge>
                )}
            </div>

            {!enterpriseContext && (
                <Card className="p-6 bg-amber-500/5 border-amber-500/20">
                    <div className="flex items-center gap-4">
                        <Building2 className="h-8 w-8 text-amber-500" />
                        <div className="flex-1">
                            <p className="font-medium">Enterprise Context Not Configured</p>
                            <p className="text-sm text-muted-foreground">
                                Configure your organization's tech stack and AI tools for personalized training
                            </p>
                        </div>
                        <Button variant="outline">Configure Context</Button>
                    </div>
                </Card>
            )}

            {!generatedCurriculum ? (
                <>
                    {/* Template Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {curriculumTemplates.map((template) => {
                            const Icon = template.icon;
                            return (
                                <Card
                                    key={template.id}
                                    className={cn(
                                        "p-6 cursor-pointer transition-all",
                                        selectedTemplate === template.id
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-primary/30"
                                    )}
                                    onClick={() => setSelectedTemplate(template.id)}
                                >
                                    <Icon className={cn("h-8 w-8 mb-3", template.color)} />
                                    <h3 className="font-semibold mb-1">{template.title}</h3>
                                    <p className="text-sm text-muted-foreground">{template.description}</p>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Custom Topic */}
                    <Card className="p-6">
                        <h3 className="font-medium mb-3">Or describe a custom topic:</h3>
                        <textarea
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            placeholder="e.g., Train our clinical staff on using AI for patient documentation while maintaining HIPAA compliance..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none resize-none"
                        />
                    </Card>

                    {/* Target Audience */}
                    <Card className="p-6">
                        <h3 className="font-medium mb-3">Target Audience:</h3>
                        <div className="flex flex-wrap gap-2">
                            {["all", "Clinical Staff", "IT Department", "Leadership", "Administrative", "New Hires"].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setTargetRole(role)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm transition-all",
                                        targetRole === role
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    {role === "all" ? "All Employees" : role}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Generate Button */}
                    <Button
                        size="lg"
                        className="w-full gap-2"
                        onClick={handleGenerate}
                        disabled={(!selectedTemplate && !customTopic) || isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Generating AI-Native Curriculum...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5" />
                                Generate Personalized Curriculum
                            </>
                        )}
                    </Button>
                </>
            ) : (
                <>
                    {/* Generated Curriculum */}
                    <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <Badge className="mb-2 bg-primary/20">AI-Generated</Badge>
                                <h2 className="text-2xl font-bold">{generatedCurriculum.title}</h2>
                                <p className="text-muted-foreground">{generatedCurriculum.description}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-medium">{generatedCurriculum.duration}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {generatedCurriculum.enterpriseContextUsed.map((ctx, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                    {ctx}
                                </Badge>
                            ))}
                        </div>
                    </Card>

                    {/* Modules */}
                    <div className="space-y-4">
                        {generatedCurriculum.modules.map((module, index) => (
                            <Card key={module.id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">{module.title}</h3>
                                            <Badge variant="outline">{module.duration}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {module.description}
                                        </p>
                                        <div className="space-y-1 mb-3">
                                            {module.lessons.map((lesson, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                                    {lesson}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            {module.contextApplied.map((ctx, i) => (
                                                <Badge key={i} className="bg-primary/10 text-primary text-xs">
                                                    <Sparkles className="h-3 w-3 mr-1" />
                                                    {ctx}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setGeneratedCurriculum(null)}
                        >
                            Regenerate
                        </Button>
                        <Button className="flex-1 gap-2" onClick={deployToCatalog}>
                            <ArrowRight className="h-4 w-4" />
                            Deploy to Training Catalog
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
