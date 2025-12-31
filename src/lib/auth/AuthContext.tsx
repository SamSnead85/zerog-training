"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

// User roles matching Prisma schema
export type UserRole = "SUPER_ADMIN" | "ORG_ADMIN" | "CREATOR" | "MANAGER" | "LEARNER";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    organizationId: string;
    organizationName: string;
    department: string;
    employeeId: string;
    hireDate: string;
    avatar?: string;
    permissions: string[];
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
    resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
    updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
    hasPermission: (permission: string) => boolean;
    hasRole: (role: UserRole | UserRole[]) => boolean;
    isSuperAdmin: () => boolean;
    isOrgAdmin: () => boolean;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
    department?: string;
    employeeId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// AUTH PROVIDER - Production-Ready (No Demo Fallbacks)
// =============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session via API
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/session');
                const data = await response.json();

                if (data.user) {
                    // Map DB user to our User type
                    const userData: User = {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.name || data.user.email,
                        role: data.user.role,
                        organizationId: data.user.organizationId || 'default',
                        organizationName: data.user.organizationName || 'ScaledNative',
                        department: data.user.department || 'General',
                        employeeId: data.user.employeeId || data.user.id,
                        hireDate: data.user.hireDate || new Date().toISOString().split('T')[0],
                        permissions: getRolePermissions(data.user.role),
                    };
                    setUser(userData);
                    // Cache user data for faster UI loading (session cookie is authoritative)
                    localStorage.setItem("zerog_user", JSON.stringify(userData));
                } else {
                    // No valid session, clear any cached data
                    localStorage.removeItem("zerog_user");
                    localStorage.removeItem("zerog_session");
                }
            } catch (error) {
                console.error("Session check failed:", error);
                // API error - clear cached data, user must log in again
                localStorage.removeItem("zerog_user");
                localStorage.removeItem("zerog_session");
            }
            setIsLoading(false);
        };

        checkSession();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Database-only authentication - no demo fallbacks
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success && data.user) {
                const userData: User = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.name || data.user.email,
                    role: data.user.role,
                    organizationId: data.user.organizationId || 'default',
                    organizationName: data.user.organizationName || 'ScaledNative',
                    department: data.user.department || 'General',
                    employeeId: data.user.employeeId || data.user.id,
                    hireDate: data.user.hireDate || new Date().toISOString().split('T')[0],
                    permissions: getRolePermissions(data.user.role),
                };
                setUser(userData);
                // Cache for faster UI loading
                localStorage.setItem("zerog_user", JSON.stringify(userData));
                localStorage.setItem("zerog_session", Date.now().toString());
                return { success: true };
            }

            // API returned an error (invalid credentials, user not found, etc.)
            return { success: false, error: data.error || "Invalid email or password" };
        } catch (error) {
            console.error("Login error:", error);
            // Network/server error - no fallback to demo users
            return { success: false, error: "Unable to connect to server. Please check your internet connection and try again." };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error("Logout API error:", error);
        }
        setUser(null);
        localStorage.removeItem("zerog_user");
        localStorage.removeItem("zerog_session");
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        try {
            // Call the registration API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success && result.user) {
                const userData: User = {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name,
                    role: result.user.role || "LEARNER",
                    organizationId: result.user.organizationId || 'default',
                    organizationName: result.user.organizationName || 'ScaledNative',
                    department: data.department || "General",
                    employeeId: data.employeeId || result.user.id,
                    hireDate: new Date().toISOString().split("T")[0],
                    permissions: getRolePermissions(result.user.role || "LEARNER"),
                };

                setUser(userData);
                localStorage.setItem("zerog_user", JSON.stringify(userData));
                return { success: true };
            }

            return { success: false, error: result.error || "Registration failed" };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, error: "Unable to connect. Please try again." };
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            return { success: result.success, error: result.error };
        } catch (error) {
            return { success: false, error: "Unable to connect. Please try again." };
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return { success: false, error: "Not authenticated" };

        try {
            const response = await fetch('/api/auth/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.success) {
                const updatedUser = { ...user, ...data };
                setUser(updatedUser);
                localStorage.setItem("zerog_user", JSON.stringify(updatedUser));
            }

            return { success: result.success, error: result.error };
        } catch (error) {
            return { success: false, error: "Unable to connect. Please try again." };
        }
    };

    const hasPermission = (permission: string) => {
        return user?.permissions.includes(permission) || user?.role === "SUPER_ADMIN" || user?.role === "ORG_ADMIN";
    };

    const hasRole = (role: UserRole | UserRole[]) => {
        if (!user) return false;
        const roles = Array.isArray(role) ? role : [role];
        return roles.includes(user.role);
    };

    const isSuperAdmin = () => {
        return user?.role === "SUPER_ADMIN";
    };

    const isOrgAdmin = () => {
        return user?.role === "SUPER_ADMIN" || user?.role === "ORG_ADMIN";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
                register,
                resetPassword,
                updateProfile,
                hasPermission,
                hasRole,
                isSuperAdmin,
                isOrgAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

/**
 * Safe version of useAuth that returns null when outside AuthProvider
 * Use this in components that may render outside the auth context (e.g., landing page)
 */
export function useAuthSafe() {
    const context = useContext(AuthContext);
    return context || null;
}

// Protected route wrapper
export function RequireAuth({
    children,
    roles,
    permissions,
    fallback,
}: {
    children: ReactNode;
    roles?: UserRole[];
    permissions?: string[];
    fallback?: ReactNode;
}) {
    const { user, isLoading, hasRole, hasPermission } = useAuth();

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return fallback || <div>Please log in to access this page.</div>;
    }

    if (roles && !hasRole(roles)) {
        return <div>You don't have permission to access this page.</div>;
    }

    if (permissions && !permissions.every(hasPermission)) {
        return <div>You don't have the required permissions.</div>;
    }

    return <>{children}</>;
}

// =============================================================================
// USER PROVISIONING - API-Based (Production)
// =============================================================================

export interface ProvisionUserData {
    name: string;
    email: string;
    role: UserRole;
    certificationPath?: string;
    department?: string;
    managerId?: string;
    organizationId?: string;
}

export interface ProvisionedUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    certificationPath?: string;
    temporaryPassword: string;
    createdAt: string;
}

/**
 * Provision a new user via API - creates user in database
 */
export async function provisionUser(data: ProvisionUserData): Promise<ProvisionedUser> {
    const response = await fetch('/api/admin/users/provision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error || "Failed to provision user");
    }

    return result.user;
}

/**
 * Get all provisioned users from API
 */
export async function getProvisionedUsers(): Promise<ProvisionedUser[]> {
    try {
        const response = await fetch('/api/admin/users');
        const result = await response.json();
        return result.users || [];
    } catch (error) {
        console.error("Failed to get provisioned users:", error);
        return [];
    }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getRolePermissions(role: UserRole): string[] {
    switch (role) {
        case "SUPER_ADMIN":
            return ["manage_all", "manage_users", "manage_courses", "view_reports", "manage_compliance", "manage_settings", "manage_orgs"];
        case "ORG_ADMIN":
            return ["manage_users", "manage_courses", "view_reports", "manage_compliance", "manage_settings"];
        case "MANAGER":
            return ["view_team", "assign_training", "view_reports", "view_training", "complete_training"];
        case "CREATOR":
            return ["create_courses", "manage_courses", "view_training", "complete_training"];
        case "LEARNER":
        default:
            return ["view_training", "complete_training"];
    }
}
