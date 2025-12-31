"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import { OrganizationManagement } from "@/components/admin/OrganizationManagement";
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
    BarChart3,
    Target,
    Zap,
    GraduationCap,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Filter,
    RefreshCw,
    Building2,
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
    avatar?: string;
}

interface Course {
    id: string;
    title: string;
    status: "published" | "draft" | "archived";
    enrollments: number;
    completions: number;
    rating: number;
    lastUpdated: string;
    category: string;
}

interface ComplianceItem {
    id: string;
    name: string;
    dueDate: string;
    completionRate: number;
    required: number;
    completed: number;
    status: "on-track" | "at-risk" | "overdue";
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
    { id: "1", title: "SAFe Scrum Master Certification", status: "published", enrollments: 124, completions: 98, rating: 4.8, lastUpdated: "2 days ago", category: "Agile" },
    { id: "2", title: "Leadership Fundamentals", status: "published", enrollments: 89, completions: 67, rating: 4.6, lastUpdated: "1 week ago", category: "Leadership" },
    { id: "3", title: "Advanced Data Analytics", status: "draft", enrollments: 0, completions: 0, rating: 0, lastUpdated: "3 hours ago", category: "AI & Tech" },
    { id: "4", title: "HIPAA Compliance 2024", status: "published", enrollments: 156, completions: 142, rating: 4.9, lastUpdated: "1 month ago", category: "Compliance" },
    { id: "5", title: "Cybersecurity Awareness", status: "published", enrollments: 203, completions: 189, rating: 4.7, lastUpdated: "5 days ago", category: "Security" },
];

