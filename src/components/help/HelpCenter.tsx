"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Search,
    Book,
    MessageCircle,
    Video,
    FileText,
    ChevronRight,
    ExternalLink,
    Mail,
    Phone,
    HelpCircle,
    Lightbulb,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HelpArticle {
    id: string;
    title: string;
    category: string;
    views: number;
}

interface FAQ {
    question: string;
    answer: string;
}

const popularArticles: HelpArticle[] = [
    { id: "1", title: "Getting Started with ZeroG", category: "Getting Started", views: 1250 },
    { id: "2", title: "How to Complete a Course", category: "Learning", views: 980 },
    { id: "3", title: "Understanding XP and Levels", category: "Gamification", views: 876 },
    { id: "4", title: "Managing Your Team", category: "Admin", views: 654 },
    { id: "5", title: "Downloading Certificates", category: "Certificates", views: 543 },
];

const categories = [
    { id: "getting-started", label: "Getting Started", icon: Lightbulb, articles: 12 },
    { id: "learning", label: "Learning", icon: Book, articles: 24 },
    { id: "admin", label: "Administration", icon: HelpCircle, articles: 18 },
    { id: "integrations", label: "Integrations", icon: Zap, articles: 8 },
];

const faqs: FAQ[] = [
    {
        question: "How do I reset my password?",
        answer: "Go to Settings > Account > Password to change your password. If you forgot your password, click 'Forgot Password' on the login page.",
    },
    {
        question: "Can I access courses offline?",
        answer: "Yes! Premium users can download courses for offline access. Look for the download icon on any course page.",
    },
    {
        question: "How do certificates work?",
        answer: "After completing a course with a passing score, you'll automatically receive a certificate. Find all your certificates in the Certificates section.",
    },
    {
        question: "How is XP calculated?",
        answer: "You earn XP for completing lessons (10 XP), quizzes (varies by score), and courses (bonus 100 XP). Streak bonuses can multiply your earnings!",
    },
];

export function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">How can we help?</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Search our knowledge base or browse categories below
                </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for help..."
                        className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Card
                            key={category.id}
                            className="p-6 hover:border-primary/30 transition-all cursor-pointer"
                        >
                            <Icon className="h-8 w-8 text-primary mb-3" />
                            <h3 className="font-semibold mb-1">{category.label}</h3>
                            <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                        </Card>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Popular Articles */}
                <Card className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Popular Articles
                    </h2>
                    <div className="space-y-3">
                        {popularArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/help/${article.id}`}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <div>
                                    <p className="font-medium text-sm">{article.title}</p>
                                    <p className="text-xs text-muted-foreground">{article.category}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* FAQs */}
                <Card className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-2">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b border-border last:border-0">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full py-3 flex items-center justify-between text-left"
                                >
                                    <span className="font-medium text-sm">{faq.question}</span>
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 text-muted-foreground transition-transform",
                                            expandedFaq === i && "rotate-90"
                                        )}
                                    />
                                </button>
                                {expandedFaq === i && (
                                    <p className="pb-3 text-sm text-muted-foreground">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Contact Options */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 text-center">Still need help?</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] text-center">
                        <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-medium mb-1">Live Chat</h3>
                        <p className="text-xs text-muted-foreground mb-3">Available 9am - 6pm EST</p>
                        <Button size="sm" className="w-full">Start Chat</Button>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] text-center">
                        <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-medium mb-1">Email Support</h3>
                        <p className="text-xs text-muted-foreground mb-3">Response within 24 hours</p>
                        <Button size="sm" variant="outline" className="w-full">Send Email</Button>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] text-center">
                        <Video className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-medium mb-1">Video Tutorials</h3>
                        <p className="text-xs text-muted-foreground mb-3">Step-by-step guides</p>
                        <Button size="sm" variant="outline" className="w-full">Watch Videos</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
