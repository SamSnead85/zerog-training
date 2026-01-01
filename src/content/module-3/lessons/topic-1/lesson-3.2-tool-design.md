# Lesson: Agent Tool Design Patterns

## Overview

In this lesson, you'll learn how to design effective tools for AI agents. Well-designed tools are the foundation of capable agents—they determine what an agent can do and how reliably it can do it.

**Duration**: 20 minutes  
**Prerequisites**: Module 3 Lesson 1 (Introduction to Agents)

## Learning Objectives

By the end of this lesson, you will:
- Apply the SOLID principles to tool design
- Create self-documenting tools that LLMs can use correctly
- Handle errors in ways that help agents recover
- Structure tool outputs for agent consumption
- Choose appropriate granularity for tools

---

## Why Tool Design Matters

Tools are how agents interact with the real world. Poor tool design leads to:
- Agents calling the wrong tools
- Confusing or unusable outputs
- Silent failures that corrupt agent reasoning
- Agents stuck in loops

Good tools make agents reliable and predictable.

---

## The CRAFT Framework for Tool Design

### C - Clear Purpose

Each tool should do exactly one thing.

```python
# ❌ Bad: Does too much
def handle_user_request(request_type: str, data: str) -> str:
    """Handle various user requests."""
    if request_type == "search":
        ...
    elif request_type == "create":
        ...
    elif request_type == "delete":
        ...

# ✅ Good: Single purpose
def search_documents(query: str) -> list[Document]:
    """Search documents by query. Returns matching documents."""
    ...

def create_document(title: str, content: str) -> Document:
    """Create a new document with title and content."""
    ...

def delete_document(document_id: str) -> bool:
    """Delete a document by ID. Returns True if deleted."""
    ...
```

### R - Readable Descriptions

Your docstring is your tool's instruction manual for the LLM.

```python
def search_products(
    query: str,
    category: Optional[str] = None,
    max_results: int = 5
) -> list[Product]:
    """
    Search the product catalog.
    
    Use this tool when the user asks about:
    - Product availability
    - Product features
    - Pricing information
    - Product comparisons
    
    Args:
        query: Search terms (e.g., "wireless headphones", "laptop under $1000")
        category: Optional category filter. Options: electronics, clothing, home
        max_results: Maximum products to return (1-20, default 5)
    
    Returns:
        List of products with name, price, description, and availability.
        Empty list if no matches found.
    
    Example:
        search_products("wireless earbuds", category="electronics", max_results=3)
    """
```

### A - Appropriate Granularity

Not too specific, not too general.

```python
# ❌ Too granular - agent must orchestrate every detail
def connect_database() -> Connection: ...
def execute_query(sql: str) -> Results: ...
def close_connection(conn: Connection): ...

# ❌ Too general - agent can't control behavior
def interact_with_database(request: str) -> Any: ...

# ✅ Right granularity - clear actions
def get_user_orders(user_id: str, limit: int = 10) -> list[Order]:
    """Get recent orders for a user."""
    ...

def search_orders(criteria: dict) -> list[Order]:
    """Search orders by date, status, or amount."""
    ...
```

### F - Failure Modes

Tools should fail gracefully with useful information.

```python
from dataclasses import dataclass
from typing import Optional, TypeVar, Generic

T = TypeVar('T')

@dataclass
class ToolResult(Generic[T]):
    success: bool
    result: Optional[T] = None
    error: Optional[str] = None
    suggestion: Optional[str] = None


def lookup_customer(customer_id: str) -> ToolResult[Customer]:
    """
    Look up a customer by their ID.
    
    Returns:
        ToolResult with customer data, or error with suggestions.
    """
    if not customer_id:
        return ToolResult(
            success=False,
            error="Customer ID is required",
            suggestion="Ask the user for their customer ID or email"
        )
    
    if not customer_id.startswith("cust_"):
        return ToolResult(
            success=False,
            error=f"Invalid customer ID format: {customer_id}",
            suggestion="Customer IDs start with 'cust_'. Try searching by email instead."
        )
    
    try:
        customer = db.get_customer(customer_id)
        if not customer:
            return ToolResult(
                success=False,
                error=f"Customer {customer_id} not found",
                suggestion="Verify the customer ID or search by email/name"
            )
        return ToolResult(success=True, result=customer)
        
    except DatabaseError as e:
        return ToolResult(
            success=False,
            error=f"Database error: {e}",
            suggestion="Try again in a moment"
        )
```

### T - Typed Inputs and Outputs

Strong typing helps LLMs understand expected formats.

```python
from pydantic import BaseModel, Field
from typing import Literal
from datetime import date

class FlightSearchInput(BaseModel):
    """Input for searching flights."""
    origin: str = Field(
        description="Origin airport code (e.g., 'SFO', 'JFK')",
        pattern=r'^[A-Z]{3}$'
    )
    destination: str = Field(
        description="Destination airport code",
        pattern=r'^[A-Z]{3}$'
    )
    departure_date: date = Field(
        description="Departure date (YYYY-MM-DD format)"
    )
    cabin_class: Literal["economy", "business", "first"] = Field(
        default="economy",
        description="Cabin class preference"
    )
    max_stops: int = Field(
        default=1,
        ge=0,
        le=2,
        description="Maximum number of stops (0-2)"
    )


class Flight(BaseModel):
    """A flight option."""
    flight_number: str
    departure_time: str
    arrival_time: str
    duration_minutes: int
    price: float
    stops: int
    airline: str


def search_flights(params: FlightSearchInput) -> ToolResult[list[Flight]]:
    """
    Search for available flights.
    
    Use when user wants to:
    - Find flights between cities
    - Compare flight options
    - Check prices for travel dates
    """
    ...
```

