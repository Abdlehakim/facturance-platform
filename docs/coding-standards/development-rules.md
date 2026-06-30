# Facturance Platform Development Rules

## Purpose

This document is the permanent development guide for the Facturance Platform. It applies to every developer, technical lead, reviewer, and AI assistant working in this repository.

The goal is to protect the long-term quality of the platform. Every change must preserve a clean architecture, strong security boundaries, tenant isolation, scalability, and maintainability.

These rules apply to all applications, services, shared packages, databases, infrastructure, and documentation in this repository.

## Project Philosophy

Facturance is intended to become a world-class international ERP and SaaS platform. It must be designed for long-term evolution, not short-term convenience.

Every architectural decision must prioritize:

- Maintainability
- Scalability
- Security
- Tenant isolation
- International readiness
- Reliability
- Developer clarity
- Operational resilience
- Future extensibility

Shortcuts that create hidden coupling, duplicate logic, weaken security, or make future scaling harder are not acceptable. The platform must be built as a professional system that can grow from a small product into an international multi-company, multi-user, multi-region ERP platform.

## 1. General Architecture

Facturance must follow enterprise-grade architecture standards.

### Core Principles

- Design for scalability first.
- Apply Clean Architecture principles.
- Apply SOLID principles.
- Enforce Separation of Concerns.
- Use Domain-Driven Design where it provides clarity.
- Keep the architecture modular.
- Give every module a single responsibility.
- Avoid coupling between unrelated domains.
- Keep business rules independent from framework details.
- Keep shared logic in shared packages.
- Keep domain logic separate from transport, database, and UI logic.
- Preserve compatibility with future microservice extraction.

### Clean Architecture Rules

- Domain logic must not depend on UI frameworks, HTTP frameworks, database clients, or infrastructure tools.
- Application services coordinate use cases but must not contain unrelated business rules.
- Infrastructure code must implement technical details such as persistence, external APIs, queues, logs, and caches.
- Interfaces and contracts should be placed where they reduce coupling.
- Dependencies should point inward toward stable business rules.
- Framework-specific code should remain at the edges of the system.

### SOLID Rules

- Single Responsibility Principle: each file, class, function, component, module, and service should have one clear reason to change.
- Open/Closed Principle: extend behavior through clear extension points instead of modifying unrelated existing code.
- Liskov Substitution Principle: abstractions must be replaceable by their implementations without breaking behavior.
- Interface Segregation Principle: do not force modules to depend on methods or fields they do not use.
- Dependency Inversion Principle: high-level business logic should depend on abstractions, not low-level implementations.

### Modularity Rules

- Modules must expose clear public boundaries.
- Internal implementation details must not be imported directly by unrelated modules.
- Shared packages must be stable, focused, and intentionally designed.
- Avoid circular dependencies.
- Avoid hidden global state.
- Avoid business logic in controllers, UI components, database migrations, or infrastructure scripts.

## 2. Folder Structure

The existing repository hierarchy must be respected.

```text
apps/
services/
packages/
database/
infrastructure/
docs/
.github/
```

### Folder Responsibilities

- `apps/`: user-facing applications, including website, client dashboard, admin dashboard, desktop app, and mobile app.
- `services/`: backend services and background workers.
- `packages/`: shared reusable libraries for UI, types, config, validation, permissions, translations, business rules, sync, and offline database utilities.
- `database/`: PostgreSQL and SQLite schema assets, migrations, seeds, and shared database models.
- `infrastructure/`: deployment, routing, backup, monitoring, logging, and operational scripts.
- `docs/`: architecture, API, security, database, permissions, sync, deployment, desktop, mobile, internationalization, and coding standards documentation.
- `.github/`: GitHub workflows and repository automation.

### Folder Rules

