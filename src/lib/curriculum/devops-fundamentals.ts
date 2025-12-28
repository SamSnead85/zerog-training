/**
 * DevOps & CI/CD Fundamentals - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - DevOps culture and practices
 * - CI/CD pipelines
 * - Infrastructure as Code
 * - Monitoring and observability
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: DevOps Fundamentals
// =============================================================================

export const devopsLesson1_fundamentals: LessonContent = {
    id: "devops-101",
    title: "DevOps Culture & Practices",
    description: "Understand DevOps principles and how they transform software delivery",
    duration: "40 min",
    objectives: [
        "Define DevOps and its core principles",
        "Explain the DevOps lifecycle phases",
        "Identify key DevOps practices",
        "Understand CI/CD pipelines"
    ],
    sections: [
        {
            id: "d1-1",
            title: "What is DevOps?",
            type: "text",
            content: `
# Understanding DevOps

**DevOps** is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle while delivering features, fixes, and updates frequently.

## It's NOT Just About Tools

DevOps is fundamentally about:
- **Culture** - Collaboration between Dev and Ops teams
- **Automation** - Removing manual, error-prone processes
- **Measurement** - Data-driven decisions
- **Sharing** - Knowledge and responsibility

---

## The Three Ways of DevOps

### 1. Flow (Systems Thinking)
- Optimize the **entire system**, not individual silos
- Work flows from left (Dev) to right (Ops/Customer)
- Make work visible
- Reduce batch sizes

### 2. Feedback (Amplify Feedback Loops)
- Fast, constant feedback at all stages
- Catch problems early
- Push quality upstream
- Enable experimentation

### 3. Continuous Learning (Experimentation)
- Foster experimentation and risk-taking
- Learn from failures
- Repetition creates mastery
- Allocate time for improvement

---

## Traditional vs DevOps

| Aspect | Traditional | DevOps |
|--------|-------------|--------|
| Releases | Quarterly/Annually | Daily/Hourly |
| Team Structure | Siloed | Cross-functional |
| Deployment | Manual | Automated |
| Testing | End of cycle | Continuous |
| Failure Response | Blame | Learn |
| Change | Risky | Routine |
            `
        },
        {
            id: "d1-2",
            title: "The DevOps Lifecycle",
            type: "text",
            content: `
# The DevOps Infinity Loop

The DevOps lifecycle is often represented as an infinity loop, symbolizing the continuous nature of development and operations.

---

## Development Side (Left Loop)

### Plan
- Define requirements and user stories
- Sprint planning and backlog grooming
- **Tools:** Jira, Azure Boards, Linear

### Code
- Write and review code
- Version control with Git
- **Tools:** VS Code, GitHub, GitLab

### Build
- Compile code, run linters
- Create build artifacts
- **Tools:** Maven, npm, Webpack

### Test
- Run automated tests
- Unit, integration, E2E tests
- **Tools:** Jest, Selenium, Cypress

---

## Operations Side (Right Loop)

### Release
- Package for deployment
- Feature flags and gradual rollouts
- **Tools:** GitHub Actions, GitLab CI

### Deploy
- Push to production
- Blue/green, canary deployments
- **Tools:** Kubernetes, ArgoCD, Terraform

### Operate
- Run and scale infrastructure
- Incident response
- **Tools:** AWS, GCP, Azure

### Monitor
- Collect metrics and logs
- Alert on anomalies
- **Tools:** Datadog, Prometheus, Grafana
            `,
            tips: [
                "The 'infinity loop' emphasizes there's no end - it's continuous",
                "Each phase should feed back into the previous phases",
                "Automation connects the phases"
            ]
        },
        {
            id: "d1-3",
            title: "CI/CD Pipelines",
            type: "text",
            content: `
# Continuous Integration & Continuous Delivery

## Continuous Integration (CI)

The practice of **frequently integrating code changes** into a shared repository, where automated builds and tests run.

### CI Best Practices:
1. Commit code frequently (at least daily)
2. Don't commit broken code
3. Fix broken builds immediately
4. Write automated tests
5. All tests must pass before merge

### A Typical CI Pipeline:
\`\`\`
Commit → Build → Lint → Unit Tests → Integration Tests → Artifact
\`\`\`

---

## Continuous Delivery (CD)

Ensures code is **always in a deployable state**. Deploy to production with a single click.

### Continuous Deployment (CD+)
Takes it further: **every change that passes tests automatically deploys to production**.

---

## CI/CD Pipeline Example

\`\`\`yaml
# GitHub Actions Example
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
\`\`\`

---

## Deployment Strategies

### Rolling Deployment
Gradually replace instances of the old version

### Blue/Green Deployment
Run two identical environments, switch traffic instantly

### Canary Deployment
Release to a small subset first, then expand

### Feature Flags
Toggle features on/off without deployment
            `
        }
    ],
    quiz: [
        {
            id: "dq1-1",
            type: "multiple-choice",
            question: "What does DevOps primarily aim to achieve?",
            options: [
                "Replace developers with operations staff",
                "Shorten development lifecycle while delivering frequently",
                "Eliminate the need for testing",
                "Remove the need for automation"
            ],
            correctAnswer: 1,
            explanation: "DevOps combines Dev and Ops practices to shorten the development lifecycle while delivering features, fixes, and updates frequently and reliably.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "dq1-2",
            type: "ordering",
            question: "Order these DevOps lifecycle phases from development to operations:",
            options: ["Deploy", "Code", "Monitor", "Test"],
            correctAnswer: [1, 3, 0, 2],
            explanation: "The typical flow is: Code → Test → Deploy → Monitor. This represents the journey from writing code to observing it in production.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "dq1-3",
            type: "scenario",
            question: "Your team commits code weekly and deploys monthly. After each deployment, there are many bugs to fix. What DevOps practice would help most?",
            options: [
                "Hire more QA testers",
                "Implement Continuous Integration with automated tests",
                "Deploy less frequently",
                "Add more approval gates"
            ],
            correctAnswer: 1,
            explanation: "CI with automated tests catches bugs early and frequently, reducing the accumulation of issues that leads to deployment problems.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "dq1-4",
            type: "multiple-select",
            question: "Which are characteristics of a healthy CI/CD pipeline? (Select all that apply)",
            options: [
                "Automated testing at multiple stages",
                "Manual approval for every change",
                "Fast feedback loops",
                "Deployments can only happen quarterly",
                "Code is always in a deployable state"
            ],
            correctAnswer: [0, 2, 4],
            explanation: "Healthy CI/CD features automated testing, fast feedback, and keeping code deployable. Frequent manual approvals and infrequent deployments contradict CI/CD principles.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "DevOps is about culture, automation, measurement, and sharing - not just tools",
        "The Three Ways: Flow, Feedback, Continuous Learning",
        "CI = frequent integration with automated testing",
        "CD = code always deployable; CD+ = automatic deployment",
        "Deployment strategies: Rolling, Blue/Green, Canary, Feature Flags"
    ]
};

// =============================================================================
// DevOps Curriculum Export
// =============================================================================

export const devopsCurriculum = {
    moduleId: "devops-fundamentals",
    title: "DevOps & CI/CD Fundamentals",
    description: "Master DevOps culture, practices, and CI/CD pipelines",
    lessons: [
        devopsLesson1_fundamentals
    ],
    totalDuration: "40 min",
    certification: {
        name: "DevOps Foundations Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "devops-certified"
    }
};
