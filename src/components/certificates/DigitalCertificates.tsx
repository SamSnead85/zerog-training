"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Award,
    Download,
    Share2,
    Calendar,
    CheckCircle2,
    ExternalLink,
    Eye,
    Linkedin,
    Mail,
    Copy,
    QrCode,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Certificate {
    id: string;
    courseName: string;
    regulation?: string;
    issuedAt: string;
    expiresAt?: string;
    credentialId: string;
    earnedBy: string;
    issuer: string;
    skills: string[];
    hours: number;
    status: "active" | "expired" | "revoked";
    verificationUrl: string;
}

const mockCertificates: Certificate[] = [
    {
        id: "1",
        courseName: "HIPAA Privacy & Security Professional",
        regulation: "HIPAA",
        issuedAt: "Dec 15, 2024",
        expiresAt: "Dec 15, 2025",
        credentialId: "ZEROG-HIPAA-2024-00847",
        earnedBy: "Sarah Chen",
        issuer: "ScaledNative",
        skills: ["PHI Protection", "Security Risk Assessment", "Breach Response"],
        hours: 8,
        status: "active",
        verificationUrl: "https://verify.scalednative.com/ZEROG-HIPAA-2024-00847",
    },
    {
        id: "2",
        courseName: "SOC 2 Security Awareness",
        regulation: "SOC2",
        issuedAt: "Nov 20, 2024",
        expiresAt: "Nov 20, 2025",
        credentialId: "ZEROG-SOC2-2024-00512",
        earnedBy: "Sarah Chen",
        issuer: "ScaledNative",
        skills: ["Security Controls", "Access Management", "Incident Response"],
        hours: 6,
        status: "active",
        verificationUrl: "https://verify.scalednative.com/ZEROG-SOC2-2024-00512",
    },
    {
        id: "3",
        courseName: "SAFe 6.0 Agilist Certification",
        issuedAt: "Oct 5, 2024",
        credentialId: "ZEROG-SAFE-2024-00234",
        earnedBy: "Sarah Chen",
        issuer: "ScaledNative",
        skills: ["Lean-Agile Leadership", "PI Planning", "Value Streams"],
        hours: 16,
        status: "active",
        verificationUrl: "https://verify.scalednative.com/ZEROG-SAFE-2024-00234",
    },
    {
        id: "4",
        courseName: "Cybersecurity Fundamentals",
        issuedAt: "Jun 10, 2023",
        expiresAt: "Jun 10, 2024",
        credentialId: "ZEROG-CYBER-2023-00089",
        earnedBy: "Sarah Chen",
        issuer: "ScaledNative",
        skills: ["Phishing Prevention", "Password Security", "Social Engineering"],
        hours: 4,
        status: "expired",
        verificationUrl: "https://verify.scalednative.com/ZEROG-CYBER-2023-00089",
    },
];

const statusConfig = {
    active: { label: "Active", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
    expired: { label: "Expired", color: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
    revoked: { label: "Revoked", color: "bg-red-500/20 text-red-500 border-red-500/30" },
};

export function DigitalCertificates() {
    const [certificates, setCertificates] = useState(mockCertificates);
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    const activeCerts = certificates.filter(c => c.status === "active");
    const expiredCerts = certificates.filter(c => c.status === "expired");

    const handleCopyLink = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Digital Certificates
                    </h2>
                    <p className="text-sm text-muted-foreground">Verifiable credentials and digital badges</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-500">{activeCerts.length}</div>
                    <div className="text-sm text-muted-foreground">Active Certificates</div>
                </Card>
                <Card className="p-4 border-amber-500/20">
                    <div className="text-2xl font-bold text-amber-500">{expiredCerts.length}</div>
                    <div className="text-sm text-muted-foreground">Need Renewal</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold">{certificates.reduce((acc, c) => acc + c.hours, 0)}</div>
                    <div className="text-sm text-muted-foreground">Total Hours Earned</div>
                </Card>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => {
                    const status = statusConfig[cert.status];

                    return (
                        <Card
                            key={cert.id}
                            className={cn(
                                "overflow-hidden transition-all",
                                cert.status === "active" && "border-emerald-500/20",
                                cert.status === "expired" && "border-amber-500/20 opacity-75"
                            )}
                        >
                            {/* Certificate Header */}
                            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-4 border-b border-border">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <Award className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{cert.courseName}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className={cn("text-xs", status.color)}>
                                                    {status.label}
                                                </Badge>
                                                {cert.regulation && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {cert.regulation}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Shield className="h-4 w-4 text-emerald-500" />
                                        <span className="text-xs text-emerald-500">Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Certificate Body */}
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <div className="text-muted-foreground text-xs">Issued</div>
                                        <div className="font-medium">{cert.issuedAt}</div>
                                    </div>
                                    {cert.expiresAt && (
                                        <div>
                                            <div className="text-muted-foreground text-xs">Expires</div>
                                            <div className="font-medium">{cert.expiresAt}</div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-muted-foreground text-xs">Credential ID</div>
                                        <div className="font-mono text-xs">{cert.credentialId}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-xs">Hours</div>
                                        <div className="font-medium">{cert.hours} hours</div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-4">
                                    <div className="text-muted-foreground text-xs mb-2">Skills Demonstrated</div>
                                    <div className="flex flex-wrap gap-1">
                                        {cert.skills.map((skill, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                                        <Download className="h-3 w-3" />
                                        PDF
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-1">
                                        <Linkedin className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-1">
                                        <Share2 className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1"
                                        onClick={() => handleCopyLink(cert.verificationUrl)}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Verification Note */}
            <Card className="p-4 bg-muted/50">
                <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                        <h4 className="font-medium mb-1">Verification</h4>
                        <p className="text-sm text-muted-foreground">
                            All certificates include a unique verification URL and QR code. Third parties can verify
                            the authenticity of any credential by visiting the verification link. Certificates comply
                            with Open Badges 2.0 standard for digital credentials.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
