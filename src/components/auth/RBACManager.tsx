"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Shield,
    Users,
    Eye,
    Edit,
    Trash2,
    Plus,
    Check,
    X,
    ChevronRight,
    Settings,
    Crown,
    UserCog,
    GraduationCap,
    BarChart3,
    FileText,
    Lock,
    Unlock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Permission {
    id: string;
    name: string;
    description: string;
    category: "content" | "users" | "analytics" | "settings";
}

interface Role {
    id: string;
    name: string;
    description: string;
    color: string;
    userCount: number;
    permissions: string[];
    isSystem: boolean;
}

const allPermissions: Permission[] = [
    // Content
    { id: "content.view", name: "View Content", description: "Access training modules", category: "content" },
    { id: "content.create", name: "Create Content", description: "Create new modules", category: "content" },
    { id: "content.edit", name: "Edit Content", description: "Modify existing modules", category: "content" },
    { id: "content.delete", name: "Delete Content", description: "Remove modules", category: "content" },
    { id: "content.publish", name: "Publish Content", description: "Make content live", category: "content" },
    // Users
    { id: "users.view", name: "View Users", description: "See team members", category: "users" },
    { id: "users.invite", name: "Invite Users", description: "Add new members", category: "users" },
    { id: "users.edit", name: "Edit Users", description: "Modify user details", category: "users" },
    { id: "users.delete", name: "Remove Users", description: "Remove from org", category: "users" },
    { id: "users.assign", name: "Assign Training", description: "Assign modules to users", category: "users" },
    // Analytics
    { id: "analytics.view", name: "View Analytics", description: "See dashboards", category: "analytics" },
    { id: "analytics.export", name: "Export Reports", description: "Download data", category: "analytics" },
    { id: "analytics.team", name: "Team Analytics", description: "View team progress", category: "analytics" },
    // Settings
    { id: "settings.org", name: "Org Settings", description: "Manage organization", category: "settings" },
    { id: "settings.billing", name: "Billing", description: "Manage subscription", category: "settings" },
    { id: "settings.sso", name: "SSO Configuration", description: "Configure authentication", category: "settings" },
];

const defaultRoles: Role[] = [
    {
        id: "admin",
        name: "Admin",
        description: "Full access to all features",
        color: "purple",
        userCount: 2,
        permissions: allPermissions.map(p => p.id),
        isSystem: true,
    },
    {
        id: "manager",
        name: "Manager",
        description: "Manage team and content",
        color: "blue",
        userCount: 5,
        permissions: ["content.view", "content.create", "content.edit", "users.view", "users.invite", "users.assign", "analytics.view", "analytics.team"],
        isSystem: true,
    },
    {
        id: "creator",
        name: "Content Creator",
        description: "Create and edit training content",
        color: "emerald",
        userCount: 8,
        permissions: ["content.view", "content.create", "content.edit", "content.publish", "analytics.view"],
        isSystem: false,
    },
    {
        id: "learner",
        name: "Learner",
        description: "Access assigned training",
        color: "slate",
        userCount: 45,
        permissions: ["content.view", "analytics.view"],
        isSystem: true,
    },
];

const categoryIcons: Record<string, React.ElementType> = {
    content: FileText,
    users: Users,
    analytics: BarChart3,
    settings: Settings,
};

