"use client";

import React from "react";
import { Zap, AlertTriangle, CheckCircle } from "lucide-react";

interface QuotaDisplayProps {
    used: number;
    limit: number;
    remaining: number;
    percentUsed: number;
    tier?: string;
    resetsOn?: Date;
    isUnlimited?: boolean;
    compact?: boolean;
}

function formatTokens(tokens: number): string {
    if (tokens === Infinity || !isFinite(tokens)) return "Unlimited";
    if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
    if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`;
    return tokens.toLocaleString();
}

export function QuotaDisplay({
    used,
    limit,
    remaining,
    percentUsed,
    tier = "enrolled",
    resetsOn,
    isUnlimited = false,
    compact = false,
}: QuotaDisplayProps) {
    const isLow = percentUsed > 80;
    const isCritical = percentUsed > 95;

    if (compact) {
        return (
            <div className="flex items-center gap-2 text-xs">
                <Zap className={`h-3 w-3 ${isCritical ? "text-red-400" : isLow ? "text-yellow-400" : "text-purple-400"}`} />
                <span className="text-white/60">
                    {isUnlimited ? "Unlimited" : `${formatTokens(remaining)} tokens left`}
                </span>
                {!isUnlimited && (
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${isCritical ? "bg-red-500" : isLow ? "bg-yellow-500" : "bg-purple-500"
                                }`}
                            style={{ width: `${100 - percentUsed}%` }}
                        />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">Token Quota</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize">
                    {tier}
                </span>
            </div>

            {isUnlimited ? (
                <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Unlimited tokens</span>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-white/60">
                            {formatTokens(used)} / {formatTokens(limit)} used
                        </span>
                        <span className={`font-medium ${isCritical ? "text-red-400" : isLow ? "text-yellow-400" : "text-green-400"
                            }`}>
                            {formatTokens(remaining)} remaining
                        </span>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${isCritical ? "bg-red-500" : isLow ? "bg-yellow-500" : "bg-purple-500"
                                }`}
                            style={{ width: `${percentUsed}%` }}
                        />
                    </div>

                    {(isLow || isCritical) && (
                        <div className={`mt-3 flex items-center gap-2 text-xs ${isCritical ? "text-red-400" : "text-yellow-400"
                            }`}>
                            <AlertTriangle className="h-3 w-3" />
                            <span>
                                {isCritical
                                    ? "Quota nearly exhausted. Consider upgrading."
                                    : "Running low on tokens for this month."}
                            </span>
                        </div>
                    )}

                    {resetsOn && (
                        <div className="mt-2 text-xs text-white/40">
                            Resets {resetsOn.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default QuotaDisplay;
