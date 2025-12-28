"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "elevated" | "interactive" | "gradient";
    blur?: "sm" | "md" | "lg" | "xl";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    glow?: boolean;
    onClick?: () => void;
}

export function GlassCard({
    children,
    className,
    variant = "default",
    blur = "md",
    padding = "md",
    glow = false,
    onClick,
}: GlassCardProps) {
    const blurValues = {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
    };

    const paddingValues = {
        none: "",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
    };

    const variantStyles = {
        default: "bg-white/[0.02] border-white/10",
        elevated: "bg-white/[0.03] border-white/5 shadow-lg",
        interactive: "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer hover:-translate-y-0.5",
        gradient: "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/10",
    };

    const Component = onClick ? "button" : "div";

    return (
        <Component
            onClick={onClick}
            className={cn(
                "relative rounded-2xl border overflow-hidden",
                blurValues[blur],
                paddingValues[padding],
                variantStyles[variant],
                glow && "shadow-[0_0_40px_rgba(234,179,8,0.1)]",
                className
            )}
        >
            {children}
        </Component>
    );
}

// Skeleton Loading States
interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular" | "rounded";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "shimmer" | "none";
}

export function Skeleton({
    className,
    variant = "text",
    width,
    height,
    animation = "shimmer",
}: SkeletonProps) {
    const variantStyles = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-none",
        rounded: "rounded-xl",
    };

    const animationStyles = {
        pulse: "animate-pulse",
        shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        none: "",
    };

    return (
        <div
            className={cn(
                "bg-white/10",
                variantStyles[variant],
                animationStyles[animation],
                className
            )}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
            }}
        />
    );
}

// Card Skeleton for loading course cards
export function CardSkeleton() {
    return (
        <GlassCard className="space-y-4">
            <Skeleton variant="rounded" className="w-full h-40" />
            <div className="space-y-2">
                <Skeleton width="60%" height={20} />
                <Skeleton width="100%" />
                <Skeleton width="80%" />
            </div>
            <div className="flex gap-2">
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
            </div>
        </GlassCard>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <div className="flex items-center gap-4 py-4 border-b border-white/5">
            <Skeleton variant="circular" width={40} height={40} />
            {Array.from({ length: columns - 1 }).map((_, i) => (
                <Skeleton key={i} className="flex-1" height={16} />
            ))}
        </div>
    );
}

// Stats Card Skeleton
export function StatsCardSkeleton() {
    return (
        <GlassCard className="space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton width={100} height={14} />
                <Skeleton variant="circular" width={32} height={32} />
            </div>
            <Skeleton width={80} height={32} />
            <Skeleton width="60%" height={12} />
        </GlassCard>
    );
}

// Metric Display with Trend
interface MetricCardProps {
    label: string;
    value: string | number;
    trend?: {
        value: number;
        direction: "up" | "down" | "neutral";
    };
    icon?: ReactNode;
    className?: string;
}

export function MetricCard({ label, value, trend, icon, className }: MetricCardProps) {
    return (
        <GlassCard className={cn("relative", className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1 text-sm mt-2",
                            trend.direction === "up" && "text-emerald-400",
                            trend.direction === "down" && "text-red-400",
                            trend.direction === "neutral" && "text-muted-foreground"
                        )}>
                            {trend.direction === "up" && "↑"}
                            {trend.direction === "down" && "↓"}
                            {trend.direction === "neutral" && "→"}
                            <span>{Math.abs(trend.value)}% vs last period</span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {icon}
                    </div>
                )}
            </div>
        </GlassCard>
    );
}

// Loading Spinner
interface SpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
    const sizeStyles = {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-3",
        xl: "h-12 w-12 border-4",
    };

    return (
        <div
            className={cn(
                "animate-spin rounded-full border-primary border-t-transparent",
                sizeStyles[size],
                className
            )}
        />
    );
}

// Full Page Loading State
export function PageLoader({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
            <Spinner size="xl" />
            <p className="text-muted-foreground">{message}</p>
        </div>
    );
}

// Empty State
interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
            {icon && (
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-muted-foreground">
                    {icon}
                </div>
            )}
            <h3 className="font-semibold mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
            )}
            {action}
        </div>
    );
}
