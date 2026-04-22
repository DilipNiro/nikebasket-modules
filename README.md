# Module 03 — Solution : API Produits

## Points clés à retenir

### Requête WHERE dynamique
```js
const conditions = [];
const values = [];
let idx = 1;

if (categorie) {
  conditions.push(`p.categorie_id = $${idx++}`);
  values.push(parseInt(categorie));
}
const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
```
Ce pattern est fondamental : on construit la clause WHERE progressivement et on maintient un compteur `idx` pour les paramètres `$1`, `$2`, etc.

### Protection contre l'injection SQL dans le ORDER BY
```js
const allowedSort = ['date_sortie', 'prix', 'nom'];
const safeSort = allowedSort.includes(sort) ? sort : 'date_sortie';
```
Les paramètres `$1` ne peuvent pas être utilisés pour les noms de colonnes — on doit utiliser une liste blanche.

### Promise.all pour les requêtes parallèles
```js
const [{ rows: products }, { rows: countRows }] = await Promise.all([
  pool.query(queryPrincipale, values),
  pool.query(queryCount, countValues),
]);
```
Les 2 requêtes s'exécutent en parallèle → 2× plus rapide qu'en séquentiel.

### getProductById : 3 requêtes
```js
const [produit, images, stock] = await Promise.all([
  pool.query('SELECT p.*, c.nom AS categorie FROM "produits" p JOIN "categorie"...'),
  pool.query('SELECT image_url FROM "produit_images" WHERE produit_id = $1 ORDER BY ordre', [id]),
  pool.query('SELECT s.quantite, t.valeur AS taille... WHERE s.produit_id = $1 AND s.quantite > 0', [id]),
]);
```

---

**Module suivant → `module-04-starter` : Authentification JWT**
