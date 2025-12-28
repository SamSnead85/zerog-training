/**
 * Keyboard Shortcuts System
 * 
 * Global keyboard shortcuts handler with context awareness,
 * hotkey registration, and cheatsheet display.
 */

import { useEffect, useCallback, useRef } from "react";

// =============================================================================
// TYPES
// =============================================================================

export interface KeyboardShortcut {
    key: string;
    modifiers?: {
        ctrl?: boolean;
        shift?: boolean;
        alt?: boolean;
        meta?: boolean;
    };
    description: string;
    category: string;
    action: () => void;
    enabled?: boolean;
    global?: boolean; // Works even when typing in inputs
}

interface ShortcutRegistration {
    id: string;
    shortcut: KeyboardShortcut;
}

// =============================================================================
// SHORTCUT MANAGER (Singleton)
// =============================================================================

class ShortcutManager {
    private shortcuts: Map<string, ShortcutRegistration> = new Map();
    private enabled: boolean = true;

    private getShortcutId(shortcut: KeyboardShortcut): string {
        const mods = shortcut.modifiers || {};
        const parts: string[] = [];
        if (mods.ctrl) parts.push("ctrl");
        if (mods.alt) parts.push("alt");
        if (mods.shift) parts.push("shift");
        if (mods.meta) parts.push("meta");
        parts.push(shortcut.key.toLowerCase());
        return parts.join("+");
    }

    register(shortcut: KeyboardShortcut): string {
        const id = this.getShortcutId(shortcut);
        this.shortcuts.set(id, { id, shortcut });
        return id;
    }

    unregister(id: string): void {
        this.shortcuts.delete(id);
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (!this.enabled) return;

        // Build the key combination string
        const parts: string[] = [];
        if (event.ctrlKey) parts.push("ctrl");
        if (event.altKey) parts.push("alt");
        if (event.shiftKey) parts.push("shift");
        if (event.metaKey) parts.push("meta");
        parts.push(event.key.toLowerCase());
        const combo = parts.join("+");

        const registration = this.shortcuts.get(combo);
        if (!registration) return;

        const shortcut = registration.shortcut;

        // Check if enabled
        if (shortcut.enabled === false) return;

        // Check if we're in an input field (unless global)
        if (!shortcut.global) {
            const target = event.target as HTMLElement;
            const tagName = target.tagName.toLowerCase();
            if (tagName === "input" || tagName === "textarea" || target.isContentEditable) {
                return;
            }
        }

        event.preventDefault();
        shortcut.action();
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    getAllShortcuts(): ShortcutRegistration[] {
        return Array.from(this.shortcuts.values());
    }

    getByCategory(): Record<string, ShortcutRegistration[]> {
        const categories: Record<string, ShortcutRegistration[]> = {};
        this.shortcuts.forEach((reg) => {
            const cat = reg.shortcut.category;
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(reg);
        });
        return categories;
    }
}

export const shortcutManager = new ShortcutManager();

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Register keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
    const registeredIds = useRef<string[]>([]);

    useEffect(() => {
        // Register shortcuts
        registeredIds.current = shortcuts.map((s) => shortcutManager.register(s));

        // Setup global listener if not already
        const handler = (e: KeyboardEvent) => shortcutManager.handleKeyDown(e);
        window.addEventListener("keydown", handler);

        return () => {
            // Unregister on cleanup
            registeredIds.current.forEach((id) => shortcutManager.unregister(id));
            window.removeEventListener("keydown", handler);
        };
    }, [shortcuts]);
}

/**
 * Register a single keyboard shortcut
 */
export function useKeyboardShortcut(
    key: string,
    callback: () => void,
    options: {
        ctrl?: boolean;
        shift?: boolean;
        alt?: boolean;
        meta?: boolean;
        description?: string;
        category?: string;
        enabled?: boolean;
        global?: boolean;
    } = {}
): void {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const shortcut: KeyboardShortcut = {
            key,
            modifiers: {
                ctrl: options.ctrl,
                shift: options.shift,
                alt: options.alt,
                meta: options.meta,
            },
            description: options.description || "",
            category: options.category || "General",
            action: () => callbackRef.current(),
            enabled: options.enabled !== false,
            global: options.global,
        };

        const id = shortcutManager.register(shortcut);

        const handler = (e: KeyboardEvent) => shortcutManager.handleKeyDown(e);
        window.addEventListener("keydown", handler);

        return () => {
            shortcutManager.unregister(id);
            window.removeEventListener("keydown", handler);
        };
    }, [key, options.ctrl, options.shift, options.alt, options.meta, options.enabled, options.global, options.description, options.category]);
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Format shortcut for display
 */
export function formatShortcut(shortcut: KeyboardShortcut): string {
    const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const mods = shortcut.modifiers || {};
    const parts: string[] = [];

    if (mods.ctrl) parts.push(isMac ? "⌃" : "Ctrl");
    if (mods.alt) parts.push(isMac ? "⌥" : "Alt");
    if (mods.shift) parts.push(isMac ? "⇧" : "Shift");
    if (mods.meta) parts.push(isMac ? "⌘" : "Win");

    // Format key nicely
    let key = shortcut.key;
    if (key === " ") key = "Space";
    else if (key.length === 1) key = key.toUpperCase();
    else key = key.charAt(0).toUpperCase() + key.slice(1);

    parts.push(key);
    return parts.join(isMac ? "" : " + ");
}

/**
 * Check if user prefers to use Cmd on Mac vs Ctrl
 */
export function usePlatformModifier(): "meta" | "ctrl" {
    if (typeof navigator === "undefined") return "ctrl";
    return /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl";
}

// =============================================================================
// DEFAULT SHORTCUTS
// =============================================================================

export const defaultShortcuts: KeyboardShortcut[] = [
    {
        key: "k",
        modifiers: { meta: true },
        description: "Open command palette",
        category: "Navigation",
        action: () => {
            // Will be overridden by actual implementation
            document.dispatchEvent(new CustomEvent("openCommandPalette"));
        },
    },
    {
        key: "/",
        modifiers: {},
        description: "Focus search",
        category: "Navigation",
        action: () => {
            const searchInput = document.querySelector<HTMLInputElement>('[data-search-input]');
            searchInput?.focus();
        },
    },
    {
        key: "?",
        modifiers: { shift: true },
        description: "Show keyboard shortcuts",
        category: "Help",
        action: () => {
            document.dispatchEvent(new CustomEvent("showShortcutsHelp"));
        },
    },
    {
        key: "Escape",
        modifiers: {},
        description: "Close modal / Cancel",
        category: "General",
        action: () => {
            document.dispatchEvent(new CustomEvent("closeModal"));
        },
        global: true,
    },
];

export default {
    useKeyboardShortcuts,
    useKeyboardShortcut,
    formatShortcut,
    usePlatformModifier,
    shortcutManager,
    defaultShortcuts,
};
