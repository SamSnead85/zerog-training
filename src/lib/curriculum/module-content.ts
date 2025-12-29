// ScaledNative Platform - Comprehensive Training Module Content Library
// Real industry-standard content from NIST, HIPAA, OSHA, EEOC, SAFe, and other sources

export interface ModuleSection {
    id: string;
    title: string;
    type: "reading" | "quiz" | "scenario" | "video";
    duration: string;
    content: ContentBlock[];
}

export interface ContentBlock {
    type: "heading" | "paragraph" | "list" | "keypoint" | "warning" | "tip" | "definition" | "reference";
    text?: string;
    items?: string[];
    source?: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface TrainingModuleContent {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    learningObjectives: string[];
    standards: string[];
    sections: ModuleSection[];
    finalAssessment: QuizQuestion[];
}

// ==================== NIST CYBERSECURITY FRAMEWORK 2.0 ====================
export const nistCybersecurityContent: TrainingModuleContent = {
    id: "nist-csf-2",
    title: "NIST Cybersecurity Framework 2.0",
    subtitle: "Comprehensive Security Awareness Training",
    description: "Master the NIST Cybersecurity Framework 2.0, including the six core functions: Govern, Identify, Protect, Detect, Respond, and Recover. Learn to apply industry-leading security practices in your daily work.",
    learningObjectives: [
        "Understand the NIST CSF 2.0 structure including Core, Tiers, and Profiles",
        "Apply the six core functions: Govern, Identify, Protect, Detect, Respond, Recover",
        "Recognize phishing attempts and social engineering attacks",
        "Implement strong password practices and multi-factor authentication",
        "Report security incidents following proper procedures"
    ],
    standards: ["NIST CSF 2.0", "ISO 27001", "CISA Guidelines"],
    sections: [
        {
            id: "intro",
            title: "Introduction to Cybersecurity",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Why Cybersecurity Matters" },
                { type: "paragraph", text: "Cybersecurity is everyone's responsibility. In 2024, the average cost of a data breach reached $4.88 million globally, with human error contributing to 74% of all breaches. Your actions directly impact your organization's security posture." },
                { type: "keypoint", text: "You are the first line of defense against cyber threats. Most attacks succeed because of human error, not technology failures." },
                { type: "heading", text: "The NIST Cybersecurity Framework 2.0" },
                { type: "paragraph", text: "The NIST Cybersecurity Framework (CSF) 2.0, released in February 2024, is the gold standard for organizational cybersecurity. It provides a structured approach to managing and reducing cybersecurity risk through six core functions." },
                { type: "definition", text: "NIST CSF 2.0: A voluntary framework developed by the National Institute of Standards and Technology that helps organizations of all sizes better understand, manage, and reduce their cybersecurity risk." },
                {
                    type: "list", items: [
                        "GOVERN (New in 2.0) - Establish cybersecurity strategy and oversight",
                        "IDENTIFY - Understand your assets and risks",
                        "PROTECT - Implement safeguards",
                        "DETECT - Monitor for anomalies",
                        "RESPOND - Take action during incidents",
                        "RECOVER - Restore operations after incidents"
                    ]
                },
                { type: "reference", text: "NIST Cybersecurity Framework 2.0", source: "https://www.nist.gov/cyberframework" }
            ]
        },
        {
            id: "govern",
            title: "GOVERN: Cybersecurity Leadership",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "The New Govern Function" },
                { type: "paragraph", text: "The GOVERN function is new in CSF 2.0 and emphasizes that cybersecurity is a source of enterprise risk that must be managed alongside other risks such as financial, legal, and operational risks." },
                { type: "keypoint", text: "Cybersecurity governance means everyone from the C-suite to every employee understands their role in protecting the organization." },
                { type: "heading", text: "Your Governance Responsibilities" },
                {
                    type: "list", items: [
                        "Know and follow your organization's security policies",
                        "Understand the acceptable use policy for technology",
                        "Report security concerns through proper channels",
                        "Complete required security training on time",
                        "Keep informed about security updates and announcements"
                    ]
                },
                { type: "warning", text: "Policy violations can result in disciplinary action, including termination. More importantly, they put the entire organization at risk." }
            ]
        },
        {
            id: "identify",
            title: "IDENTIFY: Know Your Assets & Risks",
            type: "reading",
            duration: "7 min",
            content: [
                { type: "heading", text: "Asset Identification" },
                { type: "paragraph", text: "You cannot protect what you don't know you have. The IDENTIFY function focuses on understanding your organization's assets, business environment, and the cybersecurity risks to those assets." },
                { type: "heading", text: "Types of Assets You Handle" },
                {
                    type: "list", items: [
                        "Hardware: Laptops, phones, USB drives, printers",
                        "Software: Applications, licenses, cloud services",
                        "Data: Customer information, financial records, intellectual property",
                        "People: Employee credentials, access rights, training records"
                    ]
                },
                { type: "tip", text: "Inventory your devices regularly. Know what data is stored on each device and ensure it's properly protected." },
                { type: "heading", text: "Risk Assessment Basics" },
                { type: "paragraph", text: "Risk = Threat × Vulnerability × Impact. Understanding this equation helps you prioritize security measures." },
                { type: "definition", text: "Threat: Any circumstance or event with the potential to harm organizational operations, assets, or individuals through unauthorized access, destruction, disclosure, or modification of information." }
            ]
        },
        {
            id: "protect",
            title: "PROTECT: Implementing Safeguards",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Password Security" },
                { type: "paragraph", text: "Strong passwords are your first line of defense. According to NIST guidelines, good passwords should be long, unique, and not easily guessable." },
                { type: "keypoint", text: "NIST recommends passphrases of 15+ characters. Example: 'correct-horse-battery-staple' is stronger than 'P@ssw0rd!'" },
                {
                    type: "list", items: [
                        "Use at least 15 characters (longer is better)",
                        "Never reuse passwords across accounts",
                        "Use a password manager to store passwords securely",
                        "Enable multi-factor authentication (MFA) everywhere possible",
                        "Never share passwords via email, text, or phone"
                    ]
                },
                { type: "heading", text: "Multi-Factor Authentication (MFA)" },
                { type: "definition", text: "MFA: A security method that requires two or more verification factors: something you know (password), something you have (phone/token), or something you are (biometric)." },
                { type: "paragraph", text: "MFA blocks 99.9% of automated attacks. Even if your password is compromised, attackers cannot access your account without the second factor." },
                { type: "heading", text: "Physical Security" },
                {
                    type: "list", items: [
                        "Lock your computer when stepping away (Windows: Win+L, Mac: Ctrl+Cmd+Q)",
                        "Don't leave sensitive documents on your desk (clean desk policy)",
                        "Shred confidential papers before disposing",
                        "Don't hold doors for tailgaters - everyone should badge in",
                        "Report lost or stolen devices immediately"
                    ]
                },
                { type: "reference", text: "NIST Special Publication 800-63B: Digital Identity Guidelines", source: "https://pages.nist.gov/800-63-3/sp800-63b.html" }
            ]
        },
        {
            id: "phishing-quiz",
            title: "Knowledge Check: Phishing & Social Engineering",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "detect",
            title: "DETECT: Recognizing Threats",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Phishing: The #1 Attack Vector" },
                { type: "paragraph", text: "Phishing attacks account for over 90% of successful cyber attacks. Attackers craft emails, texts, or calls that appear legitimate to trick you into revealing credentials or installing malware." },
                { type: "heading", text: "Red Flags in Phishing Emails" },
                {
                    type: "list", items: [
                        "Urgent language: 'Act now or your account will be suspended!'",
                        "Suspicious sender addresses (look closely at the domain)",
                        "Generic greetings: 'Dear Customer' instead of your name",
                        "Unexpected attachments or links",
                        "Requests for login credentials or personal information",
                        "Poor grammar or spelling (though AI has improved this)",
                        "Mismatched URLs (hover to see actual destination)"
                    ]
                },
                { type: "warning", text: "Never click links in unexpected emails. Go directly to the website by typing the URL yourself or using a bookmark." },
                { type: "heading", text: "Social Engineering Tactics" },
                { type: "definition", text: "Social Engineering: Psychological manipulation of people into performing actions or divulging confidential information." },
                {
                    type: "list", items: [
                        "Pretexting: Creating a fabricated scenario to steal information",
                        "Baiting: Offering something enticing (free USB drive with malware)",
                        "Quid Pro Quo: Offering a service in exchange for information",
                        "Tailgating: Following authorized personnel into secure areas",
                        "Vishing: Voice phishing via phone calls"
                    ]
                }
            ]
        },
        {
            id: "scenario-email",
            title: "Scenario: Suspicious Email",
            type: "scenario",
            duration: "5 min",
            content: [
                { type: "heading", text: "Real-World Scenario" },
                { type: "paragraph", text: "You receive an email from 'IT-Support@yourcompany-secure.com' asking you to verify your credentials due to a recent security upgrade. The email includes a link to reset your password." },
                { type: "keypoint", text: "What would you do? Think before you click!" }
            ]
        },
        {
            id: "respond",
            title: "RESPOND: When Incidents Occur",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "Incident Response Is Everyone's Job" },
                { type: "paragraph", text: "When a security incident occurs, your response in the first minutes can make the difference between a contained issue and a major breach." },
                { type: "heading", text: "What to Report" },
                {
                    type: "list", items: [
                        "Suspicious emails or messages you received",
                        "Unusual computer behavior (crashes, slowdowns, pop-ups)",
                        "Lost or stolen devices",
                        "Unauthorized access attempts",
                        "Accidental data exposure",
                        "Physical security concerns (tailgating, suspicious persons)"
                    ]
                },
                { type: "keypoint", text: "When in doubt, report it! It's better to report a non-issue than to miss a real threat." },
                { type: "heading", text: "How to Report" },
                { type: "paragraph", text: "Contact your IT Security team or use your organization's incident reporting system immediately. Include: what happened, when it happened, what systems or data may be affected, and any actions you've already taken." },
                { type: "tip", text: "Save your IT Security team's contact information in your phone so you can reach them quickly in an emergency." }
            ]
        },
        {
            id: "recover",
            title: "RECOVER: Business Continuity",
            type: "reading",
            duration: "5 min",
            content: [
                { type: "heading", text: "Recovery and Resilience" },
                { type: "paragraph", text: "The RECOVER function focuses on restoring capabilities or services that were impaired during a cybersecurity incident. Your role in recovery may include following business continuity procedures and participating in lessons learned." },
                { type: "heading", text: "Your Recovery Responsibilities" },
                {
                    type: "list", items: [
                        "Know your organization's business continuity plan",
                        "Back up important work data regularly",
                        "Know alternative communication methods if email is down",
                        "Participate in incident retrospectives to improve future response",
                        "Update security practices based on lessons learned"
                    ]
                },
                { type: "tip", text: "Ask your manager where to find the business continuity plan and what your specific role is during an incident." }
            ]
        },
        {
            id: "final-assessment",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "q1",
            question: "What is the newest function added in NIST CSF 2.0?",
            options: ["Identify", "Protect", "Govern", "Detect"],
            correctIndex: 2,
            explanation: "GOVERN is the new function added in CSF 2.0. It emphasizes that cybersecurity is a source of enterprise risk that senior leadership must manage alongside other business risks."
        },
        {
            id: "q2",
            question: "According to NIST guidelines, what is the recommended minimum password length?",
            options: ["8 characters", "10 characters", "12 characters", "15+ characters"],
            correctIndex: 3,
            explanation: "NIST SP 800-63B recommends passwords of at least 15 characters. Longer passwords are significantly harder to crack."
        },
        {
            id: "q3",
            question: "What percentage of cyber attacks involve phishing?",
            options: ["50%", "70%", "80%", "90%+"],
            correctIndex: 3,
            explanation: "Over 90% of successful cyber attacks begin with a phishing email. This is why user awareness training is critical."
        },
        {
            id: "q4",
            question: "What should you do if you receive a suspicious email asking for your password?",
            options: [
                "Click the link to verify if it's real",
                "Reply asking for more information",
                "Report it to IT Security and delete it",
                "Forward it to colleagues for their opinion"
            ],
            correctIndex: 2,
            explanation: "Never click links or reply to suspicious emails. Report it to your IT Security team immediately so they can investigate and warn others."
        },
        {
            id: "q5",
            question: "What does MFA stand for and why is it important?",
            options: [
                "Multiple Factor Analysis - for risk assessment",
                "Multi-Factor Authentication - blocks 99.9% of automated attacks",
                "Managed Firewall Access - protects network boundaries",
                "Maximum File Allowance - limits data storage"
            ],
            correctIndex: 1,
            explanation: "Multi-Factor Authentication requires two or more verification factors, making it extremely difficult for attackers to access accounts even if they have the password."
        }
    ]
};

