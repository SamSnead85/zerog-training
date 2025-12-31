"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Plus,
    Search,
    Mail,
    Shield,
    Award,
    GraduationCap,
    CheckCircle2,
    Copy,
    Loader2,
    Trash2,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    AuthProvider,
    useAuth,
    provisionUser,
    getProvisionedUsers,
    ProvisionedUser,
    UserRole
} from "@/lib/auth/AuthContext";
import { AdminRouteGuard } from "@/components/auth/RouteGuard";

// =============================================================================
// CERTIFICATION PATHS
// =============================================================================

const certificationPaths = [
    { id: "ai-foundations", name: "AI-Native Foundations", duration: "8 hours" },
    { id: "transformation-leader", name: "AI Transformation Leader", duration: "16 hours" },
    { id: "prompt-engineering", name: "Prompt Engineering Professional", duration: "12 hours" },
    { id: "enterprise-adoption", name: "Enterprise AI Adoption Specialist", duration: "24 hours" },
    { id: "healthcare-ai", name: "Healthcare AI Compliance", duration: "20 hours" },
    { id: "financial-ai", name: "Financial Services AI", duration: "18 hours" },
];

const roles: { value: UserRole; label: string; description: string }[] = [
    { value: "LEARNER", label: "Learner", description: "Can complete assigned training" },
    { value: "MANAGER", label: "Manager", description: "Can view team progress and assign training" },
    { value: "CREATOR", label: "Creator", description: "Can create and manage training content" },
    { value: "ORG_ADMIN", label: "Org Admin", description: "Full organization management access" },
];

// =============================================================================
// USER MANAGEMENT CONTENT
// =============================================================================

function UserManagementContent() {
    const { user, hasRole } = useAuth();
    const [users, setUsers] = useState<ProvisionedUser[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Load provisioned users
    useEffect(() => {
        setUsers(getProvisionedUsers());
    }, []);

    const handleUserProvisioned = (newUser: ProvisionedUser) => {
        setUsers(prev => [...prev, newUser]);
        setIsModalOpen(false);
    };

    const copyCredentials = async (user: ProvisionedUser) => {
        const text = `Email: ${user.email}\nPassword: ${user.temporaryPassword}`;
        await navigator.clipboard.writeText(text);
        setCopiedId(user.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Provision new users and manage training enrollments
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add User
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                            <GraduationCap className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Learners</p>
                            <p className="text-2xl font-bold">
                                {users.filter(u => u.role === "LEARNER").length}
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
                                {users.filter(u => u.role === "MANAGER").length}
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
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Certification Path</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden sm:table-cell">Created</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                                    {searchQuery ? "No users found matching your search" : "No users provisioned yet. Click \"Add User\" to get started."}
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-sm font-medium text-primary">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                            user.role === "MANAGER" && "bg-blue-500/10 text-blue-500",
                                            user.role === "LEARNER" && "bg-emerald-500/10 text-emerald-500",
                                            user.role === "CREATOR" && "bg-purple-500/10 text-purple-500",
                                            user.role === "ORG_ADMIN" && "bg-amber-500/10 text-amber-500",
                                        )}>
                                            {user.role.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="text-sm text-muted-foreground">
                                            {user.certificationPath || "—"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden sm:table-cell">
                                        <span className="text-sm text-muted-foreground">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => copyCredentials(user)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                                            title="Copy credentials"
                                        >
                                            {copiedId === user.id ? (
                                                <>
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3.5 w-3.5" />
                                                    Copy Creds
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserProvisioned={handleUserProvisioned}
            />
        </div>
    );
}

// =============================================================================
// ADD USER MODAL
// =============================================================================

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserProvisioned: (user: ProvisionedUser) => void;
}

function AddUserModal({ isOpen, onClose, onUserProvisioned }: AddUserModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "LEARNER" as UserRole,
        certificationPath: "",
        department: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.email) {
            setError("Name and email are required");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API delay
            await new Promise(r => setTimeout(r, 500));

            const newUser = provisionUser({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                certificationPath: formData.certificationPath || undefined,
                department: formData.department || undefined,
            });

            onUserProvisioned(newUser);

            // Reset form
            setFormData({
                name: "",
                email: "",
                role: "LEARNER",
                certificationPath: "",
                department: "",
            });
        } catch (err) {
            setError("Failed to provision user. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
                    >
                        <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-semibold">Provision New User</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Create a new user account and assign training
                                </p>
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
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Smith"
                                            className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@company.com"
                                            className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {roles.map((role) => (
                                            <button
                                                key={role.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, role: role.value })}
                                                className={cn(
                                                    "p-3 rounded-lg border text-left transition-all",
                                                    formData.role === role.value
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <p className="font-medium text-sm">{role.label}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{role.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Certification Path</label>
                                    <select
                                        value={formData.certificationPath}
                                        onChange={(e) => setFormData({ ...formData, certificationPath: e.target.value })}
                                        className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="">Select a certification path (optional)</option>
                                        {certificationPaths.map((path) => (
                                            <option key={path.id} value={path.name}>
                                                {path.name} ({path.duration})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Department</label>
                                    <input
                                        type="text"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        placeholder="e.g., Engineering, Sales, Operations"
                                        className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Provisioning...
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="h-4 w-4" />
                                                Create & Send Invite
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-muted-foreground text-center pt-2">
                                    The user will receive an email with their login credentials.
                                    Check the browser console for the provisioning email content.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// =============================================================================
// MAIN PAGE EXPORT
// =============================================================================

export default function AdminUsersPage() {
    return (
        <AuthProvider>
            <AdminRouteGuard>
                <UserManagementContent />
            </AdminRouteGuard>
        </AuthProvider>
    );
}
