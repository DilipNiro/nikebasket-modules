// src/controllers/orders.controller.js — Commandes
// --------------------------------------------------
// Endpoints : GET /api/orders, GET /api/orders/:id, POST /api/orders

const pool = require('../config/db');

// ================================================================
// TODO 1 — getMyOrders : liste des commandes de l'utilisateur
// ================================================================
// GET /api/orders
//
// SELECT id, montant_total, commandee_le, statut
// FROM "commande"
// WHERE user_id = $1
// ORDER BY commandee_le DESC
//
// Répondre : { orders: rows }

async function getMyOrders(req, res, next) {
  try {
    // TODO : implémenter getMyOrders
    res.json({ orders: [] });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 2 — getOrderById : détail d'une commande
// ================================================================
// GET /api/orders/:id
//
// Étapes :
//   1. Requête commande (JOIN user) avec WHERE c.id = $1 AND c.user_id = $2
//      ⚠ vérifier que la commande appartient à l'utilisateur connecté
//   2. Si non trouvée → 404
//   3. Requête items : SELECT cp.quantite, cp.prix_unitaire, p.nom, p.image_url,
//                      t.valeur AS taille, cl.nom AS couleur
//                      FROM commande_produits JOIN produits JOIN taille JOIN couleur
//                      WHERE cp.commande_id = $1
//   4. Requête historique : SELECT h.ancien_statut, h.nouveau_statut, h.modifie_le,
//                           u.nom AS modifie_par
//                           FROM commande_historique LEFT JOIN user
//                           WHERE h.commande_id = $1 ORDER BY modifie_le
//   5. Répondre : { order: orders[0], items, historique }

async function getOrderById(req, res, next) {
  try {
    // TODO : implémenter getOrderById
    res.status(404).json({ error: 'TODO' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 3 — createOrder : créer une commande (CŒUR DU MODULE)
// ================================================================
// POST /api/orders
//
// ⚠ Cette opération doit être ATOMIQUE : si une étape échoue,
//   tout est annulé (ROLLBACK). C'est le rôle des transactions SQL.
//
// Utiliser pool.connect() pour obtenir un client dédié à la transaction :
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     // ... toutes les opérations ...
//     await client.query('COMMIT');
//   } catch {
//     await client.query('ROLLBACK');
//     next(err);
//   } finally {
//     client.release(); // toujours libérer la connexion
//   }
//
// Étapes de la transaction :
//   1. Récupérer le panier de l'utilisateur
//      SELECT produit_id, taille_id, couleur_id, quantite, prix FROM "panier"
//      WHERE user_id = $1
//      Si panier vide → ROLLBACK + 400
//
//   2. Vérifier le stock pour CHAQUE article :
//      SELECT quantite FROM "stock"
//      WHERE produit_id = $1 AND taille_id = $2 AND couleur_id = $3
//      FOR UPDATE  ← verrou pour éviter les commandes concurrentes
//      Si stock insuffisant → ROLLBACK + 400
//
//   3. Calculer le montant total :
//      reduce((sum, item) => sum + item.prix * item.quantite, 0)
//
//   4. Créer la commande :
//      INSERT INTO "commande" (user_id, montant_total, statut)
//      VALUES ($1, $2, 'payee') RETURNING id
//
//   5. Pour chaque article, insérer dans commande_produits :
//      INSERT INTO "commande_produits"
//        (commande_id, produit_id, taille_id, couleur_id, quantite, prix_unitaire)
//      VALUES ($1, $2, $3, $4, $5, $6)
//
//   6. Pour chaque article, décrémenter le stock :
//      UPDATE "stock" SET quantite = GREATEST(0, quantite - $1)
//      WHERE produit_id = $2 AND taille_id = $3 AND couleur_id = $4
//
//   7. Enregistrer le paiement (simulé) :
//      INSERT INTO "paiement" (user_id, commande_id, montant, statut_paiement)
//      VALUES ($1, $2, $3, 'succes')
//
//   8. Enregistrer le premier statut dans commande_historique :
//      INSERT INTO "commande_historique" (commande_id, ancien_statut, nouveau_statut, modifie_par)
//      VALUES ($1, NULL, 'payee', $2)
//
//   9. Vider le panier :
//      DELETE FROM "panier" WHERE user_id = $1
//
//  10. COMMIT + répondre 201 : { message: '...', commande_id, montant_total }

async function createOrder(req, res, next) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // TODO : implémenter createOrder (étapes 1 à 10)
    await client.query('ROLLBACK');
    res.status(501).json({ error: 'TODO: à implémenter' });

  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

module.exports = { getMyOrders, getOrderById, createOrder };
