import { Card, Badge } from "@/components/ui";
import {
    Code2,
    Lock,
    Zap,
    BookOpen,
    ChevronRight,
    Copy,
    Check,
} from "lucide-react";

export default function ApiDocsPage() {
    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
                    <p className="text-muted-foreground">
                        Integrate ScaledNative into your applications with our REST API
                    </p>
                </div>

                {/* Quick Start */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Base URL</p>
                            <code className="px-3 py-2 bg-muted rounded-lg text-sm block">
                                https://api.zerog.training/v1
                            </code>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Authentication</p>
                            <code className="px-3 py-2 bg-muted rounded-lg text-sm block">
                                Authorization: Bearer YOUR_API_KEY
                            </code>
                        </div>
                    </div>
                </Card>

                {/* Endpoints */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Endpoints</h2>

                    {/* Training Generation */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-emerald-500/10 text-emerald-500">POST</Badge>
                            <code className="text-sm">/generate-training</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Generate a complete training program using AI
                        </p>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-2">Request Body</p>
                                <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
                                    {`{
  "topic": "Cybersecurity Awareness",
  "context": "Healthcare organization",
  "targetAudience": "All employees",
  "duration": "2-4 hours"
}`}
                                </pre>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-2">Response</p>
                                <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
                                    {`{
  "title": "Cybersecurity Awareness Training",
  "description": "Comprehensive security training...",
  "duration": "3 hours",
  "modules": [
    {
      "title": "Introduction to Cybersecurity",
      "duration": "30 min",
      "topics": ["Threat landscape", "Common attacks"]
    }
  ]
}`}
                                </pre>
                            </div>
                        </div>
                    </Card>

                    {/* Users */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-blue-500/10 text-blue-500">GET</Badge>
                            <code className="text-sm">/users</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            List all users in your organization
                        </p>
                        <div>
                            <p className="text-sm font-medium mb-2">Query Parameters</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex gap-4">
                                    <code className="text-primary">limit</code>
                                    <span className="text-muted-foreground">Number of results (default: 20)</span>
                                </div>
                                <div className="flex gap-4">
                                    <code className="text-primary">offset</code>
                                    <span className="text-muted-foreground">Pagination offset</span>
                                </div>
                                <div className="flex gap-4">
                                    <code className="text-primary">status</code>
                                    <span className="text-muted-foreground">Filter by status (active, inactive)</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Courses */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-blue-500/10 text-blue-500">GET</Badge>
                            <code className="text-sm">/courses</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            List all available courses
                        </p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-blue-500/10 text-blue-500">GET</Badge>
                            <code className="text-sm">/courses/:id</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Get course details including modules and lessons
                        </p>
                    </Card>

                    {/* Progress */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-blue-500/10 text-blue-500">GET</Badge>
                            <code className="text-sm">/users/:id/progress</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Get user's learning progress
                        </p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-amber-500/10 text-amber-500">PATCH</Badge>
                            <code className="text-sm">/users/:id/progress</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Update user's progress for a course
                        </p>
                    </Card>

                    {/* Analytics */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-blue-500/10 text-blue-500">GET</Badge>
                            <code className="text-sm">/analytics/overview</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Get organization-wide learning analytics
                        </p>
                    </Card>

                    {/* Webhooks */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-emerald-500/10 text-emerald-500">POST</Badge>
                            <code className="text-sm">/webhooks</code>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Register a webhook endpoint
                        </p>
                        <div>
                            <p className="text-sm font-medium mb-2">Available Events</p>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>• course.completed - User completes a course</p>
                                <p>• certificate.issued - Certificate is generated</p>
                                <p>• user.created - New user is registered</p>
                                <p>• quiz.passed - User passes a quiz</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Rate Limits */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Rate Limits</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-border">
                            <span>Standard API calls</span>
                            <span className="text-muted-foreground">1000 requests/minute</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                            <span>AI Generation</span>
                            <span className="text-muted-foreground">10 requests/minute</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Webhooks</span>
                            <span className="text-muted-foreground">100 requests/minute</span>
                        </div>
                    </div>
                </Card>

                {/* SDKs */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">SDKs</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { name: "JavaScript", desc: "npm install @zerog/sdk" },
                            { name: "Python", desc: "pip install zerog-sdk" },
                            { name: "Ruby", desc: "gem install zerog" },
                        ].map((sdk) => (
                            <div key={sdk.name} className="p-4 rounded-lg bg-muted/50">
                                <p className="font-medium mb-1">{sdk.name}</p>
                                <code className="text-xs text-muted-foreground">{sdk.desc}</code>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
