// Additional training content for remaining modules
// Project Management, DEI, Soft Skills, Technology, Sales

export const projectManagementContent = {
    id: "project-management",
    title: "Project Management Essentials",
    description: "Master project management fundamentals",
    lessons: [
        {
            id: "lesson-1",
            title: "Introduction to Project Management",
            duration: "20 min",
            type: "video" as const,
            content: `
# Introduction to Project Management

## What is a Project?

A project is a temporary endeavor undertaken to create a unique product, service, or result. Projects have:
- A defined beginning and end
- Specific objectives
- Constraints (scope, time, cost)
- A unique deliverable

## The Project Management Triangle

Every project balances three constraints:

| Constraint | Description |
|------------|-------------|
| **Scope** | What needs to be delivered |
| **Time** | The schedule and deadlines |
| **Cost** | The budget and resources |

> "Cheap, Fast, Good — Pick Two"

## Project Lifecycle Phases

### 1. Initiation
- Define the project
- Identify stakeholders
- Create project charter

### 2. Planning
- Develop detailed plans
- Define scope and WBS
- Create schedule and budget

### 3. Execution
- Perform the work
- Manage the team
- Communicate progress

### 4. Monitoring & Controlling
- Track progress
- Manage changes
- Control quality

### 5. Closing
- Complete deliverables
- Get acceptance
- Document lessons learned

## Key Project Documents

1. **Project Charter** - Authorizes the project
2. **Scope Statement** - Defines what's included/excluded
3. **Work Breakdown Structure (WBS)** - Decomposes work into manageable pieces
4. **Project Schedule** - Timeline with milestones
5. **Risk Register** - Identified risks and mitigation plans
      `,
            quiz: {
                question: "What are the three corners of the project management triangle?",
                options: [
                    "People, Process, Technology",
                    "Scope, Time, Cost",
                    "Plan, Execute, Monitor",
                    "Quality, Risk, Communication"
                ],
                correctIndex: 1,
                explanation: "The project management triangle (also called the triple constraint) consists of Scope, Time, and Cost. Changes to one constraint typically affect the others."
            }
        },
        {
            id: "lesson-2",
            title: "Stakeholder Management",
            duration: "25 min",
            type: "video" as const,
            content: `
# Stakeholder Management

## Who Are Stakeholders?

Stakeholders are individuals or groups who:
- Have an interest in the project
- Can influence the project
- Are affected by project outcomes

## Types of Stakeholders

### Internal Stakeholders
- Project sponsor
- Team members
- Management
- Other departments

### External Stakeholders
- Customers/clients
- Vendors/suppliers
- Regulators
- Community

## Stakeholder Analysis

### Power/Interest Grid

|  | Low Interest | High Interest |
|--|--------------|---------------|
| **High Power** | Keep Satisfied | Manage Closely |
| **Low Power** | Monitor | Keep Informed |

## Best Practices

1. **Identify Early** - Find all stakeholders at project start
2. **Analyze Needs** - Understand what each stakeholder wants
3. **Plan Engagement** - Decide how to communicate with each
4. **Manage Expectations** - Be clear about what's possible
5. **Regular Updates** - Keep stakeholders informed
      `,
            quiz: {
                question: "According to the Power/Interest grid, how should you manage stakeholders with high power and high interest?",
                options: [
                    "Monitor them",
                    "Keep them satisfied",
                    "Keep them informed",
                    "Manage them closely"
                ],
                correctIndex: 3,
                explanation: "Stakeholders with high power and high interest should be managed closely. They have significant influence and strong interest in the project outcome."
            }
        }
    ]
};

