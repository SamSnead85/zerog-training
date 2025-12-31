# Unit 3: Structured Outputs

> **Unit Duration**: 4 hours | **Lessons**: 4
> **Module**: 2 - Prompt Engineering Mastery

---

## Unit Overview

Getting free-form text from an LLM is easy. Getting **structured, parseable, reliable** output is the real skill. This unit covers the tools and techniques for production-grade structured outputs.

---

## Learning Objectives

By completing this unit, you will be able to:

1. Use JSON mode for guaranteed valid JSON
2. Implement function calling for tool use
3. Extract structured data from unstructured text
4. Validate and handle malformed outputs

---

## Lesson List

| Lesson | Topic | Duration | Key Concepts |
|--------|-------|----------|--------------|
| 3.1 | JSON Mode and Schemas | 55 min | JSON mode, schema enforcement |
| 3.2 | Function Calling / Tool Use | 60 min | Tools, parameters, execution |
| 3.3 | Structured Extraction | 55 min | Entity extraction, NER, parsing |
| 3.4 | Validation & Error Handling | 50 min | Type checking, retries, fallbacks |

---

## Why This Matters

LLMs in production = parsing outputs programmatically. If your outputs aren't structured:
- Your code breaks when format varies
- You can't store data reliably
- Downstream systems fail

This unit makes your AI outputs production-ready.
