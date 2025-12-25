// SAFe Scrum Master - Full Training Content
// Pre-populated with industry-standard curriculum

export const safeScrumMasterContent = {
    id: "safe-scrum-master",
    title: "SAFe Scrum Master Certification Prep",
    description: "Master the Scrum Master role in a SAFe enterprise",

    lessons: [
        {
            id: "lesson-1",
            title: "Introduction to SAFe",
            duration: "15 min",
            type: "video",
            content: `
# Introduction to the Scaled Agile Framework (SAFe)

## What is SAFe?

The Scaled Agile Framework (SAFe) is a proven, publicly available framework for implementing Agile practices at enterprise scale. It provides guidance for organizations with multiple Agile teams that need to align and coordinate their work.

## The Four Levels of SAFe

### 1. Team Level
- Individual Agile teams (Scrum or Kanban)
- 5-11 team members
- Delivers value every iteration (2 weeks)

### 2. Program Level
- Agile Release Train (ART) - 50-125 people
- Multiple teams working together
- Delivers value every Program Increment (8-12 weeks)

### 3. Large Solution Level
- Multiple ARTs coordinating
- Complex solutions requiring many teams
- Solution Train structure

### 4. Portfolio Level
- Strategy and investment funding
- Portfolio Kanban
- Lean governance

## Core Values of SAFe

| Value | Description |
|-------|-------------|
| **Alignment** | Everyone understands the mission and works toward common goals |
| **Built-in Quality** | Quality is built in at every step, not inspected at the end |
| **Transparency** | All information is visible to everyone who needs it |
| **Program Execution** | Working solutions are the primary measure of progress |

## Key Takeaways

1. SAFe helps large organizations scale Agile practices
2. It provides structure while maintaining Agile principles
3. The Scrum Master plays a critical role in SAFe implementation
4. Focus on delivering value incrementally and continuously
      `,
            quiz: {
                question: "What are the four core values of SAFe?",
                options: [
                    "Speed, Quality, Cost, Scope",
                    "Alignment, Built-in Quality, Transparency, Program Execution",
                    "Individuals, Interactions, Working Software, Customer Collaboration",
                    "Plan, Do, Check, Act"
                ],
                correctIndex: 1,
                explanation: "The four core values of SAFe are Alignment, Built-in Quality, Transparency, and Program Execution. These values guide decision-making and behavior at all levels of the organization."
            }
        },
        {
            id: "lesson-2",
            title: "The Agile Manifesto & Principles",
            duration: "20 min",
            type: "video",
            content: `
# The Agile Manifesto and Principles

## The Four Values

The Agile Manifesto, created in 2001, established four core values:

### We value:
1. **Individuals and interactions** over processes and tools
2. **Working software** over comprehensive documentation
3. **Customer collaboration** over contract negotiation
4. **Responding to change** over following a plan

> "While there is value in the items on the right, we value the items on the left more."

## The 12 Principles

### Customer Satisfaction
1. Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.

### Welcome Change
2. Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.

### Frequent Delivery
3. Deliver working software frequently, from a couple of weeks to a couple of months, with preference to the shorter timescale.

### Business & Development Together
4. Business people and developers must work together daily throughout the project.

### Motivated Individuals
5. Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.

### Face-to-Face Conversation
6. The most efficient and effective method of conveying information is face-to-face conversation.

### Working Software is Primary
7. Working software is the primary measure of progress.

### Sustainable Development
8. Agile processes promote sustainable development. Sponsors, developers, and users should maintain a constant pace indefinitely.

### Technical Excellence
9. Continuous attention to technical excellence and good design enhances agility.

### Simplicity
10. Simplicity—the art of maximizing the amount of work not done—is essential.

### Self-Organizing Teams
11. The best architectures, requirements, and designs emerge from self-organizing teams.

### Reflect and Adapt
12. At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly.

## How This Applies in SAFe

SAFe embraces these principles and extends them to work at scale:
- Multiple teams still follow Agile principles
- Coordination happens through ceremonies like PI Planning
- Value is delivered continuously through the Continuous Delivery Pipeline
      `,
            quiz: {
                question: "According to the Agile Manifesto, what is the primary measure of progress?",
                options: [
                    "Lines of code written",
                    "Story points completed",
                    "Working software",
                    "Documentation produced"
                ],
                correctIndex: 2,
                explanation: "Principle #7 states that 'Working software is the primary measure of progress.' This emphasizes delivering actual, functional value over other metrics."
            }
        },
        {
            id: "lesson-3",
            title: "Scrum Fundamentals in SAFe",
            duration: "25 min",
            type: "video",
            content: `
# Scrum Fundamentals in SAFe

## What is Scrum?

Scrum is a lightweight framework for developing, delivering, and sustaining complex products. In SAFe, Scrum is the primary method used by Agile teams.

## The Scrum Team

### Product Owner
- Defines features and priorities
- Manages the Team Backlog
- Accepts or rejects work
- Represents customer interests

### Scrum Master
- Facilitates Scrum events
- Removes impediments
- Coaches the team
- Shields team from distractions

### Development Team
- Cross-functional (all skills needed)
- Self-organizing
- 3-9 members typically
- Committed to delivering value

## Scrum Events

### Sprint (Iteration)
- Time-boxed period (typically 2 weeks in SAFe)
- Team commits to delivering specific work
- Ends with potentially shippable increment

### Sprint Planning
- Team selects work for the sprint
- Creates plan to deliver selected items
- Time-box: 2-4 hours

### Daily Scrum (Stand-up)
- Daily 15-minute sync
- What did I do yesterday?
- What will I do today?
- Any impediments?

### Sprint Review
- Demonstrate completed work
- Gather stakeholder feedback
- Time-box: 1-2 hours

### Sprint Retrospective
- Team reflects on the sprint
- Identifies improvements
- Time-box: 1-2 hours

## Scrum Artifacts

| Artifact | Purpose |
|----------|---------|
| Product Backlog | Ordered list of all work needed |
| Sprint Backlog | Selected items + plan for sprint |
| Increment | Sum of completed items - must be usable |

## Definition of Done

A shared understanding of what "complete" means:
- Code reviewed
- Tests passing
- Documentation updated
- Deployed to staging
- PO accepted
      `,
            quiz: {
                question: "What is the typical iteration length in SAFe?",
                options: [
                    "1 week",
                    "2 weeks",
                    "4 weeks",
                    "6 weeks"
                ],
                correctIndex: 1,
                explanation: "SAFe recommends 2-week iterations (sprints). This provides a consistent cadence that aligns with the Program Increment, which typically consists of 5 iterations."
            }
        },
        {
            id: "lesson-4",
            title: "The Agile Release Train",
            duration: "30 min",
            type: "video",
            content: `
# The Agile Release Train (ART)

## What is an ART?

The Agile Release Train is the primary value delivery vehicle in SAFe. Think of it as a long-lived team of Agile teams that:
- Plans together
- Commits together
- Executes together
- Delivers together

## ART Composition

### Size
- 50-125 people
- 5-12 Agile teams
- Too small = not enough capacity
- Too big = coordination overhead

### Team Types
1. **Feature Teams** - Build customer-facing features
2. **Component Teams** - Build shared services/infrastructure
3. **System Team** - Integration, testing, infrastructure

### Key Roles

#### Release Train Engineer (RTE)
- Chief Scrum Master for the ART
- Facilitates PI Planning
- Removes impediments at program level
- Manages risks and dependencies

#### Product Management
- Owns the Program Backlog
- Defines features and priorities
- Works with Business Owners

#### System Architect
- Technical vision and guidance
- Cross-team architectural decisions
- Ensures technical cohesion

## ART Events

### PI Planning (2 days)
- All teams plan the next PI together
- Face-to-face when possible
- Creates committed objectives

### System Demo (every 2 weeks)
- Show integrated work from all teams
- Stakeholder feedback
- Progress visibility

### Inspect & Adapt (every PI)
- Quantitative and qualitative review
- Problem-solving workshop
- Continuous improvement

## The PI (Program Increment)

- Duration: 8-12 weeks (typically 5 iterations + 1 IP)
- Innovation & Planning (IP) iteration for:
  - PI Planning
  - Innovation time
  - Hackathons
  - Training
      `,
            quiz: {
                question: "What is the typical size of an Agile Release Train?",
                options: [
                    "10-25 people",
                    "50-125 people",
                    "200-500 people",
                    "It varies without guidelines"
                ],
                correctIndex: 1,
                explanation: "An ART typically consists of 50-125 people (5-12 Agile teams). This size provides enough capacity to deliver significant value while maintaining coordination efficiency."
            }
        },
        {
            id: "lesson-5",
            title: "Knowledge Check: SAFe Basics",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    question: "What are the four levels of SAFe?",
                    options: ["Team, Program, Portfolio, Enterprise", "Team, Program, Large Solution, Portfolio", "Scrum, Kanban, XP, Lean", "Sprint, Release, Vision, Strategy"],
                    correctIndex: 1,
                    explanation: "SAFe has four levels: Team, Program, Large Solution, and Portfolio. These provide a scalable structure for organizations of different sizes."
                },
                {
                    question: "How long is a typical Program Increment?",
                    options: ["2 weeks", "4 weeks", "8-12 weeks", "6 months"],
                    correctIndex: 2,
                    explanation: "A PI is typically 8-12 weeks, consisting of 5 development iterations plus 1 Innovation & Planning iteration."
                },
                {
                    question: "Who is responsible for facilitating ART-level events?",
                    options: ["Product Owner", "Scrum Master", "Release Train Engineer", "Business Owner"],
                    correctIndex: 2,
                    explanation: "The Release Train Engineer (RTE) acts as the chief Scrum Master for the ART, facilitating PI Planning and other program-level events."
                }
            ]
        }
    ]
};

