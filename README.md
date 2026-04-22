# Module 06 — Commandes & Transactions SQL

## Objectif

Implémenter le système de commandes avec le concept fondamental des **transactions SQL** : une suite d'opérations qui réussit entièrement ou échoue entièrement.

---

## Ce que vous allez apprendre

- Les **transactions SQL** : `BEGIN`, `COMMIT`, `ROLLBACK`
- Le verrou `FOR UPDATE` : éviter les commandes concurrentes sur le même stock
- Utiliser un **client dédié** depuis le pool pour une transaction
- Gérer le `finally` pour toujours libérer la connexion (`client.release()`)

---

## Structure ajoutée dans ce module

```
backend/src/
├── routes/
│   └── orders.routes.js       ← donné
└── controllers/
    └── orders.controller.js   ← TODO : 3 fonctions dont createOrder (transaction)
```

---

## Votre mission

### TODO 1 & 2 : `getMyOrders`, `getOrderById`
Requêtes SQL simples — consultez les commentaires dans le fichier.

### TODO 3 : `createOrder` — La transaction complète

```
BEGIN
  ├─ 1. Récupérer le panier
  ├─ 2. Vérifier le stock (FOR UPDATE — verrou)
  ├─ 3. Calculer le montant total
  ├─ 4. INSERT commande
  ├─ 5. INSERT commande_produits (une ligne par article)
  ├─ 6. UPDATE stock (décrémenter)
  ├─ 7. INSERT paiement (simulé)
  ├─ 8. INSERT commande_historique
  └─ 9. DELETE panier
COMMIT (ou ROLLBACK si erreur)
```

### Structure d'une transaction en Node.js + pg

```js
const client = await pool.connect();
try {
  await client.query('BEGIN');
  // ... opérations avec client.query() ...
  await client.query('COMMIT');
  res.status(201).json({ ... });
} catch (err) {
  await client.query('ROLLBACK');
  next(err);
} finally {
  client.release(); // toujours libérer
}
```

### FOR UPDATE : éviter les race conditions
```sql
SELECT quantite FROM "stock"
WHERE produit_id = $1 AND taille_id = $2 AND couleur_id = $3
FOR UPDATE
```
`FOR UPDATE` verrouille la ligne jusqu'à la fin de la transaction.  
Si 2 utilisateurs commandent le dernier article en même temps, l'un attendra que l'autre finisse.

---

## Questions de compréhension

1. Que se passe-t-il si on n'utilise pas `ROLLBACK` dans le catch ?
2. Pourquoi utilise-t-on `pool.connect()` (client dédié) au lieu de `pool.query()` pour les transactions ?
3. Pourquoi `FOR UPDATE` est-il important ici ? Que risque-t-il de se passer sans ?
4. Pourquoi stocker le `prix_unitaire` dans `commande_produits` et non le recalculer depuis `produits` ?

---

**Module suivant → `module-07-starter` : Panel Admin (backend)**
