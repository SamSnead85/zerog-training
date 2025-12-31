"use client";

import { useState, useCallback } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Loader2,
    Download,
    Users,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRow {
    email: string;
    name: string;
    role?: string;
}

interface ImportResult {
    email: string;
    status: "created" | "skipped" | "failed";
    error?: string;
}

interface ImportSummary {
    total: number;
    created: number;
    skipped: number;
    failed: number;
}

export function BulkUserImport() {
    const [dragOver, setDragOver] = useState(false);
    const [parsedUsers, setParsedUsers] = useState<UserRow[]>([]);
    const [importing, setImporting] = useState(false);
    const [results, setResults] = useState<ImportResult[] | null>(null);
    const [summary, setSummary] = useState<ImportSummary | null>(null);
    const [sendWelcome, setSendWelcome] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const parseCSV = (text: string): UserRow[] => {
        const lines = text.trim().split("\n");
        if (lines.length < 2) return [];

        const headers = lines[0].toLowerCase().split(",").map((h) => h.trim());
        const emailIdx = headers.findIndex((h) => h.includes("email"));
        const nameIdx = headers.findIndex((h) => h.includes("name"));
        const roleIdx = headers.findIndex((h) => h.includes("role"));

        if (emailIdx === -1) {
            throw new Error("CSV must have an 'email' column");
        }

        const users: UserRow[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));
            if (values[emailIdx]) {
                users.push({
                    email: values[emailIdx],
                    name: nameIdx >= 0 ? values[nameIdx] || values[emailIdx].split("@")[0] : values[emailIdx].split("@")[0],
                    role: roleIdx >= 0 ? values[roleIdx] : undefined,
                });
            }
        }
        return users;
    };

    const handleFile = useCallback((file: File) => {
        setError(null);
        setResults(null);
        setSummary(null);

        if (!file.name.endsWith(".csv")) {
            setError("Please upload a CSV file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const users = parseCSV(text);
                if (users.length === 0) {
                    setError("No valid users found in CSV");
                    return;
                }
                if (users.length > 100) {
                    setError("Maximum 100 users per import. Please split your file.");
                    return;
                }
                setParsedUsers(users);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to parse CSV");
            }
        };
        reader.readAsText(file);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleImport = async () => {
        setImporting(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/users/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    users: parsedUsers,
                    sendWelcome,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || "Import failed");
                return;
            }

            setResults(data.results);
            setSummary(data.summary);
        } catch (err) {
            setError("Failed to import users");
        } finally {
            setImporting(false);
        }
    };

    const reset = () => {
        setParsedUsers([]);
        setResults(null);
        setSummary(null);
        setError(null);
    };

    const downloadTemplate = () => {
        const csv = "email,name,role\njohn@example.com,John Smith,LEARNER\njane@example.com,Jane Doe,MANAGER";
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "user_import_template.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Results view
    if (results && summary) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Import Complete</h2>
                    <Button onClick={reset} variant="outline" className="gap-2 border-white/10">
                        <X className="h-4 w-4" />
                        Close
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4">
                    <Card className="p-4 bg-white/[0.02] border-white/10 text-center">
                        <p className="text-3xl font-bold text-white">{summary.total}</p>
                        <p className="text-sm text-muted-foreground">Total</p>
                    </Card>
                    <Card className="p-4 bg-emerald-500/10 border-emerald-500/20 text-center">
                        <p className="text-3xl font-bold text-emerald-400">{summary.created}</p>
                        <p className="text-sm text-emerald-300/70">Created</p>
                    </Card>
                    <Card className="p-4 bg-amber-500/10 border-amber-500/20 text-center">
                        <p className="text-3xl font-bold text-amber-400">{summary.skipped}</p>
                        <p className="text-sm text-amber-300/70">Skipped</p>
                    </Card>
                    <Card className="p-4 bg-red-500/10 border-red-500/20 text-center">
                        <p className="text-3xl font-bold text-red-400">{summary.failed}</p>
                        <p className="text-sm text-red-300/70">Failed</p>
                    </Card>
                </div>

                {/* Results List */}
                <Card className="p-4 bg-white/[0.02] border-white/10 max-h-80 overflow-y-auto">
                    <div className="space-y-2">
                        {results.map((r, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg",
                                    r.status === "created" && "bg-emerald-500/10",
                                    r.status === "skipped" && "bg-amber-500/10",
                                    r.status === "failed" && "bg-red-500/10"
                                )}
                            >
                                <span className="text-sm text-white">{r.email}</span>
                                <div className="flex items-center gap-2">
                                    {r.status === "created" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                                    {r.status === "skipped" && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                                    {r.status === "failed" && <XCircle className="h-4 w-4 text-red-400" />}
                                    <Badge
                                        className={cn(
                                            r.status === "created" && "bg-emerald-500/20 text-emerald-400",
                                            r.status === "skipped" && "bg-amber-500/20 text-amber-400",
                                            r.status === "failed" && "bg-red-500/20 text-red-400"
                                        )}
                                    >
                                        {r.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    // Preview view
    if (parsedUsers.length > 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Preview Import</h2>
                        <p className="text-sm text-muted-foreground">{parsedUsers.length} users ready to import</p>
                    </div>
                    <Button onClick={reset} variant="ghost" size="icon" className="hover:bg-white/10">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        {error}
                    </div>
                )}

                {/* Users Preview */}
                <Card className="bg-white/[0.02] border-white/10 overflow-hidden">
                    <div className="max-h-60 overflow-y-auto">
                        <table className="w-full">
                            <thead className="bg-white/[0.02] sticky top-0">
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parsedUsers.map((user, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="px-4 py-3 text-sm text-white">{user.email}</td>
                                        <td className="px-4 py-3 text-sm text-muted-foreground">{user.name}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline" className="border-white/10">
                                                {user.role || "LEARNER"}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Options */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <input
                        type="checkbox"
                        id="sendWelcome"
                        checked={sendWelcome}
                        onChange={(e) => setSendWelcome(e.target.checked)}
                        className="w-5 h-5 rounded"
                    />
                    <label htmlFor="sendWelcome" className="flex-1">
                        <p className="font-medium text-white">Send Welcome Emails</p>
                        <p className="text-sm text-muted-foreground">Each user will receive their login credentials</p>
                    </label>
                </div>

                {/* Import Button */}
                <div className="flex justify-end gap-3">
                    <Button onClick={reset} variant="outline" className="border-white/10">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleImport}
                        disabled={importing}
                        className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700"
                    >
                        {importing ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Importing...
                            </>
                        ) : (
                            <>
                                <Users className="h-4 w-4" />
                                Import {parsedUsers.length} Users
                            </>
                        )}
                    </Button>
                </div>
            </div>
        );
    }

    // Upload view
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Bulk Import Users</h2>
                    <p className="text-sm text-muted-foreground">Upload a CSV file to import multiple users at once</p>
                </div>
                <Button onClick={downloadTemplate} variant="outline" className="gap-2 border-white/10">
                    <Download className="h-4 w-4" />
                    Download Template
                </Button>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    {error}
                </div>
            )}

            {/* Drop Zone */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer",
                    dragOver
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-white/20 hover:border-white/40 bg-white/[0.02]"
                )}
                onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".csv";
                    input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleFile(file);
                    };
                    input.click();
                }}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-white/[0.05]">
                        <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-lg font-medium text-white">Drop CSV file here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Maximum 100 users per file</p>
                </div>
            </div>

            {/* Format Info */}
            <Card className="p-4 bg-white/[0.02] border-white/10">
                <h3 className="font-medium text-white mb-3">CSV Format</h3>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-sm text-muted-foreground">
                    <p>email,name,role</p>
                    <p>john@company.com,John Smith,LEARNER</p>
                    <p>jane@company.com,Jane Doe,MANAGER</p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                    Roles: LEARNER (default), MANAGER, CREATOR
                </p>
            </Card>
        </div>
    );
}