// ==================== HIPAA COMPLIANCE TRAINING ====================
export const hipaaComplianceContent: TrainingModuleContent = {
    id: "hipaa-compliance",
    title: "HIPAA Compliance Training",
    subtitle: "Protecting Patient Health Information",
    description: "Comprehensive HIPAA training covering the Privacy Rule, Security Rule, and Breach Notification Rule. Learn to handle Protected Health Information (PHI) properly and maintain compliance.",
    learningObjectives: [
        "Define Protected Health Information (PHI) and electronic PHI (ePHI)",
        "Understand the HIPAA Privacy Rule and patient rights",
        "Apply the Security Rule's administrative, physical, and technical safeguards",
        "Recognize and report potential HIPAA breaches",
        "Follow the Minimum Necessary standard in daily work"
    ],
    standards: ["HIPAA Privacy Rule", "HIPAA Security Rule", "HITECH Act", "HHS OCR Guidelines"],
    sections: [
        {
            id: "hipaa-intro",
            title: "Introduction to HIPAA",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is HIPAA?" },
                { type: "paragraph", text: "The Health Insurance Portability and Accountability Act (HIPAA) of 1996 is a federal law that established national standards to protect sensitive patient health information from disclosure without consent or knowledge." },
                { type: "definition", text: "HIPAA: A federal law that creates national standards to protect individuals' medical records and other personal health information." },
                { type: "heading", text: "Who Must Comply?" },
                {
                    type: "list", items: [
                        "Covered Entities: Health plans, healthcare clearinghouses, healthcare providers who transmit health information electronically",
                        "Business Associates: Vendors, contractors, and other entities that handle PHI on behalf of covered entities",
                        "All Workforce Members: Employees, volunteers, trainees, and anyone with access to PHI"
                    ]
                },
                { type: "keypoint", text: "If you can access patient information, HIPAA applies to you. This includes clinical staff, administrative personnel, IT professionals, and even cleaning staff who might see patient information." },
                { type: "heading", text: "Penalties for Violations" },
                { type: "paragraph", text: "HIPAA violations can result in severe penalties ranging from $100 to $50,000 per violation, with an annual maximum of $1.5 million per violation category. Criminal penalties can include imprisonment up to 10 years." },
                { type: "warning", text: "Individual employees can be held personally liable for HIPAA violations. Ignorance of the law is not a valid defense." },
                { type: "reference", text: "HHS Office for Civil Rights - HIPAA for Professionals", source: "https://www.hhs.gov/hipaa/for-professionals/index.html" }
            ]
        },
        {
            id: "phi",
            title: "Protected Health Information (PHI)",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "What is PHI?" },
                { type: "definition", text: "Protected Health Information (PHI): Any individually identifiable health information that is created, received, maintained, or transmitted by a covered entity or business associate." },
                { type: "paragraph", text: "PHI is health information that can be linked to a specific individual. This linkage is what makes the information 'protected' under HIPAA." },
                { type: "heading", text: "The 18 HIPAA Identifiers" },
                { type: "paragraph", text: "HIPAA defines 18 specific identifiers that can make health information individually identifiable:" },
                {
                    type: "list", items: [
                        "1. Names",
                        "2. Geographic data smaller than state",
                        "3. Dates (except year) related to an individual",
                        "4. Phone numbers",
                        "5. Fax numbers",
                        "6. Email addresses",
                        "7. Social Security Numbers",
                        "8. Medical Record Numbers",
                        "9. Health plan beneficiary numbers",
                        "10. Account numbers",
                        "11. Certificate/license numbers",
                        "12. Vehicle identifiers and serial numbers",
                        "13. Device identifiers and serial numbers",
                        "14. Web URLs",
                        "15. IP addresses",
                        "16. Biometric identifiers",
                        "17. Full-face photographs",
                        "18. Any other unique identifying number"
                    ]
                },
                { type: "heading", text: "Examples of PHI" },
                {
                    type: "list", items: [
                        "Medical records and test results",
                        "Insurance claims and billing information",
                        "Appointment schedules",
                        "Prescription records",
                        "Conversations between healthcare providers about patients",
                        "Photos of patients or their body parts",
                        "Emails or text messages containing patient information"
                    ]
                },
                { type: "tip", text: "When in doubt, treat it as PHI. It's better to over-protect than to accidentally disclose protected information." }
            ]
        },
        {
            id: "privacy-rule",
            title: "The HIPAA Privacy Rule",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "Privacy Rule Overview" },
                { type: "paragraph", text: "The Privacy Rule establishes national standards for when PHI may be used and disclosed. It also gives patients rights over their health information." },
                { type: "heading", text: "Key Patient Rights" },
                {
                    type: "list", items: [
                        "Right to Access: Patients can request copies of their medical records",
                        "Right to Amend: Patients can request corrections to their records",
                        "Right to Accounting: Patients can request a list of disclosures",
                        "Right to Restrict: Patients can request restrictions on certain uses",
                        "Right to Confidential Communications: Patients can request alternative methods of contact",
                        "Right to Notice: Patients must receive a Notice of Privacy Practices"
                    ]
                },
                { type: "heading", text: "The Minimum Necessary Standard" },
                { type: "keypoint", text: "Only access, use, or disclose the minimum amount of PHI necessary to accomplish the intended purpose. 'Need to know' is the guiding principle." },
                { type: "paragraph", text: "For example, if you need to verify a patient's appointment, you don't need to access their complete medical history. Access only what's required for the task." },
                { type: "heading", text: "Permitted Uses and Disclosures" },
                { type: "paragraph", text: "PHI may be used or disclosed without patient authorization for:" },
                {
                    type: "list", items: [
                        "Treatment: Providing, coordinating, or managing patient care",
                        "Payment: Billing and collection activities",
                        "Healthcare Operations: Quality assessment, training, compliance",
                        "Public Health: Reporting diseases, vital statistics",
                        "Law Enforcement: When required by law or court order",
                        "Emergency Situations: When patient cannot provide consent"
                    ]
                },
                { type: "warning", text: "All other uses and disclosures require written patient authorization." }
            ]
        },
        {
            id: "security-rule",
            title: "The HIPAA Security Rule",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Security Rule Overview" },
                { type: "paragraph", text: "The Security Rule specifically focuses on electronic PHI (ePHI) and requires covered entities to implement safeguards to protect the confidentiality, integrity, and availability of ePHI." },
                { type: "heading", text: "Three Types of Safeguards" },
                { type: "definition", text: "Administrative Safeguards: Policies, procedures, and workforce training to manage the selection, development, and implementation of security measures." },
                {
                    type: "list", items: [
                        "Security management processes and risk assessments",
                        "Assigned security responsibility",
                        "Workforce training and awareness",
                        "Access management and authorization",
                        "Contingency planning"
                    ]
                },
                { type: "definition", text: "Physical Safeguards: Physical measures, policies, and procedures to protect electronic systems by limiting physical access to facilities and workstations." },
                {
                    type: "list", items: [
                        "Facility access controls",
                        "Workstation use and security",
                        "Device and media controls",
                        "Secure disposal of devices and media"
                    ]
                },
                { type: "definition", text: "Technical Safeguards: Technology and related policies and procedures that protect ePHI and control access to it." },
                {
                    type: "list", items: [
                        "Access controls (unique user IDs, automatic logoff)",
                        "Audit controls (log access to ePHI)",
                        "Integrity controls (prevent unauthorized alterations)",
                        "Transmission security (encryption)"
                    ]
                },
                { type: "keypoint", text: "Encryption is strongly recommended for all ePHI, especially data transmitted over networks or stored on portable devices." }
            ]
        },
        {
            id: "hipaa-quiz",
            title: "Knowledge Check: PHI Handling",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "breach-notification",
            title: "Breach Notification",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is a Breach?" },
                { type: "definition", text: "Breach: An impermissible use or disclosure of PHI that compromises the security or privacy of the information." },
                { type: "paragraph", text: "Not every incident is a breach. A breach is presumed unless the organization demonstrates a low probability that PHI was compromised based on a risk assessment." },
                { type: "heading", text: "Breach Notification Requirements" },
                {
                    type: "list", items: [
                        "Affected individuals must be notified within 60 days",
                        "HHS Secretary must be notified (timing depends on breach size)",
                        "Media notification required if breach affects 500+ individuals in a state",
                        "Business associates must notify covered entities"
                    ]
                },
                { type: "heading", text: "Common Causes of Breaches" },
                {
                    type: "list", items: [
                        "Lost or stolen devices containing ePHI",
                        "Unauthorized access by employees (snooping)",
                        "Phishing attacks and malware",
                        "Improper disposal of records",
                        "Sending PHI to wrong recipients",
                        "Unencrypted email containing PHI"
                    ]
                },
                { type: "warning", text: "If you suspect a breach has occurred, report it immediately. Do not attempt to investigate on your own." },
                { type: "reference", text: "HHS Breach Notification Rule", source: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html" }
            ]
        },
        {
            id: "scenario-disposal",
            title: "Scenario: Proper Document Disposal",
            type: "scenario",
            duration: "5 min",
            content: [
                { type: "heading", text: "Real-World Scenario" },
                { type: "paragraph", text: "You're cleaning your office and find old patient appointment printouts from last month. The trash can is right next to you. What's the proper way to dispose of these documents?" }
            ]
        },
        {
            id: "hipaa-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "hq1",
            question: "Which of the following is NOT one of the 18 HIPAA identifiers?",
            options: ["Social Security Number", "Blood type", "Email address", "Vehicle serial number"],
            correctIndex: 1,
            explanation: "Blood type alone is not one of the 18 HIPAA identifiers. However, blood type combined with any identifier (like a name) becomes PHI."
        },
        {
            id: "hq2",
            question: "What does the Minimum Necessary standard require?",
            options: [
                "Always get the minimum amount of patient information possible",
                "Use or disclose only the minimum PHI needed for the purpose",
                "Minimize the number of people who can access records",
                "Keep medical records for the minimum required time"
            ],
            correctIndex: 1,
            explanation: "The Minimum Necessary standard requires that you only access, use, or disclose the minimum amount of PHI needed to accomplish the intended purpose."
        },
        {
            id: "hq3",
            question: "Which of the following requires patient authorization?",
            options: [
                "Sharing records with the patient's treating physician",
                "Submitting a claim to insurance",
                "Selling patient information to a marketing company",
                "Reporting a disease to public health authorities"
            ],
            correctIndex: 2,
            explanation: "Selling patient information requires written authorization. Treatment, payment, and public health reporting are permitted without authorization."
        },
        {
            id: "hq4",
            question: "Within how many days must affected individuals be notified of a breach?",
            options: ["30 days", "60 days", "90 days", "120 days"],
            correctIndex: 1,
            explanation: "The Breach Notification Rule requires notification to affected individuals within 60 calendar days of discovering the breach."
        },
        {
            id: "hq5",
            question: "A laptop containing patient data is stolen from an employee's car. What should the employee do FIRST?",
            options: [
                "Wait to see if the laptop is found",
                "Report the theft immediately to their supervisor and security team",
                "Try to track the laptop themselves",
                "File a police report before telling anyone at work"
            ],
            correctIndex: 1,
            explanation: "The employee should immediately report the theft to their supervisor and security team. This allows the organization to begin the breach investigation and notification process as required by law."
        }
    ]
};

