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

**Module suivant → `module-05-starter` : Panier**
