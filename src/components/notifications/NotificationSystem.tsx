"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { X, CheckCircle2, AlertTriangle, Info, XCircle, Bell, Trophy, BookOpen, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationType = "success" | "error" | "warning" | "info" | "achievement" | "streak";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, "id">) => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within NotificationProvider");
    }
    return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Omit<Notification, "id">) => {
        const id = Date.now().toString();
        const newNotification = { ...notification, id };
        setNotifications((prev) => [...prev, newNotification]);

        // Auto-remove after duration
        if (notification.duration !== 0) {
            setTimeout(() => {
                removeNotification(id);
            }, notification.duration || 5000);
        }
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
            {children}
            <NotificationContainer />
        </NotificationContext.Provider>
    );
}

function NotificationContainer() {
    const { notifications, removeNotification } = useNotifications();

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );
}

function NotificationItem({
    notification,
    onClose,
}: {
    notification: Notification;
    onClose: () => void;
}) {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 200);
    };

    const getIcon = () => {
        switch (notification.type) {
            case "success": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            case "error": return <XCircle className="h-5 w-5 text-red-500" />;
            case "warning": return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            case "info": return <Info className="h-5 w-5 text-blue-500" />;
            case "achievement": return <Trophy className="h-5 w-5 text-yellow-500" />;
            case "streak": return <Flame className="h-5 w-5 text-orange-500" />;
            default: return <Bell className="h-5 w-5" />;
        }
    };

    const getBorderColor = () => {
        switch (notification.type) {
            case "success": return "border-emerald-500/30";
            case "error": return "border-red-500/30";
            case "warning": return "border-amber-500/30";
            case "info": return "border-blue-500/30";
            case "achievement": return "border-yellow-500/30";
            case "streak": return "border-orange-500/30";
            default: return "border-white/10";
        }
    };

    return (
        <div
            className={cn(
                "p-4 rounded-xl backdrop-blur-xl border shadow-lg transition-all duration-200",
                "bg-card/95",
                getBorderColor(),
                isExiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
                "animate-in slide-in-from-right-4"
            )}
        >
            <div className="flex items-start gap-3">
                {getIcon()}
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notification.title}</p>
                    {notification.message && (
                        <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                    )}
                    {notification.action && (
                        <button
                            onClick={notification.action.onClick}
                            className="text-xs text-primary hover:underline mt-2"
                        >
                            {notification.action.label}
                        </button>
                    )}
                </div>
                <button
                    onClick={handleClose}
                    className="p-1 hover:bg-muted rounded transition-colors"
                >
                    <X className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    );
}

// Utility hooks for common notifications
export function useSuccessNotification() {
    const { addNotification } = useNotifications();
    return (title: string, message?: string) =>
        addNotification({ type: "success", title, message });
}

export function useErrorNotification() {
    const { addNotification } = useNotifications();
    return (title: string, message?: string) =>
        addNotification({ type: "error", title, message });
}

export function useAchievementNotification() {
    const { addNotification } = useNotifications();
    return (title: string, message?: string) =>
        addNotification({ type: "achievement", title, message, duration: 8000 });
}