export const deiContent = {
    id: "inclusive-leadership",
    title: "Inclusive Leadership",
    description: "Create an inclusive workplace culture",
    lessons: [
        {
            id: "lesson-1",
            title: "Understanding Diversity, Equity & Inclusion",
            duration: "20 min",
            type: "video" as const,
            content: `
# Understanding Diversity, Equity & Inclusion

## Definitions

### Diversity
The presence of differences within a given setting. This includes:
- Race and ethnicity
- Gender and gender identity
- Age
- Sexual orientation
- Disability
- Religion
- Socioeconomic background
- Education
- Thinking styles

### Equity
Fair treatment, access, and advancement for all people. Equity recognizes that:
- Not everyone starts from the same place
- Different people need different resources
- Barriers must be identified and removed

### Inclusion
Creating an environment where all individuals feel:
- Welcomed
- Respected
- Valued
- Able to fully participate

> "Diversity is being invited to the party. Inclusion is being asked to dance." - Vernā Myers

## Why DEI Matters

### Business Case
- **35%** more likely to outperform competitors (McKinsey)
- **70%** more likely to capture new markets
- **87%** better decision-making in diverse teams

### Human Case
- Everyone deserves to belong
- Diverse perspectives drive innovation
- Inclusive cultures attract top talent

## The Difference Between Equality and Equity

**Equality**: Giving everyone the same resources
**Equity**: Giving people what they need to succeed

Equity acknowledges that some groups face systemic barriers that require tailored solutions.
      `,
            quiz: {
                question: "What is the key difference between equality and equity?",
                options: [
                    "They mean the same thing",
                    "Equality is fair, equity is not",
                    "Equality gives everyone the same; equity gives what each person needs",
                    "Equity is illegal; equality is required"
                ],
                correctIndex: 2,
                explanation: "Equality means giving everyone the same resources, while equity means giving people what they specifically need to succeed. Equity acknowledges that not everyone starts from the same place."
            }
        },
        {
            id: "lesson-2",
            title: "Recognizing Unconscious Bias",
            duration: "25 min",
            type: "video" as const,
            content: `
# Recognizing Unconscious Bias

## What is Unconscious Bias?

Unconscious biases are social stereotypes about certain groups that individuals form outside their conscious awareness. Everyone has them—they're a natural product of how our brains process information.

## Common Types of Bias

### Affinity Bias
Favoring people who are similar to us.
*Example: Hiring candidates from your alma mater.*

### Confirmation Bias
Seeking information that confirms existing beliefs.
*Example: Focusing on mistakes made by someone you already doubt.*

### Halo Effect
Letting one positive trait influence overall perception.
*Example: Assuming an attractive person is also competent.*

### Attribution Bias
Attributing successes/failures differently based on group membership.
*Example: "She succeeded because of luck; he succeeded because of skill."*

### Conformity Bias
Taking cues from others rather than making independent judgments.
*Example: Agreeing with the group even when you have doubts.*

## Strategies to Counter Bias

1. **Slow Down** - Take time with decisions
2. **Question Assumptions** - Ask "Why do I think this?"
3. **Seek Diverse Input** - Include different perspectives
4. **Use Structured Processes** - Standardize evaluations
5. **Track Data** - Look for patterns in outcomes
      `,
            quiz: {
                question: "What is affinity bias?",
                options: [
                    "Disliking people who are different from you",
                    "Favoring people who are similar to you",
                    "Making quick judgments about strangers",
                    "Following the crowd's opinion"
                ],
                correctIndex: 1,
                explanation: "Affinity bias is the unconscious tendency to favor people who are similar to ourselves, whether in background, interests, or experiences."
            }
        }
    ]
};

export const softSkillsContent = {
    id: "effective-feedback",
    title: "Giving & Receiving Feedback",
    description: "Master the art of constructive feedback",
    lessons: [
        {
            id: "lesson-1",
            title: "The Importance of Feedback",
            duration: "15 min",
            type: "video" as const,
            content: `
# The Importance of Feedback

## Why Feedback Matters

Feedback is essential for:
- Personal and professional growth
- Building trust and relationships
- Improving team performance
- Aligning expectations
- Recognizing accomplishments

## The Feedback Gap

Research shows:
- **65%** of employees want more feedback
- **43%** of highly engaged employees receive weekly feedback
- **98%** of employees disengage when they receive little or no feedback

## Types of Feedback

### Positive Feedback (Reinforcing)
Acknowledges what someone did well to encourage continued behavior.

### Constructive Feedback (Redirecting)
Identifies areas for improvement with specific suggestions.

### Feedforward
Future-focused suggestions for development (not dwelling on past mistakes).

## Common Feedback Mistakes

1. **Too Vague** - "Good job" without specifics
2. **Too Late** - Waiting weeks or months
3. **Too Harsh** - Attacking the person, not the behavior
4. **Too Rare** - Only during annual reviews
5. **Too One-Way** - Not inviting dialogue
      `,
            quiz: {
                question: "What percentage of employees want more feedback according to research?",
                options: [
                    "25%",
                    "45%",
                    "65%",
                    "85%"
                ],
                correctIndex: 2,
                explanation: "Research shows that 65% of employees want more feedback than they currently receive. Regular, quality feedback is strongly correlated with employee engagement."
            }
        },
        {
            id: "lesson-2",
            title: "The SBI Feedback Model",
            duration: "20 min",
            type: "video" as const,
            content: `
# The SBI Feedback Model

## What is SBI?

SBI stands for **Situation-Behavior-Impact**. It's a structured approach to giving clear, specific, and actionable feedback.

## The Three Components

### S - Situation
Describe the specific situation where the behavior occurred.
- When and where it happened
- Be specific about the context
- Anchor the conversation in reality

### B - Behavior
Describe the observable behavior—what they did or said.
- Focus on actions, not interpretations
- Describe what you saw or heard
- Avoid judgmental language

### I - Impact
Explain the impact of their behavior.
- How it affected you, the team, or outcomes
- Be honest about consequences
- Help them understand why it matters

## Examples

### Positive SBI
"**Situation**: In yesterday's client presentation...
**Behavior**: You anticipated their questions and had data ready to support each point...
**Impact**: The client was impressed and signed the contract on the spot."

### Constructive SBI
"**Situation**: During this morning's standup...
**Behavior**: You interrupted Sarah twice while she was giving her update...
**Impact**: She seemed frustrated and didn't finish sharing her blockers, which we need to address."

## Practice Exercise

Think of recent feedback you need to give. Use SBI:
- S: When/where did it happen?
- B: What did they do/say?
- I: What was the result?
      `,
            quiz: {
                question: "What does the 'B' in SBI stand for?",
                options: [
                    "Background",
                    "Behavior",
                    "Belief",
                    "Benefit"
                ],
                correctIndex: 1,
                explanation: "In the SBI model, B stands for Behavior—the specific, observable actions that the person took. Focus on what was said or done, not your interpretation of why."
            }
        }
    ]
};

