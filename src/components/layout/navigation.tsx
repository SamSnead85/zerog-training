"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    Trophy,
    Settings,
    Users,
    BarChart3,
    FolderOpen,
    ChevronLeft,
    ChevronRight,
    Rocket,
    Plus,
    Bell,
    Search,
    LogOut,
    User,
    HelpCircle,
} from "lucide-react";
import { Button, Avatar, Badge } from "@/components/ui";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
}

const mainNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Learning", href: "/learning", icon: GraduationCap },
    { label: "Library", href: "/library", icon: BookOpen, badge: "50+" },
    { label: "Achievements", href: "/achievements", icon: Trophy },
];

const adminNav: NavItem[] = [
    { label: "Content Studio", href: "/studio", icon: FolderOpen },
    { label: "Team", href: "/team", icon: Users },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-card border-r border-border transition-all duration-300 sticky top-0",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary flex-shrink-0">
                        <Rocket className="h-5 w-5 text-background" />
                    </div>
                    {!collapsed && (
                        <span className="text-xl font-bold">
                            Zero<span className="text-gradient">G</span>
                        </span>
                    )}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8"
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Create Button */}
            <div className="p-3">
                <Link href="/studio/create">
                    <Button
                        className={cn("w-full", collapsed && "px-0 justify-center")}
                        size={collapsed ? "icon" : "default"}
                    >
                        <Plus className="h-4 w-4" />
                        {!collapsed && <span className="ml-2">Create Module</span>}
                    </Button>
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-3 mb-6">
                    {!collapsed && (
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
                            Learn
                        </p>
                    )}
                    <ul className="space-y-1">
                        {mainNav.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            collapsed && "justify-center px-0"
                                        )}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1">{item.label}</span>
                                                {item.badge && (
                                                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="px-3">
                    {!collapsed && (
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
                            Manage
                        </p>
                    )}
                    <ul className="space-y-1">
                        {adminNav.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            collapsed && "justify-center px-0"
                                        )}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && <span>{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* Bottom section - user */}
            <div className="p-3 border-t border-border">
                <div
                    className={cn(
                        "flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer",
                        collapsed && "justify-center"
                    )}
                >
                    <Avatar size="sm" name="John Smith" />
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">John Smith</p>
                            <p className="text-xs text-muted-foreground truncate">Admin</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export function TopBar() {
    return (
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-40">
            <div className="h-full flex items-center justify-between px-6">
                {/* Search */}
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search courses, topics, or skills..."
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <HelpCircle className="h-5 w-5" />
                    </Button>
                    <div className="h-8 w-px bg-border mx-2" />
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Avatar size="sm" name="John Smith" />
                        <span className="hidden md:inline">John Smith</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
