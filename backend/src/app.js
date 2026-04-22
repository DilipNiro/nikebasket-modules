// src/app.js — Point d'entrée du serveur Express
// ------------------------------------------------
// Architecture MVC :
//   Routes → Controllers → Pool PostgreSQL
//
// Middlewares globaux montés dans l'ordre :
//   1. cors        — autorise les requêtes cross-origin (frontend React)
//   2. cookie-parser — permet de lire req.cookies (token JWT)
//   3. express.json — parse le body JSON des requêtes
//   4. Route /api/health — vérification que le serveur tourne
//   5. errorHandler  — capture toutes les erreurs non traitées

'use strict';

require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');

const errorHandler  = require('./middleware/errorHandler');
const authRoutes    = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes    = require('./routes/cart.routes');
const orderRoutes   = require('./routes/orders.routes');

const app  = express();
const PORT = process.env.PORT || 3001;

// -- Middlewares globaux ------------------------------------------

app.use(cors({
  origin:      process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Nécessaire pour envoyer/recevoir les cookies
}));

app.use(cookieParser());
app.use(express.json());

// -- Routes -------------------------------------------------------
app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/orders',   orderRoutes);

// -- Route de santé (utile pour Docker/CI) -----------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// -- Gestionnaire d'erreurs (DOIT être monté EN DERNIER) ----------
app.use(errorHandler);

// -- Démarrage (désactivé en mode test pour supertest) -----------
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Serveur NikeBasket démarré sur http://localhost:${PORT}`);
    console.log(`🌍 Environnement : ${process.env.NODE_ENV || 'development'}\n`);
  });
}

module.exports = app;
