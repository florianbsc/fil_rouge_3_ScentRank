# ───────────────────────────────
# 1⃣ STAGE BASE
# ───────────────────────────────
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@latest

# ───────────────────────────────
# 2⃣ STAGE DEV (utilisé par docker-compose)
# ───────────────────────────────
FROM base AS dev

# Installe uniquement les dépendances nécessaires au dev
RUN npm install

# Copie du reste du projet
COPY . .

# Installation du CLI ExpressJS uniquement pour le dev
RUN npm install -g nodemon
# RUN npm install -g @nestjs/cli

# Active le hot reload avec NestJS
CMD ["npm", "run", "start:dev"]


# ===============================
# Étape de build (compilation)
# ===============================
FROM node:20-alpine AS build
WORKDIR /usr/src/app

# Copie uniquement package.json et lockfile pour tirer parti du cache Docker
COPY package*.json ./

# Installation stricte et déterministe des dépendances
RUN npm ci

# Copie du code source après installation des deps
COPY .. .

# Compilation du projet (sortie dans dist/)
RUN npm run build

# Nettoyage des fichiers inutiles (docs/tests si tu veux réduire encore)
RUN rm -rf node_modules test .dockerignore Dockerfile


# ===============================
# Étape finale (image de prod minimale)
# ===============================
FROM node:20-alpine AS prod
WORKDIR /usr/src/app

# Copie uniquement package.json et lockfile
COPY package*.json ./

# Installation des dépendances de prod uniquement
RUN npm ci --omit=dev && npm cache clean --force

# Copie des fichiers compilés depuis l’étape build
COPY --from=build /usr/src/app/dist ./dist

# (Optionnel) Ajout d’un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Lancement de l’application
CMD ["node", "dist/main.js"]