- Respect the existing folder hierarchy.
- Never place code in the wrong layer.
- Never duplicate shared logic across apps or services.
- Every folder must have one clear responsibility.
- New folders must follow the same architectural style.
- Shared logic must move into `packages/`, not be copied between apps or services.
- Application-specific logic must stay in the application or service that owns it.
- Platform administration logic must not be mixed with client company business logic.
- Client data and admin/platform data must remain strongly separated.

## 3. File Rules

Files must stay small, readable, and focused.

### Required Practices

- Keep files small and focused.
- Avoid "God files."
- Split files before they become large or hard to scan.
- Keep functions short.
- Avoid duplicated code.
- Prefer clear composition over large inheritance chains.
- Prefer named helpers for repeated logic.
- Keep one primary concept per file.
- Keep exports intentional and limited.
- Remove dead code when it is no longer needed.

### File Size Guidance

These are guidelines, not strict limits, but large files require justification:

- UI components should usually stay under 200 lines.
- Backend services should usually stay under 250 lines.
- Controllers should usually stay under 150 lines.
- DTO and type files should stay focused by domain or feature.
- Utility files should contain related helpers only.
- Large modules should be split by feature, use case, or responsibility.

### Function Rules

- Functions should do one thing.
- Function names must describe the action or result.
- Avoid long parameter lists.
- Prefer typed objects for complex parameter sets.
- Avoid hidden side effects.
- Avoid mixing validation, transformation, persistence, and response formatting in one function.

## 4. Naming Conventions

Naming must be consistent, descriptive, and predictable.

### Folder Naming

- Use `kebab-case` for folders.
- Folder names must describe the domain, feature, or technical responsibility.
- Avoid vague folder names such as `misc`, `common2`, `stuff`, or `helpers` unless the scope is very clear.

Examples:

- `client-dashboard`
- `business-rules`
- `sync-engine`
- `postgres-server`
- `sqlite-desktop-cache`

### File Naming

- Use `kebab-case` for files.
- File names must describe their primary responsibility.
- Use suffixes where they improve clarity.

Examples:

- `invoice.service.ts`
- `create-invoice.dto.ts`
- `company.entity.ts`
- `permission.guard.ts`
- `invoice-form.component.tsx`
- `use-invoice-sync.ts`

### Variables and Functions

- Use `camelCase` for variables and functions.
- Names must describe intent, not implementation trivia.
- Boolean variables should read naturally.

Examples:

- `companyId`
- `isSyncPending`
- `hasPermission`
- `calculateInvoiceTotal`
- `validateCompanyAccess`

### Classes

- Use `PascalCase` for classes.
- Class names must describe the role.

Examples:

- `InvoiceService`
- `CompanyRepository`
- `SyncConflictResolver`
- `PermissionEvaluator`

### Interfaces and Types

- Use `PascalCase`.
- Prefer clear domain names.
- Avoid meaningless prefixes unless required by local convention.
- Do not create interfaces only to mirror a single implementation without value.

Examples:

- `InvoiceSummary`
- `CompanyContext`
- `PermissionDefinition`
- `SyncOperation`

### Components

- Use `PascalCase` for React components.
- Component names must describe what the component represents.
- Avoid generic names like `CardComponent` or `DataComponent`.

Examples:

- `InvoiceTable`
- `CompanySwitcher`
- `PermissionMatrix`
- `SyncStatusBadge`

### Hooks

- Hooks must start with `use`.
- Hooks should own reusable stateful behavior.
- Hooks must not hide unrelated business rules.

Examples:

- `useCurrentCompany`
- `useInvoiceFilters`
- `useSyncStatus`

### Services

- Services must end with `Service`.
- Services should coordinate use cases or domain operations.
- Services must not become dumping grounds for unrelated logic.

Examples:

- `AuthService`
- `InvoiceService`
- `DesktopSyncService`

### DTOs

- DTOs must end with `Dto`.
- DTOs must describe request or response payloads.
- DTOs must not contain business behavior.

Examples:

