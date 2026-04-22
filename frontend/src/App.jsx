// src/App.jsx — Point d'entrée de l'application React
// Ce fichier sera complété au module 09 (routes) et module 10 (contextes).
// Pour l'instant, il affiche juste les composants que vous allez créer.

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

// Données de test pour vérifier votre ProductCard
const testProduct = {
  id: 1,
  nom: 'Nike Air Max 90',
  prix: 149.99,
  image_url: '/images/airmax90.jpg',
  image_hover_url: '/images/airmax90h.jpg',
  categorie: 'Running',
  statut: 'actif',
};

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h1>NikeBasket — Test composants</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <ProductCard product={testProduct} />
          <ProductCard product={{ ...testProduct, id: 2, nom: 'Nike Air Force 1', statut: 'en_rupture' }} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
