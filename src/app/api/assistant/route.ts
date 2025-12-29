import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are the AI Training Assistant for ScaledNative, an enterprise AI-powered training platform. 
You help managers, trainers, and employees with:

1. **Creating Training**: Guide users through creating custom training modules using AI Training Studio
2. **Finding Courses**: Help users discover courses from our 60+ module library (NIST, HIPAA, SAFe, Leadership, etc.)
3. **Answering Questions**: Explain compliance topics, HR policies, leadership concepts
4. **Best Practices**: Share training and development best practices

IMPORTANT CONTEXT:
- ScaledNative has 60+ pre-built courses covering: Cybersecurity (NIST CSF 2.0), HIPAA, GDPR, SAFe 6.0, Leadership, Change Management, DEI, Prompt Engineering, and more
- Users can upload their own policies/documents to customize training with organizational context
- Training includes interactive quizzes, scenarios, and assessments
- The platform is HITRUST & SOC 2 certified

RESPONSE GUIDELINES:
- Be helpful, concise, and professional
- Use markdown formatting for better readability
- Use bullet points and bold text for key information
- Keep responses under 200 words unless the user needs detailed explanation
- If asked about specific company policies, remind users that policies can be uploaded for AI customization
- Always offer next steps or follow-up questions

COURSE LIBRARY REFERENCE:
- NIST Cybersecurity Framework 2.0: 6 functions (Govern, Identify, Protect, Detect, Respond, Recover)
- HIPAA Compliance: Privacy Rule, Security Rule, Breach Notification
- SAFe 6.0: Lean-Agile, ARTs, PI Planning
- Leadership Fundamentals: Situational Leadership, SBI Feedback
- Change Management: Kotter 8-Step, ADKAR
- GDPR: Data privacy, subject rights, breach reporting
- DEI Foundations: Unconscious bias, microaggressions, allyship
- Bloodborne Pathogens: OSHA compliance for healthcare
- Prompt Engineering: Using AI tools effectively`;

interface ChatMessage {
    role: "user" | "assistant" | "model";
    content: string;
}

export async function POST(request: NextRequest) {
    try {
        const { message, history = [] } = await request.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY) {
            // Return helpful fallback response
            return NextResponse.json({
                response: getFallbackResponse(message),
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Build conversation history
        const chatHistory = history.map((msg: ChatMessage) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        // Add system context to first message or when history is empty
        const promptWithContext = chatHistory.length === 0
            ? `${SYSTEM_PROMPT}\n\nUser question: ${message}`
            : message;

        const result = await chat.sendMessage(promptWithContext);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Assistant API error:", error);
        return NextResponse.json({
            response: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or browse our training library directly.",
        });
    }
}

function getFallbackResponse(message: string): string {
    const input = message.toLowerCase();

    if (input.includes("create") || input.includes("training") || input.includes("module")) {
        return `**Creating Training with AI Training Studio:**

1. Navigate to **AI Training Studio** in the main menu
2. Browse 60+ pre-built courses or select **Create Custom**
3. Enter your topic and add organizational context
4. Upload relevant documents (policies, procedures, handbooks)
5. Configure delivery options (gamification, certificates)
6. Click **Generate Training with AI**

Your training will include interactive lessons, quizzes, and real-world scenarios!

Would you like me to suggest a topic to start with?`;
    }

    if (input.includes("hipaa") || input.includes("healthcare") || input.includes("phi")) {
        return `**HIPAA Training Overview:**

Our HIPAA Compliance module covers:
• **Privacy Rule** - Patient rights, permitted disclosures
• **Security Rule** - Administrative, physical, technical safeguards
• **Breach Notification** - 60-day notification requirements
• **18 HIPAA Identifiers** - What makes data PHI

The training includes real-world scenarios specific to your organization when you upload your policies.

Would you like to access the HIPAA training or create a customized version?`;
    }

    if (input.includes("cybersecurity") || input.includes("security") || input.includes("nist")) {
        return `**NIST Cybersecurity Framework 2.0:**

Our training covers the 6 core functions:
• **GOVERN** (NEW) - Cybersecurity leadership & strategy
• **IDENTIFY** - Know your assets and risks
• **PROTECT** - Implement safeguards
• **DETECT** - Monitor for threats
• **RESPOND** - Take action during incidents
• **RECOVER** - Restore operations

Includes phishing recognition, password security, and MFA training.

Would you like to explore cybersecurity training for your team?`;
    }

    if (input.includes("leadership") || input.includes("manager")) {
        return `**Leadership Training Modules:**

• **Leadership Fundamentals** - Situational leadership, delegation, feedback
• **Change Management** - Kotter's 8-Step, ADKAR framework
• **DEI Foundations** - Unconscious bias, inclusion practices
• **Psychological Safety** - Building high-performing teams

Each module includes practical exercises and scenarios relevant to your organization.

Which leadership topic interests you most?`;
    }

    return `**How I can help:**

• 📚 **Create Training** - Generate custom courses with AI
• 🔍 **Find Courses** - Browse 60+ pre-built modules
• ❓ **Answer Questions** - Explain compliance, HR, leadership topics
• 💡 **Best Practices** - Training program recommendations

**Popular topics:**
• Cybersecurity (NIST CSF 2.0)
• HIPAA Compliance
• Leadership & Management
• SAFe 6.0 Agile

What would you like to explore?`;
}
