// src/App.jsx — Routeur principal React Router v6
// -----------------------------------------------
// Ce fichier définit toutes les routes de l'application.
// Chaque route associe un chemin URL à un composant page.

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages importées (à compléter au fur et à mesure)
import Home          from './pages/Home';
import Products      from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Cart          from './pages/Cart';
import Orders        from './pages/Orders';
import OrderDetail   from './pages/OrderDetail';
import Profile       from './pages/Profile';
import AdminLayout   from './pages/admin/AdminLayout';
import Dashboard     from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders   from './pages/admin/Orders';
import AdminUsers    from './pages/admin/Users';
import AdminStock    from './pages/admin/Stock';

// ================================================================
// TODO — Compléter App.jsx avec les contextes et les routes
// ================================================================
// Structure attendue :
//
//   <BrowserRouter>
//     <AuthProvider>           ← contexte auth (module 10)
//       <CartProvider>         ← contexte panier (module 10)
//         <Navbar />
//         <Routes>
//           Routes publiques :
//             / → Home
//             /products → Products
//             /products/:id → ProductDetail
//             /login → Login
//             /register → Register
//
//           Routes protégées (connecté uniquement) :
//             /cart → <ProtectedRoute><Cart /></ProtectedRoute>
//             /orders → <ProtectedRoute><Orders /></ProtectedRoute>
//             /orders/:id → <ProtectedRoute><OrderDetail /></ProtectedRoute>
//             /profile → <ProtectedRoute><Profile /></ProtectedRoute>
//
//           Routes admin (layout imbriqué) :
//             /admin → <ProtectedRoute><AdminLayout /></ProtectedRoute>
//               index → Dashboard
//               products → AdminProducts
//               orders → AdminOrders
//               users → AdminUsers
//               stock → AdminStock
//         </Routes>
//         <Footer />
//       </CartProvider>
//     </AuthProvider>
//   </BrowserRouter>
//
// Note : AuthProvider et CartProvider seront ajoutés au module 10.
//        Pour l'instant, les routes fonctionnent sans contextes.
//        ProtectedRoute (sans contexte) laisse tout passer pour l'instant.

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* TODO : ajouter les routes */}
        <Route path="/"             element={<Home />} />
        <Route path="/products"     element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/register"     element={<Register />} />

        {/* Routes protégées */}
        <Route path="/cart"         element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders"       element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id"   element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
        <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Panel admin — routes imbriquées */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index           element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders"   element={<AdminOrders />} />
          <Route path="users"    element={<AdminUsers />} />
          <Route path="stock"    element={<AdminStock />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
