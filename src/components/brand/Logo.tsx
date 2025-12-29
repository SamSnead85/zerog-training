"use client";

/**
 * Logo Component
 * 
 * Brand logo icon with responsive sizing and link to home.
 * Uses just the icon portion, not the full banner image.
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    showText?: boolean;
    href?: string;
    className?: string;
}

// =============================================================================
// SIZE CONFIG
// =============================================================================

const sizeConfig = {
    sm: { icon: 28, text: "text-sm" },
    md: { icon: 36, text: "text-base" },
    lg: { icon: 44, text: "text-lg" },
    xl: { icon: 56, text: "text-xl" },
};

// =============================================================================
// COMPONENT
// =============================================================================

export function Logo({
    size = "md",
    showText = true,
    href = "/",
    className,
}: LogoProps) {
    const config = sizeConfig[size];

    const content = (
        <div className={cn("flex items-center gap-2", className)}>
            {/* Icon: S for ScaledNative */}
            <div
                className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary via-orange-500 to-orange-600 shadow-lg shadow-primary/20"
                style={{ width: config.icon, height: config.icon }}
            >
                <span
                    className="font-bold text-white"
                    style={{ fontSize: config.icon * 0.5 }}
                >
                    S
                </span>
            </div>

            {showText && (
                <div className="flex items-baseline">
                    <span className={cn("font-bold text-foreground", config.text)}>
                        Scaled
                    </span>
                    <span className={cn("font-bold text-primary ml-0.5", config.text)}>
                        Native
                    </span>
                </div>
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
                {content}
            </Link>
        );
    }

    return content;
}

// =============================================================================
// LOGO ICON (just the icon portion)
// =============================================================================

interface LogoIconProps {
    size?: number;
    className?: string;
}

export function LogoIcon({ size = 32, className }: LogoIconProps) {
    return (
        <div
            className={cn(
                "relative rounded-xl bg-gradient-to-br from-primary via-orange-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20",
                className
            )}
            style={{ width: size, height: size, fontSize: size * 0.5 }}
        >
            S
        </div>
    );
}

// =============================================================================
// LOGO WORDMARK (text only)
// =============================================================================

interface LogoWordmarkProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function LogoWordmark({ size = "md", className }: LogoWordmarkProps) {
    const sizes = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
    };

    return (
        <span className={cn("font-bold", sizes[size], className)}>
            <span className="text-foreground">
                Scaled
            </span>
            <span className="text-primary ml-0.5">Native</span>
        </span>
    );
}

export default Logo;
