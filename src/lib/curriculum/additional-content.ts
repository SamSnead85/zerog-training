// ZeroG Training - Additional Training Modules
// Tech, Onboarding, and Specialized Content

import type { TrainingModuleContent } from "./module-content";

// ==================== CUSTOMER SERVICE EXCELLENCE ====================
export const customerServiceContent: TrainingModuleContent = {
    id: "customer-service-excellence",
    title: "Customer Service Excellence",
    subtitle: "Delivering Exceptional Customer Experiences",
    description: "Master the art of customer service with proven techniques for handling difficult conversations, exceeding expectations, and building customer loyalty.",
    learningObjectives: [
        "Apply active listening and empathy in customer interactions",
        "Handle complaints and difficult situations professionally",
        "Turn unhappy customers into loyal advocates",
        "Use positive language to shape customer perception",
        "De-escalate tense situations effectively"
    ],
    standards: ["Customer Experience Professionals Association (CXPA)", "Service Quality Institute Methods"],
    sections: [
        {
            id: "cs-intro",
            title: "The Customer Service Mindset",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Why Customer Service Matters" },
                { type: "paragraph", text: "Customer experience is now the primary competitive differentiator. Research shows that 86% of customers are willing to pay more for a better experience, and 73% consider experience a decisive factor in purchasing decisions." },
                { type: "keypoint", text: "It costs 5-7x more to acquire a new customer than to retain an existing one. Every customer interaction is an opportunity to build or break loyalty." },
                { type: "heading", text: "The Service-Profit Chain" },
                { type: "paragraph", text: "Happy employees create happy customers. Happy customers drive revenue growth. Companies with high employee engagement see 20% higher customer satisfaction scores." },
                { type: "heading", text: "Your Impact" },
                {
                    type: "list", items: [
                        "You ARE the company in the customer's eyes",
                        "Every interaction shapes their overall impression",
                        "One bad experience is shared with ~15 people",
                        "One good experience is shared with ~11 people",
                        "It takes 12 positive experiences to make up for 1 unresolved negative experience"
                    ]
                },
                { type: "tip", text: "At [YOUR ORGANIZATION], our customer service philosophy is based on [YOUR SERVICE VALUES]. Review [YOUR SERVICE STANDARDS DOCUMENT] for specific expectations." }
            ]
        },
        {
            id: "active-listening",
            title: "Active Listening & Empathy",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "The HEAR Model" },
                { type: "definition", text: "Active Listening: Fully concentrating on, understanding, responding to, and remembering what is being said. It's about making the speaker feel heard." },
                {
                    type: "list", items: [
                        "H - HALT: Stop what you're doing and give full attention",
                        "E - ENGAGE: Face the customer, make eye contact (or verbal acknowledgment on phone)",
                        "A - ANTICIPATE: Think about what they might say or need next",
                        "R - REPLAY: Summarize what you heard to confirm understanding"
                    ]
                },
                { type: "heading", text: "Empathy vs. Sympathy" },
                { type: "paragraph", text: "Sympathy is 'feeling bad FOR someone.' Empathy is 'feeling WITH someone.' Customers don't want pity—they want to feel understood." },
                { type: "heading", text: "Empathy Statements" },
                {
                    type: "list", items: [
                        "'I understand how frustrating that must be.'",
                        "'I'd feel the same way if that happened to me.'",
                        "'That's a really valid concern, and I appreciate you bringing it to my attention.'",
                        "'I can see why that would be upsetting.'",
                        "'Thank you for your patience while we work through this.'"
                    ]
                },
                { type: "warning", text: "Avoid phrases like 'I understand' without specifics—it can feel dismissive. Instead, name the specific emotion or frustration." }
            ]
        },
        {
            id: "positive-language",
            title: "The Power of Positive Language",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Words Shape Reality" },
                { type: "paragraph", text: "The same information delivered with different words creates completely different experiences. Positive language focuses on what CAN be done, not what can't." },
                { type: "heading", text: "Negative → Positive Transformations" },
                {
                    type: "list", items: [
                        "'I don't know' → 'That's a great question. Let me find out for you.'",
                        "'That's not my department' → 'Let me connect you with someone who specializes in that.'",
                        "'You'll have to...' → 'Here's what you can do...'",
                        "'No, we can't do that' → 'What I can do is...'",
                        "'You're wrong' → 'I can see how that might be confusing. Let me clarify...'",
                        "'Calm down' → 'I hear you, and I want to help.'",
                        "'It's company policy' → 'Here's why we do it this way...'"
                    ]
                },
                { type: "keypoint", text: "Always lead with what you CAN do, even when delivering disappointing news. People respond better when they feel options exist." },
                { type: "heading", text: "Power Words" },
                {
                    type: "list", items: [
                        "'Absolutely' - Confidence and enthusiasm",
                        "'I appreciate...' - Validates their effort or patience",
                        "'Gladly' - Shows willingness to help",
                        "'Right away' - Conveys urgency and importance",
                        "'I'll personally ensure...' - Takes ownership"
                    ]
                }
            ]
        },
        {
            id: "difficult-customers",
            title: "Handling Difficult Situations",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The LAST Framework" },
                { type: "paragraph", text: "When customers are upset, use LAST to guide your response:" },
                {
                    type: "list", items: [
                        "L - LISTEN: Let them fully express their concern without interrupting",
                        "A - APOLOGIZE: Acknowledge their experience (not necessarily accept fault)",
                        "S - SOLVE: Offer a solution or next steps",
                        "T - THANK: Thank them for bringing the issue to your attention"
                    ]
                },
                { type: "heading", text: "De-escalation Techniques" },
                {
                    type: "list", items: [
                        "Lower your voice slightly (they'll often match your tone)",
                        "Slow your pace—urgency increases anxiety",
                        "Use their name (but not excessively)",
                        "Acknowledge feelings before facts",
                        "Offer choices—control reduces frustration",
                        "Take personal ownership: 'I will...' not 'We might...'"
                    ]
                },
                { type: "heading", text: "What NOT to Do" },
                {
                    type: "list", items: [
                        "Don't take it personally—they're frustrated at the situation, not you",
                        "Don't argue or get defensive",
                        "Don't blame colleagues, other departments, or the customer",
                        "Don't make promises you can't keep",
                        "Don't use technical jargon or policy-speak"
                    ]
                },
                { type: "warning", text: "If a customer becomes abusive, threatening, or uses discriminatory language, you have the right to end the interaction. Follow [YOUR ORGANIZATION'S ESCALATION PROCEDURE]." }
            ]
        },
        {
            id: "cs-scenario",
            title: "Scenario: The Angry Customer",
            type: "scenario",
            duration: "5 min",
            content: [
                { type: "heading", text: "Real-World Scenario" },
                { type: "paragraph", text: "A customer calls furious because their order arrived damaged for the second time. They say, 'This is ridiculous! I'm never buying from you again. What kind of company can't even ship a product without breaking it?' How do you respond?" }
            ]
        },
        {
            id: "cs-quiz",
            title: "Knowledge Check: Customer Service Scenarios",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "cs-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "csq1",
            question: "What does the 'L' in the LAST framework stand for?",
            options: ["Lead", "Listen", "Learn", "Leverage"],
            correctIndex: 1,
            explanation: "L stands for Listen. Letting customers fully express their concerns without interruption is the critical first step in de-escalation."
        },
        {
            id: "csq2",
            question: "Instead of saying 'That's not my department,' what should you say?",
            options: [
                "'Call back later'",
                "'Let me connect you with someone who specializes in that'",
                "'Check the website'",
                "'I don't handle that'"
            ],
            correctIndex: 1,
            explanation: "This response takes ownership and guides the customer to help, rather than making them feel dismissed or bounced around."
        },
        {
            id: "csq3",
            question: "What is the difference between empathy and sympathy?",
            options: [
                "They mean the same thing",
                "Empathy is feeling WITH someone; sympathy is feeling FOR them",
                "Sympathy requires action; empathy doesn't",
                "Empathy is only for positive situations"
            ],
            correctIndex: 1,
            explanation: "Empathy means feeling with someone—understanding their perspective. Sympathy is feeling sorry for them, which can feel patronizing."
        }
    ]
};

