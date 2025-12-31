# Lesson 2.3: Tool Composition

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 2 - Tool Implementation

---

## 📚 Reading Material

### Composing Tools

Complex operations should be composed from simpler tools:

```python
# Instead of one mega-tool:
def analyze_and_report_and_email(data):
    ...

# Compose atomic tools:
analyze_data → format_report → send_email
```

### Tool Pipelines

```python
class ToolPipeline:
    def __init__(self, tools):
        self.tools = tools
    
    def run(self, initial_input):
        result = initial_input
        for tool in self.tools:
            result = tool(result)
            if not result.get("success"):
                return result
        return result

pipeline = ToolPipeline([
    extract_data,
    transform_data,
    validate_data,
    store_data
])
```

### Conditional Tool Selection

```python
def smart_search(query, tools):
    """Select appropriate search tool based on query"""
    
    if "code" in query.lower():
        return tools["search_github"](query)
    elif "paper" in query.lower():
        return tools["search_arxiv"](query)
    else:
        return tools["search_web"](query)
```

### Tool Sets for Domains

```python
research_tools = [search, summarize, cite]
coding_tools = [read_file, write_file, run_code]
data_tools = [query_db, aggregate, visualize]

# Agent gets domain-specific toolset
agent = Agent(tools=research_tools)
```

---

## 🎬 Video Script

**[INTRO - Composition diagram]**

Complex tasks shouldn't be single tools. Compose from simpler ones.

**[CUT TO: Pipelines]**

Tool pipelines: chain atomic tools together. Each step's output feeds the next. Early exit on errors.

**[CUT TO: Domain sets]**

Group tools by domain. Research tools, coding tools, data tools. Give the agent what it needs for the task.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why compose tools instead of building one large tool?

A) Faster execution  
B) Reusability, testability, and flexibility  
C) Less code  
D) Lower cost  

**Correct Answer**: B
