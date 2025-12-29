"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Badge, Input, Progress } from "@/components/ui";
import {
    Rocket,
    ArrowLeft,
    ArrowRight,
    Sparkles,
    Building2,
    FileText,
    Zap,
    Check,
    BookOpen,
    Users,
    Shield,
    Laptop,
    Crown,
    Target,
    Clock,
    ChevronRight,
} from "lucide-react";

// Demo module templates (subset for demo)
const DEMO_TEMPLATES = [
    {
        id: "hipaa-essentials",
        title: "HIPAA Essentials",
        category: "Compliance",
        icon: Shield,
        duration: "60 min",
        description: "Comprehensive HIPAA training covering PHI protection and breach prevention.",
        color: "from-red-500 to-orange-500",
    },
    {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        category: "Leadership",
        icon: Crown,
        duration: "45 min",
        description: "Core leadership principles for emerging leaders and managers.",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: "customer-service-excellence",
        title: "Customer Service Excellence",
        category: "Customer Service",
        icon: Users,
        duration: "45 min",
        description: "Deliver exceptional customer experiences that build loyalty.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "salesforce-basics",
        title: "Salesforce CRM Basics",
        category: "Technology",
        icon: Laptop,
        duration: "50 min",
        description: "Navigate Salesforce to manage leads and opportunities effectively.",
        color: "from-green-500 to-emerald-500",
    },
    {
        id: "effective-feedback",
        title: "Giving & Receiving Feedback",
        category: "Soft Skills",
        icon: Target,
        duration: "30 min",
        description: "Master the art of constructive feedback using the SBI model.",
        color: "from-amber-500 to-yellow-500",
    },
    {
        id: "information-security",
        title: "Information Security",
        category: "Compliance",
        icon: Shield,
        duration: "40 min",
        description: "Protect organizational data from cyber threats and phishing.",
        color: "from-indigo-500 to-violet-500",
    },
];

type Step = "template" | "context" | "generating" | "preview";

interface OrgContext {
    companyName: string;
    industry: string;
    tools: string;
    compliance: string;
}

