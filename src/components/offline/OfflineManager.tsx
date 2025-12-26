"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    WifiOff,
    Download,
    CheckCircle2,
    Clock,
    Trash2,
    RefreshCw,
    HardDrive,
} from "lucide-react";

interface OfflineCourse {
    id: string;
    title: string;
    downloadedAt: Date;
    size: string;
    progress: number;
}

export function OfflineManager() {
    const [isOnline, setIsOnline] = useState(true);
    const [offlineCourses, setOfflineCourses] = useState<OfflineCourse[]>([]);
    const [downloading, setDownloading] = useState<string | null>(null);
    const [downloadProgress, setDownloadProgress] = useState(0);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Load offline courses from localStorage
        const saved = localStorage.getItem("zerog-offline-courses");
        if (saved) setOfflineCourses(JSON.parse(saved));

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const handleDownload = async (courseId: string, courseTitle: string) => {
        setDownloading(courseId);
        setDownloadProgress(0);

        // Simulate download progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((r) => setTimeout(r, 200));
            setDownloadProgress(i);
        }

        const newCourse: OfflineCourse = {
            id: courseId,
            title: courseTitle,
            downloadedAt: new Date(),
            size: `${(Math.random() * 50 + 10).toFixed(1)} MB`,
            progress: 0,
        };

        const updated = [...offlineCourses, newCourse];
        setOfflineCourses(updated);
        localStorage.setItem("zerog-offline-courses", JSON.stringify(updated));
        setDownloading(null);
    };

    const handleRemove = (courseId: string) => {
        const updated = offlineCourses.filter((c) => c.id !== courseId);
        setOfflineCourses(updated);
        localStorage.setItem("zerog-offline-courses", JSON.stringify(updated));
    };

    const totalSize = offlineCourses.reduce((sum, c) => {
        return sum + parseFloat(c.size);
    }, 0);

    return (
        <div className="space-y-6">
            {/* Status Banner */}
            <Card className={`p-4 ${isOnline ? "border-emerald-500/30" : "border-amber-500/30"}`}>
                <div className="flex items-center gap-3">
                    {isOnline ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                        <WifiOff className="h-5 w-5 text-amber-500" />
                    )}
                    <div className="flex-1">
                        <p className="font-medium">
                            {isOnline ? "You're Online" : "You're Offline"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {isOnline
                                ? "All features are available"
                                : "Access your downloaded courses below"}
                        </p>
                    </div>
                    {!isOnline && (
                        <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Retry
                        </Button>
                    )}
                </div>
            </Card>

            {/* Storage Info */}
            <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <HardDrive className="h-6 w-6 text-muted-foreground" />
                    <div className="flex-1">
                        <p className="font-medium">Offline Storage</p>
                        <p className="text-sm text-muted-foreground">
                            {offlineCourses.length} courses • {totalSize.toFixed(1)} MB used
                        </p>
                    </div>
                </div>
                <Progress value={(totalSize / 500) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                    {(500 - totalSize).toFixed(0)} MB available
                </p>
            </Card>

            {/* Downloaded Courses */}
            <div>
                <h2 className="font-semibold mb-4">Downloaded Courses</h2>
                {offlineCourses.length === 0 ? (
                    <Card className="p-8 text-center">
                        <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">No Offline Courses</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Download courses to access them without internet
                        </p>
                        <Button>Browse Courses</Button>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {offlineCourses.map((course) => (
                            <Card key={course.id} className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{course.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{course.size}</span>
                                            <span>•</span>
                                            <span>
                                                Downloaded {new Date(course.downloadedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemove(course.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Download In Progress */}
            {downloading && (
                <Card className="p-4 fixed bottom-4 right-4 w-80 shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <Download className="h-5 w-5 text-primary animate-pulse" />
                        <p className="font-medium text-sm">Downloading...</p>
                    </div>
                    <Progress value={downloadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                        {downloadProgress}% complete
                    </p>
                </Card>
            )}
        </div>
    );
}

// Hook for detecting offline status
export function useOfflineStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
}
