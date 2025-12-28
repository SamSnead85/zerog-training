"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
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
    Moon,
    Sun,
    PanelLeftClose,
    PanelLeft,
    ChevronDown,
    Home,
    Compass,
    FileText,
    Zap,
    Boxes,
    Brain,
} from "lucide-react";
import { Button, Avatar, Badge } from "@/components/ui";

// Sidebar Context for global state
interface SidebarContextType {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    hovering: boolean;
    setHovering: (hovering: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
    collapsed: false,
    setCollapsed: () => { },
    hovering: false,
    setHovering: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

// Types
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
}

// Navigation Configuration
const navGroups: NavGroup[] = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "AI-Native Training", href: "/ai-native", icon: Brain, badge: "New", badgeVariant: "success" },
            { label: "Create Training", href: "/create", icon: Sparkles, badge: "AI", badgeVariant: "primary" },
        ],
    },
    {
        title: "Learn",
        collapsible: true,
        items: [
            { label: "My Learning", href: "/learning", icon: GraduationCap },
            { label: "Content Library", href: "/library", icon: BookOpen },
            { label: "Learning Paths", href: "/paths", icon: Route },
            { label: "Leaderboard", href: "/leaderboard", icon: Medal },
            { label: "Certificates", href: "/certificates", icon: Award },
        ],
    },
    {
        title: "Manage",
        collapsible: true,
        items: [
            { label: "Org Dashboard", href: "/org", icon: Building2 },
            { label: "Assign Training", href: "/assign", icon: UserPlus, badge: "3", badgeVariant: "default" },
            { label: "Team Progress", href: "/progress", icon: Target },
            { label: "Workforce", href: "/workforce", icon: Users },
            { label: "Compliance", href: "/compliance", icon: ShieldCheck },
            { label: "Reports", href: "/reports", icon: BarChart3 },
            { label: "Audit Log", href: "/audit", icon: FileText },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Integrations", href: "/integrations", icon: Plug },
            { label: "Settings", href: "/settings", icon: Settings },
            { label: "Help & Support", href: "/help", icon: HelpCircle },
        ],
    },
];

// Quick Action Widget
function QuickActions({ collapsed }: { collapsed: boolean }) {
    if (collapsed) return null;

    return (
        <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Link
                    href="/create"
                    className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center"
                >
                    <Plus className="h-4 w-4 text-primary" />
                    <span className="text-[10px] text-muted-foreground">Create</span>
                </Link>
                <Link
                    href="/library"
                    className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center"
                >
                    <Compass className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">Browse</span>
                </Link>
            </div>
        </div>
    );
}

// User Profile Widget
function UserWidget({ collapsed }: { collapsed: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="p-3 border-t border-border">
            <button
                onClick={() => !collapsed && setMenuOpen(!menuOpen)}
                className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors",
                    collapsed && "justify-center"
                )}
            >
                <Avatar size="sm" name="John Smith" />
                {!collapsed && (
                    <>
                        <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium truncate">John Smith</p>
                            <p className="text-xs text-muted-foreground truncate">Admin</p>
                        </div>
                        <ChevronDown className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform",
                            menuOpen && "rotate-180"
                        )} />
                    </>
                )}
            </button>

            {/* Dropdown Menu */}
            {menuOpen && !collapsed && (
                <div className="mt-2 p-1 rounded-lg bg-background border border-border">
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <hr className="my-1 border-border" />
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm text-red-400">
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}

// Nav Link with native title tooltip
function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
    const pathname = usePathname();
    const Icon = item.icon;
    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

    return (
        <Link
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0 mx-3"
            )}
        >
            <div className={cn(
                "flex items-center justify-center w-5 h-5",
                isActive && "text-primary"
            )}>
                <Icon className="h-5 w-5" />
            </div>
            {!collapsed && (
                <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                        <Badge
                            variant="secondary"
                            className={cn(
                                "text-xs px-1.5 py-0 h-5",
                                item.badgeVariant === "primary" && "bg-primary/20 text-primary",
                                item.badgeVariant === "success" && "bg-emerald-500/20 text-emerald-400",
                                item.badgeVariant === "warning" && "bg-amber-500/20 text-amber-400"
                            )}
                        >
                            {item.badge}
                        </Badge>
                    )}
                </>
            )}
        </Link>
    );
}

// Enhanced Sidebar Component
export function EnhancedSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
    const pathname = usePathname();

    // Auto-expand collapsed state on hover
    const isExpanded = !collapsed || hovering;

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
        <SidebarContext.Provider value={{ collapsed, setCollapsed, hovering, setHovering }}>
            <aside
                onMouseEnter={() => collapsed && setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={cn(
                    "flex flex-col h-screen bg-black/40 backdrop-blur-xl border-r border-white/5 transition-all duration-300 sticky top-0 z-30",
                    collapsed && !hovering ? "w-[72px]" : "w-64"
                )}
            >
                {/* Logo & Collapse Toggle */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                            <Boxes className="h-5 w-5 text-primary" />
                        </div>
                        {isExpanded && (
                            <span className="text-xl font-bold tracking-tight">
                                Zero<span className="text-primary">G</span>
                            </span>
                        )}
                    </Link>
                    {isExpanded && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            className="h-8 w-8"
                        >
                            {collapsed ? (
                                <PanelLeft className="h-4 w-4" />
                            ) : (
                                <PanelLeftClose className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                </div>

                {/* Quick Actions */}
                {isExpanded && <QuickActions collapsed={!isExpanded} />}

                {/* Navigation Groups */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {navGroups.map((group) => {
                        const isGroupCollapsed = collapsedGroups.has(group.title);

                        return (
                            <div key={group.title} className="mb-4">
                                {isExpanded && (
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
                                        {group.items.map((item) => (
                                            <li key={item.href}>
                                                <NavLink item={item} collapsed={!isExpanded} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* User Widget */}
                <UserWidget collapsed={!isExpanded} />
            </aside>
        </SidebarContext.Provider>
    );
}

export default EnhancedSidebar;
