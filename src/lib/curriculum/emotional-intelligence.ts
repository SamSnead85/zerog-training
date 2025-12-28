/**
 * Emotional Intelligence (EQ) - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Self-awareness and self-regulation
 * - Empathy and social skills
 * - EQ in leadership and teams
 * - Practical application techniques
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: EQ Fundamentals
// =============================================================================

export const eqLesson1_fundamentals: LessonContent = {
    id: "eq-101",
    title: "Emotional Intelligence Fundamentals",
    description: "Develop self-awareness and emotional regulation skills for professional success",
    duration: "40 min",
    objectives: [
        "Define the five components of emotional intelligence",
        "Assess your own EQ strengths and development areas",
        "Apply self-regulation techniques",
        "Recognize emotions in yourself and others"
    ],
    sections: [
        {
            id: "eq1-1",
            title: "What is Emotional Intelligence?",
            type: "text",
            content: `
# Understanding Emotional Intelligence

**Emotional Intelligence (EQ)** is the ability to recognize, understand, manage, and effectively use emotions in ourselves and others.

## Why EQ Matters at Work

Research by Daniel Goleman shows that **EQ accounts for 67% of the abilities** deemed necessary for superior performance in leaders.

| IQ vs EQ | Description |
|----------|-------------|
| **IQ** | Gets you hired |
| **EQ** | Gets you promoted |

### EQ Predicts:
- Leadership effectiveness
- Team performance
- Customer satisfaction
- Conflict resolution ability
- Career advancement

---

## The Five Components of EQ (Goleman Model)

### 1. Self-Awareness
**Knowing your emotions, strengths, weaknesses, and impact on others**

- Recognize your emotional triggers
- Understand how emotions affect your behavior
- Know your values and goals

### 2. Self-Regulation
**Managing your emotions and impulses effectively**

- Control disruptive emotions
- Maintain composure under pressure
- Adapt to changing circumstances

### 3. Motivation
**Internal drive to achieve beyond expectations**

- Achievement orientation
- Commitment to goals
- Optimism in the face of setbacks

### 4. Empathy
**Understanding others' emotions and perspectives**

- Sense what others are feeling
- See things from their point of view
- Respond appropriately to emotional cues

### 5. Social Skills
**Building relationships and influencing others positively**

- Effective communication
- Conflict management
- Collaboration and teamwork
            `
        },
        {
            id: "eq1-2",
            title: "Self-Awareness & Self-Regulation",
            type: "text",
            content: `
# Building Self-Awareness

Self-awareness is the foundation of emotional intelligence.

## The Emotional Self-Awareness Framework

### 1. Name It to Tame It
Labeling emotions reduces their intensity.

**Practice:**
- Beyond "good" or "bad" - get specific
- "I feel frustrated because..."
- "I'm anxious about..."

### 2. Identify Triggers
What situations consistently create emotional reactions?

**Common triggers:**
- Feeling disrespected
- Time pressure
- Uncertainty
- Criticism (even constructive)
- Lack of control

### 3. Recognize Physical Cues
Emotions manifest physically before we're consciously aware.

| Emotion | Physical Signs |
|---------|----------------|
| Anger | Tight jaw, clenched fists, heat |
| Anxiety | Rapid heartbeat, shallow breathing |
| Frustration | Tension in shoulders, sighing |
| Excitement | Energy, restlessness |

---

# Self-Regulation Techniques

### The STOP Technique
1. **S**top - Pause before reacting
2. **T**ake a breath - Slow, deep breaths
3. **O**bserve - Notice your emotions without judgment
4. **P**roceed - Choose your response intentionally

### Reframe the Situation
- "This is happening TO me" → "This is happening FOR me"
- "I have to..." → "I get to..."
- "This is a disaster" → "This is a challenge"

### The 10-Second Rule
When triggered, count to 10 before responding.
Give your prefrontal cortex time to engage.

### Values-Based Response
Ask: "What would the person I want to be do right now?"
            `,
            tips: [
                "Self-awareness is a skill that improves with practice",
                "Journaling emotions helps build the recognition muscle",
                "Physical exercise helps regulate emotional state"
            ]
        },
        {
            id: "eq1-3",
            title: "Empathy & Social Skills",
            type: "text",
            content: `
# Developing Empathy

Empathy is understanding and sharing the feelings of others.

## Three Types of Empathy

### Cognitive Empathy
**Understanding** what someone is feeling and why.
- "I can see why you'd feel that way"
- Useful for negotiation and understanding perspectives

### Emotional Empathy
**Feeling** what someone else is feeling.
- You actually share their emotional experience
- Creates deep connection
- Can lead to empathy fatigue

### Compassionate Empathy
**Acting** on your understanding.
- Combines understanding with supportive action
- Most useful in professional settings

---

## Practical Empathy Techniques

### Active Listening
1. Give full attention (no multitasking)
2. Don't interrupt
3. Reflect back what you hear
4. Ask clarifying questions
5. Validate emotions

### The "Walk a Mile" Exercise
Before judging, consider:
- What pressures are they under?
- What might I not know about their situation?
- How would I feel in their position?

### Labeling Technique
"It seems like you're feeling [emotion]"
- Shows you're paying attention
- Helps them feel understood
- Creates psychological safety

---

## Building Social Skills

### Relationship Building
- Remember personal details
- Follow up on previous conversations
- Celebrate others' wins
- Be reliable and consistent

### Influence Without Authority
- Build trust before asking
- Find common ground
- Understand their priorities
- Make it easy to say yes

### Conflict Resolution (DESC Model)
- **D**escribe the situation objectively
- **E**xpress how you feel (I-statements)
- **S**pecify what you'd like to happen
- **C**onsequences - positive outcomes
            `
        }
    ],
    quiz: [
        {
            id: "eqq1-1",
            type: "ordering",
            question: "Order Goleman's 5 EQ components from intrapersonal (self) to interpersonal (others):",
            options: ["Social Skills", "Self-Awareness", "Empathy", "Motivation", "Self-Regulation"],
            correctAnswer: [1, 4, 3, 2, 0],
            explanation: "Intrapersonal first (Self-Awareness, Self-Regulation, Motivation), then Interpersonal (Empathy, Social Skills).",
            difficulty: "medium",
            points: 15
        },
        {
            id: "eqq1-2",
            type: "multiple-choice",
            question: "A colleague is visibly upset after a meeting. Which demonstrates compassionate empathy?",
            options: [
                "Ignore them - they'll get over it",
                "Say 'I noticed you seemed frustrated. Want to grab coffee and talk?'",
                "Feel equally upset yourself",
                "Analyze why they're wrong to be upset"
            ],
            correctAnswer: 1,
            explanation: "Compassionate empathy combines understanding the emotion with taking supportive action. Offering to talk shows both awareness and willingness to help.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "eqq1-3",
            type: "scenario",
            question: "During a heated meeting, you feel your anger rising at a colleague's criticism. Using the STOP technique, what should you do FIRST?",
            options: [
                "Explain why they're wrong",
                "Leave the meeting immediately",
                "Pause and take a breath before responding",
                "Tell them how their words made you feel"
            ],
            correctAnswer: 2,
            explanation: "STOP starts with Stop (pause) and Take a breath. This gives your prefrontal cortex time to engage before the emotional response takes over.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "eqq1-4",
            type: "multiple-select",
            question: "Which are signs of high self-awareness? (Select all that apply)",
            options: [
                "Always knowing the right answer",
                "Recognizing your emotional triggers",
                "Understanding how your mood affects others",
                "Never making mistakes",
                "Acknowledging your weaknesses"
            ],
            correctAnswer: [1, 2, 4],
            explanation: "Self-awareness includes recognizing triggers, understanding your impact on others, and acknowledging weaknesses. It's not about perfection or always being right.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "EQ has 5 components: Self-Awareness, Self-Regulation, Motivation, Empathy, Social Skills",
        "EQ is more predictive of leadership success than IQ",
        "Name emotions specifically to reduce their intensity",
        "Use STOP technique: Stop, Take a breath, Observe, Proceed",
        "Compassionate empathy combines understanding with action"
    ]
};

// =============================================================================
// EQ Curriculum Export
// =============================================================================

export const eqCurriculum = {
    moduleId: "emotional-intelligence",
    title: "Emotional Intelligence (EQ)",
    description: "Develop emotional intelligence for professional and leadership success",
    lessons: [
        eqLesson1_fundamentals
    ],
    totalDuration: "40 min",
    certification: {
        name: "EQ Foundations Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "eq-certified"
    }
};
