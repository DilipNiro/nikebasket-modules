// src/components/ProtectedRoute.jsx
// ------------------------------------
// Protège les routes accessibles aux utilisateurs connectés uniquement.
// Utilise AuthContext (module 10) pour vérifier l'état de connexion.

// ================================================================
// TODO — Implémenter ProtectedRoute
// ================================================================
// Ce composant reçoit { children } en prop.
//
// Comportement attendu :
//   1. Récupérer { user, loading } depuis useAuth() (module 10)
//   2. Si loading → afficher un écran de chargement
//      <div style={{ textAlign: 'center', padding: '3rem' }}>Chargement...</div>
//   3. Si user est null (non connecté) → rediriger vers /login
//      Aide : importer Navigate depuis 'react-router-dom'
//      <Navigate to="/login" replace />
//   4. Si connecté → afficher les enfants : {children}
//
// Note : Pour l'instant (avant module 10), on retourne directement {children}
//        car useAuth() n'est pas encore disponible.

export default function ProtectedRoute({ children }) {
  // TODO Module 10 : remplacer par la vraie vérification avec useAuth()
  // const { user, loading } = useAuth();
  // if (loading) return <div>Chargement...</div>;
  // if (!user) return <Navigate to="/login" replace />;

  return children;
}
