"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ReadingProgressProps {
    contentRef: React.RefObject<HTMLElement | null>;
    showLabel?: boolean;
}

export function ReadingProgress({ contentRef, showLabel = false }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            if (!contentRef.current) return;

            const element = contentRef.current;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = element.scrollHeight;

            // Calculate how much of the element is visible/scrolled past
            const scrolled = Math.max(0, -rect.top);
            const totalScrollable = elementHeight - windowHeight;

            if (totalScrollable <= 0) {
                setProgress(100);
            } else {
                const percent = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
                setProgress(percent);
            }
        };

        window.addEventListener("scroll", calculateProgress);
        calculateProgress();

        return () => window.removeEventListener("scroll", calculateProgress);
    }, [contentRef]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="h-1 bg-transparent">
                <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>
            {showLabel && progress > 0 && progress < 100 && (
                <div className="absolute top-2 right-4 px-2 py-1 rounded bg-card/80 backdrop-blur-sm text-xs">
                    {Math.round(progress)}%
                </div>
            )}
        </div>
    );
}

// Estimated reading time component
export function ReadingTime({ content, wordsPerMinute = 200 }: { content: string; wordsPerMinute?: number }) {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return (
        <span className="text-muted-foreground text-sm">
            {minutes} min read
        </span>
    );
}

// Table of contents from heading elements
interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ contentRef }: { contentRef: React.RefObject<HTMLElement | null> }) {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        if (!contentRef.current) return;

        const headings = contentRef.current.querySelectorAll("h2, h3");
        const tocItems: TOCItem[] = [];

        headings.forEach((heading, i) => {
            const id = heading.id || `heading-${i}`;
            if (!heading.id) heading.id = id;

            tocItems.push({
                id,
                text: heading.textContent || "",
                level: parseInt(heading.tagName[1]),
            });
        });

        setItems(tocItems);
    }, [contentRef]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0% -70% 0%" }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                On This Page
            </p>
            {items.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                        "block text-sm py-1 transition-colors",
                        item.level === 3 && "pl-3",
                        activeId === item.id
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {item.text}
                </a>
            ))}
        </nav>
    );
}
