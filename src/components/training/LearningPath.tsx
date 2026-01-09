"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    aiNativeCurriculum,
    certificationTracks,
    type AIModule,
    type CertificationTrack
} from "@/lib/curriculum/ai-native-curriculum";
import {
    CheckCircle2,
    Lock,
    Play,
    ChevronRight,
    Trophy,
    GraduationCap,
    Layers,
    Crown
} from "lucide-react";
import { Card, Badge, Progress } from "@/components/ui";

interface ModuleProgress {
    moduleId: string;
    lessonsCompleted: number;
    totalLessons: number;
    labsCompleted: number;
    totalLabs: number;
    conceptCheckScore?: number;
    isComplete: boolean;
}

interface LearningPathProps {
    currentModuleId: string;
    // In production, this would come from a user context/API
    progress?: Record<string, ModuleProgress>;
}

const levelIcons = {
    foundations: GraduationCap,
    associate: Layers,
    professional: Trophy,
    architect: Crown,
    leader: Trophy,
    data: Layers
};

const levelColors = {
    foundations: {
        bg: "bg-blue-500",
        text: "text-blue-500",
        border: "border-blue-500",
        light: "bg-blue-500/10"
    },
    associate: {
        bg: "bg-emerald-500",
        text: "text-emerald-500",
        border: "border-emerald-500",
        light: "bg-emerald-500/10"
    },
    professional: {
        bg: "bg-purple-500",
        text: "text-purple-500",
        border: "border-purple-500",
        light: "bg-purple-500/10"
    },
    architect: {
        bg: "bg-amber-500",
        text: "text-amber-500",
        border: "border-amber-500",
        light: "bg-amber-500/10"
    },
    leader: {
        bg: "bg-rose-500",
        text: "text-rose-500",
        border: "border-rose-500",
        light: "bg-rose-500/10"
    },
    data: {
        bg: "bg-cyan-500",
        text: "text-cyan-500",
        border: "border-cyan-500",
        light: "bg-cyan-500/10"
    }
};

