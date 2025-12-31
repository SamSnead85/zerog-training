"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Loader2 } from "lucide-react";

// =============================================================================
// PUBLIC ROUTES CONFIGURATION
// =============================================================================

const PUBLIC_ROUTES = [
    "/",
    "/ai-native",
    "/native",
    "/native/methodology",
    "/enterprise",
    "/enterprise/pricing",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/security",
    "/faq",
    "/help",
    "/blog",
    "/careers",
    "/how-it-works",
    "/login",
    "/signup",
    "/demo",
    "/methodology",
    "/api-docs",
];

// Routes that start with these prefixes are also public
const PUBLIC_PREFIXES = [
    "/training/module-1", // Sample lesson is public
];

function isPublicRoute(pathname: string): boolean {
    // Exact match
    if (PUBLIC_ROUTES.includes(pathname)) {
        return true;
    }

    // Prefix match
    for (const prefix of PUBLIC_PREFIXES) {
        if (pathname.startsWith(prefix)) {
            return true;
        }
    }

    return false;
}

// =============================================================================
// ROUTE GUARD COMPONENT
// =============================================================================

interface RouteGuardProps {
    children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading, isAuthenticated } = useAuth();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check authorization when route changes
        const checkAuth = () => {
            const publicRoute = isPublicRoute(pathname);

            if (publicRoute) {
                // Public route - allow access
                setAuthorized(true);
                return;
            }

            if (!isLoading && !isAuthenticated) {
                // Not authenticated and trying to access protected route
                setAuthorized(false);
                router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
                return;
            }

            if (isAuthenticated) {
                setAuthorized(true);
            }
        };

        if (!isLoading) {
            checkAuth();
        }
    }, [pathname, isLoading, isAuthenticated, router]);

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // For public routes, always render
    if (isPublicRoute(pathname)) {
        return <>{children}</>;
    }

    // For protected routes, only render if authorized
    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

// =============================================================================
// ADMIN ROUTE GUARD
// =============================================================================

interface AdminRouteGuardProps {
    children: ReactNode;
    requiredRoles?: ("SUPER_ADMIN" | "ORG_ADMIN")[];
}

export function AdminRouteGuard({ children, requiredRoles = ["SUPER_ADMIN", "ORG_ADMIN"] }: AdminRouteGuardProps) {
    const router = useRouter();
    const { user, isLoading, hasRole } = useAuth();

    useEffect(() => {
        if (!isLoading && user) {
            const hasRequiredRole = requiredRoles.some(role => hasRole(role));
            if (!hasRequiredRole) {
                router.push("/dashboard");
            }
        }
    }, [isLoading, user, hasRole, requiredRoles, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Checking permissions...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const hasRequiredRole = requiredRoles.some(role => hasRole(role));
    if (!hasRequiredRole) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                    <p className="text-muted-foreground">You don't have permission to access this page.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
