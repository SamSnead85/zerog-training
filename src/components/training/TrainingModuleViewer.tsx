"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Circle,
    BookOpen,
    HelpCircle,
    Clock,
    Award,
    ArrowRight,
    Lightbulb,
    AlertTriangle,
    X,
    RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ModuleSection {
    id: string;
    title: string;
    type: "reading" | "quiz" | "scenario";
    content?: ReadingContent;
    quiz?: QuizContent;
    scenario?: ScenarioContent;
}

interface ReadingContent {
    heading: string;
    paragraphs: string[];
    keyPoints?: string[];
    warning?: string;
    tip?: string;
}

interface QuizContent {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface ScenarioContent {
    situation: string;
    question: string;
    options: string[];
    correctIndex: number;
    feedback: string;
}

const cybersecurityModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Introduction to Cybersecurity",
        type: "reading",
        content: {
            heading: "Why Cybersecurity Matters",
            paragraphs: [
                "Cybersecurity is everyone's responsibility. As an employee, you are the first line of defense against cyber threats that could compromise sensitive data, disrupt operations, and damage your organization's reputation.",
                "Cyberattacks are becoming more sophisticated every day. Hackers use social engineering, phishing emails, and malware to gain unauthorized access to systems. Understanding these threats is crucial for protecting yourself and your organization.",
                "This training will equip you with the knowledge and skills to recognize and respond to common cyber threats. By the end, you'll be able to identify phishing attempts, create strong passwords, and follow best practices for data security.",
            ],
            keyPoints: [
                "90% of data breaches are caused by human error",
                "The average cost of a data breach is $4.45 million",
                "Phishing attacks account for 36% of all breaches",
            ],
        },
    },
    {
        id: "phishing-basics",
        title: "Recognizing Phishing Attacks",
        type: "reading",
        content: {
            heading: "What is Phishing?",
            paragraphs: [
                "Phishing is a type of social engineering attack where criminals attempt to trick you into revealing sensitive information, such as passwords, credit card numbers, or personal data.",
                "Phishing attacks often come in the form of emails, text messages, or phone calls that appear to be from legitimate sources. Attackers create urgency or fear to pressure you into acting quickly without thinking.",
                "Common signs of phishing include: unexpected requests for personal information, generic greetings, spelling and grammar errors, suspicious sender addresses, and links that don't match the stated destination.",
            ],
            warning: "Never click on links in suspicious emails. If you're unsure, contact your IT security team directly.",
            tip: "Hover over links before clicking to preview the actual URL destination.",
        },
    },
    {
        id: "quiz-phishing",
        title: "Knowledge Check: Phishing",
        type: "quiz",
        quiz: {
            question: "You receive an email from 'accounts@bankofamerica-secure.com' asking you to verify your account. What should you do?",
            options: [
                "Click the link and verify your account immediately",
                "Reply to the email asking for more information",
                "Forward it to your IT security team and delete it",
                "Ignore it and continue working",
            ],
            correctIndex: 2,
            explanation: "The correct answer is to forward suspicious emails to your IT security team. The domain 'bankofamerica-secure.com' is not the real Bank of America domain, which is a red flag. Always report suspicious emails to help protect your organization.",
        },
    },
    {
        id: "passwords",
        title: "Password Security",
        type: "reading",
        content: {
            heading: "Creating Strong Passwords",
            paragraphs: [
                "Strong passwords are your first line of defense against unauthorized access. A weak password can be cracked in seconds using modern computing power, while a strong password could take years to crack.",
                "A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid using personal information like birthdays, names, or common words.",
                "Consider using a passphrase instead of a password. A passphrase like 'Coffee!Mountain$Bicycle99' is easier to remember but much harder to crack than a short, complex password.",
            ],
            keyPoints: [
                "Use unique passwords for each account",
                "Never share your passwords with anyone",
                "Change passwords immediately if you suspect compromise",
                "Use a password manager to store complex passwords securely",
            ],
            tip: "Your organization requires passwords to be at least 12 characters with uppercase, lowercase, numbers, and special characters.",
        },
    },
    {
        id: "scenario-password",
        title: "Scenario: Password Request",
        type: "scenario",
        scenario: {
            situation: "Your manager calls you and says they forgot their password and need yours to access an urgent file. They sound stressed and say they'll reset theirs later.",
            question: "What is the best response?",
            options: [
                "Give them your password since they're your manager",
                "Politely decline and suggest they contact IT to reset their password",
                "Email them your password so there's a record",
                "Share your password just this once since it's urgent",
            ],
            correctIndex: 1,
            feedback: "Never share your password, even with your manager. Legitimate emergencies have legitimate solutions - IT can reset passwords quickly. This could be a social engineering attempt, or your manager's account could already be compromised.",
        },
    },
    {
        id: "social-engineering",
        title: "Social Engineering Tactics",
        type: "reading",
        content: {
            heading: "Understanding Social Engineering",
            paragraphs: [
                "Social engineering is the art of manipulating people into giving up confidential information or performing actions that may compromise security. Unlike technical hacking, social engineering exploits human psychology.",
                "Attackers use techniques like pretexting (creating a false scenario), baiting (offering something enticing), tailgating (following someone into a secure area), and quid pro quo (offering a service in exchange for information).",
                "Always verify the identity of anyone requesting sensitive information, even if they claim to be from IT, management, or a vendor. Legitimate requests can be verified through official channels.",
            ],
            warning: "Your security team will never ask for your password. If someone claims to need it for 'security purposes,' it's a scam.",
        },
    },
    {
        id: "quiz-social",
        title: "Knowledge Check: Social Engineering",
        type: "quiz",
        quiz: {
            question: "Someone in a delivery uniform is waiting at the secure door and asks you to hold it open for them. What should you do?",
            options: [
                "Hold the door open - they're clearly a delivery person",
                "Ask to see their visitor badge and call reception to verify",
                "Let them in but follow them to make sure they go to the right place",
                "Ignore them and let the door close",
            ],
            correctIndex: 1,
            explanation: "Always verify visitors, even if they appear legitimate. Tailgating is a common way attackers gain physical access to secure areas. Ask for identification and verify through official channels.",
        },
    },
    {
        id: "data-protection",
        title: "Protecting Sensitive Data",
        type: "reading",
        content: {
            heading: "Data Classification and Handling",
            paragraphs: [
                "Not all data is created equal. Your organization classifies data based on its sensitivity: Public, Internal, Confidential, and Restricted. Each classification has specific handling requirements.",
                "Restricted data includes personal information (PII), financial records, health information, and trade secrets. This data requires encryption, access controls, and audit logging.",
                "When handling sensitive data, always use approved systems and never transfer data to personal devices or accounts. If you need to share sensitive data externally, use approved secure file transfer methods.",
            ],
            keyPoints: [
                "Lock your computer when stepping away (Windows: Win+L, Mac: Ctrl+Cmd+Q)",
                "Never leave sensitive documents unattended",
                "Shred physical documents containing sensitive information",
                "Report any suspected data breaches immediately",
            ],
        },
    },
    {
        id: "final-quiz",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "You discover that a colleague accidentally emailed a spreadsheet containing customer credit card numbers to the wrong recipient. What should you do first?",
            options: [
                "Wait to see if the recipient notices and returns it",
                "Ask your colleague to send a follow-up email requesting deletion",
                "Report the incident to your security team immediately",
                "Nothing - mistakes happen and it will probably be fine",
            ],
            correctIndex: 2,
            explanation: "Data breaches must be reported immediately to your security team. They can take steps to contain the breach, notify affected parties if required, and fulfill regulatory obligations. Time is critical in breach response.",
        },
    },
];

