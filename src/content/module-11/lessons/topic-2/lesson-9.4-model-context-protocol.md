---
title: "Model Context Protocol (MCP): The Integration Standard"
module: 11
lesson: 4
topic: 2
duration: 45
difficulty: advanced
objectives:
  - Explain the MCP architecture and its role in AI integration
  - Build MCP servers to expose enterprise data to AI
  - Implement MCP clients for tool integration
  - Apply security and governance patterns for MCP
prerequisites:
  - Lesson 9.3: Memory Architectures
  - Basic understanding of APIs and JSON-RPC
---

# Model Context Protocol (MCP): The Integration Standard

> "MCP is to AI what USB is to hardware — a universal interface that makes everything work together."

## The Integration Problem

Every AI application needs access to external data and tools:

- Customer data from CRM
- Documents from knowledge bases
- Real-time data from APIs
- Actions in enterprise systems

**Before MCP**: Custom integrations for every model-application pair.

```
┌─────────────────────────────────────────────────────────────┐
│                    THE INTEGRATION MESS                     │
│                                                             │
│   GPT-4 ←───→ Custom Code ←───→ Salesforce                 │
│   Claude ←───→ Custom Code ←───→ Salesforce                │
│   Gemini ←───→ Custom Code ←───→ Salesforce                │
│                                                             │
│   GPT-4 ←───→ Custom Code ←───→ Jira                       │
│   Claude ←───→ Custom Code ←───→ Jira                      │
│   Gemini ←───→ Custom Code ←───→ Jira                      │
│                                                             │
│   N models × M applications = N×M integrations 😱           │
└─────────────────────────────────────────────────────────────┘
```

**With MCP**: One standard protocol, reusable everywhere.

```
┌─────────────────────────────────────────────────────────────┐
│                    THE MCP SOLUTION                         │
│                                                             │
│   GPT-4  ──┐                                                │
│   Claude ──┼──→ MCP Protocol ←──→ MCP Server: Salesforce   │
│   Gemini ──┘                      MCP Server: Jira         │
│                                   MCP Server: Postgres      │
│                                   ...                       │
│                                                             │
│   Any model can use any server. Build once, use everywhere. │
└─────────────────────────────────────────────────────────────┘
```

---

## MCP Architecture

### Core Components

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│      HOST       │     │     CLIENT      │     │     SERVER      │
│   (AI App)      │────▶│   (Connector)   │────▶│   (Data/Tool)   │
│                 │     │                 │     │                 │
│  Claude Desktop │     │  MCP Client     │     │  MCP Server     │
│  Custom App     │     │  Library        │     │  (e.g., DB)     │
│  IDE Plugin     │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Host**: The AI application (Claude Desktop, your custom app)
- **Client**: The MCP-speaking connector in the host
- **Server**: The service exposing data/tools via MCP

### Protocol Messages

MCP uses **JSON-RPC 2.0** for communication:

```json
// Request: List available tools
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}

// Response: Available tools
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "get_customer",
        "description": "Retrieve customer information by ID",
        "inputSchema": {
          "type": "object",
          "properties": {
            "customer_id": {"type": "string"}
          },
          "required": ["customer_id"]
        }
      }
    ]
  }
}
```

### MCP Capabilities

| Capability | Description | Use Case |
|------------|-------------|----------|
| **Tools** | Actions the AI can take | Create ticket, send email |
| **Resources** | Data the AI can access | Read documents, query DB |
| **Prompts** | Pre-built prompt templates | Standardized workflows |
| **Sampling** | Request AI generations | Sub-agent patterns |

---

## Building MCP Servers

### Server Structure

