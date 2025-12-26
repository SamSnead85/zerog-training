"use client";

import { useState } from "react";
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
    Heart,
    Briefcase,
    Shield,
    TrendingUp,
    GraduationCap,
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
        industries: ["all"],
    },
    {
        id: "secure-ai",
        title: "Secure AI Implementation",
        description: "Compliant AI adoption for regulated industries",
        icon: Shield,
        color: "text-blue-500",
        industries: ["Healthcare", "Financial Services", "Government"],
    },
    {
        id: "ai-sdlc",
        title: "AI-Enhanced Development",
        description: "Integrate AI into your software development lifecycle",
        icon: Code2,
        color: "text-emerald-500",
        industries: ["Technology"],
    },
    {
        id: "prompt-engineering",
        title: "Enterprise Prompt Engineering",
        description: "Master AI interactions for your tech stack",
        icon: Sparkles,
        color: "text-amber-500",
        industries: ["all"],
    },
    {
        id: "leadership-ai",
        title: "Leading in the AI Era",
        description: "Executive training for AI strategy and governance",
        icon: Briefcase,
        color: "text-pink-500",
        industries: ["all"],
    },
    {
        id: "sales-ai",
        title: "AI-Powered Sales & Marketing",
        description: "Leverage AI for revenue growth",
        icon: TrendingUp,
        color: "text-orange-500",
        industries: ["all"],
    },
    {
        id: "onboarding",
        title: "New Employee Onboarding",
        description: "Custom onboarding program for your organization",
        icon: GraduationCap,
        color: "text-cyan-500",
        industries: ["all"],
    },
    {
        id: "healthcare-compliance",
        title: "Healthcare Compliance Suite",
        description: "HIPAA, clinical skills, and patient safety",
        icon: Heart,
        color: "text-red-500",
        industries: ["Healthcare"],
    },
];

