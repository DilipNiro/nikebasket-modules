// src/components/ProductCard.jsx
// --------------------------------
// Carte produit affichée dans le catalogue.
// Reçoit un objet `product` en prop et affiche ses informations.

// ================================================================
// TODO 3 — Créer le composant ProductCard
// ================================================================
// Props : { product }
//   product contient : id, nom, prix, image_url, image_hover_url, categorie, statut
//
// STRUCTURE HTML :
//   <div className="product-card">
//
//     Image avec effet hover :
//       <div className="product-card-image">
//         <img src={product.image_url} alt={product.nom} className="img-main" />
//         <img src={product.image_hover_url} alt={product.nom} className="img-hover" />
//         {product.statut === 'en_rupture' && (
//           <div className="badge-rupture">Rupture de stock</div>
//         )}
//       </div>
//
//     Informations :
//       <div className="product-card-info">
//         <p className="product-category">{product.categorie}</p>
//         <h3 className="product-name">{product.nom}</h3>
//         <p className="product-price">{product.prix.toFixed(2)} €</p>
//         <Link to={`/products/${product.id}`} className="btn-voir">
//           Voir le produit
//         </Link>
//       </div>
//   </div>
//
// Aide : importer Link depuis 'react-router-dom'

import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // TODO : implémenter ProductCard
  return (
    <div className="product-card" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <p>ProductCard — à implémenter</p>
      <p><strong>{product?.nom}</strong></p>
    </div>
  );
}
