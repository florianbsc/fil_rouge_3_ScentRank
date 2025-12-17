# Fil_Rouge_3 – ScentRank

## 📌 Présentation du projet

**ScentRank** est une application mobile permettant aux utilisateurs de **voter, analyser et consulter les tendances autour des parfums**, selon plusieurs critères objectifs et subjectifs (sentiment, saison, longévité, sillage, etc.).

L’objectif est de proposer une **vision communautaire et statistique** des parfums, au-delà des simples avis textuels, afin d’aider les utilisateurs à faire un choix éclairé.

---

## 🎯 Objectifs de l’application

- Permettre aux utilisateurs de **voter sur un parfum** selon plusieurs critères normalisés
- Calculer et afficher les **tendances et moyennes globales**
- Proposer un **classement des parfums les mieux notés**
- Offrir une base évolutive vers des **recommandations intelligentes**

---

## 👥 Acteurs de l’application

### Invité
- Consulter les tendances et moyennes de votes
- Créer un compte
- ❌ Ne peut pas voter ni commenter

### Utilisateur (connecté)
- S’authentifier
- Voter sur un parfum selon plusieurs critères
- Consulter les tendances et ses propres votes
- Laisser un commentaire sur un parfum

### Administrateur
- Toutes les fonctionnalités utilisateur
- Ajouter / modifier / supprimer des parfums
- Modérer ou supprimer les commentaires

---

## 🚀 Fonctionnalités

### MVP (Minimum Viable Product)

#### Gestion des comptes
- Inscription / connexion / déconnexion (email + mot de passe)
- Rôles : invité, utilisateur, administrateur

#### Base de données des parfums
- Fiche parfum :
    - nom
    - marque
    - photo
    - famille olfactive
    - notes olfactives
    - prix

#### Système de votes
Critères disponibles :
- Sentiment général : `love`, `like`, `ok`, `dislike`, `hate`
- Saison : `winter`, `spring`, `summer`, `fall`
- Moment : `day`, `night`
- Occasion : `night club`, `date`, `meeting`, `office`, `vacation`
- Longévité
- Sillage
- Rapport qualité / prix
- Genre perçu : `male`, `female`, `unisex`

👉 Un utilisateur peut voter **une seule fois par critère et par parfum** (vote modifiable).

#### Affichage des tendances
- Moyennes par critère
- Statistiques globales
- Top 5 des parfums les mieux notés

#### Administration
- CRUD parfums
- Suppression de commentaires

---

### MVP+ (Fonctionnalités avancées)

- Historique des votes
- Favoris / collection personnelle
- Avis textuels et interactions sociales
- Classement des utilisateurs (gamification)
- Recherche et filtres avancés
- Recommandations intelligentes
- Graphiques (radar, barres)
- Notifications
- Dashboard administrateur
- Détection de votes suspects
- Mise en avant d’avis experts

---

## 🧪 Gestion des réponses HTTP

### Succès
- `200 OK` : consultation des données
- `201 Created` : création (compte, vote, commentaire, parfum)
- `204 No Content` : suppression réussie

### Sécurité & logique métier
- `401 Unauthorized` : action sans authentification
- `403 Forbidden` : droits insuffisants
- `409 Conflict` : conflit de données (vote en double, email existant)

### Validation
- `400 Bad Request` : données invalides
- `422 Unprocessable Entity` : données incohérentes
- `404 Not Found` : ressource inexistante

### Erreurs serveur
- `500 Internal Server Error`
- `502 / 503 / 504` : dépendance indisponible

---

## 🏗️ Architecture technique

### Stack principale

#### Frontend mobile
- React Native (Expo)
- TypeScript
- SQLite (stockage local)

#### Backend
- Express.js (TypeScript)
- API REST

#### Base de données
- **MongoDB** : utilisateurs, parfums, votes, commentaires
- **Redis** : cache des tendances (optionnel / futur)
- **Neo4j** (futur) : recommandations avancées

#### Authentification
- Firebase Authentication
- JWT

---

## 🛠️ Outils & environnement

- Docker / Docker Compose
- GitLab CI/CD
- Bruno (tests d’API)
- IDE :
    - WebStorm
    - Visual Studio Code
    - IntelliJ

---

## 🌿 Organisation Git

### Branches
- `main` : production
- `develop` : développement principal
- `PRO403-X-nom-de-la-tache` : branche de fonctionnalité

### Convention de commits


Types :
- feat
- fix
- docs
- style
- refactor
- test
- chore
- perf

---

## 📂 Structure des répertoires

Fil_Rouge_3
├── backend-express
├── init-mongo
├── mongodb_data
├── ScentRank (frontend mobile)
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile
├── .env.dev
├── .env.prod
└── README.Docker.md


---

## 🔗 Liens utiles

- Jira : *(à compléter)*

---

## 📌 Contexte

- Projet : **Fil rouge / projet pédagogique**
- Objectif : conception d’une application mobile complète (mobile + API)
- Orientation : qualité logicielle, architecture propre, évolutivité

---

## 📄 Licence

Projet à usage pédagogique – licence à définir.
