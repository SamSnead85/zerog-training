"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Bell,
    CheckCircle2,
    Clock,
    AlertTriangle,
    BookOpen,
    Trophy,
    Users,
    Calendar,
    X,
    Settings,
    Filter,
    MailCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
    id: string;
    type: "assignment" | "reminder" | "achievement" | "team" | "system";
    title: string;
    message: string;
    time: string;
    read: boolean;
    actionUrl?: string;
}

const notifications: Notification[] = [
    { id: "1", type: "assignment", title: "New Training Assigned", message: "AI Fundamentals for Everyone has been assigned to you", time: "2 min ago", read: false, actionUrl: "/learning" },
    { id: "2", type: "reminder", title: "Training Due Soon", message: "Prompt Engineering Mastery is due in 3 days", time: "1 hour ago", read: false, actionUrl: "/learning" },
    { id: "3", type: "achievement", title: "Badge Earned!", message: "You've earned the 'Fast Learner' badge for completing 5 courses this month", time: "3 hours ago", read: false },
    { id: "4", type: "team", title: "Team Update", message: "Sarah Chen completed Leadership in the AI Era with a 98% score", time: "5 hours ago", read: true },
    { id: "5", type: "system", title: "New Features Available", message: "Check out the new AI Curriculum Generator in your dashboard", time: "1 day ago", read: true },
    { id: "6", type: "reminder", title: "Weekly Learning Summary", message: "You spent 4.5 hours learning this week. Keep up the great work!", time: "2 days ago", read: true },
];

export function NotificationCenter() {
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const [notifs, setNotifs] = useState(notifications);

    const unreadCount = notifs.filter((n) => !n.read).length;

    const getIcon = (type: string) => {
        switch (type) {
            case "assignment": return <BookOpen className="h-5 w-5 text-blue-500" />;
            case "reminder": return <Clock className="h-5 w-5 text-amber-500" />;
            case "achievement": return <Trophy className="h-5 w-5 text-purple-500" />;
            case "team": return <Users className="h-5 w-5 text-emerald-500" />;
            default: return <Bell className="h-5 w-5 text-muted-foreground" />;
        }
    };

    const markAsRead = (id: string) => {
        setNotifs(notifs.map((n) => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifs(notifs.map((n) => ({ ...n, read: true })));
    };

    const deleteNotif = (id: string) => {
        setNotifs(notifs.filter((n) => n.id !== id));
    };

    const filteredNotifs = filter === "unread"
        ? notifs.filter((n) => !n.read)
        : notifs;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Bell className="h-7 w-7 text-primary" />
                        Notifications
                        {unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground">
                                {unreadCount} new
                            </Badge>
                        )}
                    </h1>
                    <p className="text-muted-foreground">
                        Stay updated on your training progress and team activity
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
                        <MailCheck className="h-4 w-4" />
                        Mark All Read
                    </Button>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter("all")}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm transition-colors",
                        filter === "all"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                    )}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("unread")}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm transition-colors",
                        filter === "unread"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                    )}
                >
                    Unread ({unreadCount})
                </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
                {filteredNotifs.length === 0 ? (
                    <Card className="p-12 text-center">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                        <p className="font-medium">All caught up!</p>
                        <p className="text-sm text-muted-foreground">No new notifications</p>
                    </Card>
                ) : (
                    filteredNotifs.map((notif) => (
                        <Card
                            key={notif.id}
                            className={cn(
                                "p-4 transition-all",
                                !notif.read && "bg-primary/5 border-primary/20"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    {getIcon(notif.type)}
                                </div>
                                <div
                                    className="flex-1 cursor-pointer"
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className={cn("font-medium text-sm", !notif.read && "text-primary")}>
                                            {notif.title}
                                        </p>
                                        {!notif.read && (
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                                </div>
                                <button
                                    onClick={() => deleteNotif(notif.id)}
                                    className="p-1 hover:bg-muted rounded"
                                >
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
