# Module 04 — Authentification JWT

## Objectif

Implémenter le système d'authentification complet :
- Inscription avec validation du mot de passe
- Connexion avec cookie JWT httpOnly
- Déconnexion
- Accès au profil de l'utilisateur connecté

---

## Ce que vous allez apprendre

- Hasher un mot de passe avec **bcrypt** (`bcrypt.hash`, `bcrypt.compare`)
- Générer un **token JWT** (`jwt.sign`) et le vérifier (`jwt.verify`)
- Stocker le JWT dans un **cookie httpOnly** (protection XSS)
- Créer un **middleware** d'authentification `verifyToken`
- Implémenter le **RBAC** (contrôle d'accès par rôle) avec `requireAdmin`
- Sécurité OWASP : message d'erreur générique au login (ne pas indiquer si c'est l'email ou le MDP)

---

## Structure ajoutée dans ce module

```
backend/src/
├── middleware/
│   ├── auth.js              ← TODO : verifyToken, requireAdmin
│   └── errorHandler.js      ✅ module 02
├── routes/
│   ├── auth.routes.js       ← donné
│   └── products.routes.js   ✅ module 03
└── controllers/
    ├── auth.controller.js   ← TODO : register, login, logout, getMe
    └── products.controller.js ✅ module 03
```

---

## Votre mission

### Fichier 1 : `backend/src/middleware/auth.js`
3 middlewares à implémenter :
- `verifyToken` — lit le cookie `token`, vérifie le JWT, ajoute `req.user`
- `requireAdmin` — vérifie `req.user.role === 'admin'`
- `requireAdminOrEmploye` — vérifie admin OU employé

### Fichier 2 : `backend/src/controllers/auth.controller.js`
4 fonctions à implémenter (TODO 1 à 4) :
- `register` — inscription avec bcrypt + JWT
- `login` — connexion avec bcrypt.compare + JWT
- `logout` — suppression du cookie
- `getMe` — lecture du profil depuis la base

---

## Tester votre travail

```bash
npm run dev

# Inscription
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nom":"Alice","email":"alice@test.fr","password":"MonMotDePasse1!"}'
# → 201 { message: 'Inscription réussie', user: {...} }

# Connexion
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.fr","password":"MonMotDePasse1!"}' \
  -c cookies.txt
# → 200 { message: 'Connexion réussie', user: {...} }

# Profil (avec cookie)
curl http://localhost:3001/api/auth/me -b cookies.txt
# → 200 { user: { id, nom, email, role, created_at } }

# Déconnexion
curl -X POST http://localhost:3001/api/auth/logout -b cookies.txt
# → 200 { message: 'Déconnexion réussie' }
```

---

## Questions de compréhension

1. Pourquoi bcrypt est-il préférable à SHA-256 pour hasher des mots de passe ?
2. Que contient le **payload** d'un token JWT ? Est-il secret ?
3. Pourquoi utilise-t-on `httpOnly: true` sur le cookie JWT ?
4. Pourquoi renvoyer "Identifiants incorrects" et non "Email inconnu" ou "Mauvais mot de passe" ?

---

**Module suivant → `module-05-starter` : Panier**
