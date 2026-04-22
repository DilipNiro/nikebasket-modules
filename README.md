# Module 04 — Solution : Authentification JWT

## Points clés à retenir

### verifyToken — Le middleware central
```js
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Non authentifié' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
```

### setTokenCookie — Placer le JWT dans un cookie sécurisé
```js
res.cookie('token', jwt.sign(payload, secret, { expiresIn: '24h' }), {
  httpOnly: true,   // Inaccessible en JS (protection XSS)
  secure: process.env.NODE_ENV === 'production',  // HTTPS en prod
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000,
});
```

### bcrypt — Hashing sécurisé des mots de passe
```js
// Inscription : hasher avant de stocker
const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

// Connexion : comparer avec le hash stocké
const valid = await bcrypt.compare(plainPassword, hashedPassword);
```
10 rounds = ~100ms de calcul. Assez lent pour décourager les attaques brute-force, assez rapide pour l'utilisateur.

### Message d'erreur générique au login (OWASP A07)
```js
// ❌ Mauvais : divulgue quelle information est incorrecte
return res.status(401).json({ error: 'Email inconnu' });
return res.status(401).json({ error: 'Mauvais mot de passe' });

// ✅ Correct : message identique dans les deux cas
return res.status(401).json({ error: 'Identifiants incorrects' });
```

---

## Erreurs fréquentes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `401` sur toutes les routes protégées | Cookie non envoyé | Vérifiez `withCredentials: true` dans Axios (module 10) et `credentials: true` dans CORS (module 02) |
| `JsonWebTokenError: invalid signature` | `JWT_SECRET` différent entre le token généré et la vérification | Utilisez toujours `process.env.JWT_SECRET`, ne codez jamais la valeur en dur |
| `Cannot read properties of undefined (reading 'id')` | `req.user` est undefined | `verifyToken` n'a pas été appelé avant le controller — vérifiez que le middleware est bien dans la route |
| Le mot de passe en clair est stocké en base | Oubli du `bcrypt.hash` avant `INSERT` | Toujours hasher AVANT d'insérer — ne jamais stocker de mot de passe en clair |
| `cookieParser is not a function` | Import incorrect | `const cookieParser = require('cookie-parser');` (pas de déstructuration) |

---

**Module suivant → `module-05-starter` : Panier**
