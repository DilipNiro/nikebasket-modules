# Module 09 — Solution : React Router & Pages

## Points clés à retenir

### React Router v6 — La structure de base
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/"             element={<Home />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart"         element={<ProtectedRoute><Cart /></ProtectedRoute>} />
  </Routes>
</BrowserRouter>
```

### Routes imbriquées (nested routes) + Outlet
```jsx
// Dans App.jsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index         element={<Dashboard />} />
  <Route path="orders" element={<AdminOrders />} />
</Route>

// Dans AdminLayout.jsx
<Outlet />  // remplacé automatiquement par la route enfant active
```

### ProtectedRoute
```jsx
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

### useParams — lire les paramètres d'URL
```jsx
// Route : /products/:id
function ProductDetail() {
  const { id } = useParams(); // "42" si URL = /products/42
  // ...
}
```

### useNavigate — navigation programmatique
```jsx
const navigate = useNavigate();
// Après connexion réussie :
navigate('/');
// Après ajout au panier :
navigate('/cart');
```

---

**Module suivant → `module-10-starter` : Context API & Connexion au backend**
