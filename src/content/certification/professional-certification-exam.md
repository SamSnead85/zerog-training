# AI-Native Developer Certification Exam

## Exam Overview

This comprehensive exam tests your mastery of AI-Native development practices across all 8 core modules. Successfully passing this exam demonstrates your ability to design, build, and deploy production-grade AI applications.

**Duration**: 3 hours  
**Format**: Multiple choice, short answer, and practical coding  
**Passing Score**: 75%  
**Total Points**: 100

---

## Section 1: AI Fundamentals (15 points)

### Multiple Choice (1 point each)

1. Which training phase teaches an LLM to be helpful and harmless using human feedback?
   - [ ] A) Pre-training
   - [ ] B) Supervised Fine-Tuning
   - [ ] C) Reinforcement Learning from Human Feedback (RLHF)
   - [ ] D) Tokenization

2. A context window of 128K tokens means:
   - [ ] A) The model has 128,000 parameters
   - [ ] B) The model can process approximately 128,000 tokens of input + output
   - [ ] C) The model costs $128 per 1000 tokens
   - [ ] D) The model was trained on 128K documents

3. GPT-4 pricing is per:
   - [ ] A) Request
   - [ ] B) Minute of usage
   - [ ] C) 1,000 tokens (separate input/output rates)
   - [ ] D) User

4. Vector databases store embeddings for:
   - [ ] A) Faster SQL queries
   - [ ] B) Semantic similarity search
   - [ ] C) Data encryption
   - [ ] D) Load balancing

5. The primary purpose of an orchestration framework like LangChain is:
   - [ ] A) Training LLMs
   - [ ] B) Connecting LLMs with tools, memory, and data sources
   - [ ] C) Hosting APIs
   - [ ] D) Managing databases

### Short Answer (2 points each)

6. Explain the difference between input tokens and output tokens in API pricing. Why is this important for cost optimization?

7. Describe two strategies for reducing LLM API costs while maintaining output quality.

8. What is prompt caching, and when is it effective?

---

## Section 2: AI-Assisted Development (10 points)

### Multiple Choice (1 point each)

9. GitHub Copilot's primary input for generating suggestions is:
   - [ ] A) Only the current line
   - [ ] B) Context from open files, comments, and function signatures
   - [ ] C) Only the file's docstrings
   - [ ] D) Only approved code snippets

10. When using ChatGPT for debugging, the most effective approach is:
    - [ ] A) Pasting just the error message
    - [ ] B) Providing error, relevant code, what you tried, and expected behavior
    - [ ] C) Asking "fix my code"
    - [ ] D) Sharing your entire codebase

### Short Answer (2 points each)

11. Describe three prompting techniques that improve code generation quality in AI assistants.

12. When should you NOT blindly accept an AI's code suggestion?

---

## Section 3: Agentic AI (20 points)

### Multiple Choice (1 point each)

13. The core agent loop is:
    - [ ] A) Input → Output → Store
    - [ ] B) Observe → Think → Act → Observe
    - [ ] C) Fetch → Process → Return
    - [ ] D) Query → Retrieve → Generate

14. The ReAct pattern combines:
    - [ ] A) React.js and AI
    - [ ] B) Reasoning and Acting in an interleaved manner
    - [ ] C) Reading and Correcting
    - [ ] D) Retrieval and Classification

15. In LangGraph, nodes represent:
    - [ ] A) Database records
    - [ ] B) Functions that receive state and return state updates
    - [ ] C) UI components
    - [ ] D) Network endpoints

16. When should you use CrewAI over AutoGen?
    - [ ] A) For code generation tasks
    - [ ] B) When you have clearly defined roles and sequential workflows
    - [ ] C) When agents need unrestricted conversation
    - [ ] D) For image generation

17. What prevents agents from looping infinitely?
    - [ ] A) Automatic detection
    - [ ] B) Setting max_iterations
    - [ ] C) Faster models
    - [ ] D) Larger context windows

### Short Answer (3 points each)

18. Explain the difference between short-term, working, and long-term memory in agent systems. Give an example use case for each.

19. Describe how to implement a "human-in-the-loop" pattern in an agent. When is this pattern essential?

20. Design an agent for the following task: "Research a topic, write an article, and fact-check it." Describe the tools needed, memory type, and whether you'd use single or multi-agent.

---

## Section 4: RAG and Retrieval (15 points)

### Multiple Choice (1 point each)

21. The four stages of a RAG pipeline in order are:
    - [ ] A) Generate → Index → Retrieve → Embed
    - [ ] B) Index → Embed → Retrieve → Generate
    - [ ] C) Retrieve → Generate → Index → Embed
    - [ ] D) Embed → Index → Generate → Retrieve

