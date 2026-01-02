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
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdaptiveLearningProvider } from "@/lib/adaptive";

interface LearnerLayoutProps {
    children: React.ReactNode;
}

export default function LearnerLayout({ children }: LearnerLayoutProps) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if user is logged in
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("learner_user");

    const navItems = [
        { href: "/learn/courses", label: "Courses", icon: BookOpen },
        { href: "/learn/tracks", label: "Certifications", icon: GraduationCap },
        ...(isLoggedIn ? [
            { href: "/learn/dashboard", label: "My Learning", icon: User },
            { href: "/learn/certifications", label: "My Certificates", icon: Award },
        ] : []),
    ];

    return (
        <AdaptiveLearningProvider>
            <div className="min-h-screen bg-black text-white">
                {/* Header - Premium Dark */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Premium Logo */}
                            <Link href="/learn" className="flex items-center gap-3">
                                <span className="font-playfair text-2xl font-medium tracking-tight italic">
                                    ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-8">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href ||
                                        (item.href !== "/learn" && pathname.startsWith(item.href));
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "text-sm transition-colors",
                                                isActive
                                                    ? "text-white"
                                                    : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-4">
                                {isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/learn/dashboard"
                                            className="text-sm text-white/40 hover:text-white transition-colors"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("learner_user");
                                                window.location.href = "/learn";
                                            }}
                                            className="text-sm text-white/40 hover:text-white transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/learn/login"
                                            className="text-sm text-white/40 hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/learn/signup"
                                            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 rounded-lg text-white/60 hover:text-white"
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
                        <div className="md:hidden border-t border-white/5 bg-black">
                            <div className="px-6 py-6 space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "block px-4 py-3 rounded-lg text-sm font-medium",
                                                isActive
                                                    ? "text-white bg-white/5"
                                                    : "text-white/50"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                                <div className="pt-4 border-t border-white/5 space-y-2">
                                    {isLoggedIn ? (
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("learner_user");
                                                window.location.href = "/learn";
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/50"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            Sign Out
                                        </button>
                                    ) : (
                                        <>
                                            <Link
                                                href="/learn/login"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-4 py-3 rounded-lg text-sm font-medium text-center text-white/50"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/learn/signup"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-4 py-3 rounded-full text-sm font-medium text-center bg-white text-black"
                                            >
                                                Get Started
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                {/* Spacer for fixed header */}
                <div className="h-20" />

                {/* Main Content */}
                <main>{children}</main>

                {/* Footer - Premium Minimal */}
                <footer className="border-t border-white/5 py-12 mt-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <span className="font-playfair text-lg italic">
                                ScaledNative<sup className="text-[8px]">™</sup>
                            </span>
                            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/30">
                                <Link href="/learn/courses" className="hover:text-white transition-colors">Courses</Link>
                                <Link href="/learn/tracks" className="hover:text-white transition-colors">Certifications</Link>
                                <Link href="/" className="hover:text-white transition-colors">For Teams</Link>
                                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            </div>
                            <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
                        </div>
                    </div>
                </footer>
            </div>
        </AdaptiveLearningProvider>
    );
}

