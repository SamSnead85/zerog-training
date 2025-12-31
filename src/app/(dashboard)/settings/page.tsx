"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import {
    User,
    Bell,
    Lock,
    Globe,
    Moon,
    Sun,
    Shield,
    CreditCard,
    LogOut,
    ChevronRight,
    Check,
    Mail,
    Smartphone,
    Eye,
    EyeOff,
    Key,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// SETTINGS SECTIONS
// =============================================================================

type SettingsTab = "account" | "notifications" | "privacy" | "appearance" | "billing";

const tabs: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Moon },
    { id: "billing", label: "Billing", icon: CreditCard },
];

// =============================================================================
// TOGGLE COMPONENT
// =============================================================================

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={cn(
                "relative w-11 h-6 rounded-full transition-colors",
                enabled ? "bg-emerald-500" : "bg-white/20"
            )}
        >
            <div className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                enabled ? "left-6" : "left-1"
            )} />
        </button>
    );
}

// =============================================================================
// SETTINGS PAGE
// =============================================================================

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("account");
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weeklyDigest: true,
        courseUpdates: true,
        promotions: false,
    });
    const [privacy, setPrivacy] = useState({
        profileVisible: true,
        showOnLeaderboard: true,
        shareProgress: false,
    });
    const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
    const { user } = useAuth();

    // Use real user data with fallbacks
    const displayName = user?.name || 'User';
    const displayEmail = user?.email || 'user@company.com';

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-5xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/training" className="text-sm text-white/60 hover:text-white transition-colors">My Learning</Link>
                        <Link href="/profile" className="text-sm text-white/60 hover:text-white transition-colors">Profile</Link>
                        <Link href="/settings" className="text-sm text-white font-medium">Settings</Link>
                    </nav>
                </div>
            </header>

            <main className="px-6 py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Settings</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <nav className="md:w-56 flex-shrink-0">
                        <div className="space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                                        activeTab === tab.id
                                            ? "bg-white/10 text-white"
                                            : "text-white/60 hover:bg-white/5"
                                    )}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </nav>

                    {/* Content */}
                    <div className="flex-1">
                        {/* Account Tab */}
                        {activeTab === "account" && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h2 className="font-semibold mb-4">Profile Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-white/40 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={displayName}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/40 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={displayEmail}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/40 mb-2">Job Title</label>
                                            <input
                                                type="text"
                                                defaultValue="Senior Software Engineer"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                            />
                                        </div>
                                    </div>
                                    <button className="mt-4 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
                                        Save Changes
                                    </button>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h2 className="font-semibold mb-4">Password</h2>
                                    <p className="text-sm text-white/40 mb-4">Change your password to keep your account secure.</p>
                                    <button className="px-4 py-2 bg-white/10 text-sm rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                                        <Key className="h-4 w-4" />
                                        Change Password
                                    </button>
                                </div>

                                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                                    <h2 className="font-semibold text-red-400 mb-2">Danger Zone</h2>
                                    <p className="text-sm text-white/40 mb-4">Permanently delete your account and all data.</p>
                                    <button className="px-4 py-2 bg-red-500/20 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <h2 className="font-semibold mb-6">Notification Preferences</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-white/40" />
                                            <div>
                                                <p className="font-medium text-sm">Email Notifications</p>
                                                <p className="text-xs text-white/40">Receive updates via email</p>
                                            </div>
                                        </div>
                                        <Toggle enabled={notifications.email} onChange={(v) => setNotifications({ ...notifications, email: v })} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Smartphone className="h-5 w-5 text-white/40" />
                                            <div>
                                                <p className="font-medium text-sm">Push Notifications</p>
                                                <p className="text-xs text-white/40">Get notified on your device</p>
                                            </div>
                                        </div>
                                        <Toggle enabled={notifications.push} onChange={(v) => setNotifications({ ...notifications, push: v })} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Bell className="h-5 w-5 text-white/40" />
                                            <div>
                                                <p className="font-medium text-sm">Weekly Progress Digest</p>
                                                <p className="text-xs text-white/40">Summary of your learning progress</p>
                                            </div>
                                        </div>
                                        <Toggle enabled={notifications.weeklyDigest} onChange={(v) => setNotifications({ ...notifications, weeklyDigest: v })} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Bell className="h-5 w-5 text-white/40" />
                                            <div>
                                                <p className="font-medium text-sm">Course Updates</p>
                                                <p className="text-xs text-white/40">New content and feature announcements</p>
                                            </div>
                                        </div>
                                        <Toggle enabled={notifications.courseUpdates} onChange={(v) => setNotifications({ ...notifications, courseUpdates: v })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === "privacy" && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h2 className="font-semibold mb-6">Privacy Settings</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Eye className="h-5 w-5 text-white/40" />
                                                <div>
                                                    <p className="font-medium text-sm">Public Profile</p>
                                                    <p className="text-xs text-white/40">Allow others to view your profile</p>
                                                </div>
                                            </div>
                                            <Toggle enabled={privacy.profileVisible} onChange={(v) => setPrivacy({ ...privacy, profileVisible: v })} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <User className="h-5 w-5 text-white/40" />
                                                <div>
                                                    <p className="font-medium text-sm">Show on Leaderboard</p>
                                                    <p className="text-xs text-white/40">Appear in company rankings</p>
                                                </div>
                                            </div>
                                            <Toggle enabled={privacy.showOnLeaderboard} onChange={(v) => setPrivacy({ ...privacy, showOnLeaderboard: v })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h2 className="font-semibold mb-4">Security</h2>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Shield className="h-5 w-5 text-white/40" />
                                                <span className="text-sm">Two-Factor Authentication</span>
                                            </div>
                                            <span className="text-xs text-white/40">Not enabled</span>
                                        </button>
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Key className="h-5 w-5 text-white/40" />
                                                <span className="text-sm">Active Sessions</span>
                                            </div>
                                            <span className="text-xs text-white/40">2 devices</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Appearance Tab */}
                        {activeTab === "appearance" && (
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <h2 className="font-semibold mb-6">Theme</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: "dark", label: "Dark", icon: Moon },
                                        { id: "light", label: "Light", icon: Sun },
                                        { id: "system", label: "System", icon: Globe },
                                    ].map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => setTheme(option.id as typeof theme)}
                                            className={cn(
                                                "p-4 rounded-xl border text-center transition-colors",
                                                theme === option.id
                                                    ? "bg-white/10 border-white/30"
                                                    : "border-white/10 hover:bg-white/5"
                                            )}
                                        >
                                            <option.icon className="h-6 w-6 mx-auto mb-2" />
                                            <p className="text-sm">{option.label}</p>
                                            {theme === option.id && (
                                                <Check className="h-4 w-4 text-emerald-400 mx-auto mt-2" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Billing Tab */}
                        {activeTab === "billing" && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="font-semibold">Professional Plan</h2>
                                            <p className="text-sm text-white/40">Billed annually</p>
                                        </div>
                                        <span className="text-2xl font-bold">$79<span className="text-sm font-normal text-white/40">/mo</span></span>
                                    </div>
                                    <p className="text-sm text-white/60 mb-4">Your next billing date is January 15, 2025</p>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
                                            Upgrade Plan
                                        </button>
                                        <button className="px-4 py-2 bg-white/10 text-sm rounded-lg hover:bg-white/20 transition-colors">
                                            Manage Billing
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h2 className="font-semibold mb-4">Payment Method</h2>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                                        <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center text-xs font-bold">
                                            VISA
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">•••• •••• •••• 4242</p>
                                            <p className="text-xs text-white/40">Expires 12/26</p>
                                        </div>
                                        <button className="text-sm text-white/40 hover:text-white">Edit</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
