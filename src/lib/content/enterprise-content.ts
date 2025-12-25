// Cybersecurity Fundamentals - Complete Training Module
// 5 Lessons with quizzes, key takeaways, and practical exercises

export const cybersecurityContent = {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    description: "Essential cybersecurity knowledge for all employees",
    lessons: [
        {
            id: "lesson-1",
            title: "Understanding Cyber Threats",
            duration: "20 min",
            type: "video",
            content: `
# Understanding Cyber Threats

## The Cybersecurity Landscape

Cyber threats are constantly evolving. Understanding the threat landscape is the first step in protecting yourself and your organization.

## Common Attack Vectors

### Phishing
The #1 entry point for attackers.

| Type | Description | Example |
|------|-------------|---------|
| Email Phishing | Fake emails impersonating trusted sources | "Your account will be suspended..." |
| Spear Phishing | Targeted attacks on specific individuals | Personalized with real details |
| Whaling | Targeting executives and leadership | Fake acquisition documents |
| Smishing | SMS-based phishing | "Your package delivery..." |

### Malware Types
- **Ransomware**: Encrypts files, demands payment
- **Trojans**: Disguised as legitimate software
- **Spyware**: Monitors and steals information
- **Worms**: Self-replicating across networks

### Social Engineering
Manipulating people rather than systems:
- Pretexting (fake scenarios)
- Baiting (free USB drives)
- Tailgating (following into secure areas)
- Quid pro quo (fake IT support)

## Real-World Impact

> 💰 **Average cost of a data breach: $4.45 million (2023)**

> ⏱️ **Average time to identify a breach: 207 days**

## Key Takeaways

✅ Phishing is the most common attack vector
✅ Social engineering exploits human psychology
✅ Malware comes in many forms with different purposes
✅ Early detection significantly reduces damage
      `,
            quiz: {
                question: "What is the most common attack vector used by cybercriminals?",
                options: [
                    "Brute force password attacks",
                    "Phishing and social engineering",
                    "Zero-day exploits",
                    "Physical theft of devices"
                ],
                correctIndex: 1,
                explanation: "Phishing and social engineering remain the #1 entry point for attackers because they exploit human psychology rather than technical vulnerabilities."
            }
        },
        {
            id: "lesson-2",
            title: "Password Security & Authentication",
            duration: "25 min",
            type: "video",
            content: `
# Password Security & Authentication

## Why Passwords Fail

**80% of breaches** involve weak or stolen passwords.

### Common Password Mistakes
- Using the same password everywhere
- Dictionary words and common phrases
- Personal information (birthdays, names)
- Short passwords under 12 characters
- Never changing passwords

## Creating Strong Passwords

### The Passphrase Method
Instead of: \`P@ssw0rd123!\`
Use: \`correct-horse-battery-staple\`

**Why it works:**
- 44 bits of entropy vs 28 bits
- Easy to remember
- Hard to crack

### Password Strength Formula
\`\`\`
Entropy = log2(Pool^Length)

8-char mixed: ~52 bits
16-char lowercase: ~75 bits
4-word passphrase: ~44-66 bits
\`\`\`

## Multi-Factor Authentication (MFA)

Something you:
1. **Know** - Password, PIN
2. **Have** - Phone, security key
3. **Are** - Fingerprint, face

### MFA Strength Ranking
| Method | Security Level |
|--------|---------------|
| Hardware keys (YubiKey) | ★★★★★ |
| Authenticator apps | ★★★★☆ |
| Push notifications | ★★★☆☆ |
| SMS codes | ★★☆☆☆ |
| Email codes | ★★☆☆☆ |

## Password Managers

**Recommended tools:**
- 1Password
- Bitwarden
- Dashlane
- LastPass

**Benefits:**
- Generate strong unique passwords
- Auto-fill prevents phishing
- Encrypted vault storage
- Secure sharing for teams

## Key Takeaways

✅ Use unique passwords for every account
✅ Enable MFA everywhere, especially email
✅ Use a password manager
✅ Hardware security keys are most secure
      `,
            quiz: {
                question: "Which MFA method provides the strongest security?",
                options: [
                    "SMS text message codes",
                    "Email verification codes",
                    "Hardware security keys (YubiKey)",
                    "Password-only authentication"
                ],
                correctIndex: 2,
                explanation: "Hardware security keys like YubiKey provide the strongest MFA because they require physical possession, are phishing-resistant, and cannot be intercepted remotely like SMS or email codes."
            }
        },
        {
            id: "lesson-3",
            title: "Safe Browsing & Email Security",
            duration: "20 min",
            type: "video",
            content: `
# Safe Browsing & Email Security

## Identifying Phishing Emails

### Red Flags to Watch For

1. **Urgency and Fear**
   - "Act immediately or lose access"
   - "Your account has been compromised"

2. **Sender Mismatch**
   - Display name: "Amazon Support"
   - Actual email: support@amaz0n-security.xyz

3. **Suspicious Links**
   - Hover before clicking
   - Look for typosquatting: g00gle.com

4. **Generic Greetings**
   - "Dear Customer" instead of your name

5. **Unusual Requests**
   - Asking for passwords or payment
   - Requesting you bypass normal procedures

### Before You Click

\`\`\`
✓ Verify sender's actual email address
✓ Hover over links to see real destination  
✓ Look for HTTPS and valid certificates
✓ When in doubt, navigate directly to the site
✓ Call to verify using a known number
\`\`\`

## Safe Browsing Practices

### HTTPS Everywhere
- Look for the lock icon 🔒
- Avoid entering data on HTTP sites
- Browser extensions: HTTPS Everywhere

### Public Wi-Fi Risks
- Avoid sensitive activities
- Use VPN when necessary
- Don't access banking or work systems

### Browser Security
- Keep browser updated
- Use ad blockers
- Clear cookies regularly
- Enable pop-up blocking
- Use private/incognito for sensitive browsing

## Reporting Suspicious Activity

**When something seems wrong:**
1. Don't click any links
2. Don't download attachments
3. Report to IT/Security team
4. Forward phishing to security@yourcompany.com
5. Delete the email

## Key Takeaways

✅ Always verify sender email addresses
✅ Hover over links before clicking
✅ Use HTTPS sites for sensitive data
✅ Report suspicious emails immediately
      `,
            quiz: {
                question: "What is the safest action when you receive a suspicious email claiming your account needs verification?",
                options: [
                    "Click the link to check if it's real",
                    "Reply asking if it's legitimate",
                    "Navigate directly to the company website instead of clicking links",
                    "Forward it to all colleagues as a warning"
                ],
                correctIndex: 2,
                explanation: "Never click links in suspicious emails. Instead, navigate directly to the company's official website by typing the URL in your browser to verify any account issues."
            }
        },
        {
            id: "lesson-4",
            title: "Data Protection & Privacy",
            duration: "25 min",
            type: "video",
            content: `
# Data Protection & Privacy

## Understanding Data Classification

### Sensitivity Levels

| Level | Examples | Handling |
|-------|----------|----------|
| Public | Marketing materials | No restrictions |
| Internal | Policies, procedures | Internal sharing only |
| Confidential | Financial data, PII | Need-to-know basis |
| Restricted | Trade secrets, passwords | Encrypted, limited access |

## Personally Identifiable Information (PII)

### What Qualifies as PII?
- Full name + other identifiers
- Social Security Number
- Financial account numbers
- Medical records
- Biometric data
- Email addresses
- IP addresses (in some contexts)

### Handling PII
\`\`\`
DO:
✓ Encrypt in transit and at rest
✓ Use secure channels for sharing
✓ Minimize collection and retention
✓ Apply access controls
✓ Log access for audit trails

DON'T:
✗ Email PII in plain text
✗ Store in unsecured locations
✗ Share more than necessary
✗ Keep longer than required
\`\`\`

## Secure File Sharing

### Approved Methods
- Company-sanctioned cloud storage
- Encrypted email/attachments
- Secure file transfer protocols
- VPN for remote access

### Avoid
- Personal email for work files
- Consumer cloud services (personal Dropbox)
- USB drives without encryption
- Printing sensitive data unnecessarily

## Clean Desk & Screen Policy

**End of day checklist:**
- [ ] Lock computer (Win+L or Cmd+Ctrl+Q)
- [ ] Secure documents in drawers
- [ ] Shred unneeded papers
- [ ] Clear whiteboards of sensitive info
- [ ] Remove badges/access cards

## Data Breach Response

If you suspect a breach:
1. **Don't panic** - quick action matters
2. **Don't try to fix it** yourself
3. **Report immediately** to security team
4. **Document** what you observed
5. **Preserve** evidence (don't delete)

## Key Takeaways

✅ Classify data appropriately before handling
✅ Encrypt sensitive data in transit and at rest
✅ Use only approved file sharing methods
✅ Report suspected breaches immediately
      `,
            quiz: {
                question: "What should you do FIRST if you suspect a data breach?",
                options: [
                    "Try to fix the problem yourself",
                    "Delete any suspicious files to prevent spread",
                    "Report immediately to the security team",
                    "Wait to see if it resolves on its own"
                ],
                correctIndex: 2,
                explanation: "The first action should always be reporting to the security team immediately. Don't try to fix it yourself or delete files, as this can destroy evidence and make the situation worse."
            }
        },
        {
            id: "lesson-5",
            title: "Physical Security & Remote Work",
            duration: "20 min",
            type: "video",
            content: `
# Physical Security & Remote Work

## Physical Security Fundamentals

### Access Control
- Always wear your badge visibly
- Never share access cards/badges
- Challenge unfamiliar faces politely
- Report lost/stolen badges immediately

### Tailgating Prevention
**Tailgating** = Following someone through a secured door

**What to do:**
- Don't hold doors for strangers
- Politely ask to see their badge
- Report repeated tailgating attempts
- Use mantrap entrances where available

### Visitor Management
- All visitors must sign in
- Escort visitors in secure areas
- Ensure visitors wear visible badges
- Log visitor departures

## Securing Your Workspace

### Device Security
- Lock screens when stepping away
- Never leave devices unattended in public
- Use cable locks for laptops
- Enable device encryption
- Use privacy screens in public spaces

### Printouts & Documents
- Pick up printouts immediately
- Use secure print release where available
- Shred sensitive documents
- Don't leave papers on desks overnight

## Remote Work Security

### Home Network Security
\`\`\`
✓ Change default router password
✓ Use WPA3 or WPA2 encryption
✓ Create separate guest network
✓ Keep router firmware updated
✓ Disable WPS
\`\`\`

### Virtual Private Network (VPN)
**Always use VPN when:**
- Accessing company resources
- Using public Wi-Fi
- Handling sensitive data
- Required by company policy

### Secure Video Conferencing
- Use waiting rooms
- Don't share meeting links publicly
- Be aware of background content
- Mute when not speaking
- Use blur/virtual backgrounds

### Physical Workspace at Home
- Secure work area from family view
- Lock devices when stepping away
- Don't print sensitive documents at home
- Use headphones for confidential calls

## Travel Security

**Before traveling:**
- [ ] Backup data
- [ ] Remove unnecessary sensitive data
- [ ] Enable device tracking
- [ ] Note emergency contacts

**While traveling:**
- [ ] Use VPN on hotel/airport Wi-Fi
- [ ] Keep devices with you at all times
- [ ] Use hotel safe for devices
- [ ] Be cautious of shoulder surfing

## Key Takeaways

✅ Physical security is as important as digital
✅ Secure your home network for remote work
✅ Always use VPN on untrusted networks
✅ Stay vigilant when traveling with devices
      `,
            quiz: {
                question: "What is 'tailgating' in a security context?",
                options: [
                    "Monitoring someone's internet activity",
                    "Following someone through a secured door without proper authorization",
                    "Sending multiple phishing emails",
                    "Leaving a computer unlocked"
                ],
                correctIndex: 1,
                explanation: "Tailgating is when an unauthorized person follows an authorized person through a secured door or access point without using their own credentials. It's a common physical security threat."
            }
        }
    ]
};

