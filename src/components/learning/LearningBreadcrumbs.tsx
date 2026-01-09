"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

interface LearningBreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function LearningBreadcrumbs({ items, className }: LearningBreadcrumbsProps) {
    return (
        <nav className={cn("flex items-center gap-2 text-sm", className)}>
            {/* Home link */}
            <Link
                href="/learn"
                className="text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
                <Home className="h-4 w-4" />
                <span className="sr-only">Learn</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-white/20" />
                        {isLast || !item.href ? (
                            <span className={cn(
                                "flex items-center gap-1.5",
                                isLast ? "text-white font-medium" : "text-white/50"
                            )}>
                                {item.icon}
                                <span className="max-w-[200px] truncate">{item.label}</span>
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5 max-w-[200px]"
                            >
                                {item.icon}
                                <span className="truncate">{item.label}</span>
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

// Compact breadcrumb for mobile
export function MobileBreadcrumb({
    currentTitle,
    backHref,
    backLabel = "Back",
}: {
    currentTitle: string;
    backHref: string;
    backLabel?: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <Link
                href={backHref}
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
                <ChevronRight className="h-4 w-4 rotate-180" />
                {backLabel}
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-sm font-medium truncate max-w-[200px]">{currentTitle}</span>
        </div>
    );
}
