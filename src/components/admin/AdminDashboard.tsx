"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    BookOpen,
    Award,
    TrendingUp,
    Settings,
    Plus,
    Search,
    MoreHorizontal,
    Edit3,
    Trash2,
    Eye,
    Download,
    Upload,
    Shield,
    AlertTriangle,
    CheckCircle2,
    Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "user";
    department: string;
    status: "active" | "inactive" | "pending";
    coursesCompleted: number;
    lastActive: string;
}

interface Course {
    id: string;
    title: string;
    status: "published" | "draft" | "archived";
    enrollments: number;
    completions: number;
    rating: number;
    lastUpdated: string;
}

// Mock data
const users: User[] = [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com", role: "user", department: "Engineering", status: "active", coursesCompleted: 12, lastActive: "Today" },
    { id: "2", name: "Marcus Johnson", email: "marcus@company.com", role: "manager", department: "Product", status: "active", coursesCompleted: 8, lastActive: "Yesterday" },
    { id: "3", name: "Emily Rodriguez", email: "emily@company.com", role: "user", department: "Design", status: "pending", coursesCompleted: 0, lastActive: "Never" },
    { id: "4", name: "David Kim", email: "david@company.com", role: "admin", department: "IT", status: "active", coursesCompleted: 15, lastActive: "Today" },
    { id: "5", name: "Lisa Wang", email: "lisa@company.com", role: "user", department: "Marketing", status: "inactive", coursesCompleted: 5, lastActive: "2 weeks ago" },
];

const courses: Course[] = [
    { id: "1", title: "SAFe Scrum Master Certification", status: "published", enrollments: 124, completions: 98, rating: 4.8, lastUpdated: "2 days ago" },
    { id: "2", title: "Leadership Fundamentals", status: "published", enrollments: 89, completions: 67, rating: 4.6, lastUpdated: "1 week ago" },
    { id: "3", title: "Advanced Data Analytics", status: "draft", enrollments: 0, completions: 0, rating: 0, lastUpdated: "3 hours ago" },
    { id: "4", title: "HIPAA Compliance 2024", status: "published", enrollments: 156, completions: 142, rating: 4.9, lastUpdated: "1 month ago" },
];

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "users" | "courses" | "settings">("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const stats = [
        { label: "Total Users", value: "156", change: "+12 this month", icon: Users, color: "text-blue-500" },
        { label: "Active Courses", value: "24", change: "3 in review", icon: BookOpen, color: "text-emerald-500" },
        { label: "Certificates Issued", value: "312", change: "+45 this month", icon: Award, color: "text-purple-500" },
        { label: "Completion Rate", value: "78%", change: "+5% vs last month", icon: TrendingUp, color: "text-amber-500" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
            case "published":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Active</Badge>;
            case "inactive":
            case "archived":
                return <Badge className="bg-zinc-500/10 text-zinc-500">Inactive</Badge>;
            case "pending":
            case "draft":
                return <Badge className="bg-amber-500/10 text-amber-500">Pending</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-500/10 text-red-500">Admin</Badge>;
            case "manager":
                return <Badge className="bg-blue-500/10 text-blue-500">Manager</Badge>;
            default:
                return <Badge variant="outline">User</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage users, courses, and platform settings</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-border">
                {(["overview", "users", "courses", "settings"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors",
                            activeTab === tab
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={i} className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("p-3 rounded-xl bg-primary/10", stat.color)}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-6 hover:border-primary/30 transition-all cursor-pointer">
                            <Upload className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-1">Bulk Import Users</h3>
                            <p className="text-sm text-muted-foreground">Upload CSV to add multiple users</p>
                        </Card>
                        <Card className="p-6 hover:border-primary/30 transition-all cursor-pointer">
                            <BookOpen className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-1">Create Course</h3>
                            <p className="text-sm text-muted-foreground">Build new training content</p>
                        </Card>
                        <Card className="p-6 hover:border-primary/30 transition-all cursor-pointer">
                            <Shield className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-1">Compliance Report</h3>
                            <p className="text-sm text-muted-foreground">Generate compliance status</p>
                        </Card>
                    </div>

                    {/* Alerts */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Pending Actions</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">5 users pending approval</p>
                                    <p className="text-xs text-muted-foreground">Review and approve new registrations</p>
                                </div>
                                <Button size="sm" variant="outline">Review</Button>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                                <Clock className="h-5 w-5 text-blue-500" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">3 courses need review</p>
                                    <p className="text-xs text-muted-foreground">Draft courses awaiting publication</p>
                                </div>
                                <Button size="sm" variant="outline">Review</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
                <div className="space-y-4">
                    {/* Search & Actions */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        {selectedUsers.length > 0 && (
                            <Button variant="outline" className="gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete ({selectedUsers.length})
                            </Button>
                        )}
                    </div>

                    {/* Users Table */}
                    <Card className="overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="p-4 text-left">
                                        <input type="checkbox" className="rounded" />
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">User</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Department</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Courses</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-border hover:bg-white/[0.02]">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-xs font-medium">
                                                    {user.name.split(" ").map((n) => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">{getRoleBadge(user.role)}</td>
                                        <td className="p-4 text-sm text-muted-foreground">{user.department}</td>
                                        <td className="p-4">{getStatusBadge(user.status)}</td>
                                        <td className="p-4 text-sm">{user.coursesCompleted}</td>
                                        <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                                        <td className="p-4">
                                            <button className="p-1 hover:bg-muted rounded">
                                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Course
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {courses.map((course) => (
                            <Card key={course.id} className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium">{course.title}</h3>
                                            {getStatusBadge(course.status)}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{course.enrollments} enrolled</span>
                                            <span>{course.completions} completed</span>
                                            {course.rating > 0 && <span>★ {course.rating}</span>}
                                            <span>Updated {course.lastUpdated}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
                <Card className="p-6">
                    <h3 className="font-semibold mb-6">Platform Settings</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Self-Registration</p>
                                <p className="text-sm text-muted-foreground">Allow users to create accounts</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Require Email Verification</p>
                                <p className="text-sm text-muted-foreground">Verify email before access</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Enable Leaderboards</p>
                                <p className="text-sm text-muted-foreground">Show public rankings</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
