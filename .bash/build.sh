#!/bin/bash

docker build -t frontend .
docker build -t api-user ./src/api-user
docker build -t api-relation ./src/api-relation
docker build -t api-post ./src/api-post
