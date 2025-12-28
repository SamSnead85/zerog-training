/**
 * HIPAA Compliance Training - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - Privacy Rule essentials and patient rights
 * - Security Rule and technical safeguards
 * - Breach notification requirements
 * - Role-specific scenarios and case studies
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: HIPAA Privacy Rule
// =============================================================================

export const hipaaLesson1_privacy: LessonContent = {
    id: "hipaa-101",
    title: "HIPAA Privacy Rule: Protecting Patient Information",
    description: "Master the Privacy Rule requirements, patient rights, and proper handling of Protected Health Information",
    duration: "45 min",
    objectives: [
        "Define Protected Health Information (PHI) and its components",
        "Explain the Minimum Necessary standard",
        "List and describe patient rights under HIPAA",
        "Apply permissible uses and disclosures of PHI"
    ],
    sections: [
        {
            id: "h1-1",
            title: "What is HIPAA?",
            type: "text",
            content: `
# The Health Insurance Portability and Accountability Act

**HIPAA** (1996) is the primary federal law protecting health information privacy and security in the United States.

## Key HIPAA Rules

### Privacy Rule (2003)
Establishes national standards for protection of individual health information

### Security Rule (2005)
Sets standards for protecting electronic PHI (ePHI)

### Breach Notification Rule (2009)
Requires notification following breaches of unsecured PHI

### Enforcement Rule
Provides investigation procedures and penalties for violations

### Omnibus Rule (2013)
Strengthened privacy and security protections

## Who Must Comply?

### Covered Entities
- Healthcare providers who transmit health information electronically
- Health plans (insurers, HMOs, Medicare, Medicaid)
- Healthcare clearinghouses

### Business Associates
Organizations that perform functions involving PHI on behalf of covered entities:
- IT service providers
- Billing companies
- Transcription services
- Cloud storage providers
- Consultants with access to PHI
            `
        },
        {
            id: "h1-2",
            title: "Protected Health Information (PHI)",
            type: "text",
            content: `
# Understanding Protected Health Information

**Protected Health Information (PHI)** is individually identifiable health information that is transmitted or maintained in any form.

## Components of PHI

PHI = **Individually Identifiable Information** + **Health Information**

### Health Information Includes:
- Past, present, or future physical or mental health conditions
- Healthcare provision to an individual
- Past, present, or future payment for healthcare

### 18 HIPAA Identifiers (What Makes It "Identifiable")

1. Names
2. Geographic data (smaller than state)
3. Dates (except year) related to an individual
4. Phone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers and serial numbers
13. Device identifiers and serial numbers
14. Web URLs
15. IP addresses
16. Biometric identifiers
17. Full-face photographs
18. Any other unique identifying characteristic

## What is NOT PHI?

- Employment records held by a covered entity in its role as employer
- Education records covered by FERPA
- De-identified health information (all 18 identifiers removed)
- Health information of deceased persons (after 50 years)
            `
        },
        {
            id: "h1-3",
            title: "Minimum Necessary Standard",
            type: "text",
            content: `
# The Minimum Necessary Standard

A core Privacy Rule principle: **use, disclose, or request only the minimum amount of PHI necessary to accomplish the intended purpose.**

## When It Applies

The minimum necessary standard applies to:
- Uses and disclosures for treatment, payment, operations
- Requests for PHI from other covered entities
- Uses by workforce members

## When It Does NOT Apply

- Disclosures to the individual who is the subject of the information
- Disclosures authorized by the individual
- Disclosures required by law
- Disclosures to HHS for enforcement
- Uses required for HIPAA compliance

## Implementing Minimum Necessary

### For Uses (Internal Access)
- Identify classes of persons who need access
- Identify the categories of PHI needed
- Implement role-based access controls

### For Routine Disclosures
- Develop standard protocols
- Limit information to that specified in protocols

### For Non-Routine Disclosures
- Develop criteria for determining minimum necessary
- Review each request individually

## Example Scenarios

❌ **Violation**: Sending a patient's complete medical record when only their insurance information was requested.

✅ **Compliant**: Creating a lab results summary for a referring physician rather than sending the entire medical record.

❌ **Violation**: Allowing all employees access to all patient records "just in case they need it."

✅ **Compliant**: Role-based access where billing staff can only see billing-relevant information.
            `,
            tips: [
                "When in doubt, disclose less rather than more",
                "Implement technical controls that enforce minimum necessary (role-based access)",
                "Document your minimum necessary policies and train staff"
            ]
        },
        {
            id: "h1-4",
            title: "Patient Rights Under HIPAA",
            type: "text",
            content: `
# Patient Rights Under the Privacy Rule

HIPAA grants patients specific rights regarding their health information.

## Right to Access

**Patients have the right to inspect and obtain a copy of their PHI**

Key requirements:
- Must respond within 30 days (one 30-day extension allowed)
- May charge a reasonable cost-based fee
- May provide summary or explanation if patient agrees
- Limited exceptions (psychotherapy notes, legal proceedings)

## Right to Amend

**Patients may request amendments to their PHI**

Requirements:
- Must respond within 60 days
- May deny if: information is accurate, was not created by the entity, is not part of designated record set, or patient wouldn't have access to it
- If denied, must allow patient to submit statement of disagreement

## Right to an Accounting of Disclosures

**Patients may request a list of disclosures made**

Includes:
- Disclosures for past 6 years
- Does NOT include: Treatment, Payment, Operations, or disclosures to the patient

## Right to Request Restrictions

**Patients may request restrictions on uses and disclosures**

Important notes:
- Covered entities are generally not required to agree
- **Exception**: MUST agree if patient pays out of pocket in full and requests no disclosure to health plan

## Right to Confidential Communications

**Patients may request alternative means of communication**

Must accommodate reasonable requests:
- Calls to alternative phone numbers
- Mail to alternative addresses
- No requirement to explain why

## Right to Notice of Privacy Practices

**Patients have the right to the organization's privacy notice**

- Must provide at first service delivery (in person)
- Must post prominently
- Must provide on request
- Must obtain written acknowledgment of receipt (good faith effort)
            `
        }
    ],
    quiz: [
        {
            id: "hq1-1",
            type: "multiple-choice",
            question: "Which of the following is NOT one of the 18 HIPAA identifiers?",
            options: ["Social Security number", "Medical record number", "Blood type", "Email address"],
            correctAnswer: 2,
            explanation: "Blood type alone is not an identifier. The 18 identifiers are things like names, SSN, phone numbers, email, etc. that can identify individuals.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "hq1-2",
            type: "multiple-choice",
            question: "Under the Minimum Necessary standard, which disclosure would NOT require a minimum necessary determination?",
            options: [
                "Sending records to an insurance company for payment",
                "Providing records requested by the patient themselves",
                "Sharing records for quality improvement activities",
                "Fulfilling a request from another provider for treatment"
            ],
            correctAnswer: 1,
            explanation: "The minimum necessary standard does not apply to disclosures to the individual who is the subject of the information.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "hq1-3",
            type: "scenario",
            question: "A patient pays $500 cash for a lab test and requests that the result not be sent to their insurance company. Must you comply?",
            options: [
                "No, all services must be reported to insurance",
                "Yes, you must honor this restriction when the patient pays out of pocket in full",
                "Only if the insurance company agrees",
                "Only for services under $250"
            ],
            correctAnswer: 1,
            explanation: "Under the HITECH Act enhancement to HIPAA, covered entities MUST agree to patient requests not to disclose to health plans when the patient pays out of pocket in full.",
            difficulty: "hard",
            points: 25
        },
        {
            id: "hq1-4",
            type: "multiple-select",
            question: "Which are patient rights under HIPAA? (Select all that apply)",
            options: [
                "Right to access their PHI",
                "Right to request amendments",
                "Right to free copies of all records",
                "Right to receive notice of privacy practices",
                "Right to confidential communications"
            ],
            correctAnswer: [0, 1, 3, 4],
            explanation: "All listed are rights EXCEPT free copies - covered entities may charge a reasonable cost-based fee for copies of records.",
            difficulty: "medium",
            points: 20
        },
        {
            id: "hq1-5",
            type: "multiple-choice",
            question: "What is PHI?",
            options: [
                "Any health information",
                "Individually identifiable health information transmitted or maintained in any form",
                "Only electronic health records",
                "Only information about insured patients"
            ],
            correctAnswer: 1,
            explanation: "PHI is individually identifiable health information. It must be both health-related AND identifiable to an individual, and exists in any form (paper, electronic, oral).",
            difficulty: "easy",
            points: 10
        }
    ],
    keyTakeaways: [
        "PHI = Individually identifiable health information in any form",
        "18 HIPAA identifiers make information 'identifiable'",
        "Minimum Necessary: Use only what's needed for the purpose",
        "Patients have rights to access, amend, restrict, and receive privacy notices",
        "Business associates must also comply with HIPAA"
    ]
};

// =============================================================================
// LESSON 2: HIPAA Security Rule
// =============================================================================

export const hipaaLesson2_security: LessonContent = {
    id: "hipaa-102",
    title: "HIPAA Security Rule: Protecting Electronic PHI",
    description: "Understand technical, administrative, and physical safeguards for electronic Protected Health Information",
    duration: "50 min",
    objectives: [
        "Distinguish between required and addressable implementation specifications",
        "Explain the three categories of safeguards",
        "Apply risk analysis principles",
        "Identify key technical safeguards for ePHI"
    ],
    sections: [
        {
            id: "h2-1",
            title: "Security Rule Overview",
            type: "text",
            content: `
# The HIPAA Security Rule

The Security Rule establishes national standards for protecting **electronic Protected Health Information (ePHI)**.

## Key Principles

### Confidentiality
Ensure ePHI is not available or disclosed to unauthorized persons

### Integrity
Protect against improper alteration or destruction of ePHI

### Availability
Ensure ePHI is accessible and usable on demand by authorized persons

## Implementation Specifications

### Required
Must be implemented as specified - no flexibility

### Addressable
Must either:
- Implement the specification, OR
- Implement an equivalent alternative, OR
- Not implement if not reasonable and appropriate (with documentation)

**"Addressable" does NOT mean "optional"**

You must document your decision and reasoning for how you address each specification.

## The Three Safeguard Categories

1. **Administrative Safeguards** - Policies, procedures, workforce management
2. **Physical Safeguards** - Facility access and workstation security
3. **Technical Safeguards** - Technology controls and access management
            `
        },
        {
            id: "h2-2",
            title: "Administrative Safeguards",
            type: "text",
            content: `
# Administrative Safeguards

Administrative safeguards are the policies, procedures, and actions to manage the security of ePHI.

## Security Management Process (§164.308(a)(1))

### Risk Analysis (Required)
- Identify potential risks and vulnerabilities to ePHI
- Must be ongoing, not one-time
- Document methodology and findings

### Risk Management (Required)
- Implement security measures to reduce risks
- Document decisions and rationale

### Sanction Policy (Required)
- Apply appropriate sanctions against workforce members who violate policies

### Information System Activity Review (Required)
- Regularly review audit logs, access reports, security incidents

## Workforce Security (§164.308(a)(3))

### Authorization and/or Supervision (Addressable)
- Ensure workforce members have appropriate access

### Workforce Clearance Procedure (Addressable)
- Determine that access is appropriate before granting

### Termination Procedures (Addressable)
- Terminate access when employment ends

## Security Awareness and Training (§164.308(a)(5))

- Security reminders (Addressable)
- Protection from malicious software (Addressable)
- Log-in monitoring (Addressable)
- Password management (Addressable)

## Contingency Plan (§164.308(a)(7))

- Data backup plan (Required)
- Disaster recovery plan (Required)
- Emergency mode operation plan (Required)
- Testing and revision procedures (Addressable)
- Applications and data criticality analysis (Addressable)
            `
        },
        {
            id: "h2-3",
            title: "Physical and Technical Safeguards",
            type: "text",
            content: `
# Physical Safeguards

Physical measures to protect systems and facilities.

## Facility Access Controls (§164.310(a)(1))
- Contingency operations (Addressable)
- Facility security plan (Addressable)
- Access control and validation procedures (Addressable)
- Maintenance records (Addressable)

## Workstation Use (§164.310(b))
**Required**: Specify proper functions and physical attributes of workstations

## Workstation Security (§164.310(c))
**Required**: Implement physical safeguards restricting access to workstations

## Device and Media Controls (§164.310(d)(1))
- Disposal (Required)
- Media re-use (Required)
- Accountability (Addressable)
- Data backup and storage (Addressable)

---

# Technical Safeguards

Technology controls for protecting ePHI.

## Access Control (§164.312(a)(1))
**Goal: Ensure only authorized persons access ePHI**

- Unique user identification (Required)
- Emergency access procedure (Required)
- Automatic logoff (Addressable)
- Encryption and decryption (Addressable)

## Audit Controls (§164.312(b))
**Required**: Implement mechanisms to record and examine system activity

## Integrity (§164.312(c)(1))
- Mechanism to authenticate ePHI (Addressable)

## Person or Entity Authentication (§164.312(d))
**Required**: Verify identity of person or entity seeking access

## Transmission Security (§164.312(e)(1))
- Integrity controls (Addressable)
- Encryption (Addressable)

---

## Encryption: A Critical Note

While encryption is "addressable," the Breach Notification Rule provides a strong incentive:

**Encrypted data is not considered "unsecured PHI"**

If a breach involves properly encrypted data, you do NOT have to report it as a breach.

This makes encryption effectively "required" for most organizations.
            `,
            tips: [
                "Addressable does NOT mean optional - you must document your decision",
                "Encryption of ePHI effectively becomes required due to breach notification benefits",
                "Risk analysis must be ongoing, not just once at implementation"
            ]
        }
    ],
    quiz: [
        {
            id: "hq2-1",
            type: "multiple-choice",
            question: "What does 'addressable' mean for a HIPAA Security Rule implementation specification?",
            options: [
                "The specification is optional and can be ignored",
                "The specification must be addressed but may be implemented with alternatives if documented",
                "The specification only applies to large organizations",
                "The specification has a flexible deadline"
            ],
            correctAnswer: 1,
            explanation: "Addressable specifications must be addressed - either implemented as written, with an alternative, or documented as not reasonable. It does NOT mean optional.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "hq2-2",
            type: "multiple-select",
            question: "Which are the three categories of HIPAA Security Rule safeguards? (Select all that apply)",
            options: ["Administrative", "Technical", "Legal", "Physical", "Financial"],
            correctAnswer: [0, 1, 3],
            explanation: "The three safeguard categories are Administrative, Technical, and Physical. Legal and Financial are not Security Rule safeguard categories.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "hq2-3",
            type: "multiple-choice",
            question: "Why is encryption often treated as effectively 'required' despite being an addressable specification?",
            options: [
                "HHS changed the rule in 2020",
                "Encrypted data is not considered 'unsecured PHI' and breaches don't require notification",
                "Insurance companies require it",
                "NIST mandates encryption"
            ],
            correctAnswer: 1,
            explanation: "Under the Breach Notification Rule, properly encrypted data is not 'unsecured PHI.' This means breaches of encrypted data don't trigger notification requirements, providing strong incentive to encrypt.",
            difficulty: "hard",
            points: 25
        },
        {
            id: "hq2-4",
            type: "multiple-choice",
            question: "Which of the following is a REQUIRED (not addressable) Security Rule specification?",
            options: [
                "Automatic logoff",
                "Encryption and decryption",
                "Unique user identification",
                "Security reminders"
            ],
            correctAnswer: 2,
            explanation: "Unique user identification is required under Access Controls. Automatic logoff, encryption, and security reminders are all addressable specifications.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "Security Rule protects ePHI through confidentiality, integrity, and availability",
        "Addressable ≠ optional - must document how you address each specification",
        "Three safeguard types: Administrative, Physical, Technical",
        "Risk analysis is required and must be ongoing",
        "Encryption makes breach notification unnecessary for compromised data"
    ]
};

// =============================================================================
// LESSON 3: Breach Notification
// =============================================================================

export const hipaaLesson3_breach: LessonContent = {
    id: "hipaa-103",
    title: "HIPAA Breach Notification Requirements",
    description: "Understand breach identification, notification requirements, and timelines",
    duration: "35 min",
    objectives: [
        "Define what constitutes a breach under HIPAA",
        "Apply the breach risk assessment process",
        "Identify notification requirements and timelines",
        "Distinguish between small and large breaches"
    ],
    sections: [
        {
            id: "h3-1",
            title: "What is a Breach?",
            type: "text",
            content: `
# Defining a HIPAA Breach

A **breach** is the acquisition, access, use, or disclosure of PHI in a manner not permitted by the Privacy Rule which compromises the security or privacy of the PHI.

## Presumption of Breach

**An unpermitted use or disclosure is presumed to be a breach** unless you can demonstrate through a risk assessment that there is a low probability that PHI has been compromised.

## Breach Exceptions

These are NOT considered breaches:

### 1. Unintentional Acquisition in Good Faith
- By workforce member acting under covered entity's authority
- Access within scope of employment
- Not further impermissibly used or disclosed

### 2. Inadvertent Disclosure Within Organization
- From one authorized person to another
- Within the covered entity or business associate
- Information not further impermissibly used or disclosed

### 3. Unable to Retain Information
- Recipient could not reasonably have retained the information
- Example: Wrong fax number, received by someone who immediately discarded it

## Unsecured PHI

The Breach Notification Rule only applies to **unsecured PHI** - PHI that is not rendered unusable, unreadable, or indecipherable to unauthorized persons.

PHI is secured if:
- Encrypted per NIST standards
- Destroyed (paper: shredded/pulverized; electronic: cleared/purged/destroyed per NIST SP 800-88)
            `
        },
        {
            id: "h3-2",
            title: "Risk Assessment",
            type: "text",
            content: `
# Breach Risk Assessment

When an unpermitted use or disclosure occurs, conduct a four-factor risk assessment:

## The Four Factors

### Factor 1: Nature and Extent of PHI Involved
Consider the types of identifiers and the likelihood of re-identification:
- Does it contain financial information (SSN, credit card)?
- Does it contain clinical information (diagnoses, test results)?
- How sensitive is the clinical information (HIV, mental health, substance abuse)?

### Factor 2: The Unauthorized Person Who Used or Received PHI
Consider who accessed or received the PHI:
- Is the person a known individual?
- Is the person in a position to use the information?
- Does the person have obligations to protect PHI?

### Factor 3: Whether PHI Was Actually Acquired or Viewed
Consider if the PHI was actually accessed:
- Was it accessed or only potentially accessible?
- Evidence of actual viewing or acquisition?

### Factor 4: Extent to Which Risk Has Been Mitigated
Consider mitigation efforts:
- Was the information recovered?
- Were assurances of deletion/destruction obtained?
- Is the unauthorized recipient trustworthy?

## Risk Assessment Outcomes

Based on the four factors:
- **Low probability of compromise** → Not a breach (document your determination)
- **Not low probability** → Breach requiring notification
            `
        },
        {
            id: "h3-3",
            title: "Notification Requirements",
            type: "text",
            content: `
# Breach Notification Requirements

## Individual Notification
**Required for all breaches**

**Timeline**: Without unreasonable delay, no later than 60 days from discovery

**Method**: 
- Written notice by first-class mail (or email if individual agreed)
- If contact info is outdated: substitute notice (website posting or media)
- If urgency warrants: telephone in addition to written

**Content must include**:
- Brief description of what happened
- Types of PHI involved
- Steps individual should take to protect themselves
- Brief description of what covered entity is doing
- Contact procedures for questions

---

## Media Notification
**Required for breaches affecting 500+ residents of a state/jurisdiction**

**Timeline**: Without unreasonable delay, no later than 60 days

**Method**: Prominent media outlets in the affected area

---

## HHS Notification
**Required for all breaches**

### Breaches Affecting 500+ Individuals
- Notify HHS contemporaneously with individual notification
- Within 60 days of discovery

### Breaches Affecting Fewer Than 500 Individuals
- Maintain a log of breaches
- Submit log to HHS annually (within 60 days of calendar year end)

---

## Business Associate Notification
**Business associates must notify covered entities of breaches**

**Timeline**: Without unreasonable delay, no later than 60 days

Covered entity then handles individual and HHS notification.
            `
        }
    ],
    quiz: [
        {
            id: "hq3-1",
            type: "multiple-choice",
            question: "Under HIPAA, an unpermitted use or disclosure of PHI is:",
            options: [
                "Never a breach if it was accidental",
                "Presumed to be a breach unless you can show low probability of compromise",
                "Only a breach if over 500 individuals are affected",
                "Not a breach if the information wasn't sold"
            ],
            correctAnswer: 1,
            explanation: "An unpermitted disclosure is presumed to be a breach. You must conduct a risk assessment to demonstrate low probability of compromise to avoid breach notification requirements.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "hq3-2",
            type: "scenario",
            question: "A staff member sends a patient's lab results by fax to the wrong number. The recipient calls to report receiving it and confirms they shredded it. Is this a breach?",
            options: [
                "Yes, any wrong disclosure is a breach",
                "No, if the recipient couldn't reasonably retain the information and you document the outcome",
                "Yes, but no notification is required under 500 individuals",
                "Only if the information included HIV results"
            ],
            correctAnswer: 1,
            explanation: "This may fall under the exception where the recipient couldn't reasonably retain the information. However, you should document your risk assessment considering that the recipient confirmed destruction.",
            difficulty: "hard",
            points: 25
        },
        {
            id: "hq3-3",
            type: "multiple-choice",
            question: "What is the maximum time allowed to notify affected individuals of a breach?",
            options: ["10 days", "30 days", "60 days", "90 days"],
            correctAnswer: 2,
            explanation: "HIPAA requires notification without unreasonable delay and in no case later than 60 days from the date of discovery of the breach.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "hq3-4",
            type: "multiple-choice",
            question: "When is media notification required for a breach?",
            options: [
                "For all breaches",
                "For breaches affecting 500+ individuals nationally",
                "For breaches affecting 500+ residents of a state or jurisdiction",
                "Only for breaches involving financial information"
            ],
            correctAnswer: 2,
            explanation: "Media notification is required when a breach affects 500 or more residents of a state or jurisdiction, in addition to individual and HHS notification.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "Unpermitted disclosures are presumed to be breaches unless proven otherwise",
        "Conduct 4-factor risk assessment to determine if notification required",
        "60 days maximum for individual notification",
        "500+ affected = immediate HHS notification + media notification",
        "Proper encryption = data is 'secured' and not subject to breach notification"
    ]
};

// =============================================================================
// HIPAA Curriculum Export
// =============================================================================

export const hipaaCurriculum = {
    moduleId: "hipaa-compliance",
    title: "HIPAA Compliance Training",
    description: "Comprehensive HIPAA training covering Privacy Rule, Security Rule, and Breach Notification",
    lessons: [
        hipaaLesson1_privacy,
        hipaaLesson2_security,
        hipaaLesson3_breach
    ],
    totalDuration: "130 min",
    certification: {
        name: "HIPAA Compliance Certified",
        passingScore: 80,
        validityPeriod: "1 year",
        badge: "hipaa-certified",
        renewalRequired: true
    }
};

// =============================================================================
// HIPAA Final Assessment
// =============================================================================

export const hipaaFinalAssessment: QuizQuestion[] = [
    {
        id: "hipaa-final-1",
        type: "scenario",
        question: "A nurse leaves a printed patient list on a printer in a public area for 2 hours. No one reported seeing it. After the four-factor risk assessment, you determine there's low probability of compromise. What should you do?",
        options: [
            "Nothing - it's not a breach",
            "Document your risk assessment determination and maintain the record",
            "Report to HHS within 60 days",
            "Notify all patients on the list"
        ],
        correctAnswer: 1,
        explanation: "If your four-factor risk assessment determines low probability of compromise, it's not a reportable breach. However, you MUST document your determination and the reasoning behind it.",
        difficulty: "hard",
        points: 25
    },
    {
        id: "hipaa-final-2",
        type: "multiple-choice",
        question: "Which statement best describes the relationship between HIPAA Privacy and Security Rules?",
        options: [
            "Security Rule replaced the Privacy Rule",
            "Privacy Rule covers all PHI; Security Rule specifically addresses electronic PHI protections",
            "They are the same rule with different names",
            "Privacy Rule only applies to paper records"
        ],
        correctAnswer: 1,
        explanation: "The Privacy Rule covers PHI in all forms. The Security Rule specifically establishes technical, physical, and administrative requirements for protecting electronic PHI (ePHI).",
        difficulty: "medium",
        points: 15
    },
    {
        id: "hipaa-final-3",
        type: "scenario",
        question: "A physician wants to email lab results to a patient. The patient has provided their email address and agreed to electronic communications. What should the physician do?",
        options: [
            "Never send PHI by email",
            "Email is prohibited under HIPAA",
            "Use secure email and verify the address, as the patient has consented",
            "Only send if the practice has more than 500 patients"
        ],
        correctAnswer: 2,
        explanation: "Email communication of PHI is permitted when the patient has consented. Best practice is to use encryption and verify the email address. The Privacy Rule allows patients to choose their preferred communication method.",
        difficulty: "medium",
        points: 15
    }
];