22. HyDE (Hypothetical Document Embeddings) works by:
    - [ ] A) Hiding documents from search
    - [ ] B) Generating a hypothetical answer and searching for similar real documents
    - [ ] C) Encrypting embeddings
    - [ ] D) Compressing document sizes

23. Hybrid search combines:
    - [ ] A) CPU and GPU
    - [ ] B) Vector (semantic) and keyword (BM25) search
    - [ ] C) Local and cloud storage
    - [ ] D) Multiple LLM providers

24. Re-ranking uses a cross-encoder because:
    - [ ] A) It's faster
    - [ ] B) It considers query-document pairs together for higher accuracy
    - [ ] C) It's cheaper
    - [ ] D) It works offline

25. The recommended starting chunk size for RAG indexing is:
    - [ ] A) 100 characters
    - [ ] B) 500 characters
    - [ ] C) 1000 characters with 200 overlap
    - [ ] D) 5000 characters

### Short Answer (2 points each)

26. When should you use query rewriting versus HyDE for improving retrieval?

27. Explain the tradeoff between chunk size and retrieval quality.

28. What is contextual compression, and when is it useful?

---

## Section 5: Security and Safety (15 points)

### Multiple Choice (1 point each)

29. Prompt injection is:
    - [ ] A) Adding parameters to API calls
    - [ ] B) Tricking an LLM into following attacker instructions
    - [ ] C) Injecting SQL into prompts
    - [ ] D) A performance optimization

30. Indirect prompt injection differs from direct injection because:
    - [ ] A) It's less dangerous
    - [ ] B) Malicious instructions come from data the LLM processes (websites, documents)
    - [ ] C) It only affects output
    - [ ] D) It requires physical access

31. The defense-in-depth approach means:
    - [ ] A) Using one very strong defense
    - [ ] B) Layering multiple defenses (input, guard, prompt, output)
    - [ ] C) Deep learning for security
    - [ ] D) Hiding security logic

### Short Answer (4 points each)

32. Design a prompt guard prompt that an LLM can use to detect injection attempts. Include the key categories of attacks it should look for.

33. Describe three patterns you would filter from LLM outputs to prevent sensitive data leakage. Include regex patterns.

34. A RAG system indexes external web pages. How would you defend against data poisoning attacks?

---

## Section 6: Enterprise Architecture (15 points)

### Multiple Choice (1 point each)

35. An AI API gateway provides:
    - [ ] A) Only authentication
    - [ ] B) Auth, rate limiting, cost tracking, and routing
    - [ ] C) Model training
    - [ ] D) Vector storage

36. Model routing decides:
    - [ ] A) Which network to use
    - [ ] B) Which model to use based on requirements (quality, latency, cost)
    - [ ] C) Which user can access
    - [ ] D) Which database to query

37. Prompt registries track:
    - [ ] A) User queries
    - [ ] B) All prompt versions with metadata and approval status
    - [ ] C) API keys
    - [ ] D) Cost only

### Practical Scenario (4 points each)

38. Your company has 5 teams using AI, with spending increasing 300% month-over-month without visibility. Design a cost management system that provides:
    - Per-team budget tracking
    - Cost attribution
    - Alerts when budgets are exceeded
    - Monthly reports

39. An internal AI application was exploited to leak salary data. Design a post-incident prevention plan covering:
    - Immediate fixes
    - Long-term architectural changes
    - Monitoring and detection

---

## Section 7: Practical Coding (10 bonus points)

### Coding Challenge

40. **Build a Secure RAG Query Function**

Write a Python function that:
1. Sanitizes user input for injection patterns
2. Retrieves relevant documents from a vector store
3. Generates an answer with citations
4. Filters the output for sensitive data

Include error handling and logging. You may use pseudocode for the vector store and LLM calls.

```python
def secure_rag_query(user_query: str, vectorstore, llm) -> dict:
    """
    Process a user query through a secure RAG pipeline.
    
    Args:
        user_query: The user's question
        vectorstore: Vector database interface
        llm: Language model interface
    
    Returns:
        {
            "answer": str,
            "sources": list,
            "filtered": bool
        }
    """
    # Your implementation here
    pass
```

---

## Scoring

| Section | Points |
|---------|--------|
| AI Fundamentals | 15 |
| AI-Assisted Development | 10 |
| Agentic AI | 20 |
| RAG and Retrieval | 15 |
| Security and Safety | 15 |
| Enterprise Architecture | 15 |
| Practical Coding (Bonus) | 10 |
| **Total** | **100** |

**Passing**: 75 points

---

## Submission Guidelines

1. Complete all sections within the 3-hour limit
2. For coding questions, include comments explaining your approach
3. For design questions, be specific and practical
4. Submit via the certification portal

**Good luck!**
