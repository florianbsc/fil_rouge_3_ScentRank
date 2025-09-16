FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Utilisé pour le hot reload en dev
RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]