- `CreateInvoiceDto`
- `UpdateCompanyUserDto`
- `SyncOperationDto`

### Entities

- Entities must represent persisted domain records.
- Entity names should use singular nouns.

Examples:

- `Company`
- `User`
- `Invoice`
- `Payment`
- `Permission`

### Database Tables

- Use `snake_case` for table names and columns.
- Prefer plural table names.
- Foreign keys must use the singular referenced entity name plus `_id`.
- Every business table must include `company_id` unless it is explicitly platform-level or global reference data.

Examples:

- `companies`
- `company_users`
- `invoices`
- `invoice_items`
- `sync_operations`
- `created_at`
- `updated_at`
- `deleted_at`
- `company_id`

## 5. Frontend Rules

Frontend applications must be built with reusable, accessible, and maintainable React and Next.js practices.

### React Rules

- Prefer functional components.
- Use component composition over inheritance.
- Keep components focused on rendering and interaction.
- Move reusable stateful behavior into hooks.
- Move reusable visual primitives into `packages/ui`.
- Avoid duplicating UI patterns across applications.
- Avoid deeply nested prop chains where a scoped context would be clearer.
- Avoid unnecessary global state.
- Keep side effects in appropriate hooks or data-fetching layers.
- Keep business rules outside UI components when they are shared or domain-specific.

### Next.js Rules

- Follow the selected Next.js routing and rendering conventions consistently within each app.
- Use server rendering, static rendering, or client rendering intentionally.
- Keep data-fetching close to route or feature boundaries.
- Avoid leaking secrets into client bundles.
- Use environment variables only through approved configuration helpers.
- Use lazy loading for heavy routes, charts, editors, and rarely used panels.
- Keep route-level files small by delegating to feature components.

### Component Composition

- Build small components with clear input and output.
- Prefer controlled components for forms where validation and state must be explicit.
- Use composition for layouts, slots, and reusable behaviors.
- Avoid component APIs with too many unrelated props.
- Keep presentational components separate from data orchestration when practical.

### Reusable UI

- Shared UI primitives belong in `packages/ui`.
- App-specific UI belongs in the owning app.
- Design tokens, themes, and reusable visual rules should be centralized.
- Reusable UI must support accessibility, responsive behavior, and internationalization.

### Frontend Folder Organization

- Organize frontend code by feature or domain where possible.
- Keep route files thin.
- Keep shared local components near the feature that owns them.
- Promote components to shared packages only after genuine reuse exists.

### State Management

- Use local component state for local UI concerns.
- Use URL state for shareable filters, pagination, tabs, and searches where appropriate.
- Use server state tools for remote data when available.
- Use global state only for truly global concerns such as session, company context, theme, locale, and permission state.
- Avoid storing derived state when it can be computed safely.

### Form Validation

- Validate forms on the frontend for user experience.
- Validate the same data on the backend for security.
- Reuse validation schemas from `packages/validation` where possible.
- Show clear field-level errors.
- Never rely on frontend validation as the only validation layer.

## 6. Backend Rules

Backend services must follow a clear NestJS-style architecture when NestJS is introduced.

### NestJS Architecture

- Organize backend services into modules.
- Keep controllers thin.
- Keep business logic in services or domain use cases.
- Keep persistence logic in repositories or dedicated data access layers.
- Use dependency injection for services, repositories, guards, interceptors, and integrations.
- Keep framework decorators at the edge of the application.
- Avoid circular module dependencies.

### Controllers

- Controllers handle HTTP transport concerns only.
- Controllers validate input through DTOs and validation pipes.
- Controllers call application services.
- Controllers must not contain business logic.
- Controllers must not access the database directly.
- Controllers must not build complex queries.

### Services

- Services coordinate use cases.
- Services enforce business rules that belong to their domain.
- Services must validate permissions and company context when relevant.
- Services should be cohesive and focused.
- Split services when they grow across multiple responsibilities.

### Repositories

