# Module 10 — Solution : Context API & Connexion au backend

## Points clés à retenir

### Axios — withCredentials : la clé de l'authentification
```js
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // ← le navigateur envoie le cookie httpOnly automatiquement
});
```
Sans `withCredentials: true` : le cookie JWT n'est pas envoyé → toutes les routes protégées renvoient 401.

### Intercepteur : gérer les 401 globalement
```js
api.interceptors.response.use(
  response => response,           // succès : laisser passer
  error => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('auth:expired')); // → AuthContext déconnecte l'user
    }
    return Promise.reject(error); // propager l'erreur
  }
);
```

### AuthContext — vérification au montage
```js
useEffect(() => {
  api.get('/auth/me')                         // le cookie est envoyé automatiquement
    .then(res => setUser(res.data.user))      // connecté : stocker l'user
    .catch(() => setUser(null))               // pas de cookie valide : null
    .finally(() => setLoading(false));        // fin du chargement dans tous les cas
}, []);
```
`loading: true` pendant cette vérification → ProtectedRoute affiche "Chargement..." plutôt que de rediriger.

### CartContext — synchronisation post-action
```js
async function addToCart(produitId, tailleId, couleurId, quantite = 1) {
  await api.post('/cart', { produit_id: produitId, ... });
  await fetchCart(); // ← toujours resynchroniser depuis l'API
}
```
On ne calcule pas le nouveau total côté frontend — on le demande au backend qui a la source de vérité.

### useEffect avec dépendance [user]
```js
// Dans CartContext :
useEffect(() => {
  if (user) fetchCart(); // connexion → charger le panier
  else setCart({ items: [], total: 0, count: 0 }); // déconnexion → vider
}, [user]); // se re-déclenche chaque fois que user change
```

---

## Le site est maintenant fonctionnel !

Testez l'expérience complète :
1. Parcourir le catalogue sans être connecté
2. S'inscrire → cookie JWT déposé automatiquement
3. Ajouter des produits au panier
4. Passer une commande → stock décrémenté
5. Se connecter en admin → accéder au panel d'administration

---

**Module suivant → `module-11-starter` : Assemblage Final & Docker**
