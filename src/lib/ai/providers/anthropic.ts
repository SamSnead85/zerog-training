// Anthropic (Claude) Provider Implementation
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

interface AnthropicMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface AnthropicContentBlock {
    type: string;
    text: string;
}

interface AnthropicResponse {
    id: string;
    type: string;
    role: string;
    content: AnthropicContentBlock[];
    model: string;
    stop_reason: string;
    usage: {
        input_tokens: number;
        output_tokens: number;
    };
}

export class AnthropicProvider implements ILLMProvider {
    readonly name = 'anthropic' as const;
    readonly config: LLMConfig;
    private baseUrl: string;
    private anthropicVersion: string;

    constructor(config: LLMConfig & { anthropicVersion?: string }) {
        this.config = {
            temperature: 0.7,
            maxTokens: 4096,
            ...config,
        };
        this.baseUrl = config.baseUrl || 'https://api.anthropic.com/v1';
        this.anthropicVersion = config.anthropicVersion || '2023-06-01';
    }

    private async makeRequest<T>(
        endpoint: string,
        body: Record<string, unknown>
    ): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
                'anthropic-version': this.anthropicVersion,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
            throw new Error(`Anthropic API Error: ${error.error?.message || response.statusText}`);
        }

        return response.json();
    }

    private convertMessages(messages: Message[]): { system?: string; messages: AnthropicMessage[] } {
        let systemPrompt: string | undefined;
        const anthropicMessages: AnthropicMessage[] = [];

        for (const msg of messages) {
            if (msg.role === 'system') {
                systemPrompt = msg.content;
            } else {
                anthropicMessages.push({
                    role: msg.role as 'user' | 'assistant',
                    content: msg.content,
                });
            }
        }

        return { system: systemPrompt, messages: anthropicMessages };
    }

    async generateText(prompt: string, options?: GenerateOptions): Promise<string> {
        const messages: AnthropicMessage[] = [{ role: 'user', content: prompt }];

        const response = await this.makeRequest<AnthropicResponse>('/messages', {
            model: this.config.model,
            messages,
            system: options?.systemPrompt,
            max_tokens: options?.maxTokens ?? this.config.maxTokens,
            temperature: options?.temperature ?? this.config.temperature,
            top_p: options?.topP ?? this.config.topP,
            stop_sequences: options?.stopSequences,
        });

        return response.content
            .filter((block: AnthropicContentBlock) => block.type === 'text')
            .map((block: AnthropicContentBlock) => block.text)
            .join('');
    }

    async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        const { system, messages } = this.convertMessages(request.messages);

        const response = await this.makeRequest<AnthropicResponse>('/messages', {
            model: this.config.model,
            messages,
            system,
            max_tokens: request.options?.maxTokens ?? this.config.maxTokens,
            temperature: request.options?.temperature ?? this.config.temperature,
            top_p: request.options?.topP ?? this.config.topP,
            stop_sequences: request.options?.stopSequences,
        });

        const content = response.content
            .filter((block: AnthropicContentBlock) => block.type === 'text')
            .map((block: AnthropicContentBlock) => block.text)
            .join('');

        return {
            content,
            model: response.model,
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens,
            },
            finishReason: this.mapStopReason(response.stop_reason),
        };
    }

    async *streamText(prompt: string, options?: StreamOptions): AsyncGenerator<string> {
        const messages: AnthropicMessage[] = [{ role: 'user', content: prompt }];

        const response = await fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
                'anthropic-version': this.anthropicVersion,
            },
            body: JSON.stringify({
                model: this.config.model,
                messages,
                system: options?.systemPrompt,
                max_tokens: options?.maxTokens ?? this.config.maxTokens,
                temperature: options?.temperature ?? this.config.temperature,
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`Anthropic API Error: ${response.statusText}`);
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
                    if (!data) continue;

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                            const content = parsed.delta.text;
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
        const { system, messages } = this.convertMessages(request.messages);

        const response = await fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
                'anthropic-version': this.anthropicVersion,
            },
            body: JSON.stringify({
                model: this.config.model,
                messages,
                system,
                max_tokens: request.options?.maxTokens ?? this.config.maxTokens,
                temperature: request.options?.temperature ?? this.config.temperature,
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`Anthropic API Error: ${response.statusText}`);
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
                    if (!data) continue;

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                            const content = parsed.delta.text;
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

    async generateEmbedding(_request: EmbeddingRequest): Promise<EmbeddingResponse> {
        // Anthropic doesn't have a native embedding API
        // Would need to use a different provider for embeddings
        throw new Error('Anthropic does not support embeddings. Use OpenAI or another provider.');
    }

    async validateConnection(): Promise<boolean> {
        try {
            // Anthropic doesn't have a simple health check endpoint
            // Try a minimal API call
            await this.generateText('Hello', { maxTokens: 5 });
            return true;
        } catch {
            return false;
        }
    }

    private mapStopReason(reason: string): ChatCompletionResponse['finishReason'] {
        switch (reason) {
            case 'end_turn':
            case 'stop_sequence':
                return 'stop';
            case 'max_tokens':
                return 'length';
            default:
                return 'stop';
        }
    }
}
