// LLM Provider Types and Interfaces
// Unified abstraction layer for multiple AI providers

export type LLMProvider = 'openai' | 'anthropic' | 'google' | 'azure' | 'custom';

export interface LLMConfig {
    provider: LLMProvider;
    apiKey: string;
    model: string;
    baseUrl?: string; // For custom endpoints
    temperature?: number;
    maxTokens?: number;
    topP?: number;
}

export interface GenerateOptions {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    stopSequences?: string[];
    systemPrompt?: string;
}

export interface StreamOptions extends GenerateOptions {
    onToken?: (token: string) => void;
    onComplete?: (fullText: string) => void;
    onError?: (error: Error) => void;
}

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface ChatCompletionRequest {
    messages: Message[];
    options?: GenerateOptions;
}

export interface ChatCompletionResponse {
    content: string;
    model: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    finishReason: 'stop' | 'length' | 'content_filter' | 'error';
}

export interface EmbeddingRequest {
    text: string | string[];
    model?: string;
}

export interface EmbeddingResponse {
    embeddings: number[][];
    model: string;
    usage: {
        totalTokens: number;
    };
}

// Provider-specific configurations
export interface OpenAIConfig extends LLMConfig {
    provider: 'openai';
    organization?: string;
}

export interface AnthropicConfig extends LLMConfig {
    provider: 'anthropic';
    anthropicVersion?: string;
}

export interface GoogleConfig extends LLMConfig {
    provider: 'google';
    projectId?: string;
    location?: string;
}

export interface AzureOpenAIConfig extends LLMConfig {
    provider: 'azure';
    deploymentName: string;
    apiVersion: string;
}

// Provider interface that all providers must implement
export interface ILLMProvider {
    readonly name: LLMProvider;
    readonly config: LLMConfig;

    // Text generation
    generateText(prompt: string, options?: GenerateOptions): Promise<string>;

    // Chat completion
    chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse>;

    // Streaming
    streamText(prompt: string, options?: StreamOptions): AsyncGenerator<string>;
    streamChat(request: ChatCompletionRequest, options?: StreamOptions): AsyncGenerator<string>;

    // Embeddings
    generateEmbedding(request: EmbeddingRequest): Promise<EmbeddingResponse>;

    // Health check
    validateConnection(): Promise<boolean>;
}

// Task types for routing to different models
export type AITaskType =
    | 'content_generation'      // Training content creation
    | 'assessment_generation'   // Quiz/test questions
    | 'simulation_generation'   // Simulation scripts
    | 'roleplay'                // AI character responses
    | 'summarization'           // Content summarization
    | 'embedding'               // Vector embeddings
    | 'grading'                 // Assessment grading
    | 'analysis'                // Content analysis
    | 'chat';                   // General chat

// Model capabilities for routing
export interface ModelCapabilities {
    supportsStreaming: boolean;
    supportsEmbeddings: boolean;
    supportsVision: boolean;
    maxContextTokens: number;
    costPerMillionTokens: number;
    bestFor: AITaskType[];
}

// Default model capabilities
export const MODEL_CAPABILITIES: Record<string, ModelCapabilities> = {
    'gpt-4o': {
        supportsStreaming: true,
        supportsEmbeddings: false,
        supportsVision: true,
        maxContextTokens: 128000,
        costPerMillionTokens: 5.0,
        bestFor: ['content_generation', 'analysis', 'grading', 'chat'],
    },
    'gpt-4o-mini': {
        supportsStreaming: true,
        supportsEmbeddings: false,
        supportsVision: true,
        maxContextTokens: 128000,
        costPerMillionTokens: 0.15,
        bestFor: ['summarization', 'assessment_generation', 'chat'],
    },
    'text-embedding-3-small': {
        supportsStreaming: false,
        supportsEmbeddings: true,
        supportsVision: false,
        maxContextTokens: 8191,
        costPerMillionTokens: 0.02,
        bestFor: ['embedding'],
    },
    'text-embedding-3-large': {
        supportsStreaming: false,
        supportsEmbeddings: true,
        supportsVision: false,
        maxContextTokens: 8191,
        costPerMillionTokens: 0.13,
        bestFor: ['embedding'],
    },
    'claude-sonnet-4-20250514': {
        supportsStreaming: true,
        supportsEmbeddings: false,
        supportsVision: true,
        maxContextTokens: 200000,
        costPerMillionTokens: 3.0,
        bestFor: ['content_generation', 'roleplay', 'simulation_generation'],
    },
    'claude-3-5-haiku-20241022': {
        supportsStreaming: true,
        supportsEmbeddings: false,
        supportsVision: true,
        maxContextTokens: 200000,
        costPerMillionTokens: 0.25,
        bestFor: ['summarization', 'chat', 'assessment_generation'],
    },
    'gemini-2.0-flash': {
        supportsStreaming: true,
        supportsEmbeddings: false,
        supportsVision: true,
        maxContextTokens: 1000000,
        costPerMillionTokens: 0.075,
        bestFor: ['content_generation', 'analysis', 'chat'],
    },
};
