"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Download,
    Package,
    FileArchive,
    CheckCircle2,
    ExternalLink,
    Settings2,
    BookOpen,
    Clock,
    Award,
    ChevronRight,
    Loader2,
    AlertTriangle,
    FileJson,
    Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportModule {
    id: string;
    title: string;
    sections: number;
    duration: string;
    selected: boolean;
}

interface ExportSettings {
    format: "scorm12" | "scorm2004" | "xapi" | "html";
    compression: "zip" | "none";
    includeAssets: boolean;
    includeQuizzes: boolean;
    lmsCompatibility: string;
}

const sampleModules: ExportModule[] = [
    { id: "1", title: "NIST Cybersecurity Framework 2.0", sections: 10, duration: "45 min", selected: true },
    { id: "2", title: "HIPAA Privacy Essentials", sections: 8, duration: "30 min", selected: true },
    { id: "3", title: "NATIVE Framework Training", sections: 12, duration: "60 min", selected: false },
    { id: "4", title: "Leadership Fundamentals", sections: 6, duration: "25 min", selected: false },
    { id: "5", title: "Workplace Harassment Prevention", sections: 5, duration: "20 min", selected: true },
];

const lmsOptions = [
    { id: "moodle", name: "Moodle", logo: "🎓" },
    { id: "cornerstone", name: "Cornerstone", logo: "🏢" },
    { id: "successfactors", name: "SAP SuccessFactors", logo: "📊" },
    { id: "workday", name: "Workday Learning", logo: "💼" },
    { id: "generic", name: "Generic LMS", logo: "📚" },
];

export function SCORMExporter() {
    const [modules, setModules] = useState<ExportModule[]>(sampleModules);
    const [settings, setSettings] = useState<ExportSettings>({
        format: "scorm2004",
        compression: "zip",
        includeAssets: true,
        includeQuizzes: true,
        lmsCompatibility: "generic",
    });
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [exportComplete, setExportComplete] = useState(false);

    const selectedModules = modules.filter(m => m.selected);
    const totalDuration = selectedModules.reduce((acc, m) => {
        const mins = parseInt(m.duration.replace(/\D/g, ""));
        return acc + mins;
    }, 0);

    const toggleModule = (id: string) => {
        setModules(prev => prev.map(m =>
            m.id === id ? { ...m, selected: !m.selected } : m
        ));
    };

    const startExport = () => {
        setIsExporting(true);
        setExportProgress(0);

        const interval = setInterval(() => {
            setExportProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsExporting(false);
                    setExportComplete(true);
                    return 100;
                }
                return prev + 5;
            });
        }, 200);
    };

    const formatLabels: Record<string, { name: string; version: string; desc: string }> = {
        scorm12: { name: "SCORM 1.2", version: "1.2", desc: "Widely supported, older LMS" },
        scorm2004: { name: "SCORM 2004", version: "4th Ed", desc: "Modern, sequencing support" },
        xapi: { name: "xAPI (Tin Can)", version: "1.0.3", desc: "Modern, mobile-friendly" },
        html: { name: "Standalone HTML", version: "", desc: "No LMS required" },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        SCORM/xAPI Export
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Export modules in industry-standard formats for your LMS
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Module Selection */}
                <Card className="lg:col-span-2 p-6">
                    <h3 className="font-semibold mb-4">Select Modules to Export</h3>

                    <div className="space-y-2 mb-4">
                        {modules.map((mod) => (
                            <button
                                key={mod.id}
                                onClick={() => toggleModule(mod.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 p-3 rounded-lg border transition-all text-left",
                                    mod.selected
                                        ? "border-primary/50 bg-primary/5"
                                        : "border-border hover:border-primary/30"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                    mod.selected
                                        ? "bg-primary border-primary"
                                        : "border-muted-foreground"
                                )}>
                                    {mod.selected && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{mod.title}</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="h-3 w-3" />
                                            {mod.sections} sections
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {mod.duration}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                        <span>{selectedModules.length} modules selected</span>
                        <span>Total duration: {totalDuration} min</span>
                    </div>
                </Card>

                {/* Export Settings */}
                <Card className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Settings2 className="h-4 w-4" />
                        Export Settings
                    </h3>

                    {/* Format Selection */}
                    <div className="mb-4">
                        <label className="text-sm text-muted-foreground mb-2 block">Format</label>
                        <div className="space-y-2">
                            {Object.entries(formatLabels).map(([key, { name, version, desc }]) => (
                                <button
                                    key={key}
                                    onClick={() => setSettings(s => ({ ...s, format: key as ExportSettings["format"] }))}
                                    className={cn(
                                        "w-full p-3 rounded-lg border text-left transition-all",
                                        settings.format === key
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{name}</span>
                                        {version && (
                                            <Badge variant="outline" className="text-[10px]">{version}</Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* LMS Target */}
                    <div className="mb-4">
                        <label className="text-sm text-muted-foreground mb-2 block">Target LMS</label>
                        <div className="grid grid-cols-3 gap-2">
                            {lmsOptions.map((lms) => (
                                <button
                                    key={lms.id}
                                    onClick={() => setSettings(s => ({ ...s, lmsCompatibility: lms.id }))}
                                    className={cn(
                                        "p-2 rounded-lg border text-center transition-all",
                                        settings.lmsCompatibility === lms.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <div className="text-lg mb-0.5">{lms.logo}</div>
                                    <p className="text-[10px]">{lms.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 mb-6">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={settings.includeAssets}
                                onChange={(e) => setSettings(s => ({ ...s, includeAssets: e.target.checked }))}
                                className="rounded border-border"
                            />
                            Include media assets
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={settings.includeQuizzes}
                                onChange={(e) => setSettings(s => ({ ...s, includeQuizzes: e.target.checked }))}
                                className="rounded border-border"
                            />
                            Include quizzes & assessments
                        </label>
                    </div>

                    {/* Export Button */}
                    {!exportComplete ? (
                        <Button
                            className="w-full gap-2"
                            disabled={selectedModules.length === 0 || isExporting}
                            onClick={startExport}
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Exporting... {exportProgress}%
                                </>
                            ) : (
                                <>
                                    <Download className="h-4 w-4" />
                                    Export {selectedModules.length} Modules
                                </>
                            )}
                        </Button>
                    ) : (
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Export Ready!</p>
                            </div>
                            <Button className="w-full gap-2">
                                <FileArchive className="h-4 w-4" />
                                Download ZIP (2.4 MB)
                            </Button>
                        </div>
                    )}

                    {isExporting && (
                        <Progress value={exportProgress} className="mt-3 h-1.5" />
                    )}
                </Card>
            </div>
        </div>
    );
}
