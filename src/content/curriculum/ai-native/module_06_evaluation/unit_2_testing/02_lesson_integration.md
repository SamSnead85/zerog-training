# Lesson 2.2: Integration Testing

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Testing Strategies

---

## 📚 Reading Material

### What to Integration Test

- Full RAG pipeline
- Agent loops
- Multi-model chains
- Tool execution
- External API integration

### Integration Test Example

```python
def test_rag_pipeline():
    # Setup: index test documents
    index_documents(TEST_DOCS)
    
    # Execute: full pipeline
    result = rag_query("What is the refund policy?")
    
    # Assert: quality and sources
    assert "30 days" in result.answer
    assert "policies.pdf" in result.sources
    assert result.confidence > 0.8
```

### Agent Integration Test

```python
def test_agent_completes_task():
    agent = Agent(tools=[calculator, search])
    
    result = agent.run("What is 15% of 200?")
    
    assert result.success
    assert "30" in result.answer
    assert result.iterations < 5
```

### Test Fixtures

```python
@pytest.fixture
def test_vector_store():
    store = ChromaDB(":memory:")
    yield store
    store.delete()

def test_retrieval(test_vector_store):
    test_vector_store.add(TEST_DOCS)
    results = test_vector_store.query("test query")
    assert len(results) > 0
```

---

## 🎬 Video Script

**[INTRO - Integration diagram]**

Integration tests verify components work together. Critical for pipelines, agents, and RAG.

**[CUT TO: RAG testing]**

Test the full pipeline: index, query, verify answer AND sources. Check confidence scores.

**[CUT TO: Agent testing]**

Agent tests: task completes, reasonable iterations, correct result.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What should RAG integration tests verify?

A) Only the answer  
B) Answer quality, sources, and confidence  
C) Just that it runs  
D) Token count  

**Correct Answer**: B
