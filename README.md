# Module 07 — Solution : Panel Admin (Backend)

## Points clés à retenir

### getStats : 5 requêtes en parallèle
```js
const [caResult, commandesJour, ruptures, users, caHebdo] = await Promise.all([
  pool.query(`SELECT COALESCE(SUM(montant_total), 0) AS ca_mois FROM "commande"
              WHERE statut NOT IN ('annulee', 'en_attente')
                AND DATE_TRUNC('month', commandee_le) = DATE_TRUNC('month', NOW())`),
  pool.query(`SELECT COUNT(*) AS commandes_jour FROM "commande" WHERE commandee_le::date = CURRENT_DATE`),
  pool.query(`SELECT COUNT(*) AS ruptures FROM "produits" WHERE statut = 'en_rupture'`),
  pool.query(`SELECT COUNT(*) AS total_users FROM "user"`),
  pool.query(`SELECT TO_CHAR(commandee_le::date, 'DD/MM') AS jour, ...`),
]);
```

### DATE_TRUNC : agrégation par période
```sql
DATE_TRUNC('month', commandee_le) = DATE_TRUNC('month', NOW())
-- → toutes les commandes du mois en cours

commandee_le >= NOW() - INTERVAL '7 days'
-- → les 7 derniers jours
```

### Liste blanche pour les statuts (OWASP A01)
```js
const STATUTS_AUTORISES = ['en_attente', 'payee', 'en_preparation', 'expediee', 'livree', 'annulee'];
if (!STATUTS_AUTORISES.includes(statut)) {
  return res.status(400).json({ error: 'Statut invalide' });
}
```
On valide toujours les valeurs entrantes par rapport à une liste connue — jamais d'injection possible.

---

## Backend terminé

Le backend est maintenant complet. Testez avec :
```bash
# Stats admin (avec cookie admin)
curl http://localhost:3001/api/admin/stats -b cookies.txt
```

---

**Module suivant → `module-08-starter` : Frontend React — Setup & Composants**
