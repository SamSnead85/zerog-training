/**
 * Client-Side Caching Utilities
 * 
 * In-memory cache with TTL, LRU eviction, and 
 * React Query-style cache invalidation.
 */

// =============================================================================
// TYPES
// =============================================================================

interface CacheEntry<T> {
    value: T;
    expiresAt: number;
    createdAt: number;
    lastAccessed: number;
    hits: number;
}

interface CacheOptions {
    ttl?: number; // Time to live in milliseconds
    maxSize?: number; // Max number of entries
}

// =============================================================================
// LRU CACHE
// =============================================================================

export class LRUCache<T> {
    private cache: Map<string, CacheEntry<T>> = new Map();
    private maxSize: number;
    private defaultTTL: number;

    constructor(options: CacheOptions = {}) {
        this.maxSize = options.maxSize || 100;
        this.defaultTTL = options.ttl || 5 * 60 * 1000; // 5 minutes default
    }

    get(key: string): T | undefined {
        const entry = this.cache.get(key);

        if (!entry) return undefined;

        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }

        // Update access info for LRU
        entry.lastAccessed = Date.now();
        entry.hits++;

        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, entry);

        return entry.value;
    }

    set(key: string, value: T, ttl?: number): void {
        // Evict if at max size
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this.evictLRU();
        }

        const now = Date.now();
        this.cache.set(key, {
            value,
            expiresAt: now + (ttl || this.defaultTTL),
            createdAt: now,
            lastAccessed: now,
            hits: 0,
        });
    }

    has(key: string): boolean {
        const entry = this.cache.get(key);
        if (!entry) return false;
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    invalidate(pattern: string | RegExp): number {
        let count = 0;
        const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;

        this.cache.forEach((_, key) => {
            if (regex.test(key)) {
                this.cache.delete(key);
                count++;
            }
        });

        return count;
    }

    private evictLRU(): void {
        // Find least recently used entry
        let lruKey: string | undefined;
        let lruTime = Infinity;

        this.cache.forEach((entry, key) => {
            if (entry.lastAccessed < lruTime) {
                lruTime = entry.lastAccessed;
                lruKey = key;
            }
        });

        if (lruKey) {
            this.cache.delete(lruKey);
        }
    }

    getStats(): { size: number; maxSize: number; hitRate: number } {
        let totalHits = 0;
        this.cache.forEach((entry) => {
            totalHits += entry.hits;
        });

        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hitRate: this.cache.size > 0 ? totalHits / this.cache.size : 0,
        };
    }

    keys(): string[] {
        return Array.from(this.cache.keys());
    }

    prune(): number {
        const now = Date.now();
        let pruned = 0;

        this.cache.forEach((entry, key) => {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
                pruned++;
            }
        });

        return pruned;
    }
}

// =============================================================================
// QUERY CACHE (for API responses)
// =============================================================================

interface QueryCacheEntry<T> {
    data: T;
    timestamp: number;
    staleTime: number;
    isStale: boolean;
}

export class QueryCache<T = unknown> {
    private cache: Map<string, QueryCacheEntry<T>> = new Map();
    private defaultStaleTime: number;

    constructor(staleTime: number = 30000) {
        this.defaultStaleTime = staleTime;
    }

    getQuery(key: string): { data: T; isStale: boolean } | undefined {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        const isStale = Date.now() - entry.timestamp > entry.staleTime;
        return { data: entry.data, isStale };
    }

    setQuery(key: string, data: T, staleTime?: number): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            staleTime: staleTime || this.defaultStaleTime,
            isStale: false,
        });
    }

    invalidateQueries(predicate: (key: string) => boolean): void {
        this.cache.forEach((_, key) => {
            if (predicate(key)) {
                this.cache.delete(key);
            }
        });
    }

    invalidateAll(): void {
        this.cache.clear();
    }
}

// =============================================================================
// MEMOIZATION
// =============================================================================

export function memoize<T extends (...args: unknown[]) => unknown>(
    fn: T,
    options: { maxSize?: number; ttl?: number; keyFn?: (...args: Parameters<T>) => string } = {}
): T {
    const cache = new LRUCache<ReturnType<T>>({
        maxSize: options.maxSize || 100,
        ttl: options.ttl,
    });

    const keyFn = options.keyFn || ((...args) => JSON.stringify(args));

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = keyFn(...args);
        const cached = cache.get(key);

        if (cached !== undefined) {
            return cached;
        }

        const result = fn(...args) as ReturnType<T>;
        cache.set(key, result);
        return result;
    }) as T;
}

// =============================================================================
// HOOK FOR CACHED DATA
// =============================================================================

import { useState, useEffect, useCallback } from "react";

const globalCache = new LRUCache<unknown>({ maxSize: 500, ttl: 5 * 60 * 1000 });

export function useCachedData<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: { ttl?: number; staleWhileRevalidate?: boolean } = {}
): { data: T | undefined; isLoading: boolean; error: Error | undefined; refetch: () => void } {
    const [data, setData] = useState<T | undefined>(() => globalCache.get(key) as T | undefined);
    const [isLoading, setIsLoading] = useState(!data);
    const [error, setError] = useState<Error | undefined>();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            const result = await fetcher();
            globalCache.set(key, result, options.ttl);
            setData(result);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, [key, fetcher, options.ttl]);

    useEffect(() => {
        const cached = globalCache.get(key) as T | undefined;
        if (cached) {
            setData(cached);
            if (options.staleWhileRevalidate) {
                fetchData();
            }
        } else {
            fetchData();
        }
    }, [key, fetchData, options.staleWhileRevalidate]);

    return { data, isLoading, error, refetch: fetchData };
}

// =============================================================================
// EXPORTS
// =============================================================================

export const cache = globalCache;

export default {
    LRUCache,
    QueryCache,
    memoize,
    useCachedData,
    cache,
};
