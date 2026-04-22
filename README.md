# Module 11 — Assemblage Final & Docker

## Objectif

Déployer l'application complète avec **Docker Compose** : une seule commande pour lancer les 3 services (PostgreSQL, backend, frontend).

---

## Ce que vous allez apprendre

- Écrire un **Dockerfile** (backend et frontend)
- Orchestrer plusieurs services avec **Docker Compose**
- Les **volumes Docker** : données persistantes et hot-reload
- La communication inter-services dans Docker (`PG_HOST: postgres`, pas `localhost`)
- Le healthcheck : attendre que PostgreSQL soit prêt avant de démarrer le backend

---

## Structure ajoutée dans ce module

```
nikebasket/
├── docker-compose.yml      ← TODO : orchestrer les 3 services
├── backend/
│   └── Dockerfile          ← TODO : conteneuriser le backend
├── frontend/
│   └── Dockerfile          ← TODO : conteneuriser le frontend
└── scripts/
    └── seed.js             ← donné : données de test
```

---

## Votre mission

### TODO 1 & 2 & 3 — docker-compose.yml

Configurer les 3 services. Point crucial :
```yaml
# ❌ Dans le code local (hors Docker)
PG_HOST: localhost

# ✅ Dans docker-compose.yml (le backend parle au service "postgres")
PG_HOST: postgres
```
Dans Docker, les conteneurs se parlent via le **nom du service** (pas localhost).

### TODO — Dockerfiles

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./   # ← copier AVANT npm install (cache Docker)
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]
```

---

## Lancer avec Docker

```bash
# Construire les images et démarrer
docker-compose up

# Puis dans un autre terminal, peupler la base
docker exec nikebasket_api node scripts/seed.js

# Accéder au site
# Frontend : http://localhost:5173
# API      : http://localhost:3001
# Swagger  : http://localhost:3001/api/docs

# Comptes créés par seed.js :
# Admin  : admin@nikebasket.fr  / Admin1234!
# Client : client@nikebasket.fr / Client1234!
```

---

## Lancer sans Docker (développement)

```bash
# PostgreSQL : psql -U postgres -c "CREATE DATABASE ecommerce;"
#              psql -U postgres -d ecommerce -f database/schema.sql

# Terminal 1 — Backend
cd backend && cp .env.example .env && npm install && npm run dev

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev

# Données de test
cd backend && node ../scripts/seed.js
```

---

## Questions de compréhension

1. Pourquoi copie-t-on `package*.json` AVANT `COPY . .` dans le Dockerfile ?
2. Pourquoi `PG_HOST: postgres` et non `localhost` dans docker-compose.yml ?
3. À quoi sert le `healthcheck` sur le service postgres ?
4. Quelle est la différence entre un volume nommé (`postgres_data`) et un bind mount (`./backend:/app`) ?

---

## Félicitations !

Vous venez de construire de A à Z un **site e-commerce complet** en React / Node.js / PostgreSQL.

Le projet final est disponible ici : [nikebasket-migration](https://github.com/DilipNiro/nikebasket-migration)