export default function TryDemoPage() {
    const [step, setStep] = useState<Step>("template");
    const [selectedTemplate, setSelectedTemplate] = useState<typeof DEMO_TEMPLATES[0] | null>(null);
    const [orgContext, setOrgContext] = useState<OrgContext>({
        companyName: "",
        industry: "",
        tools: "",
        compliance: "",
    });
    const [generatedModule, setGeneratedModule] = useState<{
        title: string;
        lessons: { title: string; summary: string }[];
        customizations: string[];
    } | null>(null);

    const handleSelectTemplate = (template: typeof DEMO_TEMPLATES[0]) => {
        setSelectedTemplate(template);
        setStep("context");
    };

    const handleGenerateModule = () => {
        setStep("generating");

        // Simulate AI generation
        setTimeout(() => {
            const customizations: string[] = [];
            if (orgContext.companyName) customizations.push(`Customized for ${orgContext.companyName}`);
            if (orgContext.industry) customizations.push(`Industry-specific examples for ${orgContext.industry}`);
            if (orgContext.tools) customizations.push(`References to ${orgContext.tools}`);
            if (orgContext.compliance) customizations.push(`${orgContext.compliance} compliance aligned`);

            setGeneratedModule({
                title: selectedTemplate?.title || "Custom Module",
                lessons: [
                    { title: "Introduction & Overview", summary: `Welcome to ${selectedTemplate?.title}. This module covers the essential concepts tailored for ${orgContext.companyName || "your organization"}.` },
                    { title: "Core Concepts", summary: `Understanding the fundamentals with real-world examples from the ${orgContext.industry || "your"} industry.` },
                    { title: "Practical Application", summary: `Hands-on exercises using ${orgContext.tools || "your tools"} with step-by-step guidance.` },
                    { title: "Best Practices", summary: "Industry-standard approaches and common pitfalls to avoid." },
                    { title: "Assessment & Certification", summary: "Test your knowledge and earn your completion certificate." },
                ],
                customizations,
            });
            setStep("preview");
        }, 3000);
    };

    const progressValue = step === "template" ? 25 : step === "context" ? 50 : step === "generating" ? 75 : 100;

    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            {/* Header */}
            <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                            <Rocket className="h-5 w-5 text-background" />
                        </div>
                        <span className="text-xl font-bold">
                            Scaled<span className="text-gradient">Native</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="gap-1">
                            <Sparkles className="h-3 w-3" />
                            Interactive Demo
                        </Badge>
                        <Link href="/signup">
                            <Button size="sm">Start Free Trial</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-12">
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                            {step === "template" && "Step 1: Choose a Template"}
                            {step === "context" && "Step 2: Add Your Context"}
                            {step === "generating" && "Step 3: AI is Generating..."}
                            {step === "preview" && "Step 4: Preview Your Module"}
                        </span>
                        <span className="text-sm text-muted-foreground">{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                </div>

                {/* Step 1: Template Selection */}
                {step === "template" && (
                    <div>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-3">Choose a Training Template</h1>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                Select from our library of 50+ professional templates. Each will be customized with your organization's context.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {DEMO_TEMPLATES.map((template) => {
                                const Icon = template.icon;
                                return (
                                    <Card
                                        key={template.id}
                                        variant="glass"
                                        hover="glow"
                                        className="cursor-pointer group"
                                        onClick={() => handleSelectTemplate(template)}
                                    >
                                        <div className="p-6">
                                            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <Badge variant="outline" className="mb-3">{template.category}</Badge>
                                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                {template.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    {template.duration}
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                Or{" "}
                                <button
                                    className="text-primary hover:underline"
                                    onClick={() => {
                                        setSelectedTemplate({
                                            id: "custom",
                                            title: "Custom Training Module",
                                            category: "Custom",
                                            icon: BookOpen,
                                            duration: "Variable",
                                            description: "Build a completely custom module from scratch.",
                                            color: "from-primary to-secondary",
                                        });
                                        setStep("context");
                                    }}
                                >
                                    create a custom module from scratch
                                </button>
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Organization Context */}
                {step === "context" && (
                    <div className="max-w-2xl mx-auto">
                        <button
                            onClick={() => setStep("template")}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to templates
                        </button>

                        <div className="text-center mb-8">
                            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${selectedTemplate?.color} flex items-center justify-center mx-auto mb-4`}>
                                {selectedTemplate && <selectedTemplate.icon className="h-8 w-8 text-white" />}
                            </div>
                            <h1 className="text-2xl font-bold mb-2">{selectedTemplate?.title}</h1>
                            <p className="text-muted-foreground">
                                Tell us about your organization to customize this module
                            </p>
                        </div>

                        <Card variant="glass" padding="lg">
                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                        <Building2 className="h-4 w-4 text-primary" />
                                        Company Name
                                    </label>
                                    <Input
                                        placeholder="e.g., Acme Healthcare"
                                        value={orgContext.companyName}
                                        onChange={(e) => setOrgContext({ ...orgContext, companyName: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                        <FileText className="h-4 w-4 text-secondary" />
                                        Industry
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={orgContext.industry}
                                        onChange={(e) => setOrgContext({ ...orgContext, industry: e.target.value })}
                                    >
                                        <option value="">Select your industry</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Finance">Finance & Banking</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Retail">Retail & E-commerce</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Education">Education</option>
                                        <option value="Government">Government</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                        <Laptop className="h-4 w-4 text-accent" />
                                        Tools & Software (optional)
                                    </label>
                                    <Input
                                        placeholder="e.g., Epic EHR, Salesforce, Slack"
                                        value={orgContext.tools}
                                        onChange={(e) => setOrgContext({ ...orgContext, tools: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        The training will reference your specific tools
                                    </p>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                        <Shield className="h-4 w-4 text-success" />
                                        Compliance Requirements (optional)
                                    </label>
                                    <Input
                                        placeholder="e.g., HIPAA, SOC 2, GDPR"
                                        value={orgContext.compliance}
                                        onChange={(e) => setOrgContext({ ...orgContext, compliance: e.target.value })}
                                    />
                                </div>

                                <Button className="w-full" size="lg" onClick={handleGenerateModule}>
                                    <Zap className="h-5 w-5" />
                                    Generate My Training Module
                                </Button>
                            </div>
                        </Card>

                        <p className="text-center text-xs text-muted-foreground mt-4">
                            No account required. See how AI customizes training for your organization.
                        </p>
                    </div>
                )}

                {/* Step 3: Generating */}
                {step === "generating" && (
                    <div className="max-w-xl mx-auto text-center py-20">
                        <div className="relative inline-block mb-8">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-pulse">
                                <Sparkles className="h-12 w-12 text-primary" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">AI is Creating Your Module</h2>
                        <p className="text-muted-foreground mb-6">
                            Customizing <strong>{selectedTemplate?.title}</strong> for{" "}
                            <strong>{orgContext.companyName || "your organization"}</strong>...
                        </p>
                        <div className="space-y-3 text-sm text-left max-w-xs mx-auto">
                            <div className="flex items-center gap-2 text-success">
                                <Check className="h-4 w-4" />
                                Analyzing template structure
                            </div>
                            <div className="flex items-center gap-2 text-success">
                                <Check className="h-4 w-4" />
                                Applying industry context
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                Generating custom content...
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Preview */}
                {step === "preview" && generatedModule && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <Badge variant="default" className="mb-4 gap-1">
                                <Check className="h-3 w-3" />
                                Module Generated
                            </Badge>
                            <h1 className="text-3xl font-bold mb-3">{generatedModule.title}</h1>
                            <p className="text-muted-foreground">
                                Here's a preview of your customized training module
                            </p>
                        </div>

                        {/* Customizations */}
                        {generatedModule.customizations.length > 0 && (
                            <Card variant="glow" className="mb-8 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    <span className="font-medium">AI Customizations Applied</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {generatedModule.customizations.map((c, i) => (
                                        <Badge key={i} variant="secondary">{c}</Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Lessons */}
                        <div className="space-y-4 mb-8">
                            {generatedModule.lessons.map((lesson, index) => (
                                <Card key={index} variant="glass" className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-primary">{index + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">{lesson.title}</h3>
                                            <p className="text-sm text-muted-foreground">{lesson.summary}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* CTA */}
                        <Card variant="glass" className="p-8 text-center">
                            <h3 className="text-xl font-bold mb-2">Ready to Create Real Training?</h3>
                            <p className="text-muted-foreground mb-6">
                                Start your free trial to generate full modules with interactive simulations and assessments.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link href="/signup">
                                    <Button size="lg" className="gap-2">
                                        Start Free Trial
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => {
                                        setStep("template");
                                        setSelectedTemplate(null);
                                        setGeneratedModule(null);
                                    }}
                                >
                                    Try Another Template
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}
