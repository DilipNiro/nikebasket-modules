// src/controllers/cart.controller.js — Panier
// --------------------------------------------
// Toutes les routes panier nécessitent verifyToken (configuré dans cart.routes.js)
// L'utilisateur connecté est accessible via req.user.id

const pool = require('../config/db');

// ================================================================
// TODO 1 — getCart : récupérer le panier de l'utilisateur
// ================================================================
// GET /api/cart
//
// Requête SQL :
//   SELECT pan.id, pan.quantite, pan.prix,
//          pan.quantite * pan.prix AS sous_total,
//          p.nom, p.image_url, p.statut,
//          t.valeur AS taille, t.id AS taille_id,
//          cl.nom AS couleur, cl.id AS couleur_id
//   FROM "panier" pan
//   JOIN "produits" p  ON p.id  = pan.produit_id
//   JOIN "taille"   t  ON t.id  = pan.taille_id
//   JOIN "couleur"  cl ON cl.id = pan.couleur_id
//   WHERE pan.user_id = $1
//   ORDER BY pan.ajout_date
//
// Calculer le total et le count depuis les résultats (pas en SQL) :
//   total = rows.reduce((sum, item) => sum + parseFloat(item.sous_total), 0)
//   count = rows.reduce((sum, item) => sum + item.quantite, 0)
//
// Répondre : { items: rows, total: parseFloat(total.toFixed(2)), count }

async function getCart(req, res, next) {
  try {
    // TODO : implémenter getCart
    res.json({ items: [], total: 0, count: 0 });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 2 — addToCart : ajouter un article au panier
// ================================================================
// POST /api/cart
// Body : { produit_id, taille_id, couleur_id, quantite? (défaut 1) }
//
// Étapes :
//   1. Vérifier que produit_id, taille_id, couleur_id sont présents → 400
//   2. Vérifier le stock disponible :
//      SELECT s.quantite, p.prix FROM "stock" s JOIN "produits" p ON p.id = s.produit_id
//      WHERE s.produit_id=$1 AND s.taille_id=$2 AND s.couleur_id=$3
//      Si stock insuffisant → 400 { error: 'Stock insuffisant...' }
//   3. UPSERT dans le panier :
//      INSERT INTO "panier" (user_id, produit_id, taille_id, couleur_id, quantite, prix)
//      VALUES ($1, $2, $3, $4, $5, $6)
//      ON CONFLICT (user_id, produit_id, couleur_id, taille_id)
//      DO UPDATE SET quantite = "panier".quantite + $5
//      RETURNING *
//   4. Répondre 201 : { item: rows[0], message: 'Article ajouté au panier' }

async function addToCart(req, res, next) {
  try {
    // TODO : implémenter addToCart
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 3 — updateCartItem : modifier la quantité d'un article
// ================================================================
// PUT /api/cart/:itemId
// Body : { quantite }
//
// Étapes :
//   1. Vérifier quantite >= 1 → 400
//   2. UPDATE "panier" SET quantite = $1 WHERE id = $2 AND user_id = $3
//      ⚠ user_id dans le WHERE = sécurité : on ne peut modifier que SON panier
//   3. Si rowCount === 0 → 404
//   4. Répondre : { item: rows[0] }

async function updateCartItem(req, res, next) {
  try {
    // TODO : implémenter updateCartItem
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 4 — removeFromCart : supprimer un article
// ================================================================
// DELETE /api/cart/:itemId
//
// DELETE FROM "panier" WHERE id = $1 AND user_id = $2
// Si rowCount === 0 → 404
// Répondre : { message: 'Article supprimé du panier' }

async function removeFromCart(req, res, next) {
  try {
    // TODO : implémenter removeFromCart
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 5 — clearCart : vider le panier
// ================================================================
// DELETE /api/cart
// DELETE FROM "panier" WHERE user_id = $1
// Répondre : { message: 'Panier vidé' }

async function clearCart(req, res, next) {
  try {
    // TODO : implémenter clearCart
    res.status(501).json({ error: 'TODO: à implémenter' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
