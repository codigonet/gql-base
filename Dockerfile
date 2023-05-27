FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm i --no-fund
CMD npm start
