// ScaledNative Platform - Extended Module Content Library
// Additional training modules with context-aware placeholders for organizational customization

import type { TrainingModuleContent, ModuleSection, QuizQuestion } from "./module-content";

// ==================== GDPR DATA PRIVACY ====================
export const gdprDataPrivacyContent: TrainingModuleContent = {
    id: "gdpr-data-privacy",
    title: "GDPR & Data Privacy Essentials",
    subtitle: "Protecting Personal Data in the Digital Age",
    description: "Master the General Data Protection Regulation (GDPR) and modern data privacy principles. Learn the rights of data subjects, lawful bases for processing, and your responsibilities.",
    learningObjectives: [
        "Understand the core principles of GDPR",
        "Identify personal data and special category data",
        "Apply the six lawful bases for processing personal data",
        "Recognize and respond to data subject rights requests",
        "Report data breaches following proper procedures"
    ],
    standards: ["GDPR", "CCPA", "UK GDPR", "Privacy Shield"],
    sections: [
        {
            id: "gdpr-intro",
            title: "Introduction to GDPR",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is GDPR?" },
                { type: "paragraph", text: "The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of individuals in the European Union, regardless of where the organization is located." },
                { type: "definition", text: "Personal Data: Any information relating to an identified or identifiable natural person ('data subject'). This includes names, email addresses, location data, online identifiers, and factors specific to physical, genetic, mental, economic, cultural, or social identity." },
                { type: "keypoint", text: "GDPR applies if you process EU residents' data, even if your organization is outside the EU. Fines can reach €20 million or 4% of global annual turnover, whichever is higher." },
                { type: "heading", text: "Key GDPR Terminology" },
                {
                    type: "list", items: [
                        "Data Controller: Determines the purposes and means of processing",
                        "Data Processor: Processes data on behalf of the controller",
                        "Data Subject: The individual whose data is being processed",
                        "Processing: Any operation performed on personal data (collecting, storing, using, sharing, deleting)",
                        "Consent: Freely given, specific, informed, and unambiguous indication of wishes"
                    ]
                },
                { type: "tip", text: "[YOUR ORGANIZATION] acts as a [Data Controller/Data Processor] for customer data. Check [YOUR PRIVACY POLICY LOCATION] for specific details about how we handle data." }
            ]
        },
        {
            id: "gdpr-principles",
            title: "The Seven GDPR Principles",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Article 5: Principles of Processing" },
                { type: "paragraph", text: "GDPR establishes seven key principles that must be followed when processing personal data:" },
                {
                    type: "list", items: [
                        "1. Lawfulness, Fairness, and Transparency: Process data lawfully and be open about how you use it",
                        "2. Purpose Limitation: Collect data for specified, explicit, and legitimate purposes only",
                        "3. Data Minimisation: Only collect what you need, nothing more",
                        "4. Accuracy: Keep data accurate and up to date",
                        "5. Storage Limitation: Don't keep data longer than necessary",
                        "6. Integrity and Confidentiality: Ensure appropriate security",
                        "7. Accountability: Be able to demonstrate compliance"
                    ]
                },
                { type: "keypoint", text: "You must be able to DEMONSTRATE compliance, not just achieve it. Keep records of your processing activities and decisions." },
                { type: "heading", text: "Applying Data Minimisation" },
                { type: "paragraph", text: "Before collecting any personal data, ask yourself:" },
                {
                    type: "list", items: [
                        "Do I really need this information for my stated purpose?",
                        "Could I achieve my goal with less data or anonymized data?",
                        "How long do I actually need to keep this data?",
                        "Who really needs access to this data?"
                    ]
                },
                { type: "warning", text: "Collecting 'just in case' data violates the data minimisation principle. Only collect what you have a specific, documented need for." }
            ]
        },
        {
            id: "lawful-basis",
            title: "Lawful Bases for Processing",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The Six Lawful Bases (Article 6)" },
                { type: "paragraph", text: "Every processing activity must have a lawful basis. You must identify and document your lawful basis BEFORE you begin processing." },
                {
                    type: "list", items: [
                        "Consent: The individual has given clear consent for you to process their data for a specific purpose",
                        "Contract: Processing is necessary for a contract you have with the individual or because they have asked you to take specific steps before entering into a contract",
                        "Legal Obligation: Processing is necessary for you to comply with the law",
                        "Vital Interests: Processing is necessary to protect someone's life",
                        "Public Task: Processing is necessary for you to perform a task in the public interest or for official functions",
                        "Legitimate Interests: Processing is necessary for your legitimate interests or those of a third party, unless overridden by the individual's interests"
                    ]
                },
                { type: "heading", text: "Consent Requirements" },
                { type: "paragraph", text: "If you rely on consent, it must be:" },
                {
                    type: "list", items: [
                        "Freely given (not coerced or bundled with other terms)",
                        "Specific (for a particular purpose)",
                        "Informed (person understands what they're consenting to)",
                        "Unambiguous (clear affirmative action, not pre-ticked boxes)",
                        "Easy to withdraw (as easy to withdraw as it was to give)"
                    ]
                },
                { type: "tip", text: "[YOUR ORGANIZATION] primarily relies on [CONSENT/CONTRACT/LEGITIMATE INTERESTS] for processing customer data. See [YOUR CONSENT MANAGEMENT PROCESS] for details on obtaining valid consent." }
            ]
        },
        {
            id: "dsar",
            title: "Data Subject Rights",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Individual Rights Under GDPR" },
                { type: "paragraph", text: "GDPR gives individuals powerful rights over their personal data. You must be able to recognize and properly handle these requests." },
                {
                    type: "list", items: [
                        "Right of Access (Article 15): Obtain a copy of their personal data",
                        "Right to Rectification (Article 16): Have inaccurate data corrected",
                        "Right to Erasure (Article 17): Have their data deleted ('right to be forgotten')",
                        "Right to Restriction (Article 18): Limit how their data is processed",
                        "Right to Data Portability (Article 20): Receive their data in a machine-readable format",
                        "Right to Object (Article 21): Object to certain types of processing",
                        "Rights Related to Automated Decision Making (Article 22): Not be subject to solely automated decisions with legal effects"
                    ]
                },
                { type: "heading", text: "Handling Data Subject Requests" },
                { type: "keypoint", text: "You have ONE MONTH to respond to a data subject access request. This can be extended by two more months for complex requests, but you must notify the individual within the first month." },
                { type: "paragraph", text: "When you receive a request:" },
                {
                    type: "list", items: [
                        "1. Verify the identity of the requester",
                        "2. Log the request immediately",
                        "3. Forward to [YOUR DSAR HANDLING TEAM/EMAIL]",
                        "4. Do not attempt to handle it yourself unless trained",
                        "5. Preserve all relevant data - do not delete anything"
                    ]
                },
                { type: "warning", text: "Never ignore a data subject request. Failure to respond can result in complaints to supervisory authorities and significant fines." }
            ]
        },
        {
            id: "gdpr-quiz",
            title: "Knowledge Check: GDPR Basics",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "breach-response",
            title: "Data Breach Response",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is a Personal Data Breach?" },
                { type: "definition", text: "Personal Data Breach: A breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, personal data." },
                { type: "heading", text: "Examples of Data Breaches" },
                {
                    type: "list", items: [
                        "Sending an email to the wrong recipient containing personal data",
                        "Lost or stolen devices containing personal data",
                        "Hacking or malware attacks that expose data",
                        "Paper records left unsecured or thrown in regular trash",
                        "Unauthorized employee access to personal data",
                        "Accidental deletion of data without backup"
                    ]
                },
                { type: "heading", text: "Breach Notification Requirements" },
                { type: "paragraph", text: "GDPR requires notification to the supervisory authority within 72 hours of becoming aware of a breach (unless unlikely to result in risk to individuals). Affected individuals must also be notified if the breach is likely to result in high risk." },
                { type: "keypoint", text: "The 72-hour clock starts when YOU become aware of the breach. Report internally immediately so your organization can assess and report if needed." },
                { type: "heading", text: "Your Breach Response Responsibilities" },
                {
                    type: "list", items: [
                        "1. STOP - Don't make it worse (don't delete evidence)",
                        "2. REPORT immediately to [YOUR DATA PROTECTION OFFICER/SECURITY TEAM]",
                        "3. DOCUMENT what happened, when, and any actions taken",
                        "4. PRESERVE any evidence",
                        "5. COOPERATE with the investigation"
                    ]
                },
                { type: "tip", text: "At [YOUR ORGANIZATION], report data breaches to [YOUR BREACH REPORTING CHANNEL] within [YOUR TIMEFRAME]. Save contact: [YOUR DPO EMAIL/PHONE]." }
            ]
        },
        {
            id: "gdpr-scenario",
            title: "Scenario: Email Mishap",
            type: "scenario",
            duration: "5 min",
            content: [
                { type: "heading", text: "Real-World Scenario" },
                { type: "paragraph", text: "You accidentally sent a spreadsheet containing customer names, email addresses, and order histories to the wrong external recipient. You realize the mistake immediately after clicking send. What should you do?" }
            ]
        },
        {
            id: "gdpr-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "gq1",
            question: "How long do you have to respond to a Data Subject Access Request (DSAR)?",
            options: ["72 hours", "One week", "One month", "Three months"],
            correctIndex: 2,
            explanation: "You have one month to respond to a DSAR. This can be extended by two more months for complex requests, but you must inform the individual within the first month."
        },
        {
            id: "gq2",
            question: "Which of the following is NOT one of the seven GDPR principles?",
            options: ["Data Minimisation", "Accuracy", "Profitability", "Accountability"],
            correctIndex: 2,
            explanation: "The seven GDPR principles are: Lawfulness/Fairness/Transparency, Purpose Limitation, Data Minimisation, Accuracy, Storage Limitation, Integrity/Confidentiality, and Accountability. Profitability is not a GDPR principle."
        },
        {
            id: "gq3",
            question: "What must valid GDPR consent be?",
            options: [
                "Written and signed",
                "Freely given, specific, informed, and unambiguous",
                "Recorded by a witness",
                "Renewed annually"
            ],
            correctIndex: 1,
            explanation: "Valid consent must be freely given, specific, informed, and unambiguous. It can be given electronically and doesn't require a signature or witness."
        },
        {
            id: "gq4",
            question: "Within how many hours must a data breach be reported to the supervisory authority?",
            options: ["24 hours", "48 hours", "72 hours", "One week"],
            correctIndex: 2,
            explanation: "GDPR requires notification to the supervisory authority within 72 hours of becoming aware of a breach that is likely to result in a risk to individuals."
        }
    ]
};

