// src/pages/Register.jsx — Page d'inscription

// ================================================================
// TODO — Implémenter la page Register
// ================================================================
// Formulaire avec : nom, email, password, confirmation
// Appeler register(nom, email, password) depuis AuthContext (module 10)
// Valider le mot de passe (12 chars, majuscule, chiffre, spécial)
// Après inscription → rediriger vers '/'

export default function Register() {
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: '2rem' }}>
      <h2>Inscription</h2>
      <p>TODO : formulaire nom + email + password, appel à l'API /auth/register</p>
    </div>
  );
}