- Repositories own persistence access.
- Repositories should not expose raw database implementation details unnecessarily.
- Repositories must enforce tenant filters where appropriate.
- Repositories must avoid returning deleted records unless explicitly requested.
- Repositories should make query intent clear.

### Modules

- Modules must group related controllers, services, providers, and repositories.
- Modules must expose only what other modules need.
- Modules must avoid broad shared imports that hide coupling.

### DTOs and Validation

- Every external request payload must use a DTO.
- DTOs must validate shape, type, required fields, and allowed values.
- Validation errors must be consistent and safe to expose.
- DTOs must not contain persistence logic.
- Internal domain commands may differ from API DTOs when needed.

### Dependency Injection

- Use dependency injection for replaceable infrastructure.
- Avoid manual construction of services inside other services.
- Use interfaces or tokens where multiple implementations are expected.
- Keep dependency graphs understandable.

### Error Handling

- Use consistent application errors.
- Never expose stack traces or sensitive implementation details to clients.
- Map domain errors to appropriate HTTP responses.
- Log unexpected errors with enough context for diagnosis.
- Do not swallow errors silently.

### Logging

- Use structured logs.
- Include request IDs or correlation IDs.
- Include company context when safe and relevant.
- Never log passwords, tokens, secrets, or sensitive personal data.
- Use log levels consistently.

## 7. Database Rules

PostgreSQL is the cloud source of truth. SQLite is the desktop offline cache.

### PostgreSQL Rules

- PostgreSQL stores authoritative cloud data.
- Production schema changes must happen through migrations only.
- Never manually modify the production schema.
- Every migration must be reviewed.
- Every migration must be reversible or have a documented rollback strategy.
- Migrations must be deterministic.
- Migrations must avoid data loss unless explicitly approved.

### SQLite Desktop Cache Rules

- SQLite stores local offline desktop cache data.
- SQLite data must be considered a local synchronized copy, not the cloud source of truth.
- SQLite schema must support sync metadata where needed.
- Local cache records must track sync status and conflict state when relevant.
- Sensitive local data must be minimized and protected.

### Versioning

- Database schema versions must be tracked.
- Desktop SQLite schema versions must be tracked independently from PostgreSQL.
- Sync logic must understand compatible schema versions.
- Migrations must be ordered, repeatable, and traceable.

### Soft Delete

- Business records should use soft delete where auditability or synchronization requires it.
- Soft-deleted records should use `deleted_at`.
- Queries must exclude soft-deleted records by default.
- Hard delete should be reserved for approved cleanup, security, or legal requirements.

### Audit Fields

Most persisted business records should include:

- `id`
- `company_id` where tenant-owned
- `created_at`
- `updated_at`
- `deleted_at` where soft delete is used
- `created_by`
- `updated_by`
- `deleted_by` where soft delete is used

### Migrations and Seeds

- Use migrations for schema changes.
- Use seeds only for controlled reference data or development bootstrap data.
- Never rely on manual database edits.
- Never commit production data.
- Never commit sensitive seed data.

## 8. Synchronization Rules

Desktop synchronization must support offline-first workflows without compromising cloud consistency.

### Offline-First Architecture

- Desktop users must be able to continue approved workflows while offline.
- Offline actions must be recorded locally.
- Local writes must be queued for synchronization.
- The cloud PostgreSQL database remains the source of truth.
- Sync design must tolerate network loss, app restarts, and partial failures.

### Queue-Based Synchronization

- Local mutations must be added to a durable sync queue.
- Each queued operation must have a unique identifier.
- Queued operations must record operation type, entity type, entity ID, payload, timestamps, company context, and status.
- Sync processing must be idempotent where possible.
- Operations must not disappear from the queue until safely acknowledged.

### Conflict Resolution

