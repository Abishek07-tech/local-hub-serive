# User Workflows

This document details the 15 core user journeys for **Local Living & Service Hub**, covering actors, preconditions, step-by-step actions, system responses, business rules, outcomes, and failure/rejection cases.

---

## 1. Customer Registration and Login
- **Actors:** Home Seeker / Tenant / Resident (`CUSTOMER`).
- **Preconditions:** User has a valid email/credentials and is not yet authenticated.
- **Steps:**
  1. User opens the registration page and submits account details.
  2. System validates input, hashes password, creates user with `CUSTOMER` role, and issues JWT + refresh token.
  3. On subsequent visits, user logs in with credentials.
- **Business Rules:** Passwords must be securely hashed; tokens must be validated on protected routes.
- **Outcome:** User is authenticated and redirected to the customer dashboard.
- **Failure Cases:** Duplicate email, invalid input format, or incorrect login credentials return validation/auth errors.

## 2. Property Owner Registration and Property Creation
- **Actors:** Property Owner / Landlord / Authorized Broker (`OWNER`).
- **Preconditions:** User is registered and holds the `OWNER` role.
- **Steps:**
  1. Owner navigates to the owner dashboard and selects "Add Property".
  2. Owner enters physical property details (type, bedrooms, locality, amenities) and uploads photos.
  3. System validates data, stores images in S3, and saves the property record in PostgreSQL.
- **Business Rules:** Only the owning `OWNER` or authorized broker can create/edit the property.
- **Outcome:** Property profile is created and ready for listing publication.
- **Failure Cases:** Missing required fields, unsupported image formats, or unauthorized access.

## 3. Property Listing Publication
- **Actors:** Property Owner (`OWNER`), System.
- **Preconditions:** Property record exists; rental cost details are prepared.
- **Steps:**
  1. Owner enters rental terms (monthly rent, maintenance, security deposit, brokerage) and sets availability (`Available`).
  2. Owner publishes the listing.
  3. System records the `last-confirmed` timestamp and makes the listing searchable.
- **Business Rules:** All cost figures must be supplied/confirmed by the provider; stale listings are flagged for periodic reconfirmation.
- **Outcome:** Listing is live in public property discovery.
- **Failure Cases:** Incomplete cost breakdown or unconfirmed availability blocks publication.

## 4. Customer Property Search and Filtering
- **Actors:** Home Seeker (`CUSTOMER`).
- **Preconditions:** Active property listings exist.
- **Steps:**
  1. Customer opens the public properties page.
  2. Customer applies filters (locality, monthly rent range, property type, bedrooms, amenities, availability).
  3. System queries PostgreSQL and returns matching listings.
- **Business Rules:** Discovery is free for customers without a paid subscription.
- **Outcome:** Customer views a filtered list of relevant properties.
- **Failure Cases:** No matching properties found (system displays empty-state guidance).

## 5. Rental Cost Viewing and Comparison
- **Actors:** Home Seeker (`CUSTOMER`).
- **Preconditions:** Customer has found one or more listings.
- **Steps:**
  1. Customer opens a listing or selects multiple listings to compare.
  2. System displays monthly rent, maintenance, security deposit, brokerage, estimated monthly cost, and initial payment side by side.
- **Business Rules:** Cost breakdown must clearly distinguish recurring monthly costs from one-time initial payments.
- **Outcome:** Customer understands the full financial commitment before enquiring.

## 6. Customer Property Enquiry
- **Actors:** Home Seeker (`CUSTOMER`), Property Owner (`OWNER`).
- **Preconditions:** Customer is logged in; listing is active.
- **Steps:**
  1. Customer submits an enquiry message on a property listing.
  2. System persists the enquiry and notifies the `OWNER`.
  3. Owner views and responds to the enquiry from their dashboard.
- **Business Rules:** Enquiries are linked to specific listings for centralized tracking.
- **Outcome:** Communication is established between seeker and provider.
- **Failure Cases:** Listing is no longer available or customer is unauthenticated.

## 7. Property Visit Request
- **Actors:** Home Seeker (`CUSTOMER`), Property Owner (`OWNER`).
- **Preconditions:** Listing is available for visits.
- **Steps:**
  1. Customer selects a preferred date/time and submits a visit request.
  2. System creates the visit request and notifies the `OWNER`.
  3. Owner confirms, reschedules, or declines the visit.
- **Business Rules:** Visit status updates trigger notifications to both parties.
- **Outcome:** Property visit is scheduled or declined with clear status.
- **Failure Cases:** Property becomes rented/unavailable before confirmation.