// ==================== TIME MANAGEMENT & PRODUCTIVITY ====================
export const timeManagementContent: TrainingModuleContent = {
    id: "time-management",
    title: "Time Management & Productivity",
    subtitle: "Work Smarter, Not Harder",
    description: "Master proven productivity techniques including prioritization frameworks, focus management, and sustainable work practices. Learn to manage your time and energy for peak performance.",
    learningObjectives: [
        "Apply the Eisenhower Matrix to prioritize effectively",
        "Implement time-blocking and deep work practices",
        "Manage distractions and protect focus time",
        "Use the 2-minute rule and batching for efficiency",
        "Prevent burnout through sustainable productivity"
    ],
    standards: ["GTD Methodology", "Deep Work Principles", "Evidence-Based Productivity Research"],
    sections: [
        {
            id: "tm-intro",
            title: "The Productivity Paradox",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "Busy ≠ Productive" },
                { type: "paragraph", text: "We live in a culture that celebrates busyness. But being busy isn't the same as being productive. Productivity is about outcomes, not hours worked." },
                { type: "definition", text: "Productivity: Achieving your most important goals efficiently, while maintaining well-being and sustainability." },
                { type: "heading", text: "The Cost of Poor Time Management" },
                {
                    type: "list", items: [
                        "Professionals lose 28% of their day to unnecessary emails and interruptions",
                        "It takes 23 minutes to fully refocus after an interruption",
                        "Multitasking reduces productivity by up to 40%",
                        "Decision fatigue diminishes quality as the day progresses"
                    ]
                },
                { type: "keypoint", text: "You can't manage time—everyone has the same 24 hours. You can only manage your energy, attention, and choices." }
            ]
        },
        {
            id: "eisenhower",
            title: "The Eisenhower Matrix",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Urgent vs. Important" },
                { type: "paragraph", text: "President Eisenhower famously said, 'What is important is seldom urgent and what is urgent is seldom important.' His matrix helps distinguish between the two." },
                { type: "heading", text: "The Four Quadrants" },
                {
                    type: "list", items: [
                        "Q1 - Urgent & Important (DO): Crises, deadlines, emergencies. Handle immediately.",
                        "Q2 - Not Urgent but Important (SCHEDULE): Strategic work, relationships, planning, growth. Schedule dedicated time.",
                        "Q3 - Urgent but Not Important (DELEGATE): Interruptions, some meetings, some emails. Delegate or minimize.",
                        "Q4 - Not Urgent & Not Important (ELIMINATE): Time-wasters, excessive social media, busywork. Eliminate."
                    ]
                },
                { type: "keypoint", text: "The goal is to spend more time in Q2 (Important but Not Urgent). This is where real growth, prevention, and strategic work happen." },
                { type: "heading", text: "Common Traps" },
                {
                    type: "list", items: [
                        "Living in Q1 (crisis mode) causes burnout",
                        "Mistaking Q3 for Q1 (other people's urgencies aren't your priorities)",
                        "Escaping to Q4 when stressed (procrastination disguised as 'breaks')"
                    ]
                },
                { type: "tip", text: "Each morning, identify your ONE most important Q2 task. Protect time for it before opening email or attending meetings." }
            ]
        },
        {
            id: "deep-work",
            title: "Deep Work & Focus",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "What is Deep Work?" },
                { type: "definition", text: "Deep Work: Professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. This is where value is created." },
                { type: "paragraph", text: "Cal Newport's research shows that the ability to focus without distraction is becoming increasingly rare—and increasingly valuable." },
                { type: "heading", text: "Time Blocking" },
                { type: "paragraph", text: "Schedule your day in blocks rather than working reactively. Assign specific time periods to specific types of work:" },
                {
                    type: "list", items: [
                        "Deep Work Blocks (90-120 min): Complex tasks requiring focus",
                        "Shallow Work Blocks (30-60 min): Email, admin, routine tasks",
                        "Meeting Blocks: Batch meetings together when possible",
                        "Buffer Blocks: Space for overflow and unexpected items"
                    ]
                },
                { type: "heading", text: "Protecting Focus" },
                {
                    type: "list", items: [
                        "Schedule deep work during your peak energy hours",
                        "Turn off notifications during focus blocks",
                        "Use visual signals (headphones, status indicators)",
                        "Close email and chat—check at scheduled times",
                        "Work in a consistent location for deep work (context matters)"
                    ]
                },
                { type: "warning", text: "Context switching is expensive. Each switch costs 15-25 minutes of regaining full focus. Minimize task-switching." }
            ]
        },
        {
            id: "quick-wins",
            title: "Quick Productivity Techniques",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "The 2-Minute Rule" },
                { type: "paragraph", text: "From David Allen's Getting Things Done: If a task takes less than 2 minutes, do it immediately. The overhead of tracking it exceeds the time to just do it." },
                { type: "heading", text: "Batching" },
                { type: "paragraph", text: "Group similar tasks together and do them in a single session. Examples:" },
                {
                    type: "list", items: [
                        "Process email at set times (e.g., 9am, 1pm, 4pm)",
                        "Make all phone calls in one block",
                        "Batch meetings on certain days",
                        "Do all expense reports at once"
                    ]
                },
                { type: "heading", text: "Eat the Frog" },
                { type: "paragraph", text: "Mark Twain said, 'Eat a live frog first thing in the morning, and nothing worse will happen to you the rest of the day.' Do your most important (or dreaded) task first." },
                { type: "heading", text: "The Pomodoro Technique" },
                {
                    type: "list", items: [
                        "Work for 25 minutes in focused sprints",
                        "Take a 5-minute break",
                        "After 4 pomodoros, take a longer 15-30 minute break",
                        "Adjust timing based on your optimal focus duration"
                    ]
                },
                { type: "tip", text: "[YOUR ORGANIZATION] supports focus time. Use [YOUR FOCUS TIME TOOLS/POLICIES] to protect deep work periods." }
            ]
        },
        {
            id: "tm-quiz",
            title: "Knowledge Check: Prioritization",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "sustainable",
            title: "Sustainable Productivity",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "The Energy Equation" },
                { type: "paragraph", text: "Performance = Time × Energy × Focus. You can't sustainably increase time, but you can manage energy and focus." },
                { type: "heading", text: "Managing Your Energy" },
                {
                    type: "list", items: [
                        "Know your chronotype: Are you a morning person or night owl?",
                        "Schedule demanding work during peak energy hours",
                        "Take real breaks (stepping away, not checking phone)",
                        "Move physically—even 5 minutes helps reset energy",
                        "Eat for sustained energy (avoid sugar spikes and crashes)"
                    ]
                },
                { type: "heading", text: "Preventing Burnout" },
                {
                    type: "list", items: [
                        "Set boundaries—work has an end time",
                        "Protect at least one full rest day per week",
                        "Build recovery into your schedule, not just your vacations",
                        "Say no to protect yes—you can't do everything",
                        "Celebrate completions, not just starts"
                    ]
                },
                { type: "keypoint", text: "Sustainable productivity isn't about squeezing more out of every minute. It's about doing your best work while maintaining your wellbeing." }
            ]
        },
        {
            id: "tm-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "tmq1",
            question: "In the Eisenhower Matrix, which quadrant should you spend MORE time in?",
            options: [
                "Q1 - Urgent & Important",
                "Q2 - Important but Not Urgent",
                "Q3 - Urgent but Not Important",
                "Q4 - Neither Urgent nor Important"
            ],
            correctIndex: 1,
            explanation: "Q2 (Important but Not Urgent) is where strategic work, growth, and prevention happen. Spending more time here reduces crises (Q1)."
        },
        {
            id: "tmq2",
            question: "According to research, how long does it take to fully refocus after an interruption?",
            options: ["5 minutes", "10 minutes", "23 minutes", "45 minutes"],
            correctIndex: 2,
            explanation: "Research shows it takes an average of 23 minutes to fully regain focus after an interruption. This is why protecting focus time is so valuable."
        },
        {
            id: "tmq3",
            question: "What is the 2-Minute Rule?",
            options: [
                "Take a 2-minute break every hour",
                "If a task takes less than 2 minutes, do it immediately",
                "Spend 2 minutes planning before any task",
                "Limit social media to 2 minutes per day"
            ],
            correctIndex: 1,
            explanation: "The 2-Minute Rule states that if a task takes less than 2 minutes, you should do it immediately rather than add it to your to-do list."
        }
    ]
};