- Conflicts must be detected intentionally, not ignored.
- Use optimistic concurrency with version numbers, timestamps, or revision tokens.
- Conflict policies must be defined per domain where necessary.
- Automatic resolution must be safe and predictable.
- User-assisted resolution must be available for conflicts that cannot be safely resolved.
- Resolved conflicts must be auditable.

### Retry Strategy

- Retry transient failures with backoff.
- Do not retry permanent validation or authorization failures indefinitely.
- Track retry count and last error.
- Provide clear sync status to the desktop app.
- Avoid duplicate cloud writes during retry.

### Sync Status Lifecycle

Syncable records and operations should use clear statuses such as:

- `local_only`
- `queued`
- `syncing`
- `synced`
- `conflict`
- `failed`
- `cancelled`

Status transitions must be explicit and testable.

## 9. Multi-Tenant Rules

Facturance is a multi-company platform. Tenant isolation is mandatory.

### Company Ownership

- Every business record belongs to a company.
- Business tables must include `company_id` unless explicitly documented otherwise.
- Company context must be known for every tenant-scoped operation.
- Company context must be validated on every request that touches tenant data.

### Company Isolation

- Never leak data between tenants.
- Never trust a `company_id` from the frontend without verifying access.
- Always validate that the authenticated user belongs to or can administer the company.
- Queries for tenant data must always be scoped by company.
- Background jobs must preserve company context.
- Logs must avoid exposing data across tenants.

### Platform Data vs Company Data

- Platform administration data belongs to the admin/platform domain.
- Company business data belongs to the client domain.
- Admin APIs and Client APIs must remain separate.
- Platform users and company users must remain conceptually distinct.
- Cross-tenant administration must be explicit, audited, and permission-checked.

## 10. Authentication and Authorization

Authentication verifies identity. Authorization verifies allowed actions.

### Authentication Rules

- Use JWT access tokens for short-lived authenticated requests.
- Use refresh tokens for session renewal.
- Refresh tokens must be stored, rotated, and revoked securely.
- Passwords must be hashed with an approved password hashing algorithm.
- Two-factor authentication must be supported by the architecture, even if enabled later.
- Session and token events should be auditable.

### Authorization Rules

- Use RBAC as the baseline authorization model.
- Use permission-based checks for sensitive actions.
- Roles must map to explicit permissions.
- Permissions must be reusable across apps and services.
- Authorization must happen on the backend.
- Frontend permission checks are for user experience only.
- Never rely only on hidden buttons or frontend route guards.

### API Separation

- Admin API and Client API must remain separate.
- Admin API handles platform administration.
- Client API handles company-scoped business operations.
- Sync API handles desktop synchronization.
- Auth API handles identity, sessions, tokens, and authentication flows.

### User Separation

- Platform users manage or operate the Facturance platform.
- Company users operate inside a tenant company.
- Do not mix platform-level permissions with company-level permissions.
- Any user with access to multiple companies must always operate with explicit company context.

## 11. Security Rules

Security must be built into every layer.

### Core Security Rules

- Never trust the frontend.
- Validate every request.
- Validate input type, shape, range, ownership, and permission.
- Deny by default.
- Use least privilege.
- Keep secrets out of source control.
- Use environment variables for secrets and environment-specific values.
- Do not log sensitive information.
- Audit sensitive actions.

### Input Validation

- Validate all external input.
- Reject unknown or unsafe fields where appropriate.
- Normalize data before persistence when needed.
- Validate file uploads by type, size, and content rules.

### SQL Injection Prevention

- Use parameterized queries or approved ORM/query builders.
- Never concatenate untrusted input into SQL.
- Validate sorting and filtering fields against allowlists.
- Avoid raw SQL unless necessary and reviewed.

### XSS Prevention

- Escape user-generated content in UI rendering.
- Avoid unsafe HTML rendering.
- Sanitize content when rich text is required.
- Use secure content security policies where appropriate.

### CSRF Protection

- Apply CSRF protection where cookie-based authentication is used.
- Use same-site cookie policies intentionally.
- Validate origins for sensitive browser requests.

