# ==============================
# Makefile - Gestion Docker Dev
# ==============================

COMPOSE_FILE=docker-compose.dev.yml
ENV_FILE=.env.dev

# Lancer les conteneurs avec build
up:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up --build

# Lancer les conteneurs sans rebuild
start:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d

# Arrêter les conteneurs
down:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) down

# Rebuild sans cache
rebuild:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) build --no-cache

# Voir les logs en temps réel
logs:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) logs -f

# Restart rapide
restart: down up

# Nettoyer conteneurs + volumes
clean:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) down -v --remove-orphans

# Exécuter une commande dans un service (ex: make exec service=backend cmd="npm run test")
exec:
	docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec $(service) $(cmd)

#mongoDB
# docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec mongo-dev \
  #  mongosh "mongodb://$$MONGO_INITDB_ROOT_USERNAME:$$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/$$MONGO_INITDB_DATABASE" \
  #  /scripts/seed.js