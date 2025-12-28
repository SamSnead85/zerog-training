/**
 * Agile & Scrum Fundamentals - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Agile principles and values
 * - Scrum framework and roles
 * - Sprint ceremonies and artifacts
 * - SAFe overview for enterprise
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: Agile Fundamentals
// =============================================================================

export const agileLesson1_fundamentals: LessonContent = {
    id: "agile-101",
    title: "Agile Principles and Scrum Framework",
    description: "Master the Agile mindset and Scrum framework for effective project delivery",
    duration: "45 min",
    objectives: [
        "Explain the 4 Agile values and 12 principles",
        "Describe the Scrum framework roles",
        "Understand Sprint ceremonies and artifacts",
        "Apply Scrum to real-world scenarios"
    ],
    sections: [
        {
            id: "a1-1",
            title: "The Agile Manifesto",
            type: "text",
            content: `
# The Agile Manifesto (2001)

Seventeen software developers created the Agile Manifesto to define a better way of developing software.

## The 4 Core Values

We value items on the **left** more than items on the right:

### 1. Individuals and Interactions over Processes and Tools
- People solve problems, not processes
- Collaboration beats documentation
- Tools enable, but don't replace, human judgment

### 2. Working Software over Comprehensive Documentation
- Deliver value early and often
- Documentation should support, not replace, working product
- "Working" means tested and deployable

### 3. Customer Collaboration over Contract Negotiation
- Partners, not adversaries
- Continuous feedback loop
- Shared goals and outcomes

### 4. Responding to Change over Following a Plan
- Embrace change, don't resist it
- Plans are valuable, but adaptability is essential
- Short cycles enable course correction

---

## The 12 Principles

1. Satisfy the customer through early and continuous delivery
2. Welcome changing requirements, even late in development
3. Deliver working software frequently (weeks, not months)
4. Business people and developers must work together daily
5. Build projects around motivated individuals
6. Face-to-face conversation is the most efficient communication
7. Working software is the primary measure of progress
8. Sustainable development pace
9. Technical excellence enhances agility
10. Simplicity—maximizing work not done
11. Self-organizing teams produce best results
12. Regular reflection and adjustment
            `
        },
        {
            id: "a1-2",
            title: "The Scrum Framework",
            type: "text",
            content: `
# Scrum: The Most Popular Agile Framework

Scrum is a lightweight framework for developing and sustaining complex products.

## The Three Scrum Roles

### Product Owner
**Accountable for:** Maximizing value of the product

- Manages the Product Backlog
- Prioritizes features based on value
- Represents stakeholder needs
- Makes decisions about what to build
- One person, NOT a committee

### Scrum Master
**Accountable for:** Scrum team effectiveness

- Coaches the team on Scrum practices
- Removes impediments
- Facilitates Scrum events
- Protects the team from distractions
- Servant-leader, NOT a manager

### Developers
**Accountable for:** Delivering a Done Increment each Sprint

- Self-organizing and cross-functional
- Decide HOW to do the work
- Collectively own all technical decisions
- Usually 3-9 people

---

## The Scrum Events (Ceremonies)

### Sprint
- Time-boxed period (1-4 weeks, typically 2 weeks)
- A container for all other events
- Consistent duration throughout project
- New Sprint starts immediately after previous one ends

### Sprint Planning
- **Duration:** Max 8 hours for a 4-week Sprint
- **Purpose:** Define Sprint Goal and select Backlog items
- **Output:** Sprint Backlog

### Daily Scrum (Stand-up)
- **Duration:** 15 minutes maximum
- **Frequency:** Every day, same time, same place
- **Focus:** Progress toward Sprint Goal, plan for next 24 hours

### Sprint Review
- **Duration:** Max 4 hours for a 4-week Sprint
- **Purpose:** Inspect the Increment, gather feedback
- **Attendees:** Scrum Team + stakeholders

### Sprint Retrospective
- **Duration:** Max 3 hours for a 4-week Sprint
- **Purpose:** Inspect the team's process, identify improvements
- **Output:** Actionable improvement items
            `,
            tips: [
                "The Product Owner cannot be the Scrum Master",
                "Daily Scrum is for the Developers - others may attend but don't participate",
                "Retrospectives are about continuous improvement, not blame"
            ]
        },
        {
            id: "a1-3",
            title: "Scrum Artifacts",
            type: "text",
            content: `
# Scrum Artifacts

Artifacts represent work or value and maximize transparency.

---

## Product Backlog
**Commitment: Product Goal**

- Single source of truth for work the team may do
- Ordered by value, risk, dependencies
- Continuously refined (grooming)
- Never complete - always evolving

### Backlog Items Include:
- Features / User Stories
- Bug fixes
- Technical debt
- Spikes (research/investigation)

---

## Sprint Backlog
**Commitment: Sprint Goal**

- Subset of Product Backlog selected for the Sprint
- Plan for delivering the Increment
- Owned by Developers
- Updated throughout the Sprint

### Components:
- Sprint Goal (the "why")
- Selected Backlog items (the "what")
- Delivery plan (the "how")

---

## Increment
**Commitment: Definition of Done**

- Sum of all completed Backlog items
- Must be usable and meet Definition of Done
- Potentially shippable after every Sprint
- Multiple Increments may be delivered in a Sprint

---

## Definition of Done

A shared understanding of when work is complete.

### Example Definition of Done:
- [ ] Code written and peer-reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Deployed to staging environment
- [ ] Accepted by Product Owner
            `
        }
    ],
    quiz: [
        {
            id: "aq1-1",
            type: "multiple-choice",
            question: "Which Agile value emphasizes delivering value early rather than perfect documentation?",
            options: [
                "Individuals and interactions over processes and tools",
                "Working software over comprehensive documentation",
                "Customer collaboration over contract negotiation",
                "Responding to change over following a plan"
            ],
            correctAnswer: 1,
            explanation: "'Working software over comprehensive documentation' means delivering functional product is more valuable than perfect documentation, though documentation still has value.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "aq1-2",
            type: "multiple-select",
            question: "Which are responsibilities of the Scrum Master? (Select all that apply)",
            options: [
                "Prioritizing the Product Backlog",
                "Removing impediments for the team",
                "Facilitating Scrum events",
                "Assigning tasks to developers",
                "Coaching the team on Scrum practices"
            ],
            correctAnswer: [1, 2, 4],
            explanation: "The Scrum Master removes impediments, facilitates events, and coaches on Scrum. Prioritizing backlog is the Product Owner's job, and assigning tasks contradicts self-organization.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "aq1-3",
            type: "scenario",
            question: "During a Sprint, a stakeholder asks a Developer to add an urgent feature not in the Sprint Backlog. What should happen?",
            options: [
                "The Developer should immediately add it",
                "The Developer should direct them to the Product Owner",
                "The Scrum Master should reject the request",
                "The Sprint should be canceled"
            ],
            correctAnswer: 1,
            explanation: "Changes to the Sprint Backlog should go through the Product Owner, who can negotiate with the Developers. Stakeholders should not circumvent the process.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "aq1-4",
            type: "ordering",
            question: "Put these Scrum events in the order they occur within a Sprint:",
            options: ["Sprint Retrospective", "Daily Scrum", "Sprint Planning", "Sprint Review"],
            correctAnswer: [2, 1, 3, 0],
            explanation: "Sprint Planning starts the Sprint, Daily Scrum happens each day, Sprint Review presents the work, and Sprint Retrospective closes the Sprint.",
            difficulty: "easy",
            points: 10
        }
    ],
    keyTakeaways: [
        "Agile values working software, customer collaboration, and responding to change",
        "Scrum has 3 roles: Product Owner, Scrum Master, Developers",
        "5 events: Sprint (container), Planning, Daily Scrum, Review, Retrospective",
        "3 artifacts: Product Backlog, Sprint Backlog, Increment",
        "Definition of Done provides shared quality standards"
    ]
};

// =============================================================================
// Agile Curriculum Export
// =============================================================================

export const agileCurriculum = {
    moduleId: "agile-scrum-fundamentals",
    title: "Agile & Scrum Fundamentals",
    description: "Master Agile principles and Scrum framework for modern project delivery",
    lessons: [
        agileLesson1_fundamentals
    ],
    totalDuration: "45 min",
    certification: {
        name: "Agile Foundations Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "agile-certified"
    }
};