// SAFe Agilist Module Content
const safeAgilistModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Introduction to SAFe",
        type: "reading",
        content: {
            heading: "Welcome to SAFe 6.0",
            paragraphs: [
                "The Scaled Agile Framework (SAFe) is the world's leading framework for scaling Agile across the enterprise. SAFe 6.0, released in March 2023, helps organizations achieve business agility through Lean-Agile principles and practices.",
                "SAFe brings together proven practices from Lean, Agile, and DevOps to help organizations deliver value faster, with higher quality, and better alignment with business goals.",
                "In this training, you'll learn the core principles of SAFe, how to run PI Planning events, and how to lead Agile Release Trains effectively.",
            ],
            keyPoints: [
                "70% of Fortune 100 companies have SAFe practitioners",
                "35% faster time-to-market with SAFe",
                "50% increase in productivity",
            ],
        },
    },
    {
        id: "core-values",
        title: "SAFe Core Values",
        type: "reading",
        content: {
            heading: "The Four Core Values",
            paragraphs: [
                "SAFe is built on four core values that guide all decision-making: Alignment, Built-in Quality, Transparency, and Program Execution.",
                "Alignment ensures everyone is moving toward the same strategic goals. Built-in Quality means never compromising on quality. Transparency builds trust through visibility. Program Execution delivers value reliably.",
            ],
            keyPoints: [
                "Alignment: Keep everyone moving toward the same goals",
                "Built-in Quality: Never compromise on quality",
                "Transparency: Trust through visibility",
                "Program Execution: Deliver value reliably",
            ],
            tip: "Leaders must model these values. Your team watches what you do, not just what you say.",
        },
    },
    {
        id: "quiz-values",
        title: "Knowledge Check: SAFe Values",
        type: "quiz",
        quiz: {
            question: "Which of the following is NOT one of the four SAFe Core Values?",
            options: [
                "Alignment",
                "Innovation",
                "Transparency",
                "Built-in Quality",
            ],
            correctIndex: 1,
            explanation: "The four SAFe Core Values are Alignment, Built-in Quality, Transparency, and Program Execution. Innovation is part of the House of Lean but not a core value.",
        },
    },
    {
        id: "pi-planning",
        title: "PI Planning",
        type: "reading",
        content: {
            heading: "The Heartbeat of SAFe",
            paragraphs: [
                "PI Planning is a cadence-based, face-to-face event that serves as the heartbeat of the Agile Release Train. It aligns all teams to a shared mission and vision.",
                "A Program Increment (PI) is typically 8-12 weeks during which an ART delivers incremental value. PI Planning brings 50-125 people together for 2 days to plan the entire PI.",
                "Key outputs include committed PI Objectives, a Program Board showing dependencies, and a team confidence vote.",
            ],
            keyPoints: [
                "PI Planning is a 2-day event with all ART members",
                "Creates alignment across 5-12 Agile teams",
                "Results in committed objectives and visualized dependencies",
            ],
            warning: "Never skip PI Planning. It builds alignment and trust that cannot be replicated asynchronously.",
        },
    },
    {
        id: "scenario-pi",
        title: "Scenario: PI Planning Challenge",
        type: "scenario",
        scenario: {
            situation: "You're an RTE facilitating PI Planning. On Day 1, two teams discover they have a major dependency that neither anticipated. The dependency could delay both teams' features by a full sprint.",
            question: "What's the best way to handle this during PI Planning?",
            options: [
                "Tell the teams to figure it out later and continue with planning",
                "Facilitate a discussion between the teams to create a solution and adjust objectives",
                "Escalate immediately to Product Management for a decision",
                "Cancel the features to avoid the dependency",
            ],
            correctIndex: 1,
            feedback: "PI Planning is designed to surface and resolve dependencies. Facilitating real-time collaboration between teams is the heart of the event. This is exactly why we do face-to-face planning.",
        },
    },
    {
        id: "art-roles",
        title: "Agile Release Train Roles",
        type: "reading",
        content: {
            heading: "Key ART Roles",
            paragraphs: [
                "The Agile Release Train has several key roles that ensure smooth operation and value delivery.",
                "The Release Train Engineer (RTE) is the servant leader and coach for the ART. Product Management owns the Program Backlog. The System Architect provides technical leadership. Business Owners evaluate fitness for use.",
            ],
            keyPoints: [
                "RTE: Servant leader who facilitates ART events",
                "Product Management: Owns vision and Program Backlog",
                "System Architect: Technical leader for solution architecture",
                "Business Owners: Key stakeholders who evaluate value",
            ],
            tip: "Think of the ART as a 'team of teams.' Individual team success is less important than overall ART success.",
        },
    },
];