export const leadershipContent = {
    id: "leadership-fundamentals",
    title: "Leadership Fundamentals",
    description: "Build essential leadership skills for emerging leaders",

    lessons: [
        {
            id: "lesson-1",
            title: "What is Leadership?",
            duration: "15 min",
            type: "video",
            content: `
# What is Leadership?

## Defining Leadership

Leadership is the ability to guide, inspire, and influence others toward achieving a common goal. Unlike management, which focuses on processes and systems, leadership is about people and vision.

## Leadership vs. Management

| Leadership | Management |
|------------|------------|
| Creates vision | Executes plans |
| Inspires people | Organizes tasks |
| Drives change | Maintains stability |
| Focuses on "why" | Focuses on "how" |
| Long-term thinking | Short-term execution |

> "Management is doing things right; leadership is doing the right things." - Peter Drucker

## Key Leadership Traits

### 1. Vision
Great leaders see possibilities others don't and can articulate a compelling future state.

### 2. Integrity
Acting with honesty and consistency builds trust—the foundation of all leadership.

### 3. Courage
Leaders make difficult decisions and stand by their convictions.

### 4. Empathy
Understanding others' perspectives enables connection and collaboration.

### 5. Communication
Clear, authentic communication aligns and motivates teams.

## Leadership Styles

Different situations call for different approaches:

- **Directive** - Clear instructions, close supervision
- **Coaching** - Teaching and developing others
- **Supportive** - Encouraging autonomy and confidence
- **Delegating** - Empowering others to lead themselves

## Your Leadership Journey

Leadership is developed, not born. Key development areas:
1. Self-awareness
2. Emotional intelligence
3. Strategic thinking
4. Relationship building
5. Continuous learning
      `,
            quiz: {
                question: "What is the main difference between leadership and management?",
                options: [
                    "Leaders have more authority than managers",
                    "Leadership focuses on vision and people; management on processes and execution",
                    "Managers make more money than leaders",
                    "There is no real difference"
                ],
                correctIndex: 1,
                explanation: "Leadership focuses on creating vision, inspiring people, and driving change, while management focuses on executing plans, organizing tasks, and maintaining stability. Both are essential and complementary."
            }
        },
        {
            id: "lesson-2",
            title: "Emotional Intelligence",
            duration: "25 min",
            type: "video",
            content: `
# Emotional Intelligence (EQ)

## What is EQ?

Emotional Intelligence is the ability to recognize, understand, manage, and effectively use emotions—both your own and others'. Research shows EQ is often more important than IQ for leadership success.

## The Five Components of EQ

### 1. Self-Awareness
Knowing your emotions, strengths, weaknesses, values, and impact on others.

**How to develop:**
- Keep a reflection journal
- Seek feedback from others
- Notice your emotional triggers

### 2. Self-Regulation
Managing disruptive emotions and impulses; thinking before acting.

**Techniques:**
- Pause before responding
- Practice deep breathing
- Reframe negative thoughts

### 3. Motivation
Being driven to achieve for the sake of achievement itself.

**Characteristics:**
- Optimism, even in adversity
- Strong drive to meet goals
- Commitment to the organization

### 4. Empathy
Understanding others' emotional makeup and treating them accordingly.

**Practice by:**
- Active listening
- Observing body language
- Asking clarifying questions

### 5. Social Skills
Building relationships and networks; finding common ground.

**Components:**
- Influence
- Conflict management
- Team building
- Collaboration

## EQ in Action

### Scenario: Team Member Misses Deadline

**Low EQ Response:**
"You missed the deadline again! This is unacceptable. I need you to do better."

**High EQ Response:**
"I noticed the deadline was missed. Help me understand what happened. Is there something blocking you that we should address together?"

## Building Your EQ

1. Practice mindfulness daily
2. Seek honest feedback
3. Observe emotional patterns
4. Develop active listening skills
5. Study others' perspectives
      `,
            quiz: {
                question: "Which component of EQ involves understanding others' emotional makeup?",
                options: [
                    "Self-awareness",
                    "Self-regulation",
                    "Empathy",
                    "Social skills"
                ],
                correctIndex: 2,
                explanation: "Empathy is the EQ component that involves understanding the emotional makeup of other people and treating them according to their emotional reactions."
            }
        }
    ]
};

