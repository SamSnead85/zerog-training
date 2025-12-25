// AI Module Exports
// Main entry point for AI functionality

// Types
export * from './types';

// Providers
export { OpenAIProvider } from './providers/openai';
export { AnthropicProvider } from './providers/anthropic';
export { GoogleProvider } from './providers/google';

// LLM Service
export {
    LLMService,
    createLLMService,
    getDefaultLLMService,
    generateText,
    chat,
    embed,
    type OrgAIConfig,
} from './llm-service';

// Context Management
export {
    ContextManager,
    getContextManager,
    type OrganizationalContext,
    type ModuleContext,
    type ConversationContext,
    type ContentChunk,
    type RetrievedContext,
    type ContextQuery,
} from './context';

// Vector Store
export {
    InMemoryVectorStore,
    PineconeVectorStore,
    createVectorStore,
    type IVectorStore,
} from './context/vector-store';

// Document Processing
export {
    processDocument,
    extractPdfText,
    extractDocxText,
    chunkText,
    createContentChunks,
    analyzeContent,
    processAndAnalyzeDocument,
} from './document-processor';
