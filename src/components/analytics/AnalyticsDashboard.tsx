"use client";

/**
 * Analytics Dashboard Component
 * 
 * Interactive charts and metrics display for
 * learning analytics and engagement tracking.
 */

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
    Users,
    BookOpen,
    Clock,
    Award,
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Activity,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

interface MetricCardData {
    label: string;
    value: number | string;
    change?: number;
    changeLabel?: string;
    icon?: React.ElementType;
    format?: "number" | "percent" | "currency" | "duration";
}

interface ChartData {
    label: string;
    value: number;
    color?: string;
}

// =============================================================================
// METRIC CARD
// =============================================================================

interface MetricCardProps extends MetricCardData {
    className?: string;
}

export function MetricCard({
    label,
    value,
    change,
    changeLabel = "vs last period",
    icon: Icon,
    format = "number",
    className,
}: MetricCardProps) {
    const formattedValue = formatValue(value, format);
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div className={cn(
            "rounded-2xl border border-white/10 bg-white/[0.02] p-6",
            "hover:border-white/20 transition-colors",
            className
        )}>
            <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-muted-foreground">{label}</span>
                {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                )}
            </div>

            <div className="text-3xl font-bold mb-2">{formattedValue}</div>

            {change !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                    {isPositive && <TrendingUp className="h-4 w-4 text-emerald-400" />}
                    {isNegative && <TrendingDown className="h-4 w-4 text-red-400" />}
                    <span className={cn(
                        isPositive && "text-emerald-400",
                        isNegative && "text-red-400",
                        !isPositive && !isNegative && "text-muted-foreground"
                    )}>
                        {isPositive && "+"}{change.toFixed(1)}%
                    </span>
                    <span className="text-muted-foreground">{changeLabel}</span>
                </div>
            )}
        </div>
    );
}

function formatValue(value: number | string, format: string): string {
    if (typeof value === "string") return value;

    switch (format) {
        case "percent":
            return `${value.toFixed(1)}%`;
        case "currency":
            return `$${value.toLocaleString()}`;
        case "duration":
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        default:
            return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString();
    }
}

// =============================================================================
// SIMPLE BAR CHART
// =============================================================================

interface BarChartProps {
    data: ChartData[];
    title?: string;
    className?: string;
    showValues?: boolean;
    maxValue?: number;
    height?: number;
}

