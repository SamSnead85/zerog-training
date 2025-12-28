"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Copy,
    Check,
    Link2,
    Mail,
    Users,
    QrCode,
    RefreshCw,
    Send,
    Clock,
    Shield,
    Trash2,
    X,
    UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: "admin" | "member";
    status: "active" | "pending" | "invited";
    joinedAt?: string;
    modulesAccessed: number;
}

interface InviteLink {
    id: string;
    code: string;
    url: string;
    createdAt: string;
    expiresAt: string;
    usesRemaining: number;
    maxUses: number;
}

// Generate a random invite code
function generateInviteCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Mock data
const mockTeamMembers: TeamMember[] = [
    { id: "1", name: "John Smith", email: "john@company.com", role: "admin", status: "active", joinedAt: "Dec 15, 2024", modulesAccessed: 5 },
    { id: "2", name: "Sarah Chen", email: "sarah@company.com", role: "member", status: "active", joinedAt: "Dec 18, 2024", modulesAccessed: 3 },
    { id: "3", name: "Mike Johnson", email: "mike@company.com", role: "member", status: "pending", modulesAccessed: 0 },
];

export function TeamInvite() {
    const [activeTab, setActiveTab] = useState<"members" | "invites">("members");
    const [inviteLink, setInviteLink] = useState<InviteLink | null>(null);
    const [copied, setCopied] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

    const maxMembers = 10; // Pro plan limit
    const currentMembers = teamMembers.filter(m => m.status !== "pending").length;

    const generateNewLink = () => {
        const code = generateInviteCode();
        const newLink: InviteLink = {
            id: Date.now().toString(),
            code,
            url: `${window.location.origin}/join/${code}`,
            createdAt: new Date().toLocaleDateString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            usesRemaining: 5,
            maxUses: 5,
        };
        setInviteLink(newLink);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sendEmailInvite = () => {
        if (!emailInput.trim()) return;

        // Add as pending member
        const newMember: TeamMember = {
            id: Date.now().toString(),
            name: emailInput.split("@")[0],
            email: emailInput,
            role: "member",
            status: "invited",
            modulesAccessed: 0,
        };
        setTeamMembers([...teamMembers, newMember]);
        setEmailInput("");
        setShowEmailModal(false);
    };

    const removeMember = (id: string) => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Team Management</h2>
                    <p className="text-muted-foreground">
                        Invite team members to access your training modules
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="gap-2 py-1.5 px-3">
                        <Users className="h-4 w-4" />
                        {currentMembers}/{maxMembers} members
                    </Badge>
                    <Button onClick={() => setShowEmailModal(true)} className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Invite Member
                    </Button>
                </div>
            </div>

            {/* Usage Progress */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Team Capacity</span>
                    <span className="text-sm font-medium">{currentMembers} of {maxMembers} seats used</span>
                </div>
                <Progress value={(currentMembers / maxMembers) * 100} className="h-2" />
                {currentMembers >= maxMembers && (
                    <p className="text-xs text-amber-400 mt-2">
                        Team is at capacity. Upgrade to Enterprise for unlimited members.
                    </p>
                )}
            </Card>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
                {(["members", "invites"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-4 py-2 text-sm font-medium capitalize rounded-lg transition-all duration-200",
                            activeTab === tab
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Members Tab */}
            {activeTab === "members" && (
                <Card className="overflow-hidden bg-white/[0.02] border-white/10">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.02]">
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Member</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Modules</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-semibold text-white">
                                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={cn(
                                                "capitalize",
                                                member.role === "admin"
                                                    ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                                                    : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                                            )}>
                                                {member.role}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={cn(
                                                "capitalize",
                                                member.status === "active"
                                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                                    : member.status === "invited"
                                                        ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                                        : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                                            )}>
                                                {member.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground">
                                            {member.joinedAt || "—"}
                                        </td>
                                        <td className="p-4">
                                            <span className="font-medium text-white">{member.modulesAccessed}</span>
                                        </td>
                                        <td className="p-4">
                                            {member.role !== "admin" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:bg-red-500/10 text-red-400"
                                                    onClick={() => removeMember(member.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Invites Tab */}
            {activeTab === "invites" && (
                <div className="space-y-6">
                    {/* Generate Link Section */}
                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-blue-500/20">
                                <Link2 className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Invite via Link</h3>
                                <p className="text-sm text-muted-foreground">
                                    Generate a shareable link that team members can use to join your organization
                                </p>
                            </div>
                        </div>

                        {inviteLink ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                    <div className="flex-1 font-mono text-sm text-white truncate">
                                        {inviteLink.url}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(inviteLink.url)}
                                        className="gap-2 border-white/10"
                                    >
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        {copied ? "Copied!" : "Copy"}
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" />
                                            Expires: {inviteLink.expiresAt}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4" />
                                            {inviteLink.usesRemaining} uses remaining
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={generateNewLink}
                                        className="gap-2 border-white/10"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Generate New
                                    </Button>
                                </div>

                                {/* Invite Code Display */}
                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-sm text-muted-foreground mb-2">Or share this code:</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1">
                                            {inviteLink.code.split("").map((char, i) => (
                                                <div
                                                    key={i}
                                                    className="w-10 h-12 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl font-bold text-white"
                                                >
                                                    {char}
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(inviteLink.code)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Button onClick={generateNewLink} className="gap-2">
                                <Link2 className="h-4 w-4" />
                                Generate Invite Link
                            </Button>
                        )}
                    </Card>

                    {/* Direct Email Invite */}
                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-emerald-500/20">
                                <Mail className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Invite via Email</h3>
                                <p className="text-sm text-muted-foreground">
                                    Send email invitations directly to team members
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="colleague@company.com"
                                className="flex-1 h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                            />
                            <Button onClick={sendEmailInvite} className="gap-2">
                                <Send className="h-4 w-4" />
                                Send Invite
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-card border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Invite Team Member</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowEmailModal(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Enter the email address of the person you want to invite to your team.
                        </p>
                        <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="colleague@company.com"
                            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none mb-4"
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowEmailModal(false)}>
                                Cancel
                            </Button>
                            <Button className="flex-1 gap-2" onClick={sendEmailInvite}>
                                <Send className="h-4 w-4" />
                                Send Invite
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
