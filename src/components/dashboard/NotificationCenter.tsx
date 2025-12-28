"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Bell,
    CheckCircle2,
    Award,
    Calendar,
    AlertCircle,
    Info,
    X,
    Check,
    Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationType = "success" | "warning" | "info" | "reminder" | "achievement";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    actionUrl?: string;
}

const notificationIcons: Record<NotificationType, React.ElementType> = {
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
    reminder: Calendar,
    achievement: Award,
};

const notificationColors: Record<NotificationType, string> = {
    success: "bg-emerald-500/20 text-emerald-500",
    warning: "bg-amber-500/20 text-amber-500",
    info: "bg-blue-500/20 text-blue-500",
    reminder: "bg-purple-500/20 text-purple-500",
    achievement: "bg-yellow-500/20 text-yellow-500",
};

const mockNotifications: Notification[] = [
    { id: "1", type: "achievement", title: "New Badge Earned!", message: "You've earned the 'Security Champion' badge.", timestamp: "Just now", read: false },
    { id: "2", type: "reminder", title: "Training Due Soon", message: "HIPAA Compliance training is due in 3 days.", timestamp: "1 hour ago", read: false },
    { id: "3", type: "success", title: "Course Completed", message: "Congratulations on completing Cybersecurity Awareness!", timestamp: "2 hours ago", read: true },
    { id: "4", type: "info", title: "New Course Available", message: "Check out our new Agentic AI Fundamentals course.", timestamp: "Yesterday", read: true },
    { id: "5", type: "warning", title: "Compliance Reminder", message: "Annual security training must be completed by Dec 31.", timestamp: "2 days ago", read: true },
];

export function NotificationCenter() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const dismissNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Notifications
                    </h3>
                    {unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground">{unreadCount}</Badge>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                            Mark all read
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const Icon = notificationIcons[notification.type];
                        return (
                            <div
                                key={notification.id}
                                className={cn(
                                    "p-3 rounded-lg border transition-colors group",
                                    notification.read
                                        ? "border-border bg-card"
                                        : "border-primary/30 bg-primary/5"
                                )}
                            >
                                <div className="flex gap-3">
                                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", notificationColors[notification.type])}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <div className="font-medium text-sm">{notification.title}</div>
                                                <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <Check className="h-3 w-3" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={() => dismissNotification(notification.id)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">{notification.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </Card>
    );
}
