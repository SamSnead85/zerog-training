import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client - for use in client components
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Server client factory - for use in API routes with service role
export function createServerClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
    }
    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface DbUser {
    id: string;
    email: string;
    name: string | null;
    password_hash: string | null;
    role: 'SUPER_ADMIN' | 'ORG_ADMIN' | 'CREATOR' | 'MANAGER' | 'LEARNER';
    organization_id: string | null;
    certification_path: string | null;
    department: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbSession {
    id: string;
    user_id: string;
    expires_at: string;
    created_at: string;
}

export interface DbTrainingProgress {
    id: string;
    user_id: string;
    module_id: string;
    lesson_id: string | null;
    status: 'not_started' | 'in_progress' | 'completed';
    progress_pct: number;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbDemoLead {
    id: string;
    name: string;
    email: string;
    company: string | null;
    role: string | null;
    team_size: string | null;
    created_at: string;
}
