"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, X, AlertCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Toast {
    id: string;
    type: "success" | "error" | "info" | "warning";
    title: string;
    message?: string;
    duration?: number;
}

let toastId = 0;
const toastListeners: Set<(toasts: Toast[]) => void> = new Set();
let globalToasts: Toast[] = [];

export function toast(options: Omit<Toast, "id">) {
    const id = `toast-${++toastId}`;
    const newToast: Toast = { ...options, id, duration: options.duration || 4000 };
    globalToasts = [...globalToasts, newToast];
    toastListeners.forEach((listener) => listener(globalToasts));

    setTimeout(() => {
        globalToasts = globalToasts.filter((t) => t.id !== id);
        toastListeners.forEach((listener) => listener(globalToasts));
    }, newToast.duration);
}

export function ToastContainer() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toastListeners.add(setToasts);
        return () => {
            toastListeners.delete(setToasts);
        };
    }, []);

    const removeToast = (id: string) => {
        globalToasts = globalToasts.filter((t) => t.id !== id);
        setToasts(globalToasts);
    };

    const getIcon = (type: Toast["type"]) => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            case "error":
                return <XCircle className="h-5 w-5 text-red-500" />;
            case "warning":
                return <AlertCircle className="h-5 w-5 text-amber-500" />;
            case "info":
            default:
                return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={cn(
                        "flex items-start gap-3 p-4 rounded-xl bg-background border shadow-lg animate-in slide-in-from-right-5 duration-200",
                        t.type === "success" && "border-emerald-500/20",
                        t.type === "error" && "border-red-500/20",
                        t.type === "warning" && "border-amber-500/20",
                        t.type === "info" && "border-blue-500/20"
                    )}
                >
                    {getIcon(t.type)}
                    <div className="flex-1">
                        <p className="font-medium text-sm">{t.title}</p>
                        {t.message && (
                            <p className="text-xs text-muted-foreground mt-0.5">{t.message}</p>
                        )}
                    </div>
                    <button
                        onClick={() => removeToast(t.id)}
                        className="p-1 hover:bg-muted rounded"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
