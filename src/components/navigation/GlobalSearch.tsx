"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Search,
    X,
    Clock,
    TrendingUp,
    BookOpen,
    Award,
    Users,
    Filter,
    Sparkles,
    ArrowRight,
    Loader2,
} from "lucide-react";

interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: "course" | "path" | "certificate" | "article" | "team";
    href: string;
    meta?: string;
    highlighted?: boolean;
}

interface GlobalSearchProps {
    onOpenCommandPalette?: () => void;
}

export function GlobalSearch({ onOpenCommandPalette }: GlobalSearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Mock search results (replace with actual API)
    const mockResults: SearchResult[] = [
        { id: "1", title: "Cybersecurity Fundamentals", description: "NIST CSF 2.0 aligned training", type: "course", href: "/learn/cybersecurity", meta: "4 hours • Intermediate" },
        { id: "2", title: "HIPAA Compliance Training", description: "Privacy, Security, and Breach Notification", type: "course", href: "/learn/hipaa", meta: "3 hours • Beginner" },
        { id: "3", title: "AI & Prompt Engineering", description: "Master the CRAFT framework", type: "course", href: "/learn/prompt-engineering", meta: "2 hours • All levels", highlighted: true },
        { id: "4", title: "Leadership Development Path", description: "From IC to Manager", type: "path", href: "/paths/leadership", meta: "8 courses • 20 hours" },
        { id: "5", title: "Security Professional Certification", description: "Validate your security expertise", type: "certificate", href: "/certificates/security", meta: "80% passing score" },
    ];

    const recentSearches = ["cybersecurity", "hipaa training", "leadership"];
    const trendingSearches = ["AI prompting", "GDPR compliance", "remote team management"];

    // Debounced search
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            const filtered = mockResults.filter(
                (r) =>
                    r.title.toLowerCase().includes(query.toLowerCase()) ||
                    r.description.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 0);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleSearch = (searchTerm: string) => {
        setQuery(searchTerm);
        inputRef.current?.focus();
    };

    const handleResultClick = (result: SearchResult) => {
        router.push(result.href);
        setIsOpen(false);
        setQuery("");
    };

    const filters = [
        { id: "all", label: "All" },
        { id: "course", label: "Courses" },
        { id: "path", label: "Paths" },
        { id: "certificate", label: "Certificates" },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "course": return BookOpen;
            case "path": return TrendingUp;
            case "certificate": return Award;
            case "team": return Users;
            default: return BookOpen;
        }
    };

    const filteredResults = activeFilter && activeFilter !== "all"
        ? results.filter((r) => r.type === activeFilter)
        : results;

    return (
        <div className="relative flex-1 max-w-xl" ref={panelRef}>
            {/* Search Input */}
            <div
                className={cn(
                    "relative flex items-center gap-2 h-10 px-4 rounded-xl border transition-all",
                    isOpen
                        ? "border-primary bg-background ring-2 ring-primary/20"
                        : "border-border bg-background hover:border-white/20"
                )}
            >
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search courses, topics, or skills..."
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                />
                {query && (
                    <button onClick={() => setQuery("")} className="p-1 hover:bg-white/10 rounded">
                        <X className="h-3 w-3 text-muted-foreground" />
                    </button>
                )}
                <div className="flex items-center gap-1 pl-2 border-l border-border">
                    <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">/</kbd>
                    <span className="text-xs text-muted-foreground hidden sm:inline">to search</span>
                </div>
            </div>

            {/* Search Panel */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {/* Filters */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id === activeFilter ? null : filter.id)}
                                className={cn(
                                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                                    activeFilter === filter.id
                                        ? "bg-primary text-white"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {/* No query - show recent & trending */}
                        {!query && (
                            <div className="p-4 space-y-6">
                                {/* Recent Searches */}
                                <div>
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Clock className="h-3 w-3" />
                                        Recent Searches
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => handleSearch(term)}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-muted-foreground hover:bg-white/10 hover:text-white transition-all"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Trending */}
                                <div>
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <TrendingUp className="h-3 w-3" />
                                        Trending Now
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingSearches.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => handleSearch(term)}
                                                className="px-3 py-1.5 rounded-lg bg-primary/10 text-sm text-primary hover:bg-primary/20 transition-all"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* AI Creation CTA */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                            <Sparkles className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">Can't find what you need?</p>
                                            <p className="text-sm text-muted-foreground">Create custom training with AI</p>
                                        </div>
                                        <Link
                                            href="/create"
                                            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                        >
                                            Create
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Searching indicator */}
                        {isSearching && (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        )}

                        {/* Results */}
                        {query && !isSearching && filteredResults.length > 0 && (
                            <div className="py-2">
                                {filteredResults.map((result) => {
                                    const Icon = getTypeIcon(result.type);
                                    return (
                                        <button
                                            key={result.id}
                                            onClick={() => handleResultClick(result)}
                                            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-all text-left"
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                                result.highlighted ? "bg-primary/20" : "bg-white/5"
                                            )}>
                                                <Icon className={cn(
                                                    "h-5 w-5",
                                                    result.highlighted ? "text-primary" : "text-muted-foreground"
                                                )} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{result.title}</span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground capitalize">
                                                        {result.type}
                                                    </span>
                                                    {result.highlighted && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {result.description}
                                                </p>
                                                {result.meta && (
                                                    <p className="text-xs text-muted-foreground/60 mt-1">
                                                        {result.meta}
                                                    </p>
                                                )}
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* No results */}
                        {query && !isSearching && filteredResults.length === 0 && (
                            <div className="py-12 text-center">
                                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="font-medium mb-1">No results for "{query}"</p>
                                <p className="text-sm text-muted-foreground">Try different keywords or create custom content</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Press</span>
                            <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">⌘K</kbd>
                            <span>for commands</span>
                        </div>
                        <button
                            onClick={onOpenCommandPalette}
                            className="text-xs text-primary hover:underline"
                        >
                            Open command palette
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GlobalSearch;
