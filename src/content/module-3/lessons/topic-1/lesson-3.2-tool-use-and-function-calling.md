# Lesson 3.2: Tool Use and Function Calling

## Introduction

Tools transform LLMs from "talking machines" into "doing machines." Function calling is the mechanism that allows an LLM to reliably invoke external functions, APIs, and code. Mastering tool design is essential for building reliable, production-grade agents.

## How Function Calling Works

When you enable function calling, you're teaching the LLM to output structured tool invocations instead of (or in addition to) natural language.

[Image: Flow diagram showing user query → LLM → function call JSON → execution → result back to LLM]

### The Function Calling Flow

```python
from openai import OpenAI
import json

client = OpenAI()

# Step 1: Define tools (functions) the LLM can use
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name, e.g., 'San Francisco'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature unit"
                    }
                },
                "required": ["location"]
            }
        }
    }
]

# Step 2: Send message with tools
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=tools,
    tool_choice="auto"  # Let LLM decide when to use tools
)

# Step 3: Check if LLM wants to call a function
message = response.choices[0].message

if message.tool_calls:
    for tool_call in message.tool_calls:
        function_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        
        print(f"LLM wants to call: {function_name}")
        print(f"With arguments: {arguments}")
        # Output: LLM wants to call: get_weather
        #         With arguments: {'location': 'Tokyo', 'unit': 'celsius'}
```

## Designing Effective Tools

### The Anatomy of a Good Tool

```python
from langchain.tools import tool
from pydantic import BaseModel, Field
from typing import Optional

# Use Pydantic for structured arguments
class SearchDocumentsArgs(BaseModel):
    """Arguments for searching documents."""
    query: str = Field(
        description="The search query to find relevant documents"
    )
    max_results: int = Field(
        default=5,
        description="Maximum number of results to return (1-20)"
    )
    date_filter: Optional[str] = Field(
        default=None,
        description="Filter by date, format: 'YYYY-MM-DD' or 'last_week'"
    )

@tool(args_schema=SearchDocumentsArgs)
def search_documents(query: str, max_results: int = 5, 
                     date_filter: Optional[str] = None) -> str:
    """
    Search the company knowledge base for relevant documents.
    
    Use this tool when the user asks about:
    - Company policies
    - Product documentation
    - Historical decisions or meeting notes
    
    Example queries:
    - "vacation policy"
    - "Q3 2024 sales reports"
    - "API documentation for user service"
    
    Returns: List of relevant document snippets with sources.
    """
    # Implementation
    results = knowledge_base.search(
        query=query,
        limit=max_results,
        date_filter=date_filter
    )
    return format_search_results(results)
```

### Tool Design Best Practices

#### 1. Clear, Specific Descriptions

```python
# BAD: Vague description
@tool
def search(q: str) -> str:
    """Search for stuff."""
    pass

# GOOD: Specific with examples
@tool
def search_customer_orders(
    customer_id: str,
    status: str = "all"
) -> str:
    """
    Search for orders belonging to a specific customer.
    
    Use this when the user asks about:
    - Customer's order history
    - Specific order status
    - Recent purchases
    
    Args:
        customer_id: The unique customer identifier (e.g., 'CUST-12345')
        status: Filter by status - 'pending', 'shipped', 'delivered', or 'all'
    
    Returns:
        JSON list of orders with id, date, total, and status
    """
    pass
```

#### 2. Validate and Sanitize Inputs

```python
from pydantic import BaseModel, Field, validator

class EmailToolArgs(BaseModel):
    to: str = Field(description="Recipient email address")
    subject: str = Field(description="Email subject line")
    body: str = Field(description="Email body content")
    
    @validator('to')
    def validate_email(cls, v):
        import re
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', v):
            raise ValueError('Invalid email format')
        return v
    
    @validator('subject')
    def validate_subject(cls, v):
        if len(v) > 200:
            raise ValueError('Subject too long (max 200 chars)')
        return v[:200]
    
    @validator('body')
    def validate_body(cls, v):
        # Prevent LLM from sending inappropriate content
        forbidden_patterns = ['password', 'credit card', 'ssn']
        for pattern in forbidden_patterns:
            if pattern.lower() in v.lower():
                raise ValueError(f'Body cannot contain: {pattern}')
        return v
```

> **Pro Tip**: Never trust LLM-generated arguments blindly. Always validate, especially for tools that modify data or interact with external systems.

#### 3. Return Structured, Actionable Results

```python
@tool
def get_user_info(user_id: str) -> str:
    """
    Get detailed information about a user.
    
    Returns JSON with: name, email, department, manager, hire_date, 
    active_status, and recent_activity summary.
    """
    user = db.get_user(user_id)
    
    if not user:
        return json.dumps({
            "error": "User not found",
            "suggestion": "Check the user_id or use search_users tool"
        })
    
    return json.dumps({
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "manager": user.manager,
        "hire_date": user.hire_date.isoformat(),
        "active": user.is_active,
        "recent_activity": summarize_activity(user.activity_log[-10:])
    })
```

## Handling Complex Tool Interactions

### Parallel Tool Calls

Modern LLMs can request multiple tools in parallel:

