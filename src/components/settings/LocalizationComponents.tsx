"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Globe,
    Check,
    ChevronDown,
    Moon,
    Sun,
    Monitor,
    Type,
    Palette,
    Eye,
    Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Language selector
export function LanguageSelector({
    current,
    languages,
    onChange,
}: {
    current: string;
    languages: { code: string; name: string; flag?: string }[];
    onChange: (code: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const currentLang = languages.find(l => l.code === current);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
            >
                <Globe className="h-4 w-4 text-white/50" />
                {currentLang?.flag && <span>{currentLang.flag}</span>}
                <span className="text-sm">{currentLang?.name}</span>
                <ChevronDown className="h-4 w-4 text-white/50" />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-lg bg-black/95 border border-white/10 shadow-xl p-1">
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    onChange(lang.code);
                                    setOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left",
                                    lang.code === current
                                        ? "bg-primary/20 text-primary"
                                        : "hover:bg-white/10"
                                )}
                            >
                                {lang.flag && <span>{lang.flag}</span>}
                                {lang.name}
                                {lang.code === current && <Check className="h-4 w-4 ml-auto" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// Theme selector
export function ThemeSelector({
    theme,
    onChange,
}: {
    theme: "light" | "dark" | "system";
    onChange: (theme: "light" | "dark" | "system") => void;
}) {
    const themes = [
        { id: "light" as const, label: "Light", icon: <Sun className="h-5 w-5" /> },
        { id: "dark" as const, label: "Dark", icon: <Moon className="h-5 w-5" /> },
        { id: "system" as const, label: "System", icon: <Monitor className="h-5 w-5" /> },
    ];

    return (
        <div className="flex gap-2">
            {themes.map(t => (
                <button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    className={cn(
                        "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                        theme === t.id
                            ? "bg-primary/20 border-2 border-primary"
                            : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                    )}
                >
                    <span className={theme === t.id ? "text-primary" : "text-white/50"}>
                        {t.icon}
                    </span>
                    <span className="text-sm">{t.label}</span>
                </button>
            ))}
        </div>
    );
}

// Font size selector
export function FontSizeSelector({
    size,
    onChange,
}: {
    size: "sm" | "base" | "lg" | "xl";
    onChange: (size: "sm" | "base" | "lg" | "xl") => void;
}) {
    const sizes = [
        { id: "sm" as const, label: "Small" },
        { id: "base" as const, label: "Normal" },
        { id: "lg" as const, label: "Large" },
        { id: "xl" as const, label: "Extra Large" },
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
                <Type className="h-5 w-5 text-white/50" />
                <span className="text-sm text-white/60">Text Size</span>
            </div>
            <div className="flex gap-2">
                {sizes.map(s => (
                    <button
                        key={s.id}
                        onClick={() => onChange(s.id)}
                        className={cn(
                            "flex-1 px-3 py-2 rounded-lg text-sm transition-colors",
                            size === s.id
                                ? "bg-primary text-white"
                                : "bg-white/10 hover:bg-white/20"
                        )}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Accent color picker
export function AccentColorPicker({
    color,
    onChange,
}: {
    color: string;
    onChange: (color: string) => void;
}) {
    const colors = [
        { id: "blue", value: "#3b82f6" },
        { id: "purple", value: "#8b5cf6" },
        { id: "pink", value: "#ec4899" },
        { id: "rose", value: "#f43f5e" },
        { id: "orange", value: "#f97316" },
        { id: "amber", value: "#f59e0b" },
        { id: "emerald", value: "#10b981" },
        { id: "teal", value: "#14b8a6" },
        { id: "cyan", value: "#06b6d4" },
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
                <Palette className="h-5 w-5 text-white/50" />
                <span className="text-sm text-white/60">Accent Color</span>
            </div>
            <div className="flex gap-2 flex-wrap">
                {colors.map(c => (
                    <button
                        key={c.id}
                        onClick={() => onChange(c.value)}
                        className={cn(
                            "w-10 h-10 rounded-full transition-transform hover:scale-110",
                            color === c.value && "ring-2 ring-white ring-offset-2 ring-offset-black"
                        )}
                        style={{ backgroundColor: c.value }}
                    />
                ))}
            </div>
        </div>
    );
}

// Accessibility settings
export function AccessibilitySettings({
    settings,
    onChange,
}: {
    settings: {
        reduceMotion: boolean;
        highContrast: boolean;
        largeClickTargets: boolean;
        screenReaderOptimized: boolean;
    };
    onChange: (key: keyof typeof settings, value: boolean) => void;
}) {
    const options = [
        {
            key: "reduceMotion" as const,
            label: "Reduce Motion",
            description: "Minimize animations and transitions",
        },
        {
            key: "highContrast" as const,
            label: "High Contrast",
            description: "Increase color contrast for better visibility",
        },
        {
            key: "largeClickTargets" as const,
            label: "Large Click Targets",
            description: "Make buttons and links easier to click",
        },
        {
            key: "screenReaderOptimized" as const,
            label: "Screen Reader Optimized",
            description: "Optimize content for screen readers",
        },
    ];

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10 space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-white/50" />
                <span className="font-medium">Accessibility</span>
            </div>

            {options.map(option => (
                <div
                    key={option.key}
                    className="flex items-center justify-between py-2"
                >
                    <div>
                        <p className="text-sm font-medium">{option.label}</p>
                        <p className="text-xs text-white/50">{option.description}</p>
                    </div>
                    <button
                        onClick={() => onChange(option.key, !settings[option.key])}
                        className={cn(
                            "w-10 h-6 rounded-full transition-colors relative",
                            settings[option.key] ? "bg-primary" : "bg-white/20"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                            settings[option.key] ? "left-5" : "left-1"
                        )} />
                    </button>
                </div>
            ))}
        </Card>
    );
}

// Playback speed selector (for video content)
export function PlaybackSpeedSelector({
    speed,
    onChange,
}: {
    speed: number;
    onChange: (speed: number) => void;
}) {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-white/50" />
                <span className="text-sm text-white/60">Playback Speed</span>
            </div>
            <div className="flex gap-1">
                {speeds.map(s => (
                    <button
                        key={s}
                        onClick={() => onChange(s)}
                        className={cn(
                            "px-2 py-1 rounded text-sm transition-colors",
                            speed === s
                                ? "bg-primary text-white"
                                : "bg-white/10 hover:bg-white/20"
                        )}
                    >
                        {s}x
                    </button>
                ))}
            </div>
        </div>
    );
}
