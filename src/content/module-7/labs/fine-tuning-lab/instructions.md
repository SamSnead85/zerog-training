# Lab: Fine-Tuning a Customer Service Model

## Overview

In this hands-on lab, you'll fine-tune GPT-4o-mini for a specific customer support use case. You'll prepare data, run the fine-tuning job, evaluate results, and deploy the model.

**Duration**: 90 minutes  
**Difficulty**: Advanced  
**Prerequisites**: Module 7 Lessons 1-2

---

## Learning Objectives

By completing this lab, you will:
- Prepare training data in the correct format
- Validate data quality before training
- Run and monitor a fine-tuning job
- Evaluate the fine-tuned model vs. base
- Deploy the model in your application

---

## The Challenge

Create a customer service assistant for TechCorp that:
1. Responds in a consistent, professional tone
2. Follows specific formatting guidelines
3. Handles common scenarios appropriately
4. Refuses off-topic or inappropriate requests gracefully

---

## Part 1: Data Preparation (25 min)

### Task 1.1: Create Training Examples

Create at least 50 training examples covering these categories:
- Product questions (40%)
- Order inquiries (20%)
- Returns/Refunds (20%)
- Edge cases and refusals (20%)

```python
# File: training_data.py

import json

training_examples = [
    # Product Questions
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "What colors does the Widget Pro come in?"},
            {"role": "assistant", "content": "The Widget Pro is available in three colors:\n\n• **Midnight Black**\n• **Arctic White**\n• **Ocean Blue**\n\nAll colors are the same price ($49.99) and ship within 2 business days. Would you like me to check availability for a specific color?"}
        ]
    },
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "Is the Gadget Plus compatible with iPhone?"},
            {"role": "assistant", "content": "Yes! The Gadget Plus is fully compatible with all iPhones running iOS 14 or later. Key features:\n\n• Wireless connectivity via Bluetooth 5.0\n• Works with the TechCorp app (free on App Store)\n• Supports Apple Watch integration\n\nIs there a specific feature you'd like to know more about?"}
        ]
    },
    
    # Order Inquiries
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "Where is my order?"},
            {"role": "assistant", "content": "I'd be happy to help you track your order! To look it up, I'll need one of the following:\n\n• Your order number (starts with TC-)\n• The email address used for the order\n\nOnce you provide that, I can give you real-time tracking information. What's your order number?"}
        ]
    },
    
    # Returns/Refunds
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "I want to return my Widget Pro"},
            {"role": "assistant", "content": "I can help you with your return! Here's our process:\n\n**Return Policy**\n• 30-day money-back guarantee\n• Item must be in original packaging\n• Free return shipping on defective items\n\n**To Start Your Return**\n1. Log into your account at techcorp.com/returns\n2. Select the item to return\n3. Print your prepaid shipping label\n\nRefunds are processed within 5-7 business days after we receive the item. What's the reason for your return? I can check if there's anything we can do to help."}
        ]
    },
    
    # Edge Cases - Refusal
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "Can you help me hack into my ex's email?"},
            {"role": "assistant", "content": "I'm not able to help with that request, as it would involve unauthorized access to someone else's account.\n\nI'm here to help with TechCorp products and services. Is there anything I can assist you with regarding your TechCorp account or orders?"}
        ]
    },
    
    # Edge Cases - Off-topic
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "What's the weather like today?"},
            {"role": "assistant", "content": "I appreciate you reaching out! I specialize in TechCorp products and services, so I'm not the best resource for weather information.\n\nIs there anything I can help you with regarding your TechCorp products or orders today?"}
        ]
    },
    
    # Multi-turn conversation
    {
        "messages": [
            {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
            {"role": "user", "content": "my widget doesnt turn on"},
            {"role": "assistant", "content": "I'm sorry to hear you're having trouble with your Widget! Let's troubleshoot together.\n\nFirst, let's try a few quick steps:\n\n1. **Check the charge**: Connect it to power for at least 30 minutes\n2. **Force restart**: Hold the power button for 15 seconds\n3. **Check the cable**: Try a different charging cable if available\n\nDid any of these steps help?"},
            {"role": "user", "content": "tried all that, still nothing"},
            {"role": "assistant", "content": "I understand how frustrating that is. Since the basic troubleshooting didn't work, this sounds like it may need a replacement.\n\n**Good news**: If your Widget is under warranty (purchased within the last year), we can send you a replacement at no cost.\n\nTo proceed, I'll need:\n• Your order number or the email used for purchase\n• When you purchased it\n\nOnce I verify, I can have a replacement shipped within 24 hours. What's your order information?"}
        ]
    }
]

# Add more examples following the same pattern...
# You need at least 50 examples for good results

def save_training_data(examples: list, filename: str = "training.jsonl"):
    """Save examples in JSONL format."""
    with open(filename, 'w') as f:
        for example in examples:
            f.write(json.dumps(example) + '\n')
    print(f"Saved {len(examples)} examples to {filename}")

# Generate more examples programmatically
def generate_product_examples(products: list) -> list:
    """Generate product question examples."""
    examples = []
    
    for product in products:
        examples.append({
            "messages": [
                {"role": "system", "content": "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."},
                {"role": "user", "content": f"Tell me about the {product['name']}"},
                {"role": "assistant", "content": f"The **{product['name']}** is one of our most popular products!\n\n**Key Features**\n• {product['feature1']}\n• {product['feature2']}\n• {product['feature3']}\n\n**Price**: ${product['price']}\n\nWould you like me to check availability or answer any specific questions about it?"}
            ]
        })
    
    return examples

# Sample products
products = [
    {"name": "Super Tool", "price": "129.99", "feature1": "Professional-grade durability", "feature2": "Ergonomic design", "feature3": "5-year warranty"},
    {"name": "Mini Widget", "price": "29.99", "feature1": "Compact size", "feature2": "USB-C charging", "feature3": "All-day battery"},
    # Add more...
]

if __name__ == "__main__":
    # Combine all examples
    all_examples = training_examples + generate_product_examples(products)
    save_training_data(all_examples)
```

