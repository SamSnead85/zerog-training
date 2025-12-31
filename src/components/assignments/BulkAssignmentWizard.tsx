"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Users,
    Search,
    CheckCircle2,
    Calendar,
    Clock,
    ChevronDown,
    ChevronRight,
    AlertCircle,
    X,
    Plus,
    Send,
    Loader2,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { aiNativeCurriculum } from "@/lib/curriculum/ai-native-curriculum";

// =============================================================================
// TYPES
// =============================================================================

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    organizationName?: string;
}

interface Course {
    id: string;
    title: string;
    duration: string;
    selected: boolean;
}

// =============================================================================
// BULK ASSIGNMENT WIZARD
// =============================================================================

export function BulkAssignmentWizard() {
    const [step, setStep] = useState(1);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [dueDate, setDueDate] = useState("");
    const [isRequired, setIsRequired] = useState(true);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch users
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
        // Initialize courses from curriculum
        const curriculumCourses = aiNativeCurriculum.map((mod) => ({
            id: mod.id,
            title: mod.title,
            duration: mod.duration,
            selected: false,
        }));
        setCourses(curriculumCourses);
    }, [fetchUsers]);

    const toggleUser = (userId: string) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const toggleCourse = (courseId: string) => {
        setCourses((prev) =>
            prev.map((c) =>
                c.id === courseId ? { ...c, selected: !c.selected } : c
            )
        );
    };

    const selectAllUsers = () => {
        setSelectedUserIds(filteredUsers.map((u) => u.id));
    };

    const clearUserSelection = () => {
        setSelectedUserIds([]);
    };

    const selectAllCourses = () => {
        setCourses((prev) => prev.map((c) => ({ ...c, selected: true })));
    };

    const clearCourseSelection = () => {
        setCourses((prev) => prev.map((c) => ({ ...c, selected: false })));
    };

    const handleSubmit = async () => {
        const selectedCourseIds = courses.filter((c) => c.selected).map((c) => c.id);

        if (selectedUserIds.length === 0) {
            setError("Please select at least one user");
            return;
        }

        if (selectedCourseIds.length === 0) {
            setError("Please select at least one course");
            return;
        }

        setError(null);
        setSubmitting(true);

        try {
            const res = await fetch("/api/admin/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userIds: selectedUserIds,
                    moduleIds: selectedCourseIds,
                    dueDate: dueDate || undefined,
                    isRequired,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                // Reset form after success
                setTimeout(() => {
                    setSuccess(false);
                    setStep(1);
                    setSelectedUserIds([]);
                    setCourses((prev) => prev.map((c) => ({ ...c, selected: false })));
                    setDueDate("");
                }, 2000);
            } else {
                setError(data.error || "Failed to create assignments");
            }
        } catch (err) {
            setError("Failed to create assignments");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            (u.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedCourses = courses.filter((c) => c.selected);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Assignments Created!</h2>
                <p className="text-muted-foreground mt-2">
                    {selectedUserIds.length} user(s) have been assigned {selectedCourses.length} course(s).
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[
                    { num: 1, label: "Select Users" },
                    { num: 2, label: "Select Courses" },
                    { num: 3, label: "Review & Assign" },
                ].map((s, i) => (
                    <div key={s.num} className="flex items-center">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                                step >= s.num
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                        </div>
                        <span
                            className={cn(
                                "ml-2 text-sm font-medium hidden sm:inline",
                                step >= s.num ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {s.label}
                        </span>
                        {i < 2 && (
                            <ChevronRight className="h-5 w-5 text-muted-foreground mx-4" />
                        )}
                    </div>
                ))}
            </div>

            {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="text-destructive">{error}</p>
                    <button onClick={() => setError(null)} className="ml-auto">
                        <X className="h-4 w-4 text-destructive" />
                    </button>
                </div>
            )}

            {/* Step 1: Select Users */}
            {step === 1 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Select Users</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={selectAllUsers}
                                className="text-sm text-primary hover:underline"
                            >
                                Select All
                            </button>
                            <span className="text-muted-foreground">|</span>
                            <button
                                onClick={clearUserSelection}
                                className="text-sm text-muted-foreground hover:underline"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="max-h-[400px] overflow-y-auto space-y-2">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => toggleUser(user.id)}
                                className={cn(
                                    "p-4 rounded-lg border cursor-pointer transition-all",
                                    selectedUserIds.includes(user.id)
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                                            selectedUserIds.includes(user.id)
                                                ? "border-primary bg-primary"
                                                : "border-muted-foreground"
                                        )}
                                    >
                                        {selectedUserIds.includes(user.id) && (
                                            <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                        )}
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-medium text-primary">
                                            {(user.name || user.email).charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{user.name || user.email}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {user.role.replace("_", " ")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <p className="text-sm text-muted-foreground">
                            {selectedUserIds.length} user(s) selected
                        </p>
                        <button
                            onClick={() => setStep(2)}
                            disabled={selectedUserIds.length === 0}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next: Select Courses
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Select Courses */}
            {step === 2 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Select Courses</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={selectAllCourses}
                                className="text-sm text-primary hover:underline"
                            >
                                Select All
                            </button>
                            <span className="text-muted-foreground">|</span>
                            <button
                                onClick={clearCourseSelection}
                                className="text-sm text-muted-foreground hover:underline"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto space-y-2">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => toggleCourse(course.id)}
                                className={cn(
                                    "p-4 rounded-lg border cursor-pointer transition-all",
                                    course.selected
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                                            course.selected
                                                ? "border-primary bg-primary"
                                                : "border-muted-foreground"
                                        )}
                                    >
                                        {course.selected && (
                                            <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                        )}
                                    </div>
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium">{course.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {course.duration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-muted"
                        >
                            Back
                        </button>
                        <p className="text-sm text-muted-foreground">
                            {selectedCourses.length} course(s) selected
                        </p>
                        <button
                            onClick={() => setStep(3)}
                            disabled={selectedCourses.length === 0}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next: Review
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Review & Assign */}
            {step === 3 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Review & Assign</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Users ({selectedUserIds.length})
                            </h3>
                            <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                {users
                                    .filter((u) => selectedUserIds.includes(u.id))
                                    .map((u) => (
                                        <li key={u.id} className="text-muted-foreground">
                                            {u.name || u.email}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                Courses ({selectedCourses.length})
                            </h3>
                            <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                {selectedCourses.map((c) => (
                                    <li key={c.id} className="text-muted-foreground">
                                        {c.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Due Date (Optional)
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assignment Type</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsRequired(true)}
                                    className={cn(
                                        "flex-1 h-10 rounded-lg border font-medium transition-colors",
                                        isRequired
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border hover:border-primary/50"
                                    )}
                                >
                                    Required
                                </button>
                                <button
                                    onClick={() => setIsRequired(false)}
                                    className={cn(
                                        "flex-1 h-10 rounded-lg border font-medium transition-colors",
                                        !isRequired
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border hover:border-primary/50"
                                    )}
                                >
                                    Optional
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={() => setStep(2)}
                            className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-muted"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-8 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Create Assignments
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
