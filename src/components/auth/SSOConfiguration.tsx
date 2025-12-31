"use client";

import { useState } from "react";
import {
    Card, Badge, Button
} from "@/components/ui";
import {
    Shield,
    Key,
    Building2,
    Check,
    AlertCircle,
    Settings,
    Link2,
    Lock,
    Users,
    Globe,
    Fingerprint,
    ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SSOProvider {
    id: string;
    name: string;
    type: "saml" | "oidc" | "oauth2";
    icon: React.ElementType;
    status: "connected" | "available" | "configured";
    description: string;
}

const ssoProviders: SSOProvider[] = [
    { id: "okta", name: "Okta", type: "saml", icon: Shield, status: "available", description: "SAML 2.0 / OIDC" },
    { id: "azure", name: "Azure AD", type: "oidc", icon: Globe, status: "available", description: "Microsoft Entra ID" },
    { id: "google", name: "Google Workspace", type: "oidc", icon: Building2, status: "available", description: "Google Cloud Identity" },
    { id: "onelogin", name: "OneLogin", type: "saml", icon: Key, status: "available", description: "SAML 2.0" },
    { id: "ping", name: "PingIdentity", type: "saml", icon: Fingerprint, status: "available", description: "SAML 2.0 / OIDC" },
    { id: "custom", name: "Custom SAML", type: "saml", icon: Settings, status: "available", description: "Generic SAML 2.0" },
];

interface SSOConfig {
    entityId: string;
    ssoUrl: string;
    certificate: string;
    attributeMapping: {
        email: string;
        firstName: string;
        lastName: string;
        role?: string;
    };
}

export function SSOConfiguration() {
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [configStep, setConfigStep] = useState(0);
    const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");
    const [config, setConfig] = useState<Partial<SSOConfig>>({});

    const handleProviderSelect = (providerId: string) => {
        setSelectedProvider(providerId);
        setConfigStep(1);
    };

    const handleTestConnection = async () => {
        setTestStatus("testing");
        // Simulate test
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTestStatus("success");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <ShieldCheck className="h-7 w-7 text-primary" />
                        Single Sign-On (SSO)
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Configure enterprise identity providers for seamless authentication
                    </p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Enterprise Feature
                </Badge>
            </div>

            {/* Current Status */}
            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/20">
                            <Check className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-400">SSO Ready</h3>
                            <p className="text-sm text-muted-foreground">
                                Your organization can configure SAML 2.0 or OIDC providers
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-400">
                        View Documentation
                    </Button>
                </div>
            </Card>

            {/* Provider Selection */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Select Identity Provider</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {ssoProviders.map((provider) => {
                        const Icon = provider.icon;
                        const isSelected = selectedProvider === provider.id;
                        return (
                            <Card
                                key={provider.id}
                                className={cn(
                                    "p-5 cursor-pointer transition-all duration-200 hover:border-primary/50",
                                    isSelected && "border-primary bg-primary/5"
                                )}
                                onClick={() => handleProviderSelect(provider.id)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={cn(
                                        "p-2.5 rounded-xl",
                                        isSelected ? "bg-primary/20" : "bg-white/5"
                                    )}>
                                        <Icon className={cn(
                                            "h-5 w-5",
                                            isSelected ? "text-primary" : "text-muted-foreground"
                                        )} />
                                    </div>
                                    <Badge variant="outline" className="text-xs capitalize">
                                        {provider.type}
                                    </Badge>
                                </div>
                                <h4 className="font-semibold mb-1">{provider.name}</h4>
                                <p className="text-sm text-muted-foreground">{provider.description}</p>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Configuration Form */}
            {selectedProvider && (
                <Card className="p-6 bg-white/[0.02] border-white/10">
                    <h3 className="text-lg font-semibold mb-6">Configure {ssoProviders.find(p => p.id === selectedProvider)?.name}</h3>

                    <div className="space-y-6">
                        {/* Service Provider Details */}
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                            <h4 className="font-medium mb-4 flex items-center gap-2">
                                <Link2 className="h-4 w-4 text-primary" />
                                Service Provider Details (Copy these to your IdP)
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <label className="text-muted-foreground">Entity ID / Issuer</label>
                                    <div className="mt-1 p-3 bg-black/30 rounded-lg font-mono text-xs break-all">
                                        https://scalednative.com/saml/metadata
                                    </div>
                                </div>
                                <div>
                                    <label className="text-muted-foreground">ACS URL</label>
                                    <div className="mt-1 p-3 bg-black/30 rounded-lg font-mono text-xs break-all">
                                        https://scalednative.com/api/auth/saml/callback
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IdP Configuration */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">IdP Entity ID</label>
                                <input
                                    type="text"
                                    placeholder="https://idp.example.com/metadata"
                                    className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    value={config.entityId || ""}
                                    onChange={(e) => setConfig({ ...config, entityId: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">SSO URL</label>
                                <input
                                    type="text"
                                    placeholder="https://idp.example.com/sso"
                                    className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    value={config.ssoUrl || ""}
                                    onChange={(e) => setConfig({ ...config, ssoUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">X.509 Certificate</label>
                            <textarea
                                placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none font-mono text-xs resize-none"
                                value={config.certificate || ""}
                                onChange={(e) => setConfig({ ...config, certificate: e.target.value })}
                            />
                        </div>

                        {/* Attribute Mapping */}
                        <div>
                            <h4 className="font-medium mb-4 flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                Attribute Mapping
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {["email", "firstName", "lastName", "role"].map((attr) => (
                                    <div key={attr}>
                                        <label className="block text-sm font-medium mb-2 capitalize">{attr}</label>
                                        <input
                                            type="text"
                                            placeholder={`user.${attr}`}
                                            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Test and Save */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <Button
                                variant="outline"
                                onClick={handleTestConnection}
                                disabled={testStatus === "testing"}
                                className="gap-2"
                            >
                                {testStatus === "testing" ? (
                                    <>Testing...</>
                                ) : testStatus === "success" ? (
                                    <><Check className="h-4 w-4 text-emerald-400" /> Connection Verified</>
                                ) : (
                                    <>Test Connection</>
                                )}
                            </Button>
                            <Button className="gap-2">
                                <Lock className="h-4 w-4" />
                                Save Configuration
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Security Settings */}
            <Card className="p-6 bg-white/[0.02] border-white/10">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security Settings
                </h3>
                <div className="space-y-4">
                    {[
                        { label: "Require SSO for all users", desc: "Disable password login when SSO is enabled", enabled: true },
                        { label: "Just-in-Time Provisioning", desc: "Automatically create accounts on first SSO login", enabled: true },
                        { label: "Enforce MFA", desc: "Require multi-factor authentication for all users", enabled: false },
                        { label: "Session timeout", desc: "Automatically log out after 8 hours of inactivity", enabled: true },
                    ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                            <div>
                                <p className="font-medium">{setting.label}</p>
                                <p className="text-sm text-muted-foreground">{setting.desc}</p>
                            </div>
                            <button
                                className={cn(
                                    "relative w-12 h-6 rounded-full transition-colors",
                                    setting.enabled ? "bg-primary" : "bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                    setting.enabled ? "translate-x-7" : "translate-x-1"
                                )} />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
