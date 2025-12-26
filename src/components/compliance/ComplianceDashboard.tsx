"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Shield,
    CheckCircle2,
    AlertTriangle,
    FileText,
    Users,
    Clock,
    Download,
    Calendar,
    TrendingUp,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceStatus {
    category: string;
    status: "compliant" | "at_risk" | "non_compliant";
    completionRate: number;
    dueDate: string;
    assignedCount: number;
    completedCount: number;
}

interface ComplianceAlert {
    id: string;
    type: "warning" | "critical" | "info";
    message: string;
    affectedUsers: number;
    dueDate: string;
}

const complianceCategories: ComplianceStatus[] = [
    { category: "HIPAA Privacy & Security", status: "compliant", completionRate: 98, dueDate: "Dec 31, 2024", assignedCount: 1250, completedCount: 1225 },
    { category: "Infection Control", status: "compliant", completionRate: 95, dueDate: "Mar 15, 2025", assignedCount: 1250, completedCount: 1188 },
    { category: "Bloodborne Pathogens", status: "at_risk", completionRate: 78, dueDate: "Jan 15, 2025", assignedCount: 1250, completedCount: 975 },
    { category: "Fire Safety", status: "compliant", completionRate: 92, dueDate: "Feb 28, 2025", assignedCount: 1250, completedCount: 1150 },
    { category: "Workplace Violence Prevention", status: "at_risk", completionRate: 65, dueDate: "Jan 31, 2025", assignedCount: 1250, completedCount: 813 },
    { category: "Cultural Competency", status: "non_compliant", completionRate: 45, dueDate: "Dec 31, 2024", assignedCount: 1250, completedCount: 563 },
];

const alerts: ComplianceAlert[] = [
    { id: "1", type: "critical", message: "Cultural Competency training overdue for 687 employees", affectedUsers: 687, dueDate: "Overdue" },
    { id: "2", type: "warning", message: "Workplace Violence training due in 5 days", affectedUsers: 437, dueDate: "Jan 31, 2025" },
    { id: "3", type: "warning", message: "Bloodborne Pathogens renewal approaching", affectedUsers: 275, dueDate: "Jan 15, 2025" },
    { id: "4", type: "info", message: "New HIPAA regulations training available", affectedUsers: 0, dueDate: "Feb 1, 2025" },
];

export function ComplianceDashboard() {
    const [timeRange, setTimeRange] = useState("all");

    const overallCompliance = Math.round(
        complianceCategories.reduce((sum, c) => sum + c.completionRate, 0) / complianceCategories.length
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "compliant": return "text-emerald-500";
            case "at_risk": return "text-amber-500";
            case "non_compliant": return "text-red-500";
            default: return "text-muted-foreground";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "compliant":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Compliant</Badge>;
            case "at_risk":
                return <Badge className="bg-amber-500/10 text-amber-500">At Risk</Badge>;
            case "non_compliant":
                return <Badge className="bg-red-500/10 text-red-500">Non-Compliant</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case "critical": return <AlertCircle className="h-5 w-5 text-red-500" />;
            case "warning": return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            default: return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="h-7 w-7 text-primary" />
                        HIPAA Compliance Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Monitor training compliance across your organization
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                    <Button className="gap-2">
                        <FileText className="h-4 w-4" />
                        Generate Audit Report
                    </Button>
                </div>
            </div>

            {/* Overall Status */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6 col-span-2 md:col-span-1">
                    <div className="text-center">
                        <div className={cn(
                            "text-5xl font-bold mb-2",
                            overallCompliance >= 90 ? "text-emerald-500" :
                                overallCompliance >= 70 ? "text-amber-500" : "text-red-500"
                        )}>
                            {overallCompliance}%
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Compliance</p>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        <div>
                            <p className="text-2xl font-bold">
                                {complianceCategories.filter(c => c.status === "compliant").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Compliant</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-amber-500" />
                        <div>
                            <p className="text-2xl font-bold">
                                {complianceCategories.filter(c => c.status === "at_risk").length}
                            </p>
                            <p className="text-sm text-muted-foreground">At Risk</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                        <div>
                            <p className="text-2xl font-bold">
                                {complianceCategories.filter(c => c.status === "non_compliant").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Non-Compliant</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Alerts */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4">Compliance Alerts</h2>
                <div className="space-y-3">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={cn(
                                "p-4 rounded-lg flex items-center gap-4",
                                alert.type === "critical" && "bg-red-500/5 border border-red-500/20",
                                alert.type === "warning" && "bg-amber-500/5 border border-amber-500/20",
                                alert.type === "info" && "bg-blue-500/5 border border-blue-500/20"
                            )}
                        >
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                                <p className="font-medium text-sm">{alert.message}</p>
                                <p className="text-xs text-muted-foreground">
                                    {alert.affectedUsers > 0 && `${alert.affectedUsers} employees affected • `}
                                    {alert.dueDate}
                                </p>
                            </div>
                            <Button size="sm" variant="outline">
                                Take Action
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Compliance by Category */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4">Training Compliance by Category</h2>
                <div className="space-y-4">
                    {complianceCategories.map((category) => (
                        <div key={category.category} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-sm">{category.category}</span>
                                    {getStatusBadge(category.status)}
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-muted-foreground">
                                        {category.completedCount}/{category.assignedCount}
                                    </span>
                                    <span className={cn("font-medium", getStatusColor(category.status))}>
                                        {category.completionRate}%
                                    </span>
                                </div>
                            </div>
                            <Progress
                                value={category.completionRate}
                                className={cn(
                                    "h-2",
                                    category.status === "compliant" && "[&>div]:bg-emerald-500",
                                    category.status === "at_risk" && "[&>div]:bg-amber-500",
                                    category.status === "non_compliant" && "[&>div]:bg-red-500"
                                )}
                            />
                            <p className="text-xs text-muted-foreground">Due: {category.dueDate}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6">
                    <Users className="h-8 w-8 text-primary mb-3" />
                    <p className="text-3xl font-bold">1,250</p>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                </Card>
                <Card className="p-6">
                    <Clock className="h-8 w-8 text-primary mb-3" />
                    <p className="text-3xl font-bold">24.5k</p>
                    <p className="text-sm text-muted-foreground">Training Hours Completed</p>
                </Card>
                <Card className="p-6">
                    <Calendar className="h-8 w-8 text-primary mb-3" />
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Compliance Deadlines This Quarter</p>
                </Card>
            </div>
        </div>
    );
}
