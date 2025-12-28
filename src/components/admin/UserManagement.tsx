"use client";

/**
 * Admin User Management Component
 * 
 * User list with search, filters, role management,
 * and bulk actions for administrators.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge, Input } from "@/components/ui";
import {
    Search,
    Filter,
    MoreHorizontal,
    UserPlus,
    Download,
    Trash2,
    Shield,
    Mail,
    Check,
    X,
    ChevronDown,
    Users,
    Clock,
    Activity,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface AdminUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: "admin" | "manager" | "instructor" | "learner";
    status: "active" | "inactive" | "pending";
    department?: string;
    createdAt: Date;
    lastActiveAt?: Date;
    coursesEnrolled: number;
    coursesCompleted: number;
}

interface UserManagementProps {
    users: AdminUser[];
    onUserSelect: (user: AdminUser) => void;
    onInviteUsers: () => void;
    onBulkAction: (action: string, userIds: string[]) => void;
    onExport: () => void;
    className?: string;
}

// =============================================================================
// ROLE & STATUS CONFIG
// =============================================================================

const roleLabels: Record<AdminUser["role"], string> = {
    admin: "Admin",
    manager: "Manager",
    instructor: "Instructor",
    learner: "Learner",
};

const roleColors: Record<AdminUser["role"], string> = {
    admin: "bg-red-500/20 text-red-400",
    manager: "bg-purple-500/20 text-purple-400",
    instructor: "bg-blue-500/20 text-blue-400",
    learner: "bg-emerald-500/20 text-emerald-400",
};

const statusColors: Record<AdminUser["status"], string> = {
    active: "bg-emerald-500/20 text-emerald-400",
    inactive: "bg-gray-500/20 text-gray-400",
    pending: "bg-amber-500/20 text-amber-400",
};

// =============================================================================
// COMPONENT
// =============================================================================

export function UserManagement({
    users,
    onUserSelect,
    onInviteUsers,
    onBulkAction,
    onExport,
    className,
}: UserManagementProps) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<AdminUser["role"] | "all">("all");
    const [statusFilter, setStatusFilter] = useState<AdminUser["status"] | "all">("all");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [sortBy, setSortBy] = useState<"name" | "createdAt" | "lastActive">("name");

    const filteredUsers = useMemo(() => {
        return users
            .filter((user) => {
                const searchLower = search.toLowerCase();
                const matchesSearch =
                    user.firstName.toLowerCase().includes(searchLower) ||
                    user.lastName.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower);
                const matchesRole = roleFilter === "all" || user.role === roleFilter;
                const matchesStatus = statusFilter === "all" || user.status === statusFilter;
                return matchesSearch && matchesRole && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === "name") {
                    return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
                }
                if (sortBy === "createdAt") {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                if (sortBy === "lastActive") {
                    const aTime = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0;
                    const bTime = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0;
                    return bTime - aTime;
                }
                return 0;
            });
    }, [users, search, roleFilter, statusFilter, sortBy]);

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const selectAll = () => {
        if (selectedIds.size === filteredUsers.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredUsers.map((u) => u.id)));
        }
    };

    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter((u) => u.status === "active").length,
        pending: users.filter((u) => u.status === "pending").length,
    }), [users]);

    return (
        <div className={cn("space-y-6", className)}>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-emerald-400" />
                        <div>
                            <p className="text-2xl font-bold">{stats.active}</p>
                            <p className="text-sm text-muted-foreground">Active</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-amber-400" />
                        <div>
                            <p className="text-2xl font-bold">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as AdminUser["role"] | "all")}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admins</option>
                    <option value="manager">Managers</option>
                    <option value="instructor">Instructors</option>
                    <option value="learner">Learners</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as AdminUser["status"] | "all")}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>

                <Button variant="outline" onClick={onExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>

                <Button onClick={onInviteUsers}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Users
                </Button>
            </div>

            {/* Bulk Actions */}
            {selectedIds.size > 0 && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30">
                    <span className="text-sm font-medium">{selectedIds.size} selected</span>
                    <div className="flex-1" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onBulkAction("email", Array.from(selectedIds))}
                    >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onBulkAction("deactivate", Array.from(selectedIds))}
                    >
                        <X className="h-4 w-4 mr-1" />
                        Deactivate
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => onBulkAction("delete", Array.from(selectedIds))}
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                    </Button>
                </div>
            )}

            {/* Table */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/30">
                            <tr>
                                <th className="w-10 px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.size === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={selectAll}
                                        className="rounded border-white/30"
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Progress</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Last Active</th>
                                <th className="w-10 px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-white/[0.02] cursor-pointer"
                                    onClick={() => onUserSelect(user)}
                                >
                                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(user.id)}
                                            onChange={() => toggleSelect(user.id)}
                                            className="rounded border-white/30"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge className={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge className={statusColors[user.status]}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            <span className="font-medium">{user.coursesCompleted}</span>
                                            <span className="text-muted-foreground"> / {user.coursesEnrolled}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {user.lastActiveAt
                                            ? formatTimeAgo(user.lastActiveAt)
                                            : "Never"}
                                    </td>
                                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <button className="p-1 rounded-lg hover:bg-muted">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">
                        No users found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
}

function formatTimeAgo(date: Date): string {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

export default UserManagement;
