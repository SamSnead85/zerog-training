"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const pathLabels: Record<string, string> = {
    "dashboard": "Dashboard",
    "create": "Create Training",
    "org": "Organization",
    "assign": "Assign Training",
    "progress": "Team Progress",
    "workforce": "Workforce",
    "compliance": "Compliance",
    "reports": "Reports",
    "audit": "Audit Log",
    "library": "Content Library",
    "learning": "My Learning",
    "my-progress": "My Progress",
    "leaderboard": "Leaderboard",
    "certificates": "Certificates",
    "curriculum": "AI Curriculum",
    "context": "Enterprise Context",
    "notifications": "Notifications",
    "settings": "Settings",
    "profile": "Profile",
    "help": "Help Center",
    "integrations": "Integrations",
    "healthcare": "Healthcare",
    "studio": "Content Studio",
    "pricing": "Pricing",
    "team": "Team",
};

export function Breadcrumbs() {
    const pathname = usePathname();

    if (!pathname || pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <Link
                href="/dashboard"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
                <Home className="h-3.5 w-3.5" />
            </Link>
            {segments.map((segment, i) => {
                const path = "/" + segments.slice(0, i + 1).join("/");
                const isLast = i === segments.length - 1;
                const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                    <span key={segment} className="flex items-center gap-1.5">
                        <ChevronRight className="h-3.5 w-3.5" />
                        {isLast ? (
                            <span className="font-medium text-foreground">{label}</span>
                        ) : (
                            <Link
                                href={path}
                                className="hover:text-foreground transition-colors"
                            >
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
