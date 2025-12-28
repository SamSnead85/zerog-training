/**
 * Premium Card Variants
 * Elegant card components with glass effects, gradients, and animations
 */

"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "gradient" | "elevated" | "bordered" | "spotlight";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    hover?: boolean;
    animated?: boolean;
}

const variantStyles = {
    default: "bg-card border border-border/50",
    glass: "bg-card/60 backdrop-blur-xl border border-white/10",
    gradient: "bg-gradient-to-br from-card via-card to-primary/5 border border-border/50",
    elevated: "bg-card shadow-xl shadow-black/10 dark:shadow-black/30",
    bordered: "bg-transparent border-2 border-border",
    spotlight: "bg-card border border-border/50 relative overflow-hidden",
};

const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
};

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
    ({
        className,
        variant = "default",
        padding = "md",
        hover = false,
        animated = false,
        children,
        ...props
    }, ref) => {
        const cardClasses = cn(
            "rounded-xl transition-all duration-300",
            variantStyles[variant],
            paddingStyles[padding],
            hover && "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5",
            className
        );

        const spotlightOverlay = variant === "spotlight" && (
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        );

        if (animated) {
            return (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className={cardClasses}
                >
                    {spotlightOverlay}
                    {children}
                </motion.div>
            );
        }

        return (
            <div
                ref={ref}
                className={cardClasses}
                {...props}
            >
                {spotlightOverlay}
                {children}
            </div>
        );
    }
);

PremiumCard.displayName = "PremiumCard";

// Stat Card for dashboards
interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon?: ReactNode;
    description?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon,
    description,
    className,
}: StatCardProps) {
    const changeColors = {
        positive: "text-emerald-500 bg-emerald-500/10",
        negative: "text-red-500 bg-red-500/10",
        neutral: "text-muted-foreground bg-muted",
    };

    return (
        <PremiumCard className={className} hover>
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold tracking-tight">{value}</p>
                </div>
                {icon && (
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {icon}
                    </div>
                )}
            </div>
            {(change || description) && (
                <div className="mt-4 flex items-center gap-2">
                    {change && (
                        <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
                            changeColors[changeType]
                        )}>
                            {change}
                        </span>
                    )}
                    {description && (
                        <span className="text-xs text-muted-foreground">{description}</span>
                    )}
                </div>
            )}
        </PremiumCard>
    );
}

// Feature Card with icon
interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
    return (
        <PremiumCard variant="glass" hover className={cn("group", className)}>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </PremiumCard>
    );
}

// Course Card
interface CourseCardProps {
    title: string;
    description: string;
    image?: string;
    progress?: number;
    duration?: string;
    badge?: string;
    badgeVariant?: "default" | "success" | "warning" | "info";
    onClick?: () => void;
    className?: string;
}

const badgeColors = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    info: "bg-blue-500/10 text-blue-500",
};

export function CourseCard({
    title,
    description,
    image,
    progress,
    duration,
    badge,
    badgeVariant = "default",
    onClick,
    className,
}: CourseCardProps) {
    return (
        <PremiumCard
            variant="default"
            padding="none"
            hover
            className={cn("overflow-hidden cursor-pointer group", className)}
            onClick={onClick}
        >
            {/* Image */}
            <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20" />
                )}
                {badge && (
                    <span className={cn(
                        "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium",
                        badgeColors[badgeVariant]
                    )}>
                        {badge}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {progress !== undefined && (
                        <div className="flex-1 mr-4">
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                    {duration && (
                        <span className="text-xs text-muted-foreground">{duration}</span>
                    )}
                    {progress !== undefined && (
                        <span className="text-xs font-medium ml-2">{progress}%</span>
                    )}
                </div>
            </div>
        </PremiumCard>
    );
}

// Team Member Card
interface TeamMemberCardProps {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    status?: "active" | "pending" | "inactive";
    className?: string;
}

const statusStyles = {
    active: "bg-emerald-500/10 text-emerald-500",
    pending: "bg-amber-500/10 text-amber-500",
    inactive: "bg-muted text-muted-foreground",
};

export function TeamMemberCard({
    name,
    email,
    avatar,
    role,
    status = "active",
    className,
}: TeamMemberCardProps) {
    return (
        <PremiumCard className={cn("flex items-center gap-4", className)} hover>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium shrink-0">
                {avatar ? (
                    <img src={avatar} alt={name} className="h-full w-full rounded-full object-cover" />
                ) : (
                    name.charAt(0).toUpperCase()
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{name}</p>
                <p className="text-sm text-muted-foreground truncate">{email}</p>
            </div>
            {role && (
                <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium shrink-0",
                    statusStyles[status]
                )}>
                    {role}
                </span>
            )}
        </PremiumCard>
    );
}
