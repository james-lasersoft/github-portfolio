# Architecture and Design

## Design Goal

The architecture was selected to keep the capstone achievable while still demonstrating separation of concerns, secure data handling, relational database design, and maintainable full-stack development. The application uses a three-tier client-server structure.

## System Architecture

```text
User Browser
    |
    v
React + TypeScript Frontend
    |
    | Authenticated HTTP requests
    v
Express + TypeScript REST API
    |
    | Validated, user-scoped operations
    v
Prisma ORM
    |
    v
PostgreSQL Database
```

The presentation layer manages forms, navigation, dashboard cards, loading states, error states, and charts. The application layer handles routing, authentication, validation, business rules, calculations, and coordination between modules. The data layer provides persistent relational storage and migration history.

## Functional Modules

| Module | Responsibility |
|---|---|
| Authentication | Registration, login, password hashing, JWT creation, and protected route access |
| User Profile | Height, preferred units, hydration goal, and target weight |
| Body Measurements | User-scoped measurement creation, retrieval, editing, deletion, and history |
| Hydration | Entry storage, unit conversion, date grouping, daily totals, and history |
| Dashboard | Cross-module summaries including weight, BMI, hydration, and latest measurement |
| Progress Charts | Date-range filtering, missing-date insertion, aggregation, and visualization |
| Database | Relational persistence, integrity, indexes, migrations, and cascading user-data deletion |

## Data Model Summary

The relational model contains three central entities:

### User

Stores account identity, password hash, profile values, preferred weight and hydration units, daily hydration goal, and target weight.

### Measurement

Stores optional weight, waist, chest, hips, body-fat percentage, and a measurement date. Every measurement belongs to one authenticated user.

### Hydration

Stores an amount, unit, and logging timestamp. Every hydration record belongs to one authenticated user.

User relationships use cascading deletion so dependent records are removed when an account is deleted. User and date indexes support common retrieval patterns.

## Important Design Decisions

### Controlled scope

The capstone excludes nutrition, wearable synchronization, artificial intelligence, and native mobile development. Those capabilities would require additional data models, external integrations, validation rules, privacy review, and testing that were not realistic within the course timeline.

### Server-side data access

The frontend never connects directly to PostgreSQL. All database operations pass through authenticated API routes and Prisma, reducing exposure and centralizing validation and authorization.

### Unit-aware hydration processing

Hydration values are converted before aggregation so records entered in ounces and milliliters can be summarized consistently. The displayed result follows the user's selected unit.

### Null-aware dashboard rendering

The dashboard distinguishes between missing information and zero values. This prevents incomplete profiles or absent measurements from causing incorrect calculations or interface failures.

### Missing-date insertion

Hydration charts include zero-value dates when no record exists. This produces a continuous and understandable time series instead of visually skipping days.
