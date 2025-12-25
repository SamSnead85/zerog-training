// Progress Tracking Service
// Tracks learner progress through modules, lessons, and assessments

export interface LearnerProgress {
    userId: string;
    organizationId: string;
    moduleId: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'failed';
    percentComplete: number;
    startedAt?: Date;
    completedAt?: Date;
    lastActivityAt: Date;
    lessonProgress: LessonProgress[];
    assessmentResults: AssessmentProgress[];
    simulationResults: SimulationProgress[];
    timeSpentMinutes: number;
    score?: number;
}

export interface LessonProgress {
    lessonId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    percentComplete: number;
    startedAt?: Date;
    completedAt?: Date;
    timeSpentMinutes: number;
}

export interface AssessmentProgress {
    assessmentId: string;
    attempts: number;
    bestScore: number;
    passed: boolean;
    lastAttemptAt?: Date;
}

export interface SimulationProgress {
    simulationId: string;
    attempts: number;
    bestScore: number;
    passed: boolean;
    lastAttemptAt?: Date;
}

// =============================================================================
// ACHIEVEMENT SYSTEM
// =============================================================================

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'completion' | 'streak' | 'mastery' | 'speed' | 'social';
    points: number;
    criteria: AchievementCriteria;
}

export interface AchievementCriteria {
    type: 'modules_completed' | 'streak_days' | 'perfect_score' | 'time_spent' | 'simulations_passed';
    threshold: number;
    moduleCategory?: string;
}

export interface UserAchievement {
    achievementId: string;
    earnedAt: Date;
    progress: number; // percentage toward earning
}

// Pre-defined achievements
export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first-module',
        name: 'First Steps',
        description: 'Complete your first training module',
        icon: 'Trophy',
        category: 'completion',
        points: 50,
        criteria: { type: 'modules_completed', threshold: 1 },
    },
    {
        id: 'module-master-5',
        name: 'Knowledge Seeker',
        description: 'Complete 5 training modules',
        icon: 'BookOpen',
        category: 'completion',
        points: 150,
        criteria: { type: 'modules_completed', threshold: 5 },
    },
    {
        id: 'module-master-10',
        name: 'Dedicated Learner',
        description: 'Complete 10 training modules',
        icon: 'GraduationCap',
        category: 'completion',
        points: 300,
        criteria: { type: 'modules_completed', threshold: 10 },
    },
    {
        id: 'module-master-25',
        name: 'Training Champion',
        description: 'Complete 25 training modules',
        icon: 'Award',
        category: 'completion',
        points: 500,
        criteria: { type: 'modules_completed', threshold: 25 },
    },
    {
        id: 'streak-3',
        name: 'Consistency',
        description: 'Learn for 3 consecutive days',
        icon: 'Flame',
        category: 'streak',
        points: 75,
        criteria: { type: 'streak_days', threshold: 3 },
    },
    {
        id: 'streak-7',
        name: 'Week Warrior',
        description: 'Learn for 7 consecutive days',
        icon: 'Flame',
        category: 'streak',
        points: 150,
        criteria: { type: 'streak_days', threshold: 7 },
    },
    {
        id: 'streak-30',
        name: 'Monthly Master',
        description: 'Learn for 30 consecutive days',
        icon: 'Flame',
        category: 'streak',
        points: 500,
        criteria: { type: 'streak_days', threshold: 30 },
    },
    {
        id: 'perfect-score',
        name: 'Perfectionist',
        description: 'Achieve a perfect score on any assessment',
        icon: 'Star',
        category: 'mastery',
        points: 100,
        criteria: { type: 'perfect_score', threshold: 100 },
    },
    {
        id: 'simulation-star',
        name: 'Simulation Star',
        description: 'Pass 5 simulations with a score above 90%',
        icon: 'Sparkles',
        category: 'mastery',
        points: 200,
        criteria: { type: 'simulations_passed', threshold: 5 },
    },
    {
        id: 'time-10',
        name: 'Time Invested',
        description: 'Spend 10 hours learning',
        icon: 'Clock',
        category: 'speed',
        points: 100,
        criteria: { type: 'time_spent', threshold: 600 }, // minutes
    },
];

// =============================================================================
// PROGRESS TRACKING SERVICE
// =============================================================================

export interface ProgressStats {
    totalModulesCompleted: number;
    totalModulesInProgress: number;
    totalTimeSpentMinutes: number;
    averageScore: number;
    currentStreak: number;
    longestStreak: number;
    achievementsEarned: number;
    totalPoints: number;
}

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    avatarUrl?: string;
    points: number;
    modulesCompleted: number;
    rank: number;
}

