/**
 * Premium Modal Dialog
 * Elegant, animated modal dialogs with backdrop blur
 */

"use client";

import { Fragment, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showClose?: boolean;
    className?: string;
}

const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "md",
    showClose = true,
    className,
}: ModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className={cn(
                                "relative w-full bg-card rounded-2xl shadow-2xl border border-border/50",
                                "max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col",
                                sizeStyles[size],
                                className
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            {(title || showClose) && (
                                <div className="flex items-start justify-between p-6 pb-0">
                                    {title && (
                                        <div>
                                            <h2 className="text-xl font-semibold">{title}</h2>
                                            {description && (
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {description}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {showClose && (
                                        <button
                                            onClick={onClose}
                                            className="ml-auto p-2 -m-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 overflow-auto p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}

// Confirmation Modal variant
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "danger";
    loading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
    loading = false,
}: ConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="text-center">
                {/* Icon */}
                <div className={cn(
                    "mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4",
                    variant === "danger" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                )}>
                    {variant === "danger" ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>

                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground mb-6">{description}</p>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-10 px-4 rounded-lg border border-border bg-transparent hover:bg-muted transition-colors font-medium text-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={cn(
                            "flex-1 h-10 px-4 rounded-lg font-medium text-sm transition-colors",
                            variant === "danger"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-primary text-primary-foreground hover:bg-primary/90",
                            loading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {loading ? "..." : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

// Drawer (side panel) variant
interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    position?: "left" | "right";
    size?: "sm" | "md" | "lg";
}

const drawerSizes = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[480px]",
};

export function Drawer({
    isOpen,
    onClose,
    title,
    children,
    position = "right",
    size = "md",
}: DrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: position === "right" ? "100%" : "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: position === "right" ? "100%" : "-100%" }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className={cn(
                            "fixed top-0 bottom-0 z-50 bg-card border-l border-border flex flex-col",
                            position === "right" ? "right-0 border-l" : "left-0 border-r",
                            drawerSizes[size]
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            {title && <h2 className="text-lg font-semibold">{title}</h2>}
                            <button
                                onClick={onClose}
                                className="p-2 -m-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}
