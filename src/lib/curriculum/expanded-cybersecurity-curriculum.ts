/**
 * Comprehensive Cybersecurity Awareness Curriculum
 * 
 * 50+ sections covering the full breadth of enterprise cybersecurity:
 * - Security Fundamentals & Threat Landscape
 * - Social Engineering & Phishing
 * - Password Security & Authentication
 * - Data Protection & Classification
 * - Physical Security
 * - Mobile & Remote Security
 * - Email & Web Security
 * - Incident Response
 * - Compliance & Regulations
 * - Security Culture & Best Practices
 */

import type { ModuleSection } from "./types";

export const expandedCybersecurityModule: ModuleSection[] = [
    // =========================================================================
    // MODULE 1: SECURITY FUNDAMENTALS (Sections 1-8)
    // =========================================================================
    {
        id: "cybersecurity-intro",
        title: "Introduction to Cybersecurity",
        type: "reading",
        content: {
            heading: "Why Cybersecurity Matters",
            paragraphs: [
                "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.",
                "As an employee, you are the first line of defense against cyber threats. 90% of successful cyber attacks begin with human error - clicking a malicious link, using a weak password, or falling for a social engineering scam.",
                "The cost of cybercrime is staggering: global cybercrime damages are projected to reach $10.5 trillion annually by 2025. The average cost of a data breach is $4.45 million, with breaches taking an average of 277 days to identify and contain.",
                "This training will equip you with the knowledge and skills to recognize, prevent, and respond to cyber threats. Your actions can prevent millions of dollars in damages and protect your organization's reputation."
            ],
            keyPoints: [
                "90% of data breaches are caused by human error",
                "Average cost of a data breach: $4.45 million",
                "Average time to identify a breach: 207 days",
                "You are the most important security control"
            ],
        },
    },
    {
        id: "threat-landscape",
        title: "The Modern Threat Landscape",
        type: "reading",
        content: {
            heading: "Understanding Today's Cyber Threats",
            paragraphs: [
                "The threat landscape is constantly evolving. Cybercriminals range from lone hackers to organized crime syndicates to nation-state actors with vast resources.",
                "Common threat actors include: Cybercriminals (motivated by money), Hacktivists (motivated by ideology), Insider Threats (current or former employees), Nation-State Actors (sponsored by governments), and Script Kiddies (opportunistic amateurs).",
                "Attack methods include phishing, malware, ransomware, denial-of-service attacks, man-in-the-middle attacks, SQL injection, and zero-day exploits. Attackers often combine multiple methods in sophisticated campaigns.",
                "The shift to remote work has expanded the attack surface dramatically. Home networks, personal devices, and cloud services create new vulnerabilities that attackers actively exploit."
            ],
            keyPoints: [
                "Threat actors range from amateurs to nation-states",
                "Financial gain is the primary motivation",
                "Remote work has expanded attack surfaces",
                "Attacks are becoming more sophisticated"
            ],
        },
    },
    {
        id: "attack-types",
        title: "Common Attack Types",
        type: "reading",
        content: {
            heading: "How Attackers Operate",
            paragraphs: [
                "MALWARE: Malicious software designed to damage, disrupt, or gain unauthorized access. Includes viruses, worms, Trojans, spyware, and adware. Spreads through email attachments, infected websites, and USB drives.",
                "RANSOMWARE: Encrypts your files and demands payment for the decryption key. Can spread across networks, locking entire organizations out of their data. Average ransom demand: $1.5 million.",
                "PHISHING: Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity. Includes email phishing, spear phishing (targeted), whale phishing (executives), vishing (voice), and smishing (SMS).",
                "DENIAL OF SERVICE (DoS/DDoS): Overwhelms systems with traffic to make them unavailable. Distributed attacks use botnets - networks of compromised computers - to generate massive traffic volumes."
            ],
            keyPoints: [
                "Malware spreads through attachments and downloads",
                "Ransomware can encrypt entire networks",
                "Phishing targets human psychology",
                "DDoS attacks can take down entire organizations"
            ],
            warning: "Never pay ransomware demands. There's no guarantee you'll get your data back, and payment funds further criminal activity."
        },
    },
    {
        id: "quiz-threat-landscape",
        title: "Knowledge Check: Threat Landscape",
        type: "quiz",
        quiz: {
            question: "What is the PRIMARY motivation for most cybercriminal attacks?",
            options: [
                "Political ideology and activism",
                "Financial gain and profit",
                "Personal revenge against organizations",
                "Testing security systems for fun"
            ],
            correctIndex: 1,
            explanation: "Financial gain is the primary motivation for most cybercriminal attacks. Ransomware, data theft for sale, and fraud are all driven by profit. While other motivations exist, money drives the majority of attacks."
        },
    },
    {
        id: "cia-triad",
        title: "The CIA Triad",
        type: "reading",
        content: {
            heading: "Core Security Principles",
            paragraphs: [
                "The CIA Triad is the foundation of information security: Confidentiality, Integrity, and Availability. Every security control aims to protect one or more of these principles.",
                "CONFIDENTIALITY: Ensuring information is accessible only to authorized parties. Controls include encryption, access controls, authentication, and data classification. Breaches result in unauthorized disclosure.",
                "INTEGRITY: Ensuring information is accurate, complete, and hasn't been tampered with. Controls include checksums, version control, audit trails, and digital signatures. Breaches result in data corruption or manipulation.",
                "AVAILABILITY: Ensuring authorized users can access information when needed. Controls include redundancy, backups, disaster recovery, and capacity planning. Breaches result in denial of service."
            ],
            keyPoints: [
                "Confidentiality: Keep secrets secret",
                "Integrity: Keep data accurate and unmodified",
                "Availability: Keep systems accessible",
                "All security controls map to CIA"
            ],
            tip: "When evaluating a security decision, ask: Does this protect Confidentiality, Integrity, or Availability?"
        },
    },
    {
        id: "defense-in-depth",
        title: "Defense in Depth",
        type: "reading",
        content: {
            heading: "Layered Security Strategy",
            paragraphs: [
                "Defense in Depth is a security strategy using multiple layers of protection. If one layer fails, others remain to protect assets. No single control can stop all attacks.",
                "PHYSICAL LAYER: Gates, locks, guards, surveillance, badge access. Prevents physical access to systems and data.",
                "NETWORK LAYER: Firewalls, intrusion detection, network segmentation, VPNs. Controls data flow and detects anomalies.",
                "ENDPOINT LAYER: Antivirus, endpoint detection, device encryption, patch management. Protects individual devices.",
                "APPLICATION LAYER: Secure coding, input validation, access controls. Protects software from exploitation.",
                "DATA LAYER: Encryption, data loss prevention, backups, classification. Protects the data itself.",
                "HUMAN LAYER: Training, awareness, policies, procedures. The most critical layer - you!"
            ],
            keyPoints: [
                "Multiple layers = multiple chances to stop attacks",
                "No single control is sufficient",
                "Physical, network, endpoint, application, data, human",
                "You are the final and most important layer"
            ],
        },
    },
    {
        id: "scenario-defense-layers",
        title: "Scenario: Defense Breakdown",
        type: "scenario",
        scenario: {
            situation: "An attacker sends a phishing email that bypasses the email filter. The link leads to a website hosting malware. The user clicks the link, but the malware fails to download because the browser's security settings blocked it.",
            question: "Which defense layer stopped the attack in this scenario?",
            options: [
                "The email layer (email filter)",
                "The network layer (firewall)",
                "The endpoint layer (browser security)",
                "The human layer (user awareness)"
            ],
            correctIndex: 2,
            feedback: "The endpoint layer (browser security settings) stopped this attack. The email filter failed, but the browser's security controls served as a backup layer. This demonstrates why Defense in Depth matters - when one layer fails, others can still protect you."
        },
    },
    {
        id: "security-mindset",
        title: "Developing a Security Mindset",
        type: "reading",
        content: {
            heading: "Think Like an Attacker",
            paragraphs: [
                "A security mindset means constantly questioning: 'How could this be exploited?' It's not about paranoia, but awareness and healthy skepticism.",
                "TRUST BUT VERIFY: Don't assume legitimacy based on appearance. Verify email senders, check URLs, confirm requests through known channels.",
                "ASSUME BREACH: Assume attackers are already inside. Limit damage through least privilege, segmentation, and monitoring.",
                "QUESTION URGENCY: Attackers create urgency to prevent careful thinking. Take a breath before acting on 'urgent' requests.",
                "PROTECT LIKE IT'S YOURS: Treat company data like your own personal information. Would you post your bank password on social media?"
            ],
            keyPoints: [
                "Always verify before trusting",
                "Assume systems could be compromised",
                "Be wary of urgent requests",
                "Protect company data like your own"
            ],
            tip: "When something feels 'off,' trust your instincts. Report suspicious activity - it's better to report 10 false alarms than miss 1 real attack."
        },
    },

    // =========================================================================
    // MODULE 2: PHISHING & SOCIAL ENGINEERING (Sections 9-18)
    // =========================================================================
    {
        id: "phishing-fundamentals",
        title: "Understanding Phishing",
        type: "reading",
        content: {
            heading: "The #1 Attack Vector",
            paragraphs: [
                "Phishing accounts for 36% of all data breaches. It's the most common initial attack vector because it targets the weakest link: humans.",
                "Phishing is a social engineering attack that tricks victims into revealing sensitive information, downloading malware, or taking actions that benefit the attacker.",
                "Attackers impersonate trusted entities: banks, government agencies, tech companies, coworkers, executives. The goal is to create trust, urgency, or fear that overrides careful judgment.",
                "A single successful phish can compromise an entire organization. One set of stolen credentials can lead to data theft, ransomware deployment, or business email compromise worth millions."
            ],
            keyPoints: [
                "36% of breaches start with phishing",
                "Targets human psychology, not technology",
                "Creates trust, urgency, or fear",
                "One click can compromise everything"
            ],
            warning: "Phishing has become highly sophisticated. Even security professionals fall victim. Never feel embarrassed to ask for help verifying a suspicious message."
        },
    },
    {
        id: "phishing-types",
        title: "Types of Phishing Attacks",
        type: "reading",
        content: {
            heading: "Know the Variants",
            paragraphs: [
                "EMAIL PHISHING: Mass emails impersonating trusted brands. Generic greetings, spelling errors, suspicious links. Easy to spot but high volume means some succeed.",
                "SPEAR PHISHING: Targeted attacks using personal information. Addresses you by name, references your job/company, appears from someone you know. Much harder to detect.",
                "WHALING: Spear phishing targeting executives. Impersonates C-suite, board members, or major clients. Often involves wire transfers or sensitive data.",
                "BUSINESS EMAIL COMPROMISE (BEC): Attacker compromises or impersonates executive email account. Requests wire transfers, W-2 data, or other sensitive actions. $2.4 billion in losses annually.",
                "VISHING (Voice Phishing): Phone calls impersonating IT support, IRS, banks. Creates urgency to reveal passwords or install software. 'Hello, this is Microsoft support...'"
            ],
            keyPoints: [
                "Mass phishing = low effort, high volume",
                "Spear phishing = targeted, personalized",
                "Whaling = targeting executives",
                "BEC = $2.4B annual losses"
            ],
        },
    },
    {
        id: "smishing-and-vishing",
        title: "SMS & Voice Phishing",
        type: "reading",
        content: {
            heading: "Beyond Email: Smishing and Vishing",
            paragraphs: [
                "SMISHING (SMS Phishing): Text messages with malicious links or requests for information. Examples: package delivery scams, bank alerts, 2FA interception attempts.",
                "Common smishing tactics: 'Your package couldn't be delivered, click here to reschedule.' 'Suspicious activity on your bank account, click to verify.' 'Your payment is overdue, click to avoid late fees.'",
                "VISHING (Voice Phishing): Phone calls impersonating legitimate entities. Tech support scams, IRS threats, bank fraud departments. Can use caller ID spoofing to appear legitimate.",
                "Red flags: Unexpected contact, requests for sensitive info, pressure to act immediately, threats of consequences, requests to keep secret."
            ],
            keyPoints: [
                "Smishing uses SMS text messages",
                "Vishing uses voice calls",
                "Both create urgency and fear",
                "Never give information to callers - hang up and call back"
            ],
            tip: "If someone calls claiming to be from your bank, hang up and call the number on your card. Legitimate organizations don't mind verification."
        },
    },
    {
        id: "quiz-phishing-types",
        title: "Knowledge Check: Phishing Types",
        type: "quiz",
        quiz: {
            question: "A C-suite executive receives an email that appears to be from the CEO, asking for an urgent wire transfer. What type of attack is this most likely?",
            options: [
                "Mass email phishing",
                "Smishing",
                "Whaling or BEC",
                "Vishing"
            ],
            correctIndex: 2,
            explanation: "This is most likely a Whaling or Business Email Compromise (BEC) attack. Targeting executives with impersonation of other executives for financial gain is the signature pattern of these sophisticated attacks. They account for billions in losses annually."
        },
    },
    {
        id: "phishing-red-flags",
        title: "Identifying Phishing Red Flags",
        type: "reading",
        content: {
            heading: "Signs of a Phishing Attempt",
            paragraphs: [
                "SENDER ADDRESS: Check the full email address, not just the display name. 'Amazon Support <support@amaz0n-security.com>' has a fake domain.",
                "URGENCY & THREATS: 'Your account will be closed!' 'You have 24 hours to respond!' 'Failure to act will result in...' Legitimate organizations rarely threaten.",
                "GENERIC GREETINGS: 'Dear Customer,' 'Dear User,' 'Account Holder.' Companies you have accounts with know your name.",
                "SPELLING & GRAMMAR: Professional organizations have editors. Obvious errors indicate fraud. (Though AI is making phishing more polished.)",
                "SUSPICIOUS LINKS: Hover before clicking. Does 'www.amazon.com/verify' actually go to amazon.com, or to 'amaz0n-verify.suspicious.com'?"
            ],
            keyPoints: [
                "Check the actual email address",
                "Beware urgency and threats",
                "Legitimate emails use your name",
                "Always hover over links before clicking"
            ],
        },
    },
    {
        id: "phishing-red-flags-advanced",
        title: "Advanced Phishing Detection",
        type: "reading",
        content: {
            heading: "Sophisticated Phishing Tactics",
            paragraphs: [
                "LOOKALIKE DOMAINS: micros0ft.com, goog1e.com, arnazon.com. Characters like 0/O, 1/l, rn/m are easily swapped. Check carefully.",
                "UNICODE TRICKS: Cyrillic 'а' (U+0430) looks identical to Latin 'a' (U+0061). аpple.com ≠ apple.com. These bypass quick visual inspection.",
                "LINK MASKING: HTML can show 'www.bank.com' while linking to 'www.evil.com'. Always hover to see the actual destination.",
                "ATTACHMENT TRICKS: '.pdf.exe' displays as '.pdf' if extensions are hidden. Documents requiring macros are major red flags.",
                "COMPROMISED ACCOUNTS: Email from a real colleague whose account was hacked. The 'from' address is legitimate, but the request is not."
            ],
            keyPoints: [
                "Check for lookalike characters (0/O, 1/l)",
                "Unicode can make fake domains look real",
                "Hidden extensions mask executable files",
                "Even legitimate emails can be compromised"
            ],
            warning: "With AI, phishing emails are becoming grammatically perfect and highly personalized. Technical red flags are becoming less reliable - always verify through secondary channels."
        },
    },
    {
        id: "scenario-phishing-ceo",
        title: "Scenario: CEO Urgency Request",
        type: "scenario",
        scenario: {
            situation: "You receive an email from 'John Smith - CEO' with the email address 'john.smith@yourcompany.co' (your actual domain is yourcompany.com). The email says: 'I need you to purchase $500 in gift cards for client appreciation immediately. Keep this confidential until I announce it. Text me the card codes at 555-123-4567.'",
            question: "What should you do?",
            options: [
                "Purchase the gift cards - the CEO asked for confidentiality",
                "Forward the email to the CEO's known email address to verify",
                "Report the email to IT security and do not respond",
                "Text the CEO to confirm before purchasing"
            ],
            correctIndex: 2,
            feedback: "Report to IT security immediately. This has multiple red flags: wrong domain (.co vs .com), request for gift cards (untraceable), confidentiality request (to prevent verification), and request to use personal phone (to avoid company records). This is a classic BEC/gift card scam that costs organizations millions annually."
        },
    },
    {
        id: "preventing-phishing",
        title: "Preventing Phishing Success",
        type: "reading",
        content: {
            heading: "Your Defensive Toolkit",
            paragraphs: [
                "STOP: Before clicking, stop and evaluate. Is this expected? Does something feel off? Fast clicks lead to compromises.",
                "VERIFY: When in doubt, verify through another channel. Call the sender using a known number. Go to websites directly, not through email links.",
                "REPORT: Report suspicious emails to IT security. Even if you're not sure, report it. Security teams prefer false positives to missed attacks.",
                "PROTECT: Enable multi-factor authentication everywhere. Even if credentials are phished, MFA can prevent account takeover.",
                "STAY UPDATED: Phishing tactics evolve constantly. Stay current through regular training and security awareness communications."
            ],
            keyPoints: [
                "STOP before clicking anything",
                "VERIFY through independent channels",
                "REPORT suspicious messages",
                "PROTECT with MFA everywhere"
            ],
            tip: "Use your organization's phishing report button if available. It's faster than forwarding and helps the security team track threats."
        },
    },
    {
        id: "social-engineering-tactics",
        title: "Social Engineering Psychology",
        type: "reading",
        content: {
            heading: "The Manipulation Playbook",
            paragraphs: [
                "Social engineers exploit fundamental human psychology. Understanding their tactics helps you recognize and resist them.",
                "AUTHORITY: We comply with authority figures. Fake boss emails, fake IT support calls, fake police threats. Always verify through official channels.",
                "URGENCY: Time pressure prevents careful thinking. 'Act now!' 'Only 24 hours!' 'Immediate action required!' Legitimate deadlines can wait for verification.",
                "SOCIAL PROOF: We follow the crowd. 'Everyone in your department already completed this.' 'Your colleagues approved this request.'",
                "RECIPROCITY: We feel obligated to return favors. 'I helped you last month, now I need a quick favor...'",
                "LIKING: We trust people we like. Attackers may chat, compliment, or find common ground before making requests."
            ],
            keyPoints: [
                "Authority: Question orders from 'executives'",
                "Urgency: Real deadlines survive verification",
                "Social Proof: Verify what 'everyone' is doing",
                "Reciprocity: Don't trade security for favors"
            ],
        },
    },
    {
        id: "quiz-social-engineering",
        title: "Knowledge Check: Social Engineering",
        type: "quiz",
        quiz: {
            question: "Someone claiming to be from IT calls and says your computer has been infected. They need your password immediately to prevent the virus from spreading to other systems. What manipulation tactic is primarily being used?",
            options: [
                "Reciprocity - you feel obligated to help",
                "Liking - the person is friendly",
                "Authority + Urgency - fake IT expert creating time pressure",
                "Social Proof - everyone else is doing it"
            ],
            correctIndex: 2,
            explanation: "This scenario combines Authority (impersonating IT, an expert position) with Urgency (preventing imminent virus spread). These are the two most powerful manipulation tactics. Legitimate IT never needs your password - they have administrative access."
        },
    },

    // =========================================================================
    // MODULE 3: PASSWORD SECURITY (Sections 19-26)
    // =========================================================================
    {
        id: "password-importance",
        title: "Why Passwords Matter",
        type: "reading",
        content: {
            heading: "Your First Line of Authentication",
            paragraphs: [
                "Passwords are the keys to your digital kingdom. A compromised password can give attackers access to your email, financial accounts, company systems, and personal data.",
                "81% of hacking-related breaches leverage stolen or weak passwords. Attackers have databases of billions of previously leaked passwords and use them continuously.",
                "Once inside with valid credentials, attackers are extremely hard to detect. They look like legitimate users because they have legitimate credentials.",
                "The average person has 100+ online accounts. Reusing passwords means a breach at any service compromises all services using that password."
            ],
            keyPoints: [
                "81% of breaches involve passwords",
                "Billions of leaked passwords are actively used",
                "Credential theft is hard to detect",
                "Password reuse multiplies risk"
            ],
            warning: "A password breach at a shopping site you forgot about can compromise your work email if you reused the password."
        },
    },
    {
        id: "password-attacks",
        title: "How Passwords Are Stolen",
        type: "reading",
        content: {
            heading: "Attack Methods You Should Know",
            paragraphs: [
                "BRUTE FORCE: Trying every possible combination. Short/simple passwords fall in seconds. A 6-character password (lowercase only) takes 0.5 seconds to crack.",
                "DICTIONARY ATTACKS: Trying common words, names, and known passwords. 'password123', 'qwerty', 'letmein' are tried in the first few attempts.",
                "CREDENTIAL STUFFING: Using passwords leaked from other breaches. If you used 'MyDog2020!' at LinkedIn and it was leaked, attackers try it at every other site.",
                "PHISHING: Tricking you into entering credentials on a fake login page. Often combined with MFA interception.",
                "KEYLOGGING: Malware that records every keystroke, capturing passwords as you type them."
            ],
            keyPoints: [
                "Brute force cracks short passwords instantly",
                "Common words are tried first",
                "Leaked passwords are tested everywhere",
                "Phishing steals passwords directly"
            ],
        },
    },
    {
        id: "password-creation",
        title: "Creating Strong Passwords",
        type: "reading",
        content: {
            heading: "Building Uncrackable Credentials",
            paragraphs: [
                "LENGTH OVER COMPLEXITY: 'PurpleElephantsDancing!' is stronger than 'P@ss1!' because length exponentially increases cracking time.",
                "PASSPHRASES: Multiple random words are both strong and memorable. 'correct-horse-battery-staple' is stronger than 'Tr0ub4dor&3' and easier to remember.",
                "NO PERSONAL INFO: Avoid names, birthdays, addresses, pet names, or anything findable on social media. Attackers research targets.",
                "UNIQUE EVERYWHERE: Every account needs a unique password. Use a password manager to make this practical.",
                "AVOID PATTERNS: 'Password1', 'Password2', 'Password3' or 'Summer2024', 'Fall2024' are trivially guessed after one breach."
            ],
            keyPoints: [
                "Aim for 16+ characters minimum",
                "Use passphrases: random words strung together",
                "Avoid personal information entirely",
                "Every account = unique password"
            ],
            tip: "A good password manager generates, stores, and fills unique 20+ character passwords for every site. You only memorize one master password."
        },
    },
    {
        id: "password-managers",
        title: "Password Manager Essentials",
        type: "reading",
        content: {
            heading: "The Practical Solution",
            paragraphs: [
                "Password managers solve the impossible task of remembering unique complex passwords for 100+ accounts. You remember one master password; the manager handles the rest.",
                "HOW THEY WORK: Your passwords are encrypted with your master password. Even if the manager's servers are breached, encrypted data is useless without your master.",
                "APPROVED OPTIONS: Use only organization-approved password managers. Common enterprise solutions include 1Password, Bitwarden, and LastPass. Ask IT for your organization's standard.",
                "BEST PRACTICES: Use a strong passphrase as your master password. Enable MFA on your password manager. Never share your master password with anyone, ever.",
                "THE ALTERNATIVE IS WORSE: Writing passwords on sticky notes, reusing passwords, or using variations all create greater risk than trusting a reputable manager."
            ],
            keyPoints: [
                "One strong master password = all passwords secured",
                "Use organization-approved managers only",
                "Enable MFA on your password manager",
                "Encrypted data is useless without master key"
            ],
        },
    },
    {
        id: "mfa-explained",
        title: "Multi-Factor Authentication",
        type: "reading",
        content: {
            heading: "Your Safety Net When Passwords Fail",
            paragraphs: [
                "Multi-Factor Authentication (MFA/2FA) requires something you know (password) PLUS something you have (phone, hardware key) or something you are (biometric).",
                "MFA stops 99.9% of automated attacks. Even if your password is phished, attackers can't access your account without the second factor.",
                "TYPES OF MFA: Authenticator apps (Google Authenticator, Microsoft Authenticator), Hardware keys (YubiKey), SMS codes (least secure, still better than nothing), Biometrics (fingerprint, face).",
                "NOT ALL MFA IS EQUAL: Authenticator apps > SMS codes. SMS can be intercepted via SIM-swapping attacks. Use app-based or hardware MFA when available."
            ],
            keyPoints: [
                "MFA = something you know + something you have",
                "Stops 99.9% of automated attacks",
                "Authenticator apps are more secure than SMS",
                "Enable MFA everywhere possible"
            ],
            warning: "SMS-based MFA is vulnerable to SIM-swapping attacks. Use authenticator apps or hardware keys for high-value accounts like email and banking."
        },
    },
    {
        id: "quiz-passwords",
        title: "Knowledge Check: Password Security",
        type: "quiz",
        quiz: {
            question: "Which is the STRONGEST password?",
            options: [
                "P@$$w0rd!",
                "Dragon2024!",
                "correct-horse-battery-staple",
                "qwertyuiop123456"
            ],
            correctIndex: 2,
            explanation: "'correct-horse-battery-staple' is strongest because of its length (28 characters) and randomness. 'P@$$w0rd!' is short and still a variation of 'password'. 'Dragon2024!' combines common words with a year. 'qwertyuiop123456' is a keyboard pattern that attackers check early."
        },
    },
    {
        id: "scenario-password-sharing",
        title: "Scenario: Manager Password Request",
        type: "scenario",
        scenario: {
            situation: "Your manager is working from home and calls saying they're locked out of their account during an urgent deadline. They ask you to share your password 'just this once' so they can access a shared drive and complete a critical client deliverable. They promise to reset their password tomorrow.",
            question: "What's the correct response?",
            options: [
                "Share your password - it's your manager and the work is urgent",
                "Offer to log in yourself and complete the task for them",
                "Explain you cannot share passwords and direct them to IT for password reset",
                "Give them an old password that you're not using anymore"
            ],
            correctIndex: 2,
            feedback: "Never share passwords under any circumstances. IT can reset passwords quickly, even after hours. Sharing passwords violates policy, creates liability, removes accountability, and could be a social engineering attack. If it truly is your manager, they'll understand policy compliance."
        },
    },
    {
        id: "password-compromised",
        title: "When Passwords Are Compromised",
        type: "reading",
        content: {
            heading: "Responding to Credential Breaches",
            paragraphs: [
                "Signs of compromise: Login alerts from unknown locations, password reset emails you didn't request, strange account activity, notifications from breach monitoring services.",
                "IMMEDIATE ACTIONS: Change the compromised password immediately. Check if you used that password elsewhere and change those too. Enable MFA if not already active.",
                "REPORT TO IT: Even personal breaches should be reported if there's any chance of overlap with work systems. IT can monitor for suspicious activity.",
                "USE BREACH CHECKERS: Services like HaveIBeenPwned.com check if your email appeared in known breaches. Check periodically and after major breach news."
            ],
            keyPoints: [
                "Monitor for login alerts and strange activity",
                "Change compromised passwords immediately everywhere",
                "Report potential overlaps to IT security",
                "Check haveibeenpwned.com regularly"
            ],
            tip: "Set up breach notification alerts at haveibeenpwned.com/NotifyMe to get automatic notifications if your email appears in new breaches."
        },
    },

    // =========================================================================
    // MODULE 4: DATA PROTECTION (Sections 27-34)
    // =========================================================================
    {
        id: "data-classification",
        title: "Data Classification Levels",
        type: "reading",
        content: {
            heading: "Not All Data is Equal",
            paragraphs: [
                "Data classification helps you understand what level of protection information requires. Higher classification = more restrictions and stronger security controls.",
                "PUBLIC: Information available to anyone. Marketing materials, public press releases. Minimal security requirements.",
                "INTERNAL: Information for employees only. Internal policies, org charts, project updates. Should not be shared externally.",
                "CONFIDENTIAL: Sensitive business information. Financial data, customer lists, strategic plans. Significant harm if disclosed.",
                "RESTRICTED: Highest sensitivity. PII, health records, credit card data, trade secrets, security configurations. Breach causes major damage and regulatory penalties."
            ],
            keyPoints: [
                "Public: Anyone can see",
                "Internal: Employees only",
                "Confidential: Significant harm if disclosed",
                "Restricted: Maximum protection required"
            ],
        },
    },
    {
        id: "handling-sensitive-data",
        title: "Handling Sensitive Data",
        type: "reading",
        content: {
            heading: "Best Practices for Data Protection",
            paragraphs: [
                "NEED-TO-KNOW: Only access data you need for your job. Don't browse sensitive records out of curiosity. Access is logged and audited.",
                "ENCRYPTION: Sensitive data should be encrypted at rest (stored) and in transit (transmitted). Never send confidential data via unencrypted email.",
                "APPROVED SYSTEMS ONLY: Store and share data only on approved, company-managed systems. No personal email, Dropbox, or cloud drives unless explicitly approved.",
                "CLEAN DESK/SCREEN: Lock computers when away. Don't leave sensitive documents visible. Position screens away from public view.",
                "SECURE DISPOSAL: Shred paper documents. Use approved data destruction for digital files. Simply deleting doesn't erase data."
            ],
            keyPoints: [
                "Access only what your job requires",
                "Use encryption for sensitive data",
                "Approved systems only - never personal accounts",
                "Lock screens, clear desks, shred documents"
            ],
            warning: "Accessing records of friends, family, or celebrities without business need is a policy violation that can result in termination - even if you don't disclose the information."
        },
    },
    {
        id: "pii-protection",
        title: "Protecting Personal Information (PII)",
        type: "reading",
        content: {
            heading: "Handling Personally Identifiable Information",
            paragraphs: [
                "PII (Personally Identifiable Information) can identify an individual. Social Security numbers, driver's licenses, financial accounts, medical records, biometric data.",
                "PII requires maximum protection due to regulatory requirements (GDPR, CCPA, HIPAA) and potential for identity theft, fraud, and harm to individuals.",
                "COLLECTION: Only collect PII that's necessary. Don't request SSNs unless legally required. Minimize what you gather.",
                "STORAGE: Store PII in approved, encrypted systems only. Never in spreadsheets, email attachments, or personal drives.",
                "TRANSMISSION: Use secure, approved methods only. No unencrypted email. No screenshots or photos of PII on personal devices."
            ],
            keyPoints: [
                "PII = any data that identifies an individual",
                "Collect only what's necessary",
                "Store in approved encrypted systems",
                "Never email PII unencrypted"
            ],
        },
    },
    {
        id: "quiz-data-handling",
        title: "Knowledge Check: Data Handling",
        type: "quiz",
        quiz: {
            question: "A vendor requests a spreadsheet of customer names and email addresses. The proper response is:",
            options: [
                "Email the spreadsheet immediately to move the project forward",
                "Share via personal Dropbox to avoid cluttering company systems",
                "Verify the vendor's authorization, use an approved secure file transfer method, and document the sharing",
                "Print the list and mail it to avoid digital transmission"
            ],
            correctIndex: 2,
            explanation: "Customer information is sensitive data. Before sharing: 1) Verify the vendor is authorized to receive this data, 2) Use an approved secure transfer method (not personal email or cloud storage), 3) Document what was shared, with whom, and why. This maintains security and creates an audit trail."
        },
    },
    {
        id: "data-loss-prevention",
        title: "Data Loss Prevention (DLP)",
        type: "reading",
        content: {
            heading: "Preventing Unauthorized Data Disclosure",
            paragraphs: [
                "DLP technologies monitor and protect sensitive data from leaving the organization inappropriately. They can block, alert, or log potentially problematic data transfers.",
                "DLP monitors: Email attachments, file uploads, cloud sharing, removable media, printing. It looks for patterns like SSN formats, credit card numbers, or classified document markers.",
                "IF BLOCKED: If DLP blocks something you're trying to do legitimately, don't try to work around it. Contact IT to request an approved exception.",
                "FALSE POSITIVES HAPPEN: DLP may occasionally flag legitimate activities. This is normal - security tools err on the side of caution. Report false positives to help tune the system."
            ],
            keyPoints: [
                "DLP monitors data leaving the organization",
                "May block, alert, or log suspicious transfers",
                "Don't circumvent - request exceptions",
                "Report false positives to improve accuracy"
            ],
        },
    },
    {
        id: "secure-file-sharing",
        title: "Secure File Sharing",
        type: "reading",
        content: {
            heading: "Approved Methods for Sharing Data",
            paragraphs: [
                "INTERNAL SHARING: Use company-approved collaboration tools (SharePoint, Teams, approved file shares). Set appropriate permissions - not everything needs to be company-wide.",
                "EXTERNAL SHARING: Use approved secure file transfer systems. Never use personal email or consumer cloud storage for business data.",
                "CHECK PERMISSIONS: Before sharing, verify recipients should have access to this data. Just because they're on a project doesn't mean they need all data.",
                "REMOVE ACCESS: When sharing is complete, remove access. Don't leave perpetual access to shared folders or files.",
                "DOCUMENT SHARING: For sensitive data, maintain records of what was shared, with whom, when, and why."
            ],
            keyPoints: [
                "Use approved tools only",
                "Set minimum necessary permissions",
                "Verify recipients' need-to-know",
                "Remove access when no longer needed"
            ],
            tip: "Ask IT for a list of approved file sharing tools and their appropriate use cases. Using the right tool matters."
        },
    },
    {
        id: "data-at-rest-transit",
        title: "Encryption: At Rest and In Transit",
        type: "reading",
        content: {
            heading: "Protecting Data Everywhere It Lives",
            paragraphs: [
                "DATA AT REST: Data stored on drives, databases, backups. Full disk encryption protects laptops if stolen. Database encryption protects stored records.",
                "DATA IN TRANSIT: Data moving across networks. HTTPS/TLS encrypts web traffic. VPNs encrypt remote connections. Email encryption protects message content.",
                "END-TO-END: The strongest protection encrypts data before it leaves your device and decrypts only at the intended destination. Nobody in between can read it.",
                "YOUR ROLE: Use encrypted connections (look for HTTPS/padlock). Connect to VPN when working remotely. Use approved encrypted communication tools."
            ],
            keyPoints: [
                "At Rest: Stored data protection",
                "In Transit: Moving data protection",
                "End-to-End: Strongest protection",
                "Always use HTTPS and VPN"
            ],
        },
    },
    {
        id: "scenario-data-request",
        title: "Scenario: Unauthorized Data Request",
        type: "scenario",
        scenario: {
            situation: "A colleague from another department calls and says their manager needs a list of all employees with their Social Security numbers for a 'benefits audit.' They need it right away and ask you to email it to them.",
            question: "What's the appropriate response?",
            options: [
                "Send the list - it's just going to a colleague",
                "Send only the names, not the SSNs",
                "Decline, explain the data requires proper authorization through HR/IT security, and suggest they have their manager submit a formal request",
                "Ask your own manager if it's okay to share"
            ],
            correctIndex: 2,
            feedback: "SSNs are highly sensitive PII. Verbal requests from colleagues don't authorize access to this data. Legitimate needs have formal processes through HR and IT security. This request could be social engineering, or the colleague may not understand data protection requirements. Either way, formal channels protect everyone."
        },
    },

    // =========================================================================
    // MODULE 5: PHYSICAL SECURITY (Sections 35-40)
    // =========================================================================
    {
        id: "physical-security-intro",
        title: "Physical Security Fundamentals",
        type: "reading",
        content: {
            heading: "Security Beyond the Digital",
            paragraphs: [
                "Cybersecurity isn't just digital. Physical access to devices, facilities, and documents can bypass all digital controls. An attacker with a laptop can do more damage than one with a remote connection.",
                "Physical security controls include: Access control systems (badges, biometrics), surveillance cameras, security guards, visitor management, clean desk policies, and device security.",
                "The goal is to prevent unauthorized physical access to sensitive areas, devices, and documents. If attackers can touch it, they can probably compromise it.",
                "Physical and cybersecurity work together. A 20-character password doesn't matter if someone can walk in and steal the laptop."
            ],
            keyPoints: [
                "Physical access can bypass digital controls",
                "Layers: badges, cameras, guards, policies",
                "If they can touch it, they can compromise it",
                "Physical + Digital security = Complete security"
            ],
        },
    },
    {
        id: "tailgating",
        title: "Tailgating & Piggybacking",
        type: "reading",
        content: {
            heading: "The Door Held Open",
            paragraphs: [
                "TAILGATING: Following an authorized person through a secure door without badging in yourself. The attacker waits for someone to enter and slips in behind them.",
                "PIGGYBACKING: Similar, but the victim knowingly holds the door. 'I forgot my badge.' 'My hands are full.' 'I'm a delivery person.'",
                "THE RISK: Once inside with physical access, attackers can steal devices, plant malware, access unlocked computers, or physically copy sensitive documents.",
                "YOUR RESPONSIBILITY: Badge in for every door. Never hold doors for strangers. Politely ask unrecognized people to show badges. Report suspicious behavior."
            ],
            keyPoints: [
                "Badge in for every access point",
                "Never hold doors for unknown people",
                "Ask strangers to show their badge",
                "Report suspicious behavior"
            ],
            warning: "Social pressure makes us want to be 'polite' and hold doors. Attackers exploit this. Being security-conscious is more important than being seen as 'nice.'"
        },
    },
    {
        id: "quiz-physical",
        title: "Knowledge Check: Physical Security",
        type: "quiz",
        quiz: {
            question: "Someone in business attire carrying a laptop bag approaches the secure door and says 'Hi, I'm from corporate IT here for a server upgrade. I forgot my visitor badge at reception.' What should you do?",
            options: [
                "Let them in - they look professional and have a legitimate reason",
                "Let them in but ask to see their ID",
                "Politely decline and offer to escort them back to reception to get their badge",
                "Ignore them and continue walking"
            ],
            correctIndex: 2,
            explanation: "Escort them to reception to get proper credentials. Professional appearance means nothing - social engineers dress the part. Legitimate IT visitors won't mind getting proper authorization. This protects both the organization and verifies they are who they claim to be."
        },
    },
    {
        id: "clean-desk-policy",
        title: "Clean Desk & Clean Screen",
        type: "reading",
        content: {
            heading: "Protecting Information in Plain Sight",
            paragraphs: [
                "CLEAN DESK: At the end of each day (or when leaving), secure all sensitive documents. Lock them in drawers or cabinets. Shred documents you no longer need.",
                "CLEAN SCREEN: Lock your computer when stepping away - even briefly. Windows: Win+L. Mac: Ctrl+Cmd+Q. It takes seconds to steal data from an unlocked machine.",
                "SHOULDER SURFING: Position screens away from windows and walkways. Use privacy screens in public areas. Be aware of who can see your screen.",
                "PRINTING: Collect printouts immediately. Never leave sensitive documents in printer trays. Use secure print features that require badge-at-printer."
            ],
            keyPoints: [
                "Secure sensitive documents when away",
                "Lock your screen every time you leave",
                "Position screens away from prying eyes",
                "Collect printouts immediately"
            ],
            tip: "Set your computer to auto-lock after 5 minutes of inactivity as a safety net. But don't rely on it - manually lock when you step away."
        },
    },
    {
        id: "visitor-management",
        title: "Visitor Management",
        type: "reading",
        content: {
            heading: "Controlling Guest Access",
            paragraphs: [
                "REGISTRATION: All visitors should register at reception and receive visible visitor badges. Badges indicate authorization and enable staff to identify guests.",
                "ESCORT REQUIREMENT: Visitors should be escorted by an employee at all times in secure areas. Don't leave visitors unattended.",
                "BADGE RETURN: Ensure visitor badges are returned when guests leave. Badges left active can enable future unauthorized access.",
                "QUESTION UNBADGED PEOPLE: If you see someone without a badge in a secure area, politely ask if they need help finding their host. Report if answers seem suspicious."
            ],
            keyPoints: [
                "All visitors get visible badges",
                "Escort visitors in secure areas",
                "Collect badges when visitors leave",
                "Question unbadged people politely"
            ],
        },
    },
    {
        id: "device-physical-security",
        title: "Securing Physical Devices",
        type: "reading",
        content: {
            heading: "Protecting Your Hardware",
            paragraphs: [
                "LAPTOPS: Never leave laptops unattended in public places. Use cable locks when docking in shared spaces. Enable full disk encryption.",
                "WORKSTATIONS: Lock screens when away. Never leave logged-in sessions unattended. Position screens for privacy.",
                "MOBILE DEVICES: Keep phones/tablets on your person or secured. Enable remote wipe capability. Use strong screen locks.",
                "USB DRIVES: If using approved drives, encrypt contents. Never plug in found USB drives - they may contain malware ('USB drop attacks')."
            ],
            keyPoints: [
                "Never leave devices unattended",
                "Use cable locks and encryption",
                "Enable remote wipe for mobile",
                "Never plug in unknown USB drives"
            ],
            warning: "Attackers intentionally drop malware-loaded USB drives in parking lots and lobbies. Plugging them in to 'see what's on them' infects your system."
        },
    },

    // =========================================================================
    // MODULE 6: REMOTE & MOBILE SECURITY (Sections 41-46)
    // =========================================================================
    {
        id: "remote-work-security",
        title: "Remote Work Security",
        type: "reading",
        content: {
            heading: "Securing the Home Office",
            paragraphs: [
                "Remote work expands the attack surface. Your home network, personal devices, and physical environment all become security considerations.",
                "NETWORK SECURITY: Use strong WiFi passwords (WPA3 if available). Update router firmware. Consider a separate network for work devices. Always use VPN for work activities.",
                "PHYSICAL SECURITY AT HOME: Lock devices when away - even at home. Position screens away from windows. Secure devices when not in use.",
                "FAMILY/ROOMMATE CONSIDERATIONS: Work devices are for you only. Don't let family members use work laptops. Discuss handling of work calls and materials."
            ],
            keyPoints: [
                "Secure home WiFi with strong passwords",
                "Always use VPN for work",
                "Lock devices even at home",
                "Work devices = your use only"
            ],
        },
    },
    {
        id: "public-wifi",
        title: "Public WiFi Risks",
        type: "reading",
        content: {
            heading: "The Dangers of Open Networks",
            paragraphs: [
                "Public WiFi at coffee shops, airports, and hotels is inherently insecure. Attackers can intercept data, create fake hotspots, and perform man-in-the-middle attacks.",
                "EVIL TWIN ATTACKS: Attackers create networks named 'Starbucks WiFi' or 'Airport Free WiFi.' When you connect, all your traffic goes through them.",
                "DATA INTERCEPTION: On unencrypted networks, attackers can see everything you transmit - emails, passwords, files, browser history.",
                "PROTECTION: Always use VPN on public networks. Verify you're connecting to the legitimate network. Avoid sensitive activities (banking, email) on public WiFi."
            ],
            keyPoints: [
                "Public WiFi is not secure",
                "Attackers create fake hotspots",
                "All your traffic can be intercepted",
                "Always use VPN on public networks"
            ],
            warning: "The 'Free WiFi' network in the coffee shop may not be from the coffee shop. When in doubt, use your phone's data connection instead."
        },
    },
    {
        id: "mobile-device-security",
        title: "Mobile Device Security",
        type: "reading",
        content: {
            heading: "Securing Smartphones and Tablets",
            paragraphs: [
                "Mobile devices carry sensitive data and have always-on network connections. They're lost frequently and are attractive theft targets.",
                "SCREEN LOCKS: Use strong PIN (6+ digits) or biometric locks. 4-digit PINs can be cracked quickly. Avoid pattern locks that leave visible swipe marks.",
                "UPDATES: Keep OS and apps updated. Mobile operating systems regularly patch security vulnerabilities. Enable automatic updates.",
                "APP CAUTION: Only install apps from official stores. Check app permissions - does a flashlight app really need access to contacts? Delete apps you don't use.",
                "REMOTE WIPE: Enable Find My Device (Android/iOS). If lost, you can locate, lock, and remotely wipe the device."
            ],
            keyPoints: [
                "Use strong screen locks (6+ digit PIN or biometric)",
                "Keep OS and apps updated",
                "Only install from official app stores",
                "Enable remote locate and wipe"
            ],
        },
    },
    {
        id: "byod-security",
        title: "BYOD Security",
        type: "reading",
        content: {
            heading: "Bring Your Own Device Risks",
            paragraphs: [
                "BYOD (Bring Your Own Device) policies allow personal devices for work. This creates unique security challenges combining personal and professional data.",
                "IF AUTHORIZED: Follow all BYOD policies exactly. Install required security software. Allow mobile device management (MDM) if required. Understand separation between personal and work data.",
                "SECURITY REQUIREMENTS: Organization may require: encryption, password policies, ability to remotely wipe work data, restrictions on certain apps.",
                "EXIT CONSIDERATIONS: When leaving the organization, work data may be remotely wiped from your personal device. Keep personal data backed up separately."
            ],
            keyPoints: [
                "Follow BYOD policies exactly",
                "Accept required security controls",
                "Understand data separation",
                "Work data may be remotely wiped"
            ],
        },
    },
    {
        id: "quiz-mobile",
        title: "Knowledge Check: Mobile Security",
        type: "quiz",
        quiz: {
            question: "You're traveling and need to access work email at the airport. The airport has free WiFi. What's the safest approach?",
            options: [
                "Connect directly to 'Airport Free WiFi' and access email",
                "Connect to VPN first, then access email through VPN",
                "Use cellular data connection instead of WiFi",
                "Both B and C are acceptable"
            ],
            correctIndex: 3,
            explanation: "Both VPN over public WiFi (B) and cellular data connection (C) are acceptable. VPN encrypts your traffic even on untrusted networks. Cellular data is generally more secure than public WiFi. The key is never accessing sensitive data on unprotected public WiFi."
        },
    },
    {
        id: "travel-security",
        title: "Traveling with Devices",
        type: "reading",
        content: {
            heading: "Security on the Road",
            paragraphs: [
                "Travel exposes devices to additional risks: theft, loss, border inspection, compromised hotel WiFi, and 'evil maid' attacks (someone accessing devices in your hotel room).",
                "BEFORE TRAVEL: Back up everything. Notify IT of travel plans. Consider a travel-only device with minimal data for high-risk destinations.",
                "DURING TRAVEL: Never leave devices in checked luggage. Don't use hotel business center computers. Be cautious of charging stations (juice jacking).",
                "BORDER CROSSINGS: In some countries, border agents can demand device access. Travel with minimal data. Know your organization's policy on device inspection."
            ],
            keyPoints: [
                "Back up before travel",
                "Keep devices with you always",
                "Avoid hotel business center computers",
                "Know policies for border inspections"
            ],
            tip: "Carry a portable charger instead of using public charging stations, which can be compromised to steal data or install malware."
        },
    },

    // =========================================================================
    // MODULE 7: INCIDENT RESPONSE (Sections 47-52)
    // =========================================================================
    {
        id: "incident-recognition",
        title: "Recognizing Security Incidents",
        type: "reading",
        content: {
            heading: "Know When Something's Wrong",
            paragraphs: [
                "A security incident is any event that threatens the confidentiality, integrity, or availability of information or systems. Early recognition enables faster response and less damage.",
                "POTENTIAL INDICATORS: Unexpected password resets, login alerts from unknown locations, files you didn't create, slow/strange computer behavior, colleagues receiving suspicious emails 'from you'.",
                "PHISHING SUCCESS: If you clicked a suspicious link or provided credentials to a fake site, that's an incident. Don't wait to see if anything bad happens - report immediately.",
                "DATA EXPOSURE: Emailing sensitive data to wrong recipients, finding unprotected data files, discovering unauthorized access - all are incidents."
            ],
            keyPoints: [
                "Any threat to confidentiality, integrity, availability",
                "Unusual account activity = potential incident",
                "Clicking phishing links = incident (report immediately)",
                "Data exposure to wrong people = incident"
            ],
        },
    },
    {
        id: "incident-reporting",
        title: "Reporting Security Incidents",
        type: "reading",
        content: {
            heading: "What, When, and How to Report",
            paragraphs: [
                "REPORT IMMEDIATELY: Time is critical. Attackers work fast. The sooner security knows, the sooner they can contain damage. Don't try to 'figure it out' first.",
                "HOW TO REPORT: Use your organization's security incident reporting method: security hotline, email to security team, IT help desk, or incident reporting tool.",
                "WHAT TO INCLUDE: What happened, when, what you observed, what you did (clicked link, entered password), what systems/data may be affected.",
                "DON'T COVER UP: Everyone makes mistakes. You won't be punished for falling for a sophisticated attack. You WILL have problems if you hide an incident that grows into a major breach."
            ],
            keyPoints: [
                "Report immediately - every minute matters",
                "Use official reporting channels",
                "Include what, when, and what you did",
                "Never hide incidents - early reporting prevents catastrophe"
            ],
            warning: "Unreported incidents grow. A single phished password today becomes a million-dollar ransomware attack next week. Report immediately, no matter how embarrassed you feel."
        },
    },
    {
        id: "post-incident",
        title: "After an Incident",
        type: "reading",
        content: {
            heading: "What Happens Next",
            paragraphs: [
                "SECURITY TEAM RESPONSE: IT security will investigate, contain the threat, and remediate. They may need to interview you about what happened. Be honest and thorough.",
                "YOUR ROLE: Follow all instructions from security team. You may need to change passwords, have your device reimaged, or suspend certain activities temporarily.",
                "PRESERVE EVIDENCE: Don't delete suspicious emails or files. Don't turn off affected computers. Security may need this evidence for investigation.",
                "LEARN AND IMPROVE: Every incident is a learning opportunity. Share lessons with colleagues. Participate in post-incident reviews. We all get better together."
            ],
            keyPoints: [
                "Cooperate fully with investigators",
                "Follow security team instructions",
                "Preserve evidence - don't delete",
                "Learn from every incident"
            ],
        },
    },
    {
        id: "quiz-incident",
        title: "Knowledge Check: Incident Response",
        type: "quiz",
        quiz: {
            question: "You realize you entered your password on a website that now looks suspicious. The page closed and nothing obvious happened. What should you do?",
            options: [
                "Wait to see if anything bad happens before reporting",
                "Change your password but don't report since nothing happened",
                "Immediately report to security AND change your password",
                "Try to find the website again to confirm it was fake"
            ],
            correctIndex: 2,
            explanation: "Report immediately AND change your password. 'Nothing happened' doesn't mean nothing will happen - attackers often wait before using stolen credentials. Reporting enables security to monitor for suspicious activity, and immediate password change prevents credential use."
        },
    },
    {
        id: "ransomware-response",
        title: "Ransomware Response",
        type: "reading",
        content: {
            heading: "When Files Are Encrypted",
            paragraphs: [
                "RANSOMWARE SIGNS: Files won't open, file extensions changed (.encrypted, .locked), ransom notes appearing on desktop or in folders, extremely slow system performance.",
                "IMMEDIATE ACTIONS: Disconnect from network (unplug ethernet, turn off WiFi) to prevent spread. Do NOT shut down the computer - memory may contain decryption keys. Report to security IMMEDIATELY.",
                "DO NOT PAY: Organization policy typically prohibits paying ransoms. Payment funds criminal enterprises and doesn't guarantee file recovery.",
                "RECOVERY: Restoration will come from backups and security team remediation. Your role is to report quickly and follow instructions."
            ],
            keyPoints: [
                "Disconnect from network immediately",
                "Don't shut down - report to security",
                "Never pay ransom demands",
                "Recovery comes from backups"
            ],
        },
    },
    {
        id: "scenario-ransomware",
        title: "Scenario: Ransomware Discovery",
        type: "scenario",
        scenario: {
            situation: "You return from lunch to find your desktop displaying a message: 'Your files have been encrypted. Send $500 in Bitcoin to the address below within 72 hours or your files will be deleted permanently.'",
            question: "What's your first action?",
            options: [
                "Shut down the computer to stop the encryption",
                "Unplug the network cable and immediately call/report to IT security",
                "Try to remove the ransomware yourself using antivirus",
                "Pay the ransom to save the files before the deadline"
            ],
            correctIndex: 1,
            feedback: "Disconnect from network and report immediately. Network disconnection prevents spread to other systems. Don't shut down - memory might contain decryption information. Don't try to fix it yourself - you could make it worse. Never pay - it funds criminals and rarely works."
        },
    },

    // =========================================================================
    // MODULE 8: FINAL ASSESSMENT (Sections 53-55)
    // =========================================================================
    {
        id: "summary-review",
        title: "Security Summary",
        type: "reading",
        content: {
            heading: "Key Takeaways",
            paragraphs: [
                "YOU ARE THE TARGET: Attackers target humans because we're the most vulnerable link. Your awareness is your organization's most important defense.",
                "VERIFY EVERYTHING: Email senders, phone callers, link destinations, unusual requests. When in doubt, verify through a separate channel.",
                "REPORT IMMEDIATELY: Seconds matter during incidents. Report suspicious activity before attempting to investigate yourself. No shame in false alarms.",
                "SECURITY IS EVERYONE'S JOB: Every employee, every day, every action. Security isn't just IT's responsibility - it's yours."
            ],
            keyPoints: [
                "You are the first and last line of defense",
                "Verify before trusting anything",
                "Report suspicious activity immediately",
                "Security is everyone's responsibility"
            ],
        },
    },
    {
        id: "final-assessment",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "You receive an email from 'IT Support' saying your password will expire in 24 hours and provides a link to reset it. The email looks professional and uses company logos. What should you do FIRST?",
            options: [
                "Click the link since password resets are legitimate IT activities",
                "Reply to the email asking if it's legitimate",
                "Check the sender's email address and hover over the link to inspect the URL",
                "Ignore it - your password probably won't really expire"
            ],
            correctIndex: 2,
            explanation: "First, verify the legitimacy by checking the sender's email address and hovering over the link to see where it actually leads. Even professional-looking emails can be phishing. Legitimate IT password reset links come from known domains. When in doubt, navigate directly to your password reset portal rather than clicking email links."
        },
    },
    {
        id: "certificate-completion",
        title: "Course Complete",
        type: "reading",
        content: {
            heading: "Congratulations!",
            paragraphs: [
                "You've completed the Cybersecurity Awareness Training. You now have the knowledge to recognize and respond to the most common cyber threats.",
                "Remember: security is an ongoing practice, not a one-time training. Stay vigilant, question the unexpected, and report anything suspicious.",
                "Your certificate of completion will be recorded in your training profile. Some organizations require annual recertification - check with your manager or HR."
            ],
            keyPoints: [
                "You are now certified in Cybersecurity Awareness",
                "Apply these practices every day",
                "Annual recertification may be required",
                "Questions? Contact your IT security team"
            ],
            tip: "Bookmark your organization's security incident reporting contact. Knowing how to report quickly when you need to is half the battle."
        },
    },
];

export default expandedCybersecurityModule;
