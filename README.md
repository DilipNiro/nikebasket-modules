# NikeBasket — Parcours pédagogique (11 modules)

> Ressource pédagogique — Bachelor 3 Développeur Web & Application  
> Efrei Paris 2026 | ADNCLLY.DEV | Tuteur : Nabil ADNANE

Ce dépôt guide les étudiants dans la **construction du projet NikeBasket de A à Z** — un site e-commerce complet en **React / Node.js / PostgreSQL / Docker**.  
Les modules sont **linéaires** : chaque module s'appuie sur le précédent, jusqu'au projet final.

| Branche | Contenu |
|---------|---------|
| `module-XX-starter` | Code incomplet avec `TODO` à compléter |
| `module-XX-solution` | Code complet commenté en français |

---

## Prérequis

Avant de commencer, installez les outils suivants :

| Outil | Version | Lien |
|-------|---------|------|
| Node.js | 20 LTS | https://nodejs.org |
| npm | inclus avec Node.js | — |
| PostgreSQL | 16 | https://www.postgresql.org/download |
| Docker Desktop | dernière version | https://www.docker.com/products/docker-desktop |
| Git | dernière version | https://git-scm.com |

Vérifiez l'installation :
```bash
node --version   # → v20.x.x
npm --version    # → 10.x.x
psql --version   # → psql (PostgreSQL) 16.x
docker --version # → Docker version 27.x.x
git --version    # → git version 2.x.x
```

> **Windows** : utilisez [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/install) ou Git Bash pour les commandes shell.

---

## Parcours complet

| Module | Thème | Notions clés |
|--------|-------|--------------|
| 01 | Modélisation PostgreSQL | SQL, tables, clés étrangères, contraintes, index |
| 02 | Serveur Express | Node.js, Pool pg, middleware, CORS, cookies |
| 03 | CRUD Produits (API) | REST, controllers, WHERE dynamique, pagination |
| 04 | Authentification JWT | bcrypt, jwt.sign/verify, cookies httpOnly, RBAC |
| 05 | Panier | UPSERT, état serveur, routes protégées |
| 06 | Commandes | Transactions SQL, BEGIN/COMMIT/ROLLBACK, FOR UPDATE |
| 07 | Admin API | Statistiques, gestion commandes, middleware admin |
| 08 | React — Composants | JSX, props, hooks useState/useEffect, composants UI |
| 09 | React — Routing | React Router v6, pages, useNavigate, useParams |
| 10 | React — Context API | Axios, AuthContext, CartContext, intercepteurs 401 |
| 11 | Docker & Assemblage | Dockerfile, docker-compose, volumes, healthcheck |

---

## Comment utiliser ce dépôt

```bash
# 1. Cloner le dépôt
git clone https://github.com/DilipNiro/nikebasket-modules
cd nikebasket-modules

# 2. Démarrer au module 01
git checkout module-01-starter

# 3. Lire le README du module et compléter les TODO

# 4. En cas de blocage, consulter la solution :
git checkout module-01-solution

# 5. Puis passer au module suivant (le code précédent est déjà inclus)
git checkout module-02-starter
```

> Chaque branche `starter` contient tout le code fonctionnel des modules précédents.  
> Vous n'avez qu'à compléter les `TODO` du module en cours.

---

## Résultat final

En complétant les 11 modules, vous obtenez un **site e-commerce complet** :
- Backend API REST Node.js/Express + PostgreSQL
- Frontend SPA React avec authentification, panier et commandes
- Panel d'administration complet
- Déployable via Docker Compose

Le projet complet est disponible ici : [nikebasket-migration](https://github.com/DilipNiro/nikebasket-migration)
