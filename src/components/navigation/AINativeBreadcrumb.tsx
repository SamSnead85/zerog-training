"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AINativeBreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function AINativeBreadcrumb({ items, className }: AINativeBreadcrumbProps) {
    return (
        <nav className={cn("flex items-center gap-2 text-sm", className)}>
            <Link
                href="/training"
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
                <Home className="h-4 w-4" />
                <span>AI-Native</span>
            </Link>

            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}

export default AINativeBreadcrumb;
