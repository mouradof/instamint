#!/bin/bash

# Apply Kubernetes configurations for frontend
kubectl apply -f ./.config/frontend/deployment.yaml
kubectl apply -f ./.config/frontend/service.yaml

# Apply Kubernetes configurations for APIs
kubectl apply -f ./src/api-user/deployment.yaml
kubectl apply -f ./src/api-user/service.yaml
kubectl apply -f ./src/api-relation/deployment.yaml
kubectl apply -f ./src/api-relation/service.yaml
kubectl apply -f ./src/api-post/deployment.yaml
kubectl apply -f ./src/api-post/service.yaml
kubectl apply -f ./src/api-notification/deployment.yaml
kubectl apply -f ./src/api-notification/service.yaml
kubectl apply -f ./src/api-nft/deployment.yaml
kubectl apply -f ./src/api-nft/service.yaml

# Apply Kubernetes configurations for PostgreSQL, pgAdmin, and Mailhog
kubectl apply -f ./.config/postgres/deployment.yaml
kubectl apply -f ./.config/postgres/service.yaml
kubectl apply -f ./.config/pgadmin/deployment.yaml
kubectl apply -f ./.config/pgadmin/service.yaml
kubectl apply -f ./.config/mailhog/deployment.yaml
kubectl apply -f ./.config/mailhog/service.yaml

# Apply Ingress Controller
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.9.1/cert-manager.yaml

# Apply ClusterIssuer
kubectl apply -f ./.config/ingress/cluster-issuer.yaml

# Apply Ingress configurations
kubectl apply -f ./.config/ingress/ingress.yaml
