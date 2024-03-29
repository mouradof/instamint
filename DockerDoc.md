## Instamint Docker Documentation

### System Requirements

- **Docker**: Version 19.03.0 or higher.
- **Docker Compose**: Version 1.25.0 or higher.

### Project Structure

- **Dockerfile**: Contains instructions to build the Docker image for the Instamint frontend application.
- **docker-compose.yml**: Defines the necessary services for the project (Instamint frontend, Keycloak, PostgreSQL, pgAdmin) and their configurations.

### docker-compose.yml Configuration

The `docker-compose.yml` file orchestrates the configuration of the following services:

1. **instamint-frontend**: The user interface of Instamint.
   - **Port**: 3000
2. **keycloak**: Authentication service.
   - **Port**: 8081
   - Depends on `postgres-db`.
3. **postgres-db**: PostgreSQL database service.
   - **Port**: 5432
   - Volume `postgres-data` for data persistence.
4. **pgadmin**: Database administration tool.
   - **Port**: 5050
   - Depends on `postgres-db`.

### Deployment Instructions

1. **Building and starting services**:

   - Run `docker compose up -d --build` in the project's root directory.

2. **Accessing services**:

   - **Frontend**: `http://localhost:3000`
   - **Keycloak Admin Console**: `http://localhost:8081`
   - **pgAdmin**: `http://localhost:5050`

3. **Database configuration in pgAdmin**:
   - **Host**: `postgres-db`
   - **User**: `user`
   - **Password**: `password`

### Maintenance and Troubleshooting

- **Service Logs**: Use `docker logs [SERVICE_NAME]` to view logs and identify potential issues.
- **Restarting Services**: If a service requires restarting, use `docker restart [SERVICE_NAME]`.
- **Updating Docker Images**: To update an image, rebuild the concerned service with `docker compose up -d --build [SERVICE_NAME]`.

### Extending the Project

- **Adding Services**: To integrate new services, add them to the `docker-compose.yml` file with the appropriate configuration.
- **Customizing Keycloak**: You can extend Keycloak's capabilities by adding identity providers, custom themes, or configuring advanced authentication flows.

### Best Practices

- **Security**: Ensure your configurations and passwords are secure, especially for production environments.
- **Backups**: Implement backup strategies for important data, especially for the PostgreSQL database.

### Common Problem Resolution

- **Database Connection Issues**: Ensure dependent services are launched in the correct order. Docker Compose generally manages this, but issues may occur if services are restarted individually.
- **Docker Build Errors**: Check the build logs for specific errors and ensure all necessary dependencies are correctly configured in your Dockerfile.
