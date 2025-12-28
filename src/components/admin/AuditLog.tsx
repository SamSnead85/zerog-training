"use client";

/**
 * Audit Log Component
 * 
 * Displays system audit trail with filtering,
 * search, and export capabilities.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Search,
    Filter,
    Download,
    ChevronDown,
    ChevronRight,
    User,
    Settings,
    FileText,
    Shield,
    AlertTriangle,
    Info,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type AuditAction =
    | "user.created"
    | "user.updated"
    | "user.deleted"
    | "user.login"
    | "user.logout"
    | "course.created"
    | "course.updated"
    | "course.published"
    | "course.deleted"
    | "settings.updated"
    | "permission.granted"
    | "permission.revoked"
    | "export.created"
    | "system.error";

export type AuditSeverity = "info" | "warning" | "error" | "critical";

export interface AuditLogEntry {
    id: string;
    action: AuditAction;
    severity: AuditSeverity;
    actor: {
        id: string;
        email: string;
        name: string;
    };
    target?: {
        type: string;
        id: string;
        name?: string;
    };
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    timestamp: Date;
}

interface AuditLogProps {
    entries: AuditLogEntry[];
    onExport: () => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
    className?: string;
}

// =============================================================================
// CONFIGS
// =============================================================================

const actionCategories: Record<string, { label: string; icon: React.ElementType }> = {
    user: { label: "User", icon: User },
    course: { label: "Course", icon: FileText },
    settings: { label: "Settings", icon: Settings },
    permission: { label: "Permission", icon: Shield },
    export: { label: "Export", icon: Download },
    system: { label: "System", icon: AlertTriangle },
};

const severityConfig: Record<AuditSeverity, { label: string; color: string; icon: React.ElementType }> = {
    info: { label: "Info", color: "bg-blue-500/20 text-blue-400", icon: Info },
    warning: { label: "Warning", color: "bg-amber-500/20 text-amber-400", icon: AlertTriangle },
    error: { label: "Error", color: "bg-red-500/20 text-red-400", icon: XCircle },
    critical: { label: "Critical", color: "bg-red-600/30 text-red-500", icon: AlertTriangle },
};

const actionLabels: Record<AuditAction, string> = {
    "user.created": "User Created",
    "user.updated": "User Updated",
    "user.deleted": "User Deleted",
    "user.login": "User Login",
    "user.logout": "User Logout",
    "course.created": "Course Created",
    "course.updated": "Course Updated",
    "course.published": "Course Published",
    "course.deleted": "Course Deleted",
    "settings.updated": "Settings Updated",
    "permission.granted": "Permission Granted",
    "permission.revoked": "Permission Revoked",
    "export.created": "Export Created",
    "system.error": "System Error",
};

// =============================================================================
// COMPONENT
// =============================================================================

export function AuditLog({
    entries,
    onExport,
    onLoadMore,
    hasMore,
    loading,
    className,
}: AuditLogProps) {
    const [search, setSearch] = useState("");
    const [severityFilter, setSeverityFilter] = useState<AuditSeverity | "all">("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredEntries = useMemo(() => {
        return entries.filter((entry) => {
            const searchLower = search.toLowerCase();
            const matchesSearch =
                entry.actor.name.toLowerCase().includes(searchLower) ||
                entry.actor.email.toLowerCase().includes(searchLower) ||
                actionLabels[entry.action].toLowerCase().includes(searchLower);
            const matchesSeverity = severityFilter === "all" || entry.severity === severityFilter;
            const category = entry.action.split(".")[0];
            const matchesCategory = categoryFilter === "all" || category === categoryFilter;
            return matchesSearch && matchesSeverity && matchesCategory;
        });
    }, [entries, search, severityFilter, categoryFilter]);

    return (
        <div className={cn("space-y-6", className)}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search logs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value as AuditSeverity | "all")}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                >
                    <option value="all">All Severities</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="critical">Critical</option>
                </select>

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                >
                    <option value="all">All Categories</option>
                    <option value="user">User</option>
                    <option value="course">Course</option>
                    <option value="settings">Settings</option>
                    <option value="permission">Permission</option>
                    <option value="system">System</option>
                </select>

                <Button variant="outline" onClick={onExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </div>

            {/* Log List */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="divide-y divide-border">
                    {filteredEntries.map((entry) => (
                        <AuditLogRow
                            key={entry.id}
                            entry={entry}
                            expanded={expandedId === entry.id}
                            onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                        />
                    ))}
                </div>

                {filteredEntries.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">
                        No audit logs found matching your filters.
                    </div>
                )}
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="text-center">
                    <Button variant="outline" onClick={onLoadMore} disabled={loading}>
                        {loading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// LOG ROW
// =============================================================================

function AuditLogRow({
    entry,
    expanded,
    onToggle,
}: {
    entry: AuditLogEntry;
    expanded: boolean;
    onToggle: () => void;
}) {
    const category = entry.action.split(".")[0];
    const categoryConfig = actionCategories[category] || actionCategories.system;
    const severity = severityConfig[entry.severity];
    const Icon = categoryConfig.icon;

    return (
        <div className="bg-white/[0.01]">
            <div
                className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] cursor-pointer"
                onClick={onToggle}
            >
                <button className="p-0.5">
                    {expanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>

                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{actionLabels[entry.action]}</p>
                    <p className="text-xs text-muted-foreground truncate">
                        {entry.actor.name} • {entry.actor.email}
                    </p>
                </div>

                <Badge className={severity.color}>{severity.label}</Badge>

                <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatTimestamp(entry.timestamp)}
                </div>
            </div>

            {expanded && (
                <div className="px-4 pb-4 pl-16 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground mb-1">Actor</p>
                            <p>{entry.actor.name}</p>
                            <p className="text-muted-foreground">{entry.actor.email}</p>
                        </div>
                        {entry.target && (
                            <div>
                                <p className="text-muted-foreground mb-1">Target</p>
                                <p>{entry.target.type}: {entry.target.name || entry.target.id}</p>
                            </div>
                        )}
                        {entry.ipAddress && (
                            <div>
                                <p className="text-muted-foreground mb-1">IP Address</p>
                                <p>{entry.ipAddress}</p>
                            </div>
                        )}
                    </div>
                    {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                        <div>
                            <p className="text-muted-foreground text-sm mb-1">Details</p>
                            <pre className="text-xs bg-muted/30 p-2 rounded overflow-x-auto">
                                {JSON.stringify(entry.metadata, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function formatTimestamp(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default AuditLog;
