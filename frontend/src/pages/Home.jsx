// src/pages/Home.jsx — Page d'accueil

// ================================================================
// TODO — Implémenter la page Home
// ================================================================
// La page d'accueil doit afficher :
//   1. Une section héro avec image de fond et titre
//   2. Une section "Nouveautés" avec les derniers produits
//      → Appeler GET /api/products?sort=date_sortie&order=DESC&limit=4
//      → Afficher avec <ProductCard />
//   3. Une section catégories
//
// Hooks nécessaires : useState, useEffect
// Aide : importer api depuis '../api/axios' (module 10)
//
// Pour l'instant (avant module 10), affichez une page statique.

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue sur NikeBasket</h1>
      <p>TODO Module 09 : afficher les nouveautés depuis l'API</p>
    </div>
  );
}
