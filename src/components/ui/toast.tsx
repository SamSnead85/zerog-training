"use client";

/**
 * Toast Notification System
 * 
 * Production-ready toast notifications with auto-dismiss,
 * action buttons, and accessibility support.
 */

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
    X,
    Loader2,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
    dismissible?: boolean;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    loading: (title: string, message?: string) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

// =============================================================================
// PROVIDER
// =============================================================================

interface ToastProviderProps {
    children: ReactNode;
    maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback(
        (toast: Omit<Toast, "id">): string => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            const duration = toast.duration ?? (toast.type === "loading" ? 0 : 5000);

            setToasts((prev) => {
                const newToasts = [...prev, { ...toast, id }];
                if (newToasts.length > maxToasts) {
                    return newToasts.slice(-maxToasts);
                }
                return newToasts;
            });

            if (duration > 0) {
                setTimeout(() => removeToast(id), duration);
            }

            return id;
        },
        [maxToasts, removeToast]
    );

    const success = useCallback(
        (title: string, message?: string) => {
            addToast({ type: "success", title, message });
        },
        [addToast]
    );

    const error = useCallback(
        (title: string, message?: string) => {
            addToast({ type: "error", title, message, duration: 8000 });
        },
        [addToast]
    );

    const warning = useCallback(
        (title: string, message?: string) => {
            addToast({ type: "warning", title, message });
        },
        [addToast]
    );

    const info = useCallback(
        (title: string, message?: string) => {
            addToast({ type: "info", title, message });
        },
        [addToast]
    );

    const loading = useCallback(
        (title: string, message?: string): string => {
            return addToast({ type: "loading", title, message, dismissible: false });
        },
        [addToast]
    );

    const dismissAll = useCallback(() => {
        setToasts([]);
    }, []);

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast,
                removeToast,
                success,
                error,
                warning,
                info,
                loading,
                dismiss: removeToast,
                dismissAll,
            }}
        >
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}

// =============================================================================
// TOAST CONTAINER
// =============================================================================

interface ToastContainerProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
            role="region"
            aria-label="Notifications"
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

// =============================================================================
// TOAST ITEM
// =============================================================================

const toastStyles: Record<ToastType, { bg: string; icon: React.ElementType; iconColor: string }> = {
    success: {
        bg: "bg-emerald-500/10 border-emerald-500/30",
        icon: CheckCircle2,
        iconColor: "text-emerald-400",
    },
    error: {
        bg: "bg-red-500/10 border-red-500/30",
        icon: AlertCircle,
        iconColor: "text-red-400",
    },
    warning: {
        bg: "bg-amber-500/10 border-amber-500/30",
        icon: AlertTriangle,
        iconColor: "text-amber-400",
    },
    info: {
        bg: "bg-blue-500/10 border-blue-500/30",
        icon: Info,
        iconColor: "text-blue-400",
    },
    loading: {
        bg: "bg-white/5 border-white/20",
        icon: Loader2,
        iconColor: "text-primary animate-spin",
    },
};

interface ToastItemProps {
    toast: Toast;
    onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
    const style = toastStyles[toast.type];
    const Icon = style.icon;
    const dismissible = toast.dismissible !== false;

    return (
        <div
            className={cn(
                "pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur-lg animate-in slide-in-from-right-full duration-300",
                style.bg
            )}
            role="alert"
            aria-live="polite"
        >
            <div className="flex gap-3">
                <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", style.iconColor)} />
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{toast.title}</p>
                    {toast.message && (
                        <p className="text-sm text-muted-foreground mt-1">{toast.message}</p>
                    )}
                    {toast.action && (
                        <button
                            onClick={toast.action.onClick}
                            className="text-sm font-medium text-primary hover:underline mt-2"
                        >
                            {toast.action.label}
                        </button>
                    )}
                </div>
                {dismissible && (
                    <button
                        onClick={() => onDismiss(toast.id)}
                        className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                        aria-label="Dismiss notification"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default ToastProvider;
