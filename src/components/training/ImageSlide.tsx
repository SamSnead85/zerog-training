"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Premium AI-Generated Training Slide
 * Uses the AI-generated visuals from /public/images/training/
 */

// Map of available training visuals
export const TrainingVisuals = {
    "cybersecurity-hero": "/images/training/cybersecurity-hero.png",
    "data-protection": "/images/training/data-protection.png",
    "phishing-awareness": "/images/training/phishing-awareness.png",
    "password-security": "/images/training/password-security.png",
    "compliance-hipaa": "/images/training/compliance-hipaa.png",
    "network-security": "/images/training/network-security.png",
    "security-visual": "/images/training/security-visual.png",
} as const;

export type TrainingVisualKey = keyof typeof TrainingVisuals;

interface ImageSlideProps {
    visual: TrainingVisualKey;
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "hero" | "full";
    overlayOpacity?: "light" | "medium" | "dark";
}

const sizeClasses = {
    sm: "h-48 rounded-xl",
    md: "h-64 rounded-2xl",
    lg: "h-80 rounded-2xl",
    hero: "h-96 sm:h-[28rem] rounded-3xl",
    full: "h-[32rem] sm:h-[36rem] rounded-3xl",
};

const overlayClasses = {
    light: "from-black/40 via-black/20 to-transparent",
    medium: "from-black/60 via-black/30 to-transparent",
    dark: "from-black/80 via-black/50 to-black/20",
};

export function ImageSlide({
    visual,
    title,
    subtitle,
    children,
    className,
    size = "lg",
    overlayOpacity = "medium",
}: ImageSlideProps) {
    const imageSrc = TrainingVisuals[visual];

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                sizeClasses[size],
                className
            )}
        >
            {/* Background image */}
            <Image
                src={imageSrc}
                alt={visual}
                fill
                className="object-cover"
                priority={size === "hero" || size === "full"}
            />

            {/* Gradient overlay for text readability */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-t",
                overlayClasses[overlayOpacity]
            )} />

            {/* Optional subtle vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                {children ? (
                    children
                ) : (
                    <>
                        {subtitle && (
                            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 text-primary/90">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg">
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
 * Split Image Slide - Image on one side, content on the other
 */
interface SplitImageSlideProps {
    visual: TrainingVisualKey;
    title: string;
    children: ReactNode;
    imagePosition?: "left" | "right";
    className?: string;
}

export function SplitImageSlide({
    visual,
    title,
    children,
    imagePosition = "left",
    className,
}: SplitImageSlideProps) {
    const imageSrc = TrainingVisuals[visual];

    return (
        <div className={cn(
            "grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10",
            className
        )}>
            {/* Image side */}
            <div className={cn(
                "relative h-64 md:h-auto min-h-[300px]",
                imagePosition === "right" && "md:order-2"
            )}>
                <Image
                    src={imageSrc}
                    alt={visual}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/50 md:hidden" />
            </div>

            {/* Content side */}
            <div className={cn(
                "bg-slate-900/80 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-center",
                imagePosition === "right" && "md:order-1"
            )}>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                    {title}
                </h2>
                <div className="text-slate-300 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

/**
 * Gallery of training visuals for preview
 */
export function TrainingVisualGallery() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(TrainingVisuals).map(([key, src]) => (
                <div key={key} className="relative aspect-video rounded-xl overflow-hidden group">
                    <Image
                        src={src}
                        alt={key}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-2 left-2 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {key}
                    </span>
                </div>
            ))}
        </div>
    );
}
