"use client";

/**
 * User Settings Page Components
 * 
 * Comprehensive settings interface for profile, notifications,
 * appearance, security, and preferences.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge, Input } from "@/components/ui";
import {
    User,
    Bell,
    Palette,
    Shield,
    Globe,
    CreditCard,
    Users,
    Key,
    Laptop,
    Moon,
    Sun,
    Settings,
    LogOut,
    ChevronRight,
    Check,
} from "lucide-react";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

interface SettingsSection {
    id: string;
    label: string;
    icon: React.ElementType;
    description?: string;
}

// =============================================================================
// SETTINGS SECTIONS
// =============================================================================

const settingsSections: SettingsSection[] = [
    { id: "profile", label: "Profile", icon: User, description: "Your personal information" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Manage alerts and updates" },
    { id: "appearance", label: "Appearance", icon: Palette, description: "Customize the look and feel" },
    { id: "security", label: "Security", icon: Shield, description: "Passwords and authentication" },
    { id: "language", label: "Language & Region", icon: Globe, description: "Language and timezone" },
    { id: "billing", label: "Billing", icon: CreditCard, description: "Manage subscription" },
    { id: "team", label: "Team", icon: Users, description: "Manage team members" },
    { id: "api", label: "API Keys", icon: Key, description: "Manage API access" },
];

// =============================================================================
// SETTINGS NAV
// =============================================================================

interface SettingsNavProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    className?: string;
}

export function SettingsNav({ activeSection, onSectionChange, className }: SettingsNavProps) {
    return (
        <nav className={cn("space-y-1", className)}>
            {settingsSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium text-sm">{section.label}</span>
                    </button>
                );
            })}

            <div className="pt-4 mt-4 border-t border-border">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-red-400 hover:bg-red-500/10">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </nav>
    );
}

// =============================================================================
// SETTINGS SECTION WRAPPER
// =============================================================================

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
            {children}
        </div>
    );
}

// =============================================================================
// SETTINGS ROW
// =============================================================================

interface SettingsRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function SettingsRow({ label, description, children, className }: SettingsRowProps) {
    return (
        <div className={cn("flex items-start justify-between gap-4 py-4 border-b border-border last:border-0", className)}>
            <div className="flex-1">
                <p className="font-medium">{label}</p>
                {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    );
}

// =============================================================================
// TOGGLE SWITCH
// =============================================================================

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
}

export function ToggleSwitch({ checked, onChange, disabled, label }: ToggleSwitchProps) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only peer"
            />
            <div
                className={cn(
                    "relative w-11 h-6 rounded-full transition-colors",
                    "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50",
                    checked ? "bg-primary" : "bg-muted-foreground/30",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <div
                    className={cn(
                        "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                        checked && "translate-x-5"
                    )}
                />
            </div>
            {label && <span className="ml-3 text-sm">{label}</span>}
        </label>
    );
}

// =============================================================================
// THEME SELECTOR
// =============================================================================

interface ThemeSelectorProps {
    value: "light" | "dark" | "system";
    onChange: (value: "light" | "dark" | "system") => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
    const themes = [
        { id: "light", label: "Light", icon: Sun },
        { id: "dark", label: "Dark", icon: Moon },
        { id: "system", label: "System", icon: Laptop },
    ] as const;

    return (
        <div className="flex gap-2">
            {themes.map((theme) => {
                const Icon = theme.icon;
                const isActive = value === theme.id;

                return (
                    <button
                        key={theme.id}
                        onClick={() => onChange(theme.id)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                            isActive
                                ? "border-primary bg-primary/10"
                                : "border-white/10 hover:border-white/20"
                        )}
                    >
                        <Icon className={cn("h-6 w-6", isActive && "text-primary")} />
                        <span className="text-sm font-medium">{theme.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

// =============================================================================
// NOTIFICATION PREFERENCES
// =============================================================================

interface NotificationPreference {
    id: string;
    label: string;
    description: string;
    email: boolean;
    push: boolean;
    inApp: boolean;
}

interface NotificationPreferencesProps {
    preferences: NotificationPreference[];
    onChange: (id: string, channel: "email" | "push" | "inApp", value: boolean) => void;
}

export function NotificationPreferences({ preferences, onChange }: NotificationPreferencesProps) {
    return (
        <div className="rounded-xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 text-sm font-medium">
                <div>Notification Type</div>
                <div className="text-center">Email</div>
                <div className="text-center">Push</div>
                <div className="text-center">In-App</div>
            </div>

            {/* Rows */}
            {preferences.map((pref) => (
                <div key={pref.id} className="grid grid-cols-4 gap-4 p-4 border-t border-border items-center">
                    <div>
                        <p className="font-medium text-sm">{pref.label}</p>
                        <p className="text-xs text-muted-foreground">{pref.description}</p>
                    </div>
                    <div className="flex justify-center">
                        <ToggleSwitch
                            checked={pref.email}
                            onChange={(val) => onChange(pref.id, "email", val)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <ToggleSwitch
                            checked={pref.push}
                            onChange={(val) => onChange(pref.id, "push", val)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <ToggleSwitch
                            checked={pref.inApp}
                            onChange={(val) => onChange(pref.id, "inApp", val)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// =============================================================================
// CONNECTED APPS
// =============================================================================

interface ConnectedApp {
    id: string;
    name: string;
    icon: string;
    description: string;
    connected: boolean;
    lastUsed?: Date;
}

interface ConnectedAppsListProps {
    apps: ConnectedApp[];
    onConnect: (id: string) => void;
    onDisconnect: (id: string) => void;
}

export function ConnectedAppsList({ apps, onConnect, onDisconnect }: ConnectedAppsListProps) {
    return (
        <div className="space-y-3">
            {apps.map((app) => (
                <div
                    key={app.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                >
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                        {app.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-medium">{app.name}</p>
                            {app.connected && (
                                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                                    <Check className="h-3 w-3 mr-1" />
                                    Connected
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
                    </div>
                    <Button
                        variant={app.connected ? "outline" : "default"}
                        size="sm"
                        onClick={() => app.connected ? onDisconnect(app.id) : onConnect(app.id)}
                    >
                        {app.connected ? "Disconnect" : "Connect"}
                    </Button>
                </div>
            ))}
        </div>
    );
}

// =============================================================================
// DANGER ZONE
// =============================================================================

interface DangerZoneProps {
    onDeleteAccount: () => void;
    onExportData: () => void;
}

export function DangerZone({ onDeleteAccount, onExportData }: DangerZoneProps) {
    return (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Export Your Data</p>
                        <p className="text-sm text-muted-foreground">
                            Download a copy of all your data
                        </p>
                    </div>
                    <Button variant="outline" onClick={onExportData}>
                        Export Data
                    </Button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-red-500/20">
                    <div>
                        <p className="font-medium text-red-400">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all data
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        onClick={onDeleteAccount}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default {
    SettingsNav,
    SettingsSection,
    SettingsRow,
    ToggleSwitch,
    ThemeSelector,
    NotificationPreferences,
    ConnectedAppsList,
    DangerZone,
};
