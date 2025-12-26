"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    UserPlus,
    Mail,
    MoreHorizontal,
    Search,
    Filter,
    ChevronDown,
    Trophy,
    BookOpen,
    Calendar,
    Settings,
    Shield,
    Edit3,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "member";
    team: string;
    coursesCompleted: number;
    coursesAssigned: number;
    lastActive: string;
    joinedDate: string;
}

interface Team {
    id: string;
    name: string;
    memberCount: number;
    avgProgress: number;
}

// Mock data
const teamMembers: TeamMember[] = [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com", role: "admin", team: "Engineering", coursesCompleted: 12, coursesAssigned: 15, lastActive: "Today", joinedDate: "Jan 2024" },
    { id: "2", name: "Marcus Johnson", email: "marcus@company.com", role: "manager", team: "Product", coursesCompleted: 9, coursesAssigned: 12, lastActive: "Yesterday", joinedDate: "Feb 2024" },
    { id: "3", name: "Emily Rodriguez", email: "emily@company.com", role: "member", team: "Design", coursesCompleted: 11, coursesAssigned: 14, lastActive: "2 days ago", joinedDate: "Mar 2024" },
    { id: "4", name: "David Kim", email: "david@company.com", role: "member", team: "Engineering", coursesCompleted: 8, coursesAssigned: 10, lastActive: "Today", joinedDate: "Mar 2024" },
    { id: "5", name: "Lisa Wang", email: "lisa@company.com", role: "member", team: "Marketing", coursesCompleted: 7, coursesAssigned: 8, lastActive: "3 days ago", joinedDate: "Apr 2024" },
];

const teams: Team[] = [
    { id: "1", name: "Engineering", memberCount: 24, avgProgress: 78 },
    { id: "2", name: "Product", memberCount: 12, avgProgress: 85 },
    { id: "3", name: "Design", memberCount: 8, avgProgress: 72 },
    { id: "4", name: "Marketing", memberCount: 15, avgProgress: 65 },
];

export function TeamManagement() {
    const [view, setView] = useState<"members" | "teams">("members");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeam, setSelectedTeam] = useState<string>("all");
    const [showInviteModal, setShowInviteModal] = useState(false);

    const filteredMembers = teamMembers.filter((member) => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTeam = selectedTeam === "all" || member.team === selectedTeam;
        return matchesSearch && matchesTeam;
    });

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin": return <Badge className="bg-red-500/10 text-red-500">Admin</Badge>;
            case "manager": return <Badge className="bg-blue-500/10 text-blue-500">Manager</Badge>;
            default: return <Badge variant="outline">Member</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Team Management</h1>
                    <p className="text-muted-foreground">Manage team members and assignments</p>
                </div>
                <Button className="gap-2" onClick={() => setShowInviteModal(true)}>
                    <UserPlus className="h-4 w-4" />
                    Invite Members
                </Button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-4 border-b border-border">
                <button
                    onClick={() => setView("members")}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                        view === "members"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    Members ({teamMembers.length})
                </button>
                <button
                    onClick={() => setView("teams")}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                        view === "teams"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    Teams ({teams.length})
                </button>
            </div>

            {/* Members View */}
            {view === "members" && (
                <>
                    {/* Filters */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search members..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <select
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            className="h-10 px-3 rounded-lg bg-muted border-0 text-sm"
                        >
                            <option value="all">All Teams</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Members List */}
                    <div className="space-y-2">
                        {filteredMembers.map((member) => (
                            <Card key={member.id} className="p-4 hover:border-primary/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                        {member.name.split(" ").map((n) => n[0]).join("")}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{member.name}</p>
                                            {getRoleBadge(member.role)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="hidden md:flex items-center gap-8 text-sm">
                                        <div className="text-center">
                                            <p className="font-medium">{member.coursesCompleted}/{member.coursesAssigned}</p>
                                            <p className="text-xs text-muted-foreground">Courses</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium">{member.team}</p>
                                            <p className="text-xs text-muted-foreground">Team</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium">{member.lastActive}</p>
                                            <p className="text-xs text-muted-foreground">Last Active</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon">
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {/* Teams View */}
            {view === "teams" && (
                <div className="grid md:grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <Card key={team.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{team.name}</h3>
                                    <p className="text-sm text-muted-foreground">{team.memberCount} members</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Avg. Progress</span>
                                    <span className="font-medium">{team.avgProgress}%</span>
                                </div>
                                <Progress value={team.avgProgress} className="h-2" />
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <Users className="h-4 w-4" />
                                    View Members
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    Assignments
                                </Button>
                            </div>
                        </Card>
                    ))}

                    {/* Create Team Card */}
                    <Card className="p-6 border-dashed flex items-center justify-center">
                        <Button variant="ghost" className="gap-2">
                            <Users className="h-5 w-5" />
                            Create New Team
                        </Button>
                    </Card>
                </div>
            )}

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Invite Team Members</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Email Addresses</label>
                                <textarea
                                    placeholder="Enter email addresses, separated by commas..."
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Role</label>
                                <select className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-sm">
                                    <option value="member">Member</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Team</label>
                                <select className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-sm">
                                    {teams.map((team) => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" className="flex-1" onClick={() => setShowInviteModal(false)}>
                                Cancel
                            </Button>
                            <Button className="flex-1 gap-2">
                                <Mail className="h-4 w-4" />
                                Send Invites
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
