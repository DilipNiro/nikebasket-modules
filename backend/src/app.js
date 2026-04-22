// src/app.js — Serveur Express NikeBasket
// ----------------------------------------
// Ce fichier est le point d'entrée du backend.
// Il configure Express, les middlewares globaux, et les routes.

'use strict';

require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3001;

// TODO 1 — Configurer les middlewares globaux dans l'ordre suivant :
//
//   1. cors() avec les options :
//      origin: process.env.FRONTEND_URL || 'http://localhost:5173'
//      credentials: true  ← obligatoire pour les cookies
//
//   2. cookieParser()     ← permet de lire req.cookies
//
//   3. express.json()     ← parse le corps JSON des requêtes
//
// Aide : app.use(cors({ ... }))

// TODO 2 — Ajouter la route de santé :
//   GET /api/health → répondre { status: 'ok', timestamp: new Date().toISOString() }
//
// Aide : app.get('/api/health', (req, res) => { ... })

// TODO 3 — Monter le middleware d'erreurs en DERNIER :
//   app.use(errorHandler)
//
// ⚠ Il doit être après toutes les routes, sinon il ne capturera pas les erreurs.

// TODO 4 — Démarrer le serveur sur PORT si NODE_ENV !== 'test' :
//   app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`))
//
// La condition NODE_ENV !== 'test' évite de démarrer le serveur pendant les tests Jest.

module.exports = app;
