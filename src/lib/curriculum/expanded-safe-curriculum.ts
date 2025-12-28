/**
 * Expanded SAFe 6.0 & Agile Curriculum
 * 
 * Comprehensive training covering Scrum, SAFe framework,
 * PI Planning, iteration execution, and agile leadership.
 */

import type { ModuleSection } from "./types";

export const expandedSAFeModule: ModuleSection[] = [
    // =========================================================================
    // MODULE 1: AGILE FOUNDATIONS (Sections 1-4)
    // =========================================================================
    {
        id: "agile-mindset",
        title: "The Agile Mindset",
        type: "reading",
        content: {
            heading: "Why Agile Matters",
            paragraphs: [
                "Agile is a mindset for navigating uncertainty and change, not just a process. Traditional 'waterfall' approaches assume we can plan everything upfront. Agile recognizes that requirements evolve and early feedback improves outcomes.",
                "The Agile Manifesto (2001) established four core values: Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan.",
                "These values don't reject the right side—they prioritize the left side when trade-offs occur. Good processes matter, but not more than enabling people to collaborate effectively.",
                "Agile has proven effective across industries beyond software: marketing, HR, finance, and product development all benefit from embracing uncertainty and delivering value incrementally."
            ],
            keyPoints: [
                "Agile is a mindset for navigating uncertainty",
                "Four values: People, Working Product, Collaboration, Adaptability",
                "Prioritize left side values when trade-offs occur",
                "Applicable beyond software development"
            ],
        },
    },
    {
        id: "agile-principles",
        title: "The 12 Agile Principles",
        type: "reading",
        content: {
            heading: "Principles Behind the Values",
            paragraphs: [
                "Principle 1: Highest priority is satisfying the customer through early and continuous delivery of valuable work. Don't wait for perfection—deliver value incrementally.",
                "Principle 2: Welcome changing requirements, even late in development. Agile harnesses change for the customer's competitive advantage. Change isn't failure—it's learning.",
                "Principle 3: Deliver working results frequently, from weeks to months, with preference to shorter timescales. Shorter cycles mean faster feedback and learning.",
                "Principle 4: Business people and developers must work together daily throughout the project. Collaboration, not handoffs. Principle 5: Build projects around motivated individuals, give them the environment and support they need, and trust them to get the job done."
            ],
            keyPoints: [
                "Customer satisfaction through early, continuous delivery",
                "Welcome changing requirements as learning",
                "Deliver frequently with preference for shorter cycles",
                "Daily collaboration between business and technical",
                "Trust motivated individuals to deliver"
            ],
            tip: "The principles explain the 'why' behind agile practices. When a practice isn't working, revisit these principles to understand what you're trying to achieve."
        },
    },
    {
        id: "quiz-agile-foundations",
        title: "Knowledge Check: Agile Foundations",
        type: "quiz",
        quiz: {
            question: "Your stakeholder wants to add a significant new requirement two weeks before the planned release. In an agile mindset, how should you respond?",
            options: [
                "Reject the change—the plan was already set",
                "Welcome the change, assess the impact, and collaborate on prioritization",
                "Accept the change but blame the stakeholder if the release slips",
                "Accept everything to keep the stakeholder happy"
            ],
            correctIndex: 1,
            explanation: "Agile Principle 2 says to 'welcome changing requirements.' This doesn't mean accepting everything blindly—it means embracing change as learning, assessing impact transparently, and collaborating with stakeholders on prioritization. The goal is delivering maximum value, not following the original plan."
        },
    },
    {
        id: "scrum-overview",
        title: "Introduction to Scrum",
        type: "reading",
        content: {
            heading: "The Most Popular Agile Framework",
            paragraphs: [
                "Scrum is a lightweight framework for solving complex problems. It defines roles, events, and artifacts that create structure for agile teams.",
                "Three Roles: Product Owner (owns the backlog, maximizes value), Scrum Master (facilitates process, removes impediments), Development Team (cross-functional, self-organizing, does the work).",
                "Five Events: Sprint (time-boxed iteration), Sprint Planning (what to build), Daily Scrum (daily sync), Sprint Review (demonstrate work), Sprint Retrospective (improve process).",
                "Three Artifacts: Product Backlog (prioritized list of all work), Sprint Backlog (work committed for current sprint), Increment (the done work that adds value)."
            ],
            keyPoints: [
                "3 Roles: Product Owner, Scrum Master, Dev Team",
                "5 Events: Sprint, Planning, Daily Scrum, Review, Retro",
                "3 Artifacts: Product Backlog, Sprint Backlog, Increment",
                "Sprints are typically 2-4 weeks"
            ],
        },
    },

    // =========================================================================
    // MODULE 2: SCRUM DEEP DIVE (Sections 5-10)
    // =========================================================================
    {
        id: "product-owner-role",
        title: "The Product Owner Role",
        type: "reading",
        content: {
            heading: "Maximizing Product Value",
            paragraphs: [
                "The Product Owner is the single person accountable for maximizing the value of the product. They own the Product Backlog and make prioritization decisions.",
                "Key responsibilities: clearly express backlog items, order the backlog for maximum value, ensure the backlog is visible and transparent, ensure the team understands items at an appropriate level.",
                "The Product Owner doesn't have to do all the work themselves—they can delegate—but they remain accountable. Decisions about the backlog are the PO's alone.",
                "A great Product Owner understands the market, the customers, and the business. They make hard prioritization choices based on value, not just stakeholder volume."
            ],
            keyPoints: [
                "Single person accountable for product value",
                "Owns and orders the Product Backlog",
                "Makes prioritization decisions",
                "Must understand customers, market, and business"
            ],
            tip: "Product Owners should be empowered to say 'no' to requests. A backlog that grows without prioritization helps no one."
        },
    },
    {
        id: "scrum-master-role",
        title: "The Scrum Master Role",
        type: "reading",
        content: {
            heading: "Servant Leadership in Action",
            paragraphs: [
                "The Scrum Master helps the team and organization adopt Scrum effectively. They are servant-leaders who coach, facilitate, and remove impediments.",
                "Service to the Team: facilitate events, coach on self-organization, help remove blockers, protect from outside interference, foster a high-performing environment.",
                "Service to the Product Owner: help with backlog techniques, facilitate stakeholder collaboration, ensure goals and scope are understood.",
                "Service to the Organization: lead and coach Scrum adoption, plan implementations, help stakeholders understand empirical product development, remove organizational impediments."
            ],
            keyPoints: [
                "Servant-leader, not a traditional manager",
                "Facilitates events and removes impediments",
                "Coaches team AND organization on Scrum",
                "Protects team from distraction and interference"
            ],
        },
    },
    {
        id: "sprint-planning",
        title: "Sprint Planning",
        type: "reading",
        content: {
            heading: "Starting the Sprint Right",
            paragraphs: [
                "Sprint Planning initiates the Sprint by laying out the work to be performed. The input is the Product Backlog, the previous Increment, and team capacity and past performance.",
                "The Sprint Goal gives the team a coherent objective for the Sprint—a reason 'why' beyond just completing tasks. It provides flexibility as the team learns during the Sprint.",
                "The 'What' phase: team selects items from the Product Backlog they forecast they can complete. The 'How' phase: team decomposes selected items into tasks and creates the Sprint Backlog.",
                "Sprint Planning is time-boxed: maximum 8 hours for a one-month Sprint, proportionally less for shorter Sprints. Come prepared with a groomed backlog to use time effectively."
            ],
            keyPoints: [
                "Creates Sprint Goal (the 'why')",
                "Team selects backlog items (the 'what')",
                "Team plans implementation (the 'how')",
                "Time-boxed: 8 hours max for 1-month sprint"
            ],
        },
    },
    {
        id: "daily-scrum",
        title: "Daily Scrum",
        type: "reading",
        content: {
            heading: "Daily Inspection and Adaptation",
            paragraphs: [
                "The Daily Scrum is a 15-minute event for the Development Team to synchronize activities and plan for the next 24 hours. Same time, same place, every day.",
                "Classic format (optional): What did I do yesterday to help meet the Sprint Goal? What will I do today? What impediments are blocking progress?",
                "Modern practice focuses on inspecting progress toward the Sprint Goal and adapting the Sprint Backlog as needed. The format is less important than the inspection.",
                "Common anti-patterns: status report to Scrum Master, too long, skipped on 'quiet' days, blame-focused. The Daily Scrum is FOR the team, not management reporting."
            ],
            keyPoints: [
                "15 minutes, same time/place daily",
                "Inspect progress toward Sprint Goal",
                "Adapt the plan for the next 24 hours",
                "Team-to-team, not status to management"
            ],
            warning: "If your Daily Scrum feels like a status report, something is wrong. Refocus on team coordination and impediment identification."
        },
    },
    {
        id: "sprint-review",
        title: "Sprint Review",
        type: "reading",
        content: {
            heading: "Demonstrating and Inspecting the Increment",
            paragraphs: [
                "The Sprint Review is held at Sprint end to inspect the Increment and adapt the Product Backlog. It's a working session, not a formal presentation.",
                "The team demonstrates what was 'Done' (meets Definition of Done). Stakeholders provide feedback. The Product Owner explains what was done, what wasn't, and why.",
                "The group collaborates on what to do next. Market conditions, timelines, budget, and new insights may reprioritize the backlog based on review discussions.",
                "Time-box: 4 hours for a one-month Sprint. Focus on generating valuable discussion, not polished demos. Undone work is NOT demonstrated as done."
            ],
            keyPoints: [
                "Demonstrate 'Done' increment to stakeholders",
                "Gather feedback for backlog adaptation",
                "Collaborative discussion, not formal presentation",
                "Only show truly 'Done' work"
            ],
        },
    },
    {
        id: "sprint-retrospective",
        title: "Sprint Retrospective",
        type: "reading",
        content: {
            heading: "Continuous Improvement",
            paragraphs: [
                "The Sprint Retrospective is the team's opportunity to inspect itself and create an improvement plan. It's how Scrum teams get better over time.",
                "Standard format: What went well? What didn't go well? What will we try differently? Many facilitation techniques exist to keep retros fresh and productive.",
                "Key success factors: psychological safety (people must be honest), concrete action items, follow-through on previous improvements, variety in format to prevent staleness.",
                "The most important Scrum event for continuous improvement. Teams that skip or rush retrospectives miss the core benefit of Scrum: learning and adapting."
            ],
            keyPoints: [
                "Inspect team process and create improvement plan",
                "Requires psychological safety for honesty",
                "Must generate concrete, actionable improvements",
                "Most important event for continuous improvement"
            ],
            tip: "Rotate retrospective facilitation among team members. Different facilitators bring different perspectives and techniques."
        },
    },

    // =========================================================================
    // MODULE 3: SCALING WITH SAFe (Sections 11-16)
    // =========================================================================
    {
        id: "why-safe",
        title: "Why Scaled Agile?",
        type: "reading",
        content: {
            heading: "Agile at Enterprise Scale",
            paragraphs: [
                "Single-team Scrum works great for small products. But large products require multiple teams working together. Scaled frameworks address this coordination challenge.",
                "SAFe (Scaled Agile Framework) is the most widely adopted scaling framework, used by over 70% of Fortune 100 companies pursuing enterprise agility.",
                "SAFe provides configurations for different scales: Essential SAFe (basic ART), Large Solution (multiple ARTs), Portfolio (strategy and investment).",
                "SAFe isn't just 'more Scrum'—it adds constructs for aligning teams, managing dependencies, and connecting strategy to execution at scale."
            ],
            keyPoints: [
                "Large products need coordination beyond single-team Scrum",
                "SAFe is used by 70%+ of Fortune 100",
                "Configurations for different scales",
                "Adds alignment and strategy constructs"
            ],
        },
    },
    {
        id: "art-overview",
        title: "Agile Release Trains (ARTs)",
        type: "reading",
        content: {
            heading: "The Primary Value Delivery Construct",
            paragraphs: [
                "An Agile Release Train (ART) is a long-lived team of agile teams (typically 50-125 people) that develops and delivers solutions incrementally using a series of fixed-length Iterations.",
                "ARTs align to a significant value stream—a series of steps that delivers value to a customer. All teams on the ART work toward shared objectives.",
                "Key ART roles: Release Train Engineer (RTE—like a Scrum Master for the ART), Product Management (owns ART backlog), System Architect (guides technical decisions).",
                "ARTs operate on a Program Increment (PI) cadence—typically 8-12 weeks with 4-5 iterations plus an Innovation and Planning (IP) iteration."
            ],
            keyPoints: [
                "50-125 people aligned to a value stream",
                "Long-lived, stable composition",
                "Program Increment (PI) = 8-12 week planning cycle",
                "Key roles: RTE, Product Management, System Architect"
            ],
        },
    },
    {
        id: "pi-planning",
        title: "PI Planning",
        type: "reading",
        content: {
            heading: "The Heartbeat of the ART",
            paragraphs: [
                "PI Planning is a 2-day (or equivalent distributed) event where all ART members plan the upcoming Program Increment together. It's the most powerful event in SAFe.",
                "Day 1: Business Context and Vision (why), Architecture Vision (how), Teams break out to create draft plans, Management Review of dependencies and risks.",
                "Day 2: Planning adjustments, final plan creation, program risks addressed, confidence vote, and retrospective. Teams commit to PI Objectives.",
                "PI Planning creates alignment, identifies dependencies and risks early, and builds commitment. Teams leave with a shared understanding of what the ART will deliver."
            ],
            keyPoints: [
                "2-day event with entire ART (50-125 people)",
                "All teams plan together and identify dependencies",
                "Creates PI Objectives and Program Board",
                "Ends with team confidence vote and commitment"
            ],
            warning: "PI Planning is NOT optional in SAFe. Skipping or shortcutting PI Planning removes the primary mechanism for ART alignment and predictability."
        },
    },
    {
        id: "scenario-pi-planning",
        title: "Scenario: PI Planning Challenge",
        type: "scenario",
        scenario: {
            situation: "During PI Planning, your team identifies a dependency on another team that isn't represented at the planning event. The other team's work is critical to your success.",
            question: "What should you do?",
            options: [
                "Plan around the dependency and hope it works out",
                "Immediately escalate to management to force the other team to comply",
                "Identify the dependency on the Program Board, communicate directly with the other team, and involve the RTE if needed to resolve",
                "Remove that feature from your plan since you can't control the dependency"
            ],
            correctIndex: 2,
            feedback: "Dependency management is a core PI Planning outcome. Identify the dependency visually on the Program Board (red string!), reach out directly to establish alignment, and involve the RTE if escalation is needed. Don't hope or force—collaborate to resolve."
        },
    },
    {
        id: "iteration-execution",
        title: "Iteration Execution in SAFe",
        type: "reading",
        content: {
            heading: "Delivering Value Every Iteration",
            paragraphs: [
                "SAFe iterations are typically 2 weeks. Teams use Scrum or Kanban within the iteration, aiming to deliver a working increment that integrates with other teams' work.",
                "Iteration Goals connect to PI Objectives. Each team's iteration plan should advance progress toward the committed PI Objectives for that team.",
                "System Demos at iteration end show integrated work across all teams on the ART. This is where integration issues surface and alignment is validated.",
                "The Innovation and Planning (IP) iteration at PI end provides time for innovation, learning, infrastructure work, and next PI planning."
            ],
            keyPoints: [
                "2-week iterations typical",
                "Iteration Goals connect to PI Objectives",
                "System Demos show integrated ART progress",
                "IP Iteration for innovation, learning, and planning"
            ],
        },
    },
    {
        id: "quiz-safe-basics",
        title: "Knowledge Check: SAFe Basics",
        type: "quiz",
        quiz: {
            question: "What is the primary purpose of PI Planning in SAFe?",
            options: [
                "To create detailed documentation for stakeholders",
                "To align all teams to shared objectives, identify dependencies and risks, and create commitment",
                "To assign individual work items to team members",
                "To evaluate team performance from the previous PI"
            ],
            correctIndex: 1,
            explanation: "PI Planning aligns all ART teams to shared objectives (PI Objectives), identifies dependencies and risks through collaborative planning, and creates commitment through team confidence votes. It's not about documentation, individual assignment, or performance review."
        },
    },

    // =========================================================================
    // MODULE 4: SAFe LEADERSHIP (Sections 17-20)
    // =========================================================================
    {
        id: "lean-agile-leadership",
        title: "Lean-Agile Leadership",
        type: "reading",
        content: {
            heading: "Leading the Agile Enterprise",
            paragraphs: [
                "SAFe success requires leaders who embody and model lean-agile values. Leaders create the environment that enables agility—or prevents it.",
                "Three dimensions: Leading by Example (model the behavior you want), Mindset and Principles (embrace lean-agile thinking), Leading Change (drive organizational transformation).",
                "Key behaviors: Learn constantly, go to the gemba (where work happens), create space for teams to problem-solve, remove systemic impediments, apply systems thinking.",
                "Traditional command-and-control leadership undermines agility. Lean-agile leaders empower teams, provide vision, and remove obstacles rather than directing activities."
            ],
            keyPoints: [
                "Leaders model the behavior they expect",
                "Embrace lean-agile mindset and principles",
                "Drive organizational change",
                "Empower teams rather than direct activities"
            ],
        },
    },
    {
        id: "rte-role",
        title: "The Release Train Engineer (RTE)",
        type: "reading",
        content: {
            heading: "Facilitating the Agile Release Train",
            paragraphs: [
                "The Release Train Engineer is a servant leader and coach for the ART. They facilitate ART processes and execution, escalate impediments, and drive continuous improvement.",
                "PI Planning: The RTE facilitates the entire event—logistics, agenda, breakouts, risk ROAM-ing, confidence vote. They're the 'Scrum Master for the ART.'",
                "During PI Execution: Run Sync events (Scrum of Scrums, PO Sync), track progress, facilitate risk resolution, support System Demos.",
                "Inspect and Adapt: Facilitate the PI-level retrospective, help quantify and analyze the cost of delay, and drive improvement."
            ],
            keyPoints: [
                "Servant leader for the entire ART",
                "Facilitates PI Planning and execution",
                "Runs sync events and tracks progress",
                "Drives continuous improvement at scale"
            ],
        },
    },
    {
        id: "sm-responsibilities-safe",
        title: "Scrum Master in SAFe",
        type: "reading",
        content: {
            heading: "Team-Level Facilitation in Scaled Context",
            paragraphs: [
                "Scrum Masters in SAFe perform traditional SM duties (facilitate team events, remove impediments, coach team) while also participating in ART-level activities.",
                "SM's represent their team in Scrum of Scrums, identifying and communicating cross-team dependencies and impediments. They help the RTE understand team-level challenges.",
                "During PI Planning, SMs facilitate their team's planning sessions, help the team create realistic plans, and ensure dependencies are identified and communicated.",
                "SMs also help their teams understand their role in the larger ART context—how their work contributes to PI Objectives and overall business value."
            ],
            keyPoints: [
                "Traditional SM duties plus ART-level participation",
                "Represent team in Scrum of Scrums",
                "Facilitate team's PI Planning sessions",
                "Connect team work to broader business value"
            ],
        },
    },
    {
        id: "final-assessment-safe",
        title: "SAFe Certification Assessment",
        type: "quiz",
        quiz: {
            question: "Your ART is struggling with cross-team dependencies that aren't being resolved. Work repeatedly blocks waiting for other teams. What is the most effective systemic improvement?",
            options: [
                "Have each team work independently to avoid dependencies",
                "Strengthen PI Planning dependency identification, improve daily Scrum of Scrums visibility, and consider team structure changes to reduce coupling",
                "Assign a project manager to track and escalate all dependencies",
                "Extend iteration length to allow more time for blocked work"
            ],
            correctIndex: 1,
            explanation: "Systemic improvements address root causes. Better dependency identification in PI Planning catches issues earlier. Improved Scrum of Scrums visibility surfaces blocks faster. Team structure changes (realigning people, adjusting boundaries) can reduce coupling at the source. Longer iterations and PMs are bandaids that don't fix the underlying problem."
        },
    },
];

export default expandedSAFeModule;
