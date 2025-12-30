"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Building2,
    Award,
    BookOpen,
    Clock,
    Calendar,
    Edit3,
    Camera,
    Shield,
    Bell,
    Globe,
    Lock,
    ChevronRight,
    ExternalLink,
    Linkedin,
    Twitter,
    Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIAssistantButton } from "@/components/ai";

// =============================================================================
// MOCK USER DATA
// =============================================================================

const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    avatar: "AJ",
    role: "Senior Software Engineer",
    department: "Engineering",
    company: "TechCorp Inc.",
    joinDate: "January 2024",
    timezone: "America/New_York",
    bio: "Passionate about AI and building great products. Currently focused on learning AI-native development practices.",
    stats: {
        lessonsCompleted: 24,
        hoursLearned: 18,
        certifications: 1,
        rank: 15,
    },
    certifications: [
        { name: "AI-Native Foundations", date: "December 2024", credentialId: "SN-FND-2024-ABC123", badge: "🎓" },
    ],
    badges: [
        { icon: "🔥", name: "7-Day Streak", date: "Dec 28, 2024" },
        { icon: "📚", name: "First Module Complete", date: "Dec 20, 2024" },
        { icon: "🎯", name: "Perfect Quiz Score", date: "Dec 25, 2024" },
    ],
    social: {
        linkedin: "linkedin.com/in/alexjohnson",
        twitter: "@alexj_dev",
        github: "github.com/alexj",
    },
};

// =============================================================================
// PROFILE PAGE
// =============================================================================

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-4xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/training" className="text-sm text-white/60 hover:text-white transition-colors">My Learning</Link>
                        <Link href="/my-progress" className="text-sm text-white/60 hover:text-white transition-colors">Progress</Link>
                        <Link href="/profile" className="text-sm text-white font-medium">Profile</Link>
                    </nav>
                    <Link href="/settings" className="text-sm text-white/60 hover:text-white transition-colors">
                        Settings
                    </Link>
                </div>
            </header>

            <main className="px-6 py-8 max-w-4xl mx-auto">
                {/* Profile Header */}
                <section className="mb-8">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
                        <div className="flex items-start gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
                                    {userProfile.avatar}
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                                        <p className="text-white/50">{userProfile.role}</p>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        Edit Profile
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/40">
                                    <span className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        {userProfile.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {userProfile.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Member since {userProfile.joinDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="mt-4 text-sm text-white/60 border-t border-white/10 pt-4">
                            {userProfile.bio}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-4">
                            <a href={`https://${userProfile.social.linkedin}`} target="_blank" rel="noopener" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href={`https://twitter.com/${userProfile.social.twitter}`} target="_blank" rel="noopener" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href={`https://${userProfile.social.github}`} target="_blank" rel="noopener" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <Github className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                        <BookOpen className="h-5 w-5 mx-auto mb-2 text-blue-400" />
                        <p className="text-2xl font-bold">{userProfile.stats.lessonsCompleted}</p>
                        <p className="text-xs text-white/40">Lessons</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                        <Clock className="h-5 w-5 mx-auto mb-2 text-emerald-400" />
                        <p className="text-2xl font-bold">{userProfile.stats.hoursLearned}h</p>
                        <p className="text-xs text-white/40">Learning Time</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                        <Award className="h-5 w-5 mx-auto mb-2 text-purple-400" />
                        <p className="text-2xl font-bold">{userProfile.stats.certifications}</p>
                        <p className="text-xs text-white/40">Certifications</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                        <User className="h-5 w-5 mx-auto mb-2 text-yellow-400" />
                        <p className="text-2xl font-bold">#{userProfile.stats.rank}</p>
                        <p className="text-xs text-white/40">Leaderboard</p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Certifications */}
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold">Certifications</h2>
                            <Link href="/certifications" className="text-sm text-white/40 hover:text-white">
                                View all →
                            </Link>
                        </div>
                        {userProfile.certifications.length > 0 ? (
                            <div className="space-y-3">
                                {userProfile.certifications.map((cert, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                                        <span className="text-3xl">{cert.badge}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{cert.name}</p>
                                            <p className="text-xs text-white/40">Earned {cert.date}</p>
                                        </div>
                                        <Link href={`/verify?id=${cert.credentialId}`}>
                                            <ExternalLink className="h-4 w-4 text-white/40 hover:text-white" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-white/40">No certifications yet. Start learning to earn your first!</p>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold">Badges Earned</h2>
                            <span className="text-sm text-white/40">{userProfile.badges.length} total</span>
                        </div>
                        <div className="space-y-3">
                            {userProfile.badges.map((badge, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                                    <span className="text-2xl">{badge.icon}</span>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{badge.name}</p>
                                        <p className="text-xs text-white/40">{badge.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <section className="mt-8">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                        <h2 className="font-semibold mb-4">Quick Settings</h2>
                        <div className="space-y-2">
                            <Link href="/settings">
                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-white/40" />
                                        <span className="text-sm">Notification Preferences</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-white/20" />
                                </div>
                            </Link>
                            <Link href="/settings">
                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Lock className="h-5 w-5 text-white/40" />
                                        <span className="text-sm">Privacy & Security</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-white/20" />
                                </div>
                            </Link>
                            <Link href="/settings">
                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-5 w-5 text-white/40" />
                                        <span className="text-sm">Language & Region</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-white/20" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* AI Assistant */}
            <AIAssistantButton />
        </div>
    );
}
