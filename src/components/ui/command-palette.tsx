"use client";

import { useState, useEffect, useRef } from "react";
import { Command, Search, Sparkles, BookOpen, Users, BarChart3, Settings, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CommandItem {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ElementType;
    action: () => void;
    keywords?: string[];
}

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const commands: CommandItem[] = [
        { id: "create", title: "Create Training", subtitle: "Generate with AI", icon: Sparkles, action: () => router.push("/create"), keywords: ["new", "ai", "generate"] },
        { id: "library", title: "Browse Library", subtitle: "Pre-built courses", icon: BookOpen, action: () => router.push("/library"), keywords: ["courses", "content"] },
        { id: "org", title: "Organization Dashboard", subtitle: "Overview & metrics", icon: BarChart3, action: () => router.push("/org"), keywords: ["dashboard", "metrics"] },
        { id: "assign", title: "Assign Training", subtitle: "Bulk assignment", icon: Users, action: () => router.push("/assign"), keywords: ["team", "employees"] },
        { id: "progress", title: "Team Progress", subtitle: "Track learners", icon: BarChart3, action: () => router.push("/progress"), keywords: ["analytics", "tracking"] },
        { id: "workforce", title: "Manage Workforce", subtitle: "Employees & departments", icon: Users, action: () => router.push("/workforce"), keywords: ["people", "hr"] },
        { id: "settings", title: "Settings", subtitle: "Platform configuration", icon: Settings, action: () => router.push("/settings"), keywords: ["config", "preferences"] },
    ];

    const filteredCommands = commands.filter((cmd) => {
        const searchTerms = query.toLowerCase().split(" ");
        return searchTerms.every((term) =>
            cmd.title.toLowerCase().includes(term) ||
            cmd.subtitle?.toLowerCase().includes(term) ||
            cmd.keywords?.some((k) => k.includes(term))
        );
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === "k") {
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

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setQuery("");
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg mx-4 bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-border">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search commands..."
                        className="flex-1 bg-transparent border-0 outline-none text-base placeholder:text-muted-foreground"
                    />
                    <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded">esc</kbd>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto">
                    {filteredCommands.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No results found
                        </div>
                    ) : (
                        filteredCommands.map((cmd, i) => {
                            const Icon = cmd.icon;
                            return (
                                <button
                                    key={cmd.id}
                                    onClick={() => {
                                        cmd.action();
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 text-left transition-colors",
                                        i === selectedIndex ? "bg-primary/10" : "hover:bg-muted/50"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{cmd.title}</p>
                                        {cmd.subtitle && (
                                            <p className="text-xs text-muted-foreground">{cmd.subtitle}</p>
                                        )}
                                    </div>
                                    {i === selectedIndex && (
                                        <ArrowRight className="h-4 w-4 text-primary" />
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 font-mono bg-muted rounded">↑↓</kbd>
                            navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 font-mono bg-muted rounded">↵</kbd>
                            select
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Command className="h-3 w-3" />
                        <span>K to toggle</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
