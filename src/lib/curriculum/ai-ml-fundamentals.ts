/**
 * AI & Machine Learning Fundamentals - Complete Curriculum
 * 
 * Research-backed curriculum covering:
 * - AI/ML concepts for business professionals
 * - Understanding LLMs and Generative AI
 * - AI governance and ethics
 * - AI implementation strategy
 */

import { LessonContent, QuizQuestion } from "./prompt-engineering-mastery";

// =============================================================================
// LESSON 1: AI/ML Fundamentals for Business
// =============================================================================

export const aiLesson1_fundamentals: LessonContent = {
    id: "ai-101",
    title: "AI & ML Fundamentals",
    description: "Build foundational understanding of artificial intelligence and machine learning concepts",
    duration: "45 min",
    objectives: [
        "Distinguish between AI, ML, and Deep Learning",
        "Identify common AI/ML use cases in business",
        "Explain how LLMs and Generative AI work",
        "Evaluate AI solutions for business problems"
    ],
    sections: [
        {
            id: "ai1-1",
            title: "Understanding the AI Landscape",
            type: "text",
            content: `
# What is Artificial Intelligence?

**Artificial Intelligence (AI)** is the simulation of human intelligence by computer systems. It encompasses any technique that enables machines to mimic cognitive functions.

## The AI Hierarchy

### AI (Artificial Intelligence)
The broadest category - any machine performing tasks that typically require human intelligence.

### ML (Machine Learning)
A subset of AI where systems **learn from data** without being explicitly programmed for each task.

### Deep Learning
A subset of ML using **neural networks** with many layers to learn complex patterns.

### Generative AI
A subset of Deep Learning that can **create new content** (text, images, code, etc.)

---

## Types of Machine Learning

### Supervised Learning
- Learns from **labeled data** (input → known output)
- Examples: Spam detection, price prediction, image classification
- "Show me examples of what's right"

### Unsupervised Learning
- Finds patterns in **unlabeled data**
- Examples: Customer segmentation, anomaly detection
- "Find structure in this data"

### Reinforcement Learning
- Learns through **trial and error** with rewards/penalties
- Examples: Game AI, robotics, recommendation optimization
- "Learn what works through experience"

---

## Key Business Use Cases

| Domain | Use Case | AI Type |
|--------|----------|---------|
| Marketing | Customer segmentation | Unsupervised |
| Sales | Lead scoring | Supervised |
| Operations | Demand forecasting | Supervised |
| Support | Chatbots | NLP/Gen AI |
| Finance | Fraud detection | Supervised |
| HR | Resume screening | NLP |
| Product | Recommendations | Collaborative filtering |
            `
        },
        {
            id: "ai1-2",
            title: "Large Language Models & Generative AI",
            type: "text",
            content: `
# Understanding LLMs

**Large Language Models (LLMs)** are AI systems trained on massive amounts of text data to understand and generate human language.

## How LLMs Work

### Training
1. **Pre-training**: Learn language patterns from billions of documents
2. **Fine-tuning**: Specialize for specific tasks or behaviors
3. **RLHF**: Reinforcement Learning from Human Feedback to improve safety/helpfulness

### Key Concept: Tokens
- LLMs don't read words - they process **tokens** (word pieces)
- "understanding" might be 2-3 tokens
- Context window = max tokens in a conversation

### Key Concept: Temperature
- Controls randomness/creativity
- Low (0.0-0.3): Deterministic, factual
- Medium (0.4-0.7): Balanced
- High (0.8-1.0): Creative, varied

---

## Generative AI Capabilities

### Text Generation
- Writing, summarization, translation
- Code generation
- Chat and conversation

### Image Generation
- DALL-E, Midjourney, Stable Diffusion
- Creates images from text descriptions

### Audio/Video
- Voice synthesis, music generation
- Video creation and editing

---

## Limitations to Understand

### Hallucinations
LLMs can generate confident but **factually incorrect** information.
- Always verify important claims
- Most common with specific dates, numbers, recent events

### Knowledge Cutoff
Training data has a cutoff date - LLMs don't know recent events unless given tools to search.

### No True Understanding
LLMs predict likely text, they don't "understand" like humans.
- Pattern matching, not reasoning
- Can fail on novel logical problems

### Bias
Training data biases can appear in outputs.
- Historical biases in text
- Geographic/cultural representation gaps
            `,
            tips: [
                "LLMs are powerful pattern matchers, not conscious reasoners",
                "Always fact-check important claims from AI outputs",
                "The quality of your input (prompt) directly affects output quality"
            ]
        },
        {
            id: "ai1-3",
            title: "Evaluating AI for Business",
            type: "text",
            content: `
# When to Use AI (and When Not To)

## Good Fit for AI/ML

✅ **Large datasets available** - ML needs data to learn from
✅ **Pattern-based decisions** - Consistent rules can be learned
✅ **Scalability needed** - AI can process millions of items
✅ **Tolerance for errors** - Some mistakes are acceptable
✅ **Clear success metrics** - You can measure improvement

## Poor Fit for AI/ML

❌ **Very limited data** - Can't learn patterns from tiny datasets
❌ **Explainability critical** - Some ML is a "black box"
❌ **100% accuracy required** - AI is probabilistic
❌ **Rapidly changing rules** - Faster than retraining
❌ **Simple rule-based logic** - Don't overcomplicate

---

## Build vs Buy Decision

### Buy (SaaS/API)
- Faster time to value
- Lower upfront investment
- Proven, maintained solution
- Best for: Common use cases, resource-constrained teams

### Build Custom
- Competitive differentiation
- Full control and customization
- Proprietary data advantage
- Best for: Core competency, unique requirements

### Fine-tune Existing Models
- Middle ground approach
- Start with foundation model
- Customize for your domain
- Best for: Domain-specific needs without full build

---

## Questions to Ask Vendors

1. What data was the model trained on?
2. What are the accuracy/performance metrics?
3. How is the model updated over time?
4. What are the latency and scalability characteristics?
5. What security and privacy measures are in place?
6. How is bias detected and mitigated?
7. What's the total cost of ownership?
            `
        }
    ],
    quiz: [
        {
            id: "aiq1-1",
            type: "ordering",
            question: "Put these AI concepts in order from broadest to narrowest:",
            options: ["Generative AI", "Machine Learning", "Deep Learning", "Artificial Intelligence"],
            correctAnswer: [3, 1, 2, 0],
            explanation: "AI is the broadest concept, containing ML, which contains Deep Learning, which contains Generative AI as a specialized subset.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "aiq1-2",
            type: "multiple-choice",
            question: "What is a 'hallucination' in the context of LLMs?",
            options: [
                "A visual glitch in AI-generated images",
                "When an LLM generates confident but factually incorrect information",
                "A type of training data error",
                "A security vulnerability"
            ],
            correctAnswer: 1,
            explanation: "Hallucinations occur when LLMs generate convincing but false information. They 'hallucinate' facts that don't exist, which is why human verification is important.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "aiq1-3",
            type: "scenario",
            question: "A startup with 100 customer records wants to use ML to predict customer churn. What's the best advice?",
            options: [
                "Train a custom deep learning model",
                "Use simple rules or heuristics first - 100 records is likely too few for ML",
                "Buy the most expensive ML platform available",
                "Wait until you have millions of records"
            ],
            correctAnswer: 1,
            explanation: "100 records is generally too few for effective ML training. Simple rules based on domain knowledge (e.g., 'customers who haven't logged in for 30 days are at risk') are more appropriate until more data is available.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "aiq1-4",
            type: "multiple-select",
            question: "Which are valid uses for supervised machine learning? (Select all that apply)",
            options: [
                "Classifying emails as spam or not spam",
                "Finding natural groups in customer data",
                "Predicting house prices based on features",
                "Training a robot through trial and error",
                "Detecting fraudulent transactions"
            ],
            correctAnswer: [0, 2, 4],
            explanation: "Supervised learning uses labeled data: spam classification, price prediction, and fraud detection all use labeled examples. Customer grouping is unsupervised, and robot training is reinforcement learning.",
            difficulty: "medium",
            points: 15
        }
    ],
    keyTakeaways: [
        "AI → ML → Deep Learning → Generative AI (nested hierarchy)",
        "LLMs predict likely text; they don't truly 'understand'",
        "Hallucinations are a key risk - always verify important AI outputs",
        "ML needs data: small datasets may be better served by simple rules",
        "Build vs Buy depends on differentiation, data, and resources"
    ]
};

