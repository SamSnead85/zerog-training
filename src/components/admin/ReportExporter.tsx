"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Download,
    FileText,
    FileSpreadsheet,
    Calendar,
    Filter,
    Clock,
    CheckCircle2,
    Loader2,
    Eye,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReportType = "compliance" | "progress" | "analytics" | "audit";
type ReportFormat = "pdf" | "csv" | "xlsx";
type ReportStatus = "ready" | "generating" | "scheduled";

interface Report {
    id: string;
    name: string;
    type: ReportType;
    format: ReportFormat;
    createdAt: string;
    size: string;
    status: ReportStatus;
    scheduledFor?: string;
}

const typeConfig: Record<ReportType, { label: string; color: string }> = {
    compliance: { label: "Compliance", color: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
    progress: { label: "Progress", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
    analytics: { label: "Analytics", color: "bg-purple-500/20 text-purple-500 border-purple-500/30" },
    audit: { label: "Audit", color: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
};

const mockReports: Report[] = [
    { id: "1", name: "Q4 2024 Compliance Summary", type: "compliance", format: "pdf", createdAt: "Dec 28, 2024", size: "2.4 MB", status: "ready" },
    { id: "2", name: "Team Progress Report - December", type: "progress", format: "xlsx", createdAt: "Dec 27, 2024", size: "1.8 MB", status: "ready" },
    { id: "3", name: "Learning Analytics Dashboard", type: "analytics", format: "pdf", createdAt: "Dec 25, 2024", size: "3.2 MB", status: "ready" },
    { id: "4", name: "HIPAA Training Completion", type: "compliance", format: "csv", createdAt: "Dec 24, 2024", size: "450 KB", status: "ready" },
    { id: "5", name: "Monthly Audit Log Export", type: "audit", format: "xlsx", createdAt: "Generating...", size: "-", status: "generating" },
    { id: "6", name: "Weekly Progress Summary", type: "progress", format: "pdf", createdAt: "Scheduled", size: "-", status: "scheduled", scheduledFor: "Every Monday at 9:00 AM" },
];

const reportTemplates = [
    { name: "Compliance Summary", description: "Overview of training compliance across departments", type: "compliance" as ReportType },
    { name: "Progress Report", description: "Detailed learner progress and completion rates", type: "progress" as ReportType },
    { name: "Analytics Export", description: "Full analytics data for custom analysis", type: "analytics" as ReportType },
    { name: "Audit Trail", description: "Complete system activity log", type: "audit" as ReportType },
];

export function ReportExporter() {
    const [reports, setReports] = useState(mockReports);
    const [typeFilter, setTypeFilter] = useState<ReportType | "all">("all");

    const filtered = reports.filter(r =>
        typeFilter === "all" || r.type === typeFilter
    );

    const handleGenerateReport = (type: ReportType) => {
        // Mock report generation
        const newReport: Report = {
            id: Date.now().toString(),
            name: `${typeConfig[type].label} Report - ${new Date().toLocaleDateString()}`,
            type,
            format: "pdf",
            createdAt: "Generating...",
            size: "-",
            status: "generating",
        };
        setReports(prev => [newReport, ...prev]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Download className="h-5 w-5 text-primary" />
                        Reports & Exports
                    </h2>
                    <p className="text-sm text-muted-foreground">Generate and download data reports</p>
                </div>
            </div>

            {/* Quick Generate */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {reportTemplates.map((template) => {
                    const type = typeConfig[template.type];
                    return (
                        <Card
                            key={template.name}
                            className="p-4 hover:border-primary/30 transition-all cursor-pointer group"
                            onClick={() => handleGenerateReport(template.type)}
                        >
                            <Badge variant="outline" className={cn("text-xs mb-2", type.color)}>
                                {type.label}
                            </Badge>
                            <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{template.name}</h4>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                        </Card>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {(["all", "compliance", "progress", "analytics", "audit"] as const).map((type) => (
                        <Button
                            key={type}
                            variant={typeFilter === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTypeFilter(type)}
                        >
                            {type === "all" ? "All Reports" : typeConfig[type].label}
                        </Button>
                    ))}
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    Schedule Report
                </Button>
            </div>

            {/* Reports List */}
            <Card className="overflow-hidden">
                <div className="divide-y divide-border">
                    {filtered.map((report) => {
                        const type = typeConfig[report.type];

                        return (
                            <div key={report.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors group">
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    {report.format === "pdf" ? (
                                        <FileText className="h-5 w-5 text-red-500" />
                                    ) : (
                                        <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">{report.name}</span>
                                        <Badge variant="outline" className={cn("text-xs", type.color)}>
                                            {type.label}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                                        <span className="uppercase text-xs">{report.format}</span>
                                        {report.size !== "-" && <span>•</span>}
                                        {report.size !== "-" && <span>{report.size}</span>}
                                        {report.scheduledFor && (
                                            <>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {report.scheduledFor}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    {report.status === "ready" && (
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            Ready
                                        </Badge>
                                    )}
                                    {report.status === "generating" && (
                                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                            Generating
                                        </Badge>
                                    )}
                                    {report.status === "scheduled" && (
                                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Scheduled
                                        </Badge>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    {report.status === "ready" && (
                                        <>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
