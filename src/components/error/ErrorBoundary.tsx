"use client";

/**
 * Error Boundary Component
 * 
 * Professional error handling for production applications.
 * Catches JavaScript errors and displays user-friendly messages.
 */

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorId: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorId: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Generate unique error ID for support reference
        const errorId = `ERR-${Date.now().toString(36).toUpperCase()}`;
        return { hasError: true, error, errorId };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to monitoring service
        console.error("Error caught by boundary:", error, errorInfo);

        // Call optional error handler
        this.props.onError?.(error, errorInfo);

        // In production, send to error tracking service
        if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
            // Example: Send to Sentry, LogRocket, etc.
            // logErrorToService(error, errorInfo, this.state.errorId);
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorId: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                            <AlertTriangle className="h-8 w-8 text-red-400" />
                        </div>

                        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                        <p className="text-muted-foreground mb-6">
                            We encountered an unexpected error. Our team has been notified and is working on a fix.
                        </p>

                        {this.state.errorId && (
                            <p className="text-xs text-muted-foreground mb-6 font-mono bg-muted/50 px-3 py-2 rounded-lg inline-block">
                                Error ID: {this.state.errorId}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={this.handleRetry} variant="default">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm"
                            >
                                <Home className="h-4 w-4 mr-2" />
                                Go Home
                            </Link>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Need help?{" "}
                                <Link href="/support" className="text-primary hover:underline">
                                    Contact Support
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// =============================================================================
// ERROR DISPLAY COMPONENTS
// =============================================================================

interface ErrorAlertProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorAlert({
    title = "Error",
    message,
    onRetry,
    className
}: ErrorAlertProps) {
    return (
        <div className={`rounded-xl border border-red-500/30 bg-red-500/10 p-4 ${className || ""}`}>
            <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <h4 className="font-medium text-red-400">{title}</h4>
                    <p className="text-sm text-red-300/80 mt-1">{message}</p>
                    {onRetry && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRetry}
                            className="mt-3 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// 404 PAGE COMPONENT
// =============================================================================

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-md mx-auto text-center">
                <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
                <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/support"
                        className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm"
                    >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Get Help
                    </Link>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// MAINTENANCE PAGE
// =============================================================================

interface MaintenancePageProps {
    estimatedTime?: string;
    message?: string;
}

export function MaintenancePage({
    estimatedTime,
    message = "We're performing scheduled maintenance to improve your experience."
}: MaintenancePageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
                    <RefreshCw className="h-10 w-10 text-amber-400 animate-spin" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Under Maintenance</h1>
                <p className="text-muted-foreground mb-6">{message}</p>

                {estimatedTime && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
                        <span className="text-muted-foreground">Estimated time:</span>
                        <span className="font-medium">{estimatedTime}</span>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Follow our{" "}
                        <a href="https://status.zerog.ai" className="text-primary hover:underline" target="_blank" rel="noopener">
                            status page
                        </a>
                        {" "}for updates
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ErrorBoundary;
