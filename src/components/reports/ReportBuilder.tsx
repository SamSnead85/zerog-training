"use client";

/**
 * Report Builder Component
 * 
 * Create custom reports with drag-and-drop metrics,
 * filters, and visualization options.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    BarChart3,
    PieChart,
    LineChart,
    Table,
    Download,
    Save,
    Play,
    Plus,
    X,
    GripVertical,
    Settings,
    Calendar,
    Filter,
    Users,
    BookOpen,
    Clock,
    TrendingUp,
    Award,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type MetricType =
    | "enrollments"
    | "completions"
    | "avgScore"
    | "timeSpent"
    | "activeUsers"
    | "coursesCreated"
    | "certificatesIssued"
    | "loginCount";

export type ChartType = "bar" | "line" | "pie" | "table";

export type DateRange = "7d" | "30d" | "90d" | "1y" | "custom";

export interface ReportMetric {
    id: string;
    type: MetricType;
    label: string;
    chartType: ChartType;
    groupBy?: "day" | "week" | "month" | "department" | "role";
}

export interface ReportConfig {
    id?: string;
    name: string;
    description?: string;
    metrics: ReportMetric[];
    dateRange: DateRange;
    customDateStart?: Date;
    customDateEnd?: Date;
    filters: {
        departments?: string[];
        roles?: string[];
        courses?: string[];
    };
}

interface ReportBuilderProps {
    onSave: (config: ReportConfig) => void;
    onRun: (config: ReportConfig) => void;
    onExport: (config: ReportConfig, format: "csv" | "pdf" | "xlsx") => void;
    initialConfig?: ReportConfig;
    className?: string;
}

// =============================================================================
// AVAILABLE METRICS
// =============================================================================

const availableMetrics: { type: MetricType; label: string; icon: React.ElementType; description: string }[] = [
    { type: "enrollments", label: "Enrollments", icon: Users, description: "Course enrollment count" },
    { type: "completions", label: "Completions", icon: Award, description: "Course completion count" },
    { type: "avgScore", label: "Average Score", icon: TrendingUp, description: "Average quiz/assessment score" },
    { type: "timeSpent", label: "Time Spent", icon: Clock, description: "Total learning time" },
    { type: "activeUsers", label: "Active Users", icon: Users, description: "Daily/weekly active users" },
    { type: "coursesCreated", label: "Courses Created", icon: BookOpen, description: "New courses created" },
    { type: "certificatesIssued", label: "Certificates", icon: Award, description: "Certificates issued" },
    { type: "loginCount", label: "Logins", icon: Users, description: "User login count" },
];

const chartTypes: { type: ChartType; label: string; icon: React.ElementType }[] = [
    { type: "bar", label: "Bar Chart", icon: BarChart3 },
    { type: "line", label: "Line Chart", icon: LineChart },
    { type: "pie", label: "Pie Chart", icon: PieChart },
    { type: "table", label: "Table", icon: Table },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function ReportBuilder({
    onSave,
    onRun,
    onExport,
    initialConfig,
    className,
}: ReportBuilderProps) {
    const [config, setConfig] = useState<ReportConfig>(
        initialConfig || {
            name: "New Report",
            metrics: [],
            dateRange: "30d",
            filters: {},
        }
    );

    const [showMetricPicker, setShowMetricPicker] = useState(false);

    const addMetric = (type: MetricType) => {
        const metric = availableMetrics.find((m) => m.type === type);
        if (!metric) return;

        setConfig((prev) => ({
            ...prev,
            metrics: [
                ...prev.metrics,
                {
                    id: `${type}-${Date.now()}`,
                    type,
                    label: metric.label,
                    chartType: "bar",
                    groupBy: "day",
                },
            ],
        }));
        setShowMetricPicker(false);
    };

    const removeMetric = (id: string) => {
        setConfig((prev) => ({
            ...prev,
            metrics: prev.metrics.filter((m) => m.id !== id),
        }));
    };

    const updateMetric = (id: string, updates: Partial<ReportMetric>) => {
        setConfig((prev) => ({
            ...prev,
            metrics: prev.metrics.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        }));
    };

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <Input
                        value={config.name}
                        onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                        className="text-xl font-semibold bg-transparent border-0 p-0 focus:ring-0 h-auto"
                        placeholder="Report Name"
                    />
                    <Input
                        value={config.description || ""}
                        onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                        className="text-sm text-muted-foreground bg-transparent border-0 p-0 focus:ring-0 h-auto mt-1"
                        placeholder="Add a description..."
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => onSave(config)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                    </Button>
                    <Button onClick={() => onRun(config)}>
                        <Play className="h-4 w-4 mr-2" />
                        Run Report
                    </Button>
                </div>
            </div>

            {/* Date Range & Filters */}
            <div className="flex flex-wrap gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Date Range</label>
                    <select
                        value={config.dateRange}
                        onChange={(e) => setConfig((prev) => ({ ...prev, dateRange: e.target.value as DateRange }))}
                        className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                        <option value="custom">Custom range</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Add Filter
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Metrics</h3>
                    <Button variant="outline" size="sm" onClick={() => setShowMetricPicker(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Metric
                    </Button>
                </div>

                {config.metrics.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-white/10 rounded-xl">
                        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground">No metrics added yet</p>
                        <Button variant="outline" className="mt-4" onClick={() => setShowMetricPicker(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Metric
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {config.metrics.map((metric) => (
                            <MetricCard
                                key={metric.id}
                                metric={metric}
                                onUpdate={(updates) => updateMetric(metric.id, updates)}
                                onRemove={() => removeMetric(metric.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Metric Picker Modal */}
            {showMetricPicker && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMetricPicker(false)}>
                    <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Add Metric</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {availableMetrics.map((metric) => {
                                const Icon = metric.icon;
                                return (
                                    <button
                                        key={metric.type}
                                        onClick={() => addMetric(metric.type)}
                                        className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
                                    >
                                        <Icon className="h-5 w-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium">{metric.label}</p>
                                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Export Options */}
            {config.metrics.length > 0 && (
                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                    <Button variant="outline" onClick={() => onExport(config, "csv")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button variant="outline" onClick={() => onExport(config, "xlsx")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Excel
                    </Button>
                    <Button variant="outline" onClick={() => onExport(config, "pdf")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// METRIC CARD
// =============================================================================

function MetricCard({
    metric,
    onUpdate,
    onRemove,
}: {
    metric: ReportMetric;
    onUpdate: (updates: Partial<ReportMetric>) => void;
    onRemove: () => void;
}) {
    const metricInfo = availableMetrics.find((m) => m.type === metric.type);
    const Icon = metricInfo?.icon || BarChart3;

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />

            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1">
                <Input
                    value={metric.label}
                    onChange={(e) => onUpdate({ label: e.target.value })}
                    className="font-medium bg-transparent border-0 p-0 focus:ring-0 h-auto"
                />
            </div>

            <select
                value={metric.chartType}
                onChange={(e) => onUpdate({ chartType: e.target.value as ChartType })}
                className="h-9 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
            >
                {chartTypes.map((ct) => (
                    <option key={ct.type} value={ct.type}>{ct.label}</option>
                ))}
            </select>

            <select
                value={metric.groupBy || "day"}
                onChange={(e) => onUpdate({ groupBy: e.target.value as ReportMetric["groupBy"] })}
                className="h-9 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
            >
                <option value="day">By Day</option>
                <option value="week">By Week</option>
                <option value="month">By Month</option>
                <option value="department">By Department</option>
                <option value="role">By Role</option>
            </select>

            <button onClick={onRemove} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

export default ReportBuilder;
