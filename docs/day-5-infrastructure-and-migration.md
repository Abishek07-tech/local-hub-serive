# Day 5 – Docker Compose, Environment Variables, Flyway & Initial Database Migration

This document records the **Day 5** infrastructure, environment variable, and Flyway database migration setup for **Local Living & Service Hub**.

---

## 1. What Was Configured

- **Docker Compose (`docker-compose.yml`):** Configured `postgres:16-alpine` with environment-driven database name/credentials, port `5432`, persistent volume `postgres_data`, `pg_isready` health check, and `unless-stopped` restart policy.
- **Environment Variables (`.env.example`):** Added template variables (`DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `DB_PORT`, `DB_URL`, `SERVER_PORT`). `.env` is excluded in `.gitignore` so secrets are never committed.
- **Flyway (`backend/pom.xml` & `application.properties`):** Added `spring-boot-starter-flyway` and `flyway-database-postgresql`. Enabled Flyway (`spring.flyway.enabled=true`, `classpath:db/migration`) and set `spring.jpa.hibernate.ddl-auto=validate`.
- **Initial Migration (`backend/src/main/resources/db/migration/V1__create_initial_schema.sql`):** Created foundational `roles`, `users`, and `user_roles` tables with `BIGINT GENERATED ALWAYS AS IDENTITY` primary keys, `UNIQUE` constraints, `TIMESTAMPTZ` timestamps, and seeded the four core roles (`CUSTOMER`, `OWNER`, `PROFESSIONAL`, `ADMIN`).

---

## 2. Verification Results

- **Flyway Migration & Spring Boot Startup:** **Passed** — `flyway_schema_history` created, `V1__create_initial_schema.sql` applied in `0.008s` (`now at version v1`), `Tomcat started on port 8080`, `Started BackendApplication in 2.464 seconds`.
- **Note on Docker:** `docker` CLI is not installed in the current environment, so `docker compose up -d` was not executed; `docker-compose.yml` is ready for use once Docker is installed.
