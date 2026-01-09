"use client";

import { cn } from "@/lib/utils";

// Skeleton loader for lesson cards
export function LessonCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn(
            "p-5 rounded-xl bg-white/[0.02] border border-white/10 animate-pulse",
            className
        )}>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-white/10" />
                <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full w-full" />
        </div>
    );
}

// Skeleton loader for stats cards
export function StatsCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn(
            "p-4 rounded-xl bg-white/[0.02] border border-white/10 animate-pulse",
            className
        )}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10" />
                <div>
                    <div className="h-6 bg-white/10 rounded w-16 mb-1" />
                    <div className="h-3 bg-white/5 rounded w-20" />
                </div>
            </div>
        </div>
    );
}

// Skeleton loader for module viewer
export function ModuleViewerSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="h-6 bg-white/10 rounded w-1/2 mb-3" />
                <div className="h-4 bg-white/5 rounded w-3/4 mb-4" />
                <div className="h-2 bg-white/10 rounded-full w-full" />
            </div>

            {/* Content area */}
            <div className="grid md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 bg-white/5 rounded-lg" />
                    ))}
                </div>

                {/* Main content */}
                <div className="md:col-span-3 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="h-8 bg-white/10 rounded w-1/3 mb-6" />
                    <div className="space-y-3">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                        <div className="h-4 bg-white/5 rounded w-4/5" />
                        <div className="h-4 bg-white/5 rounded w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Skeleton for dashboard
export function DashboardSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Welcome header */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="h-8 bg-white/10 rounded w-1/3 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <StatsCardSkeleton key={i} />
                ))}
            </div>

            {/* Content cards */}
            <div className="grid md:grid-cols-2 gap-6">
                <LessonCardSkeleton />
                <LessonCardSkeleton />
            </div>
        </div>
    );
}

// Text skeleton for inline loading
export function TextSkeleton({
    lines = 3,
    className
}: {
    lines?: number;
    className?: string
}) {
    return (
        <div className={cn("space-y-2 animate-pulse", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-white/10 rounded"
                    style={{ width: `${Math.random() * 30 + 70}%` }}
                />
            ))}
        </div>
    );
}

// Pulse animation wrapper
export function PulseLoader({
    children,
    loading,
    className
}: {
    children: React.ReactNode;
    loading: boolean;
    className?: string;
}) {
    if (loading) {
        return (
            <div className={cn("animate-pulse", className)}>
                {children}
            </div>
        );
    }
    return <>{children}</>;
}

// Shimmer effect component
export function Shimmer({ className }: { className?: string }) {
    return (
        <div className={cn(
            "relative overflow-hidden bg-white/5 rounded-lg",
            className
        )}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
}
