"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import {
    Link2,
    CheckCircle2,
    XCircle,
    Clock,
    Settings,
    ExternalLink,
    RefreshCw,
    Zap,
    Database,
    Users,
    Key,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type IntegrationStatus = "connected" | "disconnected" | "pending" | "error";
type IntegrationCategory = "hris" | "sso" | "lms" | "communication" | "analytics";

interface Integration {
    id: string;
    name: string;
    description: string;
    logo: string;
    category: IntegrationCategory;
    status: IntegrationStatus;
    lastSync?: string;
    usersSync?: number;
    isPopular: boolean;
}

const statusConfig: Record<IntegrationStatus, { label: string; color: string; icon: React.ElementType }> = {
    connected: { label: "Connected", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", icon: CheckCircle2 },
    disconnected: { label: "Not Connected", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: XCircle },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-500 border-amber-500/30", icon: Clock },
    error: { label: "Error", color: "bg-red-500/20 text-red-500 border-red-500/30", icon: XCircle },
};

const categoryConfig: Record<IntegrationCategory, { label: string; icon: React.ElementType }> = {
    hris: { label: "HRIS", icon: Users },
    sso: { label: "SSO", icon: Key },
    lms: { label: "LMS", icon: Database },
    communication: { label: "Communication", icon: Zap },
    analytics: { label: "Analytics", icon: Database },
};

const mockIntegrations: Integration[] = [
    { id: "1", name: "Okta", description: "Enterprise SSO and identity management", logo: "🔐", category: "sso", status: "connected", lastSync: "5 min ago", usersSync: 342, isPopular: true },
    { id: "2", name: "Workday", description: "HR management and user provisioning", logo: "👥", category: "hris", status: "connected", lastSync: "1 hour ago", usersSync: 450, isPopular: true },
    { id: "3", name: "Microsoft Entra ID", description: "Azure Active Directory SSO", logo: "🔷", category: "sso", status: "disconnected", isPopular: true },
    { id: "4", name: "BambooHR", description: "HR platform for small/medium business", logo: "🎋", category: "hris", status: "disconnected", isPopular: true },
    { id: "5", name: "Slack", description: "Notifications and learning reminders", logo: "💬", category: "communication", status: "connected", lastSync: "Just now", isPopular: true },
    { id: "6", name: "Microsoft Teams", description: "Meeting integrations and notifications", logo: "👥", category: "communication", status: "pending", isPopular: true },
    { id: "7", name: "Cornerstone OnDemand", description: "Learning management system", logo: "📚", category: "lms", status: "disconnected", isPopular: false },
    { id: "8", name: "SAP SuccessFactors", description: "Enterprise HR and talent management", logo: "💼", category: "hris", status: "disconnected", isPopular: false },
    { id: "9", name: "Google Workspace", description: "SSO and calendar integration", logo: "🔍", category: "sso", status: "connected", lastSync: "30 min ago", usersSync: 128, isPopular: true },
    { id: "10", name: "Tableau", description: "Advanced analytics and reporting", logo: "📊", category: "analytics", status: "disconnected", isPopular: false },
];

export function IntegrationHub() {
    const [integrations, setIntegrations] = useState(mockIntegrations);
    const [categoryFilter, setCategoryFilter] = useState<IntegrationCategory | "all">("all");

    const filtered = integrations.filter(i =>
        categoryFilter === "all" || i.category === categoryFilter
    );

    const connected = integrations.filter(i => i.status === "connected");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-primary" />
                        Integrations
                    </h2>
                    <p className="text-sm text-muted-foreground">Connect ZeroG with your enterprise tools</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    API Documentation
                </Button>
            </div>

            {/* Connected Summary */}
            <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <div className="font-medium">{connected.length} integrations connected</div>
                            <div className="text-sm text-muted-foreground">
                                {connected.reduce((acc, i) => acc + (i.usersSync || 0), 0)} users synced
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                        <RefreshCw className="h-4 w-4" />
                        Sync All
                    </Button>
                </div>
            </Card>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto">
                {(["all", "sso", "hris", "lms", "communication", "analytics"] as const).map((cat) => (
                    <Button
                        key={cat}
                        variant={categoryFilter === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategoryFilter(cat)}
                    >
                        {cat === "all" ? "All" : categoryConfig[cat].label}
                    </Button>
                ))}
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((integration) => {
                    const status = statusConfig[integration.status];
                    const cat = categoryConfig[integration.category];
                    const StatusIcon = status.icon;
                    const CatIcon = cat.icon;

                    return (
                        <Card
                            key={integration.id}
                            className={cn(
                                "p-4 transition-all cursor-pointer group",
                                integration.status === "connected" && "border-emerald-500/20",
                                integration.status !== "connected" && "hover:border-primary/30"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                                    {integration.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium">{integration.name}</h4>
                                        <Badge variant="outline" className={cn("text-xs", status.color)}>
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {status.label}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{integration.description}</p>

                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-xs">
                                            <CatIcon className="h-3 w-3 mr-1" />
                                            {cat.label}
                                        </Badge>
                                        {integration.lastSync && (
                                            <span className="text-xs text-muted-foreground">
                                                Synced {integration.lastSync}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-border flex justify-between">
                                {integration.status === "connected" ? (
                                    <>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Settings className="h-4 w-4" />
                                            Configure
                                        </Button>
                                        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                                            Disconnect
                                        </Button>
                                    </>
                                ) : (
                                    <Button size="sm" className="w-full gap-1">
                                        <Zap className="h-4 w-4" />
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
