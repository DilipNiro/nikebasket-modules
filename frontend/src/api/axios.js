// src/api/axios.js — Instance Axios centralisée
// -----------------------------------------------
// Toutes les requêtes API de l'application passent par cette instance.
// Cela permet de configurer le comportement global en un seul endroit.

import axios from 'axios';

// ================================================================
// TODO 1 — Créer l'instance Axios
// ================================================================
// Configurer l'instance avec :
//   baseURL: '/api'              ← Vite proxy renvoie vers http://localhost:3001
//   withCredentials: true        ← Envoie automatiquement le cookie JWT httpOnly
//   headers: { 'Content-Type': 'application/json' }
//
// Aide : axios.create({ baseURL, withCredentials, headers })

// TODO 2 — Ajouter un intercepteur de réponse
// ================================================================
// L'intercepteur doit :
//   - Laisser passer les réponses réussies : response => response
//   - Sur erreur 401 (token expiré) : déclencher l'événement 'auth:expired'
//     window.dispatchEvent(new Event('auth:expired'))
//     AuthContext écoutera cet événement pour déconnecter l'utilisateur
//   - Re-rejeter l'erreur : return Promise.reject(error)
//
// Aide : api.interceptors.response.use(successFn, errorFn)

// Écrivez votre code ici :

const api = axios.create({
  // TODO : configurer l'instance
});

// TODO : ajouter l'intercepteur

export default api;
