// src/controllers/auth.controller.js — Authentification
// -------------------------------------------------------
// Gère : inscription, connexion, déconnexion, profil, mot de passe

const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool    = require('../config/db');

// ================================================================
// Fonction utilitaire : setTokenCookie (donné)
// ================================================================
// Génère un JWT et le place dans un cookie httpOnly.
// httpOnly = inaccessible à JavaScript (protection XSS).
// secure   = cookie uniquement envoyé en HTTPS (activé en production).

function setTokenCookie(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   24 * 60 * 60 * 1000, // 24h en ms
  });

  return token;
}

// ================================================================
// Validations express-validator (données)
// ================================================================
const registerValidation = [
  body('nom').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: 12 }).withMessage('Minimum 12 caractères')
    .matches(/[A-Z]/).withMessage('Doit contenir une majuscule')
    .matches(/[0-9]/).withMessage('Doit contenir un chiffre')
    .matches(/[^A-Za-z0-9]/).withMessage('Doit contenir un caractère spécial'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

// ================================================================
// TODO 1 — register : inscription
// ================================================================
// POST /api/auth/register
//
// Étapes :
//   1. Vérifier les erreurs de validation (validationResult) → 400 si erreurs
//   2. Extraire { nom, email, password } du body
//   3. Vérifier que l'email n'existe pas déjà → 409 si existe
//      SELECT id FROM "user" WHERE email = $1
//   4. Hasher le mot de passe : await bcrypt.hash(password, 10)
//   5. Insérer en base : INSERT INTO "user" (nom, email, password, role)
//      VALUES ($1, $2, $3, 'client') RETURNING id, nom, email, role, created_at
//   6. Appeler setTokenCookie(res, { id, email, role })
//   7. Répondre 201 : { message: 'Inscription réussie', user: { id, nom, email, role } }

async function register(req, res, next) {
  try {
    // TODO : implémenter register
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 2 — login : connexion
// ================================================================
// POST /api/auth/login
//
// Étapes :
//   1. Vérifier les erreurs de validation → 400
//   2. Chercher l'utilisateur par email
//      SELECT id, nom, email, password, role FROM "user" WHERE email = $1
//   3. Si non trouvé → 401 { error: 'Identifiants incorrects' }
//      ⚠ Ne pas préciser si c'est l'email ou le mot de passe (OWASP A07)
//   4. Vérifier le mot de passe : await bcrypt.compare(password, user.password)
//      Si faux → 401 (même message)
//   5. Appeler setTokenCookie(res, { id, email, role })
//   6. Répondre : { message: 'Connexion réussie', user: { id, nom, email, role } }

async function login(req, res, next) {
  try {
    // TODO : implémenter login
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 3 — logout : déconnexion
// ================================================================
// POST /api/auth/logout
// Supprimer le cookie "token" : res.clearCookie('token', { httpOnly: true, sameSite: 'lax' })
// Répondre : { message: 'Déconnexion réussie' }
// Note : cette fonction est synchrone (pas besoin de async)

function logout(req, res) {
  // TODO : implémenter logout
  res.status(501).json({ error: 'TODO: à implémenter' });
}

// ================================================================
// TODO 4 — getMe : profil utilisateur connecté
// ================================================================
// GET /api/auth/me  (nécessite verifyToken)
//
// Étapes :
//   1. Lire l'id depuis req.user.id (ajouté par verifyToken)
//   2. SELECT id, nom, email, role, created_at FROM "user" WHERE id = $1
//   3. Si non trouvé → 404
//   4. Répondre : { user: rows[0] }

async function getMe(req, res, next) {
  try {
    // TODO : implémenter getMe
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// Fonctions avancées (données — pour les fonctionnalités complètes)
// ================================================================

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requis' });
    const { rows } = await pool.query('SELECT id FROM "user" WHERE email = $1', [email]);
    if (rows.length === 0) return res.json({ message: 'Si cet email existe, un lien vous a été envoyé.' });
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await pool.query(
      `UPDATE "user" SET reset_token_hash = $1, reset_token_expires_at = $2 WHERE id = $3`,
      [tokenHash, expires, rows[0].id]
    );
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
    res.json({ message: 'Lien de réinitialisation généré.', reset_link: resetLink });
  } catch (err) { next(err); }
}

async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token et mot de passe requis' });
    const strongPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}$/;
    if (!strongPassword.test(password)) return res.status(400).json({ error: 'Mot de passe trop faible' });
    const crypto = require('crypto');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const { rows } = await pool.query(
      `SELECT id FROM "user" WHERE reset_token_hash = $1 AND reset_token_expires_at > NOW()`, [tokenHash]
    );
    if (rows.length === 0) return res.status(400).json({ error: 'Token invalide ou expiré' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `UPDATE "user" SET password = $1, reset_token_hash = NULL, reset_token_expires_at = NULL, password_changed = TRUE WHERE id = $2`,
      [hashedPassword, rows[0].id]
    );
    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) { next(err); }
}

async function changePassword(req, res, next) {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) return res.status(400).json({ error: 'Les deux champs sont requis' });
    const strongPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}$/;
    if (!strongPassword.test(new_password)) return res.status(400).json({ error: 'Mot de passe trop faible' });
    const { rows } = await pool.query('SELECT id, password FROM "user" WHERE id = $1', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const valid = await bcrypt.compare(current_password, rows[0].password);
    if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await pool.query(`UPDATE "user" SET password = $1, password_changed = TRUE WHERE id = $2`, [hashedPassword, req.user.id]);
    res.json({ message: 'Mot de passe modifié avec succès' });
  } catch (err) { next(err); }
}

module.exports = {
  register, login, logout, getMe,
  forgotPassword, resetPassword, changePassword,
  registerValidation, loginValidation,
};