export const hipaaContent = {
    id: "hipaa-essentials",
    title: "HIPAA Compliance Essentials",
    description: "Complete HIPAA training covering PHI protection",

    lessons: [
        {
            id: "lesson-1",
            title: "Introduction to HIPAA",
            duration: "15 min",
            type: "video",
            content: `
# Introduction to HIPAA

## What is HIPAA?

The Health Insurance Portability and Accountability Act (HIPAA) is a federal law enacted in 1996 that:
- Protects patient health information
- Establishes national standards for electronic health transactions
- Requires security safeguards for PHI

## Who Must Comply?

### Covered Entities
- Healthcare providers
- Health plans
- Healthcare clearinghouses

### Business Associates
- Companies that handle PHI on behalf of covered entities
- IT vendors, billing companies, consultants

## Protected Health Information (PHI)

PHI is any information that can identify a patient AND relates to:
- Past, present, or future health conditions
- Healthcare services received
- Payment for healthcare

### 18 HIPAA Identifiers
1. Names
2. Geographic data smaller than state
3. Dates (except year)
4. Phone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers
13. Device identifiers/serial numbers
14. URLs
15. IP addresses
16. Biometric identifiers
17. Full-face photos
18. Any other unique identifier

## Key HIPAA Rules

| Rule | Purpose |
|------|---------|
| Privacy Rule | Who can access PHI |
| Security Rule | How to protect electronic PHI |
| Breach Notification | What to do when PHI is exposed |
      `,
            quiz: {
                question: "How many identifiers are defined under HIPAA that can make health information 'Protected Health Information'?",
                options: [
                    "10",
                    "15",
                    "18",
                    "25"
                ],
                correctIndex: 2,
                explanation: "HIPAA defines 18 specific identifiers that, when combined with health information, create PHI. These include names, SSN, medical record numbers, and even full-face photographs."
            }
        }
    ]
};