// HIPAA Module Content  
const hipaaModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Introduction to HIPAA",
        type: "reading",
        content: {
            heading: "What is HIPAA?",
            paragraphs: [
                "The Health Insurance Portability and Accountability Act (HIPAA) of 1996 is a federal law that established national standards to protect sensitive patient health information from disclosure without consent or knowledge.",
                "HIPAA applies to Covered Entities (health plans, healthcare clearinghouses, healthcare providers) and Business Associates who handle PHI on their behalf.",
                "Violations can result in penalties ranging from $100 to $50,000 per violation, with criminal penalties including imprisonment up to 10 years.",
            ],
            keyPoints: [
                "HIPAA is federal law - compliance is not optional",
                "Applies to anyone who handles patient information",
                "Individual employees can be held personally liable",
            ],
            warning: "Ignorance of HIPAA requirements is not a valid defense. If you can access patient information, HIPAA applies to you.",
        },
    },
    {
        id: "phi",
        title: "Protected Health Information",
        type: "reading",
        content: {
            heading: "Understanding PHI",
            paragraphs: [
                "Protected Health Information (PHI) is any individually identifiable health information created, received, maintained, or transmitted by a covered entity.",
                "HIPAA defines 18 specific identifiers including names, dates, phone numbers, email addresses, Social Security numbers, and medical record numbers.",
                "Health information + any identifier = PHI. If you can identify who the patient is, it's PHI.",
            ],
            keyPoints: [
                "PHI = Health information + Identifier",
                "18 identifiers defined by HIPAA",
                "When in doubt, treat it as PHI",
            ],
        },
    },
    {
        id: "quiz-phi",
        title: "Knowledge Check: PHI",
        type: "quiz",
        quiz: {
            question: "Which of the following is NOT one of the 18 HIPAA identifiers?",
            options: [
                "Social Security Number",
                "Blood type",
                "Email address",
                "Vehicle serial number",
            ],
            correctIndex: 1,
            explanation: "Blood type alone is not one of the 18 HIPAA identifiers. However, blood type combined with any identifier (like a name) becomes PHI.",
        },
    },
    {
        id: "minimum-necessary",
        title: "Minimum Necessary Standard",
        type: "reading",
        content: {
            heading: "Need-to-Know Principle",
            paragraphs: [
                "The Minimum Necessary standard requires that you only access, use, or disclose the minimum amount of PHI needed to accomplish the intended purpose.",
                "If you need to verify a patient's appointment, you don't need to access their complete medical history. Access only what's required for the task.",
            ],
            tip: "Ask yourself: 'Do I need this information to do my job right now?' If not, don't access it.",
            warning: "'Curiosity snooping' into patient records - even of friends or family - is a HIPAA violation that can result in termination and legal action.",
        },
    },
];

