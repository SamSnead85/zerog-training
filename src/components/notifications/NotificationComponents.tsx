"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Bell,
    Check,
    Trash2,
    Trophy,
    BookOpen,
    MessageSquare,
    Zap,
    Calendar,
    Settings,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
    id: string;
    type: "achievement" | "lesson" | "comment" | "reminder" | "system";
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    actionUrl?: string;
}

// Notification center
export function NotificationCenter({
    notifications,
    onMarkRead,
    onMarkAllRead,
    onDelete,
    onClearAll,
}: {
    notifications: Notification[];
    onMarkRead: (id: string) => void;
    onMarkAllRead: () => void;
    onDelete: (id: string) => void;
    onClearAll: () => void;
}) {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Badge className="bg-primary text-white">
                            {unreadCount} new
                        </Badge>
                    )}
                </div>
                <div className="flex gap-2">
                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" onClick={onMarkAllRead}>
                            <Check className="h-4 w-4 mr-1" />
                            Mark all read
                        </Button>
                    )}
                    {notifications.length > 0 && (
                        <Button variant="outline" size="sm" onClick={onClearAll}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Clear all
                        </Button>
                    )}
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/50">No notifications</p>
                </div>
            ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkRead={() => onMarkRead(notification.id)}
                            onDelete={() => onDelete(notification.id)}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
}

function NotificationItem({
    notification,
    onMarkRead,
    onDelete,
}: {
    notification: Notification;
    onMarkRead: () => void;
    onDelete: () => void;
}) {
    const iconConfig = {
        achievement: { icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/20" },
        lesson: { icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/20" },
        comment: { icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/20" },
        reminder: { icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/20" },
        system: { icon: Settings, color: "text-white/40", bg: "bg-white/10" },
    };

    const { icon: Icon, color, bg } = iconConfig[notification.type];

    return (
        <div className={cn(
            "flex items-start gap-3 p-3 rounded-lg group transition-colors",
            notification.read ? "bg-white/[0.02]" : "bg-white/5"
        )}>
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", bg)}>
                <Icon className={cn("h-5 w-5", color)} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className={cn(
                        "text-sm truncate",
                        !notification.read && "font-semibold"
                    )}>
                        {notification.title}
                    </h4>
                    {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                </div>
                <p className="text-xs text-white/50 mt-0.5 line-clamp-2">
                    {notification.message}
                </p>
                <p className="text-xs text-white/30 mt-1">
                    {formatTimeAgo(notification.createdAt)}
                </p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notification.read && (
                    <button
                        onClick={onMarkRead}
                        className="p-1 hover:bg-white/10 rounded"
                        title="Mark as read"
                    >
                        <Check className="h-4 w-4 text-white/40" />
                    </button>
                )}
                <button
                    onClick={onDelete}
                    className="p-1 hover:bg-white/10 rounded"
                    title="Delete"
                >
                    <X className="h-4 w-4 text-white/40" />
                </button>
            </div>
        </div>
    );
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

// Notification bell dropdown
export function NotificationBell({
    count,
    onClick,
}: {
    count: number;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
            <Bell className="h-5 w-5" />
            {count > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary rounded-full text-xs font-bold flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                </span>
            )}
        </button>
    );
}

// Push notification prompt
export function PushNotificationPrompt({
    onEnable,
    onDismiss,
}: {
    onEnable: () => void;
    onDismiss: () => void;
}) {
    return (
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-emerald-500/10 border-primary/20">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold">Enable push notifications</h4>
                    <p className="text-sm text-white/60">
                        Get notified about streaks, achievements, and reminders
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onDismiss}>
                        Not now
                    </Button>
                    <Button size="sm" onClick={onEnable}>
                        Enable
                    </Button>
                </div>
            </div>
        </Card>
    );
}
