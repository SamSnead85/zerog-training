# Navigation, Onboarding, and User Experience Architecture

> **Document Type**: Design Specification
> **Platform**: ScaledNative AI-Native Training Platform

---

## 1. Onboarding Flow

### 1.1 First-Time User Journey

```
┌───────────────┐    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   Welcome     │ →  │  Role/Skill   │ →  │   Platform    │ →  │  Personalized │
│    Screen     │    │  Assessment   │    │     Tour      │    │     Path      │
└───────────────┘    └───────────────┘    └───────────────┘    └───────────────┘
```

#### Step 1: Welcome Screen
**Content**:
- "Welcome to ScaledNative, [Name]"
- Brief platform value proposition (10 seconds)
- "Let's personalize your learning journey" CTA

**Design Notes**:
- Auto-play subtle animation of the curriculum map
- Skip option for returning enterprise users

---

#### Step 2: Role & Skill Assessment (3-5 minutes)

**Section A: Professional Context**

| Question | Options |
|----------|---------|
| What best describes your role? | Software Developer, Data Scientist, Product Manager, Business Leader, DevOps/SRE, Designer, Other |
| What's your team's primary focus? | Building AI Products, Integrating AI into Applications, AI Strategy & Governance, AI Research, General Tech |
| How does your organization currently use AI? | Production AI applications, Experimenting with AI, Just starting, No AI usage yet |

**Section B: Technical Assessment (Adaptive)**

Based on role, present 5-10 quick-check questions:

*For Developers*:
- Can you explain what an embedding is?
- Have you built applications using LLM APIs?
- Do you understand the difference between RAG and fine-tuning?
- Have you deployed AI models to production?

*For Business Leaders*:
- Can you explain AI ROI to stakeholders?
- Have you led AI initiatives?
- Do you understand AI risk and governance?

*For Data Scientists*:
- Have you fine-tuned transformer models?
- Can you implement custom training loops?
- Have you worked with vector databases?

**Output**: Skill profile + recommended learning path

---

#### Step 3: Platform Tour (Interactive, 2 minutes)

**Highlight Points**:

1. **Dashboard** (5 seconds)
   - "Your dashboard shows progress, achievements, and recommended next lessons"
   - Spotlight on learning streak and certifications

2. **Course Catalog** (5 seconds)
   - "Browse 180+ hours of curriculum across 4 certification paths"
   - Show filter options

3. **Module Structure** (10 seconds)
   - "Every module includes readings, videos, hands-on labs, and quizzes"
   - Click through a sample lesson

4. **Labs Environment** (10 seconds)
   - "Our labs run in your browser—no setup required"
   - Show code editor preview

5. **AI Assistant** (5 seconds)
   - "Stuck? Our AI tutor can explain concepts and help debug your code"
   - Show chat interface

6. **Certifications** (5 seconds)
   - "Complete certification paths to earn verifiable credentials"
   - Show sample certificate

---

#### Step 4: Personalized Path Recommendation

**Content**:
- "Based on your assessment, here's your recommended path:"
- Show 3-4 modules in suggested order
- Explain time commitment
- "Start with [Module 1: AI Fundamentals]" primary CTA

**Customization Options**:
- "Or explore all courses" secondary link
- "Edit my profile" link

---

### 1.2 Returning User Experience

**Quick Start on Return**:
- Show "Continue Learning" card with current module
- Show progress toward next certification
- Display learning streak (gamification)
- Show new content since last visit

---

## 2. Dashboard Design

### 2.1 Learner Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│  ScaledNative                                     🔔  👤 John D  │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Good morning, John! 🔥 3-day streak                              │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  📚 Continue Learning                                        │ │
│  │                                                              │ │
│  │  Module 1: AI Fundamentals                                   │ │
│  │  ├─ Unit 2: How LLMs Work                                   │ │
│  │  └─ Lesson 2.3: Embeddings and Vectors           [▶ Resume] │ │
│  │                                                              │ │
│  │  Progress: ████████░░░░░░ 38%        Est. 2h to complete    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────┐  ┌─────────────────────┐                │
│  │  🎯 Current Path    │  │  🏆 Achievements     │                │
│  │                     │  │                      │                │
│  │  AI-Native          │  │  5 Lessons Complete │                │
│  │  Foundations        │  │  2 Labs Passed      │                │
│  │  ████░░░░░ 33%     │  │  1 Quiz Aced        │                │
│  │                     │  │                      │                │
│  │  📅 Goal: Jan 15    │  │  Next: First Module  │                │
│  └─────────────────────┘  └─────────────────────┘                │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  📈 Your Progress This Week                                  │ │
│  │  [Progress chart showing learning time per day]              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  🆕 New Content                                              │ │
│  │                                                              │ │
│  │  • Module 8: Advanced Agentic Frameworks (Just Released)    │ │
│  │  • New Lab: Build a Multi-Agent System                       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Dashboard Components

