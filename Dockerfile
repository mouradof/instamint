FROM node:alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install


COPY . .

RUN npm run build

FROM node:alpine
WORKDIR /app

COPY --from=builder /app/src/app ./src/app
COPY --from=builder /app/src/pages ./src/pages

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/jsconfig.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/eslint.config.mjs ./
COPY --from=builder /app/.eslintrc.mjs ./
COPY --from=builder /app/.prettierrc ./
COPY --from=builder /app/nodemon.json ./

RUN npm install nodemon -g

EXPOSE 3000

CMD ["npm", "run", "devmon"]
