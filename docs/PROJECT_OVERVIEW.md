# Project Overview

## 1. Project Identity

- **Project Name:** Local Living & Service Hub
- **Tagline:** *Find a home. Find trusted services. Manage your living.*
- **Product Direction:** Local Living Intelligence Platform
- **Project Status:** Product proposal and planning (initial documentation phase)

---

## 2. Project Vision

Local Living & Service Hub aims to connect people with the resources, properties, and service professionals they need to live comfortably and confidently.

Instead of treating property discovery, local service booking, and home maintenance as separate activities, the platform brings them together into one continuous local-living ecosystem built on the core philosophy: **Find + Trust + Manage**.

- **Find:** Discover suitable rental properties, neighbourhoods, and local service professionals.
- **Trust:** Evaluate property and service information through evidence, transparent pricing, and documented history.
- **Manage:** Coordinate bookings, track ongoing maintenance, and maintain a digital history of a home.

---

## 3. Problem Being Solved

Property discovery and local service management are currently fragmented across separate listing sites, messaging apps (such as WhatsApp), phone calls, and paper bills.

### Problems Faced by Home Seekers, Renters, and Residents
- **Unreliable Property Listings:** Listings are often already rented, unavailable, or inaccurate.
- **Unclear Rental Costs:** Listings highlight monthly rent while hiding security deposits, maintenance charges, brokerage, and parking fees.
- **Limited Property Trust:** Difficulty verifying whether an advertiser is authorized to list a property or whether details are accurate.
- **Poor Neighbourhood Understanding:** Lack of clear context on nearby hospitals, schools, transport, groceries, and commute.
- **Fragmented Rental Experience:** Discovery, communication, documents, and maintenance happen in disconnected channels.
- **Difficult Service Discovery & Unclear Pricing:** Finding reliable electricians, plumbers, or technicians is hard, and verbal quotations lead to misunderstandings.
- **No Maintenance History or Accountability:** No centralized record of past repairs, warranties, invoices, or documented evidence when a service goes wrong.

### Problems Faced by Property Owners, Landlords, and Brokers
- Difficulty managing listings and updating availability manually.
- Repeated enquiries for unavailable properties.
- Disorganized customer conversations and visit coordination.
- Limited tools for maintaining rental records and tenant maintenance requests.

### Problems Faced by Local Service Professionals
- Enquiries scattered across calls and messages, leading to lost requests.
- Difficulty managing availability, schedules, and ongoing jobs.
- Verbal quotations causing disputes and repeated status calls.
- Limited digital presence and no centralized customer service history.

---

## 4. Proposed Solution

Local Living & Service Hub provides a unified digital platform serving two primary user groups:

1. **Home Seekers, Renters, and Residents:** Search and compare rental properties, evaluate verification evidence, understand neighbourhoods, contact providers, discover nearby professionals, request services, approve quotations, track maintenance, and access authorized property records.
2. **Property and Service Providers:** Property owners, landlords, authorized brokers, independent professionals, and local service businesses can register accounts, publish listings or services, manage availability, receive enquiries, coordinate visits/appointments, issue quotations, manage jobs, and maintain records.

A single user may hold multiple permitted roles (for example, a property owner who also registers as a service provider).

---

## 5. Target Users & Initial Market

### Target Users
- **Demand Side:** Home seekers, tenants/renters, and residents.
- **Supply Side (Property):** Property owners, landlords, and authorized brokers.
- **Supply Side (Services):** Independent professionals (electricians, plumbers, carpenters, painters, cleaners, AC/appliance technicians) and local service businesses (business owners and staff).
- **Platform Operations:** Platform administrators.

### Initial Target Market
- **Coimbatore, Tamil Nadu, India** (initial launch market for validating the two-sided marketplace, local neighbourhoods, and service providers).

---

## 6. Three Main Pillars

| Pillar | Purpose | Core Capabilities |
| :--- | :--- | :--- |
| **1. Find a Place** | Property discovery and rental transparency | Search & filter properties, compare costs, view full rental cost breakdowns (rent, deposit, maintenance, brokerage), check availability freshness, explore neighbourhood facilities, and review property trust evidence. |
| **2. Find a Professional** | Local professional and service discovery | Register independent professionals and businesses, browse service categories and areas, view availability, request bookings, receive structured quotations, and track job progress. |
| **3. Manage Your Living** | Ongoing home and accountability management | Maintain a permission-based **Digital Home Passport** (appliances, repairs, warranties, invoices, reminders) and support accountability through documented agreements, before/after photos, and dispute workflows. |

---

## 7. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, React Hook Form, Zod, TanStack Query |
| **Backend** | Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, Bean Validation, Spring Mail, Spring Scheduler |
| **Database & Caching** | PostgreSQL (primary relational database), Redis (caching & coordination), Flyway (schema migrations) |
| **Storage & Infrastructure** | Amazon S3 (images & documents), Docker, Docker Compose, GitHub Actions (CI/CD), AWS, monitoring/logging tools |
| **Testing** | JUnit 5, Mockito, Spring Boot Test, Testcontainers, Playwright, Postman |
| **Future Intelligence (Later Phases)** | LLM integration, embeddings, vector search, geospatial search, data analytics, sensor integrations |

---

## 8. High-Level Architecture

The system is designed as a **Modular Monolith**:
- **Frontend:** Next.js + TypeScript web application serving customer, property owner, professional, and admin interfaces over HTTPS/REST.
- **Backend:** Single deployable Spring Boot API organized into logical domain modules (Auth, User, Role, Property, Property Search, Rental, Property Trust, Location, Neighbourhood, Professional, Service, Availability, Booking, Quote, Job, Home Passport, Invoice, Enquiry, Notification, Dispute, Admin, Audit).
- **Data & Storage:** PostgreSQL as the single source of truth, Redis for caching and coordination, and Amazon S3 for secure image and document storage.

---

## 9. Project Objectives

1. **Validate the Two-Sided Marketplace:** Conduct user interviews and onboard initial properties and professionals in Coimbatore.
2. **Deliver Generation 1 (MVP):** Launch a usable local-living marketplace covering property discovery, rental cost transparency, enquiries/visits, professional discovery, bookings, and basic admin moderation.
3. **Establish Trust & Operational Depth (Generation 2):** Add evidence-based verification, structured quotations with versioning, job tracking, photo/invoice evidence, complaints, and the Digital Home Passport.
4. **Ensure Engineering Quality:** Enforce resource-level authorization, explicit state transitions, transactional integrity, and automated testing.

---

## 10. Long-Term Direction (2030–2035)

As the platform matures through Generations 3 and 4, it aims to evolve into an intelligent local-living infrastructure:
- **Intelligent Discovery & Pricing:** Natural-language property search, explainable matching, duplicate/fraud detection, neighbourhood intelligence, and pricing analysis.
- **Predictive & Smart Maintenance:** Sensor integrations (water leakage, electricity, AC), automated maintenance reminders, and smart-home interoperability.
- **Accessibility & Privacy:** Tamil and English interfaces, voice-assisted search/requests, granular consent management, time-limited sharing, and downloadable user records.

---

## Related Documentation

- [REQUIREMENTS.md](./REQUIREMENTS.md) — Functional, non-functional, security, and infrastructure requirements.
- [FEATURES.md](./FEATURES.md) — Detailed feature catalogue organized by module.
- [USER_ROLES.md](./USER_ROLES.md) — System roles, business user types, and permissions.
- [USER_WORKFLOWS.md](./USER_WORKFLOWS.md) — Step-by-step user journeys.

