"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Map,
    CheckCircle2,
    Circle,
    Lock,
    Star,
    Clock,
    ChevronRight,
    Zap,
    Trophy,
    BookOpen,
    ArrowRight,
    Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PathNode {
    id: string;
    title: string;
    type: "module" | "assessment" | "milestone";
    duration: string;
    status: "completed" | "current" | "locked" | "available";
    xp: number;
    isRequired: boolean;
}

interface LearningPath {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    totalModules: number;
    completedModules: number;
    estimatedTime: string;
    nodes: PathNode[];
    certificate: boolean;
}

const mockPath: LearningPath = {
    id: "prompt-engineering-mastery",
    title: "Prompt Engineering Mastery",
    description: "Master AI prompt engineering from fundamentals to advanced enterprise patterns",
    category: "AI & Technology",
    difficulty: "advanced",
    totalModules: 8,
    completedModules: 3,
    estimatedTime: "6 hours",
    certificate: true,
    nodes: [
        { id: "1", title: "Introduction to Prompt Engineering", type: "module", duration: "25 min", status: "completed", xp: 100, isRequired: true },
        { id: "2", title: "The CRAFT Framework", type: "module", duration: "30 min", status: "completed", xp: 150, isRequired: true },
        { id: "3", title: "System Prompts & Personas", type: "module", duration: "35 min", status: "completed", xp: 150, isRequired: true },
        { id: "4", title: "Fundamentals Check", type: "assessment", duration: "15 min", status: "current", xp: 200, isRequired: true },
        { id: "5", title: "Chain-of-Thought Reasoning", type: "module", duration: "40 min", status: "available", xp: 200, isRequired: true },
        { id: "6", title: "Tree-of-Thought & ReAct", type: "module", duration: "45 min", status: "locked", xp: 250, isRequired: true },
        { id: "7", title: "Enterprise Prompt Patterns", type: "module", duration: "50 min", status: "locked", xp: 300, isRequired: true },
        { id: "8", title: "Final Certification", type: "milestone", duration: "30 min", status: "locked", xp: 500, isRequired: true },
    ],
};

export function AdaptiveLearningPath() {
    const [selectedNode, setSelectedNode] = useState<PathNode | null>(null);
    const path = mockPath;
    const progress = (path.completedModules / path.totalModules) * 100;

    const getNodeIcon = (node: PathNode) => {
        if (node.status === "completed") return CheckCircle2;
        if (node.status === "locked") return Lock;
        if (node.type === "assessment") return Star;
        if (node.type === "milestone") return Trophy;
        return Circle;
    };

    const getNodeStyles = (node: PathNode) => {
        if (node.status === "completed") return "border-emerald-500 bg-emerald-500/20";
        if (node.status === "current") return "border-primary bg-primary/20 ring-2 ring-primary/30";
        if (node.status === "locked") return "border-white/20 bg-white/5 opacity-60";
        return "border-white/20 bg-white/5 hover:border-white/40";
    };

    return (
        <div className="space-y-8">
            {/* Path Header */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {path.category}
                        </Badge>
                        <h2 className="text-2xl font-bold mb-2">{path.title}</h2>
                        <p className="text-muted-foreground">{path.description}</p>
                    </div>
                    {path.certificate && (
                        <div className="text-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                            <Trophy className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                            <span className="text-xs text-amber-400">Certificate</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{path.totalModules} modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{path.estimatedTime}</span>
                    </div>
                    <Badge className="bg-purple-500/15 text-purple-400 border-purple-500/30">
                        {path.difficulty}
                    </Badge>
                </div>

                <div className="flex items-center gap-4">
                    <Progress value={progress} className="flex-1 h-2" />
                    <span className="font-semibold text-primary">{Math.round(progress)}%</span>
                </div>
            </Card>

            {/* Learning Path Visualization */}
            <div className="relative">
                {/* Connection Lines */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-primary to-white/10" />

                {/* Path Nodes */}
                <div className="space-y-4">
                    {path.nodes.map((node, index) => {
                        const Icon = getNodeIcon(node);
                        const isInteractive = node.status !== "locked";

                        return (
                            <div
                                key={node.id}
                                className={cn(
                                    "relative flex items-center gap-4 pl-4",
                                    isInteractive && "cursor-pointer"
                                )}
                                onClick={() => isInteractive && setSelectedNode(node)}
                            >
                                {/* Node Indicator */}
                                <div className={cn(
                                    "relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                                    getNodeStyles(node)
                                )}>
                                    <Icon className={cn(
                                        "h-4 w-4",
                                        node.status === "completed" && "text-emerald-400",
                                        node.status === "current" && "text-primary",
                                        node.status === "locked" && "text-muted-foreground",
                                        node.status === "available" && "text-white"
                                    )} />
                                </div>

                                {/* Node Content */}
                                <Card className={cn(
                                    "flex-1 p-4 transition-all",
                                    node.status === "current" && "border-primary/50 bg-primary/5",
                                    node.status === "locked" && "opacity-60",
                                    isInteractive && "hover:border-white/30"
                                )}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold">{node.title}</h4>
                                                {node.type === "assessment" && (
                                                    <Badge variant="outline" className="text-xs">Quiz</Badge>
                                                )}
                                                {node.type === "milestone" && (
                                                    <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">
                                                        Certification
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {node.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Zap className="h-3 w-3 text-amber-400" />
                                                    {node.xp} XP
                                                </span>
                                                {node.isRequired && (
                                                    <Badge variant="outline" className="text-xs">Required</Badge>
                                                )}
                                            </div>
                                        </div>

                                        {node.status === "current" && (
                                            <Button size="sm" className="gap-2">
                                                <Play className="h-3 w-3" />
                                                Continue
                                            </Button>
                                        )}
                                        {node.status === "available" && (
                                            <Button variant="outline" size="sm" className="gap-2">
                                                Start
                                                <ArrowRight className="h-3 w-3" />
                                            </Button>
                                        )}
                                        {node.status === "completed" && (
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                                Completed
                                            </Badge>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* XP Summary */}
            <Card className="p-5 bg-white/[0.02] border-white/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/20">
                            <Zap className="h-6 w-6 text-amber-400" />
                        </div>
                        <div>
                            <p className="font-semibold">Path Progress</p>
                            <p className="text-sm text-muted-foreground">
                                Complete all modules to earn your certificate
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-amber-400">
                            {path.nodes.filter(n => n.status === "completed").reduce((sum, n) => sum + n.xp, 0)} XP
                        </p>
                        <p className="text-sm text-muted-foreground">
                            of {path.nodes.reduce((sum, n) => sum + n.xp, 0)} XP total
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
