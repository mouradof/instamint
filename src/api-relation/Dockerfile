# api-auth/Dockerfile
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install nodemon -g

CMD ["npm", "run", "dev"]
