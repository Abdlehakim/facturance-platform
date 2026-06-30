# facturance-platform

Professional SaaS, desktop, and mobile platform structure for Facturance.

This repository is organized to keep public apps, dashboards, APIs, shared packages, databases, infrastructure, and documentation clearly separated. PostgreSQL is the cloud source of truth, while the desktop app can use a local SQLite cache for offline work and synchronization.

## Repository Strategy

This repository is the orchestration repository for the Facturance Platform. Applications and services are planned to live in separate GitHub repositories and be added here as Git submodules.

Each app and service can then be developed, versioned, and deployed independently while this repository coordinates documentation, database planning, infrastructure planning, shared packages, and submodule references.

Do not initialize frameworks or add normal source code inside app/service folders before their submodule repositories are created and linked.
