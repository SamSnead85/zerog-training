# Lesson 2.1: Vector Database Landscape

> **Duration**: 45 minutes | **Type**: Survey
> **Unit**: 2 - Vector Databases

---

## 📚 Reading Material

### Why Specialized Vector Databases?

Traditional databases aren't optimized for:
- High-dimensional similarity search
- Approximate nearest neighbor algorithms
- Real-time vector indexing
- Billion-scale vector storage

### The Landscape

| Database | Type | Best For |
|----------|------|----------|
| **Pinecone** | Managed | Production, ease of use |
| **Weaviate** | Managed/OSS | Hybrid search, GraphQL |
| **Qdrant** | OSS | Performance, Rust-based |
| **Chroma** | OSS | Prototyping, local dev |
| **Milvus** | OSS | Large scale, enterprise |
| **pgvector** | Extension | Existing PostgreSQL |

### Managed vs Self-Hosted

**Managed** (Pinecone, Weaviate Cloud):
- ✅ No infrastructure management
- ✅ Automatic scaling
- ✅ Built-in backups
- ❌ Higher cost at scale
- ❌ Vendor lock-in

**Self-Hosted** (Qdrant, Milvus):
- ✅ Full control
- ✅ Cost-effective at scale
- ✅ Data stays on-premises
- ❌ Operations overhead
- ❌ Scaling complexity

### Key Selection Criteria

1. **Scale**: How many vectors?
2. **Latency**: Query speed requirements
3. **Features**: Filtering, hybrid search
4. **Integration**: LangChain, LlamaIndex
5. **Cost**: Pricing model
6. **Operations**: Team expertise

---

## 🎬 Video Script

**[INTRO - Database logos grid]**

The vector database market has exploded. Let me help you navigate the options.

**[CUT TO: Comparison table]**

Pinecone leads managed services—simple, reliable, production-ready. Qdrant and Milvus are the open-source performance leaders. Chroma is for prototyping. pgvector adds vectors to existing PostgreSQL.

**[CUT TO: Decision framework]**

Managed for: small teams, fast deployment, scaling. Self-hosted for: cost control, data sovereignty, scale.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What's the main advantage of managed vector databases?

A) Lower cost  
B) No infrastructure management  
C) Better performance  
D) More features  

**Correct Answer**: B
