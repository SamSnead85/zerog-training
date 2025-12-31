# Lesson 5.3: The AI Tool Ecosystem

> **Duration**: 55 minutes | **Type**: Reference/Practical
> **Unit**: 5 - The Landscape of AI

---

## 📚 Reading Material

### Building Blocks for AI Applications

Beyond models, there's a rich ecosystem of tools, frameworks, and databases. This lesson maps the landscape.

### Categories of AI Tools

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Application Stack                      │
├─────────────────────────────────────────────────────────────┤
│  [Orchestration]     LangChain • LangGraph • CrewAI         │
├─────────────────────────────────────────────────────────────┤
│  [Development]       Jupyter • VSCode • Cursor • Aider      │
├─────────────────────────────────────────────────────────────┤
│  [Vector DBs]        Pinecone • Weaviate • Chroma • Qdrant  │
├─────────────────────────────────────────────────────────────┤
│  [Observability]     LangSmith • Weights & Biases • Phoenix │
├─────────────────────────────────────────────────────────────┤
│  [Inference]         vLLM • TGI • Ollama • TensorRT-LLM     │
├─────────────────────────────────────────────────────────────┤
│  [Training]          PyTorch • JAX • HuggingFace            │
└─────────────────────────────────────────────────────────────┘
```

### Orchestration Frameworks

**LangChain**
- Most popular LLM application framework
- Chains, agents, document loaders, retrievers
- Great for prototyping
- Learning: Complex, extensive documentation

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

chain = (
    ChatPromptTemplate.from_template("Tell me about {topic}")
    | ChatOpenAI(model="gpt-4o-mini")
)
response = chain.invoke({"topic": "AI"})
```

**LangGraph**
- Graph-based workflow orchestration
- Better for complex, stateful applications
- Built on LangChain primitives

**LlamaIndex**
- Focused on data ingestion and RAG
- Excellent for document-heavy applications
- Simpler than LangChain for RAG-specific tasks

**CrewAI**
- Multi-agent orchestration
- Role-based agent design
- Good for simulating teams

### Vector Databases

Essential for semantic search and RAG:

| Database | Type | Best For |
|----------|------|----------|
| **Pinecone** | Managed | Production scale, zero ops |
| **Weaviate** | Open-source | Multi-modal, GraphQL |
| **Chroma** | Open-source | Simple, local development |
| **Qdrant** | Open-source | High performance, Rust |
| **Milvus** | Open-source | Very large scale |
| **pgvector** | PostgreSQL extension | Simple, integrated |

```python
# Example: Chroma for development
import chromadb

client = chromadb.Client()
collection = client.create_collection("documents")

collection.add(
    documents=["Doc 1 text...", "Doc 2 text..."],
    ids=["1", "2"]
)

results = collection.query(query_texts=["search query"], n_results=3)
```

### AI Development Environments

**Cursor**
- VS Code fork with AI built in
- Tab completion, chat, multi-file editing
- Leading AI-native IDE

**GitHub Copilot**
- Integrated into VS Code, JetBrains, etc.
- Tab completion, chat
- Most widely adopted

**Aider**
- CLI-based AI coding assistant
- Works with any terminal
- Git integration

**Jupyter + AI**
- Traditional notebooks with AI extensions
- Great for exploration and data science

### Observability & Monitoring

**LangSmith** (LangChain)
- Trace LLM calls
- Debug chains and agents
- Evaluate outputs

**Weights & Biases**
- Experiment tracking
- Model evaluation
- Team collaboration

**Phoenix (Arize)**
- Real-time monitoring
- Drift detection
- Prompt analysis

**Helicone**
- Request logging
- Cost tracking
- Rate limiting

### Inference Servers

For self-hosting models:

**vLLM**
- High-performance inference
- PagedAttention for memory
- Production ready

**Text Generation Inference (TGI)**
- Hugging Face's solution
- Docker-based
- Good for many models

**Ollama**
- Simple local inference
- Great for development
- Limited production features

**TensorRT-LLM**
- NVIDIA's optimized inference
- Maximum performance on NVIDIA GPUs
- Complex setup

### Training & Fine-Tuning

**PyTorch + Hugging Face**
- Standard stack for fine-tuning
- Transformers library
- PEFT for efficient fine-tuning

**Unsloth**
- 2x faster fine-tuning
- Lower memory usage
- Drop-in replacement

**Axolotl**
- Configuration-based fine-tuning
- Supports many techniques
- Community maintained

---

## 🎬 Video Script

**[INTRO - Tool ecosystem diagram]**

Models are just the beginning. Building AI applications requires an entire ecosystem of tools. Let me map it out.

**[CUT TO: Orchestration section]**

Orchestration frameworks help you chain AI calls together. LangChain is the most popular—it handles prompts, chains, agents, document loaders. It can be complex, but it's powerful.

LlamaIndex focuses on RAG—if you're building search over documents, it might be simpler.

CrewAI is for multi-agent systems where you want different AI "roles" collaborating.

