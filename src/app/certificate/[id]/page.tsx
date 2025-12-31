"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PremiumCertificate, PremiumCertificateData } from "@/components/certificates/PremiumCertificate";
import { Loader2 } from "lucide-react";

export default function CertificatePage() {
    const params = useParams();
    const router = useRouter();
    const [certificate, setCertificate] = useState<PremiumCertificateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await fetch(`/api/certificates/${params.id}`);
                const data = await response.json();

                if (data.success && data.certificate) {
                    setCertificate(data.certificate);
                } else {
                    setError(data.error || "Certificate not found");
                }
            } catch (err) {
                setError("Failed to load certificate");
            }
            setLoading(false);
        };

        if (params.id) {
            fetchCertificate();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading certificate...</p>
                </div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Certificate Not Found</h1>
                    <p className="text-muted-foreground mb-6">{error || "This certificate does not exist or has been revoked."}</p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-primary hover:underline"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <PremiumCertificate
            data={certificate}
            onClose={() => router.push("/dashboard")}
        />
    );
}
