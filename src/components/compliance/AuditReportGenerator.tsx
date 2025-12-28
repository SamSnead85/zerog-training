"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    FileText,
    Download,
    Calendar,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Building2,
    Users,
    Filter,
    Search,
    Printer,
    Mail,
    XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReportType = "summary" | "detailed" | "individual" | "department" | "regulation";
type ReportFormat = "pdf" | "csv" | "xlsx";

interface AuditReport {
    id: string;
    name: string;
    type: ReportType;
    regulation?: string;
    dateRange: string;
    generatedAt: string;
    format: ReportFormat;
    size: string;
    records: number;
}

interface ComplianceRecord {
    id: string;
    employeeName: string;
    employeeId: string;
    department: string;
    courseName: string;
    regulation: string;
    completedAt: string;
    score: number;
    status: "passed" | "failed" | "expired";
    certificateId: string;
    dueDate: string;
}

const mockReports: AuditReport[] = [
    { id: "1", name: "Q4 2024 HIPAA Compliance Summary", type: "summary", regulation: "HIPAA", dateRange: "Oct 1 - Dec 31, 2024", generatedAt: "Dec 28, 2024 1:30 PM", format: "pdf", size: "2.4 MB", records: 423 },
    { id: "2", name: "Annual SOC2 Audit Report", type: "detailed", regulation: "SOC2", dateRange: "Jan 1 - Dec 31, 2024", generatedAt: "Dec 27, 2024 9:00 AM", format: "pdf", size: "5.8 MB", records: 1245 },
    { id: "3", name: "Engineering Dept Compliance", type: "department", dateRange: "Dec 1 - Dec 31, 2024", generatedAt: "Dec 26, 2024 4:15 PM", format: "xlsx", size: "890 KB", records: 89 },
    { id: "4", name: "All Employee Training Records", type: "detailed", dateRange: "Jan 1 - Dec 31, 2024", generatedAt: "Dec 25, 2024 11:00 AM", format: "csv", size: "12.3 MB", records: 4521 },
];

const mockRecords: ComplianceRecord[] = [
    { id: "1", employeeName: "Sarah Chen", employeeId: "EMP-001", department: "Engineering", courseName: "HIPAA Privacy & Security", regulation: "HIPAA", completedAt: "Dec 15, 2024", score: 92, status: "passed", certificateId: "CERT-2024-001", dueDate: "Dec 15, 2025" },
    { id: "2", employeeName: "Michael Brown", employeeId: "EMP-002", department: "Healthcare", courseName: "HIPAA Privacy & Security", regulation: "HIPAA", completedAt: "Dec 10, 2024", score: 88, status: "passed", certificateId: "CERT-2024-002", dueDate: "Dec 10, 2025" },
    { id: "3", employeeName: "Emily Rodriguez", employeeId: "EMP-003", department: "Sales", courseName: "GDPR Data Privacy", regulation: "GDPR", completedAt: "Nov 20, 2024", score: 75, status: "passed", certificateId: "CERT-2024-003", dueDate: "Nov 20, 2025" },
    { id: "4", employeeName: "David Kim", employeeId: "EMP-004", department: "Engineering", courseName: "SOC2 Security Awareness", regulation: "SOC2", completedAt: "Dec 1, 2024", score: 65, status: "failed", certificateId: "-", dueDate: "Dec 15, 2024" },
    { id: "5", employeeName: "Jennifer Lee", employeeId: "EMP-005", department: "HR", courseName: "Harassment Prevention", regulation: "WHP", completedAt: "Dec 20, 2024", score: 100, status: "passed", certificateId: "CERT-2024-005", dueDate: "Dec 20, 2025" },
    { id: "6", employeeName: "Robert Wilson", employeeId: "EMP-006", department: "Finance", courseName: "HIPAA Privacy & Security", regulation: "HIPAA", completedAt: "Oct 15, 2023", score: 85, status: "expired", certificateId: "CERT-2023-045", dueDate: "Oct 15, 2024" },
];

const statusConfig = {
    passed: { label: "Passed", color: "bg-emerald-500/20 text-emerald-500", icon: CheckCircle2 },
    failed: { label: "Failed", color: "bg-red-500/20 text-red-500", icon: XCircle },
    expired: { label: "Expired", color: "bg-amber-500/20 text-amber-500", icon: AlertTriangle },
};

