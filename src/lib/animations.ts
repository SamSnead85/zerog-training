"use client";

/**
 * Micro-Animations Library
 * Reusable animation variants using Framer Motion
 */

import { motion, Variants, AnimatePresence, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

// Animation Variants
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

export const slideInFromRight: Variants = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
};

export const staggerItem: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

// Simple wrapper components that don't use JSX in .ts file
export { motion, AnimatePresence };

// Export variants for use in components
export const animationVariants = {
    fadeIn,
    fadeInUp,
    fadeInDown,
    scaleIn,
    slideInFromRight,
    staggerItem,
};
