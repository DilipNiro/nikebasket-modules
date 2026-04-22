// src/pages/ProductDetail.jsx — Fiche produit détaillée

// ================================================================
// TODO — Implémenter la page ProductDetail
// ================================================================
// Récupérer et afficher :
//   - Infos produit (nom, prix, description, catégorie)
//   - Images (principale + galerie)
//   - Sélecteur taille × couleur (depuis le stock disponible)
//   - Bouton "Ajouter au panier"
//
// API : GET /api/products/:id
// useParams() pour récupérer l'id depuis l'URL
// addToCart depuis CartContext (module 10)

import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produit #{id}</h1>
      <p>TODO : afficher les détails du produit, le stock, et le bouton d'ajout au panier</p>
    </div>
  );
}
