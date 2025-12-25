// Google Gemini Provider Implementation
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

interface GeminiContent {
    role: 'user' | 'model';
    parts: { text: string }[];
}

interface GeminiCandidate {
    content: {
        parts: { text: string }[];
        role: string;
    };
    finishReason: string;
}

interface GeminiResponse {
    candidates: GeminiCandidate[];
    usageMetadata: {
        promptTokenCount: number;
        candidatesTokenCount: number;
        totalTokenCount: number;
    };
}

interface GeminiEmbeddingResponse {
    embedding: {
        values: number[];
    };
}

interface GeminiBatchEmbeddingResponse {
    embeddings: {
        values: number[];
    }[];
}

export class GoogleProvider implements ILLMProvider {
    readonly name = 'google' as const;
    readonly config: LLMConfig;
    private baseUrl: string;

    constructor(config: LLMConfig) {
        this.config = {
            temperature: 0.7,
            maxTokens: 4096,
            ...config,
        };
        this.baseUrl = config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';
    }

    private async makeRequest<T>(
        endpoint: string,
        body: Record<string, unknown>
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}?key=${this.config.apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
            throw new Error(`Google AI API Error: ${error.error?.message || response.statusText}`);
        }

        return response.json();
    }

    private convertMessages(messages: Message[]): { systemInstruction?: string; contents: GeminiContent[] } {
        let systemInstruction: string | undefined;
        const contents: GeminiContent[] = [];

        for (const msg of messages) {
            if (msg.role === 'system') {
                systemInstruction = msg.content;
            } else {
                contents.push({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }],
                });
            }
        }

        return { systemInstruction, contents };
    }

    async generateText(prompt: string, options?: GenerateOptions): Promise<string> {
        const contents: GeminiContent[] = [
            { role: 'user', parts: [{ text: prompt }] },
        ];

        const body: Record<string, unknown> = {
            contents,
            generationConfig: {
                temperature: options?.temperature ?? this.config.temperature,
                maxOutputTokens: options?.maxTokens ?? this.config.maxTokens,
                topP: options?.topP ?? this.config.topP,
                stopSequences: options?.stopSequences,
            },
        };

        if (options?.systemPrompt) {
            body.systemInstruction = { parts: [{ text: options.systemPrompt }] };
        }

        const response = await this.makeRequest<GeminiResponse>(
            `/models/${this.config.model}:generateContent`,
            body
        );

        return response.candidates[0]?.content?.parts
            ?.map((p: { text: string }) => p.text)
            .join('') || '';
    }

    async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        const { systemInstruction, contents } = this.convertMessages(request.messages);

        const body: Record<string, unknown> = {
            contents,
            generationConfig: {
                temperature: request.options?.temperature ?? this.config.temperature,
                maxOutputTokens: request.options?.maxTokens ?? this.config.maxTokens,
                topP: request.options?.topP ?? this.config.topP,
                stopSequences: request.options?.stopSequences,
            },
        };

        if (systemInstruction) {
            body.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        const response = await this.makeRequest<GeminiResponse>(
            `/models/${this.config.model}:generateContent`,
            body
        );

        const content = response.candidates[0]?.content?.parts
            ?.map((p: { text: string }) => p.text)
            .join('') || '';

        return {
            content,
            model: this.config.model,
            usage: {
                promptTokens: response.usageMetadata?.promptTokenCount || 0,
                completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
                totalTokens: response.usageMetadata?.totalTokenCount || 0,
            },
            finishReason: this.mapFinishReason(response.candidates[0]?.finishReason),
        };
    }

    async *streamText(prompt: string, options?: StreamOptions): AsyncGenerator<string> {
        const contents: GeminiContent[] = [
            { role: 'user', parts: [{ text: prompt }] },
        ];

        const body: Record<string, unknown> = {
            contents,
            generationConfig: {
                temperature: options?.temperature ?? this.config.temperature,
                maxOutputTokens: options?.maxTokens ?? this.config.maxTokens,
            },
        };

        if (options?.systemPrompt) {
            body.systemInstruction = { parts: [{ text: options.systemPrompt }] };
        }

        const url = `${this.baseUrl}/models/${this.config.model}:streamGenerateContent?key=${this.config.apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Google AI API Error: ${response.statusText}`);
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
                        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                        if (text) {
                            fullText += text;
                            options?.onToken?.(text);
                            yield text;
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
        const { systemInstruction, contents } = this.convertMessages(request.messages);

        const body: Record<string, unknown> = {
            contents,
            generationConfig: {
                temperature: request.options?.temperature ?? this.config.temperature,
                maxOutputTokens: request.options?.maxTokens ?? this.config.maxTokens,
            },
        };

        if (systemInstruction) {
            body.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        const url = `${this.baseUrl}/models/${this.config.model}:streamGenerateContent?key=${this.config.apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Google AI API Error: ${response.statusText}`);
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
                        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                        if (text) {
                            fullText += text;
                            options?.onToken?.(text);
                            yield text;
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
        const model = request.model || 'text-embedding-004';
        const texts = Array.isArray(request.text) ? request.text : [request.text];

        if (texts.length === 1) {
            const response = await this.makeRequest<GeminiEmbeddingResponse>(
                `/models/${model}:embedContent`,
                {
                    content: { parts: [{ text: texts[0] }] },
                }
            );

            return {
                embeddings: [response.embedding.values],
                model,
                usage: { totalTokens: 0 }, // Gemini doesn't return token count for embeddings
            };
        }

        // Batch embedding
        const response = await this.makeRequest<GeminiBatchEmbeddingResponse>(
            `/models/${model}:batchEmbedContents`,
            {
                requests: texts.map((text) => ({
                    content: { parts: [{ text }] },
                })),
            }
        );

        return {
            embeddings: response.embeddings.map((e: { values: number[] }) => e.values),
            model,
            usage: { totalTokens: 0 },
        };
    }

    async validateConnection(): Promise<boolean> {
        try {
            const response = await fetch(
                `${this.baseUrl}/models?key=${this.config.apiKey}`
            );
            return response.ok;
        } catch {
            return false;
        }
    }

    private mapFinishReason(reason: string): ChatCompletionResponse['finishReason'] {
        switch (reason) {
            case 'STOP':
                return 'stop';
            case 'MAX_TOKENS':
                return 'length';
            case 'SAFETY':
                return 'content_filter';
            default:
                return 'stop';
        }
    }
}
