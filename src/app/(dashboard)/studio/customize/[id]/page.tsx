"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Card, Badge, Button, Input, Progress } from "@/components/ui";
import {
    ArrowLeft,
    ArrowRight,
    Sparkles,
    Building2,
    FileText,
    Laptop,
    Shield,
    Check,
    Loader2,
    BookOpen,
    Zap,
    RefreshCw,
} from "lucide-react";

interface OrgContext {
    companyName: string;
    industry: string;
    tools: string;
    policies: string;
    terminology: string;
}

export default function CustomizeModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [orgContext, setOrgContext] = useState<OrgContext>({
        companyName: "",
        industry: "",
        tools: "",
        policies: "",
        terminology: "",
    });
    const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setStep(2);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    moduleId: id,
                    moduleTitle: id.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                    baseContent: "Standard training content for this module...",
                    organizationContext: orgContext,
                    contentType: "lesson",
                }),
            });

            const data = await response.json();

            if (data.success) {
                setGeneratedPreview(data.content);
            }
        } catch (error) {
            console.error("Generation failed:", error);
        } finally {
            setIsGenerating(false);
            setStep(3);
        }
    };

    return (
        <div className="min-h-screen p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <Link
                    href={`/module/${id}`}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Module
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-background" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Customize with AI</h1>
                        <p className="text-muted-foreground">
                            Add your organization&apos;s context to this training module
                        </p>
                    </div>
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {step > s ? <Check className="h-4 w-4" /> : s}
                            </div>
                            <span className={step >= s ? "font-medium" : "text-muted-foreground"}>
                                {s === 1 && "Add Context"}
                                {s === 2 && "Generate"}
                                {s === 3 && "Review"}
                            </span>
                            {s < 3 && <div className="h-px w-12 bg-border" />}
                        </div>
                    ))}
                </div>

                {/* Step 1: Context Form */}
                {step === 1 && (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-6">Organization Details</h2>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                        <Building2 className="h-4 w-4 text-primary" />
                                        Company Name *
                                    </label>
                                    <Input
                                        placeholder="Acme Corporation"
                                        value={orgContext.companyName}
                                        onChange={(e) => setOrgContext({ ...orgContext, companyName: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                        <FileText className="h-4 w-4 text-secondary" />
                                        Industry *
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={orgContext.industry}
                                        onChange={(e) => setOrgContext({ ...orgContext, industry: e.target.value })}
                                    >
                                        <option value="">Select industry</option>
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
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <Laptop className="h-4 w-4 text-accent" />
                                    Tools & Software
                                </label>
                                <Input
                                    placeholder="e.g., Jira, Confluence, Salesforce, Slack"
                                    value={orgContext.tools}
                                    onChange={(e) => setOrgContext({ ...orgContext, tools: e.target.value })}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    The AI will reference these specific tools in examples
                                </p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <Shield className="h-4 w-4 text-success" />
                                    Key Policies or Processes
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    rows={3}
                                    placeholder="e.g., Our SDLC follows a 2-week sprint cycle with mandatory code reviews..."
                                    value={orgContext.policies}
                                    onChange={(e) => setOrgContext({ ...orgContext, policies: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <BookOpen className="h-4 w-4 text-warning" />
                                    Company Terminology
                                </label>
                                <Input
                                    placeholder="e.g., We call sprints 'iterations', POs are called 'Product Leads'"
                                    value={orgContext.terminology}
                                    onChange={(e) => setOrgContext({ ...orgContext, terminology: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    size="lg"
                                    className="gap-2"
                                    onClick={handleGenerate}
                                    disabled={!orgContext.companyName || !orgContext.industry}
                                >
                                    <Zap className="h-5 w-5" />
                                    Generate Customized Content
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 2: Generating */}
                {step === 2 && isGenerating && (
                    <Card className="p-12 text-center">
                        <div className="relative inline-block mb-6">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">AI is Customizing Your Content</h2>
                        <p className="text-muted-foreground mb-6">
                            Blending standard training with {orgContext.companyName}&apos;s context...
                        </p>
                        <div className="space-y-2 text-sm text-left max-w-xs mx-auto">
                            <div className="flex items-center gap-2 text-success">
                                <Check className="h-4 w-4" />
                                Analyzing base content
                            </div>
                            <div className="flex items-center gap-2 text-success">
                                <Check className="h-4 w-4" />
                                Applying industry context
                            </div>
                            <div className="flex items-center gap-2 animate-pulse">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating custom examples...
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 3: Preview */}
                {step === 3 && (
                    <div className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-success" />
                                    <h2 className="text-lg font-semibold">Content Generated</h2>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => {
                                            setStep(1);
                                            setGeneratedPreview(null);
                                        }}
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Regenerate
                                    </Button>
                                </div>
                            </div>

                            <div className="p-4 bg-muted rounded-lg mb-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Customized for {orgContext.companyName}</Badge>
                                    <Badge variant="secondary">{orgContext.industry} Industry</Badge>
                                    {orgContext.tools && <Badge variant="secondary">Tools: {orgContext.tools}</Badge>}
                                </div>
                            </div>

                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <div className="whitespace-pre-wrap bg-background border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
                                    {generatedPreview || "Content preview will appear here..."}
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Edit Context
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">Save as Draft</Button>
                                <Button className="gap-2">
                                    Apply to Module
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
