# Module 05 — Solution : Panier

## Points clés à retenir

### UPSERT PostgreSQL
```sql
INSERT INTO "panier" (user_id, produit_id, taille_id, couleur_id, quantite, prix)
VALUES ($1, $2, $3, $4, $5, $6)
ON CONFLICT (user_id, produit_id, couleur_id, taille_id)
DO UPDATE SET quantite = "panier".quantite + $5
RETURNING *
```
Une seule requête gère les deux cas : nouvel article OU incrémentation.  
La contrainte `UNIQUE (user_id, produit_id, couleur_id, taille_id)` (définie dans le schéma) déclenche le `ON CONFLICT`.

### Calcul du total en JavaScript
```js
const total = rows.reduce((sum, item) => sum + parseFloat(item.sous_total), 0);
```
Le total est calculé côté Node.js depuis les résultats SQL.  
PostgreSQL calcule le `sous_total` par ligne (`quantite * prix`) mais pas la somme — ça reste côté code.

### Sécurité : toujours filtrer par user_id
```sql
-- Modifier : WHERE id = $2 AND user_id = $3
-- Supprimer : WHERE id = $1 AND user_id = $2
```
Sans cette vérification, un utilisateur pourrait modifier/supprimer le panier d'un autre.

---

**Module suivant → `module-06-starter` : Commandes & Transactions SQL**
