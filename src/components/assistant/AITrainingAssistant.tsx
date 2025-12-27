"use client";

import { useState, useRef, useEffect } from "react";
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
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface QuickAction {
    label: string;
    icon: React.ElementType;
    prompt: string;
}

const quickActions: QuickAction[] = [
    { label: "Create Training", icon: Book, prompt: "Help me create a new training module on " },
    { label: "Find Courses", icon: GraduationCap, prompt: "What courses do you recommend for " },
    { label: "Get Help", icon: HelpCircle, prompt: "How do I " },
    { label: "Best Practices", icon: Lightbulb, prompt: "What are best practices for " },
];

const welcomeMessages = [
    "👋 Hi! I'm your AI Training Assistant. I can help you create training, find courses, answer questions, and more.",
    "Here are some things I can help with:\n\n• **Create custom training** on any topic\n• **Find courses** from our 60+ module library\n• **Answer questions** about compliance, HR, leadership\n• **Explain concepts** from your training\n• **Suggest improvements** for existing content",
];

export function AITrainingAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize with welcome messages
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMsgs: Message[] = welcomeMessages.map((content, i) => ({
                id: `welcome-${i}`,
                role: "assistant" as const,
                content,
                timestamp: new Date(),
            }));
            setMessages(welcomeMsgs);
        }
    }, [isOpen, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
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
            // Call AI endpoint
            const response = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
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
                content: getContextualFallback(userMessage.content),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, fallbackMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action: QuickAction) => {
        setInput(action.prompt);
        setShowQuickActions(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

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

    return (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
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
                            Online • Ready to help
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Minimize2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
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
                        <div className={cn(
                            "max-w-[280px] p-3 rounded-xl text-sm leading-relaxed",
                            message.role === "assistant"
                                ? "bg-muted/50 text-foreground"
                                : "bg-primary text-primary-foreground"
                        )}>
                            <div className="whitespace-pre-wrap">{message.content}</div>
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

            {/* Quick Actions */}
            {showQuickActions && messages.length <= 2 && (
                <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => handleQuickAction(action)}
                                className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all text-left text-xs"
                            >
                                <action.icon className="h-3.5 w-3.5 text-primary" />
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

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

// Contextual fallback responses when API isn't available
function getContextualFallback(userInput: string): string {
    const input = userInput.toLowerCase();

    if (input.includes("create") || input.includes("training") || input.includes("module")) {
        return "To create a new training module:\n\n1. Go to **AI Training Studio** from the main menu\n2. Browse 60+ pre-built courses or click **Create Custom**\n3. Add your topic and organizational context\n4. Upload any relevant documents (policies, procedures)\n5. Click **Generate Training with AI**\n\nWould you like me to help you get started with a specific topic?";
    }

    if (input.includes("course") || input.includes("find") || input.includes("recommend")) {
        return "Our course library includes:\n\n**Compliance & Security:**\n• NIST Cybersecurity Framework 2.0\n• HIPAA Privacy & Security\n• GDPR Data Protection\n\n**Professional Development:**\n• Leadership Fundamentals\n• SAFe 6.0 Agile\n• Change Management\n\n**Healthcare:**\n• Bloodborne Pathogens (OSHA)\n• Patient Safety\n\nWhat area interests you most?";
    }

    if (input.includes("help") || input.includes("how")) {
        return "I can help you with:\n\n• **Creating training** - Generate custom courses with AI\n• **Finding courses** - Browse our 60+ module library\n• **Understanding content** - Explain compliance, HR, or leadership topics\n• **Best practices** - Get recommendations for training programs\n\nWhat would you like to know more about?";
    }

    if (input.includes("hipaa") || input.includes("compliance") || input.includes("privacy")) {
        return "**HIPAA Quick Reference:**\n\n• **PHI** = Protected Health Information (any health info + identifier)\n• **18 Identifiers** include names, SSN, dates, phone, email\n• **Minimum Necessary** = Only access what you need\n• **Breach notification** = 60 days to affected individuals\n\nWe have a comprehensive HIPAA training module. Would you like me to help you access it?";
    }

    if (input.includes("password") || input.includes("security") || input.includes("phishing")) {
        return "**Security Best Practices:**\n\n• Use **15+ character passphrases** (longer is better)\n• Enable **MFA** on all accounts (blocks 99.9% of attacks)\n• **Never reuse passwords** across accounts\n• Report suspicious emails using **[your org's Report Phishing button]**\n\nOur NIST Cybersecurity Framework training covers this in depth!";
    }

    return "I'm here to help with training-related questions!\n\nYou can ask me about:\n• Creating custom training modules\n• Finding courses in our library\n• Compliance topics (HIPAA, GDPR, cybersecurity)\n• Leadership and professional development\n• Best practices for employee training\n\nWhat would you like to explore?";
}