// AI & Prompt Engineering Module Content
const aiPromptEngineeringModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Introduction to Prompt Engineering",
        type: "reading",
        content: {
            heading: "What is Prompt Engineering?",
            paragraphs: [
                "Prompt engineering is the art and science of designing inputs for AI language models to get the most useful, accurate, and relevant outputs. As AI becomes integral to work, prompt engineering is becoming an essential skill.",
                "The same AI model can give vastly different results based on how you ask. A well-crafted prompt can mean the difference between a useless response and a highly valuable one.",
                "This training will equip you with techniques to write clear, effective prompts that get accurate results from ChatGPT, Claude, Gemini, and other AI assistants.",
            ],
            keyPoints: [
                "AI is only as good as the prompts you give it",
                "Specific prompts get specific, useful results",
                "Vague prompts lead to generic, unhelpful outputs",
            ],
        },
    },
    {
        id: "craft-framework",
        title: "The CRAFT Framework",
        type: "reading",
        content: {
            heading: "Structuring Effective Prompts",
            paragraphs: [
                "Use CRAFT to structure effective prompts: Context, Role, Action, Format, and Tone.",
                "Context provides background information. Role tells the AI what persona to adopt. Action clearly states what you want. Format specifies the desired output structure. Tone indicates style and formality.",
            ],
            keyPoints: [
                "Context: Provide background and situation",
                "Role: Tell the AI what expertise to adopt",
                "Action: Clearly state what you want done",
                "Format: Specify the desired output format",
                "Tone: Indicate style, formality, voice",
            ],
            tip: "Combining all CRAFT elements creates prompts that consistently produce professional, actionable outputs.",
        },
    },
    {
        id: "quiz-basics",
        title: "Knowledge Check: Prompt Basics",
        type: "quiz",
        quiz: {
            question: "Which prompt will likely produce a better result?",
            options: [
                "'Write about marketing'",
                "'Write 5 email subject lines for a B2B SaaS launch targeting CTOs, emphasizing time savings and ROI'",
                "'Help me write something'",
                "'Do marketing stuff'",
            ],
            correctIndex: 1,
            explanation: "Specific prompts get specific results. The second option includes context (B2B SaaS), role (targeting CTOs), action (write subject lines), format (5 items), and tone (emphasizing benefits).",
        },
    },
    {
        id: "advanced-techniques",
        title: "Advanced Prompting Techniques",
        type: "reading",
        content: {
            heading: "Chain-of-Thought & Few-Shot Learning",
            paragraphs: [
                "Chain-of-Thought prompting asks the AI to 'think step by step.' This dramatically improves accuracy on complex reasoning tasks—research shows it improved math accuracy from 17.7% to 78.7%.",
                "Few-Shot Learning means providing examples of the input-output pattern you want. Show the AI 2-3 examples of what you're looking for, then ask for similar output.",
                "Role-based prompting assigns a persona: 'You are an expert financial analyst...' This primes the model for domain-specific, professional responses.",
            ],
            keyPoints: [
                "Chain-of-Thought: Add 'Let's think step by step'",
                "Few-Shot: Provide 2-3 input/output examples",
                "Role-based: Assign expert personas for better responses",
            ],
            warning: "AI can be confidently wrong ('hallucinate'). Always fact-check important information before using it.",
        },
    },
    {
        id: "scenario-prompt",
        title: "Scenario: Improving a Prompt",
        type: "scenario",
        scenario: {
            situation: "Your colleague asks AI: 'Write an email.' The AI produces a generic, unhelpful response.",
            question: "How would you improve this prompt?",
            options: [
                "Add 'please' to be more polite",
                "Make it longer by repeating the request",
                "Add context, role, format, and tone specifications",
                "Ask the AI to try again with the same prompt",
            ],
            correctIndex: 2,
            feedback: "Adding context (what the email is about), role (who it's from), format (length, structure), and tone (professional, casual) will dramatically improve the output quality.",
        },
    },
    {
        id: "ai-ethics",
        title: "AI Ethics and Responsible Use",
        type: "reading",
        content: {
            heading: "Using AI Responsibly at Work",
            paragraphs: [
                "AI is a powerful tool that comes with responsibilities. Using AI ethically protects you, your organization, and the people your work affects.",
                "Never input confidential customer data, PII, trade secrets, or anything covered by NDA into external AI tools without proper authorization. Verify outputs before using them.",
            ],
            keyPoints: [
                "Verify outputs: AI can hallucinate confidently",
                "Protect privacy: Don't share confidential data",
                "Maintain oversight: AI assists, humans decide",
                "Be transparent: Disclose AI use where appropriate",
            ],
            warning: "You are responsible for reviewing and validating all AI-assisted work. AI outputs can contain errors, biases, or fabricated information.",
        },
    },
    {
        id: "final-quiz",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "What does 'chain-of-thought' prompting encourage the AI to do?",
            options: [
                "Write longer responses automatically",
                "Think and reason step by step before answering",
                "Connect multiple conversations together",
                "Search the internet for current information",
            ],
            correctIndex: 1,
            explanation: "Chain-of-thought prompting encourages the AI to reason through a problem step by step, which significantly improves accuracy on complex reasoning tasks.",
        },
    },
];

