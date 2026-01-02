// Skill Assessment Engine - AI-powered adaptive learning
// Tracks student progress and adjusts difficulty based on performance

export type SkillDimension =
    | 'aiFundamentals'
    | 'promptEngineering'
    | 'aiArchitecture'
    | 'aiSecurity'
    | 'aiGovernance';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SkillProfile {
    aiFundamentals: number;      // 0-100
    promptEngineering: number;   // 0-100
    aiArchitecture: number;      // 0-100
    aiSecurity: number;          // 0-100
    aiGovernance: number;        // 0-100
    overallLevel: DifficultyLevel;
    lastUpdated: Date;
}

export interface QuizAttempt {
    questionId: string;
    dimension: SkillDimension;
    difficulty: DifficultyLevel;
    correct: boolean;
    timeSpent: number; // seconds
}

export interface PerformanceData {
    recentAccuracy: number;      // 0-100, last 10 questions
    averageTimePerQuestion: number;
    consistencyScore: number;    // 0-100, how stable performance is
    streak: number;              // consecutive correct answers
}

// Calculate skill level from score
export function getLevel(score: number): DifficultyLevel {
    if (score >= 85) return 'expert';
    if (score >= 70) return 'advanced';
    if (score >= 50) return 'intermediate';
    return 'beginner';
}

// Calculate overall level from all dimensions
export function calculateOverallLevel(profile: Omit<SkillProfile, 'overallLevel' | 'lastUpdated'>): DifficultyLevel {
    const avg = (
        profile.aiFundamentals +
        profile.promptEngineering +
        profile.aiArchitecture +
        profile.aiSecurity +
        profile.aiGovernance
    ) / 5;
    return getLevel(avg);
}

// Update skill profile based on quiz attempt
export function updateSkillProfile(
    currentProfile: SkillProfile,
    attempt: QuizAttempt
): SkillProfile {
    const dimensionKey = attempt.dimension;
    const currentScore = currentProfile[dimensionKey];

    // Weight new information based on confidence
    // Quick correct answers boost more, slow incorrect answers decrease more
    let adjustment = 0;

    if (attempt.correct) {
        // Faster = more confident = bigger boost
        if (attempt.timeSpent < 10) adjustment = 5;
        else if (attempt.timeSpent < 20) adjustment = 3;
        else adjustment = 2;

        // Bonus for getting harder questions right
        if (attempt.difficulty === 'advanced') adjustment += 2;
        if (attempt.difficulty === 'expert') adjustment += 4;
    } else {
        // Wrong answer decreases score
        if (attempt.timeSpent < 10) adjustment = -3; // Quick wrong = guess
        else adjustment = -5; // Slow wrong = gap in knowledge

        // Less penalty for harder questions
        if (attempt.difficulty === 'advanced') adjustment += 1;
        if (attempt.difficulty === 'expert') adjustment += 2;
    }

    const newScore = Math.max(0, Math.min(100, currentScore + adjustment));

    const updatedProfile = {
        ...currentProfile,
        [dimensionKey]: newScore,
        lastUpdated: new Date(),
    };

    updatedProfile.overallLevel = calculateOverallLevel(updatedProfile);

    return updatedProfile;
}

// Determine next question difficulty based on performance
export function getNextDifficulty(performance: PerformanceData): DifficultyLevel {
    // High accuracy + fast = increase difficulty
    if (performance.recentAccuracy >= 85 && performance.averageTimePerQuestion < 15) {
        if (performance.streak >= 5) return 'expert';
        return 'advanced';
    }

    // Good accuracy = stay or slightly increase
    if (performance.recentAccuracy >= 70) {
        return 'intermediate';
    }

    // Struggling = decrease difficulty
    if (performance.recentAccuracy < 50) {
        return 'beginner';
    }

    return 'intermediate';
}

// Generate personalized recommendations based on skill gaps
export function generateRecommendations(profile: SkillProfile): string[] {
    const recommendations: string[] = [];
    const scores = [
        { dim: 'AI Fundamentals', score: profile.aiFundamentals },
        { dim: 'Prompt Engineering', score: profile.promptEngineering },
        { dim: 'AI Architecture', score: profile.aiArchitecture },
        { dim: 'AI Security', score: profile.aiSecurity },
        { dim: 'AI Governance', score: profile.aiGovernance },
    ];

    // Sort by score ascending (weakest first)
    scores.sort((a, b) => a.score - b.score);

    // Recommend focusing on weakest areas
    if (scores[0].score < 50) {
        recommendations.push(`Focus on ${scores[0].dim} - this is your biggest opportunity for growth`);
    }

    if (scores[1].score < 60 && scores[1].score < scores[4].score - 20) {
        recommendations.push(`Consider strengthening ${scores[1].dim} to round out your skills`);
    }

    // Celebrate strengths
    if (scores[4].score >= 80) {
        recommendations.push(`Great work on ${scores[4].dim}! You're performing at an advanced level`);
    }

    // Overall guidance
    if (profile.overallLevel === 'expert') {
        recommendations.push('Ready for advanced certification - consider the Expert track');
    } else if (profile.overallLevel === 'advanced') {
        recommendations.push('You\'re making excellent progress - keep building on your strengths');
    }

    return recommendations;
}

// Create initial profile for new users
export function createInitialProfile(): SkillProfile {
    return {
        aiFundamentals: 0,
        promptEngineering: 0,
        aiArchitecture: 0,
        aiSecurity: 0,
        aiGovernance: 0,
        overallLevel: 'beginner',
        lastUpdated: new Date(),
    };
}

// Check if user should skip content based on demonstrated mastery
export function shouldSkipContent(profile: SkillProfile, contentDimension: SkillDimension, contentLevel: DifficultyLevel): boolean {
    const score = profile[contentDimension];

    // Expert in dimension can skip beginner/intermediate content
    if (score >= 85 && (contentLevel === 'beginner' || contentLevel === 'intermediate')) {
        return true;
    }

    // Advanced can skip beginner content
    if (score >= 70 && contentLevel === 'beginner') {
        return true;
    }

    return false;
}
