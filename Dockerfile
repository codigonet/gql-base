FROM node:18-alpine

WORKDIR /app
COPY ./dist .

RUN npm i --no-fund
CMD npm start
