"use client";

import { useState } from "react";
import Link from "next/link";
import {
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Search,
    MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// FAQ DATA
// =============================================================================

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    // Getting Started
    { id: "1", category: "Getting Started", question: "What is ScaledNative?", answer: "ScaledNative is an enterprise AI training platform designed to help teams become AI-native. We offer comprehensive courses, certifications, and hands-on learning experiences covering everything from AI fundamentals to advanced agent development." },
    { id: "2", category: "Getting Started", question: "How do I get started?", answer: "Start by taking our free skill assessment at /assessment. This 5-minute quiz will evaluate your current AI knowledge and recommend a personalized learning path tailored to your goals and experience level." },
    { id: "3", category: "Getting Started", question: "Is there a free trial?", answer: "Yes! We offer a 14-day free trial that gives you access to the first module of each course. This lets you experience our interactive learning format before committing to a subscription." },
    { id: "4", category: "Getting Started", question: "What prerequisites do I need?", answer: "For our Foundations track, no prior AI experience is required—just basic computer literacy. For Associate and Professional tracks, we recommend completing the Foundations certification or equivalent experience." },

    // Certifications
    { id: "5", category: "Certifications", question: "How do certifications work?", answer: "Each certification track requires completing a set of modules and passing a proctored exam. Exams are 60-90 minutes, open-book, and test both theoretical knowledge and practical application. You need 80% to pass." },
    { id: "6", category: "Certifications", question: "Are certifications recognized by employers?", answer: "Yes! ScaledNative certifications are recognized by leading tech companies and are included in the qualification requirements for many AI-related job postings. Each certificate includes a verifiable credential ID." },
    { id: "7", category: "Certifications", question: "How long does certification take?", answer: "Timing varies by track: Foundations takes 2-4 weeks (15 hours), Associate takes 4-6 weeks (30 hours), and Professional takes 6-8 weeks (50 hours). These estimates assume 5-10 hours of study per week." },
    { id: "8", category: "Certifications", question: "What if I fail the exam?", answer: "No worries! If you don't pass on your first attempt, you can retake the exam after a 48-hour waiting period. Your subscription includes unlimited retakes." },

    // Pricing
    { id: "9", category: "Pricing", question: "What plans are available?", answer: "We offer Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing) plans. All plans include access to all courses—the difference is in features like analytics, team management, and custom content." },
    { id: "10", category: "Pricing", question: "Is there a discount for annual billing?", answer: "Yes! Annual billing saves you 20% compared to monthly. For example, the Professional plan is $79/month or $758/year ($63/month equivalent)." },
    { id: "11", category: "Pricing", question: "Do you offer team discounts?", answer: "Yes! Teams of 10+ get 15% off, and teams of 50+ get 25% off. Enterprise plans include volume discounts and custom pricing based on your organization's needs." },
    { id: "12", category: "Pricing", question: "Can I cancel anytime?", answer: "Absolutely. Monthly plans can be canceled at any time with no penalty. For annual plans, we offer prorated refunds within the first 30 days." },

    // Technical
    { id: "13", category: "Technical", question: "What browsers are supported?", answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience with our interactive code editor, we recommend Chrome or Firefox." },
    { id: "14", category: "Technical", question: "Is there a mobile app?", answer: "Yes! Our mobile app is available for iOS and Android. It supports video lessons and quizzes. For code exercises, we recommend using a desktop browser." },
    { id: "15", category: "Technical", question: "Can I download content for offline use?", answer: "Professional and Enterprise plans include offline access. You can download videos and lesson content through our mobile app for offline viewing." },

    // Enterprise
    { id: "16", category: "Enterprise", question: "What's included in Enterprise plans?", answer: "Enterprise plans include unlimited users, SSO/SAML integration, custom learning paths, dedicated customer success manager, API access, analytics dashboard, and custom content development." },
    { id: "17", category: "Enterprise", question: "Can you create custom content for our team?", answer: "Yes! Our Enterprise plan includes custom content development. We can create industry-specific modules, incorporate your internal tools and processes, and align content with your AI strategy." },
    { id: "18", category: "Enterprise", question: "How does team management work?", answer: "Admins can add/remove team members, assign learning paths, track progress, set deadlines, and generate reports through our admin dashboard. We also support bulk user provisioning via SCIM." },
];

const categories = ["All", "Getting Started", "Certifications", "Pricing", "Technical", "Enterprise"];

// =============================================================================
// FAQ PAGE
// =============================================================================

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
        const matchesSearch = !searchQuery ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                <div className="text-center mb-12">
                    <HelpCircle className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
                    <p className="text-white/50">Find answers to common questions about ScaledNative</p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/20"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                                selectedCategory === cat
                                    ? "bg-white text-black"
                                    : "bg-white/5 hover:bg-white/10"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map(faq => (
                            <div
                                key={faq.id}
                                className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleItem(faq.id)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex-1 pr-4">
                                        <p className="font-medium">{faq.question}</p>
                                        <p className="text-xs text-white/30 mt-1">{faq.category}</p>
                                    </div>
                                    {openItems.has(faq.id) ? (
                                        <ChevronUp className="h-5 w-5 text-white/40 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0" />
                                    )}
                                </button>
                                {openItems.has(faq.id) && (
                                    <div className="px-5 pb-5">
                                        <div className="pt-3 border-t border-white/5">
                                            <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <HelpCircle className="h-12 w-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40">No FAQs match your search</p>
                        </div>
                    )}
                </div>

                {/* Still need help */}
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 text-center">
                    <MessageCircle className="h-8 w-8 text-white/40 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Still have questions?</h3>
                    <p className="text-sm text-white/50 mb-4">Our support team is here to help</p>
                    <Link href="/contact">
                        <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
