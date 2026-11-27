# Feature Catalogue

This document catalogues all features of **Local Living & Service Hub**, organized into 11 modules. Each feature clearly indicates whether it belongs to the **Initial Implementation (Generation 1 — MVP)** or **Future Capabilities (Generations 2–4)**.

> **Note:** No features listed here are implemented yet; the project is currently in the planning and documentation phase.

---

## 1. Authentication and User Management

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **User Registration & Login** | Allow users to create and access accounts securely. | Register with email/credentials, log in, log out. | Hashes passwords, issues JWT and refresh tokens, establishes session. | One account can hold multiple permitted roles. | **Initial (Gen 1)** |
| **Profile & Role Management** | Manage personal details and active roles. | Update profile info; view assigned roles. | Enforces RBAC and resource-level ownership on every request. | Backend must validate exact resource and permitted action. | **Initial (Gen 1)** |

---

## 2. Property Management

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Property Creation & Profiles** | Register physical homes and their details. | Add property details, bedrooms, type, amenities, and photos. | Stores property data in PostgreSQL and images in S3. | Only owners, landlords, or authorized brokers can manage a property. | **Initial (Gen 1)** |
| **Availability Management** | Keep property status accurate. | Set status (`Available`, `Rented`, `Temporarily Unavailable`, `Visit Requested`). | Updates listing visibility and records `last-confirmed` date. | Stale listings must be flagged for periodic reconfirmation. | **Initial (Gen 1)** (Freshness automation in **Gen 2**) |
| **Property Trust & Evidence** | Build confidence in listing accuracy. | Submit identity and authorization evidence. | Tracks verification requests, evidence expiration, and review history. | Identity verification does not establish legal property ownership. | **Future (Gen 2)** |

---

## 3. Property Listing and Discovery

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Structured Property Search** | Help home seekers find suitable rentals. | Filter by locality, monthly rent, property type, bedrooms, amenities, availability. | Queries indexed PostgreSQL data and returns matching listings. | Customers can discover properties without paid subscriptions. | **Initial (Gen 1)** |
| **Property Comparison** | Help users evaluate options side by side. | Select multiple properties to compare rent, deposit, amenities, and location. | Displays standardized comparison view. | Only confirmed provider data is shown. | **Initial (Gen 1)** |
| **Neighbourhood Intelligence** | Provide context on surrounding facilities. | View nearby hospitals, schools, colleges, groceries, transport, and commute. | Surfaces locality and nearby-place data. | Must rely on reliable public/verified data. | **Future (Gen 3)** |
| **Natural-Language AI Search** | Simplify search using plain language. | Enter queries like *"2BHK under ₹15,000 near Peelamedu with parking"*. | Parses intent via LLM/embeddings and returns ranked matches. | Explainable matching; no fabricated listing details. | **Future (Gen 3)** |

---

## 4. Rental Cost Transparency

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Rental Cost Breakdown** | Eliminate hidden rental expenses. | View monthly rent, maintenance, security deposit, brokerage, estimated monthly cost, and initial payment. | Calculates totals from provider-supplied values. | All charges must be supplied or confirmed by the provider. | **Initial (Gen 1)** |
| **Pricing Intelligence** | Track historical and local pricing trends. | View price history and local area comparisons. | Aggregates historical rental and quotation data. | Historical records must remain immutable. | **Future (Gen 3)** |

---

## 5. Property Enquiries and Visit Requests

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Property Enquiries** | Connect seekers with property providers. | Send enquiry message on a listing; providers view and reply. | Persists enquiry and notifies the property provider. | Enquiries are linked to specific listings. | **Initial (Gen 1)** |
| **Property Visit Requests** | Coordinate physical property visits. | Request a visit date/time; provider confirms or reschedules. | Updates visit status and sends notifications to both parties. | Prevents disorganized off-platform scheduling. | **Initial (Gen 1)** |

---

## 6. Professional Registration and Profiles

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Professional & Business Profiles** | Establish digital presence for service providers. | Register as independent professional or business; add skills, categories, service areas, hours, and certifications. | Creates professional/business profile and links skills and localities. | Verification of qualifications is evidence-based, not a legal guarantee. | **Initial (Gen 1)** |
| **Availability & Capacity** | Manage when professionals can take jobs. | Set working hours and available slots. | Exposes available slots for booking and prevents overbooking. | Concurrent bookings must not exceed available capacity. | **Initial (Gen 1)** |

---

## 7. Service Discovery and Booking

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Service & Professional Search** | Help customers find nearby professionals. | Search by service category and locality; compare profiles. | Returns matching professionals operating in the requested area. | Free for customers to discover professionals. | **Initial (Gen 1)** |
| **Service Booking Request** | Initiate a service appointment. | Select professional, describe problem, and submit request. | Creates booking in `REQUESTED` state and notifies professional. | Professional can accept, reject, or request more details. | **Initial (Gen 1)** |

---

## 8. Quotations and Job Management

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Structured Quotations & Versioning** | Prevent verbal pricing disputes. | Professional creates quote (inspection, labour, materials, taxes, exclusions, validity); customer accepts, rejects, or requests revision. | Stores immutable quote versions and links customer approval to the exact version. | Work cannot begin without scope and charge agreement. | **Future (Gen 2)** |
| **Additional-Work Approval** | Control unexpected mid-job costs. | Professional requests extra charge; customer approves or rejects. | Records approval event before work proceeds. | Additional chargeable work requires explicit customer approval. | **Future (Gen 2)** |
| **Job Tracking & Evidence** | Provide visibility from start to finish. | Track statuses (`REQUESTED` → `ACCEPTED` → `SCHEDULED` → `IN_PROGRESS` → `WAITING_FOR_APPROVAL` → `COMPLETED` → `CLOSED`); upload before/after photos and invoices. | Records status events, photos, and invoices in job history. | Exact workflow depends on service category. | **Future (Gen 2)** |
| **Dispute & Complaint Management** | Resolve service issues with evidence. | Submit complaint with evidence; admin reviews and resolves. | Links booking, quote, approvals, photos, and invoice to dispute record. | Supports human review and appeals. | **Future (Gen 2)** |

---

## 9. Digital Home Passport and Maintenance

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Digital Home Passport** | Maintain a property's lifecycle maintenance record. | View/add appliance inventory, repairs, warranties, invoices, and photos; grant or revoke tenant access. | Stores property-level records and enforces permission-based access. | Never exposes previous-tenant personal information; access is revocable. | **Future (Gen 2)** |
| **Maintenance Reminders & Predictive Care** | Keep homes maintained proactively. | Set manual reminders; (later) connect sensors for automated alerts. | Sends upcoming maintenance and warranty expiry notifications. | Manual records must work without connected sensors. | **Future (Gen 2 / Gen 4)** |

---

## 10. Notifications

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Multi-Channel Notifications** | Keep users informed of enquiries, visits, bookings, quotes, and maintenance. | Receive in-app, email, or WhatsApp deep-link notifications. | Dispatches notifications asynchronously with retries and idempotency. | Important updates must not be lost if an external provider fails. | **Initial (Gen 1)** (Expanded triggers in **Gen 2+**) |

---

## 11. Admin Dashboard and Moderation

| Feature | Purpose | User Actions | System Behaviour | Business Rules | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Listing & Platform Moderation** | Maintain trust and data quality. | Review flagged listings, moderate content, manage verification workflows, and handle disputes. | Updates moderation status and logs all admin actions in audit logs. | All admin actions must be traceable. | **Initial (Gen 1)** (Verification & disputes in **Gen 2**) |