// ==================== LEADERSHIP FUNDAMENTALS ====================
export const leadershipFundamentalsContent: TrainingModuleContent = {
    id: "leadership-fundamentals",
    title: "Leadership Fundamentals",
    subtitle: "Building High-Performance Teams",
    description: "Essential leadership skills for new and experienced managers. Master communication, delegation, feedback, motivation, and building high-performing teams.",
    learningObjectives: [
        "Apply situational leadership to adapt your style to team needs",
        "Deliver effective feedback using the SBI model",
        "Delegate tasks effectively while maintaining accountability",
        "Build psychological safety within your team",
        "Conduct productive one-on-ones and team meetings"
    ],
    standards: ["DDI Leadership", "CCL Research", "Blanchard Situational Leadership"],
    sections: [
        {
            id: "leadership-intro",
            title: "What Makes a Great Leader?",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Leadership vs. Management" },
                { type: "paragraph", text: "While management focuses on processes, systems, and maintaining order, leadership is about inspiring people, creating vision, and driving change. Great leaders are also good managers—but the reverse isn't always true." },
                { type: "definition", text: "Leadership: The ability to guide, inspire, and influence individuals or teams toward achieving common goals while developing their potential." },
                { type: "heading", text: "The Leadership Equation" },
                { type: "paragraph", text: "Research from organizations like Google (Project Oxygen) and Gallup shows that great leaders consistently demonstrate:" },
                {
                    type: "list", items: [
                        "Clear Communication: They set clear expectations and provide context",
                        "Psychological Safety: They create environments where people can take risks",
                        "Growth Mindset: They develop their people through coaching and feedback",
                        "Accountability: They hold themselves and others to high standards",
                        "Recognition: They acknowledge good work and celebrate wins"
                    ]
                },
                { type: "keypoint", text: "The #1 reason people leave their jobs is their manager. Your leadership directly impacts retention, engagement, and performance." },
                { type: "tip", text: "At [YOUR ORGANIZATION], our leadership philosophy emphasizes [YOUR LEADERSHIP VALUES]. Review [YOUR LEADERSHIP COMPETENCY MODEL] for specific expectations." }
            ]
        },
        {
            id: "situational",
            title: "Situational Leadership",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "One Size Does Not Fit All" },
                { type: "paragraph", text: "Developed by Ken Blanchard and Paul Hersey, Situational Leadership teaches that there is no single 'best' style of leadership. Effective leaders adapt their style based on the readiness and development level of the individual they are leading." },
                { type: "heading", text: "Four Leadership Styles" },
                {
                    type: "list", items: [
                        "S1 - Telling (Directing): High directive, low supportive. Best for enthusiastic beginners who need clear instructions.",
                        "S2 - Selling (Coaching): High directive, high supportive. Best for disillusioned learners who need guidance and encouragement.",
                        "S3 - Participating (Supporting): Low directive, high supportive. Best for capable but cautious performers who need confidence.",
                        "S4 - Delegating: Low directive, low supportive. Best for self-reliant achievers who can work independently."
                    ]
                },
                { type: "heading", text: "Matching Style to Development Level" },
                { type: "paragraph", text: "D1 (Enthusiastic Beginner) → S1 (Telling): New to the task but motivated. They need structure and clear direction." },
                { type: "paragraph", text: "D2 (Disillusioned Learner) → S2 (Selling): Some competence but struggling. They need coaching and encouragement." },
                { type: "paragraph", text: "D3 (Capable but Cautious) → S3 (Participating): Competent but may lack confidence. They need support and collaboration." },
                { type: "paragraph", text: "D4 (Self-Reliant Achiever) → S4 (Delegating): Highly competent and committed. They need autonomy and trust." },
                { type: "keypoint", text: "Development level is task-specific. Someone might be D4 on one task and D1 on another. Assess each situation individually." }
            ]
        },
        {
            id: "feedback-sbi",
            title: "Delivering Effective Feedback",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "The SBI Feedback Model" },
                { type: "paragraph", text: "The Situation-Behavior-Impact (SBI) model, developed by the Center for Creative Leadership, provides a clear structure for delivering feedback that is specific, objective, and actionable." },
                { type: "definition", text: "SBI Model: A feedback framework that describes the Situation, the Behavior observed, and the Impact of that behavior." },
                { type: "heading", text: "How to Use SBI" },
                {
                    type: "list", items: [
                        "Situation: Describe the specific situation or context. 'In yesterday's client meeting...'",
                        "Behavior: Describe the observable behavior (not your interpretation). 'You interrupted the client three times while they were explaining their concerns.'",
                        "Impact: Explain the impact of the behavior. 'The client seemed frustrated and cut the meeting short, and we didn't get the information we needed.'"
                    ]
                },
                { type: "heading", text: "SBI Examples" },
                { type: "paragraph", text: "Constructive feedback: 'In this morning's standup (Situation), you gave a very detailed update that took 10 minutes (Behavior). The team seemed disengaged, and we ran out of time for other updates (Impact). How can we make your updates more concise?'" },
                { type: "paragraph", text: "Positive feedback: 'In the presentation to the executive team (Situation), you anticipated their questions and had data ready to support each point (Behavior). They were clearly impressed and approved the project on the spot (Impact). Great preparation!'" },
                { type: "tip", text: "Feedback should be timely—ideally within 24-48 hours of the event. The longer you wait, the less effective it becomes." },
                { type: "warning", text: "Avoid 'you are' statements (personality judgments). Focus on 'you did' statements (observable behaviors)." }
            ]
        },
        {
            id: "delegation",
            title: "Effective Delegation",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Why Leaders Don't Delegate (But Should)" },
                { type: "paragraph", text: "Many leaders struggle with delegation because they think 'I can do it faster myself' or 'I don't want to overload my team.' But failing to delegate limits your team's growth and your own capacity." },
                { type: "heading", text: "The Five Levels of Delegation" },
                {
                    type: "list", items: [
                        "Level 1 - Wait to be told: 'Don't do anything until I tell you.' (Lowest autonomy)",
                        "Level 2 - Ask: 'Look into this and tell me the options. I'll decide.'",
                        "Level 3 - Recommend: 'Tell me what you recommend. I'll approve or adjust.'",
                        "Level 4 - Act and report: 'Make the decision and tell me what you did.'",
                        "Level 5 - Act independently: 'Make the decision. No need to report back.' (Highest autonomy)"
                    ]
                },
                { type: "keypoint", text: "Match the delegation level to the task criticality AND the person's development level. High-stakes decisions may need Level 2-3 even for experienced team members." },
                { type: "heading", text: "Delegation Best Practices" },
                {
                    type: "list", items: [
                        "Clearly define the desired outcome (not just the task)",
                        "Explain the 'why' - context and importance",
                        "Set clear boundaries (budget, timeline, authority limits)",
                        "Agree on check-in points and how to escalate issues",
                        "Provide resources and remove obstacles",
                        "Resist the urge to micromanage"
                    ]
                },
                { type: "warning", text: "Delegation is not abdication. You remain accountable for the outcome. Create appropriate checkpoints without hovering." }
            ]
        },
        {
            id: "leadership-quiz",
            title: "Knowledge Check: Leadership Styles",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "psych-safety",
            title: "Building Psychological Safety",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is Psychological Safety?" },
                { type: "definition", text: "Psychological Safety: A shared belief that the team is safe for interpersonal risk-taking—that one will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes." },
                { type: "paragraph", text: "Google's Project Aristotle found that psychological safety was the #1 factor distinguishing high-performing teams from others. It underpins innovation, learning, and performance." },
                { type: "heading", text: "Signs of Low Psychological Safety" },
                {
                    type: "list", items: [
                        "People don't ask questions in meetings",
                        "Mistakes are hidden rather than discussed openly",
                        "Team members don't challenge ideas (even bad ones)",
                        "People hesitate to share new or unconventional ideas",
                        "Blame is assigned when things go wrong"
                    ]
                },
                { type: "heading", text: "How to Build Psychological Safety" },
                {
                    type: "list", items: [
                        "Model fallibility: Admit your own mistakes openly",
                        "Invite input: Actively ask for opinions and questions",
                        "Respond productively: React to input with curiosity, not defensiveness",
                        "Normalize failure: Conduct blameless post-mortems",
                        "Show appreciation: Thank people for speaking up"
                    ]
                },
                { type: "keypoint", text: "'How can we learn from this?' is more powerful than 'Who is responsible for this?' Focus on learning, not blame." }
            ]
        },
        {
            id: "one-on-ones",
            title: "Running Effective One-on-Ones",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "The Power of One-on-Ones" },
                { type: "paragraph", text: "Regular one-on-one meetings are the single most important investment you can make in your relationships with direct reports. They build trust, surface issues early, and support development." },
                { type: "heading", text: "One-on-One Best Practices" },
                {
                    type: "list", items: [
                        "Schedule regularly (weekly or bi-weekly) and don't cancel",
                        "Let the employee own the agenda—it's their meeting",
                        "Ask questions and listen more than you talk (aim for 70/30)",
                        "Discuss development, not just status updates",
                        "Take notes and follow up on commitments",
                        "Hold them even when 'there's nothing to discuss'"
                    ]
                },
                { type: "heading", text: "Great Questions to Ask" },
                {
                    type: "list", items: [
                        "'What's on your mind this week?'",
                        "'What's going well? What's challenging?'",
                        "'How can I help you this week?'",
                        "'What feedback do you have for me?'",
                        "'What's one thing we should start, stop, or continue as a team?'",
                        "'Where do you want to be in 6-12 months, and how can I support that?'"
                    ]
                },
                { type: "tip", text: "At [YOUR ORGANIZATION], managers are expected to hold [YOUR 1:1 FREQUENCY] one-on-ones. Use [YOUR 1:1 TEMPLATE/TOOL] to track discussions and action items." }
            ]
        },
        {
            id: "leadership-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "lq1",
            question: "In the Situational Leadership model, which style should you use with an 'enthusiastic beginner'?",
            options: ["Delegating", "Participating", "Selling", "Telling"],
            correctIndex: 3,
            explanation: "Enthusiastic beginners (D1) need Telling/Directing (S1) - high directive, low supportive. They are new to the task but motivated, so they need clear structure and instructions."
        },
        {
            id: "lq2",
            question: "What does 'SBI' stand for in the SBI Feedback Model?",
            options: [
                "Specific, Bold, Immediate",
                "Situation, Behavior, Impact",
                "Summary, Background, Insights",
                "Start, Build, Improve"
            ],
            correctIndex: 1,
            explanation: "SBI stands for Situation, Behavior, Impact. This framework helps deliver specific, objective feedback."
        },
        {
            id: "lq3",
            question: "Which factor did Google's Project Aristotle identify as #1 for high-performing teams?",
            options: [
                "Technical skills",
                "Team size",
                "Psychological safety",
                "Individual performance"
            ],
            correctIndex: 2,
            explanation: "Psychological safety was the #1 factor. Teams where members feel safe to take interpersonal risks consistently outperform others."
        },
        {
            id: "lq4",
            question: "What is the recommended talk/listen ratio for managers in one-on-ones?",
            options: ["90% talking / 10% listening", "70% talking / 30% listening", "50% talking / 50% listening", "30% talking / 70% listening"],
            correctIndex: 3,
            explanation: "Managers should aim for about 30% talking and 70% listening in one-on-ones. It's the employee's meeting—your job is to ask questions and listen."
        }
    ]
};

