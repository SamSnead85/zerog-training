"use client";

import Link from "next/link";
import {
    Sparkles,
    BookOpen,
    Zap,
    Shield,
    Users,
    Award,
    LayoutDashboard,
    Bell,
    Bug,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// CHANGELOG DATA
// =============================================================================

interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    description: string;
    type: "major" | "feature" | "improvement" | "fix";
    changes: string[];
}

const changelog: ChangelogEntry[] = [
    {
        version: "2.5.0",
        date: "December 30, 2024",
        title: "AI Security & Ethics Module",
        description: "Complete Module 4 curriculum covering AI security, responsible AI, and governance compliance.",
        type: "major",
        changes: [
            "New lesson: AI Security Fundamentals with prompt injection defense",
            "New lesson: Responsible AI Principles covering bias and transparency",
            "New lesson: AI Governance & Compliance with EU AI Act coverage",
            "Interactive quizzes for all Module 4 content",
            "Code examples for secure AI development",
        ],
    },
    {
        version: "2.4.0",
        date: "December 30, 2024",
        title: "Help Center & Community",
        description: "Comprehensive support resources and community features for learners.",
        type: "major",
        changes: [
            "Help Center with 6 topic categories and 30+ articles",
            "Community forum with discussion posts and events",
            "FAQ page with 18 comprehensive Q&As",
            "Top contributors leaderboard",
            "Upcoming events sidebar",
        ],
    },
    {
        version: "2.3.0",
        date: "December 30, 2024",
        title: "Demo Booking & Search",
        description: "New booking wizard and global search functionality.",
        type: "feature",
        changes: [
            "3-step demo booking wizard",
            "Date and time slot selection",
            "Global search across all content",
            "Search filters by content type",
            "Module 3 content: AI Agents (3 lessons)",
        ],
    },
    {
        version: "2.2.0",
        date: "December 29, 2024",
        title: "Achievements & Notifications",
        description: "Gamification and communication features for enhanced engagement.",
        type: "feature",
        changes: [
            "Achievements page with 15 badges across 4 categories",
            "Rarity levels: Common, Rare, Epic, Legendary",
            "Notifications center with filtering",
            "Contact form with inquiry types",
            "Module 2 content: RAG & Embeddings (3 lessons)",
        ],
    },
    {
        version: "2.1.0",
        date: "December 29, 2024",
        title: "User Dashboard Enhancements",
        description: "Comprehensive personal dashboards and settings.",
        type: "feature",
        changes: [
            "My Progress page with animated progress ring",
            "User Profile with badges and certifications",
            "Settings page with 5 configuration tabs",
            "Weekly goal tracking",
            "AI Assistant integration on user pages",
        ],
    },
    {
        version: "2.0.0",
        date: "December 29, 2024",
        title: "Enterprise Platform Launch",
        description: "Major release with pricing, gamification, and enterprise features.",
        type: "major",
        changes: [
            "3-tier pricing page with feature comparison",
            "Gamified leaderboard with podium display",
            "Enterprise landing page",
            "Admin executive dashboard",
            "AI Assistant floating chat",
        ],
    },
    {
        version: "1.5.0",
        date: "December 28, 2024",
        title: "Certification System",
        description: "Complete certification and assessment infrastructure.",
        type: "feature",
        changes: [
            "Certifications page with 4 tracks",
            "Certificate verification portal",
            "Skill assessment wizard",
            "Personalized learning path recommendations",
        ],
    },
    {
        version: "1.0.0",
        date: "December 27, 2024",
        title: "Initial Platform Release",
        description: "Foundation of the AI-Native training platform.",
        type: "major",
        changes: [
            "Course catalog with search and filters",
            "Interactive lesson system",
            "Quiz component with scoring",
            "Code editor with execution simulation",
            "Video player with transcripts",
            "Module 1 content: AI Foundations (3 lessons)",
        ],
    },
];

const typeColors: Record<string, string> = {
    major: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    feature: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    improvement: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    fix: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const typeLabels: Record<string, string> = {
    major: "Major Release",
    feature: "New Feature",
    improvement: "Improvement",
    fix: "Bug Fix",
};

// =============================================================================
// CHANGELOG PAGE
// =============================================================================

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-4xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <Link href="/help" className="text-sm text-white/60 hover:text-white transition-colors">
                        Help Center
                    </Link>
                </div>
            </header>

            <main className="px-6 py-12 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="h-8 w-8 text-purple-400" />
                        <h1 className="text-3xl font-bold">Changelog</h1>
                    </div>
                    <p className="text-white/50">
                        Stay up to date with the latest improvements and new features
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-8">
                        {changelog.map((entry, i) => (
                            <div key={entry.version} className="relative pl-12">
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-white/60" />
                                </div>

                                {/* Content */}
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-lg font-mono font-bold">v{entry.version}</span>
                                        <span className={cn(
                                            "px-2 py-0.5 text-xs rounded-full border",
                                            typeColors[entry.type]
                                        )}>
                                            {typeLabels[entry.type]}
                                        </span>
                                        <span className="text-sm text-white/30 ml-auto">{entry.date}</span>
                                    </div>

                                    <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
                                    <p className="text-white/50 mb-4">{entry.description}</p>

                                    <ul className="space-y-2">
                                        {entry.changes.map((change, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                                                <ChevronRight className="h-4 w-4 mt-0.5 text-white/30 flex-shrink-0" />
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscribe */}
                <div className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 text-center">
                    <Bell className="h-8 w-8 text-white/40 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Get notified of updates</h3>
                    <p className="text-sm text-white/50 mb-4">Subscribe to our newsletter for product updates</p>
                    <div className="flex max-w-md mx-auto gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                        />
                        <button className="px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
