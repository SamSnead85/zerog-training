"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ChevronRight,
    Lock,
    Check,
    Play,
    Clock,
    Award,
    Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
    id: string;
    title: string;
    description: string;
    duration: string;
    lessonsCount: number;
    completedLessons: number;
    status: "locked" | "available" | "in_progress" | "completed";
    xpReward: number;
}

interface Track {
    id: string;
    title: string;
    description: string;
    badge: string;
    color: string;
    modules: Module[];
}

interface VisualLearningPathProps {
    tracks: Track[];
    currentTrackId?: string;
    className?: string;
}

export function VisualLearningPath({ tracks, currentTrackId, className }: VisualLearningPathProps) {
    const [activeTrack, setActiveTrack] = useState(currentTrackId || tracks[0]?.id);
    const track = tracks.find(t => t.id === activeTrack) || tracks[0];

    if (!track) return null;

    const completedModules = track.modules.filter(m => m.status === "completed").length;
    const totalProgress = (completedModules / track.modules.length) * 100;

    return (
        <div className={cn("space-y-6", className)}>
            {/* Track selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tracks.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTrack(t.id)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                            activeTrack === t.id
                                ? "bg-white text-black"
                                : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                        )}
                    >
                        <span className="mr-2">{t.badge}</span>
                        {t.title}
                    </button>
                ))}
            </div>

            {/* Track header */}
            <Card className="p-6 bg-white/[0.02] border-white/10">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="text-2xl">{track.badge}</span>
                            {track.title}
                        </h2>
                        <p className="text-white/60 mt-1">{track.description}</p>
                    </div>
                    <Badge className={cn(
                        totalProgress === 100
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-white/10 text-white/60"
                    )}>
                        {Math.round(totalProgress)}% Complete
                    </Badge>
                </div>
                <Progress value={totalProgress} className="h-2" />
            </Card>

            {/* Module list with path visualization */}
            <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-white/10" />

                <div className="space-y-4">
                    {track.modules.map((module, index) => (
                        <ModuleCard
                            key={module.id}
                            module={module}
                            index={index}
                            isLast={index === track.modules.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ModuleCard({
    module,
    index,
    isLast
}: {
    module: Module;
    index: number;
    isLast: boolean;
}) {
    const progress = (module.completedLessons / module.lessonsCount) * 100;

    const statusConfig = {
        locked: { icon: Lock, color: "bg-white/10", text: "text-white/30" },
        available: { icon: Play, color: "bg-primary/20", text: "text-primary" },
        in_progress: { icon: Play, color: "bg-amber-500/20", text: "text-amber-400" },
        completed: { icon: Check, color: "bg-emerald-500/20", text: "text-emerald-400" },
    };

    const config = statusConfig[module.status];
    const StatusIcon = config.icon;

    return (
        <Link
            href={module.status === "locked" ? "#" : `/learn/module/${module.id}`}
            className={cn(
                "block",
                module.status === "locked" && "pointer-events-none"
            )}
        >
            <div className="relative flex gap-4 group">
                {/* Node indicator */}
                <div className={cn(
                    "relative z-10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
                    config.color,
                    module.status !== "locked" && "group-hover:scale-110 transition-transform"
                )}>
                    <StatusIcon className={cn("h-6 w-6", config.text)} />
                </div>

                {/* Module content */}
                <Card className={cn(
                    "flex-1 p-4 transition-all",
                    module.status === "locked"
                        ? "bg-white/[0.01] border-white/5 opacity-50"
                        : "bg-white/[0.02] border-white/10 group-hover:bg-white/[0.04] group-hover:border-white/20"
                )}>
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className={cn(
                                "font-semibold",
                                module.status === "locked" ? "text-white/30" : ""
                            )}>
                                {module.title}
                            </h3>
                            <p className={cn(
                                "text-sm mt-1",
                                module.status === "locked" ? "text-white/20" : "text-white/50"
                            )}>
                                {module.description}
                            </p>
                        </div>
                        {module.status !== "locked" && (
                            <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                {module.xpReward} XP
                            </span>
                            <span>
                                {module.completedLessons}/{module.lessonsCount} lessons
                            </span>
                        </div>

                        {module.status === "in_progress" && (
                            <div className="w-24">
                                <Progress value={progress} className="h-1" />
                            </div>
                        )}

                        {module.status === "completed" && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Complete
                            </Badge>
                        )}
                    </div>
                </Card>
            </div>
        </Link>
    );
}

// Simplified track card for overview
export function TrackProgressCard({
    track,
    className,
}: {
    track: Track;
    className?: string;
}) {
    const completedModules = track.modules.filter(m => m.status === "completed").length;
    const progress = (completedModules / track.modules.length) * 100;

    return (
        <Link href={`/learn/track/${track.id}`}>
            <Card className={cn(
                "p-5 bg-white/[0.02] border-white/10 hover:bg-white/[0.04] transition-all group",
                className
            )}>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-2xl">
                        {track.badge}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {track.title}
                        </h3>
                        <p className="text-sm text-white/50">{track.modules.length} modules</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/50">{completedModules}/{track.modules.length} completed</span>
                    <span className="text-xs font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
            </Card>
        </Link>
    );
}
