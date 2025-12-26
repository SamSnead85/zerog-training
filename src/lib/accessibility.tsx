"use client";

import { useEffect, useCallback, useState } from "react";

interface KeyboardShortcut {
    key: string;
    description: string;
    action: () => void;
    modifiers?: {
        ctrl?: boolean;
        alt?: boolean;
        shift?: boolean;
        meta?: boolean;
    };
}

// Hook for registering keyboard shortcuts
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            for (const shortcut of shortcuts) {
                const modifiersMatch =
                    (shortcut.modifiers?.ctrl === undefined || shortcut.modifiers.ctrl === event.ctrlKey) &&
                    (shortcut.modifiers?.alt === undefined || shortcut.modifiers.alt === event.altKey) &&
                    (shortcut.modifiers?.shift === undefined || shortcut.modifiers.shift === event.shiftKey) &&
                    (shortcut.modifiers?.meta === undefined || shortcut.modifiers.meta === event.metaKey);

                if (event.key.toLowerCase() === shortcut.key.toLowerCase() && modifiersMatch) {
                    event.preventDefault();
                    shortcut.action();
                    break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts]);
}

// Skip link for accessibility
export function SkipLink() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none"
        >
            Skip to main content
        </a>
    );
}

// Focus trap for modals
export function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean) {
    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        // Focus first element
        firstElement?.focus();

        container.addEventListener("keydown", handleKeyDown);
        return () => container.removeEventListener("keydown", handleKeyDown);
    }, [containerRef, isActive]);
}

// Announce to screen readers
export function useAnnounce() {
    const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
        const announcer = document.createElement("div");
        announcer.setAttribute("aria-live", priority);
        announcer.setAttribute("aria-atomic", "true");
        announcer.setAttribute("class", "sr-only");
        document.body.appendChild(announcer);

        setTimeout(() => {
            announcer.textContent = message;
        }, 100);

        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }, []);

    return announce;
}

// Reduced motion hook
export function useReducedMotion() {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return reducedMotion;
}

// Keyboard navigation for lists
export function useArrowNavigation(
    items: HTMLElement[],
    options: { orientation?: "vertical" | "horizontal"; loop?: boolean } = {}
) {
    const { orientation = "vertical", loop = true } = options;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentIndex = items.findIndex((item) => item === document.activeElement);
            if (currentIndex === -1) return;

            let nextIndex = currentIndex;
            const isNext = orientation === "vertical" ? e.key === "ArrowDown" : e.key === "ArrowRight";
            const isPrev = orientation === "vertical" ? e.key === "ArrowUp" : e.key === "ArrowLeft";

            if (isNext) {
                e.preventDefault();
                nextIndex = loop
                    ? (currentIndex + 1) % items.length
                    : Math.min(currentIndex + 1, items.length - 1);
            } else if (isPrev) {
                e.preventDefault();
                nextIndex = loop
                    ? (currentIndex - 1 + items.length) % items.length
                    : Math.max(currentIndex - 1, 0);
            } else if (e.key === "Home") {
                e.preventDefault();
                nextIndex = 0;
            } else if (e.key === "End") {
                e.preventDefault();
                nextIndex = items.length - 1;
            }

            items[nextIndex]?.focus();
        };

        items.forEach((item) => item.addEventListener("keydown", handleKeyDown));
        return () => items.forEach((item) => item.removeEventListener("keydown", handleKeyDown));
    }, [items, orientation, loop]);
}

// Visible focus indicator styles (add to globals.css)
export const focusStyles = `
  .focus-visible:focus-visible {
    outline: 2px solid hsl(var(--primary));
    outline-offset: 2px;
  }
  
  .focus-ring:focus {
    box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary));
  }
`;

// High contrast mode detection
export function useHighContrast() {
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        // Check for forced-colors (high contrast mode in Windows)
        const mediaQuery = window.matchMedia("(forced-colors: active)");
        setHighContrast(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setHighContrast(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return highContrast;
}

// Screen reader only text component
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
    return (
        <span className="sr-only">{children}</span>
    );
}
