FROM node:20.11.0-alpine3.19 as build

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 8080

CMD ["yarn", "run", "start:prod"]
