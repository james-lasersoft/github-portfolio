# My Fit Ideas: Personal Body Progress Tracker

## Project Summary

My Fit Ideas is a secure web-based personal body progress tracker developed as the capstone project for the Master of Science in Information Technology program at University of the People. The project addresses the fragmentation that occurs when individuals record body measurements and hydration in separate notebooks, spreadsheets, or unrelated applications.

The implemented minimum viable product allows users to create accounts, manage profile settings, record body measurements and hydration, review dashboard summaries, and visualize historical trends over selectable time ranges. The application is intended for personal tracking and visualization. It is not a medical diagnostic system and does not replace professional health advice.

## Implemented Scope

The completed capstone scope includes:

- User registration and authentication
- Authenticated, user-scoped access to personal records
- Profile settings, including height, preferred units, hydration goal, and target weight
- Body measurement entry and history
- Hydration entry, unit conversion, daily aggregation, and history
- Dashboard summaries for current weight, weight change, hydration, BMI, and latest measurement
- Progress charts for weight, body fat, hydration, and body measurements
- Selectable 7-day, 30-day, 90-day, and all-time chart ranges

Nutrition tracking, wearable integration, artificial intelligence recommendations, native mobile development, and medical recommendations are intentionally outside the current capstone scope.

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React with TypeScript | Forms, navigation, dashboard views, and charts |
| Backend | Node.js and Express with TypeScript | REST endpoints, validation, authentication, and business logic |
| Data access | Prisma ORM | Schema mapping, queries, and database migrations |
| Database | PostgreSQL | Persistent storage for users, measurements, hydration, and profile settings |
| Visualization | Chart.js | Historical progress charts |
| Testing | Jest and Supertest | Automated backend verification |
| Configuration control | Git and GitHub | Version history, documentation, and release traceability |

## Verified Results

The capstone report records the following evaluation results:

- 18 of 18 configured automated tests passed
- The frontend production build completed successfully
- The authenticated dashboard endpoint averaged 15.4 milliseconds across 10 local observations
- Authentication, measurements, hydration, profile settings, dashboard summaries, and progress charts were verified as integrated modules

These measurements provide a local development baseline. They are not presented as evidence of public production capacity.

## Portfolio Documentation

- [Architecture and Design](architecture.md)
- [Testing and Evaluation](testing-and-evaluation.md)
- [Security, Privacy, and Ethics](security-privacy-ethics.md)
- [Project Management and Maintenance](project-management.md)
- [Portfolio Media and Demonstration Plan](media/README.md)

## Source Code Availability

The complete application source code is not published as part of this portfolio. This public portfolio focuses on the project problem, scope, design decisions, implementation evidence, testing results, and professional documentation.

## Application Screenshots

[View the application screenshot gallery](screenshots.md) for authentication, dashboard, hydration, and progress-chart evidence captured from the current `main` branch interface using non-sensitive demonstration data.

