# Testing and Evaluation

## Evaluation Approach

The project was evaluated using a combination of automated tests, production-build verification, integration testing, local response-time measurement, and a structured usability review. These measures answer different questions and should not be treated as interchangeable.

## Recorded Results

| Metric | Result | Interpretation |
|---|---:|---|
| Automated test pass rate | 18 of 18 passed | All configured tests passed, although coverage is not complete for every newer module |
| Frontend production build | Successful | The integrated frontend compiled and produced a release build |
| Mean authenticated dashboard response time | 15.4 ms | Responsive local baseline across 10 observations, not a production-capacity claim |
| Heuristic usability score | 4 of 5, provisional | Encouraging developer-led review that still requires participant-based validation |

## System Testing Summary

| Test area | Procedure | Observed result |
|---|---|---|
| Authentication and protected routes | Register, sign in, store the JWT, and request a protected endpoint | Valid credentials opened protected functionality; unauthenticated access was rejected |
| Measurement workflow | Create, edit, retrieve, and delete a measurement | Records remained user-scoped and updated dashboard values |
| Hydration workflow | Enter hydration in ounces and milliliters and retrieve a daily total | Values were converted, aggregated, and displayed in the selected unit |
| Profile-dependent calculations | Save height, target weight, and unit preferences | BMI and labels refreshed without exposing another user's data |
| Chart ranges and missing dates | Select 7-day, 30-day, 90-day, and all-time ranges | Charts filtered records and inserted zero-value hydration dates |
| Build and regression verification | Run automated tests and production builds | 18 tests passed and the production build succeeded |

## Measurement Protocol

The local API baseline was measured by authenticating once and recording 10 requests to the dashboard endpoint in Chrome Developer Tools using the same account and database state. The arithmetic mean was 15.4 milliseconds. Results from local and hosted environments should remain separately labeled.

## Limitations

The current evaluation has several boundaries:

- Automated coverage is uneven across the newest modules.
- The usability score was produced by the developer rather than representative participants.
- The application has not been evaluated under sustained production load.
- Accessibility testing with assistive technologies remains future work.
- Hosted-environment latency and long-duration reliability have not yet been measured.

## Recommended Next Evaluation Steps

The next phase should add tests for hydration, profile, dashboard, date conversion, authorization boundaries, and chart transformations. A small task-based usability study should ask participants to register, enter a measurement, record hydration, change a unit preference, identify the current BMI, and locate a seven-day hydration trend. Completion rates, errors, task time, and participant comments should be recorded.
