# Project Foundation (Day 2)

This document summarizes the **Day 2 – Project Foundation** setup for **Local Living & Service Hub**.

---

## 1. Completed Foundation

- **Frontend (`frontend/`):** Initialized with **Next.js** (App Router), **React**, **TypeScript**, **Tailwind CSS**, and **ESLint** using the `src/` directory and `@/*` import alias.
- **Backend (`backend/`):** Initialized with **Java 21**, **Spring Boot**, **Maven** (`mvnw` wrapper), **JAR** packaging, and package `com.localhub`. Includes Spring Web, Spring Data JPA, PostgreSQL Driver, Spring Security, and Validation.
- **Git & GitHub:** Root `.gitignore` configured to exclude `node_modules/`, `.next/`, `target/`, `*.class`, `.env*` (preserving `.env.example`), IDE files, and logs. Connected to `origin` (`https://github.com/Abishek07-tech/local-hub-serive.git`).

---

## 2. Setup & Verification Commands

### Frontend (`frontend/`)
```bash
cd frontend
npm install          # Install dependencies
npx tsc --noEmit     # Run TypeScript type check
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build check
```

### Backend (`backend/`)
```bash
cd backend
./mvnw test-compile  # Resolve dependencies and compile Java sources
./mvnw spring-boot:run # Start Spring Boot server (http://localhost:8080)
```

---

## 3. Related Documentation

- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md)
- [Backend_Scheme.md](./Backend_Scheme.md)

