"""
RAG Pipeline Starter Code - Sample Documents

These are sample documents for testing your RAG pipeline.
Create a sample_docs/ folder and save these as separate files.
"""

# =========== user_guide.md ===========
USER_GUIDE = """
# User Guide

## Getting Started

Welcome to our platform! This guide will help you get up and running.

### Account Setup

1. Visit our website at https://example.com
2. Click "Sign Up" in the top right corner
3. Enter your email and create a password
4. Verify your email address

### Password Requirements

Your password must:
- Be at least 12 characters long
- Contain at least one uppercase letter
- Contain at least one number
- Contain at least one special character

### Resetting Your Password

If you've forgotten your password:

1. Go to the login page
2. Click "Forgot Password"
3. Enter your email address
4. Check your inbox for a reset link (valid for 24 hours)
5. Create a new password following the requirements above

### Two-Factor Authentication

We strongly recommend enabling 2FA for additional security:

1. Go to Settings > Security
2. Click "Enable 2FA"
3. Scan the QR code with your authenticator app
4. Enter the verification code

## Managing Your Account

### Profile Settings

Update your profile information:
- Display name
- Profile picture
- Contact preferences
- Notification settings

### Privacy Controls

Control who can see your information:
- Public profile: visible to everyone
- Private profile: visible only to connections
- Hidden profile: visible only to you

## Getting Help

If you need assistance:
- Check our FAQ at /faq
- Email support@example.com
- Live chat available 9am-6pm EST
"""

# =========== api_reference.md ===========
API_REFERENCE = """
# API Reference

## Overview

Our REST API allows you to programmatically interact with our platform.

Base URL: `https://api.example.com/v1`

## Authentication

All API requests require authentication using an API key.

Include your key in the header:
```
Authorization: Bearer YOUR_API_KEY
```

### Getting an API Key

1. Log in to your account
2. Go to Settings > API Keys
3. Click "Generate New Key"
4. Copy and securely store your key

## Rate Limits

To ensure fair usage, we enforce the following rate limits:

| Plan | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| Free | 60 | 1,000 |
| Pro | 300 | 10,000 |
| Enterprise | 1,000 | 100,000 |

When you exceed a rate limit, you'll receive a `429 Too Many Requests` response.

## Endpoints

### GET /users/{id}

Retrieve user information.

**Parameters:**
- `id` (required): User ID

**Response:**
```json
{
  "id": "usr_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### POST /projects

Create a new project.

**Request Body:**
```json
{
  "name": "My Project",
  "description": "Project description",
  "visibility": "private"
}
```

### DELETE /projects/{id}

Delete a project. This action cannot be undone.

## Error Handling

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Rate Limited - Slow down |
| 500 | Server Error - Contact support |
"""

# =========== faq.md ===========
FAQ = """
# Frequently Asked Questions

## Account & Billing

### How do I cancel my subscription?

To cancel your subscription:
1. Go to Settings > Billing
2. Click "Cancel Subscription"
3. Follow the prompts to confirm

Note: You'll retain access until the end of your billing period.

### Can I get a refund?

We offer full refunds within 14 days of purchase. Contact support@example.com with your order number.

### How do I update my payment method?

1. Go to Settings > Billing
2. Click "Payment Methods"
3. Add a new card or update existing

## Technical Issues

### Why can't I log in?

Common causes:
- Incorrect password (try resetting it)
- Account not verified (check your email)
- Account suspended (contact support)

### The page isn't loading

Try these steps:
1. Clear your browser cache
2. Try a different browser
3. Check your internet connection
4. Disable browser extensions

### My data seems to be missing

Don't panic! Your data is likely safe. Try:
1. Log out and log back in
2. Check if you're in the right workspace
3. Contact support if the issue persists

## Features

### Do you support mobile devices?

Yes! We have native apps for:
- iOS (iPhone & iPad)
- Android

Download from the App Store or Google Play.

### Can I integrate with other tools?

We offer integrations with:
- Slack
- Google Workspace
- Microsoft 365
- Jira
- GitHub
- And many more via Zapier

### Is my data secure?

Absolutely. We use:
- AES-256 encryption at rest
- TLS 1.3 in transit
- SOC 2 Type II certified
- GDPR compliant

## Getting Help

### How do I contact support?

- Email: support@example.com
- Live chat: Available 9am-6pm EST
- Phone: 1-800-EXAMPLE (Enterprise only)

Average response time: 2 hours for email, instant for chat.
"""


def create_sample_docs():
    """Create sample documentation files."""
    import os
    
    docs_dir = "sample_docs"
    os.makedirs(docs_dir, exist_ok=True)
    
    files = {
        "user_guide.md": USER_GUIDE,
        "api_reference.md": API_REFERENCE,
        "faq.md": FAQ
    }
    
    for filename, content in files.items():
        filepath = os.path.join(docs_dir, filename)
        with open(filepath, 'w') as f:
            f.write(content.strip())
        print(f"Created: {filepath}")


if __name__ == "__main__":
    create_sample_docs()
