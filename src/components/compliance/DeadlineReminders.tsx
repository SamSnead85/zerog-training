"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Bell,
    Clock,
    Calendar,
    Mail,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Settings,
    Plus,
    Trash2,
    Edit2,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReminderType = "deadline" | "overdue" | "recertification" | "custom";
type ReminderChannel = "email" | "slack" | "teams" | "in_app";

interface ReminderRule {
    id: string;
    name: string;
    type: ReminderType;
    trigger: {
        daysBeforeDue?: number;
        daysAfterOverdue?: number;
        recertDaysBefore?: number;
    };
    channels: ReminderChannel[];
    recipients: {
        learner: boolean;
        manager: boolean;
        admin: boolean;
    };
    message: string;
    isActive: boolean;
    lastSent?: string;
    totalSent: number;
}

interface UpcomingReminder {
    id: string;
    userName: string;
    courseName: string;
    dueDate: string;
    daysRemaining: number;
    status: "upcoming" | "due_soon" | "overdue";
}

const typeConfig: Record<ReminderType, { label: string; color: string; icon: React.ElementType }> = {
    deadline: { label: "Deadline", color: "bg-blue-500/20 text-blue-500", icon: Calendar },
    overdue: { label: "Overdue", color: "bg-red-500/20 text-red-500", icon: AlertTriangle },
    recertification: { label: "Recertification", color: "bg-amber-500/20 text-amber-500", icon: Clock },
    custom: { label: "Custom", color: "bg-purple-500/20 text-purple-500", icon: Bell },
};

const mockRules: ReminderRule[] = [
    { id: "1", name: "7-Day Deadline Warning", type: "deadline", trigger: { daysBeforeDue: 7 }, channels: ["email", "in_app"], recipients: { learner: true, manager: false, admin: false }, message: "Your training {course_name} is due in 7 days.", isActive: true, lastSent: "2 hours ago", totalSent: 156 },
    { id: "2", name: "3-Day Final Reminder", type: "deadline", trigger: { daysBeforeDue: 3 }, channels: ["email", "slack"], recipients: { learner: true, manager: true, admin: false }, message: "URGENT: Only 3 days left to complete {course_name}.", isActive: true, lastSent: "4 hours ago", totalSent: 89 },
    { id: "3", name: "Overdue Escalation", type: "overdue", trigger: { daysAfterOverdue: 1 }, channels: ["email"], recipients: { learner: true, manager: true, admin: true }, message: "Training {course_name} is now OVERDUE. Please complete immediately.", isActive: true, lastSent: "1 day ago", totalSent: 45 },
    { id: "4", name: "30-Day Recertification Notice", type: "recertification", trigger: { recertDaysBefore: 30 }, channels: ["email", "in_app"], recipients: { learner: true, manager: false, admin: false }, message: "Your {course_name} certification expires in 30 days.", isActive: true, lastSent: "5 days ago", totalSent: 234 },
    { id: "5", name: "Weekly Manager Digest", type: "custom", trigger: {}, channels: ["email"], recipients: { learner: false, manager: true, admin: false }, message: "Weekly team compliance summary attached.", isActive: false, totalSent: 12 },
];

const mockUpcoming: UpcomingReminder[] = [
    { id: "1", userName: "Sarah Chen", courseName: "HIPAA Fundamentals", dueDate: "Jan 2, 2025", daysRemaining: 5, status: "due_soon" },
    { id: "2", userName: "Michael Brown", courseName: "SOC2 Security Awareness", dueDate: "Jan 5, 2025", daysRemaining: 8, status: "upcoming" },
    { id: "3", userName: "Emily Rodriguez", courseName: "GDPR Compliance", dueDate: "Dec 29, 2024", daysRemaining: 1, status: "due_soon" },
    { id: "4", userName: "David Kim", courseName: "Cybersecurity Basics", dueDate: "Dec 26, 2024", daysRemaining: -2, status: "overdue" },
    { id: "5", userName: "Jennifer Lee", courseName: "Harassment Prevention", dueDate: "Jan 10, 2025", daysRemaining: 13, status: "upcoming" },
];

const statusColors = {
    upcoming: "bg-slate-500/20 text-slate-400",
    due_soon: "bg-amber-500/20 text-amber-500",
    overdue: "bg-red-500/20 text-red-500",
};

