"use client";

import { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
    content: string;
    side?: "top" | "right" | "bottom" | "left";
    children: React.ReactNode;
}

export function HelpTooltip({ content, side = "top", children }: HelpTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
    };

    return (
        <div className="relative inline-flex items-center">
            {children}
            <button
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                className="ml-1 p-0.5 text-muted-foreground hover:text-foreground"
            >
                <HelpCircle className="h-4 w-4" />
            </button>
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 w-64 p-3 text-sm bg-popover border border-border rounded-lg shadow-lg",
                        positionClasses[side]
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
}

interface ContextualHelpProps {
    title: string;
    content: string;
    learnMoreUrl?: string;
}

export function ContextualHelp({ title, content, learnMoreUrl }: ContextualHelpProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
                <HelpCircle className="h-4 w-4" />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md mx-4 p-6 bg-background border border-border rounded-xl shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">{title}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded hover:bg-muted"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{content}</p>
                        {learnMoreUrl && (
                            <a
                                href={learnMoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                            >
                                Learn more →
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
