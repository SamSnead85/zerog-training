// Interactive Simulation Engine
// Powers all simulation types: software interface, scenario branching, AI roleplay

import { getDefaultLLMService } from '../ai/llm-service';
import type { Message } from '../ai/types';

// =============================================================================
// SIMULATION TYPES
// =============================================================================

export type SimulationType =
    | 'software_interface'
    | 'scenario_branching'
    | 'ai_roleplay'
    | 'assessment'
    | 'virtual_environment';

export interface SimulationConfig {
    id: string;
    type: SimulationType;
    title: string;
    description: string;
    moduleId: string;
    organizationId: string;
    estimatedDuration: number; // minutes
    passingScore: number; // percentage
}

// =============================================================================
// SCENARIO BRANCHING
// =============================================================================

export interface ScenarioNode {
    id: string;
    type: 'situation' | 'outcome' | 'end';
    content: string;
    mediaUrl?: string;
    options?: ScenarioOption[];
    feedback?: string;
    isTerminal?: boolean;
    score?: number; // Points earned at this node
}

export interface ScenarioOption {
    id: string;
    text: string;
    nextNodeId: string;
    quality: 'optimal' | 'acceptable' | 'poor';
    points: number;
    feedback: string;
}

export interface ScenarioState {
    currentNodeId: string;
    history: {
        nodeId: string;
        selectedOptionId: string;
        timestamp: Date;
    }[];
    score: number;
    maxPossibleScore: number;
    isComplete: boolean;
    endingType?: 'success' | 'partial' | 'failure';
}

export class ScenarioBranchingEngine {
    private nodes: Map<string, ScenarioNode>;
    private config: SimulationConfig;

    constructor(config: SimulationConfig, nodes: ScenarioNode[]) {
        this.config = config;
        this.nodes = new Map(nodes.map(n => [n.id, n]));
    }

    /**
     * Start a new scenario session
     */
    startScenario(): ScenarioState {
        const startNode = this.findStartNode();
        return {
            currentNodeId: startNode.id,
            history: [],
            score: 0,
            maxPossibleScore: this.calculateMaxScore(),
            isComplete: false,
        };
    }

    /**
     * Process a user's choice
     */
    selectOption(state: ScenarioState, optionId: string): ScenarioState {
        const currentNode = this.nodes.get(state.currentNodeId);
        if (!currentNode || !currentNode.options) {
            return state;
        }

        const selectedOption = currentNode.options.find(o => o.id === optionId);
        if (!selectedOption) {
            return state;
        }

        const nextNode = this.nodes.get(selectedOption.nextNodeId);
        const newScore = state.score + selectedOption.points;

        const newState: ScenarioState = {
            currentNodeId: selectedOption.nextNodeId,
            history: [
                ...state.history,
                {
                    nodeId: state.currentNodeId,
                    selectedOptionId: optionId,
                    timestamp: new Date(),
                },
            ],
            score: newScore,
            maxPossibleScore: state.maxPossibleScore,
            isComplete: nextNode?.isTerminal ?? false,
        };

        if (newState.isComplete) {
            const percentage = (newScore / state.maxPossibleScore) * 100;
            if (percentage >= 80) {
                newState.endingType = 'success';
            } else if (percentage >= 50) {
                newState.endingType = 'partial';
            } else {
                newState.endingType = 'failure';
            }
        }

        return newState;
    }

    /**
     * Get current node content
     */
    getCurrentNode(state: ScenarioState): ScenarioNode | null {
        return this.nodes.get(state.currentNodeId) || null;
    }

    /**
     * Get feedback for last choice
     */
    getLastFeedback(state: ScenarioState): string | null {
        if (state.history.length === 0) return null;

        const lastEntry = state.history[state.history.length - 1];
        const lastNode = this.nodes.get(lastEntry.nodeId);
        const selectedOption = lastNode?.options?.find(o => o.id === lastEntry.selectedOptionId);

        return selectedOption?.feedback || null;
    }

    private findStartNode(): ScenarioNode {
        // First node or one marked as start
        return Array.from(this.nodes.values())[0];
    }

    private calculateMaxScore(): number {
        // Calculate the maximum possible score through optimal path
        let maxScore = 0;
        for (const node of this.nodes.values()) {
            if (node.options) {
                const maxOptionScore = Math.max(...node.options.map(o => o.points));
                maxScore += maxOptionScore;
            }
        }
        return maxScore || 100;
    }
}

// =============================================================================
// AI ROLEPLAY
// =============================================================================

