# Day 3 – Frontend Configuration & Conventions

This document records the **Day 3** frontend configuration, folder conventions, and verification results for **Local Living & Service Hub**.

---

## 1. What Was Configured

- **Package Metadata (`frontend/package.json`):** Updated package name from `frontend-tmp` to `local-living-hub-frontend`.
- **Next.js (`frontend/next.config.ts`):** Verified App Router (`src/app/`), `cacheComponents: true`, `partialPrefetching: true`, and `@tailwindcss/turbopack` loader. No unnecessary changes made.
- **TypeScript (`frontend/tsconfig.json`):** Verified `"strict": true` and `@/*` path alias pointing to `./src/*`.
- **Tailwind CSS (`frontend/src/app/globals.css`):** Configured Tailwind v4 `@theme` design tokens for primary/secondary colors, surface/background/foreground, muted/border/status colors, and system sans-serif typography.
- **Folder Conventions:** Added `src/components/shared/` and `src/styles/` alongside existing `src/components/ui/`, `src/features/`, `src/hooks/`, `src/lib/`, and `src/types/`.

---

## 2. Folder Structure & Responsibilities

| Folder | Responsibility |
| :--- | :--- |
| `src/app/` | Next.js App Router pages, route groups (`(public)`, `(auth)`), and role dashboards (`customer`, `owner`, `professional`, `admin`). |
| `src/components/ui/` | Low-level, reusable UI primitives (buttons, inputs, badges, modals). |
| `src/components/shared/` | Cross-feature composite components (navbar, footer, empty states). |
| `src/features/` | Domain-specific components and logic (`properties`, `listings`, `bookings`, etc.). |
| `src/hooks/` | Shared custom React hooks. |
| `src/lib/` | Utility functions, formatters, and helpers. |
| `src/types/` | Shared TypeScript interfaces and type definitions. |
| `src/styles/` | Additional modular CSS/theme files if needed beyond `globals.css`. |

---

## 3. Frontend Conventions

- **Component & File Naming:** `PascalCase.tsx` for React components; `camelCase.ts` for hooks (`use*.ts`), utilities, and services.
- **TypeScript:** Strict mode enabled; avoid `any`; prefer `interface` for object shapes and `type` for unions.
- **Imports:** Always use `@/*` path aliases for cross-folder imports.
- **Styling:** Use Tailwind CSS utility classes and `@theme` tokens from `globals.css`; avoid inline styles.

---

## 4. Verification Results

Executed in `frontend/`:
- `npx tsc --noEmit` — **Passed** (0 errors)
- `npm run build` — **Passed** (compiled and generated static routes)
- `npm run lint` — **Passed** (0 ESLint errors)