// ==================== SAFe 6.0 AGILIST TRAINING ====================
export const safeAgilistContent: TrainingModuleContent = {
    id: "safe-agilist-6",
    title: "SAFe 6.0 Leading SAFe",
    subtitle: "Scaled Agile Framework for Enterprise",
    description: "Comprehensive SAFe 6.0 training covering Lean-Agile principles, Agile Release Trains, PI Planning, and leading SAFe transformation. Prepare for SAFe Agilist certification.",
    learningObjectives: [
        "Understand SAFe 6.0 structure: Core, Large Solution, and Portfolio levels",
        "Apply the 10 SAFe Principles in your organization",
        "Lead and participate in PI Planning events",
        "Manage Agile Release Trains (ARTs) effectively",
        "Implement Lean Portfolio Management practices"
    ],
    standards: ["SAFe 6.0", "Scaled Agile Framework", "Lean-Agile Principles"],
    sections: [
        {
            id: "safe-intro",
            title: "Introduction to SAFe",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "What is SAFe?" },
                { type: "paragraph", text: "The Scaled Agile Framework (SAFe) is the world's leading framework for scaling Agile across the enterprise. SAFe 6.0, released in March 2023, helps organizations achieve business agility through Lean-Agile principles and practices." },
                { type: "definition", text: "SAFe: A knowledge base of proven, integrated principles, practices, and competencies for achieving Business Agility using Lean, Agile, and DevOps." },
                { type: "heading", text: "Why SAFe?" },
                {
                    type: "list", items: [
                        "70% of Fortune 100 companies have SAFe practitioners",
                        "35% faster time-to-market",
                        "50% increase in productivity",
                        "25-75% reduction in defects",
                        "Higher employee engagement and job satisfaction"
                    ]
                },
                { type: "heading", text: "SAFe Core Values" },
                {
                    type: "list", items: [
                        "Alignment: Keep everyone moving toward the same goals",
                        "Built-in Quality: Never compromise on quality",
                        "Transparency: Trust through visibility",
                        "Program Execution: Deliver value reliably"
                    ]
                },
                { type: "reference", text: "Scaled Agile Framework", source: "https://scaledagileframework.com/" }
            ]
        },
        {
            id: "lean-agile",
            title: "Lean-Agile Mindset",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The House of Lean" },
                { type: "paragraph", text: "Lean thinking is the foundation of SAFe. The 'House of Lean' metaphor illustrates how Lean principles support the goal of delivering maximum value in the shortest sustainable lead time." },
                { type: "keypoint", text: "Value: The goal of Lean is to deliver the maximum customer value in the shortest sustainable lead time while providing the highest quality to customers and society." },
                { type: "heading", text: "Lean Pillars" },
                {
                    type: "list", items: [
                        "Respect for People and Culture",
                        "Flow: Continuous movement of value",
                        "Innovation: Encourage creative problem-solving",
                        "Relentless Improvement: Kaizen mindset"
                    ]
                },
                { type: "heading", text: "The Agile Manifesto Values" },
                {
                    type: "list", items: [
                        "Individuals and interactions over processes and tools",
                        "Working software over comprehensive documentation",
                        "Customer collaboration over contract negotiation",
                        "Responding to change over following a plan"
                    ]
                },
                { type: "paragraph", text: "While there is value in the items on the right, we value the items on the left more." },
                { type: "tip", text: "Leaders must model the Lean-Agile mindset. Your team watches what you do, not just what you say." }
            ]
        },
        {
            id: "principles",
            title: "The 10 SAFe Principles",
            type: "reading",
            duration: "15 min",
            content: [
                { type: "heading", text: "Principles Over Practices" },
                { type: "paragraph", text: "SAFe is built on 10 immutable, underlying Lean-Agile principles. These principles guide everyone in the enterprise in their decisions and actions." },
                { type: "heading", text: "The 10 SAFe Principles" },
                {
                    type: "list", items: [
                        "1. Take an economic view - Deliver early and often, understand the economic framework",
                        "2. Apply systems thinking - Optimize the whole, not just parts",
                        "3. Assume variability; preserve options - Keep options open as long as possible",
                        "4. Build incrementally with fast, integrated learning cycles - Short cycles, fast feedback",
                        "5. Base milestones on objective evaluation of working systems - Demo, don't document",
                        "6. Visualize and limit WIP, reduce batch sizes, manage queue lengths - Flow, flow, flow",
                        "7. Apply cadence, synchronize with cross-domain planning - Regular rhythms create predictability",
                        "8. Unlock the intrinsic motivation of knowledge workers - Autonomy, mastery, purpose",
                        "9. Decentralize decision-making - Move decisions to where the information is",
                        "10. Organize around value - Structure around value streams, not functions"
                    ]
                },
                { type: "keypoint", text: "Principle #1 (Take an Economic View) is paramount. Every decision should consider the economic impact of delay and the cost of implementation." },
                { type: "definition", text: "Cost of Delay (CoD): The economic impact of not delivering a feature or capability. Used in prioritization frameworks like WSJF." }
            ]
        },
        {
            id: "art",
            title: "Agile Release Trains (ARTs)",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "What is an ART?" },
                { type: "definition", text: "Agile Release Train (ART): A long-lived team of Agile teams that incrementally develops, delivers, and (where applicable) operates one or more solutions in a value stream." },
                { type: "paragraph", text: "The ART is the primary value delivery vehicle in SAFe. It typically consists of 50-125 people organized into 5-12 Agile teams, all aligned to a common mission." },
                { type: "heading", text: "ART Characteristics" },
                {
                    type: "list", items: [
                        "Aligned to a single value stream or significant portion of one",
                        "Long-lived (not formed and reformed for each project)",
                        "Operates on a fixed Program Increment (PI) cadence",
                        "Has all capabilities needed to deliver value",
                        "Plans together, commits together, delivers together"
                    ]
                },
                { type: "heading", text: "Key ART Roles" },
                {
                    type: "list", items: [
                        "Release Train Engineer (RTE): Servant leader and coach for the ART",
                        "Product Management: Owns the Program Backlog",
                        "System Architect: Technical leader for the solution",
                        "Business Owners: Key stakeholders who evaluate fitness for use"
                    ]
                },
                { type: "tip", text: "Think of the ART as a 'team of teams.' Individual team success is less important than ART success." }
            ]
        },
        {
            id: "pi-planning",
            title: "PI Planning",
            type: "reading",
            duration: "15 min",
            content: [
                { type: "heading", text: "The Heartbeat of SAFe" },
                { type: "paragraph", text: "PI Planning is a cadence-based, face-to-face event that serves as the heartbeat of the Agile Release Train. It aligns all teams to a shared mission and vision." },
                { type: "definition", text: "Program Increment (PI): A fixed timebox (typically 8-12 weeks) during which an ART delivers incremental value in the form of working, tested software and systems." },
                { type: "heading", text: "PI Planning Agenda (2-Day Event)" },
                { type: "paragraph", text: "Day 1:" },
                {
                    type: "list", items: [
                        "Business Context and Vision (1.5 hours)",
                        "Architecture Vision and Development Practices (1.5 hours)",
                        "Team Breakouts - Draft Plan (3 hours)",
                        "Draft Plan Review - Management review of each team's plan"
                    ]
                },
                { type: "paragraph", text: "Day 2:" },
                {
                    type: "list", items: [
                        "Planning Adjustments (1 hour)",
                        "Team Breakouts - Finalize Plans (2 hours)",
                        "Final Plan Review and Commitment (2 hours)",
                        "PI Planning Retrospective and Next Steps (1 hour)"
                    ]
                },
                { type: "heading", text: "Outputs of PI Planning" },
                {
                    type: "list", items: [
                        "Committed PI Objectives for each team",
                        "Program Board showing feature deliveries and dependencies",
                        "Confidence vote from all teams",
                        "Risks identified (ROAM: Resolved, Owned, Accepted, Mitigated)"
                    ]
                },
                { type: "keypoint", text: "PI Planning builds alignment and trust. Everyone hears the same message, understands the priorities, and commits together." },
                { type: "reference", text: "SAFe PI Planning", source: "https://scaledagileframework.com/pi-planning/" }
            ]
        },
        {
            id: "safe-quiz",
            title: "Knowledge Check: SAFe Concepts",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "lpm",
            title: "Lean Portfolio Management",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Portfolio Level in SAFe" },
                { type: "paragraph", text: "Lean Portfolio Management (LPM) applies Lean and systems thinking to strategy, investment funding, governance, and Agile portfolio operations." },
                { type: "heading", text: "LPM Responsibilities" },
                {
                    type: "list", items: [
                        "Strategy and Investment Funding: Align portfolio to strategy, fund value streams",
                        "Agile Portfolio Operations: Coordinate value streams, manage dependencies",
                        "Lean Governance: Continuous compliance, minimal viable bureaucracy"
                    ]
                },
                { type: "heading", text: "Participatory Budgeting" },
                { type: "paragraph", text: "Instead of project-by-project funding (which creates waste), SAFe recommends funding value streams. Value streams have stable, long-lived teams that can be right-sized based on demand." },
                { type: "keypoint", text: "Fund value streams, not projects. This reduces the overhead of project-based funding and creates stable, productive teams." },
                { type: "heading", text: "WSJF Prioritization" },
                { type: "definition", text: "Weighted Shortest Job First (WSJF): A prioritization model calculated as Cost of Delay divided by job size. Higher WSJF = higher priority." },
                { type: "paragraph", text: "WSJF = (Business Value + Time Criticality + Risk Reduction) / Job Size" }
            ]
        },
        {
            id: "safe-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "sq1",
            question: "What are the four SAFe Core Values?",
            options: [
                "Speed, Quality, Innovation, Collaboration",
                "Alignment, Built-in Quality, Transparency, Program Execution",
                "Lean, Agile, DevOps, Customer Focus",
                "Trust, Respect, Commitment, Courage"
            ],
            correctIndex: 1,
            explanation: "The four SAFe Core Values are Alignment, Built-in Quality, Transparency, and Program Execution. These values guide all SAFe implementations."
        },
        {
            id: "sq2",
            question: "What is an Agile Release Train (ART)?",
            options: [
                "A project team formed for a specific initiative",
                "A long-lived team of teams aligned to a value stream",
                "A training program for Agile coaches",
                "A software release management tool"
            ],
            correctIndex: 1,
            explanation: "An ART is a long-lived team of Agile teams (typically 50-125 people) that incrementally develops, delivers, and operates one or more solutions in a value stream."
        },
        {
            id: "sq3",
            question: "What is the typical duration of a Program Increment (PI)?",
            options: ["2-4 weeks", "6-8 weeks", "8-12 weeks", "12-16 weeks"],
            correctIndex: 2,
            explanation: "A Program Increment is typically 8-12 weeks (often 5 development iterations plus 1 Innovation and Planning iteration)."
        },
        {
            id: "sq4",
            question: "Which SAFe Principle states 'Optimize the whole, not just parts'?",
            options: [
                "#1 Take an economic view",
                "#2 Apply systems thinking",
                "#6 Visualize and limit WIP",
                "#10 Organize around value"
            ],
            correctIndex: 1,
            explanation: "Principle #2, Apply Systems Thinking, emphasizes optimizing the entire value stream rather than individual components or teams."
        },
        {
            id: "sq5",
            question: "What does WSJF stand for?",
            options: [
                "Work Stream Job Flow",
                "Weighted Shortest Job First",
                "Weekly Sprint Journal Format",
                "Waterfall-Scrum Joint Framework"
            ],
            correctIndex: 1,
            explanation: "WSJF (Weighted Shortest Job First) is a prioritization model that calculates priority based on Cost of Delay divided by job size."
        }
    ]
};

