// src/controllers/admin.controller.js — Administration
// -------------------------------------------------------
// Endpoints réservés aux rôles admin et employé.
// Toutes les routes utilisent verifyToken + requireAdmin/requireAdminOrEmploye.

const pool = require('../config/db');

// Statuts de commande autorisés (liste blanche — protection injection)
const STATUTS_AUTORISES = [
  'en_attente', 'payee', 'en_preparation', 'expediee', 'livree', 'annulee',
];

// ================================================================
// TODO 1 — getStats : tableau de bord administrateur
// ================================================================
// GET /api/admin/stats
//
// Exécuter 5 requêtes en parallèle (Promise.all) :
//
//   1. CA du mois en cours (statut != 'annulee' et != 'en_attente') :
//      SELECT COALESCE(SUM(montant_total), 0) AS ca_mois FROM "commande"
//      WHERE statut NOT IN ('annulee', 'en_attente')
//        AND DATE_TRUNC('month', commandee_le) = DATE_TRUNC('month', NOW())
//
//   2. Commandes du jour :
//      SELECT COUNT(*) AS commandes_jour FROM "commande"
//      WHERE commandee_le::date = CURRENT_DATE
//
//   3. Produits en rupture de stock :
//      SELECT COUNT(*) AS ruptures FROM "produits" WHERE statut = 'en_rupture'
//
//   4. Total utilisateurs :
//      SELECT COUNT(*) AS total_users FROM "user"
//
//   5. CA des 7 derniers jours (pour graphique) :
//      SELECT TO_CHAR(commandee_le::date, 'DD/MM') AS jour,
//             COALESCE(SUM(montant_total), 0) AS ca
//      FROM "commande"
//      WHERE statut NOT IN ('annulee', 'en_attente')
//        AND commandee_le >= NOW() - INTERVAL '7 days'
//      GROUP BY commandee_le::date ORDER BY commandee_le::date
//
// Répondre : { ca_mois, commandes_jour, ruptures, total_users, ca_hebdo }

async function getStats(req, res, next) {
  try {
    // TODO : implémenter getStats avec Promise.all
    res.json({ ca_mois: 0, commandes_jour: 0, ruptures: 0, total_users: 0, ca_hebdo: [] });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 2 — getAllOrders : toutes les commandes avec filtres
// ================================================================
// GET /api/admin/orders
// Query params : ?statut= ?date_debut= ?date_fin= ?page= ?limit=
//
// Même pattern de WHERE dynamique que getProducts (module 03).
// JOIN avec "user" pour récupérer client_nom et client_email.
// Répondre : { orders, pagination }

async function getAllOrders(req, res, next) {
  try {
    // TODO : implémenter getAllOrders
    res.json({ orders: [], pagination: { total: 0, page: 1, limit: 20 } });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// Fonctions avancées données (déjà implémentées — lisez-les pour comprendre)
// ================================================================

/**
 * PUT /api/admin/orders/:id
 * Modification du statut + journalisation dans commande_historique (transaction).
 */
async function updateOrderStatus(req, res, next) {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { statut } = req.body;

    if (!STATUTS_AUTORISES.includes(statut)) {
      return res.status(400).json({ error: `Statut invalide. Valeurs acceptées : ${STATUTS_AUTORISES.join(', ')}` });
    }

    await client.query('BEGIN');
    const { rows: current } = await client.query('SELECT statut FROM "commande" WHERE id = $1', [id]);
    if (current.length === 0) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Commande non trouvée' }); }

    const ancienStatut = current[0].statut;
    await client.query('UPDATE "commande" SET statut = $1 WHERE id = $2', [statut, id]);
    await client.query(
      `INSERT INTO "commande_historique" (commande_id, ancien_statut, nouveau_statut, modifie_par) VALUES ($1, $2, $3, $4)`,
      [id, ancienStatut, statut, req.user.id]
    );
    await client.query('COMMIT');
    res.json({ message: 'Statut mis à jour', ancien_statut: ancienStatut, nouveau_statut: statut });
  } catch (err) { await client.query('ROLLBACK'); next(err); }
  finally { client.release(); }
}

/**
 * GET /api/admin/users
 * Liste de tous les utilisateurs (admin uniquement).
 */
async function getAllUsers(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, parseInt(limit));
    const offset = (pageNum - 1) * limitNum;

    const { rows } = await pool.query(
      `SELECT id, nom, email, role, created_at FROM "user" ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limitNum, offset]
    );
    const { rows: countRows } = await pool.query('SELECT COUNT(*) FROM "user"');
    res.json({ users: rows, pagination: { total: parseInt(countRows[0].count), page: pageNum, limit: limitNum } });
  } catch (err) { next(err); }
}

/**
 * PUT /api/admin/users/:id/role
 * Modification du rôle d'un utilisateur (admin uniquement).
 */
async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const rolesAutorises = ['client', 'employe', 'admin'];
    if (!rolesAutorises.includes(role)) return res.status(400).json({ error: 'Rôle invalide' });
    if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'Vous ne pouvez pas modifier votre propre rôle' });

    const { rows, rowCount } = await pool.query(
      `UPDATE "user" SET role = $1 WHERE id = $2 RETURNING id, nom, email, role`, [role, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json({ user: rows[0] });
  } catch (err) { next(err); }
}

module.exports = { getStats, getAllOrders, updateOrderStatus, getAllUsers, updateUserRole };
