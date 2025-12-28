"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    FileText,
    Clock,
    User,
    Filter,
    Download,
    Search,
    Shield,
    Settings,
    Users,
    BookOpen,
    LogIn,
    LogOut,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    CheckCircle2,
    Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLogEntry {
    id: string;
    timestamp: string;
    user: {
        name: string;
        email: string;
        role: string;
    };
    action: string;
    category: "auth" | "content" | "users" | "settings" | "compliance";
    resource: string;
    details: string;
    ipAddress: string;
    severity: "info" | "warning" | "critical";
}

const mockAuditLogs: AuditLogEntry[] = [
    { id: "1", timestamp: "2024-12-27 14:32:15", user: { name: "John Smith", email: "john@company.com", role: "Admin" }, action: "user.login", category: "auth", resource: "Session", details: "Logged in via SSO", ipAddress: "192.168.1.1", severity: "info" },
    { id: "2", timestamp: "2024-12-27 14:28:00", user: { name: "Sarah Chen", email: "sarah@company.com", role: "Manager" }, action: "module.publish", category: "content", resource: "HIPAA Compliance Training", details: "Published new version 2.1", ipAddress: "192.168.1.45", severity: "info" },
    { id: "3", timestamp: "2024-12-27 14:15:30", user: { name: "John Smith", email: "john@company.com", role: "Admin" }, action: "user.role.update", category: "users", resource: "Emily Davis", details: "Changed role from Learner to Manager", ipAddress: "192.168.1.1", severity: "warning" },
    { id: "4", timestamp: "2024-12-27 13:45:00", user: { name: "System", email: "system", role: "System" }, action: "compliance.alert", category: "compliance", resource: "Annual Training", details: "5 users have overdue training", ipAddress: "—", severity: "critical" },
    { id: "5", timestamp: "2024-12-27 12:30:22", user: { name: "Mike Johnson", email: "mike@company.com", role: "Manager" }, action: "user.invite", category: "users", resource: "alex.new@company.com", details: "Invited new team member", ipAddress: "192.168.1.78", severity: "info" },
    { id: "6", timestamp: "2024-12-27 11:15:00", user: { name: "John Smith", email: "john@company.com", role: "Admin" }, action: "settings.sso.update", category: "settings", resource: "Okta SSO", details: "Updated SAML certificate", ipAddress: "192.168.1.1", severity: "warning" },
    { id: "7", timestamp: "2024-12-27 10:00:00", user: { name: "Sarah Chen", email: "sarah@company.com", role: "Manager" }, action: "module.delete", category: "content", resource: "Outdated Training v1", details: "Deleted archived module", ipAddress: "192.168.1.45", severity: "warning" },
];

const categoryIcons: Record<string, React.ElementType> = {
    auth: LogIn,
    content: BookOpen,
    users: Users,
    settings: Settings,
    compliance: Shield,
};

const actionIcons: Record<string, React.ElementType> = {
    "user.login": LogIn,
    "user.logout": LogOut,
    "user.invite": Users,
    "user.role.update": Edit,
    "module.publish": BookOpen,
    "module.delete": Trash2,
    "settings.sso.update": Settings,
    "compliance.alert": AlertTriangle,
};

export function AuditLog() {
    const [filter, setFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredLogs = mockAuditLogs.filter(log => {
        if (filter !== "all" && log.category !== filter) return false;
        if (searchQuery && !log.action.includes(searchQuery) && !log.user.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const getSeverityStyles = (severity: string) => {
        const styles = {
            info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
            warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
            critical: "bg-red-500/15 text-red-400 border-red-500/30",
        };
        return styles[severity as keyof typeof styles] || styles.info;
    };

    const getSeverityIcon = (severity: string) => {
        if (severity === "critical") return AlertTriangle;
        if (severity === "warning") return AlertTriangle;
        return Info;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <FileText className="h-7 w-7 text-primary" />
                        Audit Log
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Complete history of all system activities for compliance
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search actions, users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "auth", "content", "users", "settings", "compliance"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-sm capitalize transition-all",
                                    filter === cat
                                        ? "bg-primary/20 text-primary"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Log Entries */}
            <Card className="overflow-hidden bg-white/[0.02] border-white/10">
                <div className="divide-y divide-white/5">
                    {filteredLogs.map((log) => {
                        const ActionIcon = actionIcons[log.action] || FileText;
                        const SeverityIcon = getSeverityIcon(log.severity);
                        const CategoryIcon = categoryIcons[log.category];
                        return (
                            <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={cn(
                                        "p-2.5 rounded-xl flex-shrink-0",
                                        log.severity === "critical" ? "bg-red-500/20" :
                                            log.severity === "warning" ? "bg-amber-500/20" : "bg-white/5"
                                    )}>
                                        <ActionIcon className={cn(
                                            "h-5 w-5",
                                            log.severity === "critical" ? "text-red-400" :
                                                log.severity === "warning" ? "text-amber-400" : "text-muted-foreground"
                                        )} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium">{log.user.name}</span>
                                            <span className="text-muted-foreground">•</span>
                                            <code className="text-sm text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                                {log.action}
                                            </code>
                                            <Badge className={cn("text-xs ml-auto", getSeverityStyles(log.severity))}>
                                                {log.severity}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {log.details} — <span className="text-foreground">{log.resource}</span>
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {log.timestamp}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {log.user.email}
                                            </span>
                                            <span>IP: {log.ipAddress}</span>
                                            <Badge variant="outline" className="capitalize flex items-center gap-1">
                                                <CategoryIcon className="h-3 w-3" />
                                                {log.category}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-white/10 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {filteredLogs.length} of {mockAuditLogs.length} entries
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" disabled>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 bg-white/5 rounded text-sm">1</span>
                        <Button variant="outline" size="icon" disabled>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
