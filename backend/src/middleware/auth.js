// src/middleware/auth.js — Vérification du token JWT
// ---------------------------------------------------
// Le token JWT est stocké dans un cookie httpOnly.
// httpOnly = JavaScript ne peut PAS lire le cookie → protection XSS.
// Le navigateur l'envoie automatiquement à chaque requête.

const jwt = require('jsonwebtoken');

// ================================================================
// TODO 1 — verifyToken : vérifier le JWT dans le cookie
// ================================================================
// Ce middleware doit :
//   1. Lire le cookie "token" depuis req.cookies.token
//   2. Si absent → répondre 401 { error: 'Non authentifié' }
//   3. Vérifier le token avec jwt.verify(token, process.env.JWT_SECRET)
//      - Si valide  → ajouter req.user = decoded (contient id, email, role)
//                     puis appeler next()
//      - Si invalide (catch) → répondre 401 { error: 'Token invalide ou expiré' }
//
// Aide : jwt.verify(token, secret) retourne le payload décodé ou lève une erreur

const verifyToken = (req, res, next) => {
  // TODO : implémenter verifyToken
};

// ================================================================
// TODO 2 — requireAdmin : vérifier le rôle admin
// ================================================================
// Ce middleware doit être utilisé APRÈS verifyToken.
// Il vérifie que req.user.role === 'admin'.
// Si non → répondre 403 { error: 'Accès refusé — rôle admin requis' }
// Si oui → appeler next()

const requireAdmin = (req, res, next) => {
  // TODO : implémenter requireAdmin
};

// ================================================================
// TODO 3 — requireAdminOrEmploye : vérifier admin OU employé
// ================================================================
// Même logique que requireAdmin mais accepte 'admin' ET 'employe'.
// Aide : ['admin', 'employe'].includes(req.user?.role)

const requireAdminOrEmploye = (req, res, next) => {
  // TODO : implémenter requireAdminOrEmploye
};

module.exports = { verifyToken, requireAdmin, requireAdminOrEmploye };
