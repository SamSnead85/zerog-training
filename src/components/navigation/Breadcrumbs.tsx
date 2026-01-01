"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
    className?: string;
}

// Auto-generate breadcrumbs from pathname if not provided
const pathLabels: Record<string, string> = {
    "": "Home",
    "learn": "Learn",
    "training": "Training",
    "dashboard": "Dashboard",
    "preview": "Preview",
    "pricing": "Pricing",
    "enterprise": "Enterprise",
    "native": "Framework",
    "checkout": "Checkout",
    "settings": "Settings",
    "studio": "Studio",
    "tracks": "Tracks",
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    const pathname = usePathname();

    // Auto-generate items if not provided
    const breadcrumbItems: BreadcrumbItem[] = items || (() => {
        const segments = pathname?.split("/").filter(Boolean) || [];
        const autoItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

        let currentPath = "";
        for (const segment of segments) {
            currentPath += `/${segment}`;
            const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
            autoItems.push({ label, href: currentPath });
        }

        return autoItems;
    })();

    if (breadcrumbItems.length <= 1) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex items-center gap-1 text-sm text-white/50", className)}
        >
            {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                const isFirst = index === 0;

                return (
                    <div key={item.href} className="flex items-center gap-1">
                        {index > 0 && (
                            <ChevronRight className="h-3 w-3 text-white/30" />
                        )}
                        {isLast ? (
                            <span className="text-white/80 font-medium truncate max-w-[200px]">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-white transition-colors flex items-center gap-1"
                            >
                                {isFirst && <Home className="h-3 w-3" />}
                                <span className="truncate max-w-[150px]">{!isFirst && item.label}</span>
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

// Compact version for mobile
export function BreadcrumbsCompact({ className }: { className?: string }) {
    const pathname = usePathname();
    const segments = pathname?.split("/").filter(Boolean) || [];

    if (segments.length === 0) return null;

    const currentPage = segments[segments.length - 1];
    const label = pathLabels[currentPage] || currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace(/-/g, " ");
    const parentHref = "/" + segments.slice(0, -1).join("/") || "/";

    return (
        <Link
            href={parentHref}
            className={cn("flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors", className)}
        >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back</span>
        </Link>
    );
}
