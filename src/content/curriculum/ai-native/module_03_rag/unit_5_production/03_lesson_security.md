# Lesson 5.3: Multi-Tenant and Security

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 5 - Production RAG

---

## 📚 Reading Material

### Multi-Tenant Architecture

**Option 1: Namespace isolation**
```python
# Each tenant in separate namespace
def query(user_tenant, question):
    return index.query(
        vector=embed(question),
        namespace=user_tenant,
        top_k=5
    )
```

**Option 2: Metadata filtering**
```python
def query(user_tenant, user_access_level, question):
    return index.query(
        vector=embed(question),
        filter={
            "tenant": user_tenant,
            "access_level": {"$lte": user_access_level}
        },
        top_k=5
    )
```

### Data Access Control

```python
def rag_with_acl(user, query):
    # Get user permissions
    allowed_docs = get_user_permissions(user)
    
    # Filter retrieval
    results = index.query(
        vector=embed(query),
        filter={"doc_id": {"$in": allowed_docs}},
        top_k=10
    )
    
    return generate_with_context(query, results)
```

### Preventing Data Leaks

1. **Metadata filtering**: Only retrieve authorized docs
2. **Output validation**: Check response doesn't contain forbidden patterns
3. **Audit logging**: Track all queries and responses

```python
def secure_rag(user, query):
    # Log query
    audit_log.record(user=user, query=query, timestamp=now())
    
    # Retrieve with ACL
    results = filtered_retrieve(user, query)
    
    # Generate
    response = generate(query, results)
    
    # Validate output
    if contains_pii(response) or contains_forbidden(response, user):
        return "Unable to answer this query"
    
    # Log response
    audit_log.record(user=user, response=response, sources=results)
    
    return response
```

---

## 🎬 Video Script

**[INTRO - Multi-tenant diagram]**

Production RAG often serves multiple customers. Let me show you how to keep data isolated.

**[CUT TO: Isolation]**

Two options: namespaces give strong isolation. Metadata filtering is more flexible. Choose based on your security requirements.

**[CUT TO: ACL]**

Access control: check user permissions before retrieval. Never return documents the user shouldn't see.

**[CUT TO: Audit]**

Audit everything: queries, responses, sources. You need this for debugging, compliance, and security.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
How do you isolate tenant data in RAG?

A) Different API keys  
B) Namespaces or metadata filtering  
C) Separate models  
D) Rate limiting  

**Correct Answer**: B

---

*Congratulations on completing Module 3: RAG Fundamentals!*