export function LearningPath({ currentModuleId, progress = {} }: LearningPathProps) {
    // Group modules by certification track
    const modulesByTrack = certificationTracks.map(track => ({
        track,
        modules: track.modules.map(id =>
            aiNativeCurriculum.find(m => m.id === id)
        ).filter(Boolean) as AIModule[]
    }));

    const getModuleStatus = (module: AIModule, trackIndex: number, moduleIndex: number): "complete" | "current" | "available" | "locked" => {
        if (module.id === currentModuleId) return "current";

        const prog = progress[module.id];
        if (prog?.isComplete) return "complete";

        // Check if prerequisites are met
        if (moduleIndex > 0) {
            const prevModule = modulesByTrack[trackIndex].modules[moduleIndex - 1];
            if (prevModule && !progress[prevModule.id]?.isComplete) {
                return "locked";
            }
        }
        if (trackIndex > 0) {
            const prevTrack = modulesByTrack[trackIndex - 1];
            const lastModuleOfPrevTrack = prevTrack.modules[prevTrack.modules.length - 1];
            if (lastModuleOfPrevTrack && !progress[lastModuleOfPrevTrack.id]?.isComplete) {
                return "locked";
            }
        }

        return "available";
    };

    const getTrackProgress = (track: CertificationTrack): number => {
        const trackModules = track.modules;
        const completedModules = trackModules.filter(id => progress[id]?.isComplete).length;
        return (completedModules / trackModules.length) * 100;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Learning Path</h3>
                <Badge variant="outline" className="text-xs">
                    {certificationTracks.length} Certification Levels
                </Badge>
            </div>

            <div className="relative">
                {/* Vertical connection line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                {modulesByTrack.map((group, trackIndex) => {
                    const track = group.track;
                    const colors = levelColors[track.level];
                    const Icon = levelIcons[track.level];
                    const trackProgress = getTrackProgress(track);
                    const isTrackActive = group.modules.some(m => m.id === currentModuleId);

                    return (
                        <div key={track.id} className="relative mb-8 last:mb-0">
                            {/* Track Header */}
                            <div className={cn(
                                "relative z-10 flex items-center gap-3 mb-4 pl-2",
                                isTrackActive && "font-medium"
                            )}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                    trackProgress === 100 ? colors.bg : colors.light,
                                    trackProgress === 100 ? "text-white" : colors.text
                                )}>
                                    {trackProgress === 100 ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <Icon className="h-4 w-4" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "text-sm font-medium",
                                            isTrackActive ? colors.text : "text-muted-foreground"
                                        )}>
                                            {track.shortTitle}
                                        </span>
                                        <Badge variant="outline" className="text-[10px]">
                                            {track.certificationCode}
                                        </Badge>
                                    </div>
                                    <Progress value={trackProgress} className="h-1 mt-1 w-24" />
                                </div>
                            </div>

                            {/* Modules in this track */}
                            <div className="ml-10 space-y-2">
                                {group.modules.map((module, moduleIndex) => {
                                    const status = getModuleStatus(module, trackIndex, moduleIndex);
                                    const prog = progress[module.id];
                                    const isCurrent = module.id === currentModuleId;

                                    return (
                                        <Link
                                            key={module.id}
                                            href={status === "locked" ? "#" : `/training/${module.id}`}
                                            className={cn(
                                                "block p-3 rounded-lg border transition-all",
                                                status === "current" && "bg-primary/10 border-primary",
                                                status === "complete" && "bg-emerald-500/10 border-emerald-500/30",
                                                status === "available" && "hover:bg-muted border-border hover:border-primary/30",
                                                status === "locked" && "opacity-50 cursor-not-allowed border-border"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                                                    status === "complete" && "bg-emerald-500 text-white",
                                                    status === "current" && "bg-primary text-primary-foreground",
                                                    status === "available" && "bg-muted",
                                                    status === "locked" && "bg-muted"
                                                )}>
                                                    {status === "complete" ? (
                                                        <CheckCircle2 className="h-3 w-3" />
                                                    ) : status === "locked" ? (
                                                        <Lock className="h-3 w-3" />
                                                    ) : status === "current" ? (
                                                        <Play className="h-3 w-3" />
                                                    ) : (
                                                        module.number
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className={cn(
                                                        "text-sm block truncate",
                                                        isCurrent && "font-medium"
                                                    )}>
                                                        {module.title}
                                                    </span>
                                                    {prog && !prog.isComplete && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {prog.lessonsCompleted}/{prog.totalLessons} lessons
                                                        </span>
                                                    )}
                                                </div>
                                                {isCurrent && (
                                                    <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Mastery Gate Component
interface MasteryGateProps {
    moduleName: string;
    requirements: {
        type: "lessons" | "labs" | "conceptCheck" | "project";
        label: string;
        current: number;
        required: number;
    }[];
    isUnlocked: boolean;
    onProceed?: () => void;
}

export function MasteryGate({ moduleName, requirements, isUnlocked, onProceed }: MasteryGateProps) {
    const allMet = requirements.every(r => r.current >= r.required);

    return (
        <Card className={cn(
            "p-6 border-2",
            allMet ? "border-emerald-500/50 bg-emerald-500/5" : "border-amber-500/50 bg-amber-500/5"
        )}>
            <div className="flex items-center gap-3 mb-4">
                {allMet ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                ) : (
                    <Lock className="h-6 w-6 text-amber-500" />
                )}
                <div>
                    <h4 className="font-semibold">
                        {allMet ? "Ready to Proceed!" : "Mastery Requirements"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {allMet
                            ? `You've met all requirements to advance from ${moduleName}`
                            : `Complete these requirements to advance from ${moduleName}`
                        }
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {requirements.map((req, i) => {
                    const met = req.current >= req.required;
                    const percentage = Math.min((req.current / req.required) * 100, 100);

                    return (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{req.label}</span>
                                <span className={cn(
                                    "text-sm font-medium",
                                    met ? "text-emerald-500" : "text-muted-foreground"
                                )}>
                                    {req.current}/{req.required}
                                    {met && " ✓"}
                                </span>
                            </div>
                            <Progress
                                value={percentage}
                                className={cn(
                                    "h-2",
                                    met && "[&>div]:bg-emerald-500"
                                )}
                            />
                        </div>
                    );
                })}
            </div>

            {allMet && onProceed && (
                <button
                    onClick={onProceed}
                    className="mt-4 w-full py-2 px-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                    Continue to Next Module
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}
        </Card>
    );
}

// Progress Summary Component
interface ProgressSummaryProps {
    moduleId: string;
    title: string;
    progress: {
        lessonsCompleted: number;
        totalLessons: number;
        labsCompleted: number;
        totalLabs: number;
        conceptCheckScore?: number;
        projectSubmitted: boolean;
    };
}

export function ProgressSummary({ moduleId, title, progress }: ProgressSummaryProps) {
    const lessonPercent = (progress.lessonsCompleted / progress.totalLessons) * 100;
    const labPercent = progress.totalLabs > 0
        ? (progress.labsCompleted / progress.totalLabs) * 100
        : 100;
    const overallPercent = (lessonPercent + labPercent + (progress.conceptCheckScore || 0) + (progress.projectSubmitted ? 100 : 0)) / 4;

    return (
        <Card className="p-6">
            <h3 className="font-semibold mb-4">Your Progress</h3>

            <div className="mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Overall</span>
                    <span className="text-sm font-medium">{Math.round(overallPercent)}%</span>
                </div>
                <Progress value={overallPercent} className="h-3" />
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lessons</span>
                    <span>{progress.lessonsCompleted}/{progress.totalLessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Labs</span>
                    <span>{progress.labsCompleted}/{progress.totalLabs}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Concept Check</span>
                    <span>{progress.conceptCheckScore ? `${progress.conceptCheckScore}%` : "Not taken"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Project</span>
                    <span>{progress.projectSubmitted ? "✓ Submitted" : "Not started"}</span>
                </div>
            </div>
        </Card>
    );
}

export default LearningPath;