// ==================== CONFLICT RESOLUTION ====================
export const conflictResolutionContent: TrainingModuleContent = {
    id: "conflict-resolution",
    title: "Conflict Resolution Skills",
    subtitle: "Turning Conflict into Collaboration",
    description: "Learn to navigate workplace conflict constructively. Master techniques for difficult conversations, mediation, and building collaborative solutions.",
    learningObjectives: [
        "Identify different conflict styles and when to use each",
        "Apply the Interest-Based Relational (IBR) approach",
        "Conduct difficult conversations using structured frameworks",
        "De-escalate emotionally charged situations",
        "Facilitate resolution between conflicting parties"
    ],
    standards: ["Thomas-Kilmann Conflict Model", "Harvard Negotiation Project", "Crucial Conversations Framework"],
    sections: [
        {
            id: "conflict-intro",
            title: "Understanding Workplace Conflict",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Conflict is Inevitable" },
                { type: "paragraph", text: "Where there are people, there is conflict. The goal isn't to eliminate conflict—it's to handle it constructively. Well-managed conflict can actually strengthen relationships and drive innovation." },
                { type: "heading", text: "The Cost of Unmanaged Conflict" },
                {
                    type: "list", items: [
                        "US employees spend 2.8 hours per week dealing with conflict",
                        "25% of employees have seen conflict lead to sickness or absence",
                        "Unresolved conflict leads to 50% of resignations",
                        "Managers spend 20-40% of their time managing conflict"
                    ]
                },
                { type: "heading", text: "Types of Workplace Conflict" },
                {
                    type: "list", items: [
                        "Task conflict: Disagreements about work itself (can be productive)",
                        "Process conflict: Disagreements about how work gets done",
                        "Relationship conflict: Personal friction between individuals (most destructive)",
                        "Status conflict: Disputes over position, recognition, or authority"
                    ]
                },
                { type: "keypoint", text: "Task conflict handled well leads to better decisions. Relationship conflict almost always hurts performance. The key is keeping task conflict from becoming personal." }
            ]
        },
        {
            id: "conflict-styles",
            title: "Conflict Styles",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "The Thomas-Kilmann Model" },
                { type: "paragraph", text: "There are five basic approaches to conflict, based on two dimensions: concern for self (assertiveness) and concern for others (cooperativeness)." },
                {
                    type: "list", items: [
                        "Competing (High self, Low other): Win-lose. I get what I need at your expense. Use sparingly—only for quick, decisive action on important issues.",
                        "Accommodating (Low self, High other): Lose-win. I give in to preserve the relationship. Use when the issue matters more to them or you were wrong.",
                        "Avoiding (Low self, Low other): Lose-lose. I withdraw from the conflict. Use when emotions are too high or the issue is trivial.",
                        "Collaborating (High self, High other): Win-win. We find a solution that meets both needs. Use for important issues where relationship matters.",
                        "Compromising (Medium self, Medium other): Both give something up. Use when time is short and a good-enough solution is acceptable."
                    ]
                },
                { type: "heading", text: "Matching Style to Situation" },
                { type: "paragraph", text: "There is no 'best' style—each is appropriate in different situations. Skill means being able to choose and adapt your approach." },
                { type: "keypoint", text: "Collaboration produces the best outcomes when it's possible, but takes the most time and effort. Choose your battles." }
            ]
        },
        {
            id: "difficult-convos",
            title: "Having Difficult Conversations",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "The D.E.S.C. Script" },
                { type: "paragraph", text: "Use D.E.S.C. to structure difficult conversations in a non-confrontational way:" },
                {
                    type: "list", items: [
                        "D - DESCRIBE: Describe the specific behavior or situation objectively. No judgments or labels.",
                        "E - EXPRESS: Express how the behavior affects you using 'I' statements.",
                        "S - SPECIFY: Specify what you would like to happen instead.",
                        "C - CONSEQUENCES: Explain the positive consequences of change (not threats)."
                    ]
                },
                { type: "heading", text: "Example Script" },
                {
                    type: "list", items: [
                        "D: 'In the last three meetings, you interrupted me while I was presenting.'",
                        "E: 'I feel frustrated because I can't complete my points, and it undermines me in front of the team.'",
                        "S: 'I'd appreciate it if you could hold questions until I'm finished presenting.'",
                        "C: 'That would help our meetings run smoother and ensure everyone's ideas get heard.'"
                    ]
                },
                { type: "heading", text: "Before the Conversation" },
                {
                    type: "list", items: [
                        "Check your intent: Are you trying to solve a problem or prove you're right?",
                        "Choose the right time and place (private, not when either is stressed)",
                        "Prepare your D.E.S.C. script (writing it helps clarify)",
                        "Anticipate their perspective—what might they say?",
                        "Define your ideal outcome and acceptable alternatives"
                    ]
                },
                { type: "warning", text: "Avoid having difficult conversations via email or text. Tone is often misread, and it can escalate quickly." }
            ]
        },
        {
            id: "conflict-quiz",
            title: "Knowledge Check: Conflict Scenarios",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "mediation",
            title: "Mediating Between Others",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "When to Step In" },
                { type: "paragraph", text: "As a manager or colleague, you may need to help resolve conflict between others. Step in when:" },
                {
                    type: "list", items: [
                        "The conflict is affecting team performance or morale",
                        "The parties cannot resolve it themselves",
                        "The situation is escalating or becoming personal",
                        "One party asks for help"
                    ]
                },
                { type: "heading", text: "Mediation Steps" },
                {
                    type: "list", items: [
                        "1. Meet with each party separately first (understand perspectives)",
                        "2. Set ground rules (respect, no interruptions, focus on issues not people)",
                        "3. Let each party share their perspective uninterrupted",
                        "4. Identify common ground and shared interests",
                        "5. Generate options together—don't impose solutions",
                        "6. Agree on specific actions and follow-up"
                    ]
                },
                { type: "heading", text: "Neutrality is Key" },
                {
                    type: "list", items: [
                        "Listen equally to both sides",
                        "Avoid taking sides or assigning blame",
                        "Focus on behaviors and impacts, not personalities",
                        "Acknowledge both perspectives as valid",
                        "Redirect personal attacks back to the issue"
                    ]
                },
                { type: "tip", text: "If you can't be neutral (e.g., one party reports to you), involve [YOUR HR BUSINESS PARTNER] or another neutral party to facilitate." }
            ]
        },
        {
            id: "conflict-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "crq1",
            question: "Which conflict style aims for a win-win solution that meets both parties' needs?",
            options: ["Competing", "Compromising", "Collaborating", "Accommodating"],
            correctIndex: 2,
            explanation: "Collaborating seeks a win-win solution where both parties' needs are fully met. It takes more time but produces the best outcomes."
        },
        {
            id: "crq2",
            question: "What does the 'E' in the D.E.S.C. script stand for?",
            options: ["Explain", "Express", "Evaluate", "Engage"],
            correctIndex: 1,
            explanation: "E stands for Express—expressing how the behavior affects you using 'I' statements, which is less confrontational than 'you' accusations."
        },
        {
            id: "crq3",
            question: "According to research, what percentage of resignations are attributed to unresolved conflict?",
            options: ["10%", "25%", "50%", "75%"],
            correctIndex: 2,
            explanation: "Research shows that 50% of resignations are related to unresolved workplace conflict, making effective conflict resolution a retention strategy."
        }
    ]
};

