"use client";

/**
 * Stats Card Component
 * 
 * Animated statistics cards with trends, comparisons,
 * and interactive hover effects.
 */

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ArrowRight, Info } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

interface StatsCardProps {
    title: string;
    value: string | number;
    previousValue?: number;
    change?: number;
    changeLabel?: string;
    changeDirection?: "up" | "down" | "neutral";
    suffix?: string;
    prefix?: string;
    icon?: React.ElementType;
    href?: string;
    description?: string;
    loading?: boolean;
    className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatsCard({
    title,
    value,
    previousValue,
    change,
    changeLabel,
    changeDirection,
    suffix,
    prefix,
    icon: Icon,
    href,
    description,
    loading,
    className,
}: StatsCardProps) {
    // Calculate change if not provided
    const calculatedChange = change ?? (previousValue ? ((Number(value) - previousValue) / previousValue) * 100 : undefined);
    const direction = changeDirection ?? (calculatedChange ? (calculatedChange > 0 ? "up" : calculatedChange < 0 ? "down" : "neutral") : undefined);

    const TrendIcon = direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;
    const trendColors = {
        up: "text-emerald-400",
        down: "text-red-400",
        neutral: "text-muted-foreground",
    };

    const content = (
        <div
            className={cn(
                "rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all",
                "hover:border-white/20 hover:bg-white/[0.04]",
                href && "cursor-pointer",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    {Icon && (
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                        {description && (
                            <div className="group relative">
                                <Info className="h-3.5 w-3.5 text-muted-foreground/50 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-popover border border-border rounded-lg text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-50">
                                    {description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {href && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
            </div>

            {/* Value */}
            {loading ? (
                <div className="h-10 bg-muted/50 rounded-lg animate-pulse mb-3" />
            ) : (
                <div className="text-3xl font-bold mb-3">
                    {prefix}
                    {typeof value === "number" ? value.toLocaleString() : value}
                    {suffix}
                </div>
            )}

            {/* Change Indicator */}
            {direction && calculatedChange !== undefined && (
                <div className="flex items-center gap-2">
                    <div className={cn("flex items-center gap-1", trendColors[direction])}>
                        <TrendIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                            {Math.abs(calculatedChange).toFixed(1)}%
                        </span>
                    </div>
                    {changeLabel && (
                        <span className="text-sm text-muted-foreground">{changeLabel}</span>
                    )}
                </div>
            )}
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block">
                {content}
            </a>
        );
    }

    return content;
}

// =============================================================================
// STATS GRID
// =============================================================================

interface StatsGridProps {
    children: React.ReactNode;
    columns?: 2 | 3 | 4;
    className?: string;
}

export function StatsGrid({ children, columns = 4, className }: StatsGridProps) {
    const columnClasses = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <div className={cn("grid gap-4", columnClasses[columns], className)}>
            {children}
        </div>
    );
}

// =============================================================================
// MINI STATS
// =============================================================================

interface MiniStatsProps {
    label: string;
    value: string | number;
    change?: number;
    className?: string;
}

export function MiniStats({ label, value, change, className }: MiniStatsProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div className={cn("flex items-center justify-between py-2", className)}>
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="flex items-center gap-2">
                <span className="font-medium">
                    {typeof value === "number" ? value.toLocaleString() : value}
                </span>
                {change !== undefined && (
                    <span
                        className={cn(
                            "text-xs font-medium",
                            isPositive && "text-emerald-400",
                            isNegative && "text-red-400",
                            !isPositive && !isNegative && "text-muted-foreground"
                        )}
                    >
                        {isPositive && "+"}
                        {change.toFixed(1)}%
                    </span>
                )}
            </div>
        </div>
    );
}

// =============================================================================
// PROGRESS STAT
// =============================================================================

interface ProgressStatProps {
    label: string;
    value: number;
    max?: number;
    suffix?: string;
    className?: string;
}

export function ProgressStat({ label, value, max = 100, suffix, className }: ProgressStatProps) {
    const percentage = Math.min(100, (value / max) * 100);

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">
                    {value.toLocaleString()}{suffix && ` ${suffix}`}
                    {max !== 100 && <span className="text-muted-foreground"> / {max.toLocaleString()}</span>}
                </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default {
    StatsCard,
    StatsGrid,
    MiniStats,
    ProgressStat,
};