const complianceItems: ComplianceItem[] = [
    { id: "1", name: "HIPAA Annual Training", dueDate: "Jan 31, 2025", completionRate: 91, required: 156, completed: 142, status: "on-track" },
    { id: "2", name: "Security Awareness Q4", dueDate: "Dec 31, 2024", completionRate: 73, required: 156, completed: 114, status: "at-risk" },
    { id: "3", name: "Anti-Harassment Training", dueDate: "Mar 15, 2025", completionRate: 45, required: 156, completed: 70, status: "on-track" },
    { id: "4", name: "Data Privacy (GDPR)", dueDate: "Nov 30, 2024", completionRate: 32, required: 156, completed: 50, status: "overdue" },
];

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "organizations" | "users" | "courses" | "compliance" | "settings">("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
            case "published":
                return <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Active</Badge>;
            case "inactive":
            case "archived":
                return <Badge className="bg-zinc-500/15 text-zinc-400 border-zinc-500/30">Inactive</Badge>;
            case "pending":
            case "draft":
                return <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30">Pending</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-500/15 text-red-400 border-red-500/30">Admin</Badge>;
            case "manager":
                return <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30">Manager</Badge>;
            default:
                return <Badge className="bg-slate-500/15 text-slate-400 border-slate-500/30">User</Badge>;
        }
    };

    const getComplianceStatusColor = (status: string) => {
        switch (status) {
            case "on-track":
                return { bg: "bg-emerald-500/15", border: "border-emerald-500/30", text: "text-emerald-400", icon: CheckCircle2 };
            case "at-risk":
                return { bg: "bg-amber-500/15", border: "border-amber-500/30", text: "text-amber-400", icon: AlertTriangle };
            case "overdue":
                return { bg: "bg-red-500/15", border: "border-red-500/30", text: "text-red-400", icon: AlertTriangle };
            default:
                return { bg: "bg-slate-500/15", border: "border-slate-500/30", text: "text-slate-400", icon: Clock };
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage users, courses, compliance, and platform settings
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>
                    <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                    <Button className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600">
                        <Plus className="h-4 w-4" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
                {(["overview", "organizations", "users", "courses", "compliance", "settings"] as const).map((tab) => (
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

            {/* Overview Tab */}
            {activeTab === "overview" && (
                <div className="space-y-8">
                    {/* Key Metrics */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Users */}
                        <Card className="p-6 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent border-blue-500/20 hover:border-blue-500/40 transition-all">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-blue-300/80 font-medium">Total Users</p>
                                    <p className="text-4xl font-bold text-white mt-2">156</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                                        <span className="text-sm text-emerald-400">+12</span>
                                        <span className="text-xs text-muted-foreground">this month</span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/20">
                                    <Users className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>
                        </Card>

                        {/* Active Courses */}
                        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-emerald-300/80 font-medium">Active Courses</p>
                                    <p className="text-4xl font-bold text-white mt-2">24</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="text-sm text-amber-400">3 in review</span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-emerald-500/20">
                                    <BookOpen className="h-6 w-6 text-emerald-400" />
                                </div>
                            </div>
                        </Card>

                        {/* Certificates Issued */}
                        <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent border-purple-500/20 hover:border-purple-500/40 transition-all">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-purple-300/80 font-medium">Certificates Issued</p>
                                    <p className="text-4xl font-bold text-white mt-2">312</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                                        <span className="text-sm text-emerald-400">+45</span>
                                        <span className="text-xs text-muted-foreground">this month</span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-purple-500/20">
                                    <Award className="h-6 w-6 text-purple-400" />
                                </div>
                            </div>
                        </Card>

                        {/* Avg Completion Rate */}
                        <Card className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border-amber-500/20 hover:border-amber-500/40 transition-all">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-amber-300/80 font-medium">Completion Rate</p>
                                    <p className="text-4xl font-bold text-white mt-2">78%</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                                        <span className="text-sm text-emerald-400">+5%</span>
                                        <span className="text-xs text-muted-foreground">vs last month</span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/20">
                                    <TrendingUp className="h-6 w-6 text-amber-400" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Compliance Overview + Quick Actions */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Compliance Status */}
                        <Card className="lg:col-span-2 p-6 bg-white/[0.02] border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Compliance Status</h3>
                                    <p className="text-sm text-muted-foreground">Track mandatory training deadlines</p>
                                </div>
                                <Button variant="outline" size="sm" className="gap-2 border-white/10">
                                    <Eye className="h-4 w-4" />
                                    View All
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {complianceItems.map((item) => {
                                    const statusStyle = getComplianceStatusColor(item.status);
                                    const StatusIcon = statusStyle.icon;
                                    return (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "p-4 rounded-xl border transition-all hover:border-white/20",
                                                statusStyle.bg,
                                                statusStyle.border
                                            )}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <StatusIcon className={cn("h-5 w-5", statusStyle.text)} />
                                                    <div>
                                                        <p className="font-medium text-white">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={cn("text-2xl font-bold", statusStyle.text)}>{item.completionRate}%</p>
                                                    <p className="text-xs text-muted-foreground">{item.completed}/{item.required} employees</p>
                                                </div>
                                            </div>
                                            <Progress value={item.completionRate} className="h-2" />
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <Card className="p-5 bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-white/10 hover:border-white/20 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-slate-600/30 group-hover:bg-slate-600/50 transition-colors">
                                        <Upload className="h-6 w-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Bulk Import Users</h4>
                                        <p className="text-sm text-muted-foreground">Upload CSV file</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-5 bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-white/10 hover:border-white/20 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-slate-600/30 group-hover:bg-slate-600/50 transition-colors">
                                        <BookOpen className="h-6 w-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Create Course</h4>
                                        <p className="text-sm text-muted-foreground">Build new training</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-5 bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-white/10 hover:border-white/20 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-slate-600/30 group-hover:bg-slate-600/50 transition-colors">
                                        <BarChart3 className="h-6 w-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Generate Report</h4>
                                        <p className="text-sm text-muted-foreground">Compliance analytics</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-5 bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-white/10 hover:border-white/20 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-slate-600/30 group-hover:bg-slate-600/50 transition-colors">
                                        <Target className="h-6 w-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Assign Training</h4>
                                        <p className="text-sm text-muted-foreground">Push to teams</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Alerts & Recent Activity */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Pending Actions */}
                        <Card className="p-6 bg-white/[0.02] border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Pending Actions</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white">5 users pending approval</p>
                                        <p className="text-sm text-muted-foreground truncate">Review and approve new registrations</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                                        Review
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <Clock className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white">3 courses need review</p>
                                        <p className="text-sm text-muted-foreground truncate">Draft courses awaiting publication</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                                        Review
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white">GDPR training overdue</p>
                                        <p className="text-sm text-muted-foreground truncate">68% of employees haven't completed</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                        Send Reminder
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Top Performers */}
                        <Card className="p-6 bg-white/[0.02] border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Top Performers This Month</h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Sarah Chen", dept: "Engineering", courses: 5, xp: 2400 },
                                    { name: "David Kim", dept: "IT", courses: 4, xp: 2100 },
                                    { name: "Marcus Johnson", dept: "Product", courses: 3, xp: 1800 },
                                    { name: "Amy Park", dept: "Design", courses: 3, xp: 1650 },
                                ].map((performer, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                            i === 0 ? "bg-amber-500/20 text-amber-400" :
                                                i === 1 ? "bg-slate-400/20 text-slate-300" :
                                                    i === 2 ? "bg-orange-600/20 text-orange-400" :
                                                        "bg-slate-600/20 text-slate-400"
                                        )}>
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-white">{performer.name}</p>
                                            <p className="text-sm text-muted-foreground">{performer.dept}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-white">{performer.courses} courses</p>
                                            <p className="text-sm text-emerald-400">{performer.xp.toLocaleString()} XP</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {/* Organizations Tab (SUPER_ADMIN only) */}
            {activeTab === "organizations" && <OrganizationManagement />}

            {/* Users Tab */}
            {activeTab === "users" && (
                <div className="space-y-6">
                    {/* Search & Actions */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users by name, email, or department..."
                                className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                            />
                        </div>
                        <Button variant="outline" className="gap-2 border-white/10">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        {selectedUsers.length > 0 && (
                            <Button variant="outline" className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4" />
                                Delete ({selectedUsers.length})
                            </Button>
                        )}
                    </div>

                    {/* Users Table */}
                    <Card className="overflow-hidden bg-white/[0.02] border-white/10">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.02]">
                                        <th className="p-4 text-left">
                                            <input type="checkbox" className="rounded border-white/20" />
                                        </th>
                                        <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">User</th>
                                        <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                                        <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Department</th>
                                        <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                        <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Courses</th>
                                        <th className="p-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">Last Active</th>
                                        <th className="p-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded border-white/20" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-semibold text-white">
                                                        {user.name.split(" ").map((n) => n[0]).join("")}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">{getRoleBadge(user.role)}</td>
                                            <td className="p-4 text-sm text-muted-foreground">{user.department}</td>
                                            <td className="p-4">{getStatusBadge(user.status)}</td>
                                            <td className="p-4">
                                                <span className="font-medium text-white">{user.coursesCompleted}</span>
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                                            <td className="p-4">
                                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
                <div className="space-y-6">
                    <div className="flex justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                            />
                        </div>
                        <Button className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700">
                            <Plus className="h-4 w-4" />
                            Create Course
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {courses.map((course) => (
                            <Card key={course.id} className="p-5 bg-white/[0.02] border-white/10 hover:border-white/20 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-white text-lg">{course.title}</h3>
                                            {getStatusBadge(course.status)}
                                            <Badge variant="outline" className="border-white/10 text-muted-foreground">{course.category}</Badge>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4" />
                                                {course.enrollments} enrolled
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <CheckCircle2 className="h-4 w-4" />
                                                {course.completions} completed
                                            </span>
                                            {course.rating > 0 && (
                                                <span className="flex items-center gap-1.5 text-amber-400">
                                                    ★ {course.rating}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                Updated {course.lastUpdated}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="hover:bg-red-500/10 text-red-400">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Compliance Tab */}
            {activeTab === "compliance" && (
                <div className="space-y-6">
                    {/* Compliance Summary Cards */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="p-5 bg-emerald-500/10 border-emerald-500/20">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                <div>
                                    <p className="text-2xl font-bold text-white">2</p>
                                    <p className="text-sm text-emerald-300/80">On Track</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-5 bg-amber-500/10 border-amber-500/20">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-5 w-5 text-amber-400" />
                                <div>
                                    <p className="text-2xl font-bold text-white">1</p>
                                    <p className="text-sm text-amber-300/80">At Risk</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-5 bg-red-500/10 border-red-500/20">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                                <div>
                                    <p className="text-2xl font-bold text-white">1</p>
                                    <p className="text-sm text-red-300/80">Overdue</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-5 bg-blue-500/10 border-blue-500/20">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="h-5 w-5 text-blue-400" />
                                <div>
                                    <p className="text-2xl font-bold text-white">376</p>
                                    <p className="text-sm text-blue-300/80">Completions</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Compliance Items */}
                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-6">All Compliance Requirements</h3>
                        <div className="space-y-4">
                            {complianceItems.map((item) => {
                                const statusStyle = getComplianceStatusColor(item.status);
                                const StatusIcon = statusStyle.icon;
                                return (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "p-5 rounded-xl border transition-all hover:border-white/20",
                                            statusStyle.bg,
                                            statusStyle.border
                                        )}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <StatusIcon className={cn("h-6 w-6", statusStyle.text)} />
                                                <div>
                                                    <p className="font-semibold text-white text-lg">{item.name}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                                            <Calendar className="h-4 w-4" />
                                                            Due: {item.dueDate}
                                                        </span>
                                                        <Badge className={cn(statusStyle.bg, statusStyle.text, statusStyle.border, "capitalize")}>
                                                            {item.status.replace("-", " ")}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={cn("text-3xl font-bold", statusStyle.text)}>{item.completionRate}%</p>
                                                <p className="text-sm text-muted-foreground">{item.completed} of {item.required} employees</p>
                                            </div>
                                        </div>
                                        <Progress value={item.completionRate} className="h-2" />
                                        <div className="flex justify-end mt-4 gap-2">
                                            <Button size="sm" variant="outline" className="border-white/10">
                                                View Details
                                            </Button>
                                            <Button size="sm" variant="outline" className="border-white/10">
                                                Send Reminder
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-6">Platform Settings</h3>
                        <div className="space-y-6">
                            {[
                                { title: "Self-Registration", desc: "Allow users to create accounts", checked: true },
                                { title: "Require Email Verification", desc: "Verify email before access", checked: true },
                                { title: "Enable Leaderboards", desc: "Show public rankings", checked: true },
                                { title: "Auto-Assign Compliance Training", desc: "New users get required training", checked: false },
                            ].map((setting, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                    <div>
                                        <p className="font-medium text-white">{setting.title}</p>
                                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 rounded border-white/20" defaultChecked={setting.checked} />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-6">Notification Settings</h3>
                        <div className="space-y-6">
                            {[
                                { title: "Course Completion Alerts", desc: "Email when users complete courses", checked: true },
                                { title: "Compliance Deadline Reminders", desc: "Send reminders before deadlines", checked: true },
                                { title: "New User Notifications", desc: "Alert when new users register", checked: false },
                                { title: "Weekly Summary Reports", desc: "Automated weekly digest", checked: true },
                            ].map((setting, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                    <div>
                                        <p className="font-medium text-white">{setting.title}</p>
                                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 rounded border-white/20" defaultChecked={setting.checked} />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
