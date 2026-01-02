"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import {
    MessageCircle,
    X,
    Send,
    Sparkles,
    Loader2,
    User,
    Bot,
    Minimize2,
    Maximize2,
    Book,
    GraduationCap,
    Settings,
    HelpCircle,
    Lightbulb,
    BarChart3,
    Shield,
    Award,
    Users,
    Zap,
    BookOpen,
    FileText,
    Target,
    TrendingUp,
    Clock,
    ChevronRight,
    Bookmark,
    History,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    actions?: QuickAction[];
}

interface QuickAction {
    label: string;
    icon: React.ElementType;
    prompt: string;
    href?: string;
}

// Page context configuration for context-aware suggestions
const pageContexts: Record<string, {
    greeting: string;
    suggestions: QuickAction[];
}> = {
    "/dashboard": {
        greeting: "I see you're on the Dashboard. How can I help you track progress or find training?",
        suggestions: [
            { label: "What training is due soon?", icon: Clock, prompt: "What training is coming up or overdue for my team?" },
            { label: "Show my progress", icon: TrendingUp, prompt: "Summarize my training progress this month" },
            { label: "Recommend courses", icon: Lightbulb, prompt: "Based on my progress, what courses should I take next?" },
            { label: "Create training", icon: Sparkles, prompt: "Help me create a new training module", href: "/studio" },
        ],
    },
    "/library": {
        greeting: "Welcome to the Training Library! What topic are you looking to learn?",
        suggestions: [
            { label: "Find compliance training", icon: Shield, prompt: "Show me compliance and security courses" },
            { label: "AI & Technology courses", icon: Sparkles, prompt: "What AI and technology training do you have?" },
            { label: "Leadership development", icon: Users, prompt: "Recommend leadership training for managers" },
            { label: "Start from scratch", icon: Book, prompt: "Help me create custom training on a specific topic", href: "/studio" },
        ],
    },
    "/studio": {
        greeting: "You're in the AI Training Studio! Ready to create amazing training content.",
        suggestions: [
            { label: "How does this work?", icon: HelpCircle, prompt: "How do I use the AI Training Studio to create a course?" },
            { label: "Best practices", icon: Lightbulb, prompt: "What are best practices for creating effective training modules?" },
            { label: "Upload documents", icon: FileText, prompt: "How do I upload my policies to include in training?" },
            { label: "Module templates", icon: BookOpen, prompt: "What training templates are available?" },
        ],
    },
    "/paths": {
        greeting: "Exploring Learning Paths! These are structured tracks to master new skills.",
        suggestions: [
            { label: "Best path for me?", icon: Target, prompt: "Based on my role, which learning path should I follow?" },
            { label: "Complete quickly", icon: Zap, prompt: "What's the fastest path to complete for my certification?" },
            { label: "Track progress", icon: BarChart3, prompt: "How do I track my progress through a learning path?" },
            { label: "Custom path", icon: Settings, prompt: "Can I create a custom learning path for my team?" },
        ],
    },
    "/certificates": {
        greeting: "Looking at Certificates! Celebrate your achievements.",
        suggestions: [
            { label: "Download certificate", icon: Award, prompt: "How do I download my certificates?" },
            { label: "Share on LinkedIn", icon: TrendingUp, prompt: "How can I share my certificate on LinkedIn?" },
            { label: "Verify certificate", icon: Shield, prompt: "How can someone verify my certificate is authentic?" },
            { label: "Get more certs", icon: GraduationCap, prompt: "What other certifications can I earn?", href: "/paths" },
        ],
    },
    "/progress": {
        greeting: "Reviewing your Progress! Let's see how you're doing.",
        suggestions: [
            { label: "Areas to improve", icon: Target, prompt: "Based on my quiz scores, what areas should I focus on?" },
            { label: "Time spent", icon: Clock, prompt: "How much time have I spent on training this month?" },
            { label: "Compare to team", icon: Users, prompt: "How does my progress compare to my team?" },
            { label: "Set goals", icon: TrendingUp, prompt: "Help me set training goals for next quarter" },
        ],
    },
    "/team": {
        greeting: "Managing your Team's training. How can I assist?",
        suggestions: [
            { label: "Who needs training?", icon: Clock, prompt: "Which team members have overdue training?" },
            { label: "Assign training", icon: BookOpen, prompt: "How do I assign training to my team?" },
            { label: "Team analytics", icon: BarChart3, prompt: "Show me my team's training analytics" },
            { label: "Compliance status", icon: Shield, prompt: "Is my team compliant with required training?" },
        ],
    },
    default: {
        greeting: "Hi! I'm your AI Training Assistant. How can I help you today?",
        suggestions: [
            { label: "Create training", icon: Sparkles, prompt: "Help me create a new training module", href: "/studio" },
            { label: "Find courses", icon: GraduationCap, prompt: "What courses do you recommend?", href: "/library" },
            { label: "Get help", icon: HelpCircle, prompt: "How do I use the training platform?" },
            { label: "Best practices", icon: Lightbulb, prompt: "What are best practices for employee training?" },
        ],
    },
};

