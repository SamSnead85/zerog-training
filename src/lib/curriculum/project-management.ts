/**
 * Project Management Fundamentals - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Project management basics
 * - Planning and scheduling
 * - Risk management
 * - Stakeholder management
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: Project Management Basics
// =============================================================================

export const pmLesson1_basics: LessonContent = {
    id: "pm-101",
    title: "Project Management Fundamentals",
    description: "Master essential project management concepts, methodologies, and best practices",
    duration: "45 min",
    objectives: [
        "Define projects and project management",
        "Apply the project management lifecycle",
        "Create a project charter and scope statement",
        "Develop a work breakdown structure (WBS)"
    ],
    sections: [
        {
            id: "pm1-1",
            title: "What is a Project?",
            type: "text",
            content: `
# Understanding Projects

A **project** is a temporary endeavor undertaken to create a unique product, service, or result.

## Key Characteristics

### Temporary
- Has a defined beginning and end
- Not ongoing operations
- Team may be temporary

### Unique
- Creates something that hasn't existed before
- Even similar projects have differences
- Custom deliverables

### Progressive Elaboration
- Details emerge over time
- Plan is refined as understanding grows
- Iterative development

---

## Projects vs Operations

| Aspect | Project | Operations |
|--------|---------|------------|
| Duration | Temporary | Ongoing |
| Output | Unique | Repetitive |
| Team | Assembled | Permanent |
| Focus | Change | Stability |
| Success | Deliverables | Efficiency |

---

## The Triple Constraint (Iron Triangle)

Every project balances three constraints:

### Scope
What will be delivered

### Time
When it will be delivered

### Cost
How much it will cost

**The Fourth Constraint: Quality**
Quality is often added as the center of the triangle - everything affects quality.

**Key insight:** Change one, and at least one other must change.
            `
        },
        {
            id: "pm1-2",
            title: "The Project Lifecycle",
            type: "text",
            content: `
# Project Management Lifecycle

## Five Process Groups (PMI/PMBOK)

### 1. Initiating
**Define and authorize the project**

- Develop project charter
- Identify stakeholders
- Secure initial funding
- Assign project manager

### 2. Planning
**Define scope, objectives, and approach**

- Create project management plan
- Define scope and WBS
- Develop schedule and budget
- Plan risk management
- Plan communications
- Plan quality management

### 3. Executing
**Perform the work defined in the plan**

- Direct and manage work
- Acquire and develop team
- Manage stakeholder engagement
- Conduct procurements
- Implement approved changes

### 4. Monitoring & Controlling
**Track, review, and regulate progress**

- Monitor work performance
- Control scope, schedule, cost
- Perform quality control
- Monitor risks
- Report performance

### 5. Closing
**Formally complete the project**

- Obtain acceptance
- Transfer deliverables
- Release resources
- Document lessons learned
- Archive project documents

---

## Process Overlap

Process groups **overlap** throughout the project:
- Planning continues during execution
- Monitoring happens constantly
- Changes trigger replanning
            `,
            tips: [
                "Planning is iterative, not a one-time event",
                "Monitoring starts Day 1, not after execution begins",
                "Closing processes happen for each phase, not just the end"
            ]
        },
        {
            id: "pm1-3",
            title: "Essential Project Documents",
            type: "text",
            content: `
# Key Project Documents

## Project Charter

**Purpose:** Formally authorizes the project and gives the PM authority.

### Contains:
- Project purpose and justification
- High-level requirements
- Summary milestones
- High-level budget
- Success criteria
- Sponsor approval

---

## Scope Statement

**Purpose:** Defines what is and isn't included in the project.

### Contains:
- Detailed objectives
- Deliverables list
- Acceptance criteria
- Assumptions and constraints
- **Exclusions** (what's NOT included)

---

## Work Breakdown Structure (WBS)

**Purpose:** Decompose the project into manageable pieces.

### Characteristics:
- Hierarchical decomposition
- 100% of scope included
- Work packages at lowest level
- Each element has unique ID

### Example WBS:
\`\`\`
1.0 Website Redesign Project
    1.1 Planning
        1.1.1 Requirements gathering
        1.1.2 Stakeholder interviews
    1.2 Design
        1.2.1 Wireframes
        1.2.2 Visual design
    1.3 Development
        1.3.1 Frontend
        1.3.2 Backend
    1.4 Launch
        1.4.1 Testing
        1.4.2 Deployment
\`\`\`

---

## RACI Matrix

**Purpose:** Clarify roles and responsibilities.

| Task | Alice | Bob | Carol | Dave |
|------|-------|-----|-------|------|
| Requirements | R | A | C | I |
| Design | C | R | A | I |
| Development | I | R | C | A |

- **R** = Responsible (does the work)
- **A** = Accountable (approves/owns)
- **C** = Consulted (provides input)
- **I** = Informed (kept updated)
            `
        }
    ],
    quiz: [
        {
            id: "pmq1-1",
            type: "multiple-choice",
            question: "What makes a project different from operations?",
            options: [
                "Projects are more important",
                "Projects are temporary and create unique deliverables",
                "Projects don't have budgets",
                "Projects don't need management"
            ],
            correctAnswer: 1,
            explanation: "The defining characteristics of a project are that it's temporary (has a defined beginning and end) and creates something unique.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "pmq1-2",
            type: "ordering",
            question: "Order the project management process groups from start to finish:",
            options: ["Executing", "Closing", "Initiating", "Planning", "Monitoring & Controlling"],
            correctAnswer: [2, 3, 0, 4, 1],
            explanation: "The order is: Initiating → Planning → Executing → Monitoring & Controlling → Closing. Note that M&C runs throughout but is listed after Executing as it primarily tracks execution.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "pmq1-3",
            type: "scenario",
            question: "Your client wants to add features without extending the deadline or increasing budget. According to the Triple Constraint, what will likely be affected?",
            options: [
                "Nothing - a good PM can handle it",
                "Scope, time, or cost must change - or quality will suffer",
                "The team just needs to work harder",
                "Documentation should decrease"
            ],
            correctAnswer: 1,
            explanation: "The Triple Constraint means scope, time, and cost are interdependent. Adding scope without adjusting time or cost will impact quality (the fourth constraint).",
            difficulty: "medium",
            points: 15
        },
        {
            id: "pmq1-4",
            type: "multiple-select",
            question: "Which are components of a Project Charter? (Select all that apply)",
            options: [
                "Detailed task list",
                "Project purpose and justification",
                "High-level milestones",
                "Complete budget breakdown",
                "Sponsor approval"
            ],
            correctAnswer: [1, 2, 4],
            explanation: "The charter includes purpose, high-level milestones, and sponsor approval. Detailed task lists and complete budgets come later in planning (WBS and detailed budget).",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "Projects are temporary endeavors creating unique deliverables",
        "Triple Constraint: Scope, Time, Cost (plus Quality)",
        "5 Process Groups: Initiating, Planning, Executing, Monitoring & Controlling, Closing",
        "Project Charter formally authorizes the project",
        "WBS decomposes 100% of scope into manageable work packages"
    ]
};

// =============================================================================
// PM Curriculum Export
// =============================================================================

export const pmCurriculum = {
    moduleId: "project-management-fundamentals",
    title: "Project Management Fundamentals",
    description: "Essential project management skills for any professional",
    lessons: [
        pmLesson1_basics
    ],
    totalDuration: "45 min",
    certification: {
        name: "PM Foundations Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "pm-certified"
    }
};
