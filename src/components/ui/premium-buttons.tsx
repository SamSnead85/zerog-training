/**
 * Premium Button Variants
 * Enhanced button styles for a polished, premium UI
 */

"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "gradient" | "danger";
    size?: "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    glow?: boolean;
}

const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-border bg-transparent hover:bg-muted/50",
    ghost: "bg-transparent hover:bg-muted/50",
    glass: "bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-500/20",
};

const sizeStyles = {
    sm: "h-8 px-3 text-xs rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
    xl: "h-14 px-8 text-lg rounded-xl gap-3",
};

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({
        className,
        variant = "primary",
        size = "md",
        loading = false,
        icon,
        iconPosition = "left",
        glow = false,
        disabled,
        children,
        ...props
    }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
                transition={{ duration: 0.15 }}
                disabled={disabled || loading}
                className={cn(
                    "relative inline-flex items-center justify-center font-medium",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variantStyles[variant],
                    sizeStyles[size],
                    glow && variant === "gradient" && "shadow-2xl shadow-cyan-500/30",
                    className
                )}
                {...(props as HTMLMotionProps<"button">)}
            >
                {/* Glow effect */}
                {glow && (
                    <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 blur-xl transition-opacity group-hover:opacity-30" />
                )}

                {/* Loading spinner */}
                {loading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {/* Icon left */}
                {!loading && icon && iconPosition === "left" && (
                    <span className="shrink-0">{icon}</span>
                )}

                {/* Text */}
                {children && (
                    <span className={loading ? "opacity-0" : undefined}>{children}</span>
                )}

                {/* Icon right */}
                {!loading && icon && iconPosition === "right" && (
                    <span className="shrink-0">{icon}</span>
                )}
            </motion.button>
        );
    }
);

PremiumButton.displayName = "PremiumButton";

// Icon Button variant
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

const iconSizeStyles = {
    sm: "h-8 w-8 rounded-lg",
    md: "h-10 w-10 rounded-lg",
    lg: "h-12 w-12 rounded-xl",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({
        className,
        variant = "ghost",
        size = "md",
        loading = false,
        disabled,
        children,
        ...props
    }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
                transition={{ duration: 0.15 }}
                disabled={disabled || loading}
                className={cn(
                    "inline-flex items-center justify-center",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variantStyles[variant],
                    iconSizeStyles[size],
                    className
                )}
                {...(props as HTMLMotionProps<"button">)}
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

IconButton.displayName = "IconButton";

// Floating Action Button
interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    position?: "bottom-right" | "bottom-left" | "bottom-center";
    extended?: boolean;
    label?: string;
}

const fabPositions = {
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2",
};

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
    ({
        className,
        position = "bottom-right",
        extended = false,
        label,
        children,
        ...props
    }, ref) => {
        return (
            <motion.button
                ref={ref}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                className={cn(
                    fabPositions[position],
                    "z-50 inline-flex items-center justify-center gap-2",
                    "bg-gradient-to-r from-cyan-500 to-blue-600 text-white",
                    "shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30",
                    "transition-shadow duration-200",
                    extended ? "h-14 px-6 rounded-full" : "h-14 w-14 rounded-full",
                    className
                )}
                {...(props as HTMLMotionProps<"button">)}
            >
                {children}
                {extended && label && (
                    <span className="font-medium">{label}</span>
                )}
            </motion.button>
        );
    }
);

FAB.displayName = "FAB";
