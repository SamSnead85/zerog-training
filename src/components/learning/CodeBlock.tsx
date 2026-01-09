"use client";

import { useState, useCallback } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}

// Simple syntax highlighting by token type
const tokenize = (code: string, language: string) => {
    const tokens: { type: string; value: string }[] = [];

    // Language-specific keyword patterns
    const keywords: Record<string, string[]> = {
        javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined'],
        typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined', 'interface', 'type', 'extends', 'implements'],
        python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'as', 'try', 'except', 'raise', 'with', 'lambda', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'async', 'await'],
        sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'IN', 'LIKE', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT'],
    };

    const langKeywords = keywords[language] || keywords.javascript;

    // Split by lines for processing
    const lines = code.split('\n');

    return lines.map(line => {
        const lineTokens: { type: string; value: string }[] = [];
        let remaining = line;

        while (remaining.length > 0) {
            // Comments
            if (remaining.startsWith('//') || remaining.startsWith('#')) {
                lineTokens.push({ type: 'comment', value: remaining });
                remaining = '';
                continue;
            }

            // Strings (single, double, backticks)
            const stringMatch = remaining.match(/^(['"`])(?:\\.|[^\\])*?\1/);
            if (stringMatch) {
                lineTokens.push({ type: 'string', value: stringMatch[0] });
                remaining = remaining.slice(stringMatch[0].length);
                continue;
            }

            // Numbers
            const numberMatch = remaining.match(/^\d+\.?\d*/);
            if (numberMatch) {
                lineTokens.push({ type: 'number', value: numberMatch[0] });
                remaining = remaining.slice(numberMatch[0].length);
                continue;
            }

            // Keywords and identifiers
            const wordMatch = remaining.match(/^[a-zA-Z_]\w*/);
            if (wordMatch) {
                const word = wordMatch[0];
                const type = langKeywords.includes(word) ? 'keyword' : 'identifier';
                lineTokens.push({ type, value: word });
                remaining = remaining.slice(word.length);
                continue;
            }

            // Operators and punctuation
            const opMatch = remaining.match(/^[+\-*/%=<>!&|^~?:;,.()[\]{}]+/);
            if (opMatch) {
                lineTokens.push({ type: 'punctuation', value: opMatch[0] });
                remaining = remaining.slice(opMatch[0].length);
                continue;
            }

            // Whitespace
            const wsMatch = remaining.match(/^\s+/);
            if (wsMatch) {
                lineTokens.push({ type: 'whitespace', value: wsMatch[0] });
                remaining = remaining.slice(wsMatch[0].length);
                continue;
            }

            // Fallback: single character
            lineTokens.push({ type: 'text', value: remaining[0] });
            remaining = remaining.slice(1);
        }

        return lineTokens;
    });
};

const tokenColors: Record<string, string> = {
    keyword: 'text-purple-400',
    string: 'text-emerald-400',
    number: 'text-amber-400',
    comment: 'text-white/40 italic',
    identifier: 'text-blue-300',
    punctuation: 'text-white/60',
    whitespace: '',
    text: 'text-white/80',
};

export function CodeBlock({
    code,
    language = 'javascript',
    title,
    showLineNumbers = true,
    collapsible = false,
    defaultCollapsed = false,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [code]);

    const tokenizedLines = tokenize(code.trim(), language);
    const lineCount = tokenizedLines.length;

    return (
        <div className="group relative my-4 rounded-xl overflow-hidden border border-white/10 bg-black/40">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    {/* Language badge */}
                    <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                        {language}
                    </span>
                    {title && (
                        <span className="text-sm text-white/70">{title}</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {collapsible && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                        >
                            {collapsed ? (
                                <ChevronDown className="h-4 w-4 text-white/50" />
                            ) : (
                                <ChevronUp className="h-4 w-4 text-white/50" />
                            )}
                        </button>
                    )}
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all",
                            copied
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "hover:bg-white/10 text-white/50 hover:text-white/80"
                        )}
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code content */}
            {!collapsed && (
                <div className="overflow-x-auto">
                    <pre className="p-4 text-sm font-mono leading-relaxed">
                        <code>
                            {tokenizedLines.map((lineTokens, lineIndex) => (
                                <div key={lineIndex} className="flex">
                                    {showLineNumbers && (
                                        <span className="select-none w-8 pr-4 text-right text-white/20 text-xs">
                                            {lineIndex + 1}
                                        </span>
                                    )}
                                    <span className="flex-1">
                                        {lineTokens.map((token, tokenIndex) => (
                                            <span
                                                key={tokenIndex}
                                                className={tokenColors[token.type] || ''}
                                            >
                                                {token.value}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>
            )}

            {/* Collapsed indicator */}
            {collapsed && (
                <div className="px-4 py-3 text-sm text-white/40 flex items-center gap-2">
                    <span>{lineCount} lines</span>
                    <span>•</span>
                    <span>Click to expand</span>
                </div>
            )}
        </div>
    );
}

// Utility to estimate reading time
export function estimateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes === 1 ? '1 min read' : `${minutes} min read`;
}

// Reading progress indicator component
export function ReadingProgressBar({ progress }: { progress: number }) {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
            <div
                className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-150"
                style={{ width: `${Math.min(progress, 100)}%` }}
            />
        </div>
    );
}

// Section navigation component
export function SectionNav({
    sections,
    currentIndex,
    completedIds,
    onNavigate,
}: {
    sections: { id: string; title: string }[];
    currentIndex: number;
    completedIds: Set<string>;
    onNavigate: (index: number) => void;
}) {
    return (
        <nav className="sticky top-4 space-y-1">
            {sections.map((section, index) => (
                <button
                    key={section.id}
                    onClick={() => onNavigate(index)}
                    className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2",
                        currentIndex === index
                            ? "bg-primary/20 text-white font-medium"
                            : completedIds.has(section.id)
                                ? "text-emerald-400/80 hover:bg-white/5"
                                : "text-white/50 hover:bg-white/5 hover:text-white/80"
                    )}
                >
                    <span className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                        currentIndex === index
                            ? "bg-primary text-white"
                            : completedIds.has(section.id)
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-white/10 text-white/50"
                    )}>
                        {completedIds.has(section.id) ? '✓' : index + 1}
                    </span>
                    <span className="truncate">{section.title}</span>
                </button>
            ))}
        </nav>
    );
}
