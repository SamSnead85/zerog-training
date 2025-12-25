// Roleplay Session Manager
// Manages AI roleplay sessions with streaming support

import { getDefaultLLMService } from '../ai/llm-service';
import type { RoleplayConfig, RoleplayState, RoleplayMessage, RoleplayEvaluation } from './engine';
import type { Message, StreamOptions } from '../ai/types';

export class RoleplaySessionManager {
    private config: RoleplayConfig;
    private state: RoleplayState;
    private llmService = getDefaultLLMService();
    private startTime: Date;

    constructor(config: RoleplayConfig) {
        this.config = config;
        this.state = this.initializeState();
        this.startTime = new Date();
    }

    private initializeState(): RoleplayState {
        return {
            messages: [{
                id: 'intro',
                role: 'system',
                content: this.buildIntroMessage(),
                timestamp: new Date(),
            }],
            turnsCompleted: 0,
            isComplete: false,
            objectivesCompleted: new Array(this.config.objectives.length).fill(false),
        };
    }

    private buildIntroMessage(): string {
        return `## ${this.config.scenario}

**Your Role:** ${this.config.learnerRole}

**You're speaking with:** ${this.config.aiName || 'AI Character'} — ${this.config.aiRole}

**Your objectives:**
${this.config.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

---

*When you're ready, start the conversation.*`;
    }

    /**
     * Get current state
     */
    getState(): RoleplayState {
        return { ...this.state };
    }

    /**
     * Get conversation history for display
     */
    getConversation(): RoleplayMessage[] {
        return this.state.messages.filter(m => m.role !== 'system' || m.id === 'intro');
    }

    /**
     * Send message with streaming response
     */
    async *sendMessageStreaming(
        message: string,
        options?: StreamOptions
    ): AsyncGenerator<string> {
        // Add learner message
        const learnerMsg: RoleplayMessage = {
            id: `learner-${Date.now()}`,
            role: 'learner',
            content: message,
            timestamp: new Date(),
        };
        this.state.messages.push(learnerMsg);

        // Build conversation for LLM
        const systemPrompt = this.buildSystemPrompt();
        const chatMessages: Message[] = [
            { role: 'system', content: systemPrompt },
            ...this.state.messages
                .filter(m => m.role !== 'system')
                .map(m => ({
                    role: m.role === 'learner' ? 'user' as const : 'assistant' as const,
                    content: m.content,
                })),
        ];

        let fullResponse = '';

        // Stream the response
        const generator = this.llmService.streamChat('roleplay', {
            messages: chatMessages,
            options: { temperature: 0.8 }
        }, options);

        for await (const token of generator) {
            fullResponse += token;
            yield token;
        }

        // Add AI response to state
        const aiMsg: RoleplayMessage = {
            id: `ai-${Date.now()}`,
            role: 'ai',
            content: fullResponse,
            timestamp: new Date(),
        };
        this.state.messages.push(aiMsg);
        this.state.turnsCompleted++;

        // Check if we should complete
        if (this.state.turnsCompleted >= this.config.maxTurns) {
            this.state.isComplete = true;
        }
    }

    /**
     * Send message (non-streaming)
     */
    async sendMessage(message: string): Promise<string> {
        let response = '';
        for await (const token of this.sendMessageStreaming(message)) {
            response += token;
        }
        return response;
    }

    /**
     * End the session and get evaluation
     */
    async endSession(): Promise<RoleplayEvaluation> {
        this.state.isComplete = true;

        const evaluation = await this.evaluateConversation();
        this.state.overallEvaluation = evaluation;

        return evaluation;
    }

    /**
     * Get session duration in seconds
     */
    getDuration(): number {
        return Math.floor((Date.now() - this.startTime.getTime()) / 1000);
    }

