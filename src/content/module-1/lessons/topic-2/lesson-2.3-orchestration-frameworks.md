# Lesson 2.3: Orchestration Frameworks - LangChain and LlamaIndex

## Introduction

Calling an LLM API is easy. Building a production AI application is hard. Orchestration frameworks like LangChain and LlamaIndex provide the abstractions, utilities, and patterns you need to build complex AI systems without reinventing the wheel.

## What Is an Orchestration Framework?

Think of an orchestration framework as the "backend framework for AI"—just like Express.js helps you build web servers, LangChain helps you build AI applications.

[Image: Architecture diagram showing LangChain coordinating LLM, vector DB, and tools]

**What they handle**:
- LLM provider abstraction (swap OpenAI for Claude easily)
- Prompt templates and management
- Memory and conversation history
- Tool/function calling
- RAG (Retrieval-Augmented Generation) pipelines
- Output parsing and validation

## LangChain: The Swiss Army Knife

LangChain is the most popular orchestration framework, offering a comprehensive toolkit for building AI applications.

### Core Concepts

#### 1. Chat Models (LLM Abstraction)

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage

# Easy to swap providers
openai_model = ChatOpenAI(model="gpt-4-turbo")
anthropic_model = ChatAnthropic(model="claude-3-5-sonnet-20241022")

# Same interface for both!
messages = [
    SystemMessage(content="You are a helpful coding assistant."),
    HumanMessage(content="Write a Python function to reverse a string.")
]

response = openai_model.invoke(messages)
print(response.content)

# Swap to Anthropic with one line change
response = anthropic_model.invoke(messages)
print(response.content)
```

#### 2. Prompt Templates

```python
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# Define a reusable prompt template
code_review_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert code reviewer. Analyze the code for:
    - Bugs and edge cases
    - Security vulnerabilities
    - Performance issues
    - Style and readability
    
    Be constructive and specific in your feedback."""),
    ("human", "Review this {language} code:\n\n```{language}\n{code}\n```")
])

# Use the template
chain = code_review_prompt | openai_model

result = chain.invoke({
    "language": "python",
    "code": "def divide(a, b): return a / b"
})

print(result.content)
# Output: The function doesn't handle division by zero...
```

#### 3. Output Parsers (Structured Output)

```python
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

# Define the structure you want
class CodeReview(BaseModel):
    issues: list[str] = Field(description="List of issues found")
    severity: str = Field(description="Overall severity: low, medium, high")
    suggestions: list[str] = Field(description="Improvement suggestions")

parser = JsonOutputParser(pydantic_object=CodeReview)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Analyze code and return JSON. {format_instructions}"),
    ("human", "Review: {code}")
])

chain = prompt | openai_model | parser

result = chain.invoke({
    "code": "def divide(a, b): return a / b",
    "format_instructions": parser.get_format_instructions()
})

print(result)  # {'issues': ['No zero check'], 'severity': 'medium', ...}
```

### Building a RAG Pipeline with LangChain

Here's a complete RAG implementation:

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 1. Set up the vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(embedding_function=embeddings, persist_directory="./db")

# 2. Create a retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 3. Define the prompt
rag_prompt = ChatPromptTemplate.from_template("""
Answer the question based on the following context:

Context:
{context}

Question: {question}

If the answer isn't in the context, say "I don't have information about that."
""")

# 4. Create the chain
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | rag_prompt
    | ChatOpenAI(model="gpt-4-turbo")
    | StrOutputParser()
)

# 5. Use it!
answer = rag_chain.invoke("What are the key features of our product?")
print(answer)
```

> **Pro Tip**: LangChain's LCEL (LangChain Expression Language) with the `|` pipe syntax makes chains readable and composable. Each component can be tested independently.

## LlamaIndex: The Data Framework

While LangChain is general-purpose, LlamaIndex is specialized for data—particularly for RAG and knowledge-intensive applications.

### Core Concepts

#### 1. Document Loading and Indexing

```python
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    ServiceContext,
    StorageContext,
    load_index_from_storage
)
from llama_index.llms.openai import OpenAI

# Load documents from a directory
documents = SimpleDirectoryReader("./docs").load_data()

# Create an index (automatically handles chunking and embedding)
index = VectorStoreIndex.from_documents(documents)

# Query the index
query_engine = index.as_query_engine()
response = query_engine.query("What is our refund policy?")
print(response)
```

#### 2. Advanced RAG with Node Post-Processing

```python
from llama_index.core.postprocessor import (
    SimilarityPostprocessor,
    KeywordNodePostprocessor
)

# Add post-processing to improve retrieval quality
query_engine = index.as_query_engine(
    similarity_top_k=10,  # Retrieve more initially
    node_postprocessors=[
        SimilarityPostprocessor(similarity_cutoff=0.7),  # Filter low relevance
        KeywordNodePostprocessor(
            required_keywords=["refund", "return", "policy"]
        )
    ]
)
```

#### 3. Multiple Data Sources

```python
from llama_index.readers.web import SimpleWebPageReader
from llama_index.readers.database import DatabaseReader

# Load from web
web_docs = SimpleWebPageReader().load_data(
    ["https://example.com/docs/getting-started"]
)

# Load from database
db_reader = DatabaseReader(
    connection_string="postgresql://user:pass@localhost/db"
)
db_docs = db_reader.load_data(
    query="SELECT content FROM knowledge_base"
)

# Combine into single index
all_docs = web_docs + db_docs
index = VectorStoreIndex.from_documents(all_docs)
```

## LangChain vs LlamaIndex: When to Use What

| Factor | LangChain | LlamaIndex |
|--------|-----------|------------|
| **Primary Focus** | General AI apps | Data/RAG applications |
| **Best For** | Agents, chains, tools | Document Q&A, knowledge bases |
| **Learning Curve** | Steeper | Gentler for RAG |
| **Flexibility** | Very high | Focused but simpler |
| **Community** | Larger | Growing rapidly |

### Use LangChain When:
- Building agents with tools
- Need general orchestration
- Complex multi-step workflows
- Want maximum flexibility

### Use LlamaIndex When:
- Building document Q&A systems
- Need advanced RAG features
- Working with structured data
- Want faster time-to-working-RAG

> **Common Mistake**: Many developers treat these as competitors. In practice, you can use both together—LlamaIndex for data indexing, LangChain for orchestration.

## Combining Both Frameworks

```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.tools import Tool
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# Use LlamaIndex for document retrieval
documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# Wrap LlamaIndex as a LangChain tool
docs_tool = Tool(
    name="company_docs",
    func=lambda q: str(query_engine.query(q)),
    description="Search company documentation for answers"
)

# Use LangChain for agent orchestration
tools = [docs_tool, other_tools...]
agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

result = executor.invoke({"input": "What's our vacation policy?"})
```

## Key Takeaways

- **Orchestration frameworks** abstract away LLM provider differences and provide building blocks
- **LangChain** is a general-purpose toolkit: chains, agents, tools, memory
- **LlamaIndex** specializes in data: document loading, indexing, RAG
- Use **prompt templates** for reusable, parameterized prompts
- Use **output parsers** to get structured responses from LLMs
- **LCEL** (pipe syntax) makes LangChain chains readable and composable
- Consider using **both frameworks together** for the best of both worlds

## What's Next

In the next lesson, we'll explore agent frameworks—LangGraph, CrewAI, and AutoGen—that enable AI systems to reason, plan, and use tools autonomously.

---

*Estimated completion time: 35 minutes*
*Difficulty: Intermediate*