// ==================== WORKPLACE HARASSMENT PREVENTION ====================
export const harassmentPreventionContent: TrainingModuleContent = {
    id: "harassment-prevention",
    title: "Workplace Harassment Prevention",
    subtitle: "Creating a Respectful and Inclusive Workplace",
    description: "Comprehensive training on preventing harassment and discrimination in the workplace. Learn to identify, prevent, and report inappropriate behavior.",
    learningObjectives: [
        "Identify different types of workplace harassment and discrimination",
        "Understand employer and employee responsibilities",
        "Recognize warning signs and patterns of harassment",
        "Know the proper procedures for reporting incidents",
        "Contribute to a respectful and inclusive workplace culture"
    ],
    standards: ["EEOC Guidelines", "Title VII", "State Laws"],
    sections: [
        {
            id: "harassment-intro",
            title: "Understanding Workplace Harassment",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is Workplace Harassment?" },
                { type: "definition", text: "Workplace Harassment: Unwelcome conduct based on a protected characteristic that is severe or pervasive enough to create a hostile work environment or results in adverse employment action." },
                { type: "heading", text: "Protected Characteristics (Federal)" },
                {
                    type: "list", items: [
                        "Race and Color",
                        "Religion",
                        "Sex (including pregnancy, sexual orientation, gender identity)",
                        "National Origin",
                        "Age (40 and over)",
                        "Disability",
                        "Genetic Information"
                    ]
                },
                { type: "paragraph", text: "Many states and localities provide additional protections, such as marital status, political affiliation, or military status." },
                { type: "keypoint", text: "Harassment is about impact, not intent. Even well-meaning comments can constitute harassment if they create a hostile environment for the recipient." },
                { type: "reference", text: "EEOC Harassment Guidelines", source: "https://www.eeoc.gov/harassment" }
            ]
        },
        {
            id: "types",
            title: "Types of Harassment",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Sexual Harassment" },
                { type: "paragraph", text: "Sexual harassment includes unwelcome sexual advances, requests for sexual favors, and other verbal or physical harassment of a sexual nature." },
                { type: "definition", text: "Quid Pro Quo: 'This for that' harassment where employment decisions are based on submission to sexual conduct." },
                { type: "definition", text: "Hostile Work Environment: Conduct that is severe or pervasive enough to create an intimidating, hostile, or offensive work environment." },
                { type: "heading", text: "Examples of Sexual Harassment" },
                {
                    type: "list", items: [
                        "Unwanted touching or physical contact",
                        "Sexual jokes, comments, or innuendos",
                        "Sharing explicit images or materials",
                        "Repeated requests for dates after being refused",
                        "Comments about someone's body or appearance",
                        "Staring or leering"
                    ]
                },
                { type: "heading", text: "Non-Sexual Harassment" },
                { type: "paragraph", text: "Harassment based on any protected characteristic follows the same legal standards. Examples include:" },
                {
                    type: "list", items: [
                        "Racial slurs or stereotyping",
                        "Religious ridicule or exclusion",
                        "Mocking accents or cultural practices",
                        "Ageist comments ('OK boomer,' 'too old to learn')",
                        "Disability-related comments or exclusion"
                    ]
                },
                { type: "warning", text: "The harasser can be anyone: supervisors, co-workers, customers, vendors, or contractors." }
            ]
        },
        {
            id: "bystander",
            title: "Bystander Intervention",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "The Power of Bystanders" },
                { type: "paragraph", text: "Bystanders play a crucial role in preventing and addressing harassment. Research shows that harassment is less likely to continue when bystanders intervene." },
                { type: "heading", text: "The 5 D's of Bystander Intervention" },
                {
                    type: "list", items: [
                        "Direct: Directly address the behavior. 'That's not appropriate.'",
                        "Distract: Create a distraction to interrupt the situation.",
                        "Delegate: Ask someone else to help (HR, manager, security).",
                        "Delay: Check in with the target after the incident.",
                        "Document: Write down what you saw for potential reports."
                    ]
                },
                { type: "keypoint", text: "You don't have to be confrontational. Sometimes just asking 'Is everything OK here?' can interrupt inappropriate behavior." },
                { type: "tip", text: "Consider your safety first. If a situation seems dangerous, call for help rather than intervening directly." }
            ]
        },
        {
            id: "harassment-quiz",
            title: "Knowledge Check: Recognizing Harassment",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "reporting",
            title: "Reporting Procedures",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "How to Report" },
                { type: "paragraph", text: "If you experience or witness harassment, you have multiple options for reporting:" },
                {
                    type: "list", items: [
                        "Report to your immediate supervisor (unless they are involved)",
                        "Report to HR or your company's designated harassment officer",
                        "Use anonymous reporting hotlines if available",
                        "File a complaint with the EEOC (external option)"
                    ]
                },
                { type: "heading", text: "What to Include in a Report" },
                {
                    type: "list", items: [
                        "Who was involved (harasser and any witnesses)",
                        "What happened (specific words, actions)",
                        "When and where it occurred",
                        "Any evidence (emails, texts, photos)",
                        "Impact on you or others"
                    ]
                },
                { type: "heading", text: "Retaliation is Prohibited" },
                { type: "keypoint", text: "It is illegal for employers to retaliate against employees who report harassment in good faith, participate in investigations, or oppose discriminatory practices." },
                { type: "definition", text: "Retaliation: Adverse action taken against someone for engaging in protected activity (like reporting harassment)." }
            ]
        },
        {
            id: "scenario-work",
            title: "Scenario: Overheard Comments",
            type: "scenario",
            duration: "5 min",
            content: [
                { type: "heading", text: "Real-World Scenario" },
                { type: "paragraph", text: "You're in the break room and overhear a group of colleagues making jokes about a coworker's religious practices. The targeted coworker is not present. What should you do?" }
            ]
        },
        {
            id: "harassment-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "hpq1",
            question: "What is the legal standard for determining if conduct creates a hostile work environment?",
            options: [
                "The harasser intended to cause harm",
                "The victim is offended",
                "Conduct is severe or pervasive enough to create an intimidating environment",
                "Multiple complaints have been filed"
            ],
            correctIndex: 2,
            explanation: "A hostile work environment exists when conduct is severe or pervasive enough that a reasonable person would find the work environment intimidating, hostile, or offensive."
        },
        {
            id: "hpq2",
            question: "What is 'quid pro quo' sexual harassment?",
            options: [
                "Any sexual joke in the workplace",
                "Employment decisions based on submission to sexual conduct",
                "Unwanted romantic attention from a coworker",
                "Displaying explicit materials at work"
            ],
            correctIndex: 1,
            explanation: "Quid pro quo harassment occurs when employment decisions (hiring, promotion, assignments) are based on submission to or rejection of sexual conduct."
        },
        {
            id: "hpq3",
            question: "Which of the following is NOT one of the 5 D's of Bystander Intervention?",
            options: ["Direct", "Distract", "Deny", "Delegate"],
            correctIndex: 2,
            explanation: "The 5 D's are Direct, Distract, Delegate, Delay, and Document. 'Deny' is not part of the framework."
        },
        {
            id: "hpq4",
            question: "Can harassment come from customers or vendors?",
            options: [
                "No, only from employees and supervisors",
                "Yes, employers must address harassment from any source",
                "Only if they work on-site regularly",
                "Only if they are under contract"
            ],
            correctIndex: 1,
            explanation: "Employers are responsible for addressing harassment from any source, including customers, clients, vendors, and contractors, if they know or should know about it."
        }
    ]
};

