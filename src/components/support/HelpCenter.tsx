"use client";

/**
 * Help Center Components
 * 
 * FAQ accordion, search, and category navigation for self-service support.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input, Badge } from "@/components/ui";
import {
    Search,
    ChevronDown,
    Book,
    MessageCircle,
    Video,
    FileText,
    ArrowRight,
    HelpCircle,
    Sparkles,
    Shield,
    Users,
    CreditCard,
    Settings,
} from "lucide-react";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface HelpCategory {
    id: string;
    name: string;
    icon: React.ElementType;
    description: string;
    articleCount: number;
}

// =============================================================================
// DATA
// =============================================================================

const categories: HelpCategory[] = [
    {
        id: "getting-started",
        name: "Getting Started",
        icon: Sparkles,
        description: "New to ZeroG? Start here",
        articleCount: 12,
    },
    {
        id: "billing",
        name: "Billing & Plans",
        icon: CreditCard,
        description: "Payments, invoices, and subscriptions",
        articleCount: 8,
    },
    {
        id: "teams",
        name: "Team Management",
        icon: Users,
        description: "Invite members and manage roles",
        articleCount: 15,
    },
    {
        id: "security",
        name: "Security & Privacy",
        icon: Shield,
        description: "Data protection and compliance",
        articleCount: 10,
    },
    {
        id: "integrations",
        name: "Integrations",
        icon: Settings,
        description: "Connect with other tools",
        articleCount: 7,
    },
    {
        id: "troubleshooting",
        name: "Troubleshooting",
        icon: HelpCircle,
        description: "Common issues and solutions",
        articleCount: 20,
    },
];

const faqs: FAQItem[] = [
    {
        id: "faq-1",
        question: "How do I create my first AI-generated training module?",
        answer: "Navigate to the dashboard and click 'Create Module'. Enter your topic and any specific requirements, then let our AI generate comprehensive training content. You can customize and edit the generated content before publishing.",
        category: "getting-started",
    },
    {
        id: "faq-2",
        question: "Can I invite team members to my organization?",
        answer: "Yes! Go to Settings > Team and click 'Invite Members'. You can send invitations via email and assign roles (Admin, Manager, or Learner). Team members will receive an email with instructions to join.",
        category: "teams",
    },
    {
        id: "faq-3",
        question: "How do I upgrade my subscription?",
        answer: "Visit Settings > Billing to view available plans. Click 'Upgrade' on your desired plan. You'll only be charged the prorated difference for the current billing period.",
        category: "billing",
    },
    {
        id: "faq-4",
        question: "Is my data secure?",
        answer: "Absolutely. We use enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We're SOC 2 Type II certified and GDPR compliant. Your data is never used to train our AI models.",
        category: "security",
    },
    {
        id: "faq-5",
        question: "Can I connect ZeroG to my existing LMS?",
        answer: "Yes! We offer SCORM export and LTI integration. Enterprise plans also include API access for custom integrations. Contact our team for help setting up your integration.",
        category: "integrations",
    },
    {
        id: "faq-6",
        question: "Why isn't my content generating?",
        answer: "Content generation typically takes 30-60 seconds. If it's taking longer, try refreshing the page. If the issue persists, check our status page or contact support.",
        category: "troubleshooting",
    },
];

// =============================================================================
// HELP CENTER COMPONENT
// =============================================================================

interface HelpCenterProps {
    className?: string;
}

export function HelpCenter({ className }: HelpCenterProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFAQs = useMemo(() => {
        if (!searchQuery.trim()) return faqs;
        const query = searchQuery.toLowerCase();
        return faqs.filter(
            (faq) =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className={className}>
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 text-lg"
                    />
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <QuickLink icon={Book} label="Documentation" href="/docs" />
                <QuickLink icon={Video} label="Video Tutorials" href="/tutorials" />
                <QuickLink icon={MessageCircle} label="Contact Support" href="/support" />
                <QuickLink icon={FileText} label="Release Notes" href="/changelog" />
            </div>

            {/* Categories */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.id}
                                href={`/help/${category.id}`}
                                className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {category.description}
                                    </p>
                                    <Badge variant="outline" className="mt-2 text-xs">
                                        {category.articleCount} articles
                                    </Badge>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* FAQs */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                {filteredFAQs.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No results found. Try a different search term or{" "}
                        <Link href="/support" className="text-primary hover:underline">
                            contact support
                        </Link>
                        .
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredFAQs.map((faq) => (
                            <FAQAccordion key={faq.id} item={faq} />
                        ))}
                    </div>
                )}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="text-xl font-bold mb-2">Still need help?</h3>
                <p className="text-muted-foreground mb-4">
                    Our support team is available 24/7 to assist you.
                </p>
                <Link
                    href="/support"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                    <MessageCircle className="h-4 w-4" />
                    Contact Support
                </Link>
            </div>
        </div>
    );
}

// =============================================================================
// QUICK LINK
// =============================================================================

interface QuickLinkProps {
    icon: React.ElementType;
    label: string;
    href: string;
}

function QuickLink({ icon: Icon, label, href }: QuickLinkProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all"
        >
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-medium">{label}</span>
        </Link>
    );
}

// =============================================================================
// FAQ ACCORDION
// =============================================================================

interface FAQAccordionProps {
    item: FAQItem;
}

function FAQAccordion({ item }: FAQAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-medium pr-4">{item.question}</span>
                <ChevronDown
                    className={cn(
                        "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-muted-foreground text-sm">
                    {item.answer}
                </div>
            )}
        </div>
    );
}

export default HelpCenter;
