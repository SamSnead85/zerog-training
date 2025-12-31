# Lesson 2.1: Designing Tool Interfaces

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 2 - Tool Implementation

---

## 📚 Reading Material

### Tool Design Principles

1. **Clear names**: `search_web` not `do_search`
2. **Precise descriptions**: Tell the LLM WHEN to use it
3. **Simple parameters**: Fewer is better
4. **Typed parameters**: Explicit types with enums
5. **Atomic actions**: One thing per tool

### Good Tool Definition

```python
{
    "name": "search_products",
    "description": "Search the product catalog. Use when user asks about products, pricing, or availability.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "Search terms"
            },
            "category": {
                "type": "string",
                "enum": ["electronics", "clothing", "home"],
                "description": "Filter by category"
            },
            "max_price": {
                "type": "number",
                "description": "Maximum price filter"
            }
        },
        "required": ["query"]
    }
}
```

### Bad Tool Definitions

❌ **Vague description**:
```python
"description": "Does stuff with data"
```

❌ **Too many parameters**:
```python
# 10+ parameters confuse the model
```

❌ **Overloaded tool**:
```python
"description": "Search, filter, sort, and export products"
# Should be 4 separate tools
```

### Tool Naming Conventions

| Pattern | Example |
|---------|---------|
| Action + Object | `create_ticket`, `search_users` |
| Domain prefix | `crm_get_customer`, `billing_charge` |
| CRUD verbs | `get_`, `create_`, `update_`, `delete_` |

---

## 🎬 Video Script

**[INTRO - Good vs bad tool]**

The LLM chooses tools based on definitions. Good definitions = correct choices. Let me show you how to design tools.

**[CUT TO: Principles]**

Five principles: clear names, precise descriptions, simple parameters, typed values, atomic actions. One tool, one job.

**[CUT TO: Good example]**

Good tool: `search_products` with description explaining when to use it. Typed parameters with enums. Required vs optional clearly marked.

**[CUT TO: Bad examples]**

Bad: vague descriptions, too many parameters, overloaded tools. The model won't know when to use them.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What makes a good tool description?

A) As short as possible  
B) Explains WHEN to use the tool  
C) Technical implementation details  
D) Just the tool name  

**Correct Answer**: B
