"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Users,
    UserPlus,
    Mail,
    MoreVertical,
    Search,
    Filter,
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    Shield,
    Edit2,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

type UserStatus = "active" | "pending" | "inactive";
type UserRole = "admin" | "manager" | "learner";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    status: UserStatus;
    department: string;
    coursesAssigned: number;
    coursesCompleted: number;
    lastActive: string;
}

const statusConfig: Record<UserStatus, { label: string; color: string; icon: React.ElementType }> = {
    active: { label: "Active", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", icon: CheckCircle2 },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-500 border-amber-500/30", icon: Clock },
    inactive: { label: "Inactive", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: XCircle },
};

const roleConfig: Record<UserRole, { label: string; color: string }> = {
    admin: { label: "Admin", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    manager: { label: "Manager", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    learner: { label: "Learner", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
};

const mockTeamMembers: TeamMember[] = [
    { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", avatar: "SC", role: "admin", status: "active", department: "Engineering", coursesAssigned: 12, coursesCompleted: 10, lastActive: "2 hours ago" },
    { id: "2", name: "Michael Brown", email: "m.brown@company.com", avatar: "MB", role: "manager", status: "active", department: "Product", coursesAssigned: 8, coursesCompleted: 6, lastActive: "1 hour ago" },
    { id: "3", name: "Emily Rodriguez", email: "e.rodriguez@company.com", avatar: "ER", role: "learner", status: "active", department: "Security", coursesAssigned: 15, coursesCompleted: 12, lastActive: "30 min ago" },
    { id: "4", name: "David Kim", email: "d.kim@company.com", avatar: "DK", role: "learner", status: "pending", department: "Operations", coursesAssigned: 5, coursesCompleted: 0, lastActive: "Invited 2 days ago" },
    { id: "5", name: "Jennifer Lee", email: "j.lee@company.com", avatar: "JL", role: "manager", status: "active", department: "HR", coursesAssigned: 10, coursesCompleted: 8, lastActive: "Yesterday" },
    { id: "6", name: "Alex Thompson", email: "a.thompson@company.com", avatar: "AT", role: "learner", status: "inactive", department: "Finance", coursesAssigned: 6, coursesCompleted: 2, lastActive: "2 weeks ago" },
];

export function TeamManagement() {
    const [members, setMembers] = useState(mockTeamMembers);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

    const filtered = members.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || m.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: members.length,
        active: members.filter(m => m.status === "active").length,
        pending: members.filter(m => m.status === "pending").length,
        inactive: members.filter(m => m.status === "inactive").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Team Management
                    </h2>
                    <p className="text-sm text-muted-foreground">Manage users and training assignments</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button size="sm" className="gap-1">
                        <UserPlus className="h-4 w-4" />
                        Invite Users
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                </Card>
                <Card className="p-4 border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-500">{stats.active}</div>
                    <div className="text-sm text-muted-foreground">Active</div>
                </Card>
                <Card className="p-4 border-amber-500/20">
                    <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                </Card>
                <Card className="p-4 border-slate-500/20">
                    <div className="text-2xl font-bold text-slate-400">{stats.inactive}</div>
                    <div className="text-sm text-muted-foreground">Inactive</div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "active", "pending", "inactive"] as const).map((status) => (
                        <Button
                            key={status}
                            variant={statusFilter === status ? "default" : "outline"}
                            size="sm"
                            onClick={() => setStatusFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Members List */}
            <Card className="overflow-hidden">
                <div className="divide-y divide-border">
                    {filtered.map((member) => {
                        const status = statusConfig[member.status];
                        const role = roleConfig[member.role];
                        const StatusIcon = status.icon;
                        const completionRate = member.coursesAssigned > 0
                            ? Math.round((member.coursesCompleted / member.coursesAssigned) * 100)
                            : 0;

                        return (
                            <div key={member.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors group">
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                    {member.avatar}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{member.name}</span>
                                        <Badge variant="outline" className={cn("text-xs", role.color)}>
                                            {role.label}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Mail className="h-3 w-3" />
                                        {member.email}
                                    </div>
                                </div>

                                {/* Department */}
                                <div className="hidden md:block text-sm text-muted-foreground w-24">
                                    {member.department}
                                </div>

                                {/* Progress */}
                                <div className="hidden lg:block w-32">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>{member.coursesCompleted}/{member.coursesAssigned}</span>
                                        <span>{completionRate}%</span>
                                    </div>
                                    <Progress value={completionRate} className="h-1.5" />
                                </div>

                                {/* Status */}
                                <Badge variant="outline" className={cn("text-xs", status.color)}>
                                    <StatusIcon className="h-3 w-3 mr-1" />
                                    {status.label}
                                </Badge>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
