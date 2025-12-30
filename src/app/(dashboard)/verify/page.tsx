"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    CheckCircle2,
    XCircle,
    Shield,
    Award,
    Calendar,
    User,
    ChevronLeft,
    Verified,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// MOCK VERIFICATION DATA
// =============================================================================

interface VerificationResult {
    valid: boolean;
    recipientName?: string;
    certification?: string;
    level?: "foundations" | "associate" | "professional" | "architect";
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
    badge?: string;
}

const mockCredentials: Record<string, VerificationResult> = {
    "SN-FND-2024-ABC123": {
        valid: true,
        recipientName: "Jane Developer",
        certification: "AI-Native Foundations",
        level: "foundations",
        issueDate: "December 15, 2024",
        expiryDate: "December 15, 2026",
        credentialId: "SN-FND-2024-ABC123",
        badge: "🎓",
    },
    "SN-ASC-2024-DEF456": {
        valid: true,
        recipientName: "John Smith",
        certification: "AI-Native Associate",
        level: "associate",
        issueDate: "November 20, 2024",
        expiryDate: "November 20, 2026",
        credentialId: "SN-ASC-2024-DEF456",
        badge: "🏅",
    },
};

// =============================================================================
// VERIFICATION PAGE
// =============================================================================

export default function VerifyPage() {
    const [credentialId, setCredentialId] = useState("");
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!credentialId.trim()) return;

        setIsSearching(true);
        setHasSearched(false);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const found = mockCredentials[credentialId.trim().toUpperCase()];
        setResult(found || { valid: false });
        setHasSearched(true);
        setIsSearching(false);
    };

    const levelColors = {
        foundations: "border-blue-500 bg-blue-500/10",
        associate: "border-emerald-500 bg-emerald-500/10",
        professional: "border-purple-500 bg-purple-500/10",
        architect: "border-amber-500 bg-amber-500/10",
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center h-16 px-6 max-w-4xl mx-auto">
                    <Link href="/certifications" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Certifications</span>
                    </Link>
                    <div className="ml-auto">
                        <span className="font-playfair text-lg font-medium italic tracking-tight">
                            ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-16 max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
                        <Shield className="h-8 w-8 text-white/60" />
                    </div>
                    <h1 className="font-montserrat text-3xl font-bold mb-4">
                        Verify a Certificate
                    </h1>
                    <p className="text-white/50">
                        Enter a credential ID to verify its authenticity
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleVerify} className="mb-12">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                            type="text"
                            value={credentialId}
                            onChange={(e) => setCredentialId(e.target.value)}
                            placeholder="Enter credential ID (e.g., SN-FND-2024-ABC123)"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSearching || !credentialId.trim()}
                        className={cn(
                            "w-full mt-4 py-4 rounded-2xl font-medium transition-all",
                            credentialId.trim() && !isSearching
                                ? "bg-white text-black hover:bg-white/90"
                                : "bg-white/10 text-white/40 cursor-not-allowed"
                        )}
                    >
                        {isSearching ? "Verifying..." : "Verify Certificate"}
                    </button>
                </form>

                {/* Results */}
                {hasSearched && result && (
                    <div className={cn(
                        "rounded-2xl border-2 p-8",
                        result.valid
                            ? levelColors[result.level as keyof typeof levelColors]
                            : "border-red-500/50 bg-red-500/10"
                    )}>
                        {result.valid ? (
                            <>
                                {/* Valid Certificate */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-emerald-400">Valid Certificate</h2>
                                        <p className="text-sm text-white/50">This credential is authentic</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                        <User className="h-5 w-5 text-white/40" />
                                        <div>
                                            <p className="text-xs text-white/40">Recipient</p>
                                            <p className="font-medium">{result.recipientName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                        <Award className="h-5 w-5 text-white/40" />
                                        <div>
                                            <p className="text-xs text-white/40">Certification</p>
                                            <p className="font-medium">{result.badge} {result.certification}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                        <Calendar className="h-5 w-5 text-white/40" />
                                        <div>
                                            <p className="text-xs text-white/40">Issue Date</p>
                                            <p className="font-medium">{result.issueDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                        <Verified className="h-5 w-5 text-white/40" />
                                        <div>
                                            <p className="text-xs text-white/40">Valid Until</p>
                                            <p className="font-medium">{result.expiryDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Invalid Certificate */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <XCircle className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-red-400">Not Found</h2>
                                        <p className="text-sm text-white/50">This credential could not be verified</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-white/60">
                                            <p className="mb-2">The credential ID you entered was not found in our system. This could mean:</p>
                                            <ul className="list-disc ml-4 space-y-1">
                                                <li>The credential ID was entered incorrectly</li>
                                                <li>The certificate has been revoked</li>
                                                <li>This is not a valid ScaledNative certificate</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Sample IDs for testing */}
                <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h3 className="text-sm font-medium mb-3">Test with sample credential IDs:</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(mockCredentials).map(id => (
                            <button
                                key={id}
                                onClick={() => setCredentialId(id)}
                                className="px-3 py-1.5 text-xs font-mono bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                {id}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
