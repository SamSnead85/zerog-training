"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    AlertCircle,
    CheckCircle,
    X,
    Info,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Toast types
type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

// Toast notification
function ToastItem({
    toast,
    onDismiss
}: {
    toast: Toast;
    onDismiss: () => void;
}) {
    useEffect(() => {
        if (toast.duration && toast.type !== "loading") {
            const timer = setTimeout(onDismiss, toast.duration);
            return () => clearTimeout(timer);
        }
    }, [toast.duration, toast.type, onDismiss]);

    const config = {
        success: { icon: CheckCircle, bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400" },
        error: { icon: AlertCircle, bg: "bg-red-500/20", border: "border-red-500/30", text: "text-red-400" },
        warning: { icon: AlertTriangle, bg: "bg-amber-500/20", border: "border-amber-500/30", text: "text-amber-400" },
        info: { icon: Info, bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400" },
        loading: { icon: Loader2, bg: "bg-white/10", border: "border-white/20", text: "text-white" },
    };

    const { icon: Icon, bg, border, text } = config[toast.type];

    return (
        <div className={cn(
            "flex items-start gap-3 p-4 rounded-xl border animate-in slide-in-from-right-5 fade-in",
            bg, border
        )}>
            <Icon className={cn(
                "h-5 w-5 flex-shrink-0 mt-0.5",
                text,
                toast.type === "loading" && "animate-spin"
            )} />
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{toast.title}</p>
                {toast.message && (
                    <p className="text-sm text-white/60 mt-0.5">{toast.message}</p>
                )}
            </div>
            {toast.type !== "loading" && (
                <button onClick={onDismiss} className="p-1 hover:bg-white/10 rounded">
                    <X className="h-4 w-4 text-white/40" />
                </button>
            )}
        </div>
    );
}

// Toast container
export function ToastContainer({
    toasts,
    onDismiss
}: {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}) {
    return (
        <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onDismiss={() => onDismiss(toast.id)}
                />
            ))}
        </div>
    );
}

// Hook for managing toasts
export function useToasts() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { ...toast, id, duration: toast.duration ?? 5000 }]);
        return id;
    }, []);

    const dismissToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = useCallback((title: string, message?: string) => {
        return addToast({ type: "success", title, message });
    }, [addToast]);

    const error = useCallback((title: string, message?: string) => {
        return addToast({ type: "error", title, message });
    }, [addToast]);

    const warning = useCallback((title: string, message?: string) => {
        return addToast({ type: "warning", title, message });
    }, [addToast]);

    const info = useCallback((title: string, message?: string) => {
        return addToast({ type: "info", title, message });
    }, [addToast]);

    const loading = useCallback((title: string, message?: string) => {
        return addToast({ type: "loading", title, message, duration: 0 });
    }, [addToast]);

    return { toasts, addToast, dismissToast, success, error, warning, info, loading };
}

// Empty state component
export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: { label: string; onClick: () => void };
    className?: string;
}) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center text-center p-8",
            className
        )}>
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-white/50 max-w-sm mb-4">{description}</p>
            {action && (
                <Button onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
}

// Error boundary fallback
export function ErrorFallback({
    error,
    resetError,
}: {
    error: Error;
    resetError: () => void;
}) {
    return (
        <Card className="p-8 bg-red-500/10 border-red-500/20 text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-white/60 mb-4 max-w-md mx-auto">
                {error.message || "An unexpected error occurred. Please try again."}
            </p>
            <Button onClick={resetError} variant="outline">
                Try Again
            </Button>
        </Card>
    );
}

// Loading overlay
export function LoadingOverlay({
    show,
    message = "Loading...",
}: {
    show: boolean;
    message?: string;
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-white/70">{message}</p>
            </div>
        </div>
    );
}

// Confirm dialog
export function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "default",
    onConfirm,
    onCancel,
}: {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "danger";
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 bg-black/90 border-white/10">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-white/60 mb-6">{message}</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className={cn(
                            variant === "danger" && "bg-red-600 hover:bg-red-700"
                        )}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
