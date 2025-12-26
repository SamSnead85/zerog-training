"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    Trophy,
    Settings,
    Plus,
    ArrowRight,
    Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon: React.ElementType;
    action: () => void;
    category: "navigation" | "action";
}

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const commands: CommandItem[] = [
        // Navigation
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, action: () => router.push("/dashboard"), category: "navigation" },
        { id: "library", label: "Training Library", icon: BookOpen, action: () => router.push("/library"), category: "navigation" },
        { id: "learning", label: "My Learning", icon: GraduationCap, action: () => router.push("/learning"), category: "navigation" },
        { id: "achievements", label: "Achievements", icon: Trophy, action: () => router.push("/achievements"), category: "navigation" },
        { id: "settings", label: "Settings", icon: Settings, action: () => router.push("/settings"), category: "navigation" },
        // Actions
        { id: "create", label: "Create New Training", description: "Start building a new course", icon: Plus, action: () => router.push("/studio/create"), category: "action" },
    ];

    const filteredCommands = commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description?.toLowerCase().includes(search.toLowerCase())
    );

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Open with Cmd+K
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
            setSearch("");
            setSelectedIndex(0);
        }

        // Close with Escape
        if (e.key === "Escape") {
            setIsOpen(false);
        }

        // Navigate with arrows
        if (isOpen) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            }
            if (e.key === "Enter" && filteredCommands[selectedIndex]) {
                e.preventDefault();
                filteredCommands[selectedIndex].action();
                setIsOpen(false);
            }
        }
    }, [isOpen, filteredCommands, selectedIndex, router]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Dialog */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg animate-scale-in">
                <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 border-b border-border">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setSelectedIndex(0);
                            }}
                            placeholder="Search commands..."
                            autoFocus
                            className="flex-1 h-14 bg-transparent border-0 text-lg focus:outline-none"
                        />
                        <kbd className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">ESC</kbd>
                    </div>

                    {/* Commands List */}
                    <div className="max-h-[400px] overflow-y-auto p-2">
                        {filteredCommands.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No commands found
                            </div>
                        ) : (
                            <>
                                {["navigation", "action"].map((category) => {
                                    const categoryCommands = filteredCommands.filter((c) => c.category === category);
                                    if (categoryCommands.length === 0) return null;

                                    return (
                                        <div key={category} className="mb-4 last:mb-0">
                                            <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                {category === "navigation" ? "Go to" : "Actions"}
                                            </p>
                                            {categoryCommands.map((cmd) => {
                                                const globalIndex = filteredCommands.indexOf(cmd);
                                                const Icon = cmd.icon;
                                                const isSelected = globalIndex === selectedIndex;

                                                return (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => {
                                                            cmd.action();
                                                            setIsOpen(false);
                                                        }}
                                                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                        className={cn(
                                                            "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                                                            isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted"
                                                        )}
                                                    >
                                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium">{cmd.label}</p>
                                                            {cmd.description && (
                                                                <p className="text-sm text-muted-foreground truncate">
                                                                    {cmd.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {isSelected && <ArrowRight className="h-4 w-4" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded bg-muted">↑</kbd>
                                <kbd className="px-1.5 py-0.5 rounded bg-muted">↓</kbd>
                                to navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded bg-muted">↵</kbd>
                                to select
                            </span>
                        </div>
                        <span className="flex items-center gap-1">
                            <Command className="h-3 w-3" />K to toggle
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
