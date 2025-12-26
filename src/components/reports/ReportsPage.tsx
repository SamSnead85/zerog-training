"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    FileText,
    Download,
    Calendar,
    Filter,
    PieChart,
    BarChart3,
    TrendingUp,
    Users,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Printer,
    Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportCard {
    id: string;
    title: string;
    description: string;
    lastGenerated: string;
    type: "compliance" | "progress" | "audit";
}

const reportTypes: ReportCard[] = [
    { id: "compliance-summary", title: "Compliance Summary", description: "Overview of training compliance across all departments", lastGenerated: "Dec 25, 2024", type: "compliance" },
    { id: "overdue-training", title: "Overdue Training Report", description: "List of employees with overdue required training", lastGenerated: "Dec 26, 2024", type: "compliance" },
    { id: "completion-trends", title: "Completion Trends", description: "Training completion rates over time", lastGenerated: "Dec 24, 2024", type: "progress" },
    { id: "department-breakdown", title: "Department Breakdown", description: "Compliance status by department", lastGenerated: "Dec 26, 2024", type: "progress" },
    { id: "audit-trail", title: "Audit Trail", description: "Complete history of training activities", lastGenerated: "Dec 26, 2024", type: "audit" },
    { id: "certificate-log", title: "Certificate Log", description: "All certificates issued with verification details", lastGenerated: "Dec 25, 2024", type: "audit" },
];

interface ScheduledReport {
    id: string;
    name: string;
    frequency: "daily" | "weekly" | "monthly";
    recipients: string[];
    nextRun: string;
}

const scheduledReports: ScheduledReport[] = [
    { id: "1", name: "Weekly Compliance Summary", frequency: "weekly", recipients: ["hr@hospital.org", "compliance@hospital.org"], nextRun: "Dec 30, 2024" },
    { id: "2", name: "Monthly Executive Report", frequency: "monthly", recipients: ["exec@hospital.org"], nextRun: "Jan 1, 2025" },
    { id: "3", name: "Daily Overdue Alerts", frequency: "daily", recipients: ["managers@hospital.org"], nextRun: "Dec 27, 2024" },
];

export function ReportsPage() {
    const [activeTab, setActiveTab] = useState<"generate" | "scheduled">("generate");
    const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "compliance": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            case "progress": return <TrendingUp className="h-5 w-5 text-blue-500" />;
            case "audit": return <FileText className="h-5 w-5 text-purple-500" />;
            default: return <FileText className="h-5 w-5" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 className="h-7 w-7 text-primary" />
                        Reports & Analytics
                    </h1>
                    <p className="text-muted-foreground">
                        Generate compliance reports and track training metrics
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-border">
                <button
                    onClick={() => setActiveTab("generate")}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                        activeTab === "generate"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    Generate Reports
                </button>
                <button
                    onClick={() => setActiveTab("scheduled")}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                        activeTab === "scheduled"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    Scheduled Reports
                </button>
            </div>

            {activeTab === "generate" && (
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="p-4">
                            <div className="flex items-center gap-3">
                                <Users className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold">1,250</p>
                                    <p className="text-xs text-muted-foreground">Total Employees</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                                <div>
                                    <p className="text-2xl font-bold">89%</p>
                                    <p className="text-xs text-muted-foreground">Compliance Rate</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-8 w-8 text-amber-500" />
                                <div>
                                    <p className="text-2xl font-bold">127</p>
                                    <p className="text-xs text-muted-foreground">Overdue</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-8 w-8 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">24.5k</p>
                                    <p className="text-xs text-muted-foreground">Training Hours</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Date Range Filter */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Date Range:</span>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                className="h-9 px-3 rounded bg-muted border-0 text-sm"
                            />
                            <span className="text-muted-foreground">to</span>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                className="h-9 px-3 rounded bg-muted border-0 text-sm"
                            />
                            <Button variant="outline" size="sm" className="ml-auto gap-1">
                                <Filter className="h-3 w-3" />
                                More Filters
                            </Button>
                        </div>
                    </Card>

                    {/* Report Types */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reportTypes.map((report) => (
                            <Card
                                key={report.id}
                                className={cn(
                                    "p-6 cursor-pointer transition-all hover:border-primary/30",
                                    selectedReportType === report.id && "border-primary"
                                )}
                                onClick={() => setSelectedReportType(report.id)}
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    {getTypeIcon(report.type)}
                                    <div>
                                        <h3 className="font-semibold">{report.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {report.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                        Last: {report.lastGenerated}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Printer className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <div className="flex gap-3 justify-center">
                        <Button size="lg" className="gap-2" disabled={!selectedReportType}>
                            <Download className="h-5 w-5" />
                            Generate PDF Report
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2" disabled={!selectedReportType}>
                            <FileText className="h-5 w-5" />
                            Export to Excel
                        </Button>
                    </div>
                </div>
            )}

            {activeTab === "scheduled" && (
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">
                            Automated reports delivered to your inbox
                        </p>
                        <Button className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Schedule New Report
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {scheduledReports.map((report) => (
                            <Card key={report.id} className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{report.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {report.recipients.join(", ")}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="capitalize">
                                        {report.frequency}
                                    </Badge>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">Next: {report.nextRun}</p>
                                    </div>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
