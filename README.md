# Module 06 — Solution : Commandes & Transactions SQL

## Points clés à retenir

### La transaction : tout ou rien

```js
const client = await pool.connect();
try {
  await client.query('BEGIN');

  // Étape 1 : récupérer le panier
  const { rows: cartItems } = await client.query(
    `SELECT ... FROM "panier" WHERE user_id = $1`, [req.user.id]
  );
  if (cartItems.length === 0) {
    await client.query('ROLLBACK');
    return res.status(400).json({ error: 'Panier vide' });
  }

  // Étapes 2-9...

  await client.query('COMMIT');
  res.status(201).json({ commande_id: commande.id, ... });

} catch (err) {
  await client.query('ROLLBACK'); // annule TOUT si une étape échoue
  next(err);
} finally {
  client.release(); // libère toujours la connexion
}
```

### FOR UPDATE : verrou anti-race condition

```sql
SELECT quantite FROM "stock"
WHERE produit_id = $1 AND taille_id = $2 AND couleur_id = $3
FOR UPDATE
```

Si Alice et Bob commandent le dernier article en même temps :
- Alice obtient le verrou → vérifie stock (1) → décrémente → COMMIT
- Bob attend → vérifie stock (0) → ROLLBACK → erreur "stock insuffisant"

Sans `FOR UPDATE` : les deux commanderaient le même article → stock négatif.

### pool.connect() vs pool.query()

| | `pool.query()` | `pool.connect()` |
|--|--|--|
| Connexion | Empruntée automatiquement | Dédiée pour toute la transaction |
| Transaction | ❌ Impossible (connexion change) | ✅ BEGIN/COMMIT sur la même connexion |
| Usage | Requêtes simples | Transactions multi-étapes |

---

**Module suivant → `module-07-starter` : Panel Admin (backend)**
