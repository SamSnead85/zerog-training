"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Bot,
    User,
    Send,
    Target,
    CheckCircle2,
    MessageSquare,
    RotateCcw,
    Lightbulb,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type AISimulation, type SimulationTurn } from "@/lib/curriculum/lesson-content";

interface AISimulatorProps {
    simulation: AISimulation;
}

export function AISimulatorComponent({ simulation }: AISimulatorProps) {
    const [messages, setMessages] = useState<SimulationTurn[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [completedObjectives, setCompletedObjectives] = useState<Set<number>>(new Set());

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage: SimulationTurn = { role: "user", message: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setShowSuggestions(false);

        // Simulate AI thinking
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // Generate AI response (simplified - in production, use actual AI)
        const aiResponse: SimulationTurn = {
            role: "ai",
            message: generateContextualResponse(input, simulation),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);

        // Check objectives completion (simplified logic)
        checkObjectiveCompletion(input, simulation.objectives);
    };

    const generateContextualResponse = (userInput: string, sim: AISimulation): string => {
        // Find a relevant sample dialogue or generate a contextual response
        const relevantDialogue = sim.sampleDialogues.find(
            (d) => d.role === "ai" && messages.length < sim.sampleDialogues.length
        );
        if (relevantDialogue) {
            return relevantDialogue.message;
        }
        return `I understand your point about "${userInput.slice(0, 30)}...". Let me help you explore this further. What specific aspect would you like to focus on?`;
    };

    const checkObjectiveCompletion = (input: string, objectives: string[]) => {
        // Simple keyword matching for demo - in production, use semantic analysis
        objectives.forEach((obj, i) => {
            const keywords = obj.toLowerCase().split(" ").filter((w) => w.length > 4);
            if (keywords.some((k) => input.toLowerCase().includes(k))) {
                setCompletedObjectives((prev) => new Set([...prev, i]));
            }
        });
    };

    const handleSuggestionClick = (message: string) => {
        setInput(message);
    };

    const handleReset = () => {
        setMessages([]);
        setCompletedObjectives(new Set());
        setShowSuggestions(true);
    };

    const progressPercent = (completedObjectives.size / simulation.objectives.length) * 100;

    return (
        <div className="space-y-4">
            {/* Simulation Header */}
            <Card className="p-6 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-purple-500/10 border-indigo-500/20">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <Bot className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <Badge variant="outline" className="mb-2 border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                            AI Simulation
                        </Badge>
                        <h3 className="text-xl font-semibold">{simulation.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{simulation.scenario}</p>
                    </div>
                </div>

                {/* Roles */}
                <div className="mt-4 flex gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-indigo-500" />
                        </div>
                        <div>
                            <span className="text-muted-foreground">AI plays:</span>
                            <span className="ml-1 font-medium">{simulation.aiPersona}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <User className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div>
                            <span className="text-muted-foreground">You play:</span>
                            <span className="ml-1 font-medium">{simulation.userRole}</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid lg:grid-cols-4 gap-4">
                {/* Chat Area */}
                <div className="lg:col-span-3">
                    <Card className="flex flex-col h-[500px]">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                                    <MessageSquare className="h-12 w-12 mb-3 opacity-50" />
                                    <p className="text-sm">Start the conversation to begin the simulation</p>
                                    <p className="text-xs mt-1 opacity-70">Use the suggestions below or type your own message</p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3",
                                        msg.role === "user" && "flex-row-reverse"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                            msg.role === "ai"
                                                ? "bg-indigo-500/20"
                                                : "bg-emerald-500/20"
                                        )}
                                    >
                                        {msg.role === "ai" ? (
                                            <Bot className="h-4 w-4 text-indigo-500" />
                                        ) : (
                                            <User className="h-4 w-4 text-emerald-500" />
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-2",
                                            msg.role === "ai"
                                                ? "bg-muted/80 rounded-tl-none"
                                                : "bg-primary text-primary-foreground rounded-tr-none"
                                        )}
                                    >
                                        <p className="text-sm">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <div className="bg-muted/80 rounded-2xl rounded-tl-none px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Suggestions */}
                        {showSuggestions && messages.length === 0 && (
                            <div className="px-4 pb-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Lightbulb className="h-3 w-3" />
                                    Suggested openings
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {simulation.sampleDialogues
                                        .filter((d) => d.role === "user")
                                        .slice(0, 3)
                                        .map((d, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSuggestionClick(d.message)}
                                                className="text-xs px-3 py-1.5 rounded-full border bg-muted/50 hover:bg-muted transition-colors"
                                            >
                                                {d.message.slice(0, 50)}...
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your response..."
                                    className="flex-1 bg-muted/50 border-none rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Objectives Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Objectives
                            </h4>
                            <Badge variant="outline" className="text-xs">
                                {completedObjectives.size}/{simulation.objectives.length}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            {simulation.objectives.map((obj, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex items-start gap-2 p-2 rounded-lg text-sm transition-all",
                                        completedObjectives.has(i)
                                            ? "bg-emerald-500/10 border border-emerald-500/20"
                                            : "bg-muted/50"
                                    )}
                                >
                                    {completedObjectives.has(i) ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 mt-0.5 flex-shrink-0" />
                                    )}
                                    <span className={cn(completedObjectives.has(i) && "text-emerald-600 dark:text-emerald-400")}>
                                        {obj}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Actions */}
                    <Button variant="outline" className="w-full" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart Simulation
                    </Button>

                    {/* Completion */}
                    {completedObjectives.size === simulation.objectives.length && (
                        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5 text-emerald-500" />
                                <span className="font-medium">Simulation Complete!</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                You've successfully completed all objectives in this AI simulation.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
