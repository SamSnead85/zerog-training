"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Building2,
    Users,
    Plus,
    Search,
    ChevronRight,
    Mail,
    Crown,
    CheckCircle2,
    ArrowLeft,
    Loader2,
    Send,
    UserPlus,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Organization {
    id: string;
    name: string;
    slug: string;
    industry?: string;
    tier: string;
    _count?: { users: number };
    createdAt: string;
}

interface Module {
    id: string;
    title: string;
    number: number;
}

type WizardStep = "details" | "admin" | "modules" | "review";

const AVAILABLE_MODULES: Module[] = [
    { id: "module-1", title: "AI Fundamentals for Developers", number: 1 },
    { id: "module-2", title: "RAG and Embeddings", number: 2 },
    { id: "module-3", title: "AI Agents and Agentic Workflows", number: 3 },
    { id: "module-4", title: "AI Security & Responsible AI", number: 4 },
    { id: "module-5", title: "AI in Production", number: 5 },
    { id: "module-6", title: "Generative AI Application Development", number: 6 },
    { id: "module-7", title: "AI Security Deep Dive", number: 7 },
    { id: "module-8", title: "Enterprise AI Architecture", number: 8 },
    { id: "module-9", title: "Production Deployment", number: 9 },
    { id: "module-10", title: "AI Leadership", number: 10 },
];

const TIER_OPTIONS = [
    { value: "STARTER", label: "Starter", desc: "Up to 10 users", color: "bg-slate-500/20 text-slate-300" },
    { value: "PROFESSIONAL", label: "Professional", desc: "Up to 50 users", color: "bg-blue-500/20 text-blue-300" },
    { value: "ENTERPRISE", label: "Enterprise", desc: "Unlimited users", color: "bg-purple-500/20 text-purple-300" },
];

const INDUSTRY_OPTIONS = [
    "Healthcare",
    "Financial Services",
    "Technology",
    "Manufacturing",
    "Retail",
    "Government",
    "Education",
    "Other",
];