export function RBACManager() {
    const [roles, setRoles] = useState<Role[]>(defaultRoles);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");

    const togglePermission = (permissionId: string) => {
        if (!selectedRole) return;
        const hasPermission = selectedRole.permissions.includes(permissionId);
        const newPermissions = hasPermission
            ? selectedRole.permissions.filter(p => p !== permissionId)
            : [...selectedRole.permissions, permissionId];

        const updatedRole = { ...selectedRole, permissions: newPermissions };
        setSelectedRole(updatedRole);
        setRoles(roles.map(r => r.id === selectedRole.id ? updatedRole : r));
    };

    const createRole = () => {
        if (!newRoleName.trim()) return;
        const newRole: Role = {
            id: newRoleName.toLowerCase().replace(/\s+/g, "-"),
            name: newRoleName,
            description: "Custom role",
            color: "zinc",
            userCount: 0,
            permissions: ["content.view"],
            isSystem: false,
        };
        setRoles([...roles, newRole]);
        setNewRoleName("");
        setShowCreateModal(false);
        setSelectedRole(newRole);
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            purple: "bg-purple-500/15 text-purple-400 border-purple-500/30",
            blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
            emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
            slate: "bg-slate-500/15 text-slate-400 border-slate-500/30",
            zinc: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
        };
        return colors[color] || colors.slate;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <UserCog className="h-7 w-7 text-primary" />
                        Role-Based Access Control
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Define roles and permissions for your organization
                    </p>
                </div>
                <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Role
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Roles List */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Roles</h3>
                    {roles.map((role) => (
                        <Card
                            key={role.id}
                            className={cn(
                                "p-4 cursor-pointer transition-all duration-200 hover:border-primary/50",
                                selectedRole?.id === role.id && "border-primary bg-primary/5"
                            )}
                            onClick={() => setSelectedRole(role)}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    {role.isSystem && <Crown className="h-4 w-4 text-amber-400" />}
                                    <h4 className="font-semibold">{role.name}</h4>
                                </div>
                                <Badge className={cn("text-xs", getColorClasses(role.color))}>
                                    {role.userCount} users
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    {role.permissions.length} permissions
                                </span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Permissions Editor */}
                <div className="lg:col-span-2">
                    {selectedRole ? (
                        <Card className="p-6 bg-white/[0.02] border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        {selectedRole.name} Permissions
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                                </div>
                                {selectedRole.isSystem && (
                                    <Badge variant="outline" className="gap-1">
                                        <Lock className="h-3 w-3" />
                                        System Role
                                    </Badge>
                                )}
                            </div>

                            {/* Permission Categories */}
                            {["content", "users", "analytics", "settings"].map((category) => {
                                const Icon = categoryIcons[category];
                                const categoryPermissions = allPermissions.filter(p => p.category === category);
                                return (
                                    <div key={category} className="mb-6 last:mb-0">
                                        <h4 className="font-medium mb-3 flex items-center gap-2 capitalize">
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                            {category}
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {categoryPermissions.map((permission) => {
                                                const hasPermission = selectedRole.permissions.includes(permission.id);
                                                return (
                                                    <button
                                                        key={permission.id}
                                                        onClick={() => togglePermission(permission.id)}
                                                        className={cn(
                                                            "flex items-center justify-between p-3 rounded-xl border transition-all text-left",
                                                            hasPermission
                                                                ? "bg-emerald-500/10 border-emerald-500/30"
                                                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                                        )}
                                                    >
                                                        <div>
                                                            <p className="font-medium text-sm">{permission.name}</p>
                                                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                                                        </div>
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full flex items-center justify-center",
                                                            hasPermission ? "bg-emerald-500" : "bg-white/10"
                                                        )}>
                                                            {hasPermission && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Save Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <Button variant="outline" className="gap-2">
                                    <X className="h-4 w-4" />
                                    Reset
                                </Button>
                                <Button className="gap-2">
                                    <Check className="h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-12 bg-white/[0.02] border-white/10 flex flex-col items-center justify-center text-center">
                            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Select a Role</h3>
                            <p className="text-muted-foreground max-w-sm">
                                Choose a role from the list to view and edit its permissions
                            </p>
                        </Card>
                    )}
                </div>
            </div>

            {/* Create Role Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-card border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Create New Role</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Role Name</label>
                                <input
                                    type="text"
                                    value={newRoleName}
                                    onChange={(e) => setNewRoleName(e.target.value)}
                                    placeholder="e.g., Reviewer"
                                    className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </Button>
                                <Button className="flex-1" onClick={createRole}>
                                    Create Role
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