### Rate Limiting

- Rate-limit authentication endpoints.
- Rate-limit sensitive APIs.
- Use stricter limits for password reset, login, token refresh, and 2FA verification.
- Log suspicious abuse patterns.

### Secrets and Environment Variables

- Store secrets in environment variables or approved secret managers.
- Never commit `.env` files containing real secrets.
- Keep example environment files safe and non-sensitive.
- Rotate secrets when exposure is suspected.

### Encryption

- Use TLS for network communication.
- Encrypt sensitive data at rest where required.
- Protect local desktop data where practical.
- Use approved cryptographic libraries.
- Never implement custom cryptography.

### Password Hashing

- Hash passwords using approved algorithms such as Argon2 or bcrypt.
- Use appropriate cost factors.
- Never store plaintext passwords.
- Never log passwords.

### Audit Logging

- Audit authentication events.
- Audit permission changes.
- Audit administrative actions.
- Audit cross-company access.
- Audit sensitive business record changes where required.
- Audit logs must be tamper-resistant where possible.

## 12. Internationalization

Facturance must be international-ready from the beginning.

### Translation Rules

- Never hardcode UI strings in components.
- User-facing strings must come from translation files.
- Translation keys must be stable and descriptive.
- Shared translation resources belong in `packages/translations`.
- Missing translations must be detectable during development.

### Locale-Driven Architecture

- Locale must influence language, date format, time format, number format, and currency display.
- Locale must not be guessed when explicit user or company preferences exist.
- Company-level language preferences must be supported.
- User-level language preferences must be supported.

### Currency and Numbers

- Store monetary values with safe numeric precision.
- Display currency using locale-aware formatting.
- Do not assume one currency per deployment.
- Avoid floating point arithmetic for financial calculations.
- Business rules for currency and tax should live in shared business packages when reused.

### Dates, Times, and Time Zones

- Store timestamps in a consistent server format, preferably UTC.
- Display dates and times in the user's or company's configured time zone.
- Be explicit about invoice dates, due dates, and legal document dates.
- Avoid ambiguous date formats.

### Customer Invoice Language

- Invoices and customer-facing documents must support customer language preferences.
- Generated documents must use the correct locale, currency, number, and date formats.
- Legal and tax wording must be configurable by locale where required.

## 13. Desktop Rules

The desktop app must support reliable offline work and safe synchronization.

### Electron Architecture

- Separate main process, preload, and renderer responsibilities.
- Avoid exposing unsafe Node.js capabilities to the renderer.
- Use secure IPC boundaries.
- Validate IPC payloads.
- Keep desktop-specific logic inside the desktop app or appropriate shared packages.

### Offline Mode

- Offline mode must be intentional and visible to the user.
- Desktop workflows must clearly distinguish synced, pending, failed, and conflicted data.
- Local operations must be durable across restarts.

### SQLite Cache

- SQLite is the local cache for desktop offline workflows.
- SQLite schema changes must use migrations.
- Local cache data must include sync metadata where needed.
- Local database access must be abstracted behind clear boundaries.

### Background Synchronization

- Sync should run in the background when connectivity is available.
- Sync must not block normal UI usage unnecessarily.
- Sync progress and failures must be observable.
- Sync must avoid duplicate operations.

### Automatic Updates

- Desktop update architecture must support safe automatic updates.
- Updates must preserve local SQLite data.
- Updates must handle schema migrations safely.
- Failed updates must not corrupt local data.

### Local Backup

- Local backup strategy must be planned for desktop cache data.
- Backups must avoid exposing sensitive data.
- Restore behavior must be documented and tested before production use.

## 14. Mobile Rules

The future mobile app must share platform contracts and business logic where practical.

### Shared Platform Rules