export function DeadlineReminders() {
    const [rules, setRules] = useState(mockRules);
    const [upcomingReminders, setUpcomingReminders] = useState(mockUpcoming);
    const [activeTab, setActiveTab] = useState<"rules" | "upcoming">("rules");

    const toggleRule = (ruleId: string) => {
        setRules(prev => prev.map(r =>
            r.id === ruleId ? { ...r, isActive: !r.isActive } : r
        ));
    };

    const stats = {
        activeRules: rules.filter(r => r.isActive).length,
        totalSent: rules.reduce((acc, r) => acc + r.totalSent, 0),
        upcomingCount: upcomingReminders.filter(r => r.status !== "overdue").length,
        overdueCount: upcomingReminders.filter(r => r.status === "overdue").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Deadline Reminders
                    </h2>
                    <p className="text-sm text-muted-foreground">Automated notifications for training deadlines</p>
                </div>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Create Rule
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-2xl font-bold">{stats.activeRules}</div>
                    <div className="text-sm text-muted-foreground">Active Rules</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Sent</div>
                </Card>
                <Card className="p-4 border-amber-500/20">
                    <div className="text-2xl font-bold text-amber-500">{stats.upcomingCount}</div>
                    <div className="text-sm text-muted-foreground">Upcoming Due</div>
                </Card>
                <Card className="p-4 border-red-500/20">
                    <div className="text-2xl font-bold text-red-500">{stats.overdueCount}</div>
                    <div className="text-sm text-muted-foreground">Overdue</div>
                </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border pb-2">
                <Button variant={activeTab === "rules" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("rules")}>
                    Reminder Rules
                </Button>
                <Button variant={activeTab === "upcoming" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("upcoming")}>
                    Upcoming Reminders
                </Button>
            </div>

            {/* Rules Tab */}
            {activeTab === "rules" && (
                <div className="space-y-3">
                    {rules.map((rule) => {
                        const type = typeConfig[rule.type];
                        const TypeIcon = type.icon;

                        return (
                            <Card key={rule.id} className={cn("p-4", !rule.isActive && "opacity-60")}>
                                <div className="flex items-start gap-4">
                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", type.color)}>
                                        <TypeIcon className="h-5 w-5" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-medium">{rule.name}</h4>
                                            <Badge variant="outline" className={cn("text-xs", type.color)}>{type.label}</Badge>
                                            <Badge variant="outline" className={cn("text-xs", rule.isActive ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-500/20 text-slate-400")}>
                                                {rule.isActive ? "Active" : "Paused"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{rule.message}</p>

                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span>Channels: {rule.channels.join(", ")}</span>
                                            <span>Recipients: {Object.entries(rule.recipients).filter(([_, v]) => v).map(([k]) => k).join(", ")}</span>
                                            {rule.lastSent && <span>Last sent: {rule.lastSent}</span>}
                                            <span>{rule.totalSent} sent total</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => toggleRule(rule.id)}>
                                            {rule.isActive ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4" />}
                                        </Button>
                                        <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Upcoming Tab */}
            {activeTab === "upcoming" && (
                <Card className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left p-3 text-sm font-medium">User</th>
                                <th className="text-left p-3 text-sm font-medium">Course</th>
                                <th className="text-left p-3 text-sm font-medium">Due Date</th>
                                <th className="text-left p-3 text-sm font-medium">Status</th>
                                <th className="text-left p-3 text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingReminders.map((reminder) => (
                                <tr key={reminder.id} className="border-b border-border hover:bg-muted/30">
                                    <td className="p-3 font-medium">{reminder.userName}</td>
                                    <td className="p-3 text-sm">{reminder.courseName}</td>
                                    <td className="p-3 text-sm">{reminder.dueDate}</td>
                                    <td className="p-3">
                                        <Badge variant="outline" className={cn("text-xs", statusColors[reminder.status])}>
                                            {reminder.status === "overdue" ? `${Math.abs(reminder.daysRemaining)} days overdue` :
                                                reminder.status === "due_soon" ? `${reminder.daysRemaining} days left` :
                                                    `${reminder.daysRemaining} days`}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Mail className="h-3 w-3" />
                                            Send Now
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </div>
    );
}
