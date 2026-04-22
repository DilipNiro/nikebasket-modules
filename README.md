# Module 09 — React Router & Pages

## Objectif

Ajouter la navigation et créer le squelette de toutes les pages.  
À la fin de ce module, naviguer entre les pages fonctionne — le contenu sera rempli au module 10.

---

## Ce que vous allez apprendre

- **React Router v6** : `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`
- Les **routes imbriquées** (nested routes) pour le panel admin avec `Outlet`
- **ProtectedRoute** : bloquer l'accès aux pages privées
- `NavLink` pour mettre en évidence le lien actif

---

## Structure ajoutée dans ce module

```
frontend/src/
├── App.jsx                       ← mis à jour (routes définies)
├── components/
│   └── ProtectedRoute.jsx        ← TODO : vérifier l'auth
└── pages/
    ├── Home.jsx                  ← TODO : page d'accueil
    ├── Products.jsx              ← TODO : catalogue
    ├── ProductDetail.jsx         ← TODO : fiche produit
    ├── Login.jsx                 ← TODO : connexion
    ├── Register.jsx              ← TODO : inscription
    ├── Cart.jsx                  ← TODO : panier
    ├── Orders.jsx                ← TODO : mes commandes
    ├── OrderDetail.jsx           ← TODO : détail commande
    ├── Profile.jsx               ← TODO : profil
    └── admin/
        ├── AdminLayout.jsx       ← donné (sidebar + Outlet)
        ├── Dashboard.jsx         ← TODO : stats admin
        ├── Products.jsx          ← TODO : gestion produits
        ├── Orders.jsx            ← TODO : gestion commandes
        ├── Users.jsx             ← TODO : gestion utilisateurs
        └── Stock.jsx             ← TODO : gestion stock
```

---

## Votre mission

### 1. `ProtectedRoute` — la garde des routes privées

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // module 10

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

Pour l'instant (sans AuthContext), laissez `return children` — les routes seront protégées au module 10.

### 2. Les pages — squelette minimal

Chaque page doit au minimum afficher son titre et une indication de ce qu'elle fera.  
Les API calls seront ajoutés au module 10.

### 3. Les routes imbriquées (admin)

```jsx
<Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
  <Route index         element={<Dashboard />} />
  <Route path="products" element={<AdminProducts />} />
  ...
</Route>
```

`AdminLayout` contient `<Outlet />` qui est remplacé par la route enfant active.

---

## Tester votre travail

```bash
npm run dev
# Naviguer entre les pages :
# http://localhost:5173/          → Home
# http://localhost:5173/products  → Catalogue
# http://localhost:5173/login     → Connexion
# http://localhost:5173/admin     → Panel admin (Dashboard)
# http://localhost:5173/admin/orders → Commandes admin
```

---

## Questions de compréhension

1. Quelle est la différence entre `Link` et `<a>` en React ?
2. Pourquoi utilise-t-on `replace` dans `<Navigate to="/login" replace />` ?
3. Comment `<Outlet />` sait-il quel composant afficher ?
4. Quelle est la différence entre `useNavigate()` et `<Link>` ?

---

**Module suivant → `module-10-starter` : Context API & Connexion au backend**
