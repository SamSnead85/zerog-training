"use client";

/**
 * Optimized Image Component
 * 
 * Lazy loading images with blur placeholder, fade-in animation,
 * responsive srcset, and error handling.
 */

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// =============================================================================
// TYPES
// =============================================================================

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    quality?: number;
    className?: string;
    containerClassName?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    objectPosition?: string;
    placeholder?: "blur" | "empty";
    blurDataURL?: string;
    onLoad?: () => void;
    onError?: () => void;
    fallback?: string;
}

// =============================================================================
// PLACEHOLDER GENERATOR
// =============================================================================

function generateBlurDataURL(width: number = 10, height: number = 10): string {
    // Simple gray placeholder
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
            <rect fill="#1a1a1a" width="${width}" height="${height}"/>
        </svg>
    `;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    quality = 80,
    className,
    containerClassName,
    objectFit = "cover",
    objectPosition = "center",
    placeholder = "blur",
    blurDataURL,
    onLoad,
    onError,
    fallback = "/images/placeholder.jpg",
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    useEffect(() => {
        setCurrentSrc(src);
        setHasError(false);
        setIsLoaded(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        setCurrentSrc(fallback);
        onError?.();
    };

    const imageProps = {
        src: hasError ? fallback : currentSrc,
        alt,
        quality,
        priority,
        onLoad: handleLoad,
        onError: handleError,
        className: cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
        ),
        style: {
            objectFit,
            objectPosition,
        },
    };

    const containerStyles = cn(
        "relative overflow-hidden bg-muted",
        containerClassName
    );

    if (fill) {
        return (
            <div className={containerStyles}>
                <Image
                    {...imageProps}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder={placeholder}
                    blurDataURL={blurDataURL || generateBlurDataURL()}
                />
                {!isLoaded && !hasError && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
            </div>
        );
    }

    return (
        <div className={containerStyles} style={{ width, height }}>
            <Image
                {...imageProps}
                width={width || 800}
                height={height || 600}
                placeholder={placeholder}
                blurDataURL={blurDataURL || generateBlurDataURL()}
            />
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
        </div>
    );
}

// =============================================================================
// AVATAR IMAGE
// =============================================================================

interface AvatarImageProps {
    src?: string;
    alt: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    fallbackInitials?: string;
    className?: string;
}

const avatarSizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
};

export function AvatarImage({
    src,
    alt,
    size = "md",
    fallbackInitials,
    className,
}: AvatarImageProps) {
    const [hasError, setHasError] = useState(false);

    const initials = fallbackInitials || alt
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    if (!src || hasError) {
        return (
            <div
                className={cn(
                    "rounded-full bg-primary/20 flex items-center justify-center font-medium text-primary",
                    avatarSizes[size],
                    className
                )}
            >
                {initials}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-full overflow-hidden bg-muted",
                avatarSizes[size],
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={() => setHasError(true)}
            />
        </div>
    );
}

// =============================================================================
// BACKGROUND IMAGE
// =============================================================================

interface BackgroundImageProps {
    src: string;
    alt?: string;
    overlay?: "none" | "light" | "dark" | "gradient";
    children?: React.ReactNode;
    className?: string;
}

export function BackgroundImage({
    src,
    alt = "",
    overlay = "dark",
    children,
    className,
}: BackgroundImageProps) {
    const overlayStyles = {
        none: "",
        light: "bg-white/50",
        dark: "bg-black/50",
        gradient: "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
    };

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
            {overlay !== "none" && (
                <div className={cn("absolute inset-0", overlayStyles[overlay])} />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export default {
    OptimizedImage,
    AvatarImage,
    BackgroundImage,
};
