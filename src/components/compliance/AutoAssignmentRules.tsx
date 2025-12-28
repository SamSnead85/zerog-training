"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Settings2,
    Plus,
    Users,
    Calendar,
    Building2,
    Briefcase,
    MapPin,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Trash2,
    Edit2,
    Play,
    Pause,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type RuleType = "department" | "role" | "location" | "hire_date" | "custom";
type RuleStatus = "active" | "paused" | "draft";

interface AssignmentRule {
    id: string;
    name: string;
    description: string;
    type: RuleType;
    criteria: {
        field: string;
        operator: string;
        value: string;
    }[];
    courseIds: string[];
    courseNames: string[];
    dueIn: number; // days
    recertificationCycle?: number; // months
    status: RuleStatus;
    usersAffected: number;
    lastRun?: string;
    createdAt: string;
}

const ruleTypeConfig: Record<RuleType, { icon: React.ElementType; label: string; color: string }> = {
    department: { icon: Building2, label: "Department", color: "bg-blue-500/20 text-blue-500" },
    role: { icon: Briefcase, label: "Role/Title", color: "bg-purple-500/20 text-purple-500" },
    location: { icon: MapPin, label: "Location", color: "bg-emerald-500/20 text-emerald-500" },
    hire_date: { icon: Calendar, label: "Hire Date", color: "bg-amber-500/20 text-amber-500" },
    custom: { icon: Settings2, label: "Custom", color: "bg-slate-500/20 text-slate-400" },
};

const statusConfig: Record<RuleStatus, { label: string; color: string }> = {
    active: { label: "Active", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
    paused: { label: "Paused", color: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
    draft: { label: "Draft", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
};

const mockRules: AssignmentRule[] = [
    {
        id: "1",
        name: "New Hire Onboarding",
        description: "Assign core compliance training to all new employees within first 30 days",
        type: "hire_date",
        criteria: [{ field: "hire_date", operator: "within_days", value: "30" }],
        courseIds: ["hipaa-101", "security-101", "harassment-101"],
        courseNames: ["HIPAA Fundamentals", "Cybersecurity Awareness", "Harassment Prevention"],
        dueIn: 30,
        status: "active",
        usersAffected: 45,
        lastRun: "2 hours ago",
        createdAt: "Nov 15, 2024",
    },
    {
        id: "2",
        name: "Healthcare Staff HIPAA",
        description: "Annual HIPAA recertification for all healthcare department staff",
        type: "department",
        criteria: [{ field: "department", operator: "equals", value: "Healthcare" }],
        courseIds: ["hipaa-advanced"],
        courseNames: ["HIPAA Privacy & Security Advanced"],
        dueIn: 14,
        recertificationCycle: 12,
        status: "active",
        usersAffected: 128,
        lastRun: "1 day ago",
        createdAt: "Jan 5, 2024",
    },
    {
        id: "3",
        name: "Engineering Security Training",
        description: "Quarterly security awareness for engineering team",
        type: "department",
        criteria: [{ field: "department", operator: "equals", value: "Engineering" }],
        courseIds: ["security-advanced", "phishing-sim"],
        courseNames: ["Advanced Security Practices", "Phishing Simulation"],
        dueIn: 21,
        recertificationCycle: 3,
        status: "active",
        usersAffected: 89,
        lastRun: "5 days ago",
        createdAt: "Mar 10, 2024",
    },
    {
        id: "4",
        name: "Manager Leadership Training",
        description: "Leadership fundamentals for all people managers",
        type: "role",
        criteria: [{ field: "role", operator: "contains", value: "Manager" }],
        courseIds: ["leadership-101", "dei-training"],
        courseNames: ["Leadership Fundamentals", "DEI Training"],
        dueIn: 60,
        status: "paused",
        usersAffected: 34,
        createdAt: "Sep 20, 2024",
    },
    {
        id: "5",
        name: "California Privacy (CCPA)",
        description: "CCPA training for California-based employees",
        type: "location",
        criteria: [{ field: "location", operator: "equals", value: "California" }],
        courseIds: ["ccpa-training"],
        courseNames: ["CCPA Privacy Compliance"],
        dueIn: 30,
        status: "draft",
        usersAffected: 56,
        createdAt: "Dec 1, 2024",
    },
];

export function AutoAssignmentRules() {
    const [rules, setRules] = useState(mockRules);
    const [filter, setFilter] = useState<RuleStatus | "all">("all");

    const filtered = rules.filter(r => filter === "all" || r.status === filter);

    const stats = {
        active: rules.filter(r => r.status === "active").length,
        paused: rules.filter(r => r.status === "paused").length,
        draft: rules.filter(r => r.status === "draft").length,
        totalUsers: rules.filter(r => r.status === "active").reduce((acc, r) => acc + r.usersAffected, 0),
    };

    const toggleStatus = (ruleId: string) => {
        setRules(prev => prev.map(r => {
            if (r.id === ruleId) {
                return {
                    ...r,
                    status: r.status === "active" ? "paused" : "active"
                };
            }
            return r;
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Settings2 className="h-5 w-5 text-primary" />
                        Auto-Assignment Rules
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Automatically assign training based on employee attributes
                    </p>
                </div>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Create Rule
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-500">{stats.active}</div>
                    <div className="text-sm text-muted-foreground">Active Rules</div>
                </Card>
                <Card className="p-4 border-amber-500/20">
                    <div className="text-2xl font-bold text-amber-500">{stats.paused}</div>
                    <div className="text-sm text-muted-foreground">Paused</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{stats.draft}</div>
                    <div className="text-sm text-muted-foreground">Drafts</div>
                </Card>
                <Card className="p-4 border-primary/20">
                    <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
                    <div className="text-sm text-muted-foreground">Users Auto-Assigned</div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(["all", "active", "paused", "draft"] as const).map((status) => (
                    <Button
                        key={status}
                        variant={filter === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {status !== "all" && (
                            <Badge variant="outline" className="ml-2">
                                {rules.filter(r => r.status === status).length}
                            </Badge>
                        )}
                    </Button>
                ))}
            </div>

            {/* Rules List */}
            <div className="space-y-4">
                {filtered.map((rule) => {
                    const typeConfig = ruleTypeConfig[rule.type];
                    const TypeIcon = typeConfig.icon;
                    const status = statusConfig[rule.status];

                    return (
                        <Card key={rule.id} className="p-4">
                            <div className="flex items-start gap-4">
                                {/* Type Icon */}
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    typeConfig.color
                                )}>
                                    <TypeIcon className="h-5 w-5" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold">{rule.name}</h4>
                                        <Badge variant="outline" className={cn("text-xs", status.color)}>
                                            {status.label}
                                        </Badge>
                                        {rule.recertificationCycle && (
                                            <Badge variant="outline" className="text-xs">
                                                <Clock className="h-3 w-3 mr-1" />
                                                Every {rule.recertificationCycle} months
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>

                                    {/* Courses */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {rule.courseNames.map((name, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {name}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {rule.usersAffected} users affected
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Due in {rule.dueIn} days
                                        </span>
                                        {rule.lastRun && (
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                Last run {rule.lastRun}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleStatus(rule.id)}
                                        title={rule.status === "active" ? "Pause" : "Activate"}
                                    >
                                        {rule.status === "active" ? (
                                            <Pause className="h-4 w-4" />
                                        ) : (
                                            <Play className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
