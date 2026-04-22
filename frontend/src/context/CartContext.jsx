// src/context/CartContext.jsx — État panier global
// -------------------------------------------------
// CartContext synchronise le panier avec le backend à chaque action.
// La source de vérité est la base de données — pas le state local.

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

// ================================================================
// TODO — CartProvider
// ================================================================
// export function CartProvider({ children }) {
//
//   const { user } = useAuth();
//   const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
//   const [loading, setLoading] = useState(false);
//
//   // Recharger le panier quand user change (connexion / déconnexion)
//   useEffect(() => {
//     if (user) {
//       fetchCart();
//     } else {
//       setCart({ items: [], total: 0, count: 0 }); // vider le state si déconnecté
//     }
//   }, [user]);
//
//   // fetchCart : GET /api/cart → setCart(res.data)
//   async function fetchCart() {
//     try {
//       const res = await api.get('/cart');
//       setCart(res.data);
//     } catch {
//       setCart({ items: [], total: 0, count: 0 });
//     }
//   }
//
//   // addToCart : POST /api/cart → fetchCart()
//   async function addToCart(produitId, tailleId, couleurId, quantite = 1) {
//     setLoading(true);
//     try {
//       await api.post('/cart', { produit_id: produitId, taille_id: tailleId, couleur_id: couleurId, quantite });
//       await fetchCart();
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   // updateQuantity : PUT /api/cart/:itemId → fetchCart()
//   // removeFromCart : DELETE /api/cart/:itemId → fetchCart()
//   // clearCart : DELETE /api/cart → setCart({ items: [], total: 0, count: 0 })
//
//   return (
//     <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, refreshCart: fetchCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

export function CartProvider({ children }) {
  // TODO : implémenter CartProvider
  return <CartContext.Provider value={{ cart: { items: [], total: 0, count: 0 }, loading: false, addToCart: async () => {}, updateQuantity: async () => {}, removeFromCart: async () => {}, clearCart: async () => {}, refreshCart: async () => {} }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans CartProvider');
  return ctx;
}
