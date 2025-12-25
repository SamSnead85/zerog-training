// Document Processing Pipeline
// Extracts text from PDFs, Word documents, and other file types

import type { ContentChunk } from './context/types';

// Type definitions for document extraction results
interface ExtractionResult {
    text: string;
    metadata: {
        pages?: number;
        title?: string;
        author?: string;
    };
}

interface PageContent {
    page: number;
    text: string;
}

/**
 * Extract text from a PDF file
 */
export async function extractPdfText(buffer: Buffer): Promise<ExtractionResult> {
    // Dynamic import to avoid issues in edge runtime
    // @ts-expect-error - pdf-parse has inconsistent module exports
    const pdfParse = (await import('pdf-parse')).default || (await import('pdf-parse'));

    const data = await pdfParse(buffer);

    return {
        text: data.text,
        metadata: {
            pages: data.numpages,
            title: data.info?.Title,
            author: data.info?.Author,
        },
    };
}

/**
 * Extract text from a Word document (.docx)
 */
export async function extractDocxText(buffer: Buffer): Promise<ExtractionResult> {
    const mammoth = await import('mammoth');

    const result = await mammoth.extractRawText({ buffer });

    return {
        text: result.value,
        metadata: {},
    };
}

/**
 * Extract text from a plain text file
 */
export function extractTextContent(buffer: Buffer): ExtractionResult {
    return {
        text: buffer.toString('utf-8'),
        metadata: {},
    };
}

/**
 * Process a document based on file type
 */
export async function processDocument(
    buffer: Buffer,
    fileName: string,
    mimeType: string
): Promise<ExtractionResult> {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'pdf':
            return extractPdfText(buffer);
        case 'docx':
            return extractDocxText(buffer);
        case 'txt':
        case 'md':
        case 'csv':
            return extractTextContent(buffer);
        default:
            throw new Error(`Unsupported file type: ${extension} (${mimeType})`);
    }
}

/**
 * Split text into semantic chunks for embedding
 */
export function chunkText(
    text: string,
    options: {
        maxChunkSize?: number;
        overlapSize?: number;
        splitOn?: 'paragraph' | 'sentence' | 'fixed';
    } = {}
): string[] {
    const {
        maxChunkSize = 1000,
        overlapSize = 100,
        splitOn = 'paragraph',
    } = options;

    const chunks: string[] = [];

    if (splitOn === 'paragraph') {
        // Split on double newlines (paragraphs)
        const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());

        let currentChunk = '';

        for (const paragraph of paragraphs) {
            if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk) {
                chunks.push(currentChunk.trim());
                // Keep some overlap
                const words = currentChunk.split(' ');
                currentChunk = words.slice(-Math.floor(overlapSize / 5)).join(' ') + '\n\n';
            }
            currentChunk += paragraph + '\n\n';
        }

        if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
        }
    } else if (splitOn === 'sentence') {
        // Split on sentence boundaries
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

        let currentChunk = '';

        for (const sentence of sentences) {
            if (currentChunk.length + sentence.length > maxChunkSize && currentChunk) {
                chunks.push(currentChunk.trim());
                currentChunk = '';
            }
            currentChunk += sentence + ' ';
        }

        if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
        }
    } else {
        // Fixed size splitting with overlap
        for (let i = 0; i < text.length; i += maxChunkSize - overlapSize) {
            const chunk = text.slice(i, i + maxChunkSize);
            if (chunk.trim()) {
                chunks.push(chunk.trim());
            }
        }
    }

    return chunks;
}

/**
 * Create content chunks from extracted text
 */
export function createContentChunks(
    contentId: string,
    text: string,
    source: string,
    options?: {
        maxChunkSize?: number;
        overlapSize?: number;
    }
): ContentChunk[] {
    const textChunks = chunkText(text, options);

    return textChunks.map((chunk, index) => ({
        id: `${contentId}-chunk-${index}`,
        contentId,
        text: chunk,
        metadata: {
            source,
            type: 'text' as const,
        },
    }));
}

/**
 * Analyze content to detect tools, concepts, and compliance references
 */
