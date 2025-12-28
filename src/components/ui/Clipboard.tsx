"use client";

/**
 * Clipboard Utilities
 * 
 * Copy to clipboard functionality with fallback,
 * success feedback, and React hook.
 */

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui";

// =============================================================================
// COPY FUNCTION
// =============================================================================

export async function copyToClipboard(text: string): Promise<boolean> {
    // Modern API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fall through to fallback
        }
    }

    // Fallback for older browsers
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textarea);
        return success;
    } catch {
        return false;
    }
}

// =============================================================================
// HOOK
// =============================================================================

interface UseCopyOptions {
    resetDelay?: number;
    onSuccess?: () => void;
    onError?: () => void;
}

export function useCopy(options: UseCopyOptions = {}) {
    const { resetDelay = 2000, onSuccess, onError } = options;
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);

    const copy = useCallback(async (text: string) => {
        setError(false);
        const success = await copyToClipboard(text);

        if (success) {
            setCopied(true);
            onSuccess?.();
            setTimeout(() => setCopied(false), resetDelay);
        } else {
            setError(true);
            onError?.();
            setTimeout(() => setError(false), resetDelay);
        }

        return success;
    }, [resetDelay, onSuccess, onError]);

    return { copy, copied, error };
}

// =============================================================================
// COPY BUTTON COMPONENT
// =============================================================================

interface CopyButtonProps {
    text: string;
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "ghost" | "outline";
    label?: string;
    successLabel?: string;
}

export function CopyButton({
    text,
    className,
    size = "sm",
    variant = "ghost",
    label = "Copy",
    successLabel = "Copied!",
}: CopyButtonProps) {
    const { copy, copied } = useCopy();

    const sizes = {
        sm: "h-8 px-2",
        md: "h-9 px-3",
        lg: "h-10 px-4",
    };

    return (
        <Button
            variant={variant as "default" | "ghost" | "outline"}
            className={cn(sizes[size], className)}
            onClick={() => copy(text)}
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4 mr-1 text-emerald-400" />
                    {successLabel}
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4 mr-1" />
                    {label}
                </>
            )}
        </Button>
    );
}

// =============================================================================
// COPY ICON BUTTON
// =============================================================================

interface CopyIconButtonProps {
    text: string;
    className?: string;
    size?: number;
    tooltip?: string;
}

export function CopyIconButton({
    text,
    className,
    size = 16,
    tooltip = "Copy to clipboard",
}: CopyIconButtonProps) {
    const { copy, copied } = useCopy();

    return (
        <button
            onClick={() => copy(text)}
            className={cn(
                "p-1.5 rounded-md transition-colors",
                "hover:bg-muted text-muted-foreground hover:text-foreground",
                copied && "text-emerald-400 hover:text-emerald-400",
                className
            )}
            title={copied ? "Copied!" : tooltip}
        >
            {copied ? (
                <Check style={{ width: size, height: size }} />
            ) : (
                <Copy style={{ width: size, height: size }} />
            )}
        </button>
    );
}

// =============================================================================
// CODE BLOCK WITH COPY
// =============================================================================

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

export function CodeBlock({
    code,
    language = "text",
    showLineNumbers = false,
    className,
}: CodeBlockProps) {
    const lines = code.split("\n");

    return (
        <div className={cn("relative group rounded-xl border border-white/10 bg-[#0a0a0a]", className)}>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyIconButton text={code} />
            </div>

            {language !== "text" && (
                <div className="px-4 py-2 border-b border-white/10 text-xs text-muted-foreground font-mono">
                    {language}
                </div>
            )}

            <pre className="p-4 overflow-x-auto text-sm font-mono">
                {showLineNumbers ? (
                    <code className="flex">
                        <span className="select-none pr-4 text-muted-foreground/50">
                            {lines.map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </span>
                        <span>
                            {lines.map((line, i) => (
                                <div key={i}>{line || " "}</div>
                            ))}
                        </span>
                    </code>
                ) : (
                    <code>{code}</code>
                )}
            </pre>
        </div>
    );
}

export default {
    copyToClipboard,
    useCopy,
    CopyButton,
    CopyIconButton,
    CodeBlock,
};
