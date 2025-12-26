"use client";

import { useState } from "react";
import { Button, Card, Badge } from "@/components/ui";
import {
    Award,
    Download,
    Share2,
    CheckCircle2,
    Calendar,
    Clock,
    Building2,
    QrCode,
    ExternalLink,
} from "lucide-react";

interface CertificateData {
    id: string;
    courseName: string;
    completedDate: string;
    duration: string;
    score?: number;
    instructor: string;
    credentialId: string;
    verificationUrl: string;
}

// Mock certificates
const certificates: CertificateData[] = [
    {
        id: "1",
        courseName: "SAFe Scrum Master Certification",
        completedDate: "December 20, 2024",
        duration: "8 hours",
        score: 92,
        instructor: "ZeroG Learning",
        credentialId: "ZEROG-SSM-2024-78429",
        verificationUrl: "https://zerog.ai/verify/78429",
    },
    {
        id: "2",
        courseName: "Leadership Fundamentals",
        completedDate: "December 15, 2024",
        duration: "6 hours",
        score: 88,
        instructor: "ZeroG Learning",
        credentialId: "ZEROG-LDR-2024-65821",
        verificationUrl: "https://zerog.ai/verify/65821",
    },
    {
        id: "3",
        courseName: "HIPAA Compliance Essentials",
        completedDate: "December 10, 2024",
        duration: "2 hours",
        score: 95,
        instructor: "ZeroG Learning",
        credentialId: "ZEROG-HIPAA-2024-42156",
        verificationUrl: "https://zerog.ai/verify/42156",
    },
];

export function CertificateCard({ certificate }: { certificate: CertificateData }) {
    const [showQR, setShowQR] = useState(false);

    return (
        <Card className="overflow-hidden">
            {/* Certificate Preview */}
            <div className="relative p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 border-b border-white/10">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                <div className="absolute top-4 right-4">
                    <Award className="h-12 w-12 text-primary/20" />
                </div>

                <div className="relative">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        Certificate of Completion
                    </p>
                    <h3 className="text-lg font-semibold mb-4">{certificate.courseName}</h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {certificate.completedDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {certificate.duration}
                        </span>
                    </div>

                    {certificate.score && (
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            Score: {certificate.score}%
                        </div>
                    )}
                </div>
            </div>

            {/* Certificate Details */}
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Credential ID</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{certificate.credentialId}</code>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Issued by</span>
                    <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {certificate.instructor}
                    </span>
                </div>

                {/* QR Code Section */}
                {showQR && (
                    <div className="p-4 bg-white rounded-lg text-center">
                        {/* Placeholder QR - in production use a real QR library */}
                        <div className="w-32 h-32 mx-auto bg-zinc-900 rounded-lg flex items-center justify-center mb-2">
                            <QrCode className="h-16 w-16 text-white" />
                        </div>
                        <p className="text-xs text-zinc-600">Scan to verify</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setShowQR(!showQR)}
                    >
                        <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Verification Link */}
                <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ExternalLink className="h-3 w-3" />
                    Verify this certificate online
                </a>
            </div>
        </Card>
    );
}

export function CertificateGallery() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">My Certificates</h2>
                    <p className="text-sm text-muted-foreground">
                        {certificates.length} certificates earned
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download All
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <CertificateCard key={cert.id} certificate={cert} />
                ))}
            </div>
        </div>
    );
}
