/**
 * Expanded HIPAA Compliance Curriculum
 * 
 * Comprehensive training covering Privacy Rule, Security Rule, 
 * Breach Notification, and healthcare-specific compliance topics.
 */

import type { ModuleSection } from "./types";

export const expandedHIPAAModule: ModuleSection[] = [
    // =========================================================================
    // MODULE 1: HIPAA FOUNDATIONS (Sections 1-5)
    // =========================================================================
    {
        id: "hipaa-intro",
        title: "Introduction to HIPAA",
        type: "reading",
        content: {
            heading: "Understanding HIPAA: Your Legal Obligations",
            paragraphs: [
                "The Health Insurance Portability and Accountability Act (HIPAA) was enacted in 1996 to protect sensitive patient health information while allowing the flow of health information needed for quality care.",
                "HIPAA applies to 'covered entities' (healthcare providers, health plans, healthcare clearinghouses) and 'business associates' (companies that handle PHI on behalf of covered entities).",
                "Violations of HIPAA can result in civil penalties ranging from $100 to $50,000 per violation (up to $1.5 million per year), and criminal penalties including imprisonment for up to 10 years.",
                "This training will ensure you understand your obligations under HIPAA and can protect patient information in your daily work."
            ],
            keyPoints: [
                "HIPAA protects patient health information (PHI)",
                "Applies to covered entities AND business associates",
                "Violations can result in fines up to $1.5M per year",
                "Criminal penalties can include imprisonment"
            ],
            warning: "HIPAA violations can end careers. Take this training seriously—your patients' privacy and your professional future depend on it."
        },
    },
    {
        id: "what-is-phi",
        title: "Understanding PHI",
        type: "reading",
        content: {
            heading: "What is Protected Health Information?",
            paragraphs: [
                "Protected Health Information (PHI) is any health information that can identify an individual patient. This includes information in any form: electronic (ePHI), paper, or verbal.",
                "PHI includes 18 specific identifiers: names, dates (except year), phone numbers, geographic data smaller than state, fax numbers, email addresses, SSN, medical record numbers, health plan numbers, account numbers, certificate/license numbers, vehicle identifiers, device identifiers, URLs, IP addresses, biometric identifiers, photos, and any other unique identifying characteristic.",
                "Health information combined with any of these identifiers becomes PHI. For example, 'a patient has diabetes' is not PHI, but 'John Smith has diabetes' is PHI.",
                "De-identified data has all 18 identifiers removed and can be used without HIPAA restrictions. However, de-identification must be properly performed and documented."
            ],
            keyPoints: [
                "PHI = health information + patient identifiers",
                "PHI exists in electronic, paper, and verbal forms",
                "18 specific identifiers make information PHI",
                "Properly de-identified data is not PHI"
            ],
        },
    },
    {
        id: "quiz-phi-identification",
        title: "Knowledge Check: Identifying PHI",
        type: "quiz",
        quiz: {
            question: "Which of the following is considered PHI under HIPAA?",
            options: [
                "A patient's blood type without any identifying information",
                "An email containing 'Patient John Smith, DOB 03/15/1980, tested positive for COVID'",
                "Aggregate statistics showing 15% of hospital patients have hypertension",
                "A general health article about managing diabetes"
            ],
            correctIndex: 1,
            explanation: "PHI requires both health information AND a patient identifier. The email contains health information (COVID positive) combined with multiple identifiers (name, date of birth), making it PHI. Aggregate statistics and general health information without identifiers are not PHI."
        },
    },
    {
        id: "minimum-necessary",
        title: "The Minimum Necessary Standard",
        type: "reading",
        content: {
            heading: "Use Only What You Need",
            paragraphs: [
                "The Minimum Necessary Standard requires that when using, disclosing, or requesting PHI, you limit it to the minimum amount needed to accomplish the intended purpose.",
                "This applies to: uses within your organization, disclosures to outside parties, requests when asking for PHI, and access controls in systems.",
                "Exceptions to minimum necessary include: disclosures to the patient themselves, disclosures for treatment purposes, disclosures required by law, and disclosures authorized by the patient.",
                "In practice, this means: don't access records you don't need, don't include extra information when sharing, and don't request more than necessary for your task."
            ],
            keyPoints: [
                "Only access/share/request the minimum PHI needed",
                "Applies to all uses and disclosures",
                "Exceptions: patient access, treatment, legal requirements",
                "Ask yourself: Do I need ALL this information?"
            ],
            tip: "Before accessing a record, ask: 'Do I have a legitimate work reason to view this specific patient's information?' If not, don't access it."
        },
    },
    {
        id: "scenario-minimum-necessary",
        title: "Scenario: Applying Minimum Necessary",
        type: "scenario",
        scenario: {
            situation: "A pharmaceutical company requests patient records for a drug safety study. They ask for complete medical records of patients who took their medication.",
            question: "How should this request be handled under the Minimum Necessary Standard?",
            options: [
                "Provide complete medical records as requested",
                "Provide only the information relevant to the drug safety study (medication records, adverse events, relevant demographics) with appropriate authorization",
                "Refuse to provide any information",
                "Ask the pharmaceutical company to come on-site to view records"
            ],
            correctIndex: 1,
            feedback: "The Minimum Necessary Standard requires providing only information relevant to the stated purpose. A drug safety study needs medication history and adverse events, not complete medical records including unrelated conditions. Proper authorization (patient consent or IRB approval) is also required for research disclosures."
        },
    },

    // =========================================================================
    // MODULE 2: PRIVACY RULE (Sections 6-10)
    // =========================================================================
    {
        id: "privacy-rule-overview",
        title: "The HIPAA Privacy Rule",
        type: "reading",
        content: {
            heading: "Standards for PHI Use and Disclosure",
            paragraphs: [
                "The Privacy Rule establishes national standards for how PHI can be used and disclosed. It protects patients while allowing necessary information flow for healthcare.",
                "PHI can be used without authorization for Treatment, Payment, and Healthcare Operations (TPO). These are the routine uses that make healthcare function.",
                "Treatment includes coordination of care between providers. Payment includes billing and claims. Healthcare Operations includes quality improvement, training, and business management.",
                "Most other uses require written patient authorization. Patients have the right to know who has accessed their information and can request an 'accounting of disclosures.'"
            ],
            keyPoints: [
                "TPO (Treatment, Payment, Operations) = No authorization needed",
                "Most other uses require patient authorization",
                "Patients can request accounting of disclosures",
                "Privacy Rule = WHO can access WHAT and WHEN"
            ],
        },
    },
    {
        id: "patient-rights",
        title: "Patient Rights Under HIPAA",
        type: "reading",
        content: {
            heading: "What Patients Can Request",
            paragraphs: [
                "Right to Access: Patients can request copies of their medical records. Organizations must respond within 30 days and can charge only reasonable copying costs.",
                "Right to Amend: Patients can request corrections to their records. You can deny if the information is accurate, but must allow the patient to submit a statement of disagreement.",
                "Right to an Accounting: Patients can request a list of disclosures made in the past 6 years (excludes TPO, to the patient, and some other categories).",
                "Right to Request Restrictions: Patients can ask to restrict disclosures. You don't have to agree, except when patient pays out-of-pocket and requests no disclosure to health plan.",
                "Right to Confidential Communications: Patients can request communications at alternative locations or by alternative means."
            ],
            keyPoints: [
                "Access: Copy of records within 30 days",
                "Amend: Request corrections (can be denied if accurate)",
                "Accounting: List of who received their PHI",
                "Restrictions: Limit disclosures (some mandatory)",
                "Confidential Communications: Alternative contact methods"
            ],
        },
    },
    {
        id: "quiz-privacy-rule",
        title: "Knowledge Check: Privacy Rule",
        type: "quiz",
        quiz: {
            question: "A patient's employer calls requesting their medical records to verify a worker's compensation claim. What authorization is needed?",
            options: [
                "None—worker's compensation is a payment purpose",
                "Verbal authorization from the patient is sufficient",
                "Written authorization from the patient is required",
                "Only a signed request from the employer is needed"
            ],
            correctIndex: 2,
            explanation: "Disclosures to employers require written patient authorization, even for worker's compensation. While the treatment and payment between patient and provider doesn't need authorization, disclosing to a third party (the employer) requires the patient's written consent. Some states have specific worker's comp exceptions—check your state laws."
        },
    },
    {
        id: "authorization-requirements",
        title: "Valid HIPAA Authorizations",
        type: "reading",
        content: {
            heading: "What Makes an Authorization Valid?",
            paragraphs: [
                "A valid HIPAA authorization must contain specific elements to be enforceable. Missing elements can invalidate the authorization entirely.",
                "Required elements include: description of PHI to be disclosed, who is authorized to use/receive it, purpose of the disclosure, expiration date or event, patient signature and date.",
                "The authorization must also include statements about the right to revoke, potential for re-disclosure, and whether treatment is conditioned on authorization.",
                "Authorizations can be revoked by the patient at any time in writing, except for actions already taken in reliance on the authorization."
            ],
            keyPoints: [
                "Must specify: WHAT, WHO, WHY, WHEN (expiration)",
                "Requires patient signature and date",
                "Must include right to revoke",
                "Missing elements = invalid authorization"
            ],
            warning: "Using an invalid authorization is a HIPAA violation. Always verify authorizations contain all required elements before disclosing PHI."
        },
    },
    {
        id: "scenario-authorization",
        title: "Scenario: Evaluating an Authorization",
        type: "scenario",
        scenario: {
            situation: "A patient's lawyer sends an authorization form requesting 'all medical records from your facility.' The form has the patient's signature but no date, no expiration, and doesn't specify who will receive the records.",
            question: "How should you handle this authorization?",
            options: [
                "Process it—the patient signed it so it's valid",
                "Reject it and explain that it's missing required elements (date, expiration, recipient identification)",
                "Call the lawyer and verbally confirm the missing information",
                "Send only some records since the authorization is partially valid"
            ],
            correctIndex: 1,
            feedback: "This authorization is invalid because it's missing required elements: signature date, expiration, and specific recipient. Request a corrected authorization with all required elements before disclosing any PHI. Verbal confirmation is not sufficient—all elements must be in the written authorization."
        },
    },

    // =========================================================================
    // MODULE 3: SECURITY RULE (Sections 11-15)
    // =========================================================================
    {
        id: "security-rule-overview",
        title: "The HIPAA Security Rule",
        type: "reading",
        content: {
            heading: "Protecting Electronic PHI (ePHI)",
            paragraphs: [
                "The Security Rule establishes standards for protecting electronic PHI (ePHI). While the Privacy Rule covers all PHI, the Security Rule specifically addresses ePHI.",
                "The Security Rule requires three types of safeguards: Administrative (policies and procedures), Physical (facility and device security), and Technical (technology protections).",
                "Organizations must conduct regular risk assessments to identify vulnerabilities and implement appropriate safeguards based on their size, complexity, and risk level.",
                "The Security Rule is 'technology-neutral'—it doesn't mandate specific technologies, but requires appropriate protections based on risk assessment."
            ],
            keyPoints: [
                "Security Rule = Protection of electronic PHI (ePHI)",
                "Three safeguard types: Administrative, Physical, Technical",
                "Risk assessment required to identify vulnerabilities",
                "Technology-neutral—appropriate protections based on risk"
            ],
        },
    },
    {
        id: "administrative-safeguards",
        title: "Administrative Safeguards",
        type: "reading",
        content: {
            heading: "Policies, Procedures, and People",
            paragraphs: [
                "Administrative Safeguards are the policies and procedures that govern the conduct of workforce members with respect to ePHI.",
                "Key requirements include: designated Security Officer, workforce training program, access management procedures, incident response procedures, and business associate agreements.",
                "Security awareness training must be ongoing and must address: password management, workstation security, malware protection, and recognizing threats.",
                "You must be trained on your organization's specific security policies and procedures, not just general HIPAA requirements."
            ],
            keyPoints: [
                "Security Officer must be designated",
                "All workforce must receive security training",
                "Access must be managed and documented",
                "Incident response procedures must exist",
                "Business associates require written agreements"
            ],
        },
    },
    {
        id: "physical-safeguards",
        title: "Physical Safeguards",
        type: "reading",
        content: {
            heading: "Facility and Device Security",
            paragraphs: [
                "Physical Safeguards protect systems and equipment from physical threats, unauthorized access, and environmental hazards.",
                "Facility access controls include: locked doors, visitor logs, badge access systems, and security cameras. Only authorized personnel should access areas where ePHI is stored or processed.",
                "Workstation security requires: screens positioned away from public view, automatic lock screens, logging off when away, and proper disposal of printed materials.",
                "Device and media controls address: tracking of equipment, secure disposal of hard drives, encryption of portable devices, and protocols for lost/stolen devices."
            ],
            keyPoints: [
                "Control facility access with locks, badges, logs",
                "Position screens away from public view",
                "Use automatic screen locks",
                "Track and securely dispose of devices",
                "Encrypt portable devices and media"
            ],
            tip: "Before leaving your workstation, lock your screen (Windows: Win+L, Mac: Ctrl+Cmd+Q). This should be habit, not an afterthought."
        },
    },
    {
        id: "technical-safeguards",
        title: "Technical Safeguards",
        type: "reading",
        content: {
            heading: "Technology-Based Protections",
            paragraphs: [
                "Technical Safeguards are the technology and policies for using technology to protect ePHI and access to it.",
                "Access controls include: unique user identification, emergency access procedures, automatic logoff, and encryption. Each user must have a unique ID—never share credentials.",
                "Audit controls require systems to record and examine activity. Your organization monitors who accessed what records and when. Inappropriate access is detectable.",
                "Transmission security requires encryption for ePHI sent over networks. Never send unencrypted PHI via regular email. Use your organization's secure messaging tools."
            ],
            keyPoints: [
                "Unique user IDs—never share passwords",
                "All access is logged and audited",
                "Encryption required for transmission",
                "Never send PHI via regular unencrypted email"
            ],
            warning: "Access logs are reviewed. Accessing records of friends, family, coworkers, or celebrities without a work-related reason WILL be detected and is a fireable offense."
        },
    },
    {
        id: "quiz-security-rule",
        title: "Knowledge Check: Security Safeguards",
        type: "quiz",
        quiz: {
            question: "A coworker is having trouble logging in and asks to share your credentials 'just this once' to finish urgent patient care documentation. What should you do?",
            options: [
                "Share your password since it's for patient care",
                "Log in for them and let them use your session",
                "Help them contact IT or use emergency access procedures",
                "Write down your password so they can use it when you're gone"
            ],
            correctIndex: 2,
            explanation: "Never share credentials under any circumstances. Unique user identification is a HIPAA requirement because it enables audit trails. If your credentials are used for inappropriate access, YOU could be held responsible. Help your coworker contact IT or use proper emergency access procedures."
        },
    },

    // =========================================================================
    // MODULE 4: BREACH NOTIFICATION (Sections 16-18)
    // =========================================================================
    {
        id: "breach-definition",
        title: "What Constitutes a Breach?",
        type: "reading",
        content: {
            heading: "Understanding HIPAA Breaches",
            paragraphs: [
                "A breach is the unauthorized acquisition, access, use, or disclosure of PHI that compromises its security or privacy. Not all security incidents are breaches.",
                "An impermissible use or disclosure is presumed to be a breach unless you can demonstrate a low probability that PHI was compromised based on a risk assessment.",
                "Risk assessment factors include: nature and extent of PHI involved, who received it, whether PHI was actually acquired or viewed, and extent to which risk was mitigated.",
                "Some disclosures are NOT breaches: unintentional access by workforce members acting in good faith (e.g., opening wrong patient chart accidentally and immediately closing it)."
            ],
            keyPoints: [
                "Breach = unauthorized acquisition, access, use, or disclosure",
                "Presumed breach unless low probability demonstrated",
                "Unintentional good-faith access may not be breach",
                "Risk assessment determines if notification required"
            ],
        },
    },
    {
        id: "breach-notification",
        title: "Breach Notification Requirements",
        type: "reading",
        content: {
            heading: "Who Must Be Notified and When",
            paragraphs: [
                "Individual Notification: Affected individuals must be notified within 60 days of breach discovery. Notification must describe the breach, types of information involved, steps to protect themselves, and contact information.",
                "Media Notification: If a breach affects more than 500 residents of a state, prominent media outlets in that state must be notified within 60 days.",
                "HHS Notification: All breaches must be reported to the Department of Health and Human Services. Breaches affecting 500+ people must be reported within 60 days; smaller breaches can be reported annually.",
                "Business Associates must notify Covered Entities of breaches without unreasonable delay (maximum 60 days)."
            ],
            keyPoints: [
                "Individuals: Notify within 60 days",
                "Media: Notify if 500+ affected in a state",
                "HHS: Report all breaches (timing varies by size)",
                "Business Associates notify Covered Entities"
            ],
            warning: "Breach notification has strict timelines. Report suspected breaches immediately to your Privacy Officer—delays can result in additional penalties."
        },
    },
    {
        id: "scenario-breach-response",
        title: "Scenario: Responding to an Incident",
        type: "scenario",
        scenario: {
            situation: "You accidentally sent a patient's lab results to the wrong email address. You immediately realize the error. The email contained the patient's name, DOB, and test results.",
            question: "What should you do?",
            options: [
                "Delete the sent email and pretend it didn't happen",
                "Immediately report the incident to your supervisor or Privacy Officer",
                "Send a follow-up email asking the recipient to delete it",
                "Wait to see if the recipient complains before reporting"
            ],
            correctIndex: 1,
            feedback: "Report immediately. Even if this ultimately isn't a breach (the risk assessment might show low probability of compromise), you must report so the organization can properly assess and document. Attempting to cover up a breach can result in much more severe penalties than the breach itself."
        },
    },

    // =========================================================================
    // MODULE 5: DAILY COMPLIANCE (Sections 19-22)
    // =========================================================================
    {
        id: "verbal-disclosures",
        title: "Protecting Verbal PHI",
        type: "reading",
        content: {
            heading: "Conversations and Overheard Information",
            paragraphs: [
                "HIPAA protects verbal PHI just like electronic or paper PHI. Conversations about patients must be held carefully to prevent unauthorized disclosure.",
                "Use private spaces for patient discussions. If you must discuss in semi-public areas, lower your voice and use minimal identifying information.",
                "Avoid 'hallway disclosures'—talking about patients in elevators, cafeterias, or lobbies where others might overhear. Even without names, context can identify patients.",
                "Phone conversations should be held where others cannot overhear. Verify the identity of callers before disclosing any PHI over the phone."
            ],
            keyPoints: [
                "HIPAA covers verbal disclosures",
                "Use private spaces for patient discussions",
                "Avoid hallway conversations about patients",
                "Verify caller identity before disclosing by phone"
            ],
            tip: "If someone asks about a patient and you're unsure if disclosure is appropriate, say 'Let me verify the proper procedures for sharing that information and get back to you.'"
        },
    },
    {
        id: "social-media-personal-devices",
        title: "Social Media & Personal Devices",
        type: "reading",
        content: {
            heading: "Modern Risks to Patient Privacy",
            paragraphs: [
                "Never post patient information on social media—even without names. Stories about 'an interesting case today' combined with other details (your workplace, timing) can identify patients.",
                "Photos taken in healthcare settings risk capturing PHI in the background. Patient names on whiteboards, monitor screens, or documents can appear in photos.",
                "Personal devices introduce risk. If you access work systems from personal devices, those devices must have appropriate security (passcode, encryption, remote wipe capability).",
                "Text messaging is generally not secure and should not be used for PHI unless your organization has approved secure messaging platforms."
            ],
            keyPoints: [
                "Never post patient info on social media",
                "Be aware of background PHI in photos",
                "Personal devices need security controls",
                "Regular texting is not secure for PHI"
            ],
            warning: "Social media violations are a leading cause of HIPAA-related terminations. The urge to share an interesting case or vent about a difficult patient can cost you your career."
        },
    },
    {
        id: "quiz-daily-compliance",
        title: "Knowledge Check: Daily Compliance",
        type: "quiz",
        quiz: {
            question: "After a challenging shift, you want to post on social media about 'the most difficult patient ever' without using their name. You work at a small specialty clinic. Is this acceptable?",
            options: [
                "Yes—no name means no PHI",
                "Yes—social media is personal and not covered by HIPAA",
                "No—the combination of your workplace and timing could identify the patient",
                "Yes—if you set the post to 'friends only'"
            ],
            correctIndex: 2,
            explanation: "At a small specialty clinic, 'the most difficult patient' combined with the date and your workplace could easily identify the patient to people who know your work. PHI identification doesn't require a name—any information that could identify the patient is prohibited. This is a common cause of HIPAA violations."
        },
    },
    {
        id: "final-assessment-hipaa",
        title: "HIPAA Certification Assessment",
        type: "quiz",
        quiz: {
            question: "You need to send a patient's comprehensive medical history to a specialist in another city for a consultation. What's the compliant approach?",
            options: [
                "Email the complete records from your personal email for convenience",
                "Use the organization's secure messaging system, send only information relevant to the consultation, and document the disclosure",
                "Fax all records to the specialist's general office fax",
                "Give the records to the patient to deliver themselves"
            ],
            correctIndex: 1,
            explanation: "The compliant approach uses secure transmission (organization's approved system), applies minimum necessary (only consultation-relevant information), and documents the disclosure. Personal email is not secure. General fax may not maintain confidentiality. While patient-carried records could work, it's not the most secure or practical option for comprehensive records."
        },
    },
    {
        id: "hipaa-certification-complete",
        title: "HIPAA Certification Complete",
        type: "reading",
        content: {
            heading: "Congratulations! HIPAA Training Complete",
            paragraphs: [
                "You've completed comprehensive HIPAA training covering the Privacy Rule, Security Rule, Breach Notification, and daily compliance practices.",
                "Remember: HIPAA compliance is not just about avoiding penalties—it's about protecting the trust patients place in you when they share their most personal health information.",
                "If you're ever unsure whether an action complies with HIPAA, consult your Privacy Officer or supervisor BEFORE acting. It's always better to ask than to violate.",
                "Your organization requires annual HIPAA refresher training. Stay alert for updates, as regulations and organizational policies can change."
            ],
            keyPoints: [
                "HIPAA protects patient trust and privacy",
                "When in doubt, ask before acting",
                "Report suspected breaches immediately",
                "Annual refresher training is required",
                "Your Privacy Officer is a resource—use them"
            ],
        },
    },
];

export default expandedHIPAAModule;
