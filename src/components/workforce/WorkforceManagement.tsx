"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    Building2,
    Upload,
    Download,
    Search,
    Filter,
    Plus,
    CheckCircle2,
    Clock,
    AlertTriangle,
    ChevronRight,
    ChevronDown,
    Mail,
    MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Department {
    id: string;
    name: string;
    headCount: number;
    complianceRate: number;
    manager: string;
    children?: Department[];
}

interface Employee {
    id: string;
    name: string;
    email: string;
    employeeId: string;
    department: string;
    role: string;
    hireDate: string;
    status: "active" | "inactive" | "on_leave";
    trainingStatus: "up_to_date" | "overdue" | "pending";
    completedCourses: number;
    assignedCourses: number;
}

const departments: Department[] = [
    {
        id: "1",
        name: "Clinical Operations",
        headCount: 450,
        complianceRate: 92,
        manager: "Dr. Sarah Chen",
        children: [
            { id: "1a", name: "Nursing", headCount: 280, complianceRate: 94, manager: "Lisa Wang" },
            { id: "1b", name: "Emergency", headCount: 85, complianceRate: 89, manager: "Marcus Johnson" },
            { id: "1c", name: "ICU", headCount: 85, complianceRate: 91, manager: "Emily Rodriguez" },
        ],
    },
    {
        id: "2",
        name: "Administrative",
        headCount: 200,
        complianceRate: 88,
        manager: "David Kim",
        children: [
            { id: "2a", name: "HR", headCount: 45, complianceRate: 95, manager: "Jennifer Park" },
            { id: "2b", name: "Finance", headCount: 60, complianceRate: 82, manager: "Michael Brown" },
            { id: "2c", name: "IT", headCount: 95, complianceRate: 90, manager: "Alex Turner" },
        ],
    },
    {
        id: "3",
        name: "Support Services",
        headCount: 350,
        complianceRate: 78,
        manager: "Robert Garcia",
    },
    {
        id: "4",
        name: "Medical Staff",
        headCount: 250,
        complianceRate: 96,
        manager: "Dr. James Wilson",
    },
];

const employees: Employee[] = [
    { id: "1", name: "Sarah Chen", email: "sarah.chen@hospital.org", employeeId: "EMP001", department: "Nursing", role: "Registered Nurse", hireDate: "2019-03-15", status: "active", trainingStatus: "up_to_date", completedCourses: 15, assignedCourses: 15 },
    { id: "2", name: "Marcus Johnson", email: "marcus.johnson@hospital.org", employeeId: "EMP002", department: "Emergency", role: "ER Technician", hireDate: "2020-06-01", status: "active", trainingStatus: "pending", completedCourses: 12, assignedCourses: 14 },
    { id: "3", name: "Emily Rodriguez", email: "emily.rodriguez@hospital.org", employeeId: "EMP003", department: "ICU", role: "ICU Nurse", hireDate: "2021-01-20", status: "active", trainingStatus: "overdue", completedCourses: 8, assignedCourses: 12 },
    { id: "4", name: "David Kim", email: "david.kim@hospital.org", employeeId: "EMP004", department: "IT", role: "Systems Analyst", hireDate: "2022-08-15", status: "active", trainingStatus: "up_to_date", completedCourses: 10, assignedCourses: 10 },
    { id: "5", name: "Lisa Wang", email: "lisa.wang@hospital.org", employeeId: "EMP005", department: "Nursing", role: "Nurse Manager", hireDate: "2018-11-01", status: "on_leave", trainingStatus: "up_to_date", completedCourses: 18, assignedCourses: 18 },
];

