"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Clock,
    Search,
    Filter,
    Download,
    User,
    BookOpen,
    CheckCircle2,
    Shield,
    LogIn,
    FileText,
    AlertTriangle,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLogEntry {
    id: string;
    timestamp: string;
    userId: string;
    userName: string;
    action: string;
    category: "auth" | "training" | "compliance" | "admin" | "system";
    details: string;
    ipAddress: string;
    severity: "info" | "warning" | "critical";
}

const auditLogs: AuditLogEntry[] = [
    { id: "1", timestamp: "2024-12-26 11:15:32", userId: "usr_001", userName: "Sarah Chen", action: "course_completed", category: "training", details: "Completed 'HIPAA Privacy & Security 2024' with score 95%", ipAddress: "192.168.1.45", severity: "info" },
    { id: "2", timestamp: "2024-12-26 11:10:15", userId: "usr_002", userName: "Marcus Johnson", action: "login", category: "auth", details: "Successful login via SSO", ipAddress: "192.168.1.102", severity: "info" },
    { id: "3", timestamp: "2024-12-26 10:58:42", userId: "usr_003", userName: "Emily Rodriguez", action: "certificate_downloaded", category: "compliance", details: "Downloaded certificate for 'Bloodborne Pathogens'", ipAddress: "10.0.0.55", severity: "info" },
    { id: "4", timestamp: "2024-12-26 10:45:00", userId: "sys_admin", userName: "System", action: "bulk_assignment", category: "admin", details: "Created training assignment 'Fire Safety 2025' for 1250 employees", ipAddress: "127.0.0.1", severity: "info" },
    { id: "5", timestamp: "2024-12-26 10:30:22", userId: "usr_001", userName: "Sarah Chen", action: "failed_quiz", category: "training", details: "Failed quiz 'Advanced HIPAA Scenarios' (score: 65%)", ipAddress: "192.168.1.45", severity: "warning" },
    { id: "6", timestamp: "2024-12-26 10:15:18", userId: "usr_005", userName: "Robert Garcia", action: "permission_change", category: "admin", details: "Role changed from 'employee' to 'manager'", ipAddress: "10.0.0.12", severity: "warning" },
    { id: "7", timestamp: "2024-12-26 09:45:00", userId: "usr_008", userName: "Unknown", action: "failed_login", category: "auth", details: "5 failed login attempts - account temporarily locked", ipAddress: "203.45.67.89", severity: "critical" },
    { id: "8", timestamp: "2024-12-26 09:30:00", userId: "sys_admin", userName: "System", action: "report_generated", category: "compliance", details: "Generated 'Monthly Compliance Report' for December 2024", ipAddress: "127.0.0.1", severity: "info" },
];

export function AuditLog() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "auth": return <LogIn className="h-4 w-4" />;
            case "training": return <BookOpen className="h-4 w-4" />;
            case "compliance": return <Shield className="h-4 w-4" />;
            case "admin": return <User className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case "info":
                return <Badge variant="outline">Info</Badge>;
            case "warning":
                return <Badge className="bg-amber-500/10 text-amber-500">Warning</Badge>;
            case "critical":
                return <Badge className="bg-red-500/10 text-red-500">Critical</Badge>;
            default:
                return null;
        }
    };

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            auth: "bg-blue-500/10 text-blue-500",
            training: "bg-emerald-500/10 text-emerald-500",
            compliance: "bg-purple-500/10 text-purple-500",
            admin: "bg-amber-500/10 text-amber-500",
            system: "bg-zinc-500/10 text-zinc-500",
        };
        return <Badge className={colors[category] || ""}>{category}</Badge>;
    };

    const filteredLogs = auditLogs.filter((log) => {
        const matchesSearch =
            log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.details.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || log.category === selectedCategory;
        const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity;
        return matchesSearch && matchesCategory && matchesSeverity;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="h-7 w-7 text-primary" />
                        Audit Log
                    </h1>
                    <p className="text-muted-foreground">
                        Complete activity history for compliance and security
                    </p>
                </div>
                <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Log
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-wrap gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search logs..."
                            className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-10 px-3 rounded-lg bg-muted border-0"
                    >
                        <option value="all">All Categories</option>
                        <option value="auth">Authentication</option>
                        <option value="training">Training</option>
                        <option value="compliance">Compliance</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select
                        value={selectedSeverity}
                        onChange={(e) => setSelectedSeverity(e.target.value)}
                        className="h-10 px-3 rounded-lg bg-muted border-0"
                    >
                        <option value="all">All Severity</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
            </Card>

            {/* Log Entries */}
            <div className="space-y-2">
                {filteredLogs.map((log) => (
                    <Card
                        key={log.id}
                        className={cn(
                            "p-4",
                            log.severity === "critical" && "border-red-500/30",
                            log.severity === "warning" && "border-amber-500/30"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center",
                                log.severity === "critical" && "bg-red-500/10 text-red-500",
                                log.severity === "warning" && "bg-amber-500/10 text-amber-500",
                                log.severity === "info" && "bg-muted text-muted-foreground"
                            )}>
                                {getCategoryIcon(log.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{log.userName}</span>
                                    {getCategoryBadge(log.category)}
                                    {getSeverityBadge(log.severity)}
                                </div>
                                <p className="text-sm text-muted-foreground">{log.details}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>{log.timestamp}</span>
                                    <span>IP: {log.ipAddress}</span>
                                    <span>User ID: {log.userId}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center">
                <Button variant="outline" className="gap-2">
                    <ChevronDown className="h-4 w-4" />
                    Load More
                </Button>
            </div>
        </div>
    );
}
