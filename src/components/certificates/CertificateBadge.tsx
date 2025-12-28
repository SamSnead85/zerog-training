"use client";

/**
 * Certificate Badge Components
 * 
 * Display components for digital credentials and badges
 * following Open Badges 2.0 standards.
 */

import { cn } from "@/lib/utils";
import {
    Award,
    Medal,
    Shield,
    Star,
    Calendar,
    ExternalLink,
    Download,
    Share2,
    CheckCircle2,
    Clock,
    Sparkles,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

interface Certificate {
    id: string;
    name: string;
    issueDate: string;
    expirationDate?: string;
    credentialId: string;
    recipientName: string;
    courseName: string;
    courseId: string;
    issuer: {
        name: string;
        logo?: string;
    };
    skills: string[];
    level: "foundation" | "professional" | "expert" | "master";
    status: "valid" | "expired" | "revoked";
    verificationUrl: string;
}

// =============================================================================
// CERTIFICATE CARD
// =============================================================================

interface CertificateCardProps {
    certificate: Certificate;
    className?: string;
    showActions?: boolean;
}

const levelConfig = {
    foundation: { color: "bg-emerald-500/20 text-emerald-400", icon: Shield, label: "Foundation" },
    professional: { color: "bg-blue-500/20 text-blue-400", icon: Award, label: "Professional" },
    expert: { color: "bg-purple-500/20 text-purple-400", icon: Medal, label: "Expert" },
    master: { color: "bg-amber-500/20 text-amber-400", icon: Star, label: "Master" },
};

const statusConfig = {
    valid: { color: "text-emerald-400", label: "Valid", icon: CheckCircle2 },
    expired: { color: "text-amber-400", label: "Expired", icon: Clock },
    revoked: { color: "text-red-400", label: "Revoked", icon: Shield },
};

export function CertificateCard({
    certificate,
    className,
    showActions = true
}: CertificateCardProps) {
    const level = levelConfig[certificate.level];
    const status = statusConfig[certificate.status];
    const LevelIcon = level.icon;
    const StatusIcon = status.icon;

    return (
        <div className={cn(
            "relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden",
            className
        )}>
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            level.color
                        )}>
                            <LevelIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <Badge className={level.color}>{level.label}</Badge>
                            <div className={cn("flex items-center gap-1 mt-1 text-xs", status.color)}>
                                <StatusIcon className="h-3 w-3" />
                                <span>{status.label}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                        <div>ID: {certificate.credentialId}</div>
                    </div>
                </div>

                {/* Certificate Name */}
                <h3 className="text-lg font-semibold mb-2">{certificate.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Awarded to <span className="text-foreground font-medium">{certificate.recipientName}</span>
                </p>

                {/* Course Info */}
                <div className="text-sm text-muted-foreground mb-4">
                    <Link
                        href={`/module/${certificate.courseId}`}
                        className="hover:text-primary transition-colors"
                    >
                        {certificate.courseName}
                    </Link>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                    </div>
                    {certificate.expirationDate && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Expires: {new Date(certificate.expirationDate).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {certificate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {certificate.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Actions */}
                {showActions && (
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                        <Link
                            href={certificate.verificationUrl}
                            target="_blank"
                            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// =============================================================================
// BADGE DISPLAY
// =============================================================================

interface BadgeDisplayProps {
    name: string;
    level: Certificate["level"];
    earned?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function BadgeDisplay({
    name,
    level,
    earned = false,
    size = "md",
    className
}: BadgeDisplayProps) {
    const config = levelConfig[level];
    const Icon = config.icon;

    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    };

    const iconSizes = {
        sm: "h-6 w-6",
        md: "h-10 w-10",
        lg: "h-14 w-14",
    };

    return (
        <div className={cn("flex flex-col items-center", className)}>
            <div className={cn(
                "relative rounded-full flex items-center justify-center",
                sizeClasses[size],
                earned ? config.color : "bg-white/5 opacity-50"
            )}>
                <Icon className={cn(iconSizes[size], earned ? "" : "text-muted-foreground")} />
                {earned && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                )}
                {!earned && (
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20" />
                )}
            </div>
            <span className={cn(
                "text-xs mt-2 text-center",
                earned ? "text-foreground" : "text-muted-foreground"
            )}>
                {name}
            </span>
        </div>
    );
}

// =============================================================================
// CREDENTIALS GRID
// =============================================================================

interface CredentialsGridProps {
    certificates: Certificate[];
    className?: string;
}

export function CredentialsGrid({ certificates, className }: CredentialsGridProps) {
    if (certificates.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Complete courses and assessments to earn professional certifications.
                </p>
                <Link
                    href="/library"
                    className="inline-flex items-center justify-center mt-4 h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Browse Courses
                </Link>
            </div>
        );
    }

    return (
        <div className={cn("grid gap-6 md:grid-cols-2", className)}>
            {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
            ))}
        </div>
    );
}

// =============================================================================
// CERTIFICATE PREVIEW (Mini version)
// =============================================================================

interface CertificatePreviewProps {
    name: string;
    level: Certificate["level"];
    issueDate: string;
    className?: string;
}

export function CertificatePreview({
    name,
    level,
    issueDate,
    className
}: CertificatePreviewProps) {
    const config = levelConfig[level];
    const Icon = config.icon;

    return (
        <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02]",
            className
        )}>
            <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                config.color
            )}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-xs text-muted-foreground">
                    Earned {new Date(issueDate).toLocaleDateString()}
                </p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
        </div>
    );
}

export default CertificateCard;