### Task 1.2: Validate Data Quality

```python
# File: validate_data.py

import json
import re
from collections import Counter

def validate_training_file(filepath: str) -> dict:
    """Validate training data quality."""
    
    stats = {
        "total_examples": 0,
        "valid_examples": 0,
        "issues": [],
        "avg_messages_per_example": 0,
        "avg_assistant_length": 0,
        "categories": Counter(),
    }
    
    assistant_lengths = []
    message_counts = []
    
    with open(filepath) as f:
        for i, line in enumerate(f, 1):
            try:
                example = json.loads(line)
                stats["total_examples"] += 1
                
                messages = example.get("messages", [])
                message_counts.append(len(messages))
                
                # Validate structure
                if len(messages) < 2:
                    stats["issues"].append(f"Line {i}: Too few messages")
                    continue
                
                # Check roles
                roles = [m.get("role") for m in messages]
                if roles[-1] != "assistant":
                    stats["issues"].append(f"Line {i}: Must end with assistant")
                    continue
                
                if "user" not in roles:
                    stats["issues"].append(f"Line {i}: Missing user message")
                    continue
                
                # Check content quality
                for msg in messages:
                    content = msg.get("content", "")
                    
                    if len(content) < 5:
                        stats["issues"].append(f"Line {i}: Very short content")
                    
                    if msg["role"] == "assistant":
                        assistant_lengths.append(len(content))
                        
                        # Check for formatting
                        if "?" not in content[-50:] and "help" not in content.lower()[-100:]:
                            stats["issues"].append(f"Line {i}: Assistant doesn't offer further help")
                
                stats["valid_examples"] += 1
                
            except json.JSONDecodeError:
                stats["issues"].append(f"Line {i}: Invalid JSON")
    
    stats["avg_messages_per_example"] = sum(message_counts) / len(message_counts) if message_counts else 0
    stats["avg_assistant_length"] = sum(assistant_lengths) / len(assistant_lengths) if assistant_lengths else 0
    stats["valid_percentage"] = stats["valid_examples"] / stats["total_examples"] * 100 if stats["total_examples"] else 0
    
    return stats


if __name__ == "__main__":
    stats = validate_training_file("training.jsonl")
    
    print("=== Training Data Validation ===")
    print(f"Total examples: {stats['total_examples']}")
    print(f"Valid examples: {stats['valid_examples']} ({stats['valid_percentage']:.1f}%)")
    print(f"Avg messages per example: {stats['avg_messages_per_example']:.1f}")
    print(f"Avg assistant response length: {stats['avg_assistant_length']:.0f} chars")
    
    if stats["issues"]:
        print(f"\n=== Issues ({len(stats['issues'])}) ===")
        for issue in stats["issues"][:10]:
            print(f"  • {issue}")
        if len(stats["issues"]) > 10:
            print(f"  ... and {len(stats['issues']) - 10} more")
```

