"use client";

/**
 * Lazy Load Component
 * 
 * Intersection Observer-based lazy loading for components
 * with placeholder and fade-in animation.
 */

import { useState, useEffect, useRef, Suspense } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface LazyLoadProps {
    children: React.ReactNode;
    placeholder?: React.ReactNode;
    rootMargin?: string;
    threshold?: number;
    once?: boolean;
    className?: string;
    fadeIn?: boolean;
    delay?: number;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LazyLoad({
    children,
    placeholder,
    rootMargin = "100px",
    threshold = 0.1,
    once = true,
    className,
    fadeIn = true,
    delay = 0,
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (once) {
                        observer.disconnect();
                    }

                    if (delay > 0) {
                        setTimeout(() => {
                            setIsVisible(true);
                            setShouldRender(true);
                        }, delay);
                    } else {
                        setIsVisible(true);
                        setShouldRender(true);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [rootMargin, threshold, once, delay]);

    return (
        <div ref={ref} className={className}>
            {shouldRender ? (
                <div
                    className={cn(
                        fadeIn && "transition-opacity duration-500",
                        fadeIn && (isVisible ? "opacity-100" : "opacity-0")
                    )}
                >
                    {children}
                </div>
            ) : (
                placeholder || <div className="h-20" />
            )}
        </div>
    );
}

// =============================================================================
// LAZY SECTION (for full sections)
// =============================================================================

interface LazySectionProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
    minHeight?: string | number;
}

export function LazySection({
    children,
    fallback,
    className,
    minHeight = 200,
}: LazySectionProps) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const height = typeof minHeight === "number" ? `${minHeight}px` : minHeight;

    return (
        <div
            ref={ref}
            className={className}
            style={{ minHeight: isInView ? undefined : height }}
        >
            {isInView ? (
                <Suspense fallback={fallback || <LoadingPlaceholder height={height} />}>
                    {children}
                </Suspense>
            ) : (
                fallback || <LoadingPlaceholder height={height} />
            )}
        </div>
    );
}

// =============================================================================
// LOADING PLACEHOLDER
// =============================================================================

function LoadingPlaceholder({ height }: { height: string }) {
    return (
        <div
            className="flex items-center justify-center bg-muted/30 rounded-xl animate-pulse"
            style={{ minHeight: height }}
        >
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
    );
}

// =============================================================================
// VIRTUALIZED LIST (basic implementation)
// =============================================================================

interface VirtualizedListProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    overscan?: number;
    className?: string;
}

export function VirtualizedList<T>({
    items,
    itemHeight,
    containerHeight,
    renderItem,
    overscan = 3,
    className,
}: VirtualizedListProps<T>) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const totalHeight = items.length * itemHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
        items.length,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    const visibleItems = items.slice(startIndex, endIndex);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    return (
        <div
            ref={containerRef}
            className={cn("overflow-auto", className)}
            style={{ height: containerHeight }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: "relative" }}>
                {visibleItems.map((item, index) => (
                    <div
                        key={startIndex + index}
                        style={{
                            position: "absolute",
                            top: (startIndex + index) * itemHeight,
                            height: itemHeight,
                            width: "100%",
                        }}
                    >
                        {renderItem(item, startIndex + index)}
                    </div>
                ))}
            </div>
        </div>
    );
}

// =============================================================================
// PROGRESSIVE LOAD (load items progressively)
// =============================================================================

interface ProgressiveLoadProps<T> {
    items: T[];
    batchSize?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
}

export function ProgressiveLoad<T>({
    items,
    batchSize = 10,
    renderItem,
    className,
}: ProgressiveLoadProps<T>) {
    const [displayCount, setDisplayCount] = useState(batchSize);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && displayCount < items.length) {
                    setDisplayCount((prev) => Math.min(prev + batchSize, items.length));
                }
            },
            { rootMargin: "100px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [displayCount, items.length, batchSize]);

    return (
        <div className={className}>
            {items.slice(0, displayCount).map((item, index) => (
                <div key={index}>{renderItem(item, index)}</div>
            ))}
            {displayCount < items.length && (
                <div ref={loadMoreRef} className="py-8 text-center">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                </div>
            )}
        </div>
    );
}

export default {
    LazyLoad,
    LazySection,
    VirtualizedList,
    ProgressiveLoad,
};
