"use client";

/**
 * Confirmation Dialog Component
 * 
 * Reusable modal for confirming destructive actions with
 * customizable content and callback handling.
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { AlertTriangle, X, Info, CheckCircle, HelpCircle } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

type DialogVariant = "danger" | "warning" | "info" | "success" | "question";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: DialogVariant;
    loading?: boolean;
    children?: React.ReactNode;
}

// =============================================================================
// VARIANT CONFIGS
// =============================================================================

const variantConfigs = {
    danger: {
        icon: AlertTriangle,
        iconBg: "bg-red-500/20",
        iconColor: "text-red-400",
        confirmClass: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
        icon: AlertTriangle,
        iconBg: "bg-amber-500/20",
        iconColor: "text-amber-400",
        confirmClass: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    info: {
        icon: Info,
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
        confirmClass: "bg-primary hover:bg-primary/90",
    },
    success: {
        icon: CheckCircle,
        iconBg: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
        confirmClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
    question: {
        icon: HelpCircle,
        iconBg: "bg-purple-500/20",
        iconColor: "text-purple-400",
        confirmClass: "bg-primary hover:bg-primary/90",
    },
};

// =============================================================================
// COMPONENT
// =============================================================================

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "question",
    loading = false,
    children,
}: ConfirmDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const config = variantConfigs[variant];
    const Icon = config.icon;

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    // Focus trap
    useEffect(() => {
        if (open && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                (focusableElements[0] as HTMLElement).focus();
            }
        }
    }, [open]);

    // Prevent body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Dialog */}
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="relative w-full max-w-md rounded-2xl border border-white/10 bg-background shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Close dialog"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-6">
                    {/* Icon */}
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", config.iconBg)}>
                        <Icon className={cn("h-6 w-6", config.iconColor)} />
                    </div>

                    {/* Content */}
                    <h2 id="dialog-title" className="text-lg font-semibold mb-2">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-muted-foreground text-sm">{description}</p>
                    )}
                    {children && <div className="mt-4">{children}</div>}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1"
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={loading}
                            className={cn("flex-1", config.confirmClass)}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                confirmLabel
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// HOOK FOR CONFIRM DIALOG
// =============================================================================

import { useState, useCallback } from "react";

interface UseConfirmOptions {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: DialogVariant;
}

export function useConfirm() {
    const [state, setState] = useState<{
        open: boolean;
        options: UseConfirmOptions;
        resolve: ((value: boolean) => void) | null;
    }>({
        open: false,
        options: { title: "" },
        resolve: null,
    });

    const confirm = useCallback((options: UseConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                open: true,
                options,
                resolve,
            });
        });
    }, []);

    const handleClose = useCallback(() => {
        state.resolve?.(false);
        setState((prev) => ({ ...prev, open: false, resolve: null }));
    }, [state.resolve]);

    const handleConfirm = useCallback(() => {
        state.resolve?.(true);
        setState((prev) => ({ ...prev, open: false, resolve: null }));
    }, [state.resolve]);

    const ConfirmDialogComponent = (
        <ConfirmDialog
            open={state.open}
            onClose={handleClose}
            onConfirm={handleConfirm}
            {...state.options}
        />
    );

    return { confirm, ConfirmDialog: ConfirmDialogComponent };
}

export default ConfirmDialog;
