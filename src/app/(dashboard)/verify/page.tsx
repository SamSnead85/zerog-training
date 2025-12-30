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
    GraduationCap,
    Layers,
    Trophy,
    Crown,
    BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// LEVEL ICONS MAP
// =============================================================================

const levelIcons = {
    foundations: GraduationCap,
    associate: Layers,
    professional: Trophy,
    architect: Crown,
};

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
    certCode?: string;
}

const mockCredentials: Record<string, VerificationResult> = {
    "SN-F-2024-7X9K2M": {
        valid: true,
        recipientName: "Sarah Chen",
        certification: "AI-Native Foundations",
        level: "foundations",
        issueDate: "December 15, 2024",
        expiryDate: "Lifetime",
        credentialId: "SN-F-2024-7X9K2M",
        certCode: "NATIVE-F",
    },
    "SN-A-2024-3B7L9P": {
        valid: true,
        recipientName: "Michael Roberts",
        certification: "AI-Native Associate",
        level: "associate",
        issueDate: "November 20, 2024",
        expiryDate: "November 20, 2026",
        credentialId: "SN-A-2024-3B7L9P",
        certCode: "NATIVE-A",
    },
    "SN-P-2024-8K2M5N": {
        valid: true,
        recipientName: "Emily Johnson",
        certification: "AI-Native Professional",
        level: "professional",
        issueDate: "October 10, 2024",
        expiryDate: "October 10, 2026",
        credentialId: "SN-P-2024-8K2M5N",
        certCode: "NATIVE-P",
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
        foundations: {
            border: "border-blue-500/50",
            bg: "bg-blue-500/10",
            text: "text-blue-400",
            iconBg: "bg-blue-500/20",
        },
        associate: {
            border: "border-emerald-500/50",
            bg: "bg-emerald-500/10",
            text: "text-emerald-400",
            iconBg: "bg-emerald-500/20",
        },
        professional: {
            border: "border-purple-500/50",
            bg: "bg-purple-500/10",
            text: "text-purple-400",
            iconBg: "bg-purple-500/20",
        },
        architect: {
            border: "border-amber-500/50",
            bg: "bg-amber-500/10",
            text: "text-amber-400",
            iconBg: "bg-amber-500/20",
        },
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
                        <Link href="/" className="font-playfair text-lg font-medium italic tracking-tight">
                            ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-20 max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-6">
                        <Shield className="h-10 w-10 text-white/60" />
                    </div>
                    <h1 className="font-playfair text-4xl font-medium italic mb-4">
                        Verify Credential
                    </h1>
                    <p className="text-white/50 max-w-md mx-auto">
                        Enter a credential ID to verify its authenticity. Employers and organizations can confirm any ScaledNative certification.
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleVerify} className="mb-12">
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                            type="text"
                            value={credentialId}
                            onChange={(e) => setCredentialId(e.target.value)}
                            placeholder="Enter credential ID (e.g., SN-F-2024-7X9K2M)"
                            className="w-full pl-14 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors text-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSearching || !credentialId.trim()}
                        className={cn(
                            "w-full mt-4 py-5 rounded-2xl font-medium transition-all text-lg",
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
                        "rounded-3xl border-2 overflow-hidden",
                        result.valid && result.level
                            ? cn(levelColors[result.level].border, levelColors[result.level].bg)
                            : "border-red-500/50 bg-red-500/10"
                    )}>
                        {result.valid && result.level ? (
                            <>
                                {/* Valid Certificate Header */}
                                <div className="p-8 border-b border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-emerald-400">Verified Credential</h2>
                                            <p className="text-white/50">This certificate is authentic and valid</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Details */}
                                <div className="p-8">
                                    {/* Certification Badge */}
                                    <div className="text-center mb-8">
                                        {(() => {
                                            const Icon = levelIcons[result.level];
                                            const colors = levelColors[result.level];
                                            return (
                                                <div className={cn(
                                                    "inline-flex items-center justify-center w-20 h-20 rounded-2xl border mb-4",
                                                    colors.iconBg, colors.border
                                                )}>
                                                    <Icon className={cn("h-10 w-10", colors.text)} />
                                                </div>
                                            );
                                        })()}
                                        <h3 className="text-xl font-bold">{result.certification}</h3>
                                        <p className={cn("text-sm font-mono mt-1", levelColors[result.level].text)}>
                                            {result.certCode}
                                        </p>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <User className="h-5 w-5 text-white/40" />
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Recipient</span>
                                            </div>
                                            <p className="text-lg font-medium">{result.recipientName}</p>
                                        </div>

                                        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <BadgeCheck className="h-5 w-5 text-white/40" />
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Credential ID</span>
                                            </div>
                                            <p className="text-lg font-mono">{result.credentialId}</p>
                                        </div>

                                        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Calendar className="h-5 w-5 text-white/40" />
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Issue Date</span>
                                            </div>
                                            <p className="text-lg font-medium">{result.issueDate}</p>
                                        </div>

                                        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Verified className="h-5 w-5 text-white/40" />
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Valid Until</span>
                                            </div>
                                            <p className="text-lg font-medium">{result.expiryDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Invalid Certificate */}
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                            <XCircle className="h-8 w-8 text-red-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-red-400">Not Found</h2>
                                            <p className="text-white/50">This credential could not be verified</p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-white/60">
                                                <p className="mb-3">The credential ID you entered was not found in our system. This could mean:</p>
                                                <ul className="list-disc ml-4 space-y-1.5">
                                                    <li>The credential ID was entered incorrectly</li>
                                                    <li>The certificate has been revoked</li>
                                                    <li>This is not a valid ScaledNative certificate</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Sample IDs for testing */}
                <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h3 className="text-sm font-medium mb-4 text-white/60">Test with sample credentials:</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(mockCredentials).map(id => (
                            <button
                                key={id}
                                onClick={() => setCredentialId(id)}
                                className="px-4 py-2 text-sm font-mono bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
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
