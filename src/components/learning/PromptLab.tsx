"use client";

import { useState, useCallback } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Play,
    Loader2,
    Copy,
    Check,
    Sparkles,
    RotateCcw,
    Send,
    Lightbulb,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptLabProps {
    title?: string;
    description?: string;
    initialPrompt?: string;
    suggestedPrompts?: string[];
    scenario?: {
        role: string;
        context: string;
        goal: string;
    };
    onSubmit?: (prompt: string) => Promise<string>;
    className?: string;
}

// Mock AI response function - replace with actual API call
const mockAIResponse = async (prompt: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (prompt.toLowerCase().includes("craft")) {
        return `I'll analyze your prompt using the CRAFT framework:

**Context**: You've provided good background information.
**Role**: Consider specifying what expertise you need.
**Action**: The task is clear.
**Format**: You could specify the desired output format.
**Tone**: Consider adding tone guidance.

Here's an improved version of your prompt that incorporates all CRAFT elements...`;
    }

    return `Based on your prompt, here's a response that demonstrates key principles:

1. **Clarity**: Your request was specific and actionable
2. **Context**: You provided relevant background
3. **Structure**: Consider adding format specifications

Would you like me to elaborate on any of these points?`;
};

export function PromptLab({
    title = "Prompt Lab",
    description = "Practice your prompt engineering skills",
    initialPrompt = "",
    suggestedPrompts = [],
    scenario,
    onSubmit = mockAIResponse,
    className,
}: PromptLabProps) {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [history, setHistory] = useState<{ prompt: string; response: string }[]>([]);

    const handleSubmit = useCallback(async () => {
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setResponse(null);

        try {
            const result = await onSubmit(prompt);
            setResponse(result);
            setHistory([...history, { prompt, response: result }]);
        } catch (error) {
            setResponse("Error: Failed to get response. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [prompt, isLoading, onSubmit, history]);

    const handleCopy = useCallback(async () => {
        if (response) {
            await navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [response]);

    const handleReset = useCallback(() => {
        setPrompt(initialPrompt);
        setResponse(null);
    }, [initialPrompt]);

    const handleUseSuggestion = useCallback((suggestion: string) => {
        setPrompt(suggestion);
        setShowSuggestions(false);
    }, []);

    return (
        <Card className={cn("p-6 bg-white/[0.02] border-white/10", className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {title}
                    </h3>
                    <p className="text-sm text-white/50 mt-1">{description}</p>
                </div>
                {history.length > 0 && (
                    <Badge className="bg-white/10 text-white/60">
                        {history.length} attempts
                    </Badge>
                )}
            </div>

            {/* Scenario context */}
            {scenario && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                    <p className="text-sm text-blue-400 font-medium mb-2">Scenario</p>
                    <div className="space-y-1 text-sm text-white/70">
                        <p><strong>Role:</strong> {scenario.role}</p>
                        <p><strong>Context:</strong> {scenario.context}</p>
                        <p><strong>Goal:</strong> {scenario.goal}</p>
                    </div>
                </div>
            )}

            {/* Suggested prompts */}
            {suggestedPrompts.length > 0 && (
                <div className="mb-4">
                    <button
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 mb-2"
                    >
                        <Lightbulb className="h-4 w-4" />
                        Suggested prompts
                        {showSuggestions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showSuggestions && (
                        <div className="flex flex-wrap gap-2">
                            {suggestedPrompts.map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleUseSuggestion(suggestion)}
                                    className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {suggestion.slice(0, 50)}...
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Prompt input */}
            <div className="relative mb-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    rows={4}
                    className="w-full p-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary focus:outline-none resize-none"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className="text-xs text-white/30">{prompt.length} chars</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-4">
                <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || isLoading}
                    className="gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Run Prompt
                        </>
                    )}
                </Button>
                <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
            </div>

            {/* Response */}
            {response && (
                <div className="relative p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-emerald-400">AI Response</span>
                        <button
                            onClick={handleCopy}
                            className={cn(
                                "flex items-center gap-1 px-2 py-1 rounded text-xs transition-all",
                                copied
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "hover:bg-white/10 text-white/50"
                            )}
                        >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                        {response.split('\n').map((line, i) => (
                            <p key={i} className="mb-2 text-sm text-white/80">
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}

// Simplified inline prompt exercise
export function InlinePromptExercise({
    instruction,
    hint,
    idealPrompt,
    onComplete,
}: {
    instruction: string;
    hint?: string;
    idealPrompt: string;
    onComplete?: (userPrompt: string) => void;
}) {
    const [userPrompt, setUserPrompt] = useState("");
    const [showIdeal, setShowIdeal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        onComplete?.(userPrompt);
    };

    return (
        <div className="my-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="font-medium mb-3 flex items-center gap-2">
                <Play className="h-4 w-4 text-primary" />
                {instruction}
            </p>

            {hint && (
                <p className="text-sm text-white/50 mb-3">💡 Hint: {hint}</p>
            )}

            <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Write your prompt here..."
                rows={3}
                disabled={submitted}
                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-primary focus:outline-none resize-none text-sm mb-3"
            />

            <div className="flex items-center gap-3">
                {!submitted ? (
                    <Button size="sm" onClick={handleSubmit} disabled={!userPrompt.trim()}>
                        Submit
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowIdeal(!showIdeal)}
                    >
                        {showIdeal ? "Hide" : "Show"} Example Solution
                    </Button>
                )}
            </div>

            {showIdeal && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-xs text-emerald-400 font-medium mb-2">Example Solution</p>
                    <p className="text-sm text-white/80">{idealPrompt}</p>
                </div>
            )}
        </div>
    );
}
