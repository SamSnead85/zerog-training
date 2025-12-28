"use client";

/**
 * Webhooks Management Component
 * 
 * Configure webhooks for real-time event notifications.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Webhook,
    Plus,
    Trash2,
    Check,
    X,
    RefreshCw,
    Clock,
    AlertTriangle,
    Activity,
    ExternalLink,
    ChevronDown,
    ChevronRight,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type WebhookEvent =
    | "user.created"
    | "user.updated"
    | "user.deleted"
    | "course.completed"
    | "course.started"
    | "certificate.issued"
    | "quiz.completed"
    | "enrollment.created";

export interface WebhookEndpoint {
    id: string;
    url: string;
    name: string;
    events: WebhookEvent[];
    secret: string;
    status: "active" | "disabled" | "failing";
    createdAt: Date;
    lastTriggered?: Date;
    failureCount: number;
}

interface WebhooksManagementProps {
    webhooks: WebhookEndpoint[];
    onCreate: (webhook: Omit<WebhookEndpoint, "id" | "createdAt" | "status" | "failureCount">) => Promise<WebhookEndpoint>;
    onDelete: (id: string) => Promise<void>;
    onTest: (id: string) => Promise<{ success: boolean; statusCode: number }>;
    onToggle: (id: string, enabled: boolean) => Promise<void>;
    className?: string;
}

// =============================================================================
// AVAILABLE EVENTS
// =============================================================================

const availableEvents: { id: WebhookEvent; label: string; category: string }[] = [
    { id: "user.created", label: "User Created", category: "Users" },
    { id: "user.updated", label: "User Updated", category: "Users" },
    { id: "user.deleted", label: "User Deleted", category: "Users" },
    { id: "enrollment.created", label: "Enrollment Created", category: "Courses" },
    { id: "course.started", label: "Course Started", category: "Courses" },
    { id: "course.completed", label: "Course Completed", category: "Courses" },
    { id: "quiz.completed", label: "Quiz Completed", category: "Learning" },
    { id: "certificate.issued", label: "Certificate Issued", category: "Learning" },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function WebhooksManagement({
    webhooks,
    onCreate,
    onDelete,
    onTest,
    onToggle,
    className,
}: WebhooksManagementProps) {
    const [showCreate, setShowCreate] = useState(false);
    const [newWebhook, setNewWebhook] = useState({ name: "", url: "", events: [] as WebhookEvent[], secret: "" });
    const [creating, setCreating] = useState(false);

    const handleCreate = async () => {
        if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) return;

        setCreating(true);
        try {
            await onCreate(newWebhook);
            setNewWebhook({ name: "", url: "", events: [], secret: "" });
            setShowCreate(false);
        } finally {
            setCreating(false);
        }
    };

    const toggleEvent = (event: WebhookEvent) => {
        setNewWebhook((prev) => ({
            ...prev,
            events: prev.events.includes(event)
                ? prev.events.filter((e) => e !== event)
                : [...prev.events, event],
        }));
    };

    const generateSecret = () => {
        const secret = `whsec_${Array.from(crypto.getRandomValues(new Uint8Array(24)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")}`;
        setNewWebhook((prev) => ({ ...prev, secret }));
    };

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Webhooks</h2>
                    <p className="text-sm text-muted-foreground">
                        Receive real-time notifications when events happen
                    </p>
                </div>
                <Button onClick={() => setShowCreate(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook
                </Button>
            </div>

            {/* Create Form */}
            {showCreate && (
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-semibold mb-4">Add Webhook Endpoint</h3>

                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                                <Input
                                    value={newWebhook.name}
                                    onChange={(e) => setNewWebhook((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="e.g., Slack Notifications"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Endpoint URL</label>
                                <Input
                                    value={newWebhook.url}
                                    onChange={(e) => setNewWebhook((p) => ({ ...p, url: e.target.value }))}
                                    placeholder="https://your-server.com/webhooks"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Signing Secret</label>
                            <div className="flex gap-2">
                                <Input
                                    value={newWebhook.secret}
                                    onChange={(e) => setNewWebhook((p) => ({ ...p, secret: e.target.value }))}
                                    placeholder="whsec_..."
                                    className="font-mono"
                                />
                                <Button variant="outline" onClick={generateSecret}>
                                    Generate
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Events to send</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {availableEvents.map((event) => (
                                    <button
                                        key={event.id}
                                        onClick={() => toggleEvent(event.id)}
                                        className={cn(
                                            "p-2 rounded-lg border text-left text-sm transition-all",
                                            newWebhook.events.includes(event.id)
                                                ? "border-primary bg-primary/5"
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {newWebhook.events.includes(event.id) && (
                                                <Check className="h-3.5 w-3.5 text-primary" />
                                            )}
                                            <span>{event.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                            <Button variant="outline" onClick={() => setShowCreate(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreate}
                                disabled={!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0 || creating}
                            >
                                {creating ? "Creating..." : "Create Webhook"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Webhooks List */}
            <div className="space-y-3">
                {webhooks.map((webhook) => (
                    <WebhookCard
                        key={webhook.id}
                        webhook={webhook}
                        onDelete={onDelete}
                        onTest={onTest}
                        onToggle={onToggle}
                    />
                ))}
            </div>

            {/* Empty State */}
            {webhooks.length === 0 && !showCreate && (
                <div className="py-12 text-center border-2 border-dashed border-white/10 rounded-xl">
                    <Webhook className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-4">No webhooks configured</p>
                    <Button onClick={() => setShowCreate(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Webhook
                    </Button>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// WEBHOOK CARD
// =============================================================================

function WebhookCard({
    webhook,
    onDelete,
    onTest,
    onToggle,
}: {
    webhook: WebhookEndpoint;
    onDelete: (id: string) => Promise<void>;
    onTest: (id: string) => Promise<{ success: boolean; statusCode: number }>;
    onToggle: (id: string, enabled: boolean) => Promise<void>;
}) {
    const [expanded, setExpanded] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; statusCode: number } | null>(null);

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);
        try {
            const result = await onTest(webhook.id);
            setTestResult(result);
        } finally {
            setTesting(false);
        }
    };

    const statusColors = {
        active: "bg-emerald-500/20 text-emerald-400",
        disabled: "bg-gray-500/20 text-gray-400",
        failing: "bg-red-500/20 text-red-400",
    };

    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-4 p-4">
                <button onClick={() => setExpanded(!expanded)} className="p-1">
                    {expanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>

                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Webhook className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{webhook.name}</p>
                        <Badge className={statusColors[webhook.status]}>
                            {webhook.status.charAt(0).toUpperCase() + webhook.status.slice(1)}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{webhook.url}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleTest} disabled={testing}>
                        {testing ? (
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <>
                                <Activity className="h-3.5 w-3.5 mr-1" />
                                Test
                            </>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(webhook.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {testResult && (
                <div className={cn(
                    "mx-4 mb-4 p-3 rounded-lg text-sm",
                    testResult.success ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                )}>
                    {testResult.success ? (
                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Test successful (HTTP {testResult.statusCode})
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Test failed (HTTP {testResult.statusCode})
                        </span>
                    )}
                </div>
            )}

            {expanded && (
                <div className="px-4 pb-4 pt-2 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Created</p>
                            <p className="text-sm">{new Date(webhook.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Last triggered</p>
                            <p className="text-sm">{webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleDateString() : "Never"}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-2">Events</p>
                        <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event) => (
                                <span key={event} className="px-2 py-0.5 rounded bg-muted text-xs">
                                    {event}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WebhooksManagement;