```python
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", 
         "content": "Get the weather in Tokyo and New York, also find flights between them"}
    ],
    tools=tools,
    parallel_tool_calls=True  # Enable parallel calls
)

# LLM might return multiple tool calls:
# 1. get_weather(location="Tokyo")
# 2. get_weather(location="New York")
# 3. search_flights(from="Tokyo", to="New York")

# Execute in parallel for efficiency
import asyncio

async def execute_tools_parallel(tool_calls):
    tasks = [execute_tool(tc) for tc in tool_calls]
    return await asyncio.gather(*tasks)

results = asyncio.run(execute_tools_parallel(message.tool_calls))
```

### Tool Chaining

Some tasks require using multiple tools in sequence:

```python
# Example: "Book a meeting with John about the Q3 report"
# Requires: find_user → get_calendar → create_event

@tool
def find_user_by_name(name: str) -> str:
    """Find a user's ID and email by their name."""
    user = db.users.find_one({"name": {"$regex": name, "$options": "i"}})
    if user:
        return json.dumps({"id": user["id"], "email": user["email"]})
    return json.dumps({"error": f"No user found matching '{name}'"})

@tool
def get_available_slots(user_id: str, date: str) -> str:
    """Get available calendar slots for a user on a given date."""
    slots = calendar.get_availability(user_id, date)
    return json.dumps(slots)

@tool
def create_meeting(
    organizer_id: str,
    attendee_ids: list[str],
    title: str,
    start_time: str,
    duration_minutes: int
) -> str:
    """Create a calendar meeting. Returns meeting ID if successful."""
    meeting = calendar.create_event(
        organizer=organizer_id,
        attendees=attendee_ids,
        title=title,
        start=start_time,
        duration=duration_minutes
    )
    return json.dumps({"meeting_id": meeting.id, "status": "created"})
```

### Tool Selection Strategies

```python
# Strategy 1: Auto (default) - LLM decides
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=messages,
    tools=tools,
    tool_choice="auto"  # LLM decides whether to use tools
)

# Strategy 2: Required - Must use a tool
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=messages,
    tools=tools,
    tool_choice="required"  # Must call at least one tool
)

# Strategy 3: Specific - Force a specific tool
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=messages,
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "get_weather"}}
)

# Strategy 4: None - Disable tools for this call
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=messages,
    tools=tools,
    tool_choice="none"  # No tools, just generate text
)
```

## Error Handling for Tools

### Graceful Degradation

```python
def execute_tool_safely(tool_name: str, args: dict) -> str:
    """Execute a tool with comprehensive error handling."""
    tool = tools_registry.get(tool_name)
    
    if not tool:
        return json.dumps({
            "error": f"Unknown tool: {tool_name}",
            "available_tools": list(tools_registry.keys())
        })
    
    try:
        result = tool(**args)
        return result
    
    except ValidationError as e:
        return json.dumps({
            "error": "Invalid arguments",
            "details": str(e),
            "hint": f"Check the schema for {tool_name}"
        })
    
    except RateLimitError:
        return json.dumps({
            "error": "Rate limit exceeded",
            "suggestion": "Wait a moment and retry, or try a different approach"
        })
    
    except TimeoutError:
        return json.dumps({
            "error": "Tool execution timed out",
            "suggestion": "The service is slow; try again or use cached data"
        })
    
    except Exception as e:
        logger.error(f"Tool {tool_name} failed: {e}")
        return json.dumps({
            "error": "Tool execution failed",
            "suggestion": "Try an alternative approach or ask for human help"
        })
```

### Retry Logic

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10)
)
def execute_with_retry(tool_func, **kwargs):
    """Execute a tool with automatic retries on transient failures."""
    return tool_func(**kwargs)
```

## Security Considerations

### Tool Permission Levels

```python
from enum import Enum

class ToolPermission(Enum):
    READ = "read"        # Can only read data
    WRITE = "write"      # Can modify data
    EXECUTE = "execute"  # Can run code/commands
    ADMIN = "admin"      # Full access

# Define permissions per tool
tool_permissions = {
    "search_documents": ToolPermission.READ,
    "update_user": ToolPermission.WRITE,
    "send_email": ToolPermission.EXECUTE,
    "delete_user": ToolPermission.ADMIN
}

def can_execute_tool(user_role: str, tool_name: str) -> bool:
    """Check if user role can execute a tool."""
    required = tool_permissions.get(tool_name)
    return role_has_permission(user_role, required)
```

> **Common Mistake**: Giving agents access to dangerous tools (delete, execute code, send emails) without proper safeguards. Always implement permission checks and confirmations for destructive actions.

## Key Takeaways

- **Function calling** enables LLMs to invoke external tools reliably
- **Tool descriptions are crucial**: The LLM uses them to decide when and how to use tools
- **Validate all inputs**: Never trust LLM-generated arguments blindly
- **Return structured results**: Make it easy for the LLM to understand and use the output
- **Handle errors gracefully**: Provide helpful error messages the LLM can learn from
- **Implement security**: Permission levels, rate limits, and confirmation for dangerous actions
- **Use parallel calls** when tools are independent for better performance

## What's Next

In the next lesson, we'll explore **Agent Memory and State**—how to give agents short-term and long-term memory for more sophisticated reasoning.

---

*Estimated completion time: 30 minutes*
*Difficulty: Intermediate*
