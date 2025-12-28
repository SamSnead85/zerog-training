/**
 * Training Storage Service
 * Uses API for authenticated users (org-scoped), localStorage for demo/unauthenticated
 */

import type { User } from "@/lib/auth/AuthContext";

export interface StoredTraining {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: 'draft' | 'published';
    duration: string;
    sections: TrainingSection[];
    category?: string;
    targetAudience?: string;
    organizationId?: string;
    creatorId?: string;
    creatorName?: string;
}

export interface TrainingSection {
    title: string;
    type: 'reading' | 'quiz' | 'scenario';
    duration: string;
    preview: string;
    content?: string;
}

const LOCAL_STORAGE_KEY = 'zerog_user_trainings';

/**
 * Get all saved trainings - uses API if authenticated, localStorage otherwise
 */
export async function getSavedTrainingsAsync(user: User | null): Promise<StoredTraining[]> {
    if (!user) {
        // Fallback to localStorage for unauthenticated users
        return getSavedTrainingsFromLocal();
    }

    try {
        const response = await fetch('/api/trainings', {
            headers: {
                'Content-Type': 'application/json',
                'x-user': JSON.stringify(user),
            },
        });

        if (!response.ok) {
            console.warn('API fetch failed, falling back to localStorage');
            return getSavedTrainingsFromLocal();
        }

        const data = await response.json();
        return data.trainings || [];
    } catch (error) {
        console.error('Error fetching trainings:', error);
        return getSavedTrainingsFromLocal();
    }
}

/**
 * Get trainings from localStorage (sync, for backwards compatibility)
 */
export function getSavedTrainings(): StoredTraining[] {
    return getSavedTrainingsFromLocal();
}

function getSavedTrainingsFromLocal(): StoredTraining[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored) as StoredTraining[];
    } catch {
        return [];
    }
}

/**
 * Save a new training - uses API if authenticated, localStorage otherwise
 */
export async function saveTrainingAsync(
    training: Omit<StoredTraining, 'id' | 'createdAt' | 'updatedAt'>,
    user: User | null
): Promise<StoredTraining> {
    if (!user) {
        // Fallback to localStorage for unauthenticated users
        return saveTrainingToLocal(training);
    }

    try {
        const response = await fetch('/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user': JSON.stringify(user),
            },
            body: JSON.stringify(training),
        });

        if (!response.ok) {
            console.warn('API save failed, falling back to localStorage');
            return saveTrainingToLocal(training);
        }

        const data = await response.json();
        return data.training;
    } catch (error) {
        console.error('Error saving training:', error);
        return saveTrainingToLocal(training);
    }
}

/**
 * Save a training (sync, for backwards compatibility)
 */
export function saveTraining(training: Omit<StoredTraining, 'id' | 'createdAt' | 'updatedAt'>): StoredTraining {
    return saveTrainingToLocal(training);
}

function saveTrainingToLocal(training: Omit<StoredTraining, 'id' | 'createdAt' | 'updatedAt'>): StoredTraining {
    const trainings = getSavedTrainingsFromLocal();

    const newTraining: StoredTraining = {
        ...training,
        id: `training-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    trainings.unshift(newTraining);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trainings));

    return newTraining;
}

/**
 * Delete a training
 */
export async function deleteTrainingAsync(id: string, user: User | null): Promise<boolean> {
    if (!user) {
        return deleteTrainingFromLocal(id);
    }

    try {
        const response = await fetch(`/api/trainings/${id}`, {
            method: 'DELETE',
            headers: {
                'x-user': JSON.stringify(user),
            },
        });
        return response.ok;
    } catch {
        return deleteTrainingFromLocal(id);
    }
}

export function deleteTraining(id: string): boolean {
    return deleteTrainingFromLocal(id);
}

function deleteTrainingFromLocal(id: string): boolean {
    const trainings = getSavedTrainingsFromLocal();
    const filtered = trainings.filter(t => t.id !== id);

    if (filtered.length === trainings.length) return false;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    return true;
}

/**
 * Get training count
 */
export function getTrainingCount(): { total: number; published: number; drafts: number } {
    const trainings = getSavedTrainingsFromLocal();
    return {
        total: trainings.length,
        published: trainings.filter(t => t.status === 'published').length,
        drafts: trainings.filter(t => t.status === 'draft').length,
    };
}