export function analyzeContent(text: string): {
    tools: string[];
    concepts: string[];
    compliance: string[];
} {
    const tools = new Set<string>();
    const concepts = new Set<string>();
    const compliance = new Set<string>();

    // Common tools to detect
    const toolPatterns: [RegExp, string][] = [
        [/\bepic\s*(ehr|emr)?\b/i, 'Epic EHR'],
        [/\bcerner\b/i, 'Cerner'],
        [/\bsalesforce\b/i, 'Salesforce'],
        [/\bjira\b/i, 'Jira'],
        [/\bconfluence\b/i, 'Confluence'],
        [/\bslack\b/i, 'Slack'],
        [/\bmicrosoft\s*teams\b/i, 'Microsoft Teams'],
        [/\bworkday\b/i, 'Workday'],
        [/\bsap\b/i, 'SAP'],
        [/\boracle\b/i, 'Oracle'],
        [/\bzendesk\b/i, 'Zendesk'],
        [/\bhubspot\b/i, 'HubSpot'],
        [/\bgithub\b/i, 'GitHub'],
        [/\bgitlab\b/i, 'GitLab'],
        [/\bazure\s*(devops)?\b/i, 'Azure'],
        [/\baws\b/i, 'AWS'],
        [/\bgoogle\s*(workspace|cloud)\b/i, 'Google'],
    ];

    // Compliance terms to detect
    const compliancePatterns: [RegExp, string][] = [
        [/\bhipaa\b/i, 'HIPAA'],
        [/\bgdpr\b/i, 'GDPR'],
        [/\bsoc\s*2\b/i, 'SOC 2'],
        [/\bpci[\s-]*dss\b/i, 'PCI DSS'],
        [/\bferpa\b/i, 'FERPA'],
        [/\bccpa\b/i, 'CCPA'],
        [/\biso\s*27001\b/i, 'ISO 27001'],
        [/\bnist\b/i, 'NIST'],
        [/\baml\b/i, 'AML'],
        [/\bkyc\b/i, 'KYC'],
    ];

    // Common concepts to detect
    const conceptPatterns: [RegExp, string][] = [
        [/\bphi\b/i, 'PHI'],
        [/\bpii\b/i, 'PII'],
        [/\behr\b/i, 'EHR'],
        [/\bemr\b/i, 'EMR'],
        [/\bagile\b/i, 'Agile'],
        [/\bscrum\b/i, 'Scrum'],
        [/\bkanban\b/i, 'Kanban'],
        [/\bsprint\b/i, 'Sprint'],
        [/\bdevops\b/i, 'DevOps'],
        [/\bci[\s/]*cd\b/i, 'CI/CD'],
        [/\bdata\s*breach\b/i, 'Data Breach'],
        [/\bincident\s*response\b/i, 'Incident Response'],
        [/\brisk\s*assessment\b/i, 'Risk Assessment'],
        [/\bonboarding\b/i, 'Onboarding'],
    ];

    // Check all patterns
    for (const [pattern, name] of toolPatterns) {
        if (pattern.test(text)) {
            tools.add(name);
        }
    }

    for (const [pattern, name] of compliancePatterns) {
        if (pattern.test(text)) {
            compliance.add(name);
        }
    }

    for (const [pattern, name] of conceptPatterns) {
        if (pattern.test(text)) {
            concepts.add(name);
        }
    }

    return {
        tools: Array.from(tools),
        concepts: Array.from(concepts),
        compliance: Array.from(compliance),
    };
}

/**
 * Full document processing pipeline
 */
export async function processAndAnalyzeDocument(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    contentId: string
): Promise<{
    text: string;
    chunks: ContentChunk[];
    analysis: {
        tools: string[];
        concepts: string[];
        compliance: string[];
    };
}> {
    // Extract text
    const { text } = await processDocument(buffer, fileName, mimeType);

    // Create chunks
    const chunks = createContentChunks(contentId, text, fileName);

    // Analyze content
    const analysis = analyzeContent(text);

    return {
        text,
        chunks,
        analysis,
    };
}
