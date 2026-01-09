"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Wifi,
    WifiOff,
    Download,
    Cloud,
    CloudOff,
    HardDrive,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Loader2,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced offline indicator
export function OfflineIndicator({
    isOnline,
    pendingSync,
    onSync,
}: {
    isOnline: boolean;
    pendingSync: number;
    onSync: () => void;
}) {
    if (isOnline && pendingSync === 0) return null;

    return (
        <div className={cn(
            "fixed bottom-4 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg",
            isOnline ? "bg-amber-500/20 border border-amber-500/30" : "bg-red-500/20 border border-red-500/30"
        )}>
            {isOnline ? (
                <>
                    <Cloud className="h-5 w-5 text-amber-400" />
                    <div>
                        <p className="text-sm font-medium">Syncing changes</p>
                        <p className="text-xs text-white/60">{pendingSync} items pending</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={onSync}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </>
            ) : (
                <>
                    <WifiOff className="h-5 w-5 text-red-400" />
                    <div>
                        <p className="text-sm font-medium">You're offline</p>
                        <p className="text-xs text-white/60">
                            {pendingSync > 0 ? `${pendingSync} changes will sync when online` : "Working locally"}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

// Downloadable content card
export function DownloadableContentCard({
    content,
    onDownload,
    onRemove,
}: {
    content: {
        id: string;
        title: string;
        type: "lesson" | "module" | "course";
        size: string;
        isDownloaded: boolean;
        downloadProgress?: number;
    };
    onDownload: (id: string) => void;
    onRemove: (id: string) => void;
}) {
    const isDownloading = content.downloadProgress !== undefined && content.downloadProgress < 100;

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    content.isDownloaded ? "bg-emerald-500/20" : "bg-white/10"
                )}>
                    {content.isDownloaded ? (
                        <HardDrive className="h-5 w-5 text-emerald-400" />
                    ) : (
                        <Cloud className="h-5 w-5 text-white/40" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium">{content.title}</p>
                    <p className="text-xs text-white/50">
                        {content.type} • {content.size}
                    </p>
                </div>
            </div>

            {isDownloading ? (
                <div className="flex items-center gap-2">
                    <Progress value={content.downloadProgress ?? 0} className="w-20 h-2" />
                    <span className="text-xs text-white/50">{content.downloadProgress}%</span>
                </div>
            ) : content.isDownloaded ? (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemove(content.id)}
                    className="text-red-400"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={() => onDownload(content.id)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                </Button>
            )}
        </div>
    );
}

// Storage usage display
export function StorageUsage({
    used,
    total,
    breakdown,
}: {
    used: number;
    total: number;
    breakdown: { label: string; size: number; color: string }[];
}) {
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const percentage = (used / total) * 100;

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-white/50" />
                    <span className="font-medium">Storage</span>
                </div>
                <span className="text-sm text-white/60">
                    {formatBytes(used)} / {formatBytes(total)}
                </span>
            </div>

            {/* Usage bar */}
            <div className="h-3 rounded-full bg-white/10 overflow-hidden flex mb-4">
                {breakdown.map((item, i) => (
                    <div
                        key={i}
                        className="h-full transition-all"
                        style={{
                            width: `${(item.size / total) * 100}%`,
                            backgroundColor: item.color,
                        }}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
                {breakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-white/60">{item.label}</span>
                        <span className="text-xs text-white/40 ml-auto">
                            {formatBytes(item.size)}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Sync status display
export function SyncStatus({
    lastSync,
    status,
    onSync,
}: {
    lastSync: Date | null;
    status: "synced" | "syncing" | "error" | "offline";
    onSync: () => void;
}) {
    const statusConfig = {
        synced: {
            icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
            label: "All synced",
            color: "text-emerald-400",
        },
        syncing: {
            icon: <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />,
            label: "Syncing...",
            color: "text-blue-400",
        },
        error: {
            icon: <AlertCircle className="h-5 w-5 text-red-400" />,
            label: "Sync error",
            color: "text-red-400",
        },
        offline: {
            icon: <CloudOff className="h-5 w-5 text-white/40" />,
            label: "Offline",
            color: "text-white/40",
        },
    };

    const config = statusConfig[status];

    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
                {config.icon}
                <div>
                    <p className={cn("text-sm font-medium", config.color)}>{config.label}</p>
                    {lastSync && (
                        <p className="text-xs text-white/40">
                            Last sync: {lastSync.toLocaleTimeString()}
                        </p>
                    )}
                </div>
            </div>
            {status !== "syncing" && status !== "offline" && (
                <Button variant="outline" size="sm" onClick={onSync}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Sync Now
                </Button>
            )}
        </div>
    );
}

// Offline mode toggle
export function OfflineModeToggle({
    enabled,
    onChange,
}: {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}) {
    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        enabled ? "bg-emerald-500/20" : "bg-white/10"
                    )}>
                        {enabled ? (
                            <HardDrive className="h-5 w-5 text-emerald-400" />
                        ) : (
                            <Cloud className="h-5 w-5 text-white/40" />
                        )}
                    </div>
                    <div>
                        <p className="font-medium">Offline Mode</p>
                        <p className="text-sm text-white/50">
                            {enabled
                                ? "Content available offline"
                                : "Stream content online"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onChange(!enabled)}
                    className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        enabled ? "bg-primary" : "bg-white/20"
                    )}
                >
                    <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        enabled ? "left-7" : "left-1"
                    )} />
                </button>
            </div>
        </Card>
    );
}
