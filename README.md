## Commandes utiles

### Lancer en dev (avec hot reload et volumes) :

`docker compose -f ./infra/docker/docker-compose.dev.yml --profile dev up --build`


[//]: # (### Lancer en prod &#40;image optimisée&#41; :)

[//]: # ()
[//]: # (`docker compose -f docker-compose.prod.yml --env-file .env.prod up --build -d` )

### Arrêter et nettoyer :

`docker compose -f ./infra/docker/docker-compose.dev.yml --profile dev down -v`

### Liste les conteneurs :
`docker ps -a`

### Supprimer un conteneur :
`docker rm -f nom-conteneur`

### Supprimer tous les conteneurs
`docker system prune --all`

## Supprime les volumes
`docker volume prune --all`


# Debug

Si api n’apparaît pas → c’est que le profil `"dev" n’est pas activé.
Teste alors avec :

`docker compose -f docker-compose.dev.yml --profile dev up --build`