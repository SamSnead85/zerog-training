"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Package,
    Download,
    BarChart3,
    Code2,
    Paintbrush,
    Building2,
    ChevronRight,
    Sparkles,
    Users,
    Shield,
    Zap,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BulkModuleCreator } from "@/components/enterprise/BulkModuleCreator";
import { SCORMExporter } from "@/components/enterprise/SCORMExporter";
import { AnalyticsDashboard } from "@/components/enterprise/AnalyticsDashboard";
import { APIDocumentation } from "@/components/enterprise/APIDocumentation";

type EnterpriseFeature = "bulk" | "export" | "analytics" | "api" | "brand" | null;

const enterpriseFeatures = [
    {
        id: "bulk" as const,
        title: "Bulk Module Creator",
        description: "Create multiple training modules from CSV or templates",
        icon: Package,
        color: "from-blue-500/20 to-cyan-500/10",
        iconColor: "text-blue-500",
        badge: "Popular",
    },
    {
        id: "export" as const,
        title: "SCORM/xAPI Export",
        description: "Export to SCORM 1.2, 2004, or xAPI for your LMS",
        icon: Download,
        color: "from-emerald-500/20 to-teal-500/10",
        iconColor: "text-emerald-500",
    },
    {
        id: "analytics" as const,
        title: "Analytics & ROI",
        description: "Track training performance and calculate ROI",
        icon: BarChart3,
        color: "from-purple-500/20 to-violet-500/10",
        iconColor: "text-purple-500",
        badge: "Enhanced",
    },
    {
        id: "api" as const,
        title: "API & Integrations",
        description: "REST API and webhook integrations",
        icon: Code2,
        color: "from-amber-500/20 to-orange-500/10",
        iconColor: "text-amber-500",
    },
    {
        id: "brand" as const,
        title: "Brand Customization",
        description: "White-label with your company branding",
        icon: Paintbrush,
        color: "from-pink-500/20 to-rose-500/10",
        iconColor: "text-pink-500",
        badge: "Coming Soon",
    },
];

const enterpriseStats = [
    { label: "Modules Created", value: "2,847", icon: Package },
    { label: "Active Learners", value: "12,543", icon: Users },
    { label: "Compliance Rate", value: "94.2%", icon: Shield },
    { label: "API Calls Today", value: "8.4K", icon: Zap },
];

export default function EnterprisePage() {
    const [activeFeature, setActiveFeature] = useState<EnterpriseFeature>(null);

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case "bulk":
                return <BulkModuleCreator />;
            case "export":
                return <SCORMExporter />;
            case "analytics":
                return <AnalyticsDashboard />;
            case "api":
                return <APIDocumentation />;
            case "brand":
                return (
                    <Card className="p-8 text-center">
                        <Paintbrush className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Brand Customization</h3>
                        <p className="text-muted-foreground mb-4">
                            White-label and custom branding options are coming soon.
                        </p>
                        <Button variant="outline">Join Waitlist</Button>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Enterprise Hub</h1>
                        <p className="text-sm text-muted-foreground">
                            Advanced features for enterprise training management
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {enterpriseStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Feature Navigation */}
            {!activeFeature && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {enterpriseFeatures.map((feature) => {
                        const Icon = feature.icon;
                        const isDisabled = feature.badge === "Coming Soon";

                        return (
                            <Card
                                key={feature.id}
                                className={cn(
                                    "p-6 cursor-pointer transition-all group relative overflow-hidden",
                                    isDisabled
                                        ? "opacity-60 cursor-not-allowed"
                                        : "hover:border-primary/30 hover:shadow-lg"
                                )}
                                onClick={() => !isDisabled && setActiveFeature(feature.id)}
                            >
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                                    feature.color
                                )} />

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center",
                                            `bg-${feature.iconColor.replace("text-", "")}/10`
                                        )}>
                                            <Icon className={cn("h-6 w-6", feature.iconColor)} />
                                        </div>
                                        {feature.badge && (
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-xs",
                                                    feature.badge === "Coming Soon" && "border-muted-foreground/30"
                                                )}
                                            >
                                                {feature.badge}
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>

                                    {!isDisabled && (
                                        <div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
                                            Open <ChevronRight className="h-4 w-4 ml-1" />
                                        </div>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Active Feature Content */}
            {activeFeature && (
                <div>
                    <Button
                        variant="ghost"
                        className="mb-4 gap-1"
                        onClick={() => setActiveFeature(null)}
                    >
                        ← Back to Enterprise Hub
                    </Button>
                    {renderFeatureContent()}
                </div>
            )}

            {/* Enterprise Benefits */}
            {!activeFeature && (
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/0">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold mb-2">Upgrade to Enterprise</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get unlimited modules, priority AI generation, SSO, and dedicated support.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {["Unlimited Modules", "Priority AI", "SSO/SAML", "Dedicated CSM", "SLA Guarantee"].map((benefit) => (
                                    <div key={benefit} className="flex items-center gap-1 text-xs">
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                            <Button>Contact Sales</Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
