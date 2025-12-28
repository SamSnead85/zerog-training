/**
 * Accessibility Utilities
 * 
 * Hooks and utilities for keyboard navigation, focus management,
 * screen reader announcements, and reduced motion preferences.
 */

import { useEffect, useRef, useCallback, useState } from "react";

// =============================================================================
// FOCUS MANAGEMENT
// =============================================================================

/**
 * Trap focus within an element (for modals, dialogs)
 */
export function useFocusTrap(active: boolean = true) {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    useEffect(() => {
        if (!active) return;

        // Store the currently focused element
        previousActiveElement.current = document.activeElement;

        const container = containerRef.current;
        if (!container) return;

        // Get focusable elements
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

        // Focus first element
        firstFocusable?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            // Restore focus to previous element
            if (previousActiveElement.current instanceof HTMLElement) {
                previousActiveElement.current.focus();
            }
        };
    }, [active]);

    return containerRef;
}

/**
 * Focus first error in a form
 */
export function focusFirstError(formElement: HTMLFormElement | null) {
    if (!formElement) return;

    const errorElement = formElement.querySelector('[aria-invalid="true"]') as HTMLElement;
    if (errorElement) {
        errorElement.focus();
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

interface UseRovingTabIndexOptions {
    orientation?: "horizontal" | "vertical" | "both";
    wrap?: boolean;
}

/**
 * Roving tabindex for list navigation (menus, tabs, etc.)
 */
export function useRovingTabIndex<T extends HTMLElement>(
    items: T[],
    options: UseRovingTabIndexOptions = {}
) {
    const { orientation = "vertical", wrap = true } = options;
    const [activeIndex, setActiveIndex] = useState(0);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            const isVertical = orientation === "vertical" || orientation === "both";
            const isHorizontal = orientation === "horizontal" || orientation === "both";

            let newIndex = activeIndex;

            if ((e.key === "ArrowDown" && isVertical) || (e.key === "ArrowRight" && isHorizontal)) {
                e.preventDefault();
                newIndex = activeIndex + 1;
                if (newIndex >= items.length) {
                    newIndex = wrap ? 0 : items.length - 1;
                }
            } else if ((e.key === "ArrowUp" && isVertical) || (e.key === "ArrowLeft" && isHorizontal)) {
                e.preventDefault();
                newIndex = activeIndex - 1;
                if (newIndex < 0) {
                    newIndex = wrap ? items.length - 1 : 0;
                }
            } else if (e.key === "Home") {
                e.preventDefault();
                newIndex = 0;
            } else if (e.key === "End") {
                e.preventDefault();
                newIndex = items.length - 1;
            }

            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
                items[newIndex]?.focus();
            }
        },
        [activeIndex, items, orientation, wrap]
    );

    const getItemProps = useCallback(
        (index: number) => ({
            tabIndex: index === activeIndex ? 0 : -1,
            onFocus: () => setActiveIndex(index),
        }),
        [activeIndex]
    );

    return { activeIndex, setActiveIndex, handleKeyDown, getItemProps };
}

// =============================================================================
// SCREEN READER ANNOUNCEMENTS
// =============================================================================

/**
 * Announce messages to screen readers
 */
export function useAnnounce() {
    const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
        const container = document.getElementById("sr-announcer") || createAnnouncerContainer();

        // Clear previous announcements
        container.textContent = "";

        // Small delay to ensure screen readers pick up the change
        setTimeout(() => {
            container.textContent = message;
            container.setAttribute("aria-live", priority);
        }, 50);
    }, []);

    return announce;
}

function createAnnouncerContainer(): HTMLElement {
    const container = document.createElement("div");
    container.id = "sr-announcer";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    container.className = "sr-only";
    container.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(container);
    return container;
}

// =============================================================================
// REDUCED MOTION
// =============================================================================

/**
 * Respect user's reduced motion preference
 */
export function useReducedMotion(): boolean {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(query.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setReducedMotion(e.matches);
        };

        query.addEventListener("change", handleChange);
        return () => query.removeEventListener("change", handleChange);
    }, []);

    return reducedMotion;
}

// =============================================================================
// SKIP LINK
// =============================================================================

/**
 * Creates skip link attributes for accessibility
 * Usage: Apply these to an anchor element <a {...getSkipLinkProps()} />
 */
export function getSkipLinkProps(targetId: string = "main-content") {
    return {
        href: `#${targetId}`,
        className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium",
        children: "Skip to main content",
    };
}

// =============================================================================
// ARIA UTILITIES
// =============================================================================

/**
 * Generate unique IDs for ARIA attributes
 */
export function useId(prefix: string = "id"): string {
    const idRef = useRef<string | null>(null);

    if (idRef.current === null) {
        idRef.current = `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    }

    return idRef.current;
}

/**
 * Connect label to input via aria-describedby
 */
export function useAriaDescribedBy(error?: string, description?: string): {
    inputProps: { "aria-describedby"?: string; "aria-invalid"?: boolean };
    errorId: string;
    descriptionId: string;
} {
    const errorId = useId("error");
    const descriptionId = useId("description");

    const describedBy: string[] = [];
    if (description) describedBy.push(descriptionId);
    if (error) describedBy.push(errorId);

    return {
        inputProps: {
            "aria-describedby": describedBy.length > 0 ? describedBy.join(" ") : undefined,
            "aria-invalid": error ? true : undefined,
        },
        errorId,
        descriptionId,
    };
}

// =============================================================================
// VISIBILITY DETECTION
// =============================================================================

/**
 * Detect if element is visible (for lazy loading, animations)
 */
export function useIsVisible(options?: IntersectionObserverInit) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, ...options }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [options]);

    return { ref, isVisible };
}

export default {
    useFocusTrap,
    focusFirstError,
    useRovingTabIndex,
    useAnnounce,
    useReducedMotion,
    getSkipLinkProps,
    useId,
    useAriaDescribedBy,
    useIsVisible,
};
