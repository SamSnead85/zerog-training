"use client";

/**
 * LMS Integration Component
 * 
 * Configure integrations with external LMS platforms
 * including SCORM, xAPI, and third-party systems.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Blocks,
    Check,
    ExternalLink,
    RefreshCw,
    Settings,
    AlertTriangle,
    Plug,
    Link2,
    Unplug,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type IntegrationType = "scorm" | "xapi" | "lti" | "custom";

export interface LMSIntegration {
    id: string;
    name: string;
    type: IntegrationType;
    status: "connected" | "disconnected" | "error";
    config: {
        endpoint?: string;
        apiKey?: string;
        lrsEndpoint?: string;
        clientId?: string;
        secret?: string;
    };
    lastSync?: Date;
    syncEnabled: boolean;
}

interface LMSIntegrationProps {
    integrations: LMSIntegration[];
    onConnect: (type: IntegrationType, config: LMSIntegration["config"]) => Promise<LMSIntegration>;
    onDisconnect: (id: string) => Promise<void>;
    onSync: (id: string) => Promise<void>;
    onUpdate: (id: string, config: Partial<LMSIntegration["config"]>) => Promise<void>;
    className?: string;
}

// =============================================================================
// INTEGRATION CONFIG
// =============================================================================

const integrationTypes: { id: IntegrationType; name: string; description: string; icon: string }[] = [
    { id: "scorm", name: "SCORM", description: "SCORM 1.2 and 2004 content packages", icon: "📦" },
    { id: "xapi", name: "xAPI / Tin Can", description: "Experience API for learning analytics", icon: "📊" },
    { id: "lti", name: "LTI", description: "Learning Tools Interoperability", icon: "🔗" },
    { id: "custom", name: "Custom API", description: "Connect via REST API", icon: "⚙️" },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function LMSIntegration({
    integrations,
    onConnect,
    onDisconnect,
    onSync,
    onUpdate,
    className,
}: LMSIntegrationProps) {
    const [showConnect, setShowConnect] = useState<IntegrationType | null>(null);
    const [connecting, setConnecting] = useState(false);
    const [newConfig, setNewConfig] = useState<LMSIntegration["config"]>({});

    const handleConnect = async () => {
        if (!showConnect) return;
        setConnecting(true);
        try {
            await onConnect(showConnect, newConfig);
            setShowConnect(null);
            setNewConfig({});
        } finally {
            setConnecting(false);
        }
    };

    const connectedIntegrations = integrations.filter((i) => i.status !== "disconnected");

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold mb-2">LMS Integrations</h2>
                <p className="text-sm text-muted-foreground">
                    Connect with external learning management systems and content standards
                </p>
            </div>

            {/* Available Integrations */}
            <div className="grid md:grid-cols-2 gap-4">
                {integrationTypes.map((type) => {
                    const connected = integrations.find((i) => i.type === type.id && i.status === "connected");
                    return (
                        <div
                            key={type.id}
                            className={cn(
                                "p-4 rounded-xl border transition-all",
                                connected
                                    ? "border-primary/50 bg-primary/5"
                                    : "border-white/10 bg-white/[0.02]"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">{type.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium">{type.name}</h3>
                                        {connected && (
                                            <Badge className="bg-emerald-500/20 text-emerald-400">Connected</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                                    {connected ? (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onSync(connected.id)}
                                            >
                                                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                                                Sync
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDisconnect(connected.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Unplug className="h-3.5 w-3.5 mr-1" />
                                                Disconnect
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowConnect(type.id)}
                                        >
                                            <Plug className="h-3.5 w-3.5 mr-1" />
                                            Connect
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Connect Modal */}
            {showConnect && (
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-semibold mb-4">
                        Configure {integrationTypes.find((t) => t.id === showConnect)?.name}
                    </h3>

                    <div className="space-y-4">
                        {showConnect === "xapi" && (
                            <>
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">LRS Endpoint</label>
                                    <Input
                                        value={newConfig.lrsEndpoint || ""}
                                        onChange={(e) => setNewConfig((p) => ({ ...p, lrsEndpoint: e.target.value }))}
                                        placeholder="https://lrs.example.com/xapi"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Key</label>
                                        <Input
                                            value={newConfig.clientId || ""}
                                            onChange={(e) => setNewConfig((p) => ({ ...p, clientId: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Secret</label>
                                        <Input
                                            type="password"
                                            value={newConfig.secret || ""}
                                            onChange={(e) => setNewConfig((p) => ({ ...p, secret: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {(showConnect === "scorm" || showConnect === "lti" || showConnect === "custom") && (
                            <>
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">Endpoint URL</label>
                                    <Input
                                        value={newConfig.endpoint || ""}
                                        onChange={(e) => setNewConfig((p) => ({ ...p, endpoint: e.target.value }))}
                                        placeholder="https://api.example.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">API Key</label>
                                    <Input
                                        value={newConfig.apiKey || ""}
                                        onChange={(e) => setNewConfig((p) => ({ ...p, apiKey: e.target.value }))}
                                        placeholder="your-api-key"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                            <Button variant="outline" onClick={() => setShowConnect(null)}>
                                Cancel
                            </Button>
                            <Button onClick={handleConnect} disabled={connecting}>
                                {connecting ? "Connecting..." : "Connect"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Connected Integrations Details */}
            {connectedIntegrations.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-medium">Active Connections</h3>
                    {connectedIntegrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                        {integrationTypes.find((t) => t.id === integration.type)?.icon}
                                    </span>
                                    <div>
                                        <p className="font-medium">{integration.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Last synced: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : "Never"}
                                        </p>
                                    </div>
                                </div>
                                <Badge className={
                                    integration.status === "connected"
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/20 text-red-400"
                                }>
                                    {integration.status}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">Sync:</span>
                                <button
                                    onClick={() => onUpdate(integration.id, {})}
                                    className={cn(
                                        "w-9 h-5 rounded-full transition-colors relative",
                                        integration.syncEnabled ? "bg-primary" : "bg-muted"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                                            integration.syncEnabled ? "translate-x-4" : "translate-x-0.5"
                                        )}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LMSIntegration;
