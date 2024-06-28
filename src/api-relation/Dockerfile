# api-auth/Dockerfile
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && \
    apt-get install -y make gcc g++ python3 python3-pip && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apt-get remove -y make gcc g++ python3 python3-pip && \
    apt-get autoremove -y

RUN npm install nodemon -g

CMD ["npm", "run", "dev"]