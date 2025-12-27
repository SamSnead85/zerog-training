"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Code2,
    Copy,
    CheckCircle2,
    ExternalLink,
    Key,
    BookOpen,
    Zap,
    ChevronRight,
    ChevronDown,
    Play,
    Terminal,
    Lock,
    Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ApiEndpoint {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
    auth: boolean;
    example?: {
        request?: string;
        response: string;
    };
}

const apiEndpoints: Record<string, ApiEndpoint[]> = {
    Modules: [
        {
            method: "GET",
            path: "/api/v1/modules",
            description: "List all training modules",
            auth: true,
            example: {
                response: `{
  "modules": [
    {
      "id": "nist-csf-2",
      "title": "NIST Cybersecurity Framework 2.0",
      "category": "Compliance",
      "duration": "45 min",
      "sections": 10
    }
  ],
  "total": 68,
  "page": 1
}`
            }
        },
        {
            method: "GET",
            path: "/api/v1/modules/:id",
            description: "Get module details with content",
            auth: true,
        },
        {
            method: "POST",
            path: "/api/v1/modules/generate",
            description: "Generate new module with AI",
            auth: true,
            example: {
                request: `{
  "title": "Data Privacy Fundamentals",
  "category": "Compliance",
  "context": "Financial services employees",
  "duration": "30 min"
}`,
                response: `{
  "id": "gen-dp-001",
  "status": "generating",
  "estimatedTime": 45
}`
            }
        },
    ],
    Users: [
        {
            method: "GET",
            path: "/api/v1/users",
            description: "List organization users",
            auth: true,
        },
        {
            method: "GET",
            path: "/api/v1/users/:id/progress",
            description: "Get user training progress",
            auth: true,
        },
        {
            method: "POST",
            path: "/api/v1/users/:id/enroll",
            description: "Enroll user in modules",
            auth: true,
        },
    ],
    Analytics: [
        {
            method: "GET",
            path: "/api/v1/analytics/overview",
            description: "Organization-wide analytics summary",
            auth: true,
        },
        {
            method: "GET",
            path: "/api/v1/analytics/compliance",
            description: "Compliance status by team/module",
            auth: true,
        },
        {
            method: "GET",
            path: "/api/v1/analytics/roi",
            description: "Training ROI metrics",
            auth: true,
        },
    ],
    Webhooks: [
        {
            method: "POST",
            path: "/api/v1/webhooks",
            description: "Create webhook subscription",
            auth: true,
        },
        {
            method: "GET",
            path: "/api/v1/webhooks",
            description: "List active webhooks",
            auth: true,
        },
    ],
};

const methodColors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    POST: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    PUT: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    DELETE: "bg-red-500/10 text-red-500 border-red-500/30",
};

export function APIDocumentation() {
    const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
    const [copiedKey, setCopiedKey] = useState(false);

    const sampleApiKey = "zg_live_sk_1234567890abcdefghijklmnop";

    const copyApiKey = () => {
        navigator.clipboard.writeText(sampleApiKey);
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
    };

    const toggleEndpoint = (key: string) => {
        setExpandedEndpoint(expandedEndpoint === key ? null : key);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-primary" />
                        API Documentation
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Integrate ZeroG Training with your systems
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                        <Globe className="h-3 w-3" />
                        v1.0
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        OpenAPI Spec
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <Card className="p-6 lg:col-span-1">
                    <h3 className="font-semibold mb-4">Quick Start</h3>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</div>
                            <div>
                                <p className="text-sm font-medium">Get API Key</p>
                                <p className="text-xs text-muted-foreground">In Settings → API</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</div>
                            <div>
                                <p className="text-sm font-medium">Add Auth Header</p>
                                <p className="text-xs text-muted-foreground">Bearer token</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</div>
                            <div>
                                <p className="text-sm font-medium">Make Requests</p>
                                <p className="text-xs text-muted-foreground">JSON REST API</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Your API Key</p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 text-xs bg-muted p-2 rounded font-mono truncate">
                                {sampleApiKey.slice(0, 20)}...
                            </code>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={copyApiKey}>
                                {copiedKey ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <h4 className="text-sm font-medium mb-3">Endpoints</h4>
                    <nav className="space-y-1">
                        {Object.keys(apiEndpoints).map((category) => (
                            <a
                                key={category}
                                href={`#${category.toLowerCase()}`}
                                className="flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-muted transition-colors"
                            >
                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                {category}
                            </a>
                        ))}
                    </nav>
                </Card>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Base URL */}
                    <Card className="p-4">
                        <div className="flex items-center gap-3">
                            <Terminal className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Base URL</p>
                                <code className="text-sm font-mono">https://api.zerogtraining.com</code>
                            </div>
                        </div>
                    </Card>

                    {/* Authentication */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Lock className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Authentication</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            All API requests require a Bearer token in the Authorization header.
                        </p>
                        <div className="bg-muted rounded-lg p-4">
                            <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
                                {`curl -X GET "https://api.zerogtraining.com/api/v1/modules" \\
  -H "Authorization: Bearer ${sampleApiKey}" \\
  -H "Content-Type: application/json"`}
                            </pre>
                        </div>
                    </Card>

                    {/* Endpoints by Category */}
                    {Object.entries(apiEndpoints).map(([category, endpoints]) => (
                        <Card key={category} className="p-6" id={category.toLowerCase()}>
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                {category}
                            </h3>

                            <div className="space-y-3">
                                {endpoints.map((endpoint, i) => {
                                    const key = `${category}-${i}`;
                                    const isExpanded = expandedEndpoint === key;

                                    return (
                                        <div key={key} className="border border-border rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleEndpoint(key)}
                                                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                                            >
                                                <Badge variant="outline" className={cn("text-xs font-mono", methodColors[endpoint.method])}>
                                                    {endpoint.method}
                                                </Badge>
                                                <code className="text-sm font-mono flex-1 text-left">{endpoint.path}</code>
                                                <span className="text-xs text-muted-foreground hidden md:block">{endpoint.description}</span>
                                                {endpoint.auth && <Lock className="h-3 w-3 text-muted-foreground" />}
                                                <ChevronDown className={cn(
                                                    "h-4 w-4 text-muted-foreground transition-transform",
                                                    isExpanded && "rotate-180"
                                                )} />
                                            </button>

                                            {isExpanded && endpoint.example && (
                                                <div className="p-4 bg-muted/30 border-t border-border space-y-4">
                                                    {endpoint.example.request && (
                                                        <div>
                                                            <p className="text-xs font-medium mb-2">Request Body</p>
                                                            <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto">
                                                                {endpoint.example.request}
                                                            </pre>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-xs font-medium mb-2">Response</p>
                                                        <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto">
                                                            {endpoint.example.response}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    ))}

                    {/* Rate Limits */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Rate Limits
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-2xl font-bold">1,000</p>
                                <p className="text-xs text-muted-foreground">Requests/minute (Standard)</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-2xl font-bold">10,000</p>
                                <p className="text-xs text-muted-foreground">Requests/minute (Enterprise)</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-2xl font-bold">100</p>
                                <p className="text-xs text-muted-foreground">AI Generations/day</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
