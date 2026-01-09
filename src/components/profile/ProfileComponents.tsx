"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    User,
    Mail,
    MapPin,
    Link,
    Github,
    Linkedin,
    Twitter,
    Edit,
    Settings,
    Camera,
    Trophy,
    Flame,
    BookOpen,
    Clock,
    Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

// User profile header
export function ProfileHeader({
    user,
    isOwnProfile,
    onEdit,
    onSettings,
}: {
    user: {
        name: string;
        username: string;
        avatar?: string;
        bio?: string;
        location?: string;
        website?: string;
        joinedAt: string;
        socials?: { github?: string; linkedin?: string; twitter?: string };
    };
    isOwnProfile?: boolean;
    onEdit?: () => void;
    onSettings?: () => void;
}) {
    return (
        <div className="relative">
            {/* Cover image placeholder */}
            <div className="h-32 bg-gradient-to-r from-primary/20 via-emerald-500/20 to-cyan-500/20 rounded-t-xl" />

            <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-4xl font-bold border-4 border-black">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user.name.charAt(0)
                        )}
                    </div>
                    {isOwnProfile && (
                        <button className="absolute bottom-0 right-0 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <Camera className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Info */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-white/50">@{user.username}</p>

                        {user.bio && <p className=" text-white/70 mt-3 max-w-lg">{user.bio}</p>}

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/50">
                            {user.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {user.location}
                                </span>
                            )}
                            {user.website && (
                                <a href={user.website} className="flex items-center gap-1 hover:text-primary">
                                    <Link className="h-4 w-4" />
                                    {user.website.replace(/https?:\/\//, '')}
                                </a>
                            )}
                            <span>Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>

                        {/* Socials */}
                        {user.socials && (
                            <div className="flex items-center gap-2 mt-3">
                                {user.socials.github && (
                                    <a href={user.socials.github} className="p-2 hover:bg-white/10 rounded-lg">
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                                {user.socials.linkedin && (
                                    <a href={user.socials.linkedin} className="p-2 hover:bg-white/10 rounded-lg">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {user.socials.twitter && (
                                    <a href={user.socials.twitter} className="p-2 hover:bg-white/10 rounded-lg">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {isOwnProfile && (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={onEdit}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button variant="outline" onClick={onSettings}>
                                <Settings className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Profile stats card
export function ProfileStats({
    stats,
}: {
    stats: {
        lessonsCompleted: number;
        hoursLearned: number;
        currentStreak: number;
        certificatesEarned: number;
        xpTotal: number;
        badgesEarned: number;
    };
}) {
    const items = [
        { label: "Lessons", value: stats.lessonsCompleted, icon: <BookOpen className="h-5 w-5 text-blue-400" /> },
        { label: "Hours", value: stats.hoursLearned, icon: <Clock className="h-5 w-5 text-emerald-400" /> },
        { label: "Streak", value: stats.currentStreak, icon: <Flame className="h-5 w-5 text-amber-400" /> },
        { label: "Certs", value: stats.certificatesEarned, icon: <Award className="h-5 w-5 text-purple-400" /> },
        { label: "XP", value: stats.xpTotal.toLocaleString(), icon: <Trophy className="h-5 w-5 text-pink-400" /> },
    ];

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-around">
                {items.map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="flex justify-center mb-1">{item.icon}</div>
                        <div className="text-xl font-bold">{item.value}</div>
                        <div className="text-xs text-white/50">{item.label}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Achievement badge
export function AchievementBadge({
    badge,
    size = "md",
    showDetails = true,
}: {
    badge: {
        id: string;
        name: string;
        description: string;
        icon: string;
        rarity: "common" | "rare" | "epic" | "legendary";
        earnedAt?: string;
        locked?: boolean;
    };
    size?: "sm" | "md" | "lg";
    showDetails?: boolean;
}) {
    const rarityConfig = {
        common: { border: "border-white/20", bg: "bg-white/5", glow: "" },
        rare: { border: "border-blue-500/50", bg: "bg-blue-500/10", glow: "shadow-blue-500/20" },
        epic: { border: "border-purple-500/50", bg: "bg-purple-500/10", glow: "shadow-purple-500/20" },
        legendary: { border: "border-amber-500/50", bg: "bg-amber-500/10", glow: "shadow-amber-500/20 shadow-lg" },
    };

    const sizeConfig = {
        sm: { container: "w-12 h-12", icon: "text-xl" },
        md: { container: "w-16 h-16", icon: "text-2xl" },
        lg: { container: "w-20 h-20", icon: "text-3xl" },
    };

    const config = rarityConfig[badge.rarity];
    const sizes = sizeConfig[size];

    return (
        <div className={cn("flex items-center gap-3", badge.locked && "opacity-50")}>
            <div className={cn(
                "rounded-xl flex items-center justify-center border",
                sizes.container,
                config.border,
                config.bg,
                config.glow
            )}>
                <span className={sizes.icon}>{badge.icon}</span>
            </div>
            {showDetails && (
                <div>
                    <h4 className="font-medium text-sm">{badge.name}</h4>
                    <p className="text-xs text-white/50">{badge.description}</p>
                    {badge.earnedAt && (
                        <p className="text-xs text-white/30 mt-1">
                            Earned {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

// Badge showcase
export function BadgeShowcase({
    badges,
    title = "Achievements",
}: {
    badges: {
        id: string;
        name: string;
        icon: string;
        rarity: "common" | "rare" | "epic" | "legendary";
        earnedAt?: string;
        locked?: boolean;
    }[];
    title?: string;
}) {
    const earnedBadges = badges.filter(b => !b.locked);
    const lockedBadges = badges.filter(b => b.locked);

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{title}</h3>
                <Badge className="bg-white/10 text-white/60">
                    {earnedBadges.length}/{badges.length}
                </Badge>
            </div>

            <div className="flex flex-wrap gap-3">
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl border transition-transform hover:scale-110",
                            badge.locked
                                ? "bg-white/5 border-white/10 opacity-30 grayscale"
                                : badge.rarity === "legendary"
                                    ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30"
                                    : badge.rarity === "epic"
                                        ? "bg-purple-500/20 border-purple-500/30"
                                        : badge.rarity === "rare"
                                            ? "bg-blue-500/20 border-blue-500/30"
                                            : "bg-white/10 border-white/20"
                        )}
                        title={badge.name}
                    >
                        {badge.icon}
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Learning history/activity feed
export function ActivityFeed({
    activities,
}: {
    activities: {
        id: string;
        type: "lesson_complete" | "badge_earned" | "streak" | "certificate" | "quiz_passed";
        title: string;
        timestamp: string;
        metadata?: { xp?: number; score?: number };
    }[];
}) {
    const typeConfig = {
        lesson_complete: { icon: <BookOpen className="h-4 w-4" />, color: "text-blue-400" },
        badge_earned: { icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
        streak: { icon: <Flame className="h-4 w-4" />, color: "text-amber-400" },
        certificate: { icon: <Trophy className="h-4 w-4" />, color: "text-emerald-400" },
        quiz_passed: { icon: <Trophy className="h-4 w-4" />, color: "text-pink-400" },
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4">Recent Activity</h3>

            <div className="space-y-4">
                {activities.map((activity) => {
                    const config = typeConfig[activity.type];
                    return (
                        <div key={activity.id} className="flex items-start gap-3">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                config.color.replace("text-", "bg-").replace("-400", "-500/20")
                            )}>
                                <span className={config.color}>{config.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm">{activity.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-white/40">
                                        {formatTimeAgo(activity.timestamp)}
                                    </span>
                                    {activity.metadata?.xp && (
                                        <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                                            +{activity.metadata.xp} XP
                                        </Badge>
                                    )}
                                    {activity.metadata?.score && (
                                        <Badge className="bg-white/10 text-white/60 text-xs">
                                            {activity.metadata.score}%
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}
