# Requirements

This document defines the requirements for **Local Living & Service Hub**, clearly distinguishing **Initial Implementation (Generation 1 / MVP)** from **Future Capabilities (Generations 2–4)**.

---

## 1. Functional Requirements

### 1.1 Initial Implementation (Generation 1 — MVP)
- **Authentication & Accounts:** Users can register, log in, manage profiles, and hold one or more permitted roles (`CUSTOMER`, `OWNER`, `PROFESSIONAL`, `ADMIN`).
- **Property Management:** Owners/landlords/authorized brokers can create property listings with photos, amenities, availability status, and full rental cost breakdowns.
- **Property Discovery:** Customers can search and filter properties by locality, monthly rent, property type, bedrooms, amenities, and availability.
- **Rental Cost Transparency:** Listings must display monthly rent, maintenance charges, security deposit, brokerage, estimated monthly cost, and initial payment.
- **Property Enquiries & Visits:** Customers can send enquiries and request property visits; providers can view and coordinate them.
- **Professional Profiles & Discovery:** Independent professionals and service businesses can register, define skills, service categories, service areas, and availability. Customers can search by service and locality.
- **Service Bookings:** Customers can submit service requests; professionals can accept, reject, or request more details and confirm appointments.
- **Admin & Moderation:** Admins can moderate listings, review reports, and manage platform operations.
- **Notifications & Audit:** System sends core notifications (enquiries, visits, bookings) and records basic audit logs.

### 1.2 Future Capabilities (Generations 2–4)
- **Generation 2 (Trust & Operations):** Evidence-based property verification, listing freshness reconfirmation, structured quotations with versioning, customer quote approval, job status tracking, before/after photo evidence, digital invoices, complaint/dispute workflows, and the Digital Home Passport.
- **Generation 3 (Intelligence):** Natural-language AI property search, property recommendations, duplicate/suspicious listing detection, neighbourhood intelligence (hospitals, schools, commute), intelligent scheduling, pricing analysis, and Tamil/English voice assistance.
- **Generation 4 (Living Infrastructure):** Predictive maintenance, smart-home and sensor integrations, and privacy-preserving intelligence.

---

## 2. Non-Functional Requirements

- **Usability:** Clean, responsive web interface accessible on desktop and mobile browsers. Future support for Tamil and English interfaces and voice assistance.
- **Maintainability:** Modular monolith architecture with clear domain boundaries so modules can evolve without premature microservices complexity.
- **Auditability:** Important system activities (price changes, status changes, approvals, verification events) must be recorded in immutable history/audit logs.
- **Privacy by Design:** Minimal data exposure; previous-tenant personal information must never be exposed in property records.

---

## 3. Business Rules

1. **Cost Transparency:** All rental cost values (rent, deposit, maintenance, brokerage) must be supplied or confirmed by the relevant provider; illustrative values must never be presented as actual charges.
2. **Verification Honesty:** Identity verification of an advertiser does not establish legal property ownership. The platform must clearly communicate what has and has not been checked.
3. **Listing Freshness:** Listings must display their last-confirmed date; stale listings must be flagged and periodically reconfirmed.
4. **Quotation Approval (Gen 2+):** Work begins only after scope and charges are agreed upon. Any additional chargeable work requires explicit customer approval before proceeding.
5. **Home Passport Privacy (Gen 2+):** The Digital Home Passport is a property lifecycle record, not a public record of past residents. Access is permission-based and revocable.
6. **Platform Boundaries:** The initial platform is not a banking/escrow system, legal title certification authority, general e-commerce site, or smart-home hardware manufacturer.
7. **Generation Gating:** Do not begin the next generation until the current generation demonstrates real user value.

---

## 4. Security Requirements

- **Authentication:** Secure password hashing, JWT-based authentication, refresh-token strategy, and secure session handling.
- **Authorization:** Backend-enforced Role-Based Access Control (RBAC) combined with resource-level ownership validation (e.g., property-level, business-level, and staff-level permissions).
- **Transport & Data Protection:** HTTPS everywhere, input validation, rate limiting, secret management, and secure file uploads.
- **Document Security:** Controlled, time-limited access to sensitive property documents, invoices, and verification evidence.

---

## 5. Data and Database Requirements

- **Primary Database:** PostgreSQL as the single source of truth, managed via Flyway schema migrations.
- **Caching:** Redis for caching and selected coordination tasks.
- **Object Storage:** Amazon S3 for images, repair photographs, invoices, and property documents.
- **Integrity & Concurrency:** Foreign-key constraints, unique constraints, appropriate indexes, database transactions, and concurrency protection (e.g., preventing double-booking of limited service capacity).
- **History & Retention:** Timestamp tracking, immutable historical records where required (e.g., quote versions, audit logs, status events), and data-retention/backup policies.

---

## 6. API Requirements

- **Style:** Versioned REST APIs under `/api/v1/` (e.g., `/api/v1/auth`, `/api/v1/properties`, `/api/v1/professionals`, `/api/v1/bookings`, `/api/v1/admin`).
- **Validation:** Server-side request validation using Bean Validation, paired with client-side schema validation (Zod + React Hook Form).
- **Contracts:** Explicit HTTP status codes, consistent error responses, and clear separation between public discovery endpoints and authenticated/authorized endpoints.

---

## 7. Performance and Reliability Requirements

- **Caching:** Use Redis to reduce database load for frequently accessed discovery data.
- **Background Processing:** Scheduled tasks (Spring Scheduler) and asynchronous notifications (Spring Mail / external integrations) must support retries and idempotency so updates are not lost.
- **Concurrency:** Booking and availability updates must handle concurrent requests safely without race conditions.

---

## 8. Testing Requirements

- **Unit Testing:** JUnit 5 and Mockito for domain logic and state transitions.
- **Integration Testing:** Spring Boot Test with Testcontainers (PostgreSQL) to verify database queries, transactions, and authorization boundaries.
- **API Testing:** Postman collections/tests for endpoint verification.
- **End-to-End Testing:** Playwright for critical user journeys.
- **Critical Test Scenarios:** Concurrent booking requests, invalid state transitions, unauthorized resource access, and data isolation.

---

## 9. Deployment and Infrastructure Requirements

- **Local Development:** Docker and Docker Compose for running PostgreSQL, Redis, and local services.
- **CI/CD:** GitHub Actions for automated build, test, and deployment pipelines.
- **Cloud Hosting:** AWS for application hosting, PostgreSQL, Redis, and S3 object storage.
- **Observability:** Application monitoring, centralized logging, and backup/recovery procedures.

---

## 10. Ambiguities / Open Decisions in Source Documents

- **License:** Not yet decided; must be selected before public distribution.
- **Exact Java & Node.js LTS Versions:** Source specifies "Java LTS version supported by the selected Spring Boot release" and "Node.js LTS" — exact versions to be finalized during Phase 1 setup.
- **Rental Agreement Completion:** Source notes home seekers "complete the rental process outside or through supported integrations" — whether in-app digital rental agreements will be built in Gen 2 or remain external is not yet specified.

