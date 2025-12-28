"use client";

/**
 * Search Highlighting Component
 * 
 * Highlights matching text in search results with
 * customizable styling and fuzzy matching support.
 */

import { useMemo } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface HighlightProps {
    text: string;
    query: string;
    className?: string;
    highlightClassName?: string;
    caseSensitive?: boolean;
    fuzzy?: boolean;
}

// =============================================================================
// HIGHLIGHT COMPONENT
// =============================================================================

export function Highlight({
    text,
    query,
    className,
    highlightClassName = "bg-primary/30 text-primary font-medium px-0.5 rounded",
    caseSensitive = false,
    fuzzy = false,
}: HighlightProps) {
    const parts = useMemo(() => {
        if (!query || query.length === 0) {
            return [{ text, highlighted: false }];
        }

        if (fuzzy) {
            return fuzzyHighlight(text, query, caseSensitive);
        }

        return exactHighlight(text, query, caseSensitive);
    }, [text, query, caseSensitive, fuzzy]);

    return (
        <span className={className}>
            {parts.map((part, index) => (
                part.highlighted ? (
                    <mark key={index} className={highlightClassName}>
                        {part.text}
                    </mark>
                ) : (
                    <span key={index}>{part.text}</span>
                )
            ))}
        </span>
    );
}

// =============================================================================
// EXACT MATCH HIGHLIGHTING
// =============================================================================

interface HighlightPart {
    text: string;
    highlighted: boolean;
}

function exactHighlight(text: string, query: string, caseSensitive: boolean): HighlightPart[] {
    const parts: HighlightPart[] = [];
    const searchText = caseSensitive ? text : text.toLowerCase();
    const searchQuery = caseSensitive ? query : query.toLowerCase();

    let lastIndex = 0;
    let index = searchText.indexOf(searchQuery);

    while (index !== -1) {
        // Add non-matching part before this match
        if (index > lastIndex) {
            parts.push({
                text: text.slice(lastIndex, index),
                highlighted: false,
            });
        }

        // Add matching part
        parts.push({
            text: text.slice(index, index + query.length),
            highlighted: true,
        });

        lastIndex = index + query.length;
        index = searchText.indexOf(searchQuery, lastIndex);
    }

    // Add remaining non-matching part
    if (lastIndex < text.length) {
        parts.push({
            text: text.slice(lastIndex),
            highlighted: false,
        });
    }

    return parts;
}

// =============================================================================
// FUZZY MATCH HIGHLIGHTING
// =============================================================================

function fuzzyHighlight(text: string, query: string, caseSensitive: boolean): HighlightPart[] {
    const parts: HighlightPart[] = [];
    const searchText = caseSensitive ? text : text.toLowerCase();
    const searchQuery = caseSensitive ? query : query.toLowerCase();

    let queryIndex = 0;
    let currentPart = "";
    let isHighlighted = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const searchChar = searchText[i];

        if (queryIndex < searchQuery.length && searchChar === searchQuery[queryIndex]) {
            // This character matches
            if (!isHighlighted && currentPart) {
                parts.push({ text: currentPart, highlighted: false });
                currentPart = "";
            }
            isHighlighted = true;
            currentPart += char;
            queryIndex++;
        } else {
            // This character doesn't match
            if (isHighlighted && currentPart) {
                parts.push({ text: currentPart, highlighted: true });
                currentPart = "";
            }
            isHighlighted = false;
            currentPart += char;
        }
    }

    // Add remaining part
    if (currentPart) {
        parts.push({ text: currentPart, highlighted: isHighlighted });
    }

    return parts;
}

// =============================================================================
// SEARCH INPUT WITH HIGHLIGHTING PREVIEW
// =============================================================================

interface SearchHighlightPreviewProps {
    items: { id: string; text: string;[key: string]: unknown }[];
    query: string;
    onSelect: (id: string) => void;
    className?: string;
    maxResults?: number;
}

export function SearchHighlightPreview({
    items,
    query,
    onSelect,
    className,
    maxResults = 10,
}: SearchHighlightPreviewProps) {
    const filteredItems = useMemo(() => {
        if (!query) return [];

        const lowerQuery = query.toLowerCase();
        return items
            .filter((item) => item.text.toLowerCase().includes(lowerQuery))
            .slice(0, maxResults);
    }, [items, query, maxResults]);

    if (!query || filteredItems.length === 0) {
        return null;
    }

    return (
        <div className={cn("rounded-xl border border-white/10 bg-background shadow-lg overflow-hidden", className)}>
            {filteredItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                >
                    <Highlight text={item.text} query={query} />
                </button>
            ))}
        </div>
    );
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if text matches query (exact or fuzzy)
 */
export function matchesQuery(text: string, query: string, fuzzy: boolean = false): boolean {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    if (fuzzy) {
        let queryIndex = 0;
        for (const char of lowerText) {
            if (char === lowerQuery[queryIndex]) {
                queryIndex++;
            }
            if (queryIndex === lowerQuery.length) {
                return true;
            }
        }
        return false;
    }

    return lowerText.includes(lowerQuery);
}

/**
 * Get match score for sorting results
 */
export function getMatchScore(text: string, query: string): number {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // Exact match at start
    if (lowerText.startsWith(lowerQuery)) return 100;

    // Word starts with query
    const words = lowerText.split(/\s+/);
    if (words.some((word) => word.startsWith(lowerQuery))) return 80;

    // Contains query
    if (lowerText.includes(lowerQuery)) return 60;

    // Fuzzy match
    let queryIndex = 0;
    for (const char of lowerText) {
        if (char === lowerQuery[queryIndex]) {
            queryIndex++;
        }
    }
    if (queryIndex === lowerQuery.length) {
        return 40 - (lowerText.length - lowerQuery.length); // Shorter texts rank higher
    }

    return 0;
}

export default {
    Highlight,
    SearchHighlightPreview,
    matchesQuery,
    getMatchScore,
};
