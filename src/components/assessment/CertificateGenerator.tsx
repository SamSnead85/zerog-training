"use client";

import { useState, useRef, useEffect } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Award,
    Download,
    Share2,
    Check,
    Calendar,
    Clock,
    Shield,
    ExternalLink,
    QrCode,
    Copy,
    Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CertificateData {
    certificateId: string;
    recipientName: string;
    courseTitle: string;
    issueDate: string;
    expiryDate?: string;
    score: number;
    completionTime: string;
    badgeType: string;
    issuerName: string;
    skills: string[];
    credentialUrl: string;
}

interface CertificateGeneratorProps {
    data: CertificateData;
    onDownload?: () => void;
    onShare?: (platform: string) => void;
}

export function CertificateGenerator({ data, onDownload, onShare }: CertificateGeneratorProps) {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(data.credentialUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(data.courseTitle)}&organizationId=0&issueYear=${new Date(data.issueDate).getFullYear()}&issueMonth=${new Date(data.issueDate).getMonth() + 1}&certUrl=${encodeURIComponent(data.credentialUrl)}`;
        window.open(linkedInUrl, '_blank');
        onShare?.('linkedin');
    };

    return (
        <div className="space-y-6">
            {/* Certificate Preview */}
            <div ref={certificateRef}>
                <Card className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] border border-amber-500/20">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-[url('/certificate-pattern.svg')] opacity-5" />
                    <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-500/30 m-6" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-500/30 m-6" />

                    <div className="relative p-12 text-center">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Shield className="h-8 w-8 text-amber-400" />
                                <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm">
                                    ScaledNative
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                                Certificate of Completion
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
                        </div>

                        {/* Recipient */}
                        <div className="mb-8">
                            <p className="text-muted-foreground mb-2">This certifies that</p>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                {data.recipientName}
                            </h2>
                        </div>

                        {/* Course */}
                        <div className="mb-8">
                            <p className="text-muted-foreground mb-2">has successfully completed</p>
                            <h3 className="text-2xl font-semibold text-amber-400">
                                {data.courseTitle}
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                with a score of <span className="text-white font-semibold">{data.score}%</span>
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {data.skills.map((skill, i) => (
                                <Badge key={i} variant="outline" className="border-amber-500/30 text-amber-400">
                                    {skill}
                                </Badge>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-8 border-t border-white/10">
                            <div className="text-left">
                                <p className="text-xs text-muted-foreground">Issue Date</p>
                                <p className="font-medium">{data.issueDate}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                                    <Award className="h-10 w-10 text-amber-400" />
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">Certificate ID</p>
                                <p className="font-mono text-sm">{data.certificateId}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Download & Share */}
                <Card className="p-5 bg-white/[0.02] border-white/10">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Download className="h-5 w-5 text-primary" />
                        Download Certificate
                    </h3>
                    <div className="flex gap-3">
                        <Button className="flex-1" onClick={onDownload}>
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            PNG
                        </Button>
                    </div>
                </Card>

                <Card className="p-5 bg-white/[0.02] border-white/10">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-primary" />
                        Share Achievement
                    </h3>
                    <div className="flex gap-3">
                        <Button onClick={handleLinkedIn} className="flex-1 bg-[#0077B5] hover:bg-[#0077B5]/90">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                        </Button>
                        <Button variant="outline" onClick={handleCopyLink} className="flex-1">
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copied ? "Copied!" : "Copy Link"}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Verification */}
            <Card className="p-5 bg-white/[0.02] border-white/10">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/20">
                        <Check className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-1">Verified Credential</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            This certificate is digitally verified and can be validated by employers and institutions.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                Valid until: {data.expiryDate || "No expiration"}
                            </span>
                            <a href={data.credentialUrl} target="_blank" className="flex items-center gap-1 text-primary hover:underline">
                                <ExternalLink className="h-4 w-4" />
                                Verify Credential
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:block p-4 bg-white rounded-xl">
                        <QrCode className="h-16 w-16 text-black" />
                    </div>
                </div>
            </Card>

            {/* Badge */}
            <Card className="p-5 bg-white/[0.02] border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/30 flex items-center justify-center border border-amber-500/30">
                        <Award className="h-10 w-10 text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">{data.badgeType}</h3>
                        <p className="text-sm text-muted-foreground">Digital Badge (Open Badges 2.0 Format)</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Add this badge to your professional profiles and email signature
                        </p>
                    </div>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Badge
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// Simplified Certificate Preview for listings
export function CertificateBadge({ data, size = "md" }: { data: CertificateData; size?: "sm" | "md" | "lg" }) {
    const sizes = {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-24 h-24"
    };

    return (
        <div className={cn(
            "rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/30 flex items-center justify-center border border-amber-500/30",
            sizes[size]
        )}>
            <Award className={cn(
                "text-amber-400",
                size === "sm" ? "h-6 w-6" : size === "md" ? "h-8 w-8" : "h-12 w-12"
            )} />
        </div>
    );
}
