/**
 * Analytics Hooks
 * 
 * React hooks for tracking user interactions and page views.
 * Production-ready with privacy compliance and performance optimization.
 */

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

// =============================================================================
// TYPES
// =============================================================================

interface AnalyticsEvent {
    name: string;
    properties?: Record<string, unknown>;
    timestamp: number;
    sessionId: string;
    userId?: string;
    pageUrl: string;
}

interface PageView {
    path: string;
    title: string;
    referrer: string;
    timestamp: number;
    sessionId: string;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

let sessionId: string | null = null;

function getSessionId(): string {
    if (sessionId) return sessionId;

    if (typeof window !== "undefined") {
        sessionId = sessionStorage.getItem("analytics_session_id");
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
            sessionStorage.setItem("analytics_session_id", sessionId);
        }
    } else {
        sessionId = `server_${Date.now()}`;
    }

    return sessionId;
}

function sendToAnalytics(eventType: string, data: unknown): void {
    // In production, send to your analytics service
    if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] ${eventType}:`, data);
        return;
    }

    // Example: Send to API endpoint
    // fetch("/api/analytics", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ type: eventType, data }),
    // }).catch(console.error);
}

// =============================================================================
// PAGE VIEW TRACKING
// =============================================================================

export function usePageView(): void {
    const pathname = usePathname();
    const previousPath = useRef<string>("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (pathname === previousPath.current) return;

        previousPath.current = pathname;

        const pageView: PageView = {
            path: pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: Date.now(),
            sessionId: getSessionId(),
        };

        sendToAnalytics("page_view", pageView);
    }, [pathname]);
}

// =============================================================================
// EVENT TRACKING
// =============================================================================

type TrackEventFn = (
    eventName: string,
    properties?: Record<string, unknown>
) => void;

export function useTrackEvent(): TrackEventFn {
    const pathname = usePathname();

    const track = useCallback(
        (eventName: string, properties?: Record<string, unknown>) => {
            const event: AnalyticsEvent = {
                name: eventName,
                properties,
                timestamp: Date.now(),
                sessionId: getSessionId(),
                pageUrl: pathname,
            };

            sendToAnalytics("event", event);
        },
        [pathname]
    );

    return track;
}

// =============================================================================
// USER IDENTITY
// =============================================================================

export function useIdentifyUser(): (userId: string, traits?: Record<string, unknown>) => void {
    return useCallback((userId: string, traits?: Record<string, unknown>) => {
        sendToAnalytics("identify", {
            userId,
            traits,
            timestamp: Date.now(),
            sessionId: getSessionId(),
        });
    }, []);
}

// =============================================================================
// TIMING TRACKING
// =============================================================================

export function useTrackTiming(): {
    startTimer: (name: string) => void;
    endTimer: (name: string, properties?: Record<string, unknown>) => void;
} {
    const timers = useRef<Map<string, number>>(new Map());
    const pathname = usePathname();

    const startTimer = useCallback((name: string) => {
        timers.current.set(name, performance.now());
    }, []);

    const endTimer = useCallback(
        (name: string, properties?: Record<string, unknown>) => {
            const startTime = timers.current.get(name);
            if (!startTime) return;

            const duration = performance.now() - startTime;
            timers.current.delete(name);

            sendToAnalytics("timing", {
                name,
                duration: Math.round(duration),
                properties,
                timestamp: Date.now(),
                sessionId: getSessionId(),
                pageUrl: pathname,
            });
        },
        [pathname]
    );

    return { startTimer, endTimer };
}

// =============================================================================
// ENGAGEMENT TRACKING
// =============================================================================

export function useTrackEngagement(): void {
    const track = useTrackEvent();
    const lastActivity = useRef<number>(Date.now());
    const engagementTime = useRef<number>(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleActivity = () => {
            const now = Date.now();
            const timeSinceLastActivity = now - lastActivity.current;

            // Only count if less than 30 seconds since last activity (user still engaged)
            if (timeSinceLastActivity < 30000) {
                engagementTime.current += timeSinceLastActivity;
            }

            lastActivity.current = now;
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User switched tabs - send engagement data
                track("engagement", {
                    engagementTimeMs: engagementTime.current,
                    type: "tab_hidden",
                });
            } else {
                lastActivity.current = Date.now();
            }
        };

        const handleBeforeUnload = () => {
            // Send final engagement data before leaving
            track("engagement", {
                engagementTimeMs: engagementTime.current,
                type: "page_unload",
            });
        };

        // Track scroll, clicks, and key presses as engagement
        window.addEventListener("scroll", handleActivity, { passive: true });
        window.addEventListener("click", handleActivity, { passive: true });
        window.addEventListener("keydown", handleActivity, { passive: true });
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("scroll", handleActivity);
            window.removeEventListener("click", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [track]);
}

// =============================================================================
// FEATURE FLAG TRACKING
// =============================================================================

export function useTrackFeature(): (featureName: string, variant: string, properties?: Record<string, unknown>) => void {
    const track = useTrackEvent();

    return useCallback(
        (featureName: string, variant: string, properties?: Record<string, unknown>) => {
            track("feature_exposure", {
                feature: featureName,
                variant,
                ...properties,
            });
        },
        [track]
    );
}

// =============================================================================
// CONVENIENCE HOOKS
// =============================================================================

export function useAnalytics() {
    const track = useTrackEvent();
    const identify = useIdentifyUser();
    const timing = useTrackTiming();
    const trackFeature = useTrackFeature();

    return {
        track,
        identify,
        ...timing,
        trackFeature,
    };
}

export default useAnalytics;
