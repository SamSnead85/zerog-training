import { supabase, createServerClient, DbUser, DbSession, DbTrainingProgress, DbDemoLead } from './client';
import bcrypt from 'bcryptjs';

// =============================================================================
// USER OPERATIONS
// =============================================================================

export async function createUser(data: {
    email: string;
    name: string;
    password: string;
    role?: DbUser['role'];
    certificationPath?: string;
    department?: string;
}): Promise<{ user: DbUser | null; error: string | null }> {
    try {
        // Hash password
        const passwordHash = await bcrypt.hash(data.password, 10);

        const { data: user, error } = await supabase
            .from('users')
            .insert({
                email: data.email.toLowerCase(),
                name: data.name,
                password_hash: passwordHash,
                role: data.role || 'LEARNER',
                certification_path: data.certificationPath,
                department: data.department,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating user:', error);
            return { user: null, error: error.message };
        }

        return { user: user as DbUser, error: null };
    } catch (err) {
        console.error('Error creating user:', err);
        return { user: null, error: 'Failed to create user' };
    }
}

export async function getUserByEmail(email: string): Promise<DbUser | null> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return data as DbUser;
}

export async function getAllUsers(): Promise<DbUser[]> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return data as DbUser[];
}

export async function verifyPassword(email: string, password: string): Promise<{ valid: boolean; user: DbUser | null }> {
    const user = await getUserByEmail(email);

    if (!user || !user.password_hash) {
        return { valid: false, user: null };
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    return { valid, user: valid ? user : null };
}

// =============================================================================
// SESSION OPERATIONS
// =============================================================================

export async function createSession(userId: string): Promise<{ token: string | null; error: string | null }> {
    try {
        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        const { error } = await supabase
            .from('sessions')
            .insert({
                user_id: userId,
                token,
                expires_at: expiresAt.toISOString(),
            });

        if (error) {
            console.error('Error creating session:', error);
            return { token: null, error: error.message };
        }

        return { token, error: null };
    } catch (err) {
        console.error('Error creating session:', err);
        return { token: null, error: 'Failed to create session' };
    }
}

export async function getSessionByToken(token: string): Promise<{ session: DbSession | null; user: DbUser | null }> {
    const { data: session, error } = await supabase
        .from('sessions')
        .select('*, users(*)')
        .eq('token', token)
        .gt('expires_at', new Date().toISOString())
        .single();

    if (error || !session) {
        return { session: null, user: null };
    }

    return {
        session: session as DbSession,
        user: (session as any).users as DbUser,
    };
}

export async function deleteSession(token: string): Promise<void> {
    await supabase
        .from('sessions')
        .delete()
        .eq('token', token);
}

export async function deleteUserSessions(userId: string): Promise<void> {
    await supabase
        .from('sessions')
        .delete()
        .eq('user_id', userId);
}

// =============================================================================
// PROGRESS OPERATIONS
// =============================================================================

export async function saveProgress(data: {
    userId: string;
    moduleId: string;
    lessonId?: string;
    status: 'not_started' | 'in_progress' | 'completed';
    progressPct: number;
}): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .from('training_progress')
            .upsert({
                user_id: data.userId,
                module_id: data.moduleId,
                lesson_id: data.lessonId || null,
                status: data.status,
                progress_pct: data.progressPct,
                completed_at: data.status === 'completed' ? new Date().toISOString() : null,
            }, {
                onConflict: 'user_id,module_id,lesson_id',
            });

        if (error) {
            console.error('Error saving progress:', error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        console.error('Error saving progress:', err);
        return { success: false, error: 'Failed to save progress' };
    }
}

export async function getUserProgress(userId: string): Promise<DbTrainingProgress[]> {
    const { data, error } = await supabase
        .from('training_progress')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Error fetching progress:', error);
        return [];
    }

    return data as DbTrainingProgress[];
}

export async function getModuleProgress(userId: string, moduleId: string): Promise<DbTrainingProgress[]> {
    const { data, error } = await supabase
        .from('training_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId);

    if (error) {
        console.error('Error fetching module progress:', error);
        return [];
    }

    return data as DbTrainingProgress[];
}

// =============================================================================
// LEAD OPERATIONS
// =============================================================================

export async function saveDemoLead(data: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    teamSize?: string;
    message?: string;
}): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .from('demo_leads')
            .insert({
                name: data.name,
                email: data.email,
                company: data.company,
                role: data.role,
                team_size: data.teamSize,
                message: data.message,
            });

        if (error) {
            console.error('Error saving lead:', error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        console.error('Error saving lead:', err);
        return { success: false, error: 'Failed to save lead' };
    }
}

export async function getAllLeads(): Promise<DbDemoLead[]> {
    const { data, error } = await supabase
        .from('demo_leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        return [];
    }

    return data as DbDemoLead[];
}