---

## Formatting Output for Agents

Structure output to help agents reason about results.

```python
def search_knowledge_base(query: str) -> str:
    """Search the knowledge base for relevant articles."""
    
    results = kb.search(query, limit=3)
    
    if not results:
        return "NO RESULTS FOUND. Try different search terms or ask a clarifying question."
    
    # Format for agent consumption
    output_lines = [
        f"Found {len(results)} relevant articles:",
        ""
    ]
    
    for i, result in enumerate(results, 1):
        output_lines.extend([
            f"[{i}] {result.title}",
            f"    Relevance: {result.score:.0%}",
            f"    Summary: {result.summary[:200]}...",
            f"    ID: {result.id}",
            ""
        ])
    
    output_lines.append("Use read_article(id) to get full content of a specific article.")
    
    return "\n".join(output_lines)
```

**Key elements:**
1. Result count upfront
2. Numbered items for reference
3. Relevance scores
4. Guidance on next actions

---

## Tool Composition Patterns

### Simple Tools → Complex Behaviors

```python
# Basic tools
def get_user(user_id: str) -> User: ...
def get_orders(user_id: str, limit: int) -> list[Order]: ...
def get_order_details(order_id: str) -> OrderDetails: ...

# Agent can compose these:
# "Get user 123's last 3 orders and their details"
# 1. get_user("123")
# 2. get_orders("123", limit=3) 
# 3. get_order_details(order_id) for each order
```

### Composite Tools for Common Patterns

```python
def get_user_dashboard(user_id: str) -> UserDashboard:
    """
    Get comprehensive user information.
    
    Use when you need a full user overview including:
    - Profile information
    - Recent orders
    - Account status
    - Loyalty points
    
    Prefer this over multiple separate calls when you need
    the complete picture.
    """
    user = get_user(user_id)
    orders = get_orders(user_id, limit=5)
    status = get_account_status(user_id)
    points = get_loyalty_points(user_id)
    
    return UserDashboard(
        user=user,
        recent_orders=orders,
        status=status,
        loyalty_points=points
    )
```

---

## Common Anti-Patterns

### 1. God Tool
```python
# ❌ Too powerful and ambiguous
def execute(action: str, params: dict) -> Any:
    """Execute any action with parameters."""
```

### 2. Inconsistent Formats
```python
# ❌ Mixed return types
def get_info(id: str):
    if found:
        return {"data": {...}}  # dict
    else:
        return "Not found"  # string
```

### 3. Poor Error Messages
```python
# ❌ Unhelpful
return {"error": True}

# ✅ Actionable
return {
    "error": "User not found",
    "code": "USER_NOT_FOUND", 
    "suggestion": "Verify the user ID or try searching by email",
    "searched_id": user_id
}
```

### 4. Missing Validation
```python
# ❌ Will crash or behave unexpectedly
def send_email(to: str, subject: str, body: str):
    smtp.send(to, subject, body)

# ✅ Validates and provides helpful errors
def send_email(to: str, subject: str, body: str) -> ToolResult:
    if not re.match(r'^[\w\.\-]+@[\w\.\-]+\.\w+$', to):
        return ToolResult(
            success=False,
            error=f"Invalid email format: {to}",
            suggestion="Verify the email address is correct"
        )
    ...
```

---

## Tool Discovery for Agents

Help agents choose the right tool:

```python
TOOL_REGISTRY = {
    "customer_lookup": {
        "function": lookup_customer,
        "category": "customer_service",
        "use_when": [
            "User provides a customer ID",
            "Need to verify customer exists",
            "Looking up customer details"
        ],
        "dont_use_when": [
            "User only has email (use search_customer_by_email)",
            "Need to search multiple customers"
        ]
    },
    "search_customer_by_email": {
        "function": search_customer_by_email,
        "category": "customer_service",
        "use_when": [
            "User provides email instead of ID",
            "Customer ID unknown"
        ],
        "dont_use_when": [
            "Customer ID is already known"
        ]
    }
}
```

---

## Key Takeaways

1. **CRAFT your tools**: Clear, Readable, Appropriate, Failure-aware, Typed
2. **Single responsibility**: Each tool does one thing well
3. **Rich documentation**: LLMs read your docstrings—make them helpful
4. **Graceful failures**: Return actionable errors with suggestions
5. **Structured outputs**: Format results for agent reasoning
6. **Right granularity**: Atomic enough for flexibility, composed for convenience

---

## Next Steps

- **Lab**: Build a ReAct agent with custom tools
- **Next Lesson**: Multi-agent architectures
- **Advanced**: Tool versioning and deprecation patterns
