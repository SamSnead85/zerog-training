"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    User,
    MessageSquare,
    Calendar,
    Clock,
    Video,
    Star,
    CheckCircle,
    Target,
    TrendingUp,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Coach/mentor profile card
interface CoachProfile {
    id: string;
    name: string;
    title: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    available: boolean;
    nextAvailable?: string;
}

export function CoachProfileCard({
    coach,
    onBook,
    onMessage,
}: {
    coach: CoachProfile;
    onBook: (coachId: string) => void;
    onMessage: (coachId: string) => void;
}) {
    return (
        <Card className="p-6 bg-white/[0.02] border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-2xl font-bold">
                    {coach.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{coach.name}</h3>
                        {coach.available && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Available now" />
                        )}
                    </div>
                    <p className="text-sm text-white/60">{coach.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-medium">{coach.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-white/40">({coach.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
                {coach.specialties.slice(0, 3).map((specialty, i) => (
                    <Badge key={i} className="bg-white/10 text-white/70 text-xs">
                        {specialty}
                    </Badge>
                ))}
                {coach.specialties.length > 3 && (
                    <Badge className="bg-white/10 text-white/50 text-xs">
                        +{coach.specialties.length - 3}
                    </Badge>
                )}
            </div>

            {coach.available ? (
                <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => onBook(coach.id)}>
                        <Video className="h-4 w-4 mr-2" />
                        Book Session
                    </Button>
                    <Button variant="outline" onClick={() => onMessage(coach.id)}>
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-sm text-white/50 mb-2">
                        Next available: {coach.nextAvailable}
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => onBook(coach.id)}>
                        Schedule Session
                    </Button>
                </div>
            )}
        </Card>
    );
}

// Coaching session card
interface CoachingSession {
    id: string;
    coachName: string;
    topic: string;
    scheduledAt: string;
    duration: number;
    status: "upcoming" | "in-progress" | "completed" | "cancelled";
    meetingUrl?: string;
    notes?: string;
}

export function CoachingSessionCard({
    session,
    onJoin,
    onReschedule,
    onCancel,
}: {
    session: CoachingSession;
    onJoin?: () => void;
    onReschedule?: () => void;
    onCancel?: () => void;
}) {
    const statusConfig = {
        upcoming: { label: "Upcoming", color: "bg-blue-500/20 text-blue-400" },
        "in-progress": { label: "In Progress", color: "bg-emerald-500/20 text-emerald-400" },
        completed: { label: "Completed", color: "bg-white/10 text-white/50" },
        cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400" },
    };

    const sessionDate = new Date(session.scheduledAt);
    const isToday = sessionDate.toDateString() === new Date().toDateString();

    return (
        <Card className={cn(
            "p-4 border transition-all",
            session.status === "in-progress" && "bg-emerald-500/5 border-emerald-500/30",
            session.status !== "in-progress" && "bg-white/[0.02] border-white/10"
        )}>
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-semibold">{session.topic}</h4>
                    <p className="text-sm text-white/50">with {session.coachName}</p>
                </div>
                <Badge className={statusConfig[session.status].color}>
                    {statusConfig[session.status].label}
                </Badge>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {isToday ? "Today" : sessionDate.toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span>{session.duration} min</span>
            </div>

            {session.status === "upcoming" && (
                <div className="flex gap-2">
                    {onJoin && session.meetingUrl && (
                        <Button className="flex-1" onClick={onJoin}>
                            <Video className="h-4 w-4 mr-2" />
                            Join Session
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={onReschedule}>
                        Reschedule
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        className="text-red-400 border-red-400/30"
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {session.status === "in-progress" && onJoin && (
                <Button className="w-full" onClick={onJoin}>
                    <Video className="h-4 w-4 mr-2" />
                    Rejoin Session
                </Button>
            )}
        </Card>
    );
}

// Learning goal with coach feedback
export function CoachingGoalCard({
    goal,
    onUpdate,
}: {
    goal: {
        id: string;
        title: string;
        description: string;
        progress: number;
        targetDate: string;
        coachNotes?: string;
        milestones: { title: string; completed: boolean }[];
    };
    onUpdate: (goalId: string) => void;
}) {
    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">{goal.title}</h4>
                </div>
                <Badge className="bg-white/10 text-white/60 text-xs">
                    Due {new Date(goal.targetDate).toLocaleDateString()}
                </Badge>
            </div>

            <p className="text-sm text-white/60 mb-4">{goal.description}</p>

            <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/60">Progress</span>
                    <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
            </div>

            {/* Milestones */}
            <div className="space-y-2 mb-4">
                {goal.milestones.map((milestone, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={cn(
                            "h-4 w-4",
                            milestone.completed ? "text-emerald-400" : "text-white/30"
                        )} />
                        <span className={milestone.completed ? "text-white/70" : "text-white/50"}>
                            {milestone.title}
                        </span>
                    </div>
                ))}
            </div>

            {goal.coachNotes && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-primary mb-1">Coach Notes</p>
                    <p className="text-sm text-white/80">{goal.coachNotes}</p>
                </div>
            )}

            <Button variant="outline" className="w-full mt-4" onClick={() => onUpdate(goal.id)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Update Progress
            </Button>
        </Card>
    );
}

// Book session time slots
export function SessionTimeSlots({
    date,
    slots,
    selectedSlot,
    onSelectSlot,
}: {
    date: Date;
    slots: { time: string; available: boolean }[];
    selectedSlot: string | null;
    onSelectSlot: (time: string) => void;
}) {
    return (
        <div>
            <p className="text-sm text-white/60 mb-3">
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <div className="grid grid-cols-3 gap-2">
                {slots.map((slot, i) => (
                    <button
                        key={i}
                        onClick={() => slot.available && onSelectSlot(slot.time)}
                        disabled={!slot.available}
                        className={cn(
                            "px-3 py-2 rounded-lg text-sm transition-colors",
                            slot.available && slot.time === selectedSlot && "bg-primary text-white",
                            slot.available && slot.time !== selectedSlot && "bg-white/10 hover:bg-white/20",
                            !slot.available && "bg-white/5 text-white/30 cursor-not-allowed"
                        )}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>
        </div>
    );
}
