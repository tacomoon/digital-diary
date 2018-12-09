FROM node:10.14

ENV NODE_ENV development
ENV BLUEBIRD_LONG_STACK_TRACES 1

COPY . /backend/
WORKDIR /backend

CMD node src/index.js