"use client";

/**
 * Loading State Components
 * 
 * Production-ready loading states for different contexts.
 */

import { cn } from "@/lib/utils";

// =============================================================================
// FULL PAGE LOADER
// =============================================================================

interface PageLoaderProps {
    message?: string;
    className?: string;
}

export function PageLoader({ message = "Loading...", className }: PageLoaderProps) {
    return (
        <div className={cn(
            "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background",
            className
        )}>
            <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 rounded-full border-4 border-primary/20" />
                {/* Spinning arc */}
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            </div>
            {message && (
                <p className="mt-4 text-muted-foreground text-sm animate-pulse">{message}</p>
            )}
        </div>
    );
}

// =============================================================================
// INLINE LOADER
// =============================================================================

interface InlineLoaderProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function InlineLoader({ size = "md", className }: InlineLoaderProps) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-2",
        lg: "w-8 h-8 border-3",
    };

    return (
        <div
            className={cn(
                "rounded-full border-primary/20 border-t-primary animate-spin",
                sizeClasses[size],
                className
            )}
        />
    );
}

// =============================================================================
// BUTTON LOADER
// =============================================================================

interface ButtonLoaderProps {
    loading: boolean;
    children: React.ReactNode;
    loadingText?: string;
}

export function ButtonLoader({ loading, children, loadingText }: ButtonLoaderProps) {
    if (!loading) return <>{children}</>;

    return (
        <span className="flex items-center gap-2">
            <InlineLoader size="sm" />
            {loadingText || children}
        </span>
    );
}

// =============================================================================
// CONTENT LOADER (Skeleton)
// =============================================================================

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
    className,
    variant = "rectangular",
    width,
    height,
    animation = "pulse",
}: SkeletonProps) {
    const variantClasses = {
        text: "rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    const animationClasses = {
        pulse: "animate-pulse",
        wave: "animate-shimmer",
        none: "",
    };

    return (
        <div
            className={cn(
                "bg-muted/50",
                variantClasses[variant],
                animationClasses[animation],
                className
            )}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
            }}
        />
    );
}

// =============================================================================
// SKELETON PRESETS
// =============================================================================

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4", className)}>
            <Skeleton className="h-40" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {/* Header */}
            <div className="flex gap-4 p-4 border-b border-border bg-muted/30">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 p-4 border-b border-border/50 last:border-0">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton key={colIndex} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function SkeletonList({ items = 5 }: { items?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-white/10">
                    <Skeleton variant="circular" className="w-10 h-10" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function SkeletonStats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            ))}
        </div>
    );
}

// =============================================================================
// PROGRESS LOADER
// =============================================================================

interface ProgressLoaderProps {
    progress: number;
    message?: string;
    className?: string;
}

export function ProgressLoader({ progress, message, className }: ProgressLoaderProps) {
    return (
        <div className={cn("text-center", className)}>
            <div className="w-full max-w-sm mx-auto bg-muted rounded-full h-2 overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                {message && <span>{message}</span>}
                <span>{Math.round(progress)}%</span>
            </div>
        </div>
    );
}

// =============================================================================
// DOTS LOADER
// =============================================================================

export function DotsLoader({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
    );
}

export default {
    PageLoader,
    InlineLoader,
    ButtonLoader,
    Skeleton,
    SkeletonCard,
    SkeletonTable,
    SkeletonList,
    SkeletonStats,
    ProgressLoader,
    DotsLoader,
};
