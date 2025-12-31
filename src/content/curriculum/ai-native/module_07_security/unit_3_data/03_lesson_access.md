# Lesson 3.3: Access Control

> **Duration**: 50 minutes | **Type**: Security
> **Unit**: 3 - Data Security

---

## 📚 Reading Material

### RAG Access Control

```python
class SecureRAG:
    def query(self, query, user):
        # Get user's permissions
        permissions = get_user_permissions(user)
        
        # Filter during retrieval
        results = self.vector_store.query(
            query,
            filter={"allowed_roles": {"$in": permissions}}
        )
        
        # Double-check results
        safe_results = [
            r for r in results
            if user_can_access(user, r.metadata)
        ]
        
        return safe_results
```

### Document-Level Security

```python
# When indexing
doc_metadata = {
    "content_hash": hash(content),
    "allowed_roles": ["admin", "analyst"],
    "department": "finance",
    "classification": "confidential",
    "owner": "user_123"
}

# When querying
filter = {
    "$and": [
        {"allowed_roles": {"$in": user.roles}},
        {"classification": {"$in": user.clearance}}
    ]
}
```

### API Authentication

```python
from functools import wraps

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token or not validate_token(token):
            return {"error": "Unauthorized"}, 401
        
        user = get_user_from_token(token)
        return f(*args, user=user, **kwargs)
    return decorated
```

---

## 🎬 Video Script

**[INTRO - Access control diagram]**

RAG systems need access control. Users should only see documents they're allowed to.

**[CUT TO: Filtering]**

Filter during retrieval. Use metadata for permissions. Double-check results.

**[CUT TO: API auth]**

Authenticate all API calls. Validate tokens. Pass user context through the pipeline.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When should access control be applied in RAG?

A) Only at final output  
B) At retrieval AND before response  
C) Optional  
D) Only for admins  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You understand data security.*
