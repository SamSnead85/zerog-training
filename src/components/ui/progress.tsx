import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    showLabel?: boolean;
    size?: "sm" | "default" | "lg";
    variant?: "default" | "success" | "warning" | "error";
}

function Progress({
    value,
    max = 100,
    showLabel = false,
    size = "default",
    variant = "default",
    className,
    ...props
}: ProgressProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const sizeClasses = {
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-4",
    };

    const variantClasses = {
        default: "bg-gradient-to-r from-primary to-secondary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
    };

    return (
        <div className={cn("w-full", className)} {...props}>
            {showLabel && (
                <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{Math.round(percentage)}%</span>
                </div>
            )}
            <div
                className={cn(
                    "w-full overflow-hidden rounded-full bg-muted",
                    sizeClasses[size]
                )}
            >
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out",
                        variantClasses[variant]
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export { Progress };
