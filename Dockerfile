FROM node:10.2.1-alpine

WORKDIR /usr/app/

COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY ./ ./