// ==================== AI PROMPT ENGINEERING ====================
export const promptEngineeringContent: TrainingModuleContent = {
    id: "prompt-engineering",
    title: "Prompt Engineering Masterclass",
    subtitle: "Getting the Best Results from AI",
    description: "Learn advanced prompting techniques for ChatGPT, Claude, Gemini, and other AI assistants. Master chain-of-thought, few-shot learning, and production-ready patterns.",
    learningObjectives: [
        "Write clear, effective prompts that get accurate results",
        "Apply advanced techniques: chain-of-thought, few-shot, role-playing",
        "Structure prompts for consistent, reproducible outputs",
        "Identify and avoid common prompting mistakes",
        "Use AI ethically and responsibly in your work"
    ],
    standards: ["OpenAI Best Practices", "Anthropic Guidelines", "Google AI Principles"],
    sections: [
        {
            id: "prompt-intro",
            title: "Introduction to Prompt Engineering",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "What is Prompt Engineering?" },
                { type: "paragraph", text: "Prompt engineering is the art and science of designing inputs (prompts) for AI language models to get the most useful, accurate, and relevant outputs. As AI becomes more integrated into work, prompt engineering is becoming an essential skill." },
                { type: "definition", text: "Prompt Engineering: The practice of designing and refining inputs to AI systems to achieve desired outputs effectively and reliably." },
                { type: "heading", text: "Why Prompts Matter" },
                { type: "paragraph", text: "The same AI model can give vastly different results based on how you ask. A well-crafted prompt can mean the difference between a useless response and a highly valuable one." },
                {
                    type: "list", items: [
                        "Vague prompt: 'Write about marketing' → Generic, unfocused output",
                        "Clear prompt: 'Write 5 email subject lines for a B2B SaaS product launch targeting CTOs, emphasizing time savings and ROI' → Specific, useful output"
                    ]
                },
                { type: "keypoint", text: "AI is like a brilliant but literal-minded assistant. It will do exactly what you ask—so you need to ask clearly and completely." }
            ]
        },
        {
            id: "prompt-basics",
            title: "Fundamental Prompting Techniques",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "The CRAFT Framework" },
                { type: "paragraph", text: "Use CRAFT to structure effective prompts:" },
                {
                    type: "list", items: [
                        "Context: Provide background information and situation",
                        "Role: Tell the AI what persona or expertise to adopt",
                        "Action: Clearly state what you want it to do",
                        "Format: Specify the desired output format",
                        "Tone: Indicate style, formality, and voice"
                    ]
                },
                { type: "heading", text: "Example Using CRAFT" },
                { type: "paragraph", text: "Weak prompt: 'Help me write an email.'" },
                { type: "paragraph", text: "Strong prompt using CRAFT:" },
                {
                    type: "list", items: [
                        "Context: 'Our software had a service outage yesterday affecting 500 customers for 2 hours.'",
                        "Role: 'Act as a customer success manager with 10 years experience handling incidents.'",
                        "Action: 'Write an apology email to affected customers.'",
                        "Format: 'Keep it to 150 words. Include a subject line and clear next steps.'",
                        "Tone: 'Professional, empathetic, and solution-focused.'"
                    ]
                },
                { type: "heading", text: "Be Specific About Output Format" },
                {
                    type: "list", items: [
                        "'Give me a bulleted list of 5 items'",
                        "'Format as a markdown table with columns: Name, Role, Email'",
                        "'Respond in JSON format with keys: title, summary, tags'",
                        "'Write in paragraph form, approximately 200 words'",
                        "'Provide step-by-step numbered instructions'"
                    ]
                },
                { type: "tip", text: "When using AI at [YOUR ORGANIZATION], always follow [YOUR AI USAGE POLICY]. Never share confidential customer data with external AI tools without approval from [YOUR AI GOVERNANCE TEAM]." }
            ]
        },
        {
            id: "advanced-prompts",
            title: "Advanced Techniques",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "Chain-of-Thought Prompting" },
                { type: "paragraph", text: "Chain-of-thought prompting asks the AI to 'think step by step' through a problem. This dramatically improves accuracy on complex reasoning tasks." },
                { type: "paragraph", text: "Example: Instead of 'What is 17 * 28?', try 'Calculate 17 * 28 step by step, showing your work.'" },
                {
                    type: "list", items: [
                        "Add phrases like 'Think step by step' or 'Let's work through this carefully'",
                        "Ask the AI to 'explain your reasoning' before giving final answers",
                        "For complex problems, break them into explicit sub-questions"
                    ]
                },
                { type: "heading", text: "Few-Shot Learning" },
                { type: "paragraph", text: "Provide examples of the input-output pattern you want. This helps the AI understand exactly what you're looking for." },
                { type: "paragraph", text: "Example:" },
                {
                    type: "list", items: [
                        "Input: 'The product was terrible' → Output: 'Negative'",
                        "Input: 'Absolutely loved it!' → Output: 'Positive'",
                        "Input: 'It was okay I guess' → Output: 'Neutral'",
                        "Now classify: 'Best purchase I've ever made!'"
                    ]
                },
                { type: "heading", text: "Role-Playing / Persona Prompting" },
                { type: "paragraph", text: "Assigning a role or persona can dramatically change the quality and style of responses:" },
                {
                    type: "list", items: [
                        "'You are an expert financial analyst...'",
                        "'Act as a skeptical reviewer looking for flaws...'",
                        "'Respond as if you're explaining this to a 5-year-old...'",
                        "'You are a senior software engineer conducting a code review...'"
                    ]
                },
                { type: "keypoint", text: "Combining techniques works even better. Try: Role + Chain-of-thought + Format specification for the best results." }
            ]
        },
        {
            id: "prompting-quiz",
            title: "Practice: Improve These Prompts",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "prompt-safety",
            title: "AI Ethics and Responsible Use",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Responsible AI Use at Work" },
                { type: "paragraph", text: "AI is a powerful tool, but it comes with responsibilities. Using AI ethically protects you, your organization, and the people your work affects." },
                { type: "heading", text: "Key Principles" },
                {
                    type: "list", items: [
                        "Verify outputs: AI can be confidently wrong ('hallucinate'). Always fact-check important information.",
                        "Protect privacy: Never input confidential customer data, PII, or trade secrets without proper authorization.",
                        "Maintain human oversight: AI should assist decisions, not make them autonomously for high-stakes situations.",
                        "Be transparent: Disclose AI use where appropriate (e.g., AI-generated content).",
                        "Avoid bias: Be aware that AI can reflect and amplify biases in training data."
                    ]
                },
                { type: "warning", text: "AI outputs can contain errors, biases, or fabricated information. You are responsible for reviewing and validating all AI-assisted work before using it." },
                { type: "heading", text: "What NOT to Share with AI" },
                {
                    type: "list", items: [
                        "Customer personal data or health information",
                        "Proprietary code or trade secrets",
                        "Unannounced products or strategies",
                        "Employee personal information",
                        "Anything covered by NDA or confidentiality agreements"
                    ]
                },
                { type: "tip", text: "[YOUR ORGANIZATION]'s AI policy is available at [YOUR AI POLICY LOCATION]. For approved AI tools, see [YOUR APPROVED TOOLS LIST]. Questions? Contact [YOUR AI GOVERNANCE CONTACT]." }
            ]
        },
        {
            id: "prompt-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "pq1",
            question: "What does 'chain-of-thought' prompting encourage the AI to do?",
            options: [
                "Write longer responses",
                "Think and reason step by step",
                "Connect multiple conversations",
                "Search the internet for answers"
            ],
            correctIndex: 1,
            explanation: "Chain-of-thought prompting encourages the AI to reason through a problem step by step, which significantly improves accuracy on complex reasoning tasks."
        },
        {
            id: "pq2",
            question: "What is 'few-shot learning' in prompt engineering?",
            options: [
                "Training a new AI model with minimal data",
                "Providing example input-output pairs in your prompt",
                "Using AI for quick, short tasks only",
                "Limiting the AI's response length"
            ],
            correctIndex: 1,
            explanation: "Few-shot learning means providing examples of the desired input-output pattern in your prompt, helping the AI understand exactly what you're looking for."
        },
        {
            id: "pq3",
            question: "Why should you always verify AI outputs?",
            options: [
                "AI is slow and might time out",
                "AI can be confidently wrong ('hallucinate')",
                "AI responses expire after 24 hours",
                "AI cannot process text correctly"
            ],
            correctIndex: 1,
            explanation: "AI can 'hallucinate'—generate plausible-sounding but incorrect information with high confidence. Always fact-check important information."
        }
    ]
};

// Export extended modules
export const extendedModuleContent: Record<string, TrainingModuleContent> = {
    "gdpr-data-privacy": gdprDataPrivacyContent,
    "data-privacy-gdpr": gdprDataPrivacyContent,
    "leadership-fundamentals": leadershipFundamentalsContent,
    "leadership-101": leadershipFundamentalsContent,
    "prompt-engineering-masterclass": promptEngineeringContent,
    "prompt-engineering": promptEngineeringContent,
    "ai-prompting": promptEngineeringContent,
};
