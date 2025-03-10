# App Tool and App TM Project with Docker

This repository provides a complete setup of an application composed of two services:

- **App Tool** as an interface tool.
- **App TM** as a translation memory API.

Both applications run in Docker containers, orchestrated by Docker Compose for streamlined deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Building and Running the Project](#building-and-running-the-project)
- [Useful Commands](#useful-commands)
- [Security Considerations](#security-considerations)
- [Contributions](#contributions)

---

## Prerequisites

Ensure you have the following components installed on your local machine:

- **Docker** version 20.x or above
- **Docker Compose** version 1.27 or above

## Project Structure

The project structure is organized with two main directories for the applications and a `docker-compose.yml` file for service configuration.

```plaintext
.
├── app-tool/                   # App Tool application source code
│   ├── .env
│   └── Dockerfile
├── app-tm/                     # App TM application source code
│   ├── .env 
│   └── Dockerfile
├── docker-compose.yml          # Docker Compose service configuration
└── README.md                   # This file
```

## Environment Configuration

To customize the configuration, create an `.env` file in the project root directory with the following variables (if they don’t already exist in your project):

```plaintext
# Environment variables for docker-compose.yml
# Environment variables for MTQE huggingface token
HF_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Environment variables for App Tool
DATABASE_URL="mysql://root:<DB_PASSWORD>@<DB_HOST>:3306/<DB_NAME>"
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
MINT_CLIENT_ID=<YOUR_MINT_CLIENT_ID>
MINT_CLIENT_SECRET=<YOUR_MINT_CLIENT_SECRET>
NEXT_PUBLIC_TM_HOST=http://localhost:3005/api-tm
SEGMENTED_TEXTS_HOST=http://localhost:81
MT_TEXTS_HOST=http://<MT_HOST>:8080/NexRelay/v1/translate
OXIGEN_API_HOST=https://<OXIGEN_API_HOST>/oxygen
MTQE=http://<MTQE_HOST>/module/mtqe_score/process_list


# Environment variables for app-tm
FASTIFY_PORT=3005
FASTIFY_HOST=0.0.0.0
HOST_OPENSEARCH="<OPENSEARCH_HOST>"
HOST_OPENSEARCH_AUTH="<OPENSEARCH_USER>:<OPENSEARCH_PASSWORD>"


```


> **Note**: Be sure to adapt the URLs according to your deployment environment.

## Building and Running the Project

### Step 1: Build the Containers

From the project root directory, run the following command to build all services:

```bash
docker-compose up --build
```

This command:

- Builds Docker images for `app-tool`, `app-tm`, and `sbd_server`.
- Starts the services and exposes them on the ports defined in `docker-compose.yml`.

### Step 2: Access the Services

- **Next.js** will be available at [http://localhost:3000](http://localhost:3000)
- **Fastify** will be available at [http://localhost:3005](http://localhost:3005)
- **sbd_server** (additional service) will be available at [http://localhost:81](http://localhost:81)

## Useful Commands

### Stop All Containers

To stop and remove the containers:

```bash
docker-compose down
```

### Open a Terminal in a Container

To access a terminal inside one of the containers (e.g., `app-tool`):

```bash
docker-compose exec app-tool /bin/sh
```

### Regenerate the Prisma Client

If you make changes to the Prisma schema, you can regenerate the client directly:

```bash
docker-compose exec app-tool npx prisma migrate dev --name "initial_migration" --schema=./prisma/schema.prisma
docker-compose exec app-tool npx prisma migrate deploy --schema=./prisma/schema.prisma
docker-compose exec app-tool npx prisma generate --schema=/app/prisma/schema.prisma
```

## Security Considerations

1. **Sensitive Environment Variables**: Avoid storing sensitive credentials directly in the `.env` file; consider using a secret manager in production.
2. **File Permissions**: Critical files in `public/files` are set up with read and write permissions for the container.
3. **Port Exposure**: In production, ensure only necessary ports are publicly exposed.

## Contributions

Contributions are welcome. Please follow these steps to contribute:

1. Fork this repository.
2. Create a new branch for your changes: `git checkout -b feature/new-feature`.
3. Once ready, open a detailed pull request.

---

This README provides a clear and concise guide for installing, configuring, and deploying your project in development and production environments.

# pecat-europeana-pack
