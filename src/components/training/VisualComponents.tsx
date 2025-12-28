"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
    Shield,
    Lock,
    AlertTriangle,
    Key,
    FileWarning,
    Network,
    Mail,
    Eye,
    CheckCircle2,
    XCircle,
    Zap,
    Brain,
    Target,
    Users,
    TrendingUp,
    Globe,
    Server,
    Database,
    Fingerprint,
    Smartphone,
} from "lucide-react";

/**
 * Premium Visual Slide - Modern presentation-style visual component
 * Provides engaging, animated backgrounds for training content
 */

interface VisualSlideProps {
    variant:
    | "cybersecurity"
    | "data-protection"
    | "phishing"
    | "password"
    | "network"
    | "compliance"
    | "leadership"
    | "ai-tools"
    | "hipaa"
    | "custom";
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "hero";
}

const variantStyles = {
    cybersecurity: {
        gradient: "from-slate-900 via-blue-950 to-cyan-950",
        accent: "cyan",
        icon: Shield,
        particles: true,
    },
    "data-protection": {
        gradient: "from-slate-900 via-indigo-950 to-purple-950",
        accent: "purple",
        icon: Lock,
        particles: true,
    },
    phishing: {
        gradient: "from-slate-900 via-red-950 to-orange-950",
        accent: "red",
        icon: AlertTriangle,
        particles: false,
    },
    password: {
        gradient: "from-slate-900 via-amber-950 to-yellow-950",
        accent: "amber",
        icon: Key,
        particles: true,
    },
    network: {
        gradient: "from-slate-900 via-teal-950 to-emerald-950",
        accent: "teal",
        icon: Network,
        particles: true,
    },
    compliance: {
        gradient: "from-slate-900 via-violet-950 to-fuchsia-950",
        accent: "violet",
        icon: FileWarning,
        particles: false,
    },
    leadership: {
        gradient: "from-slate-900 via-rose-950 to-pink-950",
        accent: "rose",
        icon: Users,
        particles: false,
    },
    "ai-tools": {
        gradient: "from-slate-900 via-emerald-950 to-cyan-950",
        accent: "emerald",
        icon: Brain,
        particles: true,
    },
    hipaa: {
        gradient: "from-slate-900 via-blue-950 to-indigo-950",
        accent: "blue",
        icon: Shield,
        particles: false,
    },
    custom: {
        gradient: "from-slate-900 via-slate-800 to-slate-900",
        accent: "primary",
        icon: Zap,
        particles: true,
    },
};

const sizeClasses = {
    sm: "h-32 rounded-xl",
    md: "h-48 rounded-2xl",
    lg: "h-64 rounded-2xl",
    hero: "h-80 sm:h-96 rounded-3xl",
};