// ==================== AGENTIC AI & PROMPT ENGINEERING ====================
export const agenticAIContent: TrainingModuleContent = {
    id: "agentic-ai",
    title: "Agentic AI & Prompt Engineering",
    subtitle: "Building Autonomous AI Systems",
    description: "Master the principles of agentic AI systems, multi-agent architectures, and advanced prompt engineering techniques. Learn to design, develop, and deploy AI agents that can reason, plan, and act independently.",
    learningObjectives: [
        "Understand the architecture of agentic AI systems",
        "Design effective system prompts and persona definitions",
        "Apply chain-of-thought, tree-of-thought, and ReAct patterns",
        "Build multi-agent systems with tool use and memory",
        "Evaluate and improve AI agent reliability"
    ],
    standards: ["NIST AI RMF", "IEEE 7000", "EU AI Act"],
    sections: [
        {
            id: "ai-intro",
            title: "Introduction to Agentic AI",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "What is Agentic AI?" },
                { type: "definition", text: "Agentic AI: AI systems capable of autonomous decision-making, planning, and action-taking to achieve goals with minimal human intervention." },
                { type: "paragraph", text: "Unlike traditional AI that responds to single prompts, agentic AI systems can break down complex goals, create plans, use tools, and iterate until objectives are achieved. They represent the next evolution in AI capabilities." },
                { type: "heading", text: "Key Characteristics" },
                {
                    type: "list", items: [
                        "Autonomy: Can operate independently without constant guidance",
                        "Goal-Directed: Works toward defined objectives",
                        "Tool Use: Can invoke APIs, databases, and external services",
                        "Memory: Maintains context across interactions",
                        "Reflection: Can evaluate and improve its own outputs"
                    ]
                },
                { type: "keypoint", text: "By 2025, Gartner predicts 30% of enterprise AI applications will use agentic AI architectures, up from less than 1% in 2023." },
                { type: "reference", text: "Gartner Emerging Tech Report 2024", source: "https://www.gartner.com/en/articles/what-is-agentic-ai" }
            ]
        },
        {
            id: "prompt-fundamentals",
            title: "Prompt Engineering Fundamentals",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The Art of Prompting" },
                { type: "paragraph", text: "Prompt engineering is the practice of designing inputs that elicit optimal outputs from large language models. It's a critical skill for building reliable AI applications." },
                { type: "heading", text: "Core Prompt Components" },
                {
                    type: "list", items: [
                        "System Prompt: Defines the AI's role, personality, and constraints",
                        "Context: Background information the AI needs to respond appropriately",
                        "Task/Instruction: The specific action you want the AI to perform",
                        "Examples (Few-Shot): Sample input-output pairs for learning",
                        "Output Format: Expected structure of the response"
                    ]
                },
                { type: "heading", text: "The 6 Principles of Effective Prompts" },
                {
                    type: "list", items: [
                        "1. Be Specific: Vague prompts get vague answers",
                        "2. Provide Context: Give the AI the information it needs",
                        "3. Define Format: Specify JSON, markdown, or structured output",
                        "4. Use Examples: Show don't just tell (few-shot learning)",
                        "5. Break Down Tasks: Complex tasks need step-by-step instructions",
                        "6. Iterate: Refine prompts based on outputs"
                    ]
                },
                { type: "tip", text: "Start with a clear persona: 'You are an expert [role] who specializes in [domain].' This primes the model for domain-specific responses." }
            ]
        },
        {
            id: "quiz-prompting",
            title: "Knowledge Check: Prompt Design",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "cot-reasoning",
            title: "Chain-of-Thought Reasoning",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Chain-of-Thought (CoT) Prompting" },
                { type: "definition", text: "Chain-of-Thought: A prompting technique that encourages the AI to show its reasoning step-by-step before arriving at a conclusion." },
                { type: "paragraph", text: "Research by Google and others shows that CoT prompting dramatically improves performance on complex reasoning tasks - from math problems to logical deduction." },
                { type: "heading", text: "CoT Variations" },
                {
                    type: "list", items: [
                        "Zero-Shot CoT: Add 'Let's think step by step' to any prompt",
                        "Few-Shot CoT: Provide examples that demonstrate reasoning",
                        "Self-Consistency: Generate multiple reasoning paths, take majority vote",
                        "Tree-of-Thought: Explore multiple solution branches in parallel"
                    ]
                },
                { type: "keypoint", text: "Adding 'Let's think step by step' to prompts improved accuracy on GSM8K math problems from 17.7% to 78.7% - a 4x improvement!" },
                { type: "reference", text: "Chain-of-Thought Prompting Elicits Reasoning (Wei et al.)", source: "https://arxiv.org/abs/2201.11903" }
            ]
        },
        {
            id: "react-agents",
            title: "ReAct: Reasoning + Acting",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The ReAct Pattern" },
                { type: "paragraph", text: "ReAct (Reason + Act) is a paradigm that combines reasoning traces and task-specific actions in an interleaved manner. It allows AI agents to create plans, take actions, observe results, and adapt." },
                { type: "heading", text: "ReAct Loop" },
                {
                    type: "list", items: [
                        "Thought: The agent reasons about what to do next",
                        "Action: The agent executes a tool or API call",
                        "Observation: The agent processes the result",
                        "Repeat: Continue until goal is achieved or max iterations"
                    ]
                },
                { type: "heading", text: "Tool Definition Best Practices" },
                {
                    type: "list", items: [
                        "Clear descriptions: Tell the AI exactly what each tool does",
                        "Parameter schemas: Define required vs optional inputs",
                        "Error handling: Specify what happens on failure",
                        "Examples: Show when and how to use each tool"
                    ]
                },
                { type: "warning", text: "Always implement guardrails: limit iterations, validate inputs, and have human-in-the-loop escalation for high-stakes actions." }
            ]
        },
        {
            id: "scenario-agent",
            title: "Scenario: Designing an AI Agent",
            type: "scenario",
            duration: "8 min",
            content: [
                { type: "heading", text: "Agent Design Challenge" },
                { type: "paragraph", text: "You're tasked with designing an AI agent to help customer service representatives. The agent should be able to look up order status, process refunds, and escalate to human supervisors when needed." }
            ]
        }
    ],
    finalAssessment: [
        {
            id: "aq1",
            question: "What is the key difference between traditional AI and agentic AI?",
            options: [
                "Agentic AI uses larger language models",
                "Agentic AI can autonomously plan, act, and iterate toward goals",
                "Agentic AI requires more training data",
                "Agentic AI only works with structured data"
            ],
            correctIndex: 1,
            explanation: "Agentic AI is distinguished by its ability to autonomously break down goals, create plans, use tools, and iterate - operating with minimal human intervention."
        },
        {
            id: "aq2",
            question: "What technique improved math problem accuracy from 17.7% to 78.7%?",
            options: [
                "Fine-tuning",
                "Larger context windows",
                "Chain-of-Thought prompting",
                "Reinforcement learning"
            ],
            correctIndex: 2,
            explanation: "Adding 'Let's think step by step' (zero-shot CoT) to prompts dramatically improved reasoning performance on the GSM8K benchmark."
        }
    ]
};

