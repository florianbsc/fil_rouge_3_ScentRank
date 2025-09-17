## Commandes utiles

### Lancer en dev (avec hot reload et volumes) :
`docker compose -f docker-compose.dev.yml up --build` en cas d'erreur du fichier .env faire
`docker compose -f docker-compose.dev.yml --env-file .env.dev up --build`

### Lancer en prod (image optimisée) :
`docker compose -f docker-compose.prod.yml up --build -d` ou en cas d'erreur
`docker compose -f docker-compose.prod.yml --env-file .env.prod up --build -d`

### Arrêter et nettoyer :
`docker compose -f docker-compose.dev.yml down -v`

### Liste les conteneurs :
`docker ps -a`

### Supprimer un conteneur :
`docker rm -f nom-conteneur`

### Supprimer tous les conteneurs
``

## Supprime les volumes
`docker volume prune --all`
