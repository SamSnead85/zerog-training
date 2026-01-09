"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/components/ui";
import {
    Wifi,
    WifiOff,
    Download,
    Check,
    Loader2,
    HardDrive,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Offline indicator
export function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            // Show reconnected message briefly
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowBanner(true);
        };

        setIsOnline(navigator.onLine);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!showBanner) return null;

    return (
        <div className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all animate-in slide-in-from-bottom-4",
            isOnline
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
        )}>
            {isOnline ? (
                <>
                    <Wifi className="h-4 w-4" />
                    Back online
                </>
            ) : (
                <>
                    <WifiOff className="h-4 w-4" />
                    You're offline - some features may be limited
                </>
            )}
        </div>
    );
}

// Lesson download for offline
interface DownloadableLessonProps {
    lessonId: string;
    lessonTitle: string;
    size: string;
    onDownload: (lessonId: string) => Promise<void>;
    onRemove: (lessonId: string) => Promise<void>;
}

export function DownloadableLesson({
    lessonId,
    lessonTitle,
    size,
    onDownload,
    onRemove,
}: DownloadableLessonProps) {
    const [status, setStatus] = useState<'available' | 'downloading' | 'downloaded'>('available');

    const handleDownload = async () => {
        setStatus('downloading');
        try {
            await onDownload(lessonId);
            setStatus('downloaded');
        } catch {
            setStatus('available');
        }
    };

    const handleRemove = async () => {
        await onRemove(lessonId);
        setStatus('available');
    };

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
                <HardDrive className={cn(
                    "h-5 w-5",
                    status === 'downloaded' ? "text-emerald-400" : "text-white/40"
                )} />
                <div>
                    <p className="text-sm font-medium">{lessonTitle}</p>
                    <p className="text-xs text-white/40">{size}</p>
                </div>
            </div>

            {status === 'available' && (
                <Button size="sm" variant="outline" onClick={handleDownload} className="gap-1">
                    <Download className="h-3 w-3" />
                    Save
                </Button>
            )}

            {status === 'downloading' && (
                <Button size="sm" variant="outline" disabled>
                    <Loader2 className="h-3 w-3 animate-spin" />
                </Button>
            )}

            {status === 'downloaded' && (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Saved
                    </span>
                    <button
                        onClick={handleRemove}
                        className="p-1 hover:bg-white/10 rounded"
                    >
                        <Trash2 className="h-3 w-3 text-white/40" />
                    </button>
                </div>
            )}
        </div>
    );
}

// Storage usage indicator
export function StorageUsage({
    usedMB,
    totalMB,
    className
}: {
    usedMB: number;
    totalMB: number;
    className?: string;
}) {
    const percentage = (usedMB / totalMB) * 100;

    return (
        <Card className={cn("p-4 bg-white/[0.02] border-white/10", className)}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-white/40" />
                    Offline Storage
                </span>
                <span className="text-xs text-white/50">
                    {usedMB.toFixed(1)} MB / {totalMB} MB
                </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all",
                        percentage > 80 ? "bg-amber-500" : "bg-primary"
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
        </Card>
    );
}