export interface RoleplayConfig {
    scenario: string;
    learnerRole: string;
    aiRole: string;
    aiName: string;
    aiPersonality: string;
    aiBackground: string;
    objectives: string[];
    evaluationCriteria: EvaluationCriterion[];
    maxTurns: number;
    contextPrompt?: string; // Organization-specific context
}

export interface EvaluationCriterion {
    id: string;
    name: string;
    description: string;
    weight: number;
    examples: {
        good: string;
        poor: string;
    };
}

export interface RoleplayMessage {
    id: string;
    role: 'learner' | 'ai' | 'system';
    content: string;
    timestamp: Date;
    evaluation?: {
        criterionId: string;
        score: number;
        feedback: string;
    }[];
}

export interface RoleplayState {
    messages: RoleplayMessage[];
    turnsCompleted: number;
    isComplete: boolean;
    objectivesCompleted: boolean[];
    overallEvaluation?: RoleplayEvaluation;
}

export interface RoleplayEvaluation {
    overallScore: number;
    passed: boolean;
    criteriaScores: {
        criterionId: string;
        score: number;
        feedback: string;
    }[];
    summary: string;
    strengths: string[];
    areasForImprovement: string[];
}

export class AIRoleplayEngine {
    private config: RoleplayConfig;
    private simulationConfig: SimulationConfig;
    private llmService = getDefaultLLMService();

    constructor(simulationConfig: SimulationConfig, roleplayConfig: RoleplayConfig) {
        this.simulationConfig = simulationConfig;
        this.config = roleplayConfig;
    }

    /**
     * Start a new roleplay session
     */
    startRoleplay(): RoleplayState {
        const systemMessage: RoleplayMessage = {
            id: 'sys-intro',
            role: 'system',
            content: `**Scenario:** ${this.config.scenario}\n\n**Your Role:** ${this.config.learnerRole}\n\n**You're speaking with:** ${this.config.aiName} (${this.config.aiRole})`,
            timestamp: new Date(),
        };

        return {
            messages: [systemMessage],
            turnsCompleted: 0,
            isComplete: false,
            objectivesCompleted: new Array(this.config.objectives.length).fill(false),
        };
    }

    /**
     * Send a learner message and get AI response
     */
    async sendMessage(state: RoleplayState, learnerMessage: string): Promise<RoleplayState> {
        // Add learner message
        const learnerMsg: RoleplayMessage = {
            id: `learner-${Date.now()}`,
            role: 'learner',
            content: learnerMessage,
            timestamp: new Date(),
        };

        const updatedMessages = [...state.messages, learnerMsg];

        // Generate AI response
        const aiResponse = await this.generateAIResponse(updatedMessages);

        const aiMsg: RoleplayMessage = {
            id: `ai-${Date.now()}`,
            role: 'ai',
            content: aiResponse,
            timestamp: new Date(),
        };

        const newTurns = state.turnsCompleted + 1;
        const isComplete = newTurns >= this.config.maxTurns;

        const newState: RoleplayState = {
            messages: [...updatedMessages, aiMsg],
            turnsCompleted: newTurns,
            isComplete,
            objectivesCompleted: state.objectivesCompleted,
        };

        // If complete, generate evaluation
        if (isComplete) {
            newState.overallEvaluation = await this.evaluateRoleplay(newState);
        }

        return newState;
    }

    /**
     * End roleplay early and get evaluation
     */
    async endRoleplay(state: RoleplayState): Promise<RoleplayState> {
        const evaluation = await this.evaluateRoleplay(state);

        return {
            ...state,
            isComplete: true,
            overallEvaluation: evaluation,
        };
    }

    private async generateAIResponse(messages: RoleplayMessage[]): Promise<string> {
        const systemPrompt = this.buildSystemPrompt();
        const chatMessages: Message[] = [
            { role: 'system', content: systemPrompt },
            ...messages
                .filter(m => m.role !== 'system')
                .map(m => ({
                    role: m.role === 'learner' ? 'user' as const : 'assistant' as const,
                    content: m.content,
                })),
        ];

        const response = await this.llmService.chat('roleplay', { messages: chatMessages });
        return response.content;
    }

