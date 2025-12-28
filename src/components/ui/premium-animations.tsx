/**
 * Premium Animation Utilities
 * Micro-animations for a polished, premium feel
 */

"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

// Fade In animation
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

// Fade In Up animation
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

// Fade In Down animation
export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

// Scale In animation
export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

// Slide In from Right
export const slideInRight: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
};

// Slide In from Left
export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

// Stagger children animation container
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Stagger item
export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

// Props for animated components
interface AnimatedProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

// Animated Container with stagger effect
export function AnimatedContainer({ children, className }: AnimatedProps) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Animated List Item
export function AnimatedItem({ children, className }: AnimatedProps) {
    return (
        <motion.div variants={staggerItem} className={className}>
            {children}
        </motion.div>
    );
}

// Fade In animated component
export function FadeIn({ children, className, delay = 0 }: AnimatedProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Fade In Up animated component
export function FadeInUp({ children, className, delay = 0 }: AnimatedProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Scale In animated component
export function ScaleIn({ children, className, delay = 0 }: AnimatedProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Page transition wrapper
export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
}

// Hover scale effect
export function HoverScale({ children, className, scale = 1.02 }: AnimatedProps & { scale?: number }) {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Number counter animation
export function AnimatedCounter({
    value,
    duration = 1,
    className,
}: {
    value: number;
    duration?: number;
    className?: string;
}) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={className}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={value}
            >
                {value.toLocaleString()}
            </motion.span>
        </motion.span>
    );
}

// Progress bar animation
export function AnimatedProgress({
    value,
    className,
}: {
    value: number;
    className?: string;
}) {
    return (
        <div className={`h-2 bg-muted rounded-full overflow-hidden ${className}`}>
            <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
        </div>
    );
}

// Presence animation wrapper
export function AnimatedPresence({
    children,
    isVisible,
}: {
    children: ReactNode;
    isVisible: boolean;
}) {
    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Pulse animation for notifications
export function PulseIndicator({ className }: { className?: string }) {
    return (
        <span className={`relative flex h-3 w-3 ${className}`}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
        </span>
    );
}
