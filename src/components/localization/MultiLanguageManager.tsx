"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Languages,
    Globe,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Sparkles,
    Settings,
    Download,
    Upload,
    Edit2
} from "lucide-react";
import { cn } from "@/lib/utils";

type TranslationStatus = "complete" | "in_progress" | "pending" | "needs_review";

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    status: TranslationStatus;
    progress: number;
    courses: number;
    lastUpdated?: string;
    aiTranslated: number;
    humanReviewed: number;
}

const statusConfig: Record<TranslationStatus, { label: string; color: string; icon: React.ElementType }> = {
    complete: { label: "Complete", color: "bg-emerald-500/20 text-emerald-500", icon: CheckCircle2 },
    in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-500", icon: Clock },
    pending: { label: "Pending", color: "bg-slate-500/20 text-slate-400", icon: Clock },
    needs_review: { label: "Needs Review", color: "bg-amber-500/20 text-amber-500", icon: AlertTriangle },
};

const mockLanguages: Language[] = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", status: "complete", progress: 100, courses: 48, lastUpdated: "Dec 28, 2024", aiTranslated: 0, humanReviewed: 48 },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", status: "complete", progress: 100, courses: 48, lastUpdated: "Dec 27, 2024", aiTranslated: 40, humanReviewed: 48 },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", status: "complete", progress: 95, courses: 46, lastUpdated: "Dec 26, 2024", aiTranslated: 38, humanReviewed: 42 },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", status: "in_progress", progress: 78, courses: 38, lastUpdated: "Dec 25, 2024", aiTranslated: 35, humanReviewed: 28 },
    { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", status: "in_progress", progress: 65, courses: 32, lastUpdated: "Dec 24, 2024", aiTranslated: 30, humanReviewed: 18 },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", status: "needs_review", progress: 82, courses: 40, lastUpdated: "Dec 23, 2024", aiTranslated: 40, humanReviewed: 25 },
    { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", status: "in_progress", progress: 55, courses: 28, lastUpdated: "Dec 22, 2024", aiTranslated: 28, humanReviewed: 12 },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", status: "pending", progress: 0, courses: 0, aiTranslated: 0, humanReviewed: 0 },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", status: "pending", progress: 0, courses: 0, aiTranslated: 0, humanReviewed: 0 },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", status: "pending", progress: 0, courses: 0, aiTranslated: 0, humanReviewed: 0 },
];

export function MultiLanguageManager() {
    const [languages, setLanguages] = useState(mockLanguages);

    const completeLanguages = languages.filter(l => l.status === "complete").length;
    const inProgressLanguages = languages.filter(l => l.status === "in_progress" || l.status === "needs_review").length;
    const totalCourses = languages.reduce((acc, l) => acc + l.courses, 0);
    const aiTranslatedPercent = Math.round(
        (languages.reduce((acc, l) => acc + l.aiTranslated, 0) /
            languages.reduce((acc, l) => acc + l.courses, 0)) * 100
    ) || 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Languages className="h-5 w-5 text-primary" />
                        Multi-Language Content
                    </h2>
                    <p className="text-sm text-muted-foreground">AI-powered translation and localization management</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-4 w-4" />
                        Import
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-500">{completeLanguages}</div>
                    <div className="text-sm text-muted-foreground">Complete Languages</div>
                </Card>
                <Card className="p-4 border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-500">{inProgressLanguages}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{totalCourses}</div>
                    <div className="text-sm text-muted-foreground">Translated Courses</div>
                </Card>
                <Card className="p-4 border-primary/20">
                    <div className="flex items-center gap-1">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold text-primary">{aiTranslatedPercent}%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">AI Translated</div>
                </Card>
            </div>

            {/* AI Translation Banner */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-medium">AI Translation Engine</h4>
                            <p className="text-sm text-muted-foreground">
                                Automatically translate content to new languages with human review workflow
                            </p>
                        </div>
                    </div>
                    <Button>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Translate New Language
                    </Button>
                </div>
            </Card>

            {/* Languages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((lang) => {
                    const status = statusConfig[lang.status];
                    const StatusIcon = status.icon;

                    return (
                        <Card
                            key={lang.code}
                            className={cn(
                                "p-4",
                                lang.status === "complete" && "border-emerald-500/20",
                                lang.status === "pending" && "opacity-60"
                            )}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl">{lang.flag}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold">{lang.name}</h4>
                                        <Badge variant="outline" className={cn("text-xs", status.color)}>
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {status.label}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                                </div>
                            </div>

                            {lang.status !== "pending" && (
                                <>
                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>{lang.progress}% complete</span>
                                            <span className="text-muted-foreground">{lang.courses} courses</span>
                                        </div>
                                        <Progress value={lang.progress} className="h-1.5" />
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Sparkles className="h-3 w-3" />
                                            {lang.aiTranslated} AI translated
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                            {lang.humanReviewed} reviewed
                                        </span>
                                    </div>
                                </>
                            )}

                            <div className="flex gap-2">
                                {lang.status === "pending" ? (
                                    <Button size="sm" className="w-full gap-1">
                                        <Sparkles className="h-3 w-3" />
                                        Start Translation
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                                            <Edit2 className="h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Settings className="h-3 w-3" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
