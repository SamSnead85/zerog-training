/**
 * Enterprise Cybersecurity Training - Complete Curriculum
 * 
 * Research-backed curriculum aligned with NIST CSF 2.0 covering:
 * - Core security concepts and threat landscape
 * - Security controls and best practices
 * - Incident response and recovery
 * - Role-based security responsibilities
 */

import { LessonContent, QuizQuestion, LessonSection, PracticeExercise } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: NIST CSF 2.0 Core Functions
// =============================================================================

export const cyberLesson1_nistCore: LessonContent = {
    id: "cyber-101",
    title: "NIST Cybersecurity Framework 2.0 Core Functions",
    description: "Master the six core functions of NIST CSF 2.0 - the gold standard for organizational cybersecurity",
    duration: "45 min",
    objectives: [
        "Explain all six core functions of NIST CSF 2.0",
        "Identify how each function protects organizational assets",
        "Map security activities to appropriate CSF categories",
        "Understand the new GOVERN function added in CSF 2.0"
    ],
    sections: [
        {
            id: "c1-1",
            title: "The NIST Cybersecurity Framework",
            type: "text",
            content: `
# NIST Cybersecurity Framework 2.0

The **National Institute of Standards and Technology (NIST) Cybersecurity Framework** is the most widely adopted security framework in the world. Version 2.0, released in February 2024, represents the first major update since the framework's creation in 2014.

## Why NIST CSF Matters

- **Universal applicability**: Works for organizations of all sizes and industries
- **Risk-based approach**: Focuses resources where they matter most
- **Regulatory alignment**: Maps to HIPAA, PCI DSS, SOC 2, ISO 27001
- **Continuous improvement**: Designed for ongoing security maturity growth

## What's New in CSF 2.0

### 1. The GOVERN Function
The most significant addition - elevates cybersecurity governance to a core function, emphasizing that security must be a board-level priority.

### 2. Expanded Scope
No longer just for critical infrastructure - explicitly designed for all organizations.

### 3. Supply Chain Emphasis
New focus on third-party and supply chain risk management.

### 4. Improved Implementation Guidance
More practical examples and implementation tiers.
            `
        },
        {
            id: "c1-2",
            title: "The Six Core Functions",
            type: "text",
            content: `
# The Six Core Functions of NIST CSF 2.0

## 🏛️ GOVERN (New in 2.0)
**Purpose**: Establish and monitor organizational cybersecurity strategy, expectations, and policy

**Key Activities**:
- Define organizational cybersecurity roles and responsibilities
- Establish risk management strategy and risk appetite
- Create and maintain cybersecurity policies
- Integrate cybersecurity into enterprise risk management
- Ensure board and executive oversight

**Key Question**: "Does leadership understand and prioritize cybersecurity risk?"

---

## 🔍 IDENTIFY
**Purpose**: Understand organizational context, assets, and risks

**Key Activities**:
- Asset management (hardware, software, data)
- Business environment understanding
- Governance structure documentation
- Risk assessment and analysis
- Supply chain risk identification

**Key Question**: "What assets do we have, and what are the risks to them?"

---

## 🛡️ PROTECT
**Purpose**: Implement safeguards to ensure delivery of critical services

**Key Activities**:
- Identity management and access control
- Security awareness training
- Data security (encryption, backup)
- Platform security (configurations, patching)
- Technology infrastructure resilience

**Key Question**: "What controls prevent or limit security incidents?"

---

## 👁️ DETECT
**Purpose**: Develop and implement activities to identify cybersecurity events

**Key Activities**:
- Continuous security monitoring
- Anomaly and event detection
- Security event logging and correlation
- Detection process improvement

**Key Question**: "How quickly can we identify that something bad is happening?"

---

## 🚨 RESPOND
**Purpose**: Take action regarding detected cybersecurity incidents

**Key Activities**:
- Response planning and execution
- Incident analysis and triage
- Incident communication
- Mitigation activities
- Process improvement from lessons learned

**Key Question**: "How do we contain and recover from incidents?"

---

## 🔄 RECOVER
**Purpose**: Maintain resilience and restore capabilities impaired by incidents

**Key Activities**:
- Recovery planning and execution
- Improvement based on lessons learned
- Stakeholder communication during recovery

**Key Question**: "How do we return to normal operations after an incident?"
            `
        },
        {
            id: "c1-3",
            title: "GOVERN Deep Dive",
            type: "text",
            content: `
# GOVERN: The Foundation of Enterprise Security

The addition of GOVERN in CSF 2.0 reflects a fundamental shift in how organizations should approach security: **cybersecurity is a strategic business issue, not just an IT issue.**

## Why GOVERN Was Added

Research and real-world incidents consistently show that organizations with strong security governance experience:
- **40% fewer breaches** (Ponemon Institute)
- **50% lower breach costs** when incidents occur
- **Faster recovery times** from security events
- **Better regulatory compliance** across frameworks

## GOVERN Categories

### GV.OC: Organizational Context
Understanding how cybersecurity fits within the broader organization:
- Mission and objectives consideration
- Stakeholder expectations
- Legal and regulatory requirements
- Dependencies and critical functions

### GV.RM: Risk Management Strategy
Establishing priorities and risk tolerance:
- Risk appetite statements
- Risk acceptance criteria
- Risk treatment priorities

### GV.RR: Roles, Responsibilities & Authorities
Defining who does what:
- CISO/security leadership roles
- Security team responsibilities
- Business unit accountability
- Third-party responsibilities

### GV.PO: Policy
Creating governance documentation:
- Security policies aligned to risk
- Policy communication and acknowledgment
- Regular policy review and updates

### GV.OV: Oversight
Ensuring governance effectiveness:
- Board-level cybersecurity reporting
- Executive security metrics
- Governance effectiveness review

### GV.SC: Cybersecurity Supply Chain Risk Management
Managing third-party risks:
- Supplier security requirements
- Third-party risk assessments
- Contractual security provisions
            `,
            tips: [
                "GOVERN activities should involve executives and board members, not just IT",
                "Start with understanding your risk appetite before implementing controls",
                "Document decisions - governance requires an audit trail"
            ]
        },
        {
            id: "c1-4",
            title: "Implementation Tiers",
            type: "text",
            content: `
# CSF Implementation Tiers

NIST defines four implementation tiers that describe how well an organization's cybersecurity risk management practices exhibit the characteristics defined in the Framework.

## Tier 1: Partial

**Characteristics**:
- Ad hoc, reactive security practices
- Limited awareness of cybersecurity risk
- Irregular or no risk management processes
- No external collaboration on security

**Indicators**:
- No formal security policies
- IT handles security incidents as they occur
- No regular security training
- Unknown asset inventory

---

## Tier 2: Risk Informed

**Characteristics**:
- Risk awareness exists but isn't organization-wide
- Risk management approved by management but not established as policy
- Some understanding of cyber risk to operations
- Informal external collaboration

**Indicators**:
- Basic security policies exist
- Some security training programs
- Periodic risk assessments
- Incident response is documented

---

## Tier 3: Repeatable

**Characteristics**:
- Formal, organization-wide risk management policies
- Regular updates to risk practices based on changes
- Organization-wide security awareness
- Collaboration agreements with external parties

**Indicators**:
- Documented, enforced security policies
- Regular security training for all staff
- Continuous monitoring in place
- Tested incident response plans

---

## Tier 4: Adaptive

**Characteristics**:
- Continuous improvement based on lessons learned
- Cybersecurity practices adapt to changing threats
- Active sharing and consumption of threat intelligence
- Risk management integrated into culture

**Indicators**:
- Real-time threat intelligence integration
- Automated security controls
- Proactive threat hunting
- Security embedded in all business processes
            `
        }
    ],
    quiz: [
        {
            id: "cq1-1",
            type: "multiple-choice",
            question: "What is the NEW core function added in NIST CSF 2.0?",
            options: ["EDUCATE", "GOVERN", "MANAGE", "COMPLY"],
            correctAnswer: 1,
            explanation: "GOVERN is the new sixth core function added in CSF 2.0, emphasizing that cybersecurity governance must be a board-level priority.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq1-2",
            type: "ordering",
            question: "Arrange the CSF incident lifecycle functions in the correct order:",
            options: ["RECOVER", "DETECT", "PROTECT", "RESPOND"],
            correctAnswer: [2, 1, 3, 0],
            explanation: "The incident lifecycle follows: PROTECT (prevent) → DETECT (identify) → RESPOND (contain) → RECOVER (restore). GOVERN and IDENTIFY underpin all of these.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "cq1-3",
            type: "multiple-choice",
            question: "Which CSF function addresses 'How quickly can we identify that something bad is happening?'",
            options: ["IDENTIFY", "PROTECT", "DETECT", "RESPOND"],
            correctAnswer: 2,
            explanation: "DETECT focuses on identifying cybersecurity events and anomalies through monitoring and detection capabilities.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq1-4",
            type: "multiple-select",
            question: "Which of the following are GOVERN categories in CSF 2.0? (Select all that apply)",
            options: [
                "Risk Management Strategy (GV.RM)",
                "Asset Management (ID.AM)",
                "Supply Chain Risk Management (GV.SC)",
                "Anomaly Detection (DE.AE)",
                "Organizational Context (GV.OC)"
            ],
            correctAnswer: [0, 2, 4],
            explanation: "GV.RM, GV.SC, and GV.OC are GOVERN categories. ID.AM is under IDENTIFY, and DE.AE is under DETECT.",
            difficulty: "hard",
            points: 25
        },
        {
            id: "cq1-5",
            type: "scenario",
            question: "Your organization has basic security policies and some training, but risk management isn't fully organization-wide. What CSF Implementation Tier best describes this?",
            options: ["Tier 1: Partial", "Tier 2: Risk Informed", "Tier 3: Repeatable", "Tier 4: Adaptive"],
            correctAnswer: 1,
            explanation: "Tier 2 (Risk Informed) is characterized by having awareness and some management approval but not organization-wide policy establishment.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "NIST CSF 2.0 has six core functions: GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER",
        "GOVERN is new in 2.0 and emphasizes board-level security oversight",
        "Each function addresses a specific question about organizational security",
        "Implementation Tiers (1-4) describe security maturity progression",
        "CSF is risk-based and applicable to all organizations"
    ]
};

// =============================================================================
// LESSON 2: Threat Landscape
// =============================================================================

export const cyberLesson2_threats: LessonContent = {
    id: "cyber-102",
    title: "Understanding the Modern Threat Landscape",
    description: "Recognize current cyber threats, attack vectors, and threat actor motivations",
    duration: "40 min",
    objectives: [
        "Identify the primary categories of cyber threats",
        "Explain common attack vectors and how they're exploited",
        "Recognize social engineering techniques",
        "Understand threat actor motivations and profiles"
    ],
    sections: [
        {
            id: "c2-1",
            title: "Threat Actor Categories",
            type: "text",
            content: `
# Who Are the Attackers?

Understanding who attacks and why is essential for effective defense.

## Nation-State Actors (APT Groups)
**Motivation**: Espionage, sabotage, political advantage
**Characteristics**:
- Highly sophisticated and well-funded
- Long-term, persistent access goals
- Target critical infrastructure, government, defense
- Examples: APT28 (Russia), APT41 (China), Lazarus (North Korea)

## Cybercriminal Organizations
**Motivation**: Financial gain
**Characteristics**:
- Operate like businesses with specialization
- Ransomware-as-a-Service (RaaS) models
- Target organizations with ability to pay
- Examples: LockBit, BlackCat, Conti (defunct but influential)

## Hacktivists
**Motivation**: Political or social causes
**Characteristics**:
- Often less sophisticated than other actors
- Aim for disruption and publicity
- DDoS attacks and defacement common
- Examples: Anonymous, various politically-motivated groups

## Insider Threats
**Motivation**: Financial gain, revenge, ideology, coercion
**Characteristics**:
- Already have legitimate access
- May be current or former employees
- Often hardest to detect
- Can cause disproportionate damage

## Script Kiddies
**Motivation**: Notoriety, curiosity, learning
**Characteristics**:
- Use pre-made tools without deep understanding
- Lower sophistication but still dangerous
- Can evolve into more serious threats
            `
        },
        {
            id: "c2-2",
            title: "Common Attack Vectors",
            type: "text",
            content: `
# Attack Vectors: How Attackers Get In

## 1. Phishing and Social Engineering
**The #1 initial access vector**

### Email Phishing
- Malicious links or attachments
- Credential harvesting pages
- Business Email Compromise (BEC)

### Spear Phishing
- Targeted attacks using personal information
- Researched, convincing pretexts
- Often targets executives (whaling)

### Vishing (Voice Phishing)
- Phone-based social engineering
- IT support impersonation
- Urgency and authority tactics

### Smishing (SMS Phishing)
- Text message attacks
- Package delivery scams
- MFA bypass attempts

---

## 2. Credential Attacks

### Password Spraying
- Common passwords against many accounts
- Avoids lockout thresholds

### Credential Stuffing
- Breached credentials reused across sites
- Automated at scale

### Brute Force
- Systematic password guessing
- Mitigated by lockout policies

---

## 3. Vulnerability Exploitation

### Zero-Day Attacks
- Previously unknown vulnerabilities
- No patch available
- Highly valuable to attackers

### N-Day Attacks
- Known vulnerabilities exploited before patching
- Often more dangerous than zero-days
- Patching delays are critical risks

---

## 4. Supply Chain Compromise

### Software Supply Chain
- Compromise of build systems
- Malicious updates (SolarWinds)
- Dependency poisoning

### Hardware Supply Chain
- Physical device manipulation
- Counterfeit components
- Pre-installed malware

---

## 5. Malware Types

### Ransomware
- Data encryption for extortion
- Double extortion (exfiltration + encryption)
- Triple extortion (add DDoS threat)

### Trojans
- Disguised as legitimate software
- Enable backdoor access

### Worms
- Self-replicating across networks
- Exploit network vulnerabilities

### Rootkits
- Deep system compromise
- Extremely difficult to detect/remove
            `
        },
        {
            id: "c2-3",
            title: "Social Engineering Deep Dive",
            type: "text",
            content: `
# Social Engineering: Exploiting Human Psychology

Social engineering exploits psychological principles rather than technical vulnerabilities. Understanding these principles helps you recognize attacks.

## Key Psychological Principles Exploited

### 1. Authority
**Technique**: Impersonating executives, IT, law enforcement
**Defense**: Verify through known channels, not contact info provided

### 2. Urgency
**Technique**: "Act now or face consequences"
**Defense**: Pause and think - legitimate requests rarely require immediate action

### 3. Fear
**Technique**: Threats of account closure, legal action, job loss
**Defense**: Recognize emotional manipulation and verify independently

### 4. Social Proof
**Technique**: "Everyone in your department has already done this"
**Defense**: Verify claims through official channels

### 5. Reciprocity
**Technique**: Offering help before requesting sensitive information
**Defense**: Be skeptical of unsolicited offers of assistance

### 6. Commitment & Consistency
**Technique**: Getting small commitments that escalate
**Defense**: Recognize escalating requests and stop

---

## Red Flags to Watch For

📧 **Email Red Flags**:
- Urgency or threats
- Generic greetings ("Dear Customer")
- Suspicious sender address
- Unexpected attachments
- Requests for credentials
- Links to unfamiliar sites

📞 **Phone Red Flags**:
- Caller ID can be spoofed
- Pressure to act immediately
- Requests for passwords or codes
- Unsolicited tech support calls
            `,
            tips: [
                "When in doubt, verify through a separate, known-good channel",
                "Legitimate organizations don't ask for passwords via email or phone",
                "Attackers research targets - personalization doesn't mean it's legitimate"
            ]
        }
    ],
    quiz: [
        {
            id: "cq2-1",
            type: "multiple-choice",
            question: "Which threat actor type is MOST motivated by financial gain?",
            options: ["Nation-state actors", "Hacktivists", "Cybercriminal organizations", "Script kiddies"],
            correctAnswer: 2,
            explanation: "Cybercriminal organizations are primarily financially motivated, operating like businesses with specialization in various attack types.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq2-2",
            type: "multiple-choice",
            question: "What is 'spear phishing' compared to regular phishing?",
            options: [
                "Uses spear-shaped malware",
                "Specifically targeted attacks using personal research",
                "Attacks on fishing industry",
                "Faster delivery of phishing emails"
            ],
            correctAnswer: 1,
            explanation: "Spear phishing involves targeted attacks where attackers research their victims to create more convincing, personalized messages.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq2-3",
            type: "scenario",
            question: "You receive an email appearing to be from your CEO urgently requesting a wire transfer. The CEO is known to be traveling. What type of attack is this likely?",
            options: ["Ransomware", "Business Email Compromise (BEC)", "DDoS attack", "SQL injection"],
            correctAnswer: 1,
            explanation: "This is a Business Email Compromise (BEC) attack, a form of spear phishing that impersonates executives to authorize fraudulent transactions.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "cq2-4",
            type: "multiple-select",
            question: "Which psychological principles do social engineers exploit? (Select all that apply)",
            options: ["Authority", "Urgency", "Encryption", "Fear", "Algorithm speed"],
            correctAnswer: [0, 1, 3],
            explanation: "Authority, urgency, and fear are key psychological principles exploited. Encryption and algorithm speed are technical concepts, not psychological principles.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "cq2-5",
            type: "multiple-choice",
            question: "Why are 'N-Day' vulnerabilities often MORE dangerous than zero-days?",
            options: [
                "They are more technically sophisticated",
                "There's a window between patch release and implementation where attackers exploit known vulnerabilities",
                "They affect newer software",
                "They're harder to understand"
            ],
            correctAnswer: 1,
            explanation: "N-Day vulnerabilities are published and patched, but organizations often delay patching. This window creates opportunity for attackers using the now-public vulnerability information.",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "Threat actors range from nation-states to individual hackers, each with different motivations",
        "Phishing remains the #1 initial access vector - email, voice, and SMS variants exist",
        "Social engineering exploits psychology: authority, urgency, fear, social proof",
        "N-Day vulnerabilities (known but unpatched) are often more dangerous than zero-days",
        "Always verify urgent requests through separate, known-good channels"
    ]
};

// =============================================================================
// LESSON 3: Security Controls
// =============================================================================

export const cyberLesson3_controls: LessonContent = {
    id: "cyber-103",
    title: "Security Controls and Best Practices",
    description: "Implement effective security controls across people, process, and technology",
    duration: "45 min",
    objectives: [
        "Categorize security controls by type (preventive, detective, corrective)",
        "Apply defense-in-depth principles",
        "Implement essential security best practices",
        "Understand zero trust architecture principles"
    ],
    sections: [
        {
            id: "c3-1",
            title: "Control Categories",
            type: "text",
            content: `
# Security Control Categories

Security controls are categorized by their function in the security lifecycle.

## By Function

### Preventive Controls
**Purpose**: Stop incidents from occurring

Examples:
- Firewalls blocking malicious traffic
- Access control lists
- Encryption
- Security awareness training
- Pre-employment background checks

### Detective Controls
**Purpose**: Identify incidents when they occur

Examples:
- Intrusion Detection Systems (IDS)
- Security Information and Event Management (SIEM)
- Log monitoring and analysis
- Anomaly detection
- Regular audits

### Corrective Controls
**Purpose**: Restore systems after incidents

Examples:
- Backup and restore procedures
- Incident response plans
- Patch management
- Antivirus remediation
- Disaster recovery plans

### Deterrent Controls
**Purpose**: Discourage attackers

Examples:
- Warning banners
- Security cameras
- Audit trails
- Publicized security measures

### Compensating Controls
**Purpose**: Alternative controls when primary controls can't be implemented

Examples:
- Additional monitoring when patching is delayed
- Manual review when automation isn't available
- Enhanced logging for legacy systems

---

## By Domain

### Technical Controls
Hardware and software measures:
- Firewalls, IDS/IPS
- Encryption
- Access controls
- Antivirus software

### Administrative Controls
Policies and procedures:
- Security policies
- Training programs
- Risk assessments
- Incident response procedures

### Physical Controls
Protecting physical assets:
- Door locks and access badges
- Security cameras
- Environmental controls
- Data center security
            `
        },
        {
            id: "c3-2",
            title: "Defense in Depth",
            type: "text",
            content: `
# Defense in Depth: Layered Security

Defense in depth is the principle that **no single security control is sufficient**. Multiple overlapping layers ensure that if one fails, others provide protection.

## The Castle Analogy

Medieval castles used multiple defensive layers:
- Moat (perimeter barrier)
- Outer walls (first line of defense)
- Inner walls (second line)
- Castle keep (final stronghold)
- Guards at each level (detection and response)

Modern cybersecurity follows the same principle.

## Security Layers

### Layer 1: Perimeter
- Firewalls
- Email security gateways
- Web application firewalls (WAF)
- DDoS protection

### Layer 2: Network
- Network segmentation
- Intrusion detection/prevention
- Network access control
- VPN for remote access

### Layer 3: Endpoint
- Endpoint Detection and Response (EDR)
- Antivirus/antimalware
- Host-based firewalls
- Device encryption

### Layer 4: Application
- Input validation
- Authentication/authorization
- Secure coding practices
- Application security testing

### Layer 5: Data
- Encryption (at rest and in transit)
- Data Loss Prevention (DLP)
- Access controls
- Data classification

### Layer 6: User
- Security awareness training
- Multi-factor authentication
- Least privilege access
- Clear acceptable use policies

---

## Why Defense in Depth Works

1. **Attackers face multiple barriers** - Each layer requires new effort
2. **Provides detection opportunities** - Failed attacks at one layer may trigger alerts
3. **Reduces single points of failure** - No one control is catastrophic if it fails
4. **Buys time for response** - Multiple layers slow attackers down
            `
        },
        {
            id: "c3-3",
            title: "Zero Trust Architecture",
            type: "text",
            content: `
# Zero Trust: Never Trust, Always Verify

**Zero Trust** is a security model that eliminates implicit trust from the network. Every access request is authenticated, authorized, and encrypted regardless of where it originates.

## Core Principles

### 1. Verify Explicitly
Always authenticate and authorize based on all available data points:
- User identity
- Device health
- Location
- Service/workload
- Data classification
- Anomalies

### 2. Use Least Privilege Access
Limit access to only what's needed:
- Just-In-Time (JIT) access
- Just-Enough-Access (JEA)
- Risk-based adaptive policies
- Data protection

### 3. Assume Breach
Minimize blast radius and segment access:
- Verify all sessions end-to-end
- Use analytics for visibility
- Drive threat detection
- Improve defenses

---

## Zero Trust Architecture Components

### Identity
- Strong authentication (MFA everywhere)
- Conditional access policies
- Identity governance
- Privileged access management

### Devices
- Device inventory and health attestation
- Compliance checking before access
- Endpoint protection requirements
- Managed device policies

### Network
- Micro-segmentation
- Encrypted all network traffic
- Real-time threat protection
- Network intelligence

### Applications
- In-app permissions
- Application proxies
- SaaS security
- Shadow IT discovery

### Data
- Data classification
- Encryption
- Access based on sensitivity
- DLP policies

### Visibility and Analytics
- Aggregate signals
- Apply AI for threat detection
- Automate responses
- Continuous improvement

---

## Transition to Zero Trust

Zero Trust is a **journey, not a destination**:

1. **Start with identity** - Strong authentication, MFA
2. **Inventory assets** - Know what you're protecting
3. **Enable visibility** - You can't protect what you can't see
4. **Segment networks** - Reduce blast radius
5. **Implement least privilege** - Reduce standing permissions
6. **Automate responses** - Use orchestration and automation
            `
        }
    ],
    quiz: [
        {
            id: "cq3-1",
            type: "multiple-choice",
            question: "A firewall that blocks malicious traffic is what type of control?",
            options: ["Detective", "Corrective", "Preventive", "Compensating"],
            correctAnswer: 2,
            explanation: "Firewalls are preventive controls - they stop malicious traffic before it can enter the network.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq3-2",
            type: "multiple-choice",
            question: "What is the core principle behind Zero Trust security?",
            options: [
                "Trust users on the internal network",
                "Never trust, always verify",
                "Trust but verify",
                "Verify once, trust forever"
            ],
            correctAnswer: 1,
            explanation: "Zero Trust's core principle is 'never trust, always verify' - every access request must be authenticated and authorized regardless of source.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "cq3-3",
            type: "multiple-select",
            question: "Which of the following are layers in defense-in-depth? (Select all that apply)",
            options: ["Perimeter", "Network", "Psychology", "Endpoint", "Application"],
            correctAnswer: [0, 1, 3, 4],
            explanation: "Perimeter, network, endpoint, and application are all valid layers. Psychology is not a defense-in-depth layer (though security awareness training addresses human factors).",
            difficulty: "medium",
            points: 15
        },
        {
            id: "cq3-4",
            type: "scenario",
            question: "Your organization can't immediately patch a critical vulnerability due to compatibility issues. What type of control should you implement?",
            options: ["Preventive control", "Detective control", "Compensating control", "Deterrent control"],
            correctAnswer: 2,
            explanation: "Compensating controls are alternative measures when primary controls can't be implemented. Enhanced monitoring, network segmentation, or WAF rules could compensate for the unpatched vulnerability.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "cq3-5",
            type: "multiple-choice",
            question: "In Zero Trust, what does 'assume breach' mean?",
            options: [
                "Always assume your organization will be attacked someday",
                "Minimize blast radius and segment access because breaches may have already occurred",
                "Assume all employees are potential insider threats",
                "Assume all vendor products are compromised"
            ],
            correctAnswer: 1,
            explanation: "'Assume breach' means designing security as if attackers may already be inside. This drives micro-segmentation, encryption, and minimal standing permissions to limit damage.",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "Controls are categorized by function: preventive, detective, corrective, deterrent, compensating",
        "Defense in depth uses multiple overlapping layers of security",
        "Zero Trust eliminates implicit trust: never trust, always verify",
        "Zero Trust journey: start with identity, inventory assets, enable visibility, segment networks",
        "Compensating controls are essential when primary controls can't be implemented"
    ]
};

// =============================================================================
// Cybersecurity Curriculum Export
// =============================================================================

export const cybersecurityCurriculum = {
    moduleId: "cybersecurity-fundamentals",
    title: "Enterprise Cybersecurity Fundamentals",
    description: "NIST CSF 2.0-aligned cybersecurity training for enterprise professionals",
    lessons: [
        cyberLesson1_nistCore,
        cyberLesson2_threats,
        cyberLesson3_controls
    ],
    totalDuration: "130 min",
    certification: {
        name: "Certified Cybersecurity Professional",
        passingScore: 80,
        validityPeriod: "1 year",
        badge: "cybersecurity-certified",
        cpeCredits: 4
    }
};

// Final Cybersecurity Assessment
export const cybersecurityFinalAssessment: QuizQuestion[] = [
    {
        id: "cyber-final-1",
        type: "scenario",
        question: "Your CISO asks you to implement controls that will 'assume breach' per Zero Trust principles. Which action BEST aligns with this?",
        options: [
            "Deploy a next-generation firewall",
            "Implement network micro-segmentation to limit lateral movement",
            "Increase security awareness training frequency",
            "Upgrade to stronger passwords"
        ],
        correctAnswer: 1,
        explanation: "'Assume breach' means limiting damage if attackers are already inside. Micro-segmentation restricts lateral movement, containing breaches to smaller segments.",
        difficulty: "hard",
        points: 25
    },
    {
        id: "cyber-final-2",
        type: "multiple-select",
        question: "Per NIST CSF 2.0, which functions address incident handling? (Select all that apply)",
        options: ["GOVERN", "PROTECT", "DETECT", "RESPOND", "RECOVER"],
        correctAnswer: [2, 3, 4],
        explanation: "DETECT identifies incidents, RESPOND handles them, and RECOVER restores operations. GOVERN and PROTECT are more about establishing foundations and preventive measures.",
        difficulty: "medium",
        points: 20
    },
    {
        id: "cyber-final-3",
        type: "scenario",
        question: "An employee reports receiving a phone call from 'IT Support' asking for their password to fix an urgent system issue. This is likely:",
        options: [
            "Legitimate IT support",
            "Vishing (voice phishing) attack",
            "Ransomware attack",
            "DDoS attack"
        ],
        correctAnswer: 1,
        explanation: "This is vishing - voice-based phishing. Legitimate IT never asks for passwords over the phone. The urgency is a classic social engineering tactic.",
        difficulty: "medium",
        points: 15
    }
];
