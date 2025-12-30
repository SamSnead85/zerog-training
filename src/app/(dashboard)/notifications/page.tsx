"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Bell,
    Check,
    CheckCheck,
    Award,
    BookOpen,
    Users,
    MessageCircle,
    Settings,
    Trash2,
    MoreHorizontal,
    Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// NOTIFICATIONS DATA
// =============================================================================

interface Notification {
    id: string;
    type: "achievement" | "course" | "team" | "system" | "message";
    title: string;
    message: string;
    time: string;
    read: boolean;
    actionUrl?: string;
}

const notificationsData: Notification[] = [
    { id: "1", type: "achievement", title: "Achievement Unlocked!", message: "You earned the 'Week Warrior' badge for maintaining a 7-day streak.", time: "2 hours ago", read: false },
    { id: "2", type: "course", title: "New Content Available", message: "Module 5: AI Ethics & Governance is now available.", time: "5 hours ago", read: false, actionUrl: "/catalog" },
    { id: "3", type: "team", title: "Team Update", message: "Sarah Chen completed the AI Foundations certification.", time: "1 day ago", read: true },
    { id: "4", type: "message", title: "New Message", message: "Your manager sent you a learning recommendation.", time: "1 day ago", read: true },
    { id: "5", type: "system", title: "Weekly Digest", message: "You learned for 4.5 hours this week. Keep it up!", time: "2 days ago", read: true },
    { id: "6", type: "course", title: "Quiz Reminder", message: "You have an incomplete quiz in Prompt Engineering.", time: "3 days ago", read: true, actionUrl: "/training" },
    { id: "7", type: "achievement", title: "Almost There!", message: "Just 2 more lessons to unlock 'Knowledge Seeker' badge.", time: "4 days ago", read: true },
];

const typeIcons: Record<Notification["type"], React.ComponentType<{ className?: string }>> = {
    achievement: Award,
    course: BookOpen,
    team: Users,
    system: Bell,
    message: MessageCircle,
};

const typeColors: Record<Notification["type"], string> = {
    achievement: "bg-yellow-500/20 text-yellow-400",
    course: "bg-blue-500/20 text-blue-400",
    team: "bg-emerald-500/20 text-emerald-400",
    system: "bg-white/10 text-white/60",
    message: "bg-purple-500/20 text-purple-400",
};

// =============================================================================
// NOTIFICATIONS PAGE
// =============================================================================

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(notificationsData);
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const filteredNotifications = notifications.filter(n =>
        filter === "all" || !n.read
    );

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-3xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <Link href="/settings" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Settings className="h-5 w-5 text-white/60" />
                    </Link>
                </div>
            </header>

            <main className="px-6 py-8 max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        <p className="text-sm text-white/40">{unreadCount} unread</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={markAllAsRead}
                            className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
                        >
                            <CheckCheck className="h-4 w-4" />
                            Mark all read
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setFilter("all")}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm transition-colors",
                            filter === "all" ? "bg-white text-black" : "bg-white/5 text-white/60"
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("unread")}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2",
                            filter === "unread" ? "bg-white text-black" : "bg-white/5 text-white/60"
                        )}
                    >
                        Unread
                        {unreadCount > 0 && (
                            <span className={cn(
                                "px-1.5 py-0.5 text-xs rounded-full",
                                filter === "unread" ? "bg-black/20" : "bg-white/20"
                            )}>
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Notifications List */}
                <div className="space-y-2">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notification => {
                            const Icon = typeIcons[notification.type];
                            return (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 rounded-xl border transition-colors group",
                                        notification.read
                                            ? "bg-white/[0.02] border-white/5"
                                            : "bg-white/[0.04] border-white/10"
                                    )}
                                >
                                    <div className="flex gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                            typeColors[notification.type]
                                        )}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-sm">{notification.title}</h3>
                                                    {!notification.read && (
                                                        <Circle className="h-2 w-2 fill-blue-400 text-blue-400" />
                                                    )}
                                                </div>
                                                <span className="text-xs text-white/30 flex-shrink-0">{notification.time}</span>
                                            </div>
                                            <p className="text-sm text-white/50 mt-1">{notification.message}</p>

                                            <div className="flex items-center gap-3 mt-3">
                                                {notification.actionUrl && (
                                                    <Link href={notification.actionUrl}>
                                                        <button className="text-xs text-blue-400 hover:text-blue-300">
                                                            View →
                                                        </button>
                                                    </Link>
                                                )}
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs text-white/40 hover:text-white"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-xs text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-12 text-center">
                            <Bell className="h-12 w-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40">No notifications</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