---

## Part 2: Fine-Tuning (20 min)

### Task 2.1: Upload Training Data

```python
# File: fine_tune.py

from openai import OpenAI
import time

client = OpenAI()

def upload_training_file(filepath: str) -> str:
    """Upload training file to OpenAI."""
    
    with open(filepath, "rb") as f:
        response = client.files.create(
            file=f,
            purpose="fine-tune"
        )
    
    print(f"Uploaded file: {response.id}")
    return response.id


def create_fine_tune_job(file_id: str, suffix: str = "techcorp-support") -> str:
    """Create fine-tuning job."""
    
    job = client.fine_tuning.jobs.create(
        training_file=file_id,
        model="gpt-4o-mini-2024-07-18",
        hyperparameters={
            "n_epochs": 3,
            "batch_size": 1,
            "learning_rate_multiplier": 1.8,
        },
        suffix=suffix,
    )
    
    print(f"Created fine-tuning job: {job.id}")
    print(f"Status: {job.status}")
    
    return job.id


def monitor_job(job_id: str):
    """Monitor fine-tuning job progress."""
    
    while True:
        job = client.fine_tuning.jobs.retrieve(job_id)
        
        print(f"Status: {job.status}")
        
        if job.status == "succeeded":
            print(f"\n✓ Fine-tuning complete!")
            print(f"Model ID: {job.fine_tuned_model}")
            return job.fine_tuned_model
        
        elif job.status == "failed":
            print(f"\n✗ Fine-tuning failed: {job.error}")
            return None
        
        # Check for events
        events = client.fine_tuning.jobs.list_events(
            fine_tuning_job_id=job_id,
            limit=5
        )
        
        for event in reversed(list(events)):
            print(f"  [{event.created_at}] {event.message}")
        
        time.sleep(30)


if __name__ == "__main__":
    # Step 1: Upload
    file_id = upload_training_file("training.jsonl")
    
    # Step 2: Create job
    job_id = create_fine_tune_job(file_id)
    
    # Step 3: Monitor
    model_id = monitor_job(job_id)
    
    if model_id:
        print(f"\nYour fine-tuned model is ready: {model_id}")
```

---

## Part 3: Evaluation (25 min)

### Task 3.1: Compare Base vs Fine-Tuned

```python
# File: evaluate.py

from openai import OpenAI
import json

client = OpenAI()

# Your fine-tuned model ID (replace with actual)
FINE_TUNED_MODEL = "ft:gpt-4o-mini-2024-07-18:org::abc123"
BASE_MODEL = "gpt-4o-mini"

SYSTEM_PROMPT = "You are TechBot, TechCorp's customer support assistant. Be helpful, professional, and concise. Always end with an offer to help further."

TEST_CASES = [
    {
        "input": "What's your return policy?",
        "expected_elements": ["30 days", "money-back", "shipping", "help"],
    },
    {
        "input": "my gadget is broken",
        "expected_elements": ["troubleshoot", "warranty", "replacement", "sorry", "help"],
    },
    {
        "input": "Can you recommend stocks to invest in?",
        "expected_elements": ["TechCorp", "products", "services", "not able", "help"],
    },
    {
        "input": "What colors does Widget Pro come in?",
        "expected_elements": ["Black", "White", "Blue", "color", "help"],
    },
]


def get_response(model: str, user_input: str) -> str:
    """Get response from a model."""
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input},
        ],
        temperature=0.3,
    )
    return response.choices[0].message.content


def evaluate_response(response: str, expected_elements: list) -> dict:
    """Evaluate response quality."""
    
    response_lower = response.lower()
    
    hits = sum(1 for elem in expected_elements if elem.lower() in response_lower)
    
    return {
        "elements_found": hits,
        "elements_total": len(expected_elements),
        "score": hits / len(expected_elements),
        "has_offer_to_help": any(phrase in response_lower for phrase in 
                                  ["help you", "assist", "questions", "anything else"]),
        "length": len(response),
    }


def run_evaluation():
    """Run full evaluation comparing models."""
    
    results = {
        "base": {"scores": [], "help_offers": 0},
        "fine_tuned": {"scores": [], "help_offers": 0},
    }
    
    for test in TEST_CASES:
        print(f"\n{'='*60}")
        print(f"Input: {test['input']}")
        print("="*60)
        
        # Base model
        base_response = get_response(BASE_MODEL, test["input"])
        base_eval = evaluate_response(base_response, test["expected_elements"])
        results["base"]["scores"].append(base_eval["score"])
        results["base"]["help_offers"] += base_eval["has_offer_to_help"]
        
        print(f"\n--- Base Model ---")
        print(base_response[:300] + "..." if len(base_response) > 300 else base_response)
        print(f"Score: {base_eval['score']:.0%}")
        
        # Fine-tuned model
        ft_response = get_response(FINE_TUNED_MODEL, test["input"])
        ft_eval = evaluate_response(ft_response, test["expected_elements"])
        results["fine_tuned"]["scores"].append(ft_eval["score"])
        results["fine_tuned"]["help_offers"] += ft_eval["has_offer_to_help"]
        
        print(f"\n--- Fine-Tuned Model ---")
        print(ft_response[:300] + "..." if len(ft_response) > 300 else ft_response)
        print(f"Score: {ft_eval['score']:.0%}")
    
    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print("="*60)
    
    base_avg = sum(results["base"]["scores"]) / len(results["base"]["scores"])
    ft_avg = sum(results["fine_tuned"]["scores"]) / len(results["fine_tuned"]["scores"])
    
    print(f"Base Model Average: {base_avg:.0%}")
    print(f"Fine-Tuned Average: {ft_avg:.0%}")
    print(f"Improvement: {(ft_avg - base_avg) * 100:+.1f}%")
    
    print(f"\nHelp Offers - Base: {results['base']['help_offers']}/{len(TEST_CASES)}")
    print(f"Help Offers - Fine-Tuned: {results['fine_tuned']['help_offers']}/{len(TEST_CASES)}")


if __name__ == "__main__":
    run_evaluation()
```

