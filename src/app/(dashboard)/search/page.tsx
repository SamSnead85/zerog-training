"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search as SearchIcon,
    BookOpen,
    Award,
    Users,
    Target,
    Clock,
    Filter,
    X,
    ChevronRight,
    Sparkles,
    FileText,
    Video,
    HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { aiNativeCurriculum } from "@/lib/curriculum/ai-native-curriculum";

// =============================================================================
// SEARCH DATA
// =============================================================================

interface SearchResult {
    id: string;
    type: "module" | "lesson" | "certification" | "article" | "faq";
    title: string;
    description: string;
    url: string;
    tags: string[];
}

const searchData: SearchResult[] = [
    // Modules
    ...aiNativeCurriculum.map(m => ({
        id: m.id,
        type: "module" as const,
        title: m.title,
        description: m.description,
        url: `/training/${m.id}`,
        tags: ["module", "course", m.level || "foundations"],
    })),
    // Lessons
    { id: "lesson-1-1", type: "lesson", title: "What is AI? A Developer's Perspective", description: "Introduction to AI concepts for developers", url: "/lesson/module-1/1", tags: ["lesson", "ai", "fundamentals"] },
    { id: "lesson-1-2", type: "lesson", title: "Understanding LLM Architecture", description: "How transformers and attention mechanisms work", url: "/lesson/module-1/2", tags: ["lesson", "llm", "transformers"] },
    { id: "lesson-1-3", type: "lesson", title: "Prompt Engineering Fundamentals", description: "The CRISP framework and prompting techniques", url: "/lesson/module-1/3", tags: ["lesson", "prompts", "engineering"] },
    { id: "lesson-2-1", type: "lesson", title: "Introduction to RAG Architecture", description: "Retrieval-Augmented Generation explained", url: "/lesson/module-2/1", tags: ["lesson", "rag", "retrieval"] },
    { id: "lesson-2-2", type: "lesson", title: "Understanding Embeddings", description: "Vector embeddings and semantic search", url: "/lesson/module-2/2", tags: ["lesson", "embeddings", "vectors"] },
    { id: "lesson-2-3", type: "lesson", title: "Building a Vector Search Pipeline", description: "End-to-end RAG implementation", url: "/lesson/module-2/3", tags: ["lesson", "vector", "search"] },
    // Certifications
    { id: "cert-foundations", type: "certification", title: "AI-Native Foundations Certification", description: "Prove your understanding of AI fundamentals", url: "/certifications", tags: ["certification", "foundations"] },
    { id: "cert-associate", type: "certification", title: "AI-Native Associate Certification", description: "Demonstrate practical AI implementation skills", url: "/certifications", tags: ["certification", "associate"] },
    { id: "cert-professional", type: "certification", title: "AI-Native Professional Certification", description: "Expert-level AI architecture certification", url: "/certifications", tags: ["certification", "professional"] },
    // FAQs
    { id: "faq-1", type: "faq", title: "How do I get started?", description: "Take the skill assessment to get a personalized learning path", url: "/assessment", tags: ["faq", "getting started"] },
    { id: "faq-2", type: "faq", title: "How long does certification take?", description: "Typically 4-8 weeks depending on your experience level", url: "/certifications", tags: ["faq", "certification", "time"] },
    { id: "faq-3", type: "faq", title: "Can I download certificates?", description: "Yes, all certificates can be downloaded as PDF", url: "/certifications", tags: ["faq", "certificates", "download"] },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    module: BookOpen,
    lesson: Video,
    certification: Award,
    article: FileText,
    faq: HelpCircle,
};

const typeLabels: Record<string, string> = {
    module: "Course Module",
    lesson: "Lesson",
    certification: "Certification",
    article: "Article",
    faq: "FAQ",
};

// =============================================================================
// SEARCH PAGE
// =============================================================================

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        return searchData.filter(item => {
            const matchesQuery =
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery) ||
                item.tags.some(t => t.toLowerCase().includes(lowerQuery));

            const matchesType = !typeFilter || item.type === typeFilter;

            return matchesQuery && matchesType;
        });
    }, [query, typeFilter]);

    const resultsByType = useMemo(() => {
        const grouped: Record<string, SearchResult[]> = {};
        results.forEach(r => {
            if (!grouped[r.type]) grouped[r.type] = [];
            grouped[r.type].push(r);
        });
        return grouped;
    }, [results]);

    const suggestions = [
        "prompt engineering",
        "RAG",
        "embeddings",
        "certification",
        "getting started",
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-4xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <Link href="/catalog" className="text-sm text-white/60 hover:text-white transition-colors">
                        Browse Catalog
                    </Link>
                </div>
            </header>

            <main className="px-6 py-12 max-w-4xl mx-auto">
                {/* Search Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-3">Search</h1>
                    <p className="text-white/50">Find courses, lessons, certifications, and more</p>
                </div>

                {/* Search Input */}
                <div className="relative mb-6">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-lg focus:outline-none focus:border-white/20"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
                        >
                            <X className="h-4 w-4 text-white/40" />
                        </button>
                    )}
                </div>

                {/* Type Filters */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                    <button
                        onClick={() => setTypeFilter(null)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                            !typeFilter ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                        )}
                    >
                        All
                    </button>
                    {Object.keys(typeLabels).map(type => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                                typeFilter === type ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                            )}
                        >
                            {typeLabels[type]}
                        </button>
                    ))}
                </div>

                {/* Results */}
                {query ? (
                    results.length > 0 ? (
                        <div className="space-y-6">
                            {Object.entries(resultsByType).map(([type, items]) => (
                                <div key={type}>
                                    <h2 className="text-sm text-white/40 uppercase tracking-wider mb-3">
                                        {typeLabels[type]} ({items.length})
                                    </h2>
                                    <div className="space-y-2">
                                        {items.map(item => {
                                            const Icon = typeIcons[item.type];
                                            return (
                                                <Link key={item.id} href={item.url}>
                                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
                                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                                            <Icon className="h-5 w-5 text-white/60" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-medium truncate group-hover:text-white transition-colors">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-sm text-white/40 truncate">{item.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white/40 transition-colors" />
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <SearchIcon className="h-12 w-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40 mb-2">No results found for "{query}"</p>
                            <p className="text-sm text-white/30">Try different keywords or browse the catalog</p>
                        </div>
                    )
                ) : (
                    /* Suggestions */
                    <div>
                        <h2 className="text-sm text-white/40 uppercase tracking-wider mb-4">Popular searches</h2>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map(suggestion => (
                                <button
                                    key={suggestion}
                                    onClick={() => setQuery(suggestion)}
                                    className="px-4 py-2 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors"
                                >
                                    <Sparkles className="h-3 w-3 inline mr-2 text-white/40" />
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        {/* Quick Links */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/catalog">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition-colors">
                                    <BookOpen className="h-6 w-6 mb-3 text-white/60" />
                                    <h3 className="font-semibold mb-1">Browse Catalog</h3>
                                    <p className="text-sm text-white/40">Explore all courses and modules</p>
                                </div>
                            </Link>
                            <Link href="/assessment">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition-colors">
                                    <Target className="h-6 w-6 mb-3 text-white/60" />
                                    <h3 className="font-semibold mb-1">Skill Assessment</h3>
                                    <p className="text-sm text-white/40">Get a personalized learning path</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
