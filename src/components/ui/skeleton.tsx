"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-white/5 rounded-lg",
                className
            )}
        />
    );
}

// Card skeleton for loading states
export function CardSkeleton() {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-2/3" />
            <div className="pt-4">
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}

// Lesson card skeleton
export function LessonSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
        </div>
    );
}

// Module content skeleton
export function ModuleSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="space-y-4">
                <LessonSkeleton />
                <LessonSkeleton />
                <LessonSkeleton />
            </div>
        </div>
    );
}

// Dashboard card skeleton
export function DashboardCardSkeleton() {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
        </div>
    );
}

// Table row skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <div className="flex items-center gap-4 p-4 border-b border-white/5">
            {[...Array(columns)].map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn("h-4", i === 0 ? "w-48" : "w-24")}
                />
            ))}
        </div>
    );
}

// Full page loading skeleton
export function PageSkeleton() {
    return (
        <div className="min-h-screen bg-black p-8 space-y-8">
            <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
            </div>
        </div>
    );
}
