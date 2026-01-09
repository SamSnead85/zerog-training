"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    FileText,
    Download,
    Calendar,
    Clock,
    Trophy,
    BarChart3,
    TrendingUp,
    BookOpen,
    Send,
    Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Learning progress report
export function LearningReport({
    data,
    period,
    onExport,
}: {
    data: {
        totalLessons: number;
        completedLessons: number;
        totalModules: number;
        completedModules: number;
        hoursSpent: number;
        quizzesPassed: number;
        averageScore: number;
        streakDays: number;
        xpEarned: number;
    };
    period: string;
    onExport: (format: "pdf" | "csv") => void;
}) {
    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg">Learning Progress Report</h3>
                    <p className="text-sm text-white/50">{period}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onExport("csv")}>
                        <Download className="h-4 w-4 mr-2" />
                        CSV
                    </Button>
                    <Button size="sm" onClick={() => onExport("pdf")}>
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                    </Button>
                </div>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatBox
                    icon={<BookOpen className="h-5 w-5 text-blue-400" />}
                    label="Lessons Completed"
                    value={`${data.completedLessons}/${data.totalLessons}`}
                    progress={(data.completedLessons / data.totalLessons) * 100}
                />
                <StatBox
                    icon={<Clock className="h-5 w-5 text-emerald-400" />}
                    label="Hours Learned"
                    value={`${data.hoursSpent}h`}
                />
                <StatBox
                    icon={<Trophy className="h-5 w-5 text-amber-400" />}
                    label="Quizzes Passed"
                    value={data.quizzesPassed.toString()}
                    subValue={`${data.averageScore}% avg`}
                />
                <StatBox
                    icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
                    label="XP Earned"
                    value={data.xpEarned.toLocaleString()}
                />
            </div>

            {/* Module breakdown */}
            <h4 className="font-medium mb-4">Module Progress</h4>
            <Progress
                value={(data.completedModules / data.totalModules) * 100}
                className="h-3 mb-2"
            />
            <p className="text-sm text-white/50">
                {data.completedModules} of {data.totalModules} modules completed
            </p>
        </Card>
    );
}

function StatBox({
    icon,
    label,
    value,
    subValue,
    progress,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
    progress?: number;
}) {
    return (
        <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-xs text-white/50">{label}</span>
            </div>
            <div className="text-2xl font-bold">{value}</div>
            {subValue && <div className="text-xs text-white/40">{subValue}</div>}
            {progress !== undefined && (
                <Progress value={progress} className="h-1 mt-2" />
            )}
        </div>
    );
}

// Team report for admins
export function TeamReport({
    teamName,
    data,
    period,
    onExport,
}: {
    teamName: string;
    data: {
        totalMembers: number;
        activeMembers: number;
        avgProgress: number;
        topPerformers: { name: string; progress: number; xp: number }[];
        needsAttention: { name: string; lastActive: string; progress: number }[];
    };
    period: string;
    onExport: (format: "pdf" | "csv") => void;
}) {
    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg">{teamName} - Team Report</h3>
                    <p className="text-sm text-white/50">{period}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onExport("csv")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 text-center">
                    <div className="text-3xl font-bold text-emerald-400">
                        {data.activeMembers}/{data.totalMembers}
                    </div>
                    <p className="text-sm text-white/50">Active Learners</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                    <div className="text-3xl font-bold">{data.avgProgress}%</div>
                    <p className="text-sm text-white/50">Avg Progress</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                    <div className="text-3xl font-bold text-primary">
                        {Math.round((data.activeMembers / data.totalMembers) * 100)}%
                    </div>
                    <p className="text-sm text-white/50">Engagement Rate</p>
                </div>
            </div>

            {/* Top performers */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    Top Performers
                </h4>
                <div className="space-y-2">
                    {data.topPerformers.slice(0, 5).map((person, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                            <span className="text-sm">{person.name}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-white/50">{person.progress}%</span>
                                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                                    {person.xp.toLocaleString()} XP
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Needs attention */}
            {data.needsAttention.length > 0 && (
                <div>
                    <h4 className="font-medium mb-3 text-amber-400">⚠️ Needs Attention</h4>
                    <div className="space-y-2">
                        {data.needsAttention.map((person, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10">
                                <span className="text-sm">{person.name}</span>
                                <div className="flex items-center gap-4 text-xs text-white/50">
                                    <span>Last active: {person.lastActive}</span>
                                    <span>{person.progress}% progress</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}

// Scheduled report configuration
export function ScheduledReports({
    reports,
    onAdd,
    onDelete,
    onToggle,
}: {
    reports: {
        id: string;
        name: string;
        frequency: "daily" | "weekly" | "monthly";
        recipients: string[];
        enabled: boolean;
        lastSent?: string;
    }[];
    onAdd: () => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}) {
    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold">Scheduled Reports</h3>
                    <p className="text-sm text-white/50">
                        Automatically send reports to stakeholders
                    </p>
                </div>
                <Button onClick={onAdd}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Add Report
                </Button>
            </div>

            {reports.length === 0 ? (
                <p className="text-center text-white/40 py-8">
                    No scheduled reports. Add one to get started.
                </p>
            ) : (
                <div className="space-y-3">
                    {reports.map(report => (
                        <div
                            key={report.id}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-lg",
                                report.enabled ? "bg-white/5" : "bg-white/[0.02] opacity-60"
                            )}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">{report.name}</span>
                                    <Badge className="bg-white/10 text-xs capitalize">
                                        {report.frequency}
                                    </Badge>
                                </div>
                                <p className="text-xs text-white/40">
                                    To: {report.recipients.join(", ")}
                                    {report.lastSent && ` • Last sent: ${new Date(report.lastSent).toLocaleDateString()}`}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onToggle(report.id)}
                                    className={cn(
                                        "w-10 h-6 rounded-full transition-colors relative",
                                        report.enabled ? "bg-primary" : "bg-white/20"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                        report.enabled ? "left-5" : "left-1"
                                    )} />
                                </button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onDelete(report.id)}
                                    className="text-red-400"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
