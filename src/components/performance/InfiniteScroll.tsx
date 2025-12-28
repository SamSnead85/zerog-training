"use client";

/**
 * Infinite Scroll Component
 * 
 * Intersection Observer-based infinite scroll with 
 * loading states, error handling, and scroll restoration.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, RefreshCw, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui";

// =============================================================================
// TYPES
// =============================================================================

interface InfiniteScrollProps<T> {
    items: T[];
    loadMore: () => Promise<void>;
    hasMore: boolean;
    isLoading?: boolean;
    error?: Error | null;
    renderItem: (item: T, index: number) => React.ReactNode;
    getItemKey: (item: T, index: number) => string | number;
    threshold?: number;
    className?: string;
    loadingComponent?: React.ReactNode;
    errorComponent?: React.ReactNode;
    emptyComponent?: React.ReactNode;
    endComponent?: React.ReactNode;
    showScrollToTop?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function InfiniteScroll<T>({
    items,
    loadMore,
    hasMore,
    isLoading = false,
    error = null,
    renderItem,
    getItemKey,
    threshold = 100,
    className,
    loadingComponent,
    errorComponent,
    emptyComponent,
    endComponent,
    showScrollToTop = true,
}: InfiniteScrollProps<T>) {
    const [showScroll, setShowScroll] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const loader = loaderRef.current;
        if (!loader || !hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            {
                rootMargin: `${threshold}px`,
            }
        );

        observer.observe(loader);
        return () => observer.disconnect();
    }, [hasMore, isLoading, loadMore, threshold]);

    // Scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Empty state
    if (items.length === 0 && !isLoading && !error) {
        return (
            <div className={className}>
                {emptyComponent || (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-muted-foreground">No items to display</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={containerRef} className={className}>
            {/* Items */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={getItemKey(item, index)}>{renderItem(item, index)}</div>
                ))}
            </div>

            {/* Loading indicator */}
            {isLoading && (
                <div className="py-8 flex justify-center">
                    {loadingComponent || (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Loading more...</span>
                        </div>
                    )}
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="py-8">
                    {errorComponent || (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertCircle className="h-5 w-5" />
                                <span>Failed to load more items</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={loadMore}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try again
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Intersection trigger for loading more */}
            {hasMore && !isLoading && !error && <div ref={loaderRef} className="h-1" />}

            {/* End of list message */}
            {!hasMore && items.length > 0 && (
                <div className="py-8 text-center">
                    {endComponent || (
                        <p className="text-muted-foreground text-sm">You've reached the end</p>
                    )}
                </div>
            )}

            {/* Scroll to top button */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all",
                        "hover:bg-primary/90 hover:scale-110",
                        showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    )}
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}

// =============================================================================
// HOOK FOR INFINITE SCROLL DATA
// =============================================================================

interface UseInfiniteScrollOptions<T> {
    fetchFn: (page: number) => Promise<{ data: T[]; hasMore: boolean }>;
    initialPage?: number;
}

export function useInfiniteScroll<T>({ fetchFn, initialPage = 1 }: UseInfiniteScrollOptions<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchFn(page);
            setItems((prev) => [...prev, ...result.data]);
            setHasMore(result.hasMore);
            setPage((prev) => prev + 1);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn, page, isLoading, hasMore]);

    const reset = useCallback(() => {
        setItems([]);
        setPage(initialPage);
        setHasMore(true);
        setError(null);
    }, [initialPage]);

    return {
        items,
        hasMore,
        isLoading,
        error,
        loadMore,
        reset,
    };
}

export default InfiniteScroll;
