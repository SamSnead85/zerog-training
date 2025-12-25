// OpenAI Provider Implementation
import type {
    ILLMProvider,
    LLMConfig,
    GenerateOptions,
    StreamOptions,
    ChatCompletionRequest,
    ChatCompletionResponse,
    EmbeddingRequest,
    EmbeddingResponse,
    Message,
} from '../types';

interface OpenAIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface OpenAIChoice {
    index: number;
    message: {
        role: string;
        content: string;
    };
    finish_reason: string;
}

interface OpenAIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: OpenAIChoice[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

interface OpenAIEmbeddingData {
    object: string;
    index: number;
    embedding: number[];
}

interface OpenAIEmbeddingResponse {
    object: string;
    data: OpenAIEmbeddingData[];
    model: string;
    usage: {
        prompt_tokens: number;
        total_tokens: number;
    };
}

export class OpenAIProvider implements ILLMProvider {
    readonly name = 'openai' as const;
    readonly config: LLMConfig;
    private baseUrl: string;

    constructor(config: LLMConfig) {
        this.config = {
            temperature: 0.7,
            maxTokens: 4096,
            ...config,
        };
        this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
    }

    private async makeRequest<T>(
        endpoint: string,
        body: Record<string, unknown>
    ): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.config.apiKey}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
            throw new Error(`OpenAI API Error: ${error.error?.message || response.statusText}`);
        }

        return response.json();
    }

    async generateText(prompt: string, options?: GenerateOptions): Promise<string> {
        const messages: OpenAIMessage[] = [];

        if (options?.systemPrompt) {
            messages.push({ role: 'system', content: options.systemPrompt });
        }
        messages.push({ role: 'user', content: prompt });

        const response = await this.makeRequest<OpenAIResponse>('/chat/completions', {
            model: this.config.model,
            messages,
            temperature: options?.temperature ?? this.config.temperature,
            max_tokens: options?.maxTokens ?? this.config.maxTokens,
            top_p: options?.topP ?? this.config.topP,
            stop: options?.stopSequences,
        });

        return response.choices[0]?.message?.content || '';
    }

    async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        const messages: OpenAIMessage[] = request.messages.map((m: Message) => ({
            role: m.role,
            content: m.content,
        }));

        const response = await this.makeRequest<OpenAIResponse>('/chat/completions', {
            model: this.config.model,
            messages,
            temperature: request.options?.temperature ?? this.config.temperature,
            max_tokens: request.options?.maxTokens ?? this.config.maxTokens,
            top_p: request.options?.topP ?? this.config.topP,
            stop: request.options?.stopSequences,
        });

        return {
            content: response.choices[0]?.message?.content || '',
            model: response.model,
            usage: {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens,
            },
            finishReason: this.mapFinishReason(response.choices[0]?.finish_reason),
        };
    }

    async *streamText(prompt: string, options?: StreamOptions): AsyncGenerator<string> {
        const messages: OpenAIMessage[] = [];

        if (options?.systemPrompt) {
            messages.push({ role: 'system', content: options.systemPrompt });
        }
        messages.push({ role: 'user', content: prompt });

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.config.apiKey}`,
            },
            body: JSON.stringify({
                model: this.config.model,
                messages,
                temperature: options?.temperature ?? this.config.temperature,
                max_tokens: options?.maxTokens ?? this.config.maxTokens,
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let fullText = '';

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));

                for (const line of lines) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content || '';
                        if (content) {
                            fullText += content;
                            options?.onToken?.(content);
                            yield content;
                        }
                    } catch {
                        // Skip invalid JSON
                    }
                }
            }

            options?.onComplete?.(fullText);
        } catch (error) {
            options?.onError?.(error as Error);
            throw error;
        }
    }

    async *streamChat(
        request: ChatCompletionRequest,
        options?: StreamOptions
    ): AsyncGenerator<string> {
        const messages: OpenAIMessage[] = request.messages.map((m: Message) => ({
            role: m.role,
            content: m.content,
        }));

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.config.apiKey}`,
            },
            body: JSON.stringify({
                model: this.config.model,
                messages,
                temperature: request.options?.temperature ?? this.config.temperature,
                max_tokens: request.options?.maxTokens ?? this.config.maxTokens,
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let fullText = '';

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));

                for (const line of lines) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content || '';
                        if (content) {
                            fullText += content;
                            options?.onToken?.(content);
                            yield content;
                        }
                    } catch {
                        // Skip invalid JSON
                    }
                }
            }

            options?.onComplete?.(fullText);
        } catch (error) {
            options?.onError?.(error as Error);
            throw error;
        }
    }

    async generateEmbedding(request: EmbeddingRequest): Promise<EmbeddingResponse> {
        const input = Array.isArray(request.text) ? request.text : [request.text];

        const response = await this.makeRequest<OpenAIEmbeddingResponse>('/embeddings', {
            model: request.model || 'text-embedding-3-small',
            input,
        });

        return {
            embeddings: response.data.map((d: OpenAIEmbeddingData) => d.embedding),
            model: response.model,
            usage: {
                totalTokens: response.usage.total_tokens,
            },
        };
    }

    async validateConnection(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                headers: {
                    Authorization: `Bearer ${this.config.apiKey}`,
                },
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    private mapFinishReason(reason: string): ChatCompletionResponse['finishReason'] {
        switch (reason) {
            case 'stop':
                return 'stop';
            case 'length':
                return 'length';
            case 'content_filter':
                return 'content_filter';
            default:
                return 'stop';
        }
    }
}
