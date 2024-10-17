
# Fastify Application with Docker

This repository contains a Fastify application configured to run within a Docker container for efficient development and deployment.

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

Create an `.env` file in the root directory of the Fastify project (`app-tm`) with any required environment variables. Example configuration:

```plaintext
DATABASE_URL="mysql://root:<DB_PASSWORD>@<DB_HOST>:3306/<DB_NAME>"
FASTIFY_PORT=3005
FASTIFY_HOST=0.0.0.0
OTHER_API_KEY=<YOUR_API_KEY>
```

Replace `<DB_PASSWORD>`, `<DB_HOST>`, `<DB_NAME>`, and `<YOUR_API_KEY>` with your actual credentials.

## Project Structure

Here’s an overview of the project structure based on the image provided:

```plaintext
app-tm/
├── db/                          # Database-related files and migrations
├── plugins/                     # Fastify plugins configuration
├── routes/                      # Application routes
├── test/                        # Test files and test setup
├── utils/                       # Utility functions
├── .env                         # Environment variables
├── app.js                       # Main application file
├── Dockerfile                   # Dockerfile for building the app
├── package.json                 # Project dependencies
├── README.md                    # Project documentation
└── yarn.lock                    # Yarn lock file for dependency management
```

## Building and Running the Application

### Step 1: Build the Docker Image

From the `app-tm` directory, run the following command to build the Docker image:

```bash
docker build -t fastify-app .
```

### Step 2: Run the Docker Container

After building the image, start the container with:

```bash
docker run -p 3005:3005 fastify-app
```

The application will be accessible at [http://localhost:3005](http://localhost:3005).

## Useful Commands

### Access the Container's Shell

To open a shell in the running container:

```bash
docker exec -it <container_id> /bin/sh
```

Replace `<container_id>` with the actual container ID, which you can find by running `docker ps`.

### Run Tests

If you have tests configured, you can run them within the container. For example:

```bash
docker exec -it <container_id> yarn test
```

### Install New Dependencies

If you need to add new dependencies, install them on your host machine and rebuild the container:

```bash
yarn add <package_name>
docker-compose up --build
```

## Security Considerations

1. **Environment Variables**: Avoid storing sensitive credentials in plain text in the `.env` file. Consider using a secret manager in production.
2. **Port Exposure**: Ensure only necessary ports are exposed. For this application, only port 3005 should be exposed.

## Contributions

Contributions are welcome. To contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Open a detailed pull request.

---

This README should provide clear guidance for setting up, configuring, and deploying the Fastify application in a Dockerized environment.
