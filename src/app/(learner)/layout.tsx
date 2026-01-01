"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    Award,
    User,
    Menu,
    X,
    GraduationCap,
    Sparkles,
    LogOut,
} from "lucide-react";
import { LogoIcon } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

interface LearnerLayoutProps {
    children: React.ReactNode;
}

export default function LearnerLayout({ children }: LearnerLayoutProps) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if user is logged in (for demo)
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("learner_user");

    const navItems = [
        { href: "/learn", label: "Courses", icon: BookOpen },
        { href: "/learn/tracks", label: "Certifications", icon: GraduationCap },
        ...(isLoggedIn ? [
            { href: "/learn/dashboard", label: "My Learning", icon: Sparkles },
            { href: "/learn/certifications", label: "My Certificates", icon: Award },
        ] : []),
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/learn" className="flex items-center gap-2">
                            <LogoIcon size={32} />
                            <span className="text-lg font-semibold">
                                Scaled<span className="text-cyan-400">Native</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href ||
                                    (item.href !== "/learn" && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/learn/dashboard"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    >
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("learner_user");
                                            window.location.href = "/learn";
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/learn/login"
                                        className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/learn/signup"
                                        className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        Start Learning
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-muted/50"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border/50 bg-background">
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-border/50 space-y-2">
                                {isLoggedIn ? (
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("learner_user");
                                            window.location.href = "/learn";
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Sign Out
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href="/learn/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-lg text-sm font-medium text-center text-muted-foreground"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/learn/signup"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-lg text-sm font-medium text-center bg-primary text-primary-foreground"
                                        >
                                            Start Learning
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-border/50 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <LogoIcon size={24} />
                            <span className="text-sm">© 2024 ScaledNative Training</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                            <Link href="/terms" className="hover:text-foreground">Terms</Link>
                            <Link href="/contact" className="hover:text-foreground">Contact</Link>
                            <Link href="/enterprise" className="hover:text-foreground">Enterprise</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
