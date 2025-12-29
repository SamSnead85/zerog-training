"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    BookOpen,
    Library,
    Trophy,
    Award,
    Wand2,
    Settings,
    X,
    Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Learning", href: "/learning", icon: BookOpen },
    { label: "Library", href: "/library", icon: Library },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Certificates", href: "/certificates", icon: Award },
    { label: "AI Studio", href: "/studio", icon: Wand2 },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const mainNavItems = navItems.slice(0, 5);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border md:hidden">
            <div className="flex items-center justify-around py-2 px-1">
                {mainNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                                isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
            {/* Safe area for devices with home indicator */}
            <div className="h-safe-area-bottom bg-background" />
        </nav>
    );
}

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const pathname = usePathname();

    // Close drawer when route changes
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 left-0 h-full w-72 z-50 bg-card border-r border-border md:hidden animate-slide-in-left">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="font-bold text-primary text-sm">Z</span>
                        </div>
                        <span className="font-semibold">ScaledNative</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <Link href="/settings">
                        <Button variant="outline" className="w-full gap-2">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export function MobileHeader() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="font-bold text-primary text-xs">Z</span>
                        </div>
                        <span className="font-semibold text-sm">ScaledNative</span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                        SC
                    </div>
                </div>
            </header>

            <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
}