**Continue Learning Card**
- Current lesson with thumbnail
- Progress bar
- Estimated time to complete
- One-click resume button

**Certification Progress**
- Current path with visual progress
- Target completion date
- Days remaining

**Achievements**
- Recent accomplishments
- Next achievement hint
- Total badges earned

**Weekly Activity**
- Daily learning time chart
- Streak counter
- Goal progress

**New Content Feed**
- Recently added modules/lessons
- Recommended based on interests

---

## 3. Course Catalog Navigation

### 3.1 Catalog Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Course Catalog                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Filters:  [All] [My Path] [Completed] [Bookmarked]             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  🔍 Search courses...                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Certification Paths                                              │
│  ┌──────────────────┬──────────────────┬──────────────────────┐ │
│  │ 🎓 AI-Native     │ 🎓 Associate     │ 🎓 Professional       │ │
│  │ Foundations      │ Developer        │ Developer             │ │
│  │                  │                  │                        │ │
│  │ 3 Modules        │ 4 Modules        │ 3 Modules              │ │
│  │ 65 hours         │ 80 hours         │ 50 hours               │ │
│  │ [In Progress]    │ [Locked]         │ [Locked]               │ │
│  └──────────────────┴──────────────────┴──────────────────────┘ │
│                                                                   │
│  Filter by:                                                       │
│  Role: [All ▼]   Level: [All ▼]   Topic: [All ▼]   Duration: [All ▼] │
│                                                                   │
│  All Modules (12)                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  📘 Module 1: AI Fundamentals                               │ │
│  │  ⭐ 4.9 | ⏱ 25 hours | 🎯 Beginner | 📊 In Progress (38%)  │ │
│  │  Learn the foundations of AI, from neural networks to LLMs  │ │
│  │                                               [Continue →]   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  📘 Module 2: AI Dev Stack & Prompt Engineering             │ │
│  │  ⭐ 4.8 | ⏱ 20 hours | 🎯 Beginner-Intermediate | 📊 Not Started │
│  │  Master the tools and techniques of modern AI development   │ │
│  │                                                  [View →]    │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 Filter Options

| Filter | Options |
|--------|---------|
| Role | Developer, Data Scientist, Product Manager, Business Leader, All |
| Level | Beginner, Intermediate, Advanced, Expert |
| Topic | LLMs, RAG, Agents, MLOps, Security, Strategy |
| Duration | < 5 hours, 5-15 hours, 15-30 hours, 30+ hours |
| Status | Not Started, In Progress, Completed, Bookmarked |

---

## 4. In-Module Navigation

### 4.1 Lesson View Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  ←  Module 1 / Unit 2 / Lesson 2.3: Embeddings and Vectors      │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────────────────────────────┐ │
│  │ UNIT PROGRESS  │  │                                        │ │
│  │                │  │  📚 Reading: Embeddings Explained      │ │
│  │ Unit 2         │  │                                        │ │
│  │ ├─ 2.1 ✓      │  │  [Content area with text, code,        │ │
│  │ ├─ 2.2 ✓      │  │   diagrams, and interactive elements]  │ │
│  │ ├─ 2.3 ● ←   │  │                                        │ │
│  │ ├─ 2.4 ○      │  │                                        │ │
│  │ ├─ 2.5 ○      │  │                                        │ │
│  │ └─ 2.6 ○      │  │                                        │ │
│  │                │  │                                        │ │
│  │ ───────────── │  │                                        │ │
│  │                │  │                                        │ │
│  │ LESSON PARTS  │  │                                        │ │
│  │ ├─ Reading ● │  │                                        │ │
│  │ ├─ Video ○   │  │                                        │ │
│  │ ├─ Lab ○     │  │                                        │ │
│  │ └─ Quiz ○    │  │                                        │ │
│  │                │  ├────────────────────────────────────────┤ │
│  │ 📊 38%        │  │  [Previous]              [Next: Video →] │ │
│  └────────────────┘  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### 4.2 Navigation Components

