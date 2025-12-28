"use client";

/**
 * System Settings Component
 * 
 * Admin settings panel for platform configuration,
 * branding, integrations, and security settings.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Settings,
    Palette,
    Lock,
    Bell,
    Globe,
    Database,
    Zap,
    Shield,
    Building2,
    Mail,
    Save,
    RotateCcw,
    Check,
    AlertTriangle,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface SystemSettings {
    general: {
        platformName: string;
        supportEmail: string;
        defaultLanguage: string;
        timezone: string;
    };
    branding: {
        primaryColor: string;
        logoUrl?: string;
        faviconUrl?: string;
        customCss?: string;
    };
    security: {
        mfaRequired: boolean;
        sessionTimeout: number;
        passwordMinLength: number;
        passwordRequireSpecial: boolean;
        ipWhitelist: string[];
        ssoEnabled: boolean;
        ssoProvider?: string;
    };
    notifications: {
        emailEnabled: boolean;
        pushEnabled: boolean;
        digestFrequency: "daily" | "weekly" | "never";
    };
    integrations: {
        slack?: { enabled: boolean; webhookUrl?: string };
        teams?: { enabled: boolean; webhookUrl?: string };
        zapier?: { enabled: boolean; apiKey?: string };
    };
}

interface SystemSettingsProps {
    settings: SystemSettings;
    onSave: (settings: SystemSettings) => Promise<void>;
    className?: string;
}

// =============================================================================
// NAV CONFIG
// =============================================================================

const settingsSections = [
    { id: "general", label: "General", icon: Settings },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Zap },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function SystemSettings({ settings: initialSettings, onSave, className }: SystemSettingsProps) {
    const [settings, setSettings] = useState<SystemSettings>(initialSettings);
    const [activeSection, setActiveSection] = useState("general");
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const updateSettings = <K extends keyof SystemSettings>(
        section: K,
        updates: Partial<SystemSettings[K]>
    ) => {
        setSettings((prev) => ({
            ...prev,
            [section]: { ...prev[section], ...updates },
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(settings);
            setHasChanges(false);
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setSettings(initialSettings);
        setHasChanges(false);
    };

    return (
        <div className={cn("flex gap-6", className)}>
            {/* Sidebar */}
            <div className="w-56 flex-shrink-0">
                <nav className="space-y-1">
                    {settingsSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                activeSection === section.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <section.icon className="h-4 w-4" />
                            {section.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    {activeSection === "general" && (
                        <GeneralSettings
                            settings={settings.general}
                            onChange={(updates) => updateSettings("general", updates)}
                        />
                    )}
                    {activeSection === "branding" && (
                        <BrandingSettings
                            settings={settings.branding}
                            onChange={(updates) => updateSettings("branding", updates)}
                        />
                    )}
                    {activeSection === "security" && (
                        <SecuritySettings
                            settings={settings.security}
                            onChange={(updates) => updateSettings("security", updates)}
                        />
                    )}
                    {activeSection === "notifications" && (
                        <NotificationSettings
                            settings={settings.notifications}
                            onChange={(updates) => updateSettings("notifications", updates)}
                        />
                    )}
                    {activeSection === "integrations" && (
                        <IntegrationsSettings
                            settings={settings.integrations}
                            onChange={(updates) => updateSettings("integrations", updates)}
                        />
                    )}

                    {/* Save Bar */}
                    {hasChanges && (
                        <div className="mt-6 pt-6 border-t border-border flex items-center justify-end gap-3">
                            <Button variant="outline" onClick={handleReset}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? (
                                    <>
                                        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// SETTINGS SECTIONS
// =============================================================================

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="flex items-start justify-between gap-8 py-4 border-b border-border last:border-0">
            <div className="flex-1">
                <p className="font-medium">{label}</p>
                {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
    return (
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
    );
}

function GeneralSettings({ settings, onChange }: { settings: SystemSettings["general"]; onChange: (s: Partial<SystemSettings["general"]>) => void }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">General Settings</h2>
            <SettingRow label="Platform Name" description="The name displayed across the platform">
                <Input
                    value={settings.platformName}
                    onChange={(e) => onChange({ platformName: e.target.value })}
                    className="w-64"
                />
            </SettingRow>
            <SettingRow label="Support Email" description="Contact email for user support">
                <Input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => onChange({ supportEmail: e.target.value })}
                    className="w-64"
                />
            </SettingRow>
            <SettingRow label="Default Language">
                <select
                    value={settings.defaultLanguage}
                    onChange={(e) => onChange({ defaultLanguage: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent"
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
            </SettingRow>
        </>
    );
}

function BrandingSettings({ settings, onChange }: { settings: SystemSettings["branding"]; onChange: (s: Partial<SystemSettings["branding"]>) => void }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Branding</h2>
            <SettingRow label="Primary Color" description="Main brand color used throughout the platform">
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => onChange({ primaryColor: e.target.value })}
                        className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <Input
                        value={settings.primaryColor}
                        onChange={(e) => onChange({ primaryColor: e.target.value })}
                        className="w-28"
                    />
                </div>
            </SettingRow>
            <SettingRow label="Logo URL" description="URL to your company logo">
                <Input
                    value={settings.logoUrl || ""}
                    onChange={(e) => onChange({ logoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-64"
                />
            </SettingRow>
        </>
    );
}

function SecuritySettings({ settings, onChange }: { settings: SystemSettings["security"]; onChange: (s: Partial<SystemSettings["security"]>) => void }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Security</h2>
            <SettingRow label="Require MFA" description="Require multi-factor authentication for all users">
                <Toggle checked={settings.mfaRequired} onChange={(mfaRequired) => onChange({ mfaRequired })} />
            </SettingRow>
            <SettingRow label="Session Timeout" description="Minutes of inactivity before automatic logout">
                <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => onChange({ sessionTimeout: parseInt(e.target.value) })}
                    className="w-24"
                />
            </SettingRow>
            <SettingRow label="Password Minimum Length">
                <Input
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => onChange({ passwordMinLength: parseInt(e.target.value) })}
                    className="w-24"
                />
            </SettingRow>
            <SettingRow label="SSO Enabled" description="Allow single sign-on authentication">
                <Toggle checked={settings.ssoEnabled} onChange={(ssoEnabled) => onChange({ ssoEnabled })} />
            </SettingRow>
        </>
    );
}

function NotificationSettings({ settings, onChange }: { settings: SystemSettings["notifications"]; onChange: (s: Partial<SystemSettings["notifications"]>) => void }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Notifications</h2>
            <SettingRow label="Email Notifications" description="Send notifications via email">
                <Toggle checked={settings.emailEnabled} onChange={(emailEnabled) => onChange({ emailEnabled })} />
            </SettingRow>
            <SettingRow label="Push Notifications" description="Send browser push notifications">
                <Toggle checked={settings.pushEnabled} onChange={(pushEnabled) => onChange({ pushEnabled })} />
            </SettingRow>
            <SettingRow label="Digest Frequency" description="How often to send email digests">
                <select
                    value={settings.digestFrequency}
                    onChange={(e) => onChange({ digestFrequency: e.target.value as "daily" | "weekly" | "never" })}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="never">Never</option>
                </select>
            </SettingRow>
        </>
    );
}

function IntegrationsSettings({ settings, onChange }: { settings: SystemSettings["integrations"]; onChange: (s: Partial<SystemSettings["integrations"]>) => void }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Integrations</h2>
            <div className="space-y-4">
                <IntegrationCard
                    name="Slack"
                    description="Send notifications to Slack channels"
                    enabled={settings.slack?.enabled || false}
                    onToggle={(enabled) => onChange({ slack: { ...settings.slack, enabled } })}
                />
                <IntegrationCard
                    name="Microsoft Teams"
                    description="Integrate with Microsoft Teams"
                    enabled={settings.teams?.enabled || false}
                    onToggle={(enabled) => onChange({ teams: { ...settings.teams, enabled } })}
                />
                <IntegrationCard
                    name="Zapier"
                    description="Connect to 5000+ apps via Zapier"
                    enabled={settings.zapier?.enabled || false}
                    onToggle={(enabled) => onChange({ zapier: { ...settings.zapier, enabled } })}
                />
            </div>
        </>
    );
}

function IntegrationCard({ name, description, enabled, onToggle }: { name: string; description: string; enabled: boolean; onToggle: (enabled: boolean) => void }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Toggle checked={enabled} onChange={onToggle} />
        </div>
    );
}

export default SystemSettings;
