// ScaledNative - Industry & Compliance Training Content
// More specialized modules with context-aware placeholders

import type { TrainingModuleContent } from "./module-content";

// ==================== BLOODBORNE PATHOGENS (OSHA) ====================
export const bloodbornePathogensContent: TrainingModuleContent = {
    id: "bloodborne-pathogens",
    title: "Bloodborne Pathogens (OSHA)",
    subtitle: "BBP Safety & Exposure Prevention",
    description: "OSHA-compliant training on bloodborne pathogens including exposure prevention, universal precautions, and post-exposure procedures. Required for clinical staff.",
    learningObjectives: [
        "Identify bloodborne pathogens and modes of transmission",
        "Apply Standard Precautions in all patient interactions",
        "Use personal protective equipment (PPE) correctly",
        "Follow proper procedures after potential exposure",
        "Understand the Exposure Control Plan and your rights"
    ],
    standards: ["OSHA 29 CFR 1910.1030", "CDC Guidelines", "Joint Commission Standards"],
    sections: [
        {
            id: "bbp-intro",
            title: "Understanding Bloodborne Pathogens",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What are Bloodborne Pathogens?" },
                { type: "definition", text: "Bloodborne Pathogens: Pathogenic microorganisms present in human blood that can cause disease in humans. The most significant are Hepatitis B (HBV), Hepatitis C (HCV), and Human Immunodeficiency Virus (HIV)." },
                { type: "heading", text: "Key Bloodborne Pathogens" },
                {
                    type: "list", items: [
                        "Hepatitis B (HBV): Attacks the liver. Vaccine available and highly recommended. Can survive outside the body for 7+ days.",
                        "Hepatitis C (HCV): Attacks the liver. No vaccine. Leading cause of liver transplants. Often no symptoms for years.",
                        "HIV: Attacks the immune system. No vaccine. Treatable but not curable. Fragile outside the body."
                    ]
                },
                { type: "keypoint", text: "Hepatitis B is 100x more infectious than HIV via needlestick. The vaccine is your best protection and is provided free by [YOUR ORGANIZATION] for at-risk employees." },
                { type: "heading", text: "Who is at Risk?" },
                { type: "paragraph", text: "Anyone with reasonably anticipated exposure to blood or Other Potentially Infectious Materials (OPIM) is covered by OSHA's Bloodborne Pathogens Standard." },
                {
                    type: "list", items: [
                        "Healthcare workers (physicians, nurses, lab techs, phlebotomists)",
                        "First responders (EMTs, paramedics, firefighters)",
                        "Housekeeping and laundry staff in healthcare settings",
                        "Anyone who may encounter needles or blood in their work"
                    ]
                },
                { type: "tip", text: "At [YOUR ORGANIZATION], your job classification for BBP exposure is documented in the Exposure Control Plan, available at [YOUR ECP LOCATION]. Check with [YOUR EMPLOYEE HEALTH DEPT] if you're unsure of your classification." }
            ]
        },
        {
            id: "opim",
            title: "Other Potentially Infectious Materials",
            type: "reading",
            duration: "6 min",
            content: [
                { type: "heading", text: "What are OPIMs?" },
                { type: "paragraph", text: "Beyond blood, OSHA's standard covers Other Potentially Infectious Materials (OPIM) that may contain bloodborne pathogens:" },
                {
                    type: "list", items: [
                        "Semen and vaginal secretions",
                        "Cerebrospinal, synovial, pleural, pericardial, peritoneal, and amniotic fluids",
                        "Saliva in dental procedures",
                        "Any body fluid visibly contaminated with blood",
                        "Any unfixed tissue or organ from a human (living or dead)",
                        "Cell or tissue cultures containing HIV, HBV, or HCV"
                    ]
                },
                { type: "heading", text: "Materials NOT Typically Considered OPIM" },
                {
                    type: "list", items: [
                        "Feces (unless visibly bloody)",
                        "Nasal secretions",
                        "Sweat",
                        "Tears",
                        "Urine (unless visibly bloody)",
                        "Vomitus (unless visibly bloody)"
                    ]
                },
                { type: "warning", text: "When in doubt, treat it as infectious. It's impossible to tell by looking whether blood or body fluids contain pathogens." }
            ]
        },
        {
            id: "standard-precautions",
            title: "Standard Precautions",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "The Universal Approach" },
                { type: "definition", text: "Standard Precautions: A set of infection control practices used for every patient regardless of suspected or confirmed infection status. Treats all blood and body fluids as potentially infectious." },
                { type: "paragraph", text: "Standard Precautions replaced 'Universal Precautions' and combine elements of body substance isolation with blood and body fluid precautions." },
                { type: "heading", text: "Key Elements of Standard Precautions" },
                {
                    type: "list", items: [
                        "Hand Hygiene: Wash hands before and after patient contact, after removing gloves, after touching potentially contaminated surfaces",
                        "Personal Protective Equipment (PPE): Use gloves, gowns, masks, and eye protection based on anticipated exposure",
                        "Safe Injection Practices: Never reuse needles, syringes, or single-dose vials between patients",
                        "Respiratory Hygiene/Cough Etiquette: Cover coughs/sneezes, offer masks to patients with respiratory symptoms",
                        "Environmental Cleaning: Properly clean and disinfect surfaces and equipment",
                        "Safe Sharps Disposal: Never recap needles; use sharps containers"
                    ]
                },
                { type: "keypoint", text: "Hand hygiene is the single most important measure for preventing infection transmission. Use soap and water or alcohol-based hand rub before and after every patient contact." },
                { type: "tip", text: "[YOUR ORGANIZATION] uses [YOUR APPROVED HAND SANITIZER PRODUCT] for hand hygiene. Soap and water is required when hands are visibly soiled or after caring for patients with C. diff or norovirus." }
            ]
        },
        {
            id: "ppe",
            title: "Personal Protective Equipment",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Choosing the Right PPE" },
                { type: "paragraph", text: "PPE selection depends on the type of exposure anticipated. Use what's appropriate—not too little, not too much." },
                { type: "heading", text: "Gloves" },
                {
                    type: "list", items: [
                        "Wear when touching blood, body fluids, mucous membranes, non-intact skin",
                        "Change between patients and between dirty/clean procedures on same patient",
                        "Never wash or reuse disposable gloves",
                        "Remove and perform hand hygiene before touching clean surfaces"
                    ]
                },
                { type: "heading", text: "Gowns" },
                {
                    type: "list", items: [
                        "Wear when splash or spray of blood/body fluids is anticipated",
                        "Wear during procedures that generate splashes",
                        "Remove and discard before leaving patient care area",
                        "Use fluid-resistant gowns when heavy exposure is expected"
                    ]
                },
                { type: "heading", text: "Face Protection" },
                {
                    type: "list", items: [
                        "Masks: Protect nose and mouth from splashes and respiratory droplets",
                        "Eye Protection: Goggles or face shields protect eyes from splashes",
                        "Personal prescription glasses are NOT adequate eye protection"
                    ]
                },
                { type: "heading", text: "Donning and Doffing Order" },
                { type: "paragraph", text: "Put on (don) PPE in this order: Gown → Mask → Eye protection → Gloves" },
                { type: "paragraph", text: "Remove (doff) PPE in this order: Gloves → Eye protection → Gown → Mask" },
                { type: "keypoint", text: "The most contaminated items (gloves, gown front) come off first. Always perform hand hygiene after removing all PPE." }
            ]
        },
        {
            id: "bbp-quiz",
            title: "Knowledge Check: Precautions & PPE",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "sharps-safety",
            title: "Sharps Safety & Disposal",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Needlestick Prevention" },
                { type: "paragraph", text: "Needlesticks and sharps injuries are the primary risk for occupational bloodborne pathogen exposure. Prevention is critical." },
                { type: "heading", text: "Safe Sharps Practices" },
                {
                    type: "list", items: [
                        "NEVER recap needles by hand (use one-handed scoop technique if absolutely necessary)",
                        "NEVER bend, break, or shear contaminated needles",
                        "Place sharps immediately into puncture-resistant sharps containers",
                        "Never overfill sharps containers (3/4 full maximum)",
                        "Use safety-engineered devices when available",
                        "Never reach into sharps containers",
                        "Never put sharps in regular trash, laundry, or recycling"
                    ]
                },
                { type: "warning", text: "Recapping is responsible for 15-30% of all needlestick injuries. If a device has a safety feature, use it!" },
                { type: "heading", text: "Sharps Containers" },
                {
                    type: "list", items: [
                        "Must be puncture-resistant, leak-proof, and labeled with biohazard symbol",
                        "Located at point-of-use (within easy reach of where sharps are used)",
                        "Replaced when 3/4 full (never overfill)",
                        "Properly closed before transport"
                    ]
                },
                { type: "tip", text: "If you notice a missing or overfilled sharps container at [YOUR ORGANIZATION], report it to [YOUR ENVIRONMENTAL SERVICES/SAFETY DEPT] immediately." }
            ]
        },
        {
            id: "exposure-response",
            title: "Post-Exposure Procedures",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "What to Do If You're Exposed" },
                { type: "paragraph", text: "Even with the best precautions, exposures can happen. Quick action is essential—especially for potential HIV exposure, where post-exposure prophylaxis (PEP) is most effective within 2 hours." },
                { type: "heading", text: "Immediate Steps After Exposure" },
                {
                    type: "list", items: [
                        "1. WASH the affected area immediately with soap and water. For splashes to eyes or mucous membranes, flush with water or saline for 15 minutes.",
                        "2. REPORT to your supervisor immediately.",
                        "3. SEEK EVALUATION at [YOUR EMPLOYEE HEALTH/OCCUPATIONAL HEALTH LOCATION] immediately—within 2 hours for potential HIV exposure.",
                        "4. DOCUMENT the incident using [YOUR INCIDENT REPORTING SYSTEM].",
                        "5. IDENTIFY the source patient if possible (your supervisor/manager will assist)."
                    ]
                },
                { type: "keypoint", text: "Post-Exposure Prophylaxis (PEP) for HIV is most effective when started within 2 hours. Do not wait—seek evaluation immediately." },
                { type: "heading", text: "What to Expect During Evaluation" },
                {
                    type: "list", items: [
                        "Medical evaluation and baseline blood draw (your consent required)",
                        "Source patient testing (with their consent, if possible)",
                        "Risk assessment based on type of exposure and source status",
                        "Counseling on PEP options if indicated",
                        "Follow-up testing schedule (typically at 6 weeks, 3 months, 6 months)"
                    ]
                },
                { type: "heading", text: "Your Rights" },
                {
                    type: "list", items: [
                        "Confidential evaluation and follow-up care at no cost to you",
                        "Copy of the healthcare provider's written opinion within 15 days",
                        "Hepatitis B vaccination series if not previously vaccinated",
                        "Protection from retaliation for reporting"
                    ]
                },
                { type: "warning", text: "Time is critical. For after-hours exposures at [YOUR ORGANIZATION], go to [YOUR AFTER-HOURS EXPOSURE PROTOCOL—e.g., ED, On-Call Occupational Health]." }
            ]
        },
        {
            id: "bbp-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "bq1",
            question: "Which bloodborne pathogen can survive outside the body for over 7 days?",
            options: ["HIV", "Hepatitis C", "Hepatitis B", "None of them"],
            correctIndex: 2,
            explanation: "Hepatitis B (HBV) can survive outside the body for at least 7 days. This is why environmental cleaning and vaccination are so important."
        },
        {
            id: "bq2",
            question: "What is the correct order for removing (doffing) PPE?",
            options: [
                "Mask, Gloves, Gown, Eye Protection",
                "Gloves, Eye Protection, Gown, Mask",
                "Gown, Mask, Eye Protection, Gloves",
                "Eye Protection, Mask, Gown, Gloves"
            ],
            correctIndex: 1,
            explanation: "Remove PPE in this order: Gloves (most contaminated) → Eye Protection → Gown → Mask. Always perform hand hygiene after removing all PPE."
        },
        {
            id: "bq3",
            question: "How full should a sharps container be before replacement?",
            options: ["Completely full", "3/4 (three-quarters) full", "1/2 (half) full", "Any time it's used"],
            correctIndex: 1,
            explanation: "Sharps containers should be replaced when they are 3/4 full. Overfilled containers increase risk of needlestick injuries during disposal."
        },
        {
            id: "bq4",
            question: "Within what timeframe is HIV post-exposure prophylaxis (PEP) most effective?",
            options: ["24 hours", "12 hours", "2 hours", "1 week"],
            correctIndex: 2,
            explanation: "PEP for HIV is most effective when started within 2 hours of exposure. This is why immediate reporting and evaluation is critical."
        }
    ]
};

