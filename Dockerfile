FROM node:22-alpine

ARG VITE_CMS_TOKEN
ARG VITE_CMS_URL

ENV VITE_CMS_TOKEN=${VITE_CMS_TOKEN}
ENV VITE_CMS_URL=${VITE_CMS_URL}

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm i -g serve

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
