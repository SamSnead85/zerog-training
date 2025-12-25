// Vector Store Abstraction
// Unified interface for vector database operations

import type { ContentChunk } from './types';

export interface VectorSearchResult {
    id: string;
    score: number;
    metadata: Record<string, unknown>;
    text?: string;
}

export interface VectorUpsertRequest {
    id: string;
    values: number[];
    metadata: Record<string, unknown>;
}

export interface IVectorStore {
    // Namespace/index management
    createNamespace(name: string): Promise<void>;
    deleteNamespace(name: string): Promise<void>;

    // Vector operations
    upsert(namespace: string, vectors: VectorUpsertRequest[]): Promise<void>;
    query(
        namespace: string,
        vector: number[],
        topK: number,
        filter?: Record<string, unknown>
    ): Promise<VectorSearchResult[]>;
    delete(namespace: string, ids: string[]): Promise<void>;

    // Health check
    ping(): Promise<boolean>;
}

/**
 * In-Memory Vector Store
 * For development and testing - not for production use
 */
export class InMemoryVectorStore implements IVectorStore {
    private namespaces: Map<string, Map<string, { values: number[]; metadata: Record<string, unknown> }>> = new Map();

    async createNamespace(name: string): Promise<void> {
        if (!this.namespaces.has(name)) {
            this.namespaces.set(name, new Map());
        }
    }

    async deleteNamespace(name: string): Promise<void> {
        this.namespaces.delete(name);
    }

    async upsert(namespace: string, vectors: VectorUpsertRequest[]): Promise<void> {
        await this.createNamespace(namespace);
        const ns = this.namespaces.get(namespace)!;

        for (const vector of vectors) {
            ns.set(vector.id, {
                values: vector.values,
                metadata: vector.metadata,
            });
        }
    }

    async query(
        namespace: string,
        vector: number[],
        topK: number,
        filter?: Record<string, unknown>
    ): Promise<VectorSearchResult[]> {
        const ns = this.namespaces.get(namespace);
        if (!ns) return [];

        const results: VectorSearchResult[] = [];

        for (const [id, data] of ns.entries()) {
            // Apply filter if provided
            if (filter) {
                let matches = true;
                for (const [key, value] of Object.entries(filter)) {
                    if (data.metadata[key] !== value) {
                        matches = false;
                        break;
                    }
                }
                if (!matches) continue;
            }

            // Calculate cosine similarity
            const score = this.cosineSimilarity(vector, data.values);
            results.push({
                id,
                score,
                metadata: data.metadata,
                text: data.metadata.text as string | undefined,
            });
        }

        // Sort by score descending and take top K
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }

    async delete(namespace: string, ids: string[]): Promise<void> {
        const ns = this.namespaces.get(namespace);
        if (!ns) return;

        for (const id of ids) {
            ns.delete(id);
        }
    }

    async ping(): Promise<boolean> {
        return true;
    }

    private cosineSimilarity(a: number[], b: number[]): number {
        if (a.length !== b.length) return 0;

        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        const denominator = Math.sqrt(normA) * Math.sqrt(normB);
        if (denominator === 0) return 0;

        return dotProduct / denominator;
    }
}

/**
 * Pinecone Vector Store
 * Production-ready vector database
 */
export class PineconeVectorStore implements IVectorStore {
    private apiKey: string;
    private environment: string;
    private indexHost: string;

    constructor(config: {
        apiKey: string;
        environment: string;
        indexHost: string;
    }) {
        this.apiKey = config.apiKey;
        this.environment = config.environment;
        this.indexHost = config.indexHost;
    }

    private async fetch(
        path: string,
        options: RequestInit = {}
    ): Promise<Response> {
        const url = `${this.indexHost}${path}`;

        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': this.apiKey,
                ...options.headers,
            },
        });
    }

    async createNamespace(_name: string): Promise<void> {
        // Pinecone namespaces are created automatically on first upsert
    }

    async deleteNamespace(name: string): Promise<void> {
        await this.fetch('/vectors/delete', {
            method: 'POST',
            body: JSON.stringify({
                namespace: name,
                deleteAll: true,
            }),
        });
    }

    async upsert(namespace: string, vectors: VectorUpsertRequest[]): Promise<void> {
        const response = await this.fetch('/vectors/upsert', {
            method: 'POST',
            body: JSON.stringify({
                namespace,
                vectors: vectors.map((v) => ({
                    id: v.id,
                    values: v.values,
                    metadata: v.metadata,
                })),
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(`Pinecone upsert failed: ${JSON.stringify(error)}`);
        }
    }

    async query(
        namespace: string,
        vector: number[],
        topK: number,
        filter?: Record<string, unknown>
    ): Promise<VectorSearchResult[]> {
        const body: Record<string, unknown> = {
            namespace,
            vector,
            topK,
            includeMetadata: true,
        };

        if (filter) {
            body.filter = filter;
        }

        const response = await this.fetch('/query', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(`Pinecone query failed: ${JSON.stringify(error)}`);
        }

        interface PineconeMatch {
            id: string;
            score: number;
            metadata?: Record<string, unknown>;
        }

        const data = await response.json();
        return (data.matches || []).map((match: PineconeMatch) => ({
            id: match.id,
            score: match.score,
            metadata: match.metadata || {},
            text: match.metadata?.text as string | undefined,
        }));
    }

    async delete(namespace: string, ids: string[]): Promise<void> {
        await this.fetch('/vectors/delete', {
            method: 'POST',
            body: JSON.stringify({
                namespace,
                ids,
            }),
        });
    }

    async ping(): Promise<boolean> {
        try {
            const response = await this.fetch('/describe_index_stats', {
                method: 'POST',
                body: JSON.stringify({}),
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

/**
 * Create a vector store based on environment configuration
 */
export function createVectorStore(): IVectorStore {
    const pineconeApiKey = process.env.PINECONE_API_KEY;
    const pineconeHost = process.env.PINECONE_INDEX_HOST;
    const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT;

    if (pineconeApiKey && pineconeHost && pineconeEnvironment) {
        return new PineconeVectorStore({
            apiKey: pineconeApiKey,
            environment: pineconeEnvironment,
            indexHost: pineconeHost,
        });
    }

    // Fall back to in-memory store for development
    console.warn('Using in-memory vector store. Configure Pinecone for production.');
    return new InMemoryVectorStore();
}
