#!/bin/bash

kubectl delete -f ./.config/frontend/deployment.yaml
kubectl delete -f ./.config/frontend/service.yaml
kubectl delete -f ./src/api-user/deployment.yaml
kubectl delete -f ./src/api-user/service.yaml
kubectl delete -f ./src/api-relation/deployment.yaml
kubectl delete -f ./src/api-relation/service.yaml
kubectl delete -f ./src/api-post/deployment.yaml
kubectl delete -f ./src/api-post/service.yaml
kubectl delete -f ./.config/postgres/deployment.yaml
kubectl delete -f ./.config/postgres/service.yaml
kubectl delete -f ./.config/pgadmin/deployment.yaml
kubectl delete -f ./.config/pgadmin/service.yaml
kubectl delete -f ./.config/mailhog/deployment.yaml
kubectl delete -f ./.config/mailhog/service.yaml