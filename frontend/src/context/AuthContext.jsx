// src/context/AuthContext.jsx — État utilisateur global
// -------------------------------------------------------
// La Context API permet de partager des données entre composants
// sans passer des props à chaque niveau (prop drilling).
//
// AuthContext gère : utilisateur connecté, login, logout, register.

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

// ================================================================
// TODO 1 — AuthProvider : le fournisseur de contexte
// ================================================================
// export function AuthProvider({ children }) {
//
//   States à déclarer :
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true); // vrai pendant la vérif initiale
//
//   useEffect au montage :
//     1. Appeler GET /auth/me pour savoir si l'utilisateur est déjà connecté
//        (il peut avoir un cookie JWT valide d'une session précédente)
//        Si succès → setUser(res.data.user)
//        Si erreur → setUser(null)
//        Dans tous les cas → setLoading(false)
//
//     2. Écouter l'événement 'auth:expired' (déclenché par l'intercepteur Axios)
//        window.addEventListener('auth:expired', handleExpired)
//        Penser à retourner le cleanup : return () => window.removeEventListener(...)
//
//   Fonctions à exposer :
//     async login(email, password) {
//       const res = await api.post('/auth/login', { email, password });
//       setUser(res.data.user);
//       return res.data.user;
//     }
//     async register(nom, email, password) { ... similaire }
//     async logout() {
//       await api.post('/auth/logout');
//       setUser(null);
//     }
//
//   Retourner :
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
// }

export function AuthProvider({ children }) {
  // TODO : implémenter AuthProvider
  return <AuthContext.Provider value={{ user: null, loading: false, login: async () => {}, register: async () => {}, logout: async () => {} }}>{children}</AuthContext.Provider>;
}

// ================================================================
// TODO 2 — useAuth : hook personnalisé
// ================================================================
// Ce hook simplifie la consommation du contexte.
// Il doit :
//   1. Appeler useContext(AuthContext)
//   2. Vérifier que le contexte existe (lancer une erreur sinon)
//   3. Retourner le contexte
//
// Aide :
//   export function useAuth() {
//     const ctx = useContext(AuthContext);
//     if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
//     return ctx;
//   }

export function useAuth() {
  // TODO : implémenter useAuth
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}
