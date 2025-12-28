"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Shield,
    Users,
    Lock,
    Unlock,
    Eye,
    Edit2,
    Trash2,
    Plus,
    ChevronRight,
    Settings,
    BookOpen,
    BarChart3,
    UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Permission {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}

interface Role {
    id: string;
    name: string;
    description: string;
    userCount: number;
    color: string;
    isSystem: boolean;
    permissions: Permission[];
}

const mockRoles: Role[] = [
    {
        id: "admin",
        name: "Administrator",
        description: "Full access to all features and settings",
        userCount: 3,
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        isSystem: true,
        permissions: [
            { id: "1", name: "Manage Users", description: "Add, edit, and remove users", enabled: true },
            { id: "2", name: "Manage Roles", description: "Create and modify roles", enabled: true },
            { id: "3", name: "View Analytics", description: "Access analytics dashboard", enabled: true },
            { id: "4", name: "Manage Content", description: "Create and edit training content", enabled: true },
            { id: "5", name: "Manage Assignments", description: "Assign training to users", enabled: true },
            { id: "6", name: "Export Data", description: "Export reports and data", enabled: true },
        ],
    },
    {
        id: "manager",
        name: "Manager",
        description: "Manage team training and view reports",
        userCount: 12,
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        isSystem: true,
        permissions: [
            { id: "1", name: "Manage Users", description: "Add, edit, and remove users", enabled: false },
            { id: "2", name: "Manage Roles", description: "Create and modify roles", enabled: false },
            { id: "3", name: "View Analytics", description: "Access analytics dashboard", enabled: true },
            { id: "4", name: "Manage Content", description: "Create and edit training content", enabled: false },
            { id: "5", name: "Manage Assignments", description: "Assign training to users", enabled: true },
            { id: "6", name: "Export Data", description: "Export reports and data", enabled: true },
        ],
    },
    {
        id: "learner",
        name: "Learner",
        description: "Access assigned training courses",
        userCount: 245,
        color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
        isSystem: true,
        permissions: [
            { id: "1", name: "Manage Users", description: "Add, edit, and remove users", enabled: false },
            { id: "2", name: "Manage Roles", description: "Create and modify roles", enabled: false },
            { id: "3", name: "View Analytics", description: "Access analytics dashboard", enabled: false },
            { id: "4", name: "Manage Content", description: "Create and edit training content", enabled: false },
            { id: "5", name: "Manage Assignments", description: "Assign training to users", enabled: false },
            { id: "6", name: "Export Data", description: "Export reports and data", enabled: false },
        ],
    },
    {
        id: "content-creator",
        name: "Content Creator",
        description: "Create and manage training content",
        userCount: 8,
        color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        isSystem: false,
        permissions: [
            { id: "1", name: "Manage Users", description: "Add, edit, and remove users", enabled: false },
            { id: "2", name: "Manage Roles", description: "Create and modify roles", enabled: false },
            { id: "3", name: "View Analytics", description: "Access analytics dashboard", enabled: true },
            { id: "4", name: "Manage Content", description: "Create and edit training content", enabled: true },
            { id: "5", name: "Manage Assignments", description: "Assign training to users", enabled: false },
            { id: "6", name: "Export Data", description: "Export reports and data", enabled: false },
        ],
    },
];

export function RoleManagement() {
    const [roles, setRoles] = useState(mockRoles);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Role Management
                    </h2>
                    <p className="text-sm text-muted-foreground">Configure access levels and permissions</p>
                </div>
                <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Create Role
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Roles List */}
                <div className="lg:col-span-1 space-y-3">
                    {roles.map((role) => (
                        <Card
                            key={role.id}
                            className={cn(
                                "p-4 cursor-pointer transition-all",
                                selectedRole?.id === role.id
                                    ? "border-primary bg-primary/5"
                                    : "hover:border-primary/30"
                            )}
                            onClick={() => setSelectedRole(role)}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className={cn("text-xs", role.color)}>
                                            {role.name}
                                        </Badge>
                                        {role.isSystem && (
                                            <Badge variant="outline" className="text-xs bg-muted">
                                                System
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {role.userCount} users
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Role Details */}
                <Card className="lg:col-span-2 p-6">
                    {selectedRole ? (
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Badge variant="outline" className={cn(selectedRole.color)}>
                                            {selectedRole.name}
                                        </Badge>
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedRole.description}</p>
                                </div>
                                {!selectedRole.isSystem && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Edit2 className="h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">Permissions</h4>
                                <div className="space-y-3">
                                    {selectedRole.permissions.map((perm) => (
                                        <div
                                            key={perm.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                {perm.enabled ? (
                                                    <Unlock className="h-4 w-4 text-emerald-500" />
                                                ) : (
                                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-sm">{perm.name}</div>
                                                    <div className="text-xs text-muted-foreground">{perm.description}</div>
                                                </div>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-xs",
                                                    perm.enabled
                                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                        : "bg-muted text-muted-foreground"
                                                )}
                                            >
                                                {perm.enabled ? "Enabled" : "Disabled"}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <UserCog className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <h3 className="font-medium mb-1">Select a Role</h3>
                            <p className="text-sm text-muted-foreground">Choose a role to view and edit permissions</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
