// Module Generation Service
// AI-powered training module content generation

import { getDefaultLLMService } from '../ai/llm-service';
import { getContextManager } from '../ai/context';
import type { ModuleTemplate } from './templates';

export interface GeneratedLesson {
    title: string;
    order: number;
    content: string; // Rich HTML/Markdown content
    summary: string;
    estimatedDuration: number;
    bloomLevel: string;
}

export interface GeneratedAssessment {
    type: 'quiz' | 'knowledge_check';
    questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
    id: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    question: string;
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
    points: number;
}

export interface GeneratedSimulation {
    type: 'software_interface' | 'scenario_branching' | 'ai_roleplay';
    title: string;
    description: string;
    script: SimulationScript;
}

export interface SimulationScript {
    introduction: string;
    steps?: SimulationStep[];
    branches?: ScenarioBranch[];
    roleplayContext?: RoleplayContext;
}

export interface SimulationStep {
    id: string;
    instruction: string;
    expectedAction: string;
    hints: string[];
    feedback: {
        correct: string;
        incorrect: string;
    };
}

export interface ScenarioBranch {
    id: string;
    situation: string;
    options: {
        text: string;
        nextBranchId?: string;
        outcome: 'good' | 'neutral' | 'bad';
        feedback: string;
    }[];
}

export interface RoleplayContext {
    scenario: string;
    learnerRole: string;
    aiRole: string;
    aiPersonality: string;
    objectives: string[];
    evaluationCriteria: string[];
}

export interface GeneratedModule {
    template: ModuleTemplate;
    customization: {
        organizationId: string;
        customTitle?: string;
        customDescription?: string;
        includedTools: string[];
        includedPolicies: string[];
        tone: 'formal' | 'casual' | 'professional';
    };
    lessons: GeneratedLesson[];
    assessments: GeneratedAssessment[];
    simulation?: GeneratedSimulation;
}

/**
 * Module Generation Service
 * Uses AI to generate customized training content
 */
export class ModuleGenerationService {
    private llmService = getDefaultLLMService();
    private contextManager = getContextManager();

    /**
     * Generate a complete training module from a template
     */
    async generateModule(
        template: ModuleTemplate,
        organizationId: string,
        options: {
            customTitle?: string;
            customDescription?: string;
            tone?: 'formal' | 'casual' | 'professional';
        } = {}
    ): Promise<GeneratedModule> {
        // Retrieve organizational context
        const context = await this.contextManager.retrieveContext({
            query: template.title + ' ' + template.keywords.join(' '),
            organizationId,
            maxChunks: 10,
            minRelevance: 0.6,
        });

        const formattedContext = this.contextManager.formatContextForPrompt(context);

        // Generate lessons
        const lessons = await this.generateLessons(template, formattedContext, options.tone);

        // Generate assessments
        const assessments = await this.generateAssessments(template, lessons);

        // Generate simulation if applicable
        let simulation: GeneratedSimulation | undefined;
        if (template.hasSimulation && template.simulationType) {
            simulation = await this.generateSimulation(template, formattedContext);
        }

        return {
            template,
            customization: {
                organizationId,
                customTitle: options.customTitle,
                customDescription: options.customDescription,
                includedTools: context.organizationalContext.tools,
                includedPolicies: [], // Would be extracted from context
                tone: options.tone || 'professional',
            },
            lessons,
            assessments,
            simulation,
        };
    }

