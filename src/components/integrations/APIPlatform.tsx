"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Code,
    Key,
    Copy,
    Eye,
    EyeOff,
    RefreshCw,
    Trash2,
    Plus,
    ChevronRight,
    Terminal,
    BookOpen,
    Zap,
    Shield,
    Clock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface APIKey {
    id: string;
    name: string;
    key: string;
    createdAt: string;
    lastUsed: string;
    permissions: string[];
    status: "active" | "revoked";
}

interface WebhookEndpoint {
    id: string;
    url: string;
    events: string[];
    status: "active" | "failing";
    lastDelivery?: string;
    successRate: number;
}

const mockAPIKeys: APIKey[] = [
    { id: "1", name: "Production API Key", key: "zg_live_sk_1234567890abcdef", createdAt: "Dec 15, 2024", lastUsed: "2 min ago", permissions: ["read", "write", "admin"], status: "active" },
    { id: "2", name: "Development Key", key: "zg_test_sk_0987654321fedcba", createdAt: "Dec 20, 2024", lastUsed: "1 day ago", permissions: ["read", "write"], status: "active" },
];

const mockWebhooks: WebhookEndpoint[] = [
    { id: "1", url: "https://api.yourapp.com/webhooks/zerog", events: ["module.completed", "user.enrolled"], status: "active", lastDelivery: "5 min ago", successRate: 100 },
    { id: "2", url: "https://slack.com/api/webhooks/training", events: ["achievement.earned"], status: "active", lastDelivery: "1 hour ago", successRate: 98 },
];

const apiEndpoints = [
    { method: "GET", path: "/api/v1/modules", description: "List all training modules" },
    { method: "GET", path: "/api/v1/modules/:id", description: "Get a specific module" },
    { method: "POST", path: "/api/v1/enrollments", description: "Enroll user in a module" },
    { method: "GET", path: "/api/v1/progress/:userId", description: "Get user progress" },
    { method: "POST", path: "/api/v1/completions", description: "Record module completion" },
    { method: "GET", path: "/api/v1/analytics/team", description: "Team analytics data" },
];

const webhookEvents = [
    "module.completed",
    "module.started",
    "user.enrolled",
    "user.progress",
    "achievement.earned",
    "certificate.issued",
    "assessment.passed",
    "assessment.failed",
];

export function APIPlatform() {
    const [showKey, setShowKey] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"keys" | "webhooks" | "docs">("keys");

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const toggleKeyVisibility = (id: string) => {
        setShowKey({ ...showKey, [id]: !showKey[id] });
    };

    const maskKey = (key: string) => {
        return key.substring(0, 12) + "•".repeat(20);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Code className="h-7 w-7 text-primary" />
                        API Platform
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Integrate ZeroG Training with your applications
                    </p>
                </div>
                <Button className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    API Documentation
                </Button>
            </div>

            {/* API Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: "API Calls Today", value: "12,847", icon: Zap, color: "blue" },
                    { label: "Success Rate", value: "99.9%", icon: CheckCircle2, color: "emerald" },
                    { label: "Avg Response", value: "45ms", icon: Clock, color: "amber" },
                    { label: "Active Keys", value: "2", icon: Key, color: "purple" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className="p-4 bg-white/[0.02] border-white/10">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                                stat.color === "blue" && "bg-blue-500/20",
                                stat.color === "emerald" && "bg-emerald-500/20",
                                stat.color === "amber" && "bg-amber-500/20",
                                stat.color === "purple" && "bg-purple-500/20"
                            )}>
                                <Icon className={cn(
                                    "h-5 w-5",
                                    stat.color === "blue" && "text-blue-400",
                                    stat.color === "emerald" && "text-emerald-400",
                                    stat.color === "amber" && "text-amber-400",
                                    stat.color === "purple" && "text-purple-400"
                                )} />
                            </div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </Card>
                    );
                })}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
                {[
                    { id: "keys", label: "API Keys", icon: Key },
                    { id: "webhooks", label: "Webhooks", icon: Zap },
                    { id: "docs", label: "Endpoints", icon: Terminal },
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                                activeTab === tab.id
                                    ? "bg-white/10 text-white"
                                    : "text-muted-foreground hover:text-white"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* API Keys Tab */}
            {activeTab === "keys" && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create API Key
                        </Button>
                    </div>

                    {mockAPIKeys.map((apiKey) => (
                        <Card key={apiKey.id} className="p-5 bg-white/[0.02] border-white/10">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2">
                                        {apiKey.name}
                                        <Badge className={cn(
                                            apiKey.status === "active"
                                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                                : "bg-red-500/15 text-red-400 border-red-500/30"
                                        )}>
                                            {apiKey.status}
                                        </Badge>
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Created {apiKey.createdAt} • Last used {apiKey.lastUsed}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                                        {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/10">
                                <code className="flex-1 font-mono text-sm">
                                    {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                                </code>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                    className="gap-1"
                                >
                                    {copied === apiKey.id ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied === apiKey.id ? "Copied" : "Copy"}
                                </Button>
                            </div>

                            <div className="flex gap-2 mt-3">
                                {apiKey.permissions.map((perm) => (
                                    <Badge key={perm} variant="outline" className="text-xs capitalize">
                                        {perm}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Webhooks Tab */}
            {activeTab === "webhooks" && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Webhook
                        </Button>
                    </div>

                    {mockWebhooks.map((webhook) => (
                        <Card key={webhook.id} className="p-5 bg-white/[0.02] border-white/10">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <code className="text-sm font-mono">{webhook.url}</code>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            {webhook.status === "active" ? (
                                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                            ) : (
                                                <AlertCircle className="h-3 w-3 text-red-400" />
                                            )}
                                            {webhook.successRate}% success
                                        </span>
                                        <span>Last delivery: {webhook.lastDelivery}</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Test</Button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {webhook.events.map((event) => (
                                    <Badge key={event} variant="outline" className="text-xs">
                                        {event}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}

                    {/* Available Events */}
                    <Card className="p-5 bg-white/[0.02] border-white/10">
                        <h4 className="font-semibold mb-3">Available Webhook Events</h4>
                        <div className="flex gap-2 flex-wrap">
                            {webhookEvents.map((event) => (
                                <Badge key={event} variant="outline" className="text-xs">
                                    {event}
                                </Badge>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* API Docs Tab */}
            {activeTab === "docs" && (
                <Card className="overflow-hidden bg-white/[0.02] border-white/10">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="font-semibold">REST API Endpoints</h3>
                        <p className="text-sm text-muted-foreground">Base URL: https://api.zerogtraining.com</p>
                    </div>
                    <div className="divide-y divide-white/5">
                        {apiEndpoints.map((endpoint, i) => (
                            <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <Badge className={cn(
                                        "w-16 justify-center",
                                        endpoint.method === "GET" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
                                        endpoint.method === "POST" && "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    )}>
                                        {endpoint.method}
                                    </Badge>
                                    <code className="font-mono text-sm flex-1">{endpoint.path}</code>
                                    <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
