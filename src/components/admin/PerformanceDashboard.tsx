"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Zap,
    TrendingUp,
    Clock,
    Image,
    FileText,
    Globe,
    CheckCircle2,
    AlertTriangle,
    RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceMetric {
    name: string;
    score: number;
    status: "good" | "needs-improvement" | "poor";
    description: string;
}

interface CacheItem {
    name: string;
    size: string;
    items: number;
    lastUpdated: string;
}

const coreWebVitals: PerformanceMetric[] = [
    { name: "LCP (Largest Contentful Paint)", score: 92, status: "good", description: "2.1s - Good user experience" },
    { name: "FID (First Input Delay)", score: 98, status: "good", description: "12ms - Excellent responsiveness" },
    { name: "CLS (Cumulative Layout Shift)", score: 95, status: "good", description: "0.05 - Minimal layout shifts" },
    { name: "FCP (First Contentful Paint)", score: 88, status: "good", description: "1.4s - Fast initial render" },
    { name: "TTFB (Time to First Byte)", score: 76, status: "needs-improvement", description: "380ms - Consider CDN optimization" },
];

const cacheStats: CacheItem[] = [
    { name: "Image Cache", size: "24.5 MB", items: 156, lastUpdated: "5 min ago" },
    { name: "API Response Cache", size: "2.1 MB", items: 89, lastUpdated: "Just now" },
    { name: "Module Cache", size: "8.7 MB", items: 42, lastUpdated: "1 hour ago" },
    { name: "User Preferences", size: "45 KB", items: 12, lastUpdated: "2 hours ago" },
];

function getStatusColor(status: "good" | "needs-improvement" | "poor") {
    switch (status) {
        case "good": return "text-emerald-500";
        case "needs-improvement": return "text-amber-500";
        case "poor": return "text-red-500";
    }
}

function getScoreColor(score: number) {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
}

export function PerformanceDashboard() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const overallScore = Math.round(
        coreWebVitals.reduce((acc, m) => acc + m.score, 0) / coreWebVitals.length
    );

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
    };

    const handleClearCache = (cacheName: string) => {
        // Mock cache clear
        console.log(`Clearing ${cacheName}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Performance
                    </h2>
                    <p className="text-sm text-muted-foreground">Monitor and optimize platform performance</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                </Button>
            </div>

            {/* Overall Score */}
            <Card className="p-6">
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                className="fill-none stroke-muted stroke-[8]"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                className={cn("fill-none stroke-[8]", getScoreColor(overallScore))}
                                strokeDasharray={`${overallScore * 2.83} 283`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{overallScore}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Performance Score</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            Based on Core Web Vitals and page speed metrics
                        </p>
                        <Badge
                            variant="outline"
                            className={cn(
                                overallScore >= 90 && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                overallScore >= 50 && overallScore < 90 && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                                overallScore < 50 && "bg-red-500/10 text-red-500 border-red-500/20"
                            )}
                        >
                            {overallScore >= 90 ? "Excellent" : overallScore >= 50 ? "Needs Improvement" : "Poor"}
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Core Web Vitals */}
            <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Core Web Vitals
                </h3>
                <div className="space-y-4">
                    {coreWebVitals.map((metric) => (
                        <div key={metric.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {metric.status === "good" ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                    )}
                                    <span className="font-medium text-sm">{metric.name}</span>
                                </div>
                                <span className={cn("font-bold", getStatusColor(metric.status))}>
                                    {metric.score}
                                </span>
                            </div>
                            <Progress value={metric.score} className="h-2" />
                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Cache Management */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Cache Management
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => handleClearCache("all")}>
                        Clear All Cache
                    </Button>
                </div>
                <div className="space-y-3">
                    {cacheStats.map((cache) => (
                        <div
                            key={cache.name}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    {cache.name.includes("Image") ? (
                                        <Image className="h-5 w-5 text-primary" />
                                    ) : (
                                        <FileText className="h-5 w-5 text-primary" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium text-sm">{cache.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {cache.items} items • {cache.size} • Updated {cache.lastUpdated}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleClearCache(cache.name)}
                            >
                                Clear
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
