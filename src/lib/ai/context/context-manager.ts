// Context Manager
// Manages organizational context and retrieval for AI generation

import type {
    OrganizationalContext,
    ModuleContext,
    ConversationContext,
    ConversationMessage,
    ContentChunk,
    RetrievedContext,
    ContextQuery,
} from './types';
import { createVectorStore, type IVectorStore } from './vector-store';
import { getDefaultLLMService } from '../llm-service';

// Helper functions that use the LLM service
async function embed(text: string): Promise<number[]> {
    return getDefaultLLMService().embed(text);
}

async function embedBatch(texts: string[]): Promise<number[][]> {
    return getDefaultLLMService().embedBatch(texts);
}

// Cache for organizational context
const orgContextCache = new Map<string, OrganizationalContext>();
const moduleContextCache = new Map<string, ModuleContext>();

/**
 * Context Manager
 * Handles storage, retrieval, and management of all context types
 */
export class ContextManager {
    private vectorStore: IVectorStore;

    constructor(vectorStore?: IVectorStore) {
        this.vectorStore = vectorStore || createVectorStore();
    }

    // ============================================================================
    // Organizational Context
    // ============================================================================

    /**
     * Store or update organizational context
     */
    async storeOrganizationalContext(context: OrganizationalContext): Promise<void> {
        // Cache locally
        orgContextCache.set(context.organizationId, context);

        // Generate embedding for semantic search
        const contextText = this.serializeOrgContext(context);
        const embedding = await embed(contextText);

        // Store in vector database
        await this.vectorStore.upsert(`org-${context.organizationId}`, [
            {
                id: `org-context-${context.organizationId}`,
                values: embedding,
                metadata: {
                    type: 'organizational_context',
                    organizationId: context.organizationId,
                    name: context.name,
                    industry: context.industry,
                    tools: context.tools,
                    compliance: context.compliance,
                    text: contextText,
                },
            },
        ]);
    }

    /**
     * Get organizational context
     */
    async getOrganizationalContext(organizationId: string): Promise<OrganizationalContext | null> {
        // Check cache first
        if (orgContextCache.has(organizationId)) {
            return orgContextCache.get(organizationId)!;
        }

        // Query vector store
        const dummyVector = new Array(1536).fill(0); // Dimension for text-embedding-3-small
        const results = await this.vectorStore.query(
            `org-${organizationId}`,
            dummyVector,
            1,
            { type: 'organizational_context' }
        );

        if (results.length === 0) return null;

        // Reconstruct context from metadata
        const metadata = results[0].metadata;
        const context: OrganizationalContext = {
            organizationId: metadata.organizationId as string,
            name: metadata.name as string,
            industry: metadata.industry as string | undefined,
            tools: (metadata.tools as string[]) || [],
            concepts: [],
            compliance: (metadata.compliance as string[]) || [],
        };

        // Cache for future use
        orgContextCache.set(organizationId, context);

        return context;
    }

    // ============================================================================
    // Module Context
    // ============================================================================

    /**
     * Store or update module context
     */
    async storeModuleContext(context: ModuleContext): Promise<void> {
        moduleContextCache.set(context.moduleId, context);

        const contextText = this.serializeModuleContext(context);
        const embedding = await embed(contextText);

        await this.vectorStore.upsert(`modules`, [
            {
                id: `module-context-${context.moduleId}`,
                values: embedding,
                metadata: {
                    type: 'module_context',
                    moduleId: context.moduleId,
                    title: context.title,
                    category: context.category,
                    text: contextText,
                },
            },
        ]);
    }

    /**
     * Get module context
     */
    async getModuleContext(moduleId: string): Promise<ModuleContext | null> {
        if (moduleContextCache.has(moduleId)) {
            return moduleContextCache.get(moduleId)!;
        }

        return null; // In production, would query vector store
    }

    // ============================================================================
    // Content Chunks
    // ============================================================================

    /**
     * Index content chunks from uploaded documents
     */
    async indexContentChunks(
        organizationId: string,
        chunks: ContentChunk[]
    ): Promise<void> {
        // Generate embeddings for all chunks
        const texts = chunks.map((c) => c.text);
        const embeddings = await embedBatch(texts);

        // Prepare vectors for upsert
        const vectors = chunks.map((chunk, index) => ({
            id: chunk.id,
            values: embeddings[index],
            metadata: {
                type: 'content_chunk',
                organizationId,
                contentId: chunk.contentId,
                source: chunk.metadata.source,
                pageNumber: chunk.metadata.pageNumber,
                section: chunk.metadata.section,
                chunkType: chunk.metadata.type,
                text: chunk.text,
            },
        }));

        // Store in vector database
        await this.vectorStore.upsert(`org-${organizationId}`, vectors);
    }

    /**
     * Search for relevant content chunks
     */
    async searchContent(
        organizationId: string,
        query: string,
        topK: number = 10,
        minScore: number = 0.7
    ): Promise<ContentChunk[]> {
        const queryEmbedding = await embed(query);

        const results = await this.vectorStore.query(
            `org-${organizationId}`,
            queryEmbedding,
            topK,
            { type: 'content_chunk' }
        );

        return results
            .filter((r) => r.score >= minScore)
            .map((r) => ({
                id: r.id,
                contentId: r.metadata.contentId as string,
                text: r.metadata.text as string,
                metadata: {
                    source: r.metadata.source as string,
                    pageNumber: r.metadata.pageNumber as number | undefined,
                    section: r.metadata.section as string | undefined,
                    type: r.metadata.chunkType as 'text' | 'heading' | 'list' | 'code' | 'table',
                },
            }));
    }