// In a real app, this would interact with the database
// For now, we'll use in-memory storage for the structure

export class ProgressTrackingService {
    private progressCache = new Map<string, LearnerProgress[]>();
    private achievementCache = new Map<string, UserAchievement[]>();
    private streakCache = new Map<string, { current: number; longest: number; lastActivity: Date }>();

    /**
     * Get progress for a user on a module
     */
    getModuleProgress(userId: string, moduleId: string): LearnerProgress | null {
        const userProgress = this.progressCache.get(userId) || [];
        return userProgress.find(p => p.moduleId === moduleId) || null;
    }

    /**
     * Get all progress for a user
     */
    getAllProgress(userId: string): LearnerProgress[] {
        return this.progressCache.get(userId) || [];
    }

    /**
     * Start a module
     */
    startModule(userId: string, organizationId: string, moduleId: string): LearnerProgress {
        const existing = this.getModuleProgress(userId, moduleId);
        if (existing) return existing;

        const progress: LearnerProgress = {
            userId,
            organizationId,
            moduleId,
            status: 'in_progress',
            percentComplete: 0,
            startedAt: new Date(),
            lastActivityAt: new Date(),
            lessonProgress: [],
            assessmentResults: [],
            simulationResults: [],
            timeSpentMinutes: 0,
        };

        const userProgress = this.progressCache.get(userId) || [];
        userProgress.push(progress);
        this.progressCache.set(userId, userProgress);

        this.updateStreak(userId);

        return progress;
    }

    /**
     * Update lesson progress
     */
    updateLessonProgress(
        userId: string,
        moduleId: string,
        lessonId: string,
        updates: Partial<LessonProgress>
    ): void {
        const moduleProgress = this.getModuleProgress(userId, moduleId);
        if (!moduleProgress) return;

        let lesson = moduleProgress.lessonProgress.find(l => l.lessonId === lessonId);

        if (!lesson) {
            lesson = {
                lessonId,
                status: 'not_started',
                percentComplete: 0,
                timeSpentMinutes: 0,
            };
            moduleProgress.lessonProgress.push(lesson);
        }

        Object.assign(lesson, updates);
        moduleProgress.lastActivityAt = new Date();

        // Recalculate module progress
        this.recalculateModuleProgress(moduleProgress);
        this.updateStreak(userId);
    }

    /**
     * Record assessment result
     */
    recordAssessmentResult(
        userId: string,
        moduleId: string,
        assessmentId: string,
        score: number,
        passed: boolean
    ): void {
        const moduleProgress = this.getModuleProgress(userId, moduleId);
        if (!moduleProgress) return;

        let assessment = moduleProgress.assessmentResults.find(a => a.assessmentId === assessmentId);

        if (!assessment) {
            assessment = {
                assessmentId,
                attempts: 0,
                bestScore: 0,
                passed: false,
            };
            moduleProgress.assessmentResults.push(assessment);
        }

        assessment.attempts++;
        assessment.bestScore = Math.max(assessment.bestScore, score);
        assessment.passed = assessment.passed || passed;
        assessment.lastAttemptAt = new Date();

        moduleProgress.lastActivityAt = new Date();
        this.recalculateModuleProgress(moduleProgress);
        this.checkAchievements(userId);
    }

    /**
     * Record simulation result
     */
    recordSimulationResult(
        userId: string,
        moduleId: string,
        simulationId: string,
        score: number,
        passed: boolean
    ): void {
        const moduleProgress = this.getModuleProgress(userId, moduleId);
        if (!moduleProgress) return;

        let simulation = moduleProgress.simulationResults.find(s => s.simulationId === simulationId);

        if (!simulation) {
            simulation = {
                simulationId,
                attempts: 0,
                bestScore: 0,
                passed: false,
            };
            moduleProgress.simulationResults.push(simulation);
        }

        simulation.attempts++;
        simulation.bestScore = Math.max(simulation.bestScore, score);
        simulation.passed = simulation.passed || passed;
        simulation.lastAttemptAt = new Date();

        moduleProgress.lastActivityAt = new Date();
        this.recalculateModuleProgress(moduleProgress);
        this.checkAchievements(userId);
    }

    /**
     * Complete a module
     */
    completeModule(userId: string, moduleId: string, score: number): void {
        const moduleProgress = this.getModuleProgress(userId, moduleId);
        if (!moduleProgress) return;

        moduleProgress.status = 'completed';
        moduleProgress.percentComplete = 100;
        moduleProgress.completedAt = new Date();
        moduleProgress.score = score;

        this.checkAchievements(userId);
    }

