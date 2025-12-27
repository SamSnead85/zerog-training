"use client";

import { useState, useRef } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    AlertTriangle,
    Package,
    Loader2,
    ChevronRight,
    Download,
    Sparkles,
    FolderUp,
    FileText,
    Clock,
    Users,
    Zap,
    X,
    Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkModule {
    id: string;
    title: string;
    category: string;
    status: "pending" | "generating" | "complete" | "error";
    progress: number;
    errorMessage?: string;
}

interface BulkCreatorProps {
    onComplete?: (modules: BulkModule[]) => void;
}

const templateCategories = [
    { id: "compliance", name: "Compliance & Security", count: 15, icon: "🛡️" },
    { id: "healthcare", name: "Healthcare & Safety", count: 12, icon: "🏥" },
    { id: "leadership", name: "Leadership & Management", count: 10, icon: "👔" },
    { id: "technology", name: "Technology & AI", count: 18, icon: "🤖" },
    { id: "hr", name: "HR & Onboarding", count: 8, icon: "👥" },
    { id: "sales", name: "Sales & Customer Service", count: 6, icon: "💼" },
];

const sampleModules: BulkModule[] = [
    { id: "1", title: "Information Security Fundamentals", category: "Compliance", status: "complete", progress: 100 },
    { id: "2", title: "HIPAA Privacy Essentials", category: "Healthcare", status: "complete", progress: 100 },
    { id: "3", title: "Workplace Harassment Prevention", category: "HR", status: "generating", progress: 75 },
    { id: "4", title: "New Manager Orientation", category: "Leadership", status: "generating", progress: 45 },
    { id: "5", title: "Customer Service Excellence", category: "Sales", status: "pending", progress: 0 },
];

export function BulkModuleCreator({ onComplete }: BulkCreatorProps) {
    const [mode, setMode] = useState<"upload" | "template" | "processing">("upload");
    const [modules, setModules] = useState<BulkModule[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            // Simulate parsing
            setTimeout(() => {
                setModules(sampleModules);
            }, 500);
        }
    };

    const startBulkGeneration = () => {
        setMode("processing");
        setIsProcessing(true);

        // Simulate progressive generation
        let current = 0;
        const interval = setInterval(() => {
            setModules(prev => prev.map((mod, i) => {
                if (i === current && mod.status === "pending") {
                    return { ...mod, status: "generating", progress: 0 };
                }
                if (i === current && mod.status === "generating") {
                    const newProgress = Math.min(mod.progress + 20, 100);
                    if (newProgress === 100) {
                        current++;
                        return { ...mod, status: "complete", progress: 100 };
                    }
                    return { ...mod, progress: newProgress };
                }
                return mod;
            }));
        }, 500);

        setTimeout(() => {
            clearInterval(interval);
            setIsProcessing(false);
            setModules(prev => prev.map(mod => ({ ...mod, status: "complete", progress: 100 })));
        }, 8000);
    };

    const completedCount = modules.filter(m => m.status === "complete").length;
    const totalProgress = modules.length > 0 ? (modules.reduce((acc, m) => acc + m.progress, 0) / modules.length) : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        Bulk Module Creator
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Create multiple training modules at once from templates or CSV
                    </p>
                </div>
                <Badge variant="outline" className="gap-1">
                    <Zap className="h-3 w-3" />
                    Enterprise
                </Badge>
            </div>

            {mode === "upload" && (
                <>
                    {/* Upload Options */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* CSV Upload */}
                        <Card
                            className="p-6 hover:border-primary/30 transition-all cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">Upload CSV/Excel</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Import module definitions from a spreadsheet
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Columns: Title, Category, Description, Duration
                                    </p>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </Card>

                        {/* Template Selection */}
                        <Card
                            className="p-6 hover:border-primary/30 transition-all cursor-pointer group"
                            onClick={() => setMode("template")}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                    <FolderUp className="h-6 w-6 text-emerald-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">Use Template Pack</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Pre-built module collections by industry
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        69 templates across 6 categories
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Uploaded File Preview */}
                    {uploadedFile && modules.length > 0 && (
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium">{uploadedFile.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {modules.length} modules detected
                                        </p>
                                    </div>
                                </div>
                                <Button onClick={startBulkGeneration} className="gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Generate All ({modules.length})
                                </Button>
                            </div>

                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                {modules.map((mod) => (
                                    <div key={mod.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                                        <Badge variant="outline" className="text-xs">{mod.category}</Badge>
                                        <span className="text-sm">{mod.title}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </>
            )}

            {mode === "template" && (
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Select Template Pack</h3>
                        <Button variant="ghost" size="sm" onClick={() => setMode("upload")}>
                            ← Back
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {templateCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setModules(sampleModules.slice(0, cat.count > 5 ? 5 : cat.count));
                                    setMode("upload");
                                }}
                                className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all text-left"
                            >
                                <div className="text-2xl mb-2">{cat.icon}</div>
                                <p className="font-medium text-sm">{cat.name}</p>
                                <p className="text-xs text-muted-foreground">{cat.count} modules</p>
                            </button>
                        ))}
                    </div>
                </Card>
            )}

            {mode === "processing" && (
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold">Generating Modules</h3>
                            <p className="text-sm text-muted-foreground">
                                {completedCount} of {modules.length} complete
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</p>
                        </div>
                    </div>

                    <Progress value={totalProgress} className="h-2 mb-6" />

                    <div className="space-y-3">
                        {modules.map((mod) => (
                            <div key={mod.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    {mod.status === "complete" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                    {mod.status === "generating" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                                    {mod.status === "pending" && <Clock className="h-5 w-5 text-muted-foreground" />}
                                    {mod.status === "error" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{mod.title}</p>
                                    <p className="text-xs text-muted-foreground">{mod.category}</p>
                                </div>
                                {mod.status === "generating" && (
                                    <Progress value={mod.progress} className="w-24 h-1.5" />
                                )}
                                {mod.status === "complete" && (
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0">Complete</Badge>
                                )}
                            </div>
                        ))}
                    </div>

                    {!isProcessing && completedCount === modules.length && (
                        <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                <div>
                                    <p className="font-semibold text-emerald-700 dark:text-emerald-300">All modules generated!</p>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                        {modules.length} modules ready for deployment
                                    </p>
                                </div>
                            </div>
                            <Button className="gap-2">
                                <Download className="h-4 w-4" />
                                Export All
                            </Button>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
