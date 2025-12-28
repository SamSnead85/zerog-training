"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Shield,
    FileCheck,
    AlertTriangle,
    Calendar,
    Download,
    Filter,
    CheckCircle2,
    Clock,
    XCircle,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type ComplianceStatus = "compliant" | "due-soon" | "overdue" | "not-started";

interface ComplianceRequirement {
    id: string;
    name: string;
    category: string;
    dueDate: string;
    status: ComplianceStatus;
    completionRate: number;
    affectedUsers: number;
}

const statusConfig: Record<ComplianceStatus, { label: string; color: string; icon: React.ElementType }> = {
    compliant: { label: "Compliant", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", icon: CheckCircle2 },
    "due-soon": { label: "Due Soon", color: "bg-amber-500/20 text-amber-500 border-amber-500/30", icon: Clock },
    overdue: { label: "Overdue", color: "bg-red-500/20 text-red-500 border-red-500/30", icon: XCircle },
    "not-started": { label: "Not Started", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: AlertTriangle },
};

const mockRequirements: ComplianceRequirement[] = [
    { id: "1", name: "HIPAA Privacy Training", category: "Healthcare", dueDate: "Jan 15, 2025", status: "compliant", completionRate: 98, affectedUsers: 342 },
    { id: "2", name: "Cybersecurity Awareness", category: "Security", dueDate: "Dec 31, 2024", status: "due-soon", completionRate: 76, affectedUsers: 450 },
    { id: "3", name: "Harassment Prevention", category: "HR", dueDate: "Dec 15, 2024", status: "overdue", completionRate: 45, affectedUsers: 520 },
    { id: "4", name: "Data Privacy (GDPR)", category: "Compliance", dueDate: "Feb 1, 2025", status: "compliant", completionRate: 92, affectedUsers: 280 },
    { id: "5", name: "SOC 2 Awareness", category: "Security", dueDate: "Mar 1, 2025", status: "not-started", completionRate: 0, affectedUsers: 150 },
];

export function ComplianceTracker() {
    const [requirements, setRequirements] = useState(mockRequirements);

    const overallCompliance = Math.round(
        requirements.reduce((acc, req) => acc + req.completionRate, 0) / requirements.length
    );

    const statusCounts = requirements.reduce((acc, req) => {
        acc[req.status] = (acc[req.status] || 0) + 1;
        return acc;
    }, {} as Record<ComplianceStatus, number>);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Compliance Tracker
                    </h2>
                    <p className="text-sm text-muted-foreground">Monitor organization-wide compliance status</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="p-4 col-span-2">
                    <div className="text-sm text-muted-foreground mb-1">Overall Compliance</div>
                    <div className="text-3xl font-bold">{overallCompliance}%</div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all",
                                overallCompliance >= 90 ? "bg-emerald-500" : overallCompliance >= 70 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${overallCompliance}%` }}
                        />
                    </div>
                </Card>

                {Object.entries(statusCounts).map(([status, count]) => {
                    const config = statusConfig[status as ComplianceStatus];
                    const StatusIcon = config.icon;
                    return (
                        <Card key={status} className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <StatusIcon className={cn("h-4 w-4", config.color.split(" ")[1])} />
                                <span className="text-xs text-muted-foreground">{config.label}</span>
                            </div>
                            <div className="text-2xl font-bold">{count}</div>
                        </Card>
                    );
                })}
            </div>

            {/* Requirements list */}
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">Training Requirements</h3>
                </div>
                <div className="divide-y divide-border">
                    {requirements.map((req) => {
                        const config = statusConfig[req.status];
                        const StatusIcon = config.icon;
                        return (
                            <div key={req.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium">{req.name}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                                        <span>{req.category}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Due {req.dueDate}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {req.affectedUsers} users
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">{req.completionRate}%</div>
                                    <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${req.completionRate}%` }}
                                        />
                                    </div>
                                </div>
                                <Badge variant="outline" className={cn("text-xs", config.color)}>
                                    <StatusIcon className="h-3 w-3 mr-1" />
                                    {config.label}
                                </Badge>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