- Mobile must use the same public APIs as other client applications unless a mobile-specific endpoint is justified.
- Mobile must reuse shared types where possible.
- Mobile must reuse shared validation rules where possible.
- Mobile must reuse shared translations where possible.
- Mobile must reuse shared business rules where possible.
- Mobile-specific code must remain in `apps/mobile-app`.

### Mobile Architecture Rules

- Mobile UI must remain separate from domain rules.
- Mobile must respect RBAC and permission responses from the backend.
- Mobile must support locale, currency, date, and time formatting.
- Mobile offline behavior must be explicitly designed before implementation.

## 15. API Design

APIs must be predictable, versioned, secure, and well documented.

### REST Conventions

- Use resource-oriented URLs.
- Use standard HTTP methods.
- Use appropriate HTTP status codes.
- Keep endpoints consistent across services.
- Avoid action-heavy URLs unless modeling a command is clearer.

Examples:

- `GET /v1/invoices`
- `POST /v1/invoices`
- `GET /v1/invoices/{invoiceId}`
- `PATCH /v1/invoices/{invoiceId}`
- `DELETE /v1/invoices/{invoiceId}`

### Versioning

- Public APIs must be versioned.
- Breaking changes require a new API version or a documented migration path.
- Backward compatibility should be preserved whenever possible.

### Pagination

- List endpoints must support pagination.
- Pagination defaults must be safe.
- Maximum page sizes must be enforced.
- Pagination metadata must be returned consistently.

### Filtering and Sorting

- Filtering fields must be allowlisted.
- Sorting fields must be allowlisted.
- Invalid filters or sort fields must return clear validation errors.
- Tenant scope must always be enforced independently from client-provided filters.

### Standard Response Format

Successful responses should be consistent within each API.

Recommended shape:

```json
{
  "data": {},
  "meta": {}
}
```

### Error Response Format

Error responses should be consistent and safe to expose.

