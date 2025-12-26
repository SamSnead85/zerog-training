"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    id: string;
    email: string;
    name: string;
    role: "admin" | "manager" | "employee" | "compliance_officer";
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
    hasRole: (role: string | string[]) => boolean;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
    department?: string;
    employeeId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const DEMO_USERS: Record<string, User & { password: string }> = {
    "admin@healthcare.org": {
        id: "usr_001",
        email: "admin@healthcare.org",
        password: "admin123",
        name: "Sarah Chen",
        role: "admin",
        department: "IT Administration",
        employeeId: "EMP001",
        hireDate: "2020-01-15",
        permissions: ["manage_users", "manage_courses", "view_reports", "manage_compliance", "manage_settings"],
    },
    "manager@healthcare.org": {
        id: "usr_002",
        email: "manager@healthcare.org",
        password: "manager123",
        name: "Marcus Johnson",
        role: "manager",
        department: "Nursing",
        employeeId: "EMP002",
        hireDate: "2019-06-01",
        permissions: ["view_team", "assign_training", "view_reports"],
    },
    "employee@healthcare.org": {
        id: "usr_003",
        email: "employee@healthcare.org",
        password: "employee123",
        name: "Emily Rodriguez",
        role: "employee",
        department: "Nursing",
        employeeId: "EMP003",
        hireDate: "2023-03-15",
        permissions: ["view_training", "complete_training"],
    },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const savedUser = localStorage.getItem("zerog_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem("zerog_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((r) => setTimeout(r, 800));

            const demoUser = DEMO_USERS[email.toLowerCase()];
            if (demoUser && demoUser.password === password) {
                const { password: _, ...userData } = demoUser;
                setUser(userData);
                localStorage.setItem("zerog_user", JSON.stringify(userData));
                localStorage.setItem("zerog_session", Date.now().toString());
                return { success: true };
            }

            return { success: false, error: "Invalid email or password" };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("zerog_user");
        localStorage.removeItem("zerog_session");
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 800));

            // In production, this would call the API
            const newUser: User = {
                id: `usr_${Date.now()}`,
                email: data.email,
                name: data.name,
                role: "employee",
                department: data.department || "General",
                employeeId: data.employeeId || `EMP${Date.now()}`,
                hireDate: new Date().toISOString().split("T")[0],
                permissions: ["view_training", "complete_training"],
            };

            setUser(newUser);
            localStorage.setItem("zerog_user", JSON.stringify(newUser));
            return { success: true };
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        await new Promise((r) => setTimeout(r, 800));
        // In production, this would send a reset email
        return { success: true };
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return { success: false, error: "Not authenticated" };

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem("zerog_user", JSON.stringify(updatedUser));
        return { success: true };
    };

    const hasPermission = (permission: string) => {
        return user?.permissions.includes(permission) || user?.role === "admin";
    };

    const hasRole = (role: string | string[]) => {
        if (!user) return false;
        const roles = Array.isArray(role) ? role : [role];
        return roles.includes(user.role);
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

// Protected route wrapper
export function RequireAuth({
    children,
    roles,
    permissions,
    fallback,
}: {
    children: ReactNode;
    roles?: string[];
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
