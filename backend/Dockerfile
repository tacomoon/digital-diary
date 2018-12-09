FROM node:10.14

ENV NODE_ENV production
ENV BLUEBIRD_LONG_STACK_TRACES 1

COPY . /backend/
WORKDIR /backend

CMD npm install && node src/index.js