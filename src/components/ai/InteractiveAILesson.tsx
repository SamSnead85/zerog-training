"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    MessageCircle,
    Send,
    Sparkles,
    User,
    Bot,
    Lightbulb,
    Code2,
    FileText,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    X,
    Maximize2,
    Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    contextUsed?: string[];
    timestamp: Date;
}

interface InteractiveAILessonProps {
    lessonId: string;
    lessonTitle: string;
    lessonContext: string;
    enterpriseContext?: {
        companyName?: string;
        techStack?: string[];
        aiTools?: string[];
        terminology?: Record<string, string>;
    };
}

const suggestedPrompts = [
    "How does this apply to my daily work?",
    "Show me an example using our tech stack",
    "What are the HIPAA implications?",
    "Create a practice scenario for me",
    "Explain this in simpler terms",
];

export function InteractiveAILesson({
    lessonId,
    lessonTitle,
    lessonContext,
    enterpriseContext,
}: InteractiveAILessonProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial AI greeting with context
        const welcomeMessage: Message = {
            id: "welcome",
            role: "assistant",
            content: `Welcome to "${lessonTitle}"! I'm your AI learning assistant, and I have context about ${enterpriseContext?.companyName || "your organization"}'s tech stack and workflows. Ask me anything about how this lesson applies to your specific situation, or use the suggested prompts below to get started.`,
            contextUsed: ["Enterprise context loaded"],
            timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
    }, [lessonTitle, enterpriseContext]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response with context
        await new Promise((r) => setTimeout(r, 1500));

        const contextUsed: string[] = [];
        let response = "";

        // Build contextual response
        if (input.toLowerCase().includes("tech stack") || input.toLowerCase().includes("tools")) {
            contextUsed.push("Tech stack context");
            response = `Based on your tech stack including ${enterpriseContext?.techStack?.slice(0, 3).join(", ") || "your current systems"}, here's how this applies:\n\nIn your environment, you can leverage existing integrations to implement these concepts. For example, when using your EHR system, you can apply AI assistance to streamline documentation while maintaining HIPAA compliance.`;
        } else if (input.toLowerCase().includes("example") || input.toLowerCase().includes("scenario")) {
            contextUsed.push("Workflow context");
            response = `Here's a practical scenario for ${enterpriseContext?.companyName || "your organization"}:\n\n**Scenario:** A nurse needs to document a patient encounter but is running behind schedule.\n\n**With AI Assistance:**\n1. Voice-record key observations during the encounter\n2. AI transcribes and structures into compliant documentation\n3. Review, verify, and approve in 30% less time\n\nWould you like me to walk through how this would work with your specific systems?`;
        } else if (input.toLowerCase().includes("hipaa") || input.toLowerCase().includes("compliance")) {
            contextUsed.push("Compliance context");
            response = `Great question about HIPAA implications! Here's what you need to know:\n\n✅ **Safe Practices:**\n- Use only approved AI tools (${enterpriseContext?.aiTools?.[0] || "enterprise AI"})\n- Never include PHI in prompts to external AI\n- Always verify AI outputs before using in records\n\n❌ **Avoid:**\n- Sharing patient identifiers with AI\n- Using personal AI accounts for work\n- Trusting AI outputs without verification\n\nWould you like specific examples for your department?`;
        } else {
            contextUsed.push("General lesson context");
            response = `That's a great question about "${lessonTitle}"! Let me break it down in the context of your work at ${enterpriseContext?.companyName || "your organization"}.\n\nThe key concepts here are:\n1. Understanding how AI can augment your current workflows\n2. Maintaining compliance and quality standards\n3. Building confidence through practice\n\nWhat specific aspect would you like to explore further?`;
        }

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response,
            contextUsed,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
    };

    const handleSuggestedPrompt = (prompt: string) => {
        setInput(prompt);
    };

    return (
        <div
            className={cn(
                "transition-all",
                isExpanded
                    ? "fixed inset-4 z-50"
                    : "relative"
            )}
        >
            <Card className={cn(
                "flex flex-col",
                isExpanded ? "h-full" : "h-[500px]"
            )}>
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">AI Learning Assistant</h3>
                            <p className="text-xs text-muted-foreground">
                                Contextual help for {lessonTitle}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-3",
                                message.role === "user" && "justify-end"
                            )}
                        >
                            {message.role === "assistant" && (
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl p-4",
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                {message.contextUsed && message.contextUsed.length > 0 && (
                                    <div className="flex gap-1 mt-2">
                                        {message.contextUsed.map((ctx, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                <Sparkles className="h-2 w-2 mr-1" />
                                                {ctx}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {message.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                                    <User className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-primary" />
                            </div>
                            <div className="bg-muted rounded-2xl p-4">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Prompts */}
                {messages.length <= 2 && (
                    <div className="px-4 pb-2">
                        <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedPrompts.map((prompt) => (
                                <button
                                    key={prompt}
                                    onClick={() => handleSuggestedPrompt(prompt)}
                                    className="px-3 py-1.5 rounded-full bg-muted text-xs hover:bg-muted/80 transition-colors"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask about this lesson..."
                            className="flex-1 h-10 px-4 rounded-full bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none"
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="rounded-full"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