// Data Privacy & GDPR Module Content
const dataPrivacyModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Introduction to Data Privacy",
        type: "reading",
        content: {
            heading: "The Global Privacy Landscape",
            paragraphs: [
                "Data privacy has become a fundamental right in the digital age. With regulations like GDPR, CCPA, and LGPD, organizations must protect personal data or face significant penalties.",
                "GDPR fines have exceeded €4 billion since 2018. Meta alone received a €1.2 billion fine in 2023 for data transfer violations.",
                "This training covers key privacy principles that apply across major regulations worldwide.",
            ],
            keyPoints: [
                "GDPR (EU): Up to €20 million or 4% of global revenue",
                "CCPA (California): Up to $7,500 per intentional violation",
                "Privacy laws apply even to companies outside their jurisdiction",
            ],
            warning: "Privacy violations can result in massive fines, reputational damage, and loss of customer trust.",
        },
    },
    {
        id: "personal-data",
        title: "What is Personal Data?",
        type: "reading",
        content: {
            heading: "Identifying Personal Data",
            paragraphs: [
                "Personal Data is any information relating to an identified or identifiable natural person (called a 'data subject').",
                "This includes obvious identifiers like names and emails, but also indirect identifiers like IP addresses, cookies, and location data.",
                "Special category data (sensitive data) includes race, religion, health, biometrics, and political views—requiring extra protection.",
            ],
            keyPoints: [
                "Direct identifiers: Name, email, phone, SSN",
                "Indirect identifiers: IP address, cookies, device IDs",
                "Sensitive data requires additional safeguards",
            ],
        },
    },
    {
        id: "quiz-gdpr",
        title: "Knowledge Check: Privacy Basics",
        type: "quiz",
        quiz: {
            question: "Which of the following is considered 'personal data' under GDPR?",
            options: [
                "A random number with no connection to anyone",
                "An IP address that can be linked to a user",
                "Fully anonymized aggregate statistics",
                "The current weather forecast",
            ],
            correctIndex: 1,
            explanation: "An IP address is personal data because it can be used to identify a specific individual, either directly or when combined with other information.",
        },
    },
    {
        id: "data-rights",
        title: "Data Subject Rights",
        type: "reading",
        content: {
            heading: "Individual Rights Under GDPR",
            paragraphs: [
                "GDPR gives individuals powerful rights: Right of Access, Right to Rectification, Right to Erasure ('right to be forgotten'), Right to Data Portability, and Right to Object.",
                "You have ONE MONTH to respond to data subject requests. This deadline is strict and failure to respond can result in complaints and fines.",
            ],
            keyPoints: [
                "Right of Access: People can request copies of their data",
                "Right to Erasure: People can request deletion",
                "Right to Portability: People can request data transfer",
                "Response deadline: 1 month (extendable to 3 for complex cases)",
            ],
            tip: "When you receive a data request, log it immediately and forward to your data protection team—don't try to handle it yourself.",
        },
    },
    {
        id: "scenario-breach",
        title: "Scenario: Potential Data Breach",
        type: "scenario",
        scenario: {
            situation: "You accidentally sent a spreadsheet containing customer names and email addresses to the wrong external recipient. You realize the mistake immediately after clicking send.",
            question: "What should you do first?",
            options: [
                "Wait to see if the recipient notices and returns it",
                "Send a follow-up email asking them to delete it",
                "Report the incident to your data protection/security team immediately",
                "Delete the sent email and hope no one notices",
            ],
            correctIndex: 2,
            feedback: "Data breaches must be reported immediately. GDPR requires notification to authorities within 72 hours. Your team can assess the risk and take appropriate action—don't try to handle it alone.",
        },
    },
    {
        id: "final-quiz",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "How long do you have to respond to a Data Subject Access Request under GDPR?",
            options: [
                "72 hours",
                "One week",
                "One month",
                "Three months",
            ],
            correctIndex: 2,
            explanation: "You have one month to respond to a DSAR. This can be extended by two more months for complex requests, but you must inform the individual within the first month.",
        },
    },
];

// Leadership Module Content
const leadershipModule: ModuleSection[] = [
    {
        id: "intro",
        title: "What Makes a Great Leader?",
        type: "reading",
        content: {
            heading: "Leadership vs. Management",
            paragraphs: [
                "While management focuses on processes and maintaining order, leadership is about inspiring people, creating vision, and driving change.",
                "Research shows the #1 reason people leave their jobs is their manager. Your leadership directly impacts retention, engagement, and performance.",
            ],
            keyPoints: [
                "Great leaders are also good managers—but the reverse isn't always true",
                "The #1 reason employees leave is their direct manager",
                "Leadership is learned, not just inherited",
            ],
        },
    },
    {
        id: "situational",
        title: "Situational Leadership",
        type: "reading",
        content: {
            heading: "Adapting Your Style",
            paragraphs: [
                "There is no single 'best' style of leadership. Effective leaders adapt their style based on the development level of the person they are leading.",
                "The four styles are: Telling (for enthusiastic beginners), Selling (for disillusioned learners), Participating (for capable but cautious performers), and Delegating (for self-reliant achievers).",
            ],
            keyPoints: [
                "S1 Telling: High directive, low supportive",
                "S2 Selling: High directive, high supportive",
                "S3 Participating: Low directive, high supportive",
                "S4 Delegating: Low directive, low supportive",
            ],
            tip: "Development level is task-specific. Someone might be D4 on one task and D1 on another.",
        },
    },
    {
        id: "quiz-leadership",
        title: "Knowledge Check: Leadership Styles",
        type: "quiz",
        quiz: {
            question: "An enthusiastic beginner needs which leadership style?",
            options: [
                "Delegating",
                "Participating",
                "Selling",
                "Telling",
            ],
            correctIndex: 3,
            explanation: "Enthusiastic beginners (D1) need Telling/Directing (S1). They are new to the task but motivated, so they need clear structure and instructions.",
        },
    },
    {
        id: "feedback",
        title: "Delivering Effective Feedback",
        type: "reading",
        content: {
            heading: "The SBI Feedback Model",
            paragraphs: [
                "The Situation-Behavior-Impact (SBI) model provides a clear structure for feedback that is specific, objective, and actionable.",
                "Describe the Situation, the Behavior you observed, and the Impact of that behavior. Avoid personality judgments—focus on observable actions.",
            ],
            keyPoints: [
                "Situation: 'In yesterday's client meeting...'",
                "Behavior: 'You interrupted three times...'",
                "Impact: 'The client seemed frustrated...'",
            ],
            warning: "Avoid 'you are' statements (personality). Focus on 'you did' statements (behavior).",
        },
    },
    {
        id: "scenario-feedback",
        title: "Scenario: Giving Difficult Feedback",
        type: "scenario",
        scenario: {
            situation: "A team member has been consistently late to morning standups for the past two weeks. Other team members are starting to notice and comment.",
            question: "How should you approach this conversation?",
            options: [
                "Send a passive-aggressive email copying the whole team",
                "Wait to see if it resolves itself",
                "Have a private conversation using the SBI model",
                "Dock their performance review without discussing it",
            ],
            correctIndex: 2,
            feedback: "A private conversation using SBI is most effective. 'In our last 10 standups (Situation), you've arrived 10-15 minutes late (Behavior). This delays the team and signals that the meeting isn't a priority (Impact).'",
        },
    },
    {
        id: "final-quiz",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "What does 'SBI' stand for in the SBI Feedback Model?",
            options: [
                "Specific, Bold, Immediate",
                "Situation, Behavior, Impact",
                "Summary, Background, Insights",
                "Start, Build, Improve",
            ],
            correctIndex: 1,
            explanation: "SBI stands for Situation, Behavior, Impact. This framework helps deliver specific, objective feedback that focuses on observable actions rather than personality judgments.",
        },
    },
];