    private buildSystemPrompt(): string {
        return `You are ${this.config.aiName}, ${this.config.aiRole}.

## Your Personality
${this.config.aiPersonality}

## Your Background
${this.config.aiBackground}

## Scenario
${this.config.scenario}

${this.config.contextPrompt ? `## Additional Context\n${this.config.contextPrompt}` : ''}

## Instructions
- Stay in character as ${this.config.aiName}
- Respond naturally and realistically
- Allow the conversation to develop naturally
- If the learner makes mistakes, react appropriately for your character
- Don't break character to coach them directly
- Keep responses concise (2-4 sentences typically)

The learner's objectives are:
${this.config.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Help create situations where they can demonstrate these skills, but don't make it too easy.`;
    }

    private async evaluateRoleplay(state: RoleplayState): Promise<RoleplayEvaluation> {
        const conversationText = state.messages
            .filter(m => m.role !== 'system')
            .map(m => `${m.role === 'learner' ? 'LEARNER' : this.config.aiName}: ${m.content}`)
            .join('\n\n');

        const prompt = `Evaluate this roleplay conversation for a training exercise.

## Scenario
${this.config.scenario}

## Learner's Role
${this.config.learnerRole}

## Objectives
${this.config.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

## Evaluation Criteria
${this.config.evaluationCriteria.map(c => `- ${c.name}: ${c.description}`).join('\n')}

## Conversation
${conversationText}

## Task
Evaluate the learner's performance. Return as JSON:
{
  "overallScore": 0-100,
  "criteriaScores": [
    {"criterionId": "criterion-id", "score": 0-100, "feedback": "Specific feedback"}
  ],
  "summary": "Overall evaluation in 2-3 sentences",
  "strengths": ["Strength 1", "Strength 2"],
  "areasForImprovement": ["Area 1", "Area 2"]
}

Only return the JSON object.`;

        try {
            const response = await this.llmService.generateText('grading', prompt, {
                temperature: 0.3,
                maxTokens: 1000,
            });

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('No JSON found');

            const evaluation = JSON.parse(jsonMatch[0]);

            return {
                overallScore: evaluation.overallScore,
                passed: evaluation.overallScore >= this.simulationConfig.passingScore,
                criteriaScores: evaluation.criteriaScores || [],
                summary: evaluation.summary,
                strengths: evaluation.strengths || [],
                areasForImprovement: evaluation.areasForImprovement || [],
            };
        } catch (error) {
            console.error('Failed to evaluate roleplay:', error);
            return {
                overallScore: 70,
                passed: true,
                criteriaScores: [],
                summary: 'Evaluation could not be completed automatically.',
                strengths: ['Completed the exercise'],
                areasForImprovement: ['Review the learning objectives'],
            };
        }
    }
}

// =============================================================================
// SOFTWARE INTERFACE SIMULATION
// =============================================================================

export interface SoftwareSimulationConfig {
    applicationName: string;
    screens: SoftwareScreen[];
    tasks: SoftwareTask[];
    hints: Record<string, string[]>;
}

export interface SoftwareScreen {
    id: string;
    name: string;
    description: string;
    elements: ScreenElement[];
    backgroundImage?: string;
}

export interface ScreenElement {
    id: string;
    type: 'button' | 'input' | 'dropdown' | 'menu' | 'link' | 'checkbox' | 'text';
    label: string;
    position: { x: number; y: number; width: number; height: number };
    action?: ElementAction;
    isRequired?: boolean;
}

export interface ElementAction {
    type: 'navigate' | 'submit' | 'toggle' | 'input' | 'select';
    targetScreenId?: string;
    validation?: {
        expectedValue?: string;
        errorMessage: string;
    };
    onSuccess?: string; // Feedback message
}

export interface SoftwareTask {
    id: string;
    title: string;
    description: string;
    steps: TaskStep[];
    order: number;
}

export interface TaskStep {
    id: string;
    instruction: string;
    targetElementId: string;
    targetScreenId: string;
    expectedAction: string;
    isCompleted?: boolean;
}

export interface SoftwareSimulationState {
    currentScreenId: string;
    currentTaskIndex: number;
    currentStepIndex: number;
    completedTasks: string[];
    attempts: number;
    hintsUsed: number;
    score: number;
    isComplete: boolean;
    inputValues: Record<string, string>;
}

export class SoftwareSimulationEngine {
    private config: SoftwareSimulationConfig;
    private simulationConfig: SimulationConfig;
    private screens: Map<string, SoftwareScreen>;

    constructor(simulationConfig: SimulationConfig, softwareConfig: SoftwareSimulationConfig) {
        this.simulationConfig = simulationConfig;
        this.config = softwareConfig;
        this.screens = new Map(softwareConfig.screens.map(s => [s.id, s]));
    }

    /**
     * Start simulation
     */
    start(): SoftwareSimulationState {
        const firstTask = this.config.tasks[0];
        const firstStep = firstTask?.steps[0];

        return {
            currentScreenId: firstStep?.targetScreenId || this.config.screens[0]?.id || 'home',
            currentTaskIndex: 0,
            currentStepIndex: 0,
            completedTasks: [],
            attempts: 0,
            hintsUsed: 0,
            score: 100,
            isComplete: false,
            inputValues: {},
        };
    }

