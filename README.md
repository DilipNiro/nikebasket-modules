# Module 02 — Solution : Serveur Express

## Ce que vous deviez implémenter

### `backend/src/config/db.js` — Pool PostgreSQL

```js
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.PG_HOST     || 'localhost',
  port:     parseInt(process.env.PG_PORT || '5432'),
  user:     process.env.PG_USER     || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'ecommerce',
  max:      10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => console.error('[DB] Erreur :', err.message));
module.exports = pool;
```

### `backend/src/app.js` — Serveur Express

```js
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler); // toujours en dernier
```

---

## Points clés à retenir

### credentials: true dans CORS
Sans cette option, le navigateur n'envoie pas les cookies dans les requêtes cross-origin.  
Notre JWT est dans un cookie → sans `credentials: true`, l'authentification ne fonctionne pas.

### Pool vs connexion unique
Un pool maintient ~10 connexions ouvertes en permanence.  
Chaque requête HTTP emprunte une connexion disponible et la rend après usage.  
Sans pool : chaque requête ouvre + ferme une connexion = lent.

### NODE_ENV !== 'test'
Jest (notre outil de test) importe `app.js` directement.  
Si le serveur démarrait toujours, le port serait occupé et les tests échoueraient.

---

**Module suivant → `module-03-starter` : API Produits (CRUD)**
