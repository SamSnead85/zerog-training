"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
    Sparkles,
    Upload,
    FileText,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Clock,
    Users,
    BookOpen,
    Zap,
    Shield,
    Heart,
    Brain,
    Target,
    Scale,
    Laptop,
    Plus,
    X,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "select" | "customize" | "generating" | "preview";

interface PrebuiltModule {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    duration: string;
    sections: number;
}

interface GeneratedCourse {
    title: string;
    description: string;
    duration: string;
    modules: { title: string; duration: string; topics: string[] }[];
    audience: string;
    customized: boolean;
}

const prebuiltModules: PrebuiltModule[] = [
    { id: "cybersecurity", title: "Cybersecurity Awareness", description: "Phishing, passwords, data protection", icon: Shield, color: "text-blue-500", duration: "45 min", sections: 8 },
    { id: "hipaa", title: "HIPAA Compliance", description: "Healthcare privacy & PHI handling", icon: Heart, color: "text-red-500", duration: "60 min", sections: 10 },
    { id: "ai-tools", title: "AI Tools & Productivity", description: "ChatGPT, Copilot, prompting skills", icon: Brain, color: "text-emerald-500", duration: "35 min", sections: 6 },
    { id: "leadership", title: "Leadership Fundamentals", description: "Team management & communication", icon: Target, color: "text-purple-500", duration: "90 min", sections: 12 },
    { id: "data-privacy", title: "Data Privacy (GDPR/CCPA)", description: "Data protection regulations", icon: Scale, color: "text-amber-500", duration: "30 min", sections: 6 },
    { id: "remote-work", title: "Remote Work Excellence", description: "Productivity & collaboration", icon: Laptop, color: "text-cyan-500", duration: "25 min", sections: 5 },
];

