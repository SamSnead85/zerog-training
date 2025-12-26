"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
    type: "dashboard" | "list" | "card" | "table" | "form";
    className?: string;
}

function SkeletonPulse({ className }: { className?: string }) {
    return (
        <div className={cn("animate-pulse bg-muted rounded", className)} />
    );
}

export function LoadingSkeleton({ type, className }: LoadingSkeletonProps) {
    switch (type) {
        case "dashboard":
            return (
                <div className={cn("space-y-6", className)}>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <SkeletonPulse className="h-8 w-48" />
                            <SkeletonPulse className="h-4 w-64" />
                        </div>
                        <SkeletonPulse className="h-10 w-32" />
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="p-5 rounded-xl border border-border">
                                <SkeletonPulse className="h-6 w-6 mb-3" />
                                <SkeletonPulse className="h-8 w-24 mb-2" />
                                <SkeletonPulse className="h-4 w-16" />
                            </div>
                        ))}
                    </div>
                    {/* Main Content */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 p-6 rounded-xl border border-border">
                            <SkeletonPulse className="h-6 w-40 mb-4" />
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <SkeletonPulse className="h-4 w-24" />
                                        <SkeletonPulse className="h-2 flex-1" />
                                        <SkeletonPulse className="h-4 w-12" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-xl border border-border">
                            <SkeletonPulse className="h-6 w-32 mb-4" />
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <SkeletonPulse className="h-8 w-8 rounded-full" />
                                        <div className="flex-1">
                                            <SkeletonPulse className="h-4 w-24 mb-1" />
                                            <SkeletonPulse className="h-3 w-16" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "list":
            return (
                <div className={cn("space-y-3", className)}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                            <SkeletonPulse className="h-10 w-10 rounded-full" />
                            <div className="flex-1">
                                <SkeletonPulse className="h-4 w-48 mb-2" />
                                <SkeletonPulse className="h-3 w-32" />
                            </div>
                            <SkeletonPulse className="h-8 w-20" />
                        </div>
                    ))}
                </div>
            );

        case "card":
            return (
                <div className={cn("p-6 rounded-xl border border-border", className)}>
                    <SkeletonPulse className="h-40 w-full mb-4 rounded-lg" />
                    <SkeletonPulse className="h-5 w-3/4 mb-2" />
                    <SkeletonPulse className="h-4 w-1/2 mb-4" />
                    <div className="flex gap-2">
                        <SkeletonPulse className="h-6 w-16" />
                        <SkeletonPulse className="h-6 w-16" />
                    </div>
                </div>
            );

        case "table":
            return (
                <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
                    <div className="p-4 bg-muted/50">
                        <div className="flex gap-4">
                            {[...Array(5)].map((_, i) => (
                                <SkeletonPulse key={i} className="h-4 flex-1" />
                            ))}
                        </div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-4 border-t border-border">
                            <div className="flex gap-4">
                                {[...Array(5)].map((_, j) => (
                                    <SkeletonPulse key={j} className="h-4 flex-1" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );

        case "form":
            return (
                <div className={cn("space-y-4", className)}>
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <SkeletonPulse className="h-4 w-24 mb-2" />
                            <SkeletonPulse className="h-10 w-full" />
                        </div>
                    ))}
                    <SkeletonPulse className="h-10 w-32 mt-4" />
                </div>
            );

        default:
            return null;
    }
}
