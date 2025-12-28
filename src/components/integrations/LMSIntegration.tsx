"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Download,
    FileDown,
    Settings,
    Check,
    ChevronRight,
    BookOpen,
    PlayCircle,
    FileText,
    Package,
    Cloud,
    RefreshCw,
    ExternalLink,
    Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportConfig {
    format: "scorm12" | "scorm2004" | "xapi" | "cmi5";
    includeMedia: boolean;
    compressionLevel: "none" | "standard" | "max";
    completionCriteria: "passed" | "completed" | "any";
}

interface LMSConnection {
    id: string;
    name: string;
    type: string;
    status: "connected" | "disconnected" | "syncing";
    lastSync?: string;
    coursesPublished: number;
}

const lmsConnections: LMSConnection[] = [
    { id: "1", name: "Cornerstone OnDemand", type: "Enterprise LMS", status: "connected", lastSync: "2 hours ago", coursesPublished: 12 },
    { id: "2", name: "Workday Learning", type: "HCM Platform", status: "connected", lastSync: "1 day ago", coursesPublished: 8 },
    { id: "3", name: "SAP SuccessFactors", type: "Enterprise LMS", status: "disconnected", coursesPublished: 0 },
];

const exportFormats = [
    { id: "scorm12", name: "SCORM 1.2", desc: "Legacy standard, widest compatibility", icon: Package },
    { id: "scorm2004", name: "SCORM 2004", desc: "Enhanced sequencing and navigation", icon: Package },
    { id: "xapi", name: "xAPI (Tin Can)", desc: "Modern standard, detailed tracking", icon: Cloud },
    { id: "cmi5", name: "cmi5", desc: "xAPI profile for traditional LMS", icon: Cloud },
];

export function LMSIntegration() {
    const [selectedFormat, setSelectedFormat] = useState<string>("scorm2004");
    const [config, setConfig] = useState<ExportConfig>({
        format: "scorm2004",
        includeMedia: true,
        compressionLevel: "standard",
        completionCriteria: "passed",
    });
    const [exporting, setExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);

    const handleExport = async () => {
        setExporting(true);
        setExportProgress(0);

        // Simulate export process
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setExportProgress(i);
        }

        setExporting(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Package className="h-7 w-7 text-primary" />
                        LMS Integration
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Export courses to SCORM/xAPI and connect to your LMS
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* SCORM/xAPI Export */}
                <Card className="p-6 bg-white/[0.02] border-white/10">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileDown className="h-5 w-5 text-primary" />
                        Export Package
                    </h3>

                    {/* Format Selection */}
                    <div className="space-y-3 mb-6">
                        <label className="text-sm text-muted-foreground">Export Format</label>
                        <div className="grid grid-cols-2 gap-3">
                            {exportFormats.map((format) => {
                                const Icon = format.icon;
                                const isSelected = selectedFormat === format.id;
                                return (
                                    <button
                                        key={format.id}
                                        onClick={() => setSelectedFormat(format.id)}
                                        className={cn(
                                            "p-3 rounded-xl border text-left transition-all",
                                            isSelected
                                                ? "border-primary bg-primary/10"
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className="h-4 w-4 text-primary" />
                                            <span className="font-medium text-sm">{format.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{format.desc}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Export Options */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-sm">Include Media Files</p>
                                <p className="text-xs text-muted-foreground">Videos, images, and audio</p>
                            </div>
                            <button
                                onClick={() => setConfig({ ...config, includeMedia: !config.includeMedia })}
                                className={cn(
                                    "w-11 h-6 rounded-full transition-colors",
                                    config.includeMedia ? "bg-primary" : "bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded-full bg-white transition-transform mx-1",
                                    config.includeMedia && "translate-x-5"
                                )} />
                            </button>
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground">Completion Criteria</label>
                            <div className="flex gap-2 mt-2">
                                {["passed", "completed", "any"].map((criteria) => (
                                    <button
                                        key={criteria}
                                        onClick={() => setConfig({ ...config, completionCriteria: criteria as any })}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-sm capitalize transition-all",
                                            config.completionCriteria === criteria
                                                ? "bg-primary/20 text-primary"
                                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                        )}
                                    >
                                        {criteria}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Export Button */}
                    {exporting ? (
                        <div className="space-y-3">
                            <Progress value={exportProgress} className="h-2" />
                            <p className="text-sm text-center text-muted-foreground">
                                Generating package... {exportProgress}%
                            </p>
                        </div>
                    ) : (
                        <Button onClick={handleExport} className="w-full gap-2">
                            <Download className="h-4 w-4" />
                            Export {exportFormats.find(f => f.id === selectedFormat)?.name} Package
                        </Button>
                    )}
                </Card>

                {/* LMS Connections */}
                <Card className="p-6 bg-white/[0.02] border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Cloud className="h-5 w-5 text-primary" />
                            Connected LMS Platforms
                        </h3>
                        <Button variant="outline" size="sm">
                            Add Connection
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {lmsConnections.map((lms) => (
                            <div
                                key={lms.id}
                                className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold">{lms.name}</h4>
                                        <p className="text-xs text-muted-foreground">{lms.type}</p>
                                    </div>
                                    <Badge className={cn(
                                        "capitalize",
                                        lms.status === "connected" && "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                                        lms.status === "syncing" && "bg-blue-500/15 text-blue-400 border-blue-500/30",
                                        lms.status === "disconnected" && "bg-red-500/15 text-red-400 border-red-500/30"
                                    )}>
                                        {lms.status}
                                    </Badge>
                                </div>
                                {lms.status === "connected" && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {lms.coursesPublished} courses • Synced {lms.lastSync}
                                        </span>
                                        <Button variant="ghost" size="sm" className="gap-1 h-7">
                                            <RefreshCw className="h-3 w-3" />
                                            Sync
                                        </Button>
                                    </div>
                                )}
                                {lms.status === "disconnected" && (
                                    <Button variant="outline" size="sm" className="mt-2 w-full">
                                        Connect
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* xAPI Statement Preview */}
            <Card className="p-6 bg-white/[0.02] border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        xAPI Statement Preview
                    </h3>
                    <Badge variant="outline">Sample Data</Badge>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 font-mono text-xs overflow-x-auto">
                    <pre>{`{
  "actor": {
    "mbox": "mailto:learner@company.com",
    "name": "John Smith"
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/completed",
    "display": { "en-US": "completed" }
  },
  "object": {
    "id": "https://zerogtraining.com/modules/prompt-engineering-101",
    "definition": {
      "name": { "en-US": "Prompt Engineering Fundamentals" },
      "type": "http://adlnet.gov/expapi/activities/course"
    }
  },
  "result": {
    "score": { "scaled": 0.92 },
    "success": true,
    "completion": true,
    "duration": "PT45M30S"
  }
}`}</pre>
                </div>
            </Card>
        </div>
    );
}