export function UniversalCurriculumGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCurriculum, setGeneratedCurriculum] = useState<GeneratedCurriculum | null>(null);
    const [enterpriseContext, setEnterpriseContext] = useState<any>(null);
    const [customTopic, setCustomTopic] = useState("");
    const [targetRole, setTargetRole] = useState("all");

    // Load enterprise context on mount
    useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("zerog_enterprise_context");
            if (saved) {
                setEnterpriseContext(JSON.parse(saved));
            }
        }
    });

    const handleGenerate = async () => {
        setIsGenerating(true);

        // Simulate AI generation with enterprise context
        await new Promise((r) => setTimeout(r, 3000));

        const template = curriculumTemplates.find((t) => t.id === selectedTemplate);
        const contextItems: string[] = [];

        if (enterpriseContext?.techStack?.length > 0) {
            contextItems.push(`Tech Stack: ${enterpriseContext.techStack.map((t: any) => t.name).join(", ")}`);
        }
        if (enterpriseContext?.aiTools?.length > 0) {
            contextItems.push(`AI Tools: ${enterpriseContext.aiTools.join(", ")}`);
        }
        if (enterpriseContext?.industry) {
            contextItems.push(`Industry: ${enterpriseContext.industry}`);
        }
        if (enterpriseContext?.aiSdlcPhase) {
            contextItems.push(`AI Maturity: ${enterpriseContext.aiSdlcPhase}`);
        }

        const curriculum: GeneratedCurriculum = {
            title: customTopic || template?.title || "Custom AI Training",
            description: `Personalized ${template?.description || "training curriculum"} for ${enterpriseContext?.companyName || "your organization"}`,
            targetAudience: targetRole === "all" ? "All Team Members" : targetRole,
            duration: "8-12 hours",
            enterpriseContextUsed: contextItems.length > 0 ? contextItems : ["Generic training (configure context for personalization)"],
            modules: [
                {
                    id: "1",
                    title: "Foundations: Understanding the Landscape",
                    description: "Core concepts and your organization's context",
                    duration: "2 hours",
                    lessons: [
                        "Introduction and learning objectives",
                        `How this applies to ${enterpriseContext?.industry || "your industry"}`,
                        "Key concepts and terminology",
                        "Self-assessment: Current skills baseline",
                    ],
                    contextApplied: enterpriseContext?.industry ? ["Industry context"] : [],
                },
                {
                    id: "2",
                    title: "Hands-On: Practical Application",
                    description: "Apply concepts using your tools and workflows",
                    duration: "3 hours",
                    lessons: [
                        `Getting started with ${enterpriseContext?.aiTools?.[0] || "AI tools"}`,
                        "Best practices for your environment",
                        "Practical exercises and scenarios",
                        "Common pitfalls and how to avoid them",
                    ],
                    contextApplied: enterpriseContext?.aiTools?.length ? ["Your AI tools"] : [],
                },
                {
                    id: "3",
                    title: "Advanced: Mastery and Integration",
                    description: "Deep dive into advanced techniques",
                    duration: "2.5 hours",
                    lessons: [
                        "Advanced techniques and workflows",
                        "Integration with existing processes",
                        "Measuring success and ROI",
                        "Building sustainable practices",
                    ],
                    contextApplied: enterpriseContext?.workflowsAndProcesses?.length ? ["Custom workflows"] : [],
                },
                {
                    id: "4",
                    title: "Assessment & Certification",
                    description: "Validate your skills and earn your certificate",
                    duration: "1 hour",
                    lessons: [
                        "Knowledge check quiz",
                        "Practical assessment",
                        "Peer review exercise",
                        "Certificate of completion",
                    ],
                    contextApplied: [],
                },
            ],
        };

        setGeneratedCurriculum(curriculum);
        setIsGenerating(false);
    };

    const deployToCatalog = () => {
        alert("Curriculum deployed to training catalog!");
    };

    const filteredTemplates = enterpriseContext?.industry
        ? curriculumTemplates.filter(
            (t) => t.industries.includes("all") || t.industries.includes(enterpriseContext.industry)
        )
        : curriculumTemplates;

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
                        Generate personalized training tailored to your organization
                    </p>
                </div>
                {enterpriseContext?.companyName && (
                    <Badge className="bg-emerald-500/10 text-emerald-500 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Context: {enterpriseContext.companyName}
                    </Badge>
                )}
            </div>

            {!enterpriseContext && (
                <Card className="p-6 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-4">
                        <Building2 className="h-8 w-8 text-primary" />
                        <div className="flex-1">
                            <p className="font-medium">Personalize Your Training</p>
                            <p className="text-sm text-muted-foreground">
                                Configure your organization's context for AI-personalized training
                            </p>
                        </div>
                        <a href="/context">
                            <Button variant="outline">Configure Context</Button>
                        </a>
                    </div>
                </Card>
            )}

            {!generatedCurriculum ? (
                <>
                    {/* Template Selection */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredTemplates.map((template) => {
                            const Icon = template.icon;
                            return (
                                <Card
                                    key={template.id}
                                    className={cn(
                                        "p-5 cursor-pointer transition-all",
                                        selectedTemplate === template.id
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-primary/30"
                                    )}
                                    onClick={() => setSelectedTemplate(template.id)}
                                >
                                    <Icon className={cn("h-7 w-7 mb-3", template.color)} />
                                    <h3 className="font-semibold mb-1 text-sm">{template.title}</h3>
                                    <p className="text-xs text-muted-foreground">{template.description}</p>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Custom Topic */}
                    <Card className="p-6">
                        <h3 className="font-medium mb-3">Or describe a custom training need:</h3>
                        <textarea
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            placeholder="e.g., Train our team on using AI tools for customer support while maintaining compliance standards..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none resize-none"
                        />
                    </Card>

                    {/* Target Audience */}
                    <Card className="p-6">
                        <h3 className="font-medium mb-3">Target Audience:</h3>
                        <div className="flex flex-wrap gap-2">
                            {["all", "Engineering", "Sales", "Leadership", "Operations", "Customer Support", "New Hires"].map((role) => (
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
                                    {role === "all" ? "All Team Members" : role}
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
                                Generating Personalized Curriculum...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5" />
                                Generate Curriculum
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
                                        {module.contextApplied.length > 0 && (
                                            <div className="flex gap-2">
                                                {module.contextApplied.map((ctx, i) => (
                                                    <Badge key={i} className="bg-primary/10 text-primary text-xs">
                                                        <Sparkles className="h-3 w-3 mr-1" />
                                                        {ctx}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
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
