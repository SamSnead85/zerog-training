"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Users,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    Settings,
    Play,
    Pause,
    Building2,
    Key,
    Calendar,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type SyncStatus = "connected" | "syncing" | "error" | "disconnected";
type ProviderType = "workday" | "bamboohr" | "adp" | "okta" | "azure_ad";

interface SCIMProvider {
    id: string;
    name: string;
    type: ProviderType;
    status: SyncStatus;
    lastSync?: string;
    nextSync?: string;
    usersTotal: number;
    usersActive: number;
    groupsSync: number;
    errorCount: number;
}

interface SyncLog {
    id: string;
    timestamp: string;
    action: "create" | "update" | "deactivate" | "group_sync";
    users: number;
    status: "success" | "partial" | "failed";
    details: string;
}

const statusConfig: Record<SyncStatus, { label: string; color: string; icon: React.ElementType }> = {
    connected: { label: "Connected", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", icon: CheckCircle2 },
    syncing: { label: "Syncing", color: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: RefreshCw },
    error: { label: "Error", color: "bg-red-500/20 text-red-500 border-red-500/30", icon: AlertTriangle },
    disconnected: { label: "Disconnected", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: XCircle },
};

const providerLogos: Record<ProviderType, string> = {
    workday: "🏢",
    bamboohr: "🎋",
    adp: "💼",
    okta: "🔐",
    azure_ad: "🔷",
};

const mockProviders: SCIMProvider[] = [
    { id: "1", name: "Workday HRIS", type: "workday", status: "connected", lastSync: "5 min ago", nextSync: "in 55 min", usersTotal: 456, usersActive: 423, groupsSync: 12, errorCount: 0 },
    { id: "2", name: "Okta Identity", type: "okta", status: "connected", lastSync: "2 min ago", nextSync: "in 58 min", usersTotal: 456, usersActive: 423, groupsSync: 8, errorCount: 0 },
    { id: "3", name: "BambooHR", type: "bamboohr", status: "disconnected", usersTotal: 0, usersActive: 0, groupsSync: 0, errorCount: 0 },
];

const mockLogs: SyncLog[] = [
    { id: "1", timestamp: "Dec 28, 2024 1:45 PM", action: "update", users: 3, status: "success", details: "Updated 3 user profiles from Workday" },
    { id: "2", timestamp: "Dec 28, 2024 1:40 PM", action: "group_sync", users: 45, status: "success", details: "Synced Engineering department (45 users)" },
    { id: "3", timestamp: "Dec 28, 2024 12:45 PM", action: "create", users: 2, status: "success", details: "Provisioned 2 new users from Okta" },
    { id: "4", timestamp: "Dec 28, 2024 11:45 AM", action: "deactivate", users: 1, status: "success", details: "Deactivated 1 user (offboarded in Workday)" },
    { id: "5", timestamp: "Dec 27, 2024 4:30 PM", action: "update", users: 156, status: "partial", details: "Updated 156 users, 3 failed due to missing email" },
];

export function SCIMProvisioning() {
    const [providers, setProviders] = useState(mockProviders);
    const [logs, setLogs] = useState(mockLogs);
    const [activeTab, setActiveTab] = useState<"providers" | "logs" | "mappings">("providers");

    const connectedProviders = providers.filter(p => p.status === "connected");
    const totalUsers = connectedProviders.reduce((acc, p) => acc + p.usersTotal, 0);

    const handleSync = (providerId: string) => {
        setProviders(prev => prev.map(p =>
            p.id === providerId ? { ...p, status: "syncing" as SyncStatus } : p
        ));
        setTimeout(() => {
            setProviders(prev => prev.map(p =>
                p.id === providerId ? { ...p, status: "connected" as SyncStatus, lastSync: "Just now" } : p
            ));
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        SCIM User Provisioning
                    </h2>
                    <p className="text-sm text-muted-foreground">Automatic user sync from HRIS and identity providers</p>
                </div>
                <Button className="gap-1">
                    <Settings className="h-4 w-4" />
                    Configure
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-500">{connectedProviders.length}</div>
                    <div className="text-sm text-muted-foreground">Connected Providers</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <div className="text-sm text-muted-foreground">Synced Users</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{connectedProviders.reduce((acc, p) => acc + p.groupsSync, 0)}</div>
                    <div className="text-sm text-muted-foreground">Groups/Depts</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{connectedProviders.reduce((acc, p) => acc + p.errorCount, 0)}</div>
                    <div className="text-sm text-muted-foreground">Sync Errors</div>
                </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border pb-2">
                {(["providers", "logs", "mappings"] as const).map((tab) => (
                    <Button key={tab} variant={activeTab === tab ? "default" : "ghost"} size="sm" onClick={() => setActiveTab(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                ))}
            </div>

            {/* Providers Tab */}
            {activeTab === "providers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providers.map((provider) => {
                        const status = statusConfig[provider.status];
                        const StatusIcon = status.icon;

                        return (
                            <Card key={provider.id} className={cn("p-4", provider.status === "connected" && "border-emerald-500/20")}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                                        {providerLogos[provider.type]}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold">{provider.name}</h4>
                                            <Badge variant="outline" className={cn("text-xs", status.color)}>
                                                <StatusIcon className={cn("h-3 w-3 mr-1", provider.status === "syncing" && "animate-spin")} />
                                                {status.label}
                                            </Badge>
                                        </div>

                                        {provider.status === "connected" && (
                                            <>
                                                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                                                    <div>
                                                        <span className="text-muted-foreground">Users: </span>
                                                        <span className="font-medium">{provider.usersActive} active</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Groups: </span>
                                                        <span className="font-medium">{provider.groupsSync}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        Last: {provider.lastSync}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        Next: {provider.nextSync}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div>
                                        {provider.status === "connected" ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-1"
                                                onClick={() => handleSync(provider.id)}
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                Sync
                                            </Button>
                                        ) : provider.status === "syncing" ? (
                                            <Button variant="outline" size="sm" className="gap-1" disabled>
                                                <RefreshCw className="h-3 w-3 animate-spin" />
                                                Syncing
                                            </Button>
                                        ) : (
                                            <Button variant="default" size="sm">Connect</Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}

                    {/* Add Provider Card */}
                    <Card className="p-4 border-dashed flex items-center justify-center min-h-[140px] cursor-pointer hover:border-primary/30 transition-colors">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2">
                                <Key className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">Connect HRIS or Identity Provider</p>
                        </div>
                    </Card>
                </div>
            )}

            {/* Logs Tab */}
            {activeTab === "logs" && (
                <Card className="overflow-hidden">
                    <div className="divide-y divide-border">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 flex items-center gap-4">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                    log.status === "success" && "bg-emerald-500/20 text-emerald-500",
                                    log.status === "partial" && "bg-amber-500/20 text-amber-500",
                                    log.status === "failed" && "bg-red-500/20 text-red-500"
                                )}>
                                    {log.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{log.details}</div>
                                    <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                                </div>
                                <Badge variant="outline" className="text-xs">{log.users} users</Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Mappings Tab */}
            {activeTab === "mappings" && (
                <Card className="p-6">
                    <h3 className="font-semibold mb-4">Attribute Mappings</h3>
                    <div className="space-y-3">
                        {[
                            { source: "workday.employee_id", target: "user.employee_id" },
                            { source: "workday.email", target: "user.email" },
                            { source: "workday.department", target: "user.department" },
                            { source: "workday.job_title", target: "user.role" },
                            { source: "workday.location", target: "user.location" },
                            { source: "workday.manager_id", target: "user.manager" },
                            { source: "workday.hire_date", target: "user.hire_date" },
                        ].map((mapping, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                                <code className="text-xs bg-muted px-2 py-1 rounded">{mapping.source}</code>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                <code className="text-xs bg-muted px-2 py-1 rounded">{mapping.target}</code>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
