# Enterprise Features Content

> **Document Type**: UI Content & Copy
> **Platform**: ScaledNative AI-Native Training Platform

---

## 1. Team Overview Page Content

### Page Header
**Title**: Team Overview  
**Subtitle**: Monitor your team's AI learning journey

---

### Team Progress Card

**Title**: Training Progress

**Empty State**:
> No training assigned yet. Assign your first training path to get started.
> [Assign Training]

**With Data**:
> Your team is making progress! **67%** of assigned training is complete.

**Tooltip Text** (on hover):
> This percentage represents total completed lessons divided by total assigned lessons across all team members.

---

### Engagement Metrics Card

**Title**: Engagement This Week

| Metric | Tooltip |
|--------|---------|
| Active Learners | Team members who completed at least one activity in the past 7 days |
| Avg. Weekly Time | Average learning time per active team member |
| Completion Rate | Percentage of learners completing assigned training on schedule |

**Low Engagement Alert**:
> ⚠️ Engagement has dropped **23%** this week. Consider sending a reminder.

---

### Skill Distribution Card

**Title**: Team Skill Levels

**Tooltip**:
> Based on highest completed certification level per team member.

| Level | Description |
|-------|-------------|
| Foundational | Completed AI-Native Foundations certification |
| Intermediate | Completed Associate Developer certification |
| Advanced | Completed Professional Developer certification |
| Expert | Completed Solutions Architect certification |

---

### Attention Needed Section

**Title**: Needs Attention

**Subtitle**: Team members who may need support

**Alert Types**:
- 🟡 **Overdue**: Training deadline missed
- 🔴 **Inactive**: No activity in 14+ days
- 🟠 **Struggling**: Multiple failed quiz attempts

**CTA**: View All Learners →

---

## 2. Assign Training Page Content

### Step 1: Select Recipients

**Section Title**: Who should take this training?

**Options**:
- **Individuals**: Select specific team members
- **Teams**: Assign to entire departments or groups
- **Roles**: Target by job function (e.g., all Developers)
- **Custom Group**: Create a custom selection

**Helper Text**:
> Tip: Assigning to roles automatically includes future hires with that role.

---

### Step 2: Choose Content

**Section Title**: What should they learn?

**Content Types**:

| Type | Description | When to Use |
|------|-------------|-------------|
| Certification Path | Complete sequence of modules leading to certification | Structured learning programs, compliance |
| Individual Module | Single module with all its units and lessons | Topic-specific training |
| Custom Path | Your curated selection of modules | Custom team needs |
| Quick Skill | Individual lessons or labs | Just-in-time learning |

**Recommendation Banner**:
> 💡 **Recommended for your team**: AI-Native Foundations certification covers essential AI concepts for all roles.

---

### Step 3: Set Parameters

**Section Title**: How should it be completed?

**Due Date Field**:
- Label: Target Completion Date (Optional)
- Helper: Leave blank for self-paced learning

**Priority Field**:
- High: Appears at top of learner's dashboard
- Normal: Standard visibility
- Low: Listed but not promoted

**Prerequisites Toggle**:
- Label: Enforce prerequisite completion
- Helper: When enabled, learners must complete prerequisites before accessing this training

**Completion Requirements**:
- [ ] All lessons must be completed
- [ ] All quizzes must be passed (minimum 70%)
- [ ] All labs must be submitted
- [ ] Capstone project must be approved

---

### Step 4: Review & Assign

**Section Title**: Review Assignment

**Summary Fields**:
- Recipients: [Number] team members
- Content: [Module/Path name]
- Due Date: [Date or "Self-paced"]
- Est. Time: [X hours]

**Notification Preview**:
> **Subject**: New Training Assigned: AI-Native Foundations
> 
> Hi [Name],
> 
> You've been assigned new training on ScaledNative:
> - **Training**: AI-Native Foundations Certification
> - **Due Date**: [Date]
> - **Estimated Time**: 65 hours
> 
> [Start Learning →]

**Schedule Options**:
- [Assign Now]
- [Schedule for Later] - Date/time picker

---

## 3. Reporting Page Content

### Page Header
**Title**: Reports  
**Subtitle**: Generate insights on team learning progress

---

### Report Type Descriptions

#### Completion Report
**Description**: Track progress toward assigned training across your team. Shows completion percentage, lessons completed, and time invested.

**Use Case**: Weekly check-ins, manager 1:1s

**Available Filters**:
- Date range
- Team/department
- Content type
- Completion status

---

#### Compliance Report
**Description**: Verify completion of mandatory training requirements. Shows who has completed, who is in progress, and who is overdue.

**Use Case**: Compliance audits, policy requirements

