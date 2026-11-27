# Technical Requirements

This document defines the complete technology stack, architectural responsibilities, integration flow, and technical constraints for **Local Living & Service Hub**.

---

## 1. Technical Architecture

- **Overall Architecture:** **Modular Monolith** with a decoupled frontend and backend communicating over HTTPS/REST.
- **Modular Monolith Backend:** A single deployable Java Spring Boot application organized into logical domain modules (`auth`, `user`, `property`, `listing`, `rental`, `location`, `enquiry`, `booking`, `admin`, `audit`, and future modules such as `quote`, `job`, `home-passport`, `dispute`).
- **Component Responsibilities:**
  - **Frontend (Next.js + TypeScript):** Renders public discovery pages, role-specific dashboards, forms, client-side validation, and server-state caching.
  - **Backend (Spring Boot):** Enforces authentication, RBAC + resource-level authorization, business rules, state transitions, and transactional persistence.
  - **Database & Cache (PostgreSQL + Redis):** PostgreSQL acts as the single source of truth; Redis handles caching and selected coordination tasks.
  - **Storage & Infrastructure (Amazon S3 + Docker + AWS):** S3 stores images and documents; Docker/Compose standardizes local environments; AWS hosts production services.

---

## 2. Frontend Technologies

| Technology | What It Is | Why Used | Where Used | Responsibilities & Interactions |
| :--- | :--- | :--- | :--- | :--- |
| **Next.js** | React full-stack web framework | App Router, SSR/CSR flexibility, clean route organization | `frontend/src/app/` (`(public)`, `(auth)`, `customer`, `owner`, `professional`, `admin`) | Routing, layouts, page rendering, and serving the web UI. |
| **React** | Component-based UI library | Reusable UI composition and state management | `components/`, `features/`, `providers/` | Renders interactive views, dashboards, and forms. |
| **TypeScript** | Statically typed JavaScript | Catch type errors early and align API DTOs | Entire `frontend/src/` codebase | Enforces type safety across `types/`, `services/`, and `features/`. |
| **Tailwind CSS** | Utility-first CSS framework | Rapid, consistent responsive styling | `globals.css` and all UI components | Styles layouts, forms, cards, and responsive dashboards. |
| **React Hook Form** | Performant form state library | Minimal re-renders and clean form handling | Property, enquiry, booking, and auth forms | Manages form inputs, submission state, and error display. |
| **Zod** | TypeScript-first schema validation | Shared, type-safe client validation | `features/` and `components/forms/` | Validates form payloads before sending requests to the backend. |
| **TanStack Query** | Server-state & data-fetching library | Caching, background refetching, loading/error states | `services/` and `hooks/` | Manages REST API calls, cache invalidation, and optimistic/synced UI updates. |

---

## 3. Backend Technologies

| Technology | Purpose & Responsibilities | Integration |
| :--- | :--- | :--- |
| **Java (LTS)** | Primary backend language providing strong typing, concurrency, and ecosystem maturity. | Runs the Spring Boot application (exact LTS version to be finalized in Phase 1). |
| **Spring Boot** | Core application framework for dependency injection, auto-configuration, and embedded web server. | Hosts all domain modules and exposes `/api/v1/**` REST endpoints. |
| **Spring Security** | Authentication (JWT + refresh tokens) and authorization (RBAC + resource-level checks). | Intercepts incoming HTTP requests before they reach controllers. |
| **Spring Data JPA** | Repository abstraction reducing boilerplate for PostgreSQL queries and pagination. | Connects service-layer business logic to PostgreSQL via Hibernate. |
| **Hibernate** | JPA ORM provider mapping Java entities to relational tables and managing dirty checking. | Executes SQL against PostgreSQL within Spring-managed transactions. |
| **Maven** | Build automation and dependency management (`pom.xml`, `./mvnw`). | Compiles Java code, runs tests, and packages the deployable artifact. |
| **Bean Validation** | Declarative request DTO validation (`@NotNull`, `@Size`, etc.). | Validates incoming controller payloads before service execution. |
| **REST APIs** | Versioned HTTP/JSON endpoints (`/api/v1/...`) for stateless client-server communication. | Bridges the Next.js frontend and Spring Boot backend. |
| **Spring Mail & Scheduler** | Email notifications and scheduled background tasks (e.g., listing freshness reminders). | Runs asynchronously with retry and idempotency support. |

---

## 4. Database Technologies

- **PostgreSQL:** Primary relational database and single source of truth. Enforces foreign-key integrity, unique constraints, indexes, and ACID transactions.
- **Flyway:** Versioned database migration tool (`backend/src/main/resources/db/migration/`). Ensures schema changes are repeatable and tracked across environments.
- **Redis:** In-memory store used for caching frequently accessed discovery data and selected coordination tasks.
- **Transaction Management:** Spring `@Transactional` boundaries wrap multi-step operations (such as booking creation or status transitions) to prevent partial writes and race conditions.

