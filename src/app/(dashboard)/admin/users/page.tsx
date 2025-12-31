"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Plus,
    Search,
    Mail,
    Shield,
    Edit2,
    Trash2,
    CheckCircle2,
    Loader2,
    AlertCircle,
    X,
    Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

type UserRole = "SUPER_ADMIN" | "ORG_ADMIN" | "CREATOR" | "MANAGER" | "LEARNER";

interface User {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    organizationId: string;
    organizationName?: string;
    lastLoginAt: string | null;
    createdAt: string;
}

const roles: { value: UserRole; label: string; description: string }[] = [
    { value: "LEARNER", label: "Learner", description: "Can complete assigned training" },
    { value: "MANAGER", label: "Manager", description: "Can view team progress and assign training" },
    { value: "CREATOR", label: "Creator", description: "Can create and manage training content" },
    { value: "ORG_ADMIN", label: "Org Admin", description: "Full organization management access" },
];

// =============================================================================
// USER MANAGEMENT PAGE
// =============================================================================

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch users from API
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/users");
            const data = await res.json();

            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.error || "Failed to fetch users");
            }
        } catch (err) {
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUserCreated = () => {
        fetchUsers();
        setIsAddModalOpen(false);
    };

    const handleUserUpdated = () => {
        fetchUsers();
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserDeleted = () => {
        fetchUsers();
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const filteredUsers = users.filter(
        (u) =>
            (u.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 max-w-6xl mx-auto">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="text-destructive">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage users, roles, and training access
                    </p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add User
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-bold">{users.length}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <Users className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Learners</p>
                            <p className="text-2xl font-bold">
                                {users.filter((u) => u.role === "LEARNER").length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Shield className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Managers</p>
                            <p className="text-2xl font-bold">
                                {users.filter((u) => u.role === "MANAGER").length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <Building2 className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Org Admins</p>
                            <p className="text-2xl font-bold">
                                {users.filter((u) => u.role === "ORG_ADMIN").length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Organization</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden sm:table-cell">Last Login</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                                    {searchQuery ? "No users found matching your search" : "No users yet. Click \"Add User\" to get started."}
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-sm font-medium text-primary">
                                                    {(user.name || user.email).charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{user.name || "—"}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                            user.role === "SUPER_ADMIN" && "bg-red-500/10 text-red-500",
                                            user.role === "ORG_ADMIN" && "bg-amber-500/10 text-amber-500",
                                            user.role === "MANAGER" && "bg-blue-500/10 text-blue-500",
                                            user.role === "CREATOR" && "bg-purple-500/10 text-purple-500",
                                            user.role === "LEARNER" && "bg-emerald-500/10 text-emerald-500",
                                        )}>
                                            {user.role.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="text-sm text-muted-foreground">
                                            {user.organizationName || "—"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden sm:table-cell">
                                        <span className="text-sm text-muted-foreground">
                                            {user.lastLoginAt
                                                ? new Date(user.lastLoginAt).toLocaleDateString()
                                                : "Never"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                                title="Edit user"
                                            >
                                                <Edit2 className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(user)}
                                                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                                                title="Delete user"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={handleUserCreated} />
            <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={selectedUser} onSuccess={handleUserUpdated} />
            <DeleteUserModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} user={selectedUser} onSuccess={handleUserDeleted} />
        </div>
    );
}

// =============================================================================
// ADD USER MODAL
// =============================================================================

function AddUserModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "LEARNER" as UserRole });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setFormData({ name: "", email: "", password: "", role: "LEARNER" });
                onSuccess();
            } else {
                setError(data.error || "Failed to create user");
            }
        } catch (err) {
            setError("Failed to create user");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4">
                <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Add New User</h2>
                            <p className="text-sm text-muted-foreground mt-1">Create a new user account</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name *</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email *</label>
                                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Temporary Password *</label>
                            <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Minimum 8 characters" className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <div className="grid grid-cols-2 gap-2">
                                {roles.map((role) => (
                                    <button key={role.value} type="button" onClick={() => setFormData({ ...formData, role: role.value })} className={cn("p-3 rounded-lg border text-left transition-all", formData.role === role.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                                        <p className="font-medium text-sm">{role.label}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{role.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-lg border border-border hover:bg-muted transition-colors">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><Mail className="h-4 w-4" /> Create User</>}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// =============================================================================
// EDIT USER MODAL
// =============================================================================

function EditUserModal({ isOpen, onClose, user, onSuccess }: { isOpen: boolean; onClose: () => void; user: User | null; onSuccess: () => void }) {
    const [formData, setFormData] = useState({ name: "", role: "LEARNER" as UserRole });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name || "", role: user.role });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setError(null);
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                onSuccess();
            } else {
                setError(data.error || "Failed to update user");
            }
        } catch (err) {
            setError("Failed to update user");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !user) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4">
                <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Edit User</h2>
                            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <div className="grid grid-cols-2 gap-2">
                                {roles.map((role) => (
                                    <button key={role.value} type="button" onClick={() => setFormData({ ...formData, role: role.value })} className={cn("p-3 rounded-lg border text-left transition-all", formData.role === role.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                                        <p className="font-medium text-sm">{role.label}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{role.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-lg border border-border hover:bg-muted transition-colors">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><CheckCircle2 className="h-4 w-4" /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// =============================================================================
// DELETE USER MODAL
// =============================================================================

function DeleteUserModal({ isOpen, onClose, user, onSuccess }: { isOpen: boolean; onClose: () => void; user: User | null; onSuccess: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!user) return;

        setError(null);
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                onSuccess();
            } else {
                setError(data.error || "Failed to delete user");
            }
        } catch (err) {
            setError("Failed to delete user");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !user) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4">
                <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                    <div className="p-6">
                        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-6 w-6 text-destructive" />
                        </div>
                        <h2 className="text-xl font-semibold text-center">Delete User</h2>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                            Are you sure you want to delete <strong>{user.name || user.email}</strong>? This action cannot be undone.
                        </p>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 mt-4">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-lg border border-border hover:bg-muted transition-colors">Cancel</button>
                            <button type="button" onClick={handleDelete} disabled={isSubmitting} className="flex-1 h-10 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Deleting...</> : <><Trash2 className="h-4 w-4" /> Delete User</>}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
