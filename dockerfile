FROM node:18-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 1414

CMD [ "node", "server.js"]