---

## 5. Infrastructure and DevOps

- **Docker:** Containerizes backend, frontend, and supporting services for consistent execution.
- **Docker Compose:** Orchestrates local development services (`docker-compose.yml`), including PostgreSQL and Redis.
- **Git & GitHub:** Version control and collaborative code hosting.
- **GitHub Actions:** CI/CD pipelines (`.github/workflows/`) for automated builds, tests, and deployments.
- **AWS & Amazon S3:** Cloud hosting environment for production compute, managed database/cache, and S3 object storage for property photos, repair images, and documents.

---

## 6. Testing Technologies

| Test Type | Specified Tool(s) | Scope |
| :--- | :--- | :--- |
| **Backend Unit Testing** | **JUnit 5**, **Mockito** | Domain logic, state transitions, and service-layer rules. |
| **Repository & DB Integration** | **Spring Boot Test**, **Testcontainers** | Real PostgreSQL queries, Flyway migrations, and transaction boundaries. |
| **API Testing** | **Postman** | REST endpoint contracts, status codes, and payload validation. |
| **End-to-End Testing** | **Playwright** | Critical user journeys across frontend and backend. |
| **Frontend Component Testing** | *Decision to finalize* | Not specified in source documents (to be selected during frontend setup). |
| **Security Testing** | *Decision to finalize* | Auth/RBAC/ownership tests via Spring Boot Test; dedicated security scanning tools to be finalized. |

---

## 7. Complete Technology Integration

```text
User → Next.js (React + TypeScript + Tailwind)
     → Form Validation (React Hook Form + Zod)
     → API Client (TanStack Query over HTTPS / REST)
     → Spring Boot Controller (Spring Security JWT Auth + Bean Validation)
     → Service Layer (Business Logic + Resource-Level Authorization + @Transactional)
     → Spring Data JPA / Hibernate
     → PostgreSQL (Source of Truth) / Redis (Cache) / S3 (Media)
     → JSON API Response
     → TanStack Query Cache Update → Frontend UI Re-render
```

- **Authentication & Authorization:** Handled at the Spring Security filter chain (JWT) and enforced at the service layer (resource ownership).
- **Validation:** Client-side in Zod/React Hook Form; server-side in Bean Validation.
- **Caching:** Redis on the backend; TanStack Query on the frontend.
- **Error Handling:** Centralized exception handling in Spring Boot (`common/`) returning structured HTTP errors to TanStack Query.

---

## 8. Technology Responsibility Matrix

| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **UI & Routing** | Next.js, React, TypeScript, Tailwind CSS | Pages, dashboards, components, type safety, responsive styling |
| **Client State & Forms** | TanStack Query, React Hook Form, Zod | API caching, form state, client-side schema validation |
| **API & Security** | Spring Boot, Spring Security, Bean Validation | REST endpoints, JWT auth, RBAC, request validation |
| **Business & Data Access** | Java, Spring Data JPA, Hibernate | Domain modules, transactions, ORM mapping |
| **Database & Cache** | PostgreSQL, Flyway, Redis | Relational persistence, schema migrations, caching |
| **Storage & Infra** | Amazon S3, Docker, Docker Compose, GitHub Actions, AWS | Media storage, local containers, CI/CD, cloud hosting |
| **Testing** | JUnit 5, Mockito, Spring Boot Test, Testcontainers, Playwright, Postman | Unit, integration, API, and E2E verification |

---

## 9. Environment and Configuration

- **Prerequisites:** Java LTS, Maven, Node.js LTS, npm, Docker, Docker Compose, Git.
- **Configuration:**
  - Backend: `backend/src/main/resources/application.yml` (database URL, Redis, JWT, S3, mail settings via environment variables).
  - Local Services: `docker-compose.yml` and `.env.example` (template for local environment variables; no real secrets committed).

---

## 10. Technical Decisions and Constraints

1. **Modular Monolith over Microservices:** Keeps deployment simple while maintaining clean domain boundaries.
2. **PostgreSQL as Source of Truth:** Ensures strong relational integrity and ACID transactions.
3. **Clear Frontend/Backend Separation:** Next.js communicates exclusively via versioned REST APIs (`/api/v1/...`).
4. **Security by Design:** Backend-enforced RBAC + resource-level ownership validation.
5. **No Unnecessary Technologies or Premature Complexity:** AI/LLM, vector search, and sensor integrations are deferred to Generations 3–4.

---

## Related Documentation

- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- [REQUIREMENTS.md](./REQUIREMENTS.md)
- [APPLICATION_FLOW.md](./APPLICATION_FLOW.md)

