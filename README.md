# Module 03 — API Produits (CRUD)

## Objectif

Implémenter les endpoints REST pour le catalogue de produits :
- Lister les produits avec filtres et pagination
- Afficher le détail d'un produit (avec stock et images)
- Lister les catégories, tailles et couleurs disponibles

---

## Ce que vous allez apprendre

- Architecture **MVC** : séparer routes, controllers, et accès base de données
- Écrire des **requêtes SQL paramétrées** avec le pool pg (`$1`, `$2`, ...)
- Construire une clause `WHERE` **dynamique** selon les filtres
- Utiliser `Promise.all()` pour lancer 2 requêtes en parallèle
- Implémenter la **pagination** (`LIMIT` / `OFFSET`)

---

## Structure ajoutée dans ce module

```
backend/src/
├── routes/
│   └── products.routes.js   ← donné (routes déclarées)
└── controllers/
    └── products.controller.js  ← TODO (logique à implémenter)
```

---

## Votre mission

Ouvrez `backend/src/controllers/products.controller.js`.

4 fonctions sont à implémenter (marquées TODO 1 à 4) :

### TODO 1 — `getProducts`
Liste des produits avec filtres optionnels et pagination.

```sql
-- Exemple de requête finale construite dynamiquement :
SELECT p.id, p.nom, p.prix, p.image_url, c.nom AS categorie
FROM "produits" p
JOIN "categorie" c ON c.id = p.categorie_id
WHERE p.statut != 'archive'  -- condition par défaut
  AND p.categorie_id = $1    -- si ?categorie=1
  AND p.nom ILIKE $2         -- si ?search=air
ORDER BY p.date_sortie DESC
LIMIT $3 OFFSET $4
```

### TODO 2 — `getProductById`
Détail d'un produit : 3 requêtes séparées (produit, images, stock).

### TODO 3 & 4 — `getCategories`, `getTailles`, `getCouleurs`
Simple `SELECT * FROM "categorie/taille/couleur" ORDER BY nom/valeur`.

---

## Tester votre travail

```bash
npm run dev

# Lister les produits
curl http://localhost:3001/api/products

# Filtrer par catégorie
curl "http://localhost:3001/api/products?categorie=1&page=1&limit=5"

# Détail d'un produit
curl http://localhost:3001/api/products/1

# Catégories disponibles
curl http://localhost:3001/api/products/categories
```

---

## Questions de compréhension

1. Pourquoi utilise-t-on `$1`, `$2`, ... plutôt qu'interpoler directement les valeurs dans la requête SQL ?
2. Pourquoi lancer les 2 requêtes (produits + count) avec `Promise.all` plutôt que séquentiellement ?
3. À quoi sert `ILIKE` (vs `LIKE`) dans PostgreSQL ?

---

**Module suivant → `module-04-starter` : Authentification JWT**
