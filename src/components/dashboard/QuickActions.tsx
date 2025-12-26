"use client";

import { Card, Button } from "@/components/ui";
import {
    Sparkles,
    BookOpen,
    Users,
    BarChart3,
    FileText,
    Settings,
    Plus,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface QuickAction {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    color: string;
}

const quickActions: QuickAction[] = [
    { title: "Generate Training", description: "Create AI-powered curriculum", href: "/curriculum", icon: Sparkles, color: "text-purple-500" },
    { title: "Browse Library", description: "Explore pre-built courses", href: "/library", icon: BookOpen, color: "text-blue-500" },
    { title: "Manage Team", description: "View team progress", href: "/workforce", icon: Users, color: "text-emerald-500" },
    { title: "View Reports", description: "Analytics & compliance", href: "/reports", icon: BarChart3, color: "text-amber-500" },
    { title: "Assign Training", description: "Create new assignments", href: "/assignments", icon: FileText, color: "text-pink-500" },
    { title: "Settings", description: "Configure platform", href: "/context", icon: Settings, color: "text-zinc-400" },
];

export function QuickActionsGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                    <Link key={action.href} href={action.href}>
                        <Card className="p-4 h-full hover:border-primary/30 transition-all group cursor-pointer">
                            <Icon className={`h-6 w-6 mb-3 ${action.color}`} />
                            <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {action.description}
                            </p>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}

interface AdminQuickAction {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
}

const adminActions: AdminQuickAction[] = [
    { title: "Create New Course", description: "Build a custom training course", href: "/studio/create", icon: Plus },
    { title: "Import Users", description: "Bulk import employees", href: "/workforce", icon: Users },
    { title: "Generate AI Curriculum", description: "Create personalized training", href: "/curriculum", icon: Sparkles, badge: "AI" },
];

export function AdminQuickActions() {
    return (
        <Card className="p-6">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
                {adminActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link key={action.href} href={action.href}>
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                                            {action.title}
                                        </p>
                                        {action.badge && (
                                            <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                                                {action.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {action.description}
                                    </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Card>
    );
}
