"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress, Avatar } from "@/components/ui";
import {
    User,
    Mail,
    Building2,
    MapPin,
    Calendar,
    Trophy,
    Star,
    Flame,
    Award,
    BookOpen,
    Clock,
    Edit3,
    Camera,
    Share2,
    Download,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
    name: string;
    email: string;
    role: string;
    department: string;
    location: string;
    joinedDate: string;
    bio: string;
    avatar?: string;
}

interface UserStats {
    coursesCompleted: number;
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    hoursLearned: number;
    certificatesEarned: number;
    currentLevel: number;
    xpToNextLevel: number;
    rank: number;
    totalUsers: number;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    earnedDate?: string;
    icon: string;
}

// Mock data
const userProfile: UserProfile = {
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Senior Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    joinedDate: "January 2024",
    bio: "Passionate about continuous learning and helping others grow. Currently focused on leadership development and agile methodologies.",
};

const userStats: UserStats = {
    coursesCompleted: 24,
    totalXP: 8450,
    currentStreak: 5,
    longestStreak: 21,
    hoursLearned: 86,
    certificatesEarned: 8,
    currentLevel: 12,
    xpToNextLevel: 550,
    rank: 5,
    totalUsers: 156,
};

const achievements: Achievement[] = [
    { id: "1", title: "First Course", description: "Complete your first course", earnedDate: "Jan 15, 2024", icon: "🎯" },
    { id: "2", title: "Week Warrior", description: "7-day learning streak", earnedDate: "Feb 2, 2024", icon: "🔥" },
    { id: "3", title: "Knowledge Seeker", description: "Complete 10 courses", earnedDate: "Mar 10, 2024", icon: "📚" },
    { id: "4", title: "Quiz Master", description: "Score 100% on 5 quizzes", earnedDate: "Mar 25, 2024", icon: "🏆" },
    { id: "5", title: "Team Player", description: "Help 10 colleagues", icon: "🤝" },
    { id: "6", title: "Expert Level", description: "Reach level 20", icon: "⭐" },
];

const recentActivity = [
    { action: "Completed", item: "SAFe Scrum Master Certification", time: "2 hours ago" },
    { action: "Started", item: "Leadership Fundamentals", time: "5 hours ago" },
    { action: "Earned", item: "Quiz Master achievement", time: "1 day ago" },
    { action: "Completed", item: "HIPAA Compliance Quiz", time: "2 days ago" },
];

export function UserProfile() {
    const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "activity">("overview");

    const levelProgress = ((3000 - userStats.xpToNextLevel) / 3000) * 100;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="overflow-hidden">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

                {/* Profile Info */}
                <div className="px-6 pb-6 -mt-16">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-700 border-4 border-card flex items-center justify-center text-4xl font-bold">
                                {userProfile.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Camera className="h-4 w-4" />
                            </button>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
                                {userStats.currentLevel}
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                    Level {userStats.currentLevel}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">{userProfile.role} • {userProfile.department}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {userProfile.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {userProfile.joinedDate}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="h-4 w-4" />
                                Share
                            </Button>
                            <Button size="sm" className="gap-2">
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Level {userStats.currentLevel} Progress</span>
                            <span className="text-sm font-medium">{userStats.xpToNextLevel} XP to Level {userStats.currentLevel + 1}</span>
                        </div>
                        <Progress value={levelProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                            Total: {userStats.totalXP.toLocaleString()} XP • Rank #{userStats.rank} of {userStats.totalUsers}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: "Courses", value: userStats.coursesCompleted, icon: BookOpen },
                    { label: "XP", value: userStats.totalXP.toLocaleString(), icon: Star },
                    { label: "Streak", value: `${userStats.currentStreak} days`, icon: Flame },
                    { label: "Hours", value: userStats.hoursLearned, icon: Clock },
                    { label: "Certificates", value: userStats.certificatesEarned, icon: Award },
                    { label: "Rank", value: `#${userStats.rank}`, icon: Trophy },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className="p-4 text-center">
                            <Icon className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xl font-bold">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </Card>
                    );
                })}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-border">
                {(["overview", "achievements", "activity"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors",
                            activeTab === tab
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">About</h3>
                        <p className="text-muted-foreground text-sm">{userProfile.bio}</p>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span>
                                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                                        <span className="font-medium">{activity.item}</span>
                                    </span>
                                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === "achievements" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                        <Card
                            key={achievement.id}
                            className={cn(
                                "p-4",
                                achievement.earnedDate ? "" : "opacity-50"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{achievement.title}</p>
                                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                    {achievement.earnedDate && (
                                        <p className="text-xs text-primary mt-1">Earned {achievement.earnedDate}</p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === "activity" && (
                <Card className="p-6">
                    <div className="space-y-4">
                        {recentActivity.concat(recentActivity).map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                                        <span className="font-medium">{activity.item}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
