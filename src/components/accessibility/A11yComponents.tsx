"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Skip to main content link for accessibility
export function SkipToContent({ mainId = "main-content" }: { mainId?: string }) {
    return (
        <a
            href={`#${mainId}`}
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
            Skip to main content
        </a>
    );
}

// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
    return <span className="sr-only">{children}</span>;
}

// Live region for announcements
export function LiveRegion({
    message,
    assertive = false,
}: {
    message: string;
    assertive?: boolean;
}) {
    return (
        <div
            role="status"
            aria-live={assertive ? "assertive" : "polite"}
            aria-atomic="true"
            className="sr-only"
        >
            {message}
        </div>
    );
}

// Focus trap for modals
export function FocusTrap({ children, active }: { children: React.ReactNode; active: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active) return;

        const container = containerRef.current;
        if (!container) return;

        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable?.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable?.focus();
                }
            }
        };

        container.addEventListener("keydown", handleKeyDown);
        firstFocusable?.focus();

        return () => container.removeEventListener("keydown", handleKeyDown);
    }, [active]);

    return <div ref={containerRef}>{children}</div>;
}

// Reduced motion wrapper
export function ReducedMotion({
    children,
    fallback,
}: {
    children: React.ReactNode;
    fallback: React.ReactNode;
}) {
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        // Component will re-render with proper styles based on CSS media query
    }, []);

    return (
        <>
            <div className="motion-safe:block motion-reduce:hidden">{children}</div>
            <div className="motion-safe:hidden motion-reduce:block">{fallback}</div>
        </>
    );
}

// High contrast mode detection hook
export function useHighContrast(): boolean {
    const ref = useRef(false);

    useEffect(() => {
        ref.current = window.matchMedia("(prefers-contrast: more)").matches;
    }, []);

    return ref.current;
}

// Accessible icon button
export function IconButton({
    icon,
    label,
    onClick,
    disabled,
    className,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={cn(
                "p-2 rounded-lg transition-colors",
                "hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {icon}
        </button>
    );
}

// Loading state with announcements
export function LoadingState({
    message = "Loading...",
    className,
}: {
    message?: string;
    className?: string;
}) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={cn("flex items-center justify-center gap-3", className)}
        >
            <div className="w-6 h-6 border-2 border-white/20 border-t-primary rounded-full animate-spin" />
            <span className="text-white/60">{message}</span>
            <ScreenReaderOnly>{message}</ScreenReaderOnly>
        </div>
    );
}

// Error state with recovery
export function ErrorState({
    title = "Something went wrong",
    message,
    retryLabel = "Try again",
    onRetry,
    className,
}: {
    title?: string;
    message?: string;
    retryLabel?: string;
    onRetry?: () => void;
    className?: string;
}) {
    return (
        <div
            role="alert"
            className={cn(
                "flex flex-col items-center justify-center text-center p-8",
                className
            )}
        >
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            {message && <p className="text-white/60 mb-4">{message}</p>}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    {retryLabel}
                </button>
            )}
        </div>
    );
}

// Progress announcer for screen readers
export function ProgressAnnouncer({
    value,
    max = 100,
    label,
}: {
    value: number;
    max?: number;
    label?: string;
}) {
    const percentage = Math.round((value / max) * 100);

    return (
        <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
            <ScreenReaderOnly>
                {label ? `${label}: ${percentage}% complete` : `${percentage}% complete`}
            </ScreenReaderOnly>
        </div>
    );
}

// Heading with appropriate level
export function Heading({
    level,
    children,
    className,
}: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
}) {
    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    const sizeClasses = {
        1: "text-4xl font-bold",
        2: "text-3xl font-bold",
        3: "text-2xl font-semibold",
        4: "text-xl font-semibold",
        5: "text-lg font-medium",
        6: "text-base font-medium",
    };

    return (
        <Tag className={cn(sizeClasses[level], className)}>
            {children}
        </Tag>
    );
}