Recommended shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request is invalid.",
    "details": []
  }
}
```

Error messages must not expose secrets, stack traces, SQL details, or internal infrastructure details.

## 16. Performance

Performance must be designed into the platform, not patched in late.

### Frontend Performance

- Use code splitting for large routes and heavy components.
- Lazy-load expensive UI modules.
- Avoid unnecessary re-renders.
- Use memoization only when it provides measurable value.
- Optimize images and static assets.
- Keep client bundles small.

### Backend Performance

- Use database indexes for common query paths.
- Avoid N+1 query patterns.
- Use caching where it improves latency and does not weaken correctness.
- Use background workers for expensive or slow tasks.
- Use queues for retryable asynchronous work.
- Keep API response payloads focused.

### Database Performance

- Index tenant keys and common filter fields.
- Index foreign keys.
- Review query plans for critical queries.
- Avoid unbounded queries.
- Use pagination for large datasets.
- Archive or partition high-volume audit or event data when needed.

### Redis and Caching

- Use Redis for caching, rate limiting, queues, sessions, or distributed coordination only when appropriate.
- Cache invalidation rules must be explicit.
- Do not cache tenant data without tenant-safe keys.
- Never cache sensitive data unless there is a clear, secure design.

## 17. Testing

Testing must protect business behavior, security, and integration boundaries.

### Unit Tests

- Unit tests should cover business rules, validators, permission checks, utilities, and isolated services.
- Tests must be deterministic.
- Tests must not depend on external services unless explicitly integration tests.

### Integration Tests

- Integration tests should cover API boundaries, database interactions, authentication flows, authorization checks, and sync behavior.
- Tenant isolation must be tested.
- Migration behavior should be tested for critical schema changes.

### End-to-End Tests

- E2E tests should cover critical user workflows.
- E2E tests should cover login, company context, permissions, invoice flows, admin workflows, and sync-critical workflows when implemented.
- E2E tests should be stable and meaningful.

### Test Naming

- Test names must describe behavior.
- Prefer names that read like requirements.

Examples:

- `should reject invoice access from another company`
- `should queue desktop operation when offline`
- `should deny admin endpoint access to company user`

### Coverage Expectations

- Critical business rules require strong test coverage.
- Permission checks require strong test coverage.
- Security-sensitive code requires strong test coverage.
- Synchronization logic requires strong test coverage.
- Coverage numbers are useful, but meaningful behavioral coverage matters more.

## 18. Git Rules

Git history must be clean, reviewable, and useful.

### Branch Strategy

- Use feature branches for new work.
- Use fix branches for bug fixes.
- Use release branches when preparing production releases.
- Keep branches focused on one logical change.

Suggested branch naming:

- `feature/invoice-drafts`
- `fix/sync-retry-status`
- `refactor/permission-evaluator`
- `docs/api-versioning`

### Commit Message Conventions

Use clear, conventional commit-style messages where possible.

Examples:

- `feat(client): add invoice draft workflow`
- `fix(sync): prevent duplicate queued operations`
- `docs(security): document token rotation rules`
- `refactor(auth): split refresh token service`

### Pull Requests

- Pull requests must be focused.
- Pull requests must describe the problem and solution.
- Pull requests must mention architecture or data model changes.
- Pull requests must mention security or tenant isolation implications.
- Pull requests must include tests or explain why tests are not applicable.
- Pull requests must not mix unrelated refactors with feature work.

### Code Reviews

- Reviews must check architecture, correctness, security, tenant isolation, tests, and maintainability.
- Reviewers should request changes for duplicated logic, misplaced code, unclear boundaries, or unsafe assumptions.
- Reviewers should prefer precise feedback with file and line references.

### Release Tags

- Use release tags for production releases.
- Tags must follow a consistent versioning scheme.
- Release notes must document user-facing changes, migrations, and operational requirements.

## 19. Documentation

Documentation is part of the product architecture.

### Documentation Rules

- Every major module must contain a README.
- Public APIs must be documented.
- Architecture changes must be documented.
- Database schema decisions must be documented when they affect behavior or operations.
- Security-sensitive flows must be documented.
- Synchronization behavior must be documented.
- Deployment and environment requirements must be documented.

### Documentation Quality

- Documentation must be accurate.
- Documentation must be updated in the same change that modifies behavior.
- Documentation must explain why important decisions were made, not only what changed.
- Avoid outdated diagrams or instructions.

## 20. AI Development Rules

This repository will frequently be developed with AI assistants such as Codex, ChatGPT, GitHub Copilot, and similar tools.

AI assistants must follow the same standards as human developers.

### Required AI Behavior

The AI must always:

- Respect the architecture.
- Respect the existing folder structure.
- Never refactor unrelated code.
- Never create unnecessary abstractions.
- Never duplicate logic.
- Keep changes minimal and focused.
- Keep files small.
- Reuse shared packages.
- Explain architectural decisions.
- Preserve backward compatibility whenever possible.
- Ask for clarification if a requested change conflicts with the architecture.
- Avoid introducing framework initialization unless explicitly requested.
- Avoid installing packages unless explicitly requested.
- Avoid changing database structure without migration planning.
- Avoid weakening tenant isolation, security, or authorization boundaries.

### AI Code Change Rules

- Read the surrounding code before editing.
- Follow existing conventions.
- Prefer small patches.
- Do not rewrite working modules without a clear reason.
- Do not move code across layers without explaining why.
- Do not add broad abstractions before real duplication exists.
- Do not invent new architecture when an existing pattern is present.
- Do not remove tests unless they are replaced or clearly obsolete.

### AI Documentation Rules

- Document architectural decisions when they affect future development.
- Update relevant README files when adding major modules.
- Keep documentation concise but complete.
- Do not generate misleading documentation for code that does not exist yet.

## Final Rule

Every change to Facturance must make the platform easier to understand, safer to operate, and better prepared for international growth.

When there is a conflict between speed and long-term platform quality, choose the path that protects maintainability, scalability, security, and future evolution.