    // ============================================================================
    // Conversation Context
    // ============================================================================

    // In production, conversation history would be stored in the database
    private conversationCache = new Map<string, ConversationContext>();

    /**
     * Add a message to conversation history
     */
    addConversationMessage(
        conversationId: string,
        organizationId: string,
        message: Omit<ConversationMessage, 'id' | 'timestamp'>
    ): ConversationMessage {
        let conversation = this.conversationCache.get(conversationId);

        if (!conversation) {
            conversation = {
                conversationId,
                organizationId,
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            this.conversationCache.set(conversationId, conversation);
        }

        const fullMessage: ConversationMessage = {
            ...message,
            id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            timestamp: new Date(),
        };

        conversation.messages.push(fullMessage);
        conversation.updatedAt = new Date();

        return fullMessage;
    }

    /**
     * Get conversation messages
     */
    getConversationHistory(
        conversationId: string,
        maxMessages?: number
    ): ConversationMessage[] {
        const conversation = this.conversationCache.get(conversationId);
        if (!conversation) return [];

        const messages = conversation.messages;
        if (maxMessages && messages.length > maxMessages) {
            return messages.slice(-maxMessages);
        }
        return messages;
    }

    // ============================================================================
    // Context Retrieval
    // ============================================================================

    /**
     * Retrieve all relevant context for AI generation
     */
    async retrieveContext(query: ContextQuery): Promise<RetrievedContext> {
        const {
            query: searchQuery,
            organizationId,
            moduleId,
            conversationId,
            maxChunks = 10,
            minRelevance = 0.7,
            includeOrganizationalContext = true,
            includeModuleContext = true,
            includeConversationHistory = true,
        } = query;

        // Search for relevant content chunks
        const chunks = await this.searchContent(
            organizationId,
            searchQuery,
            maxChunks,
            minRelevance
        );

        // Get organizational context
        let organizationalContext: OrganizationalContext = {
            organizationId,
            name: 'Unknown Organization',
            tools: [],
            concepts: [],
            compliance: [],
        };

        if (includeOrganizationalContext) {
            const orgContext = await this.getOrganizationalContext(organizationId);
            if (orgContext) {
                organizationalContext = orgContext;
            }
        }

        // Get module context
        let moduleContext: ModuleContext | undefined;
        if (includeModuleContext && moduleId) {
            moduleContext = (await this.getModuleContext(moduleId)) || undefined;
        }

        // Get conversation history
        let conversationHistory: ConversationMessage[] | undefined;
        if (includeConversationHistory && conversationId) {
            conversationHistory = this.getConversationHistory(conversationId, 20);
        }

        return {
            chunks,
            organizationalContext,
            moduleContext,
            conversationHistory,
            relevanceScores: chunks.map(() => 1), // Placeholder - actual scores from vector search
        };
    }

    /**
     * Format retrieved context for injection into AI prompts
     */
    formatContextForPrompt(context: RetrievedContext): string {
        const sections: string[] = [];

        // Organizational context
        if (context.organizationalContext) {
            const org = context.organizationalContext;
            sections.push(`## Organization Context
Organization: ${org.name}
Industry: ${org.industry || 'Not specified'}
Tools Used: ${org.tools.join(', ') || 'None specified'}
Compliance Requirements: ${org.compliance.join(', ') || 'None specified'}`);
        }

        // Module context
        if (context.moduleContext) {
            const mod = context.moduleContext;
            sections.push(`## Training Module Context
Title: ${mod.title}
Category: ${mod.category || 'General'}
Learning Objectives:
${mod.learningObjectives.map((obj) => `- ${obj}`).join('\n')}`);
        }

        // Relevant content
        if (context.chunks.length > 0) {
            sections.push(`## Relevant Organizational Content
${context.chunks
                    .map(
                        (chunk, i) =>
                            `[Source ${i + 1}: ${chunk.metadata.source}]
${chunk.text}`
                    )
                    .join('\n\n')}`);
        }

        // Conversation history
        if (context.conversationHistory && context.conversationHistory.length > 0) {
            sections.push(`## Previous Conversation
${context.conversationHistory
                    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
                    .join('\n')}`);
        }

        return sections.join('\n\n');
    }

    // ============================================================================
    // Helper Methods
    // ============================================================================

    private serializeOrgContext(context: OrganizationalContext): string {
        return `
Organization: ${context.name}
Industry: ${context.industry || 'Not specified'}
Size: ${context.size || 'Not specified'}
Tools Used: ${context.tools.join(', ')}
Key Concepts: ${context.concepts.join(', ')}
Compliance: ${context.compliance.join(', ')}
Values: ${context.values?.join(', ') || 'Not specified'}
Culture: ${context.culture || 'Not specified'}
`.trim();
    }

    private serializeModuleContext(context: ModuleContext): string {
        return `
Module: ${context.title}
Description: ${context.description || 'No description'}
Category: ${context.category || 'General'}
Target Audience: ${context.targetAudience || 'All learners'}
Difficulty: ${context.difficulty || 'Intermediate'}
Learning Objectives:
${context.learningObjectives.map((obj) => `- ${obj}`).join('\n')}
`.trim();
    }
}

// Singleton instance
let contextManager: ContextManager | null = null;

/**
 * Get the context manager singleton
 */
export function getContextManager(): ContextManager {
    if (!contextManager) {
        contextManager = new ContextManager();
    }
    return contextManager;
}
