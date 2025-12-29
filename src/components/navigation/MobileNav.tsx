"use client";

/**
 * Mobile Navigation Components
 * 
 * Touch-optimized navigation patterns for mobile and tablet devices.
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Menu,
    X,
    Home,
    BookOpen,
    GraduationCap,
    Award,
    User,
    Settings,
    Bell,
    Search,
    Plus,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { Avatar } from "@/components/ui";

// =============================================================================
// MOBILE BOTTOM NAV
// =============================================================================

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const bottomNavItems: NavItem[] = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Learn", href: "/learning", icon: GraduationCap },
    { label: "Create", href: "/create", icon: Plus },
    { label: "Library", href: "/library", icon: BookOpen },
    { label: "Profile", href: "/profile", icon: User },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden">
            <div className="flex items-center justify-around h-16 px-2">
                {bottomNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isCreate = item.href === "/create";

                    if (isCreate) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center w-14 h-14 -mt-4 rounded-full bg-primary text-primary-foreground shadow-lg"
                            >
                                <Icon className="h-6 w-6" />
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 py-2 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
            {/* Safe area padding for iPhone notch */}
            <div className="h-safe-bottom bg-background" />
        </nav>
    );
}

// =============================================================================
// MOBILE HEADER
// =============================================================================

interface MobileHeaderProps {
    title?: string;
    showSearch?: boolean;
    showNotifications?: boolean;
    onMenuClick?: () => void;
}

export function MobileHeader({
    title = "ScaledNative",
    showSearch = true,
    showNotifications = true,
    onMenuClick,
}: MobileHeaderProps) {
    return (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border lg:hidden">
            <div className="flex items-center justify-between h-14 px-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 rounded-lg hover:bg-muted"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="font-bold text-lg">
                        Scaled<span className="text-primary">Native</span>
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {showSearch && (
                        <Link
                            href="/search"
                            className="p-2 rounded-lg hover:bg-muted"
                        >
                            <Search className="h-5 w-5" />
                        </Link>
                    )}
                    {showNotifications && (
                        <Link
                            href="/notifications"
                            className="p-2 rounded-lg hover:bg-muted relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

// =============================================================================
// MOBILE DRAWER MENU
// =============================================================================

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const drawerNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "My Learning", href: "/learning", icon: GraduationCap },
    { label: "Content Library", href: "/library", icon: BookOpen },
    { label: "Create Training", href: "/create", icon: Sparkles, badge: "AI" },
    { label: "Certificates", href: "/certificates", icon: Award },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const pathname = usePathname();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background z-50 lg:hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-bold text-xl">
                        Scaled<span className="text-primary">Native</span>
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Avatar size="lg" name="John Smith" />
                        <div>
                            <p className="font-medium">John Smith</p>
                            <p className="text-sm text-muted-foreground">Admin</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-2">
                    {drawerNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="flex-1 font-medium">{item.label}</span>
                                {item.badge && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                        {item.badge}
                                    </span>
                                )}
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}

// =============================================================================
// MOBILE NAV WRAPPER
// =============================================================================

export function MobileNavWrapper({ children }: { children: React.ReactNode }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <MobileHeader onMenuClick={() => setDrawerOpen(true)} />
            <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
            <main className="pb-20 lg:pb-0">
                {children}
            </main>
            <MobileBottomNav />
        </>
    );
}
