"use client";

import { useRef, useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import {
    Award,
    Download,
    Share2,
    Printer,
    Linkedin,
    Copy,
    Check,
    Shield,
    Calendar,
    ExternalLink,
    Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/brand/Logo";

// =============================================================================
// TYPES
// =============================================================================

export interface PremiumCertificateData {
    certificateId: string;
    recipientName: string;
    trackName: string; // e.g., "AI-Native Foundation"
    certificationTitle: string; // e.g., "ScaledNative Certified AI-Native Professional"
    issueDate: string;
    expiryDate?: string;
    completionScore?: number;
    totalHours: number;
    modulesCompleted: number;
    skills: string[];
    credentialUrl: string;
    organizationName?: string;
}

interface PremiumCertificateProps {
    data: PremiumCertificateData;
    onClose?: () => void;
}

// =============================================================================
// PREMIUM CERTIFICATE COMPONENT
// =============================================================================

export function PremiumCertificate({ data, onClose }: PremiumCertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = async () => {
        setDownloading(true);
        try {
            // Dynamic import for PDF generation (only loaded when needed)
            const html2canvas = (await import("html2canvas")).default;
            const { jsPDF } = await import("jspdf");

            if (certificateRef.current) {
                const canvas = await html2canvas(certificateRef.current, {
                    scale: 2,
                    backgroundColor: "#0a0a0a",
                    useCORS: true,
                });

                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: [canvas.width, canvas.height],
                });

                pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
                pdf.save(`${data.recipientName.replace(/\s+/g, "_")}_Certificate.pdf`);
            }
        } catch (error) {
            console.error("PDF generation failed:", error);
            // Fallback to print
            handlePrint();
        }
        setDownloading(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(data.credentialUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(data.certificationTitle)}&organizationName=${encodeURIComponent("ScaledNative")}&issueYear=${new Date(data.issueDate).getFullYear()}&issueMonth=${new Date(data.issueDate).getMonth() + 1}&certUrl=${encodeURIComponent(data.credentialUrl)}`;
        window.open(linkedInUrl, "_blank");
    };

    const formattedDate = new Date(data.issueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-black/95 py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                        <Award className="h-5 w-5 text-amber-400" />
                        <span className="text-amber-400 font-medium">Congratulations!</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        You've Earned Your Certification
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Your dedication and hard work have paid off. Download or share your certificate below.
                    </p>
                </div>

                {/* Premium Certificate Card */}
                <div
                    ref={certificateRef}
                    className="print:block"
                    id="certificate-content"
                >
                    <Card className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111118] to-[#0a0a0a] border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10">
                        {/* Elegant Corner Decorations */}
                        <div className="absolute top-0 left-0 w-40 h-40">
                            <div className="absolute top-8 left-8 w-24 h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
                            <div className="absolute top-8 left-8 w-0.5 h-24 bg-gradient-to-b from-amber-400 to-transparent" />
                        </div>
                        <div className="absolute top-0 right-0 w-40 h-40">
                            <div className="absolute top-8 right-8 w-24 h-0.5 bg-gradient-to-l from-amber-400 to-transparent" />
                            <div className="absolute top-8 right-8 w-0.5 h-24 bg-gradient-to-b from-amber-400 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-40 h-40">
                            <div className="absolute bottom-8 left-8 w-24 h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
                            <div className="absolute bottom-8 left-8 w-0.5 h-24 bg-gradient-to-t from-amber-400 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-40 h-40">
                            <div className="absolute bottom-8 right-8 w-24 h-0.5 bg-gradient-to-l from-amber-400 to-transparent" />
                            <div className="absolute bottom-8 right-8 w-0.5 h-24 bg-gradient-to-t from-amber-400 to-transparent" />
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0%,transparent_50%)]" />
                        </div>

                        {/* Certificate Content */}
                        <div className="relative px-8 py-12 md:px-16 md:py-16 text-center">
                            {/* Logo & Branding */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <LogoIcon size={48} />
                                <div className="text-left">
                                    <span className="text-2xl font-semibold text-white tracking-tight">
                                        Scaled<span className="text-cyan-400">Native</span>
                                    </span>
                                    <p className="text-xs text-muted-foreground tracking-widest uppercase">
                                        Professional Training
                                    </p>
                                </div>
                            </div>

                            {/* Certificate Type */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                                    Certificate of Achievement
                                </h2>
                                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
                            </div>

                            {/* Recipient */}
                            <div className="mb-8">
                                <p className="text-muted-foreground mb-2 text-lg">This is to certify that</p>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent py-2">
                                    {data.recipientName}
                                </h3>
                            </div>

                            {/* Achievement */}
                            <div className="mb-8">
                                <p className="text-muted-foreground mb-3 text-lg">
                                    has successfully completed all requirements and is hereby awarded
                                </p>
                                <h4 className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">
                                    {data.certificationTitle}
                                </h4>
                                <p className="text-white/80 text-lg">
                                    {data.trackName}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-white">{data.modulesCompleted}</p>
                                    <p className="text-sm text-muted-foreground">Modules Completed</p>
                                </div>
                                <div className="w-px h-12 bg-white/20 hidden md:block" />
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-white">{data.totalHours}h</p>
                                    <p className="text-sm text-muted-foreground">Learning Hours</p>
                                </div>
                                {data.completionScore && (
                                    <>
                                        <div className="w-px h-12 bg-white/20 hidden md:block" />
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-white">{data.completionScore}%</p>
                                            <p className="text-sm text-muted-foreground">Assessment Score</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap justify-center gap-2 mb-10">
                                {data.skills.slice(0, 6).map((skill, i) => (
                                    <Badge
                                        key={i}
                                        variant="outline"
                                        className="border-amber-500/30 text-amber-400/90 bg-amber-500/5 px-3 py-1"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            {/* Footer with Seal */}
                            <div className="flex items-center justify-between pt-8 border-t border-white/10">
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Issue Date</p>
                                    <p className="font-semibold text-white">{formattedDate}</p>
                                    {data.expiryDate && (
                                        <>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">Valid Until</p>
                                            <p className="font-semibold text-white">{data.expiryDate}</p>
                                        </>
                                    )}
                                </div>

                                {/* Official Seal */}
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 border border-amber-500/50 flex items-center justify-center">
                                            <Award className="h-10 w-10 text-amber-400" />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500/90 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                        Certified
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Certificate ID</p>
                                    <p className="font-mono text-sm text-white">{data.certificateId}</p>
                                    {data.organizationName && (
                                        <>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">Organization</p>
                                            <p className="font-semibold text-white">{data.organizationName}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Download className="h-5 w-5 text-primary" />
                            Download Certificate
                        </h3>
                        <div className="flex gap-3">
                            <Button
                                className="flex-1"
                                onClick={handleDownloadPDF}
                                disabled={downloading}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {downloading ? "Generating..." : "Download PDF"}
                            </Button>
                            <Button variant="outline" className="flex-1" onClick={handlePrint}>
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white/[0.02] border-white/10">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-primary" />
                            Share Achievement
                        </h3>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleLinkedIn}
                                className="flex-1 bg-[#0077B5] hover:bg-[#0077B5]/90"
                            >
                                <Linkedin className="h-4 w-4 mr-2" />
                                Add to LinkedIn
                            </Button>
                            <Button variant="outline" onClick={handleCopyLink} className="flex-1">
                                {copied ? (
                                    <Check className="h-4 w-4 mr-2" />
                                ) : (
                                    <Copy className="h-4 w-4 mr-2" />
                                )}
                                {copied ? "Copied!" : "Copy Link"}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Verification */}
                <Card className="p-6 bg-white/[0.02] border-white/10">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/20">
                            <Shield className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold mb-1">Verified Credential</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                This certificate is digitally signed and can be verified by employers,
                                educational institutions, and clients. The credential is stored securely
                                and remains valid for the duration specified.
                            </p>
                            <div className="flex items-center gap-4 text-sm flex-wrap">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    Issued: {formattedDate}
                                </span>
                                <a
                                    href={data.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary hover:underline"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Verify Credential
                                </a>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Close/Continue Button */}
                {onClose && (
                    <div className="text-center">
                        <Button variant="outline" size="lg" onClick={onClose}>
                            Continue to Dashboard
                        </Button>
                    </div>
                )}
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #certificate-content,
                    #certificate-content * {
                        visibility: visible;
                    }
                    #certificate-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

// =============================================================================
// CERTIFICATE PREVIEW (For listings/dashboard)
// =============================================================================

export function CertificatePreviewCard({
    data,
    onView,
}: {
    data: PremiumCertificateData;
    onView?: () => void;
}) {
    return (
        <Card
            className="overflow-hidden cursor-pointer hover:border-amber-500/40 transition-all group"
            onClick={onView}
        >
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Award className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{data.certificationTitle}</h3>
                        <p className="text-sm text-muted-foreground">{data.trackName}</p>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Issued {data.issueDate}</span>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                    </Badge>
                </div>
            </div>
        </Card>
    );
}
