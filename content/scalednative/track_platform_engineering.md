# Learning Track: Platform Engineering for AI

## Track Title
Platform Engineering for AI

## Purpose Statement
Build and operate the infrastructure that enables AI at enterprise scale. Learn to design AI platforms, manage LLMOps, optimize costs, and create self-service capabilities for development teams.

## Who Is This For?

**Primary Audience**:
- Platform Engineers
- DevOps Engineers
- SRE / Reliability Engineers
- Cloud Architects
- Infrastructure Engineers

**Secondary Audience**:
- Engineering Managers
- Technical Leads
- MLOps Engineers

## Key Outcomes

Upon completion, you will be able to:

1. **Design AI platforms**: Create infrastructure that enables developers to build AI applications efficiently
2. **Implement LLMOps**: Operationalize large language models with proper monitoring, scaling, and cost management
3. **Build self-service capabilities**: Create golden paths for AI development that enforce standards
4. **Optimize costs**: Manage AI infrastructure costs through caching, routing, and efficient resource usage
5. **Ensure reliability**: Build fault-tolerant AI systems with proper observability

## Prerequisites

- Navigate (Foundation) track completion
- 2+ years of DevOps/Platform Engineering experience
- Familiarity with Kubernetes and cloud platforms
- Understanding of CI/CD principles

## Tool and Technology Mapping

This track covers:

| Category | Tools |
|----------|-------|
| **Cloud Platforms** | AWS (Bedrock, SageMaker), Azure (OpenAI, AI Studio), GCP (Vertex AI) |
| **Container Orchestration** | Kubernetes, EKS, AKS, GKE |
| **LLM Gateway/Proxy** | LiteLLM, Portkey, AI Gateway, Kong AI Gateway |
| **Observability** | Datadog, New Relic, Prometheus, Grafana, LangFuse |
| **Vector Stores** | Pinecone, Weaviate, Chroma, pgvector |
| **Caching** | Redis, Momento, GPTCache |
| **IaC** | Terraform, Pulumi, CDK |

## Curriculum Outline

### Module 1: AI Platform Fundamentals (4 hours)
- What is an AI platform?
- Platform engineering vs. MLOps vs. DevOps
- The AI platform stack
- Building internal developer platforms for AI
- **Lab**: Assess your current AI platform maturity

### Module 2: LLM Infrastructure (8 hours)
- LLM hosting options (managed vs. self-hosted)
- API gateways for LLMs
- Model routing and load balancing
- Rate limiting and quota management
- Multi-provider strategies
- **Lab**: Deploy an LLM gateway

### Module 3: Vector Database Operations (6 hours)
- Vector database selection criteria
- Deployment patterns (managed vs. self-hosted)
- Index management and optimization
- Backup and disaster recovery
- Performance tuning
- **Lab**: Deploy and optimize a vector database

### Module 4: AI Observability (8 hours)
- Tracing LLM calls
- Metrics that matter for AI
- Log aggregation for AI workloads
- Cost tracking and attribution
- Quality monitoring
- **Lab**: Implement full-stack AI observability

### Module 5: Cost Optimization (6 hours)
- Understanding AI cost drivers
- Caching strategies for LLMs
- Model routing by cost/quality
- Right-sizing infrastructure
- Showback and chargeback models
- **Lab**: Implement semantic caching

### Module 6: Security and Compliance (6 hours)
- Securing LLM endpoints
- Secret management for API keys
- Data privacy in AI pipelines
- Audit logging
- Compliance considerations
- **Lab**: Implement security controls for AI platform

### Module 7: Developer Experience (6 hours)
- Building golden paths for AI development
- Internal developer portals
- SDK and abstraction layer design
- Documentation and self-service
- Adoption metrics
- **Lab**: Build a developer self-service portal

### Module 8: Scaling and Reliability (8 hours)
- Scaling patterns for AI workloads
- Fault tolerance and failover
- Disaster recovery planning
- Capacity planning
- Incident response for AI
- **Lab**: Implement auto-scaling for AI workloads

### Module 9: AI Platform Roadmap (4 hours)
- Building the business case for platform investment
- Maturity models for AI platforms
- Roadmap planning
- Team structure and skills
- **Lab**: Create an AI platform roadmap

## Hands-On Project

### Capstone: Enterprise AI Platform

Design and deploy a production-ready AI platform:

1. **Architecture Design**: Design platform architecture with all components
2. **LLM Layer**: Deploy multi-provider LLM gateway
3. **Data Layer**: Deploy vector database with proper operations
4. **Observability**: Implement comprehensive monitoring and alerting
5. **Developer Experience**: Create self-service capabilities
6. **Documentation**: Produce platform documentation and runbooks

**Deliverable**: Working AI platform + architecture documentation + runbooks

**Verification**: Automated infrastructure testing + expert review

## Certification Path

This track contributes to:
- **NATIVE Professional Certified (Engineering Specialization)**

Combined with Validate track, contributes to:
- **NATIVE Advanced Certified**

## Duration

**Total**: 56 hours
- Self-paced modules: 48 hours
- Hands-on labs: 6 hours
- Capstone project: 2 hours

## CTA

**Start This Track** | **Talk to Sales**
