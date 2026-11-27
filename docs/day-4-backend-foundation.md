# Day 4 – Spring Boot, Maven, PostgreSQL & Application Configuration

This document records the **Day 4** backend foundation setup and verification for **Local Living & Service Hub**.

---

## 1. What Was Configured

- **Spring Boot & Java 21 (`backend/pom.xml`):** Configured with Spring Boot `4.2.0`, Java `21` release target, Maven Wrapper (`./mvnw`), and JAR packaging under `com.localhub`.
- **Maven Dependencies Added:**
  - `spring-boot-starter-webmvc` (Spring Web)
  - `spring-boot-starter-data-jpa` (Spring Data JPA & Hibernate)
  - `postgresql` (PostgreSQL JDBC Driver)
  - `spring-boot-starter-validation` (Bean Validation)
  - `spring-boot-starter-security` (Spring Security)
  - `spring-boot-devtools` (Development-only hot reload, `optional: true`)
- **Application Configuration (`backend/src/main/resources/application.properties`):**
  - Application name: `local-living-hub-backend`
  - Server port: `${SERVER_PORT:8080}`
  - PostgreSQL URL: `${DB_URL:jdbc:postgresql://localhost:5432/local_hub}`
  - Credentials via environment variables (`DB_USERNAME`, `DB_PASSWORD`) — no hardcoded secrets.
  - JPA settings: `spring.jpa.hibernate.ddl-auto=none`, `spring.jpa.show-sql=true`, `spring.jpa.open-in-view=false`.

---

## 2. Commands Executed

```bash
pg_isready
cd backend
./mvnw test-compile
DB_PASSWORD=<password> ./mvnw spring-boot:run
```

---

## 3. Verification Results

- **PostgreSQL Status:** `pg_isready` → `/var/run/postgresql:5432 - accepting connections`.
- **Maven Build:** `./mvnw test-compile` → **Passed** (`BUILD SUCCESS`).
- **Spring Boot + PostgreSQL Connection:** **Passed** — `HikariPool-1` connected to `jdbc:postgresql://localhost:5432/local_hub` (PostgreSQL `18.6`, `PostgreSQLDialect`), `Tomcat started on port 8080`, `Started BackendApplication in 2.192 seconds`.
- **Problem Encountered & Solution:** Initial startup failed with `Unable to determine Dialect without JDBC metadata` because `DB_PASSWORD` was empty and PostgreSQL TCP auth required a password. Setting the `postgres` password and passing `DB_PASSWORD` resolved it.
