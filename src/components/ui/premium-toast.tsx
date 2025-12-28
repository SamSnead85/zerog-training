/**
 * Premium Toast Notification System
 * Elegant, animated toast notifications for a premium UX
 */

"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Info,
    X,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
    loading: (title: string, description?: string) => string;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after duration (default 5s, no auto-remove for loading)
        if (toast.type !== "loading") {
            const duration = toast.duration || 5000;
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = useCallback((title: string, description?: string) => {
        return addToast({ type: "success", title, description });
    }, [addToast]);

    const error = useCallback((title: string, description?: string) => {
        return addToast({ type: "error", title, description });
    }, [addToast]);

    const warning = useCallback((title: string, description?: string) => {
        return addToast({ type: "warning", title, description });
    }, [addToast]);

    const info = useCallback((title: string, description?: string) => {
        return addToast({ type: "info", title, description });
    }, [addToast]);

    const loading = useCallback((title: string, description?: string) => {
        return addToast({ type: "loading", title, description });
    }, [addToast]);

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
            }}
        >
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({
    toasts,
    onDismiss
}: {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map(toast => (
                    <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
                ))}
            </AnimatePresence>
        </div>
    );
}

const toastIcons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    loading: Loader2,
};

const toastStyles = {
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    loading: "bg-primary/10 border-primary/20 text-primary",
};

function ToastItem({
    toast,
    onDismiss
}: {
    toast: Toast;
    onDismiss: (id: string) => void;
}) {
    const Icon = toastIcons[toast.type];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto"
        >
            <div
                className={cn(
                    "flex items-start gap-3 p-4 pr-12 rounded-xl border backdrop-blur-lg shadow-lg min-w-[320px] max-w-[420px] relative",
                    "bg-card/95"
                )}
            >
                {/* Icon */}
                <div className={cn("shrink-0 mt-0.5", toastStyles[toast.type])}>
                    <Icon className={cn(
                        "h-5 w-5",
                        toast.type === "loading" && "animate-spin"
                    )} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{toast.title}</p>
                    {toast.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p>
                    )}
                </div>

                {/* Dismiss button */}
                {toast.type !== "loading" && (
                    <button
                        onClick={() => onDismiss(toast.id)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

// Promise-based toast for async operations
export function toastPromise<T>(
    promise: Promise<T>,
    {
        loading: loadingMessage,
        success: successMessage,
        error: errorMessage,
    }: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: unknown) => string);
    },
    toast: ToastContextValue
): Promise<T> {
    const id = toast.loading(loadingMessage);

    promise
        .then((data) => {
            toast.dismiss(id);
            const message = typeof successMessage === "function"
                ? successMessage(data)
                : successMessage;
            toast.success(message);
            return data;
        })
        .catch((err) => {
            toast.dismiss(id);
            const message = typeof errorMessage === "function"
                ? errorMessage(err)
                : errorMessage;
            toast.error(message);
            throw err;
        });

    return promise;
}
