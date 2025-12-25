// Context Management Types
// Manages organizational context, module context, and conversation history

export interface OrganizationalContext {
    organizationId: string;
    name: string;
    industry?: string;
    size?: string;

    // Detected from uploaded content
    tools: string[];       // e.g., ["Epic EHR", "Jira", "Salesforce"]
    concepts: string[];    // e.g., ["PHI", "HIPAA", "sprint planning"]
    compliance: string[];  // e.g., ["HIPAA", "SOC 2", "GDPR"]

    // Organization values and culture (extracted from content)
    values?: string[];
    culture?: string;

    // Tech stack configuration
    techStack?: {
        category: string;
        tools: string[];
    }[];
}

export interface ModuleContext {
    moduleId: string;
    title: string;
    description?: string;
    category?: string;

    // Learning context
    learningObjectives: string[];
    targetAudience?: string;
    difficulty?: string;
    bloomLevels?: string[];

    // Customization history
    customizationNotes?: string[];

    // Related content references
    relatedContentIds?: string[];
}

export interface ConversationMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: {
        task?: string;
        tokens?: number;
        model?: string;
    };
}

export interface ConversationContext {
    conversationId: string;
    moduleId?: string;
    organizationId: string;
    messages: ConversationMessage[];
    summary?: string;  // AI-generated summary of conversation
    createdAt: Date;
    updatedAt: Date;
}

export interface ContentChunk {
    id: string;
    contentId: string;    // Reference to OrganizationalContent
    text: string;
    embedding?: number[];
    metadata: {
        source: string;      // File name or URL
        pageNumber?: number;
        section?: string;
        type: 'text' | 'heading' | 'list' | 'code' | 'table';
    };
}

export interface RetrievedContext {
    chunks: ContentChunk[];
    organizationalContext: OrganizationalContext;
    moduleContext?: ModuleContext;
    conversationHistory?: ConversationMessage[];
    relevanceScores: number[];
}

export interface ContextQuery {
    query: string;
    organizationId: string;
    moduleId?: string;
    conversationId?: string;
    maxChunks?: number;
    minRelevance?: number;
    includeOrganizationalContext?: boolean;
    includeModuleContext?: boolean;
    includeConversationHistory?: boolean;
}
