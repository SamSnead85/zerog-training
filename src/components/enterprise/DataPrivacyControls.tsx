"use client";

/**
 * Data Privacy Controls Component
 * 
 * GDPR and data privacy management including
 * consent, data retention, and export/deletion.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Shield,
    Download,
    Trash2,
    Clock,
    FileText,
    CheckCircle,
    AlertTriangle,
    User,
    Database,
    Lock,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface DataRetentionPolicy {
    id: string;
    name: string;
    dataType: "user_data" | "learning_records" | "analytics" | "logs" | "audit";
    retentionDays: number;
    autoDelete: boolean;
    gdprLawfulBasis: "consent" | "contract" | "legal" | "legitimate_interest";
}

export interface DataRequest {
    id: string;
    userId: string;
    userEmail: string;
    type: "export" | "deletion" | "access";
    status: "pending" | "processing" | "completed" | "denied";
    createdAt: Date;
    completedAt?: Date;
    downloadUrl?: string;
}

interface DataPrivacyControlsProps {
    policies: DataRetentionPolicy[];
    requests: DataRequest[];
    onUpdatePolicy: (id: string, updates: Partial<DataRetentionPolicy>) => Promise<void>;
    onProcessRequest: (id: string, action: "approve" | "deny") => Promise<void>;
    onExportData: (userId: string) => Promise<string>;
    className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function DataPrivacyControls({
    policies,
    requests,
    onUpdatePolicy,
    onProcessRequest,
    onExportData,
    className,
}: DataPrivacyControlsProps) {
    const [activeTab, setActiveTab] = useState<"policies" | "requests">("policies");
    const [processing, setProcessing] = useState<string | null>(null);

    const pendingRequests = requests.filter((r) => r.status === "pending");

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Data Privacy & GDPR</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage data retention, consent, and privacy requests
                    </p>
                </div>
                {pendingRequests.length > 0 && (
                    <Badge className="bg-amber-500/20 text-amber-400">
                        {pendingRequests.length} pending requests
                    </Badge>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-lg bg-muted/30 w-fit">
                {[
                    { id: "policies", label: "Retention Policies" },
                    { id: "requests", label: "Data Requests" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={cn(
                            "px-4 py-2 text-sm rounded-md transition-colors",
                            activeTab === tab.id
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Policies Tab */}
            {activeTab === "policies" && (
                <div className="space-y-4">
                    {policies.map((policy) => (
                        <PolicyCard
                            key={policy.id}
                            policy={policy}
                            onUpdate={(updates) => onUpdatePolicy(policy.id, updates)}
                        />
                    ))}

                    {/* GDPR Summary */}
                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                        <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-medium mb-1">GDPR Compliance Status</p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                        Data retention policies configured
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                        Lawful basis documented
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                        Data subject request workflow enabled
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Requests Tab */}
            {activeTab === "requests" && (
                <div className="space-y-4">
                    {requests.length === 0 ? (
                        <div className="py-12 text-center border-2 border-dashed border-white/10 rounded-xl">
                            <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                            <p className="text-muted-foreground">No data requests</p>
                        </div>
                    ) : (
                        requests.map((request) => (
                            <RequestCard
                                key={request.id}
                                request={request}
                                onProcess={async (action) => {
                                    setProcessing(request.id);
                                    await onProcessRequest(request.id, action);
                                    setProcessing(null);
                                }}
                                processing={processing === request.id}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

// =============================================================================
// POLICY CARD
// =============================================================================

function PolicyCard({
    policy,
    onUpdate,
}: {
    policy: DataRetentionPolicy;
    onUpdate: (updates: Partial<DataRetentionPolicy>) => Promise<void>;
}) {
    const [editing, setEditing] = useState(false);
    const [days, setDays] = useState(policy.retentionDays);

    const dataTypeLabels: Record<string, { label: string; icon: React.ElementType }> = {
        user_data: { label: "User Data", icon: User },
        learning_records: { label: "Learning Records", icon: FileText },
        analytics: { label: "Analytics", icon: Database },
        logs: { label: "System Logs", icon: Clock },
        audit: { label: "Audit Trail", icon: Shield },
    };

    const typeInfo = dataTypeLabels[policy.dataType] || dataTypeLabels.user_data;
    const Icon = typeInfo.icon;

    const handleSave = async () => {
        await onUpdate({ retentionDays: days });
        setEditing(false);
    };

    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{policy.name}</p>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            {policy.gdprLawfulBasis.replace("_", " ")}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {typeInfo.label} • Retain for{" "}
                        {editing ? (
                            <input
                                type="number"
                                value={days}
                                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-0.5 rounded bg-muted border-0 text-center"
                                min={1}
                            />
                        ) : (
                            <span className="font-medium">{policy.retentionDays}</span>
                        )}{" "}
                        days
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Auto-delete:</span>
                        <button
                            onClick={() => onUpdate({ autoDelete: !policy.autoDelete })}
                            className={cn(
                                "w-9 h-5 rounded-full transition-colors relative",
                                policy.autoDelete ? "bg-primary" : "bg-muted"
                            )}
                        >
                            <span
                                className={cn(
                                    "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                                    policy.autoDelete ? "translate-x-4" : "translate-x-0.5"
                                )}
                            />
                        </button>
                    </div>

                    {editing ? (
                        <div className="flex gap-1">
                            <Button size="sm" onClick={handleSave}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                        </div>
                    ) : (
                        <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                            Edit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// REQUEST CARD
// =============================================================================

function RequestCard({
    request,
    onProcess,
    processing,
}: {
    request: DataRequest;
    onProcess: (action: "approve" | "deny") => Promise<void>;
    processing: boolean;
}) {
    const statusColors = {
        pending: "bg-amber-500/20 text-amber-400",
        processing: "bg-blue-500/20 text-blue-400",
        completed: "bg-emerald-500/20 text-emerald-400",
        denied: "bg-red-500/20 text-red-400",
    };

    const typeIcons = {
        export: Download,
        deletion: Trash2,
        access: FileText,
    };

    const Icon = typeIcons[request.type];

    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium capitalize">{request.type} Request</p>
                        <Badge className={statusColors[request.status]}>
                            {request.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {request.userEmail} • Requested {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {request.status === "pending" && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => onProcess("approve")}
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Approve"}
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onProcess("deny")}
                            disabled={processing}
                            className="text-red-400 hover:text-red-300"
                        >
                            Deny
                        </Button>
                    </div>
                )}

                {request.status === "completed" && request.downloadUrl && (
                    <a
                        href={request.downloadUrl}
                        download
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-muted transition-colors"
                    >
                        <Download className="h-3.5 w-3.5" />
                        Download
                    </a>
                )}
            </div>
        </div>
    );
}

export default DataPrivacyControls;