**Compliance Status Legend**:
- ✅ **Compliant**: Completed before deadline
- ⏳ **In Progress**: Started but not complete
- ⚠️ **At Risk**: Less than 7 days to deadline
- ❌ **Non-Compliant**: Deadline passed, not complete

---

#### Engagement Report
**Description**: Understand how your team interacts with training content. Measure active learners, time spent, and content popularity.

**Key Metrics**:
- Weekly Active Learners (WAL)
- Average Session Duration
- Most Accessed Content
- Peak Learning Times
- Completion Velocity

---

#### Skill Gap Analysis
**Description**: Compare your team's current competencies against target skill profiles. Identify areas that need development.

**Use Case**: Strategic planning, hiring decisions

**Output Includes**:
- Current vs. Target skill matrix
- Priority development areas
- Recommended training paths
- Progress over time

---

#### Individual Progress Report
**Description**: Deep dive into a specific learner's journey. See their progress, quiz scores, time invested, and achievements.

**Use Case**: Performance reviews, coaching conversations

**Sections**:
- Learning history timeline
- Skill progression chart
- Quiz/assessment results
- Lab submissions
- Certificates earned

---

#### ROI Report
**Description**: Measure the return on your training investment. Track productivity improvements, skill development, and training efficiency.

**Use Case**: Budget justification, executive reporting

**Metrics**:
- Cost per learner
- Time to proficiency
- Skill improvement rate
- Training completion efficiency
- Learner satisfaction scores

---

## 4. Content Customization Page Content

### Page Header
**Title**: Custom Content  
**Subtitle**: Extend ScaledNative with your organization's materials

---

### Section: Upload Custom Content

**Title**: Add Your Content

**Supported Formats**:
- Video: MP4, WebM, MOV (up to 2GB)
- Documents: PDF, DOCX, PPTX
- Code: Jupyter Notebooks, Python files
- SCORM: 1.2 and 2004 compliant packages

**Upload Instructions**:
> Drag and drop files here, or click to browse.
> Custom content is available only to your organization.

**Content Metadata Form**:
- Title (required)
- Description
- Category/Topic
- Difficulty Level
- Estimated Duration
- Prerequisites

---

### Section: Custom Learning Paths

**Title**: Create Learning Paths

**Description**:
> Combine ScaledNative content with your own materials to create custom learning journeys tailored to your organization's needs.

**Builder Interface**:
```
┌───────────────────────────────────────────────────────────────┐
│  Path: AI for Our Engineering Team                           │
├───────────────────────────────────────────────────────────────┤
│  1. □ Module 1: AI Fundamentals (ScaledNative)               │
│  2. □ Our AI Guidelines (Custom PDF)                          │
│  3. □ Module 2: Prompt Engineering (ScaledNative)            │
│  4. □ Using AI Responsibly at [Company] (Custom Video)       │
│  5. □ Module 5: Agentic AI (ScaledNative)                    │
│                                                               │
│  [+ Add Content]   [↕ Reorder]   [💾 Save Path]              │
└───────────────────────────────────────────────────────────────┘
```

---

### Section: Content Policies

**Title**: Organization Content Settings

**Settings**:

| Setting | Description |
|---------|-------------|
| Content Visibility | Who can see custom content (All users, Selected teams, Admins only) |
| External Sharing | Allow learners to share completion with external platforms (LinkedIn, etc.) |
| Content Approval | Require admin approval before content goes live |
| Version Control | Track changes to custom content |

---

## 5. Tooltips & Helper Text Reference

### Common Elements

| Element | Helper Text |
|---------|-------------|
| Learning Streak | Consecutive days with at least 15 minutes of learning activity |
| Skill Level | Based on completed certifications and assessment scores |
| Estimated Time | Based on average completion time across all learners |
| Progress % | Completed activities divided by total activities in path |
| Completion Rate | Percentage of learners completing assigned training by due date |
| Active Learner | User who completed at least one activity in the past 7 days |

---

### Error Messages

| Situation | Message |
|-----------|---------|
| Assignment failed | We couldn't complete this assignment. Please try again or contact support. |
| Report generation timeout | This report is taking longer than expected. We'll email it when ready. |
| Content upload failed | Upload failed. Please check your file format and size, then try again. |
| No data for report | No learning activity found for the selected filters. Try expanding your date range. |

---

### Success Messages

| Situation | Message |
|-----------|---------|
| Training assigned | ✅ Training assigned to [X] team members. They'll receive notifications shortly. |
| Report generated | ✅ Your report is ready. [Download PDF] [View Online] |
| Content uploaded | ✅ "[Title]" has been uploaded and is now available in your content library. |
| Custom path created | ✅ Learning path "[Name]" created. You can now assign it to your team. |

---

*This document provides all user-facing copy for enterprise admin features. Content should be localized for international deployments.*
