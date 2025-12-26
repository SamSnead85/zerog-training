"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui";
import {
    MessageSquare,
    X,
    Send,
    Sparkles,
    Lightbulb,
    HelpCircle,
    BookOpen,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AITutorProps {
    lessonTitle: string;
    lessonContent?: string;
    moduleId: string;
}

export function AITutor({ lessonTitle, lessonContent, moduleId }: AITutorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: `Hi! I'm your AI tutor for "${lessonTitle}". I can help explain concepts, answer questions, or quiz you on the material. What would you like to know?`,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const quickActions = [
        { label: "Explain differently", icon: Lightbulb, prompt: "Can you explain this concept in a different way?" },
        { label: "Quiz me", icon: HelpCircle, prompt: "Give me a quick quiz question about this lesson." },
        { label: "Summarize", icon: BookOpen, prompt: "Summarize the key points from this lesson." },
    ];

    const handleSend = async (message?: string) => {
        const content = message || input.trim();
        if (!content) return;

        const userMessage: Message = {
            id: Math.random().toString(36).slice(2),
            role: "user",
            content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate AI response (will be replaced with actual Gemini API)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const responses: Record<string, string> = {
            "Can you explain this concept in a different way?": `Great question! Let me break this down differently.\n\nThink of it like this: ${lessonTitle} is fundamentally about understanding the core principles and applying them in real-world scenarios.\n\nThe key insight is that practice and context matter more than memorization. Would you like me to provide a specific example?`,
            "Give me a quick quiz question about this lesson.": `Here's a question to test your understanding:\n\n**Question:** What is the primary benefit of applying the concepts from "${lessonTitle}" in a professional setting?\n\nA) Faster task completion\nB) Better team collaboration\nC) Improved decision-making\nD) All of the above\n\nTake your time to think about it, and let me know your answer!`,
            "Summarize the key points from this lesson.": `Here are the key takeaways from "${lessonTitle}":\n\n1. **Core Concept** - Understanding the fundamental principles\n2. **Application** - How to apply knowledge in practice\n3. **Best Practices** - Industry-standard approaches\n4. **Common Pitfalls** - What to avoid\n\nWould you like me to elaborate on any of these points?`,
        };

        const assistantMessage: Message = {
            id: Math.random().toString(36).slice(2),
            role: "assistant",
            content: responses[content] || `That's a great question about "${lessonTitle}". Based on the lesson content, I can help clarify this concept.\n\nThe key thing to understand is that effective learning comes from both understanding theory and seeing practical applications. Would you like me to provide more specific examples or explain any particular aspect in more detail?`,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105",
                    isOpen && "opacity-0 pointer-events-none"
                )}
            >
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">AI Tutor</span>
            </button>

            {/* Chat Panel */}
            <div
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">AI Tutor</h3>
                            <p className="text-xs text-muted-foreground">Powered by Gemini</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px]">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex",
                                message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-md"
                                        : "bg-muted rounded-bl-md"
                                )}
                            >
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 pb-2">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {quickActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => handleSend(action.prompt)}
                                disabled={isLoading}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs whitespace-nowrap transition-all disabled:opacity-50"
                            >
                                <action.icon className="h-3 w-3" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything about this lesson..."
                            className="flex-1 h-10 px-4 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={isLoading}
                        />
                        <Button
                            size="icon"
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            className="h-10 w-10 rounded-xl"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
