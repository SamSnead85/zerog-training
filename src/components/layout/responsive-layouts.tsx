"use client";

/**
 * Responsive Layout Components
 * 
 * Mobile-first layouts and responsive utilities for
 * consistent cross-device experiences.
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// CONTAINER COMPONENT
// =============================================================================

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    padding?: boolean;
}

export function Container({
    children,
    className,
    size = "xl",
    padding = true
}: ContainerProps) {
    const sizeClasses = {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full",
    };

    return (
        <div className={cn(
            "mx-auto w-full",
            sizeClasses[size],
            padding && "px-4 sm:px-6 lg:px-8",
            className
        )}>
            {children}
        </div>
    );
}

// =============================================================================
// GRID LAYOUTS
// =============================================================================

interface GridProps {
    children: ReactNode;
    className?: string;
    cols?: 1 | 2 | 3 | 4 | 5 | 6;
    gap?: "none" | "sm" | "md" | "lg" | "xl";
    responsive?: boolean;
}

export function Grid({
    children,
    className,
    cols = 3,
    gap = "md",
    responsive = true
}: GridProps) {
    const gapClasses = {
        none: "gap-0",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
    };

    // Responsive column classes
    const colClasses = responsive ? {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
        6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    } : {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    };

    return (
        <div className={cn(
            "grid",
            colClasses[cols],
            gapClasses[gap],
            className
        )}>
            {children}
        </div>
    );
}

// =============================================================================
// STACK LAYOUTS
// =============================================================================

interface StackProps {
    children: ReactNode;
    className?: string;
    gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    direction?: "vertical" | "horizontal";
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between" | "around";
}

export function Stack({
    children,
    className,
    gap = "md",
    direction = "vertical",
    align = "stretch",
    justify = "start"
}: StackProps) {
    const gapClasses = {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
    };

    const alignClasses = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
    };

    const justifyClasses = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
    };

    return (
        <div className={cn(
            "flex",
            direction === "horizontal" ? "flex-row" : "flex-col",
            gapClasses[gap],
            alignClasses[align],
            justifyClasses[justify],
            className
        )}>
            {children}
        </div>
    );
}

// Horizontal Stack shorthand
export function HStack(props: Omit<StackProps, "direction">) {
    return <Stack {...props} direction="horizontal" />;
}

// Vertical Stack shorthand
export function VStack(props: Omit<StackProps, "direction">) {
    return <Stack {...props} direction="vertical" />;
}

// =============================================================================
// RESPONSIVE SHOW/HIDE
// =============================================================================

interface ResponsiveProps {
    children: ReactNode;
    className?: string;
}

// Only show on mobile (< sm breakpoint)
export function MobileOnly({ children, className }: ResponsiveProps) {
    return (
        <div className={cn("sm:hidden", className)}>
            {children}
        </div>
    );
}

// Only show on tablet and up (>= sm breakpoint)
export function TabletUp({ children, className }: ResponsiveProps) {
    return (
        <div className={cn("hidden sm:block", className)}>
            {children}
        </div>
    );
}

// Only show on desktop (>= lg breakpoint)
export function DesktopOnly({ children, className }: ResponsiveProps) {
    return (
        <div className={cn("hidden lg:block", className)}>
            {children}
        </div>
    );
}

// Hide on mobile
export function HideMobile({ children, className }: ResponsiveProps) {
    return (
        <div className={cn("hidden sm:block", className)}>
            {children}
        </div>
    );
}

// =============================================================================
// PAGE LAYOUT
// =============================================================================

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
    sidebar?: ReactNode;
    header?: ReactNode;
    sidebarPosition?: "left" | "right";
    sidebarWidth?: "narrow" | "default" | "wide";
}

export function PageLayout({
    children,
    className,
    sidebar,
    header,
    sidebarPosition = "left",
    sidebarWidth = "default",
}: PageLayoutProps) {
    const widthClasses = {
        narrow: "w-56",
        default: "w-64",
        wide: "w-80",
    };

    return (
        <div className={cn("min-h-screen flex flex-col", className)}>
            {header && (
                <header className="sticky top-0 z-40">
                    {header}
                </header>
            )}
            <div className="flex flex-1">
                {sidebar && sidebarPosition === "left" && (
                    <aside className={cn(
                        "hidden lg:block flex-shrink-0",
                        widthClasses[sidebarWidth]
                    )}>
                        {sidebar}
                    </aside>
                )}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
                {sidebar && sidebarPosition === "right" && (
                    <aside className={cn(
                        "hidden lg:block flex-shrink-0",
                        widthClasses[sidebarWidth]
                    )}>
                        {sidebar}
                    </aside>
                )}
            </div>
        </div>
    );
}

// =============================================================================
// SECTION COMPONENT
// =============================================================================

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    background?: "transparent" | "muted" | "card" | "gradient";
}

export function Section({
    children,
    className,
    id,
    padding = "lg",
    background = "transparent",
}: SectionProps) {
    const paddingClasses = {
        none: "",
        sm: "py-8",
        md: "py-12",
        lg: "py-16 lg:py-20",
        xl: "py-20 lg:py-28",
    };

    const bgClasses = {
        transparent: "",
        muted: "bg-muted/50",
        card: "bg-card",
        gradient: "bg-gradient-to-b from-background to-muted/30",
    };

    return (
        <section
            id={id}
            className={cn(
                paddingClasses[padding],
                bgClasses[background],
                className
            )}
        >
            {children}
        </section>
    );
}

// =============================================================================
// ASPECT RATIO BOX
// =============================================================================

interface AspectRatioProps {
    children: ReactNode;
    className?: string;
    ratio?: "square" | "video" | "portrait" | "wide";
}

export function AspectRatio({
    children,
    className,
    ratio = "video",
}: AspectRatioProps) {
    const ratioClasses = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        wide: "aspect-[21/9]",
    };

    return (
        <div className={cn(
            "relative overflow-hidden",
            ratioClasses[ratio],
            className
        )}>
            {children}
        </div>
    );
}

// =============================================================================
// DIVIDER
// =============================================================================

interface DividerProps {
    className?: string;
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
}

export function Divider({
    className,
    orientation = "horizontal",
    decorative = true,
}: DividerProps) {
    return (
        <div
            role={decorative ? "none" : "separator"}
            aria-orientation={orientation}
            className={cn(
                "bg-border",
                orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                className
            )}
        />
    );
}

// =============================================================================
// SPACER
// =============================================================================

interface SpacerProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
}

export function Spacer({ size = "md", className }: SpacerProps) {
    const sizeClasses = {
        xs: "h-2",
        sm: "h-4",
        md: "h-8",
        lg: "h-12",
        xl: "h-16",
        "2xl": "h-24",
    };

    return <div className={cn(sizeClasses[size], className)} aria-hidden="true" />;
}
