"use client";

import { useState, useCallback } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    UserPlus,
    Mail,
    Shield,
    MoreHorizontal,
    Check,
    X,
    Calendar,
    Trophy,
    Loader2,
    Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "member";
    joinedAt: string;
    progress: number;
    lastActive?: string;
    avatar?: string;
}

// Team members list
export function TeamMembersList({
    members,
    currentUserId,
    onRoleChange,
    onRemove,
    onInvite,
}: {
    members: TeamMember[];
    currentUserId: string;
    onRoleChange: (id: string, role: TeamMember["role"]) => void;
    onRemove: (id: string) => void;
    onInvite: () => void;
}) {
    const roleLabels = {
        admin: { label: "Admin", color: "bg-purple-500/20 text-purple-400" },
        manager: { label: "Manager", color: "bg-blue-500/20 text-blue-400" },
        member: { label: "Member", color: "bg-white/10 text-white/60" },
    };

    return (
        <Card className="bg-white/[0.02] border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <h3 className="font-semibold">Team Members</h3>
                    <Badge className="bg-white/10 text-white/60">{members.length}</Badge>
                </div>
                <Button size="sm" onClick={onInvite}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite
                </Button>
            </div>

            <div className="divide-y divide-white/5">
                {members.map(member => (
                    <div key={member.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center font-medium">
                            {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-medium truncate">{member.name}</span>
                                {member.role === "admin" && <Crown className="h-4 w-4 text-amber-400" />}
                            </div>
                            <p className="text-sm text-white/50 truncate">{member.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden md:block">
                                <p className="text-sm">{member.progress}% complete</p>
                                <p className="text-xs text-white/40">
                                    {member.lastActive ? `Active ${member.lastActive}` : 'Never active'}
                                </p>
                            </div>
                            <Badge className={roleLabels[member.role].color}>
                                {roleLabels[member.role].label}
                            </Badge>
                            {member.id !== currentUserId && (
                                <TeamMemberActions
                                    member={member}
                                    onRoleChange={onRoleChange}
                                    onRemove={onRemove}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function TeamMemberActions({
    member,
    onRoleChange,
    onRemove,
}: {
    member: TeamMember;
    onRoleChange: (id: string, role: TeamMember["role"]) => void;
    onRemove: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 hover:bg-white/10 rounded-lg"
            >
                <MoreHorizontal className="h-4 w-4" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-lg bg-black/95 border border-white/10 shadow-xl">
                        <div className="p-1">
                            <button
                                onClick={() => {
                                    onRoleChange(member.id, "admin");
                                    setOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10"
                            >
                                Make Admin
                            </button>
                            <button
                                onClick={() => {
                                    onRoleChange(member.id, "manager");
                                    setOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10"
                            >
                                Make Manager
                            </button>
                            <button
                                onClick={() => {
                                    onRoleChange(member.id, "member");
                                    setOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10"
                            >
                                Make Member
                            </button>
                            <hr className="my-1 border-white/10" />
                            <button
                                onClick={() => {
                                    onRemove(member.id);
                                    setOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-red-500/20 text-red-400"
                            >
                                Remove from team
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Invite modal
export function InviteTeamMembersModal({
    open,
    onClose,
    onInvite,
}: {
    open: boolean;
    onClose: () => void;
    onInvite: (emails: string[], role: TeamMember["role"]) => Promise<void>;
}) {
    const [emails, setEmails] = useState("");
    const [role, setRole] = useState<TeamMember["role"]>("member");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        const emailList = emails.split(/[,\n]/).map(e => e.trim()).filter(Boolean);
        if (emailList.length === 0) return;

        setIsLoading(true);
        await onInvite(emailList, role);
        setIsLoading(false);
        setEmails("");
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 bg-black/95 border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Invite Team Members</h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-white/60 mb-2">
                        Email addresses (one per line or comma-separated)
                    </label>
                    <textarea
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                        placeholder="john@company.com&#10;jane@company.com"
                        rows={4}
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none resize-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-white/60 mb-2">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as TeamMember["role"])}
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    >
                        <option value="member">Member</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Invites"}
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// Learning group card
export function LearningGroupCard({
    group,
    onJoin,
    onLeave,
}: {
    group: {
        id: string;
        name: string;
        description: string;
        memberCount: number;
        maxMembers?: number;
        isJoined: boolean;
        nextSessionAt?: string;
    };
    onJoin: (id: string) => void;
    onLeave: (id: string) => void;
}) {
    return (
        <Card className="p-4 bg-white/[0.02] border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-semibold mb-1">{group.name}</h4>
                    <p className="text-sm text-white/50 line-clamp-2">{group.description}</p>
                </div>
                {group.isJoined && (
                    <Badge className="bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3 w-3 mr-1" />
                        Joined
                    </Badge>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.memberCount}{group.maxMembers ? `/${group.maxMembers}` : ''}
                    </span>
                    {group.nextSessionAt && (
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Next: {new Date(group.nextSessionAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
                {group.isJoined ? (
                    <Button variant="outline" size="sm" onClick={() => onLeave(group.id)}>
                        Leave
                    </Button>
                ) : (
                    <Button size="sm" onClick={() => onJoin(group.id)}>
                        Join Group
                    </Button>
                )}
            </div>
        </Card>
    );
}
