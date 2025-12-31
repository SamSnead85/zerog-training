# Lesson 3.2: Function Calling / Tool Use

> **Duration**: 60 minutes | **Type**: Technical
> **Unit**: 3 - Structured Outputs

---

## 📚 Reading Material

### What Is Function Calling?

Function calling (also called "tool use") lets LLMs invoke external functions you define. The model doesn't execute the function—it returns structured data telling you WHICH function to call with WHAT arguments.

```
User: "What's the weather in New York?"
Model: {"function": "get_weather", "args": {"location": "New York"}}
You: Execute get_weather("New York") → "72°F, sunny"
Model: "It's currently 72°F and sunny in New York."
```

### The Function Calling Flow

```
1. Define functions (name, description, parameters)
2. Send user message + function definitions to model
3. Model returns function call request (or normal response)
4. You execute the function with provided arguments
5. Send result back to model
6. Model incorporates result into final response
```

### Defining Tools (OpenAI)

```python
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
                        "description": "City and state, e.g., 'San Francisco, CA'"
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
```

### Making Function Calls

```python
from openai import OpenAI
import json

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "What's the weather in NYC?"}],
    tools=tools
)

# Check if model wants to call a function
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    function_name = tool_call.function.name
    arguments = json.loads(tool_call.function.arguments)
    
    print(f"Call: {function_name}({arguments})")
```

### Executing and Responding

```python
def get_weather(location, unit="fahrenheit"):
    """Actual implementation"""
    # Call weather API
    return {"temperature": 72, "condition": "sunny"}

# Execute the function
result = get_weather(**arguments)

# Send result back to model
messages = [
    {"role": "user", "content": "What's the weather in NYC?"},
    response.choices[0].message,
    {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(result)
    }
]

final_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    tools=tools
)

print(final_response.choices[0].message.content)
# "It's currently 72°F and sunny in New York City."
```

### Multiple Tools

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_database",
            "description": "Search product database",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "category": {"type": "string"},
                    "max_results": {"type": "integer", "default": 10}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "send_email",
            "description": "Send an email",
            "parameters": {
                "type": "object",
                "properties": {
                    "to": {"type": "string"},
                    "subject": {"type": "string"},
                    "body": {"type": "string"}
                },
                "required": ["to", "subject", "body"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_calendar_event",
            "description": "Create a calendar event",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "start_time": {"type": "string", "description": "ISO 8601 format"},
                    "duration_minutes": {"type": "integer"}
                },
                "required": ["title", "start_time"]
            }
        }
    }
]
```

### Parallel Function Calls

Models can request multiple function calls in one response:

```python
# User: "What's the weather in NYC and LA?"
# Model returns TWO tool calls

for tool_call in response.choices[0].message.tool_calls:
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    result = execute_function(name, args)
    # Collect all results
```

### Forcing Function Use

```python
# Force model to use a specific function
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "get_weather"}}
)

# Or force it to use ANY function (not respond directly)
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    tools=tools,
    tool_choice="required"
)
```

---

## 🎬 Video Script

**[INTRO - Function calling diagram]**

Function calling lets LLMs use external tools. The model doesn't execute functions—it tells you which function to call with what arguments. You execute, return the result, and the model incorporates it.

**[CUT TO: Flow diagram]**

The flow: define your functions with names, descriptions, and parameter schemas. Send the user message plus function definitions. The model returns either a normal response or a function call request. You execute, send the result back, model gives final answer.

**[CUT TO: Tool definition code]**

Function definitions look like this. Name it clearly. Description tells the model when to use it. Parameters use JSON schema—types, descriptions, required fields. Good descriptions are crucial—they guide when the model chooses each tool.

**[CUT TO: Execution code]**

When you get a response, check for tool_calls. If present, extract the function name and arguments. Execute your actual function. Send the result back in a tool message with the matching tool_call_id.

**[CUT TO: Multiple tools]**

You can define many tools. Search database, send email, create calendar event. The model chooses the right tool based on user intent. It can even call multiple tools in parallel for queries like "weather in NYC and LA."

**[CUT TO: Tool choice]**

Control tool selection with tool_choice. Set "required" to force the model to use a function, not respond directly. Or specify a specific function name to force that exact tool.

**[CUT TO: Speaker on camera]**

Function calling is how LLMs become agents—taking actions, not just generating text. Good function definitions, clear descriptions, proper parameter schemas. That's the foundation for agentic AI.

**[END - Runtime: 6:20]**

---

## 🔬 Interactive Lab: Tool Implementation

### Objective
Build a complete function calling system.

### Part 1: Basic Tool Implementation (20 minutes)

```python
from openai import OpenAI
import json

client = OpenAI()

# Define tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "Perform mathematical calculations",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "Math expression to evaluate, e.g., '2 + 2'"
                    }
                },
                "required": ["expression"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_stock_price",
            "description": "Get current stock price for a ticker symbol",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {
                        "type": "string",
                        "description": "Stock ticker symbol, e.g., 'AAPL'"
                    }
                },
                "required": ["ticker"]
            }
        }
    }
]

