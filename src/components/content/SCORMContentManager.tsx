"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Upload,
    FileArchive,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Play,
    Clock,
    BarChart3,
    Settings,
    Trash2,
    Eye,
    FolderOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

type SCORMVersion = "1.2" | "2004";
type ImportStatus = "ready" | "processing" | "completed" | "error";

interface SCORMPackage {
    id: string;
    name: string;
    version: SCORMVersion;
    status: ImportStatus;
    uploadedAt: string;
    size: string;
    scos: number;
    duration?: string;
    completions: number;
    averageScore?: number;
}

const statusConfig: Record<ImportStatus, { label: string; color: string; icon: React.ElementType }> = {
    ready: { label: "Ready", color: "bg-emerald-500/20 text-emerald-500", icon: CheckCircle2 },
    processing: { label: "Processing", color: "bg-blue-500/20 text-blue-500", icon: Clock },
    completed: { label: "Active", color: "bg-emerald-500/20 text-emerald-500", icon: CheckCircle2 },
    error: { label: "Error", color: "bg-red-500/20 text-red-500", icon: XCircle },
};

const mockPackages: SCORMPackage[] = [
    { id: "1", name: "Compliance Essentials 2024", version: "2004", status: "completed", uploadedAt: "Dec 20, 2024", size: "45 MB", scos: 8, duration: "2 hours", completions: 234, averageScore: 87 },
    { id: "2", name: "Cybersecurity Fundamentals", version: "1.2", status: "completed", uploadedAt: "Dec 15, 2024", size: "78 MB", scos: 12, duration: "4 hours", completions: 156, averageScore: 82 },
    { id: "3", name: "Data Privacy Masterclass", version: "2004", status: "completed", uploadedAt: "Dec 10, 2024", size: "52 MB", scos: 6, duration: "1.5 hours", completions: 89, averageScore: 91 },
    { id: "4", name: "Leadership Development", version: "1.2", status: "processing", uploadedAt: "Just now", size: "120 MB", scos: 0, completions: 0 },
    { id: "5", name: "Anti-Harassment Training", version: "2004", status: "error", uploadedAt: "Dec 25, 2024", size: "34 MB", scos: 0, completions: 0 },
];

export function SCORMContentManager() {
    const [packages, setPackages] = useState(mockPackages);
    const [isDragging, setIsDragging] = useState(false);

    const activePackages = packages.filter(p => p.status === "completed");
    const totalCompletions = activePackages.reduce((acc, p) => acc + p.completions, 0);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Mock upload
        const newPackage: SCORMPackage = {
            id: Date.now().toString(),
            name: "New SCORM Package",
            version: "2004",
            status: "processing",
            uploadedAt: "Just now",
            size: "0 MB",
            scos: 0,
            completions: 0,
        };
        setPackages(prev => [newPackage, ...prev]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileArchive className="h-5 w-5 text-primary" />
                        SCORM Content Manager
                    </h2>
                    <p className="text-sm text-muted-foreground">Import and manage SCORM 1.2 and 2004 packages</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-2xl font-bold">{activePackages.length}</div>
                    <div className="text-sm text-muted-foreground">Active Packages</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{activePackages.reduce((acc, p) => acc + p.scos, 0)}</div>
                    <div className="text-sm text-muted-foreground">Total SCOs</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{totalCompletions}</div>
                    <div className="text-sm text-muted-foreground">Completions</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">
                        {activePackages.length > 0
                            ? Math.round(activePackages.reduce((acc, p) => acc + (p.averageScore || 0), 0) / activePackages.length)
                            : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                </Card>
            </div>

            {/* Upload Zone */}
            <Card
                className={cn(
                    "p-8 border-dashed transition-colors",
                    isDragging && "border-primary bg-primary/5"
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Upload SCORM Package</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your .zip file here, or click to browse
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Browse Files
                        </Button>
                        <Badge variant="outline">SCORM 1.2</Badge>
                        <Badge variant="outline">SCORM 2004</Badge>
                    </div>
                </div>
            </Card>

            {/* Packages List */}
            <Card className="overflow-hidden">
                <div className="divide-y divide-border">
                    {packages.map((pkg) => {
                        const status = statusConfig[pkg.status];
                        const StatusIcon = status.icon;

                        return (
                            <div key={pkg.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    <FileArchive className="h-5 w-5 text-muted-foreground" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium truncate">{pkg.name}</h4>
                                        <Badge variant="outline" className="text-xs">SCORM {pkg.version}</Badge>
                                        <Badge variant="outline" className={cn("text-xs", status.color)}>
                                            <StatusIcon className={cn("h-3 w-3 mr-1", pkg.status === "processing" && "animate-spin")} />
                                            {status.label}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>{pkg.size}</span>
                                        {pkg.scos > 0 && <span>{pkg.scos} SCOs</span>}
                                        {pkg.duration && <span>{pkg.duration}</span>}
                                        <span>Uploaded {pkg.uploadedAt}</span>
                                    </div>
                                </div>

                                {pkg.status === "completed" && (
                                    <div className="text-right hidden md:block">
                                        <div className="text-sm">
                                            <span className="font-medium">{pkg.completions}</span>
                                            <span className="text-muted-foreground"> completions</span>
                                        </div>
                                        {pkg.averageScore && (
                                            <div className="text-xs text-muted-foreground">
                                                Avg score: {pkg.averageScore}%
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-1">
                                    {pkg.status === "completed" && (
                                        <>
                                            <Button variant="ghost" size="icon" title="Preview">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Analytics">
                                                <BarChart3 className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                    <Button variant="ghost" size="icon" title="Settings">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" title="Delete">
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