    private buildSystemPrompt(): string {
        return `You are ${this.config.aiName || 'the AI character'}, ${this.config.aiRole}.

## Your Personality
${this.config.aiPersonality}

## Your Background
${this.config.aiBackground}

## Current Scenario
${this.config.scenario}

${this.config.contextPrompt ? `## Organization Context\n${this.config.contextPrompt}\n` : ''}
## Behavior Guidelines
- Stay completely in character
- Respond naturally and realistically
- React authentically to what the learner says
- Don't break character to give training tips
- Keep responses concise (2-4 sentences)
- If the learner does something well, acknowledge it naturally
- If they make mistakes, react as your character would

The learner needs to demonstrate:
${this.config.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}`;
    }

    private async evaluateConversation(): Promise<RoleplayEvaluation> {
        const transcript = this.state.messages
            .filter(m => m.role !== 'system')
            .map(m => `${m.role === 'learner' ? 'LEARNER' : this.config.aiName || 'AI'}: ${m.content}`)
            .join('\n\n');

        const prompt = `Evaluate this training roleplay conversation.

## Scenario
${this.config.scenario}

## Learner's Role
${this.config.learnerRole}

## Learning Objectives
${this.config.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

## Evaluation Criteria
${this.config.evaluationCriteria.map(c => `### ${c.name}\n${c.description}\nWeight: ${c.weight}%`).join('\n\n')}

## Conversation Transcript
${transcript}

## Evaluation Task
Score each criterion 0-100 and provide specific feedback. Return JSON:

{
  "overallScore": <weighted average>,
  "criteriaScores": [
    {"criterionId": "<id>", "score": <0-100>, "feedback": "<specific feedback>"}
  ],
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<specific strength 1>", "<specific strength 2>"],
  "areasForImprovement": ["<specific improvement 1>", "<specific improvement 2>"]
}`;

        try {
            const response = await this.llmService.generateText('grading', prompt, {
                temperature: 0.2,
                maxTokens: 1000,
            });

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('No JSON in response');

            const result = JSON.parse(jsonMatch[0]);

            return {
                overallScore: result.overallScore || 70,
                passed: result.overallScore >= 70,
                criteriaScores: result.criteriaScores || [],
                summary: result.summary || 'Evaluation completed.',
                strengths: result.strengths || [],
                areasForImprovement: result.areasForImprovement || [],
            };
        } catch (error) {
            console.error('Evaluation failed:', error);
            return {
                overallScore: 70,
                passed: true,
                criteriaScores: [],
                summary: 'You completed the roleplay exercise. Review the learning objectives for self-assessment.',
                strengths: ['Participated in the full exercise'],
                areasForImprovement: ['Continue practicing these skills'],
            };
        }
    }
}

/**
 * Pre-built roleplay templates for common scenarios
 */
export const ROLEPLAY_TEMPLATES = {
    difficultCustomer: {
        scenario: 'A customer is upset about a delayed order and demanding a refund, but the delay was due to shipping carrier issues outside your control.',
        learnerRole: 'Customer Service Representative',
        aiRole: 'Frustrated Customer',
        aiName: 'Jordan',
        aiPersonality: 'Upset and impatient, but willing to listen if treated with respect. Becomes more cooperative when acknowledged.',
        aiBackground: 'Regular customer who ordered an important item for an event. The order is 3 days late.',
        objectives: [
            'Acknowledge the customer\'s frustration',
            'Explain the situation clearly without making excuses',
            'Offer a reasonable solution',
            'Maintain professionalism throughout',
        ],
        evaluationCriteria: [
            {
                id: 'empathy',
                name: 'Empathy & Acknowledgment',
                description: 'Shows understanding of customer frustration',
                weight: 25,
                examples: {
                    good: 'I understand how frustrating this must be for you',
                    poor: 'Well, it\'s not our fault',
                },
            },
            {
                id: 'clarity',
                name: 'Clear Communication',
                description: 'Explains situation clearly',
                weight: 25,
                examples: {
                    good: 'The shipping carrier experienced delays due to weather',
                    poor: 'Something happened with shipping',
                },
            },
            {
                id: 'solution',
                name: 'Problem Resolution',
                description: 'Offers reasonable solutions',
                weight: 30,
                examples: {
                    good: 'I can offer you expedited shipping at no cost',
                    poor: 'There\'s nothing I can do',
                },
            },
            {
                id: 'professionalism',
                name: 'Professionalism',
                description: 'Maintains composure and courtesy',
                weight: 20,
                examples: {
                    good: 'I appreciate your patience while we resolve this',
                    poor: 'Calm down, you\'re overreacting',
                },
            },
        ],
        maxTurns: 8,
    },

    feedbackConversation: {
        scenario: 'You need to give constructive feedback to a team member whose recent work has missed deadlines and contained errors.',
        learnerRole: 'Team Manager',
        aiRole: 'Team Member',
        aiName: 'Alex',
        aiPersonality: 'Generally good performer who has been going through personal challenges. Defensive at first but open to feedback if delivered respectfully.',
        aiBackground: 'Has been with the team for 2 years with previously strong performance. Recent 3 months have shown decline.',
        objectives: [
            'Open the conversation positively',
            'Use specific examples of the performance issues',
            'Listen to the employee\'s perspective',
            'Collaboratively create an improvement plan',
        ],
        evaluationCriteria: [
            {
                id: 'approach',
                name: 'Opening Approach',
                description: 'Starts conversation constructively',
                weight: 20,
                examples: {
                    good: 'I wanted to check in with you about how things are going',
                    poor: 'We need to talk about your performance problems',
                },
            },
            {
                id: 'specificity',
                name: 'Specific Feedback',
                description: 'Uses concrete examples',
                weight: 30,
                examples: {
                    good: 'The Johnson report was submitted 2 days late',
                    poor: 'You\'ve been missing deadlines',
                },
            },
            {
                id: 'listening',
                name: 'Active Listening',
                description: 'Shows interest in employee perspective',
                weight: 25,
                examples: {
                    good: 'What factors have been contributing to this?',
                    poor: 'I don\'t want to hear excuses',
                },
            },
            {
                id: 'action',
                name: 'Action Planning',
                description: 'Creates clear next steps',
                weight: 25,
                examples: {
                    good: 'What support would help you get back on track?',
                    poor: 'Just do better next time',
                },
            },
        ],
        maxTurns: 10,
    },

    salesDiscovery: {
        scenario: 'You\'re meeting with a potential client to understand their needs and determine if your product is a good fit.',
        learnerRole: 'Sales Representative',
        aiRole: 'Potential Client',
        aiName: 'Morgan',
        aiPersonality: 'Busy executive, skeptical of salespeople, but genuinely looking for solutions. Values time efficiency.',
        aiBackground: 'Director at a mid-size company exploring options for project management software.',
        objectives: [
            'Build rapport quickly',
            'Ask open-ended discovery questions',
            'Uncover pain points and priorities',
            'Qualify without being pushy',
        ],
        evaluationCriteria: [
            {
                id: 'rapport',
                name: 'Rapport Building',
                description: 'Creates comfortable conversation',
                weight: 20,
                examples: {
                    good: 'I noticed your company just expanded - congratulations!',
                    poor: 'Let me tell you about our product',
                },
            },
            {
                id: 'questioning',
                name: 'Discovery Questions',
                description: 'Asks insightful open-ended questions',
                weight: 35,
                examples: {
                    good: 'What challenges are you facing with your current process?',
                    poor: 'Do you want to buy our software?',
                },
            },
            {
                id: 'listening',
                name: 'Active Listening',
                description: 'Builds on what prospect shares',
                weight: 25,
                examples: {
                    good: 'You mentioned timeline visibility - can you tell me more?',
                    poor: 'Anyway, our product has great features',
                },
            },
            {
                id: 'value',
                name: 'Value Focus',
                description: 'Connects to prospect benefits',
                weight: 20,
                examples: {
                    good: 'Based on what you\'ve shared, you might benefit from...',
                    poor: 'Everyone loves our reporting features',
                },
            },
        ],
        maxTurns: 10,
    },
};