    /**
     * Generate lesson content
     */
    private async generateLessons(
        template: ModuleTemplate,
        context: string,
        tone: string = 'professional'
    ): Promise<GeneratedLesson[]> {
        const prompt = `You are creating training content for a module titled "${template.title}".

${context}

## Module Information
- Description: ${template.description}
- Target Audience: ${template.targetAudience.join(', ')}
- Learning Objectives:
${template.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}
- Bloom's Taxonomy Levels: ${template.bloomLevels.join(', ')}
- Estimated Total Duration: ${template.estimatedDuration} minutes
- Tone: ${tone}

## Task
Generate 3-5 lesson outlines for this module. Each lesson should:
1. Have a clear, engaging title
2. Focus on one learning objective
3. Include practical examples using the organization's context
4. Be appropriately timed (total should equal estimated duration)

Return your response as a JSON array with this structure:
[
  {
    "title": "Lesson title",
    "order": 1,
    "summary": "Brief 1-2 sentence summary",
    "estimatedDuration": 15,
    "bloomLevel": "apply",
    "contentOutline": ["Key point 1", "Key point 2", "Activity description"]
  }
]

Only return the JSON array, no other text.`;

        const response = await this.llmService.generateText('content_generation', prompt, {
            temperature: 0.7,
            maxTokens: 2000,
        });

        try {
            // Clean the response - find JSON array
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                throw new Error('No JSON array found in response');
            }

            const lessonOutlines = JSON.parse(jsonMatch[0]);

            // Expand each outline into full content
            const lessons: GeneratedLesson[] = await Promise.all(
                lessonOutlines.map(async (outline: {
                    title: string;
                    order: number;
                    summary: string;
                    estimatedDuration: number;
                    bloomLevel: string;
                    contentOutline: string[];
                }) => {
                    const content = await this.expandLessonContent(outline, context, tone);
                    return {
                        title: outline.title,
                        order: outline.order,
                        content,
                        summary: outline.summary,
                        estimatedDuration: outline.estimatedDuration,
                        bloomLevel: outline.bloomLevel,
                    };
                })
            );

            return lessons;
        } catch (error) {
            console.error('Failed to parse lesson response:', error);
            // Return a default lesson structure
            return [{
                title: 'Introduction to ' + template.title,
                order: 1,
                content: `# ${template.title}\n\n${template.description}`,
                summary: template.description,
                estimatedDuration: template.estimatedDuration,
                bloomLevel: template.bloomLevels[0],
            }];
        }
    }

    /**
     * Expand a lesson outline into full content
     */
    private async expandLessonContent(
        outline: {
            title: string;
            contentOutline: string[];
        },
        context: string,
        tone: string
    ): Promise<string> {
        const prompt = `Create detailed lesson content for: "${outline.title}"

${context}

Content outline to expand:
${outline.contentOutline.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Tone: ${tone}

Write the lesson content in Markdown format:
- Use headers (##, ###) to organize sections
- Include practical examples relevant to the organization
- Add key takeaways or callout boxes where appropriate
- Make it engaging and actionable
- Keep paragraphs concise

Return only the Markdown content.`;

        return this.llmService.generateText('content_generation', prompt, {
            temperature: 0.7,
            maxTokens: 1500,
        });
    }

    /**
     * Generate assessment questions
     */
    private async generateAssessments(
        template: ModuleTemplate,
        lessons: GeneratedLesson[]
    ): Promise<GeneratedAssessment[]> {
        const lessonSummaries = lessons.map((l) => `- ${l.title}: ${l.summary}`).join('\n');

        const prompt = `Create assessment questions for a training module.

## Module: ${template.title}
## Learning Objectives:
${template.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

## Lessons Covered:
${lessonSummaries}

## Task
Generate 5-8 assessment questions that test the learning objectives. Include:
- 3-4 multiple choice questions
- 1-2 true/false questions
- 1 short answer question

Return as JSON array:
[
  {
    "type": "multiple_choice",
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Why this is correct",
    "points": 10
  },
  {
    "type": "true_false",
    "question": "Statement to evaluate",
    "correctAnswer": "true",
    "explanation": "Why this is true/false",
    "points": 5
  }
]

Only return the JSON array.`;

        const response = await this.llmService.generateText('assessment_generation', prompt, {
            temperature: 0.5,
            maxTokens: 1500,
        });

        try {
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                throw new Error('No JSON array found');
            }

            const questions: AssessmentQuestion[] = JSON.parse(jsonMatch[0]).map(
                (q: AssessmentQuestion, i: number) => ({
                    ...q,
                    id: `q-${i + 1}`,
                })
            );

            return [{ type: 'quiz', questions }];
        } catch (error) {
            console.error('Failed to parse assessment response:', error);
            return [];
        }
    }

    /**
     * Generate simulation content
     */
    private async generateSimulation(
        template: ModuleTemplate,
        context: string
    ): Promise<GeneratedSimulation> {
        const simulationType = template.simulationType!;

        if (simulationType === 'scenario_branching') {
            return this.generateScenarioSimulation(template, context);
        } else if (simulationType === 'ai_roleplay') {
            return this.generateRoleplaySimulation(template, context);
        } else {
            return this.generateSoftwareSimulation(template, context);
        }
    }

    private async generateScenarioSimulation(
        template: ModuleTemplate,
        context: string
    ): Promise<GeneratedSimulation> {
        const prompt = `Create a branching scenario simulation for: "${template.title}"

${context}

Learning Objectives:
${template.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

Create a realistic workplace scenario with 3-4 decision points. Each decision should have 2-3 options with different outcomes (good, neutral, bad).

Return as JSON:
{
  "introduction": "Scenario setup text",
  "branches": [
    {
      "id": "start",
      "situation": "Description of the situation",
      "options": [
        {
          "text": "Option 1",
          "nextBranchId": "branch2a",
          "outcome": "good",
          "feedback": "Why this was a good choice"
        }
      ]
    }
  ]
}

Only return the JSON object.`;

        const response = await this.llmService.generateText('simulation_generation', prompt, {
            temperature: 0.8,
            maxTokens: 2000,
        });

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('No JSON found');

            const script = JSON.parse(jsonMatch[0]);

            return {
                type: 'scenario_branching',
                title: template.title + ' Scenario',
                description: 'Practice making decisions in realistic scenarios',
                script: {
                    introduction: script.introduction,
                    branches: script.branches,
                },
            };
        } catch (error) {
            console.error('Failed to generate scenario:', error);
            return {
                type: 'scenario_branching',
                title: template.title + ' Scenario',
                description: 'Practice making decisions',
                script: {
                    introduction: 'Welcome to this interactive scenario.',
                    branches: [],
                },
            };
        }
    }

    private async generateRoleplaySimulation(
        template: ModuleTemplate,
        context: string
    ): Promise<GeneratedSimulation> {
        const prompt = `Create an AI roleplay simulation for: "${template.title}"

${context}

Learning Objectives:
${template.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

Design a roleplay scenario where the learner practices skills with an AI character.

Return as JSON:
{
  "scenario": "Detailed scenario description",
  "learnerRole": "What role the learner plays",
  "aiRole": "What role the AI plays (e.g., 'difficult customer', 'new team member')",
  "aiPersonality": "How the AI should behave",
  "objectives": ["What learner should accomplish"],
  "evaluationCriteria": ["How success is measured"]
}

Only return the JSON object.`;

        const response = await this.llmService.generateText('simulation_generation', prompt, {
            temperature: 0.8,
            maxTokens: 1000,
        });

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('No JSON found');

            const roleplayContext = JSON.parse(jsonMatch[0]);

            return {
                type: 'ai_roleplay',
                title: template.title + ' Practice Conversation',
                description: roleplayContext.scenario,
                script: {
                    introduction: `You will practice ${template.title.toLowerCase()} by interacting with an AI character.`,
                    roleplayContext,
                },
            };
        } catch (error) {
            console.error('Failed to generate roleplay:', error);
            return {
                type: 'ai_roleplay',
                title: template.title + ' Practice',
                description: 'Practice through conversation',
                script: {
                    introduction: 'Practice your skills in this roleplay scenario.',
                    roleplayContext: {
                        scenario: template.description,
                        learnerRole: 'Professional',
                        aiRole: 'Colleague',
                        aiPersonality: 'Professional and helpful',
                        objectives: template.learningObjectives,
                        evaluationCriteria: [],
                    },
                },
            };
        }
    }

    private async generateSoftwareSimulation(
        template: ModuleTemplate,
        _context: string
    ): Promise<GeneratedSimulation> {
        // Software simulations need specific configuration
        // This would be more complex in production
        return {
            type: 'software_interface',
            title: template.title + ' Practice Environment',
            description: 'Practice using the software in a safe environment',
            script: {
                introduction: `Welcome to the ${template.title} practice environment.`,
                steps: [
                    {
                        id: 'step-1',
                        instruction: 'Complete the first task as instructed.',
                        expectedAction: 'complete_task_1',
                        hints: ['Look for the relevant button', 'Check the menu options'],
                        feedback: {
                            correct: 'Great job! You completed the task correctly.',
                            incorrect: 'Not quite. Try again or use a hint.',
                        },
                    },
                ],
            },
        };
    }
}

// Export singleton
let moduleGenerationService: ModuleGenerationService | null = null;

export function getModuleGenerationService(): ModuleGenerationService {
    if (!moduleGenerationService) {
        moduleGenerationService = new ModuleGenerationService();
    }
    return moduleGenerationService;
}
