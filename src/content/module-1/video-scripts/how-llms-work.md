# Video Script: How LLMs Actually Work

**Runtime**: 4-5 minutes  
**Topic**: Module 1, Topic 1: LLM Fundamentals

---

## Scene-by-Scene Script

| Scene | Time | Dialogue (Instructor) | On-Screen Visuals |
|-------|------|----------------------|-------------------|
| 1 | 0:00-0:20 | "Before you can build with AI, you need to understand what's actually happening inside these models. Today, we're going to demystify Large Language Models—and I promise, it's simpler than you think." | Title card: "How LLMs Actually Work". Instructor appears with a neural network animation in background. |
| 2 | 0:20-0:50 | "Here's the fundamental insight: LLMs are prediction machines. Given some text, they predict what word—or more precisely, what *token*—should come next. That's it. This simple task, done billions of times during training, is what creates the intelligence we see." | Animation: Sentence "The cat sat on the ___" with multiple possible completions (mat, floor, couch) appearing and probability bars next to each. |
| 3 | 0:50-1:30 | "Training happens in three phases. First, pre-training: the model reads the entire internet—Wikipedia, books, code, forums—everything. It's not trying to memorize; it's learning patterns. Grammar, facts, reasoning, code syntax—all emerge from predicting the next token." | Timeline animation showing: Phase 1 with icons of web pages, books, code files flowing into a neural network. |
| 4 | 1:30-2:00 | "During pre-training, if the model sees 'The Eiffel Tower is in' a million times followed by 'Paris', it learns that association. But here's the key: it doesn't store that fact like a database. It stores patterns that can reconstruct it." | Split visualization: database with rows vs. neural network with distributed weights. Show how "Eiffel Tower" activates patterns that lead to "Paris". |
| 5 | 2:00-2:30 | "Phase two is fine-tuning. We take this general-purpose language model and train it on specific examples of good behavior. 'Here's a question, here's a good answer.' This teaches the model how to be helpful." | Timeline continues: Phase 2 showing curated Q&A pairs flowing into the network. Before/after: raw completion vs. structured, helpful response. |
| 6 | 2:30-3:00 | "Finally, RLHF—Reinforcement Learning from Human Feedback. Real humans rate model responses. 'This answer is better than that one.' A reward model learns these preferences, and the LLM is optimized to maximize that reward." | Timeline continues: Phase 3 with human icons rating responses, thumbs up/down, reward model learning curve. |
| 7 | 3:00-3:30 | "Why does this matter to you as a developer? Understanding training helps you understand limitations. The model can't learn from your conversation—each call is stateless. It can't know events after its training cutoff. And it might confidently state false things it learned from bad training data." | Three warning boxes appearing: "Stateless (no memory)", "Knowledge cutoff", "Confident mistakes". |
| 8 | 3:30-4:00 | "It also helps you write better prompts. When you give the model a system prompt saying 'You are an expert Python developer', you're setting up the context for what comes next. The model predicts what an expert Python developer would say." | Code snippet appearing: system prompt example. Animation showing how it shapes the probability distribution of responses. |
| 9 | 4:00-4:30 | "To summarize: Pre-training teaches language and world knowledge. Fine-tuning teaches specific behaviors. RLHF aligns with human preferences. Understanding this helps you debug issues, choose models, and write better prompts." | Summary graphic: Three-phase pyramid with key takeaways. |
| 10 | 4:30-4:45 | "Next up, we'll dive into the practical details: tokens, context windows, and why your API bill might be higher than expected. See you there!" | End card: "Next: Tokens, Context, and Costs" with course navigation. |

---

## Production Notes

### Visual Requirements
- [ ] Next-token prediction animation
- [ ] Three-phase training timeline
- [ ] Database vs. neural network comparison
- [ ] Human rating animation
- [ ] Code snippet overlays

### B-Roll Suggestions
- Data center footage during pre-training explanation
- Human workers at computers during RLHF explanation
- Abstract neural network visualizations

### Key Visuals to Create
1. Probability distribution bar chart for next-token prediction
2. Training data flowing into network animation
3. Before/after fine-tuning response comparison
4. RLHF rating interface mockup

### Tone
- Curious and explanatory
- Use concrete examples
- "Here's the key insight" framing

---

## Accessibility Notes
- Use clear color contrast for probability bars
- Provide audio cues for timeline transitions
- Keep animations at moderate pace
