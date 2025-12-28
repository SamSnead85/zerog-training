"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Database,
    Activity,
    Clock,
    BarChart3,
    Filter,
    Download,
    RefreshCw,
    ChevronRight,
    Smartphone,
    Globe,
    Gamepad2,
    Video,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatementVerb = "completed" | "attempted" | "passed" | "failed" | "experienced" | "interacted" | "progressed";
type ActivityType = "course" | "module" | "video" | "simulation" | "assessment" | "discussion" | "mobile";

interface xAPIStatement {
    id: string;
    timestamp: string;
    actor: {
        name: string;
        email: string;
    };
    verb: StatementVerb;
    object: {
        name: string;
        type: ActivityType;
    };
    result?: {
        score?: number;
        duration?: string;
        completion?: boolean;
    };
    context?: {
        platform?: string;
        device?: string;
    };
}

interface LRSStats {
    totalStatements: number;
    last24Hours: number;
    uniqueActors: number;
    storageUsed: string;
}

const verbConfig: Record<StatementVerb, { label: string; color: string }> = {
    completed: { label: "Completed", color: "bg-emerald-500/20 text-emerald-500" },
    attempted: { label: "Attempted", color: "bg-blue-500/20 text-blue-500" },
    passed: { label: "Passed", color: "bg-emerald-500/20 text-emerald-500" },
    failed: { label: "Failed", color: "bg-red-500/20 text-red-500" },
    experienced: { label: "Experienced", color: "bg-purple-500/20 text-purple-500" },
    interacted: { label: "Interacted", color: "bg-amber-500/20 text-amber-500" },
    progressed: { label: "Progressed", color: "bg-blue-500/20 text-blue-500" },
};

const activityIcons: Record<ActivityType, React.ElementType> = {
    course: BarChart3,
    module: Database,
    video: Video,
    simulation: Gamepad2,
    assessment: BarChart3,
    discussion: Users,
    mobile: Smartphone,
};

const mockStatements: xAPIStatement[] = [
    { id: "1", timestamp: "2024-12-28T13:45:00Z", actor: { name: "Sarah Chen", email: "sarah@company.com" }, verb: "completed", object: { name: "HIPAA Privacy Fundamentals", type: "course" }, result: { score: 92, duration: "PT1H30M", completion: true }, context: { platform: "web", device: "desktop" } },
    { id: "2", timestamp: "2024-12-28T13:30:00Z", actor: { name: "Michael Brown", email: "m.brown@company.com" }, verb: "passed", object: { name: "Security Assessment Q4", type: "assessment" }, result: { score: 85, completion: true }, context: { platform: "mobile", device: "iOS" } },
    { id: "3", timestamp: "2024-12-28T13:15:00Z", actor: { name: "Emily Rodriguez", email: "e.rodriguez@company.com" }, verb: "experienced", object: { name: "Phishing Simulation", type: "simulation" }, result: { duration: "PT15M" }, context: { platform: "web", device: "desktop" } },
    { id: "4", timestamp: "2024-12-28T13:00:00Z", actor: { name: "David Kim", email: "d.kim@company.com" }, verb: "progressed", object: { name: "SOC2 Training Module 3", type: "module" }, result: { score: 45, completion: false }, context: { platform: "web", device: "desktop" } },
    { id: "5", timestamp: "2024-12-28T12:45:00Z", actor: { name: "Jennifer Lee", email: "j.lee@company.com" }, verb: "interacted", object: { name: "Leadership Discussion Thread", type: "discussion" }, context: { platform: "mobile", device: "Android" } },
    { id: "6", timestamp: "2024-12-28T12:30:00Z", actor: { name: "Robert Wilson", email: "r.wilson@company.com" }, verb: "attempted", object: { name: "Data Privacy Quiz", type: "assessment" }, result: { score: 68, completion: false }, context: { platform: "web", device: "desktop" } },
    { id: "7", timestamp: "2024-12-28T12:15:00Z", actor: { name: "Sarah Chen", email: "sarah@company.com" }, verb: "experienced", object: { name: "Compliance Video Series", type: "video" }, result: { duration: "PT25M" }, context: { platform: "mobile", device: "iOS" } },
];

const mockStats: LRSStats = {
    totalStatements: 145892,
    last24Hours: 3456,
    uniqueActors: 523,
    storageUsed: "2.4 GB",
};

export function xAPILearningRecordStore() {
    const [statements, setStatements] = useState(mockStatements);
    const [stats, setStats] = useState(mockStats);
    const [verbFilter, setVerbFilter] = useState<StatementVerb | "all">("all");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const filtered = statements.filter(s => verbFilter === "all" || s.verb === verbFilter);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Learning Record Store (xAPI)
                    </h2>
                    <p className="text-sm text-muted-foreground">Track learning experiences across all platforms</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                        <RefreshCw className={cn("h-4 w-4 mr-1", isRefreshing && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Total Statements</span>
                    </div>
                    <div className="text-2xl font-bold">{stats.totalStatements.toLocaleString()}</div>
                </Card>
                <Card className="p-4 border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-muted-foreground">Last 24 Hours</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-500">+{stats.last24Hours.toLocaleString()}</div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Unique Learners</span>
                    </div>
                    <div className="text-2xl font-bold">{stats.uniqueActors}</div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Storage Used</span>
                    </div>
                    <div className="text-2xl font-bold">{stats.storageUsed}</div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
                {(["all", "completed", "passed", "failed", "attempted", "progressed", "experienced"] as const).map((verb) => (
                    <Button
                        key={verb}
                        variant={verbFilter === verb ? "default" : "outline"}
                        size="sm"
                        onClick={() => setVerbFilter(verb)}
                    >
                        {verb === "all" ? "All" : verbConfig[verb].label}
                    </Button>
                ))}
            </div>

            {/* Statements Feed */}
            <Card className="overflow-hidden">
                <div className="divide-y divide-border">
                    {filtered.map((statement) => {
                        const verb = verbConfig[statement.verb];
                        const ActivityIcon = activityIcons[statement.object.type];

                        return (
                            <div key={statement.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                    {statement.actor.name.split(" ").map(n => n[0]).join("")}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-medium">{statement.actor.name}</span>
                                        <Badge variant="outline" className={cn("text-xs", verb.color)}>
                                            {verb.label}
                                        </Badge>
                                        <span className="flex items-center gap-1 text-sm">
                                            <ActivityIcon className="h-3 w-3" />
                                            {statement.object.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                        {statement.result?.score !== undefined && (
                                            <span>Score: {statement.result.score}%</span>
                                        )}
                                        {statement.result?.duration && (
                                            <span>Duration: {statement.result.duration.replace("PT", "").toLowerCase()}</span>
                                        )}
                                        {statement.context?.platform && (
                                            <span className="flex items-center gap-1">
                                                {statement.context.platform === "mobile" ? <Smartphone className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                                                {statement.context.device}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    {new Date(statement.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* API Info */}
            <Card className="p-4 bg-muted/50">
                <h4 className="font-medium mb-2">xAPI Endpoint</h4>
                <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                    POST https://api.zerogtraining.com/lrs/statements
                </code>
                <p className="text-xs text-muted-foreground">
                    Compatible with xAPI 1.0.3 specification. Supports Statement API, State API, and Activity Profile API.
                </p>
            </Card>
        </div>
    );
}
