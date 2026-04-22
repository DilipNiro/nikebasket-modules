// src/pages/admin/AdminLayout.jsx — Layout du panel admin

// ================================================================
// TODO — Implémenter AdminLayout
// ================================================================
// Ce composant est le layout partagé pour toutes les pages /admin/*.
// Il doit afficher :
//   - Une sidebar de navigation admin (liens vers Dashboard, Produits, Commandes, Utilisateurs, Stock)
//   - Le contenu de la page active via <Outlet />
//
// Aide : importer Outlet, NavLink depuis 'react-router-dom'
// <Outlet /> est automatiquement remplacé par la route enfant active
//
// Vérifier aussi que l'utilisateur est admin ou employé (useAuth)
// Si role === 'client' → rediriger vers '/'

import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '60vh' }}>
      <aside style={{ width: '200px', background: '#111', padding: '1rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Admin</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink to="/admin"          end style={{ color: '#ccc' }}>Dashboard</NavLink>
          <NavLink to="/admin/products"     style={{ color: '#ccc' }}>Produits</NavLink>
          <NavLink to="/admin/orders"       style={{ color: '#ccc' }}>Commandes</NavLink>
          <NavLink to="/admin/users"        style={{ color: '#ccc' }}>Utilisateurs</NavLink>
          <NavLink to="/admin/stock"        style={{ color: '#ccc' }}>Stock</NavLink>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
