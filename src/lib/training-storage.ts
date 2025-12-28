/**
 * Training Storage Service
 * Persists user-created trainings to localStorage and provides retrieval methods
 */

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
}

export interface TrainingSection {
    title: string;
    type: 'reading' | 'quiz' | 'scenario';
    duration: string;
    preview: string;
    content?: string;
}

const STORAGE_KEY = 'zerog_user_trainings';

/**
 * Get all saved trainings
 */
export function getSavedTrainings(): StoredTraining[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored) as StoredTraining[];
    } catch {
        return [];
    }
}

/**
 * Get a single training by ID
 */
export function getTrainingById(id: string): StoredTraining | null {
    const trainings = getSavedTrainings();
    return trainings.find(t => t.id === id) || null;
}

/**
 * Save a new training
 */
export function saveTraining(training: Omit<StoredTraining, 'id' | 'createdAt' | 'updatedAt'>): StoredTraining {
    const trainings = getSavedTrainings();

    const newTraining: StoredTraining = {
        ...training,
        id: `training-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    trainings.unshift(newTraining);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));

    return newTraining;
}

/**
 * Update an existing training
 */
export function updateTraining(id: string, updates: Partial<StoredTraining>): StoredTraining | null {
    const trainings = getSavedTrainings();
    const index = trainings.findIndex(t => t.id === id);

    if (index === -1) return null;

    trainings[index] = {
        ...trainings[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
    return trainings[index];
}

/**
 * Delete a training
 */
export function deleteTraining(id: string): boolean {
    const trainings = getSavedTrainings();
    const filtered = trainings.filter(t => t.id !== id);

    if (filtered.length === trainings.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
}

/**
 * Publish a draft training
 */
export function publishTraining(id: string): StoredTraining | null {
    return updateTraining(id, { status: 'published' });
}

/**
 * Get training count
 */
export function getTrainingCount(): { total: number; published: number; drafts: number } {
    const trainings = getSavedTrainings();
    return {
        total: trainings.length,
        published: trainings.filter(t => t.status === 'published').length,
        drafts: trainings.filter(t => t.status === 'draft').length,
    };
}
