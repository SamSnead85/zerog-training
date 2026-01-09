"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    HelpCircle,
    Search,
    Book,
    MessageSquare,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Mail,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Help article
interface HelpArticle {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    views: number;
    helpful: number;
    content?: string;
}

// FAQ accordion
export function FAQAccordion({
    items,
}: {
    items: { question: string; answer: string }[];
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="space-y-2">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="rounded-lg bg-white/5 border border-white/10 overflow-hidden"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5"
                    >
                        <span className="font-medium">{item.question}</span>
                        {openIndex === i ? (
                            <ChevronUp className="h-5 w-5 text-white/50" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-white/50" />
                        )}
                    </button>
                    {openIndex === i && (
                        <div className="px-4 pb-4 text-white/70">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Help center search
export function HelpCenterSearch({
    onSearch,
    placeholder = "Search help articles...",
}: {
    onSearch: (query: string) => void;
    placeholder?: string;
}) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-lg"
            />
        </form>
    );
}

// Help article card
export function HelpArticleCard({
    article,
    onClick,
}: {
    article: HelpArticle;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-left transition-colors group"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
                        {article.title}
                    </h4>
                    <p className="text-sm text-white/50 line-clamp-2">{article.excerpt}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-white/40">
                <Badge className="bg-white/10">{article.category}</Badge>
                <span>{article.views} views</span>
            </div>
        </button>
    );
}

// Help categories grid
export function HelpCategoryGrid({
    categories,
    onCategoryClick,
}: {
    categories: { id: string; name: string; icon: React.ReactNode; articleCount: number }[];
    onCategoryClick: (id: string) => void;
}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onCategoryClick(category.id)}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 text-center transition-all group"
                >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                        {category.icon}
                    </div>
                    <h4 className="font-medium mb-1">{category.name}</h4>
                    <p className="text-xs text-white/50">{category.articleCount} articles</p>
                </button>
            ))}
        </div>
    );
}

// Support ticket types
interface SupportTicket {
    id: string;
    subject: string;
    status: "open" | "pending" | "resolved" | "closed";
    priority: "low" | "medium" | "high";
    createdAt: string;
    lastUpdate: string;
    messages: number;
}

// Support ticket list
export function SupportTicketList({
    tickets,
    onTicketClick,
    onNewTicket,
}: {
    tickets: SupportTicket[];
    onTicketClick: (id: string) => void;
    onNewTicket: () => void;
}) {
    const statusConfig = {
        open: { label: "Open", color: "bg-blue-500/20 text-blue-400" },
        pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400" },
        resolved: { label: "Resolved", color: "bg-emerald-500/20 text-emerald-400" },
        closed: { label: "Closed", color: "bg-white/10 text-white/50" },
    };

    const priorityConfig = {
        low: "text-white/50",
        medium: "text-amber-400",
        high: "text-red-400",
    };

    return (
        <Card className="bg-white/[0.02] border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold">Support Tickets</h3>
                <Button size="sm" onClick={onNewTicket}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Ticket
                </Button>
            </div>

            {tickets.length === 0 ? (
                <div className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
                    <p className="text-white/50">No support tickets. You're all good!</p>
                </div>
            ) : (
                <div className="divide-y divide-white/5">
                    {tickets.map(ticket => (
                        <button
                            key={ticket.id}
                            onClick={() => onTicketClick(ticket.id)}
                            className="w-full p-4 flex items-center gap-4 hover:bg-white/[0.02] text-left"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium truncate">{ticket.subject}</span>
                                    <Badge className={statusConfig[ticket.status].color}>
                                        {statusConfig[ticket.status].label}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-white/40">
                                    <span>#{ticket.id}</span>
                                    <span className={priorityConfig[ticket.priority]}>
                                        {ticket.priority} priority
                                    </span>
                                    <span>{ticket.messages} messages</span>
                                </div>
                            </div>
                            <div className="text-right text-xs text-white/40">
                                <div>Updated {ticket.lastUpdate}</div>
                                <div>Created {ticket.createdAt}</div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-white/30" />
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
}

// Create ticket form
export function CreateTicketForm({
    onSubmit,
    onCancel,
}: {
    onSubmit: (data: { subject: string; category: string; priority: string; message: string }) => Promise<void>;
    onCancel: () => void;
}) {
    const [formData, setFormData] = useState({
        subject: "",
        category: "",
        priority: "medium",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await onSubmit(formData);
        setIsSubmitting(false);
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4">Create Support Ticket</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-white/60 mb-1">Subject</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description of your issue"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-white/60 mb-1">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                        >
                            <option value="">Select category</option>
                            <option value="technical">Technical Issue</option>
                            <option value="billing">Billing</option>
                            <option value="content">Course Content</option>
                            <option value="account">Account</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-white/60 mb-1">Priority</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-1">Message</label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your issue in detail..."
                        rows={6}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none resize-none"
                    />
                </div>

                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Ticket"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

// Contact support options
export function ContactOptions() {
    const options = [
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: "Live Chat",
            description: "Chat with our support team",
            available: true,
            action: "Start Chat",
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Support",
            description: "support@scalednative.com",
            available: true,
            action: "Send Email",
        },
        {
            icon: <Book className="h-6 w-6" />,
            title: "Documentation",
            description: "Browse our knowledge base",
            available: true,
            action: "View Docs",
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {options.map((option, i) => (
                <Card key={i} className="p-6 bg-white/[0.02] border-white/10 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        {option.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{option.title}</h4>
                    <p className="text-sm text-white/50 mb-4">{option.description}</p>
                    <Button variant="outline" className="w-full">
                        {option.action}
                    </Button>
                </Card>
            ))}
        </div>
    );
}
