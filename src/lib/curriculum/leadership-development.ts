/**
 * Modern Leadership Development - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Situational Leadership Model
 * - Performance Feedback & Coaching
 * - Change Management
 * - Team Performance Optimization
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: Situational Leadership
// =============================================================================

export const leadershipLesson1_situational: LessonContent = {
    id: "lead-101",
    title: "Situational Leadership: Adapting Your Style",
    description: "Master the Situational Leadership Model to adapt your leadership approach to team member needs",
    duration: "40 min",
    objectives: [
        "Explain the Situational Leadership II (SLII) model",
        "Assess team member development levels",
        "Match leadership styles to development needs",
        "Adapt your approach based on task and relationship needs"
    ],
    sections: [
        {
            id: "l1-1",
            title: "The Core Insight",
            type: "text",
            content: `
# One Size Does NOT Fit All

The most effective leaders adapt their style to each team member's needs. What works for a seasoned expert won't work for a new hire, and vice versa.

## The Situational Leadership Model

Developed by Ken Blanchard and Paul Hersey, **Situational Leadership II (SLII)** is the world's most widely taught leadership model, used by over 5 million managers globally.

### The Core Principle

**Match your leadership style to the development level of the person for the specific task at hand.**

Key insight: A person's development level varies by task. Someone might be D4 (self-reliant expert) at financial analysis but D1 (enthusiastic beginner) at public speaking.

---

## Development Levels

### D1: Enthusiastic Beginner
- Low competence, high commitment
- New to the task but eager to learn
- Needs direction on what and how

### D2: Disillusioned Learner  
- Some competence, low commitment
- Has tried it, hit obstacles, lost confidence
- Needs direction AND support

### D3: Capable but Cautious
- Moderate to high competence, variable commitment
- Can do it but lacks confidence or motivation
- Needs support more than direction

### D4: Self-Reliant Achiever
- High competence, high commitment
- Consistently competent and motivated
- Needs autonomy and recognition
            `
        },
        {
            id: "l1-2",
            title: "The Four Leadership Styles",
            type: "text",
            content: `
# Matching Style to Development Level

## S1: Directing (High Direction, Low Support)
**Best for: D1 - Enthusiastic Beginners**

**What it looks like:**
- Provide specific instructions
- Closely supervise performance
- Make decisions yourself
- Tell what, when, where, and how

**Example language:**
- "Here's exactly what I need you to do..."
- "Follow these steps in this order..."
- "Check in with me after each milestone..."

---

## S2: Coaching (High Direction, High Support)
**Best for: D2 - Disillusioned Learners**

**What it looks like:**
- Continue to direct and monitor
- Explain decisions and ask for input
- Support and encourage
- Help them see the bigger picture

**Example language:**
- "Here's what we need to do, and here's why it matters..."
- "What questions do you have about this approach?"
- "I know this is challenging, but I've seen your progress..."

---

## S3: Supporting (Low Direction, High Support)
**Best for: D3 - Capable but Cautious**

**What it looks like:**
- Collaborate on decision-making
- Facilitate their problem-solving
- Listen, encourage, and support
- Help build confidence

**Example language:**
- "You've got the skills for this. What's your approach?"
- "What support do you need from me?"
- "I trust your judgment. Walk me through your thinking..."

---

## S4: Delegating (Low Direction, Low Support)
**Best for: D4 - Self-Reliant Achievers**

**What it looks like:**
- Turn over responsibility for decisions
- Trust them to execute
- Monitor outcomes, not process
- Provide autonomy and recognition

**Example language:**
- "This is your project. Keep me posted on outcomes..."
- "You've earned the right to run with this..."
- "I'm here if you need me, but I trust your approach..."

---

## The 2x2 Matrix

|                    | Low Support | High Support |
|--------------------|-------------|--------------|
| **High Direction** | S1-Directing | S2-Coaching |
| **Low Direction**  | S4-Delegating | S3-Supporting |
            `
        },
        {
            id: "l1-3",
            title: "Diagnosing Development Level",
            type: "text",
            content: `
# How to Assess Development Level

## The Two Dimensions

### Competence (Can They Do It?)
Assess their knowledge, skills, and experience for THIS SPECIFIC TASK:
- Prior experience with similar tasks?
- Demonstrated skills?
- Training received?
- Past performance on this task?

### Commitment (Will They Do It?)
Assess their motivation and confidence for this task:
- Enthusiasm level?
- Confidence in their ability?
- Willingness to take it on?
- Interest in the task?

## Asking Good Diagnostic Questions

### For Competence:
- "What's your experience with [task]?"
- "Have you done something like this before?"
- "What training have you had in this area?"
- "What do you see as the key challenges?"

### For Commitment:
- "How do you feel about taking this on?"
- "On a scale of 1-10, how confident are you?"
- "What concerns do you have?"
- "What parts excite you about this?"

---

## Common Misdiagnosis Traps

### Trap 1: Assuming Past Performance = Current Development
Just because they did one thing well doesn't mean they're D4 for everything.

### Trap 2: Confusing Personality with Development Level
An outgoing person may still be D1 on a new task; a quiet person may be D4.

### Trap 3: Not Reassessing Over Time
Development levels change. Check in regularly.

### Trap 4: Ignoring the Task-Specific Nature
Someone is D1-D4 for A SPECIFIC TASK, not as a general employee rating.
            `,
            tips: [
                "Development level is task-specific, not person-specific",
                "Ask questions before assuming you know their level",
                "Reassess regularly - development levels change"
            ]
        }
    ],
    quiz: [
        {
            id: "lq1-1",
            type: "multiple-choice",
            question: "A new employee is excited about their first project but has never done this type of work before. What is their likely development level?",
            options: [
                "D1 - Enthusiastic Beginner",
                "D2 - Disillusioned Learner",
                "D3 - Capable but Cautious",
                "D4 - Self-Reliant Achiever"
            ],
            correctAnswer: 0,
            explanation: "D1 (Enthusiastic Beginner) shows low competence (new to the task) with high commitment (excited). This is typical for new tasks where someone is motivated but inexperienced.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "lq1-2",
            type: "scenario",
            question: "Maria is an expert at data analysis (D4) but just took on her first client presentation. She's nervous and doesn't know how to structure it. What leadership style should you use for the presentation task?",
            options: [
                "S4-Delegating (let her figure it out)",
                "S1-Directing (provide clear structure and steps)",
                "S3-Supporting (encourage her existing skills)",
                "No leadership needed - she's a high performer"
            ],
            correctAnswer: 1,
            explanation: "For the presentation task, Maria is D1 (enthusiastic beginner) - new to presentations despite data expertise. S1-Directing is appropriate: provide clear guidance on structure and approach.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "lq1-3",
            type: "multiple-select",
            question: "Which are characteristics of the S2-Coaching leadership style? (Select all that apply)",
            options: [
                "High direction on what to do",
                "High support and encouragement",
                "Minimal involvement",
                "Explaining the 'why' behind decisions",
                "Turning over full responsibility"
            ],
            correctAnswer: [0, 1, 3],
            explanation: "S2-Coaching combines high direction with high support. It includes explaining rationale (the 'why') while still providing clear guidance. Minimal involvement and full delegation are S4 characteristics.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "lq1-4",
            type: "multiple-choice",
            question: "What is the key insight of Situational Leadership?",
            options: [
                "Leaders should use one consistent style for fairness",
                "Development level is about personality type",
                "Leadership style should match the person's development level for a specific task",
                "High performers need the most attention"
            ],
            correctAnswer: 2,
            explanation: "The core insight is matching leadership style to development level, which is task-specific. The same person needs different styles for different tasks based on their competence and commitment for each.",
            difficulty: "easy",
            points: 10
        }
    ],
    keyTakeaways: [
        "Effective leaders adapt their style to each team member's development level",
        "Development level is TASK-SPECIFIC, not person-specific",
        "Four development levels: D1 (Enthusiastic Beginner) through D4 (Self-Reliant Achiever)",
        "Four leadership styles: S1 (Directing) through S4 (Delegating)",
        "Match style to level: S1→D1, S2→D2, S3→D3, S4→D4"
    ]
};

// =============================================================================
// LESSON 2: Feedback & Coaching
// =============================================================================

export const leadershipLesson2_feedback: LessonContent = {
    id: "lead-102",
    title: "Effective Feedback and Coaching Conversations",
    description: "Master techniques for delivering feedback that improves performance and builds relationships",
    duration: "45 min",
    objectives: [
        "Apply the SBI feedback model",
        "Conduct effective coaching conversations",
        "Deliver difficult feedback constructively",
        "Create a culture of continuous feedback"
    ],
    sections: [
        {
            id: "l2-1",
            title: "The SBI Feedback Model",
            type: "text",
            content: `
# SBI: Situation-Behavior-Impact

The SBI model provides a clear, objective structure for delivering feedback that is specific, actionable, and non-threatening.

## The Three Components

### S - Situation
Set the context: When and where did this happen?
- Be specific about time and location
- Help the person recall the moment
- "In yesterday's client meeting..."

### B - Behavior
Describe what you observed: What specifically did they do or say?
- Use observable facts, not interpretations
- Focus on actions, not personality
- "I noticed you interrupted Sarah three times when she was presenting..."

### I - Impact
Explain the effect: What was the result or consequence?
- Connect behavior to outcomes
- Can be impact on you, team, project, or them
- "This made it difficult for the team to hear her full idea, and she seemed hesitant to speak up afterward."

---

## SBI in Action

### Corrective Feedback Example

**Vague (Unhelpful):**
"You need to be a better team player."

**SBI (Clear & Actionable):**
"**Situation:** In yesterday's sprint planning meeting,
**Behavior:** when the team was proposing timeline estimates, you said 'that's ridiculous' and rolled your eyes.
**Impact:** This shut down the conversation. Team members told me afterward they felt their input wasn't valued, and we didn't get the diverse estimates we needed."

---

### Positive Feedback Example

**Vague (Nice but Unhelpful):**
"Great presentation!"

**SBI (Specific & Reinforcing):**
"**Situation:** During your presentation to the executive team this morning,
**Behavior:** you anticipated their concerns about budget impact and proactively addressed them with data before they could ask.
**Impact:** This built credibility with leadership. The CFO specifically mentioned to me afterward that she appreciated your thorough preparation."
            `
        },
        {
            id: "l2-2",
            title: "The GROW Coaching Model",
            type: "text",
            content: `
# GROW: Coaching Conversations That Drive Change

The GROW model is a proven framework for structuring coaching conversations that help team members solve their own problems and develop new capabilities.

## G - Goal
What do they want to achieve?

**Questions:**
- "What would you like to accomplish from our conversation today?"
- "What does success look like for this situation?"
- "If we solve this, what would be different?"

## R - Reality
What is the current situation?

**Questions:**
- "What's happening now? What have you tried?"
- "On a scale of 1-10, where are you now?"
- "What's working? What's not working?"
- "What obstacles are you facing?"

## O - Options
What could they do?

**Questions:**
- "What are your options?"
- "What else could you try?"
- "If you had unlimited resources, what would you do?"
- "What would you advise a friend in this situation?"
- "What are the pros and cons of each option?"

## W - Way Forward / Will
What will they commit to doing?

**Questions:**
- "Which option will you pursue?"
- "What's your first step?"
- "When will you do this?"
- "What support do you need?"
- "How will you know you've succeeded?"

---

## GROW in Practice

**Scenario:** Team member struggling with time management

**G - Goal:** "I'd like to stop feeling overwhelmed and start meeting my deadlines consistently."

**R - Reality:** "I'm juggling 6 projects, often context-switching. I miss about 20% of deadlines. I've tried to-do lists but abandon them."

**O - Options:** 
- "I could block focus time on my calendar"
- "I could push back on new requests until I clear some backlog"
- "I could delegate the training project"

**W - Way Forward:** 
- "I'll block 2 hours of focus time daily for the next 2 weeks"
- "I'll start tomorrow morning"
- "I need you to support me if people try to book over that time"
            `
        },
        {
            id: "l2-3",
            title: "Delivering Difficult Feedback",
            type: "text",
            content: `
# Having Hard Conversations

Difficult feedback conversations are uncomfortable but essential. Avoiding them helps no one and often makes situations worse.

## The Cost of Avoiding

- Problems escalate and become harder to solve
- Team members miss opportunities to grow
- Resentment builds (in you and possibly others)
- Performance standards erode for the whole team
- You lose credibility as a leader

## Setting Up Success

### 1. Choose the Right Time and Place
- Private setting - never publicly embarrass
- Sufficient time - don't squeeze into 5 minutes
- When you're calm - not in the heat of the moment

### 2. Prepare Your SBI
- Write it down beforehand
- Focus on 1-2 key points, not a laundry list
- Have specific examples ready

### 3. Ask Permission
- "Can I share some feedback from yesterday's meeting?"
- Gives them control and signals respect

### 4. Deliver with Care
- State facts, not judgments
- Use "I observed" not "You always..."
- Focus on behavior, not character

### 5. Listen to Their Perspective
- They may have context you don't
- Ask: "What's your perspective on this?"
- You might learn something

### 6. Collaborate on Solutions
- "How can we prevent this in the future?"
- Focus on forward, not just critique
- Document agreements

---

## What NOT to Do

❌ Sandwich Method (positive-negative-positive)
- People see through it and tune out the middle
- Dilutes both the positive and negative messages

❌ "You always..." or "You never..."
- Triggers defensiveness
- Rarely accurate

❌ Making it personal
- Focus on behavior, not character
- "Your work was incomplete" not "You're lazy"

❌ Comparing to others
- "Why can't you be more like Sarah?"
- Damages relationships and doesn't help
            `,
            tips: [
                "The best time to give feedback is soon after the behavior",
                "One difficult conversation prevents ten resentful ones",
                "Your job isn't to be liked, it's to help people succeed"
            ]
        }
    ],
    quiz: [
        {
            id: "lq2-1",
            type: "multiple-choice",
            question: "In the SBI feedback model, what does the 'B' stand for?",
            options: ["Background", "Behavior", "Benefits", "Basics"],
            correctAnswer: 1,
            explanation: "SBI stands for Situation-Behavior-Impact. The 'B' is Behavior - the specific, observable actions the person took.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "lq2-2",
            type: "scenario",
            question: "You need to give feedback that 'the report was late.' Which is the best SBI format?",
            options: [
                "'You're always late with reports.'",
                "'The client project report was due Monday but I received it Thursday, which delayed the client presentation by two days.'",
                "'You need to work on your time management.'",
                "'The report was great, but it was a bit late, but overall good job!'"
            ],
            correctAnswer: 1,
            explanation: "This answer provides: Situation (client project report, Monday due), Behavior (received Thursday - factual, not 'always late'), Impact (delayed client presentation). It's specific and actionable.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "lq2-3",
            type: "ordering",
            question: "Put the GROW model steps in the correct order:",
            options: ["Reality", "Way Forward", "Goal", "Options"],
            correctAnswer: [2, 0, 3, 1],
            explanation: "GROW = Goal → Reality → Options → Way Forward (Will). Start with what they want, assess current state, explore options, commit to action.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "lq2-4",
            type: "multiple-choice",
            question: "Why should you avoid the 'feedback sandwich' (positive-negative-positive)?",
            options: [
                "It's too time-consuming",
                "People see through it and tune out the middle, diluting both messages",
                "It doesn't use the GROW model",
                "It's only for senior employees"
            ],
            correctAnswer: 1,
            explanation: "The sandwich method is ineffective because recipients learn to tune out the positive comments waiting for the 'but,' and the real message gets lost. It also dilutes genuine positive feedback.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "SBI (Situation-Behavior-Impact) provides clear, actionable feedback",
        "Focus on observable behavior, not personality or character",
        "GROW (Goal-Reality-Options-Way Forward) structures coaching conversations",
        "Avoiding difficult conversations makes problems worse",
        "Prepare feedback beforehand and deliver with care, not as a 'gotcha'"
    ]
};

// =============================================================================
// Leadership Curriculum Export
// =============================================================================

export const leadershipCurriculum = {
    moduleId: "leadership-development",
    title: "Modern Leadership Development",
    description: "Research-backed leadership training covering situational leadership, feedback, coaching, and team performance",
    lessons: [
        leadershipLesson1_situational,
        leadershipLesson2_feedback
    ],
    totalDuration: "85 min",
    certification: {
        name: "Certified Leadership Professional",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "leadership-certified"
    }
};

// Final Assessment
export const leadershipFinalAssessment: QuizQuestion[] = [
    {
        id: "lead-final-1",
        type: "scenario",
        question: "A team member has been with the company for 5 years and is excellent at their job, but they just took on a new responsibility (mentoring junior staff) and seem hesitant and unsure. What is their development level FOR THE MENTORING TASK?",
        options: [
            "D4 - They're experienced, so treat them as experts",
            "D3 or D2 - New task, so assess if it's lack of confidence (D3) or actual skill gap (D2)",
            "D1 - Anyone new to a task is D1",
            "Not applicable - senior employees don't need leadership"
        ],
        correctAnswer: 1,
        explanation: "Development level is task-specific. For mentoring, they're likely D2 (some capability but discouraged) or D3 (capable but cautious). You need to assess whether they need coaching (direction + support) or just support.",
        difficulty: "hard",
        points: 25
    },
    {
        id: "lead-final-2",
        type: "multiple-choice",
        question: "Which is the correct pairing of leadership style to development level?",
        options: [
            "S1-Directing for D4 (Self-Reliant Achievers)",
            "S2-Coaching for D2 (Disillusioned Learners)",
            "S3-Supporting for D1 (Enthusiastic Beginners)",
            "S4-Delegating for D2 (Disillusioned Learners)"
        ],
        correctAnswer: 1,
        explanation: "S2-Coaching (high direction + high support) matches D2 (Disillusioned Learners) who have some competence but need both guidance and encouragement after hitting obstacles.",
        difficulty: "medium",
        points: 15
    },
    {
        id: "lead-final-3",
        type: "scenario",
        question: "You need to give feedback about a team member talking over others in meetings. Using SBI, which is the best approach?",
        options: [
            "'You're too aggressive in meetings.'",
            "'In today's project sync, I noticed you interrupted Alex twice while she was explaining the timeline. This prevented the team from hearing her complete perspective, and she seemed to withdraw from the rest of the discussion.'",
            "'Good meeting today, but try not to interrupt so much, okay? But your points were good!'",
            "'Several people have complained that you're difficult to work with.'"
        ],
        correctAnswer: 1,
        explanation: "This follows SBI: Situation (today's project sync), Behavior (interrupted Alex twice), Impact (prevented team from hearing perspective, she withdrew). It's specific, factual, and actionable.",
        difficulty: "medium",
        points: 15
    }
];
