// src/components/Navbar.jsx
// --------------------------
// La barre de navigation principale du site.
// Dans ce module, elle est statique (pas encore connectée aux contextes Auth/Cart).
// Elle sera mise à jour au module 10 pour afficher l'utilisateur connecté et le panier.

// ================================================================
// TODO 1 — Créer le composant Navbar
// ================================================================
// Ce composant doit afficher :
//
//   STRUCTURE HTML :
//   <header>
//     <nav>
//       <div className="nav-container">
//         Logo → <Link to="/"> <img src="/images/logo.png" alt="Logo Nike" /> </Link>
//
//         Navigation → <ul className="nav-links">
//           <li><Link to="/">Accueil</Link></li>
//           <li><Link to="/products">Produits</Link></li>
//         </ul>
//
//         Barre de recherche → <div className="search-bar">
//           <input type="text" className="search-input" placeholder="Rechercher..." />
//           <button className="search-button">
//             <img src="/images/search-icon.jpg" alt="Rechercher" className="search-icon" />
//           </button>
//         </div>
//
//         Icônes compte/panier → <div className="account-cart">
//           <div className="cart">
//             <img src="/images/cart-icon.png" alt="Panier" className="cart-img" />
//           </div>
//           <div className="account">
//             <img src="/images/account-icon.webp" alt="Compte" className="account-icon-img" />
//             <span>Se connecter</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   </header>
//
// Aide : importer Link depuis 'react-router-dom'
// Note : pas de logique dynamique pour l'instant — juste la structure HTML/CSS

// Écrivez votre composant ici :
export default function Navbar() {
  return (
    <header>
      <nav>
        <div className="nav-container">
          {/* TODO : compléter la Navbar */}
          <p style={{ padding: '1rem', color: '#888' }}>Navbar — à implémenter</p>
        </div>
      </nav>
    </header>
  );
}
