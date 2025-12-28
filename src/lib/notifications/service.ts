/**
 * Notification Service
 * 
 * Centralized notification management with types,
 * persistence, and API integration.
 */

// =============================================================================
// TYPES
// =============================================================================

export type NotificationType =
    | "info"
    | "success"
    | "warning"
    | "error"
    | "achievement"
    | "team"
    | "course"
    | "reminder"
    | "system";

export type NotificationChannel = "inApp" | "email" | "push";

export interface NotificationPayload {
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    actionLabel?: string;
    metadata?: Record<string, unknown>;
    channels?: NotificationChannel[];
    scheduledFor?: Date;
    expiresAt?: Date;
}

export interface Notification extends NotificationPayload {
    id: string;
    userId: string;
    read: boolean;
    readAt?: Date;
    createdAt: Date;
    deliveredChannels: NotificationChannel[];
}

export interface NotificationPreferences {
    userId: string;
    channels: {
        inApp: boolean;
        email: boolean;
        push: boolean;
    };
    types: {
        [K in NotificationType]?: {
            enabled: boolean;
            channels?: NotificationChannel[];
        };
    };
    quietHours?: {
        enabled: boolean;
        start: string; // "22:00"
        end: string; // "08:00"
        timezone: string;
    };
}

// =============================================================================
// NOTIFICATION SERVICE
// =============================================================================

class NotificationService {
    private apiBaseUrl: string;

    constructor(apiBaseUrl: string = "/api/notifications") {
        this.apiBaseUrl = apiBaseUrl;
    }

    /**
     * Send a notification to a user
     */
    async send(userId: string, payload: NotificationPayload): Promise<Notification> {
        const response = await fetch(`${this.apiBaseUrl}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, ...payload }),
        });

        if (!response.ok) {
            throw new Error("Failed to send notification");
        }

        return response.json();
    }

    /**
     * Send a notification to multiple users
     */
    async sendBulk(userIds: string[], payload: NotificationPayload): Promise<{ sent: number; failed: number }> {
        const response = await fetch(`${this.apiBaseUrl}/bulk`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds, ...payload }),
        });

        if (!response.ok) {
            throw new Error("Failed to send bulk notifications");
        }

        return response.json();
    }

    /**
     * Get notifications for a user
     */
    async getForUser(userId: string, options?: {
        unreadOnly?: boolean;
        limit?: number;
        offset?: number;
    }): Promise<{ notifications: Notification[]; total: number; unreadCount: number }> {
        const params = new URLSearchParams();
        if (options?.unreadOnly) params.set("unread", "true");
        if (options?.limit) params.set("limit", options.limit.toString());
        if (options?.offset) params.set("offset", options.offset.toString());

        const response = await fetch(`${this.apiBaseUrl}/user/${userId}?${params}`);

        if (!response.ok) {
            throw new Error("Failed to fetch notifications");
        }

        return response.json();
    }

    /**
     * Mark a notification as read
     */
    async markAsRead(notificationId: string): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/${notificationId}/read`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Failed to mark notification as read");
        }
    }

    /**
     * Mark all notifications as read for a user
     */
    async markAllAsRead(userId: string): Promise<{ updated: number }> {
        const response = await fetch(`${this.apiBaseUrl}/user/${userId}/read-all`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Failed to mark all notifications as read");
        }

        return response.json();
    }

    /**
     * Delete a notification
     */
    async delete(notificationId: string): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/${notificationId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete notification");
        }
    }

    /**
     * Get user notification preferences
     */
    async getPreferences(userId: string): Promise<NotificationPreferences> {
        const response = await fetch(`${this.apiBaseUrl}/preferences/${userId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch notification preferences");
        }

        return response.json();
    }

    /**
     * Update user notification preferences
     */
    async updatePreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
        const response = await fetch(`${this.apiBaseUrl}/preferences/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(preferences),
        });

        if (!response.ok) {
            throw new Error("Failed to update notification preferences");
        }

        return response.json();
    }
}

// =============================================================================
// NOTIFICATION HELPERS
// =============================================================================

/**
 * Create common notification payloads
 */
export const createNotification = {
    courseCompleted: (courseName: string, certificateUrl: string): NotificationPayload => ({
        type: "achievement",
        title: "Course Completed! 🎉",
        message: `Congratulations! You've completed "${courseName}".`,
        link: certificateUrl,
        actionLabel: "View Certificate",
        channels: ["inApp", "email"],
    }),

    newCourseAssigned: (courseName: string, courseUrl: string): NotificationPayload => ({
        type: "course",
        title: "New Course Assigned",
        message: `You've been assigned "${courseName}". Start learning now!`,
        link: courseUrl,
        actionLabel: "Start Course",
        channels: ["inApp", "email"],
    }),

    badgeEarned: (badgeName: string, badgeUrl: string): NotificationPayload => ({
        type: "achievement",
        title: "Badge Earned! 🏆",
        message: `You've earned the "${badgeName}" badge.`,
        link: badgeUrl,
        actionLabel: "View Badge",
        channels: ["inApp"],
    }),

    teamUpdate: (message: string): NotificationPayload => ({
        type: "team",
        title: "Team Update",
        message,
        channels: ["inApp"],
    }),

    courseReminder: (courseName: string, progress: number, courseUrl: string): NotificationPayload => ({
        type: "reminder",
        title: "Continue Your Learning",
        message: `You're ${progress}% through "${courseName}". Keep going!`,
        link: courseUrl,
        actionLabel: "Continue",
        channels: ["inApp", "email"],
    }),

    systemUpdate: (title: string, message: string): NotificationPayload => ({
        type: "system",
        title,
        message,
        channels: ["inApp"],
    }),
};

// =============================================================================
// EXPORTS
// =============================================================================

export const notificationService = new NotificationService();

export default notificationService;
