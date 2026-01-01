# Capstone Project: AI-Native Application

## Overview

This capstone project is the culmination of your AI-Native training. You'll design, build, and deploy a complete AI-powered application that demonstrates mastery of all core concepts.

**Duration**: 2-3 weeks  
**Difficulty**: Advanced  
**Deliverables**: Working application + documentation + presentation

## The Challenge

Build one of the following AI-Native applications:

### Option A: AI Research Assistant

An agentic system that can:
- Accept a research topic from the user
- Search multiple sources (web, documents, APIs)
- Synthesize findings into a coherent report
- Include citations and confidence levels
- Answer follow-up questions about the research

**Required Components**:
- Multi-agent architecture (researcher, writer, fact-checker)
- RAG system for document retrieval
- Web search integration
- Memory for conversation context
- Output filtering for quality

### Option B: Enterprise Documentation Bot

A production-ready documentation assistant that:
- Indexes your company's docs (markdown, PDF, Confluence)
- Answers questions with accurate citations
- Admits when it doesn't know
- Suggests related topics
- Tracks quality metrics

**Required Components**:
- Full RAG pipeline with hybrid retrieval
- Re-ranking for precision
- Admin interface for document upload
- Analytics dashboard
- Security layer (input sanitization, output filtering)

### Option C: AI Code Review Agent

An automated code reviewer that:
- Analyzes pull requests
- Identifies bugs, security issues, and style problems
- Suggests specific improvements with examples
- Learns from team preferences over time
- Integrates with GitHub/GitLab

**Required Components**:
- Code-specific LLM prompting
- AST analysis for context
- Memory of past reviews and team standards
- Severity classification
- Human-in-the-loop for uncertain cases

---

## Technical Requirements

Regardless of which option you choose, your project must include:

### 1. Core Architecture

- [ ] Well-structured codebase with clear organization
- [ ] Environment-based configuration (dev/staging/prod)
- [ ] Docker containerization
- [ ] API layer (FastAPI or Express)
- [ ] Frontend interface (React, Next.js, or Streamlit)

### 2. AI Components

- [ ] At least one RAG pipeline OR agent loop
- [ ] Proper prompt engineering with versioning
- [ ] Error handling and retry logic
- [ ] Streaming responses where appropriate

### 3. Security

- [ ] Input sanitization
- [ ] Output filtering for sensitive data
- [ ] Rate limiting
- [ ] API authentication
- [ ] No exposed secrets in code

### 4. Observability

- [ ] Structured logging
- [ ] Key metrics (latency, tokens, cost)
- [ ] Error tracking
- [ ] Basic dashboard or monitoring

### 5. Quality

- [ ] Unit tests for core logic
- [ ] Integration tests for AI pipelines
- [ ] Documentation (README, API docs)
- [ ] Evaluation metrics for AI accuracy

---

## Milestone Schedule

### Week 1: Design & Setup

**Deliverables**:
1. Architecture diagram
2. Component breakdown
3. Tech stack selection
4. Development environment setup
5. Initial project structure

**Checkpoint Review**: Present architecture to mentor

### Week 2: Core Implementation

**Deliverables**:
1. Working RAG/Agent pipeline
2. Basic API endpoints
3. Initial frontend
4. Unit tests for core logic

**Checkpoint Review**: Demo core functionality

### Week 3: Polish & Deploy

**Deliverables**:
1. Complete feature implementation
2. Security hardening
3. Observability setup
4. Deployment to cloud (AWS, GCP, or Vercel)
5. Final documentation

**Final Review**: Full demo + code review

---

## Evaluation Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Architecture** | 20 | Clean, scalable design |
| **AI Implementation** | 25 | Effective use of RAG/agents |
| **Security** | 15 | Proper input/output handling |
| **Code Quality** | 15 | Clean, tested, documented |
| **Observability** | 10 | Logging, metrics, monitoring |
| **Deployment** | 10 | Successfully deployed and accessible |
| **Presentation** | 5 | Clear demo and explanation |

**Passing Score**: 70 points

---

## Submission Requirements

### Code Repository

- [ ] Clean Git history with meaningful commits
- [ ] README with setup instructions
- [ ] `.env.example` with required variables
- [ ] Dockerfile and docker-compose.yml
- [ ] No secrets committed

### Documentation

- [ ] Architecture diagram (Mermaid or draw.io)
- [ ] API documentation
- [ ] User guide
- [ ] Known limitations and future improvements

### Demo Video

- [ ] 5-10 minute walkthrough
- [ ] Show core functionality
- [ ] Explain key design decisions
- [ ] Demonstrate error handling

### Live Demo

- [ ] Deployed and accessible URL
- [ ] Test account credentials for reviewers
- [ ] 15-minute presentation slot

---

## Resources

### Starter Templates
- [LangChain Project Template](https://github.com/langchain-ai/langchain)
- [FastAPI + React Template](https://github.com/tiangolo/full-stack-fastapi-template)

### Example Architectures
- [RAG Best Practices](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [Agent Patterns](https://langchain.com/docs/modules/agents/)

### Deployment Guides
- [Deploying to AWS](https://aws.amazon.com/getting-started/)
- [Deploying to Vercel](https://vercel.com/docs)

---

## Assessment Criteria Details

### Architecture (20 points)

**Excellent (18-20)**:
- Clear separation of concerns
- Appropriate use of design patterns
- Scalable and maintainable
- Well-documented decisions

**Good (14-17)**:
- Generally clean structure
- Some design patterns applied
- Minor coupling issues
- Adequate documentation

**Needs Improvement (<14)**:
- Monolithic or unclear structure
- Missing design patterns
- Significant coupling
- Poor documentation

### AI Implementation (25 points)

**Excellent (22-25)**:
- Sophisticated RAG or agent design
- Excellent prompt engineering
- Proper evaluation of AI quality
- Handles edge cases gracefully

**Good (18-21)**:
- Functional RAG or agent
- Good prompts
- Basic quality testing
- Most edge cases handled

**Needs Improvement (<18)**:
- Basic implementation
- Prompts need refinement
- Limited testing
- Edge cases cause failures

### Security (15 points)

**Excellent (13-15)**:
- Comprehensive input validation
- Output filtering implemented
- Rate limiting active
- Security best practices followed

**Good (10-12)**:
- Basic input validation
- Some output filtering
- Rate limiting present
- Most best practices followed

**Needs Improvement (<10)**:
- Insufficient validation
- No output filtering
- Missing rate limiting
- Security vulnerabilities present

---

## FAQ

**Q: Can I use a different project idea?**
A: Yes, with mentor approval. Submit your proposal at the start of Week 1.

**Q: What LLM providers can I use?**
A: Any provider (OpenAI, Anthropic, local models). Document your choice.

**Q: Can I work in a team?**
A: Teams of 2 are allowed. Scope increases accordingly.

**Q: What if deployment costs money?**
A: Use free tiers (Vercel, Railway, Render). Document any costs incurred.

---

**Good luck building something amazing!**
