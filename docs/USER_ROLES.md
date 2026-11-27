# User Roles and Permissions

This document defines the four core system roles in **Local Living & Service Hub**, how they map to real-world business user types, and how authorization is enforced.

---

## 1. System Roles Overview

The backend enforces four primary system roles:

1. **`CUSTOMER`**
2. **`OWNER`**
3. **`PROFESSIONAL`**
4. **`ADMIN`**

A single user account may hold **multiple permitted roles** simultaneously (e.g., a property owner who also searches for services as a customer, or who also registers as a service professional).

---

## 2. Mapping Business User Types to System Roles

| Business User Type | System Role | Description |
| :--- | :--- | :--- |
| **Home Seeker** | `CUSTOMER` | Searches and compares rental properties, submits enquiries, and requests visits. |
| **Tenant / Renter** | `CUSTOMER` | Manages authorized rental/passport information and books local services. |
| **Resident** | `CUSTOMER` | Discovers local professionals, books services, and manages home maintenance. |
| **Property Owner** | `OWNER` | Publishes and manages their own property listings, availability, and records. |
| **Landlord** | `OWNER` | Manages rental properties, enquiries, visits, and tenant-authorized passport access. |
| **Authorized Broker** | `OWNER` | Manages property listings and enquiries on behalf of an owner (with authorization). |
| **Independent Professional** | `PROFESSIONAL` | Electricians, plumbers, carpenters, etc., managing their own profile, availability, quotes, and jobs. |
| **Service Business Owner** | `PROFESSIONAL` | Manages a local service business profile, operations, and staff assignments. |
| **Service Business Staff** | `PROFESSIONAL` | Performs permitted business operations and executes assigned jobs under a business profile. |
| **Platform Administrator** | `ADMIN` | Manages platform moderation, reports, verification workflows, and dispute reviews. |

> **Note on Brokers & Business Staff:** The source documents distinguish Authorized Brokers and Business Staff as business user types with specific resource-level permissions, without requiring separate top-level system roles. Their exact permissions are enforced via **resource-level and business-level authorization** in the backend.

---

## 3. Role Descriptions, Permissions & Restrictions

### 3.1 `CUSTOMER`
- **Responsibilities:** Discover properties and services, communicate honestly, approve quotations before work begins, and provide accurate problem descriptions.
- **Permissions:**
  - Search and compare property listings and rental costs.
  - Submit property enquiries and visit requests.
  - Search professionals and submit service booking requests.
  - Accept, reject, or request revisions on quotations (Gen 2+).
  - Approve or reject additional chargeable work (Gen 2+).
  - View authorized Digital Home Passport records (Gen 2+).
  - Submit complaints/disputes with evidence (Gen 2+).
- **Restricted Actions:** Cannot create or edit property listings they do not own, cannot publish professional service profiles without the `PROFESSIONAL` role, and cannot access admin moderation tools.

### 3.2 `OWNER`
- **Responsibilities:** Provide accurate property details, confirm rental costs, keep availability up to date, and coordinate visits.
- **Permissions:**
  - Create, update, and manage property listings and availability.
  - Upload property photos and verification/authorization evidence.
  - Receive and respond to property enquiries and visit requests.
  - Create and manage Digital Home Passports for their properties, including granting/revoking tenant access (Gen 2+).
- **Restricted Actions:** Cannot modify properties belonging to other owners without explicit authorization, cannot falsify verification status, and cannot access previous-tenant private data of other properties.

### 3.3 `PROFESSIONAL`
- **Responsibilities:** Maintain accurate skills and availability, provide transparent quotations, perform agreed work, and upload completion evidence.
- **Permissions:**
  - Create and manage professional or business profiles, skills, service areas, and availability.
  - Receive, accept, or reject service booking requests.
  - Create structured quotations and request additional-work approvals (Gen 2+).
  - Update job statuses, upload before/after photos, and issue invoices (Gen 2+).
- **Restricted Actions:** Cannot proceed with additional chargeable work without customer approval, cannot alter approved historical quote versions, and cannot access unrelated customer or property records.

### 3.4 `ADMIN`
- **Responsibilities:** Maintain platform trust, review verification evidence, moderate flagged content, and resolve disputes fairly.
- **Permissions:**
  - View and moderate flagged or suspicious property listings.
  - Review and approve/reject verification requests and evidence (Gen 2+).
  - Review and resolve customer/provider disputes and appeals (Gen 2+).
  - View system audit logs.
- **Restricted Actions:** Cannot fabricate verification evidence or alter immutable audit logs.

---

## 4. Resource Ownership & Authorization Rules

Role-based access control (RBAC) alone is not sufficient. The backend must enforce **resource-level authorization**:
- **Property-Level:** Only the owning `OWNER` (or an explicitly authorized broker) may edit a property, update its availability, or manage its Digital Home Passport.
- **Business-Level & Staff-Level:** A `PROFESSIONAL` business owner can manage staff permissions; staff members can only act on jobs assigned to them or permitted by their business.
- **Tenant Access:** A `CUSTOMER` renting a property can only view Digital Home Passport records explicitly granted to them, and access is revocable when they move out.

---

## 5. Examples of Multi-Role Users

1. **Owner + Customer:** A homeowner in Coimbatore lists a spare apartment as an `OWNER` while also using the platform as a `CUSTOMER` to book an AC technician for their own home.
2. **Professional + Customer:** An independent plumber registered as a `PROFESSIONAL` also uses the platform as a `CUSTOMER` to search for a rental house.
3. **Owner + Professional:** A landlord (`OWNER`) who also operates a local home-maintenance business (`PROFESSIONAL`).