// ==================== DATA PRIVACY & GDPR ====================
export const dataPrivacyContent: TrainingModuleContent = {
    id: "data-privacy",
    title: "Data Privacy & GDPR Compliance",
    subtitle: "Protecting Personal Information Globally",
    description: "Comprehensive training on global data privacy regulations including GDPR, CCPA, and emerging privacy frameworks. Learn to handle personal data responsibly and ensure compliance.",
    learningObjectives: [
        "Understand key data privacy regulations (GDPR, CCPA, LGPD)",
        "Identify personal data and sensitive personal data",
        "Apply data minimization and purpose limitation principles",
        "Handle data subject rights requests",
        "Implement privacy by design in processes"
    ],
    standards: ["GDPR", "CCPA", "LGPD", "Privacy Shield"],
    sections: [
        {
            id: "privacy-intro",
            title: "The Global Privacy Landscape",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Why Privacy Matters" },
                { type: "paragraph", text: "Data privacy has become a fundamental right in the digital age. With major regulations like GDPR, CCPA, and LGPD, organizations must protect personal data or face significant penalties and reputational damage." },
                { type: "heading", text: "Major Privacy Regulations" },
                {
                    type: "list", items: [
                        "GDPR (EU): Up to €20 million or 4% of global revenue in fines",
                        "CCPA/CPRA (California): Up to $7,500 per intentional violation",
                        "LGPD (Brazil): Up to 2% of revenue, capped at R$50 million",
                        "PIPL (China): Up to ¥50 million or 5% of annual revenue"
                    ]
                },
                { type: "keypoint", text: "GDPR fines have exceeded €4 billion since 2018. Meta alone received a €1.2 billion fine in 2023 for data transfer violations." },
                { type: "reference", text: "GDPR Enforcement Tracker", source: "https://www.enforcementtracker.com/" }
            ]
        },
        {
            id: "personal-data",
            title: "What is Personal Data?",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Defining Personal Data" },
                { type: "definition", text: "Personal Data: Any information relating to an identified or identifiable natural person (data subject)." },
                { type: "heading", text: "Categories of Personal Data" },
                {
                    type: "list", items: [
                        "Direct Identifiers: Name, email, phone, SSN, passport number",
                        "Indirect Identifiers: IP address, cookies, device IDs, location data",
                        "Sensitive Data: Race, religion, health, biometrics, sexual orientation, political views",
                        "Pseudonymized Data: Still personal data under GDPR if re-identification is possible"
                    ]
                },
                { type: "warning", text: "Even data you think is 'anonymous' may be personal data if it can be combined with other data to identify someone." }
            ]
        },
        {
            id: "gdpr-principles",
            title: "GDPR Core Principles",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The 7 GDPR Principles" },
                {
                    type: "list", items: [
                        "1. Lawfulness, Fairness, Transparency: Process data legally and openly",
                        "2. Purpose Limitation: Collect only for specific, legitimate purposes",
                        "3. Data Minimization: Collect only what's necessary",
                        "4. Accuracy: Keep data accurate and up-to-date",
                        "5. Storage Limitation: Don't keep data longer than needed",
                        "6. Integrity & Confidentiality: Protect data with appropriate security",
                        "7. Accountability: Demonstrate compliance"
                    ]
                },
                { type: "heading", text: "Lawful Bases for Processing" },
                {
                    type: "list", items: [
                        "Consent: Clear, affirmative opt-in (not pre-checked boxes)",
                        "Contract: Necessary to fulfill a contract with the data subject",
                        "Legal Obligation: Required by law",
                        "Vital Interests: Protecting someone's life",
                        "Public Task: Necessary for official government functions",
                        "Legitimate Interests: Balanced against data subject rights"
                    ]
                },
                { type: "tip", text: "Consent should be your last resort, not first choice. It can be withdrawn at any time, creating operational complexity." }
            ]
        },
        {
            id: "quiz-gdpr",
            title: "Knowledge Check: GDPR",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "data-subject-rights",
            title: "Data Subject Rights",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Individual Rights Under GDPR" },
                {
                    type: "list", items: [
                        "Right to Access: Obtain confirmation and copy of their data",
                        "Right to Rectification: Correct inaccurate data",
                        "Right to Erasure: 'Right to be forgotten' in certain circumstances",
                        "Right to Restrict Processing: Limit how data is used",
                        "Right to Data Portability: Receive data in machine-readable format",
                        "Right to Object: Object to processing based on legitimate interests",
                        "Rights Related to Automated Decision-Making: Human review of AI decisions"
                    ]
                },
                { type: "heading", text: "Response Requirements" },
                { type: "paragraph", text: "Organizations must respond to valid requests within 30 days (extendable by 60 days for complex requests). Failure to respond can result in complaints to data protection authorities." },
                { type: "keypoint", text: "You must verify the identity of requesters before disclosing personal data. Sending data to the wrong person is itself a data breach." }
            ]
        }
    ],
    finalAssessment: [
        {
            id: "pq1",
            question: "What is the maximum GDPR fine for serious violations?",
            options: [
                "€1 million or 1% of global revenue",
                "€10 million or 2% of global revenue",
                "€20 million or 4% of global revenue",
                "€50 million or 10% of global revenue"
            ],
            correctIndex: 2,
            explanation: "The maximum GDPR fine is €20 million or 4% of total worldwide annual turnover, whichever is higher."
        },
        {
            id: "pq2",
            question: "Within how many days must you respond to a data subject access request?",
            options: [
                "14 days",
                "30 days",
                "60 days",
                "90 days"
            ],
            correctIndex: 1,
            explanation: "Organizations must respond to DSARs within 30 days, with a possible extension of 60 additional days for complex cases."
        }
    ]
};

