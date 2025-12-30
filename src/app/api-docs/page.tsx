"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Code,
    Key,
    BookOpen,
    Play,
    Copy,
    Check,
    ChevronRight,
    Terminal,
    Zap,
    Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// API DOCUMENTATION DATA
// =============================================================================

interface APIEndpoint {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
    auth: boolean;
    params?: { name: string; type: string; required: boolean; description: string }[];
    response?: string;
}

const endpoints: Record<string, APIEndpoint[]> = {
    "Progress": [
        {
            method: "GET",
            path: "/api/v1/progress",
            description: "Get user's learning progress across all modules",
            auth: true,
            response: `{
  "completed_lessons": 12,
  "total_lessons": 48,
  "current_streak": 7,
  "modules": [
    { "id": "module-1", "progress": 100 },
    { "id": "module-2", "progress": 75 }
  ]
}`
        },
        {
            method: "POST",
            path: "/api/v1/progress/lesson",
            description: "Mark a lesson as completed",
            auth: true,
            params: [
                { name: "lesson_id", type: "string", required: true, description: "The lesson ID to mark complete" },
                { name: "score", type: "number", required: false, description: "Quiz score if applicable (0-100)" },
            ],
            response: `{
  "success": true,
  "points_earned": 50,
  "streak_updated": true
}`
        },
    ],
    "Certifications": [
        {
            method: "GET",
            path: "/api/v1/certifications",
            description: "List all certifications for the authenticated user",
            auth: true,
            response: `{
  "certifications": [
    {
      "id": "cert-foundations",
      "name": "AI-Native Foundations",
      "earned_date": "2024-12-15",
      "credential_id": "SN-FOUND-2024-ABC123"
    }
  ]
}`
        },
        {
            method: "GET",
            path: "/api/v1/certifications/verify/:credential_id",
            description: "Verify a certification by credential ID (public endpoint)",
            auth: false,
            params: [
                { name: "credential_id", type: "string", required: true, description: "The credential ID to verify" },
            ],
            response: `{
  "valid": true,
  "name": "John Smith",
  "certification": "AI-Native Foundations",
  "issued_date": "2024-12-15",
  "expires": null
}`
        },
    ],
    "Team Management": [
        {
            method: "GET",
            path: "/api/v1/team/members",
            description: "List all team members (admin only)",
            auth: true,
            response: `{
  "members": [
    { "id": "usr_123", "name": "Sarah Chen", "role": "learner", "progress": 85 },
    { "id": "usr_456", "name": "Mike Johnson", "role": "admin", "progress": 92 }
  ]
}`
        },
        {
            method: "POST",
            path: "/api/v1/team/invite",
            description: "Invite a new team member",
            auth: true,
            params: [
                { name: "email", type: "string", required: true, description: "Email address to invite" },
                { name: "role", type: "string", required: false, description: "Role: 'learner' or 'admin'" },
            ],
            response: `{
  "success": true,
  "invitation_id": "inv_789"
}`
        },
    ],
    "Analytics": [
        {
            method: "GET",
            path: "/api/v1/analytics/dashboard",
            description: "Get team analytics dashboard data (admin only)",
            auth: true,
            response: `{
  "active_learners": 45,
  "avg_completion_rate": 78,
  "lessons_completed_this_week": 234,
  "certifications_earned": 12
}`
        },
    ],
};

const methodColors: Record<string, string> = {
    GET: "bg-emerald-500/20 text-emerald-400",
    POST: "bg-blue-500/20 text-blue-400",
    PUT: "bg-yellow-500/20 text-yellow-400",
    DELETE: "bg-red-500/20 text-red-400",
};

// =============================================================================
// API DOCS PAGE
// =============================================================================

export default function APIDocsPage() {
    const [activeSection, setActiveSection] = useState("Progress");
    const [copied, setCopied] = useState<string | null>(null);

    const copyCode = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-6xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/help" className="text-sm text-white/60 hover:text-white transition-colors">
                            Help Center
                        </Link>
                        <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                            Get API Key
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto flex">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 border-r border-white/5 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block">
                    <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">API Reference</h2>
                    <nav className="space-y-1">
                        {Object.keys(endpoints).map(section => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                    activeSection === section
                                        ? "bg-white/10 text-white"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {section}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Resources</h3>
                        <div className="space-y-2">
                            <Link href="#" className="flex items-center gap-2 text-sm text-white/50 hover:text-white">
                                <Terminal className="h-4 w-4" />
                                SDK & Libraries
                            </Link>
                            <Link href="#" className="flex items-center gap-2 text-sm text-white/50 hover:text-white">
                                <Play className="h-4 w-4" />
                                API Playground
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-12">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <Code className="h-8 w-8 text-white/40" />
                            <h1 className="text-2xl font-bold">API Documentation</h1>
                        </div>
                        <p className="text-white/50">
                            Integrate ScaledNative into your applications and workflows
                        </p>
                    </div>

                    {/* Authentication */}
                    <section className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <Key className="h-5 w-5 text-white/40" />
                            <h2 className="font-semibold">Authentication</h2>
                        </div>
                        <p className="text-sm text-white/60 mb-4">
                            All authenticated endpoints require a Bearer token in the Authorization header:
                        </p>
                        <div className="bg-black/50 rounded-lg p-4 font-mono text-sm relative">
                            <code className="text-emerald-400">
                                Authorization: Bearer YOUR_API_KEY
                            </code>
                            <button
                                onClick={() => copyCode("Authorization: Bearer YOUR_API_KEY", "auth")}
                                className="absolute right-3 top-3 p-1 hover:bg-white/10 rounded"
                            >
                                {copied === "auth" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-white/40" />}
                            </button>
                        </div>
                    </section>

                    {/* Endpoints */}
                    <section>
                        <h2 className="text-xl font-semibold mb-6">{activeSection}</h2>
                        <div className="space-y-6">
                            {endpoints[activeSection]?.map((endpoint, i) => (
                                <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
                                    {/* Header */}
                                    <div className="p-4 bg-white/[0.02] flex items-center gap-4">
                                        <span className={cn("px-2 py-1 rounded text-xs font-mono font-bold", methodColors[endpoint.method])}>
                                            {endpoint.method}
                                        </span>
                                        <code className="font-mono text-sm">{endpoint.path}</code>
                                        {endpoint.auth && <Lock className="h-4 w-4 text-white/30 ml-auto" />}
                                    </div>

                                    {/* Body */}
                                    <div className="p-4">
                                        <p className="text-sm text-white/60 mb-4">{endpoint.description}</p>

                                        {endpoint.params && (
                                            <div className="mb-4">
                                                <h4 className="text-xs font-semibold text-white/40 uppercase mb-2">Parameters</h4>
                                                <div className="space-y-2">
                                                    {endpoint.params.map((param, j) => (
                                                        <div key={j} className="flex items-start gap-4 text-sm">
                                                            <code className="text-blue-400 whitespace-nowrap">{param.name}</code>
                                                            <span className="text-white/30">{param.type}</span>
                                                            {param.required && <span className="text-red-400 text-xs">required</span>}
                                                            <span className="text-white/50 flex-1">{param.description}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {endpoint.response && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-white/40 uppercase mb-2">Response</h4>
                                                <div className="bg-black/50 rounded-lg p-4 font-mono text-xs relative overflow-x-auto">
                                                    <pre className="text-white/70">{endpoint.response}</pre>
                                                    <button
                                                        onClick={() => copyCode(endpoint.response!, `response-${i}`)}
                                                        className="absolute right-3 top-3 p-1 hover:bg-white/10 rounded"
                                                    >
                                                        {copied === `response-${i}` ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-white/40" />}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
