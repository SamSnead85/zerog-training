---
description: How to onboard a new organization and users to ScaledNative
---

# Organization & User Onboarding Guide

## Role Hierarchy

| Role | Access Level |
|------|--------------|
| `SUPER_ADMIN` | Full platform access (only `sam.sweilem85@gmail.com`) |
| `ORG_ADMIN` | Full access within their organization |
| `MANAGER` | Can assign training, view team progress |
| `CREATOR` | Can create/edit training content |
| `LEARNER` | Can access assigned training only |

---

## Step 1: Create a New Organization

**Requires:** SUPER_ADMIN access

### Via API (Production)

```bash
curl -X POST https://scalednative.com/api/admin/organizations \
  -H "Content-Type: application/json" \
  -H "Cookie: <your_session_cookie>" \
  -d '{
    "name": "HealthPlan Services",
    "slug": "hps",
    "industry": "Healthcare",
    "tier": "ENTERPRISE"
  }'
```

**Response:**
```json
{
  "success": true,
  "organization": {
    "id": "clxxxxxxxxxx",
    "name": "HealthPlan Services",
    "slug": "hps"
  }
}
```

**Save the `organization.id`** - you'll need it for adding users.

---

## Step 2: Create an Org Admin for the New Organization

**Requires:** SUPER_ADMIN access

```bash
curl -X POST https://scalednative.com/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Cookie: <your_session_cookie>" \
  -d '{
    "email": "admin@healthplanservices.com",
    "name": "HPS Admin",
    "role": "ORG_ADMIN",
    "organizationId": "clxxxxxxxxxx",
    "sendWelcome": true
  }'
```

**Result:** 
- User created with auto-generated temporary password
- Welcome email sent with login credentials
- User can only access their organization's data

---

## Step 3: Add Learners to the Organization

The ORG_ADMIN (or SUPER_ADMIN) can now add team members.

### Option A: Create User Directly

```bash
curl -X POST https://scalednative.com/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Cookie: <session_cookie>" \
  -d '{
    "email": "john.smith@healthplanservices.com",
    "name": "John Smith",
    "role": "LEARNER",
    "organizationId": "clxxxxxxxxxx",
    "sendWelcome": true
  }'
```

### Option B: Send Email Invite

```bash
curl -X POST https://scalednative.com/api/admin/invite \
  -H "Content-Type: application/json" \
  -H "Cookie: <session_cookie>" \
  -d '{
    "email": "john.smith@healthplanservices.com",
    "organizationId": "clxxxxxxxxxx"
  }'
```

**Result:** User receives invite email with join link.

---

## Step 4: Assign Training Modules

```bash
curl -X POST https://scalednative.com/api/admin/assignments \
  -H "Content-Type: application/json" \
  -H "Cookie: <session_cookie>" \
  -d '{
    "userIds": ["user_id_1", "user_id_2"],
    "moduleIds": ["module-1", "module-2", "module-3"],
    "dueDate": "2025-02-15",
    "isRequired": true,
    "sendNotification": true
  }'
```

**Result:**
- Users get access to specified modules
- Assignment notification emails sent
- Progress tracking begins

---

## Access Control Summary

```
┌────────────────────────────────────────────────────────────┐
│                    SUPER_ADMIN                             │
│                  (sam.sweilem85@gmail.com)                 │
│            Full access to ALL organizations                │
└────────────────────────────────────────────────────────────┘
        │
        ├── Organization: HealthPlan Services (hps)
        │   ├── ORG_ADMIN: admin@hps.com
        │   ├── MANAGER: manager@hps.com
        │   └── LEARNER: john@hps.com, jane@hps.com
        │
        ├── Organization: Acme Corp (acme)
        │   ├── ORG_ADMIN: admin@acme.com
        │   └── LEARNER: user1@acme.com
        │
        └── (other organizations...)
```

**Key Points:**
- Users can ONLY see data from their own organization
- ORG_ADMINs can manage users within their org only
- SUPER_ADMIN is the only role with cross-org access
- All API queries are automatically scoped by organizationId

---

## Quick Reference: API Endpoints

| Endpoint | Method | Who Can Use | Purpose |
|----------|--------|-------------|---------|
| `/api/admin/organizations` | POST | SUPER_ADMIN | Create organization |
| `/api/admin/organizations` | GET | SUPER_ADMIN | List all organizations |
| `/api/admin/users` | POST | SUPER_ADMIN, ORG_ADMIN | Create user |
| `/api/admin/users` | GET | SUPER_ADMIN, ORG_ADMIN | List users (scoped) |
| `/api/admin/invite` | POST | SUPER_ADMIN, ORG_ADMIN | Send email invite |
| `/api/admin/assignments` | POST | SUPER_ADMIN, ORG_ADMIN, MANAGER | Assign training |
| `/api/admin/progress` | GET | SUPER_ADMIN, ORG_ADMIN, MANAGER | View progress |
