"use client";

import { useState } from "react";
import { Card, Badge, Button, Switch } from "@/components/ui";
import {
    User,
    Bell,
    Moon,
    Sun,
    Globe,
    Shield,
    Key,
    Smartphone,
    Mail,
    Download,
    Trash2,
    LogOut,
    ChevronRight,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSection {
    id: string;
    title: string;
    icon: React.ElementType;
}

const sections: SettingsSection[] = [
    { id: "account", title: "Account", icon: User },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "appearance", title: "Appearance", icon: Moon },
    { id: "privacy", title: "Privacy & Security", icon: Shield },
    { id: "data", title: "Data & Export", icon: Download },
];

export function SettingsPage() {
    const [activeSection, setActiveSection] = useState("account");
    const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        courseUpdates: true,
        achievements: true,
        teamActivity: false,
        marketing: false,
    });
    const [privacy, setPrivacy] = useState({
        showProfile: true,
        showProgress: true,
        showOnLeaderboard: true,
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
                {/* Sidebar */}
                <Card className="p-2 h-fit">
                    <nav className="space-y-1">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        activeSection === section.id
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    {section.title}
                                </button>
                            );
                        })}
                    </nav>
                </Card>

                {/* Content */}
                <div className="space-y-6">
                    {/* Account Section */}
                    {activeSection === "account" && (
                        <>
                            <Card className="p-6">
                                <h2 className="font-semibold mb-4">Profile Information</h2>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John Smith"
                                                className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="john.smith@company.com"
                                                className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Department</label>
                                            <input
                                                type="text"
                                                defaultValue="Engineering"
                                                className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Role</label>
                                            <input
                                                type="text"
                                                defaultValue="Senior Developer"
                                                className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button>Save Changes</Button>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="font-semibold mb-4">Password</h2>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">New Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="outline">Update Password</Button>
                                    </div>
                                </div>
                            </Card>
                        </>
                    )}

                    {/* Notifications Section */}
                    {activeSection === "notifications" && (
                        <Card className="p-6">
                            <h2 className="font-semibold mb-6">Notification Preferences</h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                                    </div>
                                    <Switch
                                        checked={notifications.email}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Push Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                                    </div>
                                    <Switch
                                        checked={notifications.push}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                                    />
                                </div>
                                <hr className="border-border" />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Course Updates</p>
                                        <p className="text-sm text-muted-foreground">New lessons and content</p>
                                    </div>
                                    <Switch
                                        checked={notifications.courseUpdates}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Achievements</p>
                                        <p className="text-sm text-muted-foreground">When you earn badges or level up</p>
                                    </div>
                                    <Switch
                                        checked={notifications.achievements}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Team Activity</p>
                                        <p className="text-sm text-muted-foreground">When teammates complete courses</p>
                                    </div>
                                    <Switch
                                        checked={notifications.teamActivity}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, teamActivity: checked })}
                                    />
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Appearance Section */}
                    {activeSection === "appearance" && (
                        <Card className="p-6">
                            <h2 className="font-semibold mb-6">Appearance</h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="font-medium mb-3">Theme</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: "light", label: "Light", icon: Sun },
                                            { value: "dark", label: "Dark", icon: Moon },
                                            { value: "system", label: "System", icon: Smartphone },
                                        ].map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTheme(option.value as typeof theme)}
                                                    className={cn(
                                                        "p-4 rounded-xl border text-center transition-all",
                                                        theme === option.value
                                                            ? "bg-primary/10 border-primary/30"
                                                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                                    )}
                                                >
                                                    <Icon className="h-6 w-6 mx-auto mb-2" />
                                                    <p className="text-sm font-medium">{option.label}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Privacy Section */}
                    {activeSection === "privacy" && (
                        <Card className="p-6">
                            <h2 className="font-semibold mb-6">Privacy & Security</h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Public Profile</p>
                                        <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                                    </div>
                                    <Switch
                                        checked={privacy.showProfile}
                                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showProfile: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Show Progress</p>
                                        <p className="text-sm text-muted-foreground">Display learning progress publicly</p>
                                    </div>
                                    <Switch
                                        checked={privacy.showProgress}
                                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showProgress: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Appear on Leaderboard</p>
                                        <p className="text-sm text-muted-foreground">Show your ranking publicly</p>
                                    </div>
                                    <Switch
                                        checked={privacy.showOnLeaderboard}
                                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showOnLeaderboard: checked })}
                                    />
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Data Section */}
                    {activeSection === "data" && (
                        <>
                            <Card className="p-6">
                                <h2 className="font-semibold mb-4">Export Data</h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Download a copy of your learning data, progress, and achievements.
                                </p>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Export as JSON
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Export as CSV
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-6 border-red-500/20">
                                <h2 className="font-semibold mb-4 text-red-500">Danger Zone</h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Once you delete your account, there is no going back.
                                </p>
                                <Button variant="outline" className="gap-2 text-red-500 border-red-500/30 hover:bg-red-500/10">
                                    <Trash2 className="h-4 w-4" />
                                    Delete Account
                                </Button>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