// ==================== CHANGE MANAGEMENT ====================
export const changeManagementContent: TrainingModuleContent = {
    id: "change-management",
    title: "Leading Through Change",
    subtitle: "Change Management for Leaders",
    description: "Master change management frameworks and techniques to successfully lead your team through organizational transitions. Based on Kotter's 8-Step model and ADKAR.",
    learningObjectives: [
        "Apply Kotter's 8-Step Change Model to organizational initiatives",
        "Use the ADKAR framework to guide individual transitions",
        "Identify and address resistance to change constructively",
        "Communicate change effectively to diverse audiences",
        "Sustain change and embed it in organizational culture"
    ],
    standards: ["Prosci ADKAR", "Kotter 8-Step Model", "McKinsey 7-S Framework"],
    sections: [
        {
            id: "change-intro",
            title: "Why Change Fails (And How to Succeed)",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "The Change Challenge" },
                { type: "paragraph", text: "Studies consistently show that 70% of organizational change efforts fail to achieve their goals. The causes are often people-related, not technical." },
                { type: "heading", text: "Top Reasons Change Fails" },
                {
                    type: "list", items: [
                        "1. Lack of leadership sponsorship and visible support",
                        "2. Insufficient communication about the 'why'",
                        "3. Failure to address the human side of change",
                        "4. Change fatigue from too many simultaneous initiatives",
                        "5. Declaring victory too early before change is embedded",
                        "6. Not addressing resistance constructively"
                    ]
                },
                { type: "keypoint", text: "Change happens one person at a time. Organizational change is only successful when enough individuals change their behaviors." },
                { type: "definition", text: "Change Management: The discipline that guides how we prepare, equip, and support individuals to successfully adopt change in order to drive organizational success." }
            ]
        },
        {
            id: "kotter-model",
            title: "Kotter's 8-Step Change Model",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "Eight Steps to Successful Change" },
                { type: "paragraph", text: "John Kotter's research at Harvard identified eight critical steps for successful large-scale change:" },
                { type: "heading", text: "Step 1: Create Urgency" },
                { type: "paragraph", text: "Help others see the need for change through a compelling case that speaks to both the head (data) and the heart (stories). Without urgency, people won't make change a priority." },
                { type: "heading", text: "Step 2: Build a Guiding Coalition" },
                { type: "paragraph", text: "Assemble a group with enough power, credibility, communication skills, and expertise to lead the change. Change can't be led by one person alone." },
                { type: "heading", text: "Step 3: Form a Strategic Vision" },
                { type: "paragraph", text: "Create a clear, compelling vision that people can understand and remember. If you can't communicate the vision in 5 minutes or less, it's not clear enough." },
                { type: "heading", text: "Step 4: Enlist a Volunteer Army" },
                { type: "paragraph", text: "Communicate the vision widely and repeatedly. Large-scale change requires many people buying in and spreading the message." },
                { type: "heading", text: "Step 5: Enable Action by Removing Barriers" },
                { type: "paragraph", text: "Remove obstacles that block the change: outdated systems, structural barriers, resistant managers, skills gaps. Make it easier for people to act." },
                { type: "heading", text: "Step 6: Generate Short-Term Wins" },
                { type: "paragraph", text: "Create visible, unambiguous successes early. Wins build momentum, silence critics, and reward change agents." },
                { type: "heading", text: "Step 7: Sustain Acceleration" },
                { type: "paragraph", text: "Use credibility from early wins to tackle bigger challenges. Don't let up—the urgency must be maintained." },
                { type: "heading", text: "Step 8: Institute Change" },
                { type: "paragraph", text: "Anchor the change in the organization's culture, systems, and processes. Connect new behaviors to success." },
                { type: "keypoint", text: "Skipping steps creates only an illusion of speed. It never produces satisfying results." }
            ]
        },
        {
            id: "adkar",
            title: "ADKAR: Individual Change Model",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "The ADKAR Model" },
                { type: "paragraph", text: "ADKAR (from Prosci) describes the five building blocks that an individual needs to make a successful change. It's useful for diagnosing where someone is stuck." },
                { type: "definition", text: "ADKAR: Awareness, Desire, Knowledge, Ability, Reinforcement—five sequential building blocks for individual change." },
                { type: "heading", text: "The Five Elements" },
                {
                    type: "list", items: [
                        "A - Awareness: Understanding why the change is needed. 'Why is this happening?'",
                        "D - Desire: Personal motivation to support and participate. 'What's in it for me?'",
                        "K - Knowledge: Understanding how to change. 'How do I do this?'",
                        "A - Ability: Demonstrating the required skills and behaviors. 'Can I actually do this?'",
                        "R - Reinforcement: Sustaining the change over time. 'Will this stick?'"
                    ]
                },
                { type: "heading", text: "Diagnosing with ADKAR" },
                { type: "paragraph", text: "ADKAR is sequential—you must address earlier elements before later ones will work. For example:" },
                {
                    type: "list", items: [
                        "Providing training (Knowledge) won't help if someone hasn't bought in (Desire)",
                        "Coaching on skills (Ability) is useless if they don't understand what to do (Knowledge)",
                        "Recognition (Reinforcement) won't stick if they can't perform the behavior (Ability)"
                    ]
                },
                { type: "tip", text: "When someone is struggling with change, work through ADKAR in order: 'Do they understand WHY? Do they WANT to? Do they know HOW? CAN they do it? Is it being REINFORCED?'" }
            ]
        },
        {
            id: "resistance",
            title: "Addressing Resistance",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Resistance is Normal" },
                { type: "paragraph", text: "Resistance to change is a natural human response, not a character flaw. Understanding and addressing resistance is key to successful change." },
                { type: "heading", text: "Common Sources of Resistance" },
                {
                    type: "list", items: [
                        "Fear of the unknown or job security concerns",
                        "Loss of control or autonomy",
                        "Past changes that failed or were poorly managed",
                        "Lack of trust in leadership",
                        "Not understanding the reason for change",
                        "Too much change happening at once",
                        "Comfort with the status quo"
                    ]
                },
                { type: "heading", text: "Addressing Resistance Constructively" },
                {
                    type: "list", items: [
                        "Listen first: Understand the specific concern before responding",
                        "Acknowledge feelings: Validate that change is hard",
                        "Communicate the 'why': Connect to business need and personal benefit",
                        "Involve people: Give voice and choice where possible",
                        "Provide support: Training, coaching, time to adjust",
                        "Be patient: Some people need more time than others"
                    ]
                },
                { type: "keypoint", text: "The most vocal resisters often become the strongest advocates—if you engage them respectfully and address their concerns." },
                { type: "warning", text: "Dismissing resistance as 'people being difficult' guarantees failure. Resistance is information about what's not working in your change approach." }
            ]
        },
        {
            id: "change-quiz",
            title: "Knowledge Check: Change Models",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "change-comms",
            title: "Change Communication",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Communication is the #1 Success Factor" },
                { type: "paragraph", text: "Research consistently shows that effective communication is the most important factor in change success. Yet leaders consistently underestimate how much communication is needed." },
                { type: "heading", text: "The 7x Rule" },
                { type: "keypoint", text: "People need to hear a message 7 times, through multiple channels, before it sinks in. If you haven't said it until you're sick of saying it, you haven't said it enough." },
                { type: "heading", text: "What People Need to Hear" },
                {
                    type: "list", items: [
                        "What is changing and what is NOT changing",
                        "Why the change is necessary (business case AND personal impact)",
                        "What's in it for them (benefits) and what they might lose",
                        "When it will happen (timeline)",
                        "How it will affect their daily work",
                        "What support is available",
                        "What is expected of them"
                    ]
                },
                { type: "heading", text: "Preferred Senders" },
                { type: "paragraph", text: "Different messages are more effective from different senders:" },
                {
                    type: "list", items: [
                        "Why the change is happening → Senior leaders",
                        "How it affects my work → My direct manager",
                        "How to do new tasks → Trainers/peers",
                        "Recognition and reinforcement → My direct manager"
                    ]
                },
                { type: "tip", text: "At [YOUR ORGANIZATION], major changes are communicated through [YOUR CHANGE COMMUNICATION CHANNELS]. As a leader, you are expected to reinforce messages with your team within [YOUR TIMEFRAME] of company announcements." }
            ]
        },
        {
            id: "change-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "cq1",
            question: "What percentage of organizational change efforts typically fail?",
            options: ["30%", "50%", "70%", "90%"],
            correctIndex: 2,
            explanation: "Studies consistently show that approximately 70% of organizational change efforts fail to achieve their goals, usually due to people-related issues rather than technical ones."
        },
        {
            id: "cq2",
            question: "In Kotter's model, what should you do AFTER creating urgency?",
            options: ["Form a strategic vision", "Build a guiding coalition", "Generate short-term wins", "Institute change"],
            correctIndex: 1,
            explanation: "Step 2 is 'Build a Guiding Coalition.' You need a powerful team to lead the change before you can develop the vision."
        },
        {
            id: "cq3",
            question: "In ADKAR, what does the 'D' stand for?",
            options: ["Direction", "Desire", "Dedication", "Determination"],
            correctIndex: 1,
            explanation: "D stands for Desire—the personal motivation to support and participate in the change. Without desire, knowledge and training are ineffective."
        },
        {
            id: "cq4",
            question: "Who is the most effective sender for messages about how change will affect day-to-day work?",
            options: ["CEO", "HR", "Direct Manager", "External Consultant"],
            correctIndex: 2,
            explanation: "Research shows the direct manager is the most effective sender for messages about personal impact on daily work. Senior leaders are better for the 'why' behind the change."
        }
    ]
};

