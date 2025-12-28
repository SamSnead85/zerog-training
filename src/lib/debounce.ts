/**
 * Debounce & Throttle Utilities
 * 
 * Production-ready hooks for debouncing and throttling
 * function calls with cleanup and cancellation.
 */

import { useRef, useCallback, useEffect, useState } from "react";

// =============================================================================
// DEBOUNCE
// =============================================================================

/**
 * Creates a debounced version of a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delayMs: number
): T & { cancel: () => void } {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const debounced = ((...args: unknown[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delayMs);
    }) as T & { cancel: () => void };

    debounced.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return debounced;
}

/**
 * Hook for debouncing a value
 */
export function useDebounce<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delayMs]);

    return debouncedValue;
}

/**
 * Hook for debouncing a callback function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
    callback: T,
    delayMs: number,
    deps: React.DependencyList = []
): T & { cancel: () => void } {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Update callback ref on each render
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedFn = useCallback(
        ((...args: unknown[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delayMs);
        }) as T & { cancel: () => void },
        [delayMs, ...deps]
    );

    debouncedFn.cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return debouncedFn;
}

// =============================================================================
// THROTTLE
// =============================================================================

/**
 * Creates a throttled version of a function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    limitMs: number
): T & { cancel: () => void } {
    let lastRun = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: unknown[] | null = null;

    const throttled = ((...args: unknown[]) => {
        const now = Date.now();

        if (now - lastRun >= limitMs) {
            fn(...args);
            lastRun = now;
        } else {
            lastArgs = args;
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    if (lastArgs) {
                        fn(...lastArgs);
                        lastRun = Date.now();
                        lastArgs = null;
                    }
                    timeoutId = null;
                }, limitMs - (now - lastRun));
            }
        }
    }) as T & { cancel: () => void };

    throttled.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastArgs = null;
    };

    return throttled;
}

/**
 * Hook for throttling a callback function
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
    callback: T,
    limitMs: number,
    deps: React.DependencyList = []
): T & { cancel: () => void } {
    const callbackRef = useRef(callback);
    const lastRunRef = useRef(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastArgsRef = useRef<unknown[] | null>(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const throttledFn = useCallback(
        ((...args: unknown[]) => {
            const now = Date.now();

            if (now - lastRunRef.current >= limitMs) {
                callbackRef.current(...args);
                lastRunRef.current = now;
            } else {
                lastArgsRef.current = args;
                if (!timeoutRef.current) {
                    timeoutRef.current = setTimeout(() => {
                        if (lastArgsRef.current) {
                            callbackRef.current(...lastArgsRef.current);
                            lastRunRef.current = Date.now();
                            lastArgsRef.current = null;
                        }
                        timeoutRef.current = null;
                    }, limitMs - (now - lastRunRef.current));
                }
            }
        }) as T & { cancel: () => void },
        [limitMs, ...deps]
    );

    throttledFn.cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        lastArgsRef.current = null;
    };

    return throttledFn;
}

// =============================================================================
// ADDITIONAL UTILITIES
// =============================================================================

/**
 * Hook that returns true after the specified delay
 */
export function useTimeout(delayMs: number): boolean {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), delayMs);
        return () => clearTimeout(timer);
    }, [delayMs]);

    return ready;
}

/**
 * Hook that runs a callback on an interval
 */
export function useInterval(callback: () => void, delayMs: number | null): void {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delayMs === null) return;

        const id = setInterval(() => callbackRef.current(), delayMs);
        return () => clearInterval(id);
    }, [delayMs]);
}

/**
 * Hook for countdown timer
 */
export function useCountdown(
    targetDate: Date | number,
    intervalMs: number = 1000
): { days: number; hours: number; minutes: number; seconds: number; isComplete: boolean } {
    const [timeLeft, setTimeLeft] = useState(() => {
        const target = new Date(targetDate).getTime();
        return Math.max(0, target - Date.now());
    });

    useInterval(() => {
        const target = new Date(targetDate).getTime();
        setTimeLeft(Math.max(0, target - Date.now()));
    }, timeLeft > 0 ? intervalMs : null);

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    return {
        days,
        hours,
        minutes,
        seconds,
        isComplete: timeLeft === 0,
    };
}

export default {
    debounce,
    useDebounce,
    useDebouncedCallback,
    throttle,
    useThrottledCallback,
    useTimeout,
    useInterval,
    useCountdown,
};
