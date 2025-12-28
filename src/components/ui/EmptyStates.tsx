"use client";

import { FileQuestion, Search, FolderOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon?: React.ElementType;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon: Icon = FileQuestion,
    title,
    description,
    action,
    className
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
            )}
            {action && (
                <Button onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
}

export function NoSearchResults({ query, onClear }: { query: string; onClear: () => void }) {
    return (
        <EmptyState
            icon={Search}
            title={`No results for "${query}"`}
            description="Try adjusting your search terms or filters to find what you're looking for."
            action={{
                label: "Clear Search",
                onClick: onClear,
            }}
        />
    );
}

export function NoCourses() {
    return (
        <EmptyState
            icon={FolderOpen}
            title="No courses available"
            description="New courses will appear here when they become available."
        />
    );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
    return (
        <EmptyState
            icon={AlertCircle}
            title="Something went wrong"
            description={message || "We couldn't load this content. Please try again."}
            action={onRetry ? {
                label: "Try Again",
                onClick: onRetry,
            } : undefined}
        />
    );
}
