"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Shield,
    AlertTriangle,
    CheckCircle2,
    Clock,
    XCircle,
    TrendingUp,
    TrendingDown,
    Download,
    Filter,
    Calendar,
    Users,
    FileText,
    ChevronRight,
    RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

type ComplianceStatus = "compliant" | "at_risk" | "non_compliant";

interface RegulationStatus {
    id: string;
    name: string;
    shortName: string;
    description: string;
    status: ComplianceStatus;
    completionRate: number;
    totalUsers: number;
    compliantUsers: number;
    overdueUsers: number;
    dueWithin7Days: number;
    lastUpdated: string;
    nextDeadline: string;
}

interface DepartmentCompliance {
    department: string;
    overallRate: number;
    trend: "up" | "down" | "stable";
    trendValue: number;
    regulations: { name: string; rate: number }[];
}

const statusConfig: Record<ComplianceStatus, { label: string; color: string; icon: React.ElementType }> = {
    compliant: { label: "Compliant", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", icon: CheckCircle2 },
    at_risk: { label: "At Risk", color: "bg-amber-500/20 text-amber-500 border-amber-500/30", icon: AlertTriangle },
    non_compliant: { label: "Non-Compliant", color: "bg-red-500/20 text-red-500 border-red-500/30", icon: XCircle },
};

const mockRegulations: RegulationStatus[] = [
    { id: "1", name: "HIPAA Privacy & Security", shortName: "HIPAA", description: "Healthcare data protection", status: "compliant", completionRate: 94, totalUsers: 450, compliantUsers: 423, overdueUsers: 8, dueWithin7Days: 19, lastUpdated: "2 hours ago", nextDeadline: "Jan 15, 2025" },
    { id: "2", name: "SOC 2 Security Awareness", shortName: "SOC2", description: "Security controls training", status: "at_risk", completionRate: 78, totalUsers: 320, compliantUsers: 250, overdueUsers: 24, dueWithin7Days: 46, lastUpdated: "1 hour ago", nextDeadline: "Jan 5, 2025" },
    { id: "3", name: "Workplace Harassment Prevention", shortName: "WHP", description: "Annual harassment training", status: "compliant", completionRate: 97, totalUsers: 520, compliantUsers: 504, overdueUsers: 3, dueWithin7Days: 13, lastUpdated: "30 min ago", nextDeadline: "Feb 1, 2025" },
    { id: "4", name: "GDPR Data Privacy", shortName: "GDPR", description: "EU data protection", status: "non_compliant", completionRate: 62, totalUsers: 180, compliantUsers: 112, overdueUsers: 45, dueWithin7Days: 23, lastUpdated: "4 hours ago", nextDeadline: "Dec 31, 2024" },
    { id: "5", name: "Cybersecurity Fundamentals", shortName: "CYBER", description: "Security awareness basics", status: "at_risk", completionRate: 81, totalUsers: 520, compliantUsers: 421, overdueUsers: 31, dueWithin7Days: 68, lastUpdated: "1 hour ago", nextDeadline: "Jan 10, 2025" },
];

const mockDepartments: DepartmentCompliance[] = [
    { department: "Engineering", overallRate: 89, trend: "up", trendValue: 3, regulations: [{ name: "SOC2", rate: 92 }, { name: "CYBER", rate: 85 }] },
    { department: "Healthcare", overallRate: 96, trend: "stable", trendValue: 0, regulations: [{ name: "HIPAA", rate: 98 }, { name: "WHP", rate: 94 }] },
    { department: "Sales", overallRate: 72, trend: "down", trendValue: -5, regulations: [{ name: "GDPR", rate: 65 }, { name: "WHP", rate: 79 }] },
    { department: "HR", overallRate: 98, trend: "up", trendValue: 2, regulations: [{ name: "WHP", rate: 100 }, { name: "HIPAA", rate: 96 }] },
    { department: "Finance", overallRate: 85, trend: "up", trendValue: 4, regulations: [{ name: "SOC2", rate: 88 }, { name: "CYBER", rate: 82 }] },
];

export function EnterpriseComplianceDashboard() {
    const [regulations, setRegulations] = useState(mockRegulations);
    const [departments, setDepartments] = useState(mockDepartments);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const totalOverdue = regulations.reduce((acc, r) => acc + r.overdueUsers, 0);
    const totalDueSoon = regulations.reduce((acc, r) => acc + r.dueWithin7Days, 0);
    const overallCompliance = Math.round(regulations.reduce((acc, r) => acc + r.completionRate, 0) / regulations.length);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Enterprise Compliance
                    </h2>
                    <p className="text-sm text-muted-foreground">Real-time compliance across all regulations</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleRefresh} disabled={isRefreshing}>
                        <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Overall Compliance</div>
                    <div className="text-3xl font-bold">{overallCompliance}%</div>
                    <Progress value={overallCompliance} className="h-1.5 mt-2" />
                </Card>
                <Card className="p-4 border-red-500/20">
                    <div className="text-sm text-muted-foreground mb-1">Overdue</div>
                    <div className="text-3xl font-bold text-red-500">{totalOverdue}</div>
                </Card>
                <Card className="p-4 border-amber-500/20">
                    <div className="text-sm text-muted-foreground mb-1">Due in 7 Days</div>
                    <div className="text-3xl font-bold text-amber-500">{totalDueSoon}</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Regulations</div>
                    <div className="text-3xl font-bold">{regulations.length}</div>
                </Card>
            </div>

            {/* Regulations */}
            <Card className="p-6">
                <h3 className="font-semibold mb-4">Regulation Status</h3>
                <div className="space-y-3">
                    {regulations.map((reg) => {
                        const status = statusConfig[reg.status];
                        return (
                            <div key={reg.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs", status.color)}>
                                    {reg.shortName}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{reg.name}</h4>
                                        <Badge variant="outline" className={cn("text-xs", status.color)}>{status.label}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{reg.compliantUsers}/{reg.totalUsers} compliant</p>
                                </div>
                                <div className="w-24">
                                    <div className="text-sm font-medium">{reg.completionRate}%</div>
                                    <Progress value={reg.completionRate} className="h-1.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Departments */}
            <Card className="p-6">
                <h3 className="font-semibold mb-4">By Department</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept) => (
                        <div key={dept.department} className="p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{dept.department}</h4>
                                {dept.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                                {dept.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                            </div>
                            <div className="text-2xl font-bold mb-2">{dept.overallRate}%</div>
                            <Progress value={dept.overallRate} className="h-1.5" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
