// Unified LLM Service
// Routes AI requests to the appropriate provider based on organization configuration

import type {
    ILLMProvider,
    LLMProvider,
    LLMConfig,
    GenerateOptions,
    StreamOptions,
    ChatCompletionRequest,
    ChatCompletionResponse,
    EmbeddingRequest,
    EmbeddingResponse,
    AITaskType,
    Message,
} from './types';
import { OpenAIProvider, AnthropicProvider, GoogleProvider } from './providers';

// Provider registry
const providerRegistry = new Map<string, ILLMProvider>();

/**
 * Create a provider instance based on configuration
 */
function createProvider(config: LLMConfig): ILLMProvider {
    switch (config.provider) {
        case 'openai':
            return new OpenAIProvider(config);
        case 'anthropic':
            return new AnthropicProvider(config);
        case 'google':
            return new GoogleProvider(config);
        case 'azure':
            // Azure uses OpenAI-compatible API
            return new OpenAIProvider({
                ...config,
                baseUrl: config.baseUrl || `https://${config.apiKey}.openai.azure.com/openai/deployments`,
            });
        default:
            throw new Error(`Unsupported provider: ${config.provider}`);
    }
}

/**
 * Get or create a cached provider instance
 */
function getProvider(config: LLMConfig): ILLMProvider {
    const key = `${config.provider}:${config.model}:${config.apiKey.slice(-8)}`;

    if (!providerRegistry.has(key)) {
        providerRegistry.set(key, createProvider(config));
    }

    return providerRegistry.get(key)!;
}

/**
 * Organization-specific AI configuration
 */
export interface OrgAIConfig {
    organizationId: string;

    // Default provider for general tasks
    defaultProvider: LLMConfig;

    // Task-specific providers (optional)
    taskProviders?: Partial<Record<AITaskType, LLMConfig>>;

    // Embedding provider (required for context system)
    embeddingProvider?: LLMConfig;
}

/**
 * Unified LLM Service
 * Handles all AI operations for an organization with automatic provider routing
 */
export class LLMService {
    private config: OrgAIConfig;

    constructor(config: OrgAIConfig) {
        this.config = config;
    }

    /**
     * Get the appropriate provider for a task
     */
    private getProviderForTask(task: AITaskType): ILLMProvider {
        const taskConfig = this.config.taskProviders?.[task];
        if (taskConfig) {
            return getProvider(taskConfig);
        }
        return getProvider(this.config.defaultProvider);
    }

    /**
     * Get the embedding provider
     */
    private getEmbeddingProvider(): ILLMProvider {
        const config = this.config.embeddingProvider || this.config.defaultProvider;
        return getProvider(config);
    }

    /**
     * Generate text for a specific task
     */
    async generateText(
        task: AITaskType,
        prompt: string,
        options?: GenerateOptions
    ): Promise<string> {
        const provider = this.getProviderForTask(task);
        return provider.generateText(prompt, options);
    }

    /**
     * Chat completion for a specific task
     */
    async chat(
        task: AITaskType,
        request: ChatCompletionRequest
    ): Promise<ChatCompletionResponse> {
        const provider = this.getProviderForTask(task);
        return provider.chat(request);
    }

    /**
     * Stream text generation
     */
    async *streamText(
        task: AITaskType,
        prompt: string,
        options?: StreamOptions
    ): AsyncGenerator<string> {
        const provider = this.getProviderForTask(task);
        yield* provider.streamText(prompt, options);
    }

    /**
     * Stream chat completion
     */
    async *streamChat(
        task: AITaskType,
        request: ChatCompletionRequest,
        options?: StreamOptions
    ): AsyncGenerator<string> {
        const provider = this.getProviderForTask(task);
        yield* provider.streamChat(request, options);
    }

    /**
     * Generate embeddings for text
     */
    async generateEmbedding(request: EmbeddingRequest): Promise<EmbeddingResponse> {
        const provider = this.getEmbeddingProvider();
        return provider.generateEmbedding(request);
    }

