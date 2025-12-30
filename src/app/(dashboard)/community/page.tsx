"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    MessageSquare,
    TrendingUp,
    Award,
    Calendar,
    ExternalLink,
    Heart,
    MessageCircle,
    Eye,
    Pin,
    ChevronRight,
    Plus,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// COMMUNITY DATA
// =============================================================================

interface ForumPost {
    id: string;
    title: string;
    author: string;
    avatar: string;
    category: string;
    replies: number;
    views: number;
    likes: number;
    time: string;
    pinned?: boolean;
}

const forumPosts: ForumPost[] = [
    { id: "1", title: "Best practices for prompt engineering in production", author: "Sarah Chen", avatar: "SC", category: "Technical", replies: 24, views: 1250, likes: 45, time: "2 hours ago", pinned: true },
    { id: "2", title: "How I passed the Professional certification on first try", author: "Michael J", avatar: "MJ", category: "Certifications", replies: 18, views: 890, likes: 32, time: "5 hours ago", pinned: true },
    { id: "3", title: "RAG vs Fine-tuning: When to use which?", author: "Emily W", avatar: "EW", category: "Technical", replies: 31, views: 2100, likes: 67, time: "1 day ago" },
    { id: "4", title: "Study group for Associate certification", author: "David K", avatar: "DK", category: "Study Groups", replies: 12, views: 340, likes: 8, time: "1 day ago" },
    { id: "5", title: "My journey from zero to AI-Native Architect", author: "Lisa P", avatar: "LP", category: "Success Stories", replies: 45, views: 3200, likes: 112, time: "2 days ago" },
    { id: "6", title: "Building agents with LangChain vs CrewAI", author: "James W", avatar: "JW", category: "Technical", replies: 28, views: 1800, likes: 54, time: "3 days ago" },
];

const categories = ["All", "Technical", "Certifications", "Study Groups", "Success Stories", "Announcements"];

const upcomingEvents = [
    { title: "Live Q&A: Prompt Engineering", date: "Jan 5, 2025", time: "2:00 PM EST" },
    { title: "Workshop: Building RAG Systems", date: "Jan 12, 2025", time: "1:00 PM EST" },
    { title: "Certification Prep Session", date: "Jan 15, 2025", time: "3:00 PM EST" },
];

const topContributors = [
    { name: "Sarah Chen", avatar: "SC", points: 4820, rank: 1 },
    { name: "Michael J", avatar: "MJ", points: 4650, rank: 2 },
    { name: "Emily W", avatar: "EW", points: 4420, rank: 3 },
];

// =============================================================================
// COMMUNITY PAGE
// =============================================================================

export default function CommunityPage() {
    const [category, setCategory] = useState("All");

    const filteredPosts = category === "All"
        ? forumPosts
        : forumPosts.filter(p => p.category === category);

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
                        <Link href="/leaderboard" className="text-sm text-white/60 hover:text-white transition-colors">Leaderboard</Link>
                        <Link href="/community" className="text-sm text-white font-medium">Community</Link>
                    </nav>
                    <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Post
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="py-12 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <Users className="h-10 w-10 text-white/40" />
                        <div>
                            <h1 className="text-2xl font-bold">Community</h1>
                            <p className="text-white/50">Learn together, grow together</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-white/40">
                        <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            12,450 members
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            3,200 discussions
                        </span>
                        <span className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            450 this week
                        </span>
                    </div>
                </div>
            </section>

            <main className="px-6 py-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Category Tabs */}
                        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                                        category === cat
                                            ? "bg-white text-black"
                                            : "bg-white/5 hover:bg-white/10"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Posts */}
                        <div className="space-y-3">
                            {filteredPosts.map(post => (
                                <div key={post.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {post.pinned && (
                                                    <Pin className="h-3 w-3 text-yellow-400" />
                                                )}
                                                <h3 className="font-medium truncate">{post.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-white/40">
                                                <span>{post.author}</span>
                                                <span className="px-2 py-0.5 bg-white/5 rounded">{post.category}</span>
                                                <span>{post.time}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                                                <span className="flex items-center gap-1">
                                                    <MessageCircle className="h-3 w-3" />
                                                    {post.replies}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {post.views}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Heart className="h-3 w-3" />
                                                    {post.likes}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Upcoming Events */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-white/40" />
                                <h2 className="font-semibold">Upcoming Events</h2>
                            </div>
                            <div className="space-y-4">
                                {upcomingEvents.map((event, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xs flex-shrink-0">
                                            <Sparkles className="h-4 w-4 text-white/40" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{event.title}</p>
                                            <p className="text-xs text-white/40">{event.date} · {event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">
                                View All Events
                            </button>
                        </div>

                        {/* Top Contributors */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <Award className="h-5 w-5 text-white/40" />
                                <h2 className="font-semibold">Top Contributors</h2>
                            </div>
                            <div className="space-y-3">
                                {topContributors.map((user, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-sm text-white/30 w-4">#{user.rank}</span>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{user.name}</p>
                                        </div>
                                        <span className="text-xs text-white/40">{user.points.toLocaleString()} pts</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/leaderboard">
                                <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">
                                    View Leaderboard
                                </button>
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
                            <h2 className="font-semibold mb-4">Community Guidelines</h2>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li>• Be respectful and constructive</li>
                                <li>• Share knowledge freely</li>
                                <li>• No spam or self-promotion</li>
                                <li>• Help others learn</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