    /**
     * Get progress statistics
     */
    getStats(userId: string): ProgressStats {
        const progress = this.getAllProgress(userId);
        const achievements = this.achievementCache.get(userId) || [];
        const streak = this.streakCache.get(userId) || { current: 0, longest: 0, lastActivity: new Date() };

        const completedModules = progress.filter(p => p.status === 'completed');
        const inProgressModules = progress.filter(p => p.status === 'in_progress');
        const totalTime = progress.reduce((sum, p) => sum + p.timeSpentMinutes, 0);
        const scores = completedModules.map(p => p.score || 0).filter(s => s > 0);
        const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        const points = this.calculateTotalPoints(achievements);

        return {
            totalModulesCompleted: completedModules.length,
            totalModulesInProgress: inProgressModules.length,
            totalTimeSpentMinutes: totalTime,
            averageScore: Math.round(avgScore),
            currentStreak: streak.current,
            longestStreak: streak.longest,
            achievementsEarned: achievements.length,
            totalPoints: points,
        };
    }

    /**
     * Get user achievements
     */
    getAchievements(userId: string): { earned: UserAchievement[]; available: Achievement[] } {
        const earned = this.achievementCache.get(userId) || [];
        const earnedIds = new Set(earned.map(a => a.achievementId));
        const available = ACHIEVEMENTS.filter(a => !earnedIds.has(a.id));

        return { earned, available };
    }

    /**
     * Get leaderboard
     */
    getLeaderboard(organizationId: string, limit: number = 10): LeaderboardEntry[] {
        // In production, this would query the database
        // For now, return empty - would be populated from actual data
        return [];
    }

    // Private helpers

    private recalculateModuleProgress(progress: LearnerProgress): void {
        const lessonCount = progress.lessonProgress.length;
        const assessmentCount = progress.assessmentResults.length;
        const simulationCount = progress.simulationResults.length;
        const totalItems = lessonCount + assessmentCount + simulationCount;

        if (totalItems === 0) {
            progress.percentComplete = 0;
            return;
        }

        const completedLessons = progress.lessonProgress.filter(l => l.status === 'completed').length;
        const passedAssessments = progress.assessmentResults.filter(a => a.passed).length;
        const passedSimulations = progress.simulationResults.filter(s => s.passed).length;

        progress.percentComplete = Math.round(
            ((completedLessons + passedAssessments + passedSimulations) / totalItems) * 100
        );

        if (progress.percentComplete === 100 && progress.status !== 'completed') {
            progress.status = 'completed';
            progress.completedAt = new Date();
        }
    }

    private updateStreak(userId: string): void {
        const now = new Date();
        let streak = this.streakCache.get(userId);

        if (!streak) {
            streak = { current: 1, longest: 1, lastActivity: now };
            this.streakCache.set(userId, streak);
            return;
        }

        const daysSinceLastActivity = Math.floor(
            (now.getTime() - streak.lastActivity.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastActivity === 0) {
            // Same day, no change
        } else if (daysSinceLastActivity === 1) {
            // Consecutive day
            streak.current++;
            streak.longest = Math.max(streak.longest, streak.current);
        } else {
            // Streak broken
            streak.current = 1;
        }

        streak.lastActivity = now;
    }

    private checkAchievements(userId: string): void {
        const stats = this.getStats(userId);
        const earned = this.achievementCache.get(userId) || [];
        const earnedIds = new Set(earned.map(a => a.achievementId));

        for (const achievement of ACHIEVEMENTS) {
            if (earnedIds.has(achievement.id)) continue;

            let shouldAward = false;

            switch (achievement.criteria.type) {
                case 'modules_completed':
                    shouldAward = stats.totalModulesCompleted >= achievement.criteria.threshold;
                    break;
                case 'streak_days':
                    shouldAward = stats.currentStreak >= achievement.criteria.threshold;
                    break;
                case 'time_spent':
                    shouldAward = stats.totalTimeSpentMinutes >= achievement.criteria.threshold;
                    break;
                // Add more criteria types as needed
            }

            if (shouldAward) {
                earned.push({
                    achievementId: achievement.id,
                    earnedAt: new Date(),
                    progress: 100,
                });
            }
        }

        this.achievementCache.set(userId, earned);
    }

    private calculateTotalPoints(achievements: UserAchievement[]): number {
        return achievements.reduce((total, ua) => {
            const achievement = ACHIEVEMENTS.find(a => a.id === ua.achievementId);
            return total + (achievement?.points || 0);
        }, 0);
    }
}

// Singleton
let progressService: ProgressTrackingService | null = null;

export function getProgressTrackingService(): ProgressTrackingService {
    if (!progressService) {
        progressService = new ProgressTrackingService();
    }
    return progressService;
}