    /**
     * Generate embeddings for a single text (convenience method)
     */
    async embed(text: string): Promise<number[]> {
        const response = await this.generateEmbedding({ text });
        return response.embeddings[0];
    }

    /**
     * Generate embeddings for multiple texts (convenience method)
     */
    async embedBatch(texts: string[]): Promise<number[][]> {
        const response = await this.generateEmbedding({ text: texts });
        return response.embeddings;
    }

    /**
     * Validate all configured providers
     */
    async validateProviders(): Promise<Record<string, boolean>> {
        const results: Record<string, boolean> = {};

        // Validate default provider
        const defaultProvider = getProvider(this.config.defaultProvider);
        results[`default:${this.config.defaultProvider.provider}`] =
            await defaultProvider.validateConnection();

        // Validate task-specific providers
        if (this.config.taskProviders) {
            for (const [task, config] of Object.entries(this.config.taskProviders)) {
                if (config) {
                    const provider = getProvider(config);
                    results[`${task}:${config.provider}`] = await provider.validateConnection();
                }
            }
        }

        // Validate embedding provider
        if (this.config.embeddingProvider) {
            const embeddingProvider = getProvider(this.config.embeddingProvider);
            results[`embedding:${this.config.embeddingProvider.provider}`] =
                await embeddingProvider.validateConnection();
        }

        return results;
    }
}

/**
 * Create an LLM service for an organization
 * In production, this would load configuration from the database
 */
export function createLLMService(organizationId: string): LLMService {
    // Default configuration using environment variables
    const defaultConfig: OrgAIConfig = {
        organizationId,
        defaultProvider: {
            provider: 'openai',
            apiKey: process.env.OPENAI_API_KEY || '',
            model: 'gpt-4o-mini',
            temperature: 0.7,
            maxTokens: 4096,
        },
        embeddingProvider: {
            provider: 'openai',
            apiKey: process.env.OPENAI_API_KEY || '',
            model: 'text-embedding-3-small',
        },
    };

    // Add Anthropic if configured
    if (process.env.ANTHROPIC_API_KEY) {
        defaultConfig.taskProviders = {
            ...defaultConfig.taskProviders,
            roleplay: {
                provider: 'anthropic',
                apiKey: process.env.ANTHROPIC_API_KEY,
                model: 'claude-sonnet-4-20250514',
                temperature: 0.8,
                maxTokens: 4096,
            },
            simulation_generation: {
                provider: 'anthropic',
                apiKey: process.env.ANTHROPIC_API_KEY,
                model: 'claude-sonnet-4-20250514',
                temperature: 0.7,
                maxTokens: 8192,
            },
        };
    }

    // Add Google if configured
    if (process.env.GOOGLE_AI_API_KEY) {
        defaultConfig.taskProviders = {
            ...defaultConfig.taskProviders,
            content_generation: {
                provider: 'google',
                apiKey: process.env.GOOGLE_AI_API_KEY,
                model: 'gemini-2.0-flash',
                temperature: 0.7,
                maxTokens: 8192,
            },
        };
    }

    return new LLMService(defaultConfig);
}

// Convenience functions for quick access
let defaultService: LLMService | null = null;

/**
 * Get the default LLM service (uses environment configuration)
 */
export function getDefaultLLMService(): LLMService {
    if (!defaultService) {
        defaultService = createLLMService('default');
    }
    return defaultService;
}

/**
 * Quick generate text using default service
 */
export async function generateText(
    prompt: string,
    options?: GenerateOptions & { task?: AITaskType }
): Promise<string> {
    const service = getDefaultLLMService();
    return service.generateText(options?.task || 'chat', prompt, options);
}

/**
 * Quick chat using default service
 */
export async function chat(
    messages: Message[],
    options?: GenerateOptions & { task?: AITaskType }
): Promise<string> {
    const service = getDefaultLLMService();
    const response = await service.chat(options?.task || 'chat', { messages, options });
    return response.content;
}

/**
 * Quick embed using default service
 */
export async function embed(text: string): Promise<number[]> {
    const service = getDefaultLLMService();
    return service.embed(text);
}
