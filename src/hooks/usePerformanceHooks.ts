"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Intersection observer hook for lazy loading
export function useLazyLoad<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

// Virtual scroll hook for large lists
export function useVirtualScroll<T>(
    items: T[],
    itemHeight: number,
    containerHeight: number,
    overscan = 3
) {
    const [scrollTop, setScrollTop] = useState(0);

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems = items.slice(startIndex, endIndex + 1).map((item, i) => ({
        item,
        index: startIndex + i,
        style: {
            position: "absolute" as const,
            top: (startIndex + i) * itemHeight,
            height: itemHeight,
            left: 0,
            right: 0,
        },
    }));

    const totalHeight = items.length * itemHeight;

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    return { visibleItems, totalHeight, handleScroll };
}

// Animation frame hook for smooth animations
export function useAnimationFrame(callback: (deltaTime: number) => void, deps: unknown[] = []) {
    const requestRef = useRef<number>(undefined);
    const previousTimeRef = useRef<number>(undefined);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;
                callbackRef.current(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

// Spring animation hook
export function useSpring(
    targetValue: number,
    config: { stiffness?: number; damping?: number; mass?: number } = {}
) {
    const { stiffness = 170, damping = 26, mass = 1 } = config;

    const [value, setValue] = useState(targetValue);
    const velocityRef = useRef(0);
    const targetRef = useRef(targetValue);

    useEffect(() => {
        targetRef.current = targetValue;
    }, [targetValue]);

    useAnimationFrame((deltaTime) => {
        const dt = Math.min(deltaTime / 1000, 0.064); // Cap at ~15fps min

        const displacement = value - targetRef.current;
        const springForce = -stiffness * displacement;
        const dampingForce = -damping * velocityRef.current;
        const acceleration = (springForce + dampingForce) / mass;

        velocityRef.current += acceleration * dt;
        const newValue = value + velocityRef.current * dt;

        if (Math.abs(velocityRef.current) < 0.001 && Math.abs(displacement) < 0.001) {
            setValue(targetRef.current);
            velocityRef.current = 0;
        } else {
            setValue(newValue);
        }
    }, [value, stiffness, damping, mass]);

    return value;
}

// Staggered animation hook
export function useStaggeredAnimation(itemCount: number, delayMs = 50) {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    useEffect(() => {
        setVisibleItems([]);

        const timeouts: NodeJS.Timeout[] = [];

        for (let i = 0; i < itemCount; i++) {
            const timeout = setTimeout(() => {
                setVisibleItems(prev => [...prev, i]);
            }, i * delayMs);
            timeouts.push(timeout);
        }

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [itemCount, delayMs]);

    return visibleItems;
}

// Count up animation hook
export function useCountUp(
    end: number,
    duration = 1000,
    start = 0,
    easing: (t: number) => number = (t) => t
) {
    const [count, setCount] = useState(start);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        startTimeRef.current = null;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;

            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            const easedProgress = easing(progress);
            const currentValue = start + (end - start) * easedProgress;

            setCount(Math.round(currentValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, start, easing]);

    return count;
}

// Typewriter effect hook
export function useTypewriter(text: string, speed = 50) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayText("");
        setIsComplete(false);

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return { displayText, isComplete };
}

// Idle callback hook for non-urgent work
export function useIdleCallback(callback: () => void, deps: unknown[] = []) {
    useEffect(() => {
        if ("requestIdleCallback" in window) {
            const id = requestIdleCallback(callback);
            return () => cancelIdleCallback(id);
        } else {
            const id = setTimeout(callback, 1);
            return () => clearTimeout(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

// Preload images hook
export function usePreloadImages(urls: string[]) {
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (urls.length === 0) {
            setLoaded(true);
            return;
        }

        let loadedCount = 0;

        urls.forEach((url) => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / urls.length) * 100));
                if (loadedCount === urls.length) {
                    setLoaded(true);
                }
            };
            img.src = url;
        });
    }, [urls]);

    return { loaded, progress };
}

// Performance monitoring hook
export function usePerformanceMetrics() {
    const [metrics, setMetrics] = useState<{
        fcp?: number;
        lcp?: number;
        fid?: number;
        cls?: number;
    }>({});

    useEffect(() => {
        if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
            return;
        }

        const updateMetrics = (name: string, value: number) => {
            setMetrics((prev) => ({ ...prev, [name]: value }));
        };

        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === "first-contentful-paint") {
                    updateMetrics("fcp", entry.startTime);
                }
            }
        });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            updateMetrics("lcp", lastEntry.startTime);
        });

        try {
            fcpObserver.observe({ type: "paint", buffered: true });
            lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
        } catch {
            // Observers not supported
        }

        return () => {
            fcpObserver.disconnect();
            lcpObserver.disconnect();
        };
    }, []);

    return metrics;
}
