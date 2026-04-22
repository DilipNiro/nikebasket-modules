# Module 07 — Panel Administrateur (Backend)

## Objectif

Ajouter les routes d'administration protégées par rôle. À la fin de ce module, le **backend est complet** — on passe ensuite au frontend.

---

## Ce que vous allez apprendre

- Contrôle d'accès par rôle (**RBAC**) : admin vs employé vs client
- Agrégations SQL avancées : `SUM`, `COUNT`, `DATE_TRUNC`, `INTERVAL`
- `Promise.all` avec 5 requêtes en parallèle pour le tableau de bord
- Listes blanches pour valider les paramètres entrants (OWASP A01)

---

## Structure ajoutée dans ce module

```
backend/src/
├── routes/
│   └── admin.routes.js         ← donné (verifyToken + requireAdmin/Employe)
└── controllers/
    └── admin.controller.js     ← TODO : getStats, getAllOrders
                                   (updateOrderStatus, getAllUsers, updateUserRole : donnés)
```

---

## Votre mission

### TODO 1 — `getStats` : le tableau de bord

5 requêtes en parallèle avec `Promise.all` :

```js
const [caResult, commandesJour, ruptures, users, caHebdo] = await Promise.all([
  pool.query(`SELECT COALESCE(SUM(montant_total), 0) AS ca_mois FROM "commande"
              WHERE statut NOT IN ('annulee', 'en_attente')
                AND DATE_TRUNC('month', commandee_le) = DATE_TRUNC('month', NOW())`),
  pool.query(`SELECT COUNT(*) AS commandes_jour FROM "commande"
              WHERE commandee_le::date = CURRENT_DATE`),
  pool.query(`SELECT COUNT(*) AS ruptures FROM "produits" WHERE statut = 'en_rupture'`),
  pool.query(`SELECT COUNT(*) AS total_users FROM "user"`),
  pool.query(`SELECT TO_CHAR(commandee_le::date, 'DD/MM') AS jour,
                     COALESCE(SUM(montant_total), 0) AS ca
              FROM "commande" WHERE statut NOT IN ('annulee', 'en_attente')
                AND commandee_le >= NOW() - INTERVAL '7 days'
              GROUP BY commandee_le::date ORDER BY commandee_le::date`),
]);
```

### TODO 2 — `getAllOrders` : toutes les commandes avec filtres

Même pattern que `getProducts` dans le module 03 : WHERE dynamique + pagination.

---

## Récapitulatif backend

À ce stade, le backend est complet :

| Route | Accès |
|-------|-------|
| GET /api/products | Public |
| GET /api/products/:id | Public |
| POST/PUT/DELETE /api/products | Admin |
| POST /api/auth/register | Public |
| POST /api/auth/login | Public |
| GET /api/auth/me | Connecté |
| GET/POST /api/cart | Connecté |
| GET/POST /api/orders | Connecté |
| GET /api/admin/stats | Admin + Employé |
| GET /api/admin/orders | Admin + Employé |
| GET /api/admin/users | Admin |

---

**Module suivant → `module-08-starter` : Frontend React — Setup & Composants**
