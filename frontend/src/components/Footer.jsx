// src/components/Footer.jsx
// --------------------------

// ================================================================
// TODO 2 — Créer le composant Footer
// ================================================================
// Un footer simple avec 3 colonnes :
//
//   <footer className="footer">
//     <div className="footer-container">
//       Colonne 1 : Logo + slogan
//         <div className="footer-logo">
//           <img src="/images/logo.png" alt="NikeBasket" />
//           <p>Just Do It.</p>
//         </div>
//
//       Colonne 2 : Liens rapides
//         <div className="footer-links">
//           <h4>Liens rapides</h4>
//           <ul>
//             <li><Link to="/">Accueil</Link></li>
//             <li><Link to="/products">Produits</Link></li>
//             <li><Link to="/orders">Mes commandes</Link></li>
//           </ul>
//         </div>
//
//       Colonne 3 : Réseaux sociaux
//         <div className="footer-social">
//           <h4>Suivez-nous</h4>
//           <ul>
//             <li><a href="#">Instagram</a></li>
//             <li><a href="#">Facebook</a></li>
//           </ul>
//         </div>
//     </div>
//
//     <div className="footer-bottom">
//       <p>&copy; 2026 NikeBasket — Projet pédagogique Efrei Paris</p>
//     </div>
//   </footer>

import { Link } from 'react-router-dom';

export default function Footer() {
  // TODO : implémenter le Footer
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>Footer — à implémenter</p>
      </div>
    </footer>
  );
}
