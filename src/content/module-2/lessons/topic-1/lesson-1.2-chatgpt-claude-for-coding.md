# Lesson 1.2: Using ChatGPT and Claude for Coding Tasks

## Introduction

While Copilot excels at inline suggestions, ChatGPT and Claude shine when you need to think through problems, explain code, refactor complex logic, or explore solutions. This lesson covers when and how to use conversational AI assistants for coding tasks.

## Copilot vs. ChatGPT/Claude: When to Use Which

[Image: Decision tree for choosing between Copilot and ChatGPT/Claude]

| Use Case | Best Tool | Why |
|----------|-----------|-----|
| Writing new code line-by-line | Copilot | Inline, fast, contextual |
| Explaining complex code | ChatGPT/Claude | Interactive, can ask follow-ups |
| Debugging errors | ChatGPT/Claude | Can paste full error + context |
| Refactoring large blocks | ChatGPT/Claude | Can see the full picture |
| Writing tests | Both | Copilot for simple, ChatGPT for complex |
| Architecture decisions | ChatGPT/Claude | Can discuss trade-offs |
| Learning new concepts | ChatGPT/Claude | Can explain at your level |

> **Pro Tip**: Use Copilot for the "what" and ChatGPT/Claude for the "why" and "how."

## Effective Prompting for Code Tasks

### The CRISPE Framework for Coding

**C**apacity: Define the role
**R**ole context: Set the expertise level
**I**nput: Provide the code/problem
**S**pecifics: Request particular outputs
**P**reference: Specify format/style
**E**valuation: Ask for alternatives

```
You are an expert Python developer with deep knowledge of 
SQLAlchemy and FastAPI. (Capacity + Role context)

I have this API endpoint that's running slow: (Input)
[paste code]

Please:
1. Identify performance bottlenecks (Specific)
2. Suggest optimizations with code examples (Specific)
3. Explain the trade-offs of each approach (Preference)
4. Rank the fixes by impact vs. effort (Evaluation)

Use type hints and follow PEP 8 conventions. (Preference)
```

### Common Coding Prompts

#### For Debugging

```
I'm getting this error:
```
[paste full error traceback]
```

In this code:
```python
[paste relevant code]
```

What's causing this error, and how can I fix it? 
Please explain why the fix works.
```

#### For Code Review

```
Please review this code for:
1. Bugs and edge cases
2. Security vulnerabilities 
3. Performance issues
4. Best practice violations

```python
[paste code]
```

Format your response as a markdown table with columns:
| Issue | Severity | Location | Suggested Fix |
```

#### For Refactoring

```
Refactor this function to be more maintainable and testable. 
The current implementation mixes data access, business logic, 
and presentation.

[paste code]

Requirements:
- Apply single responsibility principle
- Make it dependency-injectable for testing
- Add proper error handling
- Keep the public interface the same
```

## ChatGPT vs. Claude: Differences for Developers

### ChatGPT Strengths

1. **Function Calling**: Native support for structured outputs
2. **Code Interpreter**: Can run Python code and analyze data
3. **Broader training**: More exposure to varied coding styles
4. **GPTs**: Custom configurations for specific tasks

```python
# ChatGPT with function calling
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[{"role": "user", "content": "What's the weather in NYC?"}],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"}
                }
            }
        }
    }]
)
```

### Claude Strengths

1. **Larger context**: 200K tokens vs. 128K
2. **Better at following complex instructions**: More literal interpretation
3. **Artifacts**: Creates runnable code in side panel
4. **Constitutional AI**: More resistant to jailbreaks

```python
# Claude excels at complex, multi-part instructions
prompt = """
Create a complete FastAPI application with:
1. User authentication using JWT
2. CRUD operations for a Product model
3. Rate limiting middleware
4. Proper error handling
5. OpenAPI documentation

Requirements:
- Use Pydantic v2 for models
- Follow Python 3.12 conventions
- Include integration tests
- Add logging throughout
- Make it production-ready

Generate each file separately with clear file paths.
"""
```

### Practical Guidelines

| Scenario | Recommendation |
|----------|----------------|
| Quick coding questions | Either works well |
| Long code analysis | Claude (context) |
| Complex multi-file generation | Claude (instructions) |
| Data analysis | ChatGPT (Code Interpreter) |
| API integration help | ChatGPT (function calling) |
| Safety-critical code | Claude (conservative) |

## Multi-Turn Conversations for Complex Tasks

Use conversation history to build up context:

```
Turn 1: "I'm building a payment processing system. Here are my requirements..."
Turn 2: "Based on those requirements, design the database schema."
Turn 3: "Now create the SQLAlchemy models for that schema."
Turn 4: "Add the FastAPI endpoints for processing payments."
Turn 5: "Review the complete system for security vulnerabilities."
```

> **Pro Tip**: Save important conversations. Both ChatGPT and Claude have history, but exporting key solutions to your own notes is wise.

## Code Generation Best Practices

### 1. Be Specific About Language and Framework Versions

```
# BAD
"Write a function to handle file uploads"

# GOOD
"Write a Python 3.12 function using FastAPI 0.109+ to handle 
file uploads. Use pydantic-settings for configuration. Target 
production deployment on AWS Lambda."
```

### 2. Provide Example Input/Output

```
Create a function that transforms this:
Input: {"first_name": "John", "last_name": "Doe", "age": "30"}
Output: {"fullName": "John Doe", "age": 30, "isAdult": true}

Requirements:
- Convert snake_case to camelCase
- Parse numeric strings to integers
- Add computed fields
```

### 3. Ask for Tests with the Code

```
Generate a function that [description] AND include comprehensive 
unit tests using pytest. Tests should cover:
- Happy path
- Edge cases (empty input, null values)
- Error conditions
```

### 4. Request Explanations for Learning

```
[code request]

After generating the code, explain:
1. Why you chose this approach over alternatives
2. The time and space complexity
3. Any potential gotchas or limitations
```

## Handling AI Limitations

### When the AI Gets Stuck

1. **Rephrase the question** using different terminology
2. **Break into smaller steps**: "First, just create the model. Then we'll add the logic."
3. **Provide an example**: "Here's how a similar function looks..."
4. **Start fresh**: New conversation clears potentially confusing context

### Verifying Generated Code

Always check:

```python
# 1. Does it actually run?
# 2. Are the imports real packages?
# 3. Are the API versions correct?
# 4. Does it handle edge cases?
# 5. Any security issues (SQL injection, XSS, etc.)?
# 6. Is the business logic correct?
```

## Integration Tips

### In Your IDE

- **GitHub Copilot Chat**: Direct in VS Code
- **Continue**: Open source, works with GPT-4/Claude
- **Cursor**: IDE with built-in AI assistance

### Workflow Integration

```bash
# Create a CLI helper script
#!/bin/bash
# ai-review.sh - Send file for AI code review

cat $1 | pbcopy
echo "Code copied. Opening Claude..."
open "https://claude.ai/new"
```

## Key Takeaways

- **Copilot for typing, ChatGPT/Claude for thinking**
- Use the **CRISPE framework** for structured prompts
- **Be version-specific** about languages and frameworks
- **Request tests and explanations** with your code
- **Claude for long context and complex instructions**
- **ChatGPT for data analysis and function calling**
- **Always verify** generated code before using
- **Multi-turn conversations** build better solutions

## What's Next

In the next lesson, we'll explore how to integrate AI into your complete development workflow—from planning to code review to deployment.

---

*Estimated completion time: 25 minutes*
*Difficulty: Intermediate*
