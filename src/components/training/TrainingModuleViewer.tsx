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

interface TrainingModuleViewerProps {
    moduleId?: string;
}

export function TrainingModuleViewer({ moduleId }: TrainingModuleViewerProps) {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const sections = cybersecurityModule;
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
                            <h1 className="font-semibold">Cybersecurity Awareness Training</h1>
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
