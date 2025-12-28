"use client";

/**
 * API Keys Management Component
 * 
 * Create, revoke, and manage API keys for integrations.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Key,
    Plus,
    Copy,
    Trash2,
    Eye,
    EyeOff,
    Check,
    AlertTriangle,
    Clock,
    Activity,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface APIKey {
    id: string;
    name: string;
    prefix: string;
    key?: string; // Only shown once on creation
    scopes: string[];
    createdAt: Date;
    lastUsed?: Date;
    expiresAt?: Date;
    status: "active" | "expired" | "revoked";
}

interface APIKeysManagementProps {
    keys: APIKey[];
    onCreate: (name: string, scopes: string[]) => Promise<APIKey>;
    onRevoke: (keyId: string) => Promise<void>;
    className?: string;
}

// =============================================================================
// AVAILABLE SCOPES
// =============================================================================

const availableScopes = [
    { id: "read:users", label: "Read Users", description: "View user information" },
    { id: "write:users", label: "Write Users", description: "Create and update users" },
    { id: "read:courses", label: "Read Courses", description: "View course content" },
    { id: "write:courses", label: "Write Courses", description: "Create and update courses" },
    { id: "read:analytics", label: "Read Analytics", description: "Access analytics data" },
    { id: "admin", label: "Admin", description: "Full administrative access" },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function APIKeysManagement({ keys, onCreate, onRevoke, className }: APIKeysManagementProps) {
    const [showCreate, setShowCreate] = useState(false);
    const [newKeyName, setNewKeyName] = useState("");
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [creating, setCreating] = useState(false);
    const [newlyCreatedKey, setNewlyCreatedKey] = useState<APIKey | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCreate = async () => {
        if (!newKeyName.trim() || selectedScopes.length === 0) return;

        setCreating(true);
        try {
            const key = await onCreate(newKeyName.trim(), selectedScopes);
            setNewlyCreatedKey(key);
            setNewKeyName("");
            setSelectedScopes([]);
        } finally {
            setCreating(false);
        }
    };

    const copyKey = async (key: string) => {
        await navigator.clipboard.writeText(key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleScope = (scopeId: string) => {
        setSelectedScopes((prev) =>
            prev.includes(scopeId)
                ? prev.filter((s) => s !== scopeId)
                : [...prev, scopeId]
        );
    };

    const activeKeys = keys.filter((k) => k.status === "active");
    const inactiveKeys = keys.filter((k) => k.status !== "active");

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">API Keys</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage API keys for programmatic access
                    </p>
                </div>
                <Button onClick={() => setShowCreate(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Key
                </Button>
            </div>

            {/* Newly Created Key Alert */}
            {newlyCreatedKey && newlyCreatedKey.key && (
                <div className="p-4 rounded-xl border border-primary/50 bg-primary/5">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Key className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium mb-1">API Key Created</p>
                            <p className="text-sm text-muted-foreground mb-3">
                                Copy this key now. You won't be able to see it again.
                            </p>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border font-mono text-sm">
                                <span className="flex-1 truncate">{newlyCreatedKey.key}</span>
                                <button
                                    onClick={() => copyKey(newlyCreatedKey.key!)}
                                    className="p-1.5 rounded hover:bg-muted"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-emerald-400" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setNewlyCreatedKey(null)}
                            className="p-1 hover:bg-muted rounded"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Create Key Modal */}
            {showCreate && (
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-semibold mb-4">Create API Key</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Key Name</label>
                            <Input
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="e.g., Production Integration"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Scopes</label>
                            <div className="grid grid-cols-2 gap-2">
                                {availableScopes.map((scope) => (
                                    <button
                                        key={scope.id}
                                        onClick={() => toggleScope(scope.id)}
                                        className={cn(
                                            "p-3 rounded-lg border text-left transition-all",
                                            selectedScopes.includes(scope.id)
                                                ? "border-primary bg-primary/5"
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {selectedScopes.includes(scope.id) && (
                                                <Check className="h-3.5 w-3.5 text-primary" />
                                            )}
                                            <span className="font-medium text-sm">{scope.label}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{scope.description}</p>
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
                                disabled={!newKeyName.trim() || selectedScopes.length === 0 || creating}
                            >
                                {creating ? "Creating..." : "Create Key"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Keys */}
            {activeKeys.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Active Keys</h3>
                    {activeKeys.map((key) => (
                        <KeyCard key={key.id} apiKey={key} onRevoke={onRevoke} />
                    ))}
                </div>
            )}

            {/* Inactive Keys */}
            {inactiveKeys.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Revoked / Expired</h3>
                    {inactiveKeys.map((key) => (
                        <KeyCard key={key.id} apiKey={key} onRevoke={onRevoke} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {keys.length === 0 && !showCreate && (
                <div className="py-12 text-center border-2 border-dashed border-white/10 rounded-xl">
                    <Key className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-4">No API keys yet</p>
                    <Button onClick={() => setShowCreate(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Key
                    </Button>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// KEY CARD
// =============================================================================

function KeyCard({ apiKey, onRevoke }: { apiKey: APIKey; onRevoke: (id: string) => Promise<void> }) {
    const [revoking, setRevoking] = useState(false);

    const handleRevoke = async () => {
        setRevoking(true);
        try {
            await onRevoke(apiKey.id);
        } finally {
            setRevoking(false);
        }
    };

    const statusColors = {
        active: "bg-emerald-500/20 text-emerald-400",
        expired: "bg-amber-500/20 text-amber-400",
        revoked: "bg-red-500/20 text-red-400",
    };

    return (
        <div className={cn(
            "p-4 rounded-xl border bg-white/[0.02]",
            apiKey.status === "active" ? "border-white/10" : "border-white/5 opacity-60"
        )}>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Key className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{apiKey.name}</p>
                        <Badge className={statusColors[apiKey.status]}>
                            {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-mono">{apiKey.prefix}...••••</span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Created {formatDate(apiKey.createdAt)}
                        </span>
                        {apiKey.lastUsed && (
                            <span className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                Last used {formatDate(apiKey.lastUsed)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                        {apiKey.scopes.slice(0, 2).map((scope) => (
                            <span key={scope} className="px-2 py-0.5 rounded bg-muted text-xs">
                                {scope}
                            </span>
                        ))}
                        {apiKey.scopes.length > 2 && (
                            <span className="px-2 py-0.5 rounded bg-muted text-xs">
                                +{apiKey.scopes.length - 2}
                            </span>
                        )}
                    </div>

                    {apiKey.status === "active" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRevoke}
                            disabled={revoking}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

function formatDate(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default APIKeysManagement;