**Breadcrumb Trail**:
```
Module 1: AI Fundamentals > Unit 2: How LLMs Work > Lesson 2.3: Embeddings
```
- Each level is clickable
- Current location highlighted

**Progress Sidebar**:
- Collapsible on mobile
- Shows all lessons in current unit
- Visual indicators: ✓ Complete, ● Current, ○ Not started
- Click to navigate between lessons
- Shows lesson completion percentage

**Lesson Part Indicator**:
- Reading → Video → Lab → Quiz
- Linear progression recommended
- Can skip ahead (but warned)

**Bottom Navigation**:
- Previous/Next buttons
- Keyboard shortcuts (←, →)
- "Mark as Complete" for reading sections

### 4.3 Mobile Considerations

- Sidebar collapses to bottom drawer
- Swipe navigation between lesson parts
- Floating "Next" button on scroll
- Progress visible in collapsed header

---

## 5. Enterprise Admin Dashboard

### 5.1 Team Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  Team Overview - Engineering Division                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📊 Team Progress                   📈 Engagement Metrics         │
│  ┌─────────────────────────────┐   ┌─────────────────────────┐   │
│  │                             │   │                          │   │
│  │  [Donut chart]              │   │  Active Learners: 47/52 │   │
│  │  67% Average Completion     │   │  Avg. Weekly Time: 3.2h │   │
│  │                             │   │  Completion Rate: 91%   │   │
│  │                             │   │                          │   │
│  └─────────────────────────────┘   └─────────────────────────┘   │
│                                                                   │
│  🎯 Skill Distribution                                            │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  Foundational: ████████████████████ 85%                   │   │
│  │  Intermediate: ████████████░░░░░░░░ 52%                   │   │
│  │  Advanced:     ██████░░░░░░░░░░░░░░ 28%                   │   │
│  │  Expert:       ██░░░░░░░░░░░░░░░░░░ 8%                    │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ⚠️  Attention Needed (5 learners behind schedule)              │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  • Jane Smith - Module 1 overdue by 5 days               │   │
│  │  • Bob Johnson - Inactive for 14 days                     │   │
│  │  • [View All →]                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Assign Training

**Workflow**:

1. **Select Recipients**
   - Individual learners
   - Teams/departments
   - Roles (all developers)
   - Custom groups

2. **Choose Content**
   - Certification paths
   - Individual modules
   - Custom learning paths
   - Specific lessons

3. **Set Parameters**
   - Due date (optional)
   - Priority level
   - Prerequisite enforcement
   - Completion requirements

4. **Review & Assign**
   - Summary of assignment
   - Notification preview
   - Schedule or assign immediately

### 5.3 Reporting

**Available Report Types**:

| Report | Description | Frequency |
|--------|-------------|-----------|
| Completion Report | Progress toward assigned training | Weekly |
| Compliance Report | Training requirements vs. completion | Monthly |
| Engagement Report | Active learners, time spent, trending content | Weekly |
| Skill Gap Analysis | Team competencies vs. target state | Quarterly |
| Individual Progress | Detailed learner journey | On-demand |
| ROI Report | Training investment vs. outcomes | Quarterly |

---

## 6. Help & Support Integration

### 6.1 AI Tutor (Always Available)

**Features**:
- Explain concepts from current lesson
- Debug code from labs
- Answer questions about AI topics
- Suggest next steps

**Interface**:
- Floating chat button in bottom-right
- Can reference current lesson context
- Code-aware responses

### 6.2 Resource Links

Every lesson includes:
- "Related Lessons" section
- External resource links
- Glossary term links
- "Still confused?" escalation

---

*This navigation and UX architecture ensures learners can easily find content, track progress, and maintain engagement throughout their AI-Native learning journey.*
