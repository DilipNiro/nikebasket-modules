// src/components/CartItem.jsx
// ----------------------------
// Affiche un article du panier dans la sidebar/modal panier.

// ================================================================
// TODO 4 — Créer le composant CartItem
// ================================================================
// Props : { item, onRemove }
//   item contient : id, nom, image_url, prix, quantite, taille, couleur
//   onRemove : fonction appelée quand on clique sur "Supprimer"
//
// STRUCTURE HTML :
//   <div className="cart-item">
//     <img src={item.image_url} alt={item.nom} className="cart-item-image" />
//     <div className="cart-item-details">
//       <p>{item.nom}</p>
//       <p>Couleur : {item.couleur}</p>
//       <p>Taille : {item.taille}</p>
//       <p>{parseFloat(item.prix).toFixed(2)} €</p>
//       <p>Quantité : {item.quantite}</p>
//     </div>
//     <button className="delete-btn" onClick={() => onRemove(item.id)}>
//       Supprimer
//     </button>
//   </div>

export default function CartItem({ item, onRemove }) {
  // TODO : implémenter CartItem
  return (
    <div className="cart-item">
      <p>CartItem — à implémenter : {item?.nom}</p>
    </div>
  );
}
