"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
    Menu,
    X,
    Home,
    BookOpen,
    Trophy,
    User,
    Settings,
    LogOut,
    ChevronRight,
    Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
    currentPath: string;
    userName?: string;
    streak?: number;
}

// Bottom navigation for mobile
export function MobileBottomNav({ currentPath }: { currentPath: string }) {
    const navItems = [
        { href: "/dashboard", icon: Home, label: "Home" },
        { href: "/learn", icon: BookOpen, label: "Learn" },
        { href: "/achievements", icon: Trophy, label: "Progress" },
        { href: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-white/10 md:hidden">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors",
                                isActive ? "text-primary" : "text-white/50"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

// Mobile slide-out menu
export function MobileSlideMenu({
    isOpen,
    onClose,
    userName,
    streak = 0,
}: {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
    streak?: number;
}) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />

            {/* Menu */}
            <div className="fixed inset-y-0 left-0 z-50 w-72 bg-black/95 border-r border-white/10 animate-in slide-in-from-left md:hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center font-medium">
                            {userName?.charAt(0) || "U"}
                        </div>
                        <div>
                            <p className="font-medium">{userName || "Guest"}</p>
                            {streak > 0 && (
                                <p className="text-xs text-amber-400 flex items-center gap-1">
                                    <Flame className="h-3 w-3" />
                                    {streak} day streak
                                </p>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    <MobileNavLink href="/dashboard" icon={Home} label="Dashboard" onClick={onClose} />
                    <MobileNavLink href="/learn" icon={BookOpen} label="My Learning" onClick={onClose} />
                    <MobileNavLink href="/achievements" icon={Trophy} label="Achievements" onClick={onClose} />
                    <MobileNavLink href="/profile" icon={User} label="Profile" onClick={onClose} />
                    <MobileNavLink href="/settings" icon={Settings} label="Settings" onClick={onClose} />
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
}

function MobileNavLink({
    href,
    icon: Icon,
    label,
    onClick,
}: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
        >
            <Icon className="h-5 w-5 text-white/60" />
            <span>{label}</span>
            <ChevronRight className="h-4 w-4 text-white/30 ml-auto" />
        </Link>
    );
}

// Mobile header with menu toggle
export function MobileHeader({
    title,
    onMenuClick,
    rightAction,
}: {
    title?: string;
    onMenuClick: () => void;
    rightAction?: React.ReactNode;
}) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-black/95 border-b border-white/10 flex items-center px-4 md:hidden">
            <button onClick={onMenuClick} className="p-2 -ml-2 hover:bg-white/10 rounded-lg">
                <Menu className="h-5 w-5" />
            </button>
            {title && (
                <h1 className="font-semibold ml-3 truncate flex-1">{title}</h1>
            )}
            {rightAction}
        </header>
    );
}

// Safe area wrapper for mobile
export function SafeAreaWrapper({
    children,
    hasBottomNav = true,
}: {
    children: React.ReactNode;
    hasBottomNav?: boolean;
}) {
    return (
        <div className={cn(
            "min-h-screen pt-14 md:pt-0",
            hasBottomNav && "pb-20 md:pb-0"
        )}>
            {children}
        </div>
    );
}

// Responsive container
export function ResponsiveContainer({
    children,
    className,
    maxWidth = "7xl",
}: {
    children: React.ReactNode;
    className?: string;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}) {
    const widthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
    };

    return (
        <div className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8",
            widthClasses[maxWidth],
            className
        )}>
            {children}
        </div>
    );
}
