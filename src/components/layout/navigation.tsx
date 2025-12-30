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
    Brain,
    ChevronDown,
} from "lucide-react";
import { Button, Avatar, Badge } from "@/components/ui";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    badgeVariant?: "default" | "primary" | "success" | "warning";
}

interface NavGroup {
    title: string;
    items: NavItem[];
    collapsible?: boolean;
    managerOnly?: boolean;
}

// Simplified Navigation Configuration - Role-Based
const navGroups: NavGroup[] = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "My Learning", href: "/learning", icon: GraduationCap },
        ],
    },
    {
        title: "NATIVE Training",
        items: [
            { label: "AI-Native Courses", href: "/training", icon: Brain, badge: "NATIVE", badgeVariant: "success" },
            { label: "Certifications", href: "/certificates", icon: Award },
        ],
    },
    {
        title: "Manager View",
        collapsible: true,
        managerOnly: true,
        items: [
            { label: "Team Overview", href: "/team", icon: Users },
            { label: "Assign Training", href: "/assign", icon: UserPlus, badge: "3", badgeVariant: "default" },
            { label: "Progress Reports", href: "/reports", icon: BarChart3 },
            { label: "Compliance", href: "/compliance", icon: ShieldCheck },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Settings", href: "/settings", icon: Settings },
            { label: "Help", href: "/help", icon: HelpCircle },
        ],
    },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
    const pathname = usePathname();

    // Role-based visibility - In production, this would come from auth context
    const [isManager] = useState(true);

    // Filter navigation groups based on user role
    const filteredNavGroups = navGroups.filter(group => {
        if (group.managerOnly && !isManager) return false;
        return true;
    });

    const toggleGroup = (title: string) => {
        const newCollapsed = new Set(collapsedGroups);
        if (newCollapsed.has(title)) {
            newCollapsed.delete(title);
        } else {
            newCollapsed.add(title);
        }
        setCollapsedGroups(newCollapsed);
    };

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-black/40 backdrop-blur-xl border-r border-white/5 transition-all duration-300 sticky top-0",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2">
                    {!collapsed ? (
                        <span className="font-playfair text-xl font-medium tracking-tight italic text-white">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    ) : (
                        <span className="font-playfair text-xl font-bold italic text-white">S</span>
                    )}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8 text-white/40 hover:text-white"
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Navigation Groups */}
            <nav className="flex-1 overflow-y-auto py-4">
                {filteredNavGroups.map((group) => {
                    const isGroupCollapsed = collapsedGroups.has(group.title);

                    return (
                        <div key={group.title} className="mb-4">
                            {!collapsed && (
                                <button
                                    onClick={() => group.collapsible && toggleGroup(group.title)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-6 mb-2",
                                        group.collapsible && "cursor-pointer hover:text-foreground"
                                    )}
                                >
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        {group.title}
                                    </span>
                                    {group.collapsible && (
                                        <ChevronDown className={cn(
                                            "h-3 w-3 text-muted-foreground transition-transform",
                                            isGroupCollapsed && "-rotate-90"
                                        )} />
                                    )}
                                </button>
                            )}

                            {(!group.collapsible || !isGroupCollapsed) && (
                                <ul className="space-y-1 px-3">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
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
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={cn(
                                                                        "text-xs px-1.5 py-0 h-5",
                                                                        item.badgeVariant === "success" && "bg-emerald-500/20 text-emerald-400"
                                                                    )}
                                                                >
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
                            )}
                        </div>
                    );
                })}
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
