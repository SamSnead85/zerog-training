"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
    Upload,
    FileSpreadsheet,
    Download,
    CheckCircle2,
    AlertCircle,
    Users,
    ArrowRight,
    ChevronLeft,
    RefreshCw,
    Mail,
    Building2,
    UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for preview (since we can't use server imports in client components)
interface PreviewEmployee {
    email: string;
    firstName: string;
    lastName: string;
    managerEmail?: string;
    department?: string;
    role?: string;
}

interface ImportError {
    row: number;
    email?: string;
    message: string;
}

type ImportStatus = 'idle' | 'preview' | 'importing' | 'complete' | 'error';

export default function AdminOnboardingPage() {
    const [status, setStatus] = useState<ImportStatus>('idle');
    const [csvContent, setCsvContent] = useState<string>('');
    const [previewData, setPreviewData] = useState<PreviewEmployee[]>([]);
    const [errors, setErrors] = useState<ImportError[]>([]);
    const [importResult, setImportResult] = useState<{
        imported: number;
        skipped: number;
        total: number;
    } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Parse CSV for preview (client-side)
    const parseCSVForPreview = (csv: string): PreviewEmployee[] => {
        const lines = csv.trim().split('\n');
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
        const emailIdx = headers.indexOf('email');
        const firstNameIdx = headers.indexOf('first_name');
        const lastNameIdx = headers.indexOf('last_name');
        const managerEmailIdx = headers.indexOf('manager_email');
        const departmentIdx = headers.indexOf('department');
        const roleIdx = headers.indexOf('role');

        const employees: PreviewEmployee[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length > emailIdx && values[emailIdx]) {
                employees.push({
                    email: values[emailIdx] || '',
                    firstName: values[firstNameIdx] || '',
                    lastName: values[lastNameIdx] || '',
                    managerEmail: managerEmailIdx >= 0 ? values[managerEmailIdx] : undefined,
                    department: departmentIdx >= 0 ? values[departmentIdx] : undefined,
                    role: roleIdx >= 0 ? values[roleIdx] : undefined,
                });
            }
        }
        return employees;
    };

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setCsvContent(content);
            const parsed = parseCSVForPreview(content);
            setPreviewData(parsed);
            setStatus('preview');
            setErrors([]);
        };
        reader.readAsText(file);
    };

    // Handle import confirmation
    const handleImport = async () => {
        setStatus('importing');

        // Simulate import (in production, this would call an API)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setImportResult({
            imported: previewData.length,
            skipped: 0,
            total: previewData.length,
        });
        setStatus('complete');
    };

    // Download sample CSV
    const downloadSampleCSV = () => {
        const sample = `email,first_name,last_name,manager_email,department,role
john.doe@company.com,John,Doe,jane.smith@company.com,Engineering,Senior Developer
sarah.jones@company.com,Sarah,Jones,jane.smith@company.com,Engineering,Developer
jane.smith@company.com,Jane,Smith,,Engineering,Engineering Manager
mike.brown@company.com,Mike,Brown,jane.smith@company.com,Engineering,Junior Developer`;

        const blob = new Blob([sample], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees_template.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Reset to start over
    const reset = () => {
        setStatus('idle');
        setCsvContent('');
        setPreviewData([]);
        setErrors([]);
        setImportResult(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center h-16 px-6 max-w-6xl mx-auto">
                    <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Dashboard</span>
                    </Link>
                    <div className="ml-auto">
                        <span className="font-playfair text-lg font-medium italic tracking-tight">
                            ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-12 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-montserrat text-3xl font-bold mb-2">Employee Onboarding</h1>
                    <p className="text-white/50">Import employees via CSV to get started with AI-Native training</p>
                </div>

                {/* Status: Idle - Upload */}
                {status === 'idle' && (
                    <div className="space-y-8">
                        {/* Upload Area */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer hover:border-white/40 hover:bg-white/[0.02] transition-all"
                        >
                            <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Upload Employee CSV</h3>
                            <p className="text-sm text-white/40 mb-4">
                                Drag and drop or click to select a file
                            </p>
                            <p className="text-xs text-white/30">
                                Supported format: .csv
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>

                        {/* CSV Format Guide */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <FileSpreadsheet className="h-5 w-5 text-white/60" />
                                    CSV Format Requirements
                                </h3>
                                <button
                                    onClick={downloadSampleCSV}
                                    className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Template
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-2 pr-4 text-white/60 font-medium">Column</th>
                                            <th className="text-left py-2 pr-4 text-white/60 font-medium">Required</th>
                                            <th className="text-left py-2 text-white/60 font-medium">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-white/80">
                                        <tr className="border-b border-white/5">
                                            <td className="py-2 pr-4 font-mono text-emerald-400">email</td>
                                            <td className="py-2 pr-4 text-emerald-500">✓ Yes</td>
                                            <td className="py-2 text-white/50">Employee email address</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-2 pr-4 font-mono text-emerald-400">first_name</td>
                                            <td className="py-2 pr-4 text-emerald-500">✓ Yes</td>
                                            <td className="py-2 text-white/50">First name</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-2 pr-4 font-mono text-emerald-400">last_name</td>
                                            <td className="py-2 pr-4 text-emerald-500">✓ Yes</td>
                                            <td className="py-2 text-white/50">Last name</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-2 pr-4 font-mono text-white/60">manager_email</td>
                                            <td className="py-2 pr-4 text-white/30">Optional</td>
                                            <td className="py-2 text-white/50">Email of reporting manager</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-2 pr-4 font-mono text-white/60">department</td>
                                            <td className="py-2 pr-4 text-white/30">Optional</td>
                                            <td className="py-2 text-white/50">Department or team name</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 pr-4 font-mono text-white/60">role</td>
                                            <td className="py-2 pr-4 text-white/30">Optional</td>
                                            <td className="py-2 text-white/50">Job title or role</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status: Preview */}
                {status === 'preview' && (
                    <div className="space-y-6">
                        {/* Preview Header */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Users className="h-5 w-5 text-emerald-500" />
                                        Preview: {previewData.length} employees to import
                                    </h3>
                                    <p className="text-sm text-white/40 mt-1">
                                        Review the data below before importing
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={reset}
                                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleImport}
                                        className="px-6 py-2 text-sm bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
                                    >
                                        Import Employees
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Errors (if any) */}
                        {errors.length > 0 && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                <h4 className="font-medium text-red-400 flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.length} error(s) found
                                </h4>
                                <ul className="text-sm text-white/60 space-y-1">
                                    {errors.slice(0, 5).map((err, i) => (
                                        <li key={i}>Row {err.row}: {err.message}</li>
                                    ))}
                                    {errors.length > 5 && (
                                        <li className="text-white/40">...and {errors.length - 5} more</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* Preview Table */}
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-white/[0.02]">
                                        <tr>
                                            <th className="text-left py-3 px-4 text-white/60 font-medium">#</th>
                                            <th className="text-left py-3 px-4 text-white/60 font-medium">Name</th>
                                            <th className="text-left py-3 px-4 text-white/60 font-medium">Email</th>
                                            <th className="text-left py-3 px-4 text-white/60 font-medium">Manager</th>
                                            <th className="text-left py-3 px-4 text-white/60 font-medium">Department</th>
                                            <th className="text-left py-3 px-4 text-white/60 font-medium">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.slice(0, 10).map((emp, i) => (
                                            <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
                                                <td className="py-3 px-4 text-white/40">{i + 1}</td>
                                                <td className="py-3 px-4 font-medium">
                                                    {emp.firstName} {emp.lastName}
                                                </td>
                                                <td className="py-3 px-4 text-white/60">{emp.email}</td>
                                                <td className="py-3 px-4 text-white/40">
                                                    {emp.managerEmail || '—'}
                                                </td>
                                                <td className="py-3 px-4 text-white/40">
                                                    {emp.department || '—'}
                                                </td>
                                                <td className="py-3 px-4 text-white/40">
                                                    {emp.role || '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {previewData.length > 10 && (
                                <div className="py-3 px-4 text-center text-sm text-white/40 border-t border-white/5 bg-white/[0.01]">
                                    ...and {previewData.length - 10} more employees
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Status: Importing */}
                {status === 'importing' && (
                    <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                        <RefreshCw className="h-12 w-12 text-white/40 mx-auto mb-4 animate-spin" />
                        <h3 className="text-lg font-semibold mb-2">Importing Employees...</h3>
                        <p className="text-sm text-white/40">
                            This may take a moment
                        </p>
                    </div>
                )}

                {/* Status: Complete */}
                {status === 'complete' && importResult && (
                    <div className="space-y-6">
                        {/* Success Message */}
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Import Complete!</h3>
                            <p className="text-white/60 mb-6">
                                Successfully imported {importResult.imported} employees
                            </p>

                            <div className="flex justify-center gap-8 text-center mb-8">
                                <div>
                                    <div className="text-3xl font-bold text-emerald-400">{importResult.imported}</div>
                                    <div className="text-sm text-white/40">Imported</div>
                                </div>
                                {importResult.skipped > 0 && (
                                    <div>
                                        <div className="text-3xl font-bold text-yellow-400">{importResult.skipped}</div>
                                        <div className="text-sm text-white/40">Skipped</div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={reset}
                                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    Import More
                                </button>
                                <Link href="/dashboard">
                                    <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2">
                                        Go to Dashboard
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h4 className="font-semibold mb-4">Next Steps</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">1</div>
                                    <div>
                                        <div className="font-medium">Send Invitations</div>
                                        <div className="text-sm text-white/40">Employees will receive email invitations to join</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">2</div>
                                    <div>
                                        <div className="font-medium">Assign Training</div>
                                        <div className="text-sm text-white/40">Managers can assign certification tracks to their team</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">3</div>
                                    <div>
                                        <div className="font-medium">Track Progress</div>
                                        <div className="text-sm text-white/40">Monitor completion and certification status</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