// ==================== OSHA WORKPLACE SAFETY ====================
export const oshaWorkplaceSafetyContent: TrainingModuleContent = {
    id: "osha-safety",
    title: "OSHA Workplace Safety",
    subtitle: "Creating a Safe Work Environment",
    description: "Comprehensive OSHA safety training covering hazard recognition, emergency procedures, PPE requirements, and regulatory compliance for general industry.",
    learningObjectives: [
        "Recognize common workplace hazards",
        "Understand OSHA rights and responsibilities",
        "Properly use Personal Protective Equipment (PPE)",
        "Follow emergency and evacuation procedures",
        "Report safety concerns through proper channels"
    ],
    standards: ["OSHA 29 CFR 1910", "OSHA 29 CFR 1926", "NFPA"],
    sections: [
        {
            id: "osha-intro",
            title: "Introduction to OSHA",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is OSHA?" },
                { type: "definition", text: "OSHA: The Occupational Safety and Health Administration, a federal agency that sets and enforces workplace safety standards." },
                { type: "paragraph", text: "OSHA was created by the Occupational Safety and Health Act of 1970 to ensure safe and healthful working conditions. Since then, workplace fatalities have declined by over 60%." },
                { type: "heading", text: "Your Rights Under OSHA" },
                {
                    type: "list", items: [
                        "Right to a safe workplace free from recognized hazards",
                        "Right to receive safety training in a language you understand",
                        "Right to review records of work-related injuries and illnesses",
                        "Right to file a complaint with OSHA without retaliation",
                        "Right to participate in OSHA inspections"
                    ]
                },
                { type: "keypoint", text: "OSHA covers most private sector workers. Penalties for serious violations can exceed $15,000 per violation, with willful violations up to $156,000." },
                { type: "reference", text: "OSHA Workers' Rights", source: "https://www.osha.gov/workers" }
            ]
        },
        {
            id: "hazard-recognition",
            title: "Hazard Recognition",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Types of Workplace Hazards" },
                {
                    type: "list", items: [
                        "Safety Hazards: Slips, trips, falls, machinery, electrical",
                        "Chemical Hazards: Toxic substances, flammables, corrosives",
                        "Biological Hazards: Bacteria, viruses, mold, bloodborne pathogens",
                        "Physical Hazards: Noise, radiation, extreme temperatures",
                        "Ergonomic Hazards: Repetitive motion, improper lifting, workstation design",
                        "Psychosocial Hazards: Stress, violence, harassment"
                    ]
                },
                { type: "heading", text: "The Fatal Four" },
                { type: "paragraph", text: "OSHA's 'Fatal Four' are the leading causes of construction worker deaths:" },
                {
                    type: "list", items: [
                        "Falls (33.5% of deaths): Use fall protection, guardrails, safety nets",
                        "Struck by Object (11.1%): Wear hard hats, secure tools and materials",
                        "Electrocution (8.5%): Follow lockout/tagout, maintain safe distances",
                        "Caught-in/between (5.5%): Machine guarding, trenching protection"
                    ]
                },
                { type: "warning", text: "Eliminating the Fatal Four would save over 500 lives every year in the United States." }
            ]
        },
        {
            id: "ppe",
            title: "Personal Protective Equipment",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "PPE Requirements" },
                { type: "paragraph", text: "Personal Protective Equipment (PPE) is the last line of defense after engineering and administrative controls. Employers must provide appropriate PPE at no cost." },
                { type: "heading", text: "Types of PPE" },
                {
                    type: "list", items: [
                        "Head Protection: Hard hats, bump caps",
                        "Eye/Face Protection: Safety glasses, goggles, face shields",
                        "Hearing Protection: Earplugs, earmuffs (required at 85+ dB)",
                        "Respiratory Protection: N95 masks, half-face/full-face respirators",
                        "Hand Protection: Gloves appropriate for the hazard",
                        "Foot Protection: Safety shoes, steel-toed boots",
                        "Body Protection: High-visibility vests, flame-resistant clothing"
                    ]
                },
                { type: "heading", text: "PPE Best Practices" },
                {
                    type: "list", items: [
                        "Inspect PPE before each use",
                        "Ensure proper fit (one size does not fit all)",
                        "Replace damaged or worn PPE immediately",
                        "Clean and store PPE properly",
                        "Never modify or alter PPE"
                    ]
                },
                { type: "tip", text: "PPE only works if you wear it correctly, every time. A hard hat on the shelf provides zero protection." }
            ]
        },
        {
            id: "quiz-safety",
            title: "Knowledge Check: Safety",
            type: "quiz",
            duration: "5 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "sq1",
            question: "Which of the following is NOT one of OSHA's Fatal Four?",
            options: [
                "Falls",
                "Struck by Object",
                "Heat Stroke",
                "Electrocution"
            ],
            correctIndex: 2,
            explanation: "The Fatal Four are Falls, Struck by Object, Electrocution, and Caught-in/between. Heat stroke, while serious, is not one of the four leading causes."
        },
        {
            id: "sq2",
            question: "At what decibel level does OSHA require hearing protection?",
            options: [
                "70 dB",
                "80 dB",
                "85 dB",
                "90 dB"
            ],
            correctIndex: 2,
            explanation: "OSHA requires hearing protection when employees are exposed to 85 decibels or higher averaged over an 8-hour workday."
        }
    ]
};

