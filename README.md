# NikeBasket — Parcours pédagogique (10 modules)

> Ressource pédagogique — Bachelor 3 Développeur Web & Application  
> Efrei Paris 2026 | ADNCLLY.DEV | Tuteur : Nabil ADNANE

Ce dépôt guide les étudiants dans la **construction du projet NikeBasket de A à Z** — un site e-commerce complet en **React / Node.js / PostgreSQL**.  
Chaque module est disponible dans deux branches :

| Branche | Contenu |
|---------|---------|
| `module-XX-starter` | Code incomplet avec `TODO` à compléter |
| `module-XX-solution` | Code complet commenté en français |

---

## Parcours complet

| Module | Thème | Notions clés |
|--------|-------|--------------|
| [01](#module-01) | HTML/CSS statique | Maquette, flexbox, composants visuels |
| [02](#module-02) | Modélisation PostgreSQL | SQL, tables, clés étrangères, contraintes |
| [03](#module-03) | Serveur Express | Node.js, middleware, routes, CORS |
| [04](#module-04) | CRUD Produits (API) | REST, controllers, requêtes paramétrées |
| [05](#module-05) | Authentification JWT | bcrypt, JWT, cookies httpOnly |
| [06](#module-06) | Panier & Commandes | Transactions SQL, état serveur |
| [07](#module-07) | Composants React | JSX, props, hooks (useState, useEffect) |
| [08](#module-08) | Routing React | React Router v6, pages, navigation |
| [09](#module-09) | Context API | useContext, état global, AuthContext, CartContext |
| [10](#module-10) | Assemblage fullstack | Axios, Docker Compose, projet complet |

---

## Comment utiliser ce dépôt

```bash
# Cloner le dépôt
git clone https://github.com/DilipNiro/nikebasket-modules
cd nikebasket-modules

# Choisir un module (ex: module 03 starter)
git checkout module-03-starter

# Lire le README du module et compléter les TODO
# En cas de blocage, consulter la solution :
git checkout module-03-solution
```

---

## Résultat final

En complétant les 10 modules, vous obtenez un **site e-commerce complet** :
- Backend API REST Node.js/Express + PostgreSQL
- Frontend SPA React avec authentification, panier et commandes
- Panel d'administration complet
- Déployable via Docker Compose

Le projet complet est disponible ici : [nikebasket-migration](https://github.com/DilipNiro/nikebasket-migration)