// =============================================================================
// AI Curriculum Export
// =============================================================================

export const aiCurriculum = {
    moduleId: "ai-ml-fundamentals",
    title: "AI & Machine Learning Fundamentals",
    description: "Essential AI/ML literacy for business professionals",
    lessons: [
        aiLesson1_fundamentals
    ],
    totalDuration: "45 min",
    certification: {
        name: "AI Literate Professional",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "ai-literate"
    }
};

export const aiFinalAssessment: QuizQuestion[] = [
    {
        id: "ai-final-1",
        type: "scenario",
        question: "Your CEO asks: 'Should we build our own LLM to compete with ChatGPT?' What's the best response?",
        options: [
            "Yes, custom LLMs always outperform generic ones",
            "No, training a competitive LLM requires massive resources beyond most organizations - consider fine-tuning existing models for your domain instead",
            "Yes, if you hire one ML engineer",
            "No, LLMs are just a fad"
        ],
        correctAnswer: 1,
        explanation: "Training an LLM from scratch requires billions in compute, massive data, and specialized teams. Most organizations should use existing models via API or fine-tune for their domain - that's where the value is.",
        difficulty: "medium",
        points: 20
    },
    {
        id: "ai-final-2",
        type: "multiple-choice",
        question: "Which machine learning approach learns from labeled examples of inputs and their correct outputs?",
        options: [
            "Unsupervised learning",
            "Supervised learning",
            "Reinforcement learning",
            "Transfer learning"
        ],
        correctAnswer: 1,
        explanation: "Supervised learning trains on labeled data where both inputs and correct outputs are known. The model learns to map inputs to outputs based on these examples.",
        difficulty: "easy",
        points: 10
    }
];
