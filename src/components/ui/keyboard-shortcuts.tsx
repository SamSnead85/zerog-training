"use client";

import { useState, useEffect } from "react";
import { Command, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Shortcut {
    keys: string[];
    description: string;
    action?: () => void;
}

const shortcuts: Shortcut[] = [
    { keys: ["⌘", "K"], description: "Open command palette" },
    { keys: ["⌘", "N"], description: "Create new training" },
    { keys: ["⌘", "S"], description: "Save current work" },
    { keys: ["⌘", "/"], description: "Show keyboard shortcuts" },
    { keys: ["⌘", "B"], description: "Toggle sidebar" },
    { keys: ["Esc"], description: "Close modal / Go back" },
    { keys: ["⌘", "Enter"], description: "Submit / Confirm" },
    { keys: ["⌘", "F"], description: "Search" },
];

export function KeyboardShortcutsGuide() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === "/") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 p-6 bg-background border border-border rounded-xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Command className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-2">
                    {shortcuts.map((shortcut, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50"
                        >
                            <span className="text-sm">{shortcut.description}</span>
                            <div className="flex items-center gap-1">
                                {shortcut.keys.map((key, j) => (
                                    <kbd
                                        key={j}
                                        className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border"
                                    >
                                        {key}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-4 text-xs text-muted-foreground text-center">
                    Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">⌘/</kbd> to toggle this guide
                </p>
            </div>
        </div>
    );
}
