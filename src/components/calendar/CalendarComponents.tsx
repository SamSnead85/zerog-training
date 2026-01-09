"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Calendar,
    Clock,
    Plus,
    ChevronLeft,
    ChevronRight,
    Target,
    BookOpen,
    Trophy,
    Bell,
    CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Calendar event type
interface CalendarEvent {
    id: string;
    title: string;
    type: "lesson" | "quiz" | "live" | "deadline" | "group";
    date: string;
    time?: string;
    duration?: string;
    completed?: boolean;
}

// Learning calendar
export function LearningCalendar({
    events,
    onEventClick,
    onAddEvent,
}: {
    events: CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
    onAddEvent: () => void;
}) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        return { daysInMonth, startingDay };
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

    const getEventsForDay = (day: number) => {
        const dateStr = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        ).toISOString().split("T")[0];
        return events.filter(e => e.date.startsWith(dateStr));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const eventTypeColors = {
        lesson: "bg-blue-500",
        quiz: "bg-emerald-500",
        live: "bg-purple-500",
        deadline: "bg-red-500",
        group: "bg-amber-500",
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">
                        {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h3>
                    <div className="flex items-center gap-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <Button size="sm" onClick={onAddEvent}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                </Button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-center text-xs text-white/40 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before first day */}
                {Array.from({ length: startingDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const isToday = new Date().toDateString() ===
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

                    return (
                        <div
                            key={day}
                            className={cn(
                                "aspect-square p-1 rounded-lg transition-colors",
                                isToday && "bg-primary/20 border border-primary/30",
                                !isToday && "hover:bg-white/5"
                            )}
                        >
                            <div className="text-xs text-white/60 mb-1">{day}</div>
                            <div className="space-y-0.5">
                                {dayEvents.slice(0, 2).map(event => (
                                    <button
                                        key={event.id}
                                        onClick={() => onEventClick(event)}
                                        className={cn(
                                            "w-full h-1.5 rounded-full",
                                            eventTypeColors[event.type]
                                        )}
                                        title={event.title}
                                    />
                                ))}
                                {dayEvents.length > 2 && (
                                    <div className="text-[10px] text-white/40 text-center">
                                        +{dayEvents.length - 2}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs">
                {Object.entries(eventTypeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-1">
                        <div className={cn("w-2 h-2 rounded-full", color)} />
                        <span className="capitalize text-white/50">{type}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Weekly schedule view
export function WeeklySchedule({
    events,
    onEventClick,
}: {
    events: CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
}) {
    const getWeekDays = () => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1);

        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            return date;
        });
    };

    const weekDays = getWeekDays();

    const getEventsForDay = (date: Date) => {
        const dateStr = date.toISOString().split("T")[0];
        return events.filter(e => e.date.startsWith(dateStr));
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                This Week
            </h3>

            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((date, i) => {
                    const dayEvents = getEventsForDay(date);
                    const isToday = date.toDateString() === new Date().toDateString();

                    return (
                        <div key={i} className="space-y-2">
                            <div className={cn(
                                "text-center p-2 rounded-lg",
                                isToday && "bg-primary/20"
                            )}>
                                <div className="text-xs text-white/40">
                                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                                </div>
                                <div className={cn(
                                    "text-lg font-bold",
                                    isToday && "text-primary"
                                )}>
                                    {date.getDate()}
                                </div>
                            </div>

                            <div className="space-y-1">
                                {dayEvents.map(event => (
                                    <button
                                        key={event.id}
                                        onClick={() => onEventClick(event)}
                                        className={cn(
                                            "w-full p-2 rounded-lg text-left text-xs transition-colors",
                                            event.completed
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-white/5 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="truncate font-medium">{event.title}</div>
                                        {event.time && (
                                            <div className="text-white/40">{event.time}</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

// Reminder settings type
interface ReminderSettings {
    enabled: boolean;
    time: string;
    days: number[];
    reminderType: "push" | "email" | "both";
}

// Study reminder settings
export function StudyReminderSettings({
    settings,
    onUpdate,
}: {
    settings: ReminderSettings;
    onUpdate: (settings: ReminderSettings) => void;
}) {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const toggleDay = (day: number) => {
        const newDays = settings.days.includes(day)
            ? settings.days.filter(d => d !== day)
            : [...settings.days, day];
        onUpdate({ ...settings, days: newDays });
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold flex items-center gap-2">
                        <Bell className="h-5 w-5 text-amber-400" />
                        Study Reminders
                    </h3>
                    <p className="text-sm text-white/50">
                        Get reminded to keep your streak going
                    </p>
                </div>
                <button
                    onClick={() => onUpdate({ ...settings, enabled: !settings.enabled })}
                    className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        settings.enabled ? "bg-primary" : "bg-white/20"
                    )}
                >
                    <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        settings.enabled ? "left-7" : "left-1"
                    )} />
                </button>
            </div>

            {settings.enabled && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm text-white/60 mb-2">Reminder time</label>
                        <input
                            type="time"
                            value={settings.time}
                            onChange={(e) => onUpdate({ ...settings, time: e.target.value })}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-white/60 mb-2">Days</label>
                        <div className="flex gap-2">
                            {dayNames.map((name, i) => (
                                <button
                                    key={i}
                                    onClick={() => toggleDay(i)}
                                    className={cn(
                                        "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                                        settings.days.includes(i)
                                            ? "bg-primary text-white"
                                            : "bg-white/10 text-white/50 hover:bg-white/20"
                                    )}
                                >
                                    {name.charAt(0)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Reminder type</label>
                        <select
                            value={settings.reminderType}
                            onChange={(e) => onUpdate({ ...settings, reminderType: e.target.value as any })}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                        >
                            <option value="push">Push notification</option>
                            <option value="email">Email</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                </>
            )}
        </Card>
    );
}
