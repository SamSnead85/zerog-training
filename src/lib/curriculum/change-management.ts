/**
 * Change Management - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Change management frameworks (ADKAR, Kotter)
 * - Stakeholder management
 * - Communication strategies
 * - Resistance handling
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: Change Management Fundamentals
// =============================================================================

export const changeLesson1_fundamentals: LessonContent = {
    id: "change-101",
    title: "Change Management Fundamentals",
    description: "Master proven frameworks for leading organizational change",
    duration: "45 min",
    objectives: [
        "Apply the ADKAR change model",
        "Implement Kotter's 8-step process",
        "Identify and manage resistance",
        "Develop effective change communication"
    ],
    sections: [
        {
            id: "ch1-1",
            title: "Why Changes Fail",
            type: "text",
            content: `
# The Reality of Organizational Change

**70% of organizational change initiatives fail** to achieve their goals. Understanding why helps us succeed.

## Top Reasons Changes Fail

### 1. Lack of Executive Sponsorship
- Leaders don't visibly support the change
- Competing priorities dilute focus
- "Do as I say, not as I do"

### 2. Poor Communication
- Vague messaging about the "why"
- One-way communication (top-down only)
- Inconsistent messages across channels

### 3. Employee Resistance Not Addressed
- Resistance is ignored or punished
- No safe space for concerns
- Change is done TO people, not WITH them

### 4. Inadequate Training
- New skills not developed
- "Sink or swim" mentality
- No practice time before go-live

### 5. No Reinforcement
- Old behaviors rewarded
- No accountability for new behaviors
- Quick return to "business as usual"

---

## The Human Side of Change

Change isn't just about processes and systems - it's about **people**.

### The Change Curve (Kübler-Ross Adapted)

1. **Shock** - "What's happening?"
2. **Denial** - "This won't really affect me"
3. **Frustration** - "Why is this happening?"
4. **Depression** - "I can't do this"
5. **Experiment** - "Maybe I can try..."
6. **Decision** - "I'm going to make this work"
7. **Integration** - "This is how we do things now"

**Key insight:** You can't skip stages, but you can move through them faster with good change management.
            `
        },
        {
            id: "ch1-2",
            title: "The ADKAR Model",
            type: "text",
            content: `
# ADKAR: A Model for Individual Change

Developed by Prosci, ADKAR focuses on **individual change** as the foundation for organizational change.

## The Five Elements

### A - Awareness
**Of the need for change**

Questions to answer:
- Why is this change happening?
- What's the risk of not changing?
- What's in it for me (WIIFM)?

**Tactics:**
- Town halls and all-hands meetings
- Executive communications
- Data and business case sharing

---

### D - Desire
**To participate and support the change**

Questions to answer:
- Why should I want this?
- What do I gain/lose?
- Who else is on board?

**Tactics:**
- Involve influencers early
- Address personal concerns
- Create peer champions

---

### K - Knowledge
**Of how to change**

Questions to answer:
- What do I need to learn?
- How do I do my job differently?
- Where do I get help?

**Tactics:**
- Training programs
- Job aids and guides
- Mentoring and coaching

---

### A - Ability
**To implement required skills and behaviors**

Questions to answer:
- Can I actually do this?
- Do I have time to practice?
- What if I make mistakes?

**Tactics:**
- Hands-on practice
- Safe environments to fail
- Performance support

---

### R - Reinforcement
**To sustain the change**

Questions to answer:
- Am I being recognized for changing?
- What happens if I slip back?
- Is leadership still committed?

**Tactics:**
- Celebrate wins
- Adjust incentives
- Remove barriers
            `,
            tips: [
                "ADKAR is sequential - you can't skip steps",
                "Identify where individuals are stuck to target interventions",
                "Each person moves through at their own pace"
            ]
        },
        {
            id: "ch1-3",
            title: "Kotter's 8-Step Process",
            type: "text",
            content: `
# Kotter's 8 Steps for Leading Change

John Kotter's research-based framework for organizational transformation.

---

## Phase 1: Create Climate for Change

### Step 1: Create Urgency
- Build a compelling case for change
- Share market data, competitive threats
- Create a burning platform or inspiring vision

### Step 2: Form a Powerful Coalition
- Assemble a guiding team with power and credibility
- Include formal and informal leaders
- Ensure diverse perspectives

### Step 3: Create a Vision for Change
- Develop clear, compelling vision
- Align strategy to vision
- Make it easy to communicate (5-minute elevator pitch)

---

## Phase 2: Engage & Enable

### Step 4: Communicate the Vision
- Use every channel possible
- Repeat, repeat, repeat (7x rule)
- Model the behavior you expect

### Step 5: Remove Obstacles
- Identify and address systemic barriers
- Empower others to act
- Deal with resistors fairly

### Step 6: Create Short-Term Wins
- Plan for visible improvements
- Celebrate and publicize wins
- Build momentum and credibility

---

## Phase 3: Implement & Sustain

### Step 7: Build on the Change
- Don't declare victory too early
- Use credibility from wins to tackle bigger changes
- Keep hiring/promoting change supporters

### Step 8: Anchor in Culture
- Connect new behaviors to success
- Update policies, processes, structures
- Ensure leadership succession maintains changes

---

## ADKAR vs Kotter

| Aspect | ADKAR | Kotter's 8 Steps |
|--------|-------|------------------|
| Focus | Individual change | Organizational change |
| Best for | Measuring readiness | Large-scale transformation |
| Approach | Sequential for each person | Sequential for organization |
| Strength | Targeted interventions | Top-down momentum |

**Best practice:** Use both together - Kotter for overall strategy, ADKAR for individual impact.
            `
        }
    ],
    quiz: [
        {
            id: "chq1-1",
            type: "ordering",
            question: "Order the ADKAR elements in the correct sequence:",
            options: ["Reinforcement", "Awareness", "Knowledge", "Desire", "Ability"],
            correctAnswer: [1, 3, 2, 4, 0],
            explanation: "ADKAR follows: Awareness → Desire → Knowledge → Ability → Reinforcement. You must know WHY before you WANT to, learn HOW before you CAN, and sustain with REINFORCEMENT.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "chq1-2",
            type: "scenario",
            question: "An employee says: 'I understand why we're changing and I support it, but I don't know how to use the new system.' Where are they stuck in ADKAR?",
            options: [
                "Awareness",
                "Desire",
                "Knowledge",
                "Ability"
            ],
            correctAnswer: 2,
            explanation: "They have Awareness (understand why) and Desire (support it), but lack Knowledge (don't know how). Training and education are the appropriate interventions.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "chq1-3",
            type: "multiple-select",
            question: "Which are part of Kotter's 8-step change process? (Select all that apply)",
            options: [
                "Create a sense of urgency",
                "Skip straight to training",
                "Form a powerful coalition",
                "Create short-term wins",
                "Avoid communicating until changes are final"
            ],
            correctAnswer: [0, 2, 3],
            explanation: "Kotter's process includes creating urgency, forming coalitions, and celebrating wins. Skipping to training and avoiding communication are anti-patterns.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "chq1-4",
            type: "multiple-choice",
            question: "Why do 70% of change initiatives fail?",
            options: [
                "The technology wasn't good enough",
                "The change happened too slowly",
                "The human side of change wasn't addressed",
                "Budgets were too small"
            ],
            correctAnswer: 2,
            explanation: "Most change failures are due to neglecting the human side: resistance, communication, training, and reinforcement - not technology or budget issues.",
            difficulty: "easy",
            points: 10
        }
    ],
    keyTakeaways: [
        "70% of change initiatives fail, primarily due to human factors",
        "ADKAR: Awareness → Desire → Knowledge → Ability → Reinforcement",
        "Kotter's 8 Steps: Urgency → Coalition → Vision → Communicate → Remove Obstacles → Short Wins → Build → Anchor",
        "People move through the change curve at different speeds",
        "Use Kotter for organizational strategy, ADKAR for individual interventions"
    ]
};

// =============================================================================
// Change Management Curriculum Export
// =============================================================================

export const changeCurriculum = {
    moduleId: "change-management-fundamentals",
    title: "Change Management",
    description: "Lead organizational change effectively with proven frameworks",
    lessons: [
        changeLesson1_fundamentals
    ],
    totalDuration: "45 min",
    certification: {
        name: "Change Management Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "change-certified"
    }
};
