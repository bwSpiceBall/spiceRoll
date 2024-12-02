FROM node:18-alpine

ARG VITE_CMS_TOKEN
ARG VITE_CMS_URL

ENV VITE_CMS_TOKEN=${VITE_CMS_TOKEN}
ENV VITE_CMS_URL=${VITE_CMS_URL}

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
