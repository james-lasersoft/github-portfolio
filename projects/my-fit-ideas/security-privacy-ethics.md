# Security, Privacy, and Ethical Design

## Security Approach

Security was treated as an architectural requirement rather than a final implementation task. The application stores personal wellness information, so identity, authorization, validation, and configuration controls are central to the design.

Implemented or planned controls include:

- Password hashing with bcrypt
- JSON Web Token authentication
- Protected API routes
- User-scoped database queries
- Server-side validation
- Environment-based configuration
- Restricted CORS configuration for deployment
- HTTPS termination through a reverse proxy in a hosted environment
- Least-privilege database access
- Reviewed Prisma migrations and database backups before schema changes

## Privacy Principles

The project follows a data-minimization approach by collecting only information needed for the approved capstone scope. It does not require unnecessary demographic, social, or clinical information. Public portfolio materials exclude passwords, tokens, database credentials, private email addresses, and personal user records.

For a future public deployment, the system should also include:

- A clear privacy notice
- Data export and account-deletion procedures
- Defined retention rules
- Secure backup handling
- Logging controls that redact sensitive values
- Periodic privacy reviews

## Ethical Boundary

My Fit Ideas is a personal tracking application, not a medical system. BMI and historical charts are presented as calculated information rather than diagnoses or individualized health conclusions. Hydration goals and target weights are user-configured reference values, not clinical recommendations.

The descriptive charts show recorded change over time, but they do not establish causation. A change in weight or hydration cannot be attributed to a specific behavior using these records alone. Maintaining that distinction prevents the interface and documentation from overstating what the data can support.

## Portfolio Publication Boundary

This portfolio describes the architecture, design decisions, results, and professional process without publishing the complete application source code. That choice protects implementation details while still providing evidence of technical competence, project planning, testing, and ethical judgment.