**[CUT TO: Vector database logos]**

For semantic search, you need vector databases. Pinecone is the managed option—zero operations, just an API. Chroma is great for development—runs in-process. Qdrant and Weaviate are solid open-source choices for production.

**[CUT TO: IDE screenshots]**

Development environments have evolved. Cursor is a VS Code fork with AI built in—code completion, chat, multi-file editing. GitHub Copilot integrates into existing IDEs. Aider runs in the terminal—surprisingly powerful.

**[CUT TO: Observability tools]**

Observability matters more than you think. LangSmith traces every LLM call so you can debug chains. Weights & Biases tracks experiments. Helicone logs requests and tracks costs.

**[CUT TO: Inference server comparison]**

For self-hosting, vLLM is the production standard—high performance, efficient memory. Ollama is perfect for local development—simple, just works. TGI from Hugging Face is a solid middle ground.

**[CUT TO: Speaker on camera]**

Don't try to learn everything. Start with the basics: an orchestration framework, a vector database, observability. Add tools as you need them. The ecosystem evolves fast—focus on understanding categories, not memorizing tools.

**[END - Runtime: 6:20]**

---

## 🔬 Interactive Lab: Building Your AI Stack

### Objective
Set up a minimal AI development stack.

### Part 1: Local Development Setup (20 minutes)

```bash
# Install core tools
pip install langchain langchain-openai chromadb

# Optional: Local models with Ollama
# curl -fsSL https://ollama.com/install.sh | sh
# ollama pull llama3.1
```

```python
# Verify installation
import chromadb
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# Test LangChain
llm = ChatOpenAI(model="gpt-4o-mini")
response = llm.invoke("Hello!")
print(f"LangChain works: {response.content[:50]}...")

# Test ChromaDB
client = chromadb.Client()
collection = client.create_collection("test")
collection.add(documents=["test doc"], ids=["1"])
print(f"ChromaDB works: {collection.count()} documents")
```

### Part 2: Build a Minimal RAG System (25 minutes)

```python
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# Initialize components
embeddings = OpenAIEmbeddings()
llm = ChatOpenAI(model="gpt-4o-mini")

# Create vector store with sample documents
sample_docs = [
    "LangChain is a framework for building LLM applications.",
    "ChromaDB is a vector database for storing embeddings.",
    "RAG stands for Retrieval Augmented Generation.",
    "Vector databases enable semantic search using embeddings.",
    "Fine-tuning adapts a pre-trained model to specific tasks.",
]

vectorstore = Chroma.from_texts(sample_docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# Build RAG chain
template = """Answer based on this context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return "\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# Test
questions = [
    "What is LangChain?",
    "How does RAG work?",
    "What is ChromaDB used for?",
]

for q in questions:
    print(f"\nQ: {q}")
    print(f"A: {rag_chain.invoke(q)}")
```

### Part 3: Add Observability (10 minutes)

```python
# Using langchain callbacks for basic observability
from langchain_core.callbacks import StdOutCallbackHandler

# Create handler that logs every call
handler = StdOutCallbackHandler()

# Add to chain invocations
response = rag_chain.invoke(
    "What is LangChain?",
    config={"callbacks": [handler]}
)

# For production: LangSmith (set LANGCHAIN_TRACING_V2=true)
# For cost tracking: Custom token counting
```

### Submission
Set up your development environment and build a simple RAG system.

---

## ✅ Knowledge Check

### Question 1
What is LangChain primarily used for?

A) Training new AI models  
B) Orchestrating LLM application workflows (chains, agents, retrieval)  
C) Storing vectors  
D) Monitoring model performance  

**Correct Answer**: B

**Explanation**: LangChain is an orchestration framework for building LLM applications. It provides abstractions for chains, agents, document loaders, and retrieval—the building blocks of AI applications.

---

### Question 2
Which tool would you use for storing and searching embeddings?

A) LangChain  
B) PyTorch  
C) A vector database (Chroma, Pinecone, etc.)  
D) Jupyter  

**Correct Answer**: C

**Explanation**: Vector databases like Chroma, Pinecone, and Qdrant are specialized for storing embeddings and performing fast similarity search—essential for RAG applications.

---

### Question 3
For simple local development with open models, which tool is recommended?

A) vLLM  
B) TensorRT-LLM  
C) Ollama  
D) AWS SageMaker  

**Correct Answer**: C

**Explanation**: Ollama provides simple local model running for development. vLLM is for production. TensorRT-LLM is for maximum NVIDIA performance. SageMaker is cloud-based.

---

### Question 4
What is LangSmith used for?

A) Vector storage  
B) Model training  
C) Tracing and debugging LLM application calls  
D) Code completion  

**Correct Answer**: C

**Explanation**: LangSmith is LangChain's observability platform. It traces every LLM call, helps debug chains and agents, and enables evaluation of outputs.

---

*You've completed Lesson 5.3! You now understand the AI tool ecosystem.*