// ==================== DEI FOUNDATIONS ====================
export const deiFoundationsContent: TrainingModuleContent = {
    id: "dei-foundations",
    title: "DEI Foundations",
    subtitle: "Diversity, Equity & Inclusion Essentials",
    description: "Build foundational understanding of diversity, equity, and inclusion. Learn to recognize bias, foster inclusion, and contribute to an equitable workplace.",
    learningObjectives: [
        "Define diversity, equity, inclusion, and belonging",
        "Recognize unconscious bias and its workplace impacts",
        "Apply inclusive practices in daily interactions",
        "Contribute to an equitable and psychologically safe environment",
        "Act as an ally and upstander"
    ],
    standards: ["SHRM DEI Competency", "EEOC Guidelines", "Research-Based Best Practices"],
    sections: [
        {
            id: "dei-intro",
            title: "What is DEI (and Why It Matters)",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "Defining the Terms" },
                { type: "definition", text: "Diversity: The presence of differences within a given setting. This includes both visible differences (race, gender, age) and invisible differences (thinking styles, experiences, beliefs)." },
                { type: "definition", text: "Equity: Fair treatment, access, and opportunity for all people. Equity recognizes that different people may need different support to achieve similar outcomes." },
                { type: "definition", text: "Inclusion: The practice of creating environments where any individual or group feels welcomed, respected, supported, and valued to fully participate." },
                { type: "definition", text: "Belonging: The feeling of security and support when there is acceptance, inclusion, and identity for a member of a certain group." },
                { type: "heading", text: "The Business Case" },
                { type: "paragraph", text: "Research consistently shows that diverse, inclusive organizations outperform their peers:" },
                {
                    type: "list", items: [
                        "Companies in top quartile for diversity are 35% more likely to outperform (McKinsey)",
                        "Inclusive teams make better decisions 87% of the time (Forbes)",
                        "Companies with diverse management have 19% higher revenue from innovation (BCG)",
                        "Employees in inclusive cultures are 3x more likely to be engaged"
                    ]
                },
                { type: "keypoint", text: "DEI isn't just about 'doing the right thing'—it's a business imperative that drives innovation, engagement, and performance." }
            ]
        },
        {
            id: "unconscious-bias",
            title: "Understanding Unconscious Bias",
            type: "reading",
            duration: "12 min",
            content: [
                { type: "heading", text: "What is Unconscious Bias?" },
                { type: "definition", text: "Unconscious Bias: Social stereotypes about certain groups of people that individuals form outside their conscious awareness. Everyone has them—they're a normal function of how our brains process information." },
                { type: "paragraph", text: "Our brains process 11 million bits of information per second, but we can only consciously process about 40. Unconscious biases are mental shortcuts (heuristics) that help us process this information quickly—but they can lead to unfair judgments." },
                { type: "heading", text: "Common Types of Bias" },
                {
                    type: "list", items: [
                        "Affinity Bias: Preference for people similar to ourselves",
                        "Confirmation Bias: Seeking information that confirms our existing beliefs",
                        "Attribution Bias: Attributing success/failure differently based on group membership",
                        "Halo/Horn Effect: Letting one positive/negative trait influence overall perception",
                        "Name Bias: Making assumptions based on names (culture, gender, class)",
                        "Recency Bias: Giving more weight to recent events than older ones"
                    ]
                },
                { type: "heading", text: "Workplace Impact" },
                { type: "paragraph", text: "Unconscious bias can affect decisions at every stage of the employee lifecycle:" },
                {
                    type: "list", items: [
                        "Hiring: Which resumes get callbacks, interview performance evaluation",
                        "Day-to-day: Who gets challenging assignments, whose ideas get heard",
                        "Performance: How work is evaluated, feedback given, potential assessed",
                        "Promotion: Who is seen as 'leadership material'"
                    ]
                },
                { type: "keypoint", text: "Awareness is the first step, but not sufficient. We need systems and practices that interrupt bias, not just individual effort." }
            ]
        },
        {
            id: "interrupting-bias",
            title: "Interrupting Bias",
            type: "reading",
            duration: "10 min",
            content: [
                { type: "heading", text: "Strategies for Individuals" },
                {
                    type: "list", items: [
                        "Slow down: Bias is more likely when we're rushed, stressed, or multitasking",
                        "Question assumptions: 'What am I assuming? What's the evidence?'",
                        "Seek disconfirming information: Actively look for data that challenges your initial impression",
                        "Expand your network: Build relationships with people different from you",
                        "Get feedback: Ask others to point out your blind spots"
                    ]
                },
                { type: "heading", text: "Strategies for Processes" },
                { type: "paragraph", text: "Individual effort alone isn't enough. The most effective approach is to build bias interrupts into processes:" },
                {
                    type: "list", items: [
                        "Structured interviews: Ask the same questions in the same order; score before discussing",
                        "Blind resume review: Remove names and identifying information",
                        "Diverse hiring panels: Include multiple perspectives in evaluation",
                        "Clear criteria: Define success criteria BEFORE evaluating candidates/projects",
                        "Data tracking: Monitor outcomes by group to identify patterns"
                    ]
                },
                { type: "tip", text: "At [YOUR ORGANIZATION], our hiring process includes [YOUR BIAS INTERRUPTION PRACTICES]. If you're involved in hiring, complete [YOUR INTERVIEWER TRAINING] before participating in interviews." }
            ]
        },
        {
            id: "dei-quiz",
            title: "Knowledge Check: Bias Recognition",
            type: "quiz",
            duration: "5 min",
            content: []
        },
        {
            id: "microaggressions",
            title: "Understanding Microaggressions",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What are Microaggressions?" },
                { type: "definition", text: "Microaggressions: Brief, commonplace verbal, behavioral, or environmental indignities—whether intentional or unintentional—that communicate hostile, derogatory, or negative slights toward marginalized groups." },
                { type: "paragraph", text: "Microaggressions are often well-intentioned but have real impact. The cumulative effect of many small slights can be significant, affecting well-being, performance, and belonging." },
                { type: "heading", text: "Examples and Impact" },
                {
                    type: "list", items: [
                        "'You're so articulate!' (Implies surprise that someone from their group speaks well)",
                        "'Where are you REALLY from?' (Signals that someone doesn't belong)",
                        "Consistently mispronouncing someone's name (Signals lack of respect/effort)",
                        "'I don't see color.' (Dismisses someone's lived experience)",
                        "Assuming someone is in a support role based on appearance"
                    ]
                },
                { type: "heading", text: "If You Commit a Microaggression" },
                {
                    type: "list", items: [
                        "Don't get defensive—focus on impact, not intent",
                        "Apologize briefly and sincerely: 'I'm sorry, that came out wrong.'",
                        "Ask how to do better (if appropriate): 'How would you prefer I refer to...?'",
                        "Learn from it and do better next time",
                        "Don't make it about you and your guilt—center the other person"
                    ]
                },
                { type: "keypoint", text: "Intent ≠ Impact. Even when we mean well, our words or actions can cause harm. The impact on the receiver is what matters." }
            ]
        },
        {
            id: "allyship",
            title: "Allyship in Action",
            type: "reading",
            duration: "8 min",
            content: [
                { type: "heading", text: "What is Allyship?" },
                { type: "definition", text: "Allyship: The practice of using your privilege and power to advocate for and support members of marginalized or underrepresented groups." },
                { type: "paragraph", text: "Allyship is a verb, not a noun. It's about actions, not identity. You don't declare yourself an ally—others recognize you as one based on your sustained actions." },
                { type: "heading", text: "Ally Actions" },
                {
                    type: "list", items: [
                        "Amplify: Repeat and credit ideas from underrepresented colleagues",
                        "Advocate: Speak up in rooms where decisions are made",
                        "Create space: Actively invite others into conversations and opportunities",
                        "Call in: Address problematic behavior privately and respectfully",
                        "Educate yourself: Don't expect marginalized colleagues to teach you",
                        "Sponsor: Actively advocate for someone's advancement, not just mentor"
                    ]
                },
                { type: "heading", text: "From Bystander to Upstander" },
                { type: "paragraph", text: "When you witness exclusion, bias, or harassment, you can choose to be an upstander:" },
                {
                    type: "list", items: [
                        "Interrupt the behavior (if safe): 'That's not appropriate.'",
                        "Redirect the conversation: Change the subject, create a distraction",
                        "Support the target: Check in privately afterward",
                        "Report: Use formal channels when appropriate",
                        "Document: Record what you witnessed for potential reports"
                    ]
                },
                { type: "tip", text: "[YOUR ORGANIZATION] values allyship as part of our commitment to [YOUR DEI VALUES]. Learn more about our employee resource groups at [YOUR ERG INFO LOCATION]." }
            ]
        },
        {
            id: "dei-final",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            content: []
        }
    ],
    finalAssessment: [
        {
            id: "dq1",
            question: "What is the difference between equality and equity?",
            options: [
                "They mean the same thing",
                "Equality means everyone gets the same; equity means everyone gets what they need",
                "Equality is about outcomes; equity is about inputs",
                "Equity is a legal requirement; equality is optional"
            ],
            correctIndex: 1,
            explanation: "Equality means giving everyone the same treatment. Equity recognizes that people may need different support to achieve similar outcomes, adjusting for different starting points."
        },
        {
            id: "dq2",
            question: "What is 'affinity bias'?",
            options: [
                "Bias toward expensive products",
                "Preference for people similar to ourselves",
                "Bias in financial decisions",
                "Preference for new over old"
            ],
            correctIndex: 1,
            explanation: "Affinity bias is our tendency to prefer people who are similar to us in background, interests, or appearance. It can affect hiring, team formation, and opportunity allocation."
        },
        {
            id: "dq3",
            question: "What's the best response if you commit a microaggression?",
            options: [
                "Explain that you didn't mean it that way",
                "Apologize briefly, learn from it, do better next time",
                "Point out that other people say the same thing",
                "Change the subject quickly"
            ],
            correctIndex: 1,
            explanation: "The best response is to apologize briefly and sincerely, without making it about you or getting defensive. Focus on impact, not intent, and commit to doing better."
        }
    ]
};

// Export all industry content
export const industryModuleContent: Record<string, TrainingModuleContent> = {
    "bloodborne-pathogens": bloodbornePathogensContent,
    "bbp": bloodbornePathogensContent,
    "osha-bbp": bloodbornePathogensContent,
    "change-management": changeManagementContent,
    "leading-change": changeManagementContent,
    "dei-foundations": deiFoundationsContent,
    "dei": deiFoundationsContent,
    "diversity-equity-inclusion": deiFoundationsContent,
};