export function HeroGenerator() {
    const [step, setStep] = useState<Step>("select");
    const [selectedModule, setSelectedModule] = useState<PrebuiltModule | null>(null);
    const [customPrompt, setCustomPrompt] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);
    const [isCustomMode, setIsCustomMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploadedFiles(Array.from(files));
        }
    };

    const handleSelectModule = (module: PrebuiltModule) => {
        setSelectedModule(module);
        setStep("customize");
    };

    const handleCustomMode = () => {
        setIsCustomMode(true);
        setSelectedModule(null);
        setStep("customize");
    };

    const handleGenerate = async () => {
        setStep("generating");

        // Simulate generation
        await new Promise((r) => setTimeout(r, 2500));

        if (selectedModule) {
            // Pre-built module with customization
            setGeneratedCourse({
                title: selectedModule.title,
                description: `Customized ${selectedModule.description.toLowerCase()} training tailored to your organization.`,
                duration: selectedModule.duration,
                audience: "All employees",
                customized: uploadedFiles.length > 0 || customPrompt.length > 0,
                modules: [
                    { title: "Introduction & Overview", duration: "10 min", topics: ["Why this matters", "Your organization's context"] },
                    { title: "Core Concepts", duration: "20 min", topics: ["Key principles", "Industry standards", "Best practices"] },
                    { title: "Practical Application", duration: "25 min", topics: ["Real scenarios", "Your policies", "Interactive exercises"] },
                    { title: "Assessment & Certification", duration: "15 min", topics: ["Knowledge check", "Certificate of completion"] },
                ],
            });
        } else {
            // Custom training
            setGeneratedCourse({
                title: customPrompt || "Custom Training Module",
                description: "Tailored training program based on your specific requirements and documentation.",
                duration: "45 min",
                audience: "All employees",
                customized: true,
                modules: [
                    { title: "Foundations", duration: "15 min", topics: ["Core concepts", "Your context"] },
                    { title: "Deep Dive", duration: "20 min", topics: ["Detailed content", "Best practices"] },
                    { title: "Practice & Assessment", duration: "10 min", topics: ["Exercises", "Quiz"] },
                ],
            });
        }

        setStep("preview");
    };

    const handleReset = () => {
        setStep("select");
        setSelectedModule(null);
        setCustomPrompt("");
        setUploadedFiles([]);
        setGeneratedCourse(null);
        setIsCustomMode(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Step 1: Select Module */}
            {step === "select" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Try it free</h3>
                            <p className="text-sm text-muted-foreground">Select a training or create your own</p>
                        </div>
                    </div>

                    {/* Pre-built Modules Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {prebuiltModules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <button
                                    key={module.id}
                                    onClick={() => handleSelectModule(module)}
                                    className="p-3 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/[0.02] transition-all text-left group"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon className={cn("h-4 w-4", module.color)} />
                                        <span className="font-medium text-sm">{module.title}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{module.description}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {module.duration}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Custom Option */}
                    <button
                        onClick={handleCustomMode}
                        className="w-full p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <Plus className="h-5 w-5" />
                        <span className="font-medium">Create Custom Training</span>
                    </button>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                        No sign up required • Customize with your docs
                    </p>
                </div>
            )}

            {/* Step 2: Customize */}
            {step === "customize" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {selectedModule ? (
                                <>
                                    <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", selectedModule.color)}>
                                        <selectedModule.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{selectedModule.title}</h3>
                                        <p className="text-xs text-muted-foreground">Customize for your organization</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Custom Training</h3>
                                        <p className="text-xs text-muted-foreground">Describe what you need</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <button onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Custom prompt */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {selectedModule ? "Additional requirements" : "What should this training cover?"}
                                {selectedModule && <span className="text-muted-foreground"> (optional)</span>}
                            </label>
                            <textarea
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder={selectedModule
                                    ? "e.g., Focus on our VPN policy, include IT contact info..."
                                    : "e.g., Train our sales team on the new CRM system..."
                                }
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                            />
                        </div>

                        {/* File upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Upload your docs <span className="text-muted-foreground">(optional)</span>
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileUpload}
                                multiple
                                accept=".pdf,.doc,.docx,.txt"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-20 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground"
                            >
                                {uploadedFiles.length > 0 ? (
                                    <>
                                        <FileText className="h-5 w-5 text-primary" />
                                        <span className="text-sm">{uploadedFiles.length} file(s) selected</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-5 w-5" />
                                        <span className="text-sm">Policies, handbooks, procedures...</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* What AI will do */}
                        {(uploadedFiles.length > 0 || customPrompt) && (
                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                                <p className="text-xs text-primary flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    AI will customize with your specific requirements
                                </p>
                            </div>
                        )}

                        {/* Generate */}
                        <Button
                            onClick={handleGenerate}
                            disabled={!selectedModule && !customPrompt.trim()}
                            size="lg"
                            className="w-full h-12 font-semibold"
                        >
                            <Zap className="h-5 w-5" />
                            Generate Training
                            <ArrowRight className="h-5 w-5 ml-auto" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Generating */}
            {step === "generating" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary/10">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Creating your training...</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Analyzing requirements
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Building interactive content
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: Preview */}
            {step === "preview" && generatedCourse && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                AI Generated
                            </span>
                            {generatedCourse.customized && (
                                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                                    Customized
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{generatedCourse.title}</h3>
                        <p className="text-sm text-muted-foreground">{generatedCourse.description}</p>

                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                {generatedCourse.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <BookOpen className="h-4 w-4" />
                                {generatedCourse.modules.length} modules
                            </span>
                        </div>
                    </div>

                    <div className="p-6">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            What's included
                        </p>
                        <div className="space-y-2">
                            {generatedCourse.modules.map((module, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                                    <div className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{module.title}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{module.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/10 bg-white/[0.01]">
                        <div className="flex gap-3">
                            <Link href="/signup" className="flex-1">
                                <Button className="w-full h-12 font-semibold">
                                    Deploy This Training
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={handleReset} className="h-12">
                                Try Another
                            </Button>
                        </div>
                        <p className="text-center text-xs text-muted-foreground mt-3">
                            Sign up free to deploy and track learner progress
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
