"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import {
    Sparkles,
    ChevronRight,
    Clock,
    Users,
    Loader2,
    ArrowRight,
    Zap,
    CheckCircle2,
    Play,
} from "lucide-react";
import {
    leadershipModules,
    complianceModules,
    onboardingModules,
    customerServiceModules,
    softSkillsModules,
    type ModuleTemplate,
} from "@/lib/modules/templates";

// Featured templates with muted colors
const featuredTemplates = [
    { ...leadershipModules[0], color: "from-zinc-500/20 to-zinc-600/20", icon: "👔" },
    { ...complianceModules[0], color: "from-zinc-600/20 to-zinc-700/20", icon: "🏥" },
    { ...onboardingModules[0], color: "from-zinc-500/20 to-zinc-600/20", icon: "🎯" },
    { ...customerServiceModules[0], color: "from-zinc-600/20 to-zinc-700/20", icon: "💬" },
];

interface GeneratedPreview {
    title: string;
    duration: string;
    objectives: string[];
    modules: { title: string; duration: string }[];
}

export function HeroGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState<typeof featuredTemplates[0] | null>(null);
    const [step, setStep] = useState<"select" | "generating" | "preview">("select");
    const [preview, setPreview] = useState<GeneratedPreview | null>(null);

    const handleTemplateSelect = (template: typeof featuredTemplates[0]) => {
        setSelectedTemplate(template);
    };

    const handleGenerate = async () => {
        if (!selectedTemplate) return;

        setStep("generating");

        // Simulate AI generation
        await new Promise((resolve) => setTimeout(resolve, 2500));

        setPreview({
            title: selectedTemplate.title,
            duration: `${selectedTemplate.estimatedDuration} min`,
            objectives: selectedTemplate.learningObjectives.slice(0, 3),
            modules: [
                { title: "Introduction & Overview", duration: "5 min" },
                { title: "Core Concepts", duration: "15 min" },
                { title: "Practical Applications", duration: "20 min" },
                { title: "Assessment & Certification", duration: "10 min" },
            ],
        });

        setStep("preview");
    };

    const handleReset = () => {
        setSelectedTemplate(null);
        setPreview(null);
        setStep("select");
    };

    return (
        <div className="hero-generator">
            {step === "select" && (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <p className="text-muted-foreground text-sm">
                            Select a template to see the magic ✨
                        </p>
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {featuredTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => handleTemplateSelect(template)}
                                className={`group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 border ${selectedTemplate?.id === template.id
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                    }`}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-2xl">{template.icon}</span>
                                        {selectedTemplate?.id === template.id && (
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                        )}
                                    </div>
                                    <h3 className="font-medium text-sm leading-tight mb-1">
                                        {template.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {template.estimatedDuration} min
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <Button
                        onClick={handleGenerate}
                        disabled={!selectedTemplate}
                        size="lg"
                        className="w-full text-base font-semibold h-14"
                    >
                        <Zap className="h-5 w-5" />
                        Generate Training Preview
                        <ArrowRight className="h-5 w-5 ml-auto" />
                    </Button>
                </div>
            )}

            {step === "generating" && (
                <div className="py-12 text-center space-y-6">
                    <div className="relative mx-auto w-20 h-20">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary/10">
                            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-lg">Creating your training...</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Generating {selectedTemplate?.title}
                        </p>
                    </div>
                    <div className="flex justify-center gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {step === "preview" && preview && (
                <div className="space-y-5 animate-fade-in">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{selectedTemplate?.icon}</span>
                                <Badge variant="success" className="text-xs">Generated</Badge>
                            </div>
                            <h3 className="font-semibold text-lg">{preview.title}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {preview.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5" />
                                    All Employees
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Modules Preview */}
                    <div className="bg-black/20 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Course Outline
                        </p>
                        {preview.modules.map((module, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 text-primary text-xs font-semibold">
                                    {i + 1}
                                </div>
                                <span className="flex-1 text-sm">{module.title}</span>
                                <span className="text-xs text-muted-foreground">{module.duration}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-5 border border-primary/20">
                        <p className="text-sm mb-4">
                            <strong>Ready to deploy this training?</strong>
                            <br />
                            <span className="text-muted-foreground">Create an account to customize and launch.</span>
                        </p>
                        <div className="flex gap-3">
                            <Link href="/signup" className="flex-1">
                                <Button className="w-full gap-2">
                                    <Play className="h-4 w-4" />
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={handleReset}>
                                Try Another
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
