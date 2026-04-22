# Module 08 — Solution : Composants React

## Points clés à retenir

### Un composant React = une fonction qui retourne du JSX

```jsx
// ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <div className="product">
      <img src={product.image_url} alt={product.nom} />
      <p>{product.nom}</p>
      <p>{parseFloat(product.prix).toFixed(2)} €</p>
    </div>
  );
}

// Utilisation dans App.jsx
<ProductCard product={monProduit} />
```

### class → className en JSX
JSX est transpilé en JavaScript par Babel/Vite.  
`class` est un mot réservé en JS (pour les classes ES6) → on écrit `className`.

### Affichage conditionnel avec `&&` et ternaire
```jsx
// N'affiche le badge que si la condition est vraie
{product.statut === 'en_rupture' && <div className="badge-rupture">Rupture de stock</div>}

// Ternaire pour deux cas
{user ? <span>{user.nom}</span> : <Link to="/login">Se connecter</Link>}
```

### useRef pour les clicks extérieurs (Navbar)
```jsx
const accountRef = useRef(null);

useEffect(() => {
  function handleClick(e) {
    if (accountRef.current && !accountRef.current.contains(e.target)) {
      setAccountOpen(false); // ferme si click en dehors
    }
  }
  document.addEventListener('mousedown', handleClick);
  return () => document.removeEventListener('mousedown', handleClick); // cleanup
}, []);
```

---

**Module suivant → `module-09-starter` : React Router & Pages**
