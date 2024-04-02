FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "run", "start:dev"]