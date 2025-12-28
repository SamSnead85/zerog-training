"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Building2,
    Users,
    Globe,
    Settings,
    Plus,
    Eye,
    BarChart3,
    Palette,
    Link2,
    ChevronRight,
    ExternalLink,
    Star
} from "lucide-react";
import { cn } from "@/lib/utils";

type PortalType = "customer" | "partner" | "reseller" | "franchise";
type PortalStatus = "active" | "inactive" | "setup";

interface ExtendedEnterprisePortal {
    id: string;
    name: string;
    type: PortalType;
    status: PortalStatus;
    domain: string;
    logo?: string;
    primaryColor: string;
    users: number;
    courses: number;
    completionRate: number;
    revenue?: number;
    lastActivity: string;
}

const typeConfig: Record<PortalType, { label: string; color: string; icon: React.ElementType }> = {
    customer: { label: "Customer", color: "bg-blue-500/20 text-blue-500", icon: Users },
    partner: { label: "Partner", color: "bg-purple-500/20 text-purple-500", icon: Building2 },
    reseller: { label: "Reseller", color: "bg-emerald-500/20 text-emerald-500", icon: Globe },
    franchise: { label: "Franchise", color: "bg-amber-500/20 text-amber-500", icon: Star },
};

const statusConfig: Record<PortalStatus, { label: string; color: string }> = {
    active: { label: "Active", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
    inactive: { label: "Inactive", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
    setup: { label: "Setup", color: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
};

const mockPortals: ExtendedEnterprisePortal[] = [
    { id: "1", name: "Acme Corp Training", type: "customer", status: "active", domain: "training.acmecorp.com", primaryColor: "#3B82F6", users: 1250, courses: 24, completionRate: 78, revenue: 15000, lastActivity: "2 hours ago" },
    { id: "2", name: "TechPartner Solutions", type: "partner", status: "active", domain: "learn.techpartner.io", primaryColor: "#8B5CF6", users: 890, courses: 18, completionRate: 82, revenue: 8500, lastActivity: "30 min ago" },
    { id: "3", name: "GlobalResell Inc", type: "reseller", status: "active", domain: "academy.globalresell.com", primaryColor: "#10B981", users: 2340, courses: 32, completionRate: 71, revenue: 24000, lastActivity: "1 hour ago" },
    { id: "4", name: "FastFood Franchise", type: "franchise", status: "setup", domain: "training.fastfood.net", primaryColor: "#F59E0B", users: 0, courses: 12, completionRate: 0, lastActivity: "Setting up..." },
    { id: "5", name: "HealthCare Network", type: "customer", status: "inactive", domain: "learn.healthcarenet.org", primaryColor: "#EF4444", users: 450, courses: 15, completionRate: 65, lastActivity: "2 weeks ago" },
];

export function ExtendedEnterprisePortals() {
    const [portals, setPortals] = useState(mockPortals);
    const [typeFilter, setTypeFilter] = useState<PortalType | "all">("all");

    const filtered = portals.filter(p => typeFilter === "all" || p.type === typeFilter);

    const activePortals = portals.filter(p => p.status === "active");
    const totalUsers = activePortals.reduce((acc, p) => acc + p.users, 0);
    const totalRevenue = activePortals.reduce((acc, p) => acc + (p.revenue || 0), 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Extended Enterprise
                    </h2>
                    <p className="text-sm text-muted-foreground">White-labeled training for customers, partners, and resellers</p>
                </div>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    New Portal
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-500">{activePortals.length}</div>
                    <div className="text-sm text-muted-foreground">Active Portals</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">External Users</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{activePortals.reduce((acc, p) => acc + p.courses, 0)}</div>
                    <div className="text-sm text-muted-foreground">Deployed Courses</div>
                </Card>
                <Card className="p-4 border-primary/20">
                    <div className="text-2xl font-bold text-primary">${(totalRevenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(["all", "customer", "partner", "reseller", "franchise"] as const).map((type) => (
                    <Button
                        key={type}
                        variant={typeFilter === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTypeFilter(type)}
                    >
                        {type === "all" ? "All Portals" : typeConfig[type].label}
                    </Button>
                ))}
            </div>

            {/* Portals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((portal) => {
                    const type = typeConfig[portal.type];
                    const status = statusConfig[portal.status];
                    const TypeIcon = type.icon;

                    return (
                        <Card key={portal.id} className={cn("overflow-hidden", portal.status === "inactive" && "opacity-60")}>
                            {/* Color Bar */}
                            <div className="h-2" style={{ backgroundColor: portal.primaryColor }} />

                            <div className="p-4">
                                <div className="flex items-start gap-3 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: portal.primaryColor }}
                                    >
                                        {portal.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold">{portal.name}</h4>
                                            <Badge variant="outline" className={cn("text-xs", status.color)}>
                                                {status.label}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={cn("text-xs", type.color)}>
                                                <TypeIcon className="h-3 w-3 mr-1" />
                                                {type.label}
                                            </Badge>
                                            <a href={`https://${portal.domain}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                                                {portal.domain}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {portal.status === "active" && (
                                    <>
                                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                                            <div>
                                                <div className="text-lg font-bold">{portal.users.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Users</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">{portal.courses}</div>
                                                <div className="text-xs text-muted-foreground">Courses</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">{portal.completionRate}%</div>
                                                <div className="text-xs text-muted-foreground">Completion</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                            <span>Last activity: {portal.lastActivity}</span>
                                            {portal.revenue && (
                                                <span className="text-primary font-medium">${portal.revenue.toLocaleString()}/mo</span>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                                        <Eye className="h-3 w-3" />
                                        Preview
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Palette className="h-3 w-3" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <BarChart3 className="h-3 w-3" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Settings className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