export const technologyContent = {
    id: "data-analytics",
    title: "Data Analytics Fundamentals",
    description: "Build data analysis skills using modern tools",
    lessons: [
        {
            id: "lesson-1",
            title: "Introduction to Data Analytics",
            duration: "20 min",
            type: "video" as const,
            content: `
# Introduction to Data Analytics

## What is Data Analytics?

Data analytics is the process of examining data sets to draw conclusions about the information they contain. It involves:
- Collecting data
- Cleaning and organizing data
- Analyzing patterns and trends
- Visualizing insights
- Making data-driven decisions

## Types of Analytics

### 1. Descriptive Analytics
*"What happened?"*
- Summarizes historical data
- Reports and dashboards
- Example: Monthly sales report

### 2. Diagnostic Analytics
*"Why did it happen?"*
- Root cause analysis
- Drill-down investigation
- Example: Why did sales drop in Q3?

### 3. Predictive Analytics
*"What will happen?"*
- Statistical modeling
- Machine learning
- Example: Forecast next quarter's revenue

### 4. Prescriptive Analytics
*"What should we do?"*
- Optimization
- Recommendations
- Example: Best pricing strategy

## The Data Analytics Process

1. **Define the Question** - What do you want to know?
2. **Collect Data** - Gather relevant information
3. **Clean Data** - Fix errors and inconsistencies
4. **Analyze** - Apply statistical methods
5. **Visualize** - Create charts and dashboards
6. **Communicate** - Share insights with stakeholders
7. **Act** - Make decisions based on findings
      `,
            quiz: {
                question: "Which type of analytics answers the question 'What will happen?'",
                options: [
                    "Descriptive Analytics",
                    "Diagnostic Analytics",
                    "Predictive Analytics",
                    "Prescriptive Analytics"
                ],
                correctIndex: 2,
                explanation: "Predictive Analytics uses statistical modeling and machine learning to forecast future outcomes by analyzing patterns in historical data."
            }
        }
    ]
};

export const salesContent = {
    id: "consultative-selling",
    title: "Consultative Selling Mastery",
    description: "Transform from order-taker to trusted advisor",
    lessons: [
        {
            id: "lesson-1",
            title: "What is Consultative Selling?",
            duration: "20 min",
            type: "video" as const,
            content: `
# What is Consultative Selling?

## Definition

Consultative selling is a sales approach focused on understanding customer needs and providing solutions, rather than pushing products. You become a trusted advisor, not just a vendor.

## Traditional vs. Consultative Selling

| Traditional Selling | Consultative Selling |
|---------------------|----------------------|
| Product-focused | Customer-focused |
| Features & benefits | Problems & solutions |
| Short-term transaction | Long-term relationship |
| Telling | Asking & listening |
| Closing deals | Creating value |

## The Consultative Selling Process

### 1. Research
- Understand the customer's business
- Know their industry challenges
- Review their history with your company

### 2. Ask Questions
- Open-ended questions
- Understand pain points
- Uncover hidden needs

### 3. Listen Actively
- Don't interrupt
- Take notes
- Confirm understanding

### 4. Diagnose
- Analyze their situation
- Identify root causes
- Prioritize needs

### 5. Recommend
- Tailor your solution
- Show ROI
- Address objections proactively

### 6. Follow Through
- Deliver on promises
- Check in regularly
- Continue adding value

## Key Principles

1. **Relationships over transactions**
2. **Understanding before recommending**
3. **Value creation, not just value capture**
4. **Long-term thinking**
      `,
            quiz: {
                question: "What is the main focus of consultative selling?",
                options: [
                    "Closing deals as quickly as possible",
                    "Understanding customer needs and providing solutions",
                    "Offering the lowest price",
                    "Demonstrating product features"
                ],
                correctIndex: 1,
                explanation: "Consultative selling focuses on understanding customer needs and providing tailored solutions. The goal is to become a trusted advisor who creates value for the customer."
            }
        }
    ]
};

// Export all content
export const allTrainingContent = {
    "project-management": projectManagementContent,
    "inclusive-leadership": deiContent,
    "effective-feedback": softSkillsContent,
    "data-analytics": technologyContent,
    "consultative-selling": salesContent,
};