// Workplace Harassment Prevention Module Content
const harassmentPreventionModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Understanding Workplace Harassment",
        type: "reading",
        content: {
            heading: "What is Workplace Harassment?",
            paragraphs: [
                "Workplace harassment is unwelcome conduct based on a protected characteristic that is severe or pervasive enough to create a hostile work environment or results in adverse employment action.",
                "Protected characteristics include race, color, religion, sex (including pregnancy, sexual orientation, gender identity), national origin, age (40 or older), disability, and genetic information.",
            ],
            keyPoints: [
                "Harassment is about impact, not intent",
                "Even well-meaning comments can constitute harassment",
                "The harasser can be anyone: supervisors, co-workers, customers",
            ],
            warning: "Ignorance is not a defense. If you witness harassment, you have a responsibility to report it.",
        },
    },
    {
        id: "types",
        title: "Types of Harassment",
        type: "reading",
        content: {
            heading: "Recognizing Different Forms",
            paragraphs: [
                "Sexual harassment includes unwelcome sexual advances, requests for sexual favors, and other verbal or physical harassment of a sexual nature.",
                "Quid Pro Quo harassment occurs when employment decisions are based on submission to sexual conduct. Hostile Work Environment occurs when conduct is severe or pervasive enough to create an intimidating environment.",
            ],
            keyPoints: [
                "Quid Pro Quo: 'This for that' harassment tied to job decisions",
                "Hostile Environment: Pervasive conduct creating intimidation",
                "Non-sexual harassment based on any protected characteristic",
            ],
        },
    },
    {
        id: "quiz-types",
        title: "Knowledge Check: Types of Harassment",
        type: "quiz",
        quiz: {
            question: "What is the legal standard for a hostile work environment?",
            options: [
                "The harasser intended to cause harm",
                "The victim is offended",
                "Conduct is severe or pervasive enough to create an intimidating environment",
                "Multiple complaints have been filed",
            ],
            correctIndex: 2,
            explanation: "A hostile work environment exists when conduct is severe or pervasive enough that a reasonable person would find it intimidating, hostile, or offensive.",
        },
    },
    {
        id: "bystander",
        title: "Bystander Intervention",
        type: "reading",
        content: {
            heading: "The 5 D's of Bystander Intervention",
            paragraphs: [
                "Bystanders play a crucial role in preventing harassment. Research shows that harassment is less likely to continue when bystanders intervene.",
                "You don't have to be confrontational. Sometimes just asking 'Is everything OK here?' can interrupt inappropriate behavior.",
            ],
            keyPoints: [
                "Direct: Address the behavior directly",
                "Distract: Create a distraction to interrupt",
                "Delegate: Ask someone else to help (HR, manager)",
                "Delay: Check in with the target after the incident",
                "Document: Write down what you saw for potential reports",
            ],
            tip: "Consider your safety first. If a situation seems dangerous, call for help rather than intervening directly.",
        },
    },
    {
        id: "scenario-harassment",
        title: "Scenario: Overheard Comments",
        type: "scenario",
        scenario: {
            situation: "You're in the break room and overhear colleagues making jokes about a coworker's religious practices. The targeted coworker is not present.",
            question: "What should you do?",
            options: [
                "Ignore it - the person isn't present so no harm done",
                "Join in to fit in with the group",
                "Speak up that the comments are inappropriate, then report to HR",
                "Wait to see if it happens again",
            ],
            correctIndex: 2,
            feedback: "Even if the target isn't present, these comments contribute to a hostile environment. Speaking up and reporting helps prevent escalation and protects the workplace culture.",
        },
    },
    {
        id: "reporting",
        title: "Reporting Procedures",
        type: "reading",
        content: {
            heading: "How to Report Harassment",
            paragraphs: [
                "If you experience or witness harassment, you have multiple options for reporting: your supervisor (unless involved), HR, your company's designated harassment officer, or anonymous reporting hotlines.",
                "Document what happened, when, where, who was involved, and any witnesses. Preserve evidence like emails or texts.",
            ],
            keyPoints: [
                "Report immediately - don't wait",
                "Document: who, what, when, where, witnesses",
                "Preserve any evidence (emails, texts, photos)",
                "Retaliation for good-faith reports is illegal",
            ],
            warning: "It is illegal for employers to retaliate against employees who report harassment in good faith.",
        },
    },
    {
        id: "final-quiz",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "Which of the following is NOT one of the 5 D's of Bystander Intervention?",
            options: [
                "Direct",
                "Distract",
                "Deny",
                "Delegate",
            ],
            correctIndex: 2,
            explanation: "The 5 D's are Direct, Distract, Delegate, Delay, and Document. 'Deny' is not part of the framework.",
        },
    },
];

