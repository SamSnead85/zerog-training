"use client";

import { useState, useEffect } from "react";
import {
    Users,
    TrendingUp,
    Clock,
    Award,
    GraduationCap,
    ChevronRight,
    BarChart3,
    CheckCircle2,
    AlertCircle,
    Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthProvider, useAuth, getProvisionedUsers, ProvisionedUser } from "@/lib/auth/AuthContext";
import Link from "next/link";

// =============================================================================
// MOCK TEAM DATA
// =============================================================================

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    avatar?: string;
    progress: {
        coursesCompleted: number;
        totalCourses: number;
        hoursSpent: number;
        certifications: number;
        lastActive: string;
        currentCourse?: string;
        completionRate: number;
    };
}

// Generate mock team members (in production, this would come from API)
const generateMockTeamMembers = (): TeamMember[] => {
    const names = [
        "Emily Rodriguez", "Marcus Johnson", "Sarah Chen", "David Kim",
        "Jessica Williams", "Michael Brown", "Amanda Lopez", "James Wilson"
    ];

    const departments = ["Engineering", "Operations", "Sales", "Customer Success"];
    const courses = ["AI-Native Foundations", "Prompt Engineering", "AI Governance", "Enterprise AI"];

    return names.map((name, i) => ({
        id: `team_${i + 1}`,
        name,
        email: `${name.toLowerCase().replace(" ", ".")}@company.com`,
        role: i === 0 ? "Team Lead" : "Team Member",
        department: departments[i % departments.length],
        progress: {
            coursesCompleted: Math.floor(Math.random() * 5),
            totalCourses: 5,
            hoursSpent: Math.floor(Math.random() * 40) + 5,
            certifications: Math.floor(Math.random() * 3),
            lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            currentCourse: courses[Math.floor(Math.random() * courses.length)],
            completionRate: Math.floor(Math.random() * 100),
        }
    }));
};

// =============================================================================
// TEAM DASHBOARD CONTENT
// =============================================================================

function TeamDashboardContent() {
    const { user, hasRole } = useAuth();
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [filter, setFilter] = useState<"all" | "active" | "behind">("all");

    // Merge mock data with provisioned users
    useEffect(() => {
        const mockMembers = generateMockTeamMembers();
        const provisionedUsers = getProvisionedUsers();

        // Add provisioned users as team members
        const provisionedMembers: TeamMember[] = provisionedUsers
            .filter(u => u.role === "LEARNER" || u.role === "MANAGER")
            .map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                role: u.role === "MANAGER" ? "Manager" : "Learner",
                department: "General",
                progress: {
                    coursesCompleted: 0,
                    totalCourses: 3,
                    hoursSpent: 0,
                    certifications: 0,
                    lastActive: u.createdAt,
                    currentCourse: u.certificationPath || "AI-Native Foundations",
                    completionRate: 0,
                }
            }));

        setTeamMembers([...provisionedMembers, ...mockMembers]);
    }, []);

    const filteredMembers = teamMembers.filter(member => {
        if (filter === "active") {
            const lastActive = new Date(member.progress.lastActive);
            const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceActive <= 3;
        }
        if (filter === "behind") {
            return member.progress.completionRate < 50;
        }
        return true;
    });

    const stats = {
        totalMembers: teamMembers.length,
        activeThisWeek: teamMembers.filter(m => {
            const lastActive = new Date(m.progress.lastActive);
            const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceActive <= 7;
        }).length,
        avgCompletion: Math.round(teamMembers.reduce((acc, m) => acc + m.progress.completionRate, 0) / teamMembers.length) || 0,
        totalCertifications: teamMembers.reduce((acc, m) => acc + m.progress.certifications, 0),
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Team Progress</h1>
                <p className="text-muted-foreground mt-1">
                    Monitor your team's training progress and certifications
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground">Team Size</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalMembers}</p>
                    <p className="text-sm text-muted-foreground mt-1">team members</p>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span className="text-xs text-muted-foreground">This Week</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.activeThisWeek}</p>
                    <p className="text-sm text-muted-foreground mt-1">active learners</p>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <BarChart3 className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-xs text-muted-foreground">Average</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.avgCompletion}%</p>
                    <p className="text-sm text-muted-foreground mt-1">completion rate</p>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <Award className="h-5 w-5 text-amber-500" />
                        </div>
                        <span className="text-xs text-muted-foreground">Total</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalCertifications}</p>
                    <p className="text-sm text-muted-foreground mt-1">certifications earned</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2">
                    {(["all", "active", "behind"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                filter === f
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                            )}
                        >
                            {f === "all" ? "All Members" : f === "active" ? "Active" : "Behind Schedule"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-3">
                {filteredMembers.map((member) => {
                    const daysSinceActive = Math.floor(
                        (Date.now() - new Date(member.progress.lastActive).getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const isActive = daysSinceActive <= 3;
                    const isBehind = member.progress.completionRate < 50;

                    return (
                        <div
                            key={member.id}
                            className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg font-semibold text-primary">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                                        {isActive && (
                                            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-500">
                                                Active
                                            </span>
                                        )}
                                        {isBehind && (
                                            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-500">
                                                Behind
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {member.email} · {member.department}
                                    </p>
                                </div>

                                {/* Progress */}
                                <div className="hidden md:flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-sm font-medium">{member.progress.coursesCompleted}/{member.progress.totalCourses}</p>
                                        <p className="text-xs text-muted-foreground">Courses</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">{member.progress.hoursSpent}h</p>
                                        <p className="text-xs text-muted-foreground">Time Spent</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">{member.progress.certifications}</p>
                                        <p className="text-xs text-muted-foreground">Certs</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="hidden lg:block w-32">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{member.progress.completionRate}%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                member.progress.completionRate >= 80 ? "bg-emerald-500" :
                                                    member.progress.completionRate >= 50 ? "bg-blue-500" :
                                                        "bg-amber-500"
                                            )}
                                            style={{ width: `${member.progress.completionRate}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Action */}
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>

                            {/* Current Course */}
                            {member.progress.currentCourse && (
                                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-sm">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Currently enrolled:</span>
                                    <span className="font-medium">{member.progress.currentCourse}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No team members found</h3>
                    <p className="text-muted-foreground">
                        {filter !== "all"
                            ? "Try adjusting your filters"
                            : "Start by adding team members to track their progress"}
                    </p>
                </div>
            )}

            {/* Quick Actions */}
            <div className="mt-8 p-6 rounded-xl bg-muted/30 border border-border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/users"
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Add Team Member
                    </Link>
                    <Link
                        href="/assign"
                        className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                        Assign Training
                    </Link>
                    <Link
                        href="/reports"
                        className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                        View Reports
                    </Link>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// MAIN PAGE EXPORT
// =============================================================================

export default function TeamPage() {
    return (
        <AuthProvider>
            <TeamDashboardContent />
        </AuthProvider>
    );
}
