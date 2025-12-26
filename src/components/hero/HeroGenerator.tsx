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
    Globe,
    Building2,
} from "lucide-react";

type Step = "input" | "generating" | "preview";

interface GeneratedCourse {
    title: string;
    description: string;
    duration: string;
    modules: { title: string; duration: string; topics: string[] }[];
    audience: string;
}

export function HeroGenerator() {
    const [step, setStep] = useState<Step>("input");
    const [topic, setTopic] = useState("");
    const [context, setContext] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setStep("generating");

        // Simulate AI generation (will be replaced with actual Gemini API call)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Mock generated course - in production, this comes from Gemini
        setGeneratedCourse({
            title: topic,
            description: `Comprehensive training program on ${topic}, customized for your organization's specific needs and context.`,
            duration: "4-6 hours",
            audience: "All employees",
            modules: [
                {
                    title: "Foundations & Core Concepts",
                    duration: "45 min",
                    topics: ["Key terminology", "Industry standards", "Best practices"],
                },
                {
                    title: "Practical Application",
                    duration: "60 min",
                    topics: ["Real-world scenarios", "Hands-on exercises", "Case studies"],
                },
                {
                    title: "Advanced Strategies",
                    duration: "45 min",
                    topics: ["Expert techniques", "Optimization methods", "Future trends"],
                },
                {
                    title: "Assessment & Certification",
                    duration: "30 min",
                    topics: ["Knowledge check", "Practical evaluation", "Certificate"],
                },
            ],
        });

        setStep("preview");
    };

    const handleReset = () => {
        setStep("input");
        setTopic("");
        setContext("");
        setUploadedFile(null);
        setGeneratedCourse(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {step === "input" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">AI Training Generator</h3>
                            <p className="text-sm text-muted-foreground">Create custom training in seconds</p>
                        </div>
                    </div>

                    {/* Topic Input */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                What do you want to train your team on?
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., HIPAA Compliance, Leadership Skills, Sales Techniques..."
                                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            />
                        </div>

                        {/* Context Input */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Organization context <span className="text-muted-foreground">(optional)</span>
                            </label>
                            <textarea
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                placeholder="Describe your industry, company size, or specific requirements..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Upload knowledge base <span className="text-muted-foreground">(optional)</span>
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileUpload}
                                accept=".pdf,.doc,.docx,.txt,.md"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-24 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                            >
                                {uploadedFile ? (
                                    <>
                                        <FileText className="h-6 w-6 text-primary" />
                                        <span className="text-sm">{uploadedFile.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-6 w-6" />
                                        <span className="text-sm">Drop files or click to upload</span>
                                        <span className="text-xs">PDF, Word, or text files</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            disabled={!topic.trim()}
                            size="lg"
                            className="w-full h-14 text-base font-semibold mt-2"
                        >
                            <Zap className="h-5 w-5" />
                            Generate Training Program
                            <ArrowRight className="h-5 w-5 ml-auto" />
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                            Powered by advanced AI • No credit card required
                        </p>
                    </div>
                </div>
            )}

            {step === "generating" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary/10">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Generating your training program...</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Analyzing best practices and creating customized content
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Analyzing topic
                        </span>
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Building curriculum
                        </span>
                    </div>
                </div>
            )}

            {step === "preview" && generatedCourse && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl animate-fade-in">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                    AI Generated
                                </div>
                            </div>
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
                            <span className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                {generatedCourse.audience}
                            </span>
                        </div>
                    </div>

                    {/* Modules */}
                    <div className="p-6">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            Course Structure
                        </p>
                        <div className="space-y-3">
                            {generatedCourse.modules.map((module, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-medium text-sm">{module.title}</h4>
                                            <span className="text-xs text-muted-foreground">{module.duration}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {module.topics.join(" • ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 border-t border-white/10 bg-white/[0.01]">
                        <div className="flex gap-3">
                            <Link href="/signup" className="flex-1">
                                <Button className="w-full h-12 font-semibold">
                                    Deploy This Training
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={handleReset} className="h-12">
                                Start Over
                            </Button>
                        </div>
                        <p className="text-center text-xs text-muted-foreground mt-3">
                            Free trial includes full customization and analytics
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
