"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Search,
    X,
    BookOpen,
    Clock,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchResult {
    id: string;
    type: "module" | "lesson" | "topic";
    title: string;
    description: string;
    moduleTitle?: string;
    href: string;
    matchedText?: string;
}

interface LearningSearchProps {
    placeholder?: string;
    onSearch?: (query: string) => Promise<SearchResult[]>;
    className?: string;
}

// Mock search function - replace with actual implementation
const mockSearch = async (query: string): Promise<SearchResult[]> => {
    // In production, this would call an API
    const mockResults: SearchResult[] = [
        {
            id: "1",
            type: "module",
            title: "Prompt Engineering Fundamentals",
            description: "Master the art of crafting effective AI prompts",
            href: "/learn/module/prompt-engineering",
        },
        {
            id: "2",
            type: "lesson",
            title: "The CRAFT Framework",
            description: "Learn the Context, Role, Action, Format, Tone framework",
            moduleTitle: "Prompt Engineering",
            href: "/learn/lesson/craft-framework",
        },
        {
            id: "3",
            type: "topic",
            title: "Chain-of-Thought Prompting",
            description: "Advanced technique for complex reasoning tasks",
            moduleTitle: "Advanced Prompting",
            href: "/learn/lesson/chain-of-thought",
        },
    ];

    if (!query.trim()) return [];

    return mockResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
    );
};

export function LearningSearch({
    placeholder = "Search lessons, modules, topics...",
    onSearch = mockSearch,
    className,
}: LearningSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                const searchResults = await onSearch(query);
                setResults(searchResults);
                setIsLoading(false);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, onSearch]);

    const typeConfig = {
        module: { label: "Module", color: "bg-blue-500/20 text-blue-400" },
        lesson: { label: "Lesson", color: "bg-emerald-500/20 text-emerald-400" },
        topic: { label: "Topic", color: "bg-purple-500/20 text-purple-400" },
    };

    return (
        <div className={cn("relative", className)}>
            {/* Search input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-sm"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
                    >
                        <X className="h-4 w-4 text-white/40" />
                    </button>
                )}
            </div>

            {/* Results dropdown */}
            {isOpen && (query.trim() || results.length > 0) && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Results */}
                    <Card className="absolute top-full mt-2 left-0 right-0 z-50 p-2 max-h-80 overflow-y-auto bg-black/95 border-white/10 shadow-xl">
                        {isLoading ? (
                            <div className="p-4 text-center text-white/50 text-sm">
                                Searching...
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-1">
                                {results.map((result) => (
                                    <Link
                                        key={result.id}
                                        href={result.href}
                                        onClick={() => {
                                            setIsOpen(false);
                                            setQuery("");
                                        }}
                                        className="block p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                <BookOpen className="h-4 w-4 text-white/40" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                                        {result.title}
                                                    </span>
                                                    <Badge className={cn("text-xs", typeConfig[result.type].color)}>
                                                        {typeConfig[result.type].label}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-white/40 truncate mt-0.5">
                                                    {result.moduleTitle && `${result.moduleTitle} • `}
                                                    {result.description}
                                                </p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : query.trim() ? (
                            <div className="p-4 text-center text-white/50 text-sm">
                                No results found for "{query}"
                            </div>
                        ) : null}
                    </Card>
                </>
            )}
        </div>
    );
}

// Command palette version (Cmd+K)
export function useSearchShortcut(onOpen: () => void) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                onOpen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onOpen]);
}
