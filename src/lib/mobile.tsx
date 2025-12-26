"use client";

import { useEffect, useState } from "react";

// Mobile detection hook
export function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
}

// Touch detection
export function useIsTouch() {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    return isTouch;
}

// Swipe gesture hook
interface SwipeHandlers {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
}

export function useSwipe(
    ref: React.RefObject<HTMLElement | null>,
    handlers: SwipeHandlers,
    threshold: number = 50
) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let startX = 0;
        let startY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe
                if (diffX > threshold) {
                    handlers.onSwipeRight?.();
                } else if (diffX < -threshold) {
                    handlers.onSwipeLeft?.();
                }
            } else {
                // Vertical swipe
                if (diffY > threshold) {
                    handlers.onSwipeDown?.();
                } else if (diffY < -threshold) {
                    handlers.onSwipeUp?.();
                }
            }
        };

        element.addEventListener("touchstart", handleTouchStart);
        element.addEventListener("touchend", handleTouchEnd);

        return () => {
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchend", handleTouchEnd);
        };
    }, [ref, handlers, threshold]);
}

// Pull to refresh
export function usePullToRefresh(
    ref: React.RefObject<HTMLElement | null>,
    onRefresh: () => Promise<void>,
    threshold: number = 100
) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let startY = 0;
        let isPulling = false;

        const handleTouchStart = (e: TouchEvent) => {
            if (element.scrollTop === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isPulling) return;
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            if (diff > 0) {
                setPullDistance(Math.min(diff, threshold * 1.5));
            }
        };

        const handleTouchEnd = async () => {
            if (pullDistance > threshold && !isRefreshing) {
                setIsRefreshing(true);
                await onRefresh();
                setIsRefreshing(false);
            }
            setPullDistance(0);
            isPulling = false;
        };

        element.addEventListener("touchstart", handleTouchStart);
        element.addEventListener("touchmove", handleTouchMove);
        element.addEventListener("touchend", handleTouchEnd);

        return () => {
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchmove", handleTouchMove);
            element.removeEventListener("touchend", handleTouchEnd);
        };
    }, [ref, onRefresh, threshold, pullDistance, isRefreshing]);

    return { isRefreshing, pullDistance };
}

// Safe area insets hook
export function useSafeAreaInsets() {
    const [insets, setInsets] = useState({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    useEffect(() => {
        const computeInsets = () => {
            const style = getComputedStyle(document.documentElement);
            setInsets({
                top: parseInt(style.getPropertyValue("--sat") || "0"),
                right: parseInt(style.getPropertyValue("--sar") || "0"),
                bottom: parseInt(style.getPropertyValue("--sab") || "0"),
                left: parseInt(style.getPropertyValue("--sal") || "0"),
            });
        };

        computeInsets();
        window.addEventListener("resize", computeInsets);
        return () => window.removeEventListener("resize", computeInsets);
    }, []);

    return insets;
}

// Viewport height fix for mobile browsers
export function useMobileViewportHeight() {
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setVH();
        window.addEventListener("resize", setVH);
        return () => window.removeEventListener("resize", setVH);
    }, []);
}

// Long press detection
export function useLongPress(
    callback: () => void,
    ms: number = 500
) {
    const [isPressing, setIsPressing] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isPressing) {
            timer = setTimeout(callback, ms);
        }

        return () => clearTimeout(timer);
    }, [isPressing, callback, ms]);

    return {
        onMouseDown: () => setIsPressing(true),
        onMouseUp: () => setIsPressing(false),
        onMouseLeave: () => setIsPressing(false),
        onTouchStart: () => setIsPressing(true),
        onTouchEnd: () => setIsPressing(false),
    };
}
