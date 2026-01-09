"use client";

import { useState, useEffect, useCallback } from "react";

// Generic data fetching hook with caching
interface UseFetchOptions {
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
    dedupingInterval?: number;
}

interface UseFetchReturn<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
    isValidating: boolean;
    mutate: (data?: T) => Promise<void>;
    revalidate: () => Promise<void>;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();

export function useFetch<T>(
    url: string | null,
    options: UseFetchOptions = {}
): UseFetchReturn<T> {
    const {
        revalidateOnFocus = true,
        revalidateOnReconnect = true,
        dedupingInterval = 2000,
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isValidating, setIsValidating] = useState(false);

    const fetchData = useCallback(async (showLoading = true) => {
        if (!url) return;

        // Check cache
        const cached = cache.get(url);
        if (cached && Date.now() - cached.timestamp < dedupingInterval) {
            setData(cached.data as T);
            setIsLoading(false);
            return;
        }

        if (showLoading) setIsValidating(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            setError(null);
            cache.set(url, { data: result, timestamp: Date.now() });
        } catch (e) {
            setError(e instanceof Error ? e : new Error("Unknown error"));
        } finally {
            setIsLoading(false);
            setIsValidating(false);
        }
    }, [url, dedupingInterval]);

    const mutate = useCallback(async (newData?: T) => {
        if (newData !== undefined) {
            setData(newData);
            if (url) cache.set(url, { data: newData, timestamp: Date.now() });
        } else {
            await fetchData(false);
        }
    }, [url, fetchData]);

    const revalidate = useCallback(async () => {
        await fetchData(false);
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Revalidate on focus
    useEffect(() => {
        if (!revalidateOnFocus) return;

        const handleFocus = () => revalidate();
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [revalidateOnFocus, revalidate]);

    // Revalidate on reconnect
    useEffect(() => {
        if (!revalidateOnReconnect) return;

        const handleOnline = () => revalidate();
        window.addEventListener("online", handleOnline);
        return () => window.removeEventListener("online", handleOnline);
    }, [revalidateOnReconnect, revalidate]);

    return { data, error, isLoading, isValidating, mutate, revalidate };
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

// Throttle hook
export function useThrottle<T>(value: T, interval: number): T {
    const [throttledValue, setThrottledValue] = useState(value);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    useEffect(() => {
        const now = Date.now();
        if (now - lastUpdated >= interval) {
            setThrottledValue(value);
            setLastUpdated(now);
        } else {
            const timer = setTimeout(() => {
                setThrottledValue(value);
                setLastUpdated(Date.now());
            }, interval - (now - lastUpdated));
            return () => clearTimeout(timer);
        }
    }, [value, interval, lastUpdated]);

    return throttledValue;
}

// Local storage hook with SSR safety
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
        setIsLoaded(true);
    }, [key]);

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return { value: storedValue, setValue, removeValue, isLoaded };
}

// Media query hook
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

// Breakpoint hooks
export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet(): boolean {
    return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsDesktop(): boolean {
    return useMediaQuery("(min-width: 1024px)");
}

// Intersection observer hook for lazy loading
export function useIntersectionObserver(
    ref: React.RefObject<Element>,
    options: IntersectionObserverInit = {}
): boolean {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, options]);

    return isIntersecting;
}

// Scroll position hook
export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({ x: window.scrollX, y: window.scrollY });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollPosition;
}

// Window size hook
export function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}
