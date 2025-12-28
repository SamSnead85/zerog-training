/**
 * Local Storage Utilities
 * 
 * Type-safe localStorage wrapper with JSON serialization,
 * expiration support, and SSR safety.
 */

// =============================================================================
// TYPES
// =============================================================================

interface StorageItem<T> {
    value: T;
    expiry?: number;
    createdAt: number;
}

interface StorageOptions {
    expiryMs?: number;
}

// =============================================================================
// STORAGE CLASS
// =============================================================================

class TypedStorage {
    private prefix: string;

    constructor(prefix: string = "zerog_") {
        this.prefix = prefix;
    }

    private getKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    private isLocalStorageAvailable(): boolean {
        if (typeof window === "undefined") return false;
        try {
            const test = "__storage_test__";
            window.localStorage.setItem(test, test);
            window.localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get an item from localStorage
     */
    get<T>(key: string, defaultValue?: T): T | undefined {
        if (!this.isLocalStorageAvailable()) return defaultValue;

        try {
            const item = window.localStorage.getItem(this.getKey(key));
            if (!item) return defaultValue;

            const parsed: StorageItem<T> = JSON.parse(item);

            // Check if expired
            if (parsed.expiry && Date.now() > parsed.expiry) {
                this.remove(key);
                return defaultValue;
            }

            return parsed.value;
        } catch {
            return defaultValue;
        }
    }

    /**
     * Set an item in localStorage
     */
    set<T>(key: string, value: T, options: StorageOptions = {}): boolean {
        if (!this.isLocalStorageAvailable()) return false;

        try {
            const item: StorageItem<T> = {
                value,
                createdAt: Date.now(),
                expiry: options.expiryMs ? Date.now() + options.expiryMs : undefined,
            };

            window.localStorage.setItem(this.getKey(key), JSON.stringify(item));
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Remove an item from localStorage
     */
    remove(key: string): boolean {
        if (!this.isLocalStorageAvailable()) return false;

        try {
            window.localStorage.removeItem(this.getKey(key));
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if an item exists
     */
    has(key: string): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Get all keys with this prefix
     */
    keys(): string[] {
        if (!this.isLocalStorageAvailable()) return [];

        const keys: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key?.startsWith(this.prefix)) {
                keys.push(key.substring(this.prefix.length));
            }
        }
        return keys;
    }

    /**
     * Clear all items with this prefix
     */
    clear(): void {
        if (!this.isLocalStorageAvailable()) return;

        this.keys().forEach((key) => this.remove(key));
    }

    /**
     * Get storage size in bytes
     */
    getSize(): number {
        if (!this.isLocalStorageAvailable()) return 0;

        let size = 0;
        this.keys().forEach((key) => {
            const item = window.localStorage.getItem(this.getKey(key));
            if (item) {
                size += item.length * 2; // UTF-16
            }
        });
        return size;
    }
}

// =============================================================================
// SESSION STORAGE
// =============================================================================

class TypedSessionStorage {
    private prefix: string;

    constructor(prefix: string = "zerog_") {
        this.prefix = prefix;
    }

    private getKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    private isSessionStorageAvailable(): boolean {
        if (typeof window === "undefined") return false;
        try {
            const test = "__storage_test__";
            window.sessionStorage.setItem(test, test);
            window.sessionStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    get<T>(key: string, defaultValue?: T): T | undefined {
        if (!this.isSessionStorageAvailable()) return defaultValue;

        try {
            const item = window.sessionStorage.getItem(this.getKey(key));
            if (!item) return defaultValue;
            return JSON.parse(item);
        } catch {
            return defaultValue;
        }
    }

    set<T>(key: string, value: T): boolean {
        if (!this.isSessionStorageAvailable()) return false;

        try {
            window.sessionStorage.setItem(this.getKey(key), JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    }

    remove(key: string): boolean {
        if (!this.isSessionStorageAvailable()) return false;

        try {
            window.sessionStorage.removeItem(this.getKey(key));
            return true;
        } catch {
            return false;
        }
    }

    clear(): void {
        if (!this.isSessionStorageAvailable()) return;

        const keys: string[] = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
            const key = window.sessionStorage.key(i);
            if (key?.startsWith(this.prefix)) {
                keys.push(key);
            }
        }
        keys.forEach((key) => window.sessionStorage.removeItem(key));
    }
}

// =============================================================================
// REACT HOOK
// =============================================================================

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    const storage = new TypedStorage();

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        return storage.get<T>(key) ?? initialValue;
    });

    useEffect(() => {
        storage.set(key, storedValue);
    }, [key, storedValue]);

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        setStoredValue((prev) => {
            const newValue = value instanceof Function ? value(prev) : value;
            return newValue;
        });
    }, []);

    const removeValue = useCallback(() => {
        storage.remove(key);
        setStoredValue(initialValue);
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
}

export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    const storage = new TypedSessionStorage();

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        return storage.get<T>(key) ?? initialValue;
    });

    useEffect(() => {
        storage.set(key, storedValue);
    }, [key, storedValue]);

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        setStoredValue((prev) => {
            const newValue = value instanceof Function ? value(prev) : value;
            return newValue;
        });
    }, []);

    return [storedValue, setValue];
}

// =============================================================================
// EXPORTS
// =============================================================================

export const typedLocalStorage = new TypedStorage();
export const typedSessionStorage = new TypedSessionStorage();

export default {
    localStorage: typedLocalStorage,
    sessionStorage: typedSessionStorage,
    useLocalStorage,
    useSessionStorage,
};