---

## Part 4: Deployment (20 min)

### Task 4.1: Create Production Wrapper

```python
# File: deploy.py

from openai import OpenAI
from dataclasses import dataclass
from typing import Optional
import time

client = OpenAI()

@dataclass
class ModelConfig:
    model_id: str
    fallback_model: str
    max_tokens: int = 500
    temperature: float = 0.3


class TechCorpSupport:
    """Production-ready customer support using fine-tuned model."""
    
    def __init__(self, config: ModelConfig):
        self.config = config
        self.system_prompt = """You are TechBot, TechCorp's customer support assistant. 
Be helpful, professional, and concise. Always end with an offer to help further."""
    
    def get_response(self, user_message: str, conversation_history: list = None) -> str:
        """Get response with fallback and error handling."""
        
        messages = [{"role": "system", "content": self.system_prompt}]
        
        if conversation_history:
            messages.extend(conversation_history)
        
        messages.append({"role": "user", "content": user_message})
        
        # Try fine-tuned model first
        try:
            response = client.chat.completions.create(
                model=self.config.model_id,
                messages=messages,
                max_tokens=self.config.max_tokens,
                temperature=self.config.temperature,
            )
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Fine-tuned model error: {e}. Falling back...")
            
            # Fallback to base model
            try:
                response = client.chat.completions.create(
                    model=self.config.fallback_model,
                    messages=messages,
                    max_tokens=self.config.max_tokens,
                    temperature=self.config.temperature,
                )
                return response.choices[0].message.content
                
            except Exception as e2:
                print(f"Fallback also failed: {e2}")
                return "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact us at support@techcorp.com."


# Usage
config = ModelConfig(
    model_id="ft:gpt-4o-mini-2024-07-18:org::abc123",
    fallback_model="gpt-4o-mini",
)

support = TechCorpSupport(config)

# Single message
response = support.get_response("What's your return policy?")
print(response)

# Multi-turn conversation
history = [
    {"role": "user", "content": "my widget is broken"},
    {"role": "assistant", "content": "I'm sorry to hear that! Let's troubleshoot..."},
]

response = support.get_response("I already tried restarting it", history)
print(response)
```

---

## Evaluation Rubric

| Criteria | Points |
|----------|--------|
| 50+ quality training examples | 20 |
| Data validation passing | 15 |
| Fine-tuning job completed | 20 |
| Evaluation shows improvement | 25 |
| Production wrapper working | 20 |
| **Total** | **100** |

---

## Submission

1. Your `training.jsonl` file (or sample)
2. Validation output showing data quality
3. Fine-tuned model ID
4. Evaluation results comparing base vs. fine-tuned
5. Brief reflection on what worked and what could improve
