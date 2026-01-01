"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, ExternalLink, Download, Shield } from "lucide-react";
import { Button, Card } from "@/components/ui";

interface Certificate {
    id: string;
    verificationCode: string;
    trackId: string;
    trackTitle: string;
    userName: string;
    issuedAt: string;
}

export default function MyCertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const res = await fetch("/api/learner/certificates");
            if (res.ok) {
                const data = await res.json();
                setCertificates(data.certificates || []);
            }
        } catch (error) {
            console.error("Failed to fetch certificates:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-pulse text-white/50">Loading certificates...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-10">
                <h1 className="text-3xl font-semibold mb-2">My Certificates</h1>
                <p className="text-white/50">
                    Your earned certifications and credentials
                </p>
            </div>

            {certificates.length === 0 ? (
                <Card className="p-12 text-center border-white/10 bg-white/[0.02]">
                    <div className="h-16 w-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-6">
                        <Award className="h-8 w-8 text-cyan-400/60" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No certificates yet</h2>
                    <p className="text-white/50 mb-6 max-w-md mx-auto">
                        Complete a certification track to earn your first certificate.
                        Certificates are issued when you complete all courses in a track.
                    </p>
                    <Link href="/learn/tracks">
                        <Button className="bg-white text-black hover:bg-white/90">
                            Browse Certification Tracks
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="space-y-4">
                    {certificates.map((cert) => (
                        <Card key={cert.id} className="p-6 border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
                                        <Award className="h-7 w-7 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{cert.trackTitle}</h3>
                                        <p className="text-white/50 text-sm mb-2">
                                            Issued to {cert.userName} on {formatDate(cert.issuedAt)}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-white/40">
                                            <Shield className="h-3.5 w-3.5" />
                                            <span>Verification: {cert.verificationCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/verify?code=${cert.verificationCode}`} target="_blank">
                                        <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            Verify
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                                        <Download className="h-4 w-4 mr-1" />
                                        PDF
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
