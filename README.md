# Module 10 — Context API & Connexion au backend

## Objectif

Connecter le frontend au backend en implémentant :
- L'instance **Axios** centralisée (avec cookie JWT automatique)
- **AuthContext** — état utilisateur global partagé dans toute l'app
- **CartContext** — état panier synchronisé avec l'API

À la fin de ce module, le site est **fonctionnel de bout en bout**.

---

## Ce que vous allez apprendre

- La **Context API** de React : `createContext`, `useContext`, `Provider`
- Les **hooks personnalisés** : `useAuth()`, `useCart()`
- **Axios** : instance centralisée, `withCredentials`, intercepteurs
- Le **lifting state up** : pourquoi l'état global est préférable aux props

---

## Structure ajoutée dans ce module

```
frontend/src/
├── api/
│   └── axios.js            ← TODO : instance Axios + intercepteur
└── context/
    ├── AuthContext.jsx     ← TODO : login, logout, register, useAuth()
    └── CartContext.jsx     ← TODO : panier synchronisé, useCart()
```

---

## Votre mission

### TODO 1 — `api/axios.js`

```js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,        // cookie httpOnly envoyé automatiquement
  headers: { 'Content-Type': 'application/json' },
});

// Gérer les 401 (token expiré)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
```

### TODO 2 — `context/AuthContext.jsx`

Implémentez `AuthProvider` :
1. Au montage : appeler `GET /auth/me` pour vérifier si connecté
2. Écouter l'événement `'auth:expired'` → `setUser(null)`
3. Exposer `login`, `register`, `logout`

### TODO 3 — `context/CartContext.jsx`

Implémentez `CartProvider` :
1. Recharger le panier quand `user` change
2. Exposer `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`
3. Toujours resynchroniser depuis l'API après chaque action

---

## Concept clé : le re-render sur changement de contexte

```jsx
// Dans AuthContext :
setUser(nouveauUser); // → tous les composants qui utilisent useAuth() se re-rendent

// Dans Navbar.jsx (useAuth) :
const { user } = useAuth();
// user mis à jour → Navbar affiche le nouveau nom automatiquement
```

---

## Tester votre travail

```bash
# Backend
cd backend && npm run dev

# Frontend (autre terminal)
cd frontend && npm run dev

# Ouvrir http://localhost:5173
# 1. S'inscrire → la Navbar doit afficher votre nom
# 2. Ajouter un produit au panier → badge panier doit s'incrémenter
# 3. Passer commande → le panier doit se vider
# 4. Se déconnecter → la Navbar revient à "Se connecter"
```

---

## Questions de compréhension

1. Pourquoi `withCredentials: true` est-il nécessaire dans Axios ?
2. Que se passe-t-il si on n'appelle pas `fetchCart()` après `addToCart()` ?
3. Pourquoi utilise-t-on un `useEffect` avec `[user]` comme dépendance dans CartContext ?
4. Quelle est la différence entre `useState` et Context API pour l'état global ?

---

**Module suivant → `module-11-starter` : Assemblage Final & Docker**
