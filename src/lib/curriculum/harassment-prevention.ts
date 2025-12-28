/**
 * Workplace Harassment Prevention - Complete Curriculum
 * 
 * Research-backed training covering:
 * - Legal definitions and framework
 * - Recognition and response
 * - Bystander intervention
 * - Reporting procedures
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: Understanding Workplace Harassment
// =============================================================================

export const harassmentLesson1_understanding: LessonContent = {
    id: "harass-101",
    title: "Understanding Workplace Harassment",
    description: "Learn the legal definitions, types, and impact of workplace harassment",
    duration: "35 min",
    objectives: [
        "Define workplace harassment under federal and state law",
        "Distinguish between harassment types and severity levels",
        "Recognize protected characteristics under Title VII",
        "Understand the impact of harassment on individuals and organizations"
    ],
    sections: [
        {
            id: "wh1-1",
            title: "Legal Framework",
            type: "text",
            content: `
# Workplace Harassment: The Legal Foundation

Workplace harassment is not just about being mean or difficult to work with. It has specific legal definitions that determine when behavior crosses the line into unlawful conduct.

## Title VII of the Civil Rights Act (1964)

The primary federal law prohibiting workplace harassment based on:
- Race
- Color
- Religion
- Sex (including pregnancy, sexual orientation, gender identity)
- National origin

## Other Relevant Laws

### Age Discrimination in Employment Act (ADEA)
Protects employees 40 and older from age-based harassment

### Americans with Disabilities Act (ADA)
Prohibits harassment based on disability

### State and Local Laws
Often provide additional protections beyond federal law, including:
- Marital status
- Political affiliation
- Military status
- Additional coverage for smaller employers

---

## The Legal Standard: Two Tests

For harassment to be legally actionable, it generally must meet one of these tests:

### 1. Quid Pro Quo
"This for that" - when employment benefits are conditioned on submission to unwelcome conduct

**Example:** "Go out with me and I'll recommend you for that promotion."

A SINGLE incident can constitute quid pro quo harassment.

### 2. Hostile Work Environment
Conduct that is sufficiently severe OR pervasive to alter the conditions of employment

**Factors considered:**
- Frequency of the conduct
- Severity of the conduct  
- Whether it's threatening or humiliating vs. mere offensive utterance
- Whether it unreasonably interferes with work performance
- Effect on the employee's psychological well-being

**Key:** Usually requires a pattern, but a single severe incident may qualify.
            `
        },
        {
            id: "wh1-2",
            title: "Types of Harassment",
            type: "text",
            content: `
# Recognizing Different Forms of Harassment

## Sexual Harassment

### Verbal
- Sexual comments, jokes, or innuendos
- Requests for sexual favors
- Comments about a person's body or appearance
- Sexual rumors or gossip

### Non-Verbal
- Staring or leering
- Sexual gestures
- Displaying sexually suggestive materials
- Sexual emails, texts, or social media messages

### Physical  
- Unwanted touching, hugging, or patting
- Blocking someone's movement
- Sexual assault

---

## Harassment Based on Other Protected Characteristics

### Race/National Origin
- Racial slurs or epithets
- Mocking accents or cultural practices
- Racial jokes or stereotyping
- Displaying racist symbols

### Religion
- Mocking religious practices or beliefs
- Pressuring someone about religion
- Denying religious accommodations
- Religious slurs or jokes

### Age
- Comments about "old-timers" or "dinosaurs"  
- Assuming older workers can't learn new technology
- Age-based jokes about retirement, memory, etc.
- Systematic exclusion from opportunities

### Disability
- Mocking physical or mental conditions
- Mimicking or imitating disabilities
- Invasive questions about medical conditions
- Using disability-related slurs

---

## What Harassment Is NOT

Understanding what IS harassment helps clarify what is NOT:

✓ **Not harassment:**
- Legitimate performance feedback
- Workplace discipline for misconduct
- Disagreements or conflicts not based on protected characteristics
- A single mildly offensive comment
- Personality conflicts or being "rude"

❌ **These behaviors COULD be harassment if:**
- Based on a protected characteristic
- Severe or pervasive
- Create a hostile environment
            `
        },
        {
            id: "wh1-3",
            title: "The Impact of Harassment",
            type: "text",
            content: `
# Why This Matters: The True Cost of Harassment

## Impact on Individuals

### Psychological Effects
- Anxiety, depression, PTSD
- Decreased self-esteem and confidence
- Fear and hypervigilance
- Sleep disorders and physical health impacts

### Professional Effects  
- Decreased job satisfaction and engagement
- Lower performance and productivity
- Career derailment or leaving the workforce
- Loss of income and opportunities

### Personal Effects
- Strained relationships
- Social isolation
- Substance abuse
- Long-term trauma

---

## Impact on Organizations

### Financial Costs
- Legal fees and settlements (average harassment lawsuit: $125,000+)
- Lost productivity (estimated $2.6 billion/year in U.S.)
- Turnover costs (replacing an employee costs 50-200% of salary)
- Increased absenteeism

### Reputational Damage
- Public scandals and #MeToo exposure
- Customer and client loss
- Difficulty attracting talent
- Damaged employer brand

### Cultural Deterioration  
- Decreased trust and morale
- Reduced collaboration and innovation
- Toxic work environment spread
- Good employees leaving

---

## The Business Case for Prevention

Organizations with strong anti-harassment programs see:
- **25% higher** employee engagement
- **40% lower** turnover in at-risk populations
- **Fewer** formal complaints and legal actions
- **Stronger** employer brand and recruiting
            `,
            tips: [
                "Harassment affects witnesses and bystanders too, not just direct targets",
                "Early intervention prevents escalation and reduces all costs",
                "A single harasser can poison team culture for everyone"
            ]
        }
    ],
    quiz: [
        {
            id: "whq1-1",
            type: "multiple-choice",
            question: "Under Title VII, which of the following is NOT a protected characteristic?",
            options: ["Religion", "National origin", "Political affiliation", "Sex"],
            correctAnswer: 2,
            explanation: "Title VII protects race, color, religion, sex, and national origin. Political affiliation is not a federally protected class, though some state and local laws may protect it.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "whq1-2",
            type: "multiple-choice",
            question: "What is 'quid pro quo' harassment?",
            options: [
                "Creating a hostile work environment through repeated comments",
                "Conditioning employment benefits on submission to unwelcome conduct",
                "Harassment that occurs between employees of equal rank",
                "Harassment that occurs outside the workplace"
            ],
            correctAnswer: 1,
            explanation: "Quid pro quo ('this for that') harassment occurs when job benefits are conditioned on sexual or other inappropriate demands. This can occur in a single incident.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "whq1-3",
            type: "multiple-select",
            question: "Which factors are considered when determining if a hostile work environment exists? (Select all that apply)",
            options: [
                "Frequency of the conduct",
                "Severity of the conduct",
                "Whether the harasser intended to offend",
                "Whether it interferes with work performance",
                "The employee's political views"
            ],
            correctAnswer: [0, 1, 3],
            explanation: "Courts consider frequency, severity, and impact on work. Intent is NOT required - impact matters more than intent. Political views are not a Title VII factor.",
            difficulty: "medium",
            points: 20
        },
        {
            id: "whq1-4",
            type: "scenario",
            question: "A coworker makes one off-color joke at lunch. No one laughs and they don't repeat it. Is this legally actionable harassment?",
            options: [
                "Yes, any inappropriate comment is harassment",
                "No, this likely doesn't meet the 'severe or pervasive' standard",
                "Only if the employee files a complaint",
                "Yes, if anyone was offended"
            ],
            correctAnswer: 1,
            explanation: "A single mildly offensive comment typically doesn't meet the hostile work environment standard of 'severe OR pervasive.' While inappropriate and worth addressing, it's not likely legally actionable harassment.",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "Harassment must be based on a protected characteristic to be illegal",
        "Two legal tests: Quid pro quo (single incident) and Hostile environment (pattern)",
        "Intent doesn't matter - impact determines harassment",
        "Harassment hurts individuals, teams, and the entire organization",
        "Not everything offensive is legally harassment, but all harassment should be addressed"
    ]
};

// =============================================================================
// LESSON 2: Bystander Intervention
// =============================================================================

export const harassmentLesson2_bystander: LessonContent = {
    id: "harass-102",
    title: "Bystander Intervention: Taking Action",
    description: "Learn effective techniques to safely intervene when witnessing harassment",
    duration: "30 min",
    objectives: [
        "Overcome the bystander effect",
        "Apply the 5 D's of bystander intervention",
        "Choose appropriate intervention strategies",
        "Support targets of harassment effectively"
    ],
    sections: [
        {
            id: "wh2-1",
            title: "The Bystander Effect",
            type: "text",
            content: `
# Why We Don't Intervene (And Why We Should)

## The Bystander Effect

Psychological research shows that the more people present in an emergency, the LESS likely any individual is to help. This is called the **bystander effect**.

### Why It Happens

**Diffusion of Responsibility**
"Someone else will handle it"

**Social Proof**
"If no one else is reacting, maybe it's not that bad"

**Fear of Embarrassment**
"What if I'm overreacting?"

**Uncertainty**
"I don't know what to do"

**Fear of Retaliation**
"What if the harasser targets me?"

---

## Why Bystanders Matter

Research shows that bystander intervention:
- Stops harassment incidents 50% of the time
- Reduces psychological harm to targets
- Creates culture change over time
- Signals organizational values

### The Power Equation

There's often one harasser → Many potential bystanders

**Together, bystanders have more power than any single harasser.**

---

## Overcoming Barriers

### Reframe Your Role
- You're not the "hero" - you're a colleague doing the right thing
- Intervention doesn't have to be confrontational
- Small actions matter more than you think

### Prepare In Advance
- Know your organization's policies
- Practice intervention phrases
- Recognize warning signs early
            `
        },
        {
            id: "wh2-2",
            title: "The 5 D's Framework",
            type: "text",
            content: `
# The 5 D's of Bystander Intervention

## 1. DIRECT
Directly address the situation by speaking up

**When to use:**
- You feel safe to do so
- The harassment is clear and ongoing
- You have standing (e.g., seniority, relationship)

**How:**
- "That's not appropriate - let's keep it professional"
- "Hey, I don't think they appreciated that comment"
- "We don't joke like that here"

**Caution:** Avoid escalating or putting the target in a worse position

---

## 2. DISTRACT
Create a diversion to interrupt the harassment

**When to use:**
- Direct confrontation feels risky
- You want to de-escalate
- The target needs a way out

**How:**
- "Hey Sarah, can you help me with something right now?"
- Spill something, ask for directions, create a work interruption
- "The meeting is starting - we should head over"

**Advantage:** Stops the behavior without confrontation

---

## 3. DELEGATE
Get help from someone with more power or standing

**When to use:**
- The harasser has power over you
- You're unsure how to handle it
- The situation requires authority

**How:**
- Ask a manager to step in
- Alert HR or security
- Find someone who can intervene more effectively

---

## 4. DELAY
Wait until later to check in with the target

**When to use:**
- You missed the moment
- Immediate intervention wasn't possible
- The target is no longer present

**How:**
- "Hey, I saw what happened earlier. Are you okay?"
- "That comment was out of line - I'm sorry you had to deal with that"
- "Would it help if I went to HR with you?"

**Key:** Validates the target's experience and offers support

---

## 5. DOCUMENT
Record what you witnessed

**When to use:**
- Always (as a complement to other actions)
- When patterns need to be established
- To support potential reporting

**How:**
- Note date, time, location, exact words used
- Note who was present
- Save any digital evidence (screenshots)
- Keep records in a safe place
            `
        },
        {
            id: "wh2-3",
            title: "Supporting Targets",
            type: "text",
            content: `
# How to Support Someone Who's Been Harassed

## What TO Do

### Listen and Believe
- "I believe you"
- "That wasn't okay"
- "Thank you for telling me"

### Validate Their Experience
- "You didn't deserve that"
- "This wasn't your fault"
- "Your feelings make sense"

### Offer Support Without Pressure
- "What would be helpful for you right now?"
- "I'm here if you want to talk"
- "What do you need from me?"

### Provide Information
- Share reporting options (but don't pressure)
- Explain available resources (EAP, HR, etc.)
- Offer to accompany them if they want to report

### Follow Up
- Check in later
- Respect their decisions even if you disagree
- Maintain confidentiality

---

## What NOT To Do

❌ **Don't minimize**
- "It wasn't that bad"
- "They were probably just joking"
- "Are you sure that's what happened?"

❌ **Don't blame**
- "What were you wearing?"
- "Why didn't you just leave?"
- "You should have said something"

❌ **Don't pressure**
- "You HAVE to report this"
- "If you don't report, you're letting them win"

❌ **Don't gossip**
- Don't share their story without permission
- Protect their privacy
- Ask what they're comfortable with you sharing
            `,
            tips: [
                "Your role is to support, not to decide for them",
                "Respect their agency - they may have reasons for their choices",
                "Follow up shows you care; one conversation isn't enough"
            ]
        }
    ],
    quiz: [
        {
            id: "whq2-1",
            type: "multiple-choice",
            question: "What is the 'bystander effect'?",
            options: [
                "Bystanders always intervene when they see harassment",
                "The more people present, the less likely any individual is to help",
                "Bystanders are legally liable for harassment they witness",
                "Only bystanders can report harassment"
            ],
            correctAnswer: 1,
            explanation: "The bystander effect is the psychological phenomenon where individuals are less likely to offer help when others are present, due to diffusion of responsibility and social proof.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "whq2-2",
            type: "scenario",
            question: "You witness a senior manager making inappropriate comments to a junior colleague. The junior colleague looks uncomfortable. You don't feel safe directly confronting the manager. Which 'D' approach would be most appropriate?",
            options: [
                "Direct - tell the manager to stop",
                "Distract - create an interruption like asking the colleague to help with something",
                "Do nothing - it's not your business",
                "Demand - insist they apologize immediately"
            ],
            correctAnswer: 1,
            explanation: "Distract is a safe way to interrupt harassment without direct confrontation. Creating a work-related interruption removes the target from the situation without escalating tension.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "whq2-3",
            type: "multiple-select",
            question: "When supporting someone who experienced harassment, you should: (Select all that apply)",
            options: [
                "Listen and believe their account",
                "Tell them exactly what to do",
                "Offer to accompany them if they want to report",
                "Ask them what they need from you",
                "Share what happened with others so they're aware"
            ],
            correctAnswer: [0, 2, 3],
            explanation: "Support means listening, believing, offering help, and asking what they need. Don't tell them what to do (respect their agency) or share their story without permission (protect privacy).",
            difficulty: "medium",
            points: 15
        },
        {
            id: "whq2-4",
            type: "ordering",
            question: "Put these intervention steps in a recommended order for a witnessed harassment incident:",
            options: ["Check in with the target afterwards", "Document what you witnessed", "Assess safety to determine intervention method", "Intervene using an appropriate D strategy"],
            correctAnswer: [2, 3, 0, 1],
            explanation: "First assess safety, then intervene appropriately, then check in with the target, and always document. This ensures both effective intervention and proper record-keeping.",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "The bystander effect means we must consciously choose to act",
        "5 D's: Direct, Distract, Delegate, Delay, Document",
        "Choose your intervention based on safety and context",
        "Support targets by listening, believing, and asking what they need",
        "Never pressure someone to report - respect their agency"
    ]
};

// =============================================================================
// Workplace Harassment Curriculum Export
// =============================================================================

export const harassmentCurriculum = {
    moduleId: "harassment-prevention",
    title: "Workplace Harassment Prevention",
    description: "Comprehensive training on recognizing, preventing, and responding to workplace harassment",
    lessons: [
        harassmentLesson1_understanding,
        harassmentLesson2_bystander
    ],
    totalDuration: "65 min",
    certification: {
        name: "Harassment Prevention Certified",
        passingScore: 80,
        validityPeriod: "1 year",
        badge: "harassment-prevention-certified",
        requiredByLaw: true
    }
};

// =============================================================================
// Final Assessment
// =============================================================================

export const harassmentFinalAssessment: QuizQuestion[] = [
    {
        id: "harass-final-1",
        type: "scenario",
        question: "An employee tells you they've been harassed by their supervisor but asks you not to tell anyone. What should you do?",
        options: [
            "Keep their secret completely - they asked you to",
            "Report immediately to HR without telling them",
            "Explain that as a manager you may have reporting obligations, provide resources, but respect their wishes for non-confidential matters",
            "Tell the harasser to stop on their behalf"
        ],
        correctAnswer: 2,
        explanation: "The best approach is transparency: explain any reporting obligations you have while providing resources and support. Managers often have legal duties to report, but should be honest about this while still supporting the employee.",
        difficulty: "hard",
        points: 25
    },
    {
        id: "harass-final-2",
        type: "multiple-choice",
        question: "Which statement about hostile work environment harassment is correct?",
        options: [
            "A single comment is always enough to create a hostile environment",
            "The harasser must intend to create a hostile environment",
            "Conduct must be severe OR pervasive enough to alter working conditions",
            "Only direct targets can experience hostile environment"
        ],
        correctAnswer: 2,
        explanation: "For hostile environment claims, conduct must be either severe (a single serious incident) OR pervasive (pattern of behavior) enough to alter working conditions. Intent is not required, and witnesses can be affected too.",
        difficulty: "medium",
        points: 15
    },
    {
        id: "harass-final-3",
        type: "multiple-select",
        question: "When documenting a harassment incident you witnessed, you should record: (Select all that apply)",
        options: [
            "Date and time of the incident",
            "Your personal opinion of the harasser's character",
            "Exact words used (as best you can recall)",
            "Who else was present",
            "The target's emotional response in judgmental terms"
        ],
        correctAnswer: [0, 2, 3],
        explanation: "Good documentation includes objective facts: date/time, exact words, and witnesses. Avoid personal opinions or judgmental characterizations, which can undermine the documentation.",
        difficulty: "medium",
        points: 15
    }
];
