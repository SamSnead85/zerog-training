"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, SkipBack, SkipForward, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface VideoLesson {
    id: string;
    title: string;
    duration: string; // e.g., "12:34"
    videoUrl: string; // YouTube/Vimeo embed or direct URL
    thumbnailUrl?: string;
    transcript?: string;
    chapters?: {
        time: number; // seconds
        title: string;
    }[];
}

export interface VideoPlayerProps {
    video: VideoLesson;
    onComplete?: () => void;
    onProgress?: (percent: number) => void;
    autoPlay?: boolean;
}

// =============================================================================
// VIDEO PLAYER COMPONENT
// =============================================================================

export function VideoPlayer({ video, onComplete, onProgress, autoPlay = false }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse duration string to seconds
    const parseDuration = (dur: string): number => {
        const parts = dur.split(':').map(Number);
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        return 0;
    };

    // Format seconds to time string
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Progress percentage
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Handle play/pause
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle mute
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Handle seek
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = percent * duration;
        }
    };

    // Skip forward/back
    const skip = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
        }
    };

    // Handle fullscreen
    const toggleFullscreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };

    // Update time
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            onProgress?.(percent);

            // Mark complete at 90%
            if (percent >= 90 && !isCompleted) {
                setIsCompleted(true);
                onComplete?.();
            }
        }
    };

    // Set duration when loaded
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // Auto-hide controls
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isPlaying && showControls) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);

    // Check if it's a YouTube embed
    const isYouTube = video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be');
    const isVimeo = video.videoUrl.includes('vimeo.com');

    // Get YouTube embed URL
    const getYouTubeEmbedUrl = (url: string): string => {
        const videoId = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0` : url;
    };

    // Render YouTube/Vimeo embed
    if (isYouTube || isVimeo) {
        const embedUrl = isYouTube ? getYouTubeEmbedUrl(video.videoUrl) : video.videoUrl;

        return (
            <div className="rounded-2xl overflow-hidden bg-black border border-white/10">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-white/60" />
                        <span className="font-medium">{video.title}</span>
                        <span className="text-xs text-white/40">{video.duration}</span>
                    </div>
                    {isCompleted && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Completed
                        </span>
                    )}
                </div>

                {/* Video embed */}
                <div className="relative aspect-video">
                    <iframe
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Transcript toggle */}
                {video.transcript && (
                    <div className="border-t border-white/10">
                        <button
                            onClick={() => setShowTranscript(!showTranscript)}
                            className="w-full px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors text-left"
                        >
                            {showTranscript ? "Hide" : "Show"} transcript
                        </button>
                        {showTranscript && (
                            <div className="px-4 pb-4 max-h-48 overflow-y-auto">
                                <p className="text-sm text-white/60 whitespace-pre-wrap">{video.transcript}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Render custom video player for direct URLs
    return (
        <div
            ref={containerRef}
            className="rounded-2xl overflow-hidden bg-black border border-white/10 relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseMove={() => setShowControls(true)}
        >
            {/* Header */}
            <div className={cn(
                "absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
            )}>
                <div className="flex items-center justify-between">
                    <span className="font-medium">{video.title}</span>
                    {isCompleted && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Completed
                        </span>
                    )}
                </div>
            </div>

            {/* Video */}
            <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                className="w-full aspect-video object-cover"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Play/Pause overlay */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={togglePlay}
                >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" fill="white" />
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
            )}>
                {/* Progress bar */}
                <div
                    className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/progress"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full bg-white rounded-full relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white hover:text-white/80 transition-colors">
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button onClick={() => skip(-10)} className="text-white/60 hover:text-white transition-colors">
                            <SkipBack className="h-4 w-4" />
                        </button>
                        <button onClick={() => skip(10)} className="text-white/60 hover:text-white transition-colors">
                            <SkipForward className="h-4 w-4" />
                        </button>
                        <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        <span className="text-xs text-white/60">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleFullscreen} className="text-white/60 hover:text-white transition-colors">
                            <Maximize2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// SAMPLE VIDEO DATA
// =============================================================================

export const sampleVideo: VideoLesson = {
    id: "v1",
    title: "Introduction to Large Language Models",
    duration: "12:34",
    videoUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    transcript: "Welcome to this introduction to Large Language Models. In this video, we'll explore what LLMs are, how they work, and why they're transforming the way we interact with technology...",
};