```python
from mcp import Server, Tool, Resource
from mcp.types import TextContent

# Create server instance
server = Server("my-enterprise-server")

# Define tools
@server.tool()
async def get_customer(customer_id: str) -> TextContent:
    """
    Retrieve customer information by ID.
    
    Args:
        customer_id: The unique customer identifier
    
    Returns:
        Customer profile as JSON
    """
    customer = await db.customers.find_one({"id": customer_id})
    return TextContent(type="text", text=json.dumps(customer))


@server.tool()
async def create_ticket(
    customer_id: str,
    subject: str,
    description: str,
    priority: str = "medium"
) -> TextContent:
    """
    Create a support ticket for a customer.
    
    Args:
        customer_id: Customer to create ticket for
        subject: Ticket subject line
        description: Detailed description of issue
        priority: Ticket priority (low, medium, high, urgent)
    
    Returns:
        Created ticket ID and confirmation
    """
    ticket = await ticketing_system.create({
        "customer_id": customer_id,
        "subject": subject,
        "description": description,
        "priority": priority
    })
    return TextContent(
        type="text", 
        text=f"Created ticket {ticket['id']}: {subject}"
    )


# Define resources
@server.resource("customers/{customer_id}")
async def customer_resource(customer_id: str) -> TextContent:
    """Expose customer data as a resource."""
    customer = await db.customers.find_one({"id": customer_id})
    return TextContent(type="text", text=json.dumps(customer))

@server.resource("knowledge-base")
async def knowledge_base_resource() -> TextContent:
    """Expose knowledge base articles."""
    articles = await kb.get_recent_articles(limit=50)
    return TextContent(type="text", text=json.dumps(articles))


# Run server
if __name__ == "__main__":
    server.run()
```

### Server Configuration

```json
// mcp_config.json
{
  "mcpServers": {
    "enterprise": {
      "command": "python",
      "args": ["enterprise_mcp_server.py"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "API_KEY": "${API_KEY}"
      }
    }
  }
}
```

---

## Building MCP Clients

### Client Integration

```python
from mcp import Client

async def create_mcp_agent():
    """Create an agent with MCP capabilities."""
    
    # Connect to MCP server
    client = Client()
    await client.connect("enterprise")
    
    # Discover available tools
    tools = await client.list_tools()
    
    # Format tools for LLM
    tool_descriptions = format_for_llm(tools)
    
    return MCPAgent(client, tool_descriptions)


class MCPAgent:
    def __init__(self, client: Client, tools: list):
        self.client = client
        self.tools = tools
    
    async def run(self, query: str) -> str:
        """Run agent with MCP tool access."""
        
        # Include tool descriptions in prompt
        system_prompt = f"""
        You are a helpful assistant with access to enterprise tools.
        
        Available tools:
        {self.format_tools()}
        
        When you need to use a tool, respond with a tool call in this format:
        <tool_call name="tool_name">
        {{"param1": "value1", "param2": "value2"}}
        </tool_call>
        """
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]
        
        while True:
            response = await llm.complete(messages)
            
            # Check for tool calls
            tool_calls = self.extract_tool_calls(response)
            
            if not tool_calls:
                return response  # Final answer
            
            # Execute tool calls via MCP
            for tool_call in tool_calls:
                result = await self.client.call_tool(
                    tool_call["name"],
                    tool_call["arguments"]
                )
                
                messages.append({
                    "role": "assistant",
                    "content": f"Called {tool_call['name']}"
                })
                messages.append({
                    "role": "user",
                    "content": f"Tool result: {result}"
                })
```

---

## MCP for Enterprise Integration

### Pattern 1: Database Access

```python
@server.tool()
async def query_database(
    query: str,
    database: str = "analytics"
) -> TextContent:
    """
    Execute a read-only SQL query.
    
    Security: Only SELECT queries are allowed.
    """
    # Validate query is read-only
    if not query.strip().upper().startswith("SELECT"):
        raise ValueError("Only SELECT queries are permitted")
    
    # Execute with read-only connection
    result = await db_pools[database].fetch(query)
    
    return TextContent(
        type="text",
        text=json.dumps(result, default=str)
    )
```