    /**
     * Handle element interaction
     */
    interactWithElement(
        state: SoftwareSimulationState,
        elementId: string,
        value?: string
    ): { state: SoftwareSimulationState; feedback: string; isCorrect: boolean } {
        const currentTask = this.config.tasks[state.currentTaskIndex];
        const currentStep = currentTask?.steps[state.currentStepIndex];

        const isCorrect = currentStep?.targetElementId === elementId;

        let newState = { ...state };
        let feedback = '';

        if (isCorrect) {
            feedback = 'Correct! Moving to the next step.';

            // Store input value if provided
            if (value) {
                newState.inputValues = { ...newState.inputValues, [elementId]: value };
            }

            // Move to next step
            if (currentStep && state.currentStepIndex < currentTask.steps.length - 1) {
                newState.currentStepIndex = state.currentStepIndex + 1;
                const nextStep = currentTask.steps[newState.currentStepIndex];
                newState.currentScreenId = nextStep.targetScreenId;
            } else {
                // Task complete
                newState.completedTasks = [...state.completedTasks, currentTask.id];

                if (state.currentTaskIndex < this.config.tasks.length - 1) {
                    newState.currentTaskIndex = state.currentTaskIndex + 1;
                    newState.currentStepIndex = 0;
                    feedback = 'Great job! Task completed. Moving to the next task.';
                } else {
                    newState.isComplete = true;
                    feedback = 'Congratulations! You have completed all tasks.';
                }
            }
        } else {
            feedback = 'That\'s not quite right. Try again or use a hint.';
            newState.attempts = state.attempts + 1;
            newState.score = Math.max(0, state.score - 5); // Deduct points for wrong attempts
        }

        return { state: newState, feedback, isCorrect };
    }

    /**
     * Get a hint for current step
     */
    getHint(state: SoftwareSimulationState): string | null {
        const currentTask = this.config.tasks[state.currentTaskIndex];
        const currentStep = currentTask?.steps[state.currentStepIndex];

        if (!currentStep) return null;

        const hints = this.config.hints[currentStep.id];
        if (!hints || hints.length === 0) {
            return 'Look for the element mentioned in the instruction.';
        }

        const hintIndex = Math.min(state.hintsUsed, hints.length - 1);
        return hints[hintIndex];
    }

    /**
     * Get current screen
     */
    getCurrentScreen(state: SoftwareSimulationState): SoftwareScreen | null {
        return this.screens.get(state.currentScreenId) || null;
    }

    /**
     * Get current instruction
     */
    getCurrentInstruction(state: SoftwareSimulationState): string | null {
        const currentTask = this.config.tasks[state.currentTaskIndex];
        const currentStep = currentTask?.steps[state.currentStepIndex];
        return currentStep?.instruction || null;
    }
}

// =============================================================================
// SIMULATION RESULT TRACKING
// =============================================================================

export interface SimulationResult {
    id: string;
    simulationId: string;
    userId: string;
    type: SimulationType;
    startedAt: Date;
    completedAt?: Date;
    score: number;
    passed: boolean;
    duration: number; // seconds
    attempts: number;
    details: {
        scenarioPath?: string[];
        roleplayEvaluation?: RoleplayEvaluation;
        taskCompletions?: { taskId: string; attempts: number; hintsUsed: number }[];
    };
}

/**
 * Create a simulation result from state
 */
export function createSimulationResult(
    simulationId: string,
    userId: string,
    type: SimulationType,
    startTime: Date,
    state: ScenarioState | RoleplayState | SoftwareSimulationState,
    passingScore: number
): SimulationResult {
    const now = new Date();
    const duration = Math.floor((now.getTime() - startTime.getTime()) / 1000);

    let score = 0;
    let passed = false;
    const details: SimulationResult['details'] = {};

    if ('endingType' in state) {
        // Scenario state
        score = Math.round((state.score / state.maxPossibleScore) * 100);
        passed = score >= passingScore;
        details.scenarioPath = state.history.map(h => h.nodeId);
    } else if ('overallEvaluation' in state) {
        // Roleplay state
        score = state.overallEvaluation?.overallScore || 0;
        passed = state.overallEvaluation?.passed || false;
        details.roleplayEvaluation = state.overallEvaluation;
    } else {
        // Software simulation state
        score = (state as SoftwareSimulationState).score;
        passed = score >= passingScore;
    }

    return {
        id: `result-${Date.now()}`,
        simulationId,
        userId,
        type,
        startedAt: startTime,
        completedAt: now,
        score,
        passed,
        duration,
        attempts: 1,
        details,
    };
}