const welcomeMessages = [
    "👋 Hi! I'm your AI Training Assistant, here to help you create, find, and complete training.",
    "Here's what I can do:\n\n• **Create custom training** on any topic with AI\n• **Find courses** from our 60+ module library\n• **Answer questions** about compliance, HR, leadership\n• **Track progress** and recommend next steps\n• **Explain concepts** from your active training",
];

export function AITrainingAssistant() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const [savedChats, setSavedChats] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Get context-aware suggestions based on current page
    const pageContext = pageContexts[pathname] || pageContexts.default;

    // Routes where the AI assistant should NOT appear (marketing/landing pages)
    const excludedRoutes = [
        "/",           // Landing page
        "/pricing",    // Pricing page
        "/preview",    // Demo preview (let them explore without distraction)
        "/demo",       // Demo booking
        "/enterprise", // Enterprise page
        "/about",      // About page
        "/contact",    // Contact page
        "/insights",   // Articles/insights hub
        "/terms",      // Terms of service
        "/privacy",    // Privacy policy
        "/login",      // Login page
        "/signup",     // Signup page
        "/register",   // Register page
        "/learn",      // Learn pages (marketing)
    ];

    // Check if current page should show assistant
    const shouldShowAssistant = !excludedRoutes.some(route =>
        pathname === route ||
        (route !== "/" && pathname?.startsWith(route + "/"))
    );

    // Initialize with context-aware welcome messages
    useEffect(() => {
        if (isOpen && messages.length === 0 && shouldShowAssistant) {
            const contextGreeting = pageContext.greeting;
            const welcomeMsgs: Message[] = [
                {
                    id: "welcome-1",
                    role: "assistant",
                    content: welcomeMessages[0],
                    timestamp: new Date(),
                },
                {
                    id: "welcome-2",
                    role: "assistant",
                    content: welcomeMessages[1],
                    timestamp: new Date(),
                },
                {
                    id: "context-greeting",
                    role: "assistant",
                    content: contextGreeting,
                    timestamp: new Date(),
                    actions: pageContext.suggestions,
                },
            ];
            setMessages(welcomeMsgs);
        }
    }, [isOpen, shouldShowAssistant, pageContext.greeting, pageContext.suggestions, messages.length]);

    // Update context greeting when page changes (if already open)
    useEffect(() => {
        if (isOpen && messages.length > 0 && shouldShowAssistant) {
            const lastContextMessage = messages.find(m => m.id === "context-greeting");
            if (lastContextMessage && lastContextMessage.content !== pageContext.greeting) {
                const contextMessage: Message = {
                    id: `context-${Date.now()}`,
                    role: "assistant",
                    content: `📍 I noticed you navigated to a new page.\n\n${pageContext.greeting}`,
                    timestamp: new Date(),
                    actions: pageContext.suggestions,
                };
                setMessages(prev => [...prev, contextMessage]);
                setShowQuickActions(true);
            }
        }
    }, [pathname, shouldShowAssistant, isOpen, messages, pageContext.greeting, pageContext.suggestions]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, isMinimized]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setShowQuickActions(false);
        setIsLoading(true);

        try {
            // Call AI endpoint with page context
            const response = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    context: {
                        currentPage: pathname,
                        pageContext: pageContext.greeting,
                    },
                    history: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
                }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();

            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.response || "I apologize, but I couldn't process that request. Please try again.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Assistant error:", error);
            // Provide a helpful fallback response
            const fallbackMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: getContextualFallback(userMessage.content, pathname),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, fallbackMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action: QuickAction) => {
        if (action.href) {
            // Navigate to the page
            window.location.href = action.href;
        } else {
            setInput(action.prompt);
            setShowQuickActions(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearChat = () => {
        setMessages([]);
        setShowQuickActions(true);
    };

    const handleSaveChat = () => {
        setSavedChats(prev => prev + 1);
        // In production, implement actual save functionality
    };

    // Don't render on excluded pages (placed after all hooks)
    if (!shouldShowAssistant) {
        return null;
    }

    // Closed state - Floating button
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
                <div className="relative">
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                </div>
                <span className="font-medium text-sm">AI Assistant</span>
            </button>
        );
    }

    // Minimized state - Pill
    if (isMinimized) {
        return (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-card border border-border shadow-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">AI Assistant</span>
                <button onClick={() => setIsMinimized(false)} className="p-1 hover:bg-muted rounded">
                    <Maximize2 className="h-4 w-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded">
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    // Open state - Full panel
    return (
        <div className={cn(
            "fixed bottom-6 right-6 z-50 flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
            isExpanded ? "w-[500px] max-h-[700px]" : "w-[400px] max-h-[600px]"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">AI Training Assistant</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Online • Context-aware
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {savedChats > 0 && (
                        <span className="text-xs text-muted-foreground mr-2">
                            <Bookmark className="h-3 w-3 inline mr-1" />
                            {savedChats}
                        </span>
                    )}
                    <button
                        onClick={handleClearChat}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Clear chat"
                    >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title={isExpanded ? "Collapse" : "Expand"}
                    >
                        {isExpanded ? <Minimize2 className="h-4 w-4 text-muted-foreground" /> : <Maximize2 className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Minimize2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className={cn(
                "flex-1 overflow-y-auto p-4 space-y-4",
                isExpanded ? "max-h-[500px]" : "max-h-[400px]"
            )}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex gap-3",
                            message.role === "user" && "flex-row-reverse"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            message.role === "assistant"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                        )}>
                            {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>
                        <div className="space-y-2 max-w-[280px]">
                            <div className={cn(
                                "p-3 rounded-xl text-sm leading-relaxed",
                                message.role === "assistant"
                                    ? "bg-muted/50 text-foreground"
                                    : "bg-primary text-primary-foreground"
                            )}>
                                <div className="whitespace-pre-wrap">{message.content}</div>
                            </div>

                            {/* Inline Quick Actions */}
                            {message.actions && message.actions.length > 0 && showQuickActions && (
                                <div className="flex flex-wrap gap-1.5">
                                    {message.actions.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuickAction(action)}
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all text-xs"
                                        >
                                            <action.icon className="h-3 w-3 text-primary" />
                                            {action.label}
                                            {action.href && <ChevronRight className="h-3 w-3 ml-0.5" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted/50 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about training..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        size="sm"
                        className="h-10 w-10 p-0 rounded-xl"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                    AI responses may not be fully accurate. Verify important information.
                </p>
            </div>
        </div>
    );
}

// Enhanced contextual fallback responses with page awareness
function getContextualFallback(userInput: string, currentPage: string): string {
    const input = userInput.toLowerCase();

    // Page-specific fallbacks
    if (currentPage === "/studio") {
        if (input.includes("how") || input.includes("use") || input.includes("work")) {
            return "**Using AI Training Studio:**\n\n1. **Choose a template** from 60+ pre-built modules, OR\n2. **Create custom** by entering your topic\n3. **Add context** - upload policies, procedures, or notes\n4. **Customize** delivery format, duration, and gamification\n5. **Generate** with AI and review/edit as needed\n\nThe AI will incorporate your organization's context to make training relevant to your team!";
        }
    }

    if (currentPage === "/library") {
        if (input.includes("find") || input.includes("recommend") || input.includes("course")) {
            return "**Finding Courses:**\n\nBrowse by category using the horizontal rows, or use these shortcuts:\n\n**Compliance:** HIPAA, GDPR, NIST CSF 2.0, SOC 2\n**AI & Tech:** Prompt Engineering, LLMs, GitHub Copilot\n**Leadership:** Change Management, Executive Presence\n**Healthcare:** Bloodborne Pathogens, Patient Safety\n\nClick any course card to preview and start learning!";
        }
    }

    // General fallbacks
    if (input.includes("create") || input.includes("training") || input.includes("module")) {
        return "To create a new training module:\n\n1. Go to **AI Training Studio** from the main menu\n2. Browse 60+ pre-built courses or click **Create Custom**\n3. Add your topic and organizational context\n4. Upload any relevant documents (policies, procedures)\n5. Click **Generate Training with AI**\n\nWould you like me to help you get started with a specific topic?";
    }

    if (input.includes("course") || input.includes("find") || input.includes("recommend")) {
        return "Our course library includes:\n\n**Compliance & Security:**\n• NIST Cybersecurity Framework 2.0\n• HIPAA Privacy & Security\n• GDPR Data Protection\n\n**Professional Development:**\n• Leadership Fundamentals\n• SAFe 6.0 Agile\n• Change Management\n\n**Healthcare:**\n• Bloodborne Pathogens (OSHA)\n• Patient Safety\n\nWhat area interests you most?";
    }

    if (input.includes("hipaa") || input.includes("compliance") || input.includes("privacy")) {
        return "**HIPAA Quick Reference:**\n\n• **PHI** = Protected Health Information (any health info + identifier)\n• **18 Identifiers** include names, SSN, dates, phone, email\n• **Minimum Necessary** = Only access what you need\n• **Breach notification** = 60 days to affected individuals\n\nWe have a comprehensive HIPAA training module. Would you like me to help you access it?";
    }

    if (input.includes("password") || input.includes("security") || input.includes("phishing")) {
        return "**Security Best Practices:**\n\n• Use **15+ character passphrases** (longer is better)\n• Enable **MFA** on all accounts (blocks 99.9% of attacks)\n• **Never reuse passwords** across accounts\n• Report suspicious emails using your org's Report Phishing button\n\nOur NIST Cybersecurity Framework training covers this in depth!";
    }

    return "I'm here to help with training-related questions!\n\nYou can ask me about:\n• Creating custom training modules\n• Finding courses in our library\n• Compliance topics (HIPAA, GDPR, cybersecurity)\n• Leadership and professional development\n• Best practices for employee training\n\nWhat would you like to explore?";
}