### Pattern 2: API Integration

```python
@server.tool()
async def salesforce_query(
    object_type: str,
    filters: dict,
    fields: list[str] = None
) -> TextContent:
    """
    Query Salesforce for records.
    
    Args:
        object_type: Salesforce object (Account, Contact, Opportunity)
        filters: Query filters as key-value pairs
        fields: Fields to return (default: all standard fields)
    """
    soql = build_soql_query(object_type, filters, fields)
    
    async with salesforce_client.session() as sf:
        result = await sf.query(soql)
    
    return TextContent(
        type="text",
        text=json.dumps(result["records"])
    )


@server.tool()
async def jira_create_issue(
    project: str,
    summary: str,
    description: str,
    issue_type: str = "Task",
    priority: str = "Medium"
) -> TextContent:
    """
    Create a Jira issue.
    """
    issue = await jira_client.create_issue({
        "fields": {
            "project": {"key": project},
            "summary": summary,
            "description": description,
            "issuetype": {"name": issue_type},
            "priority": {"name": priority}
        }
    })
    
    return TextContent(
        type="text",
        text=f"Created {issue['key']}: {issue['self']}"
    )
```

### Pattern 3: Document Retrieval

```python
@server.resource("documents/{doc_id}")
async def get_document(doc_id: str) -> TextContent:
    """Retrieve a specific document."""
    doc = await document_store.get(doc_id)
    return TextContent(type="text", text=doc["content"])


@server.tool()
async def search_documents(
    query: str,
    filters: dict = None,
    limit: int = 10
) -> TextContent:
    """
    Semantic search across document repository.
    
    Args:
        query: Natural language search query
        filters: Optional filters (department, date_range, type)
        limit: Maximum results to return
    """
    results = await vector_search.search(
        query=query,
        filters=filters,
        k=limit
    )
    
    # Format with snippets
    formatted = []
    for doc in results:
        formatted.append({
            "id": doc["id"],
            "title": doc["title"],
            "snippet": doc["content"][:500],
            "relevance_score": doc["score"]
        })
    
    return TextContent(
        type="text",
        text=json.dumps(formatted)
    )
```

---

## Security & Governance

### Authentication & Authorization

```python
from mcp.auth import OAuth2Handler

# OAuth 2.0 for machine-to-machine auth
auth_handler = OAuth2Handler(
    client_id=os.environ["MCP_CLIENT_ID"],
    client_secret=os.environ["MCP_CLIENT_SECRET"],
    token_url="https://auth.company.com/oauth/token",
    scopes=["mcp:read", "mcp:write"]
)

server = Server("secure-enterprise-server", auth=auth_handler)


@server.tool()
async def get_sensitive_data(
    record_id: str,
    context: MCPContext  # Includes auth info
) -> TextContent:
    """Access controlled data with authorization check."""
    
    # Verify permissions
    if not context.has_scope("data:sensitive:read"):
        raise PermissionError("Insufficient permissions")
    
    # Audit log
    await audit_log.record(
        action="sensitive_data_access",
        user=context.user_id,
        resource=record_id,
        timestamp=datetime.now()
    )
    
    data = await secure_db.get(record_id)
    
    # Apply data masking based on permissions
    if not context.has_scope("data:pii:read"):
        data = mask_pii(data)
    
    return TextContent(type="text", text=json.dumps(data))
```

### Audit Logging

```python
class AuditedServer(Server):
    """MCP Server with comprehensive audit logging."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.audit_log = AuditLog()
    
    async def call_tool(self, name: str, args: dict, context: MCPContext):
        """Wrap tool calls with audit logging."""
        
        # Log request
        request_id = str(uuid.uuid4())
        await self.audit_log.log({
            "request_id": request_id,
            "type": "tool_call",
            "tool": name,
            "arguments": self._sanitize_args(args),
            "user": context.user_id,
            "timestamp": datetime.now(),
            "status": "started"
        })
        
        try:
            result = await super().call_tool(name, args, context)
            
            await self.audit_log.log({
                "request_id": request_id,
                "status": "completed",
                "result_size": len(str(result))
            })
            
            return result
            
        except Exception as e:
            await self.audit_log.log({
                "request_id": request_id,
                "status": "failed",
                "error": str(e)
            })
            raise
```

