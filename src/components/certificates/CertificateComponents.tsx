"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Award,
    Download,
    Share2,
    Linkedin,
    Twitter,
    Link,
    Check,
    Calendar,
    Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateData {
    id: string;
    recipientName: string;
    courseName: string;
    trackName: string;
    completedAt: string;
    credentialId: string;
    expiresAt?: string;
    skills: string[];
}

// Certificate display card
export function CertificateCard({
    certificate,
    onDownload,
    onShare,
}: {
    certificate: CertificateData;
    onDownload?: () => void;
    onShare?: () => void;
}) {
    return (
        <Card className="overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20">
            {/* Certificate preview */}
            <div className="p-8 text-center border-b border-amber-500/10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                </div>
                <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Credential
                </Badge>
                <h3 className="text-xl font-bold mb-2">{certificate.courseName}</h3>
                <p className="text-white/60 mb-4">{certificate.trackName}</p>
                <p className="font-semibold text-lg">{certificate.recipientName}</p>
            </div>

            {/* Certificate details */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-white/40 mb-1">Issued</p>
                        <p className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(certificate.completedAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-white/40 mb-1">Credential ID</p>
                        <p className="text-sm font-mono">{certificate.credentialId}</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                    <p className="text-xs text-white/40 mb-2">Verified Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, i) => (
                            <Badge key={i} className="bg-white/10 text-white/70 text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button className="flex-1 gap-2" onClick={onDownload}>
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                    <Button variant="outline" onClick={onShare}>
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

// Share certificate modal
export function ShareCertificateModal({
    open,
    certificate,
    onClose,
}: {
    open: boolean;
    certificate: CertificateData;
    onClose: () => void;
}) {
    const [copied, setCopied] = useState(false);

    const verifyUrl = `https://scalednative.com/verify/${certificate.credentialId}`;

    const shareText = `I just earned my ${certificate.courseName} certification from ScaledNative! 🎉`;

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(verifyUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLinkedIn = () => {
        const url = encodeURIComponent(verifyUrl);
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            '_blank'
        );
    };

    const handleTwitter = () => {
        const text = encodeURIComponent(shareText);
        const url = encodeURIComponent(verifyUrl);
        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            '_blank'
        );
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 bg-black/95 border-white/10">
                <h3 className="text-lg font-semibold mb-4">Share Your Achievement</h3>

                {/* Share buttons */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={handleLinkedIn}
                        className="flex-1 p-4 rounded-xl bg-[#0077B5]/20 hover:bg-[#0077B5]/30 transition-colors flex flex-col items-center gap-2"
                    >
                        <Linkedin className="h-6 w-6 text-[#0077B5]" />
                        <span className="text-sm">LinkedIn</span>
                    </button>
                    <button
                        onClick={handleTwitter}
                        className="flex-1 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center gap-2"
                    >
                        <Twitter className="h-6 w-6" />
                        <span className="text-sm">Twitter</span>
                    </button>
                </div>

                {/* Copy link */}
                <div className="mb-6">
                    <p className="text-sm text-white/50 mb-2">Or copy verification link</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={verifyUrl}
                            readOnly
                            className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 text-sm"
                        />
                        <Button onClick={handleCopyLink}>
                            {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                <Button variant="outline" className="w-full" onClick={onClose}>
                    Close
                </Button>
            </Card>
        </div>
    );
}

// Certificate gallery
export function CertificateGallery({
    certificates,
}: {
    certificates: CertificateData[];
}) {
    if (certificates.length === 0) {
        return (
            <Card className="p-8 bg-white/[0.02] border-white/10 text-center">
                <Award className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-white/50 text-sm mb-4">
                    Complete courses to earn verifiable credentials
                </p>
                <Button>Browse Courses</Button>
            </Card>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
                <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    onDownload={() => console.log('Download', cert.id)}
                    onShare={() => console.log('Share', cert.id)}
                />
            ))}
        </div>
    );
}

// Verification result component
export function CertificateVerification({
    verified,
    certificate,
}: {
    verified: boolean;
    certificate?: CertificateData;
}) {
    return (
        <Card className={cn(
            "p-8 text-center",
            verified
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-red-500/10 border-red-500/20"
        )}>
            <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                verified ? "bg-emerald-500/20" : "bg-red-500/20"
            )}>
                {verified ? (
                    <Check className="h-8 w-8 text-emerald-400" />
                ) : (
                    <span className="text-2xl">✗</span>
                )}
            </div>

            <h2 className={cn(
                "text-xl font-bold mb-2",
                verified ? "text-emerald-400" : "text-red-400"
            )}>
                {verified ? "Certificate Verified" : "Certificate Not Found"}
            </h2>

            {verified && certificate && (
                <>
                    <p className="text-white/60 mb-4">
                        This is a valid ScaledNative credential
                    </p>
                    <div className="p-4 rounded-xl bg-white/5 text-left max-w-sm mx-auto">
                        <p className="text-sm"><strong>Recipient:</strong> {certificate.recipientName}</p>
                        <p className="text-sm"><strong>Course:</strong> {certificate.courseName}</p>
                        <p className="text-sm"><strong>Issued:</strong> {new Date(certificate.completedAt).toLocaleDateString()}</p>
                    </div>
                </>
            )}

            {!verified && (
                <p className="text-white/60">
                    We couldn't find a certificate with this credential ID.
                    Please check the ID and try again.
                </p>
            )}
        </Card>
    );
}
