
# Next.js Application with Docker

This repository contains a Next.js application configured to run within a Docker container, with environment variables, database connection, and Prisma integration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Project Structure](#project-structure)
- [Building and Running the Application](#building-and-running-the-application)
- [Useful Commands](#useful-commands)
- [Security Considerations](#security-considerations)
- [Contributions](#contributions)

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Docker** version 20.x or above
- **Docker Compose** version 1.27 or above

## Environment Configuration

Create an `.env` file in the root directory of the project (`app-tool`) with the following variables:

```plaintext
DATABASE_URL="mysql://root:<DB_PASSWORD>@<DB_HOST>:3306/<DB_NAME>"
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
MINT_CLIENT_ID=<YOUR_MINT_CLIENT_ID>
MINT_CLIENT_SECRET=<YOUR_MINT_CLIENT_SECRET>
NEXT_PUBLIC_TM_HOST=http://localhost:3005/api-tm
SEGMENTED_TEXTS_HOST=http://localhost:81
MT_TEXTS_HOST=http://<MT_HOST>:8080/NexRelay/v1/translate
OXIGEN_API_HOST=https://<OXIGEN_API_HOST>/oxygen/
```

Replace the placeholders (`<DB_PASSWORD>`, `<DB_HOST>`, etc.) with your actual credentials. 

## Project Structure

This is the project structure based on your uploaded structure:

```plaintext
app-tool/
├── app/                          # Application-specific modules and files
├── components/                   # Reusable components
├── lib/                          # Library functions and utilities
├── prisma/                       # Prisma schema and migrations
├── public/                       # Static assets
├── .env                          # Environment variables
├── Dockerfile                    # Dockerfile for building the app
├── jsconfig.json                 # JavaScript configuration
├── middleware.js                 # Next.js middleware
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # Project documentation
├── store.js                      # State management
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── next-env.d.ts                 # TypeScript environment configuration
```

## Building and Running the Application

### Step 1: Build the Docker Image

From the `app-tool` directory, run the following command to build the Docker image:

```bash
docker build -t nextjs-app .
```

### Step 2: Run the Docker Container

After building the image, start the container with:

```bash
docker run -p 3000:3000 nextjs-app
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Useful Commands

### Access the Container's Shell

To open a shell in the running container:

```bash
docker exec -it <container_id> /bin/sh
```

Replace `<container_id>` with the actual container ID, which you can find by running `docker ps`.

### Rebuild the Prisma Client

If you make changes to the Prisma schema, regenerate the Prisma client with:

```bash
docker exec -it <container_id> npx prisma generate --schema=/app/prisma/schema.prisma
```

## Security Considerations

1. **Environment Variables**: Avoid storing sensitive credentials in the `.env` file; consider using a secret manager in production.
2. **Exposed Ports**: In production, ensure only necessary ports are exposed. Here, only port 3000 is needed for the Next.js app.

## Contributions

Contributions are welcome. To contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Open a detailed pull request.

---

This README should provide a clear guide for setting up, configuring, and deploying the Next.js application in a Dockerized environment.
