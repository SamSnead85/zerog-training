"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    Plus,
    Bell,
    Search,
    LogOut,
    User,
    HelpCircle,
    Medal,
    Award,
    Route,
    Plug,
    ShieldCheck,
    Building2,
    Sparkles,
    Target,
    UserPlus,
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
    { label: "Create Training", href: "/create", icon: Sparkles, badge: "AI" },
    { label: "My Learning", href: "/learning", icon: GraduationCap },
    { label: "Content Library", href: "/library", icon: BookOpen },
    { label: "Leaderboard", href: "/leaderboard", icon: Medal },
    { label: "Certificates", href: "/certificates", icon: Award },
];

const adminNav: NavItem[] = [
    { label: "Org Dashboard", href: "/org", icon: Building2 },
    { label: "Assign Training", href: "/assign", icon: UserPlus },
    { label: "Team Progress", href: "/progress", icon: Target },
    { label: "Workforce", href: "/workforce", icon: Users },
    { label: "Compliance", href: "/compliance", icon: ShieldCheck },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Audit Log", href: "/audit", icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-black/40 backdrop-blur-xl border-r border-white/5 transition-all duration-300 sticky top-0",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="ScaledNative"
                        width={36}
                        height={36}
                        className="rounded-lg flex-shrink-0"
                    />
                    {!collapsed && (
                        <span className="text-xl font-bold tracking-tight">
                            Scaled<span className="text-gradient">Native</span>
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
