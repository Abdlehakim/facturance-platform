# Local Development Infrastructure

This document describes the local Docker infrastructure for the Facturance platform.

The goal is to provide local infrastructure services only. Application and API services still run locally with their normal development commands.

## Included Services

The local Docker setup includes:

- PostgreSQL
- Redis
- Mailpit

## Excluded From This Milestone

This setup does not Dockerize:

- Website
- Client dashboard
- Admin dashboard
- Auth API
- Client API
- Admin API
- Sync API
- Worker
- Nginx
- MinIO

This setup also does not add production Docker configuration, Prisma migrations, database schema changes, or application service integration.

## Files

Docker Compose file:

```txt
infrastructure/docker/docker-compose.dev.yml
```

Environment example:

```txt
infrastructure/docker/.env.example
```

## Setup

From the repository root, copy the example environment file if you want local overrides:

```powershell
Copy-Item infrastructure/docker/.env.example infrastructure/docker/.env
```

Do not commit `.env`.

## Start Local Infrastructure

From the repository root:

```powershell
docker compose --env-file infrastructure/docker/.env.example -f infrastructure/docker/docker-compose.dev.yml up -d
```

If you created a local `.env` file:

```powershell
docker compose --env-file infrastructure/docker/.env -f infrastructure/docker/docker-compose.dev.yml up -d
```

## Stop Local Infrastructure

```powershell
docker compose -f infrastructure/docker/docker-compose.dev.yml down
```

## Stop And Remove Volumes

This deletes local PostgreSQL data:

```powershell
docker compose -f infrastructure/docker/docker-compose.dev.yml down -v
```

## Local Service URLs

PostgreSQL:

```txt
localhost:5432
```

Redis:

```txt
localhost:6379
```

Mailpit UI:

```txt
http://localhost:8025
```

Mailpit SMTP:

```txt
localhost:1025
```

## Local Database URL

```env
DATABASE_URL=postgresql://facturance:facturance@localhost:5432/facturance_platform?schema=public
```

## Development Model

During local development:

```txt
Docker:
- PostgreSQL
- Redis
- Mailpit

npm dev commands:
- Website
- Client dashboard
- Admin dashboard
- Auth API
- Client API
- Admin API
- Sync API
- Worker
```

## Next Milestone

After this infrastructure is available, the next milestone is to connect `services/auth-api` to PostgreSQL using Prisma.

Do not add Stripe, payment, JWT/session logic, dashboard routing, or production Docker as part of this local infrastructure milestone.
