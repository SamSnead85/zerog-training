"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
    Play,
    RotateCcw,
    Copy,
    Check,
    Loader2,
    Zap,
    DollarSign,
    AlertCircle,
    CheckCircle,
    XCircle,
    Sparkles,
    Info
} from "lucide-react";

interface LabObjective {
    objective: string;
    met: boolean;
    comment: string;
}

interface ExecutionResult {
    success: boolean;
    output: string;
    usage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens: number;
        estimatedCost: number;
    };
    latencyMs: number;
    assessment?: {
        score: number;
        feedback: string;
        objectiveResults: LabObjective[];
    };
    error?: string;
}

interface PromptPlaygroundProps {
    labId: string;
    labName: string;
    labDescription?: string;
    objectives: string[];
    initialContext?: string;
    placeholder?: string;
    maxInputTokens?: number;
    onComplete?: (result: ExecutionResult) => void;
}

export function PromptPlayground({
    labId,
    labName,
    labDescription,
    objectives,
    initialContext = "",
    placeholder = "Write your prompt here...\n\nBe specific about what you want the AI to generate.",
    maxInputTokens = 4000,
    onComplete,
}: PromptPlaygroundProps) {
    const [prompt, setPrompt] = useState("");
    const [context, setContext] = useState(initialContext);
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<ExecutionResult | null>(null);
    const [copied, setCopied] = useState(false);
    const [tokenCount, setTokenCount] = useState(0);
    const [showContext, setShowContext] = useState(!!initialContext);

    // Real-time token estimation (rough estimate: ~4 chars per token)
    useEffect(() => {
        const estimatedTokens = Math.ceil((prompt.length + context.length) / 4);
        setTokenCount(estimatedTokens);
    }, [prompt, context]);

    const handleExecute = useCallback(async () => {
        if (!prompt.trim()) return;

        setIsExecuting(true);
        setResult(null);

        try {
            const response = await fetch("/api/labs/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    labId,
                    userPrompt: prompt,
                    additionalContext: context,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setResult({
                    success: false,
                    output: "",
                    usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0, estimatedCost: 0 },
                    latencyMs: 0,
                    error: data.error || "Execution failed",
                });
            } else {
                setResult({
                    success: true,
                    output: data.output,
                    usage: data.usage,
                    latencyMs: data.latencyMs,
                    assessment: data.assessment,
                });
                onComplete?.(data);
            }
        } catch (error) {
            setResult({
                success: false,
                output: "",
                usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0, estimatedCost: 0 },
                latencyMs: 0,
                error: "Network error. Please try again.",
            });
        } finally {
            setIsExecuting(false);
        }
    }, [labId, prompt, context, onComplete]);

    const handleCopy = useCallback(async () => {
        if (result?.output) {
            await navigator.clipboard.writeText(result.output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [result]);

    const handleReset = useCallback(() => {
        setPrompt("");
        setResult(null);
    }, []);

    const tokenPercentage = Math.min((tokenCount / maxInputTokens) * 100, 100);
    const isOverLimit = tokenCount > maxInputTokens;

    return (
        <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-purple-400" />
                            {labName}
                        </h2>
                        {labDescription && (
                            <p className="text-white/60 mt-1 text-sm">{labDescription}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Interactive Lab
                        </span>
                    </div>
                </div>

                {/* Objectives */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        Learning Objectives
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {objectives.map((obj, i) => (
                            <span
                                key={i}
                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${result?.assessment?.objectiveResults?.[i]?.met
                                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                                        : result?.assessment
                                            ? "bg-red-500/20 text-red-300 border-red-500/30"
                                            : "bg-white/5 text-white/60 border-white/10"
                                    }`}
                            >
                                {result?.assessment?.objectiveResults?.[i]?.met !== undefined && (
                                    result.assessment.objectiveResults[i].met
                                        ? <CheckCircle className="inline h-3 w-3 mr-1" />
                                        : <XCircle className="inline h-3 w-3 mr-1" />
                                )}
                                {obj}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                {/* Left: Prompt Editor */}
                <div className="p-6">
                    {/* Context Toggle */}
                    {(initialContext || showContext) && (
                        <div className="mb-4">
                            <button
                                onClick={() => setShowContext(!showContext)}
                                className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
                            >
                                <Info className="h-3 w-3" />
                                {showContext ? "Hide Context" : "Show Context"}
                            </button>
                            {showContext && (
                                <textarea
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    placeholder="Additional context for the AI..."
                                    className="mt-2 w-full h-24 bg-black/50 rounded-lg border border-white/10 p-3 text-sm text-white/70 placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            )}
                        </div>
                    )}

                    {/* Prompt Input */}
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={placeholder}
                            disabled={isExecuting}
                            className="w-full h-64 bg-black/50 rounded-xl border border-white/10 p-4 text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-sm disabled:opacity-50"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                    handleExecute();
                                }
                            }}
                        />

                        {/* Token Counter */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${isOverLimit ? "bg-red-500" : tokenPercentage > 80 ? "bg-yellow-500" : "bg-purple-500"
                                            }`}
                                        style={{ width: `${tokenPercentage}%` }}
                                    />
                                </div>
                                <span className={`text-xs ${isOverLimit ? "text-red-400" : "text-white/40"}`}>
                                    ~{tokenCount.toLocaleString()} / {maxInputTokens.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center gap-3">
                        <button
                            onClick={handleExecute}
                            disabled={isExecuting || !prompt.trim() || isOverLimit}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isExecuting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                            {isExecuting ? "Executing..." : "Execute Prompt"}
                        </button>

                        <button
                            onClick={handleReset}
                            disabled={isExecuting}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </button>

                        <span className="text-xs text-white/30 ml-auto">
                            ⌘/Ctrl + Enter to execute
                        </span>
                    </div>
                </div>

                {/* Right: Output */}
                <div className="p-6 bg-black/30">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                            AI Output
                        </h3>
                        {result?.output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
                            >
                                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>

                    {/* Output Content */}
                    <div className="h-64 overflow-auto bg-black/50 rounded-xl border border-white/10 p-4">
                        {isExecuting ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-3" />
                                    <p className="text-white/50 text-sm">Generating response...</p>
                                </div>
                            </div>
                        ) : result?.error ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center text-red-400">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-3" />
                                    <p className="text-sm">{result.error}</p>
                                </div>
                            </div>
                        ) : result?.output ? (
                            <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono">
                                {result.output}
                            </pre>
                        ) : (
                            <div className="h-full flex items-center justify-center text-center">
                                <div className="text-white/30">
                                    <Zap className="h-8 w-8 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm">Write a prompt and click Execute to see the AI response</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Usage Stats */}
                    {result?.success && result.usage && (
                        <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {result.usage.totalTokens.toLocaleString()} tokens
                            </span>
                            <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                ${result.usage.estimatedCost.toFixed(6)}
                            </span>
                            <span>{result.latencyMs}ms</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Assessment Section */}
            {result?.assessment && (
                <div className="p-6 border-t border-white/10 bg-gradient-to-r from-green-500/5 to-blue-500/5">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
                                Assessment Feedback
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {result.assessment.feedback}
                            </p>
                        </div>
                        <div className="flex-shrink-0 text-center">
                            <div className={`text-4xl font-bold ${result.assessment.score >= 80 ? "text-green-400" :
                                    result.assessment.score >= 60 ? "text-yellow-400" :
                                        "text-red-400"
                                }`}>
                                {result.assessment.score}
                            </div>
                            <div className="text-xs text-white/40">Score</div>
                        </div>
                    </div>

                    {/* Detailed Objective Results */}
                    <div className="mt-4 grid gap-2">
                        {result.assessment.objectiveResults.map((obj, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-lg border ${obj.met
                                        ? "bg-green-500/10 border-green-500/20"
                                        : "bg-red-500/10 border-red-500/20"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {obj.met ? (
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-400" />
                                    )}
                                    <span className="text-sm font-medium text-white">
                                        {obj.objective}
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-white/60 ml-6">
                                    {obj.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromptPlayground;
