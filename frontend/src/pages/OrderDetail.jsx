// src/pages/OrderDetail.jsx — Détail d'une commande

// ================================================================
// TODO — Implémenter la page OrderDetail
// ================================================================
// API : GET /api/orders/:id
// Afficher : infos commande, articles commandés, historique de statut

import { useParams } from 'react-router-dom';

export default function OrderDetail() {
  const { id } = useParams();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Commande #{id}</h1>
      <p>TODO : afficher le détail depuis GET /api/orders/{id}</p>
    </div>
  );
}
