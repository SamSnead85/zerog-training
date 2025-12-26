"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    Search,
    Filter,
    CheckCircle2,
    Calendar,
    Clock,
    Mail,
    ChevronDown,
    ChevronRight,
    AlertCircle,
    X,
    Plus,
    Building2,
    UserCheck,
    Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    selected: boolean;
}

interface Course {
    id: string;
    title: string;
    duration: string;
    type: "required" | "recommended" | "optional";
}

interface Department {
    name: string;
    employees: number;
    selected: boolean;
}

const employees: Employee[] = [
    { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", department: "Engineering", role: "Senior Developer", selected: false },
    { id: "2", name: "Marcus Johnson", email: "marcus.j@company.com", department: "Product", role: "Product Manager", selected: false },
    { id: "3", name: "Emily Rodriguez", email: "emily.r@company.com", department: "Design", role: "UX Designer", selected: false },
    { id: "4", name: "David Kim", email: "david.kim@company.com", department: "Engineering", role: "QA Engineer", selected: false },
    { id: "5", name: "Lisa Wang", email: "lisa.wang@company.com", department: "Engineering", role: "Team Lead", selected: false },
    { id: "6", name: "Robert Garcia", email: "robert.g@company.com", department: "Sales", role: "Account Executive", selected: false },
    { id: "7", name: "Jennifer Lee", email: "jennifer.l@company.com", department: "HR", role: "HR Manager", selected: false },
    { id: "8", name: "Michael Brown", email: "michael.b@company.com", department: "Operations", role: "Operations Lead", selected: false },
];

const departments: Department[] = [
    { name: "Engineering", employees: 342, selected: false },
    { name: "Sales", employees: 215, selected: false },
    { name: "Product", employees: 128, selected: false },
    { name: "Design", employees: 67, selected: false },
    { name: "HR", employees: 45, selected: false },
    { name: "Operations", employees: 312, selected: false },
];

const courses: Course[] = [
    { id: "1", title: "AI Fundamentals for Everyone", duration: "2 hours", type: "recommended" },
    { id: "2", title: "Prompt Engineering Mastery", duration: "3 hours", type: "optional" },
    { id: "3", title: "Annual Security Awareness", duration: "1.5 hours", type: "required" },
    { id: "4", title: "Leadership in the AI Era", duration: "4 hours", type: "optional" },
    { id: "5", title: "Data Privacy Essentials", duration: "1 hour", type: "required" },
];

export function BulkAssignmentWizard() {
    const [step, setStep] = useState(1);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [assignmentType, setAssignmentType] = useState<"all" | "department" | "individual">("department");
    const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [sendReminder, setSendReminder] = useState(true);
    const [reminderDays, setReminderDays] = useState(7);
    const [isRequired, setIsRequired] = useState(true);

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleDepartment = (deptName: string) => {
        setSelectedDepts((prev) =>
            prev.includes(deptName) ? prev.filter((d) => d !== deptName) : [...prev, deptName]
        );
    };

    const toggleEmployee = (empId: string) => {
        setSelectedEmployees((prev) =>
            prev.includes(empId) ? prev.filter((e) => e !== empId) : [...prev, empId]
        );
    };

    const selectAll = () => {
        setSelectedEmployees(filteredEmployees.map((e) => e.id));
    };

    const clearSelection = () => {
        setSelectedEmployees([]);
        setSelectedDepts([]);
    };

    const getAssigneeCount = () => {
        if (assignmentType === "all") return "1,247";
        if (assignmentType === "department") {
            return departments
                .filter((d) => selectedDepts.includes(d.name))
                .reduce((sum, d) => sum + d.employees, 0)
                .toString();
        }
        return selectedEmployees.length.toString();
    };

    const handleAssign = () => {
        // Assignment logic
        alert(`Training assigned to ${getAssigneeCount()} employees!`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[
                    { num: 1, label: "Select Training" },
                    { num: 2, label: "Choose Assignees" },
                    { num: 3, label: "Set Deadline" },
                    { num: 4, label: "Review & Assign" },
                ].map((s, i) => (
                    <div key={s.num} className="flex items-center">
                        <div className={cn(
                            "flex items-center gap-2",
                            step >= s.num ? "text-primary" : "text-muted-foreground"
                        )}>
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                step > s.num && "bg-primary text-primary-foreground",
                                step === s.num && "bg-primary/10 text-primary border-2 border-primary",
                                step < s.num && "bg-muted"
                            )}>
                                {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                            </div>
                            <span className="text-sm font-medium hidden md:inline">{s.label}</span>
                        </div>
                        {i < 3 && (
                            <div className={cn(
                                "w-16 h-0.5 mx-4",
                                step > s.num ? "bg-primary" : "bg-muted"
                            )} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Select Training */}
            {step === 1 && (
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Select Training to Assign</h2>
                    <div className="space-y-3">
                        {courses.map((course) => (
                            <button
                                key={course.id}
                                onClick={() => setSelectedCourse(course.id)}
                                className={cn(
                                    "w-full p-4 rounded-xl border text-left transition-all",
                                    selectedCourse === course.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/30"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{course.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {course.duration}
                                        </p>
                                    </div>
                                    <Badge className={cn(
                                        course.type === "required" && "bg-red-500/10 text-red-500",
                                        course.type === "recommended" && "bg-blue-500/10 text-blue-500",
                                        course.type === "optional" && "bg-zinc-500/10 text-zinc-500"
                                    )}>
                                        {course.type}
                                    </Badge>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button onClick={() => setStep(2)} disabled={!selectedCourse}>
                            Continue <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </Card>
            )}

            {/* Step 2: Choose Assignees */}
            {step === 2 && (
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Who should complete this training?</h2>

                    {/* Assignment Type Selector */}
                    <div className="flex gap-2 mb-6">
                        {([
                            { value: "all", label: "Everyone", icon: Users },
                            { value: "department", label: "Department", icon: Building2 },
                            { value: "individual", label: "Individual", icon: UserCheck },
                        ] as const).map((type) => {
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.value}
                                    onClick={() => setAssignmentType(type.value)}
                                    className={cn(
                                        "flex-1 p-4 rounded-xl border transition-all flex items-center justify-center gap-2",
                                        assignmentType === type.value
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    {type.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Department Selection */}
                    {assignmentType === "department" && (
                        <div className="space-y-2 mb-4">
                            {departments.map((dept) => (
                                <button
                                    key={dept.name}
                                    onClick={() => toggleDepartment(dept.name)}
                                    className={cn(
                                        "w-full p-3 rounded-lg border flex items-center justify-between transition-all",
                                        selectedDepts.includes(dept.name)
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                                            selectedDepts.includes(dept.name)
                                                ? "border-primary bg-primary"
                                                : "border-muted-foreground"
                                        )}>
                                            {selectedDepts.includes(dept.name) && (
                                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                            )}
                                        </div>
                                        <span className="font-medium">{dept.name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{dept.employees} employees</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Individual Selection */}
                    {assignmentType === "individual" && (
                        <>
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search employees..."
                                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="flex gap-2 mb-4">
                                <Button variant="outline" size="sm" onClick={selectAll}>
                                    Select All
                                </Button>
                                <Button variant="outline" size="sm" onClick={clearSelection}>
                                    Clear
                                </Button>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {filteredEmployees.map((emp) => (
                                    <button
                                        key={emp.id}
                                        onClick={() => toggleEmployee(emp.id)}
                                        className={cn(
                                            "w-full p-3 rounded-lg border flex items-center gap-3 transition-all",
                                            selectedEmployees.includes(emp.id)
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/30"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                                            selectedEmployees.includes(emp.id)
                                                ? "border-primary bg-primary"
                                                : "border-muted-foreground"
                                        )}>
                                            {selectedEmployees.includes(emp.id) && (
                                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="font-medium text-sm">{emp.name}</p>
                                            <p className="text-xs text-muted-foreground">{emp.department} • {emp.role}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Selection Summary */}
                    <div className="mt-6 p-4 rounded-lg bg-muted flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Selected</p>
                            <p className="text-lg font-bold">{getAssigneeCount()} employees</p>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setStep(1)}>
                            Back
                        </Button>
                        <Button
                            onClick={() => setStep(3)}
                            disabled={
                                (assignmentType === "department" && selectedDepts.length === 0) ||
                                (assignmentType === "individual" && selectedEmployees.length === 0)
                            }
                        >
                            Continue <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </Card>
            )}

            {/* Step 3: Set Deadline */}
            {step === 3 && (
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Set Deadline & Reminders</h2>

                    <div className="space-y-6">
                        {/* Due Date */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Requirement Type */}
                        <div>
                            <label className="text-sm font-medium mb-3 block">Requirement Type</label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsRequired(true)}
                                    className={cn(
                                        "flex-1 p-4 rounded-xl border transition-all",
                                        isRequired
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <AlertCircle className="h-5 w-5 text-red-500 mb-2" />
                                    <p className="font-medium">Required</p>
                                    <p className="text-xs text-muted-foreground">Must complete by deadline</p>
                                </button>
                                <button
                                    onClick={() => setIsRequired(false)}
                                    className={cn(
                                        "flex-1 p-4 rounded-xl border transition-all",
                                        !isRequired
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <Clock className="h-5 w-5 text-blue-500 mb-2" />
                                    <p className="font-medium">Recommended</p>
                                    <p className="text-xs text-muted-foreground">Suggested but optional</p>
                                </button>
                            </div>
                        </div>

                        {/* Reminders */}
                        <div>
                            <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={sendReminder}
                                    onChange={(e) => setSendReminder(e.target.checked)}
                                    className="w-4 h-4 rounded"
                                />
                                <span className="font-medium">Send email reminders</span>
                            </label>
                            {sendReminder && (
                                <div className="ml-7 flex items-center gap-3">
                                    <span className="text-sm text-muted-foreground">Remind</span>
                                    <select
                                        value={reminderDays}
                                        onChange={(e) => setReminderDays(Number(e.target.value))}
                                        className="h-9 px-3 rounded-lg bg-muted border-0"
                                    >
                                        <option value={1}>1 day</option>
                                        <option value={3}>3 days</option>
                                        <option value={7}>7 days</option>
                                        <option value={14}>14 days</option>
                                    </select>
                                    <span className="text-sm text-muted-foreground">before deadline</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setStep(2)}>
                            Back
                        </Button>
                        <Button onClick={() => setStep(4)} disabled={!dueDate}>
                            Continue <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </Card>
            )}

            {/* Step 4: Review & Assign */}
            {step === 4 && (
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Review Assignment</h2>

                    <div className="space-y-4 mb-6">
                        <div className="p-4 rounded-lg bg-muted">
                            <p className="text-sm text-muted-foreground mb-1">Training</p>
                            <p className="font-medium">
                                {courses.find((c) => c.id === selectedCourse)?.title}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted">
                            <p className="text-sm text-muted-foreground mb-1">Assignees</p>
                            <p className="font-medium">{getAssigneeCount()} employees</p>
                            {assignmentType === "department" && selectedDepts.length > 0 && (
                                <p className="text-sm text-muted-foreground">{selectedDepts.join(", ")}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted">
                                <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                                <p className="font-medium">{new Date(dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted">
                                <p className="text-sm text-muted-foreground mb-1">Requirement</p>
                                <p className="font-medium">{isRequired ? "Required" : "Recommended"}</p>
                            </div>
                        </div>
                        {sendReminder && (
                            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <p className="text-sm">
                                        Reminder email will be sent {reminderDays} days before deadline
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setStep(3)}>
                            Back
                        </Button>
                        <Button className="gap-2" onClick={handleAssign}>
                            <Send className="h-4 w-4" />
                            Assign Training
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
