"use client";

import { useMemo } from "react";
import { Card, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

// Simple bar chart
export function BarChart({
    data,
    height = 200,
    showLabels = true,
    showValues = true,
    className,
}: {
    data: { label: string; value: number; color?: string }[];
    height?: number;
    showLabels?: boolean;
    showValues?: boolean;
    className?: string;
}) {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-end gap-2" style={{ height: `${height}px` }}>
                {data.map((item, i) => {
                    const barHeight = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                            {showValues && (
                                <span className="text-xs text-white/60 mb-1">{item.value}</span>
                            )}
                            <div
                                className={cn(
                                    "w-full rounded-t-lg transition-all duration-500",
                                    item.color || "bg-primary"
                                )}
                                style={{ height: `${barHeight}%` }}
                            />
                        </div>
                    );
                })}
            </div>
            {showLabels && (
                <div className="flex gap-2">
                    {data.map((item, i) => (
                        <div key={i} className="flex-1 text-center">
                            <span className="text-xs text-white/50 truncate block">{item.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Horizontal bar chart
export function HorizontalBarChart({
    data,
    showValues = true,
    className,
}: {
    data: { label: string; value: number; max?: number; color?: string }[];
    showValues?: boolean;
    className?: string;
}) {
    return (
        <div className={cn("space-y-3", className)}>
            {data.map((item, i) => {
                const max = item.max || Math.max(...data.map(d => d.value));
                const width = max > 0 ? (item.value / max) * 100 : 0;
                return (
                    <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">{item.label}</span>
                            {showValues && (
                                <span className="text-sm text-white/60">{item.value}</span>
                            )}
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    item.color || "bg-primary"
                                )}
                                style={{ width: `${width}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Line chart (simplified SVG)
export function LineChart({
    data,
    height = 150,
    showDots = true,
    showArea = false,
    color = "rgb(var(--primary))",
    className,
}: {
    data: { label: string; value: number }[];
    height?: number;
    showDots?: boolean;
    showArea?: boolean;
    color?: string;
    className?: string;
}) {
    const points = useMemo(() => {
        if (data.length === 0) return "";
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const range = maxValue - minValue || 1;

        return data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.value - minValue) / range) * 100;
            return `${x},${y}`;
        }).join(" ");
    }, [data]);

    const areaPath = useMemo(() => {
        if (data.length === 0) return "";
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const range = maxValue - minValue || 1;

        const coords = data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.value - minValue) / range) * 100;
            return { x, y };
        });

        return `M ${coords[0].x} ${coords[0].y} ${coords.slice(1).map(c => `L ${c.x} ${c.y}`).join(" ")} L 100 100 L 0 100 Z`;
    }, [data]);

    return (
        <div className={cn("relative", className)} style={{ height: `${height}px` }}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                {showArea && (
                    <path
                        d={areaPath}
                        fill={color}
                        fillOpacity={0.1}
                    />
                )}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
                {showDots && data.map((d, i) => {
                    const maxValue = Math.max(...data.map(d => d.value));
                    const minValue = Math.min(...data.map(d => d.value));
                    const range = maxValue - minValue || 1;
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - ((d.value - minValue) / range) * 100;
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill={color}
                            vectorEffect="non-scaling-stroke"
                        />
                    );
                })}
            </svg>
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between -mb-6">
                {data.filter((_, i) => i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)).map((d, i) => (
                    <span key={i} className="text-xs text-white/40">{d.label}</span>
                ))}
            </div>
        </div>
    );
}

// Donut chart
export function DonutChart({
    data,
    size = 120,
    strokeWidth = 12,
    showLegend = true,
    className,
}: {
    data: { label: string; value: number; color: string }[];
    size?: number;
    strokeWidth?: number;
    showLegend?: boolean;
    className?: string;
}) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;

    return (
        <div className={cn("flex items-center gap-6", className)}>
            <div style={{ width: size, height: size }} className="relative">
                <svg width={size} height={size} className="-rotate-90">
                    {data.map((item, i) => {
                        const percentage = total > 0 ? item.value / total : 0;
                        const strokeDasharray = `${percentage * circumference} ${circumference}`;
                        const strokeDashoffset = -offset;
                        offset += percentage * circumference;

                        return (
                            <circle
                                key={i}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-500"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{total}</span>
                </div>
            </div>

            {showLegend && (
                <div className="space-y-2">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm">{item.label}</span>
                            <span className="text-sm text-white/50">
                                ({Math.round((item.value / total) * 100)}%)
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Stat sparkline (mini inline chart)
export function Sparkline({
    data,
    color = "rgb(var(--primary))",
    height = 24,
    width = 80,
}: {
    data: number[];
    color?: string;
    height?: number;
    width?: number;
}) {
    const points = useMemo(() => {
        if (data.length === 0) return "";
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        return data.map((value, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        }).join(" ");
    }, [data, height, width]);

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// Metric card with trend
export function MetricCard({
    title,
    value,
    change,
    changeLabel,
    icon,
    sparklineData,
    className,
}: {
    title: string;
    value: string | number;
    change?: { value: number; positive: boolean };
    changeLabel?: string;
    icon?: React.ReactNode;
    sparklineData?: number[];
    className?: string;
}) {
    return (
        <Card className={cn("p-4 bg-white/[0.02] border-white/10", className)}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {icon && (
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                    <span className="text-sm text-white/60">{title}</span>
                </div>
                {sparklineData && sparklineData.length > 0 && (
                    <Sparkline data={sparklineData} />
                )}
            </div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            {change && (
                <div className="flex items-center gap-2">
                    <Badge className={cn(
                        "text-xs",
                        change.positive
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                    )}>
                        {change.positive ? "+" : ""}{change.value}%
                    </Badge>
                    {changeLabel && (
                        <span className="text-xs text-white/40">{changeLabel}</span>
                    )}
                </div>
            )}
        </Card>
    );
}
