# Git Submodules Strategy

## Purpose

The `facturance-platform` repository is the orchestration repository for the Facturance Platform. It owns the high-level structure, shared documentation, database planning assets, infrastructure planning assets, and repository coordination rules.

Application and service implementation code will live in independent repositories and will be mounted into this orchestration repository as Git submodules when those repositories are created.

## Repository Roles

### Orchestration Repository

The root `facturance-platform` repository manages:

- Project-wide documentation
- Database schema planning and migration structure
- Infrastructure and deployment planning assets
- GitHub workflow definitions
- Repository-level rules and standards
- Submodule references for applications and services

The orchestration repository must not become a dumping ground for application or service implementation code.

### Application Repositories

Each application under `apps/` is planned to become an independent Git repository:

- `apps/website`
- `apps/client-dashboard`
- `apps/admin-dashboard`
- `apps/desktop-app`
- `apps/mobile-app`

Each application repository can choose the framework, build process, deployment target, and release cycle approved for that component.

### Service Repositories

Each service under `services/` is planned to become an independent Git repository:

- `services/auth-api`
- `services/client-api`
- `services/admin-api`
- `services/sync-api`
- `services/worker`

Each service repository can be developed, tested, versioned, and deployed independently.

## Independent Deployment

Applications and services must be designed so they can be deployed independently whenever practical.

This supports:

- Separate release cycles
- Smaller deployment blast radius
- Clear ownership boundaries
- Service-specific CI/CD pipelines
- Independent scaling
- Future microservice compatibility

Shared contracts must be documented and versioned carefully so independent deployment does not break compatibility.

## Submodule Update Rules

Git submodules must be updated intentionally.

Developers must:

- Know which submodule commit is being updated.
- Review the changes inside the submodule repository.
- Update the orchestration repository only after selecting the intended submodule commit.
- Document important app or service version changes in the related pull request.
- Avoid accidental submodule pointer changes.

The orchestration repository should always point to known-good submodule commits.

## App and Service Folder Rules

Before submodules are created, app and service folders must contain only minimal placeholder documentation.

Do not:

- Initialize frameworks inside placeholder folders.
- Install packages inside placeholder folders.
- Add application or service code inside placeholder folders.
- Create local package manifests inside placeholder folders.
- Treat placeholder folders as final repositories.

When a real repository is ready, the placeholder folder should be replaced by the Git submodule through an intentional repository operation.

## Shared Packages Strategy

The shared packages strategy will be decided later.

Possible future approaches include:

- Keeping `packages/` in the orchestration repository.
- Moving shared packages into one or more independent repositories.
- Publishing shared packages through a private package registry.
- Using selected shared packages as submodules.

No shared package strategy should be finalized until the platform needs, deployment model, and ownership boundaries are clearer.

## Principle

The orchestration repository coordinates the platform. App and service repositories own implementation details.

This separation keeps Facturance scalable, maintainable, and ready for independent development and deployment across a larger engineering organization.

