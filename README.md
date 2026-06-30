# facturance-platform

Professional SaaS, desktop, and mobile platform structure for Facturance.

This repository is organized to keep public apps, dashboards, APIs, shared packages, databases, infrastructure, and documentation clearly separated. PostgreSQL is the cloud source of truth, while the desktop app can use a local SQLite cache for offline work and synchronization.

## Repository Strategy

This repository is the orchestration repository for the Facturance Platform.
Applications and services are planned to be managed as Git submodules so each platform component can be developed, versioned, and deployed independently.

Do not initialize frameworks inside app/service folders before their submodule repositories are created.
