"use client";

import { useState } from "react";
import Link from "next/link";
import {
    HelpCircle,
    Search,
    BookOpen,
    CreditCard,
    Users,
    Settings,
    Award,
    MessageCircle,
    ChevronRight,
    Mail,
    Phone,
    ExternalLink,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// HELP CENTER DATA
// =============================================================================

interface HelpCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    articles: { title: string; url: string }[];
}

const helpCategories: HelpCategory[] = [
    {
        id: "getting-started",
        title: "Getting Started",
        description: "New to ScaledNative? Start here.",
        icon: BookOpen,
        articles: [
            { title: "How to create your account", url: "/help/create-account" },
            { title: "Taking the skill assessment", url: "/help/skill-assessment" },
            { title: "Choosing your first course", url: "/help/first-course" },
            { title: "Understanding learning paths", url: "/help/learning-paths" },
            { title: "Setting learning goals", url: "/help/goals" },
        ],
    },
    {
        id: "billing",
        title: "Billing & Subscriptions",
        description: "Manage your plan and payments.",
        icon: CreditCard,
        articles: [
            { title: "Available plans and pricing", url: "/help/pricing" },
            { title: "How to upgrade your plan", url: "/help/upgrade" },
            { title: "Managing payment methods", url: "/help/payment" },
            { title: "Requesting a refund", url: "/help/refund" },
            { title: "Enterprise billing FAQ", url: "/help/enterprise-billing" },
        ],
    },
    {
        id: "certifications",
        title: "Certifications",
        description: "Earn and manage your credentials.",
        icon: Award,
        articles: [
            { title: "Certification requirements", url: "/help/cert-requirements" },
            { title: "How exams work", url: "/help/exams" },
            { title: "Downloading certificates", url: "/help/download-cert" },
            { title: "Sharing on LinkedIn", url: "/help/linkedin" },
            { title: "Certificate verification", url: "/help/verification" },
        ],
    },
    {
        id: "teams",
        title: "Teams & Enterprise",
        description: "Manage team learning.",
        icon: Users,
        articles: [
            { title: "Setting up your organization", url: "/help/org-setup" },
            { title: "Adding team members", url: "/help/add-members" },
            { title: "Admin dashboard guide", url: "/help/admin-guide" },
            { title: "Tracking team progress", url: "/help/team-progress" },
            { title: "Custom content requests", url: "/help/custom-content" },
        ],
    },
    {
        id: "account",
        title: "Account & Settings",
        description: "Manage your profile and preferences.",
        icon: Settings,
        articles: [
            { title: "Updating your profile", url: "/help/profile" },
            { title: "Notification preferences", url: "/help/notifications" },
            { title: "Privacy settings", url: "/help/privacy" },
            { title: "Changing your password", url: "/help/password" },
            { title: "Deleting your account", url: "/help/delete-account" },
        ],
    },
    {
        id: "technical",
        title: "Technical Support",
        description: "Troubleshoot issues.",
        icon: HelpCircle,
        articles: [
            { title: "Browser requirements", url: "/help/browser" },
            { title: "Video playback issues", url: "/help/video" },
            { title: "Code editor not loading", url: "/help/code-editor" },
            { title: "Mobile app troubleshooting", url: "/help/mobile" },
            { title: "Reporting a bug", url: "/help/bug-report" },
        ],
    },
];

const popularArticles = [
    { title: "How to get started", category: "Getting Started" },
    { title: "Certification requirements", category: "Certifications" },
    { title: "Adding team members", category: "Teams" },
    { title: "How exams work", category: "Certifications" },
];

// =============================================================================
// HELP CENTER PAGE
// =============================================================================

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const currentCategory = helpCategories.find(c => c.id === selectedCategory);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-5xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                        Contact Support
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="py-16 px-6 bg-gradient-to-b from-purple-500/5 to-transparent border-b border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <HelpCircle className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-4">How can we help?</h1>

                    {/* Search */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-lg focus:outline-none focus:border-white/20"
                        />
                    </div>
                </div>
            </section>

            <main className="px-6 py-12 max-w-5xl mx-auto">
                {!selectedCategory ? (
                    <>
                        {/* Categories Grid */}
                        <section className="mb-16">
                            <h2 className="text-xl font-semibold mb-6">Browse by topic</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {helpCategories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-left hover:bg-white/5 transition-colors group"
                                    >
                                        <category.icon className="h-8 w-8 text-white/40 mb-4 group-hover:text-white/60 transition-colors" />
                                        <h3 className="font-semibold mb-1">{category.title}</h3>
                                        <p className="text-sm text-white/40">{category.description}</p>
                                        <p className="text-xs text-white/30 mt-3">{category.articles.length} articles</p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Popular Articles */}
                        <section className="mb-16">
                            <h2 className="text-xl font-semibold mb-6">Popular articles</h2>
                            <div className="space-y-2">
                                {popularArticles.map((article, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="h-4 w-4 text-white/30" />
                                            <span>{article.title}</span>
                                        </div>
                                        <span className="text-xs text-white/30">{article.category}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Contact Options */}
                        <section>
                            <h2 className="text-xl font-semibold mb-6">Still need help?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/contact">
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition-colors">
                                        <Mail className="h-8 w-8 text-white/40 mb-4" />
                                        <h3 className="font-semibold mb-1">Email Support</h3>
                                        <p className="text-sm text-white/40">Get a response within 24 hours</p>
                                    </div>
                                </Link>
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <MessageCircle className="h-8 w-8 text-white/40 mb-4" />
                                    <h3 className="font-semibold mb-1">Live Chat</h3>
                                    <p className="text-sm text-white/40">Available Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    /* Category Detail View */
                    <>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-1 text-sm text-white/40 hover:text-white mb-6"
                        >
                            ← Back to all topics
                        </button>

                        {currentCategory && (
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <currentCategory.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">{currentCategory.title}</h1>
                                        <p className="text-white/50">{currentCategory.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {currentCategory.articles.map((article, i) => (
                                        <Link key={i} href={article.url}>
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
                                                <span>{article.title}</span>
                                                <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white/40 transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
