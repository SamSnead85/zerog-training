"use client";

import { useState, useRef, useEffect } from "react";
import {
    MessageCircle,
    X,
    Send,
    Sparkles,
    User,
    Bot,
    Loader2,
    Lightbulb,
    Code,
    BookOpen,
    HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface SuggestedPrompt {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
}

// =============================================================================
// AI RESPONSES (SIMULATED)
// =============================================================================

const aiResponses: Record<string, string> = {
    "what is llm": `A **Large Language Model (LLM)** is an AI model trained on massive amounts of text data to understand and generate human-like text.

Key characteristics:
- **Size**: Billions of parameters (GPT-4 has ~1.7 trillion)
- **Training**: Learns patterns from internet-scale text data
- **Capability**: Text generation, Q&A, summarization, code generation

Popular LLMs include:
• GPT-4 (OpenAI)
• Claude (Anthropic)
• Gemini (Google)
• LLaMA (Meta)

Would you like to learn more about how they work, or see a hands-on example?`,

    "prompt engineering": `**Prompt engineering** is the practice of crafting effective inputs to get desired outputs from AI models.

**The CRISP Framework:**
- **C**ontext: Background information
- **R**ole: Who should the AI act as
- **I**nstructions: Clear, specific tasks
- **S**tyle: Tone, format, length
- **P**arameters: Constraints and requirements

**Key Techniques:**
1. **Zero-shot**: Direct questions without examples
2. **Few-shot**: Provide examples to guide format
3. **Chain-of-thought**: Ask for step-by-step reasoning
4. **Role prompting**: Assign expert personas

Want me to walk you through an exercise on prompt engineering?`,

    "help with code": `I'd be happy to help with your code! Here are some ways I can assist:

**Debugging**
- Explain error messages
- Identify logic issues
- Suggest fixes

**Code Review**
- Best practices feedback
- Performance improvements
- Security considerations

**Learning**
- Explain concepts with examples
- Walk through implementations
- Compare approaches

What specific code or concept would you like help with?`,

    default: `Thanks for your question! I'm your AI learning assistant, here to help you on your AI-Native journey.

I can help with:
• **Explaining concepts** from the curriculum
• **Answering questions** about AI, LLMs, and prompt engineering
• **Providing code examples** and debugging help
• **Guiding your learning path** based on your goals

What would you like to learn about today?`,
};

function getAIResponse(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes("llm") || lower.includes("language model")) {
        return aiResponses["what is llm"];
    }
    if (lower.includes("prompt") || lower.includes("crisp")) {
        return aiResponses["prompt engineering"];
    }
    if (lower.includes("code") || lower.includes("debug") || lower.includes("help")) {
        return aiResponses["help with code"];
    }
    return aiResponses["default"];
}

// =============================================================================
// AI ASSISTANT COMPONENT
// =============================================================================

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrompt?: string;
}

export function AIAssistant({ isOpen, onClose, initialPrompt }: AIAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm your AI learning assistant. Ask me anything about AI, LLMs, prompt engineering, or your coursework. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState(initialPrompt || "");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const suggestedPrompts: SuggestedPrompt[] = [
        { icon: Lightbulb, text: "What is an LLM?" },
        { icon: Code, text: "Help me with prompt engineering" },
        { icon: BookOpen, text: "Explain transformer architecture" },
        { icon: HelpCircle, text: "What should I learn next?" },
    ];

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Send message
    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: getAIResponse(text),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Chat Window */}
            <div className="relative w-full max-w-md h-[600px] max-h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">AI Learning Assistant</h3>
                            <p className="text-xs text-white/40">Powered by ScaledNative</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="h-4 w-4 text-white/60" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-3",
                                message.role === "user" && "flex-row-reverse"
                            )}
                        >
                            {/* Avatar */}
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                message.role === "assistant"
                                    ? "bg-gradient-to-br from-purple-500 to-blue-500"
                                    : "bg-white/10"
                            )}>
                                {message.role === "assistant" ? (
                                    <Bot className="h-4 w-4 text-white" />
                                ) : (
                                    <User className="h-4 w-4 text-white/60" />
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                                message.role === "assistant"
                                    ? "bg-white/5 text-white/80"
                                    : "bg-white/10 text-white"
                            )}>
                                <div className="whitespace-pre-wrap">{message.content}</div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-white/5 rounded-2xl px-4 py-3">
                                <Loader2 className="h-4 w-4 text-white/40 animate-spin" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Prompts */}
                {messages.length === 1 && (
                    <div className="px-4 pb-2">
                        <p className="text-xs text-white/40 mb-2">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(prompt.text)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <prompt.icon className="h-3 w-3" />
                                    {prompt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className={cn(
                                "p-2.5 rounded-full transition-all",
                                input.trim() && !isTyping
                                    ? "bg-white text-black hover:bg-white/90"
                                    : "bg-white/10 text-white/30 cursor-not-allowed"
                            )}
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// =============================================================================
// FLOATING AI BUTTON
// =============================================================================

export function AIAssistantButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25 flex items-center justify-center hover:scale-110 transition-transform"
            >
                <MessageCircle className="h-6 w-6 text-white" />
            </button>

            {/* Chat Modal */}
            <AIAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
