# Module 05 — Panier (Cart)

## Objectif

Implémenter les 5 opérations du panier : consulter, ajouter, modifier, supprimer, vider.

---

## Ce que vous allez apprendre

- Requêtes SQL avec **plusieurs JOIN** (produit × taille × couleur)
- **UPSERT** PostgreSQL : `INSERT ... ON CONFLICT DO UPDATE`
- Calculer un total côté JavaScript (pas dans SQL)
- Sécuriser les opérations : toujours vérifier `user_id` dans le `WHERE`

---

## Structure ajoutée dans ce module

```
backend/src/
├── routes/
│   └── cart.routes.js         ← donné (verifyToken sur toutes les routes)
└── controllers/
    └── cart.controller.js     ← TODO : 5 fonctions à implémenter
```

---

## Votre mission

Ouvrez `backend/src/controllers/cart.controller.js`.

5 fonctions TODO :

| Fonction | Route | Description |
|----------|-------|-------------|
| `getCart` | GET /api/cart | Récupère tous les articles + total |
| `addToCart` | POST /api/cart | Ajoute un article (UPSERT si déjà présent) |
| `updateCartItem` | PUT /api/cart/:itemId | Modifie la quantité |
| `removeFromCart` | DELETE /api/cart/:itemId | Supprime un article |
| `clearCart` | DELETE /api/cart | Vide tout le panier |

### Point important : le UPSERT (TODO 2)
```sql
INSERT INTO "panier" (user_id, produit_id, taille_id, couleur_id, quantite, prix)
VALUES ($1, $2, $3, $4, $5, $6)
ON CONFLICT (user_id, produit_id, couleur_id, taille_id)
DO UPDATE SET quantite = "panier".quantite + $5
RETURNING *
```
Si l'article est déjà dans le panier → on **incrémente** la quantité. Sinon, on **insère**.

### Sécurité (TODO 3 et 4)
```sql
-- ✅ Correct : on ne peut modifier que SON panier
UPDATE "panier" SET quantite = $1 WHERE id = $2 AND user_id = $3

-- ❌ Dangereux : n'importe quel utilisateur peut modifier n'importe quel article
UPDATE "panier" SET quantite = $1 WHERE id = $2
```

---

## Tester votre travail

```bash
# Se connecter d'abord et garder le cookie
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@nikebasket.fr","password":"Client1234!"}' \
  -c cookies.txt

# Ajouter un article
curl -X POST http://localhost:3001/api/cart \
  -H "Content-Type: application/json" \
  -d '{"produit_id":1,"taille_id":5,"couleur_id":2,"quantite":1}' \
  -b cookies.txt

# Voir le panier
curl http://localhost:3001/api/cart -b cookies.txt
```

---

**Module suivant → `module-06-starter` : Commandes & Transactions SQL**
