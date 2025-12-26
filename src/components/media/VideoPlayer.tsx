"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Card, Progress, Badge, Slider } from "@/components/ui";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    SkipBack,
    SkipForward,
    Settings,
    Subtitles,
    PictureInPicture,
    RotateCcw,
    Bookmark,
    Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    duration?: number;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
    bookmarks?: { time: number; label: string }[];
}

export function VideoPlayer({
    src,
    poster,
    title = "Lesson Video",
    duration = 0,
    onProgress,
    onComplete,
    bookmarks = [],
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(duration);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showControls, setShowControls] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [buffered, setBuffered] = useState(0);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const progress = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            onProgress?.(video.currentTime / video.duration);
        };

        const handleLoadedMetadata = () => {
            setVideoDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            onComplete?.();
        };

        const handleProgress = () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                setBuffered((bufferedEnd / video.duration) * 100);
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("progress", handleProgress);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("progress", handleProgress);
        };
    }, [onProgress, onComplete]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (value: number[]) => {
        const video = videoRef.current;
        if (!video) return;

        const newVolume = value[0];
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const handleSeek = (value: number[]) => {
        const video = videoRef.current;
        if (!video) return;

        const time = (value[0] / 100) * videoDuration;
        video.currentTime = time;
        setCurrentTime(time);
    };

    const skip = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, videoDuration));
    };

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const changePlaybackRate = (rate: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = rate;
        setPlaybackRate(rate);
        setShowSettings(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    return (
        <div
            ref={containerRef}
            className="relative group bg-black rounded-xl overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full aspect-video"
                onClick={togglePlay}
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all transform hover:scale-110"
                    >
                        <Play className="h-10 w-10 text-white ml-1" />
                    </button>
                </div>
            )}

            {/* Controls */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity",
                    showControls || !isPlaying ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Progress Bar */}
                <div className="relative mb-4 group/progress">
                    {/* Buffered */}
                    <div
                        className="absolute h-1 bg-white/20 rounded-full"
                        style={{ width: `${buffered}%` }}
                    />
                    {/* Bookmarks */}
                    {bookmarks.map((bookmark, i) => (
                        <button
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"
                            style={{ left: `${(bookmark.time / videoDuration) * 100}%` }}
                            title={bookmark.label}
                        />
                    ))}
                    {/* Progress Slider */}
                    <Slider
                        value={[progress]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="cursor-pointer"
                    />
                </div>

                <div className="flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => skip(-10)}>
                            <SkipBack className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={togglePlay}>
                            {isPlaying ? (
                                <Pause className="h-5 w-5" />
                            ) : (
                                <Play className="h-5 w-5" />
                            )}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => skip(10)}>
                            <SkipForward className="h-5 w-5" />
                        </Button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 ml-2">
                            <Button variant="ghost" size="icon" onClick={toggleMute}>
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </Button>
                            <Slider
                                value={[isMuted ? 0 : volume]}
                                onValueChange={handleVolumeChange}
                                max={1}
                                step={0.01}
                                className="w-20"
                            />
                        </div>

                        <span className="text-sm text-white/80 ml-4">
                            {formatTime(currentTime)} / {formatTime(videoDuration)}
                        </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-1">
                        {/* Playback Speed */}
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                {playbackRate}x
                            </Button>
                            {showSettings && (
                                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900 rounded-lg border border-white/10 p-2 min-w-[100px]">
                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                        <button
                                            key={rate}
                                            onClick={() => changePlaybackRate(rate)}
                                            className={cn(
                                                "w-full px-3 py-1.5 text-sm text-left rounded hover:bg-white/10",
                                                playbackRate === rate && "text-primary"
                                            )}
                                        >
                                            {rate}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button variant="ghost" size="icon">
                            <Subtitles className="h-5 w-5" />
                        </Button>

                        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                            {isFullscreen ? (
                                <Minimize className="h-5 w-5" />
                            ) : (
                                <Maximize className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