// ==================== LEADERSHIP IN THE AI ERA ====================
export const leadershipAIContent: TrainingModuleContent = {
    id: "leadership-ai",
    title: "Leadership in the AI Era",
    subtitle: "Leading Teams Through AI Transformation",
    description: "Essential leadership skills for the AI age. Learn to guide your team through technological change, build AI-first cultures, and make strategic decisions about AI adoption.",
    learningObjectives: [
        "Understand the strategic implications of AI for your organization",
        "Build psychological safety during times of technological change",
        "Make informed decisions about AI tool adoption",
        "Foster continuous learning and adaptation",
        "Lead by example in ethical AI use"
    ],
    standards: ["IEEE 7000", "World Economic Forum AI Leadership Framework"],
    sections: [
        {
            id: "leader-intro",
            title: "The AI Leadership Imperative",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Leading in Times of Change" },
                { type: "paragraph", text: "AI is transforming every industry at an unprecedented pace. As a leader, your role is not just to adopt AI tools, but to guide your team through the uncertainty and opportunity that comes with this transformation." },
                { type: "heading", text: "The Leadership Challenge" },
                {
                    type: "list", items: [
                        "62% of employees worry AI will eliminate their jobs",
                        "78% of executives believe AI is critical to success within 3 years",
                        "Only 20% of organizations have clear AI strategies",
                        "Leaders must bridge the gap between fear and opportunity"
                    ]
                },
                { type: "keypoint", text: "The best AI leaders don't just implement technology - they build cultures where humans and AI amplify each other." },
                { type: "reference", text: "McKinsey: The State of AI in 2024", source: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" }
            ]
        },
        {
            id: "psychological-safety",
            title: "Building Psychological Safety",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "Why Safety Matters More Than Ever" },
                { type: "definition", text: "Psychological Safety: A shared belief that the team is safe for interpersonal risk-taking." },
                { type: "paragraph", text: "In times of rapid change, psychological safety becomes critical. Team members need to feel safe to experiment with new tools, admit what they don't know, and share concerns about AI without fear of judgment." },
                { type: "heading", text: "Building Safety During AI Adoption" },
                {
                    type: "list", items: [
                        "Acknowledge uncertainty: No one has all the answers about AI",
                        "Frame AI as augmentation, not replacement",
                        "Celebrate learning and experimentation, even failures",
                        "Create safe spaces to discuss concerns about AI",
                        "Model vulnerability: Share your own AI learning journey"
                    ]
                },
                { type: "tip", text: "Ask your team: 'What would you try if you knew you couldn't fail?' This opens space for innovation." }
            ]
        },
        {
            id: "strategic-decisions",
            title: "Strategic AI Decision-Making",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "When to Adopt AI" },
                { type: "paragraph", text: "Not every process needs AI. Leaders must evaluate opportunities based on value, feasibility, and risk." },
                { type: "heading", text: "The AI Adoption Framework" },
                {
                    type: "list", items: [
                        "Value: Does this solve a real business problem?",
                        "Data: Do we have quality data to support this use case?",
                        "Risk: What are the consequences of errors?",
                        "People: Do we have the skills to implement and maintain?",
                        "Ethics: Does this align with our values?"
                    ]
                },
                { type: "heading", text: "Red Flags for AI Projects" },
                {
                    type: "list", items: [
                        "Technology looking for a problem",
                        "No clear success metrics",
                        "Insufficient or biased training data",
                        "High-stakes decisions with no human oversight",
                        "No plan for monitoring and maintenance"
                    ]
                },
                { type: "warning", text: "The cost of a failed AI project isn't just money - it's trust. Choose high-impact, lower-risk projects to build momentum." }
            ]
        }
    ],
    finalAssessment: [
        {
            id: "lq1",
            question: "What percentage of employees worry AI will eliminate their jobs?",
            options: [
                "32%",
                "47%",
                "62%",
                "85%"
            ],
            correctIndex: 2,
            explanation: "62% of employees express concern about AI eliminating their jobs, making psychological safety and clear communication critical leadership skills."
        }
    ]
};

// Update the content lookup with new modules
export const allModuleContent: Record<string, TrainingModuleContent> = {
    // NIST Cybersecurity - multiple aliases
    "nist-csf-2": nistCybersecurityContent,
    "nist-csf": nistCybersecurityContent,
    "cybersecurity-awareness": nistCybersecurityContent,
    "cybersecurity": nistCybersecurityContent,
    "cyber": nistCybersecurityContent,

    // HIPAA - multiple aliases
    "hipaa-compliance": hipaaComplianceContent,
    "hipaa-2024": hipaaComplianceContent,
    "hipaa-essentials": hipaaComplianceContent,
    "hipaa": hipaaComplianceContent,

    // SAFe - multiple aliases  
    "safe-agilist-6": safeAgilistContent,
    "safe-agilist": safeAgilistContent,
    "safe-scrum-master": safeAgilistContent,
    "scrum-master": safeAgilistContent,
    "agile-fundamentals": safeAgilistContent,

    // Harassment Prevention
    "harassment-prevention": harassmentPreventionContent,
    "harassment": harassmentPreventionContent,

    // Agentic AI & Prompt Engineering
    "agentic-ai": agenticAIContent,
    "prompt-engineering": agenticAIContent,
    "ai-fundamentals": agenticAIContent,
    "ai-agents": agenticAIContent,

    // Data Privacy & GDPR
    "data-privacy": dataPrivacyContent,
    "gdpr": dataPrivacyContent,
    "ccpa": dataPrivacyContent,
    "privacy-fundamentals": dataPrivacyContent,

    // OSHA Workplace Safety
    "osha-safety": oshaWorkplaceSafetyContent,
    "workplace-safety": oshaWorkplaceSafetyContent,
    "safety-fundamentals": oshaWorkplaceSafetyContent,

    // Leadership
    "leadership-ai-era": leadershipAIContent,
    "leadership-fundamentals": leadershipAIContent,
    "leadership-ai": leadershipAIContent,
    "ai-leadership": leadershipAIContent,
};

// Helper to get content by ID
export function getModuleContent(id: string): TrainingModuleContent | undefined {
    return allModuleContent[id];
}
