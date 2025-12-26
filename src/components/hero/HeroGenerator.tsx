"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Badge, Card } from "@/components/ui";
import {
    Sparkles,
    FileText,
    Download,
    Save,
    ChevronRight,
    Clock,
    Target,
    Users,
    Loader2,
    Building2,
    ArrowRight,
} from "lucide-react";
import {
    leadershipModules,
    complianceModules,
    onboardingModules,
    customerServiceModules,
    softSkillsModules,
    type ModuleTemplate,
} from "@/lib/modules/templates";

// Featured templates to show in the hero section
const featuredTemplates: ModuleTemplate[] = [
    leadershipModules[0], // Leadership Fundamentals
    complianceModules[0], // HIPAA Essentials
    onboardingModules[0], // New Employee Orientation
    customerServiceModules[0], // Customer Service Excellence
    softSkillsModules[0], // Effective Communication
    complianceModules[3], // Information Security
];

interface GeneratedPreview {
    title: string;
    duration: string;
    objectives: string[];
    outline: string[];
    customContent: string;
}

export function HeroGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState<ModuleTemplate | null>(null);
    const [companyName, setCompanyName] = useState("");
    const [userContent, setUserContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [preview, setPreview] = useState<GeneratedPreview | null>(null);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const handleTemplateSelect = (template: ModuleTemplate) => {
        setSelectedTemplate(template);
        setPreview(null);
    };

    const handleGenerate = async () => {
        if (!selectedTemplate) return;

        setIsGenerating(true);
        setPreview(null);

        // Simulate AI generation delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate a preview based on the template and user content
        const generatedPreview: GeneratedPreview = {
            title: selectedTemplate.title,
            duration: `${selectedTemplate.estimatedDuration} min`,
            objectives: selectedTemplate.learningObjectives,
            outline: [
                "Introduction & Overview",
                ...selectedTemplate.learningObjectives.map((obj, i) => `Module ${i + 1}: ${obj.split(" ").slice(0, 4).join(" ")}...`),
                "Assessment & Certification",
            ],
            customContent: userContent
                ? `✨ Your content has been integrated: "${userContent.slice(0, 100)}${userContent.length > 100 ? "..." : ""}"`
                : "No custom content provided - using template defaults",
        };

        setPreview(generatedPreview);
        setIsGenerating(false);
    };

    const handleDownloadOrSave = () => {
        setShowAuthPrompt(true);
    };

    return (
        <div className="hero-generator">
            {/* Company Name */}
            <div className="mb-5">
                <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">1</span>
                    Your organization
                </label>
                <div className="relative mt-2">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter your company name"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Template Selection */}
            <div className="mb-5">
                <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">2</span>
                    Choose a training template
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {featuredTemplates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className={`hero-template-card ${selectedTemplate?.id === template.id ? "selected" : ""}`}
                        >
                            <span className="font-medium text-sm truncate">{template.title}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {template.estimatedDuration}m
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Input */}
            <div className="mb-5">
                <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">3</span>
                    Add your content <span className="text-muted-foreground/60 font-normal">(optional)</span>
                </label>
                <textarea
                    value={userContent}
                    onChange={(e) => setUserContent(e.target.value)}
                    placeholder="Paste your company policies, procedures, or any content you want to include..."
                    className="hero-content-input mt-2"
                    rows={2}
                />
            </div>

            {/* Generate Button */}
            <Button
                onClick={handleGenerate}
                disabled={!selectedTemplate || isGenerating}
                size="lg"
                className="w-full mb-5 text-base font-semibold"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating your training...
                    </>
                ) : (
                    <>
                        <Sparkles className="h-5 w-5" />
                        Generate Training Preview
                    </>
                )}
            </Button>

            {/* Preview Output */}
            {preview && (
                <div className="hero-preview animate-fade-in">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h4 className="font-semibold text-lg">{preview.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {preview.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5" />
                                    {selectedTemplate?.targetAudience[0]}
                                </span>
                            </div>
                        </div>
                        <Badge variant="success">Generated</Badge>
                    </div>

                    {/* Learning Objectives */}
                    <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2">Learning Objectives</h5>
                        <ul className="space-y-1.5">
                            {preview.objectives.map((obj, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    {obj}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Module Outline */}
                    <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2">Module Outline</h5>
                        <ul className="space-y-1">
                            {preview.outline.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Custom Content Preview */}
                    <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground mb-4">
                        {preview.customContent}
                    </div>

                    {/* Action Buttons - Trigger Auth */}
                    {showAuthPrompt ? (
                        <div className="p-5 border border-primary/20 rounded-xl bg-primary/5">
                            <p className="text-sm text-center mb-1 font-medium">
                                Ready to save your training?
                            </p>
                            <p className="text-xs text-muted-foreground text-center mb-4">
                                Create a free account to access your personalized dashboard
                            </p>
                            <div className="flex gap-2">
                                <Link href="/signup" className="flex-1">
                                    <Button className="w-full gap-2">
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/login" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-3">
                                No credit card required
                            </p>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={handleDownloadOrSave}>
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                            <Button className="flex-1" onClick={handleDownloadOrSave}>
                                <Save className="h-4 w-4" />
                                Save to Library
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
