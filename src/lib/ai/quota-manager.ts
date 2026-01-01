/**
 * Student Token Quota Management
 * 
 * Each student receives a monthly token quota for lab exercises.
 * This prevents runaway costs while allowing sufficient practice.
 * 
 * Default allocations (generous for real learning):
 * - Free tier: 250,000 tokens/month (~$0.25 at current Gemini pricing) - enough for 10+ lab exercises
 * - Enrolled student: 5,000,000 tokens/month (~$5.00) - extensive practice, experimentation, retries
 * - Enterprise/unlimited: No limit
 * 
 * At $50-500+ course pricing, $5/student/month is negligible overhead.
 */

export interface StudentQuota {
    userId: string;
    tier: "free" | "enrolled" | "enterprise";
    monthlyLimit: number;
    usedThisMonth: number;
    periodStart: Date;
    periodEnd: Date;
    lastUpdated: Date;
}

export interface QuotaCheckResult {
    allowed: boolean;
    remaining: number;
    usedThisMonth: number;
    monthlyLimit: number;
    percentUsed: number;
    tier: string;
    message?: string;
}

// Quota limits by tier (tokens per month) - generous for real learning
export const QUOTA_LIMITS = {
    free: 250_000,          // 250K tokens - enough for 10+ lab exercises, trial experience
    enrolled: 5_000_000,    // 5M tokens - extensive practice, experimentation, all labs multiple times
    enterprise: Infinity,   // Unlimited for enterprise accounts
} as const;

// In-memory store (in production, use Redis or database)
const quotaStore = new Map<string, StudentQuota>();

/**
 * Get or create quota for a user
 */
export function getQuota(userId: string, tier: "free" | "enrolled" | "enterprise" = "enrolled"): StudentQuota {
    let quota = quotaStore.get(userId);

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Create new quota if doesn't exist
    if (!quota) {
        quota = {
            userId,
            tier,
            monthlyLimit: QUOTA_LIMITS[tier],
            usedThisMonth: 0,
            periodStart: monthStart,
            periodEnd: monthEnd,
            lastUpdated: now,
        };
        quotaStore.set(userId, quota);
        return quota;
    }

    // Reset quota if new month
    if (now > quota.periodEnd) {
        quota.usedThisMonth = 0;
        quota.periodStart = monthStart;
        quota.periodEnd = monthEnd;
        quota.lastUpdated = now;
    }

    // Update tier if changed
    if (quota.tier !== tier) {
        quota.tier = tier;
        quota.monthlyLimit = QUOTA_LIMITS[tier];
    }

    return quota;
}

/**
 * Check if user can execute with given token count
 */
export function checkQuota(userId: string, estimatedTokens: number): QuotaCheckResult {
    const quota = getQuota(userId);

    const remaining = quota.monthlyLimit - quota.usedThisMonth;
    const percentUsed = quota.monthlyLimit === Infinity
        ? 0
        : (quota.usedThisMonth / quota.monthlyLimit) * 100;

    // Enterprise users always allowed
    if (quota.tier === "enterprise") {
        return {
            allowed: true,
            remaining: Infinity,
            usedThisMonth: quota.usedThisMonth,
            monthlyLimit: quota.monthlyLimit,
            percentUsed: 0,
            tier: quota.tier,
        };
    }

    // Check if enough quota
    if (estimatedTokens > remaining) {
        return {
            allowed: false,
            remaining,
            usedThisMonth: quota.usedThisMonth,
            monthlyLimit: quota.monthlyLimit,
            percentUsed,
            tier: quota.tier,
            message: `Insufficient quota. You have ${remaining.toLocaleString()} tokens remaining this month. This request requires ~${estimatedTokens.toLocaleString()} tokens.`,
        };
    }

    // Warning if running low (less than 10% remaining)
    let message: string | undefined;
    if (percentUsed > 90) {
        message = `Warning: You've used ${percentUsed.toFixed(0)}% of your monthly quota. ${remaining.toLocaleString()} tokens remaining.`;
    }

    return {
        allowed: true,
        remaining,
        usedThisMonth: quota.usedThisMonth,
        monthlyLimit: quota.monthlyLimit,
        percentUsed,
        tier: quota.tier,
        message,
    };
}

/**
 * Record token usage after execution
 */
export function recordUsage(userId: string, tokensUsed: number): StudentQuota {
    const quota = getQuota(userId);
    quota.usedThisMonth += tokensUsed;
    quota.lastUpdated = new Date();
    quotaStore.set(userId, quota);
    return quota;
}

/**
 * Get quota summary for display in UI
 */
export function getQuotaSummary(userId: string): {
    used: number;
    limit: number;
    remaining: number;
    percentUsed: number;
    tier: string;
    resetsOn: Date;
    isUnlimited: boolean;
} {
    const quota = getQuota(userId);
    const isUnlimited = quota.tier === "enterprise";

    return {
        used: quota.usedThisMonth,
        limit: quota.monthlyLimit,
        remaining: isUnlimited ? Infinity : quota.monthlyLimit - quota.usedThisMonth,
        percentUsed: isUnlimited ? 0 : (quota.usedThisMonth / quota.monthlyLimit) * 100,
        tier: quota.tier,
        resetsOn: quota.periodEnd,
        isUnlimited,
    };
}

/**
 * Estimate tokens for budgeting (before execution)
 * Rough estimate: ~4 characters per token
 */
export function estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
}

/**
 * Format token count for display
 */
export function formatTokens(tokens: number): string {
    if (tokens === Infinity) return "Unlimited";
    if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
    if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`;
    return tokens.toLocaleString();
}

/**
 * Calculate estimated cost
 */
export function estimateCost(tokens: number, model: string = "gemini-2.0-flash"): number {
    // Gemini 2.0 Flash pricing (per million tokens)
    const pricing: Record<string, { input: number; output: number }> = {
        "gemini-2.0-flash": { input: 0.075, output: 0.30 },
        "gemini-1.5-flash": { input: 0.075, output: 0.30 },
        "gemini-1.5-pro": { input: 1.25, output: 5.00 },
    };

    const price = pricing[model] || pricing["gemini-2.0-flash"];
    // Assume 50/50 input/output split for estimation
    const avgPrice = (price.input + price.output) / 2;
    return (tokens * avgPrice) / 1_000_000;
}