export function SimpleBarChart({
    data,
    title,
    className,
    showValues = true,
    maxValue,
    height = 200,
}: BarChartProps) {
    const max = maxValue || Math.max(...data.map((d) => d.value));

    return (
        <div className={cn("rounded-2xl border border-white/10 bg-white/[0.02] p-6", className)}>
            {title && (
                <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{title}</h3>
                </div>
            )}

            <div className="flex items-end gap-2" style={{ height }}>
                {data.map((item, index) => {
                    const heightPercent = max > 0 ? (item.value / max) * 100 : 0;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div
                                className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-all"
                                style={{
                                    height: `${heightPercent}%`,
                                    backgroundColor: item.color,
                                }}
                            />
                            {showValues && (
                                <span className="text-xs text-muted-foreground">
                                    {item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}k` : item.value}
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground truncate max-w-full">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// =============================================================================
// SIMPLE DONUT CHART
// =============================================================================

interface DonutChartProps {
    data: ChartData[];
    title?: string;
    size?: number;
    className?: string;
    showLegend?: boolean;
}

export function SimpleDonutChart({
    data,
    title,
    size = 160,
    className,
    showLegend = true,
}: DonutChartProps) {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const colors = [
        "hsl(var(--primary))",
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
    ];

    const segments = useMemo(() => {
        let currentAngle = 0;
        return data.map((item, index) => {
            const angle = total > 0 ? (item.value / total) * 360 : 0;
            const segment = {
                ...item,
                startAngle: currentAngle,
                endAngle: currentAngle + angle,
                color: item.color || colors[index % colors.length],
                percent: total > 0 ? (item.value / total) * 100 : 0,
            };
            currentAngle += angle;
            return segment;
        });
    }, [data, total, colors]);

    const radius = size / 2;
    const innerRadius = radius * 0.6;

    return (
        <div className={cn("rounded-2xl border border-white/10 bg-white/[0.02] p-6", className)}>
            {title && (
                <div className="flex items-center gap-2 mb-6">
                    <PieChart className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{title}</h3>
                </div>
            )}

            <div className="flex items-center gap-6">
                <svg width={size} height={size} className="flex-shrink-0">
                    {segments.map((segment, index) => {
                        const startAngle = (segment.startAngle - 90) * (Math.PI / 180);
                        const endAngle = (segment.endAngle - 90) * (Math.PI / 180);

                        const x1 = radius + radius * Math.cos(startAngle);
                        const y1 = radius + radius * Math.sin(startAngle);
                        const x2 = radius + radius * Math.cos(endAngle);
                        const y2 = radius + radius * Math.sin(endAngle);

                        const x3 = radius + innerRadius * Math.cos(endAngle);
                        const y3 = radius + innerRadius * Math.sin(endAngle);
                        const x4 = radius + innerRadius * Math.cos(startAngle);
                        const y4 = radius + innerRadius * Math.sin(startAngle);

                        const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;

                        const d = `
                            M ${x1} ${y1}
                            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                            L ${x3} ${y3}
                            A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                            Z
                        `;

                        return (
                            <path
                                key={index}
                                d={d}
                                fill={segment.color}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        );
                    })}
                    <text
                        x={radius}
                        y={radius}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-xl font-bold"
                    >
                        {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
                    </text>
                </svg>

                {showLegend && (
                    <div className="flex-1 space-y-2">
                        {segments.map((segment, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: segment.color }}
                                />
                                <span className="text-sm text-muted-foreground flex-1 truncate">
                                    {segment.label}
                                </span>
                                <span className="text-sm font-medium">
                                    {segment.percent.toFixed(0)}%
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// =============================================================================
// ACTIVITY TIMELINE
// =============================================================================

interface ActivityItem {
    id: string;
    type: "course" | "quiz" | "certificate" | "login" | "other";
    title: string;
    description?: string;
    timestamp: Date;
}

interface ActivityTimelineProps {
    activities: ActivityItem[];
    title?: string;
    className?: string;
    maxItems?: number;
}

export function ActivityTimeline({
    activities,
    title = "Recent Activity",
    className,
    maxItems = 5,
}: ActivityTimelineProps) {
    const typeIcons = {
        course: BookOpen,
        quiz: Activity,
        certificate: Award,
        login: Users,
        other: Clock,
    };

    const typeColors = {
        course: "bg-blue-500/20 text-blue-400",
        quiz: "bg-amber-500/20 text-amber-400",
        certificate: "bg-emerald-500/20 text-emerald-400",
        login: "bg-purple-500/20 text-purple-400",
        other: "bg-gray-500/20 text-gray-400",
    };

    const displayActivities = activities.slice(0, maxItems);

    return (
        <div className={cn("rounded-2xl border border-white/10 bg-white/[0.02] p-6", className)}>
            <h3 className="font-semibold mb-6">{title}</h3>

            <div className="space-y-4">
                {displayActivities.map((activity, index) => {
                    const Icon = typeIcons[activity.type];
                    const colorClass = typeColors[activity.type];

                    return (
                        <div key={activity.id} className="flex gap-3">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                colorClass
                            )}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{activity.title}</p>
                                {activity.description && (
                                    <p className="text-xs text-muted-foreground truncate">
                                        {activity.description}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatTimeAgo(activity.timestamp)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
}

export default {
    MetricCard,
    SimpleBarChart,
    SimpleDonutChart,
    ActivityTimeline,
};
