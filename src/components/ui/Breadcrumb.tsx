"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Route name mappings
    const nameMap: Record<string, string> = {
        dashboard: "Dashboard",
        learning: "My Learning",
        library: "Content Library",
        leaderboard: "Leaderboard",
        certificates: "Certificates",
        create: "Create Training",
        studio: "AI Studio",
        org: "Organization",
        assign: "Assign Training",
        progress: "Team Progress",
        workforce: "Workforce",
        compliance: "Compliance",
        reports: "Reports",
        audit: "Audit Log",
        settings: "Settings",
        profile: "Profile",
        module: "Module",
        help: "Help Center",
        search: "Search",
        paths: "Learning Paths",
        achievements: "Achievements",
        notifications: "Notifications",
        healthcare: "Healthcare",
        enterprise: "Enterprise",
        integrations: "Integrations",
        team: "Team",
        analytics: "Analytics",
    };

    let currentPath = "";

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;

        // Skip dynamic segments display, show as "Details"
        const label = segment.startsWith("[") ? "Details" : (nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1));

        breadcrumbs.push({
            label,
            href: isLast ? undefined : currentPath,
        });
    });

    return breadcrumbs;
}

export function Breadcrumb() {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    if (breadcrumbs.length <= 1) return null;

    return (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <Link
                href="/dashboard"
                className="flex items-center hover:text-foreground transition-colors"
            >
                <Home className="h-4 w-4" />
            </Link>

            {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-1">
                    <ChevronRight className="h-4 w-4" />
                    {crumb.href ? (
                        <Link
                            href={crumb.href}
                            className="hover:text-foreground transition-colors"
                        >
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">
                            {crumb.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