## 8. Professional Registration and Service Profile Creation
- **Actors:** Independent Professional / Service Business Owner (`PROFESSIONAL`).
- **Preconditions:** User has an account with the `PROFESSIONAL` role.
- **Steps:**
  1. Professional completes profile (name/business name, description, skills, service categories, service areas, working hours, certifications).
  2. System validates and publishes the service profile.
- **Business Rules:** Verification of qualifications is evidence-based and not a legal guarantee.
- **Outcome:** Professional is discoverable by customers in their service areas.

## 9. Customer Professional Discovery
- **Actors:** Resident / Tenant (`CUSTOMER`).
- **Preconditions:** Active professional profiles exist.
- **Steps:**
  1. Customer searches by service category (e.g., plumber, electrician) and locality.
  2. System returns matching professionals with their skills, service areas, and available slots.
- **Business Rules:** Customers can discover professionals without paid subscriptions.
- **Outcome:** Customer selects a suitable professional to book.

## 10. Service Booking Request
- **Actors:** Customer (`CUSTOMER`), Professional (`PROFESSIONAL`).
- **Preconditions:** Professional has available capacity/slots.
- **Steps:**
  1. Customer selects a professional, describes the problem, and submits a booking request.
  2. System creates the booking in `REQUESTED` state and notifies the professional.
  3. Professional accepts, rejects, or requests more details.
- **Business Rules:** Concurrency protection prevents double-booking the same limited capacity.
- **Outcome:** Booking is confirmed (`ACCEPTED` / `SCHEDULED`) or rejected.
- **Failure Cases:** Slot already booked (concurrency conflict) or professional rejects request.

## 11. Professional Quotation Creation *(Generation 2)*
- **Actors:** Professional (`PROFESSIONAL`).
- **Preconditions:** Service booking is accepted.
- **Steps:**
  1. Professional creates a structured quotation (inspection, labour, materials, taxes, exclusions, validity, total estimate).
  2. System saves an immutable quote version and notifies the customer.
- **Business Rules:** Work cannot begin until scope and charges are agreed upon.
- **Outcome:** Quotation is ready for customer review.

## 12. Customer Quotation Approval or Rejection *(Generation 2)*
- **Actors:** Customer (`CUSTOMER`), Professional (`PROFESSIONAL`).
- **Preconditions:** Quotation exists in pending state.
- **Steps:**
  1. Customer reviews the quotation breakdown.
  2. Customer chooses **Accept**, **Reject**, or **Request Revision**.
  3. System records the decision against the exact quote version and notifies the professional.
- **Business Rules:** Any subsequent additional chargeable work requires a separate customer approval.
- **Outcome:** Approved quote authorizes job execution; rejected/revision-requested quote returns to the professional.

## 13. Job Creation and Progress Tracking *(Generation 2)*
- **Actors:** Professional (`PROFESSIONAL`), Customer (`CUSTOMER`).
- **Preconditions:** Quotation is approved.
- **Steps:**
  1. System creates a job linked to the approved booking and quote.
  2. Professional updates job status (`SCHEDULED` → `IN_PROGRESS` → `WAITING_FOR_APPROVAL` if extra work is needed → `COMPLETED`).
  3. System logs each status event and notifies the customer.
- **Business Rules:** State transitions must be explicit and valid.
- **Outcome:** Customer has real-time visibility into job progress.

## 14. Job Completion and Customer Review *(Generation 2)*
- **Actors:** Professional (`PROFESSIONAL`), Customer (`CUSTOMER`).
- **Preconditions:** Work is finished.
- **Steps:**
  1. Professional uploads completion/after photographs and final invoice, marking the job `COMPLETED`.
  2. Customer reviews completion evidence and confirms closure (`DELIVERED` / `CLOSED`).
  3. Optionally, the service record is added to the property's Digital Home Passport (subject to authorization).
- **Business Rules:** Final invoice and photos are preserved for accountability and dispute resolution.
- **Outcome:** Job is closed with a complete, auditable service record.

## 15. Admin Moderation and Approval
- **Actors:** Platform Administrator (`ADMIN`).
- **Preconditions:** Flagged listing, verification request, or dispute exists.
- **Steps:**
  1. Admin opens the admin dashboard and selects a pending item (listing moderation, verification evidence, or dispute).
  2. Admin reviews submitted evidence and history.
  3. Admin approves, rejects, or flags the item and records a reason.
- **Business Rules:** All admin actions are recorded in immutable audit logs.
- **Outcome:** Platform trust and data quality are maintained.

