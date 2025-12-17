# Technical Decisions

## Candidate Information

| Field | Value |
|-------|-------|
| **Name** | |
| **Date Started** | |
| **Date Completed** | |
| **Total Time Spent** | |

---

## Summary

I built a full-stack project management application that supports Admin and Client roles, allowing users to manage projects and collaborate through comments. The system uses a NestJS backend with PostgreSQL and a Vite + React frontend, focusing on clean architecture, role-based access, and scalability.

---

## Technology Stack

### Backend

| Component | Choice | Why? |
|-----------|--------|------|
| Framework | NestJS | Opinionated structure, strong TypeScript support, dependency injection, and easy scalability |
| Database | PostgreSQL | Reliable relational database with strong consistency and relational modeling |
| ORM | TypeORM | Seamless NestJS integration, migrations support, and entity-based modeling |

### Frontend

| Component | Choice | Why? |
|-----------|--------|------|
| Framework | React (Vite) | Fast dev server, minimal boilerplate, excellent DX |
| State Management | React Context + React Query | Simple global auth state + efficient data fetching and caching |
| Styling | Tailwind CSS | Rapid UI development, consistent design system, responsive by default |

---

## Architecture Decisions

### Backend Structure

The backend is organized by feature modules (Auth, Users, Projects, Comments). Each module encapsulates its controllers, services, entities, and DTOs, following NestJS best practices and enforcing separation of concerns.

### Frontend Structure

The frontend is structured by domain and responsibility: pages (routes), components (reusable UI), context (auth), and services (API layer). Protected and role-based routes are handled at the routing level.

### Database Design

The schema is relational and normalized:
- Users can be admins or clients
- Projects belong to a client and have a creator
- Comments belong to projects and users  
Foreign keys, timestamps, and indexed columns are used to ensure integrity and performance.

---

## Security

Authentication is handled using JWT (access tokens stored in memory/localStorage). Authorization is enforced via role-based guards on the backend and protected routes on the frontend. Input validation is implemented using DTOs with class-validator.

---

## Challenges

The most challenging part was coordinating authentication, role-based access, and Docker networking across services. This was solved by clearly separating responsibilities, using environment-based configuration, and debugging container-to-container communication carefully.

---

## Trade-offs

With more time, I would add refresh tokens, better error boundaries on the frontend, and server-side caching (Redis). I would also improve test coverage with unit and e2e tests.

---

## Resources Used

- NestJS documentation  
- TypeORM documentation  
- PostgreSQL documentation  
- Tailwind CSS docs  
- React Router & React Query docs  
- ChatGPT (Generating UI Code from wireframes and debugging assistance)
- Windsurf (Code Consistency and debugging assistance)