export function OrganizationManagement() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState<WizardStep>("details");
    const [creating, setCreating] = useState(false);

    // Wizard form state
    const [orgName, setOrgName] = useState("");
    const [orgSlug, setOrgSlug] = useState("");
    const [orgIndustry, setOrgIndustry] = useState("");
    const [orgTier, setOrgTier] = useState("STARTER");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminName, setAdminName] = useState("");
    const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
    const [selectedModules, setSelectedModules] = useState<string[]>(["module-1", "module-2"]);

    // Fetch organizations on mount
    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const res = await fetch("/api/admin/organizations");
            const data = await res.json();
            if (data.success) {
                setOrganizations(data.organizations);
            }
        } catch (error) {
            console.error("Failed to fetch organizations:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .substring(0, 30);
    };

    const handleOrgNameChange = (name: string) => {
        setOrgName(name);
        setOrgSlug(generateSlug(name));
    };

    const handleCreateOrganization = async () => {
        setCreating(true);
        try {
            // Step 1: Create the organization
            const orgRes = await fetch("/api/admin/organizations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: orgName,
                    slug: orgSlug,
                    industry: orgIndustry,
                    tier: orgTier,
                }),
            });
            const orgData = await orgRes.json();

            if (!orgData.success) {
                throw new Error(orgData.error || "Failed to create organization");
            }

            const organizationId = orgData.organization.id;

            // Step 2: Create the admin user
            if (adminEmail && adminName) {
                const userRes = await fetch("/api/admin/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: adminEmail,
                        name: adminName,
                        role: "ORG_ADMIN",
                        organizationId,
                        sendWelcome: sendWelcomeEmail,
                    }),
                });
                const userData = await userRes.json();

                if (!userData.success) {
                    console.error("Failed to create admin user:", userData.error);
                }

                // Step 3: Assign modules to the admin
                if (userData.success && selectedModules.length > 0) {
                    await fetch("/api/admin/assignments", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userIds: [userData.user.id],
                            moduleIds: selectedModules,
                            sendNotification: false, // Already sent welcome email
                        }),
                    });
                }
            }

            // Reset and refresh
            resetWizard();
            await fetchOrganizations();
        } catch (error) {
            console.error("Error creating organization:", error);
            alert(error instanceof Error ? error.message : "Failed to create organization");
        } finally {
            setCreating(false);
        }
    };

    const resetWizard = () => {
        setShowWizard(false);
        setWizardStep("details");
        setOrgName("");
        setOrgSlug("");
        setOrgIndustry("");
        setOrgTier("STARTER");
        setAdminEmail("");
        setAdminName("");
        setSendWelcomeEmail(true);
        setSelectedModules(["module-1", "module-2"]);
    };

    const toggleModule = (moduleId: string) => {
        setSelectedModules((prev) =>
            prev.includes(moduleId)
                ? prev.filter((id) => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const filteredOrgs = organizations.filter(
        (org) =>
            org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Wizard step navigation
    const canProceed = () => {
        switch (wizardStep) {
            case "details":
                return orgName.length >= 2 && orgSlug.length >= 2;
            case "admin":
                return adminEmail.includes("@") && adminName.length >= 2;
            case "modules":
                return selectedModules.length > 0;
            case "review":
                return true;
            default:
                return false;
        }
    };

    const nextStep = () => {
        const steps: WizardStep[] = ["details", "admin", "modules", "review"];
        const currentIndex = steps.indexOf(wizardStep);
        if (currentIndex < steps.length - 1) {
            setWizardStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps: WizardStep[] = ["details", "admin", "modules", "review"];
        const currentIndex = steps.indexOf(wizardStep);
        if (currentIndex > 0) {
            setWizardStep(steps[currentIndex - 1]);
        }
    };

    // Wizard UI
    if (showWizard) {
        return (
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Wizard Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowWizard(false)}
                        className="hover:bg-white/10"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Create Organization</h1>
                        <p className="text-muted-foreground">Set up a new client organization</p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2">
                    {(["details", "admin", "modules", "review"] as WizardStep[]).map((step, i) => (
                        <div key={step} className="flex items-center flex-1">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                                    wizardStep === step
                                        ? "bg-slate-600 text-white"
                                        : ["details", "admin", "modules", "review"].indexOf(wizardStep) > i
                                            ? "bg-emerald-500/30 text-emerald-400"
                                            : "bg-white/10 text-muted-foreground"
                                )}
                            >
                                {["details", "admin", "modules", "review"].indexOf(wizardStep) > i ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                    i + 1
                                )}
                            </div>
                            {i < 3 && (
                                <div
                                    className={cn(
                                        "flex-1 h-0.5 mx-2",
                                        ["details", "admin", "modules", "review"].indexOf(wizardStep) > i
                                            ? "bg-emerald-500/30"
                                            : "bg-white/10"
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <Card className="p-6 bg-white/[0.02] border-white/10">
                    {wizardStep === "details" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-white">Organization Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Organization Name *</label>
                                    <input
                                        type="text"
                                        value={orgName}
                                        onChange={(e) => handleOrgNameChange(e.target.value)}
                                        placeholder="HealthPlan Services"
                                        className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">URL Slug *</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">scalednative.com/org/</span>
                                        <input
                                            type="text"
                                            value={orgSlug}
                                            onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                            placeholder="healthplan-services"
                                            className="flex-1 h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Industry</label>
                                    <select
                                        value={orgIndustry}
                                        onChange={(e) => setOrgIndustry(e.target.value)}
                                        className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    >
                                        <option value="">Select industry...</option>
                                        {INDUSTRY_OPTIONS.map((ind) => (
                                            <option key={ind} value={ind}>{ind}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-3">Subscription Tier *</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {TIER_OPTIONS.map((tier) => (
                                            <button
                                                key={tier.value}
                                                onClick={() => setOrgTier(tier.value)}
                                                className={cn(
                                                    "p-4 rounded-xl border text-left transition-all",
                                                    orgTier === tier.value
                                                        ? "border-slate-500 bg-slate-500/20"
                                                        : "border-white/10 hover:border-white/20"
                                                )}
                                            >
                                                <p className="font-medium text-white">{tier.label}</p>
                                                <p className="text-sm text-muted-foreground">{tier.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {wizardStep === "admin" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-white">Organization Admin</h2>
                            <p className="text-muted-foreground">
                                This person will manage users and training for this organization.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Admin Name *</label>
                                    <input
                                        type="text"
                                        value={adminName}
                                        onChange={(e) => setAdminName(e.target.value)}
                                        placeholder="John Smith"
                                        className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Admin Email *</label>
                                    <input
                                        type="email"
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                        placeholder="admin@healthplan-services.com"
                                        className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <input
                                        type="checkbox"
                                        id="sendWelcome"
                                        checked={sendWelcomeEmail}
                                        onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                                        className="w-5 h-5 rounded"
                                    />
                                    <label htmlFor="sendWelcome" className="flex-1">
                                        <p className="font-medium text-white">Send Welcome Email</p>
                                        <p className="text-sm text-muted-foreground">
                                            Admin will receive login credentials via email
                                        </p>
                                    </label>
                                    <Mail className="h-5 w-5 text-blue-400" />
                                </div>
                            </div>
                        </div>
                    )}

                    {wizardStep === "modules" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-white">Initial Training Modules</h2>
                            <p className="text-muted-foreground">
                                Select modules to include for this organization.
                            </p>

                            <div className="space-y-2">
                                {AVAILABLE_MODULES.map((mod) => (
                                    <button
                                        key={mod.id}
                                        onClick={() => toggleModule(mod.id)}
                                        className={cn(
                                            "w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all",
                                            selectedModules.includes(mod.id)
                                                ? "border-emerald-500/50 bg-emerald-500/10"
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold",
                                                selectedModules.includes(mod.id)
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-white/10 text-muted-foreground"
                                            )}
                                        >
                                            {selectedModules.includes(mod.id) ? <CheckCircle2 className="h-4 w-4" /> : mod.number}
                                        </div>
                                        <span className="text-white">{mod.title}</span>
                                    </button>
                                ))}
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {selectedModules.length} module(s) selected
                            </p>
                        </div>
                    )}

                    {wizardStep === "review" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-white">Review & Confirm</h2>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Building2 className="h-5 w-5 text-slate-400" />
                                        <span className="font-medium text-white">Organization</span>
                                    </div>
                                    <div className="pl-8 space-y-1 text-sm">
                                        <p><span className="text-muted-foreground">Name:</span> {orgName}</p>
                                        <p><span className="text-muted-foreground">Slug:</span> {orgSlug}</p>
                                        <p><span className="text-muted-foreground">Industry:</span> {orgIndustry || "Not specified"}</p>
                                        <p><span className="text-muted-foreground">Tier:</span> {orgTier}</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Crown className="h-5 w-5 text-amber-400" />
                                        <span className="font-medium text-white">Organization Admin</span>
                                    </div>
                                    <div className="pl-8 space-y-1 text-sm">
                                        <p><span className="text-muted-foreground">Name:</span> {adminName}</p>
                                        <p><span className="text-muted-foreground">Email:</span> {adminEmail}</p>
                                        <p><span className="text-muted-foreground">Welcome Email:</span> {sendWelcomeEmail ? "Yes" : "No"}</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <BookOpen className="h-5 w-5 text-blue-400" />
                                        <span className="font-medium text-white">Training Modules ({selectedModules.length})</span>
                                    </div>
                                    <div className="pl-8 text-sm text-muted-foreground">
                                        {selectedModules.map((id) => {
                                            const mod = AVAILABLE_MODULES.find((m) => m.id === id);
                                            return mod ? <p key={id}>• {mod.title}</p> : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={wizardStep === "details" ? resetWizard : prevStep}
                        className="border-white/10"
                    >
                        {wizardStep === "details" ? "Cancel" : "Back"}
                    </Button>

                    {wizardStep === "review" ? (
                        <Button
                            onClick={handleCreateOrganization}
                            disabled={creating}
                            className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
                        >
                            {creating ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Create Organization
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700"
                        >
                            Continue
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // Organization List UI
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Organizations</h1>
                    <p className="text-muted-foreground">Manage client organizations and their users</p>
                </div>
                <Button
                    onClick={() => setShowWizard(true)}
                    className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600"
                >
                    <Plus className="h-4 w-4" />
                    Create Organization
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search organizations..."
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                />
            </div>

            {/* Organization List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredOrgs.length === 0 ? (
                <Card className="p-12 bg-white/[0.02] border-white/10 text-center">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No organizations yet</h3>
                    <p className="text-muted-foreground mb-6">Create your first organization to get started</p>
                    <Button
                        onClick={() => setShowWizard(true)}
                        className="gap-2 bg-gradient-to-r from-slate-600 to-slate-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create Organization
                    </Button>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredOrgs.map((org) => (
                        <Card
                            key={org.id}
                            className="p-5 bg-white/[0.02] border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold text-white text-lg">{org.name}</h3>
                                        <Badge
                                            className={cn(
                                                org.tier === "ENTERPRISE"
                                                    ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                                                    : org.tier === "PROFESSIONAL"
                                                        ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                                        : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                                            )}
                                        >
                                            {org.tier}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4" />
                                            {org._count?.users || 0} users
                                        </span>
                                        {org.industry && <span>{org.industry}</span>}
                                        <span>/{org.slug}</span>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
