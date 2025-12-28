/**
 * Premium Loading Skeleton Components
 * Beautiful, animated skeletons for a polished loading experience
 */

"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    style?: CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted/50",
                className
            )}
            style={style}
        />
    );
}

// Card Skeleton with header and content
export function CardSkeleton({ className }: SkeletonProps) {
    return (
        <div className={cn("rounded-xl border border-border/50 bg-card p-6", className)}>
            <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
            </div>
        </div>
    );
}

// Stats Card Skeleton
export function StatsSkeleton() {
    return (
        <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-3 w-28" />
        </div>
    );
}

// Course Card Skeleton
export function CourseCardSkeleton() {
    return (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="p-5">
                <Skeleton className="h-4 w-3/4 mb-3" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3 mb-4" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-2 flex-1 rounded-full" />
                    <Skeleton className="h-3 w-10" />
                </div>
            </div>
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <div className="flex items-center gap-4 py-4 px-4 border-b border-border/50">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        "h-4",
                        i === 0 ? "w-[200px]" : "flex-1"
                    )}
                />
            ))}
        </div>
    );
}

// Team Member Skeleton
export function TeamMemberSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
        </div>
    );
}

// Chart Skeleton
export function ChartSkeleton({ className }: SkeletonProps) {
    return (
        <div className={cn("rounded-xl border border-border/50 bg-card p-6", className)}>
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-5 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
            </div>
            <div className="h-64 flex items-end gap-2 pt-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="flex-1 rounded-t-md"
                        style={{ height: `${30 + Math.random() * 60}%` }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-8" />
                ))}
            </div>
        </div>
    );
}

// Full Dashboard Skeleton
export function DashboardSkeleton() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsSkeleton />
                <StatsSkeleton />
                <StatsSkeleton />
                <StatsSkeleton />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartSkeleton />
                </div>
                <div className="space-y-4">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
        </div>
    );
}

// Learning Page Skeleton
export function LearningPageSkeleton() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
            </div>
        </div>
    );
}

// Shimmer effect variant
export function ShimmerSkeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-md bg-muted/50",
                "before:absolute before:inset-0",
                "before:translate-x-[-100%]",
                "before:animate-[shimmer_2s_infinite]",
                "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
                className
            )}
        />
    );
}