// Function to get module content by ID - COMPREHENSIVE ROUTING
function getModuleSections(moduleId?: string): { sections: ModuleSection[]; title: string } {
    if (!moduleId) {
        return { sections: cybersecurityModule, title: "Cybersecurity Awareness Training" };
    }

    const id = moduleId.toLowerCase();

    // AI & Prompt Engineering - covers: prompt-engineering, prompt-eng, agentic-ai, llm-*, chatgpt-*, ai-*, gemini, claude
    if (id.includes("prompt") || id.includes("agentic") || id.includes("llm") ||
        id.includes("chatgpt") || id.includes("claude") || id.includes("gemini") ||
        id.includes("copilot") || id.includes("vector") || id.includes("rag") ||
        (id.startsWith("ai-") || id.includes("-ai-") || id.endsWith("-ai"))) {
        return { sections: aiPromptEngineeringModule, title: "Prompt Engineering Masterclass" };
    }

    // Data Privacy & GDPR - covers: gdpr, privacy, ccpa, data-protection
    if (id.includes("gdpr") || id.includes("privacy") || id.includes("ccpa") || id.includes("data-protection")) {
        return { sections: dataPrivacyModule, title: "Data Privacy & GDPR Training" };
    }

    // Leadership - covers: leadership-*, change-management, executive-*, dei-*, coaching, feedback, management
    if (id.includes("leadership") || id.includes("management") || id.includes("coaching") ||
        id.includes("feedback") || id.includes("executive") || id.includes("dei-") ||
        id.includes("change-") || id.includes("-leader")) {
        return { sections: leadershipModule, title: "Leadership Fundamentals" };
    }

    // SAFe/Agile/Scrum - covers: safe-*, scrum-*, agile-*, kanban, pi-planning, product-owner
    if (id.includes("safe") || id.includes("scrum") || id.includes("agile") ||
        id.includes("agilist") || id.includes("kanban") || id.includes("pi-planning") ||
        id.includes("product-owner")) {
        return { sections: safeAgilistModule, title: "SAFe 6.0 Agilist Training" };
    }

    // HIPAA & Healthcare - covers: hipaa-*, bloodborne, patient-safety, clinical-*, infection-*, healthcare
    if (id.includes("hipaa") || id.includes("phi") || id.includes("health-privacy") ||
        id.includes("bloodborne") || id.includes("patient") || id.includes("clinical") ||
        id.includes("infection") || id.includes("healthcare") || id.includes("osha")) {
        return { sections: hipaaModule, title: "HIPAA Compliance Training" };
    }

    // Harassment/Workplace/HR - covers: harassment-*, discrimination, eeoc, title-vii, workplace-*, new-hire-*
    if (id.includes("harassment") || id.includes("discrimination") || id.includes("eeoc") ||
        id.includes("title-vii") || id.includes("workplace") || id.includes("new-hire") ||
        id.includes("onboarding") || id.includes("hr-")) {
        return { sections: harassmentPreventionModule, title: "Workplace Harassment Prevention" };
    }

    // Compliance/Security Frameworks - covers: nist-*, soc2, iso27001, cyber-*, security-*, phishing
    if (id.includes("cyber") || id.includes("nist") || id.includes("security") ||
        id.includes("phishing") || id.includes("soc2") || id.includes("iso27001") ||
        id.includes("soc-2") || id.includes("iso-27001") || id.includes("compliance")) {
        return { sections: cybersecurityModule, title: "Cybersecurity Awareness Training" };
    }

    // Analytics/Data - covers: data-analytics, analytics-*, reporting
    if (id.includes("analytics") || id.includes("reporting") || id.includes("data-")) {
        return { sections: leadershipModule, title: "Data Analytics Fundamentals" };
    }

    // AI Ethics - specific match before general fallback
    if (id.includes("ethics") || id.includes("responsible-ai") || id.includes("governance")) {
        return { sections: aiPromptEngineeringModule, title: "AI Ethics & Responsible AI" };
    }

    // Default fallback - use leadership as a more generic option
    console.warn(`No specific content found for module ID: ${moduleId}, using default content`);
    return { sections: leadershipModule, title: "Professional Development" };
}

interface TrainingModuleViewerProps {
    moduleId?: string;
}

