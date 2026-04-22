// src/config/db.js — Pool de connexions PostgreSQL
// ------------------------------------------------
// Module "pg" : driver officiel PostgreSQL pour Node.js
// Un pool maintient plusieurs connexions ouvertes en permanence
// ce qui évite le coût d'ouverture/fermeture à chaque requête.

const { Pool } = require('pg');

// TODO 1 — Créer un pool de connexions PostgreSQL
// Le pool doit lire sa configuration depuis les variables d'environnement :
//   process.env.PG_HOST     → host (défaut 'localhost')
//   process.env.PG_PORT     → port (défaut '5432', convertir en entier)
//   process.env.PG_USER     → user (défaut 'postgres')
//   process.env.PG_PASSWORD → password (défaut 'postgres')
//   process.env.PG_DATABASE → database (défaut 'ecommerce')
//   max: 10                 → nombre max de connexions simultanées
//   idleTimeoutMillis: 30000
//   connectionTimeoutMillis: 2000
//
// Aide : new Pool({ host, port, user, password, database, max, ... })
//
// Après la création du pool, écouter l'événement 'error' pour logger
// les erreurs inattendues : pool.on('error', (err) => console.error(...))
//
// Exporter le pool : module.exports = pool

// Écrivez votre code ici :
