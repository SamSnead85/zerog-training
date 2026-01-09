"use client";

import { Card, Badge, Button } from "@/components/ui";
import {
    Globe,
    Zap,
    Puzzle,
    Link2,
    ArrowRight,
    Check,
    ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Integration card
interface IntegrationProps {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    connected: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
}

export function IntegrationCard({
    name,
    description,
    icon,
    category,
    connected,
    onConnect,
    onDisconnect,
}: IntegrationProps) {
    return (
        <Card className={cn(
            "p-5 bg-white/[0.02] border transition-all",
            connected ? "border-emerald-500/30" : "border-white/10"
        )}>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{name}</h3>
                        {connected && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Connected
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-white/50 mb-3">{description}</p>
                    <Badge className="bg-white/10 text-white/60 text-xs">{category}</Badge>
                </div>
                <Button
                    variant={connected ? "outline" : "default"}
                    size="sm"
                    onClick={connected ? onDisconnect : onConnect}
                >
                    {connected ? "Disconnect" : "Connect"}
                </Button>
            </div>
        </Card>
    );
}

// Integrations grid
export function IntegrationsPage({
    integrations,
    onConnect,
    onDisconnect,
}: {
    integrations: IntegrationProps[];
    onConnect: (id: string) => void;
    onDisconnect: (id: string) => void;
}) {
    const categories = [...new Set(integrations.map(i => i.category))];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-2">Integrations</h2>
                <p className="text-white/60">
                    Connect your tools to enhance your learning experience
                </p>
            </div>

            {categories.map(category => (
                <div key={category}>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Puzzle className="h-5 w-5 text-primary" />
                        {category}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {integrations
                            .filter(i => i.category === category)
                            .map(integration => (
                                <IntegrationCard
                                    key={integration.id}
                                    {...integration}
                                    onConnect={() => onConnect(integration.id)}
                                    onDisconnect={() => onDisconnect(integration.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

// API key management
export function APIKeyManager({
    apiKeys,
    onGenerate,
    onRevoke,
}: {
    apiKeys: {
        id: string;
        name: string;
        createdAt: string;
        lastUsed?: string;
        maskedKey: string;
    }[];
    onGenerate: (name: string) => Promise<{ key: string }>;
    onRevoke: (id: string) => Promise<void>;
}) {
    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold">API Keys</h3>
                    <p className="text-sm text-white/50">
                        Manage keys for API access
                    </p>
                </div>
                <Button onClick={() => onGenerate("New Key")}>
                    Generate Key
                </Button>
            </div>

            {apiKeys.length === 0 ? (
                <p className="text-center text-white/40 py-8">
                    No API keys yet. Generate one to get started.
                </p>
            ) : (
                <div className="space-y-3">
                    {apiKeys.map(key => (
                        <div
                            key={key.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                        >
                            <div>
                                <p className="font-medium text-sm">{key.name}</p>
                                <p className="text-xs font-mono text-white/40">{key.maskedKey}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right text-xs text-white/40">
                                    <p>Created {new Date(key.createdAt).toLocaleDateString()}</p>
                                    {key.lastUsed && (
                                        <p>Last used {new Date(key.lastUsed).toLocaleDateString()}</p>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onRevoke(key.id)}
                                    className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                                >
                                    Revoke
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}

// Webhook configuration
export function WebhookConfig({
    webhooks,
    onCreate,
    onDelete,
    onTest,
}: {
    webhooks: {
        id: string;
        url: string;
        events: string[];
        active: boolean;
        lastTriggered?: string;
    }[];
    onCreate: (url: string, events: string[]) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onTest: (id: string) => Promise<void>;
}) {
    const availableEvents = [
        "lesson.completed",
        "module.completed",
        "quiz.passed",
        "certificate.earned",
        "streak.maintained",
    ];

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-400" />
                        Webhooks
                    </h3>
                    <p className="text-sm text-white/50">
                        Receive real-time notifications
                    </p>
                </div>
                <Button variant="outline">Add Webhook</Button>
            </div>

            {webhooks.length === 0 ? (
                <p className="text-center text-white/40 py-8">
                    No webhooks configured.
                </p>
            ) : (
                <div className="space-y-3">
                    {webhooks.map(webhook => (
                        <div
                            key={webhook.id}
                            className="p-4 rounded-lg bg-white/5"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        webhook.active ? "bg-emerald-500" : "bg-white/30"
                                    )} />
                                    <span className="font-mono text-sm truncate max-w-xs">
                                        {webhook.url}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onTest(webhook.id)}
                                    >
                                        Test
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDelete(webhook.id)}
                                        className="text-red-400"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {webhook.events.map(event => (
                                    <Badge key={event} className="bg-white/10 text-xs">
                                        {event}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