export function TrainingModuleViewer({ moduleId }: TrainingModuleViewerProps) {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Use module-specific content based on the ID
    const { sections, title: moduleTitle } = getModuleSections(moduleId);
    const currentSection = sections[currentSectionIndex];
    const progress = (completedSections.size / sections.length) * 100;

    const handleNext = () => {
        // Mark current section as complete
        setCompletedSections((prev) => new Set([...prev, currentSection.id]));
        setSelectedAnswer(null);
        setShowFeedback(false);

        if (currentSectionIndex < sections.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        }
    };

    const handleAnswerSelect = (index: number) => {
        if (showFeedback) return;
        setSelectedAnswer(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;

        const correctIndex = currentSection.type === "quiz"
            ? currentSection.quiz?.correctIndex
            : currentSection.scenario?.correctIndex;

        setIsCorrect(selectedAnswer === correctIndex);
        setShowFeedback(true);
    };

    const handleRetry = () => {
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    const isComplete = completedSections.size === sections.length;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Link href="/library">
                            <Button variant="ghost" size="icon">
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="font-semibold">{moduleTitle}</h1>
                            <p className="text-sm text-muted-foreground">
                                Section {currentSectionIndex + 1} of {sections.length}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">{Math.round(progress)}% Complete</p>
                            <p className="text-xs text-muted-foreground">
                                {completedSections.size} of {sections.length} sections
                            </p>
                        </div>
                    </div>
                </div>
                <Progress value={progress} className="h-2" />

                {/* Section Indicators */}
                <div className="flex gap-1 mt-3 overflow-x-auto">
                    {sections.map((section, i) => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setCurrentSectionIndex(i);
                                setSelectedAnswer(null);
                                setShowFeedback(false);
                            }}
                            className={cn(
                                "flex items-center gap-1.5 px-2 py-1 rounded text-xs whitespace-nowrap transition-all",
                                i === currentSectionIndex && "bg-primary/10 text-primary",
                                completedSections.has(section.id) && "text-emerald-500",
                                !completedSections.has(section.id) && i !== currentSectionIndex && "text-muted-foreground"
                            )}
                        >
                            {completedSections.has(section.id) ? (
                                <CheckCircle2 className="h-3 w-3" />
                            ) : section.type === "quiz" || section.type === "scenario" ? (
                                <HelpCircle className="h-3 w-3" />
                            ) : (
                                <Circle className="h-3 w-3" />
                            )}
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <Card className="p-8">
                {currentSection.type === "reading" && currentSection.content && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">{currentSection.content.heading}</h2>
                        </div>

                        {currentSection.content.paragraphs.map((para, i) => (
                            <p key={i} className="text-muted-foreground leading-relaxed">
                                {para}
                            </p>
                        ))}

                        {currentSection.content.warning && (
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{currentSection.content.warning}</p>
                            </div>
                        )}

                        {currentSection.content.tip && (
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <Lightbulb className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{currentSection.content.tip}</p>
                            </div>
                        )}

                        {currentSection.content.keyPoints && (
                            <div className="p-4 rounded-lg bg-muted">
                                <h4 className="font-medium mb-3">Key Points</h4>
                                <ul className="space-y-2">
                                    {currentSection.content.keyPoints.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {(currentSection.type === "quiz" || currentSection.type === "scenario") && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <HelpCircle className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                                <Badge variant="outline" className="mb-1">
                                    {currentSection.type === "quiz" ? "Knowledge Check" : "Scenario"}
                                </Badge>
                                <h2 className="text-xl font-bold">{currentSection.title}</h2>
                            </div>
                        </div>

                        {currentSection.type === "scenario" && currentSection.scenario && (
                            <div className="p-4 rounded-lg bg-muted mb-4">
                                <h4 className="font-medium mb-2">Situation</h4>
                                <p className="text-sm text-muted-foreground">{currentSection.scenario.situation}</p>
                            </div>
                        )}

                        <p className="text-lg font-medium">
                            {currentSection.type === "quiz"
                                ? currentSection.quiz?.question
                                : currentSection.scenario?.question}
                        </p>

                        <div className="space-y-3">
                            {(currentSection.type === "quiz"
                                ? currentSection.quiz?.options
                                : currentSection.scenario?.options
                            )?.map((option, i) => {
                                const correctIndex = currentSection.type === "quiz"
                                    ? currentSection.quiz?.correctIndex
                                    : currentSection.scenario?.correctIndex;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswerSelect(i)}
                                        disabled={showFeedback}
                                        className={cn(
                                            "w-full p-4 rounded-xl border text-left transition-all",
                                            selectedAnswer === i && !showFeedback && "border-primary bg-primary/5",
                                            showFeedback && i === correctIndex && "border-emerald-500 bg-emerald-500/10",
                                            showFeedback && selectedAnswer === i && i !== correctIndex && "border-red-500 bg-red-500/10",
                                            !showFeedback && selectedAnswer !== i && "border-border hover:border-primary/30"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                                selectedAnswer === i ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                                            )}>
                                                {showFeedback && i === correctIndex ? (
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                ) : showFeedback && selectedAnswer === i && i !== correctIndex ? (
                                                    <X className="h-4 w-4 text-red-500" />
                                                ) : (
                                                    <span className="text-xs">{String.fromCharCode(65 + i)}</span>
                                                )}
                                            </div>
                                            <span className="flex-1">{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {!showFeedback && (
                            <Button
                                className="w-full"
                                disabled={selectedAnswer === null}
                                onClick={handleSubmitAnswer}
                            >
                                Submit Answer
                            </Button>
                        )}

                        {showFeedback && (
                            <div className={cn(
                                "p-4 rounded-lg",
                                isCorrect ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-amber-500/10 border border-amber-500/20"
                            )}>
                                <div className="flex items-center gap-2 mb-2">
                                    {isCorrect ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    ) : (
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    )}
                                    <span className="font-medium">
                                        {isCorrect ? "Correct!" : "Not quite right"}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {currentSection.type === "quiz"
                                        ? currentSection.quiz?.explanation
                                        : currentSection.scenario?.feedback}
                                </p>
                                {!isCorrect && (
                                    <Button variant="outline" size="sm" className="mt-3 gap-1" onClick={handleRetry}>
                                        <RotateCcw className="h-4 w-4" />
                                        Try Again
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentSectionIndex === 0}
                    className="gap-1"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>

                {currentSectionIndex === sections.length - 1 && (showFeedback || currentSection.type === "reading") ? (
                    <Link href="/certificates">
                        <Button className="gap-1">
                            <Award className="h-4 w-4" />
                            Complete & Get Certificate
                        </Button>
                    </Link>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={
                            (currentSection.type !== "reading" && !showFeedback) ||
                            currentSectionIndex === sections.length - 1
                        }
                        className="gap-1"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