export function WorkforceManagement() {
    const [view, setView] = useState<"org" | "employees">("org");
    const [expandedDepts, setExpandedDepts] = useState<string[]>(["1", "2"]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showImportModal, setShowImportModal] = useState(false);

    const toggleDept = (id: string) => {
        setExpandedDepts((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Active</Badge>;
            case "inactive":
                return <Badge className="bg-zinc-500/10 text-zinc-500">Inactive</Badge>;
            case "on_leave":
                return <Badge className="bg-blue-500/10 text-blue-500">On Leave</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getTrainingStatusBadge = (status: string) => {
        switch (status) {
            case "up_to_date":
                return <Badge className="bg-emerald-500/10 text-emerald-500">Up to Date</Badge>;
            case "pending":
                return <Badge className="bg-amber-500/10 text-amber-500">Pending</Badge>;
            case "overdue":
                return <Badge className="bg-red-500/10 text-red-500">Overdue</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const totalEmployees = departments.reduce((sum, d) => sum + d.headCount, 0);
    const avgCompliance = Math.round(
        departments.reduce((sum, d) => sum + d.complianceRate * d.headCount, 0) / totalEmployees
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Workforce Management</h1>
                    <p className="text-muted-foreground">
                        {totalEmployees.toLocaleString()} employees • {avgCompliance}% average compliance
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2" onClick={() => setShowImportModal(true)}>
                        <Upload className="h-4 w-4" />
                        Bulk Import
                    </Button>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Employee
                    </Button>
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-4 border-b border-border">
                <button
                    onClick={() => setView("org")}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                        view === "org"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    Organization Chart
                </button>
                <button
                    onClick={() => setView("employees")}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                        view === "employees"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    All Employees
                </button>
            </div>

            {/* Org Chart View */}
            {view === "org" && (
                <div className="space-y-3">
                    {departments.map((dept) => (
                        <Card key={dept.id} className="overflow-hidden">
                            <div
                                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02]"
                                onClick={() => dept.children && toggleDept(dept.id)}
                            >
                                {dept.children ? (
                                    expandedDepts.includes(dept.id) ? (
                                        <ChevronDown className="h-5 w-5" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5" />
                                    )
                                ) : (
                                    <div className="w-5" />
                                )}
                                <Building2 className="h-5 w-5 text-primary" />
                                <div className="flex-1">
                                    <p className="font-medium">{dept.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {dept.headCount} employees • Manager: {dept.manager}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className={cn(
                                            "font-medium",
                                            dept.complianceRate >= 90 ? "text-emerald-500" :
                                                dept.complianceRate >= 75 ? "text-amber-500" : "text-red-500"
                                        )}>
                                            {dept.complianceRate}%
                                        </p>
                                        <p className="text-xs text-muted-foreground">Compliance</p>
                                    </div>
                                    <Button variant="outline" size="sm">View Team</Button>
                                </div>
                            </div>

                            {dept.children && expandedDepts.includes(dept.id) && (
                                <div className="border-t border-border">
                                    {dept.children.map((child) => (
                                        <div
                                            key={child.id}
                                            className="p-4 pl-16 flex items-center gap-4 border-b border-border last:border-0 hover:bg-white/[0.02]"
                                        >
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{child.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {child.headCount} employees • {child.manager}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Progress value={child.complianceRate} className="w-24 h-2" />
                                                <span className="text-sm w-12">{child.complianceRate}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            {/* Employees View */}
            {view === "employees" && (
                <div className="space-y-4">
                    {/* Search */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search employees..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </div>

                    {/* Employee Table */}
                    <Card className="overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Employee</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Department</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Training</th>
                                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Progress</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="border-b border-border hover:bg-white/[0.02]">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-xs font-medium">
                                                    {emp.name.split(" ").map((n) => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{emp.name}</p>
                                                    <p className="text-xs text-muted-foreground">{emp.employeeId} • {emp.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm">{emp.department}</td>
                                        <td className="p-4">{getStatusBadge(emp.status)}</td>
                                        <td className="p-4">{getTrainingStatusBadge(emp.trainingStatus)}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Progress
                                                    value={(emp.completedCourses / emp.assignedCourses) * 100}
                                                    className="w-20 h-2"
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {emp.completedCourses}/{emp.assignedCourses}
                                                </span>
                                            </div>
                                        </td>
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

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Bulk Import Employees</h2>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                <p className="font-medium mb-1">Drop your CSV file here</p>
                                <p className="text-sm text-muted-foreground mb-3">
                                    or click to browse
                                </p>
                                <Button variant="outline" size="sm">
                                    Select File
                                </Button>
                            </div>
                            <Button variant="outline" className="w-full gap-2">
                                <Download className="h-4 w-4" />
                                Download CSV Template
                            </Button>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowImportModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button className="flex-1">Import Employees</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
