// src/controllers/products.controller.js — Catalogue produits
// -------------------------------------------------------------
// Endpoints : GET /api/products, GET /api/products/:id
//             POST/PUT/DELETE /api/products (admin)

const { body, validationResult } = require('express-validator');
const pool = require('../config/db');

// ================================================================
// TODO 1 — getProducts : liste des produits avec filtres
// ================================================================
// GET /api/products
// Paramètres query optionnels : ?categorie=1 ?search=air ?prix_max=150
//                                ?page=1 &limit=12 ?sort=prix &order=ASC
//
// Étapes :
//   1. Extraire les paramètres depuis req.query
//   2. Construire dynamiquement la clause WHERE et le tableau de valeurs
//      en ajoutant des conditions selon les paramètres présents
//   3. Protéger les colonnes de tri : n'autoriser que ['date_sortie','prix','nom']
//   4. Calculer l'offset de pagination : (page - 1) * limit
//   5. Exécuter 2 requêtes en parallèle (Promise.all) :
//      - La requête principale avec LIMIT / OFFSET
//      - Une requête COUNT pour le total (pagination)
//   6. Répondre : { products, pagination: { total, page, limit, pages } }
//
// ⚠ Par défaut, n'afficher que les produits où statut != 'archive'
// Aide : pour les paramètres dynamiques en pg, utiliser $1, $2, ...
//        et incrémenter un compteur idx

async function getProducts(req, res, next) {
  try {
    // TODO : implémenter getProducts
    res.json({ products: [], pagination: { total: 0, page: 1, limit: 12, pages: 0 } });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 2 — getProductById : détail d'un produit
// ================================================================
// GET /api/products/:id
//
// Étapes :
//   1. Récupérer l'id depuis req.params
//   2. Requête principale : produit + nom de sa catégorie (JOIN categorie)
//   3. Si le produit n'existe pas → 404
//   4. Requête images supplémentaires : SELECT FROM produit_images ORDER BY ordre
//   5. Requête stock : SELECT quantite, taille, taille_id, couleur, couleur_id
//      FROM stock JOIN taille JOIN couleur WHERE produit_id = $1 AND quantite > 0
//   6. Répondre : { product, images, stock }

async function getProductById(req, res, next) {
  try {
    // TODO : implémenter getProductById
    res.status(404).json({ error: 'TODO' });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 3 — getCategories : liste des catégories
// ================================================================
// GET /api/products/categories
// Requête : SELECT * FROM "categorie" ORDER BY nom
// Répondre : { categories: rows }

async function getCategories(req, res, next) {
  try {
    // TODO : implémenter getCategories
    res.json({ categories: [] });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// TODO 4 — getTailles et getCouleurs (même logique que getCategories)
// ================================================================

async function getTailles(req, res, next) {
  try {
    // TODO : SELECT * FROM "taille" ORDER BY valeur → { tailles: rows }
    res.json({ tailles: [] });
  } catch (err) {
    next(err);
  }
}

async function getCouleurs(req, res, next) {
  try {
    // TODO : SELECT * FROM "couleur" ORDER BY nom → { couleurs: rows }
    res.json({ couleurs: [] });
  } catch (err) {
    next(err);
  }
}

// ================================================================
// BONUS — CRUD admin (fonctions avancées, déjà implémentées)
// Vous pouvez les lire pour comprendre le pattern UPDATE / DELETE
// ================================================================

const productValidation = [
  body('nom').trim().notEmpty().isLength({ max: 50 }),
  body('categorie_id').isInt({ min: 1 }),
  body('prix').isFloat({ min: 0 }),
  body('image_url').notEmpty(),
  body('image_hover_url').notEmpty(),
];

async function createProduct(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    const { nom, categorie_id, description, prix, image_url, image_hover_url, statut = 'actif' } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO "produits" (nom, categorie_id, description, prix, image_url, image_hover_url, statut)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nom, categorie_id, description, prix, image_url, image_hover_url, statut]
    );
    res.status(201).json({ product: rows[0] });
  } catch (err) { next(err); }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { nom, categorie_id, description, prix, image_url, image_hover_url, statut } = req.body;
    const { rows } = await pool.query(
      `UPDATE "produits" SET
        nom = COALESCE($1, nom), categorie_id = COALESCE($2, categorie_id),
        description = COALESCE($3, description), prix = COALESCE($4, prix),
        image_url = COALESCE($5, image_url), image_hover_url = COALESCE($6, image_hover_url),
        statut = COALESCE($7, statut)
       WHERE id = $8 RETURNING *`,
      [nom, categorie_id, description, prix, image_url, image_hover_url, statut, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json({ product: rows[0] });
  } catch (err) { next(err); }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM "produits" WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json({ message: 'Produit supprimé' });
  } catch (err) { next(err); }
}

async function getProductStock(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT s.id, s.quantite, s.couleur_id, s.taille_id, cl.nom AS couleur, t.valeur AS taille
       FROM "stock" s JOIN "couleur" cl ON cl.id = s.couleur_id JOIN "taille" t ON t.id = s.taille_id
       WHERE s.produit_id = $1 ORDER BY cl.nom, t.valeur::numeric`, [id]
    );
    res.json({ stock: rows });
  } catch (err) { next(err); }
}

async function updateProductStock(req, res, next) {
  try {
    const { id } = req.params;
    const { couleur_id, taille_id, quantite } = req.body;
    if (quantite === undefined || quantite < 0) return res.status(400).json({ error: 'Quantité invalide' });
    const { rows } = await pool.query(
      `INSERT INTO "stock" (produit_id, couleur_id, taille_id, quantite)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (produit_id, couleur_id, taille_id) DO UPDATE SET quantite = EXCLUDED.quantite
       RETURNING *`,
      [id, couleur_id, taille_id, parseInt(quantite)]
    );
    const { rows: totalRows } = await pool.query(
      `SELECT COALESCE(SUM(quantite), 0) AS total FROM "stock" WHERE produit_id = $1`, [id]
    );
    const total = parseInt(totalRows[0].total);
    await pool.query(
      `UPDATE "produits" SET statut = $1 WHERE id = $2 AND statut != 'archive'`,
      [total > 0 ? 'actif' : 'en_rupture', id]
    );
    res.json({ stock: rows[0] });
  } catch (err) { next(err); }
}

module.exports = {
  getProducts, getProductById, getCategories, getTailles, getCouleurs,
  createProduct, updateProduct, deleteProduct, productValidation,
  getProductStock, updateProductStock,
};
