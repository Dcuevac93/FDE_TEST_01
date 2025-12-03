# Technical Assessment - Forward Deployed Software Engineer

## Overview

This assessment evaluates your ability to build production-ready software while demonstrating the problem-solving mindset required for a Forward Deployed Software Engineer (FDE) role.

**Time Limit:** 48 hours

**What we're looking for:**
- Build a functional full-stack application
- Make pragmatic technical decisions
- Set up containerized development environment
- Communicate decisions clearly

---

## The Scenario

A client runs a small consulting firm and needs a **Client Portal** to manage their projects and communicate with customers.

### Client's Request (verbatim)

> "We need a portal where our clients can log in and see their projects. They should be able to see what we're working on and leave comments. Our team needs to manage everything. It should work on phones too."

---

## Core Features

### 1. Authentication & Authorization
- User registration and login
- Two roles: **Admin** (consulting team) and **Client**
- JWT-based authentication
- Role-based access control (Admins see all, Clients see only their projects)

### 2. Project Management
- **Admin:** Create, read, update, delete projects
- **Admin:** Assign projects to clients
- **Admin:** Set project status: `active`, `completed`, `on-hold`
- **Client:** View assigned projects only

### 3. Comments
- Add comments to projects
- Both Admin and Client can comment
- View comment history on projects

### 4. Dashboard
- **Admin:** Overview of all projects by status
- **Client:** List of their assigned projects

### 5. Mobile Responsive
- All views functional on mobile devices

---

## Technical Requirements

### Backend
- **Runtime:** Node.js (v18+) or Python (3.10+)
- **Framework:** Express.js, Fastify, NestJS, FastAPI, or Django
- **Database:** PostgreSQL or MongoDB
- **Documentation:** Swagger/OpenAPI at `/api/docs`

### Frontend
- **Framework:** React, Vue.js, or Next.js
- **Language:** TypeScript preferred (JavaScript acceptable)
- **Styling:** Your choice (Tailwind CSS recommended)

### Infrastructure
- **Docker Compose** for local development
- Application must start with: `docker-compose up`

---

## Analysis Task

Answer these questions in `ANALYSIS.md` (keep responses concise):

1. **What are the two main performance bottlenecks** in your implementation? How would you address them?

2. **The client asks:** *"Can we add real-time updates so clients see new comments without refreshing?"* — Describe your recommended approach and why.

---

## Evaluation Criteria

| Criterion | Weight |
|-----------|--------|
| **Functionality** | 30% |
| **Code Quality** | 25% |
| **Architecture** | 20% |
| **Docker Setup** | 15% |
| **Documentation & Analysis** | 10% |

### Bonus Points (up to +20%)
- Test coverage (+10%)
- Production deployment with live URL (+5%)
- CI/CD pipeline (+5%)

---

## Deliverables

1. **Source Code** — Working implementation
2. **README.md** — Updated with setup instructions
3. **TECHNICAL_DECISIONS.md** — Key decisions explained
4. **ANALYSIS.md** — Responses to analysis questions
5. **docker-compose.yml** — One-command local setup

### Submission
1. Fork this repository
2. Create branch: `submission/{your-full-name}`
3. Complete implementation
4. Open a Pull Request

---

## Getting Started

```bash
git clone <repo-url>
cd FDE_TEST_01

# After implementation:
docker-compose up
```

---

## Questions?

Make reasonable assumptions and document them. This mirrors real FDE work.

---

Good luck!
