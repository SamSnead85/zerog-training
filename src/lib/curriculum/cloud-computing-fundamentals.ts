/**
 * Cloud Computing Fundamentals - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Cloud computing concepts and service models
 * - AWS, GCP, Azure overview
 * - Cloud architecture patterns
 * - Migration strategies
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: Cloud Computing Concepts
// =============================================================================

export const cloudLesson1_concepts: LessonContent = {
    id: "cloud-101",
    title: "Cloud Computing Fundamentals",
    description: "Understand core cloud concepts, service models, and deployment options",
    duration: "40 min",
    objectives: [
        "Define cloud computing and its key characteristics",
        "Distinguish between IaaS, PaaS, and SaaS",
        "Compare public, private, and hybrid cloud models",
        "Explain the shared responsibility model"
    ],
    sections: [
        {
            id: "c1-1",
            title: "What is Cloud Computing?",
            type: "text",
            content: `
# Cloud Computing Defined

**Cloud computing** is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.

## The 5 Essential Characteristics (NIST)

### 1. On-Demand Self-Service
Provision resources automatically without human interaction.

### 2. Broad Network Access
Access from any device over the network (laptops, phones, tablets).

### 3. Resource Pooling
Provider's resources serve multiple customers dynamically.

### 4. Rapid Elasticity
Scale up or down quickly based on demand.

### 5. Measured Service
Pay only for what you use (metered billing).

---

## Why Cloud Computing?

| Benefit | Description |
|---------|-------------|
| **Cost Savings** | No upfront hardware investment |
| **Scalability** | Scale resources on demand |
| **Speed** | Deploy in minutes, not months |
| **Global Reach** | Deploy worldwide instantly |
| **Reliability** | Built-in redundancy and backup |
| **Security** | Enterprise-grade security investments |

---

## The Economic Shift

### Traditional (CapEx)
- Large upfront capital expenditure
- Long procurement cycles
- Depreciation over time
- Risk of over/under-provisioning

### Cloud (OpEx)
- Pay-as-you-go operational expense
- Instant provisioning
- No depreciation concerns
- Right-size resources dynamically
            `
        },
        {
            id: "c1-2",
            title: "Service Models: IaaS, PaaS, SaaS",
            type: "text",
            content: `
# Cloud Service Models

Understanding the three fundamental service models is critical for cloud decision-making.

---

## Infrastructure as a Service (IaaS)

**You manage:** Applications, data, runtime, middleware, OS
**Provider manages:** Virtualization, servers, storage, networking

### Examples:
- AWS EC2, Azure VMs, Google Compute Engine
- AWS S3, Azure Blob Storage

### Use When:
- You need full control over infrastructure
- Running legacy applications
- Custom software requirements

---

## Platform as a Service (PaaS)

**You manage:** Applications and data
**Provider manages:** Runtime, middleware, OS, virtualization, servers

### Examples:
- AWS Elastic Beanstalk, Azure App Service, Google App Engine
- Heroku, Vercel

### Use When:
- Building new applications
- Want to focus on code, not infrastructure
- Need automatic scaling

---

## Software as a Service (SaaS)

**You manage:** Just your data and access
**Provider manages:** Everything else

### Examples:
- Salesforce, Microsoft 365, Google Workspace
- Slack, Zoom, Dropbox

### Use When:
- Standard business applications
- Minimal customization needed
- Quick deployment required

---

## The Pizza Analogy 🍕

| Model | Pizza Equivalent |
|-------|-----------------|
| On-Premises | Make pizza from scratch at home |
| IaaS | Buy dough, make your own pizza |
| PaaS | Buy frozen pizza, bake it yourself |
| SaaS | Order delivery pizza |
            `,
            tips: [
                "IaaS = maximum control, maximum responsibility",
                "PaaS = ideal for developers who don't want to manage infrastructure",
                "SaaS = ready-to-use applications"
            ]
        },
        {
            id: "c1-3",
            title: "Deployment Models & Shared Responsibility",
            type: "text",
            content: `
# Cloud Deployment Models

## Public Cloud
Resources owned and operated by third-party providers, delivered over the internet.

**Pros:** No CapEx, instant scalability, no maintenance
**Cons:** Less control, shared infrastructure concerns

**Examples:** AWS, Azure, GCP

---

## Private Cloud
Cloud infrastructure dedicated to a single organization.

**Pros:** Maximum control, compliance-friendly, customizable
**Cons:** Higher cost, requires expertise

**Examples:** VMware, OpenStack, Azure Stack

---

## Hybrid Cloud
Combination of public and private clouds with orchestration between them.

**Pros:** Flexibility, workload optimization, gradual migration
**Cons:** Complexity, integration challenges

**Use Cases:**
- Keep sensitive data on-prem, use cloud for burst capacity
- Gradual cloud migration strategy
- Regulatory compliance requirements

---

# The Shared Responsibility Model

Security in the cloud is a **shared responsibility** between you and the provider.

## Provider Responsibilities ("Security OF the Cloud")
- Physical security of data centers
- Network infrastructure
- Hypervisor and virtualization layer
- Global infrastructure

## Customer Responsibilities ("Security IN the Cloud")
- Identity and access management
- Data encryption
- Network configuration
- Application security
- Operating system patches (for IaaS)

---

## Responsibility by Service Model

| Area | IaaS | PaaS | SaaS |
|------|------|------|------|
| Data | Customer | Customer | Customer |
| Applications | Customer | Customer | Provider |
| Runtime | Customer | Provider | Provider |
| OS | Customer | Provider | Provider |
| Virtualization | Provider | Provider | Provider |
| Network | Provider | Provider | Provider |
| Physical | Provider | Provider | Provider |
            `
        }
    ],
    quiz: [
        {
            id: "cq1-1",
            type: "ordering",
            question: "Order the cloud service models from most customer control to least:",
            options: ["SaaS", "IaaS", "PaaS"],
            correctAnswer: [1, 2, 0],
            explanation: "IaaS gives most control (you manage OS, runtime, applications), PaaS gives medium control (you manage applications), SaaS gives least control (provider manages almost everything).",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq1-2",
            type: "multiple-choice",
            question: "Which NIST characteristic describes the ability to scale resources up or down quickly based on demand?",
            options: [
                "On-demand self-service",
                "Resource pooling",
                "Rapid elasticity",
                "Measured service"
            ],
            correctAnswer: 2,
            explanation: "Rapid elasticity allows cloud resources to be provisioned and released quickly, often automatically, to scale with demand.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq1-3",
            type: "scenario",
            question: "Your company runs a legacy financial application that requires specific OS configurations and custom security controls. Which cloud service model is most appropriate?",
            options: [
                "SaaS - use a ready-made financial application",
                "PaaS - deploy the app on a managed platform",
                "IaaS - run VMs with full control over the OS",
                "No cloud - keep everything on-premises"
            ],
            correctAnswer: 2,
            explanation: "IaaS is ideal for legacy applications requiring specific OS configurations and custom controls. You get cloud benefits while maintaining control over the operating system.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "cq1-4",
            type: "multiple-select",
            question: "In the shared responsibility model for IaaS, which are CUSTOMER responsibilities? (Select all that apply)",
            options: [
                "Physical security of data centers",
                "Operating system patches",
                "Network firewall configuration",
                "Data encryption",
                "Hypervisor security"
            ],
            correctAnswer: [1, 2, 3],
            explanation: "In IaaS, customers are responsible for OS patches, network configuration, and data encryption. Physical security and hypervisor security are provider responsibilities.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "Cloud computing provides on-demand, pay-as-you-go IT resources over the internet",
        "5 essential characteristics: On-demand, Broad network access, Resource pooling, Elasticity, Measured service",
        "IaaS (most control) → PaaS (balanced) → SaaS (least control)",
        "Shared responsibility: Provider secures the cloud infrastructure; you secure what you put IN the cloud",
        "Choose public, private, or hybrid based on control, compliance, and cost requirements"
    ]
};

// =============================================================================
// Cloud Curriculum Export
// =============================================================================

export const cloudCurriculum = {
    moduleId: "cloud-computing-fundamentals",
    title: "Cloud Computing Fundamentals",
    description: "Essential cloud concepts for all professionals",
    lessons: [
        cloudLesson1_concepts
    ],
    totalDuration: "40 min",
    certification: {
        name: "Cloud Foundations Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "cloud-certified"
    }
};

export const cloudFinalAssessment: QuizQuestion[] = [
    {
        id: "cloud-final-1",
        type: "scenario",
        question: "A startup wants to launch a web application quickly without managing servers. They expect traffic to vary significantly. Which approach is best?",
        options: [
            "Buy physical servers in a colocation facility",
            "Use IaaS VMs and manage scaling manually",
            "Use a PaaS platform with auto-scaling",
            "Use on-premises infrastructure"
        ],
        correctAnswer: 2,
        explanation: "PaaS with auto-scaling is ideal for startups: quick deployment, no server management, and automatic scaling for variable traffic. This lets them focus on their application.",
        difficulty: "medium",
        points: 20
    },
    {
        id: "cloud-final-2",
        type: "multiple-choice",
        question: "In a hybrid cloud, what is a common use case for keeping some workloads on-premises?",
        options: [
            "Because cloud is always more expensive",
            "Regulatory compliance requiring data locality",
            "Cloud providers don't offer enough storage",
            "On-premises is always more reliable"
        ],
        correctAnswer: 1,
        explanation: "Regulatory compliance (GDPR, HIPAA, data sovereignty laws) often requires certain data to remain in specific geographic locations or on-premises infrastructure.",
        difficulty: "medium",
        points: 15
    }
];
