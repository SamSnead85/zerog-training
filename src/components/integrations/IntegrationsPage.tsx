"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Plug,
    Check,
    X,
    ExternalLink,
    Settings,
    RefreshCw,
    AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Integration {
    id: string;
    name: string;
    description: string;
    category: "sso" | "hr" | "communication" | "analytics";
    logo: string;
    status: "connected" | "disconnected" | "pending";
    lastSync?: string;
}

const integrations: Integration[] = [
    { id: "okta", name: "Okta", description: "Single sign-on authentication", category: "sso", logo: "🔐", status: "connected", lastSync: "5 minutes ago" },
    { id: "azure-ad", name: "Azure AD", description: "Microsoft identity platform", category: "sso", logo: "☁️", status: "disconnected" },
    { id: "google-workspace", name: "Google Workspace", description: "Google SSO integration", category: "sso", logo: "🔷", status: "connected", lastSync: "2 hours ago" },
    { id: "workday", name: "Workday", description: "Sync employee data", category: "hr", logo: "👥", status: "pending" },
    { id: "bamboohr", name: "BambooHR", description: "HR information system", category: "hr", logo: "🎋", status: "disconnected" },
    { id: "slack", name: "Slack", description: "Send notifications to channels", category: "communication", logo: "💬", status: "connected", lastSync: "Just now" },
    { id: "teams", name: "Microsoft Teams", description: "Teams notifications", category: "communication", logo: "📢", status: "disconnected" },
    { id: "mixpanel", name: "Mixpanel", description: "Product analytics", category: "analytics", logo: "📊", status: "disconnected" },
];

const categories = [
    { id: "all", label: "All Integrations" },
    { id: "sso", label: "Single Sign-On" },
    { id: "hr", label: "HR Systems" },
    { id: "communication", label: "Communication" },
    { id: "analytics", label: "Analytics" },
];

export function IntegrationsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [connecting, setConnecting] = useState<string | null>(null);

    const filteredIntegrations = integrations.filter(
        (i) => selectedCategory === "all" || i.category === selectedCategory
    );

    const connectedCount = integrations.filter((i) => i.status === "connected").length;

    const handleConnect = async (integrationId: string) => {
        setConnecting(integrationId);
        // Simulate connection
        await new Promise((r) => setTimeout(r, 2000));
        setConnecting(null);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "connected":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Connected</Badge>;
            case "pending":
                return <Badge className="bg-amber-500/10 text-amber-500">Pending</Badge>;
            default:
                return <Badge variant="outline">Not Connected</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Integrations</h1>
                    <p className="text-muted-foreground">
                        Connect ZeroG with your existing tools • {connectedCount} of {integrations.length} connected
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                            selectedCategory === cat.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80"
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Integrations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.map((integration) => (
                    <Card key={integration.id} className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                                {integration.logo}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{integration.name}</h3>
                                    {getStatusBadge(integration.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {integration.description}
                                </p>
                            </div>
                        </div>

                        {integration.status === "connected" ? (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Last sync</span>
                                    <span>{integration.lastSync}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                                        <Settings className="h-4 w-4" />
                                        Configure
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : integration.status === "pending" ? (
                            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center gap-2 text-sm">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <span>Awaiting approval</span>
                            </div>
                        ) : (
                            <Button
                                className="w-full gap-2"
                                onClick={() => handleConnect(integration.id)}
                                disabled={connecting === integration.id}
                            >
                                {connecting === integration.id ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Connecting...
                                    </>
                                ) : (
                                    <>
                                        <Plug className="h-4 w-4" />
                                        Connect
                                    </>
                                )}
                            </Button>
                        )}
                    </Card>
                ))}
            </div>

            {/* Custom Integration */}
            <Card className="p-6 border-dashed">
                <div className="text-center">
                    <h3 className="font-semibold mb-2">Need a custom integration?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Use our API or contact us for enterprise integrations
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            API Documentation
                        </Button>
                        <Button variant="outline">Contact Sales</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
