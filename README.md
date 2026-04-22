# Module 02 — Serveur Express

## Objectif

Créer le serveur **Node.js/Express** qui se connecte à PostgreSQL et expose une première route de santé.

À la fin de ce module, votre backend répondra à `GET /api/health`.

---

## Ce que vous allez apprendre

- Initialiser un projet Node.js (`package.json`, `npm install`)
- Créer un serveur Express avec les middlewares essentiels
- Connecter Node.js à PostgreSQL avec un **pool de connexions** (`pg`)
- Charger les variables d'environnement avec `dotenv`
- Gérer les erreurs de manière centralisée

---

## Structure du projet à la fin de ce module

```
nikebasket/
├── database/
│   └── schema.sql          ✅ module 01
└── backend/
    ├── package.json        ← donné
    ├── .env.example        ← donné (copier en .env et remplir)
    └── src/
        ├── config/
        │   └── db.js       ← TODO : pool PostgreSQL
        ├── middleware/
        │   └── errorHandler.js  ← donné
        └── app.js          ← TODO : serveur Express
```

---

## Mise en place

```bash
cd backend
cp .env.example .env      # Copier et remplir vos identifiants PostgreSQL
npm install               # Installer les dépendances
```

---

## Votre mission

### Fichier 1 : `backend/src/config/db.js`

Créer le **pool de connexions** PostgreSQL en lisant les variables d'environnement `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`, `PG_DATABASE`.

### Fichier 2 : `backend/src/app.js`

Configurer le serveur Express avec :
- **CORS** avec `credentials: true` (obligatoire pour les cookies JWT)
- **cookie-parser** (pour lire les cookies dans `req.cookies`)
- **express.json()** (pour parser le corps des requêtes)
- Une route de santé : `GET /api/health`
- Le middleware d'erreurs en dernier

---

## Tester votre travail

```bash
npm run dev
# → Serveur démarré sur http://localhost:3001

curl http://localhost:3001/api/health
# → { "status": "ok", "timestamp": "..." }
```

---

## Questions de compréhension

1. Pourquoi `credentials: true` est-il indispensable dans la config CORS ?
2. Quelle est la différence entre un pool de connexions et une connexion directe ?
3. Pourquoi le middleware d'erreurs doit-il être monté **en dernier** ?
4. Que se passe-t-il si `dotenv.config()` est appelé après l'utilisation des variables ?

---

**Module suivant → `module-03-starter` : API Produits (CRUD)**
