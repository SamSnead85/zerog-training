/**
 * Date & Time Utilities
 * 
 * Production-ready date formatting, relative time,
 * timezone handling, and calendar utilities.
 */

// =============================================================================
// RELATIVE TIME
// =============================================================================

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/**
 * Format a date as relative time (e.g., "5 minutes ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const absDiff = Math.abs(diff);
    const isPast = diff > 0;

    const format = (value: number, unit: string) => {
        const rounded = Math.round(value);
        const plural = rounded !== 1 ? "s" : "";
        return isPast
            ? `${rounded} ${unit}${plural} ago`
            : `in ${rounded} ${unit}${plural}`;
    };

    if (absDiff < MINUTE) return "just now";
    if (absDiff < HOUR) return format(absDiff / MINUTE, "minute");
    if (absDiff < DAY) return format(absDiff / HOUR, "hour");
    if (absDiff < WEEK) return format(absDiff / DAY, "day");
    if (absDiff < MONTH) return format(absDiff / WEEK, "week");
    if (absDiff < YEAR) return format(absDiff / MONTH, "month");
    return format(absDiff / YEAR, "year");
}

/**
 * Format relative time in short form (e.g., "5m")
 */
export function formatRelativeTimeShort(date: Date | string | number): string {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const absDiff = Math.abs(diff);

    if (absDiff < MINUTE) return "now";
    if (absDiff < HOUR) return `${Math.round(absDiff / MINUTE)}m`;
    if (absDiff < DAY) return `${Math.round(absDiff / HOUR)}h`;
    if (absDiff < WEEK) return `${Math.round(absDiff / DAY)}d`;
    if (absDiff < MONTH) return `${Math.round(absDiff / WEEK)}w`;
    if (absDiff < YEAR) return `${Math.round(absDiff / MONTH)}mo`;
    return `${Math.round(absDiff / YEAR)}y`;
}

// =============================================================================
// DATE FORMATTING
// =============================================================================

export interface DateFormatOptions {
    includeTime?: boolean;
    includeSeconds?: boolean;
    use24Hour?: boolean;
    includeTimezone?: boolean;
}

/**
 * Format a date with common patterns
 */
export function formatDate(
    date: Date | string | number,
    format: "short" | "medium" | "long" | "full" = "medium",
    options: DateFormatOptions = {}
): string {
    const d = new Date(date);

    const dateFormats: Record<string, Intl.DateTimeFormatOptions> = {
        short: { month: "numeric", day: "numeric", year: "2-digit" },
        medium: { month: "short", day: "numeric", year: "numeric" },
        long: { month: "long", day: "numeric", year: "numeric" },
        full: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
    };

    const formatOptions: Intl.DateTimeFormatOptions = { ...dateFormats[format] };

    if (options.includeTime) {
        formatOptions.hour = "numeric";
        formatOptions.minute = "2-digit";
        formatOptions.hour12 = !options.use24Hour;

        if (options.includeSeconds) {
            formatOptions.second = "2-digit";
        }
    }

    if (options.includeTimezone) {
        formatOptions.timeZoneName = "short";
    }

    return new Intl.DateTimeFormat("en-US", formatOptions).format(d);
}

/**
 * Format time only
 */
export function formatTime(
    date: Date | string | number,
    use24Hour: boolean = false
): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: !use24Hour,
    }).format(d);
}

// =============================================================================
// DURATION FORMATTING
// =============================================================================

/**
 * Format a duration in milliseconds to human-readable format
 */
export function formatDuration(ms: number, short: boolean = false): string {
    if (ms < 0) ms = 0;

    const hours = Math.floor(ms / HOUR);
    const minutes = Math.floor((ms % HOUR) / MINUTE);
    const seconds = Math.floor((ms % MINUTE) / SECOND);

    if (short) {
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    }

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

    return parts.join(", ");
}

/**
 * Format minutes to "Xh Ym" format
 */
export function formatMinutes(totalMinutes: number): string {
    if (totalMinutes < 1) return "< 1 min";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
}

// =============================================================================
// DATE HELPERS
// =============================================================================

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
    const d = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.toDateString() === yesterday.toDateString();
}

/**
 * Check if a date is this week
 */
export function isThisWeek(date: Date | string | number): boolean {
    const d = new Date(date);
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return d >= weekAgo && d <= today;
}

/**
 * Get start of day
 */
export function startOfDay(date: Date | string | number): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Get end of day
 */
export function endOfDay(date: Date | string | number): Date {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string | number, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

/**
 * Get difference in days between two dates
 */
export function diffInDays(date1: Date | string | number, date2: Date | string | number): number {
    const d1 = startOfDay(date1);
    const d2 = startOfDay(date2);
    return Math.round((d2.getTime() - d1.getTime()) / DAY);
}

// =============================================================================
// TIMEZONE UTILITIES
// =============================================================================

/**
 * Get current timezone name
 */
export function getCurrentTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Get list of common timezones
 */
export function getCommonTimezones(): { value: string; label: string }[] {
    return [
        { value: "America/New_York", label: "Eastern Time (ET)" },
        { value: "America/Chicago", label: "Central Time (CT)" },
        { value: "America/Denver", label: "Mountain Time (MT)" },
        { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
        { value: "America/Phoenix", label: "Arizona (AZ)" },
        { value: "America/Anchorage", label: "Alaska Time (AKT)" },
        { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
        { value: "Europe/London", label: "London (GMT)" },
        { value: "Europe/Paris", label: "Paris (CET)" },
        { value: "Europe/Berlin", label: "Berlin (CET)" },
        { value: "Asia/Tokyo", label: "Tokyo (JST)" },
        { value: "Asia/Shanghai", label: "Shanghai (CST)" },
        { value: "Asia/Singapore", label: "Singapore (SGT)" },
        { value: "Australia/Sydney", label: "Sydney (AEST)" },
    ];
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
    formatRelativeTime,
    formatRelativeTimeShort,
    formatDate,
    formatTime,
    formatDuration,
    formatMinutes,
    isToday,
    isYesterday,
    isThisWeek,
    startOfDay,
    endOfDay,
    addDays,
    diffInDays,
    getCurrentTimezone,
    getCommonTimezones,
};