export function VisualSlide({
    variant,
    title,
    subtitle,
    children,
    className,
    size = "md",
}: VisualSlideProps) {
    const style = variantStyles[variant] || variantStyles.custom;
    const Icon = style.icon;

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                `bg-gradient-to-br ${style.gradient}`,
                sizeClasses[size],
                className
            )}
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large accent orb */}
                <div
                    className={cn(
                        "absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl animate-pulse",
                        `bg-${style.accent}-500/20`
                    )}
                    style={{ animationDuration: '8s' }}
                />

                {/* Secondary orb */}
                <div
                    className={cn(
                        "absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-2xl animate-pulse",
                        `bg-${style.accent}-400/15`
                    )}
                    style={{ animationDuration: '10s', animationDelay: '2s' }}
                />

                {/* Floating icon - large background */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
                    <Icon className="w-32 h-32 sm:w-48 sm:h-48" />
                </div>

                {/* Particle effects for applicable variants */}
                {style.particles && (
                    <>
                        <div
                            className={cn("absolute top-[20%] left-[30%] w-2 h-2 rounded-full animate-bounce", `bg-${style.accent}-400/40`)}
                            style={{ animationDuration: '5s' }}
                        />
                        <div
                            className={cn("absolute top-[60%] left-[70%] w-1.5 h-1.5 rounded-full animate-bounce", `bg-${style.accent}-300/30`)}
                            style={{ animationDuration: '7s', animationDelay: '1s' }}
                        />
                        <div
                            className={cn("absolute top-[40%] left-[20%] w-1 h-1 rounded-full animate-bounce", `bg-${style.accent}-400/50`)}
                            style={{ animationDuration: '6s', animationDelay: '2s' }}
                        />
                    </>
                )}

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                {children ? (
                    children
                ) : (
                    <>
                        {subtitle && (
                            <span className={cn(
                                "text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 opacity-80",
                                `text-${style.accent}-400`
                            )}>
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                {title}
                            </h2>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

/**
 * Feature Card Visual - Premium animated feature cards
 */
interface FeatureCardVisualProps {
    icon: ReactNode;
    title: string;
    description: string;
    accentColor?: string;
    className?: string;
}

export function FeatureCardVisual({
    icon,
    title,
    description,
    accentColor = "primary",
    className,
}: FeatureCardVisualProps) {
    return (
        <div className={cn(
            "group relative p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden",
            className
        )}>
            {/* Animated gradient on hover */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                `bg-gradient-to-br from-${accentColor}-500/10 via-transparent to-transparent`
            )} />

            {/* Icon container */}
            <div className={cn(
                "relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110",
                `bg-${accentColor}-500/10`
            )}>
                <div className={`text-${accentColor}-400`}>
                    {icon}
                </div>
            </div>

            <h3 className="relative font-semibold text-lg mb-2 text-white group-hover:text-white transition-colors">
                {title}
            </h3>
            <p className="relative text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                {description}
            </p>
        </div>
    );
}

/**
 * Stat Visual - Animated statistics display
 */
interface StatVisualProps {
    value: string | number;
    label: string;
    icon?: ReactNode;
    trend?: { value: number; positive: boolean };
    accentColor?: string;
    className?: string;
}

export function StatVisual({
    value,
    label,
    icon,
    trend,
    accentColor = "primary",
    className,
}: StatVisualProps) {
    return (
        <div className={cn(
            "relative p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 border border-white/10 overflow-hidden group",
            className
        )}>
            {/* Background glow */}
            <div className={cn(
                "absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity",
                `bg-${accentColor}-500`
            )} />

            <div className="relative">
                {/* Header with icon */}
                <div className="flex items-center justify-between mb-3">
                    {icon && (
                        <div className={`text-${accentColor}-400`}>
                            {icon}
                        </div>
                    )}
                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                            trend.positive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                        )}>
                            <TrendingUp className={cn("h-3 w-3", !trend.positive && "rotate-180")} />
                            {trend.value}%
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className="text-4xl sm:text-5xl font-bold text-white mb-1">
                    {value}
                </div>

                {/* Label */}
                <div className="text-sm text-slate-400">
                    {label}
                </div>
            </div>
        </div>
    );
}

/**
 * Step Visual - Animated process/step indicator
 */
interface StepVisualProps {
    steps: Array<{
        title: string;
        description: string;
        icon?: ReactNode;
        status?: "completed" | "active" | "upcoming";
    }>;
    className?: string;
}

export function StepVisual({ steps, className }: StepVisualProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {steps.map((step, index) => {
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";

                return (
                    <div
                        key={index}
                        className={cn(
                            "relative flex gap-4 p-4 rounded-xl border transition-all",
                            isCompleted && "bg-emerald-500/5 border-emerald-500/20",
                            isActive && "bg-primary/5 border-primary/30 shadow-lg shadow-primary/10",
                            !isCompleted && !isActive && "bg-slate-800/30 border-white/5"
                        )}
                    >
                        {/* Step number / icon */}
                        <div className={cn(
                            "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                            isCompleted && "bg-emerald-500 text-white",
                            isActive && "bg-primary text-white animate-pulse",
                            !isCompleted && !isActive && "bg-slate-700 text-slate-400"
                        )}>
                            {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5" />
                            ) : step.icon ? (
                                step.icon
                            ) : (
                                index + 1
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={cn(
                                "font-medium mb-1",
                                isActive ? "text-white" : "text-slate-300"
                            )}>
                                {step.title}
                            </h4>
                            <p className="text-sm text-slate-400 line-clamp-2">
                                {step.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Comparison Visual - Side by side comparison with animation
 */
interface ComparisonVisualProps {
    bad: { title: string; points: string[] };
    good: { title: string; points: string[] };
    className?: string;
}

export function ComparisonVisual({ bad, good, className }: ComparisonVisualProps) {
    return (
        <div className={cn("grid md:grid-cols-2 gap-4", className)}>
            {/* Bad practices */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/50 via-red-900/20 to-slate-900 border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <h3 className="font-semibold text-red-300">{bad.title}</h3>
                </div>
                <ul className="space-y-3">
                    {bad.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Good practices */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-emerald-900/20 to-slate-900 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-300">{good.title}</h3>
                </div>
                <ul className="space-y-3">
                    {good.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Export all icons for use in training content
export const TrainingIcons = {
    Shield,
    Lock,
    AlertTriangle,
    Key,
    FileWarning,
    Network,
    Mail,
    Eye,
    CheckCircle2,
    XCircle,
    Zap,
    Brain,
    Target,
    Users,
    TrendingUp,
    Globe,
    Server,
    Database,
    Fingerprint,
    Smartphone,
};
