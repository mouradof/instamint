# InstaMint Platform Services

This repository contains the Docker configuration for the InstaMint platform, a suite of services including a frontend, multiple APIs, a PostgreSQL database, pgAdmin for database management, and MailHog for email testing.

## Docker Compose Configuration

The configuration is defined using Docker Compose in `docker-compose.yml` with the following services:

### Services

#### `instamint-frontend`
- **Description**: The frontend service for the InstaMint application.
- **Build context**: Current directory (`.`).
- **Ports**: Maps port 3000 on the host to port 3000 on the container.
- **Volumes**: Mounts the `./src/pages` directory to `/app/src/pages` inside the container.

#### `api-user`
- **Description**: API service handling user-related operations.
- **Build context**: `./src/api-user`.
- **Ports**: Maps port 4000 on the host to port 4002 on the container.
- **Environment Variables**: Configuration for SMTP and database connectivity.
- **Volumes**: Code directory and persistent node modules.

#### `api-relation`, `api-post`, `api-notification`, `api-nft`
- **Description**: APIs for different functionalities (relations, posts, notifications, NFTs).
- **Ports**: Maps port 4001, 4002, 4003, and 4004 respectively to port 4000 on their containers.
- **Environment Variables**: Database URL configurations.

#### `postgres-db`
- **Description**: PostgreSQL database service.
- **Image**: `postgres:15`.
- **Ports**: Maps port 5432 on both host and container.
- **Environment Variables**: PostgreSQL user, password, and database setup.
- **Volumes**: Persistent storage for database data.

#### `pgadmin`
- **Description**: Web-based PostgreSQL database management.
- **Image**: `dpage/pgadmin4`.
- **Ports**: Maps port 5050 on the host to port 80 on the container.
- **Environment Variables**: Admin credentials.
- **Depends on**: `postgres-db`.

#### `mailhog`
- **Description**: Email testing tool with a fake SMTP server.
- **Image**: `mailhog/mailhog`.
- **Ports**: Maps SMTP and web interface ports.

### Volumes

- `postgres-data`: Used to persist database data.

## Usage

To start the services, run the following command:

```bash
docker-compose up -d