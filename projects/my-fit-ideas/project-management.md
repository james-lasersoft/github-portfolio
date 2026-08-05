# Project Management and Maintenance

## Scope Management

The project began as a broader wellness application concept. During planning, the scope was reduced to authentication, profile settings, body measurements, hydration, dashboard summaries, and progress charts. Nutrition, wearable integration, artificial intelligence, native mobile development, and public cloud deployment were deferred.

This decision reduced implementation risk and allowed the capstone to produce a coherent, testable minimum viable product instead of a larger collection of incomplete features.

## Incremental Development

Development followed an incremental sequence:

1. Repository and project structure
2. PostgreSQL and Prisma configuration
3. Registration, login, and protected routes
4. Body measurement workflow
5. Automated tests
6. Hydration tracking
7. Profile settings
8. Dashboard summaries
9. Progress charts
10. Integration testing, evaluation, and deployment planning

Each stage built on the authenticated user identity and shared relational database.

## Configuration Management

The project uses more than source-control commits to identify a stable release. Important configuration items include:

- Git commits and milestone tags
- Dependency manifests and lock files
- Prisma schema and migration directories
- Environment-variable definitions
- Automated tests
- TypeScript and production-build scripts
- Release verification commands
- Documentation tied to the implemented state

## Deployment Plan

The preferred deployment architecture is a cloud-hosted Linux virtual machine running Node.js and PostgreSQL. A reverse proxy would serve the built frontend, terminate HTTPS, and route API requests to the Express application.

A controlled release process should:

1. Check out a reviewed tagged commit.
2. Install dependencies from lock files.
3. Generate the Prisma client.
4. Run automated tests.
5. Build the backend and frontend.
6. Verify database backups.
7. Apply reviewed migrations.
8. Start the updated release.
9. Confirm health checks and representative workflows.
10. Retain the previous release and rollback instructions.

## Maintenance Plan

The maintenance strategy covers four complementary categories:

- **Corrective:** Repair verified defects.
- **Adaptive:** Respond to operating-system, framework, browser, or database changes.
- **Perfective:** Improve usability, accessibility, reporting, and performance.
- **Preventive:** Expand tests, update dependencies, verify backups, review security, and refactor high-risk areas.

Security issues, data inconsistencies, service interruptions, accessibility problems, performance degradation, and privacy failures should be tracked and prioritized through a documented issue process.

## Immediate Next Steps

The strongest next improvements are deeper automated coverage, a small participant-based usability study, hosted-environment measurement, accessibility testing, HTTPS configuration, backup restoration testing, health monitoring, and documented rollback verification.
