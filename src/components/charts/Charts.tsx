"use client";

/**
 * Charts Component
 * 
 * SVG-based charts for data visualization including
 * line charts, area charts, and sparklines.
 */

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface ChartDataPoint {
    label: string;
    value: number;
    meta?: Record<string, unknown>;
}

interface BaseChartProps {
    data: ChartDataPoint[];
    width?: number;
    height?: number;
    className?: string;
    color?: string;
    showLabels?: boolean;
    animate?: boolean;
}

// =============================================================================
// LINE CHART
// =============================================================================

interface LineChartProps extends BaseChartProps {
    showDots?: boolean;
    showArea?: boolean;
    areaOpacity?: number;
}

export function LineChart({
    data,
    width = 400,
    height = 200,
    className,
    color = "hsl(var(--primary))",
    showLabels = true,
    showDots = true,
    showArea = false,
    areaOpacity = 0.2,
    animate = true,
}: LineChartProps) {
    const padding = { top: 20, right: 20, bottom: showLabels ? 40 : 20, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const { path, areaPath, points, yScale, minValue, maxValue } = useMemo(() => {
        if (data.length === 0) return { path: "", areaPath: "", points: [], yScale: [], minValue: 0, maxValue: 0 };

        const values = data.map((d) => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1;

        const pts = data.map((d, i) => ({
            x: padding.left + (i / (data.length - 1)) * chartWidth,
            y: padding.top + chartHeight - ((d.value - min) / range) * chartHeight,
            ...d,
        }));

        const pathStr = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
        const areaStr = `${pathStr} L ${pts[pts.length - 1].x} ${padding.top + chartHeight} L ${pts[0].x} ${padding.top + chartHeight} Z`;

        // Generate y-axis scale labels
        const scaleSteps = 5;
        const yScaleLabels = Array.from({ length: scaleSteps }, (_, i) => {
            const value = min + (range * i) / (scaleSteps - 1);
            const y = padding.top + chartHeight - (i / (scaleSteps - 1)) * chartHeight;
            return { value, y };
        });

        return { path: pathStr, areaPath: areaStr, points: pts, yScale: yScaleLabels, minValue: min, maxValue: max };
    }, [data, chartWidth, chartHeight, padding]);

    return (
        <svg width={width} height={height} className={className}>
            {/* Grid lines */}
            {yScale.map((scale, i) => (
                <line
                    key={i}
                    x1={padding.left}
                    y1={scale.y}
                    x2={width - padding.right}
                    y2={scale.y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4,4"
                />
            ))}

            {/* Y-axis labels */}
            {yScale.map((scale, i) => (
                <text
                    key={i}
                    x={padding.left - 8}
                    y={scale.y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-xs"
                >
                    {formatNumber(scale.value)}
                </text>
            ))}

            {/* Area fill */}
            {showArea && (
                <path
                    d={areaPath}
                    fill={color}
                    opacity={areaOpacity}
                    className={animate ? "animate-fade-in" : ""}
                />
            )}

            {/* Line */}
            <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={animate ? "animate-draw-line" : ""}
            />

            {/* Dots */}
            {showDots && points.map((point, i) => (
                <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    fill={color}
                    className="hover:r-6 transition-all cursor-pointer"
                />
            ))}

            {/* X-axis labels */}
            {showLabels && data.map((d, i) => {
                const x = padding.left + (i / (data.length - 1)) * chartWidth;
                return (
                    <text
                        key={i}
                        x={x}
                        y={height - 10}
                        textAnchor="middle"
                        className="fill-muted-foreground text-xs"
                    >
                        {d.label}
                    </text>
                );
            })}
        </svg>
    );
}

// =============================================================================
// SPARKLINE
// =============================================================================

interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    showTrend?: boolean;
    className?: string;
}

export function Sparkline({
    data,
    width = 100,
    height = 24,
    color = "hsl(var(--primary))",
    showTrend = true,
    className,
}: SparklineProps) {
    const { path, trend, trendPercent } = useMemo(() => {
        if (data.length < 2) return { path: "", trend: 0, trendPercent: 0 };

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        const points = data.map((value, i) => ({
            x: (i / (data.length - 1)) * width,
            y: height - ((value - min) / range) * height,
        }));

        const pathStr = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

        const first = data[0];
        const last = data[data.length - 1];
        const tr = last - first;
        const trPct = first !== 0 ? ((last - first) / first) * 100 : 0;

        return { path: pathStr, trend: tr, trendPercent: trPct };
    }, [data, width, height]);

    const trendColor = trend >= 0 ? "text-emerald-400" : "text-red-400";
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <svg width={width} height={height}>
                <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {showTrend && (
                <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{Math.abs(trendPercent).toFixed(1)}%</span>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// PROGRESS RING
// =============================================================================

interface ProgressRingProps {
    value: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    showLabel?: boolean;
    label?: string;
    className?: string;
}

export function ProgressRing({
    value,
    size = 80,
    strokeWidth = 8,
    color = "hsl(var(--primary))",
    backgroundColor = "rgba(255,255,255,0.1)",
    showLabel = true,
    label,
    className,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">{label || `${Math.round(value)}%`}</span>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// HORIZONTAL BAR CHART
// =============================================================================

interface HorizontalBarChartProps {
    data: ChartDataPoint[];
    height?: number;
    barHeight?: number;
    color?: string;
    showValues?: boolean;
    className?: string;
}

export function HorizontalBarChart({
    data,
    height,
    barHeight = 32,
    color = "hsl(var(--primary))",
    showValues = true,
    className,
}: HorizontalBarChartProps) {
    const maxValue = Math.max(...data.map((d) => d.value));
    const computedHeight = height || data.length * (barHeight + 12);

    return (
        <div className={cn("space-y-3", className)} style={{ height: computedHeight }}>
            {data.map((item, i) => {
                const width = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                return (
                    <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            {showValues && <span className="font-medium">{formatNumber(item.value)}</span>}
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${width}%`, backgroundColor: color }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// =============================================================================
// HELPERS
// =============================================================================

function formatNumber(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
}

export default {
    LineChart,
    Sparkline,
    ProgressRing,
    HorizontalBarChart,
};