// ==================== REMOTE WORK ESSENTIALS ====================
export const remoteWorkContent: TrainingModuleContent = {
    id: "remote-work-essentials",
    title: "Remote Work Essentials",
    subtitle: "Thriving in a Distributed Workplace",
    description: "Master the skills and practices for effective remote work. Learn to stay productive, communicate effectively, and maintain work-life balance when working from home or distributed locations.",
    learningObjectives: [
        "Set up an effective remote work environment",
        "Communicate asynchronously and synchronously with remote teams",
        "Maintain productivity and focus without direct supervision",
        "Build connection and trust with remote colleagues",
        "Establish healthy work-life boundaries"
    ],
    standards: ["Distributed Work Research", "GitLab Remote Playbook", "Zapier Remote Guidelines"],
    sections: [
        {
            id: "remote-intro",
            title: "The Remote Work Landscape",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "Remote Work is Here to Stay" },
                { type: "paragraph", text: "Remote and hybrid work have become permanent features of the modern workplace. Success requires intentional practices—what works in an office doesn't automatically translate to distributed work." },
                { type: "heading", text: "Benefits and Challenges" },
                { type: "paragraph", text: "Benefits:" },
                {
                    type: "list", items: [
                        "Flexibility and autonomy",
                        "No commute time or cost",
                        "Access to global talent pools",
                        "Often increased productivity for focus work"
                    ]
                },
                { type: "paragraph", text: "Challenges:" },
                {
                    type: "list", items: [
                        "Isolation and loneliness",
                        "Communication gaps",
                        "Work-life boundary blurring",
                        "Building trust and relationships"
                    ]
                },
                { type: "keypoint", text: "Remote work success depends on intentionality. You must deliberately create structure, communication, and connection that happen naturally in an office." }
            ]
        },
        {
            id: "workspace",
            title: "Your Remote Workspace",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Setting Up for Success" },
                { type: "paragraph", text: "Your environment shapes your work. A dedicated, well-set-up workspace improves focus, professionalism, and even physical health." },
                { type: "heading", text: "Workspace Essentials" },
                {
                    type: "list", items: [
                        "Dedicated space: Ideally a separate room; at minimum, a designated area",
                        "Ergonomic setup: Proper chair, desk, monitor at eye level",
                        "Reliable internet: Have a backup plan (mobile hotspot, café nearby)",
                        "Professional backdrop: Clean, neutral background for video calls",
                        "Lighting: Face a window or use a ring light for video",
                        "Minimal distractions: Noise-canceling headphones if needed"
                    ]
                },
                { type: "heading", text: "Rituals and Boundaries" },
                {
                    type: "list", items: [
                        "Start the day with a 'commute' ritual (walk, coffee, getting dressed)",
                        "Keep regular working hours when possible",
                        "Have a 'shutdown' ritual to end the work day",
                        "Close the laptop and leave the workspace when done",
                        "Communicate your boundaries to household members"
                    ]
                },
                { type: "tip", text: "[YOUR ORGANIZATION] offers [YOUR REMOTE WORK STIPEND/EQUIPMENT POLICY] to help set up your home workspace. Contact [YOUR HR/IT DEPT] for details." }
            ]
        },
        {
            id: "async-communication",
            title: "Asynchronous Communication",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Async-First Mindset" },
                { type: "definition", text: "Asynchronous Communication: Communication that doesn't require immediate response. Examples: email, documentation, recorded videos, shared documents." },
                { type: "paragraph", text: "In a distributed team across time zones, real-time communication is a constraint, not the default. Async-first means defaulting to asynchronous methods unless synchronous is truly needed." },
                { type: "heading", text: "Writing for Async" },
                {
                    type: "list", items: [
                        "Be complete: Include all context someone needs to respond without follow-up questions",
                        "Be clear: State the action needed and timeline explicitly",
                        "Be structured: Use headings, bullets, and formatting for scannability",
                        "Be patient: Allow 24 hours for response unless urgent",
                        "Use threads: Keep conversations organized and searchable"
                    ]
                },
                { type: "heading", text: "When to Go Synchronous" },
                {
                    type: "list", items: [
                        "Complex topics with many back-and-forth questions",
                        "Sensitive or emotional conversations",
                        "Brainstorming and creative collaboration",
                        "Building relationships (1:1s, team bonding)",
                        "Urgent issues requiring immediate decisions"
                    ]
                },
                { type: "keypoint", text: "'Could this be an email (or doc)?' is the mantra. Meetings should be reserved for what truly requires real-time interaction." }
            ]
        },
        {
            id: "remote-quiz",
            title: "Knowledge Check: Remote Best Practices",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "remote-connection",
            title: "Building Remote Relationships",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "The 'Water Cooler' Challenge" },
                { type: "paragraph", text: "Remote work removes the casual interactions that build relationships naturally. You must be intentional about creating connection." },
                { type: "heading", text: "Connection Strategies" },
                {
                    type: "list", items: [
                        "Start meetings with 5 minutes of personal check-in",
                        "Have a non-work Slack channel (hobbies, pets, recommendations)",
                        "Schedule virtual coffee chats with colleagues you don't work with directly",
                        "Use video when possible—seeing faces builds trust",
                        "Celebrate wins and milestones publicly",
                        "Participate in optional social events (even if awkward at first)"
                    ]
                },
                { type: "heading", text: "Over-Communicate" },
                { type: "paragraph", text: "In remote work, there's no such thing as over-communication. What feels excessive to you is usually just right for others." },
                {
                    type: "list", items: [
                        "Share what you're working on proactively",
                        "Narrate your decisions and reasoning",
                        "Ask questions publicly so others can learn",
                        "Update your status when away or in focus mode",
                        "Send 'thank you' and appreciation often"
                    ]
                },
                { type: "tip", text: "Use [YOUR ORGANIZATION'S COMMUNICATION TOOLS] effectively. Check [YOUR COMMUNICATION GUIDELINES] for expectations on response times and channel usage." }
            ]
        },
        {
            id: "remote-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "rwq1",
            question: "What does 'async-first' mean?",
            options: [
                "Always use text instead of video",
                "Default to asynchronous communication unless synchronous is truly needed",
                "Respond to messages immediately",
                "Only communicate during business hours"
            ],
            correctIndex: 1,
            explanation: "Async-first means defaulting to asynchronous methods (email, docs) unless real-time interaction is specifically needed."
        },
        {
            id: "rwq2",
            question: "Why is over-communication important in remote work?",
            options: [
                "It creates more meetings",
                "What feels excessive to you is usually just right for others who lack context",
                "It proves you're working",
                "It replaces documentation"
            ],
            correctIndex: 1,
            explanation: "Remote colleagues lack the visual cues and casual interactions that provide context in an office. What feels like a lot to share is often just enough."
        }
    ]
};

// Export all additional modules
export const additionalModuleContent: Record<string, TrainingModuleContent> = {
    "customer-service-excellence": customerServiceContent,
    "customer-service": customerServiceContent,
    "time-management": timeManagementContent,
    "productivity": timeManagementContent,
    "conflict-resolution": conflictResolutionContent,
    "remote-work-essentials": remoteWorkContent,
    "remote-work": remoteWorkContent,
    "wfh": remoteWorkContent,
};