### Rate Limiting & Quotas

```python
from mcp.middleware import RateLimiter, QuotaManager

# Rate limiting per user
rate_limiter = RateLimiter(
    requests_per_minute=60,
    burst_size=10
)

# Quota management
quota_manager = QuotaManager(
    daily_tool_calls=1000,
    daily_data_mb=100
)

server = Server(
    "governed-server",
    middleware=[rate_limiter, quota_manager]
)
```

---

## MCP Best Practices

### 1. Tool Design Principles

```python
# Good: Clear, focused tools with explicit schemas
@server.tool()
async def get_order_status(order_id: str) -> TextContent:
    """Get the current status of an order."""
    ...

# Bad: Overly broad tools
@server.tool()
async def do_database_operation(
    operation: str,  # "read", "write", "delete"
    table: str,
    data: dict
) -> TextContent:
    """Do anything with the database."""  # Too powerful!
    ...
```

### 2. Error Handling

```python
from mcp.errors import MCPError, ToolError, ResourceNotFoundError

@server.tool()
async def get_customer(customer_id: str) -> TextContent:
    """Get customer by ID with proper error handling."""
    
    try:
        customer = await db.customers.find_one({"id": customer_id})
        
        if not customer:
            raise ResourceNotFoundError(
                f"Customer {customer_id} not found",
                suggestion="Verify the customer ID and try again"
            )
        
        return TextContent(type="text", text=json.dumps(customer))
        
    except DatabaseError as e:
        raise ToolError(
            f"Database error: {e}",
            retryable=True  # Hint to client
        )
```

### 3. Resource Organization

```python
# Organize resources hierarchically
@server.resource("customers")
async def list_customers():
    """List all customers (paginated)."""
    ...

@server.resource("customers/{id}")
async def get_customer(id: str):
    """Get specific customer."""
    ...

@server.resource("customers/{id}/orders")
async def get_customer_orders(id: str):
    """Get customer's orders."""
    ...

@server.resource("customers/{id}/orders/{order_id}")
async def get_specific_order(id: str, order_id: str):
    """Get specific order."""
    ...
```

---

## Hands-On: Build an Enterprise MCP Server

**Objective**: Create an MCP server that exposes:
1. Customer data retrieval
2. Support ticket creation
3. Knowledge base search

**Starter Code**:

```python
from mcp import Server, Tool
from mcp.types import TextContent
import json

server = Server("customer-support-server")

# TODO: Implement these tools

@server.tool()
async def get_customer(customer_id: str) -> TextContent:
    """Retrieve customer information."""
    # Your implementation here
    pass

@server.tool()
async def create_support_ticket(
    customer_id: str,
    subject: str,
    description: str
) -> TextContent:
    """Create a support ticket."""
    # Your implementation here
    pass

@server.tool()
async def search_knowledge_base(query: str) -> TextContent:
    """Search the knowledge base."""
    # Your implementation here
    pass

# Test your server
if __name__ == "__main__":
    server.run()
```

---

## Key Takeaways

1. **MCP standardizes AI-to-enterprise integration** — build once, use everywhere
2. **Tools expose actions, resources expose data** — design accordingly
3. **Security is non-negotiable** — auth, audit, rate limiting from day one
4. **Clear tool design** enables better AI reasoning and fewer errors
5. **MCP is the foundation for agentic AI** — master it early

---

## What's Next

Next lesson: **Layered Context Architecture** — designing multi-layer context systems that combine static prompts, dynamic retrieval, and real-time data.