// Change Management Training Module
export const changeManagementContent = {
    id: "change-management",
    title: "Leading Change in Organizations",
    description: "Master change management frameworks and lead successful transformations",
    lessons: [
        {
            id: "lesson-1",
            title: "Understanding Organizational Change",
            duration: "25 min",
            type: "video",
            content: `
# Understanding Organizational Change

## Why Change Fails

**70% of change initiatives fail** to achieve their goals.

### Common Failure Reasons
1. Lack of clear vision (36%)
2. Insufficient leadership support (33%)
3. Poor communication (28%)
4. Employee resistance (26%)
5. Inadequate resources (24%)

## Types of Organizational Change

| Type | Scope | Timeline | Example |
|------|-------|----------|---------|
| Strategic | Whole org | 2-5 years | Digital transformation |
| Structural | Departments | 6-18 months | Reorganization |
| Process | Workflows | 3-12 months | New CRM implementation |
| Cultural | Mindsets | 3-10 years | Agile adoption |

## The Human Side of Change

### Kübler-Ross Change Curve
\`\`\`
Performance
    ↑
    |     ●1.Shock
    |    / \\
    |   /   ●2.Denial
    |  /     \\
    | /       ●3.Frustration
    |/         \\
    |           ●4.Depression
    |            \\
    |             ●5.Experiment
    |              \\
    |               ●6.Decision
    |                \\→ ●7.Integration
    +------------------------→ Time
\`\`\`

### Supporting People Through Change
- **Awareness**: Help understand why change is needed
- **Desire**: Create motivation to participate
- **Knowledge**: Provide skills and information
- **Ability**: Enable practice and application
- **Reinforcement**: Sustain the change

## Key Takeaways

✅ Most change initiatives fail—plan carefully
✅ People go through predictable emotional stages
✅ Different changes require different approaches
✅ The human element determines success
      `,
            quiz: {
                question: "What percentage of organizational change initiatives typically fail to achieve their goals?",
                options: [
                    "30%",
                    "50%",
                    "70%",
                    "90%"
                ],
                correctIndex: 2,
                explanation: "Research consistently shows that about 70% of organizational change initiatives fail to achieve their intended goals, primarily due to human and cultural factors rather than technical issues."
            }
        },
        {
            id: "lesson-2",
            title: "Kotter's 8-Step Change Model",
            duration: "30 min",
            type: "video",
            content: `
# Kotter's 8-Step Change Model

## Overview

John Kotter's model provides a structured approach to leading change:

## The 8 Steps

### Phase 1: Create Climate for Change

**Step 1: Create Urgency**
- Identify threats and opportunities
- Build compelling case for change
- Help others see the need to act

**Step 2: Build Guiding Coalition**
- Assemble group with power to lead
- Ensure right mix of skills and perspectives
- Develop trust and shared commitment

**Step 3: Form Strategic Vision**
- Create clear, inspiring vision
- Develop strategies to achieve it
- Make it easy to communicate

### Phase 2: Engage & Enable

**Step 4: Enlist Volunteer Army**
- Communicate vision broadly
- Use every channel possible
- Address concerns and fears

**Step 5: Remove Barriers**
- Identify obstacles to change
- Change systems blocking vision
- Take on middle management blockers

**Step 6: Generate Short-Term Wins**
- Plan visible improvements
- Create wins early and often
- Recognize contributors publicly

### Phase 3: Implement & Sustain

**Step 7: Sustain Acceleration**
- Build on gains and momentum
- Wake wake more change, not less
- Promote those who embody change

**Step 8: Anchor in Culture**
- Connect new approaches to success
- Develop means to ensure succession
- Articulate connections repeatedly

## Applying the Model

### For Each Step, Ask:
- What specific actions will we take?
- Who needs to be involved?
- How will we measure success?
- What could go wrong?

## Key Takeaways

✅ Sequence matters—don't skip steps
✅ Create urgency before action
✅ Build coalition of change leaders
✅ Short-term wins build momentum
      `,
            quiz: {
                question: "According to Kotter's model, what is the FIRST step in leading organizational change?",
                options: [
                    "Form a strategic vision",
                    "Create a sense of urgency",
                    "Build a guiding coalition",
                    "Generate short-term wins"
                ],
                correctIndex: 1,
                explanation: "Kotter's first step is creating urgency. Without a sense of urgency, people will not see the need for change and will resist efforts to alter the status quo."
            }
        },
        {
            id: "lesson-3",
            title: "Communication During Change",
            duration: "25 min",
            type: "video",
            content: `
# Communication During Change

## The Communication Imperative

> "You cannot over-communicate during change. Just when you think you've said it enough, say it again."

## Communication Principles

### The 7 Times Rule
People need to hear a message **7 times** before it sinks in.

### Multiple Channels
- Town halls and all-hands meetings
- Email and newsletters
- Videos and podcasts
- One-on-ones with managers
- Intranet and collaboration tools
- Visual displays and signage

## Crafting Change Messages

### The WHY-WHAT-HOW Framework

**WHY** (First Priority)
- Business drivers for change
- Consequences of not changing
- Benefits for employees

**WHAT** (Second Priority)
- Specific changes happening
- Timeline and milestones
- What stays the same

**HOW** (Third Priority)
- Implementation approach
- Support available
- How to get involved

### Example Message Structure
\`\`\`
Dear Team,

As you may know, [CONTEXT]. 

That's why we're [CHANGE]. This will help us 
[BENEFIT 1] and [BENEFIT 2].

Here's what this means for you:
- [IMPACT 1]
- [IMPACT 2]

We'll support you through:
- [SUPPORT 1]
- [SUPPORT 2]

Questions? [CONTACT]
\`\`\`

## Handling Difficult Questions

### The HEAR Method
- **H**ear the question fully
- **E**mpathize with concerns
- **A**nswer honestly (or commit to find out)
- **R**edirect to bigger picture

### It's OK to Say
- "I don't know yet, but I'll find out"
- "That's still being decided"
- "I understand your concern"

## Key Takeaways

✅ Communicate 7x more than you think necessary
✅ Use multiple channels for different audiences
✅ Lead with WHY before WHAT and HOW
✅ Be honest, even when answers are incomplete
      `,
            quiz: {
                question: "According to the 7 Times Rule, why do people need to hear a change message multiple times?",
                options: [
                    "Because managers forget to communicate",
                    "Because people need repetition to internalize and act on information",
                    "Because email doesn't work",
                    "Because people ignore the first few messages"
                ],
                correctIndex: 1,
                explanation: "The 7 Times Rule recognizes that people need repetition to truly internalize and act on new information, especially during the stress and uncertainty of organizational change."
            }
        }
    ]
};

export const enterpriseContent = {
    "cybersecurity-fundamentals": cybersecurityContent,
    "change-management": changeManagementContent,
};