# Function implementations
def calculate(expression):
    try:
        result = eval(expression)  # Simplified - use safer evaluation in production
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}

def get_stock_price(ticker):
    # Mock data - use real API in production
    prices = {"AAPL": 178.50, "GOOGL": 140.25, "MSFT": 378.00}
    if ticker.upper() in prices:
        return {"ticker": ticker, "price": prices[ticker.upper()]}
    return {"error": f"Unknown ticker: {ticker}"}

FUNCTIONS = {
    "calculate": calculate,
    "get_stock_price": get_stock_price
}

def process_with_tools(user_message):
    """Process user message with tool support"""
    messages = [{"role": "user", "content": user_message}]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools
    )
    
    # Check for tool calls
    if response.choices[0].message.tool_calls:
        # Add assistant message
        messages.append(response.choices[0].message)
        
        # Process each tool call
        for tool_call in response.choices[0].message.tool_calls:
            func_name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)
            
            print(f"Calling: {func_name}({args})")
            result = FUNCTIONS[func_name](**args)
            print(f"Result: {result}")
            
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })
        
        # Get final response
        final = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=tools
        )
        return final.choices[0].message.content
    
    return response.choices[0].message.content

# Test
queries = [
    "What's 15% of 340?",
    "What's Apple's stock price?",
    "If MSFT is at its current price and goes up 5%, what will it be?",
]

for query in queries:
    print(f"\nUser: {query}")
    response = process_with_tools(query)
    print(f"Assistant: {response}")
```

### Part 2: Multi-Step Tool Usage (25 minutes)

```python
def run_agent_loop(user_message, max_iterations=5):
    """Run agent with multiple tool calls until complete"""
    
    messages = [
        {"role": "system", "content": "You are a helpful assistant with access to tools."},
        {"role": "user", "content": user_message}
    ]
    
    for i in range(max_iterations):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=tools
        )
        
        message = response.choices[0].message
        messages.append(message)
        
        # If no tool calls, we're done
        if not message.tool_calls:
            return message.content
        
        # Process tool calls
        for tool_call in message.tool_calls:
            func_name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)
            
            print(f"  [{i+1}] {func_name}({args})")
            
            if func_name in FUNCTIONS:
                result = FUNCTIONS[func_name](**args)
            else:
                result = {"error": f"Unknown function: {func_name}"}
            
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })
    
    return "Max iterations reached"

# Test complex query
query = "Calculate the total value if I have 100 shares each of AAPL and MSFT"
print(f"\nUser: {query}")
result = run_agent_loop(query)
print(f"\nFinal: {result}")
```

### Part 3: Tool with Complex Parameters (15 minutes)

```python
# Complex tool example
data_query_tool = {
    "type": "function",
    "function": {
        "name": "query_database",
        "description": "Query the product database with filters",
        "parameters": {
            "type": "object",
            "properties": {
                "table": {
                    "type": "string",
                    "enum": ["products", "orders", "customers"]
                },
                "filters": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "field": {"type": "string"},
                            "operator": {"type": "string", "enum": ["=", ">", "<", ">=", "<=", "contains"]},
                            "value": {"type": "string"}
                        }
                    }
                },
                "sort_by": {"type": "string"},
                "limit": {"type": "integer", "default": 10}
            },
            "required": ["table"]
        }
    }
}

def query_database(table, filters=None, sort_by=None, limit=10):
    """Mock database query"""
    print(f"  Querying {table} with filters: {filters}")
    return {"rows": [{"id": 1, "name": "Sample"}], "count": 1}

# Test parsing complex parameters
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Find products over $100 sorted by price"}],
    tools=[data_query_tool],
    tool_choice="required"
)

args = json.loads(response.choices[0].message.tool_calls[0].function.arguments)
print(f"Parsed arguments:\n{json.dumps(args, indent=2)}")
```

### Submission
Build a 3-tool system for a specific domain (e.g., CRM, project management, e-commerce).

---

## ✅ Knowledge Check

### Question 1
Who executes the function in function calling?

A) The LLM executes it directly  
B) You (the developer) execute it and return the result  
C) OpenAI's servers execute it  
D) It runs automatically  

**Correct Answer**: B

**Explanation**: The LLM does NOT execute functions. It returns a structured request (function name + arguments). You execute the function, then send the result back to the model.

---

### Question 2
What is the purpose of function descriptions?

A) Documentation for developers  
B) They tell the model WHEN to use each function  
C) They're optional metadata  
D) They define the return type  

**Correct Answer**: B

**Explanation**: Function descriptions are crucial—they guide the model on when to choose each tool. Good descriptions lead to better tool selection.

---

### Question 3
What does `tool_choice="required"` do?

A) Makes all tools required parameters  
B) Forces the model to call a function instead of responding directly  
C) Requires authentication  
D) Makes tool calls faster  

**Correct Answer**: B

**Explanation**: Setting `tool_choice="required"` forces the model to use one of the available tools rather than responding with text directly.

---

*You've completed Lesson 3.2! You can now implement function calling systems.*
