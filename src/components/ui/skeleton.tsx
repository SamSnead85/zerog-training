import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "circular" | "text";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-muted",
                {
                    "rounded-lg": variant === "default",
                    "rounded-full": variant === "circular",
                    "h-4 w-full rounded": variant === "text",
                },
                className
            )}
            {...props}
        />
    );
}

// Pre-built skeleton patterns for common use cases
function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("space-y-4 rounded-xl border border-border p-6", className)}>
            <Skeleton className="h-40 w-full" />
            <Skeleton variant="text" className="h-5 w-3/4" />
            <Skeleton variant="text" className="h-4 w-1/2" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4 border-b border-border pb-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 py-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    );
}

function SkeletonAvatar({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
    const sizeClasses = {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
    };

    return <Skeleton variant="circular" className={sizeClasses[size]} />;
}

export { Skeleton, SkeletonCard, SkeletonTable, SkeletonAvatar };
