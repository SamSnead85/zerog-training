/**
 * Data Privacy & GDPR Training - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - GDPR fundamentals and principles
 * - Data subject rights
 * - Data processing requirements
 * - Privacy by design
 * - Cross-border data transfers
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: GDPR Fundamentals
// =============================================================================

export const privacyLesson1_fundamentals: LessonContent = {
    id: "privacy-101",
    title: "GDPR Fundamentals and Key Principles",
    description: "Understand the core principles and scope of the General Data Protection Regulation",
    duration: "40 min",
    objectives: [
        "Explain the purpose and scope of GDPR",
        "Identify the 7 key principles of data processing",
        "Define personal data and special categories",
        "Distinguish between controllers and processors"
    ],
    sections: [
        {
            id: "p1-1",
            title: "What is GDPR?",
            type: "text",
            content: `
# The General Data Protection Regulation

The **GDPR** is a comprehensive data protection law that came into effect on **May 25, 2018**. It governs how organizations collect, process, and protect personal data of individuals in the European Union.

## Who Does GDPR Apply To?

GDPR has **extraterritorial scope**, meaning it applies to:

### 1. Organizations in the EU
Any company established in the EU, regardless of where data processing takes place.

### 2. Organizations Outside the EU If They:
- Offer goods or services to EU residents (paid or free)
- Monitor the behavior of EU residents

**Example:** A US-based e-commerce site selling to EU customers must comply with GDPR.

---

## What is Personal Data?

Personal data is **any information relating to an identified or identifiable natural person** (the "data subject").

### Examples of Personal Data:
- Name, address, email
- IP address, cookie identifiers
- Location data
- Photos, social media posts
- Financial information
- Employment history

### Special Categories (Sensitive Data)
- Racial or ethnic origin
- Political opinions
- Religious or philosophical beliefs
- Trade union membership
- Genetic data
- Biometric data
- Health data
- Sex life or sexual orientation

**These require explicit consent or specific legal basis for processing.**
            `
        },
        {
            id: "p1-2",
            title: "The 7 Key Principles",
            type: "text",
            content: `
# The 7 Principles of GDPR (Article 5)

All data processing must adhere to these fundamental principles:

---

## 1. Lawfulness, Fairness, and Transparency

- Processing must have a **legal basis**
- Must be **fair** to the data subject
- Must be **transparent** about what you do with data

## 2. Purpose Limitation

- Collect data for **specified, explicit, and legitimate purposes**
- Don't use data for purposes **incompatible** with the original purpose
- Archive/research purposes are generally compatible

## 3. Data Minimization

- Only collect data that is **adequate, relevant, and limited** to what's necessary
- Don't collect "just in case" data

## 4. Accuracy

- Keep personal data **accurate and up to date**
- Take reasonable steps to **correct or delete** inaccurate data

## 5. Storage Limitation

- Only keep data **as long as necessary** for the purpose
- Define and follow **retention periods**
- Anonymize or delete when no longer needed

## 6. Integrity and Confidentiality (Security)

- Implement **appropriate security measures**
- Protect against unauthorized access, loss, destruction
- Consider encryption, access controls, backups

## 7. Accountability

- **Demonstrate compliance** (it's not enough to just comply)
- Maintain records of processing activities
- Implement data protection by design
            `,
            tips: [
                "Memory trick: LPDASIS (Lawfulness, Purpose, Data minimization, Accuracy, Storage, Integrity, Security)",
                "Accountability is what separates GDPR from previous laws - you must PROVE compliance"
            ]
        },
        {
            id: "p1-3",
            title: "Controllers vs Processors",
            type: "text",
            content: `
# Understanding Key Roles

## Data Controller

The entity that **determines the purposes and means** of processing personal data.

**The controller decides:**
- WHY data is being processed (purpose)
- HOW data will be processed (means)
- WHAT data will be collected

**Examples:**
- Your employer (for employee data)
- An online retailer (for customer data)
- A hospital (for patient data)

---

## Data Processor

The entity that **processes data on behalf of the controller**.

**The processor:**
- Only acts on controller's documented instructions
- Doesn't determine purposes or means
- Must have a contract with the controller

**Examples:**
- Cloud storage providers
- Payroll processing companies
- Email marketing platforms
- IT support vendors

---

## Key Differences

| Aspect | Controller | Processor |
|--------|-----------|-----------|
| Decides purpose | Yes | No |
| Decides means | Yes (essential means) | Limited (technical means) |
| Directly liable to data subjects | Yes | Limited |
| Must maintain records | Yes | Yes |
| Needs DPO | Maybe | Maybe |

---

## Joint Controllers

Two or more controllers that **jointly determine purposes and means**.

**Example:** A research collaboration between two universities sharing patient data.

- Must have an arrangement defining responsibilities
- Both are liable to data subjects
            `
        }
    ],
    quiz: [
        {
            id: "pq1-1",
            type: "multiple-choice",
            question: "Which of the following is NOT one of the 7 GDPR principles?",
            options: [
                "Purpose limitation",
                "Consent requirement",
                "Data minimization",
                "Accountability"
            ],
            correctAnswer: 1,
            explanation: "The 7 principles are: Lawfulness/Fairness/Transparency, Purpose Limitation, Data Minimization, Accuracy, Storage Limitation, Integrity/Confidentiality, and Accountability. 'Consent' is a legal basis for processing, not a principle.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "pq1-2",
            type: "scenario",
            question: "A US-based SaaS company has no offices in the EU but has EU customers who pay for their service. Does GDPR apply to them?",
            options: [
                "No, GDPR only applies to EU companies",
                "Yes, because they offer goods/services to EU residents",
                "Only if they have more than 250 employees",
                "Only if they process sensitive data"
            ],
            correctAnswer: 1,
            explanation: "GDPR has extraterritorial scope. It applies to any organization offering goods or services to EU residents, regardless of where the organization is located.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "pq1-3",
            type: "multiple-select",
            question: "Which of the following are considered 'special categories' of personal data under GDPR? (Select all that apply)",
            options: [
                "Email address",
                "Health data",
                "Biometric data",
                "IP address",
                "Trade union membership"
            ],
            correctAnswer: [1, 2, 4],
            explanation: "Special categories include racial/ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric data, health data, and sex life/orientation. Email and IP address are personal data but not special categories.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "pq1-4",
            type: "multiple-choice",
            question: "A company uses a cloud storage provider to store customer data. In GDPR terms, the cloud provider is a:",
            options: [
                "Data controller",
                "Data processor",
                "Joint controller",
                "Data subject"
            ],
            correctAnswer: 1,
            explanation: "The cloud provider processes data on behalf of the company (controller) following their instructions. This makes them a data processor.",
            difficulty: "easy",
            points: 10
        }
    ],
    keyTakeaways: [
        "GDPR applies to any organization processing EU residents' data, regardless of location",
        "Personal data includes any information that can identify a person (directly or indirectly)",
        "7 principles: Lawfulness, Purpose limitation, Data minimization, Accuracy, Storage limitation, Integrity, Accountability",
        "Controllers determine purposes and means; Processors act on controller instructions",
        "Accountability means you must be able to DEMONSTRATE compliance"
    ]
};

// =============================================================================
// LESSON 2: Data Subject Rights
// =============================================================================

export const privacyLesson2_rights: LessonContent = {
    id: "privacy-102",
    title: "Data Subject Rights",
    description: "Master the individual rights granted under GDPR and how to handle requests",
    duration: "35 min",
    objectives: [
        "List all 8 data subject rights",
        "Explain the requirements for responding to requests",
        "Identify when rights can be restricted",
        "Implement a data subject request process"
    ],
    sections: [
        {
            id: "p2-1",
            title: "The 8 Rights",
            type: "text",
            content: `
# Data Subject Rights Under GDPR

GDPR grants individuals significant control over their personal data. Organizations must facilitate the exercise of these rights.

---

## 1. Right to Be Informed

Data subjects have the right to know:
- Identity of the controller
- Purposes of processing
- Legal basis for processing
- Data retention periods
- Their rights
- Recipients of their data

**How:** Provide a clear, accessible Privacy Notice

---

## 2. Right of Access (Subject Access Request - SAR)

The right to:
- Confirm whether their data is being processed
- Access a copy of their personal data
- Know the purposes, categories, and recipients

**Timeline:** Respond within 1 month (extendable by 2 months for complex requests)

---

## 3. Right to Rectification

The right to have inaccurate data corrected or incomplete data completed.

**Timeline:** Respond within 1 month

---

## 4. Right to Erasure ("Right to be Forgotten")

The right to have personal data deleted when:
- No longer necessary for original purpose
- Consent is withdrawn
- Unlawful processing
- Legal obligation requires erasure

**Exceptions:** When data is needed for legal claims, public interest, freedom of expression

---

## 5. Right to Restrict Processing

The right to "freeze" processing when:
- Accuracy is contested
- Processing is unlawful but erasure is opposed
- Controller no longer needs data but subject needs it for legal claims
- Pending verification of objection

---

## 6. Right to Data Portability

The right to receive personal data in a **structured, commonly used, machine-readable format** and transmit it to another controller.

**Applies when:**
- Processing is based on consent or contract
- Processing is automated

---

## 7. Right to Object

The right to object to processing based on:
- Legitimate interests
- Public interest
- Direct marketing (absolute right)

---

## 8. Rights Related to Automated Decision-Making

The right to:
- Not be subject to decisions based solely on automated processing with legal or significant effects
- Obtain human intervention
- Contest the decision
            `
        },
        {
            id: "p2-2",
            title: "Handling Requests",
            type: "text",
            content: `
# Processing Data Subject Requests

## Response Requirements

### Timeline
- **Standard:** 1 month from receipt
- **Extension:** Up to 2 additional months for complex/numerous requests
- Must inform data subject within 1 month if extending

### Format
- Respond in the same format as the request (unless otherwise requested)
- Electronic requests → electronic response
- Information must be concise, transparent, intelligible

### Cost
- Generally **FREE**
- Can charge reasonable fee for: manifestly unfounded, excessive, or repetitive requests
- Can charge for additional copies

---

## Verification

Before responding, you MUST verify the identity of the requester.

**Methods:**
- Matching request details with account information
- Security questions based on account history
- Requesting ID documents (if necessary and proportionate)

**Warning:** Never disclose personal data to the wrong person!

---

## Refusing Requests

You CAN refuse requests that are:
- Manifestly unfounded
- Excessive (especially if repetitive)

**When refusing:**
- Explain reasons for refusal
- Inform of right to complain to supervisory authority
- Inform of right to judicial remedy
- Respond within 1 month

---

## Best Practices

1. **Create a documented process** for handling requests
2. **Train staff** to recognize and escalate requests
3. **Log all requests** and responses
4. **Use templates** for consistency
5. **Know your data** - you can't respond if you don't know what you have
            `,
            tips: [
                "Start the clock when you receive the request, not when you verify identity",
                "A verbal request is still valid - document it",
                "Don't ask WHY they're making the request - they don't need to justify it"
            ]
        }
    ],
    quiz: [
        {
            id: "pq2-1",
            type: "multiple-choice",
            question: "What is the standard response time for a data subject access request (SAR)?",
            options: [
                "72 hours",
                "2 weeks",
                "1 month",
                "3 months"
            ],
            correctAnswer: 2,
            explanation: "The standard response time is 1 month from receipt of the request. This can be extended by up to 2 additional months for complex or numerous requests.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "pq2-2",
            type: "multiple-choice",
            question: "Which right allows an individual to stop direct marketing communications?",
            options: [
                "Right to Erasure",
                "Right to Object",
                "Right to Restriction",
                "Right to Rectification"
            ],
            correctAnswer: 1,
            explanation: "The Right to Object includes an absolute right to stop direct marketing. When someone objects to marketing, you must stop immediately without exception.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "pq2-3",
            type: "scenario",
            question: "A customer emails asking for 'all the data you have on me.' They provide their name but no other verification. What should you do FIRST?",
            options: [
                "Immediately send all their data",
                "Verify their identity before responding",
                "Refuse the request as incomplete",
                "Charge a fee for the request"
            ],
            correctAnswer: 1,
            explanation: "You must verify identity before disclosing personal data. Sending data to the wrong person would be a data breach. Request reasonable verification information.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "pq2-4",
            type: "multiple-select",
            question: "When can the Right to Erasure be refused? (Select all that apply)",
            options: [
                "The data is needed for exercising freedom of expression",
                "The customer is annoying",
                "The data is required for legal claims",
                "Processing is for public health purposes",
                "The company prefers to keep the data"
            ],
            correctAnswer: [0, 2, 3],
            explanation: "Erasure can be refused when needed for: freedom of expression, legal claims, public health, archiving in public interest, or legal obligations. Convenience or annoyance are not valid reasons.",
            difficulty: "hard",
            points: 20
        }
    ],
    keyTakeaways: [
        "GDPR grants 8 specific rights to data subjects",
        "Most requests must be handled within 1 month (free of charge)",
        "Always verify identity before disclosing personal data",
        "The Right to Object for direct marketing is absolute",
        "Document all requests and responses for accountability"
    ]
};

// =============================================================================
// Data Privacy Curriculum Export
// =============================================================================

export const dataprivacyCurriculum = {
    moduleId: "data-privacy-gdpr",
    title: "Data Privacy & GDPR",
    description: "Comprehensive GDPR training covering principles, rights, and compliance requirements",
    lessons: [
        privacyLesson1_fundamentals,
        privacyLesson2_rights
    ],
    totalDuration: "75 min",
    certification: {
        name: "GDPR Compliance Certified",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "gdpr-certified"
    }
};

// Final Assessment
export const privacyFinalAssessment: QuizQuestion[] = [
    {
        id: "privacy-final-1",
        type: "scenario",
        question: "Your company, based in Singapore, has launched a new app. It's free, available globally, and available in 10 languages including French and German. The app collects user location data. Does GDPR apply?",
        options: [
            "No, the company is not in the EU",
            "Yes, offering a service in EU languages suggests targeting EU residents",
            "Only if they explicitly market to the EU",
            "Only if they have EU employees"
        ],
        correctAnswer: 1,
        explanation: "GDPR applies when offering goods/services to EU residents. Offering the app in EU languages (French, German) indicates intent to target EU residents, triggering GDPR applicability.",
        difficulty: "hard",
        points: 25
    },
    {
        id: "privacy-final-2",
        type: "multiple-choice",
        question: "Under the Accountability principle, what must an organization be able to do?",
        options: [
            "Simply comply with GDPR",
            "Demonstrate and prove compliance with GDPR",
            "Report all processing to the regulator",
            "Get consent for all processing"
        ],
        correctAnswer: 1,
        explanation: "Accountability requires organizations to not just comply, but to DEMONSTRATE compliance through documentation, policies, DPIAs, records of processing, etc.",
        difficulty: "medium",
        points: 15
    }
];
