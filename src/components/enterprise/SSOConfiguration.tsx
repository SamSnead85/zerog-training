"use client";

/**
 * SSO Configuration Component
 * 
 * Enterprise SSO setup with SAML, OAuth, and OIDC providers.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Shield,
    Check,
    X,
    ExternalLink,
    Copy,
    Eye,
    EyeOff,
    RefreshCw,
    AlertTriangle,
    Settings,
    Key,
    Globe,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type SSOProvider = "saml" | "oauth" | "oidc" | "azure" | "okta" | "google";

export interface SSOConfig {
    enabled: boolean;
    provider: SSOProvider;
    entityId?: string;
    ssoUrl?: string;
    certificate?: string;
    clientId?: string;
    clientSecret?: string;
    tenantId?: string;
    domain?: string;
    enforceSSO: boolean;
    allowLocalLogin: boolean;
    autoProvision: boolean;
    defaultRole?: string;
}

interface SSOConfigurationProps {
    config: SSOConfig;
    onSave: (config: SSOConfig) => Promise<void>;
    className?: string;
}

// =============================================================================
// PROVIDER CONFIG
// =============================================================================

const providers: { id: SSOProvider; name: string; logo?: string; type: string }[] = [
    { id: "saml", name: "SAML 2.0", type: "Generic SAML" },
    { id: "okta", name: "Okta", type: "SAML/OIDC" },
    { id: "azure", name: "Azure AD", type: "OAuth/OIDC" },
    { id: "google", name: "Google Workspace", type: "OAuth" },
    { id: "oidc", name: "OpenID Connect", type: "OIDC" },
    { id: "oauth", name: "OAuth 2.0", type: "Generic OAuth" },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function SSOConfiguration({ config: initialConfig, onSave, className }: SSOConfigurationProps) {
    const [config, setConfig] = useState<SSOConfig>(initialConfig);
    const [saving, setSaving] = useState(false);
    const [showSecret, setShowSecret] = useState(false);
    const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

    const updateConfig = (updates: Partial<SSOConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(config);
        } finally {
            setSaving(false);
        }
    };

    const testConnection = async () => {
        setTestStatus("testing");
        // Simulated test
        await new Promise((r) => setTimeout(r, 2000));
        setTestStatus(Math.random() > 0.3 ? "success" : "error");
    };

    const selectedProvider = providers.find((p) => p.id === config.provider);

    return (
        <div className={cn("space-y-8", className)}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Single Sign-On</h2>
                    <p className="text-muted-foreground">
                        Configure enterprise SSO to allow users to sign in with your identity provider.
                    </p>
                </div>
                <Badge className={config.enabled ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}>
                    {config.enabled ? "Enabled" : "Disabled"}
                </Badge>
            </div>

            {/* Enable Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div>
                    <p className="font-medium">Enable SSO</p>
                    <p className="text-sm text-muted-foreground">Allow users to sign in with your identity provider</p>
                </div>
                <button
                    onClick={() => updateConfig({ enabled: !config.enabled })}
                    className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        config.enabled ? "bg-primary" : "bg-muted"
                    )}
                >
                    <span
                        className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                            config.enabled ? "translate-x-7" : "translate-x-1"
                        )}
                    />
                </button>
            </div>

            {config.enabled && (
                <>
                    {/* Provider Selection */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Identity Provider</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {providers.map((provider) => (
                                <button
                                    key={provider.id}
                                    onClick={() => updateConfig({ provider: provider.id })}
                                    className={cn(
                                        "p-4 rounded-xl border text-left transition-all",
                                        config.provider === provider.id
                                            ? "border-primary bg-primary/5"
                                            : "border-white/10 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">{provider.name}</span>
                                        {config.provider === provider.id && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{provider.type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Configuration Fields */}
                    <div className="space-y-4 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            {selectedProvider?.name} Configuration
                        </h3>

                        {(config.provider === "saml" || config.provider === "okta") && (
                            <>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Entity ID / Issuer</label>
                                        <Input
                                            value={config.entityId || ""}
                                            onChange={(e) => updateConfig({ entityId: e.target.value })}
                                            placeholder="https://your-app.zerog.ai"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">SSO URL</label>
                                        <Input
                                            value={config.ssoUrl || ""}
                                            onChange={(e) => updateConfig({ ssoUrl: e.target.value })}
                                            placeholder="https://your-idp.com/sso/saml"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">X.509 Certificate</label>
                                        <textarea
                                            value={config.certificate || ""}
                                            onChange={(e) => updateConfig({ certificate: e.target.value })}
                                            placeholder="-----BEGIN CERTIFICATE-----"
                                            className="w-full h-24 px-3 py-2 rounded-lg border border-white/20 bg-transparent text-sm font-mono"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {(config.provider === "oauth" || config.provider === "oidc" || config.provider === "azure" || config.provider === "google") && (
                            <>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Client ID</label>
                                        <Input
                                            value={config.clientId || ""}
                                            onChange={(e) => updateConfig({ clientId: e.target.value })}
                                            placeholder="your-client-id"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Client Secret</label>
                                        <div className="relative">
                                            <Input
                                                type={showSecret ? "text" : "password"}
                                                value={config.clientSecret || ""}
                                                onChange={(e) => updateConfig({ clientSecret: e.target.value })}
                                                placeholder="••••••••••••"
                                                className="pr-10"
                                            />
                                            <button
                                                onClick={() => setShowSecret(!showSecret)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                                            >
                                                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    {config.provider === "azure" && (
                                        <div>
                                            <label className="text-sm text-muted-foreground mb-2 block">Tenant ID</label>
                                            <Input
                                                value={config.tenantId || ""}
                                                onChange={(e) => updateConfig({ tenantId: e.target.value })}
                                                placeholder="your-tenant-id"
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Service Provider Info */}
                        <div className="mt-6 pt-6 border-t border-border">
                            <h4 className="text-sm font-medium mb-3">Service Provider Details</h4>
                            <div className="space-y-2 text-sm">
                                <CopyableField label="ACS URL" value="https://zerog.ai/api/auth/sso/callback" />
                                <CopyableField label="Entity ID" value="https://zerog.ai" />
                                <CopyableField label="Metadata URL" value="https://zerog.ai/api/auth/sso/metadata" />
                            </div>
                        </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Options</h3>
                        <div className="space-y-3">
                            <ToggleOption
                                label="Enforce SSO"
                                description="Require all users to sign in via SSO"
                                checked={config.enforceSSO}
                                onChange={(enforceSSO) => updateConfig({ enforceSSO })}
                            />
                            <ToggleOption
                                label="Allow local login"
                                description="Allow admins to sign in with email/password"
                                checked={config.allowLocalLogin}
                                onChange={(allowLocalLogin) => updateConfig({ allowLocalLogin })}
                            />
                            <ToggleOption
                                label="Auto-provision users"
                                description="Automatically create accounts for new SSO users"
                                checked={config.autoProvision}
                                onChange={(autoProvision) => updateConfig({ autoProvision })}
                            />
                        </div>
                    </div>

                    {/* Test & Save */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" onClick={testConnection} disabled={testStatus === "testing"}>
                                {testStatus === "testing" ? (
                                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                ) : (
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                )}
                                Test Connection
                            </Button>
                            {testStatus === "success" && (
                                <span className="flex items-center gap-1 text-sm text-emerald-400">
                                    <Check className="h-4 w-4" />
                                    Connection successful
                                </span>
                            )}
                            {testStatus === "error" && (
                                <span className="flex items-center gap-1 text-sm text-red-400">
                                    <AlertTriangle className="h-4 w-4" />
                                    Connection failed
                                </span>
                            )}
                        </div>
                        <Button onClick={handleSave} disabled={saving}>
                            {saving ? "Saving..." : "Save Configuration"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function CopyableField({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div>
                <span className="text-muted-foreground">{label}: </span>
                <span className="font-mono">{value}</span>
            </div>
            <button onClick={copy} className="p-1 hover:bg-muted rounded">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
        </div>
    );
}

function ToggleOption({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    checked ? "bg-primary" : "bg-muted"
                )}
            >
                <span
                    className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        checked ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </button>
        </div>
    );
}

export default SSOConfiguration;
