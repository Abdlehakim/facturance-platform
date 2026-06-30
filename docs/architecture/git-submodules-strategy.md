# Git Submodules Strategy

## Overview

`facturance-platform` is the main orchestration repository for the Facturance Platform.

The orchestration repository keeps project-wide documentation, database assets, infrastructure assets, shared package planning, GitHub workflow configuration, and references to future application and service repositories.

## Application and Service Repositories

Each app and service will live in its own GitHub repository.

Planned application repositories:

- `apps/website`
- `apps/client-dashboard`
- `apps/admin-dashboard`
- `apps/desktop-app`
- `apps/mobile-app`

Planned service repositories:

- `services/auth-api`
- `services/client-api`
- `services/admin-api`
- `services/sync-api`
- `services/worker`

Each repository will be added to this orchestration repository as a Git submodule when it is created and ready to be linked.

## Independent Deployment

Each app and service should be designed so it can be deployed independently.

This approach supports separate release cycles, smaller deployment risk, clearer ownership, focused CI/CD pipelines, and future microservice compatibility.

## Placeholder Folder Rules

Submodule folders must not contain normal source code before they are linked to their independent repositories.

Before a submodule is linked, each reserved app or service folder must contain only a minimal `README.md` explaining that the folder is reserved for a future Git submodule.

Do not initialize frameworks, install packages, create package manifests, or add application or service code inside these placeholder folders.

## Submodule Updates

Submodules must be updated intentionally.

When updating a submodule reference, developers must review the target repository changes, select the intended commit, and commit the updated submodule pointer in the orchestration repository.

The orchestration repository should always point to known-good app and service commits.

## Shared Packages

Shared packages may remain in the main repository at first.

If the platform grows to require independent versioning, publishing, or ownership for shared logic, selected packages can later become independent packages or separate repositories.