export function AuditReportGenerator() {
    const [reports, setReports] = useState(mockReports);
    const [records, setRecords] = useState(mockRecords);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRegulation, setFilterRegulation] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<"generate" | "history" | "records">("generate");

    const filteredRecords = records.filter(r => {
        const matchesSearch = r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegulation = filterRegulation === "all" || r.regulation === filterRegulation;
        return matchesSearch && matchesRegulation;
    });

    const handleGenerateReport = (type: ReportType) => {
        // Mock report generation
        const newReport: AuditReport = {
            id: Date.now().toString(),
            name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
            type,
            dateRange: "Custom Range",
            generatedAt: new Date().toLocaleString(),
            format: "pdf",
            size: "Generating...",
            records: 0,
        };
        setReports(prev => [newReport, ...prev]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Audit Reports
                    </h2>
                    <p className="text-sm text-muted-foreground">Generate audit-ready compliance documentation</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border pb-2">
                {(["generate", "history", "records"] as const).map((tab) => (
                    <Button
                        key={tab}
                        variant={activeTab === tab ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                ))}
            </div>

            {/* Generate Report Tab */}
            {activeTab === "generate" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { type: "summary" as ReportType, title: "Compliance Summary", desc: "High-level overview for executives", icon: FileText },
                        { type: "detailed" as ReportType, title: "Detailed Audit Report", desc: "Complete records with timestamps", icon: FileText },
                        { type: "department" as ReportType, title: "Department Report", desc: "Compliance by department", icon: Building2 },
                        { type: "individual" as ReportType, title: "Individual Records", desc: "Export single employee records", icon: Users },
                        { type: "regulation" as ReportType, title: "Regulation Report", desc: "Status for specific regulation", icon: FileText },
                    ].map((item) => (
                        <Card
                            key={item.type}
                            className="p-4 hover:border-primary/30 transition-all cursor-pointer group"
                            onClick={() => handleGenerateReport(item.type)}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1 gap-1">
                                    <Download className="h-3 w-3" /> PDF
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 gap-1">
                                    <Download className="h-3 w-3" /> CSV
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
                <Card className="overflow-hidden">
                    <div className="divide-y divide-border">
                        {reports.map((report) => (
                            <div key={report.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    <FileText className={cn(
                                        "h-5 w-5",
                                        report.format === "pdf" ? "text-red-500" : "text-emerald-500"
                                    )} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{report.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {report.dateRange}
                                        <span>•</span>
                                        <span>{report.records} records</span>
                                    </div>
                                </div>
                                <div className="text-right text-sm">
                                    <div className="text-muted-foreground">{report.generatedAt}</div>
                                    <Badge variant="outline" className="text-xs">{report.format.toUpperCase()} • {report.size}</Badge>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon"><Mail className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Records Tab */}
            {activeTab === "records" && (
                <>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg border bg-card text-foreground"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "HIPAA", "SOC2", "GDPR", "WHP"].map((reg) => (
                                <Button
                                    key={reg}
                                    variant={filterRegulation === reg ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterRegulation(reg)}
                                >
                                    {reg === "all" ? "All" : reg}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Card className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="text-left p-3 text-sm font-medium">Employee</th>
                                    <th className="text-left p-3 text-sm font-medium">Course</th>
                                    <th className="text-left p-3 text-sm font-medium">Regulation</th>
                                    <th className="text-left p-3 text-sm font-medium">Completed</th>
                                    <th className="text-left p-3 text-sm font-medium">Score</th>
                                    <th className="text-left p-3 text-sm font-medium">Status</th>
                                    <th className="text-left p-3 text-sm font-medium">Certificate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.map((record) => {
                                    const status = statusConfig[record.status];
                                    const StatusIcon = status.icon;
                                    return (
                                        <tr key={record.id} className="border-b border-border hover:bg-muted/30">
                                            <td className="p-3">
                                                <div className="font-medium">{record.employeeName}</div>
                                                <div className="text-xs text-muted-foreground">{record.employeeId}</div>
                                            </td>
                                            <td className="p-3 text-sm">{record.courseName}</td>
                                            <td className="p-3">
                                                <Badge variant="outline" className="text-xs">{record.regulation}</Badge>
                                            </td>
                                            <td className="p-3 text-sm">{record.completedAt}</td>
                                            <td className="p-3 text-sm font-medium">{record.score}%</td>
                                            <td className="p-3">
                                                <Badge variant="outline" className={cn("text-xs", status.color)}>
                                                    <StatusIcon className="h-3 w-3 mr-1" />
                                                    {status.label}
                                                </Badge>
                                            </td>
                                            <td className="p-3 text-sm text-muted-foreground">{record.certificateId}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </>
            )}
        </div>
    );
}
