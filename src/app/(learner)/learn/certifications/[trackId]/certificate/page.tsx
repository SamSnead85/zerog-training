"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { Download, Share2, Linkedin, Twitter, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface CertificateData {
    id: string;
    recipientName: string;
    trackName: string;
    courseName: string;
    completionDate: string;
    score: number;
}

// Mock data - in production would fetch from database
const certificateData: Record<string, CertificateData> = {
    "native-practitioner": {
        id: "CERT-NP-2024-001",
        recipientName: "John Doe",
        trackName: "AI-Native Practitioner",
        courseName: "Modules 1-4 Complete",
        completionDate: "January 1, 2026",
        score: 92,
    },
    "ai-engineer": {
        id: "CERT-AE-2024-001",
        recipientName: "John Doe",
        trackName: "AI Engineer Professional",
        courseName: "Modules 3-5 Complete",
        completionDate: "January 1, 2026",
        score: 88,
    },
};

export default function CertificatePage() {
    const params = useParams();
    const router = useRouter();
    const trackId = params.trackId as string;
    const [certificate, setCertificate] = useState<CertificateData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setCertificate(certificateData[trackId] || null);
            setIsLoading(false);
        }, 500);
    }, [trackId]);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="animate-pulse">
                    <div className="h-[450px] bg-muted rounded-lg" />
                </div>
            </div>
        );
    }

    if (!certificate) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    Complete the certification exam to earn your certificate.
                </p>
                <Link href={`/learn/tracks/${trackId}`}>
                    <Button>Go to Track</Button>
                </Link>
            </div>
        );
    }

    const shareToLinkedIn = () => {
        const text = encodeURIComponent(
            `I just earned my ${certificate.trackName} certification from ScaledNative! 🎉 #AITraining #CareerGrowth`
        );
        const url = encodeURIComponent(`https://scalednative.com/verify/${certificate.id}`);
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            "_blank"
        );
    };

    const shareToTwitter = () => {
        const text = encodeURIComponent(
            `Just earned my ${certificate.trackName} certification from @ScaledNative! 🚀 #AI #Certification`
        );
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/learn/tracks" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Tracks
                </Link>

                {/* Success Message */}
                <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
                    <p className="text-muted-foreground">
                        You've successfully earned your {certificate.trackName} certification.
                    </p>
                </div>

                {/* Certificate */}
                <Card className="relative w-full aspect-[1.4] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden mb-8">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Gold Border */}
                    <div className="absolute inset-4 border-2 border-amber-500/30 rounded-lg" />
                    <div className="absolute inset-6 border border-amber-500/20 rounded-lg" />

                    {/* Corner Decorations */}
                    <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-amber-500/50 rounded-tl-lg" />
                    <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-amber-500/50 rounded-tr-lg" />
                    <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-amber-500/50 rounded-bl-lg" />
                    <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-amber-500/50 rounded-br-lg" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="text-2xl font-bold tracking-wider text-amber-400 mb-1">
                            SCALED<span className="text-white">NATIVE</span>
                        </div>

                        <div className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">
                            AI-Native Training Academy
                        </div>

                        <div className="text-sm uppercase tracking-[0.2em] text-amber-500/80 mb-4">
                            Certificate of Completion
                        </div>

                        <p className="text-slate-400 text-sm mb-2">This is to certify that</p>

                        <h2 className="text-3xl font-serif font-bold text-white mb-3">
                            {certificate.recipientName}
                        </h2>

                        <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-3" />

                        <p className="text-slate-400 text-sm mb-2">has successfully completed</p>

                        <h3 className="text-xl font-semibold text-amber-400 mb-1">
                            {certificate.trackName}
                        </h3>

                        <p className="text-slate-500 text-sm mb-4">{certificate.courseName}</p>

                        <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                            Score: {certificate.score}%
                        </Badge>

                        {/* Footer */}
                        <div className="flex items-center gap-8 mt-6">
                            <div className="text-center">
                                <div className="w-20 border-b border-slate-600 mb-1" />
                                <p className="text-xs text-slate-500">Sam Sweilem</p>
                                <p className="text-[9px] text-slate-600">Chief Learning Officer</p>
                            </div>

                            <div className="w-14 h-14 rounded-full border-2 border-amber-500/40 flex items-center justify-center">
                                <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center">
                                    <span className="text-amber-500 font-bold">SN</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="w-20 border-b border-slate-600 mb-1" />
                                <p className="text-xs text-slate-500">{certificate.completionDate}</p>
                                <p className="text-[9px] text-slate-600">Date of Completion</p>
                            </div>
                        </div>

                        <div className="absolute bottom-3 right-6 text-[9px] text-slate-600">
                            ID: {certificate.id}
                        </div>
                    </div>
                </Card>

                {/* Actions */}
                <div className="flex justify-center gap-4 mb-6">
                    <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                    <Button variant="outline" onClick={shareToLinkedIn} className="gap-2">
                        <Linkedin className="h-4 w-4" />
                        Share on LinkedIn
                    </Button>
                    <Button variant="outline" onClick={shareToTwitter} className="gap-2">
                        <Twitter className="h-4 w-4" />
                        Share on X
                    </Button>
                </div>

                {/* Verification */}
                <p className="text-center text-sm text-muted-foreground">
                    Verify this certificate at{" "}
                    <a
                        href={`https://scalednative.com/verify/${certificate.id}`}
                        className="text-primary hover:underline"
                    >
                        scalednative.com/verify/{certificate.id}
                    </a>
                </p>
            </div>
        </div>
    );
}
