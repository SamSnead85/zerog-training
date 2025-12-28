/**
 * Error Tracking & Logging
 * 
 * Production-ready error tracking, logging, and monitoring
 * utilities with integration points for external services.
 */

// =============================================================================
// TYPES
// =============================================================================

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    context?: Record<string, unknown>;
    error?: Error;
    userId?: string;
    sessionId?: string;
    url?: string;
}

export interface ErrorContext {
    userId?: string;
    sessionId?: string;
    action?: string;
    componentStack?: string;
    metadata?: Record<string, unknown>;
}

// =============================================================================
// LOG LEVEL WEIGHTS
// =============================================================================

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4,
};

// =============================================================================
// LOGGER CLASS
// =============================================================================

class Logger {
    private minLevel: LogLevel = "info";
    private sessionId: string = "";
    private userId?: string;
    private logs: LogEntry[] = [];
    private maxLogSize: number = 100;

    constructor() {
        if (typeof window !== "undefined") {
            this.sessionId = this.generateSessionId();
        }
    }

    private generateSessionId(): string {
        return `session_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
    }

    setMinLevel(level: LogLevel): void {
        this.minLevel = level;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    private shouldLog(level: LogLevel): boolean {
        return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel];
    }

    private createEntry(
        level: LogLevel,
        message: string,
        context?: Record<string, unknown>,
        error?: Error
    ): LogEntry {
        return {
            level,
            message,
            timestamp: new Date(),
            context,
            error,
            userId: this.userId,
            sessionId: this.sessionId,
            url: typeof window !== "undefined" ? window.location.href : undefined,
        };
    }

    private log(entry: LogEntry): void {
        // Store in memory
        this.logs.push(entry);
        if (this.logs.length > this.maxLogSize) {
            this.logs.shift();
        }

        // Console output in development
        if (process.env.NODE_ENV === "development") {
            const style = this.getConsoleStyle(entry.level);
            console.log(
                `%c[${entry.level.toUpperCase()}]%c ${entry.message}`,
                style,
                "color: inherit",
                entry.context || "",
                entry.error || ""
            );
        }

        // In production, send to external service
        if (process.env.NODE_ENV === "production" && entry.level === "error") {
            this.sendToExternalService(entry);
        }
    }

    private getConsoleStyle(level: LogLevel): string {
        const styles: Record<LogLevel, string> = {
            debug: "color: #888; font-weight: bold",
            info: "color: #3b82f6; font-weight: bold",
            warn: "color: #f59e0b; font-weight: bold",
            error: "color: #ef4444; font-weight: bold",
            fatal: "color: #dc2626; font-weight: bold; background: #fee2e2; padding: 2px 4px; border-radius: 2px",
        };
        return styles[level];
    }

    private async sendToExternalService(entry: LogEntry): Promise<void> {
        // Example: Send to error tracking service
        // This would be replaced with actual integration (Sentry, LogRocket, etc.)
        try {
            if (typeof window !== "undefined" && "navigator" in window && navigator.sendBeacon) {
                navigator.sendBeacon("/api/logs", JSON.stringify(entry));
            }
        } catch {
            // Silently fail
        }
    }

    debug(message: string, context?: Record<string, unknown>): void {
        if (this.shouldLog("debug")) {
            this.log(this.createEntry("debug", message, context));
        }
    }

    info(message: string, context?: Record<string, unknown>): void {
        if (this.shouldLog("info")) {
            this.log(this.createEntry("info", message, context));
        }
    }

    warn(message: string, context?: Record<string, unknown>): void {
        if (this.shouldLog("warn")) {
            this.log(this.createEntry("warn", message, context));
        }
    }

    error(message: string, error?: Error, context?: Record<string, unknown>): void {
        if (this.shouldLog("error")) {
            this.log(this.createEntry("error", message, context, error));
        }
    }

    fatal(message: string, error?: Error, context?: Record<string, unknown>): void {
        if (this.shouldLog("fatal")) {
            this.log(this.createEntry("fatal", message, context, error));
        }
    }

    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    getLogsByLevel(level: LogLevel): LogEntry[] {
        return this.logs.filter((log) => log.level === level);
    }

    clearLogs(): void {
        this.logs = [];
    }
}

// =============================================================================
// ERROR TRACKER
// =============================================================================

class ErrorTracker {
    private context: ErrorContext = {};

    setContext(context: Partial<ErrorContext>): void {
        this.context = { ...this.context, ...context };
    }

    clearContext(): void {
        this.context = {};
    }

    captureException(error: Error, additionalContext?: Record<string, unknown>): void {
        const fullContext = { ...this.context, ...additionalContext };

        logger.error(error.message, error, fullContext);

        // In production, this would send to Sentry/similar
        if (process.env.NODE_ENV === "production") {
            this.reportToService(error, fullContext);
        }
    }

    captureMessage(message: string, level: LogLevel = "info", context?: Record<string, unknown>): void {
        const fullContext = { ...this.context, ...context };

        switch (level) {
            case "debug":
                logger.debug(message, fullContext);
                break;
            case "info":
                logger.info(message, fullContext);
                break;
            case "warn":
                logger.warn(message, fullContext);
                break;
            case "error":
                logger.error(message, undefined, fullContext);
                break;
            case "fatal":
                logger.fatal(message, undefined, fullContext);
                break;
        }
    }

    private async reportToService(error: Error, context: Record<string, unknown>): Promise<void> {
        // Example integration point for Sentry, Bugsnag, etc.
        try {
            // In real implementation:
            // await fetch('/api/errors', { method: 'POST', body: JSON.stringify({ error: error.message, stack: error.stack, context }) });
        } catch {
            // Silently fail
        }
    }
}

// =============================================================================
// PERFORMANCE MONITORING
// =============================================================================

interface PerformanceMark {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
}

class PerformanceMonitor {
    private marks: Map<string, PerformanceMark> = new Map();

    start(name: string): void {
        this.marks.set(name, {
            name,
            startTime: performance.now(),
        });
    }

    end(name: string): number | undefined {
        const mark = this.marks.get(name);
        if (!mark) return undefined;

        mark.endTime = performance.now();
        mark.duration = mark.endTime - mark.startTime;

        logger.debug(`Performance: ${name}`, { duration: `${mark.duration.toFixed(2)}ms` });

        return mark.duration;
    }

    measure(name: string, fn: () => void): number {
        this.start(name);
        fn();
        return this.end(name) || 0;
    }

    async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<{ result: T; duration: number }> {
        this.start(name);
        const result = await fn();
        const duration = this.end(name) || 0;
        return { result, duration };
    }

    getMarks(): PerformanceMark[] {
        return Array.from(this.marks.values());
    }

    clear(): void {
        this.marks.clear();
    }
}

// =============================================================================
// EXPORTS
// =============================================================================

export const logger = new Logger();
export const errorTracker = new ErrorTracker();
export const performanceMonitor = new PerformanceMonitor();

export default {
    logger,
    errorTracker,
    performanceMonitor,
};
