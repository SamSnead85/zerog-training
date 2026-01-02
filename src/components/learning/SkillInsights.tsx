// Skill Insights Widget - Subtle, non-intrusive progress display
'use client';

import { useAdaptiveLearning } from '@/lib/adaptive';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';

export function SkillInsights() {
    const { profile, recommendations, currentDifficulty, isLoading } = useAdaptiveLearning();

    if (isLoading) return null;

    // Calculate overall progress percentage
    const overallProgress = Math.round(
        (profile.aiFundamentals +
            profile.promptEngineering +
            profile.aiArchitecture +
            profile.aiSecurity +
            profile.aiGovernance) / 5
    );

    // Don't show if user hasn't started yet
    if (overallProgress === 0) return null;

    const levelColors = {
        beginner: 'from-emerald-500 to-teal-500',
        intermediate: 'from-blue-500 to-indigo-500',
        advanced: 'from-violet-500 to-purple-500',
        expert: 'from-amber-500 to-orange-500',
    };

    const levelLabels = {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Expert',
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${levelColors[profile.overallLevel]}`}>
                        <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-white/60">Your Level</p>
                        <p className="text-sm font-medium text-white">{levelLabels[profile.overallLevel]}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-white/60">Content Difficulty</p>
                    <p className="text-sm font-medium text-white capitalize">{currentDifficulty}</p>
                </div>
            </div>

            {/* Skill Bars - Compact */}
            <div className="space-y-2 mb-4">
                <SkillBar label="AI Fundamentals" value={profile.aiFundamentals} color="emerald" />
                <SkillBar label="Prompt Engineering" value={profile.promptEngineering} color="blue" />
                <SkillBar label="AI Architecture" value={profile.aiArchitecture} color="violet" />
                <SkillBar label="AI Security" value={profile.aiSecurity} color="red" />
                <SkillBar label="AI Governance" value={profile.aiGovernance} color="amber" />
            </div>

            {/* Top Recommendation */}
            {recommendations.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                    <Zap className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-white/80">{recommendations[0]}</p>
                </div>
            )}
        </div>
    );
}

function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
    const colorMap: Record<string, string> = {
        emerald: 'bg-emerald-500',
        blue: 'bg-blue-500',
        violet: 'bg-violet-500',
        red: 'bg-red-500',
        amber: 'bg-amber-500',
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-white/60 w-28 truncate">{label}</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colorMap[color]} transition-all duration-500`}
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="text-xs text-white/60 w-8 text-right">{value}%</span>
        </div>
    );
}

// Compact version for lesson sidebar
export function SkillInsightsCompact() {
    const { profile, currentDifficulty, isLoading } = useAdaptiveLearning();

    if (isLoading) return null;

    const overallProgress = Math.round(
        (profile.aiFundamentals +
            profile.promptEngineering +
            profile.aiArchitecture +
            profile.aiSecurity +
            profile.aiGovernance) / 5
    );

    if (overallProgress === 0) return null;

    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
            <Target className="w-4 h-4 text-white/60" />
            <span className="text-xs text-white/60">Difficulty:</span>
            <span className="text-xs font-medium text-white capitalize">{currentDifficulty}</span>
            <div className="ml-auto flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400">{overallProgress}%</span>
            </div>
        </div>
    );
}
