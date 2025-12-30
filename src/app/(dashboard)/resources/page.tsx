"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Download,
    Video,
    BookOpen,
    Code,
    ExternalLink,
    Search,
    Filter,
    Star,
    Clock,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// RESOURCES DATA
// =============================================================================

interface Resource {
    id: string;
    title: string;
    description: string;
    type: "pdf" | "video" | "template" | "code" | "ebook";
    category: string;
    downloadUrl?: string;
    externalUrl?: string;
    size?: string;
    duration?: string;
    downloads?: number;
    featured?: boolean;
}

const resources: Resource[] = [
    // Featured
    { id: "1", title: "AI-Native Transformation Playbook", description: "Comprehensive 50-page guide to becoming an AI-native organization", type: "pdf", category: "Guides", size: "4.2 MB", downloads: 12500, featured: true },
    { id: "2", title: "Prompt Engineering Cheat Sheet", description: "Quick reference for all prompting techniques covered in the curriculum", type: "pdf", category: "Cheat Sheets", size: "1.8 MB", downloads: 28000, featured: true },
    { id: "3", title: "RAG Architecture Templates", description: "Production-ready code templates for building RAG systems", type: "code", category: "Templates", downloads: 8200, featured: true },

    // PDFs
    { id: "4", title: "LLM Comparison Guide 2025", description: "Side-by-side comparison of GPT-4, Claude, Gemini, and more", type: "pdf", category: "Guides", size: "2.1 MB", downloads: 15400 },
    { id: "5", title: "AI Security Checklist", description: "Pre-deployment security checklist for AI applications", type: "pdf", category: "Cheat Sheets", size: "890 KB", downloads: 9800 },
    { id: "6", title: "Certification Study Guide", description: "Comprehensive study materials for all certification tracks", type: "pdf", category: "Study Materials", size: "8.5 MB", downloads: 22000 },

    // Videos
    { id: "7", title: "Building Your First AI Agent", description: "Step-by-step video tutorial on agent development", type: "video", category: "Tutorials", duration: "45 min", downloads: 6700 },
    { id: "8", title: "RAG Deep Dive Workshop", description: "2-hour workshop recording on advanced RAG techniques", type: "video", category: "Workshops", duration: "2 hr", downloads: 4200 },
    { id: "9", title: "AI Ethics Panel Discussion", description: "Industry experts discuss responsible AI development", type: "video", category: "Events", duration: "1 hr 15 min", downloads: 3100 },

    // Templates
    { id: "10", title: "AI Project Proposal Template", description: "Template for proposing AI initiatives to leadership", type: "template", category: "Business", size: "245 KB", downloads: 7600 },
    { id: "11", title: "Prompt Library Starter Kit", description: "100+ tested prompts organized by use case", type: "template", category: "Templates", downloads: 18500 },
    { id: "12", title: "AI Governance Framework", description: "Customizable governance policy templates", type: "template", category: "Business", downloads: 5400 },

    // Code
    { id: "13", title: "LangChain Starter Project", description: "Boilerplate project for LangChain applications", type: "code", category: "Templates", downloads: 11200 },
    { id: "14", title: "Evaluation Harness", description: "Test harness for evaluating LLM outputs", type: "code", category: "Tools", downloads: 4800 },
    { id: "15", title: "Embedding Pipeline Example", description: "Complete embedding pipeline with ChromaDB", type: "code", category: "Examples", downloads: 6300 },
];

const categories = ["All", "Guides", "Cheat Sheets", "Templates", "Tutorials", "Business", "Tools"];
const types = ["All Types", "pdf", "video", "template", "code"];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    pdf: FileText,
    video: Video,
    template: BookOpen,
    code: Code,
    ebook: BookOpen,
};

const typeLabels: Record<string, string> = {
    pdf: "PDF",
    video: "Video",
    template: "Template",
    code: "Code",
    ebook: "eBook",
};

// =============================================================================
// RESOURCES PAGE
// =============================================================================

export default function ResourcesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [type, setType] = useState("All Types");

    const filteredResources = resources.filter(r => {
        const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || r.category === category;
        const matchesType = type === "All Types" || r.type === type;
        return matchesSearch && matchesCategory && matchesType;
    });

    const featuredResources = resources.filter(r => r.featured);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-6xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/catalog" className="text-sm text-white/60 hover:text-white transition-colors">Catalog</Link>
                        <Link href="/resources" className="text-sm text-white font-medium">Resources</Link>
                        <Link href="/community" className="text-sm text-white/60 hover:text-white transition-colors">Community</Link>
                    </nav>
                </div>
            </header>

            <main className="px-6 py-12 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-3">Resources</h1>
                    <p className="text-white/50">Templates, guides, and tools to accelerate your AI journey</p>
                </div>

                {/* Featured */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        Featured Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {featuredResources.map(resource => {
                            const Icon = typeIcons[resource.type];
                            return (
                                <div key={resource.id} className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 hover:border-white/20 transition-colors group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs px-2 py-1 bg-white/10 rounded">{typeLabels[resource.type]}</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">{resource.title}</h3>
                                    <p className="text-sm text-white/50 mb-4">{resource.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/30">{resource.downloads?.toLocaleString()} downloads</span>
                                        <button className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                                    category === cat ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResources.map(resource => {
                        const Icon = typeIcons[resource.type];
                        return (
                            <div key={resource.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="h-5 w-5 text-white/60" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-medium text-sm truncate">{resource.title}</h3>
                                            <span className="text-xs text-white/30 whitespace-nowrap">{typeLabels[resource.type]}</span>
                                        </div>
                                        <p className="text-xs text-white/40 line-clamp-2 mb-3">{resource.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/30">
                                                {resource.size || resource.duration || `${resource.downloads?.toLocaleString()} downloads`}
                                            </span>
                                            <button className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                                                <Download className="h-3 w-3" />
                                                Get
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40">No resources found matching your criteria</p>
                    </div>
                )}
            </main>
        </div>
    );
}